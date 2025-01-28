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
      <species-preview
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
                  v-if="
                    item.source && !['core', 'coreab'].includes(item.source.key)
                  "
                  color="info"
                  outlined
                  tags
                  x-small
                  label
                >
                  {{ item.source.key.toUpperCase() }}
                </v-chip>
              </v-list-item-title>
              <v-list-item-subtitle
                ><v-chip> {{ item.ancestryHitPoint }} HP </v-chip
                ><v-chip> +ЛОВ, МДР, СВОБ </v-chip><v-chip> -ТЕЛ </v-chip>
              </v-list-item-subtitle>
              <!-- <v-list-item-subtitle>{{ item.hint }}</v-list-item-subtitle> -->
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import SpeciesPreview from "~/components/forge/SpeciesPreview.vue";
import SluggerMixin from "~/mixins/SluggerMixin";
import talentMixin from "~/mixins/talentRepository";

export default {
  name: "Choose",
  components: {
    SpeciesPreview,
  },
  mixins: [SluggerMixin, talentMixin],
  data() {
    return {
      speciesList: undefined,
      abilityList: undefined,
      traitList: undefined,
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
  },
  watch: {
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getAbilityList(newVal);
          this.getTraitList(newVal);
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
      const { data } = await this.$axios.get("/api/species/", config);

      if (this.abilityList !== undefined) {
        data.forEach((species) => {
          const lowercaseKeywords = species.ancestryAbility.map((s) =>
            s.toUpperCase()
          );

          const List = this.abilityList;
          const ability = List.filter((talent) =>
            lowercaseKeywords.includes(talent.key.toString().toUpperCase())
          );

          if (ability.length > 0) {
            const listAbilities = [];
            ability.forEach((talent) => {
              const ability1 = {
                name: talent.name,
                key: talent.key,
                description: talent.description,
                modification: talent.modification,
              };

              listAbilities.push(talent);
            });
            species.speciesFeatures = listAbilities;
          }
        });
      }

      if (this.traitList !== undefined) {
        data.forEach((species) => {
          const lowercaseKeywords = species.trait.map((s) => s.toUpperCase());

          const List1 = this.traitList;
          const trait = List1.filter((talent) =>
            lowercaseKeywords.includes(talent.key.toString().toUpperCase())
          );

          if (trait.length > 0) {
            const listAbilities = [];
            species.trait.forEach((talent) => {
              const t = trait.find((k) => k.key === talent);

              if (t) {
                const ability1 = {
                  name: t.key,
                  description: t.desc,
                };

                listAbilities.push(ability1);
              }
            });
            species.traitDesc = listAbilities;
          }
        });
      }

      this.speciesList = data;
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
    async getTraitList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get("/api/traits/", config.source);
      this.traitList = data;
    },
    getAvatar(key) {
      return `/img/avatars/species/${key}.png`;
    },
    async updatePreview(item) {
      const slug = this.camelToKebab(item.key);
      if (item.key.startsWith("custom-")) {
        const speciesDetails = this.$store.getters["species/getSpecies"](
          item.key
        );
        this.selectedSpecies = speciesDetails;
      } else {
        const speciesDetails = await this.$axios.get(`/api/species/${slug}`);
        this.selectedSpecies = speciesDetails.data;
      }
      this.selectedSpecies = item;
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
        source: "species",
      });
      this.$store.commit("characters/setCharacterSpeed", {
        id: this.characterId,
        type: "land",
        speed: species.speed,
      });

      this.$store.commit("characters/setCharacterSpecies", {
        id: this.characterId,
        species: { key: species.key, label: species.nameAncestry },
      });
      this.$store.commit("characters/setCharacterModifications", {
        id: this.characterId,
        content: { modifications: modifications, source: "species" },
      });

      species.attributeBoost.forEach((t) => {
        this.$store.commit("characters/setCharacterAncestryBoostForAll", {
          id: this.characterId,
          payload: { key: t.key, value: t.value },
        });
      });

      species.attributeFlaw.forEach((t) => {
        this.$store.commit("characters/setCharacterAncestryFlawForAll", {
          id: this.characterId,
          payload: { key: t.key, value: t.value },
        });
      });

      this.$store.commit("characters/resetCharacterStats", {
        id: this.characterId,
        optional: "ancestry",
      });

      this.$store.commit("characters/setCharacterHitPoints", {
        id: this.characterId,
        payload: { value: species.ancestryHitPoint, type: "ancestry" },
      });

      this.$store.commit("characters/clearCharacterKeywordsBySource", {
        id: this.characterId,
        source: "species",
      });
      // modifications
      //   .filter((m) => m.targetGroup === "keywords")
      species.trait.forEach((k) => {
        const payload = {
          name: k,
          source: "species",
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
        source: "species",
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
                source: `species.${powerSelections.selected.name}`,
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
        name: "forge-characters-id-builder-species-manage",
        params: { id: this.characterId },
      });
    },
    openCustomEditor() {
      this.$router.push({
        name: "forge-characters-id-builder-species-edit",
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
