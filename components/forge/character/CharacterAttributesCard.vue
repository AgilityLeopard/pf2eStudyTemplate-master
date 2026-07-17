<template>
    <v-card class="glass-card pa-3 stat-card" height="100%">

        <v-row dense>
            <v-col v-for="(attribute, index) in attributeRepository" :key="index" cols="12" sm="6"
                class="d-flex stat-row">
                <stat-group :label="attribute.name" :value="ModAttributeReal(attribute.key)" />
            </v-col>
        </v-row>

    </v-card>
</template>

<script>
import StatGroup from "~/components/forge/StatGroup.vue"

export default {
    name: "CharacterAttributesCard",

    components: {
        StatGroup,
    },
    props: {
        characterId: {
            type: String,

        },
    },

    data() {
        return {
            attributeRepository: this.$parent.attributeRepository,

        }
    },
    computed: {
        tableRows() {
            return [
                {
                    source: 'Предыстория',
                    stats:
                        this.characterBackgroundBoost,
                },
                {
                    source: 'Наследие',
                    stats: this.mergeStats(
                        this.characterAncestryBoost,
                        this.characterAttributesAncestryFlaw
                    )
                },
                {
                    source: 'Класс',
                    stats: this.characterClassBoost
                },
                {
                    source: '1 уровень',
                    stats: this.characterAttributeBoost
                },
                {
                    source: '5 уровень',
                    stats: this.characterAttributeBoost5
                },
                {
                    source: '10 уровень',
                    stats: this.characterAttributeBoost10
                },
                {
                    source: '15 уровень',
                    stats: this.characterAttributeBoost15
                },
                {
                    source: '20 уровень',
                    stats: this.characterAttributeBoost20
                },
            ].filter(row => row.stats);
        },

        characterBackgroundBoost() {
            return this.$store.getters['characters/characterBackgroundBoost'](this.$route.params.id);
        },
        characterBackground2() {
            return this.$store.getters['characters/characterBackgroundFreeBoost2ById'](this.$route.params.id);
        },
        characterBackgroundBoost() {
            return this.$store.getters['characters/characterBackgroundBoostId'](this.$route.params.id);
        },
        // characterBackground2Boost() {
        //   return this.$store.getters['characters/characterBackgroundBoost2IdById'](this.characterId);
        // },
        characterAncestryFreeBoost() {
            return this.$store.getters['characters/characterAncestryFreeBoostById'](this.$route.params.id);
        },
        characterAttributesAncestryFlaw() {
            return this.$store.getters['characters/characterAttributesAncestryFlaw'](this.$route.params.id);
        },

        characterAncestryFreeBoost2() {
            return this.$store.getters['characters/characterAncestryFreeBoost2ById'](this.$route.params.id);
        },
        characterClassBoost() {
            return this.$store.getters['characters/characterAttributesClassBoost'](this.$route.params.id);
        },

        characterAttributeBoost() {
            return this.$store.getters['characters/characterAttributeBoost'](this.$route.params.id);
        },
        characterAttributeBoost5() {
            return this.$store.getters['characters/characterAttributeBoost5'](this.$route.params.id);
        },
        characterAttributeBoost10() {
            return this.$store.getters['characters/characterAttributeBoost10'](this.$route.params.id);
        },
        characterAttributeBoost15() {
            return this.$store.getters['characters/characterAttributeBoost15'](this.$route.params.id);
        },
        characterAttributeBoost20() {
            return this.$store.getters['characters/characterAttributeBoost20'](this.$route.params.id);
        },
        characterAncestryBoost() {
            return this.$store.getters['characters/characterAncestryBoostById'](this.$route.params.id);
        },
        SkillPerception() {
            return this.$store.getters["characters/characterPerseptionById"](
                this.characterId
            );
        },

        characterAttributes() {
            return this.$store.getters["characters/characterAttributesById"](
                this.characterId
            );
        },

        SkillClass() {
            return this.$store.getters["characters/characterSkillClassById"](
                this.characterId
            );
        },
    },
    methods: {
        formatBoost(stat, rowIndex) {
            let count = 0;

            for (let i = 0; i <= rowIndex; i++) {
                count += this.tableRows[i].stats?.[stat] || 0;
            }

            if (count <= 4) return this.tableRows[rowIndex].stats?.[stat] || 0;

            // после 4
            if (this.tableRows[rowIndex].stats?.[stat] === 0) return 0;

            return (count - 4) % 2 === 1 ? 0.5 : 1;
        },
        mergeStats(...inputs) {
            const result = {
                strength: 0,
                dexterity: 0,
                constitution: 0,
                intellect: 0,
                wisdom: 0,
                charisma: 0
            };

            inputs.forEach(input => {
                if (!input) return;

                // 2️⃣ Если это объект со значениями
                if (typeof input === 'object') {
                    Object.keys(result).forEach(stat => {
                        result[stat] += Number(input[stat] || 0);
                    });
                }
            });



            return result;
        },

        ModAttributeReal(attribute) {

            let result = 0

            this.tableRows.forEach((row, rowIndex) => {
                result += this.formatBoost(attribute, rowIndex)
            })
            // const result = this.characterAttributes[attribute]
            const modRaw = (result);       // настоящее дробное значение
            const mod = Math.floor(modRaw);         // отображаемое целое значение


            const arrow = Number.isInteger(modRaw) ? "" : " ⯅";  // стрелка только если дробное

            return (mod > 0 ? "+ " : " ") + mod + arrow;


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