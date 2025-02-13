<template lang="html">
  <v-card>
    <v-card-title style="background-color: #262e37; color: #fff">
      <span>Подтвердите выбор Заклинания</span>
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
      <v-row>
        <v-col>
          <v-select
            label="Трейты"
            v-model="selectedTagsFilters"
            multiple
            :items="tagFilters"
            item-text="name"
            item-value="name"
          >
          </v-select>
        </v-col>

        <v-col>
          <v-select
            label="Источник"
            v-model="selectedBookFilters"
            multiple
            :items="bookFilters"
            item-text="name"
            item-value="name"
          >
          </v-select>
        </v-col>
      </v-row>
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
        loading-text="Загрузка заклинаний, пожалуйста подождите"
        @page-count="pagination.pageCount = $event"
      >
        <template v-slot:no-data />

        <template v-slot:item.name="{ item }">
          <span>{{ item.name }}</span>
          <div>
            <trait-view v-if="item.traitDesc" :item="item" class="mb-2" />
          </div>
        </template>

        <template v-slot:item.level="{ item }">
          <span>
            {{ item.level }}
          </span>
        </template>

        <template v-slot:item.source="{ item }">
          <span v-if="item.source.book" v-html="item.book" />
        </template>

        <template v-slot:item.tradition="{ item }">
          <span>{{ item.tradition.join(", ") }}</span>
        </template>

        <template v-slot:item.buy="{ item }">
          <v-btn x-small @click="addTalent(item, type, item.level)">
            add
          </v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div class="pt-4 pb-2" v-html="item.description"></div>
          </td>
        </template>

        <template v-slot:no-results>
          <span class="text-center"
            >Ваш поиск по "{{ searchQuery }}" не дал результатов.</span
          >
        </template>
      </v-data-table>

      <div class="text-center pt-2">
        <v-pagination
          v-model="pagination.page"
          :length="pagination.pageCount"
        />
      </div>
    </v-card-text>

    <v-divider />
    <v-card-actions>
      <v-btn outlined color="red" left @click="$emit('cancel')"> Cancel </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
import { lowerCase } from 'lodash';
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import traitView from '~/components/TraitView';


export default {
  name: 'PsychicPreview',
  mixins: [
    SluggerMixin,
    StatRepositoryMixin,

  ],
  components: {
    traitView,
  },
  props: {
    characterId: {
      type: String,
      required: true,
    },
    talents: {},
    archetype: {},
    list: {},
        // Number
    level: {
      type: Number,
      required: false,
    },
    rank: {
      type: Number,
      required: false,
    },
        cell: {
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
      selectedBookFilters: [],
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
          text: 'Источник',
          value: 'source.book',
          sortable: false,
        },
        {
          text: 'Обычай',
          value: 'tradition',
          sortable: false,
        },
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
    addTalent(talent, place, level1) {
      const match = talent.name.match(/(<.*>)/);
      const talentUniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);

      const payload = {
        id: talentUniqueId,
        name: talent.name,
        key: talent.key,
        place: talent.place,
        description: talent.description,
        rank: talent.rank,
        cell:  talent.cell,
        placeholder: (match !== null && match !== undefined) ? match[1] : undefined,
        selected: undefined,
        source: `talent.${talentUniqueId}`,
      };

      this.$store.commit('characters/addCharacterSpell', { id: this.characterId, talent: payload });
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

      if (this.selectedBookFilters.length > 0) {
        searchResult = searchResult.filter((item) => this.selectedBookFilters.some((m) => item.source.book.includes(m)));
      }
      let filter;

      filter = this.filters.source;
      if (filter.model.length > 0) {
        searchResult = searchResult.filter((i) => filter.model.includes(i.source.key));
      }

      return searchResult;
      },

     /*Фильтры по разным категориям */
    bookFilters() {
       if (this.talents === undefined) {
        return [];
      }
      let filteredTalents = this.talents;
      //Берем обычаи из листа
      const lowercaseKeywords = this.archetype.spellTradition.toUpperCase();
      // Берем тот список, что соответствует заклинательскому
      filteredTalents = filteredTalents.filter((talent) => talent.tradition.toString().toUpperCase().includes(lowercaseKeywords))

      let reduced = [];
      filteredTalents.filter(talent => (talent.level <= this.level && talent.cantrip === false) || talent.cantrip === true).forEach((item) => {
        if (item.source.book) {
          reduced.push(item.source.book);
        }
      });

      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((trait) => ({ name: trait }));

    },
    tagFilters() {
       if (this.talents === undefined) {
        return [];
      }
      let filteredTalents = this.talents;
      //Берем обычаи из листа
      const lowercaseKeywords = this.archetype.spellTradition.toUpperCase();
      // Берем тот список, что соответствует заклинательскому
      filteredTalents = filteredTalents.filter((talent) => talent.tradition.toString().toUpperCase().includes(lowercaseKeywords))

      //filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some(talent.tags.toString().toUpperCase()));
      let reduced = [];
      filteredTalents.filter(talent => (talent.level <= this.level && talent.cantrip === false) || talent.cantrip === true).forEach((item) => {
        if (item.trait) {
          reduced.push(...item.trait);
        }
      });

      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((trait) => ({ name: trait }));

    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },

    filteredTalents() {
      if (this.talents === undefined) {
        return [];
      }


      let filteredTalents = this.talents;

      if (this.selectedTagsFilters.length > 0) {
        filteredTalents = filteredTalents.filter((item) => this.selectedTagsFilters.some((m) => item.trait.includes(m)));
      }

      if (this.selectedBookFilters.length > 0) {
        filteredTalents = filteredTalents.filter((item) => this.selectedBookFilters.includes(item.source.book));
      }
      filteredTalents = filteredTalents.map((talent) => {
        let fulfilled = true;
        let TagsFilter = true;

        talent.prerequisitesFulfilled = fulfilled;
        return talent;
      });

      //const lowercaseKeywords = filteredTalents.map(s => s.tags.toString().toUpperCase());
      const lowercaseKeywords = this.archetype.spellTradition.toUpperCase();
      // Берем тот список, что соответствует заклинательскому
      filteredTalents = filteredTalents.filter((talent) => talent.tradition.toString().toUpperCase().includes(lowercaseKeywords))

      const rank = this.rank;

      filteredTalents.forEach(spell =>
      {
        if (spell.powerValue1)
        {
          if (spell.powerValue1.indexOf("d", 0) == -1)
          {
            const heightened = Math.floor((rank - 1) / spell.power);
            const powerLevel1 = parseInt(spell.powerStart1) +parseInt(spell.powerValue1) * heightened;
            spell.description = spell.description.replace("{{powerValue1}}", "<span style='color: green'>" + powerLevel1 + "</span>")
          }
          else
          {
            const heightened = Math.floor((rank - 1) / spell.power);
            const index = spell.powerValue1.indexOf("d", 0);
            const dice = spell.powerValue1.slice(index-1, index);
            const diceSize = spell.powerValue1.slice(index+1);
            const powerLevel1 = parseInt(spell.powerStart1) + parseInt(dice) * heightened;
            spell.description = spell.description.replace("{{powerValue1}}", "<span style='color: green'>" + powerLevel1 + "d" + diceSize + "</span>")
          }

        }

        if (spell.powerValue2)
        {
          if (spell.powerValue2.indexOf("d", 0) == -1)
          {
            const heightened = Math.floor((rank - 1) / spell.power);
            const powerLevel2 = parseInt(spell.powerStart2) +parseInt(spell.powerValue2) * heightened;
            spell.description = spell.description.replace("{{powerValue2}}", "<span style='color: green'>" + powerLevel2 + "</span>")
          }
          else
          {
            const heightened = Math.floor((rank - 1) / spell.power);
            const index = spell.powerValue2.indexOf("d", 0);
            const dice = spell.powerValue2.slice(index-1, index);
            const diceSize = spell.powerValue2.slice(index+1);
            const powerLevel2 = parseInt(spell.powerStart2) + parseInt(dice) * heightened;
            spell.description = spell.description.replace("{{powerValue2}}", "<span style='color: green'>" + powerLevel2 + "d" + diceSize + "</span>")
          }

        }
      }


      )

      return filteredTalents.filter(talent => (talent.level <= this.level && talent.cantrip === false) || talent.cantrip === true);
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
