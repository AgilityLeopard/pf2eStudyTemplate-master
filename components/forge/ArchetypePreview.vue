<template lang="html">
  <v-card v-if="item" class="pa-0">
    <v-card-title
      v-if="chooseMode"
      style="background-color: #262e37; color: #fff"
    >
      <span>Подтвердите класс</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')"> close </v-icon>
    </v-card-title>

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">
          {{ item.name }}
        </h3>
      </div>
      <v-spacer />
      <div>
        <img :src="avatar" style="width: 96px" />
      </div>
    </v-card-title>

    <v-divider />
    <v-card-text class="pt-4">
      <div>
        <trait-view
          v-if="item.trait"
          :item="item"
          class="mb-2"
          style="font-size: 14px"
        />
      </div>
      <p class="text-lg-justify">
        <i><div v-html="item.hint"></div> </i>
      </p>

      <p><v-divider /></p>

      <!-- <p class="text-lg-justify">
        <strong>Keywords: </strong>
        <span style="text-transform: uppercase; color: #F44336;">{{ item.keywords.split(',').map((i)=>i.trim()).join(', ') }}</span>
      </p> -->
      <p>Классовые особенности</p>

      <div v-for="feature in item.archetypeFeatures" class="text-lg-justify">
        <div>
          <strong>{{ feature.name }}</strong>
          <div v-if="feature.description" v-html="feature.description"></div>
          <p v-else>{{ feature.snippet }}</p>
          <v-alert v-if="feature.alert" :type="feature.alert.type" dense text>{{
            feature.alert.text
          }}</v-alert>
        </div>
      </div>

      <p class="text-lg-justify"><strong>Wargear:</strong> {{ wargearText }}</p>

      <div v-if="false">
        <p><v-divider /></p>
        <blockquote class="blockquote font-italic">
          <p>"{{ item.description }}"</p>
          <span class="float-right">- from the Wrath & Glory Corerules -</span>
        </blockquote>
      </div>

      <p class="text-lg-justify" v-if="item.influence && item.influence != 0">
        <strong>Influence Bonus: </strong>
        {{ `${item.influence > 0 ? "+" : ""}${item.influence}` }}
      </p>
    </v-card-text>

    <v-divider v-if="chooseMode" />
    <v-card-actions v-if="chooseMode">
      <v-btn left outlined color="red" @click="$emit('cancel')"> Отмена </v-btn>
      <v-spacer />
      <v-btn right color="green" @click="$emit('select', item)">
        Выберите класс
      </v-btn>
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
    components:{traitView},
  props: {
    characterId: {
      type: String,
      required: true,
    },
    item: {
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
      if ( this.item.wargearString ) {
        return this.item.wargearString;
      }
      if ( this.item.wargear && this.item.wargear.length > 0 ) {
        return this.item.wargear.map((g) => {
          if (g.amount) {
            return `${g.amount}x ${g.name}`;
          }
          return `${g.name}`;
        }).join(', ');
      }
      return this.item.wargear;
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
