<template lang="html">
  <v-card v-if="item" class="pa-4 elevation-3">
    <!-- Заголовок класса -->
    <v-row align="center">
      <v-col cols="12" md="8">
        <h2 class="headline">{{ item.name }}</h2>
        <span class="subtitle-1 grey--text" v-html="item.hint"></span>
      </v-col>
      <v-col cols="12" md="4" class="d-flex justify-end">
        <v-avatar size="96">
          <img :src="avatar" />
        </v-avatar>
      </v-col>
    </v-row>

    <v-divider class="my-4" />

    <!-- Основные параметры и хиты -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-card outlined class="pa-3 light-red-border">
          <h3 class="subtitle-1 mb-2">Ключевые аттрибуты</h3>
          <p v-if="item.keyAbility.length"><strong>{{ characterLabelAttribute(item.keyAbility) }}</strong></p>
          <p v-else><strong>{{ characterLabelAttributeBoost(item.attributeBoost) }}</strong></p>
          <p>На 1-м уровне ваш класс дает усиление по вашему выбору</p>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined class="pa-3 light-red-border">
          <h3 class="subtitle-1 mb-2">Хиты</h3>
          <p><strong>{{ item.hitpoints }} + мод Телосложения</strong></p>
          <p>Увеличение максимального количества хитов на каждом уровне</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Навыки, атаки и защиты -->
    <v-row class="mb-4">
      <v-col cols="12" md="6">
        <v-card outlined class="pa-3 dark-red-border">
          <h3 class="subtitle-1 mb-2">Навыки</h3>
          <p v-if="item.skillTrainedChoice.length">
            <strong>Обучен в навыке (на выбор):</strong> {{ characterLabelSkillTrainedChoice(item.skillTrainedChoice) }}
          </p>
          <p v-if="item.skillTrained.length">
            <strong>Обучен в навыке:</strong> {{ characterLabelSkillTrainedChoice(item.skillTrained) }}
          </p>
          <p><strong>Дополнительные навыки:</strong> {{ item.skillTrainedPoints }} + мод Интеллекта</p>

          <h3 class="subtitle-1 mb-2 mt-3">Внимательность</h3>
          <p>{{ characterlabel(characterPerseption) }}</p>

          <h3 class="subtitle-1 mb-2 mt-3">Спасброски</h3>
          <span v-for="save in SavingRepository" :key="save.key">
            <p>{{ characterlabel(item.saving[save.key]) }} в {{ save.name }}</p>
          </span>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card outlined class="pa-3 dark-red-border">
          <h3 class="subtitle-1 mb-2">Атаки</h3>
          <span v-for="w in WeaponRepository" :key="w.key">
            <p v-if="item.skillAttack[w.key]">{{ characterlabel(item.skillAttack[w.key]) }} в {{ w.name }}</p>
          </span>

          <h3 class="subtitle-1 mb-2 mt-3">Защиты</h3>
          <span v-for="d in DefenceRepository" :key="d.key">
            <p v-if="item.skillDefence[d.key]">{{ characterlabel(item.skillDefence[d.key]) }} в {{ d.name }}</p>
          </span>

          <h3 class="subtitle-1 mb-2 mt-3">Класс Сл</h3>
          <p>{{ characterlabel(item.skillClass) }}</p>
        </v-card>
      </v-col>
    </v-row>

    <!-- Особенности класса -->
    <v-row>
      <v-col cols="12">
        <h3 class="headline mb-3">Особенности класса</h3>
        <v-row>
          <v-col cols="12" md="6" v-for="feature in item.archetypeFeatures" :key="feature.key">
            <v-card outlined class="pa-3 mb-3 elevation-2">
              <div class="d-flex justify-space-between mb-2">
                <strong>{{ feature.name }}</strong>
                <span>Уровень {{ feature.level }}</span>
              </div>
              <div v-if="feature.description" v-html="feature.description"></div>
              <div v-if="feature.snippet" v-html="feature.snippet"></div>
              <div v-if="feature.action" v-html="feature.action.description"></div>

              <!-- Опции фич -->
              <div v-if="feature.options" v-for="opt in feature.options" :key="opt.key" class="mt-2">
                <h4 v-if="opt.name">{{ opt.name }}</h4>
                <trait-view v-if="opt" :item="opt" style="font-size: 14px" class="mb-1" />
                <div v-if="opt.snippet" v-html="opt.snippet"></div>
                <div v-if="opt.feat"><strong>Черта:</strong> <span v-html="opt.feat"></span></div>
                <div v-if="opt.spells">
                  <strong>Заклинания:</strong>
                  <div v-for="(spells, lvl) in opt.spells" :key="lvl">
                    <h5>Уровень {{ lvl }}</h5>
                    <ul>
                      <li v-for="spell in spells" :key="spell">{{ SpellName(spell) }}</li>
                    </ul>
                  </div>
                </div>
                <div v-if="opt.focusSpell"><strong>Фокусное заклинание:</strong> {{ SpellName(opt.focusSpell) }}</div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Действия выбора -->
    <v-divider class="my-4" v-if="chooseMode" />
    <v-card-actions v-if="chooseMode">
      <v-btn outlined color="red" @click="$emit('cancel')">Отмена</v-btn>
      <v-spacer />
      <v-btn color="green" @click="$emit('select', item)">Выберите класс</v-btn>
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
    spells: {
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
    SpellName(spell) {
      const spell1 = this.textToKebab(spell);
      return this.spells.find(s => s.key === spell1)?.name || '';
    },
    characterlabel(key) {
      switch (key) {
        case "U":
          return "Нетренирован"
        case "T":
          return "Тренирован"
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
  },
};
</script>

<style scoped lang="css">
.traits {
  background-color: #d9c484;
  display: inline-block;
  margin: 0.1em 0.15em !important;
  padding: 0.1em 0.25em;
  list-style-type: none !important;
}

.trait {
  background-color: #5e0000;
  color: #fff;
  display: inline-block;
  font-weight: bolder;
  margin: 0;
  padding: 0 0.25em;
}

.simple {
  display: inherit;
  margin-bottom: 0;
  padding-inline-start: 0.2em;
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
</style>
