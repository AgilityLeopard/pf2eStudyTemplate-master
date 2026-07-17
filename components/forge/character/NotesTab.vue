<template>
    <div class="notes-wrapper">
        <!-- SIDEBAR -->
        <div class="notes-sidebar">
            <v-btn small block class="mb-2" color="primary" @click="$emit('create-note')">
                + Добавить
            </v-btn>

            <v-dialog v-model="settingsDialog" :fullscreen="$vuetify.breakpoint.xsOnly" max-width="500">
                <v-card class="pa-4">
                    <v-toolbar flat dense>
                        <v-toolbar-title>Настройки заметки</v-toolbar-title>
                        <v-spacer />
                        <v-btn icon @click="settingsDialog = false">
                            <v-icon>close</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <!-- TITLE -->
                    <v-text-field v-model="editNote.title" label="Заголовок" dense outlined class="mb-3" />

                    <!-- ICON + COLOR -->
                    <div class="mb-4"
                        :class="$vuetify.breakpoint.xsOnly ? 'd-flex flex-column align-start' : 'd-flex align-center'">
                        <!-- ICON -->
                        <v-menu v-model="iconPicker" class="mr-3" offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon large v-bind="attrs" v-on="on">
                                    <v-icon>{{ editNote.icon || 'mdi-notebook' }}</v-icon>
                                </v-btn>
                            </template>
                            <v-card style="max-width: 240px">
                                <div class="d-flex flex-wrap pa-2">
                                    <v-btn v-for="icon in icons" :key="icon" icon @click="selectIcon(icon)">
                                        <v-icon>{{ icon }}</v-icon>
                                    </v-btn>
                                </div>
                            </v-card>
                        </v-menu>

                        <!-- COLOR -->
                        <v-menu v-model="colorPicker" offset-y>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn icon v-bind="attrs" v-on="on">
                                    <div :style="{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '4px',
                                        background: editNote.color || '#ccc',
                                        border: '1px solid #ddd',
                                    }" />
                                </v-btn>
                            </template>
                            <v-card class="pa-2" style="max-width: 220px">
                                <div class="d-flex flex-wrap">
                                    <div v-for="color in colors" :key="color" @click="selectColor(color)" :style="{
                                        width: '24px',
                                        height: '24px',
                                        margin: '4px',
                                        borderRadius: '6px',
                                        background: color,
                                        cursor: 'pointer',
                                        border: editNote.color === color ? '2px solid black' : '1px solid #ddd',
                                    }" />
                                </div>
                            </v-card>
                        </v-menu>
                    </div>

                    <!-- ACTIONS -->
                    <div
                        :class="$vuetify.breakpoint.xsOnly ? 'd-flex flex-column' : 'd-flex justify-space-between align-center'">
                        <v-btn color="red" text :block="$vuetify.breakpoint.xsOnly" class="mb-2"
                            @click="deleteNote(editNote.id)">
                            Удалить заметку
                        </v-btn>

                        <div :class="$vuetify.breakpoint.xsOnly ? 'd-flex flex-column' : ''">
                            <v-btn text :block="$vuetify.breakpoint.xsOnly" class="mb-2"
                                @click="settingsDialog = false">
                                Отмена
                            </v-btn>
                            <v-btn color="primary" :block="$vuetify.breakpoint.xsOnly" @click="saveNoteSettings">
                                Сохранить
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </v-dialog>

            <!-- NOTES LIST -->
            <div class="notes-list">
                <div v-for="note in notes" :key="note.id" class="note-item" :style="getNoteStyle(note)"
                    :class="{ active: note.id === activeNoteId }" @click="$emit('select-note', note.id)">
                    <div class="note-title">
                        <v-icon>{{ note.icon || 'mdi-notebook' }}</v-icon>
                        {{ note.title || 'Без имени' }}
                    </div>
                </div>
            </div>
        </div>

        <!-- EDITOR -->
        <div class="notes-editor">
            <div v-if="activeNote">
                <!-- TOOLBAR -->
                <div class="tiptap-toolbar mb-2">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn small icon v-bind="attrs" v-on="on">
                                <img src="/img/icon/action_single.png"
                                    :class="{ 'action-icon': !$vuetify.theme.dark }" />
                            </v-btn>
                        </template>
                        <v-list dense>
                            <v-list-item v-for="action in actionTypes" :key="action.value"
                                @click="$emit('insert-action', action.value)">
                                <img :src="action.icon" :class="{ 'action-icon': !$vuetify.theme.dark }" />
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <v-btn v-for="btn in toolbarButtons" :key="btn.command" small icon @click="btn.action()"
                        :class="{ 'primary--text': btn.isActive && btn.isActive() }">
                        <v-icon>{{ btn.icon }}</v-icon>
                    </v-btn>

                    <v-spacer />
                    <v-btn right small icon @click="$emit('open-settings', activeNote)">
                        <v-icon>settings</v-icon>
                    </v-btn>
                </div>

                <!-- EDITOR -->
                <EditorContent :editor="editor" class="tiptap-editor" :class="{ 'is-dark': $vuetify.theme.dark }" />
            </div>

            <div v-else class="empty-state">Выбери или создай заметку</div>
        </div>
    </div>
</template>

<script>
import { EditorContent } from '@tiptap/vue-2'

export default {
    name: 'NotesTab',

    components: {
        EditorContent,
    },

    props: {
        characterId: { type: String, required: true },
        notes: { type: Array, default: () => [] },
        editor: { type: Object, default: null },
        activeNoteId: { type: String, default: null },
    },

    data() {
        return {
            settingsDialog: false,
            editNote: {},
            iconPicker: false,
            colorPicker: false,

            icons: [
                'mdi-notebook',
                'mdi-book-open',
                'mdi-star',
                'mdi-heart',
                'mdi-sword',
                'mdi-shield',
                'mdi-fire',
                'mdi-lightning-bolt',
                'mdi-skull',
                'mdi-account',
                'mdi-map',
                'mdi-feather',
            ],

            colors: [
                '#F44336', '#E91E63', '#9C27B0', '#673AB7',
                '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
                '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
                '#FFC107', '#FF9800', '#FF5722', '#795548',
                '#607D8B',
            ],

            actionTypes: [
                { value: '1', icon: '/img/icon/action_single.png' },
                { value: '2', icon: '/img/icon/action_double.png' },
                { value: '3', icon: '/img/icon/action_triple.png' },
                { value: 'reaction', icon: '/img/icon/action_reaction.png' },
                { value: 'free', icon: '/img/icon/action_free.png' },
            ],
        }
    },

    computed: {
        activeNote() {
            return this.notes.find(n => n.id === this.activeNoteId)
        },

        toolbarButtons() {
            return [
                {
                    icon: 'format_bold',
                    command: 'bold',
                    action: () => this.editor?.chain().focus().toggleBold().run(),
                    isActive: () => this.editor?.isActive('bold'),
                },
                {
                    icon: 'format_italic',
                    command: 'italic',
                    action: () => this.editor?.chain().focus().toggleItalic().run(),
                    isActive: () => this.editor?.isActive('italic'),
                },
                {
                    icon: 'strikethrough_s',
                    command: 'strike',
                    action: () => this.editor?.chain().focus().toggleStrike().run(),
                    isActive: () => this.editor?.isActive('strike'),
                },
                {
                    icon: 'format_list_bulleted',
                    command: 'bulletList',
                    action: () => this.editor?.chain().focus().toggleBulletList().run(),
                    isActive: () => this.editor?.isActive('bulletList'),
                },
                {
                    icon: 'format_list_numbered',
                    command: 'orderedList',
                    action: () => this.editor?.chain().focus().toggleOrderedList().run(),
                    isActive: () => this.editor?.isActive('orderedList'),
                },
            ]
        },
    },

    methods: {
        getNoteStyle(note) {
            const isActive = note.id === this.activeNoteId

            if (isActive) {
                return {
                    background: note.color ? note.color + '30' : '#e3f2fd',
                    borderLeft: `4px solid ${note.color || '#1976d2'}`,
                    fontWeight: '500',
                }
            }

            return {
                background: note.color ? note.color + '15' : 'transparent',
                borderLeft: `4px solid ${note.color || 'transparent'}`,
            }
        },

        selectIcon(icon) {
            this.editNote.icon = icon
            this.iconPicker = false
        },

        selectColor(color) {
            this.editNote.color = color
            this.colorPicker = false
        },

        saveNoteSettings() {
            this.$emit('save-settings', this.editNote)
            this.settingsDialog = false
        },

        deleteNote(id) {
            this.$emit('delete-note', id)
            this.settingsDialog = false
        },
    },
}
</script>

<style scoped lang="scss">
// ============================================================
// NOTES LAYOUT
// ============================================================
.notes-wrapper {
    display: flex;
    height: 100%;
    min-height: 500px;
}

@media (max-width: 600px) {
    .notes-wrapper {
        flex-direction: column;
    }

    .notes-sidebar {
        width: 100% !important;
        max-width: none !important;
        border-right: none !important;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding: 8px;
        overflow: visible;
    }

    .notes-list {
        display: flex;
        overflow-x: auto;
        gap: 8px;
    }

    .note-item {
        flex: 0 0 auto;
    }
}

.notes-sidebar {
    width: 220px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    padding: 8px;
    overflow-y: auto;
    flex-shrink: 0;
}

.notes-editor {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
}

// ============================================================
// NOTE ITEMS
// ============================================================
.note-item {
    padding: 6px 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
    }

    &.active {
        background: rgba(53, 159, 223, 0.15);
    }
}

.note-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

// ============================================================
// EMPTY STATE
// ============================================================
.empty-state {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #888;
    font-size: 16px;
}

// ============================================================
// TIP TAP EDITOR
// ============================================================
.tiptap-editor {
    min-height: 300px;
    padding: 12px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);

    &.is-dark {
        border-color: rgba(255, 255, 255, 0.1);
    }
}

.tiptap-toolbar {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: wrap;
    padding: 4px 8px;
    background: rgba(0, 0, 0, 0.03);
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.06);

    .v-btn {
        min-width: 32px;
        height: 32px;
    }
}

.action-icon {
    width: 24px;
    height: 24px;
}

// ============================================================
// DARK THEME OVERRIDES
// ============================================================
.theme--dark {
    .tiptap-toolbar {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.08);
    }

    .tiptap-editor {
        border-color: rgba(255, 255, 255, 0.1);
    }

    .note-item {
        &:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        &.active {
            background: rgba(53, 159, 223, 0.25);
        }
    }

    .empty-state {
        color: #666;
    }
}
</style>