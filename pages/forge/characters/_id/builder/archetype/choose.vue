<template>
  <v-row justify="center">
    <v-dialog
      v-model="previewDialog"
      width="600px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <archetype-preview
        v-if="previewItem"
        :character-id="characterId"
        :item="previewItem"
        choose-mode
        @select="selectArchetypeForChar"
        @cancel="previewDialog = false"
      />
    </v-dialog>

    <v-col>
      <h1 class="headline">Выберите класс</h1>
    </v-col>

    <v-col :cols="12">
      <v-text-field
        v-model="searchQuery"
        solo
        placeholder="Поиск..."
        prepend-inner-icon="search"
        clearable
      />
    </v-col>

    <v-col :cols="12">
      <v-card>
        <v-list v-if="archetypeFaction">
          <v-list-item
            v-for="item in archetypeFaction"
            :key="item.key"
            two-line
            :disabled="item.tier > characterSettingTier"
            @click.stop="updatePreview(item)"
          >
            <v-list-item-avatar tile>
              <img :src="getAvatar(item.key)" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.name }}
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
            </v-list-item-content>

            <v-list-item-action class="hidden-sm-and-up">
              <v-btn dense icon>
                <v-icon color="primary"> arrow_forward_ios </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from "vuex";
import ArchetypePreview from "~/components/forge/ArchetypePreview";
import KeywordRepositoryMixin from "~/mixins/KeywordRepositoryMixin";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  name: "ArchetypeChoose",
  components: { ArchetypePreview },
  mixins: [KeywordRepositoryMixin, StatRepositoryMixin],
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      itemList: undefined,
      selectedItem: undefined, // for he preview dialog box
      previewDialog: false,
      previewItem: undefined,
      searchQuery: "",
      characterSpecies: undefined,
      characterFactions: undefined,
      abilityList: undefined,
    };
  },
  computed: {
    sources() {
      return [
        // "playerCore",
        ...this.settingOfficial,
        // 'tnh',
        ...this.settingHomebrews,
      ];
    },
    settingHomebrews() {
      return this.$store.getters["characters/characterSettingHomebrewsById"](
        this.characterId
      );
    },
    settingOfficial() {
      return this.$store.getters[
        "characters/characterSettingOfficialOptionsById"
      ](this.characterId);
    },
    characterSettingTier() {
      return this.$store.getters["characters/characterSettingTierById"](
        this.characterId
      );
    },
    characterSpeciesLabel() {
      return this.$store.getters["characters/characterSpeciesLabelById"](
        this.characterId
      );
    },
    characterSpeciesKey() {
      return this.$store.getters["characters/characterSpeciesKeyById"](
        this.characterId
      );
    },
    allArchetypeFactions() {
      if (this.itemList !== undefined) {
        let archetypes = this.itemList;

        if (this.characterSpecies) {
          archetypes = archetypes.filter((a) => {
            if (
              a.species.some((s) => s.key.includes(this.characterSpecies.key))
            )
              return true;
            if (
              a.species.some((s) =>
                s.key.includes(this.characterSpecies.variant)
              )
            )
              return true;
            return false;
          });

          if (this.characterSpecies.archetypeRestrictionsMaxTier) {
            archetypes = archetypes.filter(
              (a) =>
                a.tier <= this.characterSpecies.archetypeRestrictionsMaxTier
            );
          }
        }

        return ["Unaligned", ...new Set(archetypes)];
      }

      return [];
    },
    archetypeFaction() {
      if (this.itemList !== undefined) {
        let archetypes = this.itemList;

        // if (this.characterSpecies) {
        //   archetypes = archetypes.filter((a) => {
        //     if ( a.species.some((s) => s.key.includes(this.characterSpecies.key) ) ) return true;
        //     if ( a.species.some((s) => s.key.includes(this.characterSpecies.variant) ) ) return true;
        //     return false;
        //   });

        //   if (this.characterSpecies.archetypeRestrictionsMaxTier) {
        //     archetypes = archetypes.filter((a) => a.tier <= this.characterSpecies.archetypeRestrictionsMaxTier);
        //   }
        // }

        // if (this.characterSettingTier !== undefined) {
        //   archetypes = archetypes.filter((a) => a.tier <= this.characterSettingTier);
        // }
        if (this.searchQuery) {
          const lowerCaseSearchQuery = this.searchQuery.toLowerCase();
          archetypes = archetypes.filter((a) => {
            const lowerCaseArchetype = a.name.toLowerCase();
            return lowerCaseArchetype.startsWith(lowerCaseSearchQuery);
          });
        }

        return [...new Set(archetypes)];
      }

      return [];
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
    characterSpeciesKey: {
      handler(newKey) {
        if (newKey) {
          this.loadSpecies(newKey);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getAbilityList(newVal);
          this.getArchetypeList(newVal);
          // this.loadFactions(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    ...mapMutations("characters", [
      "setCharacterArchetype",
      "setCharacterFaction",
    ]),
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
    async getArchetypeList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const level = this.$store.getters["characters/characterLevelById"](
        this.characterId
      );

      //список архетипов
      const { data } = await this.$axios.get("/api/archetypes/", config);

      if (this.abilityList !== undefined) {
        data.forEach((species) => {
          const lowercaseKeywords = species.archetypeFeatures.map((s) =>
            s.toUpperCase()
          );

          //Список особенностей
          const List = this.abilityList;
          let ability = List.filter((talent) =>
            lowercaseKeywords.includes(talent.key.toString().toUpperCase())
          );

          //Сюда кладем то, что дается больше одного раза
          const abilityInArray = [];

          ability.forEach((ab) => {
            if (Array.isArray(ab.level)) {
              abilityInArray.push(ab);
            }
          });

          //Выкидываем из списка особенности, уровень которых перечислен в массиве
          ability = ability.filter((ab) => {
            !Array.isArray(ab.level);
          });

          //Смотрим все особенности, и делаем их по тем уровням, что в массиве
          abilityInArray.forEach((ab) => {
            const tal = ab;
            ab.level.forEach((talent) => {
              const ability1 = {
                name: tal.name,
                key: tal.key,
                description: tal.snippet,
                modification: tal.modification,
                level: talent,
              };

              //Кладем в общий "пул"
              if (talent <= level) ability.push(ability1);
            });
          });

          if (ability.length > 0) {
            //Если нашли все особенности, то кладем их в каждый класс
            species.archetypeFeatures = ability;
          }
          species.archetypeFeatures = ability
            .filter((t) => t.level <= level)
            .sort((a, b) => a.level - b.level);
        });
      }
      // only those that have a HINT indicating they are not only stubs

      this.itemList = data.filter((i) => i.hint);
    },
    async loadSpecies(key) {
      if (key) {
        const { data } = await this.$axios.get(`/api/species/${key}`);
        this.characterSpecies = data;
      }
    },
    // async loadFactions(sources) {
    //   const config = {
    //     params: {
    //       source: sources.join(","),
    //     },
    //   };
    //   const { data } = await this.$axios.get(`/api/factions/`, config);
    //   this.characterFactions = data;
    // },
    getAvatar(key) {
      if (key === undefined) return "/img/avatar_placeholder.png";
      return `/img/avatars/archetype/${key.toLowerCase()}.png`;
    },
    //   let archetypes = this.itemList;

    //   if (archetypes === undefined) return [];
    //   /* filter by archetype group */
    //   archetypes = archetypes.filter((a) => a.faction === groupName);

    //   if (this.characterSpecies) {
    //     archetypes = archetypes.filter((a) => {
    //       if (a.species.some((s) => s.key.includes(this.characterSpecies.key)))
    //         return true;
    //       if (
    //         a.species.some((s) => s.key.includes(this.characterSpecies.variant))
    //       )
    //         return true;
    //       return false;
    //     });

    //     if (this.characterSpecies.archetypeRestrictionsMaxTier) {
    //       archetypes = archetypes.filter(
    //         (a) => a.tier <= this.characterSpecies.archetypeRestrictionsMaxTier
    //       );
    //     }
    //   }

    //   if (this.characterSettingTier !== undefined) {
    //     archetypes = archetypes.filter(
    //       (a) => a.tier <= this.characterSettingTier
    //     );
    //   }

    //   /* filter by search query */
    //   if (this.searchQuery) {
    //     const lowerCaseSearchQuery = this.searchQuery.toLowerCase();
    //     archetypes = archetypes.filter((a) => {
    //       const lowerCaseArchetype = a.name.toLowerCase();
    //       return lowerCaseArchetype.startsWith(lowerCaseSearchQuery);
    //     });
    //   }

    //   return archetypes.sort((a, b) => {
    //     if (a.tier > b.tier) {
    //       return 1;
    //     }
    //     if (b.tier > a.tier) {
    //       return -1;
    //     }
    //     return 0;
    //   });
    // },
    updatePreview(item) {
      this.previewItem = item;
      this.previewDialog = true;
    },
    selectArchetypeForChar(item) {
      const id = this.characterId;

      //Устанавиливаем класс персонажа
      this.setCharacterArchetype({
        id,
        archetype: {
          key: item.key,
          value: item.name,
          cost: item.costs.archetype,
          tier: item.tier,
        },
      });

      this.ensurePrerequisites(item);

      this.$store.commit("characters/clearCharacterEnhancementsBySource", {
        id: this.characterId,
        source: "archetype",
      });

      //Смотрим правила всех модификаций
      const mods = [];
      const Saving = [];
      const Attack = [];
      const Defence = [];
      const Class = [
        {
          key: "class",
          upgrade: item.skillClass,
          type: "DC Class",
          mode: "Upgrade",
          level: 1,
        },
      ];
      const Perception = [
        {
          key: "Perception",
          upgrade: item.Perception,
          mode: "Upgrade",
          type: "Perception",
          level: 1,
        },
      ];
      const level = this.$store.getters["characters/characterLevelById"](
        this.characterId
      );

      //Правила улучшения, наподобие повышения Спасбросков или навыков от класса
      if (item.modification) {
        mods.push(...item.modification);
      }
      item.archetypeFeatures
        .filter((feature) => feature.modifications)
        .forEach((feature) => {
          feature.modifications.forEach((mod) => {
            mods.push(mod);
          });
        });

      //Добавление хитов, спасов и т.д. в Персонажа
      this.$store.commit("characters/setCharacterHitPoints", {
        id: this.characterId,
        payload: { value: item.hitpoints, type: "class" },
      });
      this.$store.commit("characters/setCharacterSaving", {
        id: this.characterId,
        payload: { key: 1, saving: item.saving },
      });
      this.$store.commit("characters/setCharacterSkillPointsClass", {
        id: this.characterId,
        payload: { key: 1, value: item.skillTrainedPoints },
      });
      item.attributeBoost.forEach((t) => {
        this.$store.commit("characters/setCharacterClassBoostForAll", {
          id: this.characterId,
          payload: { key: t.key, value: t.value },
        });
      });
      this.$store.commit("characters/resetCharacterStats", {
        id: this.characterId,
        optional: "class",
      });
      this.$store.commit("characters/setCharacterTrainedClassSkill", {
        id: this.characterId,
        payload: { key: 1, value: item.skillTrained },
      });
      this.$store.commit("characters/setCharacterPerception", {
        id: this.characterId,
        payload: { key: 1, Perception: item.Perception },
      });
      this.$store.commit("characters/setCharacterskillAttack", {
        id: this.characterId,
        payload: { key: 1, skillAttack: item.skillAttack },
      });
      this.$store.commit("characters/setCharacterskillDefence", {
        id: this.characterId,
        payload: { key: 1, skillDefence: item.skillDefence },
      });
      this.$store.commit("characters/setCharacterskillClass", {
        id: this.characterId,
        payload: { key: 1, skillClass: item.skillClass },
      });

      //Атаки и Защита
      this.WeaponRepository.forEach((w) => {
        const war = {
          key: w.key,
          upgrade: item.skillAttack[w.key],
          type: "Attack",
          mode: "Upgrade",
          level: 1,
        };
        Attack.push(war);
      });
      this.DefenceRepository.forEach((w) => {
        const war = {
          key: w.key,
          upgrade: item.skillDefence[w.key],
          type: "Defence",
          mode: "Upgrade",
          level: 1,
        };
        Defence.push(war);
      });
      this.SavingRepository.forEach((w) => {
        const war = {
          key: w.key,
          upgrade: item.saving[w.key],
          type: "Saving",
          mode: "Upgrade",
          level: 1,
        };
        Saving.push(war);
      });

      if (item.modification) {
        mods.push(...Perception);
        mods.push(...Class);
        mods.push(...Defence);
        mods.push(...Saving);
        mods.push(...Attack);
      }

      //Сохранить все модификации в персонажа. Источник обязателен, чтобы при смене класса можно удалить
      this.$store.commit("characters/setCharacterModifications", {
        id: this.characterId,
        content: { modifications: mods, source: "archetype" },
      });

      //Сначала зачищаем старые модификации и затем ставим новые
      this.$store.commit("characters/clearModification", {
        id: this.characterId,
        level,
      });
      this.$store.commit("characters/setModification", {
        id: this.characterId,
        level,
      });
      this.$store.commit("characters/clearCharacterTalentsBySource", {
        id: this.characterId,
        source: "archetype",
        cascade: true,
      });

      //Если есть Черты от класса, устанавиливаем их
      item.archetypeFeatures
        .filter((feature) => feature.modifications)
        .forEach((feature) => {
          feature.modifications
            .filter((m) => m.targetGroup === "talents")
            .forEach((t) => {
              const talent = {
                name: t.meta.name,
                key: t.targetValue,
                cost: 0,
                placeholder: undefined,
                selected: undefined,
                source: `archetype.${item.key}.${t.key}`,
              };
              this.$store.commit("characters/addCharacterTalent", {
                id,
                talent,
              });
            });
        });

      //Нужны ли теги персонажа, возможно для фильтра?
      this.$store.commit("characters/clearCharacterKeywordsBySource", {
        id: this.characterId,
        source: "archetype",
        cascade: true,
      });
      if (item.keywords) {
        const itemKeywords = item.keywords.split(",").map((i) => i.trim());
        itemKeywords.forEach((keyword) => {
          const payload = {
            name: keyword,
            source: "archetype",
            type: keyword.includes("[") ? "placeholder" : "keyword",
            replacement: undefined,
          };
          this.$store.commit("characters/addCharacterKeyword", {
            id: this.characterId,
            keyword: payload,
          });
        });
      }

      //Зачищаем все заклы и ставим новые, если класс - магический
      this.$store.commit("characters/clearCharacterPsychicPowersBySource", {
        id: this.characterId,
        source: "archetype",
      });
      const featuresWithPowers = item.archetypeFeatures.filter(
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
                source: `archetype.${powerSelections.selected.name}`,
              };
              this.$store.commit(
                "characters/addCharacterPsychicPower",
                payload
              );
            }
          });
        });
      }

      //Роутим на страницу выбранного класса
      this.previewDialog = false;
      this.$router.push({
        name: "forge-characters-id-builder-archetype-manage",
        params: { id: this.characterId },
      });
    },
    ensurePrerequisites(item) {
      const archetype = item;

      if (archetype && archetype.prerequisites.length > 0) {
        archetype.prerequisites.forEach((prerequisite) => {
          // { group: 'attributes', value: 'willpower', threshold: 3, }
          switch (prerequisite.group) {
            case "attributes":
              const attributeValue =
                this.characterAttributes[prerequisite.value];
              if (attributeValue < prerequisite.threshold) {
                this.$store.commit("characters/setCharacterAttribute", {
                  id: this.characterId,
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
                  id: this.characterId,
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
