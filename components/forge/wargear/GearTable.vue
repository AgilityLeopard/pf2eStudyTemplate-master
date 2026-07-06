<template>
    <div>

        <v-row class="mb-2 align-center">

            <!-- Вес -->
            <v-col cols="12" md="4">
                <div class="badge">
                    Инвестировано: {{ investPool }} / 10
                </div>
            </v-col>


        </v-row>

        <v-btn class="ui-btn ui-btn--success mt-2" block @click="GearSearchDialog = true">

            Добавить снаряжение
        </v-btn>

        <div v-for="group in groupedGear" :key="group.header" class="gear-section">
            <!-- <v-subheader>{{ Worn(group.header) }}</v-subheader> -->

            <div class="gear-section-header">
                <v-icon small class="mr-2">mdi-shield-outline</v-icon>
                {{ Worn(group.header) }}
            </div>
            <div class="table-container">
                <v-data-table :headers="headersGear" :items="group.items" class="gear-section-table fixed-columns-table"
                    hide-default-footer item-key="id">
                    <template v-slot:no-data> Нет предметов </template>

                    <template v-slot:item.nameGear="{ item }">
                        <!-- <v-row> -->
                        <span>{{ item.name }}</span>
                        <!-- </v-row>
                <v-row>
                  <div>
                    <trait-view v-if="item.traits" :item="item" class="mb-2" />
                  </div>
                </v-row> -->
                    </template>

                    <template v-slot:item.qty="{ item }">
                        <span>
                            <v-btn icon :disabled="item.qty === 1" @click="decrementQty(item)">
                                <v-icon color="red"> remove_circle </v-icon>
                            </v-btn>
                            {{ item.qty }}
                            <v-btn icon @click="incrementQty(item)">
                                <!--"-->
                                <v-icon color="orange"> add_circle </v-icon>
                            </v-btn>
                        </span>
                    </template>

                    <template v-slot:item.equip="{ item }">
                        <v-btn x-small :color="item.equip ? 'success' : 'grey'" :outlined="!item.equip"
                            @click="equip(item)">
                            <v-icon left small>
                                {{ item.equip ? 'mdi-shield-check' : 'mdi-shield-outline' }}
                            </v-icon>

                            {{ item.equip ? 'Экипировано' : 'Не экипировано' }}
                        </v-btn>
                    </template>

                    <template v-slot:item.invest="{ item }">
                        <v-btn v-if="item.equipped?.invest !== undefined && item.trait.find(s => s.includes('вестиру'))"
                            x-small :color="item.equipped.invest ? 'success' : 'grey'" :outlined="!item.equipped.invest"
                            @click="invest(item)">
                            <v-icon left small>
                                {{ item.equipped.invest ? 'mdi-shield-check' : 'mdi-shield-outline' }}
                            </v-icon>

                            {{ item.equipped.invest ? 'Инвестировано' : 'Не инвестировано' }}
                        </v-btn>
                    </template>

                    <template v-slot:item.edit="{ item }">
                        <v-btn outlined x-small color="error" @click="remove(item)">
                            <v-icon left> delete </v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:item.delete="{ item }">
                        <v-btn small text class="ui-btn--ghost" @click="openGearSettings(item)">
                            <v-icon small left>edit</v-icon>
                        </v-btn>
                    </template>

                    <!-- view -->
                    <template v-slot:item.view="{ item }">
                        <v-btn outlined x-small color="info" @click="$emit('view', item)">
                            <v-icon left>visibility</v-icon> Просмотр
                        </v-btn>
                    </template>


                </v-data-table>
            </div>
        </div>

        <v-dialog v-model="GearSearchDialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="1400px" scrollable>
            <v-col :cols="12" v-if="wargearList">
                <v-alert v-if="alertMoney" type="error" dense text border="left">
                    У вас недостаточно денег на покупку
                </v-alert>


                <wargear-search @custom-item="openCreateGear" @cancel="GearSearchDialog = false" type="other"
                    :repository="wargearList.filter(
                        (item) =>
                            !['consumable', 'weapon', 'armor', 'shield'].includes(
                                item.type
                            )
                    )
                        " @select="add" />
            </v-col>
        </v-dialog>

        <!-- EDITOR DIALOG -->
        <v-dialog v-model="weaponEditorDialog" width="700px">
            <v-card class="ui-card">

                <!-- HEADER -->
                <v-card-title class="ui-dialog-header">
                    {{ dialogType === "create"
                        ? "Создание предмета"
                        : "Редактирование предмета" }}
                    <v-spacer />
                    <v-icon @click="weaponEditorDialog = false">close</v-icon>
                </v-card-title>

                <!-- CONTENT -->
                <v-card-text>
                    <v-row dense>

                        <v-col v-for="field in fields" :key="field.key" :cols="field.type === 'editor' ? 12 : 6">
                            <v-card outlined class="pa-3 fill-height">

                                <!-- Заголовок только для составных полей -->
                                <div v-if="['hp', 'price', 'material', 'editor', 'damageOrig'].includes(field.type)"
                                    class="subtitle-2 font-weight-medium mb-3">
                                    {{ field.label }}
                                </div>

                                <!-- SELECT -->
                                <v-select v-if="field.type === 'select'" v-model="editItem[field.key]"
                                    :items="getItems(field)" :item-text="field.itemText || 'name'"
                                    :item-value="field.itemValue || 'value'" :label="field.label" dense outlined
                                    hide-details="auto" />

                                <!-- AUTOSELECT -->
                                <v-autocomplete v-else-if="field.type === 'autoselect'" v-model="editItem[field.key]"
                                    :items="getItems(field)" :item-text="field.itemText || 'name'"
                                    :item-value="field.itemValue || 'value'" :label="field.label" multiple chips
                                    deletable-chips clearable dense outlined hide-details="auto" />

                                <!-- NUMBER -->
                                <v-text-field v-else-if="field.type === 'number'" v-model.number="editItem[field.key]"
                                    :label="field.label" :hint="field.hint" :persistent-hint="!!field.hint"
                                    type="number" dense outlined hide-details="auto" />

                                <!-- HP -->
                                <v-row v-else-if="field.type === 'hp' && editItem[field.key]" dense>
                                    <v-col cols="6">
                                        <v-text-field v-model.number="editItem[field.key].value" label="HP" dense
                                            outlined hide-details="auto" />
                                    </v-col>

                                    <v-col cols="6">
                                        <v-text-field v-model.number="editItem[field.key].max" label="Макс." dense
                                            outlined hide-details="auto" />
                                    </v-col>
                                </v-row>

                                <v-row v-else-if="field.type === 'damageOrig' && editItem[field.key]" dense>

                                    <v-col cols="6">
                                        <v-text-field v-model.number="editItem[field.key].dice" label="Урон" dense
                                            outlined hide-details="auto" />
                                    </v-col>

                                    <v-col cols="6">
                                        <v-select v-model.number="editItem[field.key].die" :items="dieOptions"
                                            :item-text="dieOptions.name || 'name'"
                                            :item-value="dieOptions.value || 'value'" label="Кость" dense outlined
                                            hide-details="auto" />
                                    </v-col>

                                    <v-col cols="6">
                                        <v-select v-model="editItem[field.key].damageType" :items="DamageType"
                                            item-text="name" item-value="key" label="Тип урона" dense outlined
                                            hide-details="auto" />
                                    </v-col>
                                </v-row>

                                <!-- PRICE -->
                                <v-row v-else-if="field.type === 'price' && editItem[field.key]" dense>
                                    <v-col cols="3">
                                        <v-text-field v-model.number="editItem[field.key].pp" label="ПП" dense outlined
                                            hide-details="auto" />
                                    </v-col>

                                    <v-col cols="3">
                                        <v-text-field v-model.number="editItem[field.key].gp" label="ЗМ" dense outlined
                                            hide-details="auto" />
                                    </v-col>

                                    <v-col cols="3">
                                        <v-text-field v-model.number="editItem[field.key].sp" label="СМ" dense outlined
                                            hide-details="auto" />
                                    </v-col>

                                    <v-col cols="3">
                                        <v-text-field v-model.number="editItem[field.key].cp" label="ММ" dense outlined
                                            hide-details="auto" />
                                    </v-col>
                                </v-row>

                                <!-- MATERIAL -->


                                <!-- EDITOR -->
                                <div v-else-if="field.type === 'editor'">
                                    <div class="tiptap-toolbar mb-2">

                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn small icon v-bind="attrs" v-on="on">
                                                    <img src="/img/icon/action_single.png"
                                                        :class="{ 'action-icon': !$vuetify.theme.isDark }" />
                                                </v-btn>
                                            </template>

                                            <v-list dense>
                                                <v-list-item @click="insertAction1('1')">
                                                    <img src="/img/icon/action_single.png"
                                                        :class="{ 'action-icon': !$vuetify.theme.isDark }" />
                                                </v-list-item>

                                                <v-list-item @click="insertAction1('2')">
                                                    <img src="/img/icon/action_double.png"
                                                        :class="{ 'action-icon': !$vuetify.theme.isDark }" />
                                                </v-list-item>

                                                <v-list-item @click="insertAction1('3')">
                                                    <img src="/img/icon/action_triple.png"
                                                        :class="{ 'action-icon': !$vuetify.theme.isDark }" />
                                                </v-list-item>

                                                <v-divider />

                                                <v-list-item @click="insertAction1('reaction')">
                                                    <img src="/img/icon/action_reaction.png"
                                                        :class="{ 'action-icon': !$vuetify.theme.isDark }" />
                                                </v-list-item>

                                                <v-list-item @click="insertAction1('free')">
                                                    <img src="/img/icon/action_free.png"
                                                        :class="{ 'action-icon': !$vuetify.theme.isDark }" />
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>


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

                                    <EditorContent :editor="editor" class="tiptap-editor" />
                                </div>

                                <!-- STRING -->
                                <v-text-field v-else v-model="editItem[field.key]" :label="field.label" dense outlined
                                    hide-details="auto" />

                            </v-card>
                        </v-col>


                    </v-row>
                </v-card-text>
                <!-- ACTIONS -->
                <v-card-actions>
                    <v-spacer />
                    <v-btn class="ui-btn ui-btn--success" @click="saveGear">
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
import CardItem from '../../CardItem.vue';

import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

import { KeepAlive } from 'vue';
import { ActionIcon } from '../ActionIcon.js';


export default {
    components: {
        CardItem,
        WargearSearch,
        EditorContent
    },
    mixins: [
        WargearTrait,
        WargearMixin,
        StatRepositoryMixin
    ],
    data() {
        return {
            GearSearchDialog: false,
            alertMoney: false,
            dialogType: "create", // create | edit
            weaponEditorDialog: false,
            Gear: null,
            editor: null,   // 👈 сюда
            editItem: {},
            fields: [
                { key: 'name', type: 'string', label: 'Название' },

                { key: 'bulk', type: 'number', label: 'Нагрузка' },

                { key: 'level', type: 'number', label: 'Уровень' },

                {
                    key: 'hp',
                    type: 'hp',
                    label: 'Прочность'
                },

                {
                    key: 'price',
                    type: 'price',
                    label: 'Цена'
                },



                {
                    key: 'usage',
                    type: 'select',
                    label: 'Использование',
                    items: 'weaponUsageOptions',
                    itemText: 'name',
                    itemValue: 'key'
                },

                {
                    key: 'rarity',
                    type: 'select',
                    label: 'Редкость',
                    items: 'rarityRepository',
                    itemText: 'name',
                    itemValue: 'key'
                },

                {
                    key: 'trait',
                    type: 'autoselect',
                    label: 'Свойства',
                    items: 'traitList',
                    itemText: 'key',
                    itemValue: 'key'
                },

                {
                    key: 'description',
                    type: 'editor',
                    label: 'Описание'
                }
            ],
            headersGear: [
                {
                    text: 'Название',
                    value: 'nameGear',
                    align: 'left',
                    class: 'text-left',
                    width: '250px',
                },
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
                    text: 'Экипировать',
                    value: 'equip',
                    align: 'center',
                    class: 'text-center',
                    width: '60px',
                },
                {
                    text: 'Инвестировать',
                    value: 'invest',
                    align: 'center',
                    class: 'text-center',
                    width: '60px',
                },
                { text: 'Просмотр', value: 'view', sortable: false },
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
    extensions: [
        StarterKit,
    ],
    beforeDestroy() {
        if (this.editor) this.editor.destroy()
    },
    props: {
        items: Array,
        headers: Array,
        wargearList: Array,
        traitList: Array,


        characterId: {
            type: String,
            required: true
        },
    },
    computed: {
        groupedGear() {
            const groups = {};
            this.items.forEach(item => {
                const type = item.usage.value || "Прочее";
                if (!groups[type]) groups[type] = [];
                groups[type].push(item);
            });
            return Object.entries(groups).map(([type, items]) => ({
                header: type,
                items
            }));
        },
        charGear() {
            return this.$store.getters['characters/characterWargearById'](this.characterId);
        },
        investPool() {
            return this.charGear.filter(
                item => item.equipped?.invest === true
            ).length
        },
        weaponUsageOptions() {
            return Object.entries(this.WornGear)
                .filter(([key]) => key.includes('worn'))
                .map(([key, name]) => ({
                    key,
                    name
                }));
        }

    },
    methods: {
        openGearSettings(gear) {
            this.weaponEditorDialog = true;
            this.dialogType = "edit";
            this.Gear = gear;

            this.editItem = {

                name: gear.name,

                bulk: gear.bulk.value,

                level: gear.level.value,

                rarity: gear.rarity,

                trait: [...gear.trait],

                description: gear.description,

                usage: gear.usage?.value ?? null,

                hp: {
                    value: gear.hp.value,
                    max: gear.hp.max
                },

                price: {
                    pp: gear.price.value.pp ?? 0,
                    gp: gear.price.value.gp ?? 0,
                    sp: gear.price.value.sp ?? 0,
                    cp: gear.price.value.cp ?? 0,
                },

                material: {
                    type: gear.material.type,
                    grade: gear.material.grade
                }

            };

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
        getItems(field) {
            if (typeof field.items === 'string') {

                return this[field.items]; // 👉 this.weaponGroup
            }
            return field.items || [];
        },
        openCreateGear() {

            this.weaponEditorDialog = true;

            this.dialogType = "create";
            this.Gear = null;

            this.editItem = {

                name: '',

                bulk: 0,

                level: 1,

                rarity: 'common',

                trait: [],

                description: '',

                usage: null,

                hp: {
                    value: 0,
                    max: 0
                },

                price: {
                    pp: 0,
                    gp: 0,
                    sp: 0,
                    cp: 0
                },

                material: {
                    type: null,
                    grade: null
                }

            };

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
        remove(gear) {
            this.$store.commit("characters/clearCharactermodificatorsBonusbySource", {
                id: this.characterId,
                source: gear.key,
            });
            this.$store.commit('characters/unwearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
            this.$store.commit('characters/removeCharacterWargear', { id: this.characterId, gearId: gear.id });
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
        equip(gear) {
            const isEquipped = !gear.equip;

            const gear1 = {
                ...gear,
                equip: isEquipped,
                equipped: {
                    ...gear.equipped,
                    invest: isEquipped
                        ? gear.equipped?.invest
                        : false
                }
            };

            this.$store.commit(
                'characters/updateCharacterWargear',
                {
                    id: this.characterId,
                    gear: gear1
                }
            );
        },
        invest(gear) {
            const gear1 = {
                ...gear,
                equipped: {
                    ...gear.equipped,
                    invest: !gear.equipped.invest
                }
            };

            if (gear1.equipped.invest) {
                gear1.equip = true;
            }
            this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, gear: gear1 });
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
        insertAction1(type) {
            if (!this.editor) return

            this.editor.chain().focus().insertActionIcon(type).run()
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

                    gear1 = { ...gear, damageOrig: gear.damage, equip: false };


                }
            }
            else {
                gear1 = { ...gear, damageOrig: gear.damage, equip: false };


            }

            const Bonus = []
            gear1.rules.forEach(item => {
                if (item.key === 'FlatModifier') {


                    Bonus.push({ ...item, source: gear1.key })
                }

            })


            this.$store.commit("characters/setCharactermodificatorsBonus", {
                id: this.characterId,
                Bonus: Bonus,
            });

            this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: gear.name, source: 'custom', gear: gear1 });
            // Закрываем окна
            this.GearSearchDialog = false;
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


        Worn(item) {
            return this.WornGear[item] ? this.WornGear[item] : 'Прочее'
        },
        saveGear() {
            this.weaponEditorDialog = false;
            this.GearSearchDialog = false;
            const gear = {

                ...(this.isCreate ? {} : this.Gear),

                ...this.editItem,

                bulk: {
                    value: this.editItem.bulk
                },

                level: {
                    value: this.editItem.level
                },

                hp: this.editItem.hp,

                usage: { value: this.editItem.usage },

                material: this.editItem.material,

                price: {
                    value: this.editItem.price
                }

            };

            if (this.dialogType === 'create') {

                gear.id = Math.random().toString(36).slice(2, 10);

                gear.key = gear.id;

                gear.type = "gear";

                gear.qty = 1;

                gear.rules = [];

                gear.source = "custom";

                gear.sourceKey = "Custom";

                gear.equipped = {
                    carryType: "worn",
                    invest: false
                };

                this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: gear.name, source: 'custom', gear: gear });

            } else {

                this.$store.commit(
                    "characters/updateCharacterWargear",
                    {
                        id: this.characterId,
                        gear
                    }
                );

            }

            this.gearEditorDialog = false;

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

.v-card {
    border-radius: 8px;
}

.fill-height {
    height: 100%;
}

.tiptap-toolbar {
    display: flex;
    gap: 4px;
    margin-bottom: 8px;
}

.rune-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.invert-icon {
    filter: invert(1) brightness(1.2);
}

.light-editor .ProseMirror img.action-icon {
    filter: invert(1);
}
</style>
