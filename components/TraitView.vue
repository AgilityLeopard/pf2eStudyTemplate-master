<template lang="html">
  <ul class="simple">
    <li v-for="trait in item.traitDesc" class="traits">
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
    </li>
  </ul>
</template>

<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'traitDetail',
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
    // avatar() {
    //   return `/img/avatars/species/${this.item.key}.png`;
    // },
  },
  methods: {

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
