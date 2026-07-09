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
                        item.trait.includes("быстрое")
                            ? attackModifier(item) - 4
                            : attackModifier(item) - 5
                    }}
                    /
                    {{
                        item.trait.includes("быстрое")
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

                <wargear-search v-if="wargearList" @cancel="WeaponSearchDialog = false" @custom-item="openCreateWeapon"
                    :repository="wargearList.filter(i => i.type === 'weapon')" type="weapon" @select="add" />

            </v-card>
        </v-dialog>


        <!-- EDITOR DIALOG -->
        <v-dialog v-model="weaponEditorDialog" width="700px" :fullscreen="$vuetify.breakpoint.smAndDown">
            <v-card class="ui-card">

                <!-- HEADER -->
                <v-card-title class="ui-dialog-header">
                    {{ editorMode === 'edit' ? 'Редактирование оружия' : 'Создание оружия' }}
                    <v-spacer />
                    <v-icon @click="weaponEditorDialog = false">close</v-icon>
                </v-card-title>

                <!-- CONTENT -->
                <v-card-text>
                    <v-row dense>

                        <v-col v-for="field in fields" :key="field.key" :cols="12"
                            :md="field.type === 'editor' ? 12 : 6">
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
                                    <v-col cols="12" md="6">
                                        <v-text-field v-model.number="editItem[field.key].value" label="HP" dense
                                            outlined hide-details="auto" />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-text-field v-model.number="editItem[field.key].max" label="Макс." dense
                                            outlined hide-details="auto" />
                                    </v-col>
                                </v-row>

                                <v-row v-else-if="field.type === 'damageOrig' && editItem[field.key]" dense>

                                    <v-col cols="12" md="6">
                                        <v-text-field v-model.number="editItem[field.key].dice" label="Урон" dense
                                            outlined hide-details="auto" />
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-select v-model.number="editItem[field.key].die" :items="dieOptions"
                                            :item-text="dieOptions.name || 'name'"
                                            :item-value="dieOptions.value || 'value'" label="Кость" dense outlined
                                            hide-details="auto" />
                                    </v-col>

                                    <v-col cols="12" md="6">
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
                                <div v-else-if="field.type === 'material' && editItem[field.key]">
                                    <v-select v-model="editItem[field.key].type" :items="materialRepository"
                                        item-text="name" item-value="key" label="Материал" dense outlined
                                        hide-details="auto" class="mb-3" />

                                    <v-select v-model="editItem[field.key].grade" :items="materialGradeRepository.filter(g =>
                                        getAvailableGrades(editItem[field.key].type).includes(g.key)
                                    )" item-text="name" item-value="key" label="Качество" dense outlined
                                        hide-details="auto" />
                                </div>

                                <!-- EDITOR -->
                                <div v-else-if="field.type === 'editor'">

                                    <div class="tiptap-toolbar mb-2">
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn small icon v-bind="attrs" v-on="on">
                                                    <img src="/img/icon/action_single.png"
                                                        :class="{ 'invert-icon': !$vuetify.theme.isDark }" />
                                                </v-btn>
                                            </template>

                                            <v-list dense>
                                                <v-list-item @click="insertAction1('1')">
                                                    <img src="/img/icon/action_single.png"
                                                        :class="{ 'invert-icon': !$vuetify.theme.isDark }" />
                                                </v-list-item>

                                                <v-list-item @click="insertAction1('2')">
                                                    <img src="/img/icon/action_double.png"
                                                        :class="{ 'invert-icon': !$vuetify.theme.isDark }" />
                                                </v-list-item>

                                                <v-list-item @click="insertAction1('3')">
                                                    <img src="/img/icon/action_triple.png"
                                                        :class="{ 'invert-icon': !$vuetify.theme.isDark }" />
                                                </v-list-item>

                                                <v-divider />

                                                <v-list-item @click="insertAction1('reaction')">
                                                    <img src="/img/icon/action_reaction.png"
                                                        :class="{ 'invert-icon': !$vuetify.theme.isDark }" />
                                                </v-list-item>

                                                <v-list-item @click="insertAction1('free')">
                                                    <img src="/img/icon/action_free.png"
                                                        :class="{ 'invert-icon': !$vuetify.theme.isDark }" />
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

                                    <EditorContent :editor="editor" class="tiptap-editor"
                                        :class="{ 'light-editor': !$vuetify.theme.isDark }" />
                                </div>

                                <!-- STRING -->
                                <v-text-field v-else v-model="editItem[field.key]" :label="field.label" dense outlined
                                    hide-details="auto" />

                            </v-card>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-card outlined class="pa-3 fill-height">
                                <div class="subtitle-2 font-weight-medium mb-3">
                                    Руна Разящая
                                </div>

                                <RuneSelector v-model="localStriking" :runes="Striking" title="Выбрать руну">
                                    <template #preview="{ rune }">
                                        <CardItem :item="StrikeItem(rune)" :wargearPrice="wargearPrice" />
                                    </template>
                                </RuneSelector>
                            </v-card>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-card outlined class="pa-3 fill-height">
                                <div class="subtitle-2 font-weight-medium mb-3">
                                    Руна Мощи
                                </div>

                                <RuneSelector v-model="localPotency" :runes="Potency" title="Выбрать руну">
                                    <template #preview="{ rune }">
                                        <CardItem :item="StrikeItem(rune)" :wargearPrice="wargearPrice" />
                                    </template>
                                </RuneSelector>
                            </v-card>
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-card outlined class="pa-3 fill-height">
                                <div class="subtitle-2 font-weight-medium mb-3">
                                    Руны свойств
                                </div>

                                <RuneSelector v-model="localProperty" :runes="Property" :multiple="true"
                                    title="Выбрать руны">
                                    <template #preview="{ rune }">
                                        <CardItem :item="StrikeItem(rune)" :wargearPrice="wargearPrice" />
                                    </template>
                                </RuneSelector>
                            </v-card>
                        </v-col>

                    </v-row>
                </v-card-text>
                <!-- ACTIONS -->
                <v-card-actions class="pa-4">
                    <v-btn block class="ui-btn ui-btn--success" @click="saveWeapon">
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

import { KeepAlive } from 'vue';
import { ActionIcon } from '~/components/forge/ActionIcon';

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
            RuneNone: {
                "name": "Нет руны",
                "rules": [],
                "level": {
                    "value": 0
                },
                "sourceKey": "GMCore",
                "baseItem": null,
                "bulk": {
                    "value": 0
                },
                "hardness": 0,
                "price": {
                    "value": {
                        "gp": 0
                    }
                },
                "material": {
                    "type": null,
                    "grade": null
                },
                "usage": {
                    "value": "etched-onto-a-weapon"
                },
                "grade": null,
                "traits": ["магический"],
                "group": null,
                "bonusDamage": null,
                "rarity": "common",
                "splashDamage": null,
                "damage": null,
                "reload": null,
                "range": null,
                "expend": null,
                "description": "Убрать руну с оружия",
                "category": null,
                "key": "none",
                "hp": {
                    "value": 0,
                    "max": 0
                },
                "type": "gear",
                "equipped": {
                    "carryType": "worn",
                    "invest": null
                },
                "runes": null,
                "specific": null
            },
            localProperty: [], // выбранные ключи
            selectedRune: null, // последняя кликнутая руна
            localStriking: undefined, // временное значение для диалога
            localPotency: undefined,
            editorMode: 'edit', // 👈 NEW: 'create' | 'edit'
            dieOptions: [
                { name: "d4", value: "d4" },
                { name: "d6", value: "d6" },
                { name: "d8", value: "d8" },
                { name: "d10", value: "d10" },
                { name: "d12", value: "d12" }
            ],


            fields: [


                { key: 'name', type: 'string', label: 'Имя предмета' },
                { key: 'bulk', type: 'number', label: 'Нагрузка', hint: "0.1 в поле = 1Л" },

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
                    key: 'material',
                    type: 'material',
                    label: 'Материал',
                    items: 'materialRepository',
                    itemText: 'name',
                    itemValue: 'key',


                },
                {
                    key: 'damageOrig',
                    type: 'damageOrig',
                    label: 'Базовый урон оружия',
                    items: 'materialRepository',
                    itemText: 'name',
                    itemValue: 'key',


                },
                { key: 'range', type: 'number', label: 'Дистанция' },
                { key: 'reload', type: 'string', label: 'Перезарядка' },

                {
                    key: 'usage',
                    type: 'select',
                    label: 'Использование',
                    items: 'weaponUsageOptions',
                    itemText: 'name',
                    itemValue: 'key'
                },

                // { key: 'hardness', type: 'number', label: 'Твёрдость' },


                // {
                //     key: "material.grade",
                //     type: "material1",
                //     label: "Качество",
                //     items: "materialGradeRepository",
                //     itemText: "name",
                //     itemValue: "key"
                // },


                {
                    key: 'group',
                    type: 'select',
                    label: 'Группа',
                    items: 'weaponGroup',
                    itemText: 'name',
                    itemValue: 'group',
                    multiple: true,
                },
                {
                    key: 'category',
                    type: 'select',
                    label: 'Категория',
                    items: 'weaponCategoryRepository',
                    itemText: 'name',
                    itemValue: 'category',
                    multiple: true,
                },
                {
                    key: 'rarity',
                    type: 'select',
                    label: 'Редкость',
                    itemText: 'name',
                    itemValue: 'key',
                    items: 'rarityRepository'
                },
                {
                    key: 'trait',
                    type: 'autoselect',
                    label: 'Свойства',
                    items: 'traitList',
                    itemText: 'key',
                    itemValue: 'key',
                    multiple: true,
                },
                { key: 'description', type: 'editor', label: 'Описание' },
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
        traitList: Array,
        isEquipped: Function,
        attackModifier: Function,
        damageModifier: Function,
        characterId: {
            type: String,
            required: true
        },
    },
    mounted() {
        console.log(this.$vuetify)
    },
    watch: {
        "editItem.material.type"(newType) {
            const allowed = this.getAvailableGrades(newType);

            if (!allowed.includes(this.editItem.material.grade)) {
                this.editItem.material.grade = null;
            }
        }
    },
    computed: {
        weaponUsageOptions() {
            return Object.entries(this.WornGear)
                .filter(([key]) => key.includes('held'))
                .map(([key, name]) => ({
                    key,
                    name
                }));
        }
    },
    methods: {
        remove(gear) {
            this.$store.commit('characters/unwearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
            this.$store.commit('characters/removeCharacterWargear', { id: this.characterId, gearId: gear.id });
            this.$store.commit("characters/clearCharactermodificatorsBonusbySource", {
                id: this.characterId,
                source: gear.key,
            });
        },
        insertAction1(type) {
            if (!this.editor) return

            this.editor.chain().focus().insertActionIcon(type).run()
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
            this.editorMode = 'edit';

            this.Striking = this.wargearList
                .filter(item => item.usage?.value)
                .filter(item =>
                    item.name.toLowerCase().includes("руна") &&
                    item.usage.value.toLowerCase().includes("etched-onto") &&
                    item.usage.value.toLowerCase().includes("weapon")
                )
                .filter(item =>
                    item.name.toLowerCase().includes("разящая")
                )
                .map(item => ({
                    ...item,
                    type: "gear"
                }));

            this.Striking = [...this.Striking,
            this.RuneNone
            ]
            this.localStriking = this.weaponRuneStriking.find(item => weapon.runes.striking === item.key).slug;

            this.Potency = this.wargearList
                .filter(item => item.usage?.value)
                .filter(item =>
                    item.name.toLowerCase().includes("руна") &&
                    item.usage.value.toLowerCase().includes("etched-onto") &&
                    item.usage.value.toLowerCase().includes("weapon")
                )
                .filter(item =>
                    item.name.toLowerCase().includes("мощи")

                )
                .map(item => ({
                    ...item,
                    type: "gear"
                }));
            this.localPotency = this.weaponRunePotency.find(item => weapon.runes.potency === item.key).slug;

            this.Property = this.wargearList
                .filter(item => item.usage?.value)
                .filter(item =>
                    item.name.toLowerCase().includes("руна") &&
                    item.usage.value.toLowerCase().includes("etched-onto") &&
                    item.usage.value.toLowerCase().includes("weapon")
                )
                .filter(item =>
                    !item.name.toLowerCase().includes("мощи") &&
                    !item.name.toLowerCase().includes("упрочнения") &&
                    !item.name.toLowerCase().includes("разящая")
                )
                .map(item => ({
                    ...item,
                    type: "gear"
                }));

            this.localProperty = weapon.runes.property ? [...weapon.runes.property] : [];

            this.editItem = {
                ...gear,
                name: gear.name || '',
                description: gear.description || '',
                level: gear.level?.value || 0,
                group: gear.group || null,
                category: gear.category || null,
                rarity: gear.rarity || null,
                trait: gear.trait || [],

                hardness: gear.hardness || 0,


                usage: gear.usage.value || null,
                // вложенные поля
                bulk: gear.bulk?.value ?? 0,
                price: {
                    pp: gear.price?.value?.pp ?? 0,
                    gp: gear.price?.value?.gp ?? 0,
                    sp: gear.price?.value?.sp ?? 0,
                    cp: gear.price?.value?.cp ?? 0,
                },

                hp: {
                    value: gear.hp?.value ?? 0,
                    max: gear.hp?.max ?? 0,
                },
                "reload":
                    gear.reload.value,
                damageOrig: {
                    die: gear.damageOrig?.die ?? 0,
                    dice: gear.damageOrig?.dice ?? "d4",
                    damageType: gear.damageOrig?.damageType ?? "slashing",
                },
                material: {
                    type: gear.material?.type ?? null,
                    grade: gear.material?.grade ?? null,
                }
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
        openCreateWeapon() {
            this.editorMode = 'create';

            this.weaponEditorDialog = true;

            this.Weapon = {
                name: "",

                rules: [],

                level: {
                    value: 0
                },

                sourceKey: "Custom",

                baseItem: null,

                bulk: {
                    value: 0
                },

                hardness: 0,

                price: {
                    value: {
                        pp: 0,
                        gp: 0,
                        sp: 0,
                        cp: 0
                    }
                },

                material: {
                    type: null,
                    grade: null
                },

                usage: {
                    value: null
                },

                grade: null,

                traits: [],

                group: null,

                bonusDamage: {
                    value: 0
                },

                rarity: "common",

                splashDamage: {
                    value: 0
                },

                damage: {
                    dice: 1,
                    die: "d4",

                    damageType: "slashing",
                    persistent: null
                },

                reload: {
                    value: null
                },

                range: null,

                expend: null,

                description: "",

                category: null,


                hp: {
                    value: 0,
                    max: 0
                },

                type: "weapon",

                equipped: {
                    carryType: "worn",
                    invest: null,
                    handsHeld: 0
                },

                runes: {
                    potency: 0,
                    striking: 0,
                    property: []
                },
                damageOrig: {
                    dice: 1,
                    die: "d4",
                    damageType: "slashing",
                    persistent: null
                },
                qty: 1,
                specific: {
                    material: {
                        type: null,
                        grade: null
                    },
                    runes: {
                        potency: 0,
                        striking: 0,
                        property: []
                    }
                }
            };

            const weapon = this.Weapon
            const talentUniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
            this.editItem = {
                key: talentUniqueId,
                name: '',
                description: '',
                level: 1,
                type: "weapon",
                group: null,
                category: null,
                rarity: null,
                trait: [],
                hardness: 0,
                usage: null,
                bulk: 0,
                "reload": "0",
                "range": 100,
                price: { pp: 0, gp: 0, sp: 0, cp: 0 },
                hp: { value: 0, max: 0 },
                material: { type: null, grade: null },
                "runes": {
                    "potency": 0,
                    "striking": 0,
                    "property": []
                },
                damageOrig: {
                    dice: 1,
                    die: "d4",
                    damageType: "slashing",
                    persistent: null
                },
            };

            this.Striking = this.wargearList
                .filter(item => item.usage?.value)
                .filter(item =>
                    item.name.toLowerCase().includes("руна") &&
                    item.usage.value.toLowerCase().includes("etched-onto") &&
                    item.usage.value.toLowerCase().includes("weapon")
                )
                .filter(item =>
                    item.name.toLowerCase().includes("разящая")
                )
                .map(item => ({
                    ...item,
                    type: "gear"
                }));

            this.Striking = [...this.Striking,
            this.RuneNone
            ]
            this.localStriking = this.weaponRuneStriking.find(item => weapon.runes.striking === item.key).slug;

            this.Potency = this.wargearList
                .filter(item => item.usage?.value)
                .filter(item =>
                    item.name.toLowerCase().includes("руна") &&
                    item.usage.value.toLowerCase().includes("etched-onto") &&
                    item.usage.value.toLowerCase().includes("weapon")
                )
                .filter(item =>
                    item.name.toLowerCase().includes("мощи")

                )
                .map(item => ({
                    ...item,
                    type: "gear"
                }));
            this.localPotency = this.weaponRunePotency.find(item => weapon.runes.potency === item.key).slug;

            this.Property = this.wargearList
                .filter(item => item.usage?.value)
                .filter(item =>
                    item.name.toLowerCase().includes("руна") &&
                    item.usage.value.toLowerCase().includes("etched-onto") &&
                    item.usage.value.toLowerCase().includes("weapon")
                )
                .filter(item =>
                    !item.name.toLowerCase().includes("мощи") &&
                    !item.name.toLowerCase().includes("упрочнения") &&
                    !item.name.toLowerCase().includes("разящая")
                )
                .map(item => ({
                    ...item,
                    type: "gear"
                }));

            this.localProperty = weapon.runes.property ? [...weapon.runes.property] : [];

            this.$nextTick(() => {
                if (this.editor) this.editor.destroy();

                this.editor = new Editor({
                    extensions: [StarterKit, ActionIcon],
                    content: '',
                    onUpdate: ({ editor }) => {
                        this.editItem.description = editor.getHTML();
                    },
                });
            });
        },
        saveWeapon() {
            this.alert = false;
            const str = this.weaponRuneStriking.find(item => this.localStriking === item.slug).key;
            const ptl = this.weaponRunePotency.find(item => this.localPotency === item.slug).key;

            this.WeaponSearchDialog = false;

            const runeStriking = this.localStriking !== "" ? this.weaponRuneStriking.find(item => this.localStriking === item.slug).addDice : 0;
            const PropertyMap = this.Property;
            const Property = this.localProperty;
            const weaponDamage = this.editItem.damageOrig.dice;

            const die = this.editItem.damageOrig.die;
            const dice = weaponDamage + runeStriking + die;//(parseInt(weaponDamage.slice(0, 1)) + runeStriking) + weaponDamage.slice(1, 4);

            const updatedGear = {
                ...this.Weapon,
                ...this.editItem,
                runeWeapon: {
                    striking: str,
                    potency: ptl,
                    property: this.localProperty,
                },
                bulk: {
                    ...(this.Weapon.bulk || {}),
                    value: this.editItem.bulk || this.Weapon.bulk.value
                },
                level: {
                    ...(this.Weapon.level || {}),
                    value: this.editItem.level || this.Weapon.level.value
                },
                price: {
                    value:
                        this.editItem.price

                },
                usage: {
                    value:
                        this.editItem.usage

                },
                damageOrig: {
                    ...this.Weapon.damageOrig,
                    dice: this.editItem.damageOrig.dice,
                    die: this.editItem.damageOrig.die,
                    damageType: this.editItem.damageOrig.damageType,
                },
                "reload": {
                    "value": this.editItem.reload
                },
                damage: dice,
                runes: {
                    "potency": ptl,
                    "striking": str,
                    "property": this.localProperty
                },

            };


            if (this.editorMode === 'edit') {
                this.$store.commit('characters/updateCharacterWargear', {
                    id: this.characterId,
                    gear: updatedGear,
                });
            }

            if (this.editorMode === 'create') {
                this.$store.commit('characters/addCharacterWargear', {
                    id: this.characterId,
                    name: updatedGear.name,
                    source: 'custom',
                    gear: updatedGear
                });
            }
            this.weaponEditorDialog = false;

            // if (this.PotencyCap(this.Potency) < this.Property.length) {
            //     this.alert = true;
            //     // console.warn(`Skill ${skill.name} already exists.`);
            // }
            // else {
            //     this.$store.commit('characters/updateCharacterWargear', {
            //         id: this.characterId,
            //         gear: updatedGear,
            //     });

            //     this.weaponEditorDialog = false;
            // }
        },
        getAvailableGrades(materialKey) {
            const material = this.materialRepository.find(
                m => m.key === materialKey
            );

            return material?.grades || [];
        },
        PotencyCap(potency) {

            const mod = this.weaponRunePotency.find(item => potency === item.key).addItemBonus;
            return mod;
        },
        StrikeItem(item) {
            if (!item) return "None"
            if (item.key === "none")
                return this.RuneNone
            else
                return this.wargearList.find((i) => i.key === item.key)

        },
        PropertyItem(item) {
            if (!item) return "None"
            if (item.key === 0) return "None"
            else
                return this.wargearList.find((i) => i.key === item.key)

        },
        wargearPrice(item) {
            if (item && item.price) {
                const pp = item.price.value.pp ? item.price.value.pp + " пм " : "";
                const gp = item.price.value.gp ? item.price.value.gp + " зм " : "";
                const sp = item.price.value.sp ? item.price.value.sp + " см " : "";
                const cp = item.price.value.cp ? item.price.value.cp + " мм " : "";
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
    flex-wrap: wrap;
    gap: 4px;
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
    filter: invert(1);
}

.light-editor .ProseMirror img.action-icon {
    filter: invert(1);
}

@media (max-width:600px) {

    .fill-height {
        height: auto !important;
    }

}

.ui-btn {


    border-radius: 10px !important;


    text-transform: none !important;


}

@media(max-width:600px) {

    .tiptap-editor {

        min-height: 220px;

    }

}
</style>
