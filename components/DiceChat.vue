<template>
    <v-card class="pa-3" max-width="400">
        <v-card-title>Чат броска костей</v-card-title>

        <div class="chat-window">
            <div v-for="msg in messages" :key="msg.id" class="chat-msg">
                <div>
                    <strong>{{ msg.formula }}</strong> → {{ msg.result }}
                </div>
                <div class="text-caption">
                    Кости: {{ msg.rolls.join(', ') }}
                </div>
            </div>
        </div>

        <v-text-field v-model="input" label="пример 2d6+3" @keyup.enter="roll" />

        <v-btn @click="roll" color="primary">Бросок</v-btn>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            input: '1d20'
        };
    },

    computed: {
        messages() {
            const id = this.$route.params.id;

            console.log('ID:', id);
            console.log('ALL CHARACTERS:', this.$store.state.characters);
            console.log('CHAR:', this.$store.state.characters?.characters[id]);

            return this.$store.state.characters?.characters[id]?.diceChat || [];
        }
    },

    methods: {
        roll() {
            this.$store.dispatch('characters/rollDice', {
                characterId: this.$route.params.id,
                formula: this.input
            });

        },

    },

};
</script>

<style scoped>
.chat-window {
    max-height: 250px;
    overflow-y: auto;
    margin-bottom: 10px;
}

.chat-msg {
    padding: 6px;
    border-bottom: 1px solid #333;
}
</style>