<template>
  <v-row justify="center">
    <v-col :cols="12">
      <h1 class="headline">Выберите Предыстория</h1>
    </v-col>

    <v-dialog
      v-model="ascensionDialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <ascension-preview
        v-if="selectedAscension"
        :character-id="characterId"
        :item="selectedAscension"
        choose-mode
        @select="selectAscensionForChar"
        @cancel="ascensionDialog = false"
      />
    </v-dialog>

    <v-col cols="12">
      <v-progress-circular
        v-if="!ascensionList"
        indeterminate
        color="success"
        size="128"
        width="12"
      />

      <v-card v-if="ascensionList">
        <v-list>
          <v-list-item
            v-for="item in ascensionList"
            :key="item.key"
            @click.stop="updatePreview(item)"
          >
            <v-list-item-avatar tile>
              <img :src="getAvatar(item.key)" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.nameBackground }}
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
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AscensionPreview from "~/components/forge/AscensionPreview.vue";
import SluggerMixin from "~/mixins/SluggerMixin";

export default {
  name: "Choose",
  components: {
    AscensionPreview,
  },
  mixins: [SluggerMixin],
  data() {
    return {
      ascensionList: undefined,
      selectedAscension: undefined, // for he preview dialog box
      ascensionDialog: false,
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
        this.talentList = data.map((talent) => {
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
        (s) => s.key === ascensionPackage.feat && ascensionPackage.feat
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
          placeholder:
            match !== null && match !== undefined ? match[1] : undefined,
          selected: undefined,
          choice: talent.optionsKey,
          source: `talent.${talentUniqueId}`,
        };

        this.$store.commit("characters/addCharacterTalent", {
          id: this.characterId,
          talent: payloadSkill,
        });
      }

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

<style scoped></style>
