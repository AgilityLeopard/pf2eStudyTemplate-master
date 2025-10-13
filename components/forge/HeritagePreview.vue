<template lang="html">
  <v-card>
    <v-card-title
      v-if="chooseMode"
      style="background-color: #262e37; color: #fff"
    >
      <span>Подтвердите выбор родословной</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')"> close </v-icon>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">
          {{ species.nameAncestry }}
        </h3>
        <!-- <span class="subtitle-1 grey--text">{{ species.hint }}</span> -->
      </div>
      <v-spacer />
      <div>
        <img :src="avatar" style="width: 96px" />
      </div>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-text class="pa-6">
      <!-- <p class="text-lg-justify">
        <strong>XP Cost:</strong> {{ species.cost }}, incl. Stats ({{ species.costs.stats }} XP)
      </p> -->

      <!-- <p><v-divider /></p> -->

      <p class="text-lg-justify" v-if="attributes">
        <strong>Attributes:</strong> {{ attributes }}
      </p>

      <p class="text-lg-justify" v-if="skills">
        <strong>Skills:</strong> {{ skills }}
      </p>

      <!-- <div v-for="trait in species.trait" class="simple"> -->
      <ul class="simple">
        <li v-if="species.trait" v-for="trait in species.trait" class="traits">
          <p class="trait">{{ trait }}</p>
        </li>
      </ul>
      <!-- </div> -->

      <p></p>

      <p class="text-lg-justify">
          <div v-html="species.previewText"></div> 
      </p>

      <span class="mt-2 grey--text">Повышение характеристик</span>
      <p><v-divider /></p>

      <div v-for="boost in species.attributeBoost" class="text-lg-justify">
        <div v-if="boost.value > 0">
          <strong>{{ boost.name }}</strong>
        </div>
      </div>

      <p></p>

      <span class="mt-2 grey--text">Понижение характеристик</span>
      <p><v-divider /></p>

      <div v-for="flaw in species.attributeFlaw" class="text-lg-justify">
        <div v-if="flaw.value > 0">
          <strong>{{ flaw.name }}</strong>
        </div>
      </div>

      <div v-if="species.speciesFeatures">
        <div v-for="feature in species.speciesFeatures" class="text-lg-justify">
          <div v-if="feature.description">
            <strong>{{ feature.name }}</strong>
            <div v-html="feature.description"></div>
          </div>
          <p v-else>
            <strong>{{ feature.name }}: </strong>{{ feature.snippet }}
          </p>
        </div>
      </div>
    </v-card-text>

    <v-divider v-if="chooseMode" />
    <v-card-actions v-if="chooseMode">
      <v-btn outlined color="red" left @click="$emit('cancel')"> Отмена </v-btn>
      <v-spacer />
      <v-btn color="success" right @click="$emit('select', species)">
        Выбор
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';

export default {
  name: 'speciesPreview',
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
}

.simple {
  display: inherit;
  margin-bottom: 0;
  padding-inline-start: 0.2em;
}
</style>
