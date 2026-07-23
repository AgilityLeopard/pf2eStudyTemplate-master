<template>
  <v-row justify="center">
    <v-col :cols="12">
      <h1 class="text-h5 mb-4">Выберите предысторию</h1>

      <v-dialog v-model="ascensionDialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="600px" scrollable>
        <ascension-preview v-if="selectedAscension" :character-id="characterId" :item="selectedAscension" choose-mode
          @select="selectAscensionForChar" @cancel="ascensionDialog = false" />
      </v-dialog>

      <!-- loader -->
      <v-progress-circular v-if="!ascensionList" indeterminate color="success" size="96" width="8" />

      <v-card v-else class="ascension-list-card" outlined>

        <!-- SEARCH + FILTERS -->
        <v-card-title class="pb-2">
          <v-text-field v-model="searchQuery" dense filled clearable prepend-inner-icon="mdi-magnify"
            label="Поиск предыстории" />
        </v-card-title>

        <v-card-text class="pt-0 filter-area">
          <v-row dense>
            <v-col cols="12" md="4">
              <v-select v-model="selectedRarityFilters" :items="rarityFilters" item-text="name" item-value="name"
                multiple dense outlined hide-details label="Редкость" />
            </v-col>

            <v-col cols="12" md="4">
              <v-select v-model="selectedSourceFilters" :items="sourceFilters" item-text="name" item-value="name"
                multiple dense outlined hide-details label="Источник" />
            </v-col>

            <v-col cols="12" md="4">
              <v-select v-model="selectedAbilityFilters" :items="abilityFilters" item-text="name" item-value="key"
                multiple dense outlined hide-details label="Характеристика" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <!-- LIST -->
        <v-list class="ascension-list" two-line dense>

          <v-list-item v-for="item in filteredTalents" :key="item.key" class="ascension-item"
            @click.stop="updatePreview(item)">

            <!-- avatar -->
            <v-list-item-avatar size="56">
              <img :src="getAvatar(item.key)" />
            </v-list-item-avatar>

            <!-- content -->
            <v-list-item-content>
              <v-list-item-title class="ascension-title">
                <span class="font-weight-medium">
                  {{ item.nameBackground }}
                </span>

                <div class="ascension-tags">

                  <v-chip v-if="item.source" x-small outlined color="info">
                    {{ item.source.book }}
                  </v-chip>

                  <v-chip v-if="item.rarity" x-small outlined color="grey">
                    {{ item.rarity }}
                  </v-chip>

                </div>
              </v-list-item-title>

              <v-list-item-subtitle class="ascension-hint">
                {{ item.hint }}
              </v-list-item-subtitle>

              <!-- quick info row -->
              <!-- <div class="ascension-meta">
                <span v-if="item.boost1">
                  + {{ characterLabelAttribute(item.boost1) }}
                </span>

                <span v-if="item.skill">
                  • {{ characterLabelSkillTrainedChoice(item.skill) }}
                </span>

                <span v-if="item.lore">
                  • {{ item.lore }}
                </span>
              </div> -->
            </v-list-item-content>

          </v-list-item>

        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>


<script>
import AscensionPreview from "~/components/forge/AscensionPreview.vue";
import SluggerMixin from "~/mixins/SluggerMixin";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  name: "Choose",
  components: {
    AscensionPreview,
  },
  mixins: [SluggerMixin, StatRepositoryMixin],
  data() {
    return {
      ascensionList: undefined,
      selectedAscension: undefined, // for he preview dialog box
      ascensionDialog: false,
      searchQuery: "",
      selectedSourceFilters: [],
      selectedtraitsFilters: [],
      selectedRarityFilters: [],
      selectedAbilityFilters: [],
    };
  },
  computed: {
    sourceFilters() {
      if (this.ascensionList === undefined) {
        return [];
      }
      let filteredTalents = this.ascensionList;

      let reduced = [];
      filteredTalents.forEach((item) => {
        if (item.source.book) {
          reduced.push(item.source.book);
        }
      });

      reduced = reduced.filter((item) => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((tag) => ({ name: tag }));
    },
    abilityFilters() {
      if (this.ascensionList === undefined) {
        return [];
      }
      let filteredTalents = this.ascensionList;

      let reduced = [];

      this.attributeRepository.forEach((item) => {
        reduced.push({
          name: item.name,
          key: item.key,
        });
      });

      // reduced = reduced.filter((item) => item.trim().length > 0);
      const distinct = [...new Set(reduced)];

      return reduced;
    },
    rarityFilters() {
      if (this.ascensionList === undefined) {
        return [];
      }

      let reduced = ["обычный", "необычный", "редкий", "уникальный"];

      reduced = reduced.filter((item) => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((tag) => ({ name: tag }));
    },
    filteredTalents() {
      if (this.ascensionList === undefined) {
        return [];
      }

      let filteredTalents = this.ascensionList;

      if (this.searchQuery) {
        const lowerCaseSearchQuery = this.searchQuery.toLowerCase();
        filteredTalents = filteredTalents.filter((a) => {
          const lowerCaseArchetype = a.nameBackground.toLowerCase();
          return lowerCaseArchetype.startsWith(lowerCaseSearchQuery);
        });
      }

      if (this.selectedSourceFilters.length > 0) {
        filteredTalents = filteredTalents.filter((item) =>
          this.selectedSourceFilters.includes(item.source.book)
        );
      }

      if (this.selectedAbilityFilters.length > 0) {
        filteredTalents = filteredTalents.filter((item) =>
          this.selectedAbilityFilters.some((m) => item.boost1.includes(m))
        );
      }

      if (this.selectedRarityFilters.length > 0) {
        filteredTalents = filteredTalents
          .filter((item) =>
            this.selectedRarityFilters.some(
              (m) =>
                item.rarity.includes(m) ||
                (m === "обычный" && !item.rarity.includes("редкий"))
            )
          )
          .filter((item) =>
            this.selectedRarityFilters.some(
              (m) =>
                item.rarity.includes(m) ||
                (m === "обычный" && !item.rarity.includes("необычный"))
            )
          );
      }

      return filteredTalents;
    },
    sources() {
      return ["Pathfinder Player Core", "Pathfinder Player Core 2", ...this.settingHomebrews];
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
    characterSkillPoints() {
      return this.$store.getters["characters/characterSkillPointsById"](
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
          this.getAscensionList(newVal);
          this.getTalents(newVal);
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
    async getAscensionList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get(
        "/api/ascension-packages/",
        config
      );
      this.ascensionList = data;

      // if (sources.includes("custom")) {
      //   const customSpecies = this.$store.getters["species/speciesSets"];
      //   this.speciesList.push(...customSpecies);
      // }
    },
    async getTalents(sources) {
      this.loading = true;
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      // const config = {
      //   params: { source: this.sources.join(",") },
      // };
      {
        const { data } = await this.$axios.get("/api/talents/", config.params);
        this.talentList = data.data.map((talent) => {
          // const prerequisitesHtml = this.requirementsToText(talent).join(', ');
          return {
            ...talent,
          };
        });

        // this.talentList.filter(talent =>{

        //   const lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
        //   return lowercaseKeywords.includes(talent.tags.toString().toUpperCase());

        //    }
        //   )
      }

      this.loading = false;
    },
    getAvatar(key) {
      return `/img/avatars/species/playercore-dwarf.png`;
    },
    async updatePreview(item) {
      const slug = this.camelToKebab(item.key);
      // if (item.key.startsWith("custom-")) {
      //   const speciesDetails = this.$store.getters["species/getSpecies"](
      //     item.key
      //   );
      //   this.selectedSpecies = speciesDetails;
      // } else {
      const ascensionDetails = await this.$axios.get(
        `/api/ascension-packages/${slug}`
      );
      this.selectedAscension = ascensionDetails.data;
      // }
      this.ascensionDialog = true;
    },
    selectAscensionForChar(ascensionPackage) {
      const id = this.characterId;

      const payload = {
        id,
        key: ascensionPackage.key,
        value: ascensionPackage.nameBackground,

        // cost,
        sourceTier: ascensionPackage.sourceTier,
        // targetTier,
      };
      this.$store.commit("characters/addCharacterAscensionPackage", payload);

      const talent = this.talentList.find(
        (s) => s.key === ascensionPackage.feat[0]
      );

      if (talent) {
        const match = talent.name.match(/(<.*>)/);
        const talentUniqueId = Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 8);

        const payloadSkill = {
          id: talentUniqueId,
          name: talent.name,
          key: talent.key,
          cost: talent.cost,
          place: "background",
          level: 0,
          // placeholder:
          //   match !== null && match !== undefined ? match[1] : undefined,
          selected: undefined,
          choice: talent.optionsKey,
          source: `talent.${talentUniqueId}`,
        };

        this.$store.commit('characters/removeCharacterTalentbySource', { id: this.characterId, source: "background" });
        // this.$store.commit('characters/removeCharacterTalent', { id, talentId: talent.id });

        this.$store.commit("characters/addCharacterTalent", {
          id: this.characterId,
          talent: payloadSkill,
        });
      }

      this.$store.commit("characters/characterProgress", {
        id: this.characterId,
        level: 1,
        value: 1,
      });

      //добавляем лоры
      // this.$store.commit('characters/removeCharacterCustomSkill', { id, key });

      this.$store.commit("characters/removeBackgroundCustomSkill", {
        id,
        payload,
      });

      this.$store.commit("characters/setCharacterSkillPointsBackground", {
        id: this.characterId,
        payload: { key: 1, value: 0 },
      });

      this.$store.commit("characters/removeSkillSheetbyType", {
        id: this.characterId,
        key: ascensionPackage.skill,
        level: 1,
        type: "background",
        optional: true,
      });

      const sheet = this.$store.getters["characters/characterSkillSheetById"](
        this.characterId
      );

      if (
        sheet.find((i) => i.key === ascensionPackage.skill && i.level === 1)
      ) {
        // this.$store.commit("characters/setCharacterSkillPointsBackground", {
        //   id: this.characterId,
        //   payload: { key: 1, value: 1 },
        // });

        this.$store.commit("characters/removeSkillSheet", {
          id: this.characterId,
          key: ascensionPackage.skill,
          level: 1,
          type: "skill",
          optional: false,
        });
      }

      this.$store.commit("characters/addSkillSheet", {
        id: this.characterId,
        key: ascensionPackage.skill,
        level: 1,
        type: "background",
        optional: true,
      });

      this.$store.commit("characters/setCharacterBackgroundFreeBoost", {
        id: this.characterId,
        payload: { key: "", value: 1 },
      });
      this.$store.commit("characters/setCharacterBackgroundFreeBoost2", {
        id: this.characterId,
        payload: { key: "", value: 1 },
      });

      const sheet1 = this.$store.getters["characters/characterSkillSheetById"](
        this.characterId
      );

      if (
        ascensionPackage.lore
        // &&
        // !sheet1.find((s) => s.key === this.textToCamel(ascensionPackage.lore))
      ) {
        const skill = {
          key: this.textToCamel(ascensionPackage.lore),
          name: ascensionPackage.lore,
          attribute: "intellect",
          type: "background",
          background: true,
          level: 1,
          description: "",
          optional: true,
        };
        this.$store.commit("characters/addCharacterCustomSkill", { id, skill });
        //this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: skill, value: this.characterSkillPoints - 1} });
      }

      const back = this.$store.getters["characters/characterBackSkillById"](
        this.characterId
      );

      //Убрать скилл
      const class1 = this.$store.getters[
        "characters/characterTrainedSkillClassById"
      ](this.characterId);

      if (ascensionPackage.skill) {
        // Если не классовый скилл
        if (
          this.characterSkills[back] === "T" &&
          class1.find((item) => item === back) === undefined
        )
          this.$store.commit("characters/setCharacterSkill", {
            id: this.characterId,
            payload: { key: back, value: "U" },
          });

        //Добавить скилл
        if (this.characterSkills[ascensionPackage.skill] === "U")
          this.$store.commit("characters/setCharacterSkill", {
            id: this.characterId,
            payload: { key: ascensionPackage.skill, value: "T" },
          });
        else {
          if (back != ascensionPackage.skill) {
            const point = this.$store.getters[
              "characters/characterSkillPointsById"
            ](this.characterId);
            this.$store.commit("characters/setCharacterSkillPoints", {
              id: this.characterId,
              payload: { key: ascensionPackage.skill, value: point + 1 },
            });
          }
        }
      }
      this.$store.commit("characters/setCharacterBackSkill", {
        id: this.characterId,
        payload: { value: ascensionPackage.skill },
      });

      this.ascensionDialog = false;
      this.$router.push({
        name: "forge-characters-id-builder-ascension-manage",
        params: { id: this.characterId },
      });
    },
    addCustomSkill(skill) {
      const id = this.characterId;
      this.$store.commit("characters/addCharacterCustomSkill", { id, skill });
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

<style scoped>
.ascension-list-card {
  border-radius: 16px;
  overflow: hidden;
}

.ascension-title {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ascension-hint {
  white-space: normal;
  overflow-wrap: anywhere;
  line-height: 1.4;
}

.ascension-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* list item */
.ascension-item {
  margin: 6px 8px;
  border-radius: 12px;
  transition: .15s ease;
}



.ascension-item:hover {
  background: rgba(var(--v-theme-primary), 0.08);
}

/* subtitle */
.ascension-hint {
  opacity: 0.7;
  font-size: 13px;
}

/* meta line under subtitle */
.ascension-meta {
  margin-top: 4px;
  font-size: 12px;
  opacity: 0.65;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* chips spacing fix */
.v-chip {
  height: 18px;
  font-size: 10px;
}

/* nicer avatar */
.v-list-item-avatar img {
  border-radius: 12px;
}

.filter-area {
  padding-bottom: 8px;
}
</style>
