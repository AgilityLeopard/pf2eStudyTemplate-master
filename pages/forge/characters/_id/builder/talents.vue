<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-row justify="center">
      <v-col :cols="12">
        <h1 class="headline">Выбор черт</h1>
      </v-col>

      <!-- Динамическое изменение столбцов -->
      <v-tabs class="tabs-small" centered grow color="red">
        <v-tab class="caption" key="tab-ancestry" :href="`#tab-ancestry`">
          <h2 class="subtitle-2">
            Черты родословной
            <v-chip class="ui-chip ui-chip--progress">
              {{ characterTalentCount.ancestry }} /
              {{ Math.trunc((characterLevel - 1) / 4) + 1 }}
            </v-chip>
          </h2>
        </v-tab>
        <v-tab class="caption" key="tab-class" :href="`#tab-class`">
          <h2 class="subtitle-2">
            Черты класса
            <v-chip class="ui-chip ui-chip--progress" v-if="archetype">
              {{ characterTalentCount.class }} /
              {{
                Math.trunc(characterLevel / 2) +
                (archetype.isFeatLevelOne && archetype.isFeatLevelOne === true
                  ? 1
                  : 0)
              }}
            </v-chip>
          </h2>
        </v-tab>
        <v-tab class="caption" key="tab-skill" :href="`#tab-skill`">
          <h2 class="subtitle-2">
            Черты Навыков
            <v-chip class="ui-chip ui-chip--progress" v-if="archetype">
              {{ characterTalentCount.skill }} /
              {{
                archetype?.keywords === "плут"
                  ? Math.trunc(characterLevel / 1)
                  : Math.trunc(characterLevel / 2)
              }}
            </v-chip>
          </h2>
        </v-tab>

        <v-tab class="caption" key="tab-general" :href="`#tab-general`">
          <h2 class="subtitle-2">
            Черты общие
            <v-chip class="ui-chip ui-chip--progress" v-if="archetype">
              {{ characterTalentCount.general }} /
              {{ Math.trunc((characterLevel + 1) / 4) + generalBonusCount }}
            </v-chip>
          </h2>
        </v-tab>

        <v-tab class="caption" key="tab-additional" :href="`#tab-additional`" v-if="freeTalentsLength !== 0">
          <h2 class="subtitle-2">Черты дополнительные</h2>
        </v-tab>
        <!-- Для воина -->
        <v-tab v-if="
          archetype && characterLevel >= 8 && archetype?.keywords === 'воин'
        " class="caption" key="tab-adaptation" :href="`#tab-adaptation`">
          <h2 class="subtitle-2">Боевая адаптация</h2>
        </v-tab>

        <!-- Для сорвиголовы -->
        <v-tab v-if="
          archetype &&
          characterLevel >= 3 &&
          archetype?.keywords === 'сорвиголова'
        " class="caption" key="tab-stylish" :href="`#tab-stylish`">
          <h2 class="subtitle-2">Стильные приёмы</h2>
        </v-tab>

        <!-- Черты родословной -->
        <v-tab-item class="my-tab-item" key="tab-ancestry" :value="`tab-ancestry`">
          <v-col v-if="!characterSpeciesKey" :cols="12">
            <v-alert type="warning" class="caption ml-4 mr-4" dense outlined border="left">
              Выберите Родословную
            </v-alert>
          </v-col>

          <v-col v-else="characterSpeciesKey">
            <FeatLevelList :levels="[...Array(20).keys()].map(i => i + 1)"
              :showLevel="(lvl) => lvl <= characterLevel && (lvl === 1 || (lvl - 1) % 4 === 0)"
              :getTalent="characterAncestryTalent" :getTalentData="characterTalentsKey"
              @select="lvl => updatePreview(lvl, 'ancestry')" @remove="removeTalent" />
          </v-col>
        </v-tab-item>

        <!-- Черты класса -->
        <v-tab-item class="my-tab-item" key="tab-class" :value="`tab-class`">
          <!-- <v-col :cols="8" :sm="10" class="subtitle-1"> Черты Класса </v-col> -->
          <v-col v-if="!archetype" :cols="12">
            <v-alert type="warning" class="caption ml-4 mr-4" dense outlined border="left">
              Выберите Класс
            </v-alert>
          </v-col>

          <v-col v-else="archetype">
            <FeatLevelList :levels="[...Array(20).keys()].map(i => i + 1)" :showLevel="(lvl) =>
              lvl <= characterLevel &&
              (lvl === 2 || lvl % 2 === 0 || (archetype?.isFeatLevelOne && lvl === 1))
              " :getTalent="characterClassTalent" :getTalentData="characterTalentsKey"
              @select="lvl => updatePreview(lvl, 'class')" @remove="removeTalent" />
          </v-col>
        </v-tab-item>

        <!-- Черты навыков -->
        <v-tab-item class="my-tab-item" key="tab-skill" :value="`tab-skill`">
          <FeatLevelList :levels="[...Array(20).keys()].map(i => i + 1)" :showLevel="(lvl) =>
            lvl <= characterLevel &&
            (lvl === 2 || lvl % 2 === 0 || archetype?.keywords === 'плут')
            " :getTalent="characterSkillTalent" :getTalentData="characterTalentsKey"
            @select="lvl => updatePreview(lvl, 'skill')" @remove="removeTalent" />
        </v-tab-item>
        <!-- Черты общие -->
        <v-tab-item class="my-tab-item" key="tab-general" :value="`tab-general`">
          <!-- <v-col :cols="8" :sm="10" class="subtitle-1"> Черты Общие </v-col> -->

          <FeatLevelList :levels="[...Array(20).keys()].map(i => i + 1)" :showLevel="(lvl) => generalFeatsNumber(lvl)"
            :getTalent="characterGeneralTalent" :getTalentData="characterTalentsKey"
            @select="lvl => updatePreview(lvl, 'general')" @remove="removeTalent" />
        </v-tab-item>
        <!-- Доп черты это те, что получены не выбором (например, доп знание от черт наследия) -->

        <v-tab-item class="my-tab-item" key="tab-additional" :value="`tab-additional`">
          <!-- <v-col
          v-if="freeTalentsLength !== 0"
          :cols="8"
          :sm="10"
          class="subtitle-1"
        >
          Дополнительные черты
        </v-col> -->


          <v-expansion-panels multiple>
            <v-expansion-panel v-if="freeTalentsLength !== 0" v-for="levelAncestry in freeTalentsLength"
              :key="levelAncestry">
              <v-expansion-panel-header>Черта {{ levelAncestry }}</v-expansion-panel-header>

              <v-expansion-panel-content :key="levelAncestry">
                <v-expansion-panels multiple v-if="characteFreeTalent(levelAncestry)">
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <template v-slot:default="{ open }">
                        <v-row no-gutters>
                          <v-col :cols="8" :sm="10" class="subtitle-1">
                            <span />
                          </v-col>
                          <v-col :cols="8" :sm="10" class="subtitle-2">
                            <span v-html="characteFreeTalent(levelAncestry).label" />
                          </v-col>
                          <!-- <v-col :cols="4" :sm="2">
                    <v-btn color="error" x-small @click.stop.prevent="removeTalent(characteFreeTalent(levelAncestry))">Удалить</v-btn>
                  </v-col> -->
                          <v-col v-if="!open" :cols="8" :sm="10" class="caption grey--text">
                            {{ characteFreeTalent(levelAncestry).snippet }}
                          </v-col>
                        </v-row>
                      </template>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content :key="levelAncestry">
                      <CardItem v-if="characteFreeTalent(levelAncestry)" :item="characterTalentsKey(
                        characteFreeTalent(levelAncestry)
                      )
                        " />
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-tab-item>

        <!-- адаптация -->
        <v-tab-item class="my-tab-item" key="tab-adaptation" :value="`tab-adaptation`">
          <v-expansion-panels multiple>
            <v-expansion-panel key="adaptation" v-if="characterLevel >= 8">
              <v-expansion-panel-header>{{ 8 }} уровень
                <v-col :cols="4" :sm="2">
                  <v-btn color="error" align="right" x-small v-if="characterClassTalent(8)"
                    @click.stop.prevent="removeTalent(characterClassTalent(8))">Удалить</v-btn>
                </v-col>
              </v-expansion-panel-header>

              <v-expansion-panel-content key="adaptation">
                <v-btn @click="updatePreview(8, 'adaptation')" v-if="!characterClassTalent(8)">
                  Выберите черту {{ 8 }}
                </v-btn>

                <div v-if="characterClassTalent(8)">
                  <v-row class="rowFeat">
                    <div class="head">
                      <h1>
                        {{ characterClassTalent(8).label }}
                      </h1>
                    </div>
                    <div class="line"></div>
                    <div class="tag">
                      Черта {{ characterClassTalent(8).level }}
                    </div>
                  </v-row>
                  <v-row>
                    <div>
                      <trait-view v-if="characterClassTalent(8).traits" :item="characterClassTalent(8)" class="mb-2" />
                    </div>
                  </v-row>
                  <div v-if="characterClassTalent(8).requirements">
                    <p class="main-holder">
                      {{ characterClassTalent(8).requirements.key }}
                    </p>
                  </div>
                  <p></p>
                  <div class="pt-4 pb-2" v-html="characterClassTalent(8).description"></div>
                  <p></p>
                  <div v-if="characterClassTalent(8).options">
                    <v-select :value="characterClassTalent(8).selected" :items="characterClassTalent(8).options"
                      item-text="name" item-value="key" :placeholder="characterClassTalent(8).optionsPlaceholder" filled
                      dense @input="
                        talentUpdateSelected(item, characterClassTalent(8), 8)
                        " />
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel key="adaptation14" v-if="characterLevel >= 14">
              <v-expansion-panel-header>{{ 14 }} уровень
                <v-col :cols="4" :sm="2">
                  <v-btn color="error" align="right" x-small v-if="characterClassTalent(14)"
                    @click.stop.prevent="removeTalent(characterClassTalent(14))">Удалить</v-btn>
                </v-col>
              </v-expansion-panel-header>

              <v-expansion-panel-content key="adaptation14">
                <v-btn @click="updatePreview(14, 'adaptation')" v-if="!characterClassTalent(14)">
                  Выберите черту {{ 14 }}
                </v-btn>

                <div v-if="characterClassTalent(14)">
                  <v-row class="rowFeat">
                    <div class="head">
                      <h1>
                        {{ characterClassTalent(14).label }}
                      </h1>
                    </div>
                    <div class="line"></div>
                    <div class="tag">
                      Черта {{ characterClassTalent(14).level }}
                    </div>
                  </v-row>
                  <v-row>
                    <div>
                      <trait-view v-if="characterClassTalent(14).traits" :item="characterClassTalent(14)"
                        class="mb-2" />
                    </div>
                  </v-row>
                  <div v-if="characterClassTalent(14).requirements">
                    <p class="main-holder">
                      {{ characterClassTalent(14).requirements.key }}
                    </p>
                  </div>
                  <p></p>
                  <div class="pt-4 pb-2" v-html="characterClassTalent(14).description"></div>
                  <p></p>
                  <div v-if="characterClassTalent(14).options">
                    <v-select :value="characterClassTalent(14).selected" :items="characterClassTalent(14).options"
                      item-text="name" item-value="key" :placeholder="characterClassTalent(14).optionsPlaceholder"
                      filled dense @input="
                        talentUpdateSelected(item, characterClassTalent(14), 14)
                        " />
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-tab-item>

        <!-- Сорвиголова -->
        <v-tab-item class="my-tab-item" key="tab-stylish" :value="`tab-stylish`">
          <v-expansion-panels multiple>
            <v-expansion-panel v-for="level in [3, 7, 15].filter((l) => l <= characterLevel)" key="adaptation"
              v-if="characterLevel >= 3">
              <v-expansion-panel-header>{{ level }} уровень
                <v-col :cols="4" :sm="2">
                  <v-btn color="error" align="right" x-small v-if="characterSkillStylishTalent(level)"
                    @click.stop.prevent="
                      removeTalent(characterSkillStylishTalent(level))
                      ">Удалить</v-btn>
                </v-col>
              </v-expansion-panel-header>

              <v-expansion-panel-content :key="'stylish-' + level">
                <v-btn @click="updatePreview(level, 'stylish')" v-if="!characterSkillStylishTalent(level)">
                  Выберите черту {{ level }}
                </v-btn>

                <div v-if="characterSkillStylishTalent(level)">
                  <v-row class="rowFeat">
                    <div class="head">
                      <h1>
                        {{ characterSkillStylishTalent(level).label }}
                      </h1>
                    </div>
                    <div class="line"></div>
                    <div class="tag">
                      Черта {{ characterSkillStylishTalent(level).level }}
                    </div>
                  </v-row>
                  <v-row>
                    <div>
                      <trait-view v-if="characterSkillStylishTalent(level).traits"
                        :item="characterSkillStylishTalent(level)" class="mb-2" />
                    </div>
                  </v-row>
                  <div v-if="characterSkillStylishTalent(level).requirements">
                    <p class="main-holder">
                      {{ characterSkillStylishTalent(level).requirements.key }}
                    </p>
                  </div>
                  <p></p>
                  <div class="pt-4 pb-2" v-html="characterSkillStylishTalent(level).description"></div>
                  <p></p>
                  <div v-if="characterSkillStylishTalent(level).options">
                    <v-select :value="characterSkillStylishTalent(level).selected"
                      :items="characterSkillStylishTalent(level).options" item-text="name" item-value="key"
                      :placeholder="characterSkillStylishTalent(level).optionsPlaceholder
                        " filled dense @input="
                          talentUpdateSelected(
                            item,
                            characterSkillStylishTalent(level),
                            8
                          )
                          " />
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-tab-item>

        <!-- Открытие диалогов выбора черт -->
        <v-dialog v-model="talentsDialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="1400px" scrollable>
          <talents-preview :character-id="characterId" :talents="selectedTalents" :level="talentsDialogLevel"
            :list="talentList" :type="talentsDialogType" choose-mode @cancel="talentsDialog = false" />
        </v-dialog>
        <!-- <v-dialog v-model="talentsDialogClass" :fullscreen="$vuetify.breakpoint.xsOnly" width="1400px" scrollable>
          <talents-preview :character-id="characterId" :talents="selectedTalentsClass" :level="levelTalent"
            :list="talentList" type="class" choose-mode @cancel="talentsDialogClass = false" />
        </v-dialog>

        <v-dialog v-model="talentsDialogAdaptation" :fullscreen="$vuetify.breakpoint.xsOnly" width="1400px" scrollable>
          <talents-preview :character-id="characterId" :talents="selectedTalentsClass" :level="levelTalent"
            :list="talentList" type="adaptation" choose-mode @cancel="talentsDialogAdaptation = false" />
        </v-dialog>


        <v-dialog v-model="talentsDialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="1400px" scrollable>
          <talents-preview :talents="selectedTalentsAncestry" :character-id="characterId" :level="levelTalent"
            :list="talentList" type="ancestry" choose-mode @cancel="talentsDialog = false" />
        </v-dialog>


        <v-dialog v-model="talentsDialogSkill" :fullscreen="$vuetify.breakpoint.xsOnly" width="1400px" scrollable>
          <talents-preview :character-id="characterId" :talents="selectedTalentsSkill" :list="talentList"
            :level="levelTalent" type="skill" choose-mode @cancel="talentsDialogSkill = false" />
        </v-dialog>

        <v-dialog v-model="talentsDialogGeneral" :fullscreen="$vuetify.breakpoint.xsOnly" width="1400px" scrollable>
          <talents-preview :character-id="characterId" :talents="selectedTalentsGeneral" :level="levelTalent"
            :list="talentList" type="general" choose-mode @cancel="talentsDialogGeneral = false" />
        </v-dialog> -->
      </v-tabs>
    </v-row>
  </div>
</template>

<script lang="js">
import KeywordRepositoryMixin from '~/mixins/KeywordRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import WargearMixin from '~/mixins/WargearMixin';
import IssueList from '~/components/IssueList.vue';
import WargearSelect from '~/components/forge/WargearSelect.vue';
import TalentsPreview from "~/components/forge/TalentsPreview.vue";
import traitView from '~/components/TraitView';
import CardItem from '@/components/CardItem.vue';
import SluggerMixin from '~/mixins/SluggerMixin';
import FeatLevelList from '~/components/forge/character/FeatLevelList.vue';

export default {
  name: 'Talents',
  layout: 'forge',

  components: {
    WargearSelect,
    IssueList,
    TalentsPreview,
    traitView,
    CardItem,
    FeatLevelList
  },
  mixins: [
    KeywordRepositoryMixin,
    StatRepositoryMixin,
    WargearMixin,
    SluggerMixin
  ],
  props: [],
  head() {
    return {
      title: 'Выбор Таланта',
    };
  },
  async asyncData({ params, error }) {
    return {
      characterId: params.id,
    };
  },

  data() {
    return {
      issues: [
        '.',
        '.',
      ],
      talentsDialog: false,
      talentsDialogType: null, // 'class', 'skill', etc
      talentsDialogLevel: null,
      selectedTalents: undefined,
      selectedTalentsAncestry: undefined,
      selectedTalentsClass: undefined,
      selectedTalentsSkill: undefined,
      selectedTalentsGeneral: undefined,

      talentsDialogClass: false,
      talentsDialogSkill: false,
      talentsDialogGeneral: false,
      talentsDialogAdaptation: false,
      levelAncestry: 0,
      levelSkill: 0,
      levelClass: 0,
      levelGeneral: 0,
      searchQuery: '',
      modifications: [],
      selectedTagsFilters: [],
      filters: {
        tags: {
          model: [],
          label: 'Фильтры',
        },
      },
      filterOnlyPrerequisites: false,
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'name',
        rowsPerPage: 25,
      },
      archetype: undefined,
      talentList: undefined,
      traitList: undefined,
      levelTalent: undefined,
      abilityList: undefined,
      wargearList: undefined,
      loading: false,
      talentGroupFilterHelp: false,
      selectedTalentGroups: ['Talents'],

      talentGroupList: [
        {
          source: {
            book: 'Core Rules',
            key: 'playerCore',
            page: 169,
          },
          key: 'playerCore-talents',
          name: 'Talents',
          description:
            '<',
        },
      ],
    };
  },
  computed: {
    hasExtraGeneralFeat() {

      return this.enhancements.some(t =>

        t.group === "feat"

        && t.mode === "Add"

        && t.type === "general"

      );
    },
    characterLevel() {
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },

    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    settingOfficialOptions() {
      return this.$store.getters['characters/characterSettingOfficialOptionsById'](this.characterId);
    },
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    freeTalentsLength() {

      return this.characterTalents.filter(t =>
        t.place.includes("free")
      ).length;

    },

    searchResult() {
      if (this.talentList === undefined) {
        return [];
      }
      let searchResult = this.talentList;




      if (this.selectedTagsFilters.length > 0) {
        searchResult = searchResult.filter((item) => this.selectedTagsFilters.some((m) => item.traits.includes(m)));
      }
      let filter;

      filter = this.filters.source;
      if (filter.model.length > 0) {
        searchResult = searchResult.filter((i) => filter.model.includes(i.source.key));
      }

      return searchResult;
    },
    tagFilters() {
      if (this.talentList === undefined) {
        return [];
      }
      let filteredTalents = this.talentList;
      const lowercaseKeywords = filteredTalents.map(s => s.traits.toUpperCase());

      filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.includes(talent.traits.toString().toUpperCase()));
      let reduced = [];
      filteredTalents.forEach((item) => {
        if (item.traits) {
          reduced.push(...item.traits);
        }
      });
      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((tag) => ({ name: tag }));
    },
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    sources() {
      return [
        // ...this.settingOfficialOptions,
        "playerCore"
        , "playerCore2"
        , ...this.settingHomebrews,
      ];
    },
    enhancements() {
      return this.$store.getters["characters/characterEnhancementsById"](
        this.characterId
      );
    },
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
    TalentsLabel() {
      return this.$store.getters['characters/characterTalentsLabelById'](this.characterId);
    },
    finalSkillRepository() {
      return [
        ...this.skillRepository,
      ];
    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },
    effectiveCharacterTier() {
      return this.$store.getters['characters/characterEffectiveTierById'](this.characterId);
    },
    characterAttributesEnhanced() {
      return this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
    characterTalents() {
      return this.$store.getters['characters/characterTalentsById'](this.characterId);
    },
    generalBonusCount() {

      return this.hasExtraGeneralFeat
        ? 1
        : 0;

    },
    characterTalentCount() {

      const result = {
        ancestry: 0,
        class: 0,
        skill: 0,
        general: 0,
        free: 0,
        stylish: 0,
        adaptation: 0
      };

      const level = this.characterLevelValue;

      this.characterTalents.forEach(talent => {

        if (level < talent.level)
          return;

        if (talent.place.startsWith("ancestry"))
          result.ancestry++;

        else if (talent.place.startsWith("class"))
          result.class++;

        else if (talent.place.startsWith("skill"))
          result.skill++;

        else if (talent.place.startsWith("general"))
          result.general++;

        else if (talent.place.startsWith("free"))
          result.free++;

        else if (talent.place.startsWith("stylish"))
          result.stylish++;

        else if (talent.place.startsWith("adaptation"))
          result.adaptation++;

      });

      return result;

    },
    talentByKey() {
      if (!this.talentList) return {};

      return this.talentList.reduce((acc, talent) => {
        acc[talent.key] = talent;
        return acc;
      }, {});
    },
    traitByKey() {

      if (!this.traitList)
        return {};

      return this.traitList.reduce((obj, trait) => {

        obj[trait.key] = trait;

        return obj;

      }, {});

    },
    characterTalentMap() {

      if (!this.characterTalents.length)
        return {};

      const map = {};

      this.characterTalents.forEach(talent => {
        map[talent.place] = this.buildTalent(talent);
      });

      return map;
    },
    characterTalentLabels() {
      return this.characterTalents.filter((talent) => talent).map((talent) => talent.name);
    },
    characterWargear() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    filteredTalents() {
      if (this.talentList === undefined) {
        return [];
      }

      let filteredTalents = this.talentList;

      if (this.selectedTagsFilters.length > 0) {
        filteredTalents = filteredTalents.filter((item) => this.selectedTagsFilters.some((m) => item.traits.includes(m)));
      }

      filteredTalents = filteredTalents.map((talent) => {
        let fulfilled = true;
        let TagsFilter = true;
        if (talent.requirements && talent.requirements.length > 0) {
          talent.requirements.forEach((requirement) => {
            switch (requirement.type) {
              case 'keyword':
                const lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
                const found = requirement.key.some((k) => {
                  return lowercaseKeywords.includes(k.toString().toUpperCase());
                });
                if (
                  found
                ) {
                  fulfilled = false;
                }
                break;

              case 'attribute':
                const attribute = this.attributeRepository.find((a) => a.key == requirement.key);
                if (attribute) {
                  const charAttributeValue = this.characterAttributesEnhanced[attribute.key];
                  if (charAttributeValue < requirement.value) {
                    fulfilled = false;
                  }
                } else {
                  console.warn(`No attribute found for ${requirement.key}.`);
                }
                break;
              case 'skill':
                const skill = this.skillRepository.find((a) => a.key == requirement.key);
                if (skill) {
                  const charSkillValue = this.characterSkills[skill.key];
                  if (charSkillValue < requirement.value) {
                    fulfilled = false;
                  }
                } else {
                  console.warn(`No skill found for ${requirement.key}.`);
                }
                break;
              case 'character':
                switch (requirement.key) {
                  case 'Tier':
                    fulfilled = (this.effectiveCharacterTier <= requirement.value)
                    break;
                  case 'Rank':
                    fulfilled = (this.characterRank <= requirement.value)
                    break;
                }
                break;
              case 'Talents':
                fulfilled = requirement.value.some((s) => s.toString() === this.TalentsLabel);
                break;

              default:
                console.info(`Unexpected requirement -> ${JSON.stringify(requirement)}`);
            }
          });
        }
        talent.prerequisitesFulfilled = fulfilled;
        return talent;
      });

      const lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
      filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.includes(talent.traits.toString().toUpperCase()));
      return filteredTalents;
    },
    talentHatredKeywordOptions() {
      return this.keywordRepository.filter((k) => k.placeholder === undefined && k.name.indexOf('<') !== 0);
    },
    selectableKeywordOptions() {
      return this.keywordRepository.filter((k) => k.name.indexOf('[') !== 0);
    },
  },
  watch: {
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getTraitList(newVal);
          this.getTalents(newVal);
          this.getAbility(newVal);
        }
      },
      immediate: true,
    },
    characterArchetypeKey: {
      handler(newVal) {

        if (newVal) {

          this.loadArchetype(newVal);
        }
      },
      immediate: true,
    },
    // searchQuery(newVal) {
    //   this.pagination.page = 1; // сброс на первую страницу при поиске
    //   this.fetchWargear();
    // },
    // filters: {
    //   deep: true,
    //   handler() {
    //     this.pagination.page = 1; // сбрасываем на первую страницу
    //     this.fetchWargear();
    //   },
    // },
    // "pagination.page"(newPage) {
    //   this.fetchWargear();
    // },
  },
  methods: {
    buildTalent(talent) {

      const rawTalent = this.talentByKey[talent.key];

      if (!rawTalent) {

        console.warn(`No talent found for ${talent.key}`);

        return {
          id: talent.id,
          key: talent.key,
          name: talent.name,
          label: `${talent.name} (Broken)`,
          snippet: "Legacy talent",
          cost: 0
        };
      }

      const aggregatedTalent = {
        ...rawTalent,

        id: talent.id,
        cost: talent.cost,
        label: rawTalent.name,
        place: talent.place,
        level: talent.level,
        trait: talent.traits,
        description: talent.description,
        selected: talent.selected
      };

      if (talent.options) {

        if (aggregatedTalent.optionsKey === "skill")
          aggregatedTalent.options = this.finalSkillRepository;

        if (aggregatedTalent.optionsKey === "domain")
          aggregatedTalent.options = this.finalSkillRepository;
      }

      return aggregatedTalent;
    },
    //Вывод окна для выбора черт
    updatePreview(levelAncestry, type) {

      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);
      const archetype = this.archetype;
      const sources = new Set(this.sources);
      const lowercaseKeywords = new Set(
        this.finalKeywords.map(k => k.toLowerCase())
      );

      /*Для Сорвиголоваы*/
      const enc = this.$store.getters["characters/characterEnhancementsById"](
        this.characterId
      );
      const selected = enc.find((s) => s.key === "SwashbucklerStyle")
        ? enc.find((s) => s.key === "SwashbucklerStyle").selected
        : "";

      const skill = [];

      if (selected !== "") {
        skill.push(this.abilityList.find(s => s.key === selected).skill);

      }
      skill.push("acrobatics");
      // const list = [];

      const list = [];

      for (const talent of this.talentList) {

        const category = talent.system.category;

        const categoryOk =
          category === type ||
          (type === "general" && category === "skill") ||
          (type === "adaptation" && category === "class") ||
          (type === "stylish" && category === "skill");

        if (!categoryOk)
          continue;

        if (!sources.has(talent.source.key))
          continue;

        if (talent.system.level.value > levelAncestry)
          continue;

        if (type === "class" || type === "ancestry") {

          const traits = talent.traits || [];

          let found = false;

          for (const trait of traits) {

            if (lowercaseKeywords.has(trait.toLowerCase())) {
              found = true;
              break;
            }
          }

          if (!found)
            continue;
        }

        list.push(talent);
      }

      const preparedList = list.map(talent => ({
        ...talent,
        place: type + levelAncestry,
        placeLevel: levelAncestry,
        trait: talent.traits,
        isVal: false
      }));

      this.levelTalent = levelAncestry;
      this.selectedTalents = preparedList;
      this.talentsDialog = true
      this.talentsDialogType = type
      this.talentsDialogLevel = levelAncestry
      // switch (type) {
      //   case "ancestry":
      //     this.talentsDialog = true;
      //     this.selectedTalentsAncestry = list;
      //     break;
      //   case "adaptation":
      //     this.talentsDialogAdaptation = true;
      //     this.selectedTalentsClass = list;
      //     break;
      //   case "class":
      //     this.talentsDialogClass = true;
      //     this.selectedTalentsClass = list;
      //     break;
      //   case "skill":
      //     this.talentsDialogSkill = true;
      //     this.selectedTalentsSkill = list;
      //     break;
      //   case "stylish":
      //     this.talentsDialogSkill = true;
      //     this.selectedTalentsSkill = list;
      //     break;
      //   case "general":
      //     this.talentsDialogGeneral = true;
      //     this.selectedTalentsGeneral = list;
      //     break;



    },
    // characterAttributes() {
    //   return this.$store.getters['characters/characterAttributesById'](this.characterId);
    // },
    // characterSkillSheet() {
    //   return this.$store.getters['characters/characterSkillSheetById'](this.characterId);
    // },

    //АПИ по чертам
    async loadArchetype(key) {
      this.loading = true;

      if (key === 'advanced') {
        this.archetype = { prerequisites: [] };

      } else {
        const { data } = await this.$axios.get(`/api/archetypes/${key}`);
        this.archetype = data;

      }


      this.loading = false;
    },
    async loadSpecies(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/species/${key}`);

      this.species = data;
      this.boost = this.species ? this.species.abilityBoost : 0;
      this.AncestryAttribute = this.species.attributeBoost.filter(boost => boost.value == 0);
      this.AncestryAttribute2 = this.species.attributeBoost.filter(boost => boost.value == 0);

      this.selectedAncestryBoost = this.characterAncestryFreeBoost;
      this.selectedAncestryBoost2 = this.characterAncestryFreeBoost2;
      this.selectedBoost = this.AncestryFreeBoost;
      this.loading = false;
    },
    async getAbility(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get(
        "/api/abilityAncestry/",
        config.source
      );

      this.abilityList = data;
    },
    async getTraitList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get(
        "/api/traits/",
        config.source
      );
      data.forEach(t => t.key = t.key.toLowerCase());
      this.traitList = data;
    },

    async getTalents(sources) {
      this.loading = true;
      const config = {
        params: {
          source: sources.join(","),
        },
      };

      const params = {

        page: 1,

        perPage: 10000

      }
      const { data } = await this.$axios.get('/api/talents/', { params });
      const talents = data.data.map(talent => {
        return {
          ...talent
        }
      });

      if (this.traitList) {

        talents.forEach(talent => {

          const traits = Array.isArray(talent.traits)
            ? talent.traits
            : String(talent.traits || "")
              .split(",")
              .map(s => s.trim())
              .filter(Boolean);

          talent.traits = traits;

          talent.traitDesc = traits
            .map(key => this.traitByKey[key])
            .filter(Boolean)
            .map(trait => ({
              name: trait.key,
              description: trait.desc
            }));

        });

      }

      let items = talents; // все данные
      const itemName = talents.map(item => {
        const [nameRu, nameEng] = item.name.split(/\s*\/\s*/, 2);

        return {
          ...item,
          name: nameRu,
          nameEng: nameEng || nameRu
        };
      });

      this.talentList = talents.map(item => {

        const [nameRu, nameEng] =
          item.name.split(/\s*\/\s*/, 2);

        return {

          ...item,

          name: nameRu,

          nameEng: nameEng || nameRu

        };

      });
      Object.freeze(this.talentList);
      // const rules = talents.flatMap(t => t.system.rules).filter(Boolean).filter(t => !['FlatModifier', 'RollOption', 'AdjustModifier', 'ItemAlteration'].includes(t.key));
      // console.table(rules);

      // console.log([...new Set(rules.flatMap(t => t.selector))]);
      this.modifications = this.enhancements;
      this.loading = false;
    },
    characterAncestryTalent(level) {
      return this.characterTalentMap["ancestry" + level] || false;
    },
    characterTalentsKey(key) {
      if (this.talentList === undefined) {
        return {}
      }
      const talent = this.talentList.find((r) => r.key === key.key);

      return {
        ...talent,
        trait: talent.traits,
        type: "feat"
      }

    },
    characterSkillTalent(level) {
      return this.characterTalentMap["skill" + level] || false;
    },
    characterSkillStylishTalent(level) {
      return this.characterTalentMap["stylish" + level] || false;
    },

    characterBackgroundTalent(level) {
      // { id, name, cost, selection}
      if (this.talentList === undefined) {
        return false;
      }

      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);

      const talents = characterTalents.filter((t) => t).map((talent) => {

        // find the plain talent by key
        const rawTalent = this.talentList.find((r) => r.key === talent.key);

        // not found? return a custom talent without special properties and no cost
        if (rawTalent === undefined) {
          console.warn(`No talent found for ${talent.key}::${talent.name}, using dummy talent.`);
          return {
            id: talent.id,
            label: `${talent.name} (<strong>Broken</strong>, please remove!)`,
            name: talent.name,
            key: talent.key,
            snippet: 'ATTENTION, this is a legacy talent, remove and re-add again.',
            cost: 0,
          }
        }

        const aggregatedTalent = Object.assign({}, rawTalent);


        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        aggregatedTalent.description = talent.description;
        // for each special talent, check respectively
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;

        }


        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));
      //console.warn(talents.map((t) => t.wargear[0].selected).join('-'));
      return talents.find(s => s.place === 'background');



    },
    characterClassTalent(level) {
      return this.characterTalentMap["class" + level] || false;
    },
    characterAdaptationTalent(level) {
      return this.characterTalentMap["adaptation" + level] || false;
    },
    characterGeneralTalent(level) {
      return this.characterTalentMap["general" + level] || false;
    },
    characteFreeTalent(level) {
      return this.characterTalentMap["free" + level] || false;
    },


    generalFeatsNumber(levelAncestry) {


      return (
        levelAncestry <= this.characterLevel &&
        (
          levelAncestry == 3
          ||
          (levelAncestry + 1) % 4 == 0
        )
      )
        ||
        (
          this.hasExtraGeneralFeat
          &&
          levelAncestry === 1
        );

    },

    removeTalent(talent) {
      const id = this.characterId;
      const source = `talent.${talent.id}`;
      const level = this.characterLevel;
      const level1 = talent.level;

      const sheet = this.$store.getters["characters/characterSkillSheetById"](
        this.characterId
      );

      if (talent.system.rules.length > 0) {

        talent.system.rules.forEach(item => {

          if (item.skill) {
            if (
              sheet.find((i) => i.key === item.skill && i.level === level1 && i.type === 'feat')
            ) {


              this.$store.commit("characters/removeSkillSheet", {
                id: this.characterId,
                key: item.skill,
                level: level1,
                type: "feat",
                optional: false,
              });


              if (level1 === 1)
                this.$store.commit("characters/setCharacterSkillPointClassUp", {
                  id: this.characterId,
                  write: false,
                  payload: { key: 1, value: -1 },
                });
            }




          }


          if (item.feat) {
            const lore = this.textToCamel(talent.key) + "-" + this.textToCamel(item.feat);
            const skill = sheet.find((i) => i.key === lore && i.level === level1 && i.type === 'feat')

            this.$store.commit("characters/removeSkillSheet", {
              id: this.characterId,
              key: lore,
              level: 1,
              type: "feat",
              optional: false,
            });

            this.$store.commit("characters/removeSkillSheet", {
              id: this.characterId,
              key: lore,
              level: 3,
              type: "feat",
              optional: false,
            });

            this.$store.commit("characters/removeSkillSheet", {
              id: this.characterId,
              key: lore,
              level: 7,
              type: "feat",
              optional: false,
            });

            this.$store.commit("characters/removeSkillSheet", {
              id: this.characterId,
              key: lore,
              level: 15,
              type: "feat",
              optional: false,
            });



          }
        })



      }

      this.$store.commit('characters/clearModification', { id: this.characterId, level });
      this.$store.commit('characters/removeModification', { id: this.characterId, talentId: talent.id });
      this.$store.commit('characters/removeCharacterTalent', { id, talentId: talent.id });
      this.$store.commit('characters/setModification', { id: this.characterId, level });
    },
    /** Special Talent Selections */
    talentUpdateSelected(selectedValue, talent, level) {
      const id = this.characterId;
      const talentPayload = {
        id: talent.id,
        key: talent.key,
        name: talent.name,
        choice: talent.optionsKey,
        selected: selectedValue,
      };


      const mod = [{
        type: 'Skill',
        mode: 'Upgrade',
        key: selectedValue,
        optionsSelect: true,

        // option: ['all'],
        value: "T",
        // name: item.value,
        // value: this.textToCamel(item.value),
        // isValueModify : false,
        // LoreSkill : LoreSkill,
      }]

      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { item: talent, level: level, modifications: mod, talentId: talent.id, optionsSelect: true, source: talent.place } });
      this.$store.commit('characters/clearModification', { id: this.characterId, level });
      this.$store.commit('characters/setModification', { id: this.characterId, level });
      this.$store.commit('characters/setCharacterTalentSelected', { id, talent: talentPayload });
    },

  },
};
</script>

<style scoped lang="css">
.ui-chip {
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;

  height: 26px;
  padding: 0 10px;

  background: var(--ui-surface-soft);
  border: 1px solid var(--ui-border);
  color: var(--ui-text);

  transition: var(--ui-transition);
}

/* прогресс-чип (главный кейс у тебя) */
.ui-chip--progress {
  background: color-mix(in srgb, var(--ui-accent) 12%, transparent);
  border-color: var(--ui-accent);
  color: var(--ui-text);
}

/* hover эффект */
.ui-chip:hover {
  transform: translateY(-1px);
  border-color: var(--ui-border-strong);
}

.ui-chip--complete {
  background: color-mix(in srgb, var(--ui-success) 15%, transparent);
  border-color: var(--ui-success);
}

.tabs-small {
  background: transparent;
}

.tabs-small .v-tab {
  text-transform: none;
  padding: 8px 12px;
  min-height: 48px;
}

.tabs-small h2 {
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* =========================
   TALENT SELECT UI (LOCAL FIX)
========================= */

/* панель выбора уровня (header в expansion panel) */
.v-expansion-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 10px 12px !important;

  background: var(--ui-surface);
  border-bottom: 1px solid var(--ui-border);

  font-weight: 600;
  color: var(--ui-text);

  transition: 0.15s ease;
}

/* hover только визуальный, без ломания клика */
.v-expansion-panel-header:hover {
  background: var(--ui-hover);
}

/* контейнер справа под кнопку */
.v-expansion-panel-header .v-col {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

/* =========================
   MAIN BUTTON FIX (ВАЖНО ДЛЯ "НЕ КЛИКАЕТСЯ")
========================= */

/* гарантируем кликабельность и нормальный hit-area */
.v-expansion-panel-header .v-btn {
  min-width: 140px;
  height: 28px;

  padding: 0 10px;

  font-size: 12px;
  font-weight: 500;

  border-radius: 8px;

  pointer-events: auto;
  /* критично если где-то перекрывается */
  position: relative;
  z-index: 2;
}

/* визуал "Выберите черту" */
.v-expansion-panel-header .v-btn:not(.error) {
  background: var(--ui-surface-soft) !important;
  border: 1px solid var(--ui-border);
  color: var(--ui-text);
}

/* hover */
.v-expansion-panel-header .v-btn:not(.error):hover {
  border-color: var(--ui-accent);
  background: var(--ui-surface-hover) !important;
  transform: translateY(-1px);
}

/* =========================
   DELETE BUTTON
========================= */

.v-expansion-panel-header .v-btn.error {
  min-width: 28px;
  height: 28px;

  padding: 0;

  border-radius: 6px;
}

/* =========================
   CONTENT AREA (чтобы не "прыгало")
========================= */

.v-expansion-panel-content {
  background: var(--ui-surface);
  border-top: 1px solid var(--ui-border);
}

.v-expansion-panel-content__wrap {
  padding: 12px;
}
</style>
