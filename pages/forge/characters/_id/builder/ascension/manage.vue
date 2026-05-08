<template>
  <v-row justify="center">
    <!-- Loader -->
    <v-progress-circular v-if="!ascension" indeterminate color="success" size="96" width="8" />

    <v-col v-else cols="12" lg="10">

      <!-- 🧭 Header -->
      <v-card class="mb-4 pa-4" outlined>
        <v-row align="center">
          <v-col cols="12" md="8">
            <h2 class="text-h4 font-weight-bold">
              {{ ascension.nameBackground }}
            </h2>

            <div class="grey--text mb-2">
              {{ ascension.hint }}
            </div>

            <v-btn small outlined color="primary" @click="doChangeAscensionMode">
              <v-icon small left>mdi-cog</v-icon>
              Сменить предысторию
            </v-btn>
          </v-col>

          <v-col cols="12" md="4" class="text-right">
            <v-avatar size="96" tile>
              <img :src="avatar" />
            </v-avatar>
          </v-col>
        </v-row>
      </v-card>

      <!-- ⚙️ Основные бонусы -->
      <v-row class="d-flex" align="stretch">
        <v-col cols="12" md="6">
          <v-card outlined class="pa-4 d-flex flex-column fill-height" style="border-color: #c75d5d;">
            <h3 class="text-h6 mb-2">Характеристика на выбор</h3>
            <strong>
              {{ characterLabelAttribute(ascension.boost1) }}
            </strong>

            <div class="mt-2 text--secondary">
              Первое усиление характеристик
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card outlined class="pa-4 d-flex flex-column fill-height" style="border-color: #c75d5d;">
            <h3 class="text-h6 mb-2">Второе усиление</h3>
            <strong>Свободное повышение</strong>

            <div class="mt-2 text--secondary">
              Выбор игрока
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- 🎯 Навыки -->
      <v-card outlined class="pa-4 mt-4" style="border-color: #c75d5d;">
        <h3 class="text-h6 mb-2">Навыки</h3>

        <div v-if="ascension.skill">
          <strong>Навык от предыстории:</strong>
          {{ characterLabelSkillTrainedChoice(ascension.skill) }}
        </div>

        <div class="mt-2">
          <strong>Дополнительно:</strong>
          +1 навык или бонус (по правилам)
        </div>
      </v-card>

      <!-- 📚 Лор -->
      <v-card v-if="ascension.lore || ascension.description" outlined class="pa-4 mt-4" style="border-color: #c75d5d;">
        <h3 class="text-h6 mb-2">История</h3>

        <p v-if="ascension.lore">
          <strong>Знание:</strong> {{ ascension.lore }}
        </p>

        <p v-if="ascension.description">
          <strong>Описание:</strong> {{ ascension.description }}
        </p>
      </v-card>

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
.v-card {
  border-radius: 14px;
  transition: 0.2s;
}

.v-card:hover {
  transform: translateY(-2px);
}

.right-header {
  float: right;
}

.left-header {
  float: left;
}

.h3 {
  font-size: 24px;
  font-weight: normal;
  color: #5d0000;
}

.h4 {
  color: #a76652;
  font-weight: normal;
  font-size: 20px;
  margin-top: 50px;
  margin-bottom: 10px;
}

.split-header {
  border-bottom: 1.5px solid;
  padding-bottom: 5px;
  overflow: hidden;
}

.split-header1 {
  border-bottom: 1.5px;
  padding-bottom: 5px;
  overflow: hidden;
}

.main-holder p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.two-column-holder {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.two-column-left {
  flex: 50%;
  flex-wrap: wrap;
  padding: 20px 30px;
}

@media screen and (max-width: 600px) {
  .two-column-left {
    flex: 100%;
    flex-wrap: wrap;
    padding: 20px 30px;
  }
}

.two-column-right {
  flex: 50%;
  flex-wrap: wrap;
  padding: 20px 30px;
}

.light-red-border .two-column-left {
  border-right: 1px solid #d85058;
}

@media screen and (max-width: 600px) {
  .light-red-border .two-column-left {
    border-bottom: 1px solid #d85058;
    border-right: none;
  }
}

.class-sidebar {
  /* background: #fdfdfd; */
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0px 2px 12px rgb(0 0 0 / 20%);
  /* color: #5c1c16; */
  word-break: break-word;
}

.dark-red-border .two-column-left {
  border-right: 1px solid #5c1c16;
}

@media screen and (max-width: 600px) {
  .dark-red-border .two-column-left {
    border-bottom: 1px solid #5c1c16;
    border-right: none;
  }
}

h1 {
  color: #3366ff;
}

h2 {
  color: #ff4d4d;
}

h3 {
  color: #ff9977;
}

h4,
h5,
h6 {
  color: #ffffff;
}

.feature-text h1 {
  color: #3366ff;
}

.feature-text h2 {
  color: #ff4d4d;
}

.feature-text h3 {
  color: #ff9977;
}

.highlight-term {
  background-color: rgba(255, 255, 0, 0.2);
  border-bottom: 1px dotted yellow;
  cursor: help;
}
</style>
