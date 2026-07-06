<template>
    <v-card class="ui-card">

        <v-card-title class="ui-dialog-header">
            {{ title }}
            <v-spacer />
            <v-icon @click="$emit('close')">close</v-icon>
        </v-card-title>

        <v-card-text>
            <v-row dense>

                <!-- DYNAMIC FIELDS -->
                <v-col v-for="field in fields" :key="field.key" :cols="field.type === 'editor' ? 12 : 6">
                    <v-card outlined class="pa-3 fill-height">

                        <div v-if="['hp', 'price', 'material', 'editor'].includes(field.type)"
                            class="subtitle-2 font-weight-medium mb-3">
                            {{ field.label }}
                        </div>

                        <!-- SELECT -->
                        <v-select v-if="field.type === 'select'" v-model="model[field.key]" :items="getItems(field)"
                            :item-text="field.itemText || 'name'" :item-value="field.itemValue || 'value'"
                            :label="field.label" dense outlined hide-details="auto" />

                        <!-- AUTOSELECT -->
                        <v-autocomplete v-else-if="field.type === 'autoselect'" v-model="model[field.key]"
                            :items="getItems(field)" :item-text="field.itemText || 'name'"
                            :item-value="field.itemValue || 'value'" :label="field.label" multiple chips clearable dense
                            outlined hide-details="auto" />

                        <!-- NUMBER -->
                        <v-text-field v-else-if="field.type === 'number'" v-model.number="model[field.key]"
                            :label="field.label" :hint="field.hint" :persistent-hint="!!field.hint" type="number" dense
                            outlined hide-details="auto" />

                        <!-- HP -->
                        <v-row v-else-if="field.type === 'hp' && model[field.key]" dense>
                            <v-col cols="6">
                                <v-text-field v-model.number="model[field.key].value" label="HP" dense outlined />
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model.number="model[field.key].max" label="Макс." dense outlined />
                            </v-col>
                        </v-row>

                        <!-- PRICE -->
                        <v-row v-else-if="field.type === 'price' && model[field.key]" dense>
                            <v-col cols="3"><v-text-field v-model.number="model[field.key].pp" label="ПП" dense
                                    outlined /></v-col>
                            <v-col cols="3"><v-text-field v-model.number="model[field.key].gp" label="ЗМ" dense
                                    outlined /></v-col>
                            <v-col cols="3"><v-text-field v-model.number="model[field.key].sp" label="СМ" dense
                                    outlined /></v-col>
                            <v-col cols="3"><v-text-field v-model.number="model[field.key].cp" label="ММ" dense
                                    outlined /></v-col>
                        </v-row>

                        <!-- MATERIAL -->
                        <div v-else-if="field.type === 'material' && model[field.key]">
                            <v-select v-model="model[field.key].type" :items="getItems(field)" item-text="name"
                                item-value="key" label="Материал" dense outlined class="mb-2" />

                            <v-select v-model="model[field.key].grade" :items="getGrades(model[field.key].type)"
                                item-text="name" item-value="key" label="Качество" dense outlined />
                        </div>

                        <!-- EDITOR -->
                        <div v-else-if="field.type === 'editor'">
                            <div class="tiptap-toolbar mb-2">
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
                        <v-text-field v-else v-model="model[field.key]" :label="field.label" dense outlined
                            hide-details="auto" />

                    </v-card>
                </v-col>

                <v-col cols="6" v-if="editItem.type !== 'shield'">
                    <RuneSelector v-model="localStriking" :runes="Striking" title="Руна Стойкости">
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
                    <RuneSelector v-model="localProperty" :runes="Property" title="Руна свойств" :multiple="true">
                        <template #preview="{ rune }">
                            <CardItem :item="StrikeItem(rune)" :wargearPrice="wargearPrice" />
                        </template>
                    </RuneSelector>
                </v-col>



            </v-row>
        </v-card-text>

        <v-card-actions>
            <v-spacer />
            <v-btn class="ui-btn ui-btn--success" @click="$emit('save', model)">
                Сохранить
            </v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
import WargearSearch from '~/components/forge/WargearSearch.vue';
import WargearTrait from '~/mixins/WargearTraitRepositoryMixin';
import WargearMixin from '~/mixins/WargearMixin';
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";
import RuneSelector from './runeSelector.vue';
import CardItem from '../../CardItem.vue';
import WeaponCustomItem from '~/components/forge/wargear/WeaponCustomItem.vue'

import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import { ActionIcon } from '../ActionIcon';
import { KeepAlive } from 'vue';

export default {
    name: 'WeaponCustomItem',
    mixins: [
        WargearTrait,
        WargearMixin,
        StatRepositoryMixin,

    ],
    components: {
        WargearSearch,
        RuneSelector,
        CardItem,
        EditorContent,
        WeaponCustomItem
    },

    props: {
        value: Object,
        fields: Array,
        localStriking: Array, localProperty: Array, localPotency: Array,
        Striking: String, Property: String, Potency: String,
        title: {
            type: String,
            default: 'Создание предмета'
        }
    },

    data() {
        return {
            model: {},
            editor: null
        }
    },

    watch: {
        value: {
            immediate: true,
            deep: true,
            handler(v) {
                this.model = v ? JSON.parse(JSON.stringify(v)) : {}
                this.initEditor()
            }
        },

        'model.material.type'(val) {
            const allowed = this.getGrades(val)
            if (!allowed.includes(this.model.material?.grade)) {
                this.model.material.grade = null
            }
        }
    },

    beforeDestroy() {
        if (this.editor) this.editor.destroy()
    },

    methods: {
        initEditor() {
            if (this.editor) this.editor.destroy()

            this.$nextTick(() => {
                this.editor = new Editor({
                    extensions: [StarterKit],
                    content: this.model.description || '',
                    onUpdate: ({ editor }) => {
                        this.model.description = editor.getHTML()
                    }
                })
            })
        },

        getItems(field) {
            return typeof field.items === 'string'
                ? this.$parent[field.items]
                : field.items || []
        },

        getGrades(type) {
            const mat = this.materialRepository.find(m => m.key === type)
            return mat?.grades || []
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
</style>
