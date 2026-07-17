<template lang="html">
  <v-row justify="center">
    <h3 class="headline">
      Выберите характеристики и навыки
    </h3>
    <v-expansion-panels multiple>
      <v-expansion-panel class="ui-panel" v-for="level in characterLevel" :key="level">
        <v-expansion-panel-header class="ui-panel-header">
          <div class="ui-panel-header__title">
            <span>
              {{ level }}
            </span>
            <span class="ui-panel-level">
              уровень
            </span>
          </div>
          <v-chip class="ui-chip ui-chip--progress" style="flex:none" right pill>
            {{ levelProgressMap[level]?.current || 0 }}
            /
            {{ levelProgressMap[level]?.max || 0 }}
          </v-chip>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="ui-panel-content">
          <div class="ui-section">
            <!-- ========================= -->
            <!-- LEVEL 1 INITIAL CHOICES -->
            <!-- ========================= -->
            <template v-if="level === 1">
              <!-- ========================================= -->
              <!-- НАСЛЕДИЕ -->
              <!-- ========================================= -->

              <v-card v-if="species" outlined class="ui-choice-card mb-4">

                <div class="ui-section-header">
                  Наследие
                </div>

                <v-card-text>

                  <!-- Автоматические бонусы -->

                  <div class="caption mb-2 grey--text text--darken-1">
                    Особенности наследия
                  </div>

                  <div class="boost-list mb-4">

                    <v-chip v-for="attr in attributeRepository" :key="'ancestry-info-' + attr.key" outlined small
                      class="ma-1" :class="{
                        'chip-boost': isAncestryBoost(attr.key),
                        'chip-flaw': isAncestryFlaw(attr.key)
                      }">

                      <v-icon v-if="isAncestryBoost(attr.key)" left small>
                        mdi-check-circle
                      </v-icon>

                      <v-icon v-else-if="isAncestryFlaw(attr.key)" left small>
                        mdi-minus-circle
                      </v-icon>

                      {{ attr.name }}

                    </v-chip>

                  </div>


                  <!-- Первое повышение -->

                  <div class="caption mb-2">
                    Свободное повышение
                  </div>

                  <div class="boost-list mb-4">

                    <v-chip-group v-model="selectedAncestryBoost" active-class="primary white--text"
                      @change="updateSelect">

                      <v-chip v-for="attr in attributeRepository" :key="'ancestry-choice-1-' + attr.key" outlined
                        :value="attr.key" :disabled="!isAncestryAvailable(
                          attr.key,
                          AncestryAttribute
                        )
                          ||
                          attr.key === selectedAncestryBoost2
                          " :class="{
                            'ui-chip--locked':
                              !AncestryAttribute.some(
                                a => a.key === attr.key
                              )
                          }">

                        <v-icon v-if="!AncestryAttribute.some(
                          a => a.key === attr.key
                        )" left small>
                          mdi-lock
                        </v-icon>

                        {{ attr.name }}

                      </v-chip>

                    </v-chip-group>

                  </div>


                  <!-- Второе повышение -->

                  <template v-if="boost === 2">

                    <div class="caption mb-2">
                      Второе свободное повышение
                    </div>

                    <div class="boost-list">

                      <v-chip-group v-model="selectedAncestryBoost2" active-class="primary white--text"
                        @change="updateSelect2">

                        <v-chip v-for="attr in attributeRepository" :key="'ancestry-choice-2-' + attr.key" outlined
                          :value="attr.key" :disabled="!isAncestryAvailable(
                            attr.key,
                            AncestryAttribute2
                          )
                            ||
                            attr.key === selectedAncestryBoost
                            " :class="{
                              'ui-chip--locked':
                                !AncestryAttribute2.some(
                                  a => a.key === attr.key
                                )
                            }">

                          <v-icon v-if="!AncestryAttribute2.some(
                            a => a.key === attr.key
                          )" left small>
                            mdi-lock
                          </v-icon>

                          {{ attr.name }}

                        </v-chip>

                      </v-chip-group>

                    </div>

                  </template>

                </v-card-text>

              </v-card>

              <div v-else class="ui-message ui-message--warning mb-4">
                Выберите наследие
              </div>


              <!-- ========================================= -->
              <!-- ПРЕДЫСТОРИЯ -->
              <!-- ========================================= -->

              <v-card v-if="ascension" outlined class="ui-choice-card mb-4">

                <div class="ui-section-header">
                  Предыстория
                </div>

                <v-card-text>



                  <!-- Выбор -->

                  <div class="caption mb-2">
                    Свободное повышение
                  </div>

                  <div class="boost-list mb-4">

                    <v-chip-group v-model="selectedBackgroundBoost" active-class="primary white--text"
                      @change="updateSelectBackground">

                      <v-chip v-for="attr in attributeRepository" :key="'background-choice-1-' + attr.key" outlined
                        :value="attr.key" :disabled="!BackgroundAttribute.some(
                          a => a.key === attr.key
                        )
                          ||
                          attr.key === selectedBackgroundBoost2
                          " :class="{
                            'ui-chip--locked':
                              !BackgroundAttribute.some(
                                a => a.key === attr.key
                              )
                          }">

                        <v-icon v-if="
                          !BackgroundAttribute.some(
                            a => a.key === attr.key
                          )
                        " left small>
                          mdi-lock
                        </v-icon>

                        {{ attr.name }}

                      </v-chip>

                    </v-chip-group>

                  </div>

                  <!-- Второй выбор -->

                  <div class="caption mb-2">
                    Второе свободное повышение
                  </div>

                  <div class="boost-list">

                    <v-chip-group v-model="selectedBackgroundBoost2" active-class="primary white--text"
                      @change="updateSelectBackground2">

                      <v-chip v-for="attr in attributeRepository" :key="'background-choice-2-' + attr.key" outlined
                        :value="attr.key" :disabled="!BackgroundAttribute2.some(
                          a => a.key === attr.key
                        )
                          ||
                          attr.key === selectedBackgroundBoost
                          " :class="{
                            'ui-chip--locked':
                              !BackgroundAttribute2.some(
                                a => a.key === attr.key
                              )
                          }">

                        <v-icon v-if="
                          !BackgroundAttribute2.some(
                            a => a.key === attr.key
                          )
                        " left small>
                          mdi-lock
                        </v-icon>

                        {{ attr.name }}

                      </v-chip>

                    </v-chip-group>

                  </div>

                </v-card-text>

              </v-card>

              <div v-else class="ui-message ui-message--warning mb-4">
                Выберите предысторию
              </div>

              <!-- ========================================= -->
              <!-- КЛАСС -->
              <!-- ========================================= -->

              <v-card v-if="archetype" outlined class="ui-choice-card mb-4">

                <div class="ui-section-header">
                  Класс — {{ archetype.name }}
                </div>

                <v-card-text>

                  <!-- ================================= -->
                  <!-- Ключевая характеристика -->
                  <!-- ================================= -->

                  <template>

                    <div v-if="archetype.keyAbility.length === 1" class="boost-list">

                      <v-chip v-for="attr in attributeRepository" :key="'class-' + archetype.id + '-' + attr.key" small
                        outlined :class="{
                          'chip-boost':
                            archetype.keyAbility.length
                              ? archetype.keyAbility.includes(attr.key)
                              : archetype.attributeBoost.some(a => a.key === attr.key)
                        }">

                        <v-icon v-if="
                          archetype.keyAbility.length
                            ? archetype.keyAbility.includes(attr.key)
                            : archetype.attributeBoost.some(a => a.key === attr.key)
                        " left small>
                          mdi-check-circle
                        </v-icon>

                        {{ attr.name }}

                      </v-chip>

                    </div>

                    <div v-else class="boost-list">

                      <v-chip-group v-model="selectedClassBoost" active-class="primary white--text"
                        @change="updateSelectClassAttribute">

                        <v-chip v-for="attr in attributeRepository" :key="'background-choice-1-' + attr.key" outlined
                          :value="attr.key" :disabled="!ClassAttribute.some(
                            a => a.key === attr.key
                          )

                            " :class="{
                              'ui-chip--locked':
                                !ClassAttribute.some(
                                  a => a.key === attr.key
                                )
                            }">

                          <v-icon v-if="
                            !ClassAttribute.some(
                              a => a.key === attr.key
                            )
                          " left small>
                            mdi-lock
                          </v-icon>

                          {{ attr.name }}

                        </v-chip>

                      </v-chip-group>

                    </div>
                  </template>

                  <!-- ================================= -->
                  <!-- Навык класса -->
                  <!-- ================================= -->

                  <template v-if="archetype.skillTrainedChoice.length > 1">

                    <div class="caption mb-2">
                      Навык класса
                    </div>

                    <div class="boost-list">

                      <v-chip-group v-model="selectedClassSkill" active-class="primary white--text"
                        @change="updateSelectClassSkill">

                        <v-chip v-for="skill in finalSkillRepository" :key="'class-skill-' + skill.key" outlined
                          :value="skill.key" :disabled="!ClassSkill.some(
                            s => s.key === skill.key
                          ) || selectedBackgroundSkill === skill.key" :class="{
                            'ui-chip--locked':
                              !ClassSkill.some(
                                s => s.key === skill.key
                              )
                          }">

                          <v-icon v-if="!ClassSkill.some(
                            s => s.key === skill.key
                          )" left small>
                            mdi-lock
                          </v-icon>

                          {{ skill.name }}

                        </v-chip>

                      </v-chip-group>

                    </div>

                  </template>

                  <!-- Если выбора нет -->

                  <!-- <div v-if="
                    archetype.keyAbility.length <= 1
                    &&
                    archetype.skillTrainedChoice.length <= 1
                  " class="grey--text">

                    У данного класса нет выбора характеристик или навыков.

                  </div> -->

                </v-card-text>

              </v-card>

              <div v-else class="ui-message ui-message--warning mb-4">
                Выберите класс
              </div>

              <!-- ========================================= -->
              <!-- СТАРТОВЫЕ ПОВЫШЕНИЯ -->
              <!-- ========================================= -->

              <v-card v-if="isBoostLevel(1) && archetype" outlined class="ui-choice-card mb-4">



                <div class="ui-section-header">
                  Стартовые повышения
                </div>

                <!-- <v-chip small class="ui-chip">
                  {{ currentBoost }} / 4
                </v-chip> -->


                <v-card-text>

                  <div v-if="isBoostLevel(level)" class="ui-choice-block">

                    <div class="ui-choice-header">
                      <span class="ui-choice-label">
                        Выберите четыре характеристики
                      </span>

                    </div>

                    <v-chip-group multiple class="boost-list">

                      <v-chip v-for="attribute in attributeRepository"
                        :key="'level-boost-' + level + '-' + attribute.key" outlined
                        :disabled="isAttributeDisabledLevel(attribute.key, level)" :class="{
                          'ui-chip--selected':
                            isAttributeUpgradedLevel(attribute.key, level)
                        }" @click="handleAttributeClickLevel(attribute.key, level)">

                        {{ attribute.name }}



                      </v-chip>

                    </v-chip-group>

                  </div>



                </v-card-text>
                <v-btn v-if="isSkillLevel(level)" outlined class="ui-btn ui-btn--accent" @click="openSkillLevel(level)">
                  Повышение навыков

                  <v-chip v-if="characterProgressionSkill(level) > 0" class="ui-chip" color="success" pill>
                    {{ characterProgressionSkill(level) }}
                  </v-chip>

                  <v-chip v-else-if="characterProgressionSkill(level) < 0" color="error" text-color="white" pill>
                    −{{ Math.abs(characterProgressionSkill(level)) }}
                  </v-chip>
                </v-btn>
              </v-card>
            </template>




            <!-- ========================= -->
            <!-- OTHER LEVELS -->
            <!-- ========================= -->
            <template v-if="
              level !== 1
              &&
              archetype
            ">
              <!-- <v-btn v-if="isBoostLevel(level)" outlined class="ui-btn ui-btn--accent" @click="openBoostDialog(level)">
                Повышение атрибутов
                <v-chip v-if="characterProgressionBoost(level)" class="ui-chip" pill>
                  {{ characterProgressionBoost(level) }}
                </v-chip>
              </v-btn> -->

              <div v-if="isBoostLevel(level)" class="ui-choice-block">

                <div class="ui-choice-label">
                  Выберите четыре характеристики
                </div>

                <div class="boost-list">

                  <v-chip-group multiple>

                    <v-chip v-for="attribute in attributeRepository" :key="'level-' + level + '-' + attribute.key"
                      outlined :disabled="isAttributeDisabledLevel(attribute.key, level)" :class="{
                        'ui-chip--selected':
                          isAttributeUpgradedLevel(attribute.key, level)
                      }" @click="handleAttributeClickLevel(attribute.key, level)">

                      {{ attribute.name }}


                    </v-chip>

                  </v-chip-group>

                </div>


              </div>

              <v-btn v-if="isSkillLevel(level)" outlined class="ui-btn ui-btn--accent" @click="openSkillLevel(level)">
                Повышение навыков

                <v-chip v-if="characterProgressionSkill(level) > 0" class="ui-chip" color="success" pill>
                  {{ characterProgressionSkill(level) }}
                </v-chip>

                <v-chip v-else-if="characterProgressionSkill(level) < 0" color="error" text-color="white" pill>
                  −{{ Math.abs(characterProgressionSkill(level)) }}
                </v-chip>
              </v-btn>
            </template>
            <div v-if="!archetype" class="ui-message ui-message--warning">
              Для повышения атрибутов и навыков выберите класс
            </div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- ========================= -->
    <!-- ATTRIBUTE BOOST DIALOG -->
    <!-- ========================= -->
    <v-dialog v-model="boostDialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="600px" scrollable>
      <v-card>
        <v-card-title class="ui-dialog-header">
          Повышение атрибутов
          ({{ currentLevel }} уровень)
          <v-spacer />
          <v-icon @click="boostDialog = false">
            close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <div class="ui-section-header">
            Свободные повышения:
            {{ 4 - currentBoost }}
          </div>
          <v-simple-table class="ui-table">
            <tbody>
              <tr v-for="attribute in attributeRepository" :key="attribute.key" class="ui-row" :class="{
                'ui-row--disabled':
                  isAttributeDisabledLevel(
                    attribute.key,
                    currentLevel
                  ),
                'ui-row--active':
                  isAttributeUpgradedLevel(
                    attribute.key,
                    currentLevel
                  )
              }" @click="
                handleAttributeClickLevel(
                  attribute.key,
                  currentLevel
                )
                ">
                <td class="ui-cell ui-cell--name">
                  {{ attribute.name }}
                </td>
                <td class="ui-cell ui-cell--mod">
                  {{ ModProfAttr(
                    attribute.key,
                    currentLevel
                  ) }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- ========================= -->
    <!-- SKILL LEVEL DIALOG -->
    <!-- ========================= -->
    <v-dialog v-model="dialogSkill" :fullscreen="$vuetify.breakpoint.xsOnly" width="600px" scrollable>
      <v-card>
        <v-card-title class="ui-dialog-header">
          Повышение навыков
          ({{ skillLevel }} уровень)
          <v-spacer />
          <v-icon tabindex="-1" @click.stop="dialogSkill = false">
            close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-4">
          <v-card>
            <div class="ui-section-header">
              Количество свободных очков навыка:
              {{
                // 1
                // +
                // modInt(skillLevel)
                // -
                // skillSheetAll("", skillLevel)
                calculateSkillProgressMax(skillLevel) - calculateSkillProgress(skillLevel)
              }}
            </div>
            <div class="skill-list">
              <v-card v-for="skill in finalSkillRepository" :key="skill.key" outlined class="skill-card" :class="{
                'skill-card--disabled':
                  isSkillDisabledLevel(
                    skill,
                    skillLevel
                  ),
                'skill-card--active':
                  isSkillUpgradedLevel(
                    skill,
                    skillLevel
                  )
              }" @click="
                handleSkillClickLevel(
                  skill,
                  skillLevel
                )
                ">

                <div class="skill-card__main">
                  <div class="skill-name">
                    {{ skill.name }}
                  </div>
                  <div class="skill-value">
                    {{
                      (
                        ModAttribute(
                          skill.attribute,
                          skill.key,
                          skillLevel
                        )
                          >= 0
                          ? '+'
                          : ''
                      )
                      +
                      ModAttribute(
                        skill.attribute,
                        skill.key,
                        skillLevel
                      )
                    }}
                  </div>
                </div>
                <div class="skill-meta">
                  <v-chip small outlined>
                    {{
                      attributeRepository.find(
                        i => i.key === skill.attribute
                      )?.short
                    }}
                  </v-chip>
                  <v-chip small outlined>
                    Владение:
                    {{
                      ModProf(
                        skill.attribute,
                        skill.key,
                        skillLevel
                      )
                    }}
                  </v-chip>
                  <v-chip small outlined>
                    {{
                      skillSheetTrained(
                        skill.key,
                        skillLevel
                      )
                    }}
                  </v-chip>
                  <v-icon v-if="skill.custom && skill.optional !== true" small class="skill-delete" @click.stop="
                    removeCustomSkill(
                      skill.key
                    )
                    ">
                    mdi-delete
                  </v-icon>
                </div>
              </v-card>
            </div>
            <v-card-actions style="justify-content:center">
              <v-btn x-small text @click="openSkillsSettings(skillLevel)">
                Дополнительное Знание
                <v-icon small>
                  settings
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- ========================= -->
    <!-- CUSTOM SKILL DIALOG -->
    <!-- ========================= -->
    <v-dialog v-model="skillsEditorDialog" width="600px" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card>
        <v-alert :value="alert" type="error" text dense border="left">
          Знание уже существует
        </v-alert>
        <v-alert :value="calculateSkillProgressMax(skillLevel) - calculateSkillProgress(skillLevel) <= 0" type="info"
          text dense border="left">
          Недостаточно очков навыка для добавления нового знания
        </v-alert>
        <v-card-title class="ui-dialog-header">
          Редактирование знаний
          <v-spacer />
          <v-icon @click="closeSkillsSettings">
            close
          </v-icon>
        </v-card-title>
        <v-card-text class="pt-4">
          <v-text-field v-model="customSkill.name" dense label="Имя знания" />
          <v-textarea v-model="customSkill.description" dense label="Описание" />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn small class="ui-btn ui-btn--accent"
            :disabled="calculateSkillProgressMax(skillLevel) - calculateSkillProgress(skillLevel) <= 0"
            @click="saveCustomSkill(skillLevel)">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script lang="js">
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import SluggerMixin from '~/mixins/SluggerMixin';
export default {
  name: 'Stats',
  layout: 'forge',
  mixins: [
    StatRepositoryMixin,
    SluggerMixin
  ],
  async asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      attributeHeaders: [
        { text: 'Характеристика', sortable: false, align: 'left', class: 'text-left small pa-1' },
        { text: 'Значение', sortable: false, align: 'center', class: 'text-center small pa-1' },
        { text: 'Модификатор', sortable: false, align: 'center', class: 'text-center small pa-1' },
      ],
      skillHeaders: [
        { text: 'Навык', value: 'key', align: 'left', class: 'text-left small pa-1' },
        { text: 'Модификатор', value: 'name', align: 'center', class: 'text-center small pa-1' },
        { text: 'Владение', value: 'attribute', align: 'center', class: 'text-center small pa-1' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      headers: [
        { text: "Навык", value: "name", sortable: false },
        { text: "", value: "decrement", sortable: false },
        { text: "Значение", value: "value", sortable: false },
        { text: "", value: "increment", sortable: false },
        { text: "", value: "delete", sortable: false }
      ],
      alert: false,
      dialogSkill: false,
      modifications: [],
      skillLevel: 1,
      skillsEditorDialog: false,
      selectedAncestryBoost: undefined,
      selectedClassBoost: undefined,
      selectedClassSkill: undefined,
      selectedBackgroundSkill: undefined,
      selectedAncestryBoost2: undefined,
      selectedBackgroundBoost: undefined,
      selectedBackgroundBoost2: undefined,
      selectedBoost: {},
      customSkill: {
        key: undefined,
        name: 'Знание',
        attribute: 'intellect',
        description: '',
      },
      saveTimer: undefined,
      selectedId: undefined,
      showAlerts: false,
      archetype: undefined,
      species: undefined,
      ascension: undefined,
      loading: false,
      select: {},
      AncestryAttribute: [],
      AncestryAttribute2: [],
      ClassAttribute: [],
      BackgroundAttribute: [],
      BackgroundAttribute2: [],
      boost: 0,
      SkillsTrained: {
        U: 0,
        T: 2,
        E: 4,
        M: 6,
        L: 8,
      },
      SkillsLenght: {
        U: 0,
        T: 1,
        E: 2,
        M: 3,
        L: 4
      },
      charSkill: {
        0: "U",
        1: "T",
        2: "E",
        3: "M",
        4: "L",
      },
      boostDialog: false,
      currentLevel: null,
    };
  },
  head() {
    return {
      title: 'Повышение характеристик и навыков',
    };
  },
  computed: {
    tableRows() {
      return [
        {
          source: 'Предыстория',
          stats: this.characterBackgroundBoost || {}
        },
        {
          source: 'Наследие',
          stats: this.mergeStats(
            this.characterAncestryBoost || {},
            this.characterAttributesAncestryFlaw || {}
          )
        },
        {
          source: 'Класс',
          stats: this.characterClassBoost1 || {}
        },
        {
          source: '1 уровень',
          stats: this.characterAttributeBoost || {}
        },
        {
          source: '5 уровень',
          stats: this.characterAttributeBoost5 || {}
        },
        {
          source: '10 уровень',
          stats: this.characterAttributeBoost10 || {}
        },
        {
          source: '15 уровень',
          stats: this.characterAttributeBoost15 || {}
        },
        {
          source: '20 уровень',
          stats: this.characterAttributeBoost20 || {}
        },
      ];
    },
    availableLevels() {
      return Array.from({ length: this.characterLevel }, (_, i) => i + 1)
    },
    currentBoost() {
      if (!this.currentLevel) {
        return 0;
      }
      return this.getBoost(
        this.currentLevel
      );
    },
    archetypePrerequisitesValid() {
      const archetype = this.archetype;
      let fulfilled = true;
      if (archetype && archetype.prerequisites.length > 0) {
        archetype.prerequisites.forEach((prerequisite) => {
          switch (prerequisite.group) {
            case 'attributes':
              const attributeValue = this.characterAttributesEnhanced[prerequisite.value];
              if (attributeValue < prerequisite.threshold) {
                fulfilled = false;
              }
              break;
            case 'skills':
              const skillValue = this.characterSkills[prerequisite.value];
              if (skillValue < prerequisite.threshold) {
                fulfilled = false;
              }
              break;
          }
        });
      }
      if (this.ascensionPackages) {
        // this.ascensionPackages.
      }
      return fulfilled;
    },
    freeSkillPointsLvl1() {
      return (
        this.characterSkillPointClass +
        this.modInt(1) -
        this.skillSheetPoints("", 1)
      )
    },
    levelProgressMap() {
      const map = {};
      for (
        let lvl = 1;
        lvl <= this.characterLevel;
        lvl++
      ) {
        map[lvl] = {
          current: this.calculateProgress(lvl),
          max: this.calculateProgressMax(lvl)
        };
      }
      return map;
    },
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
    characterClassBoost1() {
      return this.$store.getters['characters/characterAttributesClassBoost'](this.characterId);
    },
    characterAttributeBoost() {
      return this.$store.getters['characters/characterAttributeBoost'](this.characterId);
    },
    characterAttributeBoost5() {
      return this.$store.getters['characters/characterAttributeBoost5'](this.characterId);
    },
    characterAttributeBoost10() {
      return this.$store.getters['characters/characterAttributeBoost10'](this.characterId);
    },
    characterAttributeBoost15() {
      return this.$store.getters['characters/characterAttributeBoost15'](this.characterId);
    },
    characterAttributeBoost20() {
      return this.$store.getters['characters/characterAttributeBoost20'](this.characterId);
    },
    characterAncestryBoost() {
      return this.$store.getters['characters/characterAncestryBoostById'](this.characterId);
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterAscensionKey() {
      return this.$store.getters["characters/characterAscensionPackagesById"](
        this.characterId
      );
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterAttributeCosts() {
      return this.$store.getters['characters/characterAttributeCostsById'](this.characterId);
    },
    characterAttributesClass() {
      return this.$store.getters['characters/characterAttributesClassBoost'](this.characterId);
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterSkillTableLevel() {
      return this.$store.getters['characters/characterSkillTableLevelById'](this.characterId);
    },
    CharacterskillInitial() {
      return this.$store.getters['characters/CharacterskillInitialById'](this.characterId);
    },
    characterBoostByLevel() {
      return {
        1: this.$store.getters['characters/characterBoostById'](this.characterId),
        5: this.$store.getters['characters/characterBoost5ById'](this.characterId),
        10: this.$store.getters['characters/characterBoost10ById'](this.characterId),
        15: this.$store.getters['characters/characterBoost15ById'](this.characterId),
        20: this.$store.getters['characters/characterBoost20ById'](this.characterId),
      };
    },
    boostByLevel() {
      return this.characterBoostByLevel;
    },
    attributeBoostByLevel() {
      return {
        1: this.characterAttributesBoost || {},
        5: this.characterAttributesBoost5 || {},
        10: this.characterAttributesBoost10 || {},
        15: this.characterAttributesBoost15 || {},
        20: this.characterAttributesBoost20 || {}
      };
    },
    characterSkillPoints() {
      return this.$store.getters['characters/characterSkillPointsById'](this.characterId);
    },
    characterLevel() {
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    characterBackgroundBoost() {
      return this.$store.getters['characters/characterBackgroundBoostId'](this.characterId);
    },
    characterBackground2Boost() {
      return this.$store.getters['characters/characterBackgroundBoost2IdById'](this.characterId);
    },
    characterAncestryFreeBoost() {
      return this.$store.getters['characters/characterAncestryFreeBoostById'](this.characterId);
    },
    characterAncestryFreeBoost2() {
      return this.$store.getters['characters/characterAncestryFreeBoost2ById'](this.characterId);
    },
    characterBackgroundFreeBoost() {
      return this.$store.getters['characters/characterBackgroundFreeBoostById'](this.characterId);
    },
    characterClassBoost() {
      return this.$store.getters['characters/characterClassBoostById'](this.characterId);
    },
    characterClassSkill() {
      return this.$store.getters['characters/characterClassSkillById'](this.characterId);
    },
    characterTrainedSkillClass() {
      return this.$store.getters['characters/characterTrainedSkillClassById'](this.characterId);
    },
    enhancements() {
      return this.$store.getters["characters/characterEnhancementsById"](
        this.characterId
      );
    },
    characterBackgroundFreeBoost2() {
      return this.$store.getters['characters/characterBackgroundFreeBoost2ById'](this.characterId);
    },
    characterAttributesBoost() {
      return this.$store.getters['characters/characterAttributeBoost'](this.characterId);
    },
    characterAttributesBoost5() {
      return this.$store.getters['characters/characterAttributeBoost5'](this.characterId);
    },
    characterAttributesBoost10() {
      return this.$store.getters['characters/characterAttributeBoost10'](this.characterId);
    },
    characterAttributesBoost15() {
      return this.$store.getters['characters/characterAttributeBoost15'](this.characterId);
    },
    characterSkillPointClass() {
      return this.$store.getters['characters/characterSkillPointsClassId'](this.characterId);
    },
    characterSkillPointClassUp() {
      return this.$store.getters['characters/characterSkillPointsClassUpId'](this.characterId);
    },
    characterSkillPointBackground() {
      return this.$store.getters['characters/characterSkillPointsBackgroundId'](this.characterId);
    },
    characterAttributesBoost20() {
      return this.$store.getters['characters/characterAttributeBoost20'](this.characterId);
    },
    characterAttributesEnhanced() {
      return this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
    characterPerseption() {
      return this.$store.getters['characters/characterPerseptionById'](this.characterId);
    },
    characterSaving() {
      return this.$store.getters['characters/characterSavingById'](this.characterId);
    },
    characterSkillClass() {
      return this.$store.getters['characters/characterSkillClassById'](this.characterId);
    },
    characterTraits() {
      return this.$store.getters['characters/characterTraitsById'](this.characterId);
    },
    characterTraitsEnhanced() {
      return this.$store.getters['characters/characterTraitsEnhancedById'](this.characterId);
    },
    characterCustomSkills() {
      return this.$store.getters['characters/characterCustomSkillsById'](this.characterId);
    },
    skills() {
      return this.$store.getters['characters/characterCustomSkillsById'](this.characterId);
    },
    skillAttack() {
      return this.$store.getters['characters/characterskillAttackById'](this.characterId);
    },
    skillDefence() {
      return this.$store.getters['characters/characterskillDefenceById'](this.characterId);
    },
    finalSkillRepository() {
      return [
        ...this.skillRepository,
        ...this.characterCustomSkills,
      ];
    },
    skillChoiceInitial() {
      return [
        ...this.CharacterskillInitial
      ]
    },
    finalWDRepository() {
      return [
        ...this.skillAttack,
        ...this.skillDefence,
      ];
    },
    CharacterskillFromModification() {
      return this.$store.getters['characters/CharacterskillFromModificationById'](this.characterId);
    },
  },
  watch: {
    characterSpeciesKey: {
      handler(value) {
        if (value && value !== 'unknown') {
          this.loadEntity(
            'species',
            value
          );
        }
      },
      immediate: true
    },
    characterArchetypeKey: {
      handler(value) {
        if (value && value !== 'unknown') {
          this.loadEntity(
            'archetype',
            value
          );
        }
      },
      immediate: true
    },
    characterAscensionKey: {
      handler(value) {
        if (value && value !== 'unknown') {
          this.loadEntity(
            'ascension',
            value
          );
        }
      },
      immediate: true
    },
    characterBoostByLevel: {
      deep: true,
      handler() {
        this.needsProgressUpdate = true;
      }
    },

    characterSkills: {
      deep: true,
      handler() {
        this.needsProgressUpdate = true;
      }
    },

    characterAttributes: {
      deep: true,
      handler() {
        this.needsProgressUpdate = true;
      }
    }
  },
  methods: {
    isAncestryBoost(key) {
      return this.species?.attributeBoost?.some(
        a => a.key === key && a.value > 0
      );
    },

    isAncestryFlaw(key) {
      return this.species?.attributeFlaw?.some(
        a => a.key === key && a.value < 0
      );
    },
    isAncestryAvailable(attr, list) {
      return list.some(
        a => a.key === attr
      );
    },
    // =========================
    // BOOST SELECTION SYSTEM
    // =========================
    setBoost(mutation, key, value = 1) {
      this.$store.commit(
        `characters/${mutation}`,
        {
          id: this.characterId,
          payload: {
            key,
            value
          }
        }
      );
    },
    updateSelect(boost) {
      this.setBoost(
        'setCharacterAncestryFreeBoost',
        boost
      );
      this.needsProgressUpdate = true;
      this.saveProgress();
    },
    updateSelect2(boost) {
      this.setBoost(
        'setCharacterAncestryFreeBoost2',
        boost
      );
      this.needsProgressUpdate = true;
      this.saveProgress();
    },
    updateSelectBackground(boost) {
      this.setBoost(
        'setCharacterBackgroundFreeBoost',
        boost
      );
      this.needsProgressUpdate = true;
      this.saveProgress();
    },
    updateSelectBackground2(boost) {
      this.setBoost(
        'setCharacterBackgroundFreeBoost2',
        boost
      );
      this.needsProgressUpdate = true;
    },
    updateSelectClassAttribute(boost) {
      this.setBoost(
        'setCharacterClassAttribute',
        boost
      );
      this.needsProgressUpdate = true;
      this.saveProgress();
    },
    updateSelectClassSkillLevel(boost, level) {
      this.$store.commit(
        'characters/setCharacterClassSkillLevel',
        {
          id: this.characterId,
          payload: {
            key: boost,
            level
          }
        }
      );
      this.needsProgressUpdate = true;
      this.saveProgress();
    },
    updateSelectClassSkill(boost) {
      const sheet =
        this.characterSkillSheet();
      // удаляем предыдущий выбор класса
      this.ClassSkill.forEach(item => {
        const exists =
          sheet.find(
            skill =>
              skill.key === item.key &&
              skill.level === 1 &&
              skill.type === 'skill'
          );
        if (exists) {
          this.$store.commit(
            "characters/setCharacterSkillPointClassUp",
            {
              id: this.characterId,
              write: false,
              payload: {
                key: 1,
                value: 1
              }
            }
          );
        }
        this.$store.commit(
          'characters/removeSkillSheet',
          {
            id: this.characterId,
            key: item.key,
            level: 1,
            type: 'skill',
            optional: true
          }
        );
        this.$store.commit(
          'characters/removeSkillSheet',
          {
            id: this.characterId,
            key: item.key,
            level: 1,
            type: 'class',
            optional: true
          }
        );
      });
      this.$store.commit(
        'characters/addSkillSheet',
        {
          id: this.characterId,
          key: boost,
          level: 1,
          type: 'class',
          optional: true,
          combinded: false
        }
      );
      this.needsProgressUpdate = true;
      this.saveProgress();
    },
    async loadEntity(type, key) {
      try {
        this.loading = true;
        const { data } =
          await this.$axios.get(
            `/api/${this.getApiName(type)}/${key}`
          );
        switch (type) {
          case "species":
            this.species = data;
            this.boost =
              data?.abilityBoost || 0;
            this.AncestryAttribute =
              data.attributeBoost
                ?.filter(
                  item => item.value === 0
                )
              || [];
            this.AncestryAttribute2 =
              [...this.AncestryAttribute];
            this.selectedAncestryBoost =
              this.characterAncestryFreeBoost;
            this.selectedAncestryBoost2 =
              this.characterAncestryFreeBoost2;
            break;
          case "archetype":
            this.archetype =
              key === "advanced"
                ? { prerequisites: [] }
                : data;
            this.selectedClassBoost =
              this.characterClassBoost;

            this.selectedClassSkill =
              this.characterSkillSheet()
                .find(
                  item =>
                    item.level === 1 &&
                    item.type === "class"
                )?.key;

            this.ClassAttribute =
              this.attributeRepository
                .filter(item =>
                  this.archetype.keyAbility
                    ?.some(
                      key =>
                        item.key.includes(key)
                    )
                );
            this.ClassSkill =
              this.skillRepository
                .filter(item =>
                  this.archetype.skillTrainedChoice
                    ?.some(
                      key =>
                        item.key.includes(key)
                    )
                );
            break;
          case "ascension":
            this.ascension = data;
            this.selectedBackgroundSkill = this.characterSkillSheet()
              .find(
                item =>
                  item.level === 1 &&
                  item.type === "background"
              )?.key;
            this.BackgroundAttribute =
              this.attributeRepository
                .filter(item =>
                  data.boost1
                    ?.some(
                      key =>
                        item.key.includes(key)
                    )
                );
            this.BackgroundAttribute2 =
              this.attributeRepository;
            this.selectedBackgroundBoost =
              this.characterBackgroundFreeBoost;
            this.selectedBackgroundBoost2 =
              this.characterBackgroundFreeBoost2;
            break;
        }
      }
      catch (error) {
        console.error(
          `Loading ${type} failed`,
          error
        );
      }
      finally {
        this.loading = false;
      }
    },
    getApiName(type) {
      const map = {
        species:
          "species",
        archetype:
          "archetypes",
        ascension:
          "ascension-packages"
      };
      return map[type];
    },
    getBoost(level) {
      return this.boostByLevel[level] || 0;
    },
    getAttributeBoost(level, attribute) {
      const data = this.attributeBoostByLevel[level];
      if (!data) return 0;
      return data[attribute] || 0;
    },
    updateBoost(level, attribute, value) {
      const mutations = {
        1: 'setCharacterBoost',
        5: 'setCharacterBoost5',
        10: 'setCharacterBoost10',
        15: 'setCharacterBoost15',
        20: 'setCharacterBoost20'
      };
      if (!mutations[level]) return;
      this.$store.commit(
        `characters/${mutations[level]}`,
        {
          id: this.characterId,
          payload: {
            key: attribute,
            value
          }
        }
      );
    },
    updateAttributeBoost(level, attribute, value) {
      const mutations = {
        1: 'setCharacterAttributeBoost',
        5: 'setCharacterAttributeBoost5',
        10: 'setCharacterAttributeBoost10',
        15: 'setCharacterAttributeBoost15',
        20: 'setCharacterAttributeBoost20'
      };
      if (!mutations[level]) return;
      this.$store.commit(
        `characters/${mutations[level]}`,
        {
          id: this.characterId,
          payload: {
            key: attribute,
            value
          }
        }
      );
    },
    characterSkillSheet() {
      return this.$store.getters["characters/characterSkillSheetById"](
        this.characterId
      );
    },
    skillChoiceModel(level) {
      return this.skillChoice[this.label(level)];
    },
    skillSheetSkillLevel(key, level) {
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.key === key && s.level < level && (s.combinded === false || !s.combinded)) : undefined;
      return skill ? skill.length : 0;
    },
    skillSheetOptional(key, level) {
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.find(s => s.key === key && s.level === level && s.combinded === false) : undefined;
      return skill ? skill.optional : false;
    },
    skillSheetBack() {
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.find(s => s.type === 'back') : undefined;
      return skill ? 1 : 0;
    },
    characterOptional(level) {
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.level === level && s.optional === true && s.combinded === false) : undefined;
      const l = skill ? skill.length : 0;
      return l;
    },
    levelRestrict(key, level) {
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.key === key && s.level < level && s.combinded === false) : undefined;
      const ProfLen = skill?.length || 0;
      if (ProfLen === 2 && level < 7)
        return true;
      if (ProfLen === 3 && level < 15)
        return true;
      if (ProfLen === 4)
        return true;
      return false;
    },
    formatBoost(stat, rowIndex) {
      const rows = this.tableRows || [];
      let count = 0;
      for (let i = 0; i <= rowIndex; i++) {
        const row = rows[i];
        if (!row)
          continue;
        count += row.stats?.[stat] || 0;
      }
      const current =
        rows[rowIndex]?.stats?.[stat] || 0;
      if (count <= 4) {
        return current;
      }
      if (current === 0) {
        return 0;
      }
      return (
        (count - 4) % 2 === 1
          ? 0.5
          : 1
      );
    },
    // =========================
    // MODIFIERS SYSTEM
    // =========================
    getAbilityModifier(attribute) {
      const value =
        this.characterAttributes?.[attribute] ?? 10;
      return Math.floor(
        (value - 10) / 2
      );
    },
    getProficiencyValue(rank) {
      const map = {
        0: 0,
        1: 2,
        2: 4,
        3: 6,
        4: 8
      };
      return map[rank] || 0;
    },
    getSkillRankByLevel(skill, level) {
      return this.getSkillSheet()
        .filter(item =>
          item.key === skill &&
          item.level <= level &&
          item.combinded !== true
        )
        .length;
    },
    ModAttribute(attribute, skill, level) {
      const rank =
        this.getSkillRankByLevel(
          skill,
          level
        );
      const proficiency =
        this.getProficiencyValue(rank);
      const ability =
        this.getAbilityModifier(attribute);
      const lvl =
        rank > 0
          ? level
          : 0;
      return (
        proficiency +
        ability +
        lvl
      );
    },
    ModProf(attribute, skill, level) {
      const rank =
        this.getSkillRankByLevel(
          skill,
          level
        );
      return (
        this.getProficiencyValue(rank)
        +
        (rank > 0 ? level : 0)
      );
    },
    ModAttributeSaving(attribute, skill) {
      const rank =
        this.characterSaving?.[skill]
        || 0;
      return (
        this.getProficiencyValue(rank)
        +
        this.getAbilityModifier(attribute)
        +
        this.characterLevel
      );
    },
    ModAttributePerception() {
      const rank =
        this.SkillPerception();
      return (
        this.getProficiencyValue(
          this.SkillsTrained[rank]
        )
        +
        this.getAbilityModifier("wisdom")
        +
        this.characterLevel
      );
    },
    ModAttributeClass() {
      const rank =
        this.SkillClass();
      if (!this.archetype)
        return 0;
      return (
        this.getProficiencyValue(rank)
        +
        this.characterLevel
      );
    },
    ModProfAttr(attribute, level) {

      let result = 0;


      // старт
      this.tableRows.forEach((row, rowIndex) => {
        result += this.formatBoost(attribute, rowIndex);
      });


      // // уровневые повышения
      // Object.entries(this.attributeBoostByLevel || {})
      //   .forEach(([lvl, boosts]) => {

      //     if (Number(lvl) <= level) {

      //       if (boosts[attribute]) {
      //         result += (
      //           result >= 4
      //             ? 0.5
      //             : 1
      //         );
      //       }

      //     }

      //   });


      const mod = Math.floor(result);

      return (
        mod > 0
          ? "+ "
          : " "
      )
        + mod
        + (
          Number.isInteger(result)
            ? ""
            : " ⯅"
        );
    },
    MaxSkillPoints() {
      const Max = this.characterSkillPointClass + (this.characterAttributes["intellect"] - 10) / 2;
      if (Max < 0)
        return 0;
      return Max;
    },
    modInt(level) {
      switch (level) {
        case 1:
          return (this.attributeBoostByLevel[level]?.intellect || 0) + this.characterAncestryBoost["intellect"] + this.characterBackgroundBoost["intellect"] + this.characterAttributesClass["intellect"];
        case 5:
          return this.attributeBoostByLevel[level]?.intellect || 0;
        case 10:
          return this.attributeBoostByLevel[level]?.intellect || 0;
        case 15: ;
          return this.attributeBoostByLevel[level]?.intellect || 0;
        case 20:
          return this.attributeBoostByLevel[level]?.intellect || 0;
      }
      return 0;
    },
    openSkillLevel(level) {
      this.skillLevel = level;
      this.dialogSkill = true;
    },
    getRankChipColor(skillKey, level) {
      const rank = this.getSkillRank(skillKey, level);
      switch (rank) {
        case 0: // Нетренирован
          return "grey";
        case 1: // Тренирован
          return "#171f69";
        case 2: // Эксперт
          return "#3c005e";
        case 3: // Мастер
          return "#664400";
        case 4: // Легенда
          return "#5e0000";
        default:
          return "grey";
      }
    },
    mergeStats(...inputs) {
      const result = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intellect: 0,
        wisdom: 0,
        charisma: 0
      };
      inputs.forEach(input => {
        if (!input) return;
        // 2️⃣ Если это объект со значениями
        if (typeof input === 'object') {
          Object.keys(result).forEach(stat => {
            result[stat] += Number(input[stat] || 0);
          });
        }
      });
      return result;
    },
    isSkillLevel(level) {
      return (
        ((level - 1) % 2 === 0) ||
        this.archetype?.keywords === 'плут'
      )
    },
    isBoostLevel(level) {
      return [1, 5, 10, 15, 20].includes(level)
    },
    openBoostDialog(level) {
      this.currentLevel = level
      this.boostDialog = true
    },
    characterProgressionSkill(level) {
      let max = this.calculateSkillProgressMax(level);
      let current = this.calculateSkillProgress(level);

      return max - current;
    },
    // =========================
    // PROGRESSION SYSTEM
    // =========================
    getDisplayProgress(level) {
      return {
        current: this.calculateProgress(level),
        max: this.calculateProgressMax(level)
      };
    },
    saveProgress() {
      for (let level = 1; level <= this.characterLevel; level++) {
        this.$store.commit('characters/characterProgress', {
          id: this.characterId,
          level,
          value: this.calculateProgress(level)
        });
        this.$store.commit('characters/characterProgressMax', {
          id: this.characterId,
          level,
          value: this.calculateProgressMax(level)
        });
      }
      this.needsProgressUpdate = false;

    },
    getLevelAttributeBoosts(level) {
      return this.attributeBoostByLevel[level] || {};
    },
    getLevelBoostCount(level) {
      return this.boostByLevel[level] || 0;
    },
    getIntellectModifier(level) {
      let value = 0;
      if (level === 1) {
        value += this.characterAncestryBoost?.intellect || 0;
        value += this.characterBackgroundBoost?.intellect || 0;
        value += this.characterAttributesClass?.intellect || 0;
      }
      value += this.getLevelAttributeBoosts(level).intellect || 0;
      return value;
    },
    calculateProgress(level) {
      let result = 0;
      // Повышения характеристик
      if (this.isBoostLevel(level)) {
        result += this.getLevelBoostCount(level);
      }
      // Навыки
      if (level === 1) {
        let additional = 0;
        additional += this.characterClassBoost?.length ? 1 : 0;
        additional += this.selectedClassSkill ? 1 : 0;
        additional += this.characterBackgroundFreeBoost?.length ? 1 : 0;
        additional += this.characterBackgroundFreeBoost2?.length ? 1 : 0;
        additional += this.characterAncestryFreeBoost?.length ? 1 : 0;
        additional += this.characterAncestryFreeBoost2?.length ? 1 : 0;
        result += this.skillSheetPoints("", 1);
        result += additional;
      } else {
        result += this.skillSheetAll("", level);
      }
      return result;
    },
    calculateProgressMax(level) {
      let result = 0;
      // Характеристики
      if (this.isBoostLevel(level)) {
        result += 4;
      }
      // Навыки
      if (level === 1) {
        result += this.characterSkillPointClass || 0;
        result += this.characterSkillPointBackground || 0;
        result += this.characterSkillPointClassUp || 0;
        result += this.getIntellectModifier(level);
        let extra = 0;
        extra += this.archetype?.keyAbility?.length > 1 ? 1 : 0;
        extra += this.archetype?.skillTrainedChoice?.length > 1 ? 1 : 0;
        extra += this.selectedBackgroundSkill ? 1 : 0;
        extra += this.BackgroundAttribute?.length > 1 ? 1 : 0;
        extra += this.BackgroundAttribute2?.length > 1 ? 1 : 0;
        extra += this.AncestryAttribute?.length > 1 ? 1 : 0;
        extra += (
          this.AncestryAttribute2?.length > 1 &&
          this.boost === 2
        ) ? 1 : 0;
        result += extra;
      } else {
        if (
          level % 2 === 0 &&
          this.archetype?.keywords !== 'плут'
        ) {
          result += this.getIntellectModifier(level);
        } else {
          result += 1;
          result += this.getIntellectModifier(level);
        }
      }
      this.$store.commit(
        'characters/characterProgressMax',
        {
          id: this.characterId,
          level,
          value: result
        }
      );
      return result;
    },
    characterProgression(level) {
      return this.calculateProgress(level);
    },
    characterProgressionMax(level) {
      return this.calculateProgressMax(level);
    },
    characterProgressionBoost(level) {
      if (!this.isBoostLevel(level)) {
        return 0;
      }
      return 4 - this.getLevelBoostCount(level);
    },
    isSkillUpgraded(skill) {
      return this.skillSheetValue(skill.key, 1) > 0;
    },

    isSkillDisabled(skill) {
      return (
        (skill.custom && this.skillSheetTrained(skill.key, 1) === "Тренирован") ||
        this.skillSheetOptional(skill.key, 1) === true ||
        (this.skillSheetValue(skill.key, 1) === 0 &&
          this.freeSkillPointsLvl1 <= 0)
      );
    },
    ////по уровням
    isSkillUpgradedLevel(skill, level) {
      return (
        this.skillSheetValue(
          skill.key,
          level
        ) > 0
      );
    },
    // =========================
    // SKILLS SYSTEM
    // =========================
    getSkillSheet() {
      return (
        this.$store.getters[
          "characters/characterSkillSheetById"
        ](this.characterId)
        || []
      );
    },
    skillSheet() {
      return this.getSkillSheet();
    },
    getSkillEntries(skill, level = null) {
      return this.getSkillSheet().filter(item => {
        if (item.key !== skill)
          return false;
        if (item.combinded === true)
          return false;
        if (level !== null && item.level !== level)
          return false;
        return true;
      });
    },
    getSkillRank(skill, level = this.characterLevel) {
      return this.getSkillSheet()
        .filter(item =>
          item.key === skill &&
          item.level <= level &&
          item.combinded !== true
        )
        .length;
    },
    skillRankMap() {
      const map = {};
      this.getSkillSheet()
        .forEach(item => {
          if (item.combinded === true)
            return;
          if (!map[item.key]) {
            map[item.key] = 0;
          }
          map[item.key]++;
        });
      return map;
    },
    skillSheetValue(skill, level) {
      return this.getSkillEntries(skill, level).length;
    },
    skillSheetAll(key, level) {
      return this.getSkillSheet()
        .filter(item =>
          item.level === level &&
          item.type === 'skill' &&
          item.combinded !== true &&
          item.optional !== true
        )
        .length;
    },
    skillSheetPoints(key, level) {
      return this.getSkillSheet()
        .filter(item =>
          item.level === level &&
          item.type === 'skill' &&
          item.combinded !== true
        )
        .length;
    },
    calculateSkillProgressMax(level) {

      if (level === 1) {

        let result = 0;

        result += this.characterSkillPointClass || 0;
        result += this.characterSkillPointBackground || 0;
        result += this.characterSkillPointClassUp || 0;

        result += this.getIntellectModifier(level);


        let extra = 0;

        // extra += this.archetype?.keyAbility?.length > 1 ? 1 : 0;
        extra += this.archetype?.skillTrainedChoice?.length > 1 ? 1 : 0;

        // extra += this.selectedBackgroundSkill ? 1 : 0;

        // extra += this.BackgroundAttribute?.length > 1 ? 1 : 0;
        // extra += this.BackgroundAttribute2?.length > 1 ? 1 : 0;

        // extra += this.AncestryAttribute?.length > 1 ? 1 : 0;

        // extra += (
        //   this.AncestryAttribute2?.length > 1 &&
        //   this.boost === 2
        // )
        //   ? 1
        //   : 0;


        return result + extra;

      }


      let result = 0;


      if (
        level % 2 === 0 &&
        this.archetype?.keywords !== 'плут'
      ) {

        result += this.getIntellectModifier(level);

      } else {

        result += 1;
        result += this.getIntellectModifier(level);

      }


      return result;

    },
    calculateSkillProgress(level) {

      if (level === 1) {

        let result = 0;

        result += this.skillSheetPoints("", 1);

        // result += this.characterClassBoost?.length ? 1 : 0;
        // result += this.selectedClassSkill ? 1 : 0;

        // result += this.selectedBackgroundSkill ? 1 : 0;

        // result += this.characterBackgroundFreeBoost?.length ? 1 : 0;
        // result += this.characterBackgroundFreeBoost2?.length ? 1 : 0;

        // result += this.characterAncestryFreeBoost?.length ? 1 : 0;
        // result += this.characterAncestryFreeBoost2?.length ? 1 : 0;


        return result;

      }


      return this.skillSheetAll("", level);

    },
    skillSheetTrained(skill, level) {
      const rank = this.getSkillRank(skill, level);
      return this.characterTrained(rank);
    },
    characterTrained(value) {
      const ranks = [
        "Нетренирован",
        "Тренирован",
        "Эксперт",
        "Мастер",
        "Легенда"
      ];
      return ranks[value] || ranks[0];
    },
    SkillLabel(skill) {
      const rank = this.getSkillRank(skill);
      return [
        "Н",
        "Т",
        "Э",
        "М",
        "Л"
      ][rank] || "Н";
    },
    incrementSkill(skill, level) {
      // if (this.characterSkillPoints <= 0)
      //   return;
      const ranks =
        Object.keys(this.SkillsTrained);
      const current =
        this.characterSkills[skill] || "U";
      const index =
        ranks.indexOf(current);
      const next =
        ranks[index + 1];
      if (!next)
        return;
      this.$store.commit(
        'characters/addSkillSheet',
        {
          id: this.characterId,
          key: skill,
          level,
          type: 'skill',
          optional: false,
          combinded: false
        }
      );
      this.$store.commit(
        'characters/setCharacterskillInitial',
        {
          id: this.characterId,
          payload: {
            value: 1,
            skill
          }
        }
      );
      this.$store.commit(
        'characters/setCharacterSkillPoints',
        {
          id: this.characterId,
          payload: {
            key: skill,
            value: this.characterSkillPoints - 1
          }
        }
      );
      this.$store.commit(
        'characters/setCharacterSkill',
        {
          id: this.characterId,
          payload: {
            key: skill,
            value: next
          }
        }
      );
      this.needsProgressUpdate = true;
      this.saveProgress();
    },
    decrementSkill(skill, level) {
      const rank =
        this.getSkillRank(skill, level);
      if (rank <= 0)
        return;


      const ranks =
        Object.keys(this.SkillsTrained);
      const current =
        this.characterSkills[skill];
      const index =
        ranks.indexOf(current);
      const previous =
        ranks[index - 1] || "U";
      this.$store.commit(
        'characters/removeSkillSheet',
        {
          id: this.characterId,
          key: skill,
          level,
          type: 'skill',
          optional: false
        }
      );
      this.$store.commit(
        'characters/setCharacterskillInitial',
        {
          id: this.characterId,
          payload: {
            value: -1,
            skill
          }
        }
      );
      this.$store.commit(
        'characters/setCharacterSkillPoints',
        {
          id: this.characterId,
          payload: {
            key: skill,
            value: this.characterSkillPoints + 1
          }
        }
      );
      this.$store.commit(
        'characters/setCharacterSkill',
        {
          id: this.characterId,
          payload: {
            key: skill,
            value: previous
          }
        }
      );
      this.needsProgressUpdate = true;
      this.saveProgress();
    },
    handleSkillClickLevel(skill, level) {
      if (this.isSkillDisabledLevel(skill, level))
        return;
      if (
        this.isSkillUpgradedLevel(skill, level)
      ) {
        const rank =
          this.getSkillRank(skill.key, level);
        if (rank <= 1 && skill.custom)
          return
        this.decrementSkill(
          skill.key,
          level
        );
      }
      else {
        this.incrementSkill(
          skill.key,
          level
        );
      }
    },
    isSkillDisabledLevel(skill, level) {
      const selected =
        this.skillSheetValue(
          skill.key,
          level
        );
      const available = this.calculateSkillProgressMax(level) - this.calculateSkillProgress(level)
      // 1 +
      // this.modInt(level) -
      // this.skillSheetAll("", level);
      const legendary =
        this.skillSheetTrained(
          skill.key,
          level
        ) === "Легенда";

      return (
        selected === 0 &&
        (
          available <= 0 ||
          legendary
        )
      );
    },
    // =========================
    // ATTRIBUTES SYSTEM
    // =========================
    getAttributeBoostGetter(level) {
      const map = {
        1: {
          boost: 'setCharacterBoost',
          attribute: 'setCharacterAttributeBoost'
        },
        5: {
          boost: 'setCharacterBoost5',
          attribute: 'setCharacterAttributeBoost5'
        },
        10: {
          boost: 'setCharacterBoost10',
          attribute: 'setCharacterAttributeBoost10'
        },
        15: {
          boost: 'setCharacterBoost15',
          attribute: 'setCharacterAttributeBoost15'
        },
        20: {
          boost: 'setCharacterBoost20',
          attribute: 'setCharacterAttributeBoost20'
        }
      };
      return map[level];
    },
    calculateAttributeChange(attribute, increase = true) {
      const current =
        this.characterAttributes[attribute];
      if (increase) {
        return current >= 18
          ? current + 1
          : current + 2;
      }
      return current > 18
        ? current - 1
        : current - 2;
    },
    incrementAttribute(attribute, level) {
      const commits =
        this.getAttributeBoostGetter(level);
      if (!commits)
        return;
      const value =
        this.calculateAttributeChange(
          attribute,
          true
        );
      if (attribute === "intellect") {
        this.$store.commit(
          'characters/setCharacterSkillPoints',
          {
            id: this.characterId,
            payload: {
              key: attribute,
              value: this.characterSkillPoints + 1
            }
          }
        );
      }
      this.$store.commit(
        `characters/${commits.attribute}`,
        {
          id: this.characterId,
          payload: {
            key: attribute,
            value: 1
          }
        }
      );
      this.$store.commit(
        `characters/${commits.boost}`,
        {
          id: this.characterId,
          payload: {
            key: attribute,
            value: 1
          }
        }
      );
      this.$store.commit(
        'characters/setCharacterAttribute',
        {
          id: this.characterId,
          payload: {
            key: attribute,
            value
          }
        }
      );
      this.needsProgressUpdate = true;
      this.saveProgress();
    },
    decrementAttribute(attribute, level) {
      const commits =
        this.getAttributeBoostGetter(level);
      if (!commits)
        return;
      const value =
        this.calculateAttributeChange(
          attribute,
          false
        );
      if (attribute === "intellect") {
        this.$store.commit(
          'characters/setCharacterSkillPoints',
          {
            id: this.characterId,
            payload: {
              key: attribute,
              value: this.characterSkillPoints - 1
            }
          }
        );
      }
      this.$store.commit(
        `characters/${commits.attribute}`,
        {
          id: this.characterId,
          payload: {
            key: attribute,
            value: 0
          }
        }
      );
      this.$store.commit(
        `characters/${commits.boost}`,
        {
          id: this.characterId,
          payload: {
            key: attribute,
            value: -1
          }
        }
      );
      this.$store.commit(
        'characters/setCharacterAttribute',
        {
          id: this.characterId,
          payload: {
            key: attribute,
            value
          }
        }
      );
      this.needsProgressUpdate = true;
      this.saveProgress();
    },
    isAttributeUpgradedLevel(attribute, level) {
      return (
        this.attributeBoostByLevel[level]?.[attribute] > 0
      );
    },
    handleAttributeClickLevel(attribute, level) {
      if (
        this.isAttributeDisabledLevel(
          attribute,
          level
        )
      )
        return;
      if (
        this.isAttributeUpgradedLevel(
          attribute,
          level
        )
      ) {
        this.decrementAttribute(
          attribute,
          level
        );
      }
      else {
        this.incrementAttribute(
          attribute,
          level
        );
      }
    },
    isAttributeDisabledLevel(attribute, level) {
      const used =
        this.boostByLevel[level] || 0;
      const selected =
        this.attributeBoostByLevel[level]?.[attribute] || 0;
      return (
        (4 - used <= 0)
        &&
        selected === 0
      );
    },
    // Добавляем вызов сохранения при важных событиях
    beforeDestroy() {
      if (this.needsProgressUpdate) {
        this.saveProgress();
      }
    },
    // =========================
    // HELPERS / UI METHODS
    // =========================
    characterlabel(value) {
      const labels = {
        U: "Нетренирован",
        T: "Тренирован",
        E: "Эксперт",
        M: "Мастер",
        L: "Легенда"
      };
      return labels[value] || labels.U;
    },
    label(level) {
      return `level${level}`;
    },
    SkillPerception() {
      return this.$store.getters[
        'characters/characterPerseptionById'
      ](this.characterId);
    },
    SkillClass() {
      return this.$store.getters[
        'characters/characterSkillClassById'
      ](this.characterId);
    },
    isAffordable(cost) {
      return (
        Number(cost)
        <=
        Number(this.remainingBuildPoints)
      );
    },
    openSkillsSettings(level) {
      this.skillLevel = level;
      this.skillsEditorDialog = true;
    },
    closeSkillsSettings() {
      this.customSkill = {
        key: undefined,
        name: 'Знание',
        attribute: 'intellect',
        description: ''
      };
      this.skillsEditorDialog = false;
      this.alert = false;
    },
    saveCustomSkill(level) {
      this.alert = false;
      const skill = {
        key:
          this.textToCamel(
            this.customSkill.name
          ),
        name:
          this.customSkill.name,
        level,
        attribute:
          this.customSkill.attribute
          ||
          'intellect',
        type: 'skill',
        description:
          this.customSkill.description,
        optional: false
      };
      const exists =
        this.skills
          .some(
            item =>
              item.key === skill.key
          );
      if (exists) {
        this.alert = true;
        return;
      }
      this.addCustomSkill(skill);
      this.closeSkillsSettings();
    },
    addCustomSkill(skill) {
      this.$store.commit(
        'characters/addCharacterCustomSkill',
        {
          id: this.characterId,
          skill
        }
      );
    },
    removeCustomSkill(key) {
      this.$store.commit(
        'characters/removeCharacterCustomSkill',
        {
          id: this.characterId,
          key
        }
      );
    },
  },
};
</script>
<style scoped>
/* =========================
   UTILITIES
========================= */
.small {
  height: 24px;
}

td.small {
  font-size: 12px;
}

/* =========================
   LAYOUT
========================= */
.my-tabs-container {
  height: 620px;
  overflow: hidden;
  background: var(--ui-background);
}

.my-tab-item {
  height: 705px;
  overflow-y: auto;
}

/* ФИЛЬТРЫ */
.filters-col {
  border-right: 1px solid rgba(var(--v-border-color, 150, 150, 150), 0.15);
}

.filters-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* =========================
   DIVIDER
========================= */
.sexy_line {
  display: block;
  height: 1px;
  border: none;
  background: linear-gradient(to right,
      transparent,
      var(--ui-border),
      transparent);
}

/* =========================
   BOX SYSTEM (resource / faith)
========================= */
.resource-box,
.faith-box {
  border: 1px solid var(--ui-border);
  box-shadow: inset 0 0 4px var(--ui-shadow);
  margin: 2px;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  border-radius: 6px;
  transition: 0.15s ease;
}

/* sizes */
.resource-box {
  width: 12px;
  height: 12px;
}

.faith-box {
  width: 20px;
  height: 20px;
}

/* hover = subtle lift */
.resource-box:hover,
.faith-box:hover {
  transform: translateY(-1px) scale(1.03);
  border-color: var(--ui-accent);
}

/* filled */
.resource-box--filled::before,
.faith-box--filled::before {
  content: "";
  display: block;
  width: 70%;
  height: 70%;
  margin: auto;
  background: var(--ui-danger);
  border-radius: 2px;
}

/* alt fill */
.resource-box--filled-light::before {
  background: var(--ui-warning) !important;
}

/* =========================
   TABLE BASE (GLOBAL BEHAVIOR)
========================= */
tr.v-data-table__selected {
  background: var(--ui-focus) !important;
}

/* =========================
   SKILL TABLE (MAIN COMPONENT)
========================= */
.skill-table {
  font-size: 13px;
  border-collapse: collapse;

  td {
    padding: 5px 6px !important;
    color: var(--ui-text);
    vertical-align: middle;
  }

  /* ROW */
  .skill-row {
    height: 36px;
    cursor: pointer;
    position: relative;
    transition: 0.15s ease;
    border-bottom: 1px solid var(--ui-border);

    /* hover = clean elevation */
    &:hover {
      background: var(--ui-hover);
    }

    /* active click feel */
    &:active {
      background: var(--ui-surface-active);
    }

    /* disabled */
    &--disabled {
      opacity: 0.45;
      cursor: not-allowed;

      &:hover {
        background: transparent;
      }
    }

    /* trained / upgraded */
    &--trained-up {
      background: color-mix(in srgb, var(--ui-warning) 10%, transparent);

      td:first-child::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        height: 100%;
        background: linear-gradient(to bottom,
            var(--ui-warning),
            var(--ui-accent));
      }
    }
  }

  /* columns */
  .skill-name {
    width: 35%;
    font-weight: 500;
  }

  .skill-mod {
    width: 40px;
    text-align: center;
    font-weight: 600;
    color: var(--ui-accent);
  }

  .skill-train {
    width: 70px;
    text-align: center;
    font-size: 12px;
    color: var(--ui-muted);
  }

  .skill-delete {
    width: 32px;
    text-align: center;
  }
}

/* =========================
   BUTTON SYSTEM (IMPORTANT UPGRADE)
========================= */
.compact-btn {
  min-width: 28px !important;
  height: 28px !important;
}

/* Vuetify override (critical for consistency) */
.v-btn {
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 500;
  letter-spacing: 0;
}

/* primary action */
.v-btn.primary {
  background: var(--ui-accent) !important;
  color: var(--ui-text-inverse) !important;
}

/* subtle buttons */
.v-btn:not(.primary):not(.error):not(.success) {
  background: var(--ui-surface-soft) !important;
  color: var(--ui-text) !important;
}

/* hover feel */
.v-btn:hover {
  filter: brightness(1.05);
}

/* =========================
   CHIPS (VERY IMPORTANT VISUAL FIX)
========================= */
.v-chip {
  background: var(--ui-surface-soft) !important;
  color: var(--ui-text) !important;
  font-weight: 500;
  border: 1px solid var(--ui-border);
}

/* success chip (progress / stats) */
.v-chip.success--text {
  background: var(--ui-success) !important;
  color: var(--ui-text-inverse) !important;
}

/* =========================
   CARD HEADER STATES
========================= */
.v-card-title {
  color: var(--ui-text);
  font-weight: 600;
  border-bottom: 1px solid var(--ui-border);
}

/* success header */
.card-title-success {
  background: var(--ui-success);
  color: var(--ui-text-inverse);
}

/* =========================
   DIALOG SYSTEM (IMPORTANT UX FIX)
========================= */
.v-dialog .v-card {
  background: var(--ui-surface);
  color: var(--ui-text);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px var(--ui-shadow);
}

/* dialog header */
.v-dialog .v-card-title {
  background: var(--ui-surface-soft);
}

/* =========================
   LIST ITEMS
========================= */
.v-list-item {
  border-radius: 8px;
  transition: 0.15s ease;
}

.v-list-item:hover {
  background: var(--ui-hover);
}

/* =========================
   GLOBAL FEEL FIXES
========================= */
* {
  -webkit-font-smoothing: antialiased;
}

/* better click feedback globally */
button,
.v-btn,
.skill-row {
  user-select: none;
}

/* smoother transitions everywhere */
.skill-row,
.v-btn,
.v-chip,
.resource-box,
.faith-box {
  transition: 0.15s ease;
}

.ui-btn {
  border-radius: 10px;
  text-transform: none;
  font-weight: 500;
  letter-spacing: 0.2px;
  transition: var(--ui-transition);
}

.ui-btn--primary {
  background: var(--ui-surface);
  color: var(--ui-text);
  border: 1px solid var(--ui-border);

  &:hover {
    border-color: var(--ui-accent);
    background: var(--ui-surface-hover);
  }
}

.ui-chip {
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  height: 26px;
  padding: 0 10px;
  background: var(--ui-surface-soft);
  border: 1px solid var(--ui-border);
  color: var(--ui-text);
  transition: var(--ui-transition);
}

/* прогресс-чип (главный кейс у тебя) */
.ui-chip--progress {
  background: color-mix(in srgb, var(--ui-accent) 12%, transparent);
  border-color: var(--ui-accent);
  color: var(--ui-text);
}

/* hover эффект */
.ui-chip:hover {
  transform: translateY(-1px);
  border-color: var(--ui-border-strong);
}

.ui-chip--complete {
  background: color-mix(in srgb, var(--ui-success) 15%, transparent);
  border-color: var(--ui-success);
}

.ui-panel {
  border-radius: 12px;
  margin-bottom: 8px;
  border: 1px solid var(--ui-border);
  background: var(--ui-surface);
  overflow: hidden;
  transition: var(--ui-transition);
}

.ui-panel:hover {
  border-color: var(--ui-border-strong);
  background: var(--ui-surface-hover);
}

.ui-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 12px;
  font-weight: 600;
  font-size: 14px;
  color: var(--ui-text);
  letter-spacing: 0.2px;
}

/* левая часть (текст + уровень) */
.ui-panel-header__title {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* уровень как бейдж */
.ui-panel-level {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--ui-surface-soft);
  border: 1px solid var(--ui-border);
  color: var(--ui-text-muted);
}

.ui-panel-content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* секции внутри панели */
.ui-section {
  padding: 12px;
  border-radius: 12px;
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
}

.ui-section__title {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--ui-text);
}

.ui-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

/* фиксируем геометрию */
.ui-table td {
  padding: 6px 10px;
  position: relative;
  color: var(--ui-text);
  vertical-align: middle;
}

/* строки */
.ui-row {
  cursor: pointer;
  transition: all .2s ease;
  border-left: 5px solid transparent;
}

/* выбранный навык */
.ui-row--active {
  background: rgba(76, 175, 80, 0.18) !important;
  border-left: 5px solid #4caf50;
  box-shadow:
    0 0 0 1px rgba(76, 175, 80, 0.45),
    0 3px 10px rgba(76, 175, 80, 0.25);
}

/* текст выбранного */
.ui-row--active .ui-cell--name {
  font-weight: 700;
  color: #4caf50;
}

/* hover */
.ui-row--active td:first-child {
  border-left: 5px solid #4caf50;
}

.ui-row--active td {
  background: rgba(76, 175, 80, 0.18);
}

.ui-row:hover {
  background: rgba(255, 255, 255, 0.06);
}

/* отключенные */
.ui-row--disabled {
  opacity: .45;
}

/* чтобы строки выглядели как современные элементы списка */
.ui-cell {
  padding: 10px 12px !important;
}

.ui-cell--name {
  justify-content: flex-start;
  /* font-weight: 500; */
}

/* numeric center */
.ui-cell--mod,
.ui-cell--center {
  text-align: center;
  /* // font-weight: 600; */
}

/* attribute block */
.ui-attr-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.ui-attr-short {
  font-size: 12px;
  opacity: 0.8;
}

.ui-attr-mod {
  font-size: 13px;
  /* font-weight: 600; */
}

/* delete icon */
.ui-icon-danger {
  color: var(--ui-danger);
  opacity: 0.8;
  transition: var(--ui-transition);
}

.ui-icon-danger:hover {
  opacity: 1;
  transform: scale(1.1);
}

.ui-dialog .v-card {
  background: var(--ui-surface);
  border-radius: 14px;
  overflow: hidden;
}

.ui-dialog-header {
  background: var(--ui-surface-soft);
  border-bottom: 1px solid var(--ui-border);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ui-message {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  border: 1px solid var(--ui-border);
  background: var(--ui-surface-soft);
  color: var(--ui-text);
  margin: 6px 0;
}

/* warning */
.ui-message--warning {
  border-color: var(--ui-warning);
  background: color-mix(in srgb, var(--ui-warning) 10%, transparent);
}

/* error */
.ui-message--error {
  border-color: var(--ui-danger);
  background: color-mix(in srgb, var(--ui-danger) 10%, transparent);
}

/* info */
.ui-message--info {
  border-color: var(--ui-accent);
  background: color-mix(in srgb, var(--ui-accent) 10%, transparent);
}

.ui-message--info {
  background: color-mix(in srgb, var(--ui-accent) 10%, transparent);
}

.ui-select {
  font-size: 13px;
  border-right: 1px solid rgba(var(--v-border-color, 150, 150, 150), 0.15);
}

/* сам input */
.ui-select .v-input__control {
  background: var(--ui-surface);
  border-radius: 10px;
  border: 1px solid var(--ui-border);
  transition: var(--ui-transition);
}

/* hover */
.ui-select:hover .v-input__control {
  border-color: var(--ui-border-strong);
}

/* focus */
.ui-select.v-input--is-focused .v-input__control {
  border-color: var(--ui-accent);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--ui-accent) 20%, transparent);
}

/* label */
.ui-select .v-label {
  font-size: 12px;
  color: var(--ui-muted);
}

.ui-h2 {
  font-size: 15px;
  font-weight: 700;
  color: var(--ui-text);
  margin: 10px 0;
  letter-spacing: 0.2px;
}

.ui-h3 {
  font-size: 13px;
  font-weight: 600;
  color: var(--ui-text);
  margin: 8px 0;
  opacity: 0.9;
}

.ui-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: var(--ui-surface-soft);
  border-bottom: 1px solid var(--ui-border);
  font-size: 10px;
  font-weight: 600;
  color: var(--ui-text);
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skill-card {
  padding: 12px;
  cursor: pointer;
  transition: all .2s ease;
  border: 2px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 12px;
}

.skill-card:hover {
  transform: translateY(-2px);
}

/* ВЫБРАННЫЙ НАВЫК */
.skill-card--active {
  background: rgba(76, 175, 80, 0.25) !important;
  border: 3px solid #4caf50 !important;
  box-shadow:
    0 0 12px rgba(76, 175, 80, .45),
    inset 0 0 20px rgba(76, 175, 80, .15);
}

.skill-card--active .skill-name {
  color: #4caf50;
  font-weight: 800;
}

/* отключенный */
.skill-card--disabled {
  opacity: .45;
}

/* верхняя строка */
.skill-card__main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-size: 16px;
  font-weight: 600;
}

.skill-value {
  font-size: 18px;
  font-weight: 700;
}

/* нижняя информация */
.skill-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
  font-size: 13px;
  opacity: .85;
}

.ui-info-card {
  background: rgba(255, 255, 255, .03);
}

.boost-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.boost-list .v-chip {
  margin: 4px;
}


@media (max-width: 600px) {
  .boost-list ::v-deep .v-slide-group__wrapper {
    overflow: visible !important;
  }

  .boost-list ::v-deep .v-slide-group__content {
    display: flex !important;
    flex-wrap: wrap !important;
    width: 100%;
  }

  .boost-list .v-chip {
    flex: 1 1 calc(50% - 8px);
    justify-content: center;
  }


}

.ui-chip--locked {
  opacity: .35;
}

.chip-boost {
  border-color: #4caf50 !important;
  color: #4caf50 !important;
}


.chip-flaw {
  border-color: #f44336 !important;
  color: #f44336 !important;
}

.chip-boost-active {
  background: rgba(76, 175, 80, .25) !important;
  border-color: #4caf50 !important;
  color: #4caf50 !important;
  font-weight: 700;
}


.level-boost-block {
  margin-top: 16px;
}

.ui-chip--selected {
  background: #1976d2 !important;
  color: var(--ui-text) !important;
  border-color: #1976d2 !important;
}

.ui-chip--selected .v-chip__content {
  color: white !important;
}
</style>