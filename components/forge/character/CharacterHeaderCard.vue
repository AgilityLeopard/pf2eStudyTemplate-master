<template>
    <v-card class="glass-card stat-card pa-4" height="100%">
        <v-row dense>

            <!-- LEFT -->
            <v-col cols="12" sm="6" class="d-flex">
                <div class="left-block">

                    <v-avatar size="80" class="avatar">
                        <img :src="avatar" />
                    </v-avatar>

                    <div class="name">
                        {{ characterName }}
                    </div>

                    <div class="tags">
                        <v-btn small depressed class="tag-btn">
                            <v-icon left small>mdi-tree</v-icon>{{ species }}
                        </v-btn>

                        <v-btn small depressed class="tag-btn">
                            <v-icon left small>mdi-window-maximize</v-icon>{{ archetype }}
                        </v-btn>

                        <v-btn small depressed class="tag-btn">
                            <v-icon left small>mdi-book</v-icon>{{ backgroundLabel }}
                        </v-btn>
                    </div>

                </div>
            </v-col>

            <!-- RIGHT -->
            <v-col cols="12" sm="6" class="d-flex">
                <div class="right-block">

                    <div class="actions">
                        <v-btn small depressed @click="handlePrint">Печать</v-btn>
                        <v-btn small depressed :to="editLink">Изменить</v-btn>
                    </div>

                    <div class="level">
                        Уровень {{ level }}
                    </div>

                    <div class="xp-block">
                        <span class="xp-label">XP</span>
                        <v-text-field dense hide-details solo flat class="xp-input" :value="xp" @input="updateXp" />
                    </div>

                </div>
            </v-col>

        </v-row>
    </v-card>
</template>
<script>

import { fillPdf } from '~/utils/fillPdf'
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';

export default {
    mixins: [

        StatRepositoryMixin,


        KeywordRepository,

    ],
    props: {
        characterId: String
    },
    data() {
        return {
            SkillsTrained: {
                U: 0,
                T: 2,
                E: 4,
                M: 6,
                L: 8,
            },
        }
    },

    computed: {
        characterName() {
            return this.$store.getters['characters/characterNameById'](this.characterId)
        },

        level() {
            return this.$store.getters['characters/characterLevelById'](this.characterId)
        },

        xp() {
            return this.$store.getters['characters/characterXpById'](this.characterId)
        },
        characterAttributesEnhanced() {
            let enhancedAttributes = this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
            return enhancedAttributes;
        },
        avatar() {
            const customAvatarUrl = this.$store.getters['characters/characterAvatarUrlById'](this.characterId);

            if (customAvatarUrl) {
                return customAvatarUrl;
            }

            if (this.archetypeKey !== undefined) {
                if (!['core-ratling', 'core-ogryn'].includes(this.speciesKey)) {
                    return `/img/avatars/archetype/${this.archetypeKey}.png`;
                }
            }

            if (this.speciesKey !== undefined) {
                return `/img/avatars/species/${this.speciesKey}.png`;
            }

            return '/img/avatars/species/playercore-human.png';
        },

        species() {
            return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId)
        },
        activeStatuses() {
            return this.$store.getters['characters/characterStatusById'](this.characterId);
        },
        archetype() {
            return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId)
        },

        background() {
            return this.$store.getters['characters/characterBackgroundLabelById'](this.characterId)
        },
        backgroundLabel() {
            return this.$store.getters['characters/characterAscensionLabelById'](this.characterId);
        },
        editLink() {
            return `/forge/characters/${this.characterId}/builder/setting`
        },
        skills() {
            const customSkills = this.$store.getters['characters/characterCustomSkillsById'](this.characterId);

            const adHocSkillRepository = [
                ...this.skillRepository,
                ...customSkills,
            ];

            const characterSkills = this.$store.getters['characters/characterSkillsById'](this.characterId);
            const characterAttributes = this.attributeRepository;

            let skills = adHocSkillRepository.map((repositorySkill) => {
                const skill = {
                    ...repositorySkill,
                    value: characterSkills[repositorySkill.key],
                    enhancedValue: parseInt(characterSkills[repositorySkill.key]),
                    rating: characterSkills[repositorySkill.key],
                    adjustedRating: parseInt(characterSkills[repositorySkill.key]),
                    adjustment: 0,
                    conditionalAdjustment: 0,
                    attributeName: characterAttributes.find((a) => a.key === repositorySkill.attribute).name,
                    dnPenalty: 0,
                    modifiers: [],
                    adjustedAttributeValue: 0,
                    attributeObject: {},
                };

                // Добавим модификаторы от состояний
                // this.statusRepository.forEach(status => {
                //   const effect = this.activeStatuses[status.key];
                //   if (effect) {
                //     // Логика применения эффектов к навыкам
                //     skill.modifiers.push(`${effect.value} • ${status.name}`);
                //   }
                // });

                this.activeStatuses.forEach(effect => {
                    if (effect && effect.rules) {
                        if (effect.rules.find(s => s.selector))
                            if (effect.rules.find(s => s.key === 'FlatModifier')) {
                                const att = effect.rules.find(s => s.selector).selector.filter(s => s.slice(3) === '-based' || s === 'all' || s === 'skill-check').map(s => s.slice(0, 3));


                                if (att.find(s => s === skill.attribute.slice(0, 3)) || att.find(s => s === 'all') || att.find(s => s === 'ski'))
                                    if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
                                        skill.conditionalAdjustment = effect.value
                                    else
                                        skill.conditionalAdjustment = -effect.rules.find(s => s.key === 'FlatModifier').value;

                            }
                    }
                })

                return skill;
            });

            return skills;
        },
        attributes() {

            const characterAttributes = this.$store.getters['characters/characterAttributesById'](this.characterId);
            let attributes = this.attributeRepository.map((repositoryAttribute) => {
                return {
                    ...repositoryAttribute,
                    value: characterAttributes[repositoryAttribute.key],
                    enhancedValue: parseInt(this.characterAttributesEnhanced[repositoryAttribute.key]),
                    rating: characterAttributes[repositoryAttribute.key],
                    adjustedRating: parseInt(characterAttributes[repositoryAttribute.key]),
                    adjustment: 0,
                    short: repositoryAttribute.short,
                    mod: (characterAttributes[repositoryAttribute.key] - 10) / 2,
                    modifiers: [],
                    conditionalAdjustment: 0,
                };
            });


            this.activeStatuses.forEach(status => {
                const effect = this.statusEffects[status.key];
                if (effect && effect.type === 'attribute') {
                    const attr = attributes.find(a => a.key === effect.target);
                    if (attr) {
                        attr.adjustment += effect.value;
                        attr.adjustedRating += effect.value;
                        attr.modifiers.push(`${effect.value} • ${status.name}`);
                    }
                }
            });


            return attributes;
        },
        keywords() {
            const enrichedKeywords = [];
            const characterKeywords = this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
            if (characterKeywords) {
                characterKeywords.forEach(charKeyword => {
                    const keyword = {
                        name: charKeyword?.replacement || charKeyword.name,
                        type: null,
                        description: 'Alright then, keep your secrets.',
                        custom: charKeyword?.custom || false,
                    };
                    const k = this.keywordCombinedRepository.find(i => i.name === keyword.name);
                    keyword.description = k?.description || charKeyword.description;
                    keyword.type = k?.type || 'Custom';
                    enrichedKeywords.push(keyword);
                });
            }
            return enrichedKeywords;
        },
    },

    methods: {
        updateXp(val) {
            this.$store.commit('characters/setXp', {
                id: this.characterId,
                xp: val
            })
        },

        async handlePrint() {
            const data = this.getCharacterData()
            const pdfUrl = await fillPdf(data)

            window.open(pdfUrl, '_blank')
        },


        getCharacterData() {
            return {
                characterId: this.characterId,

                characterName: this.$store.getters['characters/characterNameById'](this.characterId),
                characterRank: this.$store.getters['characters/characterLevelById'](this.characterId),
                wear: this.$store.getters["characters/characterWearById"](
                    this.characterId
                ),
                characterAttributes: this.$store.getters['characters/characterAttributesById'](this.characterId),
                characterAttributesEnhanced: this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId),
                SkillsTrained: this.SkillsTrained,
                skills: this.skills,
                talents: this.$store.getters['characters/characterTalentsById'](this.characterId),

                characterSkills: this.$store.getters['characters/characterSkillsById'](this.characterId),

                characterArchetype: this.characterArchetype,

                speciesLabel: this.$store.getters['characters/characterSpeciesLabelById'](this.characterId),
                backgroundLabel: this.$store.getters['characters/characterBackgroundLabelById'](this.characterId),
                archetypeLabel: this.$store.getters['characters/characterArchetypeLabelById'](this.characterId),

                keywords: this.keywords,

                profiencyRepository: this.profiencyRepository,
                skillDefence: this.$store.getters["characters/characterskillDefenceById"](
                    this.characterId
                ),
            }
        },
    }
}
</script>

<style scoped>
.left-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.avatar {
    background: var(--ui-surface-soft);
    border: 1px solid var(--ui-border);
}

.name {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--ui-text);
    text-align: center;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 6px;
}

/* RIGHT */
.right-block {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
}

.actions {
    display: flex;
    gap: 8px;
}

.level {
    font-size: 0.95rem;
    color: var(--ui-muted);
}

/* XP BLOCK */
.xp-block {
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 4px 10px;

    background: var(--ui-surface-soft);
    border: 1px solid var(--ui-border);
    border-radius: 999px;

    transition: all 0.15s ease;
}

.xp-block:hover {
    background: var(--ui-surface-hover);
    border-color: var(--ui-border-strong);
}

.xp-label {
    font-size: 0.75rem;
    color: var(--ui-muted);
}

.xp-input {
    max-width: 80px;
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