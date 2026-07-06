<template>
    <div>
        <v-card-title class="skills-header">
            <h2 class="subtitle-1">Навыки</h2>
        </v-card-title>

        <v-data-table :headers="headers" :items="skills" dense :items-per-page="25" class="skills-table"
            hide-default-footer @click:row="openSkills">
            <template v-slot:item.name="{ item }">

                <div class="d-flex align-center">

                    <v-icon small class="mr-2">
                        mdi-run-fast
                    </v-icon>

                    {{ item.name }}

                </div>

            </template>

            <template v-slot:item.rating="{ item }">

                <v-chip x-small :color="proficiencyColor(getRating(item))" dark>
                    {{ getRating(item) }}
                </v-chip>

            </template>

            <template v-slot:item.value="{ item }">
                <v-chip small label color="primary" class="font-weight-bold">
                    {{ getValue(item) >= 0 ? '+' : '' }}{{ getValue(item) }}
                </v-chip>
            </template>
        </v-data-table>

        <v-dialog v-model="skillsDialog" max-width="1000" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
            <v-card class="ui-dialog">

                <!-- HEADER -->
                <v-card-title class="ui-dialog__header">
                    <div class="text-h6">{{ skill.name }}</div>
                    <v-spacer />
                    <v-btn icon @click="closeSkills">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-divider />

                <!-- CONTENT -->
                <v-card-text class="ui-dialog__content">

                    <!-- DESCRIPTION -->
                    <v-card class="ui-section mb-4" outlined>
                        <v-card-title class="ui-section__title">
                            Описание навыка
                        </v-card-title>
                        <v-card-text v-html="skill.description" />
                    </v-card>

                    <!-- ACTIONS -->
                    <v-card class="ui-section mb-4" outlined>
                        <v-card-title class="ui-section__title">
                            Действия
                        </v-card-title>

                        <v-list dense>
                            <v-list-item v-for="action in skill.actions || []" :key="action.id">
                                <v-list-item-content>
                                    <v-list-item-title class="font-weight-medium">
                                        {{ action.name }}
                                    </v-list-item-title>

                                    <v-list-item-subtitle v-html="action.description" />
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>

                    <!-- BREAKDOWN (НОРМАЛЬНАЯ ФОРМУЛА) -->
                    <v-card class="ui-section mb-4" outlined>
                        <v-card-title class="ui-section__title">
                            Расчёт
                        </v-card-title>

                        <div class="ui-formula">

                            <div class="ui-formula__total">
                                {{ skillTotal(skill) >= 0 ? '+' : '' }}{{ skillTotal(skill) }}
                            </div>

                            <div class="ui-formula__parts">

                                <div class="ui-formula__part">
                                    <v-chip small class="ui-chip">{{ profiencyRepository[SkillProf(skill.key)]
                                    }}</v-chip>
                                    <span>Владение</span>
                                </div>

                                <div class="ui-formula__operator">+</div>

                                <div class="ui-formula__part">
                                    <v-chip small class="ui-chip">
                                        {{ (characterAttributes[skill.attribute] - 10) / 2 }}
                                    </v-chip>
                                    <span>Атрибут</span>
                                </div>

                                <div class="ui-formula__operator">+</div>

                                <div class="ui-formula__part">
                                    <v-chip small class="ui-chip">
                                        {{ profiencyRepository[SkillProf(skill.key)] !== 0 ? characterLevel() : 0 }}
                                    </v-chip>
                                    <span>Уровень</span>
                                </div>


                                <div v-if="itemBonus(skill.key)" class="ui-formula__operator">+</div>

                                <div class="ui-formula__part" v-if="itemBonus(skill.key)">
                                    <v-chip small class="ui-chip">
                                        {{ itemBonus(skill.key).value }}
                                    </v-chip>
                                    <span>Предмет</span>
                                </div>

                            </div>
                        </div>
                    </v-card>

                    <!-- MODIFIERS -->
                    <v-card class="ui-section" outlined>
                        <v-card-title class="ui-section__title">
                            Модификаторы
                        </v-card-title>

                        <div v-for="char in charactermodificatorsBonus" :key="char.id">
                            <div v-if="char.selector === skill.key || char.selector === 'skill-check'"
                                class="ui-modifier">
                                <div class="ui-formula__part" v-if="char.type !== 'item'">
                                    <v-chip small class="ui-chip">
                                        {{ char.value }}
                                    </v-chip>
                                    <span>{{ char.type }}</span>
                                    для {{ char.predicate }}
                                </div>
                            </div>
                            <v-divider />
                        </div>
                    </v-card>

                    <v-card class="ui-section mt-4" outlined>
                        <v-card-title class="ui-section__title">
                            Таймлайн
                        </v-card-title>

                        <v-timeline dense align-top>

                            <v-timeline-item v-for="(event, index) in skill.event" :key="index"
                                :color="event.active ? 'green' : 'grey'" small>

                                <template v-slot:icon>
                                    <v-icon small>
                                        mdi-badge-account
                                    </v-icon>
                                </template>

                                <v-card class="ui-timeline-card" outlined>

                                    <v-card-title class="ui-timeline-header">
                                        <div class="ui-timeline-source">
                                            {{ event.source }}
                                        </div>

                                        <v-spacer />

                                        <v-chip small class="ui-timeline-level">
                                            Уровень {{ event.level }}
                                        </v-chip>
                                    </v-card-title>

                                    <v-card-text class="ui-timeline-text">
                                        {{ event.details }}
                                    </v-card-text>

                                </v-card>

                            </v-timeline-item>

                        </v-timeline>
                    </v-card>


                </v-card-text>

                <v-divider />

                <!-- FOOTER -->
                <v-card-actions>
                    <v-spacer />
                </v-card-actions>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>

import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";
import SluggerMixin from "~/mixins/SluggerMixin";

export default {
    props: {
        skills: Array,
        headers: Array,
        getRating: Function,
        getValue: Function,
        characterId: String,
        actionList: Array
    },
    mixins: [StatRepositoryMixin, SluggerMixin],
    data() {
        return {
            skillsDialog: false,
            skill: {}
        }
    },
    computed: {
        characterAttributes() {
            return this.$store.getters["characters/characterAttributesById"](
                this.characterId
            );
        },

        charGear() {
            return this.$store.getters['characters/characterWargearById'](this.characterId);
        },
        charactermodificatorsBonus() {
            return (
                this.$store.getters["characters/charactermodificatorsBonusById"](
                    this.characterId
                )
            );
        },
        characterSkillSheet() {
            return this.$store.getters["characters/characterSkillSheetById"](
                this.characterId
            );
        },
    },
    methods: {
        characterLevel() {
            return this.$store.getters["characters/characterLevelById"](
                this.characterId
            );
        },
        openSkills(skill) {
            ///добавляем действия к навыку
            const actions = this.actionList
                .filter((s) => s.skills)
                .filter((s) => s.skills.join(", ").includes(skill.key));

            const prof = this.characterSkillSheet
                .filter((s) => s.key === skill.key && s.combinded === false)
                .sort((a, b) => a.level - b.level);

            const event = [];
            const train = {
                0: "Нетреннированый",
                1: "Тренированный",
                2: "Эксперт",
                3: "Мастер",
                4: "Легенда",
            };

            if (prof) {
                let i = 0;

                prof.forEach((s) => {
                    let type = '';
                    switch (s.type) {
                        case 'archetype':
                            type = 'Класс'
                            break;
                        case 'skill':
                            type = 'Навык'
                            break;
                        case 'background':
                            type = 'Предыстория'
                            break;

                    }

                    event.push({
                        level: s.level,
                        source: type,
                        details: train[i] + "->" + train[i + 1],
                    });
                    i++;
                });
            }

            const skill1 = {
                ...skill,
                actions: actions,
                event: event,
            };

            this.skill = skill1;

            this.skillsDialog = true;
        },
        itemBonus(skill) {
            if (!this.charactermodificatorsBonus) return undefined
            const charGear = this.charGear.filter(item => item.equipped?.invest === true)
            const itemBonus = this.charactermodificatorsBonus.filter(
                item =>
                    item.selector === skill &&
                    item.type === 'item' &&
                    charGear.some(gear => gear.key === item.source)
            )

            let typeMaxItem = itemBonus.length > 0 ? itemBonus[0] : undefined

            if (itemBonus) {
                itemBonus.forEach(item => {
                    if (typeMaxItem.value < item.value)
                        typeMaxItem = item

                })
                return typeMaxItem
            }

            return undefined
        },

        closeSkills() {
            this.skillsDialog = false
        },
        proficiencyColor(rank) {
            switch (rank) {
                case 'Л': return '#5e0000'
                case 'М': return '#664400'
                case 'Э': return '#3c005e'
                case 'О': return '#171f69'
                default: return 'grey'
            }
        },
        skillTotal(skill) {
            const prof = this.profiencyRepository[this.SkillProf(skill.key)];
            const attr = (this.characterAttributes[skill.attribute] - 10) / 2;
            const lvl = prof !== 0 ? this.characterLevel() : 0;
            const item = this.itemBonus(skill.key) ? this.itemBonus(skill.key).value : 0;
            return prof + attr + lvl + item;
        },
        SkillProf(skill) {
            const level = this.characterLevel()
            const prof = this.characterSkillSheet.filter(
                (s) => s.key === skill && s.level <= level && s.combinded !== true
            ).length;

            switch (prof) {
                case 0:
                    return "U";
                case 1:
                    return "T";
                case 2:
                    return "E";
                case 3:
                    return "M";
                case 4:
                    return "L";
                default:
                    return "U";
            }
        },


    }
}

</script>

<style scoped>
.skills-header {
    background: linear-gradient(135deg,
            #3949ab,
            #5c6bc0);

    color: white;
    min-height: 48px;
}

.skills-table ::v-deep tbody tr {
    cursor: pointer;
    transition: all .15s ease;
}

.skills-table ::v-deep tbody tr:hover {
    background: rgba(255, 255, 255, .06);
    transform: translateX(4px);
}

.ui-dialog {
    border-radius: 16px;
    overflow: hidden;
}

.ui-dialog__header {
    background: linear-gradient(135deg,
            #3949ab,
            #5c6bc0);
    color: white;
}

/* Секции */
.ui-section {
    border-radius: 12px;
}

/* Формула */
.ui-formula {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
}

.ui-formula__total {
    font-size: 28px;
    font-weight: 600;
}

.ui-formula__parts {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}

.ui-formula__part {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
}

.ui-formula__operator {
    opacity: 0.6;
    font-weight: bold;
}

.ui-chip {
    font-weight: 600;

}

/* Модификаторы */
.ui-modifier {
    padding: 8px 0;
    opacity: 0.9;
}

.ui-timeline-card {
    border-radius: 10px;
    padding: 6px;
}

.ui-timeline-header {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-bottom: 4px;
}

.ui-timeline-source {
    font-weight: 600;
}

.ui-timeline-level {
    font-size: 11px;
    opacity: 0.85;
}

.ui-timeline-text {
    font-size: 12px;
    opacity: 0.85;
    font-style: italic;
}
</style>