<template>
  <v-row justify="center">
    <!-- Loader -->
    <v-progress-circular v-if="!item" indeterminate color="success" size="96" width="8" />

    <v-col v-else cols="12" lg="10">

      <v-card class="preview-section mb-4 pa-4" outlined>

        <v-row align="center">

          <v-col cols="12" md="3" class="text-center order-md-last">

            <v-avatar size="96" tile>
              <img :src="avatar" />
            </v-avatar>

          </v-col>


          <v-col cols="12" md="9">

            <div class="preview-title">
              {{ item.name }}
            </div>

            <div class="preview-subtitle mb-3">
              {{ item.hint }}
            </div>


            <v-btn small outlined color="primary" class="mt-2" @click="doChangeMode">
              <v-icon small left>
                mdi-cog
              </v-icon>

              Сменить класс
            </v-btn>

          </v-col>

        </v-row>

      </v-card>
      <!-- 🧬 TRAITS -->
      <v-card class="mb-4 pa-4" outlined>
        <trait-view v-if="item.trait" :item="item" />
      </v-card>
      <!-- ⚙️ Основные характеристики -->
      <v-row class="d-flex" align="stretch">
        <v-col cols="12" md="6">
          <v-card outlined class="pa-4 preview-section">
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
          <v-card outlined class="pa-4 preview-section">
            <h3 class="text-h6 mb-2">Хиты</h3>
            <strong>{{ item.hitpoints }} + мод Телосложения</strong>

            <div class="mt-2 text--secondary">
              На каждом уровне
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- 🛡️ Профили -->




      <!-- ⚔️ Атаки и Защиты -->
      <v-row align="stretch">
        <v-col cols="12" md="4">
          <v-card outlined class="pa-4 preview-section fill-height">
            <h3 class="text-h6"> Спасброски/КС </h3>

            <div v-for="item1 in SavingRepository" :key="item1.key">
              <v-chip small :color="getClassChipColor(characterSaving[item1.key])" dark> {{
                characterlabel(characterSaving[item1.key]) }}</v-chip>
              {{ item1.name }}
            </div>
            <div>
              <v-chip small :color="getClassChipColor(characterSkillClass)" dark> {{
                characterlabel(characterSkillClass) }}</v-chip> КС класса
            </div>

            <div><v-chip small :color="getClassChipColor(characterPerseption)" dark> {{
              characterlabel(characterPerseption) }}</v-chip> Внимательность
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card outlined class="pa-4 preview-section fill-height">
            <h3 class="text-h6">Атаки</h3>

            <div v-for="item1 in WeaponRepository" :key="item1.key">
              <div v-if="skillAttack[item1.key]">
                <v-chip small :color="getClassChipColor(skillAttack[item1.key])" dark> {{
                  characterlabel(skillAttack[item1.key]) }}</v-chip> {{ item1.name }}
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card outlined class="pa-4 preview-section fill-height">
            <h3 class="text-h6">Защиты</h3>

            <div v-for="item1 in DefenceRepository" :key="item1.key">
              <div v-if="skillDefence[item1.key]">
                <v-chip small :color="getClassChipColor(skillDefence[item1.key])" dark> {{
                  characterlabel(skillDefence[item1.key]) }}</v-chip> {{ item1.name }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- 🎯 Навыки -->
      <v-card outlined class="mt-4 preview-section">
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
      <v-card class="preview-section mt-4" outlined>
        <h2 class="text-h5 mb-4">Классовые особенности</h2>

        <v-expansion-panels accordion flat>
          <v-expansion-panel v-for="feature in item.archetypeFeatures" :key="feature.key">
            <v-expansion-panel-header>
              <div class="feature-header">
                <span>{{ feature.name }}</span>
                <span class="grey--text">Ур. {{ feature.level }}</span>
              </div>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <div class="feature-text text-with-tooltips" v-if="feature.description" v-html="feature.description">
              </div>

              <v-card v-if="feature.grants && feature.grants.length" class="mt-3 pa-3" outlined>


                <h4 class="text-subtitle-1">
                  Получаемые способности
                </h4>

                <!-- <v-select v-if="feature.options" v-model="feature.selected" :items="feature.options" item-text="name"
                  item-value="key" @change="changeSelectedOption(feature)" /> -->

                <div v-for="grant in resolveGrantedFeatures(feature)" :key="grant.key">


                  <v-btn text small color="primary" @click="openDialogItem(grant)">
                    {{ grant.name }}
                  </v-btn>


                </div>


              </v-card>

              <div class="feature-text text-with-tooltips" v-if="feature.snippet" v-html="feature.snippet"></div>

              <div class="feature-text text-with-tooltips" v-if="feature.action">
                <CardItem :item="feature.action" />
              </div>

              <!-- Выбор -->
              <v-select v-if="feature.options && feature.options.length" v-model="feature.selected"
                :items="feature.options || []" :disabled="!feature.options || !feature.options.length" item-text="name"
                :item-value="getOptionValue" dense outlined @change="changeSelectedOption(feature)" />

              <!-- Выбранная опция -->
              <v-card v-if="getSelectedOption(feature)" class="preview-section" outlined>
                <div v-if="getSelectedOption(feature)">
                  <trait-view :item="getSelectedOption(feature)" />

                  <div class="feature-text" v-if="getSelectedOption(feature).description"
                    v-html="getSelectedOption(feature).description">
                  </div>
                  <v-divider></v-divider>

                  <div class="feature-text" v-if="getSelectedOption(feature).spell">

                    Заклинание: <v-btn text small color="primary" class="pa-0 ml-1"
                      @click="openDialogItem(GetSpell(getSelectedOption(feature).spell))">
                      {{ SpellName(getSelectedOption(feature).spell) }}
                    </v-btn>


                    Черта: <v-btn text small color="primary" class="pa-0 ml-1"
                      @click="openDialogItem(GetFeat(getSelectedOption(feature).feat))">
                      {{ GetFeat(getSelectedOption(feature).feat).name }}
                    </v-btn>
                    <!-- Вариант всплывашки, оставить  -->
                    <!-- <v-menu open-on-hover offset-y max-width="500">
                      <template v-slot:activator="{ on, attrs }">
                        <span class="spell-link" v-bind="attrs" v-on="on">
                          {{ SpellName(getSelectedOption(feature).spell) }}
                        </span>
                      </template>

<CardItem :item="GetSpell(getSelectedOption(feature).spell)" />
</v-menu> -->

                  </div>



                  <v-divider></v-divider>
                  <p></p>



                  <v-select v-if="getSelectedOption(feature).options" v-model="feature.selectedOptions"
                    :items="getSelectedOption(feature).options || []" item-text="name" item-value="key" dense outlined
                    @change="value => changeSelectedOptionsFeature(
                      feature,
                      value,
                      getSelectedOption(feature).options
                    )" />

                  <v-card v-for="sub in getSelectedOption(feature).grantedFeatures" :key="sub.key"
                    class="preview-section">

                    <div class="feature-header">
                      <span>{{ sub.name }}</span>
                      <span class="grey--text">Ур. {{ sub.level }}</span>
                    </div>

                    <div v-if="sub.description" class="feature-text" v-html="sub.description">
                    </div>

                    <div v-if="feature.grants && feature.grants.length" class="mt-3">

                      <v-divider></v-divider>

                      <h4 class="mt-2">
                        Выдаёт:
                      </h4>


                      <v-chip v-for="grant in feature.grants" :key="grant.key || grant" small class="mr-1">
                        {{ grant.name || grant }}
                      </v-chip>


                    </div>





                  </v-card>
                  <!-- {{ getSelectedOption(feature) }} -->
                </div>
              </v-card>
            </v-expansion-panel-content>

          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>

      <v-dialog v-model="dialogItem" max-width="1000px">
        <v-card>
          <CardItem :item="selectedItem" />
        </v-card>
      </v-dialog>

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
import CardItem from '../../../../../../components/CardItem.vue';

export default {
  name: "archetype-manage",
  components: { ArchetypePreview, traitView, richTextWithTooltips, CardItem },
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
      selectedItem: {},
      abilityList: undefined,
      dialogItem: false,
      actionList: undefined,
      deityList: undefined,
      talentList: undefined,
      oldValue: undefined,
      abilityFeatureCache: [],
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
    characterSkillClass() {
      return this.$store.getters["characters/characterSkillClassById"](
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
        this.characterId
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
    characterArchetypeKey: {
      immediate: true,
      handler(val) {
        if (!val || val === "unknown") return;

        this.initArchetype();
      }
    }
  },
  methods: {
    async initArchetype() {
      await this.getAbilityList(this.sources);
      await this.getActionList(this.sources);
      await this.getPsychicPowers(this.sources);
      await this.getTalent(this.sources);
      await this.loadArchetype(this.characterArchetypeKey);
    },
    async getPsychicPowers(sources) {
      this.loading = true;
      const { data } = await this.$axios.get('/api/psychic-powers/');
      this.loading = false;

      this.psychicPowersList = data;
    },
    async getTalent(sources) {
      this.loading = true;
      const { data } = await this.$axios.get('/api/talents/');
      this.loading = false;

      this.talentList = data.data;
    },
    async getAbilityList(sources) {

      const config = {
        params: {
          source: sources.join(",")
        }
      };


      const { data } = await this.$axios.get(
        "/api/abilityAncestry/"
      );



      this.abilityList = data;

    },
    normalizeFeatureRules(ab) {

      if (!ab.rules)
        return ab;


      ab.choiceSet = null;
      ab.flagFeatures = [];


      ab.rules.forEach(rule => {


        /*
            ChoiceSet
        */




        /*
            flags.system
        */

        if (
          rule.key === "ActiveEffectLike" &&
          rule.path?.startsWith("flags.system.")
        ) {


          ab.flagFeatures.push({

            path:
              rule.path.replace(
                "flags.system.",
                ""
              ),

            value:
              rule.value

          });


        }


      });



      return ab;

    },
    async getActionList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };

      const { data } = await this.$axios.get("/api/action/");

      this.actionList = data.map(s => {
        const t = s.system;

        return {
          ...s,
          ...t
        };
      });

    },


    async loadArchetype(key) {
      this.loading = true;

      try {
        const { data } = await this.$axios.get(`/api/archetypes/${key}`);
        const finalData = data;

        const level = this.$store.getters[
          "characters/characterLevelById"
        ](this.characterId);

        const List = this.abilityList || [];

        const enc = this.$store.getters[
          "characters/characterEnhancementsById"
        ](this.characterId) || [];

        const skill = this.skillRepository;

        const weapon = this.weaponGroup || [];

        /*
            Новая система:

            archetypeFeatures теперь содержит ключи особенностей.
            Ищем их в abilityList.
        */

        const featureKeys = (finalData.archetypeFeatures || [])
          .map(x => x.toString().toLowerCase());


        let ability = List.filter(item =>
          featureKeys.includes(
            item.key.toString().toLowerCase()
          )
        );


        let abilityList = [];



        // ==========================================
        // Обработка Choices и Grants (PF2 Remaster)
        // ==========================================

        ability.forEach(ab => {
          // this.normalizeFeatureRules(ab);
          const saved = enc.find(
            e => e.key === ab.key
          );


          // сохраняем старый выбор персонажа
          ab.selected = saved
            ? saved.selected
            : "";


          ab.oldValue = saved
            ? saved.selected
            : "";


          //всякие доктрины, музы и прочее
          const choiseSetRule = ab.rules.find(s => s.key === "ChoiceSet")

          if (choiseSetRule) {

            let tags = [];
            const choices = choiseSetRule.choices;

            // 1. Список готовых вариантов
            if (Array.isArray(choices)) {
              // divineFont и подобные
              ab.choiceSet = tags;
              ab.options = choices;
              return;
            }

            // 2. Фильтр
            if (choices?.filter) {

              const filter = choices.filter;

              // Пока поддерживаем только строковые item:tag
              const tags = filter
                .filter(f => typeof f === "string")
                .filter(f => f.startsWith("item:tag:"))
                .map(f => f.replace("item:tag:", ""));
              ab.choiceSet = tags;
              ab.options = List.filter(item =>
                tags.some(tag =>
                  item.traits?.includes(tag) ||
                  item.otherTags?.includes(tag) ||
                  item.tags?.includes(tag)
                )
              );

              return;
            }

            if (choices && choices === "weaponGroups") {

              // const filter = choices.filter;

              // Пока поддерживаем только строковые item:tag
              // const tags = filter
              //   .filter(f => typeof f === "string")
              //   .filter(f => f.startsWith("item:tag:"))
              //   .map(f => f.replace("item:tag:", ""));

              // ab.choiceSet = tags;
              ab.options = weapon;

              return;
            }
            // 3. Всё остальное пока игнорируем
            console.warn("Unsupported ChoiceSet", choiseSetRule);

            // tags = choiseSetRule.choices.filter.map(s => s.replace("item:tag:", ""));
            //Кладем найденные опции в options
            ab.choiceSet = tags;
            ab.options = List.filter(item =>
              tags.some(tag =>
                item.traits?.includes(tag) ||
                item.otherTags?.includes(tag) ||
                item.tags?.includes(tag)
              )
            );

          }

          // if (ab.choiceSet) {

          //   const tags =
          //     ab.choiceSet.choices;


          //   ab.options =
          //     List.filter(item => {

          //       return tags.some(tag =>
          //         item.traits?.includes(tag) ||
          //         item.otherTags?.includes(tag) ||
          //         item.tags?.includes(tag)
          //       );

          //     });


          //   ab.choice =
          //   {
          //     type: "tag",
          //     flag:
          //       ab.choiceSet.flag
          //   };

          // }


          /*
              Grants
      
              Например:
      
              grants:[
                  "amulets-abeyance"
              ]
      
              превращаем в реальные объекты
          */

          if (ab.grants?.length) {

            ab.grantedFeatures =
              ab.grants;

          }
          else {

            ab.grantedFeatures = [];

          }



          /*
              Если у выбранной опции есть grants,
              тоже подготавливаем их
      
          */

          if (ab.options?.length) {

            ab.options.forEach(option => {

              if (option.grants?.length) {

                option.subFeature =
                  option.grantedFeatures;

              }
              else {

                option.grantedFeatures = [];

              }

            });

          }


        });

        // ==========================================
        // Формирование списка особенностей персонажа
        // ==========================================

        ability.forEach(tal => {

          if (tal.flagFeatures?.length) {

            tal.flagFeatures.forEach(flag => {


              const features =
                Object.values(flag.value);


              tal.flagOptions =
                List.filter(item =>
                  features.includes(item.key)
                );


            });


          }
          let action;


          if (tal.item) {
            action = this.actionList.find(
              ac => ac.key === tal.item.key
            );
          }



          /*
              Если способность даёт выбор навыка
      
              Например:
              choices -> skill
      
          */

          if (tal.skill?.includes("all")) {

            tal.options = skill;
            tal.type = "Skill Choice";

            const saved = enc.find(
              s => s.key === tal.key
            );

            tal.selected = saved
              ? saved.selected
              : "";

          }



          /*
              Если способность выбирает оружие
          */

          if (tal.weapon?.includes("all")) {

            tal.options = weapon;
            tal.type = "Weapon Choice";

            const saved = enc.find(
              s => s.key === tal.key
            );

            tal.selected = saved
              ? saved.selected
              : "";

          }



          const ability1 = {

            name: tal.name,

            key: tal.key,

            description:
              tal.description ||
              tal.snippet ||
              "",


            level:
              typeof tal.level === "object"
                ? tal.level.value
                : tal.level,


            type:
              tal.type,


            options:
              tal.options || [],


            selected:
              tal.selected || "",


            oldValue:
              tal.oldValue || "",



            /*
                Новое
    
                Все выданные способности
            */

            grants:
              (tal.grantedFeatures || []).map(g => {

                if (
                  typeof g === "string" &&
                  g.includes("{item|flags.system.rulesSelections.")
                ) {

                  return tal.selected;

                }

                return g;

              }),


            choiceSet: tal.choiceSet || [],
            /*
                Оставляем rules
                если понадобятся дальше
    
            */

            rules:
              tal.rules || [],



            action:
              action,


            value:
              tal.value

          };



          if (ability1.level <= level) {

            abilityList.push(
              ability1
            );

          }


        });


        // ==========================================
        // Финальная обработка списка особенностей
        // ==========================================


        // оставляем только доступные по уровню
        finalData.archetypeFeatures = abilityList
          .filter(feature =>
            feature.level <= level
          )
          .sort((a, b) =>
            a.level - b.level
          );



        // ==========================================
        // Сохраняем выбранные значения
        // ==========================================

        finalData.archetypeFeatures.forEach(feature => {

          const saved = enc.find(
            e => e.key === feature.key
          );


          if (saved) {

            feature.selected =
              saved.selected || "";


            feature.selectedOptions =
              saved.selectedOptions || [];


          }

        });



        // ==========================================
        // Установка данных архетипа
        // ==========================================

        this.item = finalData;

        finalData.archetypeFeatures.forEach(feature => {


          const exists =
            enc.find(e =>
              e.key === feature.key
            );



          if (!exists) {

            this.addFeatureEffects(
              feature,
              feature.key
            );
          }


        });

        this.$set(
          this.item,
          "archetypeFeatures",
          [
            ...finalData.archetypeFeatures
          ]
        );


        this.loading = false;




      } catch (e) {

        console.error(
          e
        );

        this.loading = false;

      }


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
      if (!feature?.options?.length || !feature.selected)
        return null;

      return feature.options.find(
        o => o.key === feature.selected
      ) || null;
    },
    SpellName(spell) {
      const key = this.textToKebab(spell);
      return this.psychicPowersList?.find(s => s.key === key)?.name || '';
    },
    GetSpell(spell) {
      const key = this.textToKebab(spell);
      return this.psychicPowersList?.find(s => s.key === key);
    },
    GetFeat(spell) {
      const key = this.textToKebab(spell);
      return this.talentList?.find(s => s.key === spell);
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
    removeFeatureEffects(feature) {

      const id =
        this.characterId;


      if (!feature)
        return;



      const grants =
        this.resolveGrantedFeatures(feature);



      /*
          Удаляем обычные выданные особенности
      */
      // сначала применяем профициенси дочерних особенностей
      grants.forEach(item => {

        const grantedEffects =
          this.resolveGrantedFeatures(feature);


        grantedEffects.forEach(item => {

          if (item.rules) {

            this.removeActiveEffects(item);

          }

        });


      });

      grants.forEach(item => {



        /*
            Фокусные заклинания
        */

        if (item.focusSpell) {


          this.$store.commit(
            "characters/removeCharacterFocusSpell",
            {

              id,

              key:
                this.textToKebab(
                  item.focusSpell
                ),

              featureKey:
                feature.key,

              type:
                feature.type,

              source:
                "archetype"

            }
          );


        }

        /*
            Навыки
        */

        if (item.skill) {


          const skills =
            Array.isArray(item.skill)
              ? item.skill
              : [item.skill];



          skills.forEach(skill => {


            this.$store.commit(
              "characters/removeSkillSheet",
              {

                id,

                key:
                  skill,

                level:
                  feature.level,

                type:
                  "skill",

                optional:
                  true

              }
            );


          });


        }




        /*
            Модификации
        */
        this.removeProficiencyModifiers(feature);
        if (item.modification) {
          const grantedSkills = this.collectGrantedSkills(item);
          grantedSkills.forEach(skill => {


            this.$store.commit(
              "characters/removeSkillSheet",
              {

                id,

                key:
                  skill,

                level:
                  feature.level,

                type:
                  "class",

                optional:
                  true

              }
            );


          });



          this.$store.commit(
            "characters/removeCharacterModificationByFeature",
            {

              id,

              featureKey:
                feature.key

            }
          );


        }


      });


      this.removeActiveEffects(feature);
      this.$store.commit(
        "characters/removeCharacterModificationByFeature",
        {

          id:
            this.characterId,


          featureKey:
            feature.key

        }
      );
      /*
          Удаляем PF2 rules
      */

      if (
        feature.rules &&
        feature.rules.length
      ) {


        feature.rules.forEach(rule => {


          if (
            rule.key === "GrantItem"
          ) {


            const key =
              rule.uuid ||
              rule.item;



            this.$store.commit(
              "characters/removeCharacterClassModFeature",
              {

                id,


                content: {

                  key,


                  source:
                    "archetype",


                  featureKey:
                    feature.key

                }

              }
            );


          }


        });


      }



    },
    removeProficiencyModifiers(feature) {


      this.$store.commit(
        "characters/removeCharacterModificationByFeature",
        {

          id:
            this.characterId,


          featureKey:
            feature.key

        }
      );


    },
    removeActiveEffects(feature) {


      if (!feature?.rules?.length)
        return;


      feature.rules.forEach(rule => {


        if (
          rule.key !== "ActiveEffectLike"
        )
          return;


        const skillMatch =
          rule.path.match(
            /system\.skills\.(.+)\.rank/
          );


        if (skillMatch) {


          this.$store.commit(
            "characters/removeSkillSheet",
            {

              id:
                this.characterId,


              key:
                skillMatch[1],


              level:
                feature.level,


              type:
                "class",


              optional:
                true

            }
          );


        }

      });


    },
    resolveGrantedFeatures(feature) {

      if (!feature)
        return [];


      const grants =
        feature.grants || [];



      return grants
        .map(g => {


          /*
              Уже готовый объект
          */

          if (
            typeof g === "object"
          ) {

            return g;

          }



          /*
              Строковый ключ
          */

          if (typeof g === "string") {

            if (g.startsWith("{actor|flags.system.")) {

              const path = g
                .replace("{actor|flags.system.", "")
                .replace("}", "");

              const featKey =
                this.resolveSystemFlag(path);

              return this.abilityList.find(
                a => a.key === featKey
              );

            }
            let key = g;

            // Doctrine и другие ChoiceSet
            if (
              key.startsWith("{item|flags.system.rulesSelections.")
            ) {

              key = feature.selected;

            }

            key = key
              .replace(
                "Compendium.pf2e.feats.Item.",
                ""
              )
              .toLowerCase();

            return this.abilityList.find(
              a =>
                a.key?.toLowerCase() === key
            );

          }



          return null;


        })
        .filter(Boolean);

    },
    addProficiencyModifiers(item, feature) {


      if (!item?.subfeatures?.proficiencies)
        return;


      const proficiencies =
        item.subfeatures.proficiencies;


      const modifications = [];


      Object.entries(proficiencies)
        .forEach(([key, data]) => {


          if (!data?.rank)
            return;



          modifications.push({

            key,


            upgrade:
              this.rank(data.rank),


            mode:
              "Upgrade",


            type:
              this.getProficiencyType(key),


            level:
              item.level.value,


            source:
              "archetype",


            featureKey:
              feature.key

          });


        });



      if (!modifications.length)
        return;



      this.$store.commit(
        "characters/addCharacterModifications",
        {

          id: this.characterId,


          content: {
            modifications,

            source: "archetype"
          }

        }
      );


      this.$store.commit(
        "characters/clearModification",
        {
          id: this.characterId,
          level: this.characterLevel
        }
      );

      this.$store.commit(
        "characters/setModification",
        {
          id: this.characterId,
          level: this.characterLevel
        }
      );

    },

    rank(value) {
      const ranks = {
        0: "U",
        1: "T",
        2: "E",
        3: "M",
        4: "L"
      };


      return ranks[value] ?? value;
    },
    // addProficiencyModifiers(feature) {

    //   if (!feature?.subfeatures?.proficiencies)
    //     return;


    //   const proficiencies =
    //     feature.subfeatures.proficiencies;


    //   const modifications = [];


    //   Object.keys(proficiencies)
    //     .forEach(key => {


    //       const data =
    //         proficiencies[key];


    //       let type = null;


    //       if (
    //         [
    //           "light",
    //           "medium",
    //           "heavy",
    //           "unarmored"
    //         ].includes(key)
    //       ) {

    //         type = "Defence";

    //       }


    //       if (
    //         [
    //           "simple",
    //           "martial",
    //           "advanced",
    //           "unarmed"
    //         ].includes(key)
    //       ) {

    //         type = "Attack";

    //       }


    //       if (
    //         [
    //           "fortitude",
    //           "reflex",
    //           "will"
    //         ].includes(key)
    //       ) {

    //         type = "Save";

    //       }



    //       if (!type)
    //         return;



    //       modifications.push({

    //         key,

    //         upgrade:
    //           this.rank(data.rank),

    //         mode:
    //           "Upgrade",

    //         type,


    //         level:
    //           feature.level,


    //         source:
    //           "archetype",


    //         featureKey:
    //           feature.key

    //       });


    //     });



    //   if (!modifications.length)
    //     return;



    //   this.$store.commit(
    //     "characters/addCharacterModifications",
    //     {

    //       id:
    //         this.characterId,


    //       content: {

    //         modifications,

    //         source:
    //           "archetype"

    //       }

    //     }
    //   );

    // },
    addFeatureEffects(item, feature) {

      const id =
        this.characterId;

      this.addProficiencyModifiers(
        item,
        feature
      );

      if (!feature)
        return;



      const grants =
        this.resolveGrantedFeatures(feature);




      grants.forEach(item => {



        /*
            PF2 способность
            добавленная через GrantItem
    
            НЕ добавляем напрямую,
            она идёт через rules
        */

        if (
          item.rules &&
          item.rules.length
        ) {

          return;

        }



        /*
            Навыки
        */

        if (item.skill) {


          const skills =
            Array.isArray(item.skill)
              ? item.skill
              : [item.skill];



          skills.forEach(skill => {


            this.$store.commit(
              "characters/addSkillSheet",
              {

                id,

                key:
                  skill,

                level:
                  feature.level,

                type:
                  "class",

                optional:
                  true

              }
            );


          });


        }




        /*
            Модификации
        */

        if (item.modification) {


          const mods =
            Array.isArray(item.modification)
              ? item.modification
              : [item.modification];



          this.$store.commit(
            "characters/addCharacterModifications",
            {

              id,

              content: {

                modifications:
                  mods.map(m => ({

                    ...m,

                    featureKey:
                      feature.key

                  })),


                source:
                  "archetype"

              }

            }
          );


        }



        /*
            Фокусные заклинания
        */

        if (item.focusSpell) {


          this.$store.commit(
            "characters/addCharacterFocusSpell",
            {

              id,

              content: {

                key:
                  this.textToKebab(
                    item.focusSpell
                  ),

                source:
                  "archetype",

                featureKey:
                  feature.key

              }

            }
          );


        }



      });

      // ======================================
      // Doctrine / Bloodline / Muse features
      // ======================================

      if (item.modifiers?.length) {
        const grantedSkills = this.collectGrantedSkills(item);
        grantedSkills.forEach(skill => {


          this.$store.commit(
            "characters/addSkillSheet",
            {

              id,

              key:
                skill,

              level:
                feature.level,

              type:
                "class",

              optional:
                true

            }
          );


        });

        item.modifiers.forEach(modifier => {

          if (
            modifier.key !== "ActiveEffectLike" ||
            typeof modifier.value !== "object"
          ) {
            return;
          }

          Object.values(modifier.value).forEach(featureKey => {

            const doctrineFeature =
              this.abilityList.find(a => a.key === featureKey);

            if (!doctrineFeature)
              return

            this.addProficiencyModifiers(
              doctrineFeature,
              feature
            );





          });

        });

      }


      /*
          PF2 Remaster rules
    
          GrantItem,
          ChoiceSet и т.д.
      */
      this.applyGrantedFeatures(feature);
      this.applyRules(feature);
      this.applyActiveEffects(feature);

    },
    applyGrantedFeatures(feature) {

      const grants =
        this.resolveGrantedFeatures(feature);


      grants.forEach(item => {


        if (!item)
          return;


        /*
          Добавляем эффекты уже дочерней особенности
        */

        this.applyActiveEffects(item);


      });

    },
    applyActiveEffects(feature) {

      if (!feature?.rules?.length)
        return;


      feature.rules.forEach(rule => {


        if (
          rule.key !== "ActiveEffectLike"
        )
          return;


        const path =
          rule.path;


        const value =
          rule.value;


        /*
            Навыки PF2
        */

        const skillMatch =
          path.match(
            /system\.skills\.(.+)\.rank/
          );


        if (skillMatch) {


          const skill =
            skillMatch[1];


          this.$store.commit(
            "characters/addSkillSheet",
            {

              id:
                this.characterId,


              key:
                skill,


              level:
                feature.level,


              type:
                "class",


              optional:
                true,


              value

            }
          );


        }

        if (!path)
          return;

        if (
          path.startsWith(
            "system.proficiencies."
          )
        ) {


          const parts =
            path.split(".");


          const key =
            parts[parts.length - 2];



          this.$store.commit(
            "characters/addCharacterModifications",
            {

              id: this.characterId,


              content: {

                modifications: [
                  {

                    key,

                    upgrade:
                      this.rank(rule.value),

                    mode:
                      "Upgrade",

                    type:
                      this.getProficiencyType(key),

                    level:
                      feature.level,


                    source:
                      "archetype",


                    featureKey:
                      feature.key

                  }
                ],


                source:
                  "archetype"

              }

            }
          );


        }

        if (path.startsWith("flags.system.")) {

          const cleanPath =
            path.replace("flags.system.", "");


          // сохраняем флаг
          this.$store.commit(
            "characters/setCharacterSystemFlags",
            {
              id: this.characterId,
              path: cleanPath,
              value
            }
          );


          // если это доктрина жреца
          if (cleanPath === "cleric.firstDoctrine") {

            this.updateDoctrineFeature(
              value,
              feature
            );

          }


          return;
        }

      });

    },
    updateDoctrineFeature(key, parentFeature) {


      const oldMods =
        this.$store.getters[
          "characters/characterEnhancementsById"
        ](this.characterId)
          ?.filter(
            x =>
              x.featureKey === parentFeature.key
          )
        || [];


      // удалить старые модификации доктрины

      oldMods.forEach(mod => {

        this.$store.commit(
          "characters/removeCharacterModificationByFeature",
          {
            id: this.characterId,
            featureKey: parentFeature.key
          }
        );

      });



      const doctrine =
        this.abilityList.find(
          x =>
            x.key === key
        );


      if (!doctrine)
        return;



      // добавить новую доктрину

      this.addFeatureEffects(
        doctrine,
        parentFeature
      );


    },
    removeFlagFeature(key, parentFeature) {

      const item =
        this.abilityList.find(
          a => a.key === key
        );


      if (!item)
        return;


      this.$store.commit(
        "characters/removeCharacterModificationByFeature",
        {
          id: this.characterId,
          featureKey:
            parentFeature.key
        }
      );


    },

    applyFlagBasedFeatures(key, parentFeature) {


      const item =
        this.abilityList.find(
          a => a.key === key
        );


      if (!item)
        return;



      this.addFeatureEffects(
        item,
        parentFeature
      );


    },

    getProficiencyType(key) {

      if (
        [
          "light",
          "medium",
          "heavy",
          "unarmored"
        ].includes(key)
      )
        return "Defence";


      if (
        [
          "simple",
          "martial",
          "advanced",
          "unarmed"
        ].includes(key)
      )
        return "Attack";


      return "Saving";

    },
    applyRules(feature) {


      if (!feature?.rules?.length)
        return;



      feature.rules.forEach(rule => {


        if (rule.key !== "GrantItem")
          return;



        const granted =
          this.abilityList.find(
            a =>
              a.key === rule.uuid
          );


        let uuid = rule.uuid;

        if (
          typeof uuid === "string" &&
          uuid.startsWith("{actor|flags.system")
        ) {

          const key = uuid
            .replace("{actor|flags.system.", "")
            .replace("}", "");

          const path = uuid
            .replace("{actor|flags.system.", "")
            .replace("}", "");

          uuid =
            this.resolveSystemFlag(path);


        }
        /*
            Если способности нет в базе,
            сохраняем ключ как раньше
        */

        if (!granted) {


          this.$store.commit(
            "characters/addCharacterClassModFeature",
            {
              id: this.characterId,

              content: {

                key:
                  rule.uuid,


                source:
                  "archetype",


                featureKey:
                  feature.key

              }
            }
          );


          return;

        }




        /*
            Если это обычная способность
        */

        this.$store.commit(
          "characters/addCharacterClassModFeature",
          {

            id:
              this.characterId,


            content: {

              key:
                granted.key,


              name:
                granted.name,


              description:
                granted.description ||
                "",


              source:
                "archetype",


              featureKey:
                feature.key

            }

          }
        );



      });


    },
    collectGrantedSkills(feature) {
      const skills = new Set();

      // Старый формат
      if (feature.skill) {
        (Array.isArray(feature.skill) ? feature.skill : [feature.skill])
          .forEach(s => skills.add(s));
      }

      // Новый PF2
      const rules = [
        ...(feature.rules || []),
        ...(feature.modifiers || [])
      ];

      rules.forEach(rule => {
        if (
          rule.key === "ActiveEffectLike" &&
          typeof rule.path === "string"
        ) {
          const match = rule.path.match(/^system\.skills\.([^.]+)\.rank$/);

          if (match) {
            skills.add(match[1]);
          }
        }
      });

      return [...skills];
    },
    async getArchetypeFeatures(features) {

      if (!features || !features.length) {
        return [];
      }

      const keys = features.map(f => {
        if (typeof f === "string") {
          return f;
        }

        return f.key;
      });


      const { data } = await this.$axios.post(
        "/api/abilityAncestry/search/",
        {
          keys
        }
      );


      return data.map(item => {

        return {

          key: item.key,

          name: item.name,

          description:
            item.snippet ||
            item.description ||
            "",

          level:
            typeof item.level === "object"
              ? item.level.value
              : item.level || 1,


          type:
            item.type ||
            "Class Feature",


          modification:
            item.modification || [],


          options:
            item.options || [],


          value:
            item.value,


          skill:
            item.skill,


          weapon:
            item.weapon,


          focusSpell:
            item.focusSpell

        };

      });

    },
    getOptionValue(item) {
      return item.key || item.group;
    },
    changeSelectedOption(feature) {

      const id = this.characterId;


      if (!feature || !feature.options)
        return;


      const oldOption =
        feature.options.find(
          o => o.key === feature.oldValue
        );


      const newOption =
        feature.options.find(
          o => o.key === feature.selected
        );



      /*
          Удаляем старый выбор
      */

      if (oldOption) {

        this.removeFeatureEffects({

          ...oldOption,

          key:
            feature.key,

          level:
            feature.level,

          type:
            feature.type,


          grants:
            oldOption.grantedFeatures || []

        });

      }



      /*
          Добавляем новый выбор
      */

      if (newOption) {


        const doctrine = {
          ...newOption,

          key:
            feature.key + "-" + newOption.key,


          level:
            newOption.level?.value ||
            feature.level,


          type:
            newOption.type,


          featureKey:
            feature.key
        };


        this.addFeatureEffects(
          doctrine,
          feature
        );


        /*
            Новая система ChoiceSet
      
            Если это доктрина/наследие,
            применяем вложенные фичи
        */

        if (
          feature.choiceSet &&
          feature.choiceSet.applyOptions
        ) {

          const linkedFeatures =
            this.abilityList.filter(
              a =>
                feature.choiceSet.options.includes(a.key)
            );


          linkedFeatures.forEach(item => {

            if (
              item.key === newOption.key
            ) {

              this.addFeatureEffects(
                {
                  ...item,
                  key:
                    feature.key + "-" + item.key,
                  level:
                    feature.level,
                  type:
                    feature.type
                },
                feature
              );

            }

          });

        }


      }



      /*
          сохраняем выбор
      */

      const mod = {

        key: feature.key,

        type: feature.type,


        selected:
          feature.selected || "",


        selectedOptions:
          feature.selectedOptions || [],


        value:
          feature.value,


        level:
          feature.level,


        source: "archetype"

      };



      this.$store.commit(
        "characters/clearCharacterClassModFeature",
        {
          id,
          content: mod
        }
      );


      this.$store.commit(
        "characters/addCharacterClassModFeature",
        {
          id,
          content: mod
        }
      );



      /*
          Обновляем модификации
      */

      this.$store.commit(
        "characters/clearModification",
        {
          id,
          level:
            this.characterLevel()
        }
      );


      this.$store.commit(
        "characters/setModification",
        {
          id,
          level:
            this.characterLevel()
        }
      );

      this.$store.commit('characters/setModification', {
        id: this.characterId, level:
          this.characterLevel()
      });

      feature.oldValue =
        feature.selected;


    },
    resolveSystemFlag(path) {

      const flags =
        this.$store.getters[
          "characters/characterSystemFlagsById"
        ](this.characterId);

      const parts = path.split(".");

      let current = flags;

      for (const part of parts) {

        if (!current)
          return null;

        current = current[part];

      }

      return current;

    },
    changeSelectedOptionsFeature(feature, selected, options) {
      const id = this.characterId;
      const level = this.characterLevel;

      const mod = {
        ...feature,
        selectedOptions: selected,
        selectedOptionsList: options.find(s => s.key === selected) || []
      }


      this.$store.commit("characters/updateCharacterModification", { id, mod });
    },
    changeSelectedSubFeature(parentFeature, subItemKey) {

      const id = this.characterId;


      if (!parentFeature)
        return;



      const selectedOption =
        this.getSelectedOption(parentFeature);


      if (!selectedOption)
        return;



      const oldKey =
        parentFeature.selectedSubFeatureOldValue;



      const oldItem =
        selectedOption.grantedFeatures?.find(
          s => s.key === oldKey
        );



      const newItem =
        selectedOption.grantedFeatures?.find(
          s => s.key === subItemKey
        );



      /*
          Удаляем старую вложенную способность
      */

      if (oldItem) {

        this.removeFeatureEffects(
          {
            ...oldOption,

            key:
              feature.key + "-" + oldOption.key,

            level:
              feature.level,

            type:
              feature.type,

            grants:
              oldOption.grantedFeatures || []
          },
          feature
        );

      }



      /*
          Добавляем новую вложенную способность
      */

      if (newItem) {

        this.addFeatureEffects({

          ...newItem,

          key:
            parentFeature.key,

          type:
            parentFeature.type,

          level:
            parentFeature.level,


          grants:
            newItem.grantedFeatures || []

        });

      }



      /*
          сохраняем выбор
      */

      parentFeature.selectedSubFeatureOldValue =
        subItemKey;



      /*
          обновляем модификации
      */

      this.$store.commit(
        "characters/clearModification",
        {
          id,

          level:
            this.characterLevel()
        }
      );


      this.$store.commit(
        "characters/setModification",
        {
          id,

          level:
            this.characterLevel()
        }
      );

    },


    characterLevel() {
      return this.$store.getters["characters/characterLevelById"](
        this.characterId
      );
    },
    openDialogItem(item) {
      this.selectedItem = item
      this.dialogItem = true
    },
    getClassChipColor(skillKey) {
      //const rank = this.getSkillRank(skillKey);
      switch (skillKey) {
        case "U":
          return "grey";
        case "T":
          return "#171f69";
        case "E":
          return "#3c005e";
        case "M":
          return "#664400";
        case "L":
          return "#5e0000";
        default:
          return "grey";
      }
    },
    characterlabel(key) {
      switch (key) {
        case "U":
          return "Н";
        case "T":
          return "Т";
        case "E":
          return "Э";
        case "M":
          return "М";
        case "L":
          return "Л";
        default:
          return "Н";
      }
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

.preview-section {
  border-radius: 16px;
}

.preview-section {
  border-radius: 16px;
  padding: 16px;
  /* height: 100%; */
}

.preview-section>div {
  margin-bottom: 6px;
}

.preview-section h3 {
  margin-bottom: 12px;
}

.preview-title {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.2;
}


.preview-subtitle {
  opacity: .75;
  line-height: 1.5;
}


@media(max-width:600px) {

  .preview-title {
    font-size: 1.4rem;
    text-align: center;
  }

  .preview-subtitle {
    text-align: center;
  }

}

.feature-header {

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

}


@media(max-width:600px) {

  .feature-header {

    flex-direction: column;
    align-items: flex-start;

  }

}
</style>
