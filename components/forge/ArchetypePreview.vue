<template lang="html">
  <v-card class="preview-card d-flex flex-column mb-4 pa-4" outlined>


    <!-- Заголовок -->
    <v-row align="center">
      <v-col cols="8">
        <h3 class="headline mb-1">{{ item.name }}</h3>
        <span class="subtitle-2 grey--text" v-html="item.hint"></span>
      </v-col>
      <v-col cols="4" class="d-flex justify-end">
        <v-avatar size="64">
          <img :src="avatar" />
        </v-avatar>
      </v-col>
    </v-row>

    <v-divider class="my-3" />

    <!-- Ключевые аттрибуты и хиты -->
    <v-row class="d-flex" align="stretch">
      <v-col cols="12" md="6">
        <v-card outlined class="pa-4 d-flex flex-column fill-height" style="border-color: #c75d5d;">
          <strong>Ключевые аттрибуты</strong>
          <p class="mb-0" v-if="item.keyAbility.length">{{ characterLabelAttribute(item.keyAbility) }}</p>
          <p class="mb-0" v-else>{{ characterLabelAttributeBoost(item.attributeBoost) }}</p>
          <small>На 1-м уровне усиление по выбору</small>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined class="pa-2 mb-2 d-flex flex-column fill-height" style="border-color: #ff6f61;">
          <strong>Хиты</strong>
          <p class="mb-0">{{ item.hitpoints }} + мод Телосложения</p>
          <small>Макс. хитов на 1-м уровне и каждом последующем</small>
        </v-card>
      </v-col>
    </v-row>

    <!-- Навыки и атаки -->
    <v-row class="d-flex" align="stretch">

      <v-col cols="12" md="4">
        <v-card outlined class="pa-4 d-flex flex-column fill-height" style="border-color: #c75d5d;">
          <h3 class="text-h6"> Спасброски/КС </h3>

          <div v-for="item1 in SavingRepository" :key="item1.key">
            <v-chip small :color="getClassChipColor(item.saving[item1.key])" dark> {{
              characterlabel(item.saving[item1.key]) }}</v-chip>
            {{ item1.name }}
          </div>
          <div>
            <v-chip small :color="getClassChipColor(item.skillClass)" dark> {{
              characterlabel(item.skillClass) }}</v-chip> КС класса
          </div>

          <div><v-chip small :color="getClassChipColor(item.Perception)" dark> {{
            characterlabel(item.Perception) }}</v-chip> Внимательность
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card outlined class="pa-4 d-flex flex-column fill-height" style="border-color: #c75d5d;">
          <h3 class="text-h6">Атаки</h3>

          <div v-for="w in WeaponRepository" :key="w.key">
            <div v-if="item.skillAttack[w.key]">
              <v-chip small :color="getClassChipColor(item.skillAttack[w.key])" dark> {{
                characterlabel(item.skillAttack[w.key]) }}</v-chip> {{ w.name }}
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card outlined class="pa-4 d-flex flex-column fill-height" style="border-color: #c75d5d;">
          <h3 class="text-h6">Защиты</h3>

          <div v-for="w in DefenceRepository" :key="w.key">
            <div v-if="item.skillDefence[w.key]">
              <v-chip small :color="getClassChipColor(item.skillDefence[w.key])" dark> {{
                characterlabel(item.skillDefence[w.key]) }}</v-chip> {{ w.name }}
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- nen -->






    </v-row>

    <v-card outlined class="pa-4 mt-4" style="border-color: #c75d5d;">
      <h3 class="text-h6 mb-2">Навыки</h3>

      <div v-if="item.skillTrainedChoice.length">
        <strong>На выбор:</strong>
        {{ characterLabelSkillTrainedChoice(item.skillTrainedChoice) }}
      </div>

      <div v-if="item.skillTrained.length">
        <strong>Обучен:</strong>
        {{ characterLabelSkillTrainedChoice(item.skillTrained) }}
      </div>

      <div class="mt-2">
        <strong>Дополнительно:</strong>
        {{ item.skillTrainedPoints }} + мод Интеллекта
      </div>
    </v-card>





    <!-- Действия -->
    <v-divider class="my-3" />
    <v-card-actions class="card-actions-sticky">
      <v-btn class="ui-btn ui-btn--secondary" @click="$emit('cancel')">
        Отмена
      </v-btn>
      <v-spacer />
      <v-btn class="ui-btn ui-btn--primary" @click="$emit('select', item)">
        Выберите класс
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script lang="js">
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';
import StatRepository from '~/mixins/StatRepositoryMixin';
import SluggerMixin from '~/mixins/SluggerMixin';
import traitView from '~/components/TraitView';

export default {
  name: 'ArchetypePreview',
  mixins: [
    KeywordRepository,
    StatRepository,
    SluggerMixin,
  ],
  components: { traitView },
  props: {
    characterId: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    keywords: {
      type: Array,
      required: false,
      default: () => [],
    },
    psychicPowers: {
      type: Array,
      required: false,
      default: () => [],
    },
    chooseMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    avatar() {
      if (this.item === undefined) return '';
      return `/img/avatars/archetype/${this.item.key}.png`;
    },
    attributePrerequisites() {
      if (this.item.prerequisites) {
        return this.item.prerequisites
          .filter((p) => p.group === 'attributes')
          .map((a) => `${this.getAttributeByKey(a.value).name} ${a.threshold}`)
          .join(', ');
      }
      return this.item.attributes;
    },
    skillPrerequisites() {
      if (this.item.prerequisites && this.item.prerequisites.length > 0) {
        return this.item.prerequisites
          .filter((p) => p.group === 'skills')
          .map((a) => `${this.getSkillByKey(a.value).name} ${a.threshold}`)
          .join(', ');
      }
      return this.item.prerequisitesSkillString;
    },
    abilityObjects() {
      if (Array.isArray(this.item.abilities)) {
        return this.item.abilities;
      }
      return [];
    },
    wargearText() {
      if (this.item.wargearString) {
        return this.item.wargearString;
      }
      if (this.item.wargear && this.item.wargear.length > 0) {
        return this.item.wargear.map((g) => {
          if (g.amount) {
            return `${g.amount}x ${g.name}`;
          }
          return `${g.name}`;
        }).join(', ');
      }
      return this.item.wargear;
    },
    characterSettingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterFactionKey() {
      return this.$store.getters['characters/characterFactionKeyById'](this.characterId);
    },
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterArchetypeCost() {
      return this.$store.getters['characters/characterArchetypeCostsById'](this.$route.params.id);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterArchetypeTier() {
      return this.$store.getters['characters/characterArchetypeTierById'](this.characterId);
    },
    characterArchetypeKeywords() {
      return this.$store.getters['characters/characterArchetypeKeywordsById'](this.characterId);
    },
    skillAttack() {
      return this.$store.getters['characters/characterskillAttackById'](this.characterId);
    },
    skillDefence() {
      return this.$store.getters['characters/characterskillDefenceById'](this.characterId);
    },
    characterSaving() {
      return this.$store.getters['characters/characterSavingById'](this.characterId);
    },
    characterPerseption() {
      return this.$store.getters['characters/characterPerseptionById'](this.characterId);
    },
    characterArchetypeMimic() {
      return this.$store.getters['characters/characterArchetypeMimicById'](this.characterId);
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
    keywords() {
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
    enhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },
    psychicPowers() {
      return this.$store.getters['characters/characterPsychicPowersById'](this.characterId);
    },
  },
  methods: {
    characterlabel(key) {
      switch (key) {
        case "U":
          return "Нетренирован"
        case "T":
          return "Обучен"
        case "E":
          return "Эксперт"
        case "M":
          return "Мастер"
        case "L":
          return "Легенда"
        default:
          break;
      }
    },
    characterLabelAttribute(keyAbility) {
      return this.attributeRepository.filter((a) => keyAbility.includes(a.key)).map(s => s.name).join(', ')
    },
    characterLabelAttributeBoost(item) {
      return item.filter((a) => a.value > 0).map(s => s.name).join(', ')
    },
    characterLabelSkillTrainedChoice(keyAbility) {
      return this.skillRepository.filter((a) => keyAbility.includes(a.key)).map(s => s.name).join(', ')
    },
    getClassChipColor(skillKey) {
      //const rank = this.getSkillRank(skillKey);
      switch (skillKey) {
        case "U":
          return "grey";
        case "T":
          return "#171f69";
        case "E":
          return "#3c005e";
        case "M":
          return "#664400";
        case "L":
          return "#5e0000";
        default:
          return "grey";
      }
    },
    characterlabel(key) {
      switch (key) {
        case "U":
          return "Н";
        case "T":
          return "Т";
        case "E":
          return "Э";
        case "M":
          return "М";
        case "L":
          return "Л";
        default:
          return "Н";
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  border-radius: 14px;
  transition: 0.2s;
}

.ui-btn {
  border-radius: 10px;
  text-transform: none;
  font-weight: 500;
  letter-spacing: 0.2px;
  transition: 0.2s ease;
  padding: 8px 14px;
}

/* базовая кнопка */
.ui-btn--primary {
  background: var(--v-theme-surface);
  color: rgb(var(--v-theme-on-surface));
  border: 1px solid rgba(var(--v-theme-on-surface), 0.25);
}

/* 🔥 ВЫДЕЛЕННАЯ главная кнопка */
.ui-btn--accent {
  background: rgb(var(--v-theme-primary));
  color: white;
  border: 1px solid rgba(var(--v-theme-primary), 0.8);
  box-shadow: 0 4px 14px rgba(var(--v-theme-primary), 0.25);
}

/* отмена / вторичная */
.ui-btn--secondary {
  background: transparent;
  color: rgb(var(--v-theme-on-surface));
  border: 1px solid rgba(var(--v-theme-on-surface), 0.25);
}

/* hover */
.ui-btn:hover {
  transform: translateY(-1px);
}

.ui-btn--primary:hover {
  border-color: rgba(var(--v-theme-primary), 0.6);
}

.ui-btn--accent:hover {
  box-shadow: 0 6px 18px rgba(var(--v-theme-primary), 0.35);
}

/* .v-card:hover {
  transform: translateY(-2px);
} */

.right-header {
  float: right;
}

.left-header {
  float: left;
}

.h3 {
  font-size: 24px;
  font-weight: normal;
  color: #5d0000;
}

.h4 {
  color: #a76652;
  font-weight: normal;
  font-size: 20px;
  margin-top: 50px;
  margin-bottom: 10px;
}

.split-header {
  border-bottom: 1.5px solid;
  padding-bottom: 5px;
  overflow: hidden;
}

.split-header1 {
  border-bottom: 1.5px;
  padding-bottom: 5px;
  overflow: hidden;
}

.main-holder p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.two-column-holder {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.two-column-left {
  flex: 50%;
  flex-wrap: wrap;
  padding: 20px 30px;
}

@media screen and (max-width: 600px) {
  .two-column-left {
    flex: 100%;
    flex-wrap: wrap;
    padding: 20px 30px;
  }
}

.two-column-right {
  flex: 50%;
  flex-wrap: wrap;
  padding: 20px 30px;
}

.light-red-border .two-column-left {
  border-right: 1px solid #d85058;
}

@media screen and (max-width: 600px) {
  .light-red-border .two-column-left {
    border-bottom: 1px solid #d85058;
    border-right: none;
  }
}

.class-sidebar {
  /* background: #fdfdfd; */
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 2px 12px rgb(0 0 0 / 20%);
  /* color: #5c1c16; */
  word-break: break-word;
}

.dark-red-border .two-column-left {
  border-right: 1px solid #5c1c16;
}

@media screen and (max-width: 600px) {
  .dark-red-border .two-column-left {
    border-bottom: 1px solid #5c1c16;
    border-right: none;
  }
}

h1 {
  color: #3366ff;
}

h2 {
  color: #ff4d4d;
}

h3 {
  color: #ff9977;
}

h4,
h5,
h6 {
  color: #ffffff;
}

.feature-text h1 {
  color: #3366ff;
}

.feature-text h2 {
  color: #ff4d4d;
}

.feature-text h3 {
  color: #ff9977;
}

.highlight-term {
  background-color: rgba(255, 255, 0, 0.2);
  border-bottom: 1px dotted yellow;
  cursor: help;
}

.preview-card {
  height: 100%;
  /* background: var(--v-background-base); */
}

.preview-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.preview-actions {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: inherit;
}

.card-actions-sticky {
  position: sticky;
  bottom: 0;
  z-index: 10;

  background: var(--v-theme-surface);
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);

  padding-top: 12px;
  padding-bottom: 12px;
}
</style>
