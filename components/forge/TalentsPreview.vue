<template lang="html">
  <v-card>
    <v-card-title

      style="background-color: #262e37; color: #fff"
    >
      <span>Подтвердите выбор Таланта</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')"> close </v-icon>
    </v-card-title>

    <v-divider />

    <v-card-title>
            <v-text-field
              v-model="searchQuery"
              filled
              dense
              prepend-inner-icon="search"
              clearable
              label="Поиск"
            />

          </v-card-title>
          <v-divider />

          <v-card-title>

            
            <v-select  
        label="Трейты"
        v-model="selectedTagsFilters"
        multiple
        :items="tagFilters"
        item-text="name"
        item-value="name"
        
      > </v-select>


              </v-card-title>

              <v-divider />
              <v-card-text class="pa-6">

          


     
          
          <v-data-table
            :headers="headers"
            
            :items="filteredTalents"
            :search="searchQuery"
            :page.sync="pagination.page"
            show-expand
            item-key="name"
            hide-default-footer
            :loading="!talents"
            loading-text="Loading Talents... Please Wait"
            @page-count="pagination.pageCount = $event"
          >
            <template v-slot:no-data />

            <template v-slot:item.name="{ item }">
              <span>{{ item.name }}</span>
            </template>

            <template v-slot:item.level="{ item }">
              <v-chip>
                {{ item.level }}
              </v-chip>

            </template>

            <template v-slot:item.prerequisitesHtml="{ item }">
              <span v-if="item.requirementsText" v-html="item.requirementsText" />
            </template>

            <template v-slot:item.effect="{ item }">
              <span>{{ item.effect }}</span>
            </template>

            <template v-slot:item.buy="{ item }">
              <v-btn 
              
              :disabled="item.level > level || characterTalentLabels.includes(item.name)"
                :color="item.level <= level ? 'success' : 'red'"
             
                x-small
                @click="addTalent(item, type, level)"
              >
                add
              </v-btn>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="pt-4 pb-2" v-html="item.description">
                </div>
              </td>
            </template>

            <template v-slot:no-results>
              <span class="text-center">Ваш поиск по "{{ searchQuery }}" found no results.</span>
            </template>
          </v-data-table>


          <div class="text-center pt-2">
            <v-pagination v-model="pagination.page" :length="pagination.pageCount" />
          </div>
       
        </v-card-text>
 
          <v-divider />
    <v-card-actions >
        <v-btn outlined color="red" left @click="$emit('cancel')"> Cancel </v-btn>
      </v-card-actions>

     

  </v-card>
</template>

<script lang="js">
import { lowerCase } from 'lodash';
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'talentsPreview',
  mixins: [
    SluggerMixin,
    StatRepositoryMixin,
  ],
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
      selectedTalents: undefined, // for he preview dialog box
      talentsDialog: false,
      searchQuery: '',
      selectedTagsFilters: [],
      filters: {
        tags: {
          model: [],
          label: 'Filter by Tags',
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
        },
        {
          text: 'Уровень',
          value: 'level',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Требование',
          value: 'prerequisitesHtml',
          sortable: false,
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
        },
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
  methods: {
    addTalent(talent, place, level) {
      const match = talent.name.match(/(<.*>)/);
      const talentUniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      const list = this.list;
      const payload = {
        id: talentUniqueId,
        name: talent.name,
        key: talent.key,
        cost: talent.cost,
        place: place+level,
        modifications: talent.modifications,
        placeholder: (match !== null && match !== undefined) ? match[1] : undefined,
        selected: undefined,
        choice: talent.optionsKey,
        source: `talent.${talentUniqueId}`,
      };

      const linkedFeat = talent.modifications.filter(item => item.type === 'Feat');

      if(linkedFeat)
        linkedFeat.forEach(item =>
        {
          if(item.key === 'Additional Lore')
          {
          
            const LoreUniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
            const Lore = list.find(item => item.name === 'Дополнительные знание');
            
            const loreTalent = {
              id: LoreUniqueId,
              name: Lore.name,
              key: Lore.key,
              cost: Lore.cost,
              place: 'free',
            
              link: talentUniqueId,
              selected: undefined,
              choice: Lore.optionsKey,
              source: `talent.${talentUniqueId}`,
            };

            const LoreSkill = {
                      key: this.textToCamel(item.value),
                      name: item.value,
                      attribute: 'intellect',
                      description: "",
                      optional: true,
                      isValueModify : false,
            }

            const mod =   [{     
                      type: 'Skill', 
                      mode: 'Add', 
                      key: 'Lore', 
                      // name: item.value,
                      // value: this.textToCamel(item.value),
                      isValueModify : false,
                      LoreSkill : LoreSkill,
          }]
            this.$store.commit('characters/addCharacterTalent', { id: this.characterId, talent: loreTalent });
            this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { item: payload, level: level, modifications: mod, talentId: LoreUniqueId, source: 'featfree' } });
    
          }
        }
      )

      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { item: payload, level: level, modifications: payload.modifications, talentId:talentUniqueId, source: 'feat'+place } });
      this.$store.commit('characters/addCharacterTalent', { id: this.characterId, talent: payload });
      this.$store.commit('characters/clearModification', { id: this.characterId, level });
      this.$store.commit('characters/setModification', { id: this.characterId, level });
      this.$emit('cancel');
    },
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
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

      if (this.selectedTagsFilters.length > 0) {
        searchResult = searchResult.filter((item) => this.selectedTagsFilters.some((m) => item.tags.includes(m)));
      }

      let filter;

      filter = this.filters.source;
      if (filter.model.length > 0) {
        searchResult = searchResult.filter((i) => filter.model.includes(i.source.key));
      }

      return searchResult;
    },
    
    tagFilters() {
      if (this.talents === undefined) {
        return [];
      }
      let filteredTalents = this.talents;
      //const lowercaseKeywords = filteredTalents.map(s => s.tags.toString().toUpperCase());
      const lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
      // only show those whose prerequisites are met

      filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some( lw => talent.tags.toString().toUpperCase().includes(lw)));
      //filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some(talent.tags.toString().toUpperCase()));
      let reduced = [];
      filteredTalents.filter(talent => talent.level <= this.level).forEach((item) => {
        if (item.tags) {
          reduced.push(...item.tags);
        }
      });
      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((tag) => ({ name: tag }));
    },
      finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },

    filteredTalents() {
      if (this.talents === undefined || this.tagFilters.length == 0) {
        return [];
      }

      
      let filteredTalents = this.talents;

      if (this.selectedTagsFilters.length > 0) {
        filteredTalents = filteredTalents.filter((item) => this.selectedTagsFilters.some((m) => item.tags.includes(m)));
      }

      filteredTalents = filteredTalents.map((talent) => {
        let fulfilled = true;
        let TagsFilter = true;
        
        talent.prerequisitesFulfilled = fulfilled;
        return talent;
      });
      
      //const lowercaseKeywords = filteredTalents.map(s => s.tags.toString().toUpperCase());
      const lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
      // only show those whose prerequisites are met
      // if () {
       // filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.includes(talent.tags.toString().toUpperCase()));
      // }
      filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some(lw => talent.tags.toString().toUpperCase().includes(lw)));
      
      return filteredTalents//filteredTalents.filter(talent => talent.level <= this.level);
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
</style>
