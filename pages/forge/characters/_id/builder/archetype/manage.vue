<template>
  <v-row justify="center">
    <!-- Loader -->
    <v-progress-circular v-if="!item" indeterminate color="success" size="96" width="8" />

    <v-col v-else cols="12" lg="10">

      <!-- 🧙 Header -->
      <v-card class="mb-4 pa-4" outlined>
        <v-row align="center">
          <v-col cols="12" md="8">
            <h2 class="text-h4 font-weight-bold">{{ item.name }}</h2>
            <div class="grey--text mb-2">{{ item.hint }}</div>

            <v-btn small outlined color="primary" @click="doChangeMode">
              <v-icon small left>mdi-cog</v-icon>
              Сменить класс
            </v-btn>
          </v-col>

          <v-col cols="12" md="4" class="text-right">
            <v-avatar size="96" tile>
              <img :src="avatar" />
            </v-avatar>
          </v-col>
        </v-row>
      </v-card>

      <!-- ⚙️ Основные характеристики -->
      <v-row class="d-flex" align="stretch">
        <v-col cols="12" md="6">
          <v-card outlined class="pa-4 d-flex flex-column fill-height" style="border-color: #c75d5d;">
            <h3 class="text-h6 mb-2">Ключевая характеристика</h3>

            <div v-if="item.keyAbility.length">
              <strong>{{ characterLabelAttribute(item.keyAbility) }}</strong>
            </div>
            <div v-else>
              <strong>{{ characterLabelAttributeBoost(item.attributeBoost) }}</strong>
            </div>

            <div class="mt-2 text--secondary">
              Усиление на 1 уровне
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card outlined class="pa-4 d-flex flex-column fill-height" style="border-color: #c75d5d;">
            <h3 class="text-h6 mb-2">Хиты</h3>
            <strong>{{ item.hitpoints }} + мод Телосложения</strong>

            <div class="mt-2 text--secondary">
              На каждом уровне
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- 🛡️ Профили -->
      <v-row class="d-flex" align="stretch">
        <v-col cols="12" md="4">
          <v-card outlined class="pa-4 d-flex flex-column fill-height" style="border-color: #c75d5d;">
            <h3 class="text-h6">Внимательность</h3>
            {{ characterlabel(item.Perception) }}
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card outlined class="pa-4 d-flex flex-column fill-height" style="border-color: #c75d5d;">
            <h3 class="text-h6">Спасброски</h3>

            <div v-for="item1 in SavingRepository" :key="item1.key">
              {{ characterlabel(item.saving[item1.key]) }} — {{ item1.name }}
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card outlined class="pa-4 d-flex flex-column fill-height" style="border-color: #c75d5d;">
            <h3 class="text-h6">КС класса</h3>
            {{ characterlabel(item.skillClass) }}
          </v-card>
        </v-col>
      </v-row>

      <!-- ⚔️ Атаки и Защиты -->
      <v-row class="d-flex" align="stretch">
        <v-col cols="12" md="6">
          <v-card outlined class="pa-4" style="border-color: #c75d5d;">
            <h3 class="text-h6">Атаки</h3>

            <div v-for="item1 in WeaponRepository" :key="item1.key">
              <div v-if="item.skillAttack[item1.key]">
                {{ characterlabel(item.skillAttack[item1.key]) }} — {{ item1.name }}
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card outlined class="pa-4" style="border-color: #c75d5d;">
            <h3 class="text-h6">Защиты</h3>

            <div v-for="item1 in DefenceRepository" :key="item1.key">
              <div v-if="item.skillDefence[item1.key]">
                {{ characterlabel(item.skillDefence[item1.key]) }} — {{ item1.name }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- 🎯 Навыки -->
      <v-card outlined class="pa-4 mt-4" style="border-color: #c75d5d;">
        <h3 class="text-h6 mb-2">Навыки</h3>

        <div v-if="item.skillTrainedChoice.length">
          <strong>На выбор:</strong>
          {{ characterLabelSkillTrainedChoice(item.skillTrainedChoice) }}
        </div>

        <div v-if="item.skillTrained.length">
          <strong>Обучен:</strong>
          {{ characterLabelSkillTrainedChoice(item.skillTrained) }}
        </div>

        <div class="mt-2">
          <strong>Дополнительно:</strong>
          {{ item.skillTrainedPoints }} + мод Интеллекта
        </div>
      </v-card>

      <!-- 🌟 Фичи -->
      <v-card class="mt-4 pa-4" outlined>
        <h2 class="text-h5 mb-4">Классовые особенности</h2>

        <v-expansion-panels>
          <v-expansion-panel v-for="feature in item.archetypeFeatures" :key="feature.key">
            <v-expansion-panel-header>
              <div class="d-flex justify-space-between w-100">
                <span>{{ feature.name }}</span>
                <span class="grey--text">Ур. {{ feature.level }}</span>
              </div>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <div class="feature-text text-with-tooltips" v-if="feature.description"
                v-html="highlightedText(feature.description)"></div>
              <!-- <div v-if="feature.description">
                <rich-text-with-tooltips :html="feature.description" :terms="terms" />
              </div> -->
              <div class="feature-text text-with-tooltips" v-if="feature.snippet" v-html="feature.snippet"></div>

              <!-- Выбор -->
              <v-select v-if="feature.options" v-model="feature.selected" :items="feature.options" item-text="name"
                item-value="key" dense outlined @change="changeSelectedOption(feature, item)" />

              <!-- Выбранная опция -->
              <v-card v-if="feature.selected" class="mt-3 pa-3 grey" outlined>
                <div v-if="getSelectedOption(feature)">
                  <trait-view :item="getSelectedOption(feature)" />

                  <div class="feature-text" v-if="getSelectedOption(feature).snippet"
                    v-html="getSelectedOption(feature).snippet"></div>
                </div>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>

    </v-col>
  </v-row>
</template>


<script>
import ArchetypePreview from "~/components/forge/ArchetypePreview";
import CharacterCreationMixin from "~/mixins/CharacterCreationMixin";
import SluggerMixin from "~/mixins/SluggerMixin";
import KeywordRepository from "~/mixins/KeywordRepositoryMixin";
import StatRepository from "~/mixins/StatRepositoryMixin";
import WargearTraitRepository from "~/mixins/WargearTraitRepositoryMixin";
import traitView from "~/components/TraitView";
import richTextWithTooltips from "~/components/RichTextWithTooltips";

export default {
  name: "archetype-manage",
  components: { ArchetypePreview, traitView, richTextWithTooltips },
  mixins: [
    CharacterCreationMixin,
    SluggerMixin,
    KeywordRepository,
    StatRepository,
    WargearTraitRepository,
  ],
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      loading: false,
      item: undefined,
      abilityList: undefined,
      actionList: undefined,
      deityList: undefined,
      oldValue: undefined,
      terms: [
        { term: 'Strike', tooltip: 'Тип базовой атаки персонажа.' },
        { term: 'Off-Guard', tooltip: 'Состояние врага, когда он уязвим.' },
        { term: 'дистанционной атакой', tooltip: 'Атака на расстоянии с использованием оружия или без оружия.' },
        { term: 'Удар', tooltip: 'Физическая атака ближнего боя.' },
      ]
    };
  },
  computed: {
    characterSettingTier() {
      return this.$store.getters["characters/characterSettingTierById"](
        this.characterId
      );
    },
    characterFactionKey() {
      return this.$store.getters["characters/characterFactionKeyById"](
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
    characterArchetypeKey() {
      return this.$store.getters["characters/characterArchetypeKeyById"](
        this.characterId
      );
    },
    characterArchetypeCost() {
      return this.$store.getters["characters/characterArchetypeCostsById"](
        this.$route.params.id
      );
    },
    characterArchetypeLabel() {
      return this.$store.getters["characters/characterArchetypeLabelById"](
        this.characterId
      );
    },
    characterArchetypeTier() {
      return this.$store.getters["characters/characterArchetypeTierById"](
        this.characterId
      );
    },
    characterArchetypeKeywords() {
      return this.$store.getters["characters/characterArchetypeKeywordsById"](
        this.characterId
      );
    },
    skillAttack() {
      return this.$store.getters["characters/characterskillAttackById"](
        this.characterId
      );
    },
    skillDefence() {
      return this.$store.getters["characters/characterskillDefenceById"](
        this.characterId
      );
    },
    characterSaving() {
      return this.$store.getters["characters/characterSavingById"](
        this.characterId
      );
    },
    characterPerseption() {
      return this.$store.getters["characters/characterPerseptionById"](
        this.characterId
      );
    },
    characterArchetypeMimic() {
      return this.$store.getters["characters/characterArchetypeMimicById"](
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
    keywords() {
      return this.$store.getters["characters/characterKeywordsRawById"](
        this.characterId
      );
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
    avatar() {
      if (this.item === undefined || this.item.key === "advanced")
        return "/img/avatar_placeholder.png";
      return `/img/avatars/archetype/${this.item.key}.png`;
    },
    selectedKeywords() {
      const selectedKeywords = {};
      if (this.keywords) {
        this.keywords
          .filter((keyword) => keyword.source.indexOf("archetype") >= 0)
          .filter((k) => k.replacement)
          .forEach((r) => {
            selectedKeywords[r.name] = r.replacement;
          });
      }
      return selectedKeywords;
    },
    sources() {
      return ["playerCore", "playerCore2", "LODM", ...this.settingHomebrews];
    },
    settingHomebrews() {
      return this.$store.getters["characters/characterSettingHomebrewsById"](
        this.characterId
      );
    },




  },
  watch: {
    sources: {
      handler: async function (newVal) {
        if (!newVal) return;

        // сначала подгружаем данные, которые нужны для архетипа
        await this.getAbilityList(newVal);
        await this.getActionList(newVal);
        // await this.getWargearList(newVal);
        await this.getPsychicPowers(newVal);

        // теперь безопасно загружаем архетип
        if (
          this.characterArchetypeKey &&
          this.characterArchetypeKey !== "unknown"
        ) {
          this.loadArchetype(this.characterArchetypeKey);
        }
      },
      immediate: true,
    },
  },
  methods: {

    async getPsychicPowers(sources) {
      const config = {
        params: { source: this.sources.join(','), },
      };
      this.loading = true;
      const { data } = await this.$axios.get('/api/psychic-powers/');
      this.loading = false;

      this.psychicPowersList = data;
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
    async getActionList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get("/api/action/", config.source);

      this.actionList = data;
    },
    async loadArchetype(key) {
      this.loading = true;

      let finalData = {};
      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      finalData = data;

      // finalData = this.enrichArchetypeFeatures(finalData);
      const level = this.$store.getters["characters/characterLevelById"](
        this.characterId
      );

      const skill = this.skillRepository;

      const weapon = this.wargearList
        ? this.wargearList.filter((s) => ["melee", "ranged"].includes(s.type))
        : undefined;
      const enc = this.$store.getters["characters/characterEnhancementsById"](
        this.characterId
      );

      if (this.abilityList !== undefined && this.actionList !== undefined) {
        const lowercaseKeywords = finalData.archetypeFeatures.map((s) =>
          s.toUpperCase()
        );

        //Список особенностей
        const List = this.abilityList;
        let ability = List.filter((talent) =>
          lowercaseKeywords.includes(talent.key.toString().toUpperCase())
        );

        const abilityInArray = [];
        let SubFeature = [];
        let abilityList = [];

        //Сюда кладем то, что дается больше одного раза и смотрим под-опции
        ability.forEach((ab) => {
          if (Array.isArray(ab.level)) {
            abilityInArray.push(ab);
          }

          if (ab.options) {
            if (ab.type.includes("Weapon Group")) {
              const options = this.weaponGroup.filter((s) =>
                ab.options.includes(s.group)
              );
              const listOption = [];
              options.forEach((s) => {
                const op = {
                  key: s.group,
                  ...s,
                };
                listOption.push(op);
                ab.options = listOption;
              });
            }

            ab.options.forEach((s) => {
              if (s.subFeature) {
                const sub = s.subFeature;
                SubFeature = List.filter((s) => sub.includes(s.key));
                s.subFeature = SubFeature;
              }
            });

            if (ab.type === "Class Feature") {
              const options = List.filter((ability) =>
                ab.options.includes(ability.key)
              );

              ab.options = options;
            }

            ab.selected = enc.find((s) => s.key === ab.key)
              ? enc.find((s) => s.key === ab.key).selected
              : "";

            ab.oldValue = enc.find((s) => s.key === ab.key)
              ? enc.find((s) => s.key === ab.key).selected
              : "";

            //Наподобие подкласса Жреца
            ab.options.forEach((s) => {
              if (s.skill && !Array.isArray(s.skill)) {
                s.skill = s.skill ? [s.skill] : [];
              }

              if (s.subFeature) {
                const sub = s.subFeature;
                SubFeature = List.filter((s) => sub.includes(s.key));
                s.subFeature = SubFeature;

                if (ab.selected && ab.options.find(s => s.key === ab.selected)) {
                  console.log(enc)
                  ab.options.find(s => s.key === ab.selected).selectedSubFeature = enc.find((t) => t.key === ab.options.find(s => s.key === ab.selected).key)
                    ? enc.find((t) => t.key === ab.options.find(s => s.key === ab.selected).key).selected
                    : "";
                  ab.options.find(s => s.key === ab.selected).selectedSubFeatureOldValue = enc.find((t) => t.key === ab.options.find(s => s.key === ab.selected).key)
                    ? enc.find((t) => t.key === ab.options.find(s => s.key === ab.selected).key).selected
                    : "";
                }

              }
            });

          }
        });

        //Выкидываем из списка особенности, уровень которых перечислен в массиве
        ability = ability.filter((ab) => !Array.isArray(ab.level));

        let ac = this.actionList;
        ability.forEach((tal) => {
          let action;
          if (tal.item) action = ac.find((ac) => ac.key === tal.item.key);

          if (tal.skill) {
            if (tal.skill?.includes("all")) {
              tal.options = skill;
              tal.type = "Skill Choice";
              tal.selected = enc.find((s) => s.key === tal.key)
                ? enc.find((s) => s.key === tal.key).selected
                : "";
            }
          }
          if (tal.weapon) {
            if (tal.weapon?.includes("all")) {
              tal.options = weapon;
              tal.type = "Weapon Choice";
              tal.selected = enc.find((s) => s.key === tal.key)
                ? enc.find((s) => s.key === tal.key).selected
                : "";
            }
          }

          const ability1 = {
            name: tal.name,
            key: tal.key,
            description: tal.snippet,
            modification: tal.modification,
            level: tal.level,
            subFeature: tal.subFeature,
            options: tal.options,
            selected: tal.selected,
            selectedSubFeature: tal.selectedSubFeature || undefined,
            selectedSubFeatureOldValue: tal.selectedSubFeature || undefined,
            oldValue: tal.oldValue || undefined,
            action: action ? action : undefined,
            type: tal.type,
            value: tal.value,
          };

          if (ability1.level <= level) abilityList.push(ability1);
        });
        //Смотрим все особенности, и делаем их по тем уровням, что в массиве
        abilityInArray.forEach((ab) => {
          const tal = ab;
          ab.level.forEach((talent) => {
            const ability1 = {
              name: tal.name,
              key: tal.key + talent,
              description: tal.snippet,
              modification: tal.modification,
              subFeature: tal.subFeature,
              level: talent,
              options: tal.options,
              selected: tal.selected,
              type: tal.type,
              value: tal.value,
            };

            //Кладем в общий "пул"
            if (talent <= level) abilityList.push(ability1);
          });
        });



        if (ability.length > 0) {
          //Если нашли все особенности, то кладем их в каждый класс
          finalData.archetypeFeatures = abilityList;
        }
        finalData.archetypeFeatures = abilityList
          .filter((t) => t.level <= level)
          .sort((a, b) => a.level - b.level);
      }

      this.item = finalData;
      //this.item.archetypeFeatures = [];
      this.$set(this.item, "archetypeFeatures", [
        ...finalData.archetypeFeatures,
      ]);
      // this.item.archetypeFeatures = finalData.archetypeFeatures;

      this.loading = false;
    },
    highlightedText(text) {


      this.terms.forEach(({ term, tooltip }) => {
        // Экранируем термины для RegExp
        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedTerm})`, 'gi');

        text = text.replace(regex, `<span class="highlight-term" title="${tooltip}">$1</span>`);
      });

      return text;
    },
    getSelectedOption(feature) {
      if (!feature?.options) return null;
      return feature.options.find(o => o.key === feature.selected) || null;
    },
    SpellName(spell) {
      const key = this.textToKebab(spell);
      return this.psychicPowersList?.find(s => s.key === key)?.name || '';
    },
    characterlabel(key) {
      const map = {
        U: "Нетренирован",
        T: "Тренирован",
        E: "Эксперт",
        M: "Мастер",
        L: "Легенда"
      };
      return map[key] || "";
    },

    characterLabelAttribute(keys) {
      return this.attributeRepository
        .filter(a => keys.includes(a.key))
        .map(a => a.name)
        .join(", ");
    },

    characterLabelAttributeBoost(items) {
      return items
        .filter(a => a.value > 0)
        .map(a => a.name)
        .join(", ");
    },

    characterLabelSkillTrainedChoice(keys) {
      return this.skillRepository
        .filter(s => keys.includes(s.key))
        .map(s => s.name)
        .join(", ");
    },

    doChangeMode() {
      this.$router.push({
        name: "forge-characters-id-builder-archetype-choose",
        params: { id: this.characterId },
      });
    },

    characterSkillSheet() {
      return this.$store.getters["characters/characterSkillSheetById"](
        this.characterId
      );
    },

    changeSelectedOption(feature, inx) {
      const level = this.characterLevel;
      const id = this.characterId;

      // =========================
      // COMMON PREP
      // =========================

      const newOptionFeat = feature.options.find(o => o.key === feature.selected);
      const oldOptionFeat = feature.options.find(o => o.key === feature.oldValue);

      const mod = {
        key: feature.key,
        type: feature.type,
        selected: feature.selected,
        value: feature.value,
        level: feature.level,
        source: "archetype",
      };


      // Always refresh class-mod feature
      this.$store.commit("characters/clearCharacterPreparedSpell", { id });
      if (oldOptionFeat)
        this.changeSelectedSubFeature(oldOptionFeat, undefined)
      this.$store.commit("characters/clearCharacterClassModFeature", { id, content: mod });
      this.$store.commit("characters/addCharacterClassModFeature", { id, content: mod });


      // =========================
      // UNIVERSAL REMOVE OLD OPTION
      // =========================

      if (oldOptionFeat) {
        const oldOptionFeatOrNot = oldOptionFeat.subFeature ? oldOptionFeat.subFeature : [oldOptionFeat]
        oldOptionFeatOrNot.forEach(oldOption => {



          // 1) Focus spell
          if (oldOption.focusSpell) {
            this.$store.commit("characters/removeCharacterFocusSpell", {
              id,
              key: this.textToKebab(oldOption.focusSpell),
              featureKey: feature.key,
              type: feature.type,
              source: "archetype"
            });
          }

          // 2) Skill list
          if (oldOption.skill) {
            const list = Array.isArray(oldOption.skill) ? oldOption.skill : [oldOption.skill];
            list.forEach(s => {
              this.$store.commit("characters/removeSkillSheetSelected", {
                id, key: s, level: feature.level,
                selected: feature.oldValue, type: "class", optional: true
              });
              this.$store.commit("characters/removeSkillSheet", {
                id, key: s, level: feature.level,
                type: "skill", optional: true
              });
            });
          }

          // 3) Additional trained skill (Skill Choice)
          if (feature.type === "Skill Choice") {
            const predSkill = this.$store.getters[
              "characters/characterTrainedAdditionalSkillClassById"
            ](id);

            if (predSkill) {
              this.$store.commit("characters/removeSkillSheet", {
                id, key: predSkill, level: feature.level,
                type: "class", optional: true
              });
            }
          }

          // 4) Spell traditions
          if (oldOption.spellTraditions) {
            this.$store.commit("characters/clearCharacterSpellTraditions", { id });
          }

          // 4) Spell traditions
          if (oldOption.spells) {
            this.$store.commit("characters/clearCharacterSpellTraditions", { id });
          }

          // 5) Trait
          if (oldOption.trait) {
            this.$store.commit("characters/clearCharacterKeywordsByType", {
              id,
              type: "sanctification",
              cascade: true
            });
          }

          // 6) Modifications
          if (oldOption.modification) {
            this.$store.commit("characters/removeCharacterModificationByFeature", {
              id, featureKey: feature.key
            });
          }
        })
      }


      // =========================
      // UNIVERSAL ADD NEW OPTION
      // =========================

      // 1) Focus spell
      if (newOptionFeat) {
        const newOptionFeatOrNot = newOptionFeat.subFeature ? newOptionFeat.subFeature : [newOptionFeat]
        this.$store.commit("characters/removeCharacterModificationByFeature", {
          id,
          featureKey: feature.key
        });
        newOptionFeatOrNot.forEach(newOption => {

          if (newOption?.focusSpell) {
            this.$store.commit("characters/addCharacterFocusSpell", {
              id,
              key: this.textToKebab(newOption.focusSpell),
              featureKey: feature.key,
              type: feature.type,
              source: "archetype"
            });
          }

          // 2) Skills array
          if (newOption?.skill && !newOption.isSelected) {
            const list = Array.isArray(newOption.skill) ? newOption.skill : [newOption.skill];
            list.forEach(s => {
              this.$store.commit("characters/addSkillSheet", {
                id,
                key: s,
                level: feature.level,
                type: "class",
                optional: true,
                selected: feature.selected,
                combinded: false
              });
            });
          }

          // 3) Skill Choice (old PF mechanics)
          if (feature.type === "Skill Choice") {
            const key = newOption.key;

            this.$store.commit("characters/setCharacterAdditionalTrainedClassSkill", {
              id,
              payload: { key: 1, value: key }
            });

            this.$store.commit("characters/addSkillSheet", {
              id, key, level: feature.level, type: "class", optional: true
            });
          }

          // 3) Spell traditions
          if (newOption.spells) {
            this.$store.commit("characters/setCharacterSpell", {
              id,
              value: newOption.spells
            });
          }

          // 4) Spell traditions
          if (newOption?.spellTraditions && !newOption.isSelected) {
            this.$store.commit("characters/setCharacterSpellTraditions", {
              id,
              value: newOption.spellTraditions
            });
          }

          // 5) Trait
          if (newOption?.trait && newOption.trait !== "Без" && !newOption.isSelected) {
            this.$store.commit("characters/addCharacterKeyword", {
              id,
              keyword: {
                name: newOption.trait,
                source: "archetype",
                type: "sanctification"
              }
            });
          }

          // 6) Modifications
          if (newOption?.modification && !newOption.isSelected) {
            const mod1 = []
            const key = feature.key;


            // mod1.push({
            //   ...newOption.modification,
            //   featureKey: key,
            // });

            const mods = Array.isArray(newOption.modification)
              ? newOption.modification
              : [newOption.modification];

            mods.forEach(m => {
              mod1.push({
                ...m,
                featureKey: key
              });
            });
            const second = this.item.archetypeFeatures.find(s => s.key === "Second Path")?.selected;
            const first = this.item.archetypeFeatures.find(s => s.key === "Perfection Path")?.selected;
            const match2 = second ? second.match(/^\D+/)[0] : "";
            const matchNew = newOption.key.match(/^\D+/)[0];



            if (
              feature.key !== "Third Path" ||
              matchNew === match2 ||
              matchNew === first
            ) {
              this.$store.commit("characters/addCharacterModifications", {
                id: this.characterId,
                content: { modifications: mod1, source: "archetype" },
              });
              console.log("Добавил:", mod1)
            }


          }
        })
      }
      // =========================
      // FINALIZE
      // =========================
      this.$store.commit("characters/clearModification", { id, level });
      this.$store.commit("characters/setModification", { id, level });
      feature.oldValue = feature.selected || feature.oldValue;
    },

    changeSelectedSubFeature(parentFeature, subItemKey) {
      const id = this.characterId;
      const level = this.characterLevel;

      const newSubItem = subItemKey
        ? parentFeature.subFeature.find(s => s.key === subItemKey)
        : null;
      const oldSubItem = parentFeature.selectedSubFeatureOldValue
        ? parentFeature.subFeature.find(s => s.key === parentFeature.selectedSubFeatureOldValue)
        : null;

      const processRemove = (item) => {
        if (!item) return;

        // 1) Focus spell
        if (item.focusSpell) {
          this.$store.commit("characters/removeCharacterFocusSpell", {
            id,
            key: this.textToKebab(item.focusSpell),
            featureKey: parentFeature.key,
            type: parentFeature.type,
            source: "archetype"
          });
        }

        // 2) Skills
        if (item.skill) {
          const skills = Array.isArray(item.skill) ? item.skill : [item.skill];
          skills.forEach(s => {
            this.$store.commit("characters/removeSkillSheetSelected", {
              id, key: s, level: parentFeature.level,
              selected: parentFeature.selectedSubFeatureOldValue,
              type: "class", optional: true
            });
            this.$store.commit("characters/removeSkillSheet", {
              id, key: s, level: parentFeature.level,
              type: "skill", optional: true
            });
          });
        }

        // 3) Spells / traditions
        if (item.spellTraditions) this.$store.commit("characters/clearCharacterSpellTraditions", { id });
        if (item.spells) this.$store.commit("characters/clearCharacterSpell", { id });

        // 4) Trait
        if (item.trait) {
          this.$store.commit("characters/clearCharacterKeywordsByType", {
            id, type: "sanctification", cascade: true
          });
        }

        // 5) Modifications
        if (item.modification) {
          this.$store.commit("characters/removeCharacterModificationByFeature", {
            id, featureKey: parentFeature.key
          });
        }
      };

      const processAdd = (item) => {
        if (!item) return;

        // 1) Focus spell
        if (item.focusSpell) {
          this.$store.commit("characters/addCharacterFocusSpell", {
            id,
            key: this.textToKebab(item.focusSpell),
            featureKey: parentFeature.key,
            type: parentFeature.type,
            source: "archetype"
          });
        }

        // 2) Skills
        if (item.skill) {
          const skills = Array.isArray(item.skill) ? item.skill : [item.skill];
          skills.forEach(s => {
            this.$store.commit("characters/addSkillSheet", {
              id, key: s, level: parentFeature.level,
              type: "class", optional: true,
              selected: item.key, combinded: false
            });
          });
        }

        // 3) Spell traditions / spells
        if (item.spellTraditions) this.$store.commit("characters/setCharacterSpellTraditions", { id, value: item.spellTraditions });
        if (item.spells) this.$store.commit("characters/setCharacterSpell", { id, value: item.spells });

        // 4) Trait
        if (item.trait && item.trait !== "Без") {
          this.$store.commit("characters/addCharacterKeyword", {
            id, keyword: { name: item.trait, source: "archetype", type: "sanctification" }
          });
        }

        // 5) Modifications
        if (item.modification) {
          this.$store.commit("characters/addCharacterModifications", {
            id,
            content: { modifications: Array.isArray(item.modification) ? item.modification.map(m => ({ ...m, featureKey: parentFeature.key })) : [{ ...item.modification, featureKey: parentFeature.key }], source: "archetype" }
          });
        }
      };

      // Выполняем очистку старого и добавление нового
      processRemove(oldSubItem);
      processAdd(newSubItem);

      // Финализация
      parentFeature.selectedSubFeatureOldValue = subItemKey;
    },


    characterLevel() {
      return this.$store.getters["characters/characterLevelById"](
        this.characterId
      );
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
