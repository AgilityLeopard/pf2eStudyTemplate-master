<template>
  <v-card v-if="item">

    <!-- 🧭 HEADER -->
    <v-card-title v-if="chooseMode" class="ui-dialog-header">
      <span>Подтвердите Предысторию</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')">mdi-close</v-icon>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-title class="d-flex align-center">

      <div>
        <h2 class="text-h5 font-weight-bold">
          {{ item.nameBackground }}
        </h2>

        <!-- <div class="grey--text text--darken-1">
          {{ item.hint }}
        </div> -->
      </div>

      <v-spacer />

      <v-avatar size="96" tile>
        <img :src="`/img/avatars/species/playercore-dwarf.png`" />
      </v-avatar>

    </v-card-title>

    <v-divider />

    <!-- 📄 DESCRIPTION -->
    <v-card-text class="pa-6">

      <blockquote class="blockquote font-italic mb-4">
        <p>"{{ item.description }}"</p>
      </blockquote>

      <!-- ⚙️ BONUSES -->
      <v-card class="mb-4 pa-4" outlined>
        <h3 class="text-h6 mb-2">Характеристики</h3>

        <div>
          <strong>Выбор:</strong>
          {{ characterLabelAttribute(item.boost1) }}
        </div>

        <div class="mt-2">
          <strong>Второе повышение:</strong>
          Свободное улучшение
        </div>
      </v-card>

      <!-- 🎯 SKILLS -->
      <v-card v-if="item.skill" class="mb-4 pa-4" outlined>
        <h3 class="text-h6 mb-2">Навык</h3>

        <strong>
          {{ characterLabelSkillTrainedChoice(item.skill) }}
        </strong>
      </v-card>

      <!-- 📚 LORE -->
      <v-card v-if="item.lore" class="mb-4 pa-4" outlined>
        <h3 class="text-h6 mb-2">Знание</h3>

        <strong>{{ item.lore }}</strong>
      </v-card>

    </v-card-text>

    <v-divider v-if="chooseMode" />

    <!-- Действия -->
    <v-divider class="my-3" />
    <v-card-actions class="card-actions-sticky">
      <v-btn class="ui-btn ui-btn--secondary" @click="$emit('cancel')">
        Отмена
      </v-btn>
      <v-spacer />
      <v-btn class="ui-btn ui-btn--primary" @click="$emit('select', item)">
        Выберите Предысторию
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script lang="js">
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  name: 'AscensionPreview',
  mixins: [StatRepositoryMixin],
  props: {
    // currentCharacterTier: {
    //   type: Number,
    //   required: true,
    // },
    // maxTargetTier: {
    //   type: Number,
    //   required: true,
    // },
    item: {
      type: Object,
      required: true,
    },
    manageMode: {
      type: Boolean,
      default: false,
    },
    chooseMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      targetTier: 0,
    };
  },
  computed: {
    alertText() {
      // if (this.item.minimumCampaignTier > this.maxTargetTier) {
      //   return `The Campaign tier [${this.maxTargetTier}] does not meet the Ascensions prerequisites minimum tier [${this.item.minimumCampaignTier}]+`;
      // }
      // if (this.currentCharacterTier >= this.maxTargetTier) {
      //   return `Your character tier [${this.currentCharacterTier}] already matches the campaign tier [${this.maxTargetTier}]`;
      // }
      return false;
    },
    hasValidTierPrerequisites() {
      return this.item.minimumCampaignTier <= this.maxTargetTier;
    },
    targetTierOptions() {
      // const from = Math.max(this.currentCharacterTier + 1, this.item.minimumCampaignTier);
      // const to = this.maxTargetTier;
      return [];
    },
  },
  methods: {
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
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
  },

};
</script>

<style scoped>
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

.card-actions-sticky {
  position: sticky;
  bottom: 0;
  z-index: 10;

  background: var(--v-theme-surface);
  border-top: 1px solid rgba(var(--v-theme-on-surface), 0.08);

  padding-top: 12px;
  padding-bottom: 12px;
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
