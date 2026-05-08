<template>
  <v-row justify="center">

    <!-- Loader -->
    <v-progress-circular v-if="!species" indeterminate color="success" size="96" width="8" />

    <v-col v-else cols="12" lg="10">

      <!-- 🧭 HEADER -->
      <v-card class="mb-4 pa-4" outlined>
        <v-row align="center">

          <v-col cols="12" md="8">
            <h2 class="text-h4 font-weight-bold">
              {{ species.nameAncestry }}
            </h2>

            <div class="grey--text mb-2">
              {{ species.hint }}
            </div>

            <v-btn small outlined color="primary" @click="doChangeSpeciesMode">
              <v-icon small left>mdi-cog</v-icon>
              изменить наследие
            </v-btn>
          </v-col>

          <v-col cols="12" md="4" class="text-right">
            <v-avatar size="96" tile>
              <img :src="avatar" />
            </v-avatar>
          </v-col>

        </v-row>
      </v-card>

      <!-- 🧬 TRAITS -->
      <v-card class="mb-4 pa-4" outlined>
        <trait-view v-if="species.trait" :item="species" />
      </v-card>

      <!-- ⚙️ CORE STATS -->
      <v-row class="d-flex" align="stretch">

        <!-- Attributes -->
        <v-col cols="12" md="6">
          <v-card outlined class="pa-4 fill-height" style="border-color:#c75d5d;">
            <h3 class="text-h6 mb-2">Повышение характеристик</h3>

            <div v-if="species.attributeBoost?.length">
              <div v-for="boost in species.attributeBoost" :key="boost.name">
                <strong v-if="boost.value > 0">{{ boost.name }}</strong>
              </div>
            </div>

            <div v-for="boost in species.abilityBoost" :key="boost.name">
              <strong>Свободное повышение</strong>
            </div>
          </v-card>
        </v-col>

        <!-- HP -->
        <v-col cols="12" md="6">
          <v-card outlined class="pa-4 fill-height" style="border-color:#ff6f61;">
            <h3 class="text-h6 mb-2">Хиты</h3>

            <strong>
              {{ species.ancestryHitPoint }} + мод Телосложения
            </strong>

            <div class="text--secondary mt-2">
              На 1 уровне
            </div>
          </v-card>
        </v-col>

      </v-row>

      <!-- 📜 LANGUAGES / INFO -->
      <v-card class="mt-4 pa-4" outlined>
        <h3 class="text-h6 mb-2">Общая информация</h3>

        <p>
          <strong>Языки:</strong>
          {{ species.language.join(", ") }}
          + {{ species.freeLanguage }} на выбор
        </p>

        <p>
          <strong>Размер:</strong>
          {{ size(species.size) }}
        </p>

        <p>
          <strong>Скорость:</strong>
          {{ species.speed }}
        </p>
      </v-card>

      <!-- 📚 DESCRIPTION -->
      <v-card class="mt-4 pa-4" outlined>
        <h3 class="text-h6 mb-3">Описание</h3>

        <div v-for="description in species.Description" :key="description.name">

          <div v-if="description.name === 'Faith'">
            <h4>Верование</h4>
            <div v-html="description.about"></div>
          </div>

          <div v-if="description.name === 'avanturist'">
            <h4>Авантюристы</h4>
            <div v-html="description.about"></div>
          </div>

          <div v-if="description.name === 'physical'">
            <h4>Физическое описание</h4>
            <div v-html="description.about"></div>
          </div>

          <div v-if="description.name === 'society'">
            <h4 c>Общество</h4>
            <div v-html="description.about"></div>
          </div>

          <v-divider class="my-2" />

        </div>

        <!-- Names -->
        <div v-if="species.exampleName">
          <h4>Имена</h4>
          <div v-html="species.exampleName"></div>
        </div>

      </v-card>

      <!-- 🧬 FEATURES -->
      <v-card v-if="species.speciesFeatures.length !== 0" class="mt-4 pa-4" outlined>

        <h2 class="text-h5 mb-4">Особенности родословной</h2>

        <v-expansion-panels>
          <v-expansion-panel v-for="feature in species.speciesFeatures" :key="feature.key">
            <v-expansion-panel-header>
              {{ feature.name }}
            </v-expansion-panel-header>

            <v-expansion-panel-content>

              <div v-if="feature.description" v-html="feature.description"></div>
              <div v-else>{{ feature.snippet }}</div>

              <div v-if="feature.action" v-html="feature.action.description"></div>

            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

      </v-card>

      <!-- 🧬 HERITAGE -->
      <v-card class="mt-4 pa-4" outlined>
        <h2 class="text-h5 mb-3">Наследие</h2>

        <v-select v-model="selectedHeritage" :items="heritage" item-value="key" item-text="nameAncestry" outlined dense
          return-object @input="selectHeritageForChar" />

        <div v-if="selectedHeritage" class="mt-3">

          <div v-html="selectedHeritage.previewText"></div>
          <div v-html="selectedHeritage.description"></div>

          <v-select v-if="modification(selectedHeritage).length" v-model="selectedHeritage.selected"
            :items="modification(selectedHeritage)" item-text="name" item-value="key" outlined dense
            @input="changeSelectedOption(selectedHeritage)" class="mt-3" />

        </div>

      </v-card>

    </v-col>
  </v-row>
</template>

<script>
import SpeciesPreview from "~/components/forge/SpeciesPreview.vue";
import SluggerMixin from "~/mixins/SluggerMixin";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";
import traitView from "~/components/TraitView";

export default {
  name: "Manage",
  components: {
    SpeciesPreview,
    traitView,
  },
  mixins: [SluggerMixin, StatRepositoryMixin],
  data() {
    return {
      loading: false,
      species: undefined,
      abilityList: undefined,
      chapterList: undefined,
      heritageList: undefined,
      selectedHeritage: undefined,
    };
  },

  computed: {
    characterSpeciesKey() {
      return this.$store.getters["characters/characterSpeciesKeyById"](
        this.characterId
      );
    },
    characterKeywords() {
      return this.$store.getters["characters/characterKeywordsRawById"](
        this.characterId
      );

    },

    heritage() {
      const speciesLabel = this.species?.nameAncestry.toUpperCase();

      if (speciesLabel)
        return this.heritageList.filter(
          (s) => s.isUniversal === true || s.type.toUpperCase() === speciesLabel
        );
      else return this.heritageList.filter((s) => s.isUniversal === true);

    },

    sources() {
      return ["playerCore", "playerCore2", ...this.settingHomebrews];
    },
    settingHomebrews() {
      return this.$store.getters["characters/characterSettingHomebrewsById"](
        this.characterId
      );
    },
    avatar() {
      if (this.species === undefined) return "";
      return `/img/avatars/species/${this.species.key}.png`;
    },
  },
  watch: {
    sources: {
      handler: async function (newVal) {
        if (newVal) {
          await this.getAbilityList(newVal);
          await this.getTraitList(newVal);
          // await this.getChapterList(newVal);
          await this.getHeritageList(newVal);

        }
        if (
          this.characterSpeciesKey &&
          this.characterSpeciesKey !== "unknown"
        ) {
          this.getSpecies(this.characterSpeciesKey);
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
    // --------------------------------------
    // АПИ запросы
    // --------------------------------------

    async getHeritageList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get("/api/heritage/", config);
      const speciesLabel = this.characterSpeciesKey;


      if (this.abilityList !== undefined) {
        data.forEach((species) => {
          const lowercaseKeywords = species.ancestryAbility?.map((s) =>
            s.toUpperCase()
          );

          const enc = this.$store.getters["characters/characterEnhancementsById"](
            this.characterId
          );

          if (species.modification) {
            if (species.modification.find(t => t.type === "select")) {
              species.options = this.skillRepository;
              species.selected = enc.find((s) => s.key === species.key)
                ? enc.find((s) => s.key === species.key).selected
                : "";
            }
          }

          if (lowercaseKeywords) {
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
          }

        });

      }


      this.heritageList = data;


      const key = this.$store.getters["characters/characterHeritageKeyById"](
        this.characterId
      );
      this.selectedHeritage = key ? data.find(s => s.key === key) : "";
    },
    async getAbilityList(sources) {
      this.loading = true;
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
      this.loading = false;
    },
    async getTraitList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get("/api/traits/", config.source);
      data.forEach((t) => (t.key = t.key.toLowerCase()));
      this.traitList = data;
    },
    async getSpecies(key) {
      this.loading = true;
      let finalData = {};

      if (key.startsWith("custom-")) {
        const speciesDetails = this.$store.getters["species/getSpecies"](key);
        finalData = speciesDetails;
      } else {
        const { data } = await this.$axios.get(`/api/species/${key}`);
        finalData = data;
      }

      if (this.abilityList !== undefined) {
        const lowercaseKeywords = finalData.ancestryAbility.map((s) =>
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
          finalData.speciesFeatures = listAbilities;
        }
      }

      const chapter = this.characterSpeciesAstartesChapter;
      if (chapter) {
        finalData.chapter = chapter;
      }

      if (this.traitList !== undefined) {
        const lowercaseKeywords = finalData.trait.map((s) => s.toUpperCase());

        const List1 = this.traitList;
        const trait = List1.filter((talent) =>
          lowercaseKeywords.includes(talent.key.toString().toUpperCase())
        );

        if (trait.length > 0) {
          const listAbilities = [];
          finalData.trait.forEach((talent) => {
            const t = trait.find((k) => k.key === talent);

            if (t) {
              const ability1 = {
                name: t.key,
                description: t.desc,
              };

              listAbilities.push(ability1);
            }
          });
          finalData.traits = listAbilities;
        }
      }

      this.loading = false;
      this.species = finalData;
    },

    selectHeritageForChar(species) {

      // if (species.prerequisites)
      //   this.ensurePrerequisites(species.prerequisites);
      const heritageTrait = this.characterKeywords.find(s => s.source === "heritage")

      if (heritageTrait)
        this.removeTalentsByKeywords([heritageTrait.name]);

      // Очистить перед началом модификации и слова
      this.$store.commit("characters/clearCharacterEnhancementsBySource", {
        id: this.characterId,
        source: "heritage",
      });

      this.$store.commit("characters/clearCharacterKeywordsBySource", {
        id: this.characterId,
        source: "heritage",
      });

      this.$store.commit("characters/clearCharactermodificatorsBonusbySource", {
        id: this.characterId,
        source: "heritage",
      });

      // Бонус


      const vision = this.$store.getters["characters/characterVisionById"](
        this.characterId
      );

      // Установить модификации
      let modifications = [];
      species.speciesFeatures
        .filter((t) => t.modification !== undefined)
        .forEach((t) => {

          //Сменить Сумеречное зрение на темное, если оно уже есть у персонажа и такое позволяет особенность

          if (t.key === "low-light vision up" && vision === "Сумеречное")
            t.modification.find(t => t.group === "sense").key = "darkvision"


        });

      if (species.modification)
        species.modification.forEach((t) => {

          modifications.push(t)

        });



      const Bonus = []
      modifications.forEach(item => {
        if (item.type === 'Bonus') {

        }
        Bonus.push({
          value: item.bonus,
          type: item.bonusType,
          source: "heritage",
          // talentId: item.talentId,
          selector: item.key,
          description: item.snippet
        })


      })


      this.$store.commit("characters/setCharactermodificatorsBonus", {
        id: this.characterId,
        Bonus: Bonus,
      });

      // Установить наследие
      this.$store.commit("characters/setCharacterHeritage", {
        id: this.characterId,
        heritage: { key: species.key, label: species.nameAncestry },
      });

      // Установить модификации
      this.$store.commit("characters/setCharacterModifications", {
        id: this.characterId,
        content: { modifications: modifications, source: "heritage" },
      });

      const level = this.characterLevel();
      this.$store.commit('characters/clearModification', { id: this.characterId, level });
      this.$store.commit('characters/setModification', { id: this.characterId, level });


      // Добавить трейты и ключевые слова
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

    },
    removeTalentsByKeywords(keywords = []) {
      const id = this.characterId;
      const level = this.characterLevel();

      const sheet = this.$store.getters[
        "characters/characterSkillSheetById"
      ](this.characterId);

      const talents = this.$store.getters[
        "characters/characterTalentsById"
      ](this.characterId);

      if (!keywords.length || !talents?.length) return;

      const keywordSet = new Set(
        keywords.map(k => k.toString().toLowerCase())
      );

      const targets = talents.filter(talent => {
        if (!talent?.traits) return false;

        return talent.traits.some(trait =>
          keywordSet.has(trait.toString().toLowerCase())
        );
      });

      targets.forEach(talent => {
        const level1 = talent.level;

        if (talent.system?.rules?.length > 0) {
          talent.system.rules.forEach(item => {

            // ===== SKILL =====
            if (item.skill) {
              if (
                sheet.find(
                  i =>
                    i.key === item.skill &&
                    i.level === level1 &&
                    i.type === "feat"
                )
              ) {
                this.$store.commit("characters/removeSkillSheet", {
                  id,
                  key: item.skill,
                  level: level1,
                  type: "feat",
                  optional: false,
                });

                if (level1 === 1) {
                  this.$store.commit(
                    "characters/setCharacterSkillPointClassUp",
                    {
                      id,
                      write: false,
                      payload: { key: 1, value: -1 },
                    }
                  );
                }
              }
            }

            // ===== FEAT =====
            if (item.feat) {
              const loreKey =
                this.textToCamel(talent.key) +
                "-" +
                this.textToCamel(item.feat);

              [1, 3, 7, 15].forEach(lvl => {
                this.$store.commit("characters/removeSkillSheet", {
                  id,
                  key: loreKey,
                  level: lvl,
                  type: "feat",
                  optional: false,
                });
              });
            }
          });
        }

        // ===== CORE REMOVAL =====
        this.$store.commit("characters/clearModification", {
          id,
          level,
        });

        this.$store.commit("characters/removeModification", {
          id,
          talentId: talent.id,
        });

        this.$store.commit("characters/removeCharacterTalent", {
          id,
          talentId: talent.id,
        });

        this.$store.commit("characters/setModification", {
          id,
          level,
        });
      });
    },
    changeSelectedOption(feature, inx) {
      const level = this.characterLevel;

      const mod = {
        key: feature.key,
        type: feature.type,
        selected: feature.selected,
        value: feature.value,
        level: feature.level,
        source: "heritage",
      };



      this.$store.commit("characters/removeSkillSheetbyType", {
        id: this.characterId,
        key: mod,
        level: feature.level,
        type: "heritage",
        optional: true,
      });

      this.$store.commit("characters/clearCharacterClassModFeature", {
        id: this.characterId,
        content: mod,
      });

      this.$store.commit("characters/addCharacterClassModFeature", {
        id: this.characterId,
        content: mod,
      });

      this.$store.commit("characters/addSkillSheet", {
        id: this.characterId,
        key: feature.selected,
        level: 1,
        type: "heritage",
        optional: true,
        combinded: true,
      });

      this.$store.commit("characters/addSkillSheet", {
        id: this.characterId,
        key: feature.selected,
        level: 5,
        type: "heritage",
        optional: true,
      });

    },
    modification(selectedHeritage) {
      if (!selectedHeritage)
        return []

      const skill = this.skillRepository;


      if (selectedHeritage.modification)
        if (selectedHeritage.modification.find(t => t.type === "select" && t.key === "skill"))
          return skill;

      return []

    },

    size(size) {
      if (!size) return "";
      const s = this.sizeRepository.find((s) => s.key === size);
      return s ? s.name : "";
    },

    doChangeSpeciesMode() {
      this.$router.push({
        name: "forge-characters-id-builder-species-choose",
        params: { id: this.characterId },
      });
    },

    enableHomebrew(sourceKey) {
      this.$store.commit("characters/enableSettingHomebrews", {
        id: this.characterId,
        content: sourceKey,
      });
    },
    characterLevel() {
      return this.$store.getters['characters/characterLevelById'](this.characterId);
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
