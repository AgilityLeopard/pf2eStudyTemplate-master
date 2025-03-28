<template>
  <v-row justify="center">
    <v-progress-circular
      v-if="!species"
      indeterminate
      color="success"
      size="128"
      width="12"
    />

    <v-col v-if="species" :xs="12">
      <div class="d-flex flex-no-wrap justify-space-between mb-2">
        <div>
          <h3 class="headline">{{ species.nameAncestry }}</h3>
          <h4 class="subtitle-1 grey--text">{{ species.hint }}</h4>
          <v-btn small outlined color="primary" @click="doChangeSpeciesMode">
            <v-icon small>settings</v-icon>
            изменить наследие
          </v-btn>
        </div>
        <v-avatar size="96" tile><img :src="avatar" /></v-avatar>
      </div>

      <div>
        <trait-view
          v-if="species.trait"
          :item="species"
          class="mb-2"
          style="font-size: 14px"
        />
      </div>
      <v-divider />

      <div class="mt-2 body-2 text-lg-justify">
        <!-- <p>
          <strong>XP Cost:</strong> {{ species.cost }}, incl. Stats ({{ species.costs.stats }} XP)
        </p> -->

        <p v-if="attributes"><strong>Attributes:</strong> {{ attributes }}</p>

        <p v-if="skills"><strong>Skills:</strong> {{ skills }}</p>

        <p><strong>Скорость:</strong> {{ species.speed }}</p>
      </div>

      <!-- <div v-if="species.description" class="body-2"> -->
      <div v-if="species.description" v-html="species.description"></div>
      <p><v-divider /></p>

      <div v-for="description in species.Description" class="text-lg-justify">
        <div v-if="description.name == 'Faith'">
          <span class="subtitle-1 mt-2">Верование</span>
          <p><v-divider /></p>
          <div v-if="description.about" v-html="description.about"></div>
          <strong> Популярные эдикты</strong>
          <div v-if="description.edicts" v-html="description.edicts"></div>

          <p></p>

          <strong> Популярные анафемы</strong>
          <div v-if="description.anathema" v-html="description.anathema"></div>
        </div>

        <p></p>

        <div v-if="description.name == 'avanturist'">
          <span class="subtitle-1 mt-2">Авантюристы</span>
          <p><v-divider /></p>
          <div v-if="description.about" v-html="description.about"></div>
        </div>

        <div v-if="description.name == 'name'">
          <span class="subtitle-1 mt-2">Имена</span>
          <p><v-divider /></p>
          <div v-if="description.about" v-html="description.about"></div>
          <span class="subtitle-2 mt-2"><strong>Примеры имен</strong></span>
          <div v-if="species.exampleName" v-html="species.exampleName"></div>
        </div>

        <div v-if="description.name == 'society'">
          <span class="subtitle-1 mt-2">Общество</span>
          <p><v-divider /></p>
          <div v-if="description.about" v-html="description.about"></div>
        </div>
      </div>
      <!-- </div> -->
    </v-col>
  </v-row>
</template>

<script>
import HeritagePreview from "~/components/forge/HeritagePreview.vue";
import SluggerMixin from "~/mixins/SluggerMixin";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";
import traitView from "~/components/TraitView";

export default {
  name: "Manage",
  components: {
    HeritagePreview,
    traitView,
  },
  mixins: [SluggerMixin, StatRepositoryMixin],
  data() {
    return {
      loading: false,
      species: undefined,
      abilityList: undefined,
      chapterList: undefined,
    };
  },
  computed: {
    characterHeritageKey() {
      return this.$store.getters["characters/characterHeritageKeyById"](
        this.characterId
      );
    },
    characterSpeciesAstartesChapter() {
      return this.$store.getters[
        "characters/characterSpeciesAstartesChapterById"
      ](this.characterId);
    },
    enhancements() {
      return this.$store.getters["characters/characterEnhancementsById"](
        this.characterId
      );
    },
    psychicPowers() {
      return this.$store.getters["characters/characterPsychicPowersById"](
        this.characterId
      );
    },
    sources() {
      return [
        "playerCore",
        // "fspg",
        // "red1",
        // "cos",
        // 'tnh',
        ...this.settingHomebrews,
      ];
    },
    settingHomebrews() {
      return this.$store.getters["characters/characterSettingHomebrewsById"](
        this.characterId
      );
    },
    attributes() {
      if (
        this.species === undefined ||
        this.species.prerequisites === undefined
      )
        return undefined;
      return this.species.prerequisites
        .filter((pre) => pre.group === "attributes")
        .map(
          (pre) => `${this.getAttributeByKey(pre.value).name} ${pre.threshold}`
        )
        .join(", ");
    },
    skills() {
      if (
        this.species === undefined ||
        this.species.prerequisites === undefined
      )
        return undefined;
      return this.species.prerequisites
        .filter((pre) => pre.group === "skills")
        .map((pre) => `${this.getSkillByKey(pre.value).name} ${pre.threshold}`)
        .join(", ");
    },
    avatar() {
      if (this.species === undefined) return "";
      return `/img/avatars/species/${this.species.key}.png`;
    },
  },
  watch: {
    characterHeritageKey: {
      handler(newVal) {
        if (newVal) {
          this.getAbilityList(newVal);
          this.getHeritage(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getChapterList(newVal);
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
    async getChapterList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get("/api/species/chapters/", config);
      this.chapterList = data;
    },
    async getAbilityList(key) {
      this.loading = true;
      // const config = {
      //   params: {
      //     source: sources.join(","),
      //   },
      // };
      const { data } = await this.$axios.get(`/api/abilityAncestry/"${key}`);
      this.abilityList = data;
      this.loading = false;
    },
    getHeritage: async function (key) {
      this.loading = true;
      let finalData = {};

      const { data } = await this.$axios.get(`/api/heritage/${key}`);
      finalData = data;

      // if(this.abilityList !== undefined)
      //   {
      //     const ability = this.abilityList.filter(key => key.includes(this.finalData.ancestryAbility));
      //     this.selectedSpecies.push(abilityList);
      //   }

      // finalData.speciesFeatures
      //   .filter((feature) => feature.options)
      //   .forEach((feature) => {
      //     const enhancements = this.enhancements.filter((modifier) =>
      //       modifier.source.startsWith(`species.${feature.name}`)
      //     );
      //     if (enhancements) {
      //       enhancements.forEach((e) => {
      //         let foundInd = /\.(\d)\./.exec(e.source);
      //         if (foundInd) {
      //           feature.selected[foundInd[1]] = e.source.split(".").pop();
      //         }
      //       });
      //     } else {
      //       const enhancement = this.enhancements.find((modifier) =>
      //         modifier.source.startsWith(`heritage.${feature.name}`)
      //       );
      //       if (enhancement) {
      //         feature.selected = enhancement.source.split(".").pop();
      //       }
      //     }
      //   });

      // const chapter = this.characterSpeciesAstartesChapter;
      // if (chapter) {
      //   finalData.chapter = chapter;
      // }

      // const featuresWithPowers = finalData.speciesFeatures.filter(
      //   (f) => f.psychicPowers !== undefined
      // );
      // if (featuresWithPowers) {
      //   featuresWithPowers.forEach((feature) => {
      //     feature.psychicPowers.forEach((powerSelections) => {
      //       this.getPsychicPowerOptions(powerSelections);
      //       const found = this.psychicPowers.find(
      //         (p) => p.source && p.source === `species.${powerSelections.name}`
      //       );
      //       if (found) {
      //         console.info(
      //           `Power ${found.name} found for the species feature ${feature.name} / power ${powerSelections.name}.`
      //         );
      //         powerSelections.selected = found.name;
      //       }
      //     });
      //   });
      // }

      this.loading = false;
      this.species = finalData;
    },
    resetSpecies() {
      this.selectedSpecies = undefined;
      this.$store.commit("characters/setCharacterSpecies", {
        id: this.characterId,
        species: { value: undefined, cost: 0 },
      });
    },
    doChangeSpeciesMode() {
      this.$router.push({
        name: "forge-characters-id-builder-heritage-choose",
        params: { id: this.characterId },
      });
    },
    getChapterTraditions(chapterKey) {
      if (this.chapterList) {
        const chapter =
          this.chapterList.find((a) => a.key === chapterKey) || [];
        if (chapter) {
          return chapter.beliefsAndTraditions;
        }
      }
      return [];
    },
    enableHomebrew(sourceKey) {
      this.$store.commit("characters/enableSettingHomebrews", {
        id: this.characterId,
        content: sourceKey,
      });
    },
    /**
     * clear previous option
     *
     * @param speciesTrait
     */
    setSpeciesFeatureOptionSelection(speciesTrait, index) {
      const id = this.characterId;
      let selectedValue = speciesTrait.selected[index]; // the NAME property of the option
      const selectedOption = speciesTrait.options.find(
        (o) => o.name === selectedValue
      );

      if (!selectedOption) {
        console.warn(
          `No option found for index ${index} for ${selectedValue}`,
          speciesTrait.options
        );
        return;
      }

      this.$store.commit("characters/clearCharacterEnhancementsBySource", {
        id,
        source: `species.${speciesTrait.name}.${index}`,
      });
      // the option has a snippet, that is thus added as a custom ability
      if (selectedOption.snippet) {
        const content = {
          modifications: [
            {
              name: selectedOption.name,
              targetGroup: "abilities",
              targetValue: "",
              effect: selectedOption.snippet,
            },
          ],
          source: `species.${speciesTrait.name}.${index}.${selectedOption.name}`,
        };
        this.$store.commit("characters/addCharacterModifications", {
          id,
          content,
        });
      }

      this.$store.commit("characters/clearCharacterKeywordsBySource", {
        id: this.characterId,
        source: `species.${speciesTrait.name}`,
        cascade: true,
      });

      // the selected option has modifications that are saved as such
      if (selectedOption.modifications) {
        selectedOption.modifications
          .filter((m) => m.targetGroup === "keywords")
          .forEach((k) => {
            const payload = {
              name: k.targetValue,
              source: `species.${speciesTrait.name}.${index}`,
              type: "keyword",
              replacement: undefined,
            };
            this.$store.commit("characters/addCharacterKeyword", {
              id: this.characterId,
              keyword: payload,
            });
          });

        const content = {
          modifications: selectedOption.modifications,
          source: `species.${speciesTrait.name}.${index}.${selectedOption.name}`,
        };
        this.$store.commit("characters/addCharacterModifications", {
          id,
          content,
        });
      }
    },
    updateAstartesChapter(key) {
      const id = this.characterId;
      const chapter = this.chapterList.find((chapter) => chapter.key === key);

      const content = {
        speciesAstartesChapter: chapter.key,
      };
      this.$store.commit("characters/setCharacterSpeciesAstartesChapter", {
        id,
        ...content,
      });

      this.$store.commit("characters/clearCharacterTalentsBySource", {
        id,
        source: `species.chapter.`,
        cascade: true,
      });
      chapter.beliefsAndTraditions.forEach((bf) => {
        if (bf.modifications) {
          bf.modifications
            .filter((m) => m.targetGroup === "talents")
            .forEach((t) => {
              const talent = {
                name: t.meta.name,
                key: t.targetValue,
                cost: 0,
                placeholder: undefined,
                selected: undefined,
                source: `species.chapter.${chapter.key}`,
              };
              this.$store.commit("characters/addCharacterTalent", {
                id,
                talent,
              });
            });
        }
      });
    },
  },
};
</script>

<style scoped>
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
