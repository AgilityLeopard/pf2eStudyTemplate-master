<template>
    <div class="weapon-manager">

        <!-- ADD BUTTON -->
        <v-btn class="ui-btn ui-btn--success mt-2" block @click="WeaponSearchDialog = true">
            Добавить оружие
        </v-btn>

        <!-- TABLE -->
        <v-data-table class="ui-table mt-3" :headers="headersWeapon" :items="items" hide-default-footer>
            <template v-slot:no-data>
                <div class="text-center py-4 ui-muted">Нет предметов</div>
            </template>

            <template v-slot:item.name="{ item }">
                <span class="font-weight-medium">{{ item.name }}</span>
            </template>

            <template v-slot:item.attack="{ item }">
                <span class="ui-muted">
                    {{ attackModifier(item) }} /
                    {{
                        item.traits.includes("быстрое")
                            ? attackModifier(item) - 4
                            : attackModifier(item) - 5
                    }}
                    /
                    {{
                        item.traits.includes("быстрое")
                            ? attackModifier(item) - 8
                            : attackModifier(item) - 10
                    }}
                </span>
            </template>

            <template v-slot:item.damage="{ item }">
                <span>{{ damageModifier(item) }}</span>
            </template>

            <template v-slot:item.view="{ item }">
                <v-btn small text class="ui-btn--ghost" @click="$emit('view', item)">
                    <v-icon small left>visibility</v-icon>
                    Просмотр
                </v-btn>
            </template>

            <template v-slot:item.qty="{ item }">
                <div class="qty-control">
                    <v-btn icon small :disabled="item.qty === 1" @click="decrementQty(item)">
                        <v-icon small color="var(--ui-danger)">remove_circle</v-icon>
                    </v-btn>

                    <span class="qty-value">{{ item.qty }}</span>

                    <v-btn icon small @click="incrementQty(item)">
                        <v-icon small color="var(--ui-warning)">add_circle</v-icon>
                    </v-btn>
                </div>
            </template>

            <template v-slot:item.delete="{ item }">
                <v-btn small text class="ui-btn--ghost" @click="openWeaponSettings(item)">
                    <v-icon small left>edit</v-icon>
                </v-btn>
            </template>

            <template v-slot:item.edit="{ item }">
                <v-btn small text class="ui-btn--danger" @click="remove(item)">
                    <v-icon small left>delete</v-icon>
                </v-btn>
            </template>

        </v-data-table>

        <!-- SEARCH DIALOG -->
        <v-dialog v-model="WeaponSearchDialog" width="1400px" scrollable>
            <v-card class="ui-card">

                <v-alert v-if="alertMoney" type="error" dense text border="left">
                    У вас недостаточно денег
                </v-alert>

                <wargear-search v-if="wargearList" @cancel="WeaponSearchDialog = false"
                    :repository="wargearList.filter(i => i.type === 'weapon')" type="weapon" @select="add" />

            </v-card>
        </v-dialog>

        <!-- EDITOR DIALOG -->
        <v-dialog v-model="weaponEditorDialog" width="700px">
            <v-card class="ui-card">

                <!-- HEADER -->
                <v-card-title class="ui-dialog-header">
                    Редактирование оружия
                    <v-spacer />
                    <v-icon @click="weaponEditorDialog = false">close</v-icon>
                </v-card-title>

                <!-- CONTENT -->
                <v-card-text>

                    <v-row dense>
                        <v-col v-for="field in fields" :key="field.key" :cols="field.type === 'editor' ? 12 : 6">

                            <!-- SELECT -->
                            <v-select v-if="field.type === 'select'" v-model="editItem[field.key]"
                                :items="getItems(field)" :item-text="field.itemText || 'name'"
                                :item-value="field.itemValue || 'value'" :label="field.label" dense outlined />

                            <!-- NUMBER -->
                            <v-text-field v-else-if="field.type === 'number'" v-model.number="editItem[field.key]"
                                :label="field.label" type="number" dense outlined />

                            <!-- EDITOR -->
                            <div v-else-if="field.type === 'editor'" class="editor-block">
                                <label class="ui-label">{{ field.label }}</label>

                                <!-- TOOLBAR -->
                                <div class="tiptap-toolbar">

                                    <v-btn icon small @click="editor.chain().focus().toggleBold().run()">
                                        <v-icon small>format_bold</v-icon>
                                    </v-btn>

                                    <v-btn icon small @click="editor.chain().focus().toggleItalic().run()">
                                        <v-icon small>format_italic</v-icon>
                                    </v-btn>

                                    <v-btn icon small @click="editor.chain().focus().toggleBulletList().run()">
                                        <v-icon small>format_list_bulleted</v-icon>
                                    </v-btn>

                                </div>

                                <!-- EDITOR -->
                                <EditorContent :editor="editor" class="tiptap-editor" />
                            </div>

                            <!-- STRING -->
                            <v-text-field v-else v-model="editItem[field.key]" :label="field.label" dense outlined />


                        </v-col>

                        <v-col cols="6">
                            <RuneSelector v-model="Striking" :runes="weaponRuneStriking" title="Руна Разящая">
                                <template #preview="{ rune }">
                                    <CardItem :item="StrikeItem(rune)" :wargearPrice="wargearPrice" />
                                </template>
                            </RuneSelector>
                        </v-col>
                        <v-col cols="6">
                            <RuneSelector v-model="Potency" :runes="weaponRunePotency" title="Руна Мощи">
                                <template #preview="{ rune }">
                                    <CardItem :item="StrikeItem(rune)" :wargearPrice="wargearPrice" />
                                </template>
                            </RuneSelector>
                        </v-col>
                    </v-row>

                </v-card-text>

                <!-- ACTIONS -->
                <v-card-actions>
                    <v-spacer />
                    <v-btn class="ui-btn ui-btn--success" @click="saveWeapon">
                        Сохранить
                    </v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

    </div>
</template>
<script>
import WargearSearch from '~/components/forge/WargearSearch.vue';
import WargearTrait from '~/mixins/WargearTraitRepositoryMixin';
import WargearMixin from '~/mixins/WargearMixin';
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";
import RuneSelector from './runeSelector.vue';
import CardItem from '../../CardItem.vue';

import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import { ActionIcon } from '../ActionIcon';

export default {
    components: {

        WargearSearch,
        RuneSelector,
        CardItem,
        EditorContent
    },
    mixins: [
        WargearTrait,
        WargearMixin,
        StatRepositoryMixin,

    ],
    extensions: [
        StarterKit,
    ],
    data() {
        return {
            WeaponSearchDialog: false,
            weaponEditorDialog: false,
            Weapon: undefined,
            alertMoney: false,
            editor: null,   // 👈 сюда
            // Для выбора рун
            Striking: "none",
            Resilent: "none",
            Potency: "none",

            ResilientArmor: "none",
            PotencyArmor: "none",

            Property: [],
            PropertyArmor: [],

            localProperty: [], // выбранные ключи
            selectedRune: null, // последняя кликнутая руна
            localStriking: undefined, // временное значение для диалога
            localPotency: undefined,


            // Rarity *
            //                 Common
            // Traits
            // PP
            // Price


            // GP
            // 30


            // SP / Credits
            // Price


            // CP
            // Price


            // Size *
            //                 Medium
            // Bulk
            // 0.2


            // Group *
            //                 Armor
            // Hands
            // Usage
            // Usage
            // 8



            fields: [
                { key: 'bulk', type: 'number', label: 'Нагрузка' },
                { key: 'name', type: 'string', label: 'Имя предмета' },
                { key: 'description', type: 'editor', label: 'Описание' },
                { key: 'level', type: 'number', label: 'Уровень' },
                {
                    key: 'group',
                    type: 'select',
                    label: 'Группа',
                    items: 'weaponGroup',
                    itemText: 'name',
                    itemValue: 'group'
                },
                {
                    key: 'rarity',
                    type: 'select',
                    label: 'Редкость',
                    itemText: 'name',
                    itemValue: 'key',
                    items: 'rarityRepository' // 👈 ссылка на поле компонента
                },
            ],
            editItem: {
                size: null,
                bulk: 0,
            },
            localPropertyArmor: [], // выбранные ключи
            selectedRuneArmor: null, // последняя кликнутая руна
            localResilientArmor: undefined, // временное значение для диалога
            localPotencyArmor: undefined,
            headersWeapon: [
                {
                    text: 'Название',
                    value: 'name',
                    align: 'left',
                    class: 'text-left',
                    width: '250px',
                },
                {
                    text: 'Попадание', value: 'attack', class: 'text-center', align: 'center', width: '120px',
                },
                {
                    text: 'Урон', value: 'damage', class: 'text-center ', align: 'center', width: '150px',
                },
                { text: 'Просмотр', value: 'view', sortable: false },
                {
                    text: 'Количество',
                    value: 'qty',
                    align: 'center',
                    class: 'text-center',
                    width: '150px',
                },
                {
                    text: '',
                    value: 'edit',
                    align: 'center',
                    class: 'text-center',
                    width: '60px',
                },
                {
                    text: '',
                    value: 'delete',
                    align: 'center',
                    class: 'text-center',
                    width: '60px',
                },
                { text: '', value: 'data-table-expand', width: '50px' }
            ],
        }
    },



    beforeDestroy() {
        if (this.editor) this.editor.destroy()
    },
    props: {
        items: Array,
        headers: Array,
        wargearList: Array,

        isEquipped: Function,
        attackModifier: Function,
        damageModifier: Function,
        characterId: {
            type: String,
            required: true
        },
    },
    methods: {
        remove(gear) {
            this.$store.commit('characters/unwearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
            this.$store.commit('characters/removeCharacterWargear', { id: this.characterId, gearId: gear.id });
        },
        getItems(field) {
            if (typeof field.items === 'string') {
                return this[field.items]; // 👉 this.weaponGroup
            }
            return field.items || [];
        },
        armorGroupName(group) {
            return this.armorGroup.find(g => g.group === group)?.name || ''
        },
        category(category) {
            return this.armourCategoryRepository.find(t => t.category === category)?.name || "";
        },
        getMoney() {
            return this.$store.getters['characters/characterMoneyById'](this.characterId);
        },
        incrementQty(gear) {
            const gearNew = {
                ...gear,
                qty: gear.qty + 1
            }
            this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, qty: gear.qty + 1, gear: gearNew, notEnc: true });

        },
        decrementQty(gear) {
            const gearNew = {
                ...gear,
                qty: gear.qty - 1
            }
            this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, qty: gear.qty - 1, gear: gearNew, notEnc: true });
        },
        add(gear, buy) {

            this.alertMoney = false;
            let gear1;
            if (buy === true) {
                this.alertMoney = false;

                const newWallet = this.payItem(this.getMoney(), gear.price.value);

                if (!newWallet) {
                    this.alertMoney = true; // не хватает
                    return;
                }

                // обновляем кошелёк
                for (const [nominal, value] of Object.entries(newWallet)) {
                    this.$store.commit('characters/setCharacterMoney', {
                        id: this.characterId,
                        nominal,
                        value,
                    });

                    gear1 = { ...gear, damageOrig: gear.damage };


                }
            }
            else {
                gear1 = { ...gear, damageOrig: gear.damage };


            }

            this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: gear.name, source: 'custom', gear: gear1 });
            // Закрываем окна
            this.WeaponSearchDialog = false;
            //this.ArmorSearchDialog = false;
            // this.GearSearchDialog = false;
            // this.ConsumableSearchDialog = false;

        },
        payItem(wallet, price) {
            const rates = { cp: 1, sp: 10, gp: 100, pp: 1000 };

            // переводим всё в меди
            let walletCp = wallet.cp * rates.cp + wallet.sp * rates.sp + wallet.gp * rates.gp + wallet.pp * rates.pp;
            const priceCp = (price.cp || 0) * rates.cp + (price.sp || 0) * rates.sp + (price.gp || 0) * rates.gp + (price.pp || 0) * rates.pp;

            if (walletCp < priceCp) return null; // не хватает денег

            walletCp -= priceCp;

            // пересчитываем в монеты с правильной сдачей
            const newWallet = {};
            newWallet.pp = Math.floor(walletCp / rates.pp);
            walletCp -= newWallet.pp * rates.pp;

            newWallet.gp = Math.floor(walletCp / rates.gp);
            walletCp -= newWallet.gp * rates.gp;

            newWallet.sp = Math.floor(walletCp / rates.sp);
            walletCp -= newWallet.sp * rates.sp;

            newWallet.cp = walletCp;

            return newWallet;
        },
        changeMoney() {
            this.moneyEditorDialog = false;
            this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: this.gp === '' ? this.money : this.gp, nominal: this.labelMoney });
        },


        openWeaponSettings(gear) {
            this.weaponEditorDialog = true;
            const weapon = gear;
            // пересоздаём editor


            this.Striking = this.weaponRuneStriking.find(item => weapon.runeWeapon.striking === item.key).key;
            this.localStriking = this.weaponRuneStriking.find(item => weapon.runeWeapon.striking === item.key).key;

            this.Potency = this.weaponRunePotency.find(item => weapon.runeWeapon.potency === item.key).key;
            this.localPotency = this.weaponRunePotency.find(item => weapon.runeWeapon.potency === item.key).key;

            // this.Property = this.wargearList.filter(item => PropertyMap.includes(item.key))//.map(item => item.key);
            this.Property = weapon.runes.property ? [...weapon.runes.property] : [];
            this.localProperty = weapon.runes.property ? [...weapon.runes.property] : [];

            this.editItem = {
                name: gear.name || '',
                description: gear.description || '',
                level: gear.level?.value || 0,
                group: gear.group || null,

                // вложенные поля
                bulk: gear.bulk?.value ?? 0,
            };
            this.Weapon = gear;
            this.$nextTick(() => {
                if (this.editor) {
                    this.editor.destroy()
                }

                this.editor = new Editor({
                    extensions: [StarterKit, ActionIcon],
                    content: this.editItem.description || '',
                    onUpdate: ({ editor }) => {
                        this.editItem.description = editor.getHTML()
                    },
                })
            })
        },
        saveWeapon() {
            this.alert = false;
            const weapon = this.Striking;
            const runeStriking = this.weaponRuneStriking.find(item => weapon === item.key).addDice;
            const PropertyMap = this.Property;
            const Property = this.wargearList.filter(item => PropertyMap.includes(item.key)).map(item => item.key);
            const weaponDamage = this.wargearList.find(t => t.key === this.Weapon.key).damage.dice;

            const die = this.wargearList.find(t => t.key === this.Weapon.key).damage.die;
            const dice = weaponDamage + runeStriking + die;//(parseInt(weaponDamage.slice(0, 1)) + runeStriking) + weaponDamage.slice(1, 4);

            const updatedGear = {
                ...this.Weapon,
                ...this.editItem,
                runeWeapon: {
                    striking: this.Striking,
                    potency: this.Potency,
                    property: this.Property,
                },
                bulk: {
                    ...(this.Weapon.bulk || {}),
                    value: this.editItem.bulk || this.Weapon.bulk.value
                },
                level: {
                    ...(this.Weapon.level || {}),
                    value: this.editItem.level || this.Weapon.level.value
                },
                damage: dice,

            };




            if (this.PotencyCap(this.Potency) < this.Property.length) {
                this.alert = true;
                // console.warn(`Skill ${skill.name} already exists.`);
            }
            else {
                this.$store.commit('characters/updateCharacterWargear', {
                    id: this.characterId,
                    gear: updatedGear,
                });

                this.weaponEditorDialog = false;
            }
        },
        PotencyCap(potency) {

            const mod = this.weaponRunePotency.find(item => potency === item.key).addItemBonus;
            return mod;
        },
        StrikeItem(item) {
            if (!item) return "None"
            if (item.key === 0) return "None"
            else
                return this.wargearList.find((i) => i.key === item.slug)

        },
        PropertyItem(item) {
            if (!item) return "None"
            if (item.key === 0) return "None"
            else
                return this.wargearList.find((i) => i.key === item.key)

        },
        wargearPrice(item) {
            if (item && item.price) {
                const pp = item.price.value.pp ? item.price.value.pp + " пм" : "";
                const gp = item.price.value.gp ? item.price.value.gp + " зм" : "";
                const sp = item.price.value.sp ? item.price.value.sp + " см" : "";
                const cp = item.price.value.cp ? item.price.value.cp + " мм" : "";
                return pp + gp + sp + cp;
            }
        },
        insertAction(type) {
            if (!this.editor) return

            this.editor.chain().focus().insertActionIcon(type).run()
        }
    }
}
</script>

<style>
/* ===== TABLE ===== */
.ui-table {
    background: var(--ui-surface);
    border-radius: var(--ui-radius);
    border: 1px solid var(--ui-border);
}

.ui-table tbody tr:hover {
    background: var(--ui-hover);
}

/* ===== BUTTONS ===== */
.ui-btn--ghost {
    color: var(--ui-text);
}

.ui-btn--danger {
    color: var(--ui-danger);
}

.ui-btn--success {
    background: var(--ui-success);
    color: white;
}

/* ===== QTY CONTROL ===== */
.qty-control {
    display: flex;
    align-items: center;
    gap: 6px;
}

.qty-value {
    min-width: 24px;
    text-align: center;
}

/* ===== CARD ===== */
.ui-card {
    background: var(--ui-surface);
    border-radius: var(--ui-radius-lg);
    border: 1px solid var(--ui-border);
}

/* ===== HEADER ===== */
.ui-dialog-header {
    background: var(--ui-surface-soft);
    border-bottom: 1px solid var(--ui-border);
}

/* ===== EDITOR ===== */
.editor-block {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.ui-label {
    font-size: 12px;
    color: var(--ui-muted);
}

/* ===== TOOLBAR ===== */
.tiptap-toolbar {
    display: flex;
    gap: 6px;
    padding: 6px;

    background: var(--ui-surface-soft);
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
}

/* ===== EDITOR FIELD ===== */
.tiptap-editor {
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    padding: 10px;
    min-height: 120px;

    background: var(--ui-surface);
    color: var(--ui-text);
}

.tiptap-editor:focus-within {
    border-color: var(--ui-accent);
    box-shadow: 0 0 0 2px var(--ui-focus);
}

/* ===== PROSEMIRROR ===== */
.ProseMirror {
    outline: none;
    line-height: 1.5;
}

.ProseMirror p {
    margin: 0 0 6px;
}
</style>
