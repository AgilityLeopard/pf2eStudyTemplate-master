<template>
  <v-row justify="center">
    <v-progress-circular v-if="!item" indeterminate color="success" size="128" width="12" />

    <v-col v-if="item" :xs="12">
      <div class="d-flex flex-no-wrap justify-space-between mb-2">
        <div>
          <h3 class="headline">{{ item.name }}</h3>
          <h4 class="subtitle-2 grey--text">{{ item.hint }}</h4>
          <v-btn small outlined color="primary" @click="doChangeMode">
            <v-icon small>settings</v-icon>
            Сменить класс
          </v-btn>
        </div>
        <v-avatar size="96" tile><img :src="avatar" /></v-avatar>
        <div v-if="false">
          <v-avatar size="128" tile><img :src="avatar" /></v-avatar>
          <v-btn x-small text color="primary">сменить класс</v-btn>
        </div>
      </div>

      <v-divider></v-divider>

      <div class="class-block">
        <div class="two-column-holder light-red-border">
          <div class="two-column-left">
            <h3 class="exclude_from_nav">Ключевые аттрибуты</h3>
            <p class="" v-if="item.keyAbility.length > 0">
              <strong> {{ characterLabelAttribute(item.keyAbility) }}</strong>
            </p>

            <p class="" v-else="characterLabelAttributeBoost(item.attributeBoost)">
              <strong>
                {{ characterLabelAttributeBoost(item.attributeBoost) }}</strong>
            </p>
            <p class="">
              На 1-м уровне ваш класс дает вам усиление по вашему выбору
            </p>
          </div>
          <div class="two-column-right">
            <h3 class="exclude_from_nav">Хиты</h3>
            <p class="">
              <strong> {{ item.hitpoints }} + мод Телосложения</strong>
            </p>
            <p class="">
              Вы увеличиваете свое максимальное количество хитов на это число на
              1-м уровне и на каждом последующем уровне.
            </p>
          </div>
        </div>
      </div>

      <div class="class-sidebar">
        <div class="two-column-holder dark-red-border">
          <div class="two-column-left">
            <h3 class="exclude_from_nav" id="Perception">Внимательность</h3>
            <p>{{ characterlabel(item.Perception) }}</p>

            <h3 class="exclude_from_nav" id="SavingThrows">Спасброски</h3>
            <span v-for="item1 in SavingRepository">
              <p>
                {{ characterlabel(item.saving[item1.key]) }} в {{ item1.name }}
              </p>
            </span>
            <h3 class="exclude_from_nav" id="Skills">Навыки</h3>

            <p v-if="item.skillTrainedChoice.length > 0">
              <strong>Обучен в навыке (на выбор):</strong>
              {{ characterLabelSkillTrainedChoice(item.skillTrainedChoice) }}
            </p>

            <p v-if="item.skillTrained.length > 0">
              <strong>Обучен в навыке:</strong>
              {{ characterLabelSkillTrainedChoice(item.skillTrained) }}
            </p>

            <p>
              <strong>Обучен дополнительным навыкам, в кол-ве равном:</strong>
              {{ item.skillTrainedPoints }} + мод Интеллекта
            </p>
          </div>
          <div class="two-column-right">
            <h3 class="exclude_from_nav" id="attacks">Атаки</h3>
            <span v-for="item1 in WeaponRepository" v-bind:key="item1.key">
              <p v-if="item.skillAttack[item1.key]">
                {{ characterlabel(item.skillAttack[item1.key]) }} в
                {{ item1.name }}
              </p>
            </span>
            <h3 class="exclude_from_nav" id="defenses">Защиты</h3>
            <span v-for="item1 in DefenceRepository" v-bind:key="item1.key">
              <p v-if="item.skillDefence[item1.key]">
                {{ characterlabel(item.skillDefence[item1.key]) }} в
                {{ item1.name }}
              </p>
            </span>

            <h3 class="exclude_from_nav" id="ClassDC">Класс Сл</h3>
            <p>
              КС класса {{ item.name }}: {{ characterlabel(item.skillClass) }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-2 body-2 text-justify">
        <h3 class="headline">Классовые особенности</h3>
        <div v-for="feature in item.archetypeFeatures" class="text-lg-justify">
          <h3 class="main-holder split-header">
            <span class="left-header">{{ feature.name }}</span><span class="right-header">{{ feature.level }}</span>
          </h3>


          <!-- <div >
          <h3 ><span style="display: inline-block; width: 50%;">{{ feature.name }}</span><span style="display: inline-block; text-align: right; width: 50%;">Уровень {{ feature.level }}</span></h3>
          </div> -->

          <p class="main-holder">
          <div v-if="feature.description" v-html="feature.description"></div>
          <div v-if="feature.snippet" v-html="feature.snippet"></div>

          <div v-if="feature.action" v-html="feature.action.description"></div>
          </p>

          <div v-if="feature.options" class="mt-2">
            <v-select v-if="feature.type !== 'Weapon Choice'" v-model="feature.selected" :items="feature.options"
              item-value="key" item-text="name" label="" dense outlined persistent-hint
              @input="changeSelectedOption(feature, item, $event)">
            </v-select>

            <v-select v-if="feature.type === 'Weapon Choice'" v-model="feature.selected" :items="feature.options"
              item-value="key" item-text="nameGear" label="" dense outlined persistent-hint
              @input="changeSelectedOption(feature, item)">
            </v-select>


            <div v-if="feature.selected && feature.type !== 'Skill Choice' && feature.type !== 'Weapon Choice'">
              <div v-if="getSelectedOption(feature)" class="feature-option">
                <div v-for="selectedOption in [getSelectedOption(feature)]" :key="selectedOption.key">

                  <!-- Trait View -->
                  <trait-view :item="selectedOption" class="mb-2" style="font-size: 14px" />

                  <!-- Snippet -->
                  <div v-if="selectedOption.snippet" v-html="selectedOption.snippet"></div>

                  <!-- Feat -->
                  <div v-if="selectedOption.feat">
                    <strong>Черта:</strong>
                    <span v-html="selectedOption.feat"></span>
                  </div>

                  <!-- Spells -->
                  <div v-if="selectedOption.spells">
                    <strong>Заклинания:</strong>
                    <div v-for="(spells, level) in selectedOption.spells" :key="level">
                      <h3>{{ level === 0 ? 'Чары' : 'Уровень ' + level }}</h3>
                      <ul>
                        <li v-for="spell in spells" :key="spell">{{ SpellName(spell) }}</li>
                      </ul>
                    </div>
                  </div>

                  <!-- Skills -->
                  <div v-if="selectedOption.skill">
                    <strong>Навык:</strong>
                    <span>
                      {{
                        skillRepository
                          .filter(a => selectedOption.skill.includes(a.key))
                          .map(s => s.name)
                          .join(", ")
                      }}
                    </span>
                  </div>

                  <!-- SubFeatures / Nested options -->
                  <div v-if="selectedOption.subFeature">
                    <div v-if="!selectedOption.isSelected">
                      <div v-for="subItem in selectedOption.subFeature.filter(t => t.level <= characterLevel())"
                        :key="subItem.key || subItem.name">
                        <h4 class="main-holder split-header1">
                          <span class="left-header">{{ subItem.name }}</span>
                          <span class="right-header">{{ subItem.level }}</span>
                        </h4>
                        <div v-if="subItem.snippet" v-html="subItem.snippet"></div>

                        <!-- Подопции с выбором -->
                        <div v-if="subItem.options?.length">
                          <div v-for="subOpt in subItem.options" :key="subOpt.key" class="nested-option">
                            <label>
                              <input type="radio" :name="`subOption-${feature.key}-${subItem.key}`"
                                v-model="subItem.selected" :value="subOpt.key" />
                              {{ subOpt.name }}
                            </label>

                            <!-- Показываем выбранную подопцию -->
                            <div v-if="subItem.selected === subOpt.key">
                              <div v-if="subOpt.snippet" v-html="subOpt.snippet"></div>

                              <div v-if="subOpt.spells">
                                <strong>Заклинания:</strong>
                                <div v-for="(spells, lvl) in subOpt.spells" :key="lvl">
                                  <h6>{{ lvl === 0 ? 'Чары' : 'Уровень ' + lvl }}</h6>
                                  <ul>
                                    <li v-for="spell in spells" :key="spell">{{ SpellName(spell) }}</li>
                                  </ul>
                                </div>
                              </div>

                              <div v-if="subOpt.skill">
                                <strong>Навык:</strong>
                                <span>
                                  {{
                                    skillRepository
                                      .filter(a => subOpt.skill.includes(a.key))
                                      .map(s => s.name)
                                      .join(", ")
                                  }}
                                </span>
                              </div>

                              <div v-if="subOpt.focusSpell">
                                <strong>Фокусное заклинание:</strong>
                                <span>{{ SpellName(subOpt.focusSpell) }}</span>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                    <div v-else>

                      <!-- Выбор subFeature как единого варианта -->
                      <div v-if="selectedOption.subFeature?.length" class="subfeature-choice">
                        <strong>Выберите подфичу:</strong>
                        {{ selectedOption.selectedSubFeature }}

                        <div v-for="subItem in selectedOption.subFeature" :key="subItem.key" class="subfeature-option">
                          <label>
                            {{ subItem.key }}
                            <input type="radio" :name="`subFeature-${feature.key}`"
                              v-model="selectedOption.selectedSubFeature" :value="subItem.key"
                              @input="changeSelectedSubFeature(selectedOption, subItem.key)" />
                            {{ subItem.name }} (Уровень {{ subItem.level }})
                          </label>
                        </div>

                        <!-- Отображаем только выбранную подфичу -->
                        <div v-if="selectedOption.selectedSubFeature">
                          <div
                            v-for="subItem in selectedOption.subFeature.filter(s => s.key === selectedOption.selectedSubFeature)"
                            :key="subItem.key">

                            <!-- Snippet -->
                            <div v-if="subItem.snippet" v-html="subItem.snippet"></div>

                            <!-- Заклинания -->
                            <div v-if="subItem.spells">
                              <strong>Заклинания:</strong>
                              <div v-for="(spells, lvl) in subItem.spells" :key="lvl">
                                <h6>{{ lvl === 0 ? 'Чары' : 'Уровень ' + lvl }}</h6>
                                <ul>
                                  <li v-for="spell in spells" :key="spell">{{ SpellName(spell) }}</li>
                                </ul>
                              </div>
                            </div>

                            <!-- Навыки -->
                            <div v-if="subItem.skill">
                              <strong>Навык:</strong>
                              <span>
                                {{
                                  skillRepository
                                    .filter(a => subItem.skill.includes(a.key))
                                    .map(s => s.name)
                                    .join(", ")
                                }}
                              </span>
                            </div>

                            <!-- Фокусное заклинание -->
                            <div v-if="subItem.focusSpell">
                              <strong>Фокусное заклинание:</strong>
                              <span>{{ SpellName(subItem.focusSpell) }}</span>
                            </div>

                          </div>
                        </div>
                      </div>


                    </div>
                  </div>

                </div>
              </div>
            </div>




            <div v-if="feature.selected && feature.type === 'Weapon Choice'">
              <div>
                <div v-if="
                  feature.options.find((s) => s.key === feature.selected)
                    .description
                " v-html="feature.options.find((s) => s.key === feature.selected)
                  .description
                  "></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
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

export default {
  name: "archetype-manage",
  components: { ArchetypePreview, traitView },
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
    getSelectedOption(feature) {
      const opt = feature.options?.find(o => o.key === feature.selected);

      if (!opt) return null;
      // if (feature.selectedSubFeature) {
      //   this.$set(opt, "selectedSubFeature", opt.selectedSubFeature);
      //   console.log(opt.selectedSubFeature)
      // }

      console.log(opt)
      return opt;
      // return feature.options?.find(o => o.key === feature.selected);
    },
    SpellName(spell) {
      const spell1 = this.textToKebab(spell);
      return this.psychicPowersList.find(s => s.key === spell1)?.name || '';
    },
    characterlabel(key) {
      switch (key) {
        case "U":
          return "Нетренирован";
        case "T":
          return "Тренирован";
        case "E":
          return "Эксперт";
        case "M":
          return "Мастер";
        case "L":
          return "Легенда";
        default:
          break;
      }
    },
    async getPsychicPowers(sources) {
      const config = {
        params: { source: this.sources.join(','), },
      };
      this.loading = true;
      const { data } = await this.$axios.get('/api/psychic-powers/');
      this.loading = false;

      this.psychicPowersList = data;
    },
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
                // ab.selectedSubFeature = enc.find((t) => sub.includes(t.key))
                //   ? enc.find((t) => sub.includes(t.key)).key
                //   : "";
                // ab.selectedSubFeatureOldValue = enc.find((t) => sub.includes(t.key))
                //   ? enc.find((t) => sub.includes(t.key)).key
                //   : "";

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
    // async getDeityList(sources) {
    //   const config = {
    //     params: {
    //       source: sources.join(","),
    //     },
    //   };
    //   const { data } = await this.$axios.get("/api/deity/", config.source);
    //   data.forEach((t) => (t.key = t.key.toLowerCase()));
    //   // this.deityList = data;
    // },
    // enrichArchetypeFeatures(archetype) {
    //   archetype.archetypeFeatures
    //     .filter((feature) => feature.options)
    //     .forEach((feature) => {
    //       const enhancements = this.enhancements.filter((modifier) =>
    //         modifier.source.startsWith(`archetype.${feature.name}`)
    //       );
    //       if (enhancements) {
    //         enhancements.forEach((e) => {
    //           let foundInd = /\.(\d)\./.exec(e.source);
    //           if (foundInd) {
    //             feature.selected[foundInd[1]] = e.source.split(".").pop();
    //           }
    //         });
    //       } else {
    //         const enhancement = this.enhancements.find((modifier) =>
    //           modifier.source.startsWith(`archetype.${feature.name}`)
    //         );
    //         if (enhancement) {
    //           feature.selected = enhancement.source.split(".").pop();
    //         }
    //       }
    //     });

    //   const featuresWithPowers = archetype.archetypeFeatures.filter(
    //     (f) => f.psychicPowers !== undefined
    //   );
    //   if (featuresWithPowers) {
    //     featuresWithPowers.forEach((feature) => {
    //       feature.psychicPowers.forEach((powerSelections) => {
    //         this.getPsychicPowerOptions(powerSelections);
    //         const found = this.psychicPowers.find(
    //           (p) =>
    //             p.source && p.source === `archetype.${powerSelections.name}`
    //         );
    //         if (found) {
    //           powerSelections.selected = found.name;
    //         } else {
    //           console.warn(`No Power found for ${powerSelections.name}.`);
    //         }
    //       });
    //     });
    //   }

    //   return archetype;
    // },
    doChangeMode() {
      this.$router.push({
        name: "forge-characters-id-builder-archetype-choose",
        params: { id: this.characterId },
      });
    },

    /**
     *
     * @param placeholder {name:String, options:[]}
     * @param selection String
     */
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
      let newSubItem
      let oldSubItem



      // Найти новый и старый выбранные subFeature
      if (subItemKey)
        newSubItem = parentFeature.subFeature.find(s => s.key === subItemKey);
      if (parentFeature.selectedSubFeature)
        oldSubItem = parentFeature.subFeature.find(s => s.key === parentFeature.selectedSubFeatureOldValue);

      if (newSubItem) {
        const mod = {
          key: parentFeature.key,
          Subfeature: true,
          type: newSubItem.type,
          selected: newSubItem.key,
          value: newSubItem.value,
          level: newSubItem.level,
          source: "archetype",
        };

        this.$store.commit("characters/clearCharacterClassModFeature", { id, content: mod });
        this.$store.commit("characters/addCharacterClassModFeature", { id, content: mod });
      }


      // =========================
      // Удаляем старую подфичу
      // =========================
      if (oldSubItem) {
        // 1) Focus spell
        if (oldSubItem.focusSpell) {
          this.$store.commit("characters/removeCharacterFocusSpell", {
            id,
            key: this.textToKebab(oldSubItem.focusSpell),
            featureKey: parentFeature.key,
            type: parentFeature.type,
            source: "archetype"
          });
        }

        // 2) Skills
        if (oldSubItem.skill) {
          const list = Array.isArray(oldSubItem.skill) ? oldSubItem.skill : [oldSubItem.skill];
          list.forEach(s => {
            this.$store.commit("characters/removeSkillSheetSelected", {
              id,
              key: s,
              level: parentFeature.level,
              selected: parentFeature.selectedSubFeatureOldValue,
              type: "class",
              optional: true
            });
            this.$store.commit("characters/removeSkillSheet", {
              id,
              key: s,
              level: parentFeature.level,
              type: "skill",
              optional: true
            });
          });
        }

        // 3) Spell traditions
        if (oldSubItem.spellTraditions) {
          this.$store.commit("characters/clearCharacterSpellTraditions", { id });
        }

        // 3.1) Spells
        if (oldSubItem.spellTraditions) {
          this.$store.commit("characters/clearCharacterSpell", { id });
        }

        // 4) Trait
        if (oldSubItem.trait) {
          this.$store.commit("characters/clearCharacterKeywordsByType", {
            id,
            type: "sanctification",
            cascade: true
          });
        }

        // 5) Modifications
        if (oldSubItem.modification) {
          this.$store.commit("characters/removeCharacterModificationByFeature", {
            id,
            featureKey: parentFeature.key
          });
        }
      }

      // =========================
      // Добавляем новую подфичу
      // =========================
      if (!newSubItem) return;

      // 1) Focus spell
      if (newSubItem.focusSpell) {
        this.$store.commit("characters/addCharacterFocusSpell", {
          id,
          key: this.textToKebab(newSubItem.focusSpell),
          featureKey: parentFeature.key,
          type: parentFeature.type,
          source: "archetype"
        });
      }

      // 2) Skills
      if (newSubItem.skill) {
        const list = Array.isArray(newSubItem.skill) ? newSubItem.skill : [newSubItem.skill];
        list.forEach(s => {
          this.$store.commit("characters/addSkillSheet", {
            id,
            key: s,
            level: parentFeature.level,
            type: "class",
            optional: true,
            selected: newSubItem.key,
            combinded: false
          });
        });
      }

      // 3) Spell traditions
      if (newSubItem.spellTraditions) {
        this.$store.commit("characters/setCharacterSpellTraditions", {
          id,
          value: newSubItem.spellTraditions
        });
      }

      // 3) Spell traditions
      if (newSubItem.spells) {
        this.$store.commit("characters/setCharacterSpell", {
          id,
          value: newSubItem.spells
        });
      }

      // 4) Trait
      if (newSubItem.trait && newSubItem.trait !== "Без") {
        this.$store.commit("characters/addCharacterKeyword", {
          id,
          keyword: {
            name: newSubItem.trait,
            source: "archetype",
            type: "sanctification"
          }
        });
      }

      // 5) Modifications
      if (newSubItem.modification) {
        const second = this.item.archetypeFeatures.find(s => s.key === "Second Path")?.selected;
        const first = this.item.archetypeFeatures.find(s => s.key === "Perfection Path")?.selected;
        const match2 = second ? second.match(/^\D+/)[0] : "";
        const matchNew = newSubItem.key.match(/^\D+/)[0];

        this.$store.commit("characters/removeCharacterModificationByFeature", {
          id,
          featureKey: parentFeature.key
        });

        if (parentFeature.key !== "Third Path" || matchNew === match2 || matchNew === first) {
          this.$store.commit("characters/addCharacterModifications", {
            id,
            content: {
              modifications: [{ ...newSubItem.modification, featureKey: parentFeature.key }],
              source: "archetype"
            }
          });
        }

        this.$store.commit("characters/clearModification", { id, level });
        this.$store.commit("characters/setModification", { id, level });
      }

      // =========================
      // Финализация: сохраняем выбранную подфичу
      // =========================
      parentFeature.selectedSubFeatureOldValue = subItemKey;
      console.log(parentFeature)
    },


    characterLevel() {
      return this.$store.getters["characters/characterLevelById"](
        this.characterId
      );
    },
    getPsychicPowerOptions(psychicPowerSelection) {
      const config = {
        params: {
          ...psychicPowerSelection.query,
          fields: "id,name,effect,discipline",
        },
      };

      this.$axios.get("/api/psychic-powers/", config).then((response) => {
        psychicPowerSelection.options = response.data;
      });
    },
  },
};
</script>

<style scoped>
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
</style>
