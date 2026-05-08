<template>
    <v-card class="glass-card pa-3 stat-card" height="100%">
        <v-row dense>

            <!-- Левая колонка (иконка + значение) -->
            <v-col cols="12" sm="4" class="d-flex stat-row stat-left">
                <stat-icon-number title="КД" :value="armorClass">
                    <app-icon name="ac" />
                </stat-icon-number>
            </v-col>

            <!-- Правая колонка (список) -->
            <v-col cols="12" sm="8">
                <v-row dense>
                    <v-col cols="12" class="d-flex stat-row">
                        <stat-group label="Рефлекс:" :value="reflexSave" />
                    </v-col>
                    <v-col cols="12" class="d-flex stat-row">
                        <stat-group label="Стойкость:" :value="fortitudeSave" />
                    </v-col>
                    <v-col cols="12" class="d-flex stat-row">
                        <stat-group label="Воля:" :value="willSave" />
                    </v-col>
                </v-row>
            </v-col>

        </v-row>
    </v-card>
</template>

<script>
import StatGroup from "~/components/forge/StatGroup.vue"
import StatIconNumber from '~/components/forge/StatIconNumber.vue';
import AppIcon from '~/components/forge/Icon.vue';

export default {
    name: "CharacterArmorCard",

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
        reflexSave() {
            return this.ModAttributeSavingWithStatuses("dexterity", "reflex")
        },
        fortitudeSave() {
            return this.ModAttributeSavingWithStatuses("constitution", "fortitude")
        },
        willSave() {
            return this.ModAttributeSavingWithStatuses("wisdom", "will")
        },
        armorClass() {
            return this.characterArmor()
        },
    },
    methods: {
        ModAttributeSavingWithStatuses(attribute, skill) {
            return this.$parent.ModAttributeSavingWithStatuses(attribute, skill)
        },
        characterArmor() {
            return this.$parent.characterArmor()
        }
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