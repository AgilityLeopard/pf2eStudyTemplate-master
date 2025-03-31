<template>
  <v-card
    class=""
    style="
      padding-inline: var(--mantine-spacing-xs);
      padding-top: var(--mantine-spacing-xs);
      padding-bottom: calc(0.3125rem * var(--mantine-scale));
      height: 100%;
    "
  >
    <!-- color: var(--v-primary) !important; -->
    <v-card-text
      style="
        --group-align: center;
        --group-justify: space-between;
        --group-wrap: wrap;
        flex-direction: column;
        height: 100%;
        color: var(--v-primary) !important;
        font-size: 16px;
      "
    >
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  name: "GridSheet",
  mixins: [StatRepositoryMixin],

  data() {
    return {
      newValue: 0,
      newHint: "",
    };
  },
  computed: {
    trait() {
      return this.getTraitByKey(this.traitKey);
    },
    traitWealth() {
      return this.characterTraits.find((t) => t.key === this.traitKey);
    },
    modifiers() {
      return this.characterModifiers.filter(
        (e) => e.targetValue === this.traitKey
      );
    },
  },
  methods: {
    addWealth() {
      const id = this.characterId;
      const content = {
        modifications: [
          {
            name: this.trait.name,
            targetGroup: "traits",
            targetValue: this.trait.key,
            modifier: parseInt(this.newValue),
            hint: this.newHint,
          },
        ],
        source: `custom`,
      };
      this.$store.commit("characters/addCharacterModifications", {
        id,
        content,
      });
      this.newValue = 0;
      this.newHint = "";
    },
    removeModifier(modificationId) {
      const id = this.characterId;
      this.$store.commit("characters/removeCharacterModificationById", {
        id,
        modificationId,
      });
    },
  },
};
</script>

<style scoped></style>
