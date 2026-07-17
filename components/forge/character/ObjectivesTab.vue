<template>
    <div class="pa-2">
        <v-row>
            <!-- LEFT COLUMN -->
            <v-col cols="12" md="6">
                <v-card class="pa-3" outlined>
                    <v-tabs v-model="tab" background-color="transparent" grow>
                        <v-tab>General</v-tab>
                        <v-tab>Organized Play</v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">
                        <!-- GENERAL -->
                        <v-tab-item>
                            <v-card flat>
                                <v-textarea v-for="field in generalFields" :key="field.key" :placeholder="field.label"
                                    rows="1" auto-grow hide-details :value="getFluff(field.key)"
                                    @input="value => $emit('update-fluff', field.key, value)" />
                            </v-card>
                        </v-tab-item>

                        <!-- ORGANIZED PLAY -->
                        <v-tab-item>
                            <v-card flat>
                                <v-textarea label="Organized Play ID" dense />
                                <v-row>
                                    <v-col>
                                        <v-textarea label="Faction" dense />
                                    </v-col>
                                    <v-col cols="4">
                                        <v-textarea label="Rep" dense />
                                    </v-col>
                                </v-row>
                                <v-divider class="my-3" />
                                <div class="d-flex justify-space-between align-center">
                                    <span class="text-subtitle-1">Adventures</span>
                                    <v-btn small outlined>Add</v-btn>
                                </div>
                                <v-row class="text-center mt-2">
                                    <v-col v-for="stat in adventureStats" :key="stat.label">
                                        <div>{{ stat.label }}</div>
                                        <v-chip>{{ stat.value }}</v-chip>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-tab-item>
                    </v-tabs-items>
                </v-card>
            </v-col>

            <!-- RIGHT COLUMN -->
            <v-col cols="12" md="6">
                <!-- Languages -->
                <v-card class="pa-3 mb-3" outlined>
                    <div class="text-h6 mb-2">Языки</div>
                    <v-chip v-for="language in languages" :key="language.name" class="ma-1">
                        {{ language.name }}
                    </v-chip>
                </v-card>

                <!-- Traits -->
                <v-card class="pa-3 mb-3" outlined>
                    <div class="text-h6 mb-2">Трейты</div>
                    <v-chip v-for="trait in keywords" :key="trait.name" class="ma-1">
                        {{ trait.name }}
                    </v-chip>
                </v-card>

                <!-- Size -->
                <v-card v-if="characterSpecies" class="pa-3 mb-3" outlined>
                    <div class="text-h6 mb-2">Размер</div>
                    <v-chip>{{ getSizeName(characterSpecies.size) }}</v-chip>
                </v-card>

                <!-- Proficiencies -->
                <v-card class="pa-3" outlined>
                    <div class="text-h6 mb-2">Владения</div>

                    <v-expansion-panels>
                        <v-expansion-panel>
                            <v-expansion-panel-header>Атаки</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list dense>
                                    <v-list-item v-for="item in weaponRepository" :key="item.key"
                                        v-if="skillAttack[item.key]">
                                        <v-list-item-content>{{ item.name }}</v-list-item-content>
                                        <v-chip small :color="getProficiencyColor(skillAttack[item.key])" dark>
                                            {{ getProficiencyLabel(skillAttack[item.key]) }}
                                        </v-chip>
                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                            <v-expansion-panel-header>Защиты</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list dense>
                                    <v-list-item v-for="item in defenceRepository" :key="item.key"
                                        v-if="skillDefence[item.key]">
                                        <v-list-item-content>{{ item.name }}</v-list-item-content>
                                        <v-chip small :color="getProficiencyColor(skillDefence[item.key])" dark>
                                            {{ getProficiencyLabel(skillDefence[item.key]) }}
                                        </v-chip>
                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel v-if="characterArchetype?.spellProgression">
                            <v-expansion-panel-header>Заклинательская Сложность</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list dense>
                                    <v-list-item>
                                        <v-list-item-content>Сложность заклинаний</v-list-item-content>
                                        <span>{{ spellDC }}</span>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-content>Атака заклинанием</v-list-item-content>
                                        <span>+{{ spellAttack }}</span>
                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel v-if="characterArchetype">
                            <v-expansion-panel-header>Сложность Класса</v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list dense>
                                    <v-list-item>
                                        <v-list-item-content>Сложность Класса</v-list-item-content>
                                        <span>{{ classDC }}</span>
                                    </v-list-item>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

const PROFICIENCY_LABEL = { U: 'Н', T: 'Т', E: 'Э', M: 'М', L: 'Л' }
const PROFICIENCY_COLORS = {
    U: 'grey',
    T: '#171f69',
    E: '#3c005e',
    M: '#664400',
    L: '#5e0000',
}

export default {
    name: 'ObjectivesTab',

    props: {
        characterId: { type: String, required: true },
        characterSpecies: { type: Object, default: null },
        characterArchetype: { type: Object, default: null },
        languages: { type: Array, default: () => [] },
        keywords: { type: Array, default: () => [] },
        skillAttack: { type: Object, default: () => ({}) },
        skillDefence: { type: Object, default: () => ({}) },
        weaponRepository: { type: Array, default: () => [] },
        defenceRepository: { type: Array, default: () => [] },
        getFluff: { type: Function, required: true },
    },

    data() {
        return {
            tab: 0,
            generalFields: [
                { key: 'appearance', label: 'Внешность' },
                { key: 'personality', label: 'Характер' },
                { key: 'alignment', label: 'Мировоззрение' },
                { key: 'beliefs', label: 'Убеждения' },
                { key: 'age', label: 'Возраст' },
                { key: 'height', label: 'Рост' },
                { key: 'weight', label: 'Вес' },
                { key: 'gender', label: 'Пол' },
                { key: 'faction', label: 'Фракция' },
                { key: 'ethnicity', label: 'Этнос' },
                { key: 'nationality', label: 'Национальность' },
                { key: 'birthplace', label: 'Место рождения' },
            ],
            adventureStats: [
                { label: 'Lvl', value: 1 },
                { label: 'XP', value: 0 },
                { label: 'GP', value: 0 },
                { label: 'Rep', value: 0 },
            ],
        }
    },

    computed: {
        ...mapGetters('characters', ['characterLevelById']),

        characterLevel() {
            return this.characterLevelById(this.characterId) || 1
        },

        spellDC() {
            if (!this.characterArchetype?.spellProgression) return 0
            const prof = this.characterArchetype.spellsClass?.class || 'U'
            const attrKey = this.characterArchetype.attributeBoost?.find(t => t.value > 0)?.key || 'intelligence'
            const attr = this.$store.getters['characters/characterAttributesById'](this.characterId)?.[attrKey] || 10
            const profValue = this.getProficiencyValue(prof)

            return 10 + profValue + Math.floor((attr - 10) / 2) + this.characterLevel
        },

        spellAttack() {
            if (!this.characterArchetype?.spellProgression) return 0
            const prof = this.characterArchetype.spellsClass?.attack || 'U'
            const attrKey = this.characterArchetype.attributeBoost?.find(t => t.value > 0)?.key || 'intelligence'
            const attr = this.$store.getters['characters/characterAttributesById'](this.characterId)?.[attrKey] || 10
            const profValue = this.getProficiencyValue(prof)

            return profValue + Math.floor((attr - 10) / 2) + this.characterLevel
        },

        classDC() {
            if (!this.characterArchetype) return 0
            const prof = this.$store.getters['characters/characterSkillClassById'](this.characterId) || 'U'
            const profValue = this.getProficiencyValue(prof)

            return 10 + profValue + this.characterLevel
        },
    },

    methods: {
        getProficiencyLabel(key) {
            return PROFICIENCY_LABEL[key] || 'Н'
        },

        getProficiencyValue(key) {
            const map = { U: 0, T: 2, E: 4, M: 6, L: 8 }
            return map[key] || 0
        },

        getProficiencyColor(key) {
            return PROFICIENCY_COLORS[key] || 'grey'
        },

        getSizeName(size) {
            if (!size) return ''
            const repo = this.$store.state.species?.sizeRepository || []
            const found = repo.find(s => s.key === size)
            return found?.name || ''
        },
    },
}
</script>

<style scoped lang="scss">
// Стили наследуются от родителя
</style>