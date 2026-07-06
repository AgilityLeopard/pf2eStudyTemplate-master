<template>
    <v-card class="glass-card pa-3 stat-card" height="100%">
        <v-row dense>

            <!-- Левая часть -->

            <v-col cols="12" class="d-flex stat-row">
                <stat-group label="Скорость:" :value="speed.land" />

            </v-col>
            <v-col cols="12" class="d-flex stat-row">
                <stat-group label="Внимательность:" :value="perception" />
            </v-col>

            <v-col cols="12" class="d-flex stat-row">
                <stat-group label="Сл Класса:" :value="ClassDC" />
            </v-col>





        </v-row>
    </v-card>
</template>

<script>
import StatGroup from "~/components/forge/StatGroup.vue"
import StatIconNumber from '~/components/forge/StatIconNumber.vue';
import AppIcon from '~/components/forge/Icon.vue';

export default {
    name: "CharacterSpeedCard",

    components: {
        StatGroup,
        StatIconNumber,
        AppIcon
    },

    data() {
        return {
            attributeRepository: this.$parent.attributeRepository,
        }
    },
    computed: {
        speed() {
            return this.characterSpeed()
        },
        perception() {
            return this.ModAttributePerceptionWithStatuses("", "")
        },
        ClassDC() {
            return this.ModAttributeClass()
        },
    },
    methods: {
        characterSpeed() {
            return this.$parent.characterSpeed
        },
        ModAttributePerceptionWithStatuses(key, key2) {
            return this.$parent.ModAttributePerceptionWithStatuses(key, key2)
        },
        ModAttributeClass() {
            return this.$parent.ModAttributeClass()
        },
    },
}
</script>

<style scoped>
.glass-card {
    position: relative;
    overflow: hidden;

    background: var(--ui-surface) !important;
    border: 1px solid var(--ui-border);
    border-radius: 14px;

    box-shadow: 0 6px 18px var(--ui-shadow);

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;

    color: var(--ui-text);
}

/* мягкий overlay — работает и в dark теме */
.glass-card::after {
    content: "";
    position: absolute;
    inset: 0;

    background: var(--ui-hover);
    opacity: 0;

    transition: opacity 0.2s ease;
    pointer-events: none;
}

/* hover */
.glass-card:hover {
    transform: translateY(-2px);

    border-color: var(--ui-border-strong);
    box-shadow: 0 10px 24px var(--ui-shadow);
}

/* вот это делает hover ВИДИМЫМ в dark */
.glass-card:hover::after {
    opacity: 1;
}

/* LIGHT / DARK не нужны отдельные классы теперь */
/* всё уже управляется через variables */

/* rows */
.stat-row {
    transition: background 0.15s ease;
    border-radius: 10px;
}

.stat-row:hover {
    background: var(--ui-surface-hover);
}

/* если hp-input реально используется где-то внутри */
.hp-input>>>input[type="number"]::-webkit-inner-spin-button,
.hp-input>>>input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.hp-input>>>input[type="number"] {
    text-align: center;
    color: var(--ui-text);
    background: transparent;
}
</style>