<template>
    <v-card class="glass-card pa-4 d-flex flex-column stat-card" height="100%">
        <!-- TITLE -->
        <div class="title mb-3 text-center">
            Хиты
        </div>

        <!-- HP -->
        <div class="d-flex align-center justify-center mb-4">

            <div v-if="!editingHp" class="hp-value" @click="editingHp = true" :style="{ color: hpColor() }">
                {{ currentHP }}
            </div>

            <v-text-field v-else v-model.number="localHP" type="number" hide-details solo flat class="hp-input"
                @blur="saveHp" @keyup.enter="saveHp" />

            <span class="grey--text mx-2">/</span>

            <span class="hp-max grey--text">
                {{ maxHP }}
            </span>
        </div>

        <!-- RESIST / IMMUNITY / WEAKNESS -->
        <v-row v-if="ResImWeak.length" dense class="mt-2">

            <!-- RESIST -->
            <v-col cols="4">

                <div class="section-title mb-2">
                    Сопр.
                </div>

                <div class="d-flex flex-column ga-1">
                    <v-chip v-for="res in ResImWeak" :key="res.key" small v-if="res.type === 'Resistance'">
                        {{
                            DamageType.find(t => t.key === res.key)?.name || res.key
                        }}
                        {{ res.NewValue }}
                    </v-chip>
                </div>

            </v-col>

            <!-- IMMUNITY -->
            <v-col cols="4">

                <div class="section-title mb-2">
                    Имм.
                </div>

                <div class="d-flex flex-column ga-1">
                    <v-chip v-for="res in ResImWeak" :key="res.key" small v-if="res.type === 'Weakness'">
                        {{
                            DamageType.find(t => t.key === res.key)?.name || res.key
                        }}
                    </v-chip>
                </div>

            </v-col>

            <!-- WEAKNESS -->
            <v-col cols="4">

                <div class="section-title mb-2">
                    Уяз.
                </div>

                <div class="d-flex flex-column ga-1">
                    <v-chip v-for="res in ResImWeak" :key="res.key" small v-if="res.type === 'Immunities'">
                        {{
                            DamageType.find(t => t.key === res.key)?.name || res.key
                        }}
                        {{ res.NewValue }}
                    </v-chip>
                </div>

            </v-col>

        </v-row>
    </v-card>
</template>
<script>
import WargearTraitRepositoryMixin from "~/mixins/WargearTraitRepositoryMixin";
export default {
    name: "CharacterHitPointsCard",
    mixins: [WargearTraitRepositoryMixin],
    props: {
        characterId: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            editingHp: false,
            localHP: null,

        }
    },

    computed: {
        currentHP() {
            return this.$store.getters[
                'characters/characterCurrentHitPointsById'
            ](this.characterId) || 0
        },
        maxHP() {
            return this.characterHitPointsMax()
        },
        characterAttributesEnhanced() {
            let enhancedAttributes = this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
            return enhancedAttributes;
        },
        characterResistance() {
            return this.$store.getters['characters/characterResistanceById'](this.characterId)
        },

        activeStatuses() {
            return this.$store.getters['characters/characterStatusById'](this.characterId);
        },

        characterLevel() {
            return this.$store.getters['characters/characterLevelById'](
                this.characterId
            )
        },
        Resistance() {
            return this.$store.getters["characters/characterResistanceById"](
                this.$route.params.id
            );
        },
        ResImWeak() {
            return this.Resistance
        },
        characterHitPoints() {
            return this.$store.getters["characters/characterHitPointsById"](
                this.characterId
            );
        },
    },

    methods: {
        hpColor() {
            const ratio = this.currentHP / this.maxHP

            if (ratio > 0.5) return 'lightgreen'
            if (ratio > 0.2) return 'orange'
            return 'red'
        },

        saveHp() {
            this.editingHp = false

            let newHP = this.localHP

            // защита от NaN
            if (isNaN(newHP)) newHP = 0

            // ограничение
            if (newHP > this.maxHP) newHP = this.maxHP
            if (newHP < 0) newHP = 0

            this.$store.commit('characters/setCurrentHP', {
                id: this.characterId,
                curHP: newHP
            })
        },



        characterHitPointsMax() {
            const species = this.characterHitPoints["species"]
                ? this.characterHitPoints["species"]
                : 0;
            const classh = this.characterHitPoints["class"]
                ? this.characterHitPoints["class"]
                : 0;

            const levelClass =
                (classh + (this.characterAttributesEnhanced["constitution"] - 10) / 2) *
                this.characterLevel;

            let status = 0;

            this.activeStatuses.forEach(effect => {
                if (effect && effect.rules) {
                    if (effect.rules.find(s => s.selector))
                        if (effect.rules.find(s => s.key === 'FlatModifier')) {
                            const att = effect.rules.filter(s => s.selector).find(s => s.selector.join(',').includes('hp'))


                            if (att)
                                // if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
                                status = effect.value * this.characterLevel();

                        }
                }
            })

            if (levelClass <= 0) return species - status;
            else return species + levelClass - status;
        }
    },

    watch: {
        editingHp(val) {
            if (val) {
                this.localHP = this.currentHP
            }
        },
    },

}
</script>

<style scoped>
/* Vuetify 2 — убираем спиннеры у поля внутри */
.hp-input>>>input[type="number"]::-webkit-inner-spin-button,
.hp-input>>>input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.hp-input>>>input[type="number"] {
    text-align: center;
}

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

    z-index: 0;
    /* важно */
}

/* overlay */
.glass-card::after {
    content: "";
    position: absolute;
    inset: 0;

    background: var(--ui-hover);
    opacity: 0;

    transition: opacity 0.2s ease;

    pointer-events: none;
    z-index: 1;
    /* overlay сверху */
}

/* overlay */
.glass-card::after {
    content: "";
    position: absolute;
    inset: 0;

    background: var(--ui-hover);
    opacity: 0;

    transition: opacity 0.2s ease;

    pointer-events: none;
    z-index: 1;
    /* overlay сверху */
}

/* ВСЁ содержимое карточки — выше overlay */
.glass-card>* {
    position: relative;
    z-index: 2;
}

/* hover */
.glass-card:hover {
    transform: translateY(-2px);
    border-color: var(--ui-border-strong);
    box-shadow: 0 10px 24px var(--ui-shadow);
}

.glass-card:hover::after {
    opacity: 1;
}
</style>