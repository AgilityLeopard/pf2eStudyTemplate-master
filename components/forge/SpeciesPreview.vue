<template lang="html">
  <v-card>
    <v-card-title
      v-if="chooseMode"
      style="background-color: #262e37; color: #fff"
    >
      <span>Подтвердите выбор Расы</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')"> close </v-icon>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">
          {{ species.nameAncestry }}
        </h3>
      </div>
      <v-spacer />
      <div>
        <img :src="avatar" style="width: 96px" />
      </div>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-text class="pa-6">
      <ul class="simple">
        <li v-if="species.traitDesc" v-for="trait in species.traitDesc" class="traits">
          <p class="trait">
          <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <div v-on="on" class="t">
                  {{ trait.name }} 
                </div>
              </template>
              <span>{{ trait.description }}</span>
            </v-tooltip>
          </p>
          
          <!-- <p class="trait">{{ trait }}</p> -->
        </li>
     
      </ul>
      <!-- </div> -->

      <p></p>
      <div v-html="species.previewText"></div>
      <!-- <p class="text-lg-justify">
          <div v-html="species.previewText"></div> 
      </p> -->

      <span class="mt-2 grey--text">Повышение характеристик</span>
      <v-divider />

      <div v-for="boost in species.attributeBoost" class="text-lg-justify">
        <div v-if="boost.value > 0">
          <strong>{{ boost.name }}</strong>
        </div>
      </div>

      <div v-for="boost in species.abilityBoost" class="text-lg-justify">
        <div>
          <strong> Свободное повышение </strong>
        </div>
      </div>

      <p></p>

      <span  v-if="species.attributeFlaw.find(t => t.value < 0)" class="mt-2 grey--text">Понижение характеристик</span>
      <v-divider  v-if="species.attributeFlaw.find(t => t.value < 0)" />

      <div v-for="flaw in species.attributeFlaw" class="text-lg-justify">
        <div v-if="flaw.value < 0">
          <strong>{{ flaw.name }}</strong>
        </div>
      </div>

      <p></p>
      <span class="mt-2 grey--text">Языки</span>
      <v-divider />

      <div v-for="lang in species.language" class="text-lg-justify">
        <div>
          <strong>{{ lang }}</strong>
        </div>
      </div>

      <div>
        {{ species.freeLanguage }} на выбор + количество языков, равное вашему
        модификатору Интеллекта (если положительный)
      </div>

      <p></p>
      <span v-if="species.speciesFeatures.length != 0" class="mt-2 grey--text">Особенности Родословной</span>
      <v-divider v-if="species.speciesFeatures.length != 0" />

      <div v-if="species.speciesFeatures">
        <div v-for="feature in species.speciesFeatures" class="text-lg-justify">
          <div v-if="feature.description">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <div v-on="on" class="tooltip">
                  {{ feature.name }}
                </div>
              </template>
              <span>{{ feature.description }}</span>
            </v-tooltip>
          </div>
        </div>
      </div>
    </v-card-text>

    <v-divider v-if="chooseMode" />
    <v-card-actions v-if="chooseMode">
      <v-btn outlined color="red" left @click="$emit('cancel')">
        Отменить
      </v-btn>
      <v-spacer />
      <v-btn color="success" right @click="$emit('select', species)">
        Выберите наследие
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'SpeciesPreview',
  mixins: [
    SluggerMixin,
    StatRepositoryMixin,
  ],
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
  background-color: transparent;
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
  background-color: transparent;
  cursor: pointer;
}
</style>
