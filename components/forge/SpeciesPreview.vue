<template>
  <v-card>

    <!-- 🧭 HEADER -->
    <v-card-title v-if="chooseMode" class="ui-dialog-header">
      <span>Подтвердите выбор наследия</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')">mdi-close</v-icon>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-title class="d-flex align-center">

      <div>
        <h2 class="text-h5 font-weight-bold">
          {{ species.nameAncestry }}
        </h2>
      </div>

      <v-spacer />

      <v-avatar size="96" tile>
        <img :src="avatar" />
      </v-avatar>

    </v-card-title>

    <!-- 🧬 TRAITS -->
    <v-card-text v-if="species.trait" class="pt-0">
      <trait-view :item="species" />
    </v-card-text>

    <v-divider />

    <!-- 📄 PREVIEW -->
    <v-card-text class="pa-6">

      <!-- Intro -->
      <div class="mb-4" v-html="species.previewText"></div>

      <!-- ⚙️ ATTRIBUTES -->
      <v-card class="mb-4 pa-4" outlined>
        <h3 class="text-h6 mb-2">Повышение характеристик</h3>

        <div v-for="boost in species.attributeBoost" :key="boost.name">
          <strong v-if="boost.value > 0">{{ boost.name }}</strong>
        </div>

        <div v-for="boost in species.abilityBoost" :key="boost.name">
          <strong>Свободное повышение</strong>
        </div>
      </v-card>

      <!-- ⚠️ FLAWS -->
      <v-card v-if="species.attributeFlaw.find(t => t.value < 0)" class="mb-4 pa-4" outlined>
        <h3 class="text-h6 mb-2">Понижение характеристик</h3>

        <div v-for="flaw in species.attributeFlaw" :key="flaw.name">
          <strong v-if="flaw.value < 0">
            {{ flaw.name }}
          </strong>
        </div>
      </v-card>

      <!-- 🌍 LANGUAGES -->
      <v-card class="mb-4 pa-4" outlined>
        <h3 class="text-h6 mb-2">Языки</h3>

        <div v-for="lang in species.language" :key="lang">
          <strong>{{ lang }}</strong>
        </div>

        <div class="mt-2 text--secondary">
          {{ species.freeLanguage }} на выбор + модификатор Интеллекта
        </div>
      </v-card>

      <!-- 🧬 FEATURES -->
      <v-card v-if="species.speciesFeatures.length" class="pa-4" outlined>
        <h3 class="text-h6 mb-3">Особенности родословной</h3>

        <v-expansion-panels>
          <v-expansion-panel v-for="feature in species.speciesFeatures" :key="feature.key">
            <v-expansion-panel-header>
              {{ feature.name }}
            </v-expansion-panel-header>

            <v-expansion-panel-content>

              <div v-if="feature.description">
                {{ feature.description }}
              </div>

            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

      </v-card>

    </v-card-text>

    <v-divider class="my-3" />
    <v-card-actions class="card-actions-sticky">
      <v-btn class="ui-btn ui-btn--secondary" @click="$emit('cancel')">
        Отмена
      </v-btn>
      <v-spacer />
      <v-btn class="ui-btn ui-btn--primary" @click="$emit('select', species)">
        Подтвердить
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import traitView from '~/components/TraitView';

export default {
  name: 'SpeciesPreview',
  mixins: [
    SluggerMixin,
    StatRepositoryMixin,
  ],
  components: { traitView },
  props: {
    characterId: {
      type: String,
      required: true,
    },
    species: {
      type: Object,
      required: true,
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
      chapterList: undefined,
    };
  },
  computed: {

    avatar() {
      if (this.species === undefined) return '';
      return `/img/avatars/species/${this.species.key}.png`;
    },
    attributes() {
      if (this.species === undefined || this.species.prerequisites === undefined) return undefined;
      return this.species.prerequisites.filter(pre => pre.group === 'attributes').map(pre => `${this.getAttributeByKey(pre.value).name} ${pre.threshold}`).join(', ');
    },
    skills() {
      if (this.species === undefined || this.species.prerequisites === undefined) return undefined;
      return this.species.prerequisites.filter(pre => pre.group === 'skills').map(pre => `${this.getSkillByKey(pre.value).name} ${pre.threshold}`).join(', ');
    },
  },
};
</script>

<style scoped>
.card-actions-sticky {
  position: sticky;
  bottom: 0;
  z-index: 10;

  background: var(--v-theme-surface);
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);

  padding-top: 12px;
  padding-bottom: 12px;
}

.v-card {
  border-radius: 14px;
  transition: 0.2s;
}

.v-card:hover {
  transform: translateY(-2px);
}

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
</style>
