<template lang="html">
  <v-row justify="center">
    <v-col :cols="12">
      <v-row>
        <v-col>
          <h3 class="headline">
            {{ item.name }}
          </h3>
          <span class="subtitle-1 grey--text">{{ item.hint }}</span>
          <h5 class="subtitle-2">
            <strong>Source: </strong>
            <span>{{ item.source.book }}</span
            ><span v-if="item.source.page">, pg. {{ item.source.page }}</span>
          </h5>
        </v-col>

        <v-spacer />

        <v-col class="hidden-xs-only">
          <img :src="avatar" style="width: 96px" />
        </v-col>
      </v-row>
    </v-col>

    <v-col :cols="12">
      <!-- <p class="text-lg-justify">
        <strong>Build Point Cost:</strong> {{ item.cost }}
      </p> -->

      <p><v-divider /></p>

      <p class="text-lg-justify">
        <strong>Base Tier:</strong> {{ item.baseTier }}
      </p>

      <p class="text-lg-justify"><strong>Speed:</strong> {{ item.speed }}</p>

      <!-- <div v-if="item.speciesFeatures">
        <span class="mt-2 grey--text">Abilities</span>
        <p><v-divider /></p>

        <div
          v-if="item.speciesFeatures"
          v-for="feature in item.speciesFeatures"
          class="text-lg-justify"
        >
          <strong>{{ feature.name }}</strong>
          <div v-if="feature.description" v-html="feature.description"></div>
          <p v-else>{{ feature.snippet }}</p>
        </div>

        <div v-if="item.description && item.description.length > 0">
          <p><v-divider /></p>
          <blockquote class="blockquote font-italic">
            <div v-html="item.description">"{{ item.description }}"</div>
            <span class="float-right">- Source: {{ item.source.book }} -</span>
          </blockquote>
        </div>
      </div> -->
    </v-col>

    <!-- source -->
    <v-col :cols="12" style="font-style: italic">
      <span class="caption">{{ item.source.book }}</span
      ><span v-if="item.source.page" class="caption"
        >, pg. {{ item.source.page }}</span
      >
    </v-col>
  </v-row>
</template>

<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'SpeciesDetails',
  mixins: [
    SluggerMixin,
  ],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      return `/img/avatars/species/${this.item.key}.png`;
    },
  },
  methods: {

  },
};
</script>

<style scoped lang="css"></style>
