<template>
  <v-row justify="center">
    <v-progress-circular
      v-if="!ascension"
      indeterminate
      color="success"
      size="128"
      width="12"
    />

    <v-col v-if="ascension" :xs="12">
      <div class="d-flex flex-no-wrap justify-space-between mb-2">
        <div>
          <h3 class="headline">{{ ascension.nameBackground }}</h3>
          <h4 class="subtitle-1 grey--text">{{ ascension.hint }}</h4>
          <v-btn small outlined color="primary" @click="doChangeAscensionMode">
            <v-icon small>settings</v-icon>
            Сменить предысторию
          </v-btn>
        </div>
        <v-avatar size="96" tile><img :src="avatar" /></v-avatar>
      </div>

      <!-- <ul class="simple">
        <li v-if="ascension.trait" v-for="trait in ascension.trait" class="traits">
          <p class="trait">{{ trait }}</p>
        </li>
      </ul> -->
      <v-divider />

      <div class="mt-2 body-2 text-lg-justify">
        <!-- <p>
          <strong>XP Cost:</strong> {{ species.cost }}, incl. Stats ({{ species.costs.stats }} XP)
        </p> -->

        <p>
          <strong>Характеристика на выбор:</strong>
          {{ characterLabelAttribute(ascension.boost1) }}
        </p>

        <p><strong>Характеристика на выбор 2:</strong> Свободное повышение</p>

        <p v-if="ascension.skill">
          <strong>Навык от предыстории:</strong>
          {{ characterLabelSkillTrainedChoice(ascension.skill) }}
        </p>

        <p v-if="ascension.lore">
          <strong>Знание от предыстории:</strong> {{ ascension.lore }}
        </p>

        <p v-if="ascension.description">
          <strong>Описание</strong> {{ ascension.description }}
        </p>

        <!-- <p><strong>Скорость:</strong> {{ ascension.speed }}</p> -->
      </div>

      <div class="body-2">
        <p><v-divider /></p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import AscensionPreview from "~/components/forge/AscensionPreview.vue";
import SluggerMixin from "~/mixins/SluggerMixin";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  name: "Manage",
  components: {
    AscensionPreview,
  },
  mixins: [SluggerMixin, StatRepositoryMixin],
  data() {
    return {
      loading: false,
      ascension: undefined,
      chapterList: undefined,
    };
  },
  computed: {
    characterAscensionKey() {
      return this.$store.getters["characters/characterAscensionPackagesById"](
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
      //if (this.species === undefined) return "";

      return `/img/avatars/species/playercore-dwarf.png`;
    },
  },
  watch: {
    characterAscensionKey: {
      handler(newVal) {
        if (newVal) {
          this.getAscension(newVal);
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
    characterLabelAttribute(keyAbility) {
      return this.attributeRepository
        .filter((a) => keyAbility.includes(a.key))
        .map((s) => s.name)
        .join(", ");
    },
    characterLabelAttributeBoost(item) {
      return item
        .filter((a) => a.value > 0)
        .map((s) => s.name)
        .join(", ");
    },
    characterLabelSkillTrainedChoice(keyAbility) {
      return this.skillRepository
        .filter((a) => keyAbility.includes(a.key))
        .map((s) => s.name)
        .join(", ");
    },
    async getChapterList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get("/api/species/chapters/", config);
      this.chapterList = data;
    },
    getAscension: async function (key) {
      this.loading = true;
      let finalData = {};

      // if (key.startsWith("custom-")) {
      //   const speciesDetails = this.$store.getters["species/getSpecies"](key);
      //   finalData = speciesDetails;
      // } else {
      const { data } = await this.$axios.get(`/api/ascension-packages/${key}`);
      finalData = data;
      // }

      this.loading = false;
      this.ascension = finalData;
    },
    resetSpecies() {
      this.selectedSpecies = undefined;
      this.$store.commit("characters/setCharacterSpecies", {
        id: this.characterId,
        species: { value: undefined, cost: 0 },
      });
    },
    doChangeAscensionMode() {
      this.$router.push({
        name: "forge-characters-id-builder-ascension-choose",
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
