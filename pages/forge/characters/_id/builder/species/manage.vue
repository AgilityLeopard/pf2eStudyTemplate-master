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

        <v-tabs centered grow color="red">
        <v-tab class="caption" key="tab-ancestry" :href="`#tab-ancestry`"
          ><h2 class="subtitle-2">Наследие</h2></v-tab
        >
        <v-tab class="caption" key="tab-heritage" :href="`#tab-heritage`"
          ><h2 class="subtitle-2">Родословная</h2></v-tab
        >
        <v-tab-item
          class="my-tab-item"
          key="tab-ancestry"
          :value="`tab-ancestry`"
        >
          <div class="pa-2">
      <div class="mt-2 body-2 text-lg-justify">
        <p><strong>Скорость:</strong> {{ species.speed }}</p>

        <p><strong>Хитов:</strong> {{ species.ancestryHitPoint }}</p>

         <span class="subtitle-1 mt-2">Повышение характеристик</span>
      <v-divider />
      
      <div v-for="boost in species.attributeBoost" class="text-lg-justify">
        <div v-if="boost.value > 0">
          <strong>{{ boost.name }}</strong>
        </div>
      </div>

      <div v-for="boost in species.abilityBoost" class="text-lg-justify">
        <div>
          <strong> Свободное повышение </strong>
        </div>
      </div>

      <p></p>
       <span
        v-if="species.attributeFlaw.find((t) => t.value < 0)"
        class="subtitle-1 mt-2"
        >Понижение характеристик</span
      >
      <v-divider v-if="species.attributeFlaw.find((t) => t.value < 0)" />

      <div v-for="flaw in species.attributeFlaw" class="text-lg-justify">
        <div v-if="flaw.value < 0">
          <strong>{{ flaw.name }}</strong>
        </div>
      </div>

         <p><v-divider /></p>

      <!-- <div v-for="boost in species.attributeBoost" class="text-lg-justify">
        <div v-if="boost.value > 0">
          <strong>{{ boost.name }}</strong>
        </div>
      </div>

      <div v-for="boost in species.abilityBoost" class="text-lg-justify">
        <div>
          <strong> Свободное повышение </strong>
        </div>
      </div>

      <p></p>

      <span
        v-if="species.attributeFlaw.find((t) => t.value < 0)"
        class="mt-2 grey--text"
        >Понижение характеристик</span
      >
      <v-divider v-if="species.attributeFlaw.find((t) => t.value < 0)" />

      <div v-for="flaw in species.attributeFlaw" class="text-lg-justify">
        <div v-if="flaw.value < 0">
          <strong>{{ flaw.name }}</strong>
        </div>
      </div> -->

        <p>
          <strong>Доступные языки:</strong> {{ species.language.join(", ") }} +
          {{ species.freeLanguage }} на выбор + количество языков, равнео вашему
          модификатору Интеллекта (если положительный)
        </p>

        <p><strong>Размер:</strong> {{ size(species.size) }}</p>
      </div>

      <div v-if="species.Description" class="body-2">
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
            <div
              v-if="description.anathema"
              v-html="description.anathema"
            ></div>
          </div>

          <p></p>

          <div v-if="description.name == 'avanturist'">
            <span class="subtitle-1 mt-2">Авантюристы</span>
            <p><v-divider /></p>
            <div v-if="description.about" v-html="description.about"></div>
          </div>

          <p></p>
          <div v-if="description.name === 'physical'">
            <span class="subtitle-1 mt-2">Физическое описание</span>
            <p><v-divider /></p>
            <div v-if="description.about" v-html="description.about"></div>
           
          </div>
 <p></p>
          <div v-if="description.name === 'society'">
            <span class="subtitle-1 mt-2">Общество</span>
            <p><v-divider /></p>
            <div v-if="description.about" v-html="description.about"></div>
          </div>
        </div>
<p></p>
          <div v-if="species.exampleName">
            <span class="subtitle-1 mt-2">Имена</span>
            <p><v-divider /></p>
            <span class="subtitle-2 mt-2"><strong>Примеры имен</strong></span>
            <div v-if="species.exampleName" v-html="species.exampleName"></div>
          </div>

      </div>

        <div class="mt-2 body-2 text-justify ">

          <h3 class="headline" v-if="species.speciesFeatures.length != 0" >Особенности наследия</h3>
          <div
        v-for="feature in species.speciesFeatures"
        class="text-lg-justify " v-bind:key="feature.key">
              <h3 class="main-holder split-header"><span class="left-header">{{ feature.name }}</span></h3>
                      <p class="main-holder">
          

          <div v-if="feature.description" v-html="feature.description"></div>
          <div  v-else>{{ feature.snippet }}</div>

               <div v-if="feature.action" v-html="feature.action.description"></div>
        </p>
      </div>
        </div>
        </div>
            </v-tab-item>

 <v-tab-item class="my-tab-item" key="tab-heritage" :value="`tab-heritage`">

                      <div v-if="heritageList" class="mt-2 pa-2">
              <h3 class="headline" >Выберите Родословную</h3>
          <v-select
            v-model="selectedHeritage"
            :items="heritageList"
            item-value="key"
            item-text="nameAncestry"
            label=""
            dense outlined 
            persistent-hint
             return-object
             @input="selectHeritageForChar"
         
       
          >
          </v-select>

          <div v-if="selectedHeritage" class="mt-2 body-2 text-lg-justify">
     
        <p> <div v-if="selectedHeritage.previewText" v-html="selectedHeritage.previewText"></div></p>
        <p> <div v-if="selectedHeritage.description" v-html="selectedHeritage.description"></div></p>
        
        <div v-if="selectedHeritage.speciesFeatures"></div>
          <div
        v-for="feature in selectedHeritage.speciesFeatures"
        class="text-lg-justify " v-bind:key="feature.key">
              <h3 class="main-holder split-header"><span class="left-header">{{ feature.name }}</span></h3>
                      <p class="main-holder">
          

          <div v-if="feature.description" v-html="feature.description"></div>
          <div  v-else>{{ feature.snippet }}</div>

               <div v-if="feature.action" v-html="feature.action.description"></div>
        </p>
      </div>
   
      <v-divider />
      </div>

          </div>
          </v-tab-item>
     </v-tabs>
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
      handler(newVal) {
        if (newVal) {
          this.getAbilityList(newVal);
          this.getTraitList(newVal);
          this.getChapterList(newVal);
          this.getHeritageList(newVal);
       
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    characterSpeciesKey: {
      handler(newVal) {
        if (newVal) {
          this.getSpecies(newVal);
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
    async getHeritageList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get("/api/heritage/", config);
      const speciesLabel = this.species?.nameAncestry.toUpperCase();

      
      if (this.abilityList !== undefined) {
        data.forEach((species) => {
          const lowercaseKeywords = species.ancestryAbility?.map((s) =>
            s.toUpperCase()
          );
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

      if (speciesLabel)
        this.heritageList = data.filter(
          (s) => s.isUniversal === true || s.type.toUpperCase() === speciesLabel
        );
      else this.heritageList = data.filter((s) => s.isUniversal === true);


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
    async getSpecies (key) {
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
      //         modifier.source.startsWith(`species.${feature.name}`)
      //       );
      //       if (enhancement) {
      //         feature.selected = enhancement.source.split(".").pop();
      //       }
      //     }
      //   });

      const chapter = this.characterSpeciesAstartesChapter;
      if (chapter) {
        finalData.chapter = chapter;
      }

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

      // this.speciesDialog = false;
      // this.$router.push({
      //   name: "forge-characters-id-builder-heritage-manage",
      //   params: { id: this.characterId },
      // });
    },
    size(size) {
      if (!size) return "";
      const s = this.sizeRepository.find((s) => s.key === size);
      return s ? s.name : "";
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
        name: "forge-characters-id-builder-species-choose",
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

.right-header{
    float:right;
}

.left-header{
    float:left;
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
</style>
