<template lang="html">
  <v-card>
    <v-card-title style="background-color: #262e37; color: #fff">
      <span>Подтвердите выбор Таланта</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')"> close </v-icon>
    </v-card-title>

    <v-divider />

    <!-- <v-card-title>
      <v-text-field v-model="searchQuery" filled dense prepend-inner-icon="search" clearable label="Поиск" />
    </v-card-title> -->
    <v-divider />

    <!-- <v-card-title>
      <v-container class="bg-surface-variant">
        <v-row>
          <v-col :cols="6">
            <v-select label="Редкость" multiple v-model="selectedRarityFilters" :items="rarityFilters" item-text="name"
              item-value="name">
            </v-select>
          </v-col>

          <v-col :cols="6">
            <v-select label="Источник" v-model="selectedSourceFilters" multiple :items="sourceFilters" item-text="name"
              item-value="name">
            </v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col :cols="6">
            <v-select label="Трейты" v-model="selectedtraitsFilters" multiple :items="tagFilters" item-text="name"
              item-value="name">
            </v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title> -->

    <v-divider />
    <v-card-text>
      <v-row>
        <v-col cols="6" sm="4">
          <v-text-field v-model="searchQuery" filled dense clearable prepend-inner-icon="search" label="Поиск" />

          <v-range-slider v-model="levelRange" :min="0" :max="this.level" :step="1" thumb-label="always"
            label="Уровень"></v-range-slider>





          <v-select label="Редкость" v-model="selectedRarityFilters" :items="rarityRepository" item-text="name"
            item-value="key" multiple>
          </v-select>

          <v-select label="Трейты" v-model="selectedTraitFilters" :items="typeFilters" item-text="name"
            item-value="name" multiple>
          </v-select>
        </v-col>
        <v-col cols="6" sm="8">
          <div class="table-wrapper">
            <v-data-table :headers="headers" :items="searchResult" :search="searchQuery" :page.sync="pagination.page"
              show-expand item-key="name" hide-default-footer :loading="!talents" class="fixed-columns-table"
              loading-text="Загрузка черт, пожалуйста, подождите" @page-count="pagination.pageCount = $event">
              <template v-slot:no-data />

              <template v-slot:item.name="{ item }">
                <span>{{ item.name }}</span>

                <div>
                  <trait-view v-if="item.traits" :item="item" />
                </div>
              </template>

              <template v-slot:item.system.level="{ item }">
                <v-chip>
                  {{ item.system.level.value }}
                </v-chip>
              </template>

              <template v-slot:item.prerequisitesKey="{ item }">
                <!-- <v-chip> -->
                <v-icon v-if="item.isVal === true" color="error">close</v-icon>
                <v-icon v-if="item.isVal === false" color="success">check</v-icon>
                <!-- {{ item.prerequisitesKey }} -->
                <!-- </v-chip> -->
              </template>
              <!-- 
        <template v-slot:item.prerequisitesHtml="{ item }">
          <span v-if="item.requirementsText" v-html="item.requirementsText" />
        </template> -->

              <template v-slot:item.description="{ item }">
                <span v-html="item.description.split('.').find(s => s.trim() !== '') + '.'"></span>
              </template>

              <template v-slot:item.buy="{ item }">
                <v-btn color="success" x-small :disabled="item.isVal === true" v-if="!DiffrentTalent(item)"
                  @click="addTalent(item, type, item.level)">
                  add
                </v-btn>
              </template>

              <!-- В тексте -->
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <CardItem :item="item" />
                </td>
              </template>

              <template v-slot:no-results>
                <span class="text-center">Ваш поиск по "{{ searchQuery }}" не дал результатов.</span>
              </template>
            </v-data-table>
          </div>
          <div class="text-center pt-2">
            <v-pagination v-model="pagination.page" :length="pagination.pageCount" />
          </div>
        </v-col>
      </v-row>
    </v-card-text>



    <v-divider />
    <v-card-actions>
      <v-btn outlined color="red" left @click="$emit('cancel')"> Cancel </v-btn>
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
          value: 'system.level',
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
        { text: "", value: "data-table-expand", width: "50px" },
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
  computed: {
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

.head {
  /* color: rgb(57, 54, 54); */
  width: fit-content;
  /* font-size: 24px; */
  font-style: normal;
  /* font-family: goodOTCondBold; */
  font-weight: normal;
  line-height: 24px;
  /* text-transform: uppercase; */
}

.line {
  height: 1px;
  margin: 0 1rem;
  flex-grow: 1;
  background: #676767;
}

.tag {
  color: #fff;
  padding: 0.5rem;
  font-size: 18px;
  font-style: normal;
  text-align: center;
  font-family: goodOTCondBold;
  font-weight: normal;
  line-height: 24px;
  white-space: nowrap;
  border-radius: 0.25rem;
  text-transform: uppercase;
}

.rowFeat {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.main-holder p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
</style>

<style scoped>
.fixed-columns-table .v-data-table__wrapper table {
  table-layout: fixed !important;
  /* фиксированная сетка */
  width: 100%;
}

.fixed-columns-table th,
.fixed-columns-table td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fixed-columns-table th {
  font-weight: 600;
  background-color: rgba(var(--v-theme-surface-variant), 0.5);
}

/* Настраиваем ширину каждой колонки (по порядку) */
.fixed-columns-table th:nth-child(1),
.fixed-columns-table td:nth-child(1) {
  width: 40%;
  /* Название предмета */
}

.fixed-columns-table th:nth-child(2),
.fixed-columns-table td:nth-child(2) {
  width: 20%;
  /* Тип */
}

.fixed-columns-table th:nth-child(3),
.fixed-columns-table td:nth-child(3) {
  width: 15%;
  /* Цена */
}

.fixed-columns-table th:nth-child(4),
.fixed-columns-table td:nth-child(4) {
  width: 25%;
  /* Прочее */
}

.table-wrapper {
  max-height: 500px;
  /* или любая фиксированная высота */
  overflow-y: auto;
  /* добавляет прокрутку */
}

.expanded-content {
  max-height: 300px;
  /* ограничиваем раскрытие */
  overflow-y: auto;
  /* прокрутка внутри строки */
}

/* Можно ограничить высоту ячеек */
.v-data-table tbody td {
  max-width: 250px;
  /* можно подбирать */
}

/* Убираем растягивание при раскрытии */
.v-data-table__expanded__content td {
  max-width: none !important;
}

.table-container {
  width: 100%;
  overflow-x: hidden;
  /* не даем появиться горизонтальному скроллу */
}

.expanded-cell {
  padding: 0 !important;
  background-color: rgba(var(--v-theme-surface-variant), 0.05);
}

.expanded-wrapper {
  display: block;
  max-width: 100%;
  overflow-x: hidden;
  padding: 16px 20px;
  box-sizing: border-box;
  background-color: var(--v-theme-surface);
  border-left: 3px solid var(--v-theme-primary);
  border-radius: 0 0 8px 8px;
}

.expanded-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.expanded-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  word-break: break-word;
}

.expanded-tag {
  background-color: rgba(var(--v-theme-primary), 0.15);
  color: var(--v-theme-primary);
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 0.8rem;
}

.expanded-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 4px 12px;
  font-size: 0.85rem;
  margin-top: 8px;
  word-break: break-word;
}

.expanded-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(var(--v-border-color, 150, 150, 150), 0.2);
  margin: 10px 0;
}

.expanded-description {
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--v-theme-on-surface);
  word-break: break-word;
  white-space: normal;
}

.v-data-table {
  table-layout: fixed !important;
}

.v-data-table thead th,
.v-data-table tbody td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  /* чтобы переносились строки */
  word-wrap: break-word;
  vertical-align: top;
}
</style>