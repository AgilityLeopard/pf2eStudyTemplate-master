<template>

    <div>

        <v-btn class="ui-btn ui-btn--success mt-2" block @click="ArmorSearchDialog = true">

            Добавить доспех
        </v-btn>

        <v-data-table :headers="headersArmor" :items="items" hide-default-footer v-if="items.length">
            <!-- name -->
            <template v-slot:item.name="{ item }">
                {{ item.name }}
            </template>
            <!-- group -->
            <template v-slot:item.group="{ item }">
                <div class="text-center">
                    {{ armorGroupName(item.group) }}
                </div>
            </template>

            <!-- bulk -->
            <template v-slot:item.bulk="{ item }">
                <div class="text-center">
                    {{ item.bulk?.value === 0.1 ? 'Л' : item.bulk?.value }}
                </div>
            </template>

            <!-- category -->
            <template v-slot:item.category="{ item }">
                <div class="text-center">
                    {{ category(item.category) }}
                </div>
            </template>

            <!-- traits -->
            <template v-slot:item.traits="{ item }">
                {{ item.traits?.join(', ') }}
            </template>

            <!-- equip -->
            <template v-slot:item.equip="{ item }">
                <v-btn outlined x-small :color="item.equip ? 'info' : 'warning'" @click="toggleWear(item)">
                    <v-icon left>lock</v-icon>
                    {{ item.equip ? 'Снять' : 'Надеть' }}
                </v-btn>
            </template>

            <!-- view -->
            <template v-slot:item.view="{ item }">
                <v-btn outlined x-small color="info" @click="$emit('view', item)">
                    <v-icon left>visibility</v-icon> Просмотр
                </v-btn>
            </template>

            <!-- qty -->
            <template v-slot:item.qty="{ item }">
                <div class="d-flex align-center justify-center">
                    <v-btn icon :disabled="item.qty === 1" @click="decrementQty(item)">
                        <v-icon color="red">remove_circle</v-icon>
                    </v-btn>

                    {{ item.qty }}

                    <v-btn icon @click="incrementQty(item)">
                        <v-icon color="orange">add_circle</v-icon>
                    </v-btn>
                </div>
            </template>

            <template v-slot:item.invest="{ item }">
                <v-btn v-if="item.equipped?.invest !== undefined && item.traits?.includes('инвестируемый')" x-small
                    :color="item.equipped.invest ? 'success' : 'grey'" :outlined="!item.equipped.invest"
                    @click="invest(item)">
                    <v-icon left small>
                        {{ item.equipped.invest ? 'mdi-shield-check' : 'mdi-shield-outline' }}
                    </v-icon>

                    {{ item.equipped.invest ? 'Инвестировано' : 'Не инвестировано' }}
                </v-btn>
            </template>

            <!-- edit -->
            <template v-slot:item.edit="{ item }">
                <v-btn outlined x-small color="info" @click="openWeaponSettings(item)">
                    <v-icon left>edit</v-icon>
                </v-btn>
            </template>

            <!-- delete -->
            <template v-slot:item.delete="{ item }">
                <v-btn outlined x-small color="error" @click="remove(item)">
                    <v-icon left>delete</v-icon>
                </v-btn>
            </template>

        </v-data-table>

        <div v-else class="text-center mt-2 mb-2">
            <em>Нет доспехов? Возьми на вкладке Снаряжения!</em>
        </div>

        <v-dialog v-model="ArmorSearchDialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="1400px" scrollable>
            <v-col :cols="12" v-if="wargearList">

                <v-alert v-if="alertMoney" type="error" dense text border="left">
                    У вас недостаточно денег на покупку
                </v-alert>


                <wargear-search @cancel="ArmorSearchDialog = false" type="armor" :repository="wargearList.filter((item) =>
                    ['armor', 'shield'].includes(item.type)
                )" @select="add" />
            </v-col>
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
                        <v-col v-for="field in visibleFields" :key="field.key" :cols="field.type === 'editor' ? 12 : 6">
                            <v-card outlined class="pa-3 fill-height">

                                <!-- Заголовок только для составных полей -->
                                <div v-if="['hp', 'price', 'material', 'editor'].includes(field.type)"
                                    class="subtitle-2 font-weight-medium mb-3">
                                    {{ field.label }}
                                </div>

                                <!-- STRING -->
                                <v-text-field v-if="
                                    field.type === 'string'" v-model="editItem[field.key]" :label="field.label" dense
                                    outlined hide-details="auto" />

                                <!-- SELECT -->
                                <v-select v-else-if="field.type === 'select'" v-model="editItem[field.key]"
                                    :items="getItems(field)" :item-text="field.itemText || 'name'"
                                    :item-value="field.itemValue || 'value'" :label="field.label" dense outlined
                                    hide-details="auto" />

                                <!-- AUTOSELECT -->
                                <v-autocomplete v-else-if="field.type === 'autoselect'" v-model="editItem[field.key]"
                                    :items="getItems(field)" :item-text="field.itemText || 'name'"
                                    :item-value="field.itemValue || 'value'" :label="field.label" multiple chips
                                    deletable-chips clearable dense outlined hide-details="auto" />

                                <!-- NUMBER -->
                                <!-- 
                                <div v-else-if="
                                    field.type === 'number'">{{ field.showFor.includes(editItem.type) }}</div> -->


                                <v-text-field v-else-if="
                                    field.type === 'number'" v-model.number="editItem[field.key]" :label="field.label"
                                    :hint="field.hint" :persistent-hint="!!field.hint" type="number" dense outlined
                                    hide-details="auto" />

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

                                    <EditorContent :editor="editor" class="tiptap-editor"
                                        :class="{ 'light-editor': !$vuetify.theme.isDark }" />
                                </div>



                            </v-card>
                        </v-col>

                        <v-col cols="6" v-if="editItem.type !== 'shield'">
                            <RuneSelector v-model="localResilent" :runes="Resilent" title="Руна Стойкости">
                                <template #preview="{ rune }">
                                    <CardItem :item="StrikeItem(rune)" :wargearPrice="wargearPrice" />
                                </template>
                            </RuneSelector>
                        </v-col>

                        <v-col cols="6" v-if="editItem.type !== 'shield'">
                            <RuneSelector v-model="localPotency" :runes="Potency" title="Руна Мощи">
                                <template #preview="{ rune }">
                                    <CardItem :item="StrikeItem(rune)" :wargearPrice="wargearPrice" />
                                </template>
                            </RuneSelector>
                        </v-col>

                        <v-col cols="6" v-if="editItem.type !== 'shield'">
                            <RuneSelector v-model="localProperty" :runes="Property" title="Руна свойств"
                                :multiple="true">
                                <template #preview="{ rune }">
                                    <CardItem :item="StrikeItem(rune)" :wargearPrice="wargearPrice" />
                                </template>
                            </RuneSelector>
                        </v-col>

                        <!-- <v-col cols="6" v-if="editItem.type === 'shield'">
                            <RuneSelector v-model="localReinforcing" :runes="Reinforcing" title="Руна упрочнения"
                                :multiple="true">
                                <template #preview="{ rune }">
                                    <CardItem :item="StrikeItem(rune)" :wargearPrice="wargearPrice" />
                                </template>
                            </RuneSelector>
                        </v-col> -->

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

            localProperty: [], // выбранные ключи
            selectedRune: null, // последняя кликнутая руна
            localStriking: undefined, // временное значение для диалога
            localPotency: undefined,


            fields: [
                {
                    key: 'name',
                    type: 'string',
                    label: 'Имя предмета',
                    showFor: ['armor', 'shield']
                },
                {
                    key: 'bulk',
                    type: 'number',
                    label: 'Нагрузка',
                    hint: '0.1 в поле = 1Л',
                    showFor: ['armor', 'shield']
                },

                {
                    key: 'level',
                    type: 'number',
                    label: 'Уровень',
                    showFor: ['armor', 'shield']
                },
                {
                    key: 'acBonus',
                    type: 'number',
                    label: 'Бонус КД',
                    showFor: ['armor', 'shield']
                },
                {
                    key: 'strength',
                    type: 'number',
                    label: 'Сила',
                    showFor: ['armor']
                },
                {
                    key: 'hardness',
                    type: 'number',
                    label: 'Твердость',
                    showFor: ['armor', 'shield']
                },
                {
                    key: 'dexCap',
                    type: 'number',
                    label: 'Огр. Ловкости',
                    showFor: ['armor']
                },
                {
                    key: 'checkPenalty',
                    type: 'number',
                    label: 'Штраф проверок',
                    showFor: ['armor']
                },
                {
                    key: 'speedPenalty',
                    type: 'number',
                    label: 'Штраф Скорости',
                    showFor: ['armor', 'shield']
                },

                {
                    key: 'hp',
                    type: 'hp',
                    label: 'Прочность',
                    showFor: ['armor', 'shield']
                },
                {
                    key: 'price',
                    type: 'price',
                    label: 'Цена',
                    showFor: ['armor', 'shield']
                },
                {
                    key: 'material',
                    type: 'material',
                    label: 'Материал',
                    items: 'materialRepository',
                    itemText: 'name',
                    itemValue: 'key',
                    showFor: ['armor', 'shield']
                },
                // {
                //     key: 'usage',
                //     type: 'select',
                //     label: 'Использование',
                //     items: 'usageRepository',
                //     itemText: 'name',
                //     itemValue: 'key',
                //     showFor: ['armor', 'shield']
                // },
                {
                    key: 'group',
                    type: 'select',
                    label: 'Группа',
                    items: 'armorGroup',
                    itemText: 'name',
                    itemValue: 'group',
                    multiple: true,
                    showFor: ['armor']
                },
                {
                    key: 'category',
                    type: 'select',
                    label: 'Категория',
                    items: 'armourCategoryRepository',
                    itemText: 'name',
                    itemValue: 'category',
                    multiple: true,
                    showFor: ['armor']
                },
                {
                    key: 'rarity',
                    type: 'select',
                    label: 'Редкость',
                    itemText: 'name',
                    itemValue: 'key',
                    items: 'rarityRepository',
                    showFor: ['armor', 'shield']
                },
                {
                    key: 'trait',
                    type: 'autoselect',
                    label: 'Свойства',
                    items: 'traitList',
                    itemText: 'key',
                    itemValue: 'key',
                    multiple: true,
                    showFor: ['armor', 'shield']
                },
                {
                    key: 'description',
                    type: 'editor',
                    label: 'Описание',
                    showFor: ['armor', 'shield']
                }
            ],
            editItem: {},
            localPropertyArmor: [], // выбранные ключи
            selectedRuneArmor: null, // последняя кликнутая руна
            localResilent: undefined, // временное значение для диалога
            localPotencyArmor: undefined,
            ArmorSearchDialog: false,
            alertMoney: false,
            headersArmor: [
                { text: 'Название', value: 'name' },
                { text: 'Группа', value: 'group' },
                { text: 'Вес', value: 'bulk' },
                { text: 'Категория', value: 'category' },
                { text: 'Трейты', value: 'traits' },
                { text: 'Экип', value: 'equip', sortable: false },
                { text: 'Инв', value: 'invest', sortable: false },
                { text: 'Просмотр', value: 'view', sortable: false },
                {
                    text: 'Кол-во', value: 'qty', align: 'center',
                    class: 'text-center',
                    width: '150px',
                },
                { text: 'Редактировать', value: 'edit', sortable: false },
                { text: 'Удалить', value: 'delete', sortable: false },
            ]
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
        characterId: {
            type: String,
            required: true
        },
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
        visibleFields() {

            return this.fields.filter(field =>
                field.showFor.includes(this.editItem.type)
            );
        },

        characterWearWargear() {
            return this.$store.getters['characters/characterWearById'](this.characterId);
        },
        characterWearShield() {
            return this.$store.getters['characters/characterWearShieldById'](this.characterId);
        },
        isColor(item) {
            const hasWargear = item.type === 'shield' ? (this.characterWearShield && this.characterWearShield.id === item.id)
                : (this.characterWearWargear && this.characterWearWargear.id === item.id)
            return hasWargear
        },


    },
    methods: {

        getAvailableGrades(materialKey) {
            const material = this.materialRepository.find(
                m => m.key === materialKey
            );

            return material?.grades || [];
        },
        remove(gear) {
            this.$store.commit('characters/unwearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
            this.$store.commit('characters/removeCharacterWargear', { id: this.characterId, gearId: gear.id });
            this.$store.commit("characters/clearCharactermodificatorsBonusbySource", {
                id: this.characterId,
                source: gear.key,
            });
        },
        getItems(field) {
            if (typeof field.items === 'string') {
                return this[field.items]; // 👉 this.weaponGroup
            }
            return field.items || [];
        },
        openWeaponSettings(gear) {
            this.weaponEditorDialog = true;
            const weapon = gear;
            // пересоздаём editor

            if (gear.type !== "shield") {
                this.Resilent = this.wargearList
                    .filter(item => item.usage?.value)
                    .filter(item =>
                        item.name.toLowerCase().includes("руна") &&
                        item.usage.value.toLowerCase().includes("etched-onto") &&
                        item.usage.value.toLowerCase().includes("armor")
                    )
                    .filter(item =>
                        item.name.toLowerCase().includes("стойкости")
                    )
                    .map(item => ({
                        ...item,
                        type: "gear"
                    }));
                this.localResilent = this.armourRuneResilent.find(item => weapon.runes.resilient === item.key).slug;
                //TODO сделать по щиту
                this.Potency = this.wargearList
                    .filter(item => item.usage?.value)
                    .filter(item =>
                        item.name.toLowerCase().includes("руна") &&
                        item.usage.value.toLowerCase().includes("etched-onto") &&
                        item.usage.value.toLowerCase().includes("armor")
                    )
                    .filter(item =>
                        item.name.toLowerCase().includes("мощи")

                    )
                    .map(item => ({
                        ...item,
                        type: "gear"
                    }));
                this.localPotency = this.armourRunePotency.find(item => weapon.runes.potency === item.key).slug;

                this.Property = this.wargearList
                    .filter(item => item.usage?.value)
                    .filter(item =>
                        item.name.toLowerCase().includes("руна") &&
                        item.usage.value.toLowerCase().includes("etched-onto") &&
                        item.usage.value.toLowerCase().includes("armor")
                    )

                    .filter(item =>
                        !item.name.toLowerCase().includes("мощи") &&
                        !item.name.toLowerCase().includes("упрочнения") &&
                        !item.name.toLowerCase().includes("стойкости")
                    )
                    .map(item => ({
                        ...item,
                        type: "gear"
                    }));

                this.localProperty = weapon.runes.property ? [...weapon.runes.property] : [];
            }
            this.editItem = {
                ...gear,
                name: gear.name || '',
                description: gear.description || '',
                level: gear.level?.value || 0,
                group: gear.group || null,
                trait: gear.trait || [],
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
        insertAction1(type) {
            if (!this.editor) return

            this.editor.chain().focus().insertActionIcon(type).run()
        },
        saveWeapon() {
            this.alert = false;
            const str = this.armourRuneResilent.find(item => this.localResilent === item.slug).key;
            const ptl = this.armourRunePotency.find(item => this.localPotency === item.slug).key;




            let updatedGear = {
                ...this.Weapon,
                ...this.editItem,
                runeArmor: {
                    resilient: str,
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
                runes: {
                    "resilient": str,
                    "potency": ptl,
                    "property": this.localProperty
                },


            };
            const isInvestable = updatedGear.trait?.includes('инвестируемый')

            if (!isInvestable) {
                updatedGear.equipped = {
                    ...updatedGear.equipped,
                    invest: false
                }
            }


            this.$store.commit('characters/updateCharacterWargear', {
                id: this.characterId,
                gear: updatedGear,
            });

            this.$store.commit('characters/wearUpdateCharacterArmor', {
                id: this.characterId,
                potency: ptl,
            });

            this.$store.commit("characters/updateCharactermodificatorsBonus", {
                id: this.characterId,
                key: updatedGear.key,
                value: str || 0
            });

            this.weaponEditorDialog = false;


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

            Bonus.push(
                {
                    "key": "FlatModifier",
                    "selector": ["reflex", "fortitude", "will"],
                    "type": "item",
                    "value": gear1.runes?.resilient || 0,
                    source: gear1.key
                }
            )

            this.$store.commit("characters/setCharactermodificatorsBonus", {
                id: this.characterId,
                Bonus: Bonus,
            });




            this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: gear.name, source: 'custom', gear: gear1 });
            // Закрываем окна
            // this.WeaponSearchDialog = false;
            this.ArmorSearchDialog = false;
            // this.GearSearchDialog = false;
            // this.ConsumableSearchDialog = false;

        },
        wear(gear) {
            this.$store.commit('characters/wearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
        },

        unwear(gear) {
            this.$store.commit('characters/unwearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
        },
        wearShield(gear) {

            this.$store.commit('characters/wearCharacterShield', { id: this.characterId, gearId: gear.id, gear: gear });
        },

        unwearShield(gear) {
            this.$store.commit('characters/unwearCharacterShield', { id: this.characterId, gearId: gear.id, gear: gear });
        },
        toggleWear(item) {
            this.items.forEach(i => {
                if (i.id === item.id) return;

                // Если надеваем щит — снимаем только другие щиты
                if (item.type === "shield" && i.type !== "shield") return;

                // Если надеваем броню — снимаем только другую броню
                if (item.type === "armor" && i.type !== "armor") return;

                this.$store.commit("characters/updateCharacterWargear", {
                    id: this.characterId,
                    gear: {
                        ...i,
                        equip: false,
                        equipped: {
                            ...i.equipped,
                            invest: false
                        }
                    }
                });
            });
            const isEquipped = !item.equip;

            const gear1 = {
                ...item,
                equip: isEquipped,
                equipped: {
                    ...item.equipped,
                    invest: isEquipped
                        ? item.equipped?.invest
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



            if (item.type === 'shield') {
                if (gear1.equip == false) {



                    this.unwearShield(item)
                } else {
                    this.wearShield(item)
                }
            }
            else
                if (gear1.equip == false) {

                    this.unwear(item)
                } else {
                    this.wear(item)
                }
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

                const gear2 = {
                    ...gear,
                    equipped: {
                        ...gear.equipped,
                        invest: !gear.equipped.invest
                    },
                    equip: false
                };
                this.toggleWear(gear2)
            }
            else {
                this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, gear: gear1 });
            }

            // 






            // if (gear1.equipped.invest && gear1.equipped.invest === true) {
            //     gear1.equip = true;
            //     if (gear1.type === 'shield') {
            //         this.$store.commit('characters/wearCharacterShield', { id: this.characterId, gearId: gear1.id, gear: gear1 });
            //     }
            //     else
            //         this.$store.commit('characters/wearCharacterWargear', { id: this.characterId, gearId: gear1.id, gear1: gear1 });
            // }


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
        StrikeItem(item) {
            if (!item) return "None"
            if (item.key === 0) return "None"
            else
                return this.wargearList.find((i) => i.key === item.key)

        },
        changeMoney() {
            this.moneyEditorDialog = false;
            this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: this.gp === '' ? this.money : this.gp, nominal: this.labelMoney });
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
        },
        isEquipped(item) {
            const hasWargear = item.type === 'shield' ? (this.characterWearShield && this.characterWearShield.id === item.id)
                : (this.characterWearWargear && this.characterWearWargear.id === item.id)
            return hasWargear
        }

    },

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
    filter: invert(1);
}

.light-editor .ProseMirror img.action-icon {
    filter: invert(1);
}
</style>
