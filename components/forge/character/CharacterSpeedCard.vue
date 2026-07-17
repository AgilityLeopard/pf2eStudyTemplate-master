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
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
    name: "CharacterSpeedCard",
    mixins: [

        StatRepositoryMixin



    ],
    props: {
        characterId: {
            type: String,

        },
    },
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
        SkillPerception() {
            return this.$store.getters["characters/characterPerseptionById"](
                this.characterId
            );
        },
        speed() {
            return this.characterSpeed()
        },
        perception() {
            return this.ModAttributePerceptionWithStatuses("", "")
        },
        characterAttributes() {
            return this.$store.getters["characters/characterAttributesById"](
                this.characterId
            );
        },
        characterLevel() {
            return this.$store.getters['characters/characterLevelById'](this.characterId);
        },
        ClassDC() {
            return this.ModAttributeClass()
        },
        SkillClass() {
            return this.$store.getters["characters/characterSkillClassById"](
                this.characterId
            );
        },
    },
    methods: {
        characterSpeed() {
            return this.$parent.characterSpeed
        },

        ModAttributePerceptionWithStatuses(attribute, skill) {

            const char1 = this.profiencyRepository[this.SkillPerception];
            const char2 = (this.characterAttributes["wisdom"] - 10) / 2;
            const char3 = this.characterLevel;
            let status = 0;

            // this.activeStatuses.forEach(effect => {
            //     if (effect && effect.rules) {
            //         if (effect.rules.find(s => s.selector))
            //             if (effect.rules.find(s => s.key === 'FlatModifier')) {
            //                 const att = effect.rules.find(s => s.selector).selector.filter(s => s === 'perception' || s === 'all');


            //                 if (att.length !== 0)
            //                     if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
            //                         status = effect.value
            //                     else
            //                         status = -effect.rules.find(s => s.key === 'FlatModifier').value;

            //             }
            //     }
            // })
            const result = parseInt(char1) + parseInt(char2) + parseInt(char3) - status;
            return result > 0 ? "+" + result : result;
        },
        ModAttributeClass() {
            const char1 = this.profiencyRepository[this.SkillClass] ? this.profiencyRepository[this.SkillClass] : 0;
            const char3 = this.characterLevel;

            return 10 + parseInt(char1) + parseInt(char3);

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