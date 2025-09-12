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

        <v-col>
          <v-checkbox v-model="selectedPrepared" label="Подготовлено?" />
        </v-col>
      </v-row>
    </v-card-title>

    <v-divider />
    <v-card-text class="pa-6">
      <v-data-table
        :headers="filteredHeaders"
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

        <!-- <template v-slot:item.name="{ item }">
          <v-row
            ><span>{{ item.name }}</span></v-row
          >
          <v-row>
            <div>
              <trait-view v-if="item.traits" :item="item" class="mb-2" />
            </div>
          </v-row>
        </template> -->
        <template v-slot:item.prepared="{ item }">
          <span>
            <img :src="iconKnown(item)" @click="togglePrepared(item)" />
          </span>
        </template>

        <template v-slot:item.name="{ item }">
          <td>
            <v-row dense no-gutters>
              <v-col cols="12">
                <span>{{ item.name }}</span>
              </v-col>
              <v-col cols="12" v-if="item.traits">
                <trait-view :item="item" class="mt-1" />
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:item.level="{ item }">
          <span>
            {{ item.level }}
          </span>
        </template>

        <template v-slot:item.source="{ item }">
          <span v-if="item.source.book" v-html="item.book" />
        </template>

        <!-- <template v-slot:item.traditions="{ item }">
          <span v-if="item.traditions">{{ item.traditions.join(", ") }}</span>
        </template> -->

        <template v-slot:item.buy="{ item }">
          <v-btn x-small @click="addTalent(item, type, item.level)">
            add
          </v-btn>
        </template>

        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="12">
            <v-row class="rowFeat">
              <div class="head">
                <h1>{{ item.name }}</h1>
              </div>
              <div class="line"></div>
              <div class="tag" v-if="item.ritual">Ритуал {{ item.level }}</div>
              <div class="tag" v-if="!item.ritual">
                Заклинание {{ item.level }}
              </div>
            </v-row>
            <v-row>
              <div>
                <trait-view v-if="item.traits" :item="item" class="mb-2" />
              </div>
            </v-row>
            <p></p>
            <!-- Описание закла -->
            <div v-if="item.traditions">
              <p class="main-holder" v-if="item.traditions.length > 0">
                <strong>Традиция:</strong> {{ item.traditions.join(", ") }}
              </p>
            </div>
            <p></p>
            <div v-if="item.ritual">
              <p class="main-holder">
                <strong>Первичный кастер:</strong>
                {{ item.ritual.primary.check }}
              </p>

              <p class="main-holder" v-if="item.ritual">
                <strong>Вторичные кастеры:</strong>
                {{ item.ritual.secondary.casters }}
                ( {{ item.ritual.secondary.checks }} )
              </p>
            </div>
            <div v-if="item.cost">
              <p class="main-holder" v-if="item.cost.value">
                <strong>Стоимость:</strong>
                {{ item.cost.value }}
              </p>
            </div>
            <div v-if="item.time">
              <p class="main-holder" v-if="!item.ritual">
                <strong>Сотворение:</strong>
                <img
                  :src="iconAction(item?.time?.value)"
                  :class="{ 'invert-icon': !$vuetify.theme.dark }"
                />
              </p>
              <p class="main-holder" v-if="item.ritual">
                <strong>Сотворение:</strong> {{ item?.time?.value }}
              </p>
            </div>
            <p></p>
            <div v-if="item.range">
              <p class="main-holder">
                <strong>Дистанция:</strong> {{ item.range }}
              </p>
            </div>
            <p></p>
            <div v-if="item.area">
              <p class="main-holder">
                <strong>Область:</strong> {{ item?.area?.value }}-фут.
                {{ areaRepository[item?.area?.type] }}
              </p>
            </div>
            <p></p>
            <div v-if="item.target">
              <p class="main-holder" v-if="item.target">
                <strong>Цель:</strong> {{ item.target }}
              </p>
            </div>
            <div v-if="item.defense">
              <p class="main-holder" v-if="item.defense.save">
                <strong>Защита:</strong>

                <span v-if="item?.defense?.save">
                  <span v-if="item?.defense?.save?.basic">Базовый </span>
                  {{
                    SavingRepository.find(
                      (t) => t.key === item?.defense?.save?.statistic
                    ).name
                  }}
                </span>

                <span v-if="item?.traits?.includes('атака')">
                  <span>КБ </span>
                </span>
              </p>
            </div>
            <div v-if="item.duration">
              <p class="main-holder" v-if="item.duration.value">
                <strong>Длительность:</strong>
                <span v-if="item.duration.sustained === true"
                  >Поддерживаемое до
                </span>
                {{ item.duration.value }}
              </p>
            </div>

            <div>
              <p class="main-holder" v-if="item.Power">
                <strong>Урон на этом уровне:</strong>
                <span v-html="item.Power"></span>
              </p>
            </div>
            <p></p>
            <div class="line"></div>
            <div class="pt-4 pb-2" v-html="item.description"></div>
            <div class="line"></div>
            <div class="pt-4 pb-2" v-html="item.powerDescription"></div>
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
      selectedPrepared: false,
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
          text: 'Подготовлено',
          value: 'prepared',
          align: 'left',
          sortable: true,
        },
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
        // {
        //   text: 'Обычай',
        //   value: 'tradition',
        //   sortable: false,
        // },
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
    ritual() {
      return this.$store.getters['characters/characterRitualSpellsById'](this.characterId);
    },

  },
  methods: {
  togglePrepared(item) {
      item.prepared = !item.prepared;
      if(item.prepared === true)
        this.$store.commit('characters/addCharacterPreparedSpell', { id: this.characterId, spell: item });
      else
        this.$store.commit('characters/removeCharacterPreparedSpell', { id: this.characterId, key: item.key });
    },
    iconKnown(item) {
      const prepare = this.$store.getters['characters/characterPreparedById'](this.characterId);

        return  prepare.find( t=> t.key === item.key)
                  ? '/img/icon/icon_known.png'
                  : '/img/icon/icon_known_off.png'


    },

    iconAction(action) {
      if (action === '1') return `/img/icon/action_single.png`;
      if (action === '2') return `/img/icon/action_double.png`;
      if (action === '3') return `/img/icon/action_triple.png`;
      if (action === 'reaction') return `/img/icon/action_reaction.png`;
      if (action === 'free') return `/img/icon/action_free.png`;
    },
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
        cell: talent.cell,
        cast: false,
        placeholder: (match !== null && match !== undefined) ? match[1] : undefined,
        selected: undefined,
        source: `talent.${talentUniqueId}`,
      };

      if(!talent.ritual)
        this.$store.commit('characters/addCharacterSpell', { id: this.characterId, talent: payload });
      else

        this.$store.commit('characters/addCharacterRitualSpell', { id: this.characterId, talent: payload });

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

        const prepare = this.$store.getters['characters/characterPreparedById'](this.characterId);
        if (this.selectedPrepared === true) {
           searchResult = searchResult.filter((item) => prepare.find(s => s.key === item.key) === true)
        }

      if (this.selectedTagsFilters.length > 0) {
        searchResult = searchResult.filter((item) => this.selectedTagsFilters.some((m) => item.traits.includes(m)));
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
      if (!filteredTalents.find(spell => spell.ritual))
      {
    const lowercaseKeywords = this.archetype.spellTradition.toUpperCase();
      // Берем тот список, что соответствует заклинательскому

      filteredTalents = filteredTalents.filter((talent) =>talent.traditions &&  talent.traditions.toString().toUpperCase().includes(lowercaseKeywords))
      }


      let reduced = [];
      filteredTalents.filter(talent => talent.level <= this.level || talent.traits.includes("заговор")).forEach((item) => {
        if (item.source.book) {
          reduced.push(item.source.book);
        }
      });

      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((trait) => ({ name: trait }));

      },
     filteredHeaders() {
      if (this.archetype.prepared === false) {
        return this.headers.filter(h => h.value !== 'prepapared');
      }
      return this.headers;
    },
    tagFilters() {
       if (this.talents === undefined) {
        return [];
      }
      let filteredTalents = this.talents;
      //Берем обычаи из листа

      // Берем тот список, что соответствует заклинательскому

      if (!filteredTalents.find(spell => spell.ritual))
      {
    const lowercaseKeywords = this.archetype.spellTradition.toUpperCase();
      // Берем тот список, что соответствует заклинательскому

      filteredTalents = filteredTalents.filter((talent) =>talent.traditions &&  talent.traditions.toString().toUpperCase().includes(lowercaseKeywords))
      }

      //filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some(talent.tags.toString().toUpperCase()));
      let reduced = [];
      filteredTalents.filter(talent => talent.level <= this.level || talent.traits.includes("заговор")).forEach((item) => {
        if (item.traits) {
          reduced.push(...item.traits);
        }
      });

      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((traits) => ({ name: traits }));

    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },

    filteredTalents() {
      if (this.talents === undefined) {
        return [];
      }

      const ritual = this.$store.getters['characters/characterRitualSpellsById'](this.characterId);

      let filteredTalents = this.talents;

        const prepare = this.$store.getters['characters/characterPreparedById'](this.characterId);
        if (this.selectedPrepared === true) {
           filteredTalents = filteredTalents.filter((item) => prepare.find(s => s.key === item.key))
        }


       if (filteredTalents.find(spell => spell.ritual))
        filteredTalents = filteredTalents.filter(t => !ritual.find(spell => spell.key === t.key))

      if (this.selectedTagsFilters.length > 0) {
        filteredTalents = filteredTalents.filter((item) => this.selectedTagsFilters.some((m) => item.traits.includes(m)));
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


     // const lowercaseKeywords = this.archetype.spellTradition.toUpperCase();
      // Берем тот список, что соответствует заклинательскому

      // filteredTalents = filteredTalents.filter((talent) => talent.traditions && talent.traditions.toString().toUpperCase().includes(lowercaseKeywords))

      //const rank = this.rank;
const cant = this.archetype.spellProgression[this.characterLevel()].findIndex(
                      (t) => t == 0
      ) - 1;

      filteredTalents.forEach(spell => {
        if (spell.damage && spell.heightening?.damage /*&& spell.key === 'grisly-growths'*/) {

          const index = spell.damage?.formula?.indexOf("d", 0);
          ///Кубики до и после
          const dice = spell.damage?.formula?.slice(0, index);
          const diceSize = spell.damage.formula?.slice(index + 1);

          const heightened = Object.values(spell.heightening?.damage)[0];

          const index1 = heightened?.indexOf("d", 0);
          const diceInterval = heightened?.slice(0, index1);
          const interval = spell.heightening?.interval;

          const rank = spell.traits.join(',').includes('заговор') ? cant : spell.rank;

          const powerLevel2 = parseInt(dice) + (rank - interval) * (parseInt(diceInterval));
          spell.Power = "<span style='color: green'>" + powerLevel2 + "d" + diceSize + "</span>";
        }
      }
    );
      filteredTalents.forEach(spell =>
      {
        if (spell.heightening)
        {
          if (spell.heightening.type == "interval") {
            /*


            const interval = spell.heightening.interval;
            if (spell.heightening.area)
              for (var key of Object.keys(spell.heightening.area)) {
                // console.log(key + " -> " + spell.heightening.area[key]);
                const source = spell.heightening.area;
                const mtp = Math.floor((spell.rank - spell.level) / interval);
                const value = parseInt(spell.value[key]) + mtp * parseInt(source[key]);
                spell.area = spell.area.replace("{{powerValue"+parseInt(key)+"}}", "<span style='color: green'>" + value +  "</span>")
              }
              if (spell.heightening.target)
              for (var key of Object.keys(spell.heightening.target)) {
                // console.log(key + " -> " + spell.heightening.area[key]);
                const source = spell.heightening.target;
                const mtp = Math.floor((spell.rank - spell.level) / interval);
                const value = parseInt(spell.value[key]) + mtp * parseInt(source[key]);
                spell.target = spell.target.replace("{{powerValue"+parseInt(key)+"}}", "<span style='color: green'>" + value +  "</span>")
              }
              if (spell.heightening.damage)
              for (var key of Object.keys(spell.heightening.damage)) {
                // console.log(key + " -> " + spell.heightening.area[key]);
                const source = spell.heightening.damage;
                const mtp = Math.floor((spell.rank - spell.level) / interval);
                const index = source[key].indexOf("d", 0);
                const dice = source[key].slice(index - 1, index);
                const diceValue = spell.damage.formula.slice(index - 1, index);
                const diceSize = source[key].slice(index+1);
                const value = parseInt(diceValue) + mtp * parseInt(dice);
                spell.description = spell.description.replace("{{powerValue}}" + level, "<span style='color: green'>" + value + "d" + diceSize + "</span>");
              }
            */
              // const heightened = Math.floor((rank - 1) / spell.power);
              // const index = spell.powerValue1.indexOf("d", 0);
              // const dice = spell.powerValue1.slice(index-1, index);
              // const diceSize = spell.powerValue1.slice(index+1);
              // const powerLevel = parseInt(spell.powerStart1) + parseInt(dice) * heightened;
              // spell.description = spell.description.replace("{{powerValue}}"+level, "<span style='color: green'>" + powerLevel1 + "d" + diceSize + "</span>")

            }
        }

        }
      )
      //Усиление -- закоменчено пока что
      // filteredTalents.forEach(spell =>
      // {
      //   if (spell.powerValue1)
      //   {
      //     if (spell.powerValue1.indexOf("d", 0) == -1)
      //     {
      //       const heightened = Math.floor((rank - 1) / spell.power);
      //       const powerLevel1 = parseInt(spell.powerStart1) +parseInt(spell.powerValue1) * heightened;
      //       spell.description = spell.description.replace("{{powerValue1}}", "<span style='color: green'>" + powerLevel1 + "</span>")
      //     }
      //     else
      //     {
      //       const heightened = Math.floor((rank - 1) / spell.power);
      //       const index = spell.powerValue1.indexOf("d", 0);
      //       const dice = spell.powerValue1.slice(index-1, index);
      //       const diceSize = spell.powerValue1.slice(index+1);
      //       const powerLevel1 = parseInt(spell.powerStart1) + parseInt(dice) * heightened;
      //       spell.description = spell.description.replace("{{powerValue1}}", "<span style='color: green'>" + powerLevel1 + "d" + diceSize + "</span>")
      //     }

      //   }

      //   if (spell.powerValue2)
      //   {
      //     if (spell.powerValue2.indexOf("d", 0) == -1)
      //     {
      //       const heightened = Math.floor((rank - 1) / spell.power);
      //       const powerLevel2 = parseInt(spell.powerStart2) +parseInt(spell.powerValue2) * heightened;
      //       spell.description = spell.description.replace("{{powerValue2}}", "<span style='color: green'>" + powerLevel2 + "</span>")
      //     }
      //     else
      //     {
      //       const heightened = Math.floor((rank - 1) / spell.power);
      //       const index = spell.powerValue2.indexOf("d", 0);
      //       const dice = spell.powerValue2.slice(index-1, index);
      //       const diceSize = spell.powerValue2.slice(index+1);
      //       const powerLevel2 = parseInt(spell.powerStart2) + parseInt(dice) * heightened;
      //       spell.description = spell.description.replace("{{powerValue2}}", "<span style='color: green'>" + powerLevel2 + "d" + diceSize + "</span>")
      //     }

      //   }
      // }


      // )


      if (!filteredTalents.find(spell => spell.ritual))
          return filteredTalents.filter(talent => talent.level <= this.level || this.level === 0 && talent.traits.join(',').includes('заговор'));
      else
        return filteredTalents
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

.main-holder-divider p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  border-bottom: 1.5px solid black;
}

.spaced-table >>> tbody {
  display: table-caption;
  border-spacing: 0 8px; /* 8px вертикальный отступ между строками */
}
.spaced-table >>> tr {
  /* border-radius: 6px; */
  border-spacing: 0 8px;
  overflow: hidden;
}

.auto-height-table >>> tr {
  white-space: normal; /* Позволяет перенос строк и авто-высоту */
  vertical-align: top; /* По желанию — выравнивание по верхнему краю */
  padding-top: 8px;
  padding-bottom: 8px;
}
</style>
