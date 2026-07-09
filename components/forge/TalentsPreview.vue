<template>
  <v-card class="talents-card">
    <v-card-title class="talents-header">
      <span class="header-title">Подтвердите выбор таланта</span>
      <v-spacer />
      <v-btn icon small @click="$emit('cancel')">
        <v-icon small>mdi-close</v-icon>
      </v-btn>
    </v-card-title>

    <v-divider class="ui-divider" />

    <v-card-text>
      <v-row>
        <!-- ФИЛЬТРЫ -->

        <v-expansion-panels class="mb-4">
          <v-expansion-panel>

            <v-expansion-panel-header>
              <div class="d-flex align-center">
                <v-icon left>
                  mdi-filter-variant
                </v-icon>

                Фильтры

                <v-chip v-if="activeFiltersCount" small class="ml-2">
                  {{ activeFiltersCount }}
                </v-chip>

              </div>
            </v-expansion-panel-header>


            <v-expansion-panel-content>

              <v-row dense>

                <v-col cols="12" md="4">

                  <v-range-slider v-model="levelRange" :min="0" :max="level" step="1" thumb-label label="Уровень" />

                </v-col>


                <v-col cols="12" md="4">

                  <v-select v-model="selectedSourceFilters" :items="filterSourceOptions" label="Источник"
                    item-text="name" item-value="key" multiple dense outlined />

                </v-col>


                <v-col cols="12" md="4">

                  <v-select v-model="selectedTraitFilters" :items="typeFilters" label="Трейты" item-text="name"
                    item-value="name" multiple dense outlined />

                </v-col>


              </v-row>


            </v-expansion-panel-content>

          </v-expansion-panel>
        </v-expansion-panels>

        <div class="result-info">
          Найдено: {{ searchResult.length }}
        </div>
        <!-- ТАБЛИЦА -->
        <v-col cols="12">
          <div class="table-wrapper">

            <v-data-table :headers="tableHeaders" :items="searchResult" :search="searchQuery" mobile-breakpoint="0"
              :page.sync="pagination.page" show-expand item-key="name" hide-default-footer :loading="!talents"
              class="ui-table" loading-text="Загрузка черт..." @page-count="pagination.pageCount = $event">


              <!-- NAME -->
              <template v-slot:item.name="{ item }">
                <div class="table-name">
                  <span class="name-text">{{ item.name }}</span>
                  <div class="mobile-traits">

                    <trait-view v-if="item.traits" :item="item" />

                  </div>
                  <!-- <trait-view v-if="item.traits" :item="item" /> -->
                </div>
              </template>

              <!-- LEVEL -->
              <template v-slot:item.level="{ item }">
                <span class="level-badge">
                  {{ item.system.level.value }}
                </span>
              </template>

              <!-- DESCRIPTION -->
              <template v-slot:item.description="{ item }">
                <span class="table-description" v-html="item.description.split('.').find(s => s.trim() !== '') + '.'">

                </span>
              </template>

              <!-- ADD -->
              <template v-slot:item.buy="{ item }">
                <v-btn small icon color="primary" :disabled="item.isVal === true" v-if="!DiffrentTalent(item)"
                  @click="addTalent(item, type, item.level)">
                  <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
              </template>

              <!-- EXPANDED -->
              <template v-slot:expanded-item="{ headers, item }">

                <td :colspan="headers.length" class="expanded-cell">

                  <div class="expanded-wrapper">

                    <div class="mb-3">

                      <strong>
                        {{ item.name }}
                      </strong>

                      <div class="table-description" v-html="item.description
                        .split('.')
                        .find(s => s.trim() !== '') + '.'
                        " />

                    </div>


                    <CardItem :item="item" />


                  </div>

                </td>

              </template>

            </v-data-table>
          </div>

          <div class="pagination-wrapper">
            <v-pagination v-model="pagination.page" :length="pagination.pageCount" />
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider class="ui-divider" />

    <v-card-actions class="footer">
      <v-btn text color="error" @click="$emit('cancel')">
        Отмена
      </v-btn>
    </v-card-actions>
  </v-card>
</template>


<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import traitView from '~/components/TraitView';
import CardItem from "@/components/CardItem.vue";

export default {
  name: 'talentsPreview',
  mixins: [
    SluggerMixin,
    StatRepositoryMixin,
  ],
  components: {
    traitView, CardItem
  },
  props: {
    characterId: {
      type: String,
      required: true,
    },
    talents: {},
    list: {},
    // Number
    level: {
      type: Number,
      required: false,
    },

    type: undefined,
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
      selectedTalents: undefined,

      searchQuery: "",
      selectedTypeFilters: [],
      selectedCategoryFilters: [],
      selectedCategoryWeaponFilters: [],
      selectedCategoryArmorFilters: [],
      selectedTypeWeaponFilters: [],
      selectedTypeArmorFilters: [],
      selectedTraitFilters: [],
      selectedSourceFilters: [],
      selectedRarityFilters: [],
      levelRange: [0, 20],

      talentsDialog: false,
      searchQuery: '',

      filters: {
        traits: {
          model: [],
          label: 'Filter by traits',
        },
      },
      filterOnlyPrerequisites: false,
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'name',
        rowsPerPage: 25,
      },
      placeText: {
        ancestry1: "Черта родословной 1 Уровня",
        ancestry2: "Черта родословной 2 Уровня",
      },

      headersMobile: [
        {
          text: 'Название',
          value: 'name',

          sortable: true,
          width: '35%'

        },
        {
          text: 'Уровень',
          value: 'level',
          align: 'center',
          width: 55,
          sortable: true,
        },
        // {
        //   text: 'Тр.',
        //   value: 'prerequisitesKey',
        //   align: 'center',
        //   sortable: false,
        // },

        // {
        //   text: 'Описание',
        //   value: 'description',
        //   sortable: false,
        //   width: "250px",
        // },
        /*{
          text: 'Effect',
          value: 'effect',
          sortable: false,
        },*/
        {
          text: 'Добавить',
          value: 'buy',

          width: 48,
          sortable: false,

        },
        // { text: "", value: "data-table-expand", width: "20px", },
      ],
      headers: [
        {
          text: 'Название',
          value: 'name',
          align: 'left',
          sortable: true,
          width: "250px",
        },
        {
          text: 'Уровень',
          value: 'level',
          align: 'center',
          width: "100px",
          sortable: true,
        },
        // {
        //   text: 'Тр.',
        //   value: 'prerequisitesKey',
        //   align: 'center',
        //   sortable: false,
        // },

        {
          text: 'Описание',
          value: 'description',
          sortable: false,
          width: "250px",
        },
        /*{
          text: 'Effect',
          value: 'effect',
          sortable: false,
        },*/
        {
          text: 'Добавить',
          value: 'buy',
          align: 'center',
          sortable: false,
          width: "50px",
        },
        // { text: "", value: "data-table-expand", width: "50px" },
      ],

      wargearList: undefined,
      loading: false,
      talentGroupFilterHelp: false,
      selectedTalentGroups: ['Talents'],
      // Exarch Powers, Priest Prayers & Litanies, Chaos Rituals, ...
      talentGroupList: [
        {
          source: {
            book: 'Core Rules',
            key: 'playerCore',
            page: 169,
          },
          key: 'core-talents',
          name: 'Talents',
          description:
            '<p>Talents represent a knack that a character possesses. Many grant characters a ' +
            'special ability, which others cannot undertake. Other talents provide situational ' +
            'benefits to a character. Each talent has an associated build point cost, and may have ' +
            'prerequisite attributes, keywords, skills, or Talents. Players are not required to ' +
            'select any talents for their characters. The maximum number of talents that may be ' +
            'purchased is limited by Tier.</p>',
        },
        /*
        {
          source: {
            book: 'An Abundance of Apocrypha',
            key: 'aaoa',
            page: 147,
          },
          key: 'aaoa-exarch-powers',
          name: 'Exarch Powers',
          description:
            '<p>The following abilities are unique powers and combat techniques exhibited by Exarchs, ' +
            'mighty Aeldari warriors who lead the Aspect Warrior shrines into battle and maintain ' +
            'those shrines during the all-too-rare times of peace.</p>' +
            '<p>An Exarch may <strong>purchase up to two of these powers</strong>, at the costs ' +
            'listed, so long as the Exarch meets the listed prerequisites. Some of the powers in ' +
            'this section are distinct to Exarchs of particular Aspect Temples, and they may only ' +
            'be selected by an Exarch of that temple.</p>' +
            '<p>Many of the powers in this section affect the Exarch’s students as well, granting a ' +
            'benefit to the Aspect Warriors under their command. An Exarch may <strong>consider all Aspect ' +
            'Warriors of the same type as the Exarch within 10m as being part of the Exarch’s squad.</strong></p>',
        },
        */
      ],
    };
  },

  methods:
  {

    addTalent(talent, place, level1) {
      const match = talent.name.match(/(<.*>)/);
      const talentUniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      const list = this.list;
      const level = talent.placeLevel;

      const mod1 = talent.system.rules.map(t => ({
        ...t,
        description: talent.description
      }));
      const payload = {
        id: talentUniqueId,
        name: talent.name,
        key: talent.key,
        // cost: talent.cost,
        level: level,
        traits: talent.traits,
        nameEng: talent.key,
        place: talent.place,
        modifications: mod1,
        placeholder: (match !== null && match !== undefined) ? match[1] : undefined,
        selected: undefined,
        options: talent.options,
        choice: talent.optionsKey,
        source: place,
      };

      const sheet = this.$store.getters["characters/characterSkillSheetById"](
        this.characterId
      );

      // Добавляем правила
      // ---------------------
      if (talent.system.rules.length > 0) {

        talent.system.rules.forEach(item => {
          if (item.skill) {
            // Добавляем навык от черты
            // this.$store.commit("characters/removeSkillSheetbyType", {
            //   id: this.characterId,
            //   key: item.skill,
            //   level: level,
            //   type: "feat",
            //   optional: false,
            // });



            if (
              sheet.find((i) => i.key === item.skill && i.level === level && (i.type === 'skill'))

            ) {
              this.$store.commit("characters/removeSkillSheet", {
                id: this.characterId,
                key: item.skill,
                level: level,
                type: "skill",
                optional: true,
              });

              this.$store.commit("characters/addSkillSheet", {
                id: this.characterId,
                key: item.skill,
                level: level,
                type: "feat",
                optional: true,
              });
            }

            if (
              sheet.find((i) => i.key === item.skill && i.level === level && (i.type === 'class' || i.type === 'background'))
            ) {

              this.$store.commit("characters/setCharacterSkillPointClassUp", {
                id: this.characterId,
                write: false,
                payload: { key: 1, value: 1 },
              });

              this.$store.commit("characters/addSkillSheet", {
                id: this.characterId,
                key: item.skill,
                level: level,
                type: "feat",
                optional: true,
                combinded: true,
              });
            }


            if (
              !sheet.find((i) => i.key === item.skill && i.level === level)

            ) {
              this.$store.commit("characters/removeSkillSheet", {
                id: this.characterId,
                key: item.skill,
                level: level,
                type: "skill",
                optional: true,
              });

              this.$store.commit("characters/addSkillSheet", {
                id: this.characterId,
                key: item.skill,
                level: level,
                type: "feat",
                optional: true,
              });
            }


          }

          if (item.feat) {
            const LoreUniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
            const Lore = list.find(i => i.key === item.feat)

            const loreTalent = {
              id: LoreUniqueId,
              name: Lore.name,
              key: Lore.key,

              place: 'free',

              link: talentUniqueId,
              selected: undefined,

              source: place,
            };

            const LoreSkill = {
              key: this.textToCamel(talent.key) + "-" + this.textToCamel(item.feat),
              name: talent.name,
              attribute: 'intellect',
              description: "",
              optional: true,
              isValueModify: false,
            }

            const mod = [{
              type: 'Skill',
              mode: 'Add',
              key: 'Lore',
              // name: item.value,
              // value: this.textToCamel(item.value),
              isValueModify: false,
              LoreSkill: LoreSkill,
            }]
            //Добавляем модификацию черты
            this.$store.commit('characters/addCharacterTalent', { id: this.characterId, talent: loreTalent });
            this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { item: payload, level: this.level, modifications: mod, talentId: talentUniqueId, source: 'featfree' } });

            this.$store.commit("characters/addSkillSheet", {
              id: this.characterId,
              key: this.textToCamel(talent.key) + "-" + this.textToCamel(item.feat),
              level: 1,
              type: "feat",
              optional: true,
            });

            this.$store.commit("characters/addSkillSheet", {
              id: this.characterId,
              key: this.textToCamel(talent.key) + "-" + this.textToCamel(item.feat),
              level: 3,
              type: "feat",
              optional: true,
            });

            this.$store.commit("characters/addSkillSheet", {
              id: this.characterId,
              key: this.textToCamel(talent.key) + "-" + this.textToCamel(item.feat),
              level: 7,
              type: "feat",
              optional: true,
            });

            this.$store.commit("characters/addSkillSheet", {
              id: this.characterId,
              key: this.textToCamel(talent.key) + "-" + this.textToCamel(item.feat),
              level: 15,
              type: "feat",
              optional: true,
            });

          }
        }

        )


      }


      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { item: payload, level: level, modifications: payload.modifications, talentId: talentUniqueId, source: 'feat' + place } });
      this.$store.commit('characters/addCharacterTalent', { id: this.characterId, talent: payload });
      this.$store.commit('characters/clearModification', { id: this.characterId, level });
      this.$store.commit('characters/setModification', { id: this.characterId, level });
      this.$emit('cancel');
    },
    requirementRestriction(item) {
      const Rest = {
        "U": 0,
        "T": 1,
        "E": 2,
        "M": 3,
        "L": 4,
      }

      if (item.prerequisitesKey) {
        const skillList = this.characterSkillSheet();
        const attList = this.characterAttributes();
        const level = this.characterLevel();

        if (item.prerequisitesKey.skill) {
          const skill = item.prerequisitesKey.skill;
          const prof = skillList.filter(s => s.key === skill.key && s.level <= level).length;
          const isVal = Rest[skill.value] <= prof ? false : true;
          if (isVal === true) return isVal;
        }

        if (item.prerequisitesKey.ability) {
          const ability = item.prerequisitesKey.ability;
          const score = (attList[ability.key] - 10) / 2;
          const isVal = ability.value <= score ? false : true;
          if (isVal === true) return isVal;
        }
        if (item.prerequisitesKey.feat) {

          const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);

          const isFeat = characterTalents.find(t => t.key === item.prerequisitesKey.feat.key);
          const isVal = isFeat !== undefined ? true : false;
          if (isFeat !== undefined || characterTalents.length === 0)
            return true;



        }
        return false;
      }
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterSkillSheet() {
      return this.$store.getters['characters/characterSkillSheetById'](this.characterId);
    },
    characterLevel() {
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    characterLevel() {
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    DiffrentTalent(item) {
      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);
      const hasTalent = characterTalents.find(s => s.key === item.key)
      if (hasTalent) return true;
      return false;
    },
  },
  computed:
  {
    tableHeaders() {

      if (this.$vuetify.breakpoint.xsOnly) {

        return this.headersMobile

      }


      return this.headers

    },
    avatar() {
      if (this.talents === undefined) return '';
      return `/img/avatars/talents/${this.talents.key}.png`;
    },
    attributes() {
      if (this.talents === undefined || this.talents.prerequisites === undefined) return undefined;
      return this.talents.prerequisites.filter(pre => pre.group === 'attributes').map(pre => `${this.getAttributeByKey(pre.value).name} ${pre.threshold}`).join(', ');
    },
    skills() {
      if (this.talents === undefined || this.talents.prerequisites === undefined) return undefined;
      return this.talents.prerequisites.filter(pre => pre.group === 'skills').map(pre => `${this.getSkillByKey(pre.value).name} ${pre.threshold}`).join(', ');
    },
    characterTalents() {
      return this.$store.getters['characters/characterTalentsById'](this.characterId);
    },
    characterTalentLabels() {
      return this.characterTalents.filter((talent) => talent).map((talent) => talent.name);
    },
    searchResult() {
      if (this.talents === undefined) {
        return [];
      }
      let searchResult = this.talents;

      // if (this.selectedtraitsFilters.length > 0) {
      //   searchResult = searchResult.filter((item) => this.selectedtraitsFilters.some((m) => item.traits.includes(m)));
      // }


      // filter = this.filters.source;
      // if (filter.model.length > 0) {
      //   searchResult = searchResult.filter((i) => filter.model.includes(i.source.key));
      // }

      return searchResult;
    },
    sourceFilters() {
      if (this.talents === undefined) {
        return [];
      }
      let filteredTalents = this.talents;
      //const lowercaseKeywords = filteredTalents.map(s => s.traits.toString().toUpperCase());
      const lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
      // only show those whose prerequisites are met

      filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some(lw => talent.traits.toString().toUpperCase().includes(lw)));
      //filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some(talent.traits.toString().toUpperCase()));
      let reduced = [];
      filteredTalents.filter(talent => talent.level <= this.level).forEach((item) => {
        if (item.source.book) {
          reduced.push(item.source.book);
        }
      });

      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((tag) => ({ name: tag }));
    },

    rarityFilters() {
      if (this.talents === undefined) {
        return [];
      }
      let filteredTalents = this.talents;
      //const lowercaseKeywords = filteredTalents.map(s => s.traits.toString().toUpperCase());
      const lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
      // only show those whose prerequisites are met

      filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some(lw => talent.traits.toString().toUpperCase().includes(lw)));
      // filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.includes(talent.traits.toString().toUpperCase()));
      let reduced = ["обычный", "необычный", "редкий", "уникальный"];
      // filteredTalents.filter(talent => talent.level <= this.level).forEach((item) => {
      // // if (item.traits) {
      //     reduced.push(..."обычный", "необычный", "редкий", "уникальный");
      //   // }
      // });

      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((tag) => ({ name: tag }));
    },
    tagFilters() {
      if (this.talents === undefined) {
        return [];
      }
      let filteredTalents = this.talents;
      //const lowercaseKeywords = filteredTalents.map(s => s.traits.toString().toUpperCase());
      let lowercaseKeywords = [];
      if (this.type === 'skill' || this.type === 'general')
        lowercaseKeywords = this.type === 'skill' ? ['НАВЫК'] : ['ОБЩАЯ'];
      else
        lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
      // only show those whose prerequisites are met

      filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some(lw => talent.traits.toString().toUpperCase().includes(lw)));
      //filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some(talent.traits.toString().toUpperCase()));
      let reduced = [];
      filteredTalents.filter(talent => talent.level <= this.level).forEach((item) => {
        if (item.traits) {
          reduced.push(...item.traits);
        }
      });
      reduced = reduced.filter(item => item !== "необычный" && item !== "редкий" && item !== "уникальный");
      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((tag) => ({ name: tag }));
    },

    typeFilters() {
      if (this.talents === undefined) {
        return [];
      }
      const reduceToType = this.talents.flatMap((item) => item.traits);
      const distinctTypes = [...new Set(reduceToType)];
      const types = distinctTypes.map((t) => ({ name: t }));
      return types;
    },

    filterSourceOptions() {
      if (this.talents === undefined) {
        return [];
      }
      let filteredTalents = this.talents;


      let reduced = [];
      filteredTalents.forEach((item) => {
        if (item.source.book) {
          reduced.push(item.source.book);
        }
      });

      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((trait) => ({ name: trait }));

    },
    searchResult() {
      if (this.talents === undefined) {
        return [];
      }
      let searchResult = this.talents;

      if (this.selectedTypeFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedTypeFilters.some((r) => item.traits.includes(r))
        );
      }

      const [minLevel, maxLevel] = this.levelRange;

      if (maxLevel != 0) {
        searchResult = searchResult.filter(
          (item) => item.system.level.value >= minLevel && item.system.level.value <= maxLevel
        );
      }


      if (this.selectedTraitFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedTraitFilters.some(
            (m) => item.traits && item.traits.includes(m)
          )
        );
      }

      if (this.selectedRarityFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedRarityFilters.some(
            (r) => item.rarity && item.rarity.includes(r)
          )
        );
      }

      if (this.selectedSourceFilters.length > 0) {
        searchResult = searchResult.filter((item) => this.selectedSourceFilters.includes(item.source.book));
      }

      return searchResult;
    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },

    filteredTalents() {
      if (this.talents === undefined) {
        return [];
      }


      let filteredTalents = this.talents;

      // if (this.selectedtraitsFilters.length > 0) {
      //   filteredTalents = filteredTalents.filter((item) => this.selectedtraitsFilters.some((m) => item.traits.includes(m)));
      // }


      // if (this.selectedSourceFilters.length > 0) {
      //   filteredTalents = filteredTalents.filter((item) => this.selectedSourceFilters.includes(item.source.book));
      // }

      // if (this.selectedRarityFilters.length > 0) {

      //   filteredTalents = filteredTalents.filter((item) => this.selectedRarityFilters.some((m) => item.traits.includes(m)
      //     || (m === 'обычный' && !item.traits.includes('редкий')))).filter((item) => this.selectedRarityFilters.some((m) => item.traits.includes(m)
      //       || (m === 'обычный' && !item.traits.includes('необычный'))));
      // }
      // 
      // filteredTalents = filteredTalents.map((talent) => {
      //   let fulfilled = true;

      //   talent.prerequisitesFulfilled = fulfilled;
      //   return talent;
      // });

      //const lowercaseKeywords = filteredTalents.map(s => s.traits.toString().toUpperCase());

      // let lowercaseKeywords = [];
      // if (this.type === 'skill' || this.type === 'general')
      //   lowercaseKeywords = this.type === 'skill' ? ['НАВЫК'] : ['ОБЩАЯ'];
      // else
      //   lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());

      // only show those whose prerequisites are met
      // if () {
      // filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.includes(talent.traits.toString().toUpperCase()));
      // }
      // filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some(lw => talent.traits.toString().toUpperCase().includes(lw)));

      return filteredTalents.filter(talent => talent.system.level.value <= this.level);
    },
  }
};
</script>

<style scoped>
.talents-card {
  border-radius: 10px;
}

/* HEADER */
.talents-header {
  padding: 12px 16px;
}

.header-title {
  font-size: 1rem;
  font-weight: 600;
}

/* ОБЩИЕ ЛИНИИ */
.ui-divider {
  background: var(--ui-surface);
  color: var(--ui-text);
  border: 1px solid var(--ui-border);
}

/* ФИЛЬТРЫ */
.filters-col {
  border-right: 1px solid rgba(var(--v-border-color, 150, 150, 150), 0.15);
}

.filters-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* TABLE */
.ui-table {
  width: 100%;
  min-width: 0;
}

.table-wrapper {

  overflow-x: auto;
  overflow-y: auto;

}

/* NAME */
.table-name {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.name-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* LEVEL BADGE (в стиле твоих тегов) */
.level-badge {
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 6px;
  background: rgba(var(--v-theme-primary), 0.15);
  color: var(--v-theme-primary);
  font-weight: 500;
}

/* DESCRIPTION */
.table-description {
  font-size: 0.85rem;
  opacity: 0.75;
}

.ui-btn {
  border-radius: 10px;

  text-transform: none;
  font-weight: 500;
  letter-spacing: 0.2px;
  transition: var(--ui-transition);
}

.ui-btn--primary {
  background: var(--ui-surface);
  color: var(--ui-text);
  border: 1px solid color-mix(in srgb, var(--ui-text) 60%, transparent);
  /* 👈 ключ */


  &:hover {
    border-color: var(--ui-accent);
    background: var(--ui-surface-hover);
  }
}

/* EXPANDED */
.expanded-cell {
  padding: 0 !important;
  background: rgba(var(--v-theme-surface-variant), 0.05);
}

.expanded-wrapper {
  padding: 16px;
  border-left: 3px solid var(--v-theme-primary);
}

/* PAGINATION */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 12px;
}

/* FOOTER */
.footer {
  justify-content: flex-end;
}

/* SCROLL */
.table-wrapper::-webkit-scrollbar {
  width: 6px;
}



.table-wrapper::-webkit-scrollbar-thumb {
  background: rgba(120, 120, 120, 0.3);
  border-radius: 3px;
}

@media(max-width:600px) {

  .mobile-hide {
    display: none;
  }

}

.ui-table :deep(td) {

  padding: 8px !important;

}


@media(max-width:600px) {

  .ui-table :deep(td) {

    padding: 6px 4px !important;
    font-size: 12px;

  }


  .name-text {

    font-size: 13px;

  }

}

@media(max-width:600px) {

  .mobile-traits {

    max-width: 120px;
    overflow: hidden;

  }

}

.ui-table :deep(th:first-child),
.ui-table :deep(td:first-child) {
  width: auto;
}

@media (max-width:600px) {

  .ui-table :deep(table) {
    table-layout: fixed;
    width: 100%;
  }

  .ui-table thead {
    display: none;
  }

}

.ui-table :deep(th:nth-child(2)),
.ui-table :deep(td:nth-child(2)) {
  width: 52px;
  min-width: 52px;
  max-width: 52px;
  text-align: center;
}

.ui-table :deep(th:nth-child(3)),
.ui-table :deep(td:nth-child(3)) {
  width: 42px;
  min-width: 42px;
  max-width: 42px;
  text-align: center;
}
</style>
