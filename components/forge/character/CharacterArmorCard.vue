<template>
    <v-card class="glass-card pa-3 stat-card" height="100%">
        <v-row dense>

            <!-- Левая колонка (иконка + значение) -->
            <v-col cols="12" :sm="shieldClass !== undefined ? 3 : 6" class="d-flex stat-row stat-left">
                <stat-icon-number title="КД" :value="armorClass">
                    <app-icon name="ac" />
                </stat-icon-number>
            </v-col>

            <!-- Левая колонка (иконка + значение) -->
            <v-col cols="12" sm="3" class="d-flex stat-row stat-left" v-if="shieldClass">
                <shield-stat :value="shieldClass?.acBonus" :current="shieldClass?.hp?.value" :max="shieldClass?.hp?.max"
                    :hardness="shieldClass.hardness" @update-hp="updateShieldHp" />

            </v-col>


            <!-- Правая колонка (список) -->
            <v-col cols="12" sm="6">
                <v-row dense>
                    <v-col cols="12" class="d-flex stat-row">
                        <stat-group label="Рефлекс:" :value="reflexSave"
                            @click.native="openSaves(SavingRepository.find(k => k.key === 'reflex'))" />
                    </v-col>
                    <v-col cols="12" class="d-flex stat-row">
                        <stat-group label="Стойкость:" :value="fortitudeSave"
                            @click.native="openSaves(SavingRepository.find(k => k.key === 'fortitude'))" />
                    </v-col>
                    <v-col cols="12" class="d-flex stat-row">
                        <stat-group label="Воля:" :value="willSave"
                            @click.native="openSaves(SavingRepository.find(k => k.key === 'will'))" />
                    </v-col>
                </v-row>
            </v-col>


        </v-row>


        <v-dialog v-model="savesDialog" max-width="600" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
            <v-card class="ui-dialog">

                <v-card-title class="ui-dialog__header">
                    <div class="text-h6">Спасбросок</div>
                    <v-spacer />
                    <v-btn icon @click="closeSaves">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-title>

                <v-divider />

                <v-card-text class="ui-dialog__content">

                    <v-card class="ui-section mb-4" outlined>
                        <v-card-title class="ui-section__title">
                            Описание
                        </v-card-title>
                        <v-card-text v-html="save.description" />
                    </v-card>

                    <v-card class="ui-section" outlined>
                        <v-card-title class="ui-section__title">
                            Расчёт
                        </v-card-title>

                        <div class="ui-formula">

                            <div class="ui-formula__total">
                                {{ saveTotal(save) >= 0 ? '+' : '' }}{{ saveTotal(save) }}
                            </div>

                            <div class="ui-formula__parts">

                                <div class="ui-formula__part">
                                    <v-chip small class="ui-chip">
                                        {{ profiencyRepository[characterSaving[save.key]] }}
                                    </v-chip>
                                    <span>Владение</span>
                                </div>

                                <div class="ui-formula__operator">+</div>

                                <div class="ui-formula__part">
                                    <v-chip small class="ui-chip">
                                        {{ (characterAttributes[save.attribute] - 10) / 2 }}
                                    </v-chip>
                                    <span>Атрибут</span>
                                </div>

                                <div class="ui-formula__operator">+</div>

                                <div class="ui-formula__part">
                                    <v-chip small class="ui-chip">
                                        {{ profiencyRepository[characterSaving[save.key]] !== 0 ? characterLevel : 0
                                        }}
                                    </v-chip>
                                    <span>Уровень</span>
                                </div>

                                <div v-if="itemBonus(save.key)" class="ui-formula__operator">+</div>

                                <div class="ui-formula__part" v-if="itemBonus(save.key)">
                                    <v-chip small class="ui-chip">
                                        {{ itemBonus(save.key).value }}
                                    </v-chip>
                                    <span>Предмет</span>
                                </div>



                            </div>
                        </div>

                    </v-card>

                    <v-card class="ui-section mt-4" outlined>
                        <v-card-title class="ui-section__title">
                            Таймлайн
                        </v-card-title>

                        <v-timeline dense align-top>

                            <v-timeline-item v-for="(event, index) in save.event" :key="index"
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

                <v-card-actions>
                    <v-spacer />
                </v-card-actions>

            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import StatGroup from "~/components/forge/StatGroup.vue"
import StatIconNumber from '~/components/forge/StatIconNumber.vue';
import AppIcon from '~/components/forge/Icon.vue';
import ShieldStat from '~/components/forge/icons/ShieldStat.vue'
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import WargearTrait from '~/mixins/WargearTraitRepositoryMixin';
import WargearMixin from '~/mixins/WargearMixin';

export default {
    name: "CharacterArmorCard",
    mixins: [
        WargearTrait,
        StatRepositoryMixin,
        WargearMixin


    ],
    components: {
        StatGroup,
        StatIconNumber,
        AppIcon,
        ShieldStat
    },

    props: {
        characterId: String,
        armorClass: Number
    },
    data() {
        return {
            attributeRepository: this.$parent.attributeRepository,
            save: {
                key: "reflex",
                name: "Рефлекс",
                attribute: "dexterity",
                description: "A character’s overall physical prowess",
            },
            savesDialog: false
        }
    },
    computed: {
        potencyArmor() {
            const wear = this.$store.getters["characters/characterWearById"](
                this.characterId
            );

            return wear && wear.runes ? wear.runes.potency : 0
        },
        reflexSave() {
            return this.ModAttributeSavingWithStatuses("dexterity", "reflex")
        },
        fortitudeSave() {
            return this.ModAttributeSavingWithStatuses("constitution", "fortitude")
        },
        skillDefence() {
            return this.$store.getters['characters/characterskillDefenceById'](this.characterId);
        },
        willSave() {
            return this.ModAttributeSavingWithStatuses("wisdom", "will")
        },
        characterSaving() {
            return this.$store.getters["characters/characterSavingById"](
                this.characterId
            );
        },
        shieldClass() {
            return this.characterShield()
        },
        armorClass1() {
            const wear = this.$store.getters["characters/characterWearById"](
                this.characterId
            );

            let status = 0;
            // console.log(wear)
            // this.activeStatuses.forEach(effect => {
            //     if (effect && effect.rules) {
            //         if (effect.rules.find(s => s.selector))
            //             if (effect.rules.find(s => s.key === 'FlatModifier')) {
            //                 const att = effect.rules.find(s => s.selector).selector.filter(s => s === 'ac' || s === 'all');


            //                 if (att)
            //                     if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
            //                         status = effect.value
            //                     else
            //                         status = -effect.rules.find(s => s.key === 'FlatModifier').value;

            //             }
            //     }
            // })

            if (wear) {
                const modDex = Math.floor(
                    (this.characterAttributes["dexterity"] - 10) / 2
                );
                const wearModDex = wear.dexCap ? wear.dexCap : 0;
                const dex = modDex > wearModDex ? wearModDex : modDex;
                const Def = wear.category
                    ? this.profiencyRepository[this.skillDefence[wear.category]]
                    : 0;
                let potency

                potency = this.potencyArmor || 0;
                const bonusAC = wear.acBonus ? wear.acBonus : 0;
                const arm = Def === 0 ? 0 : this.characterLevel;

                return 10 + dex + Def + arm + bonusAC + potency - status;
            }

            const modDex = Math.floor(
                (this.characterAttributes["dexterity"] - 10) / 2
            );
            const Def = this.profiencyRepository[this.skillDefence["unarmored"]];
            return 10 + modDex + Def - status;
        },
        characterLevel() {
            return this.$store.getters['characters/characterLevelById'](this.characterId);
        },
        characterAttributes() {
            return this.$store.getters["characters/characterAttributesById"](
                this.characterId
            );
        },
        charGear() {
            return this.$store.getters['characters/characterWargearById'](this.$route.params.id);
        },
        charactermodificatorsBonus() {
            return (
                this.$store.getters["characters/charactermodificatorsBonusById"](
                    this.$route.params.id
                )
            );
        },

    },
    methods: {

        // Обновленные методы с учетом состояний
        ModAttributeSavingWithStatuses(attribute, skill) {
            const char1 = this.profiencyRepository[this.characterSaving[skill]];
            const char2 = (this.characterAttributes[attribute] - 10) / 2;
            const char3 = this.characterLevel;
            const item = this.itemBonus(skill) && this.itemBonus(skill).value ? this.itemBonus(skill).value : 0

            let status = 0;

            // this.activeStatuses.forEach(effect => {
            //     if (effect && effect.rules) {
            //         if (effect.rules.find(s => s.selector))
            //             if (effect.rules.find(s => s.key === 'FlatModifier')) {
            //                 const att = effect.rules.find(s => s.selector).selector.filter(s => s === 'saving-throw' || s === 'all');


            //                 if (att.length !== 0)
            //                     if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
            //                         status = effect.value
            //                     else
            //                         status = -effect.rules.find(s => s.key === 'FlatModifier').value;

            //             }
            //     }
            // })
            const result = parseInt(char1) + parseInt(char2) + parseInt(char3) + parseInt(item) - status;

            return result > 0 ? "+" + result : result;

        },

        characterArmor() {
            const wear = this.$store.getters["characters/characterWearById"](
                this.characterId
            );

            let status = 0;
            // console.log(wear)
            // this.activeStatuses.forEach(effect => {
            //     if (effect && effect.rules) {
            //         if (effect.rules.find(s => s.selector))
            //             if (effect.rules.find(s => s.key === 'FlatModifier')) {
            //                 const att = effect.rules.find(s => s.selector).selector.filter(s => s === 'ac' || s === 'all');


            //                 if (att)
            //                     if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
            //                         status = effect.value
            //                     else
            //                         status = -effect.rules.find(s => s.key === 'FlatModifier').value;

            //             }
            //     }
            // })

            if (wear) {
                const modDex = Math.floor(
                    (this.characterAttributes["dexterity"] - 10) / 2
                );
                const wearModDex = wear.dexCap ? wear.dexCap : 0;
                const dex = modDex > wearModDex ? wearModDex : modDex;
                const Def = wear.category
                    ? this.profiencyRepository[this.skillDefence[wear.category]]
                    : 0;
                let potency

                potency = this.potencyArmor || 0;
                const bonusAC = wear.acBonus ? wear.acBonus : 0;
                const arm = Def === 0 ? 0 : this.characterLevel;

                return 10 + dex + Def + arm + bonusAC + potency - status;
            }

            const modDex = Math.floor(
                (this.characterAttributes["dexterity"] - 10) / 2
            );
            const Def = this.profiencyRepository[this.skillDefence["unarmored"]];
            return 10 + modDex + Def - status;
        },
        characterShield() {
            const wear = this.$store.getters["characters/characterWearShieldById"](
                this.characterId
            );



            if (wear && Object.keys(wear).length > 0) {
                return wear
            }
            return undefined
        },
        updateShieldHp(newHp) {
            return this.$parent.characterShieldHP(newHp)
        },
        enhancements() {
            return this.$store.getters["characters/characterEnhancementsById"](
                this.characterId
            );
        },
        saveTotal(skill) {
            const prof = this.profiencyRepository[this.characterSaving[skill.key]];
            const attr = (this.characterAttributes[skill.attribute] - 10) / 2;
            const lvl = prof !== 0 ? this.characterLevel : 0;
            const item = this.itemBonus(skill.key) ? this.itemBonus(skill.key).value : 0
            return prof + attr + lvl + item;
        },
        itemBonus(skill) {
            if (!this.charactermodificatorsBonus) return undefined
            const wear = this.$store.getters["characters/characterWearById"](
                this.characterId
            );
            const charGear = [
                ...this.charGear.filter(item => item.equipped?.invest === true),
                wear
            ].filter(Boolean);
            const itemBonus = this.charactermodificatorsBonus.filter(
                item =>
                    (item.selector.includes(skill) || item.selector.includes("saving-throw")) &&
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
        openSaves(save) {
            this.save = save;
            const event = [];
            const train = {
                "U": "Нетреннированый",
                "T": "Тренированный",
                "E": "Эксперт",
                "M": "Мастер",
                "L": "Легенда",
            };


            const level = this.characterLevel;
            const prof = this.enhancements()
                .filter((s) => s.key === save.key).filter(s => s.level <= level).sort((a, b) => b.level - a.level);

            if (prof) {
                let i = 0;

                prof.forEach((s) => {
                    let type = '';
                    switch (s.source) {
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
                        details: train[s.upgrade],
                    });
                    i++;
                });
            }

            const save1 = {
                ...save,
                // actions: actions,
                event: event,
            };

            this.save = save1;

            this.savesDialog = true;
        },
        closeSaves() {
            this.savesDialog = false;
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

.stat-left {
    justify-content: center;
}

.ui-dialog {
    border-radius: 14px;
}

.ui-dialog__header {
    background: #262e37;
    color: #fff;
}

.ui-dialog__content {
    background: var(--ui-surface, #1e1e1e);
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