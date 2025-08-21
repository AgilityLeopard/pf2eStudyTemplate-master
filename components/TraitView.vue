<template lang="html">
  <ul class="simple">
    <li v-for="trait in List(item)" class="traits">
      <p
        class="trait"
        v-if="
          trait.key !== 'необычный' &&
          trait.key !== 'редкий' &&
          trait.key !== 'обычный'
        "
      >
        <v-tooltip bottom :max-width="280" content-class="trait-tooltip">
          <template v-slot:activator="{ on }">
            <div v-on="on" class="t">
              {{ trait.key }}
            </div>
          </template>
          <span class="trait-tooltip__inner">{{ trait.desc }}</span>
        </v-tooltip>
      </p>
      <p class="rare" v-if="trait.key === 'редкий'">
        <v-tooltip bottom :max-width="280" content-class="trait-tooltip">
          <template v-slot:activator="{ on }">
            <div v-on="on" class="t">
              {{ trait.key }}
            </div>
          </template>
          <span class="trait-tooltip__inner">{{ trait.desc }}</span>
        </v-tooltip>
      </p>
      <p class="uncommon" v-if="trait.key === 'необычный'">
        <v-tooltip bottom :max-width="280" content-class="trait-tooltip">
          <template v-slot:activator="{ on }">
            <div v-on="on" class="t">
              {{ trait.key }}
            </div>
          </template>
          <span class="trait-tooltip__inner">{{ trait.desc }}</span>
        </v-tooltip>
      </p>
    </li>
  </ul>
</template>

<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';


export default {
  name: 'traitDetail',
  mixins: [
    SluggerMixin, StatRepositoryMixin
  ],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
    data() {
    return {
        traitList: undefined,
    };
  },

  computed: {
    sources() {
      return [
        'playerCore',
        'playerCore2',
        ...this.settingHomebrews,
      ];
    },

    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
  },
  watch: {
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getTraitList(newVal);

        }
      },
      immediate: true,
    },
  },
  methods: {
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
      traitItem(item)
    {
          if (this.traitList !==undefined)
          {

            return this.traitList.find(s => s.key === item) ? this.traitList.find(s => s.key === item) : '';
    }

      return '';
    },
    List(item) {
      if (this.traitList !== undefined) {
        const list = [];
        if(item.trait)
          this.traitList.filter(s => item.trait.includes(s.key)).forEach(tr => {
              list.push(tr);
          })
        const rar = this.traitList.find(s => item.rarity === s.nameEng.toLowerCase())
        if(rar) list.push(rar)
        return list.filter(t => t.key !== 'обычный');

      }
    }
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
  cursor: pointer;
}

.rare {
  background-color: rgb(0, 38, 100);
  color: #fff;
  display: inline-block;
  font-weight: bolder;
  margin: 0;
  padding: 0 0.25em;
  cursor: pointer;
}

.uncommon {
  background-color: rgb(152, 81, 61);
  color: #fff;
  display: inline-block;
  font-weight: bolder;
  margin: 0;
  padding: 0 0.25em;
  cursor: pointer;
}

.simple {
  display: inherit;
  margin-bottom: 0;
  padding-inline-start: 0.2em;
}

.t {
  color: #ffffff;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  display: inline;
  padding: 0;
  margin: 0;
  /* background-color: transparent; */
  background-color: linear-gradient(145deg, #2a2b31, #1f1f23);
  cursor: pointer;
}

.tooltip {
  color: #359fdf;
  text-decoration: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  display: inline;
  padding: 0;
  margin: 0;
  background: linear-gradient(145deg, #2a2b31, #1f1f23);
  cursor: pointer;
}

/* scoped, но с пробросом внутрь тултипа */
:deep(.trait-tooltip) {
  /* ограничение ширины; можно адаптивно: max-width: min(80vw, 280px); */
  max-width: 280px;
  white-space: normal !important; /* переопределяем Vuetify nowrap */
}

:deep(.trait-tooltip .trait-tooltip__inner) {
  display: inline-block;
  overflow-wrap: anywhere; /* переносим длинные слова/URL */
  word-break: break-word; /* на случай очень длинных токенов */
}
</style>
