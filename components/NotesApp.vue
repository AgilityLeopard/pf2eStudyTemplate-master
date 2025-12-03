<template>
    <div class="notes-app">
        <aside class="notes-list">
            <h3>Заметки</h3>
            <ul>
                <li v-for="note in notes" :key="note.id" :class="{ active: note.id === activeNoteId }"
                    @click="setActiveNote(note.id)">
                    {{ note.title || 'Без названия' }}
                </li>
            </ul>
            <button @click="addNote">+ Новая заметка</button>
        </aside>

        <main class="editor">
            <div v-if="activeNote">
                <input v-model="activeNote.title" placeholder="Название заметки" class="note-title" />
                <div contenteditable="true" class="note-content" v-html="activeNote.content"
                    @input="updateContent($event)"></div>
            </div>
            <div v-else class="no-note">Выберите заметку или создайте новую</div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            notes: JSON.parse(localStorage.getItem("notes") || "[]"),
            activeNoteId: null,
        };
    },
    computed: {
        activeNote() {
            return this.notes.find((n) => n.id === this.activeNoteId);
        },
    },
    watch: {
        notes: {
            handler(newNotes) {
                localStorage.setItem("notes", JSON.stringify(newNotes));
            },
            deep: true,
        },
    },
    mounted() {
        if (this.notes.length > 0) {
            this.activeNoteId = this.notes[0].id;
        }
    },
    methods: {
        addNote() {
            const id = Date.now();
            const newNote = { id, title: "", content: "" };
            this.notes.push(newNote);
            this.activeNoteId = id;
        },
        setActiveNote(id) {
            this.activeNoteId = id;
        },
        updateContent(e) {
            if (this.activeNote) {
                this.activeNote.content = e.target.innerHTML;
            }
        },
    },
};
</script>

<style scoped>
.notes-app {
    display: flex;
    height: 100vh;
    font-family: sans-serif;
}

.notes-list {
    width: 220px;
    background-color: #1e1e1e;
    color: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

.notes-list h3 {
    margin-top: 0;
    margin-bottom: 1rem;
}

.notes-list ul {
    list-style: none;
    padding: 0;
    flex: 1;
    overflow-y: auto;
}

.notes-list li {
    padding: 0.5rem;
    cursor: pointer;
    border-radius: 4px;
}

.notes-list li.active,
.notes-list li:hover {
    background-color: #333;
}

.notes-list button {
    margin-top: 0.5rem;
    padding: 0.5rem;
    border: none;
    background-color: #555;
    color: #fff;
    cursor: pointer;
    border-radius: 4px;
}

.editor {
    flex: 1;
    padding: 1rem;
    background-color: #2a2a2a;
    color: #fff;
    display: flex;
    flex-direction: column;
}

.note-title {
    font-size: 1.2rem;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: none;
    background-color: #3a3a3a;
    color: #fff;
    border-radius: 4px;
}

.note-content {
    flex: 1;
    background-color: #3a3a3a;
    border-radius: 4px;
    padding: 0.5rem;
    overflow-y: auto;
    outline: none;
}

.no-note {
    color: #aaa;
    font-style: italic;
}
</style>
