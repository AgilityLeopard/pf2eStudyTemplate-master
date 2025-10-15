<template>
  <v-row justify="center">
    <v-col :cols="12">
      <h1 class="headline">Выберите наследие</h1>
    </v-col>

    <v-dialog
      v-model="speciesDialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <heritage-preview
        v-if="selectedSpecies"
        :character-id="characterId"
        :species="selectedSpecies"
        choose-mode
        @select="selectSpeciesForChar"
        @cancel="speciesDialog = false"
      />
    </v-dialog>

    <v-col cols="12">
      <v-progress-circular
        v-if="!speciesList"
        indeterminate
        color="success"
        size="128"
        width="12"
      />

      <v-card v-if="speciesList">
        <v-list>
          <v-list-item
            v-for="item in speciesList"
            :key="item.key"
            :disabled="item.baseTier > characterSettingTier"
            @click.stop="updatePreview(item)"
          >
            <v-list-item-avatar tile>
              <img :src="getAvatar(item.key)" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.nameAncestry }}
                <v-chip
                  v-if="item.source"
                  color="info"
                  outlined
                  tags
                  x-small
                  label
                >
                  {{ item.source.key.toUpperCase() }}
                </v-chip>
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.hint }}</v-list-item-subtitle>
            </v-list-item-content>

            <!-- <v-list-item-action class="d-none d-sm-inline">
              <v-chip pill color="green" text-color="white">
                <v-avatar left class="green darken-4">
                  {{ item.rarity }}
                </v-avatar>
                {{ item.rarity }}
              </v-chip>
            </v-list-item-action> -->

            <!-- <v-list-item-action class="d-none d-sm-inline" v-if="false">
              <v-chip pill color="red" text-color="white">
                <v-avatar left class="red darken-4">
                  {{ item.baseTier }}
                </v-avatar>
                Tier
              </v-chip>
            </v-list-item-action> -->
          </v-list-item>
        </v-list>
      </v-card>

      <!-- <v-card class="mt-4">
        <v-card-text>
          <p>
            You can add your own <strong>custom species</strong>
            <nuxt-link to="/forge/species">here</nuxt-link>. You can then select
            it here.
          </p>
        </v-card-text>
      </v-card> -->
    </v-col>
  </v-row>
</template>

<script>
import HeritagePreview from "~/components/forge/HeritagePreview.vue";
import SluggerMixin from "~/mixins/SluggerMixin";

export default {
  name: "Choose",
  components: {
    HeritagePreview,
  },
  mixins: [SluggerMixin],
  data() {
    return {
      speciesList: undefined,
      heritageList: undefined,
      abilityList: undefined,
      selectedSpecies: undefined, // for he preview dialog box
      speciesDialog: false,
    };
  },
  computed: {
    sources() {
      return ["playerCore", ...this.settingHomebrews];
    },
    settingHomebrews() {
      return this.$store.getters["characters/characterSettingHomebrewsById"](
        this.characterId
      );
    },
    characterSettingTier() {
      return this.$store.getters["characters/characterSettingTierById"](
        this.characterId
      );
    },
    characterAttributes() {
      return this.$store.getters["characters/characterAttributesById"](
        this.characterId
      );
    },
    characterSkills() {
      return this.$store.getters["characters/characterSkillsById"](
        this.characterId
      );
    },
    characterSpeciesLabel() {
      return this.$store.getters["characters/characterSpeciesLabelById"](
        this.characterId
      );
    },
  },
  watch: {
    sources: {
      handler(newVal) {
        if (newVal) {
          // this.getAbilityList(newVal);
          this.getSpeciesList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  methods: {
    async getSpeciesList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get("/api/heritage/", config);
      const speciesLabel = this.characterSpeciesLabel.toUpperCase();

      if (speciesLabel)
        this.speciesList = data.filter(
          (s) => s.isUniversal === true || s.type.toUpperCase() === speciesLabel
        );
      else this.speciesList = data.filter((s) => s.isUniversal === true);
    },
    async getAbilityList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get(
        "/api/abilityAncestry/",
        config.source
      );
      this.abilityList = data;
    },
    getAvatar(key) {
      return `/img/avatars/species/${key.toLowerCase()}.png`;
    },
    async updatePreview(item) {
      const slug = this.camelToKebab(item.key);
      if (item.key.startsWith("custom-")) {
        const speciesDetails = this.$store.getters["species/getSpecies"](
          item.key
        );
        this.selectedSpecies = speciesDetails;
      } else {
        const speciesDetails = await this.$axios.get(`/api/heritage/${slug}`);
        this.selectedSpecies = speciesDetails.data;
      }
      this.speciesDialog = true;
    },
    selectSpeciesForChar(species) {
      // TODO ensure attributes and skills
      if (species.prerequisites)
        this.ensurePrerequisites(species.prerequisites);

      let modifications = [];
      species.speciesFeatures
        .filter((t) => t.modifications !== undefined)
        .forEach((t) => {
          modifications = [...modifications, ...t.modifications];
        });

      this.$store.commit("characters/clearCharacterEnhancementsBySource", {
        id: this.characterId,
        source: "heritage",
      });
      this.$store.commit("characters/setCharacterHeritage", {
        id: this.characterId,
        heritage: { key: species.key, label: species.nameAncestry },
      });
      this.$store.commit("characters/setCharacterModifications", {
        id: this.characterId,
        content: { modifications: modifications, source: "heritage" },
      });

      // species.attributeBoost.forEach((t) => {

      //     this.$store.commit("characters/setCharacterAncestryBoostForAll", {
      //       id: this.characterId,
      //       payload: { key: t.key, value: t.value },
      //     });
      // });

      // species.attributeFlaw.forEach((t) => {

      //     this.$store.commit("characters/setCharacterAncestryFlawForAll", {
      //       id: this.characterId,
      //       payload: { key: t.key, value: t.value },
      //     });
      // });

      // this.$store.commit("characters/resetCharacterStats", {
      //   id: this.characterId,
      // });

      this.$store.commit("characters/clearCharacterKeywordsBySource", {
        id: this.characterId,
        source: "heritage",
      });
      // modifications
      //   .filter((m) => m.targetGroup === "keywords")
      species.trait.forEach((k) => {
        const payload = {
          name: k,
          source: "heritage",
          type: "keyword",
          replacement: undefined,
        };
        this.$store.commit("characters/addCharacterKeyword", {
          id: this.characterId,
          keyword: payload,
        });
      });

      this.$store.commit("characters/clearCharacterPsychicPowersBySource", {
        id: this.characterId,
        source: "heritage",
      });
      const featuresWithPowers = species.speciesFeatures.filter(
        (f) => f.psychicPowers !== undefined
      );
      if (featuresWithPowers) {
        featuresWithPowers.forEach((feature) => {
          feature.psychicPowers.forEach((powerSelections) => {
            if (powerSelections.selected) {
              const payload = {
                id: this.characterId,
                name: powerSelections.selected,
                cost: 0,
                source: `heritage.${powerSelections.selected.name}`,
              };
              this.$store.commit(
                "characters/addCharacterPsychicPower",
                payload
              );
            }
          });
        });
      }

      this.speciesDialog = false;
      this.$router.push({
        name: "forge-characters-id-builder-heritage-manage",
        params: { id: this.characterId },
      });
    },
    openCustomEditor() {
      this.$router.push({
        name: "forge-characters-id-builder-heritage-edit",
        params: { id: this.characterId, speciesKey: undefined },
      });
    },
    ensurePrerequisites(prerequisites) {
      const id = this.characterId;

      if (prerequisites && prerequisites.length > 0) {
        prerequisites.forEach((prerequisite) => {
          // { group: 'attributes', value: 'willpower', threshold: 3, }
          switch (prerequisite.group) {
            case "attributes":
              const attributeValue =
                this.characterAttributes[prerequisite.value];
              if (attributeValue < prerequisite.threshold) {
                this.$store.commit("characters/setCharacterAttribute", {
                  id,
                  payload: {
                    key: prerequisite.value,
                    value: prerequisite.threshold,
                  },
                });
              }
              break;
            case "skills":
              const skillValue = this.characterSkills[prerequisite.value];
              if (skillValue < prerequisite.threshold) {
                this.$store.commit("characters/setCharacterSkill", {
                  id,
                  payload: {
                    key: prerequisite.value,
                    value: prerequisite.threshold,
                  },
                });
              }
              break;
          }
        });
      }
    },
  },
};
</script>

<style scoped></style>
