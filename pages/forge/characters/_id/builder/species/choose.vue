<template>
  <v-row justify="center" dense>

    <!-- 🔎 Dialog preview -->
    <v-dialog v-model="speciesDialog" width="800" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
      <species-preview v-if="selectedSpecies" :character-id="characterId" :species="selectedSpecies" choose-mode
        @select="selectSpeciesForChar" @cancel="speciesDialog = false" />
    </v-dialog>

    <!-- 🧭 Header -->
    <v-col cols="12">
      <h1 class="text-h4 font-weight-bold mb-4">
        Выберите наследие
      </h1>

      <v-text-field v-model="searchQuery" solo clearable prepend-inner-icon="mdi-magnify"
        placeholder="Поиск наследия..." />
    </v-col>

    <!-- ⏳ Loading -->
    <v-col cols="12" class="text-center" v-if="!speciesList">
      <v-progress-circular indeterminate color="success" size="96" width="8" />
    </v-col>

    <!-- 🧬 Cards -->
    <v-col cols="12" v-if="speciesList">
      <v-row dense>

        <v-col v-for="item in speciesList" :key="item.key" cols="12" sm="6" md="4" lg="3">

          <v-card class=" species-card  d-flex flex-column align-center pa-4 hoverable" elevation="3"
            @click="updatePreview(item)">

            <!-- Avatar -->
            <v-avatar size="96" tile class="mb-3">
              <img :src="getAvatar(item.key)" />
            </v-avatar>

            <!-- Name -->
            <div class="text-h6 font-weight-bold text-center mb-1">
              {{ item.nameAncestry }}
            </div>

            <!-- HP -->
            <v-chip small class="mb-2" color="primary" outlined>
              {{ item.ancestryHitPoint }} HP
            </v-chip>

            <!-- Source -->
            <v-chip v-if="item.source" x-small outlined color="info">
              {{ item.source.book.toUpperCase() }}
            </v-chip>

            <!-- Hint (optional) -->
            <div v-if="item.hint" class="text-caption grey--text text-center mt-2">
              {{ item.hint }}
            </div>

          </v-card>

        </v-col>

      </v-row>
    </v-col>

  </v-row>
</template>

<script>
import SpeciesPreview from "~/components/forge/SpeciesPreview.vue";
import SluggerMixin from "~/mixins/SluggerMixin";

export default {
  name: "Choose",
  components: {
    SpeciesPreview,
  },
  mixins: [SluggerMixin],
  data() {
    return {
      speciesList: undefined,
      heritageList: undefined,
      abilityList: undefined,
      traitList: undefined,
      selectedSpecies: undefined, // for he preview dialog box
      speciesDialog: false,
    };
  },
  computed: {
    sources() {
      return ["playerCore", "playerCore2", ...this.settingHomebrews];
    },
    settingHomebrews() {
      return this.$store.getters["characters/characterSettingHomebrewsById"](
        this.characterId
      );
    },
    characterKeywords() {
      return this.$store.getters["characters/characterKeywordsRawById"](
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
          //  this.getSpeciesList(newVal);
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
            species.traits = listAbilities;
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
      data.forEach((t) => (t.key = t.key.toLowerCase()));
      this.traitList = data;
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
    // --------------------------------------
    // Выбор родословной
    // --------------------------------------
    selectSpeciesForChar(species) {
      // if (species.prerequisites)
      //   this.ensurePrerequisites(species.prerequisites);

      const heritageTrait = this.characterKeywords
        .filter(s => s.source === "species")
        .map(s => s.name);

      this.removeTalentsByKeywords([heritageTrait]);

      // Очистка языков и модификации
      this.$store.commit("characters/clearCharacterEnhancementsBySource", {
        id: this.characterId,
        source: "species",
      });

      this.$store.commit("characters/removeCharacterLanguagebySource", {
        id: this.characterId,
        source: "species",
      });

      this.$store.commit("characters/clearCharacterKeywordsBySource", {
        id: this.characterId,
        source: "species",
      });

      this.$store.commit("characters/removeCharacterTalentbySource", {
        id: this.characterId,
        source: "ancestry",
      });

      this.$store.commit("characters/resetCharacterStats", {
        id: this.characterId,
        optional: "ancestry",
      });

      //Языки

      const lang = this.$store.getters["characters/characterLanguagesById"](
        this.characterId
      );
      species.language.forEach((s) => {
        if (s !== "Всеобщий") {
          if (lang.find((k) => k.name === s && k.source === "creation"))
            this.$store.commit("characters/removeCharacterLanguage", {
              id: this.characterId,
              name: s,
              source: "creation",
            });
          this.$store.commit("characters/addCharacterLanguage", {
            id: this.characterId,
            name: s,
            cost: 0,
            source: "species",
          });
        }
      });

      // Модификации от родословной

      let modifications = [];
      species.speciesFeatures
        .filter((t) => t.modifications !== undefined)
        .forEach((t) => {
          modifications = [...modifications, ...t.modifications];
        });


      //Скорость
      this.$store.commit("characters/setCharacterSpeed", {
        id: this.characterId,
        type: "land",
        speed: species.speed,
      });


      //Ключ родословной
      this.$store.commit("characters/setCharacterSpecies", {
        id: this.characterId,
        species: { key: species.key, label: species.nameAncestry },
      });

      //Установка модификаций от родословной
      this.$store.commit("characters/setCharacterModifications", {
        id: this.characterId,
        content: { modifications: modifications, source: "species" },
      });

      // Бусты и Недостатки от Родословной
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

      // Установка Хитов
      this.$store.commit("characters/setCharacterHitPoints", {
        id: this.characterId,
        payload: { value: species.ancestryHitPoint, type: "ancestry" },
      });

      // ключевые слова
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

      this.$store.commit("characters/characterProgress", {
        id: this.characterId,
        level: 1,
        value: 1,
      });




      this.speciesDialog = false;
      // Переход к Экрану управления
      this.$router.push({
        name: "forge-characters-id-builder-species-manage",
        params: { id: this.characterId },
      });
    },

    //Аватарка для Наследия
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
        const speciesDetails = await this.$axios.get(`/api/species/${slug}`);
        this.selectedSpecies = speciesDetails.data;
      }
      this.selectedSpecies = item;
      this.speciesDialog = true;
    },
    characterLevel() {
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
  },
};
</script>

<style scoped>
.species-card {
  border-radius: 18px;

  cursor: pointer;

  background: var(--ui-surface);
  border: 1px solid var(--ui-border);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  color: var(--ui-text);
  box-shadow: inset 0 0 4px var(--ui-shadow);
}

/* hover эффект */
.species-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  border-color: rgba(199, 93, 93, 0.5);
}



/* avatar чуть мягче */
.species-card .v-avatar {
  border-radius: 14px;
  overflow: hidden;
}
</style>
