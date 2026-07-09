<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">

    <h3 class="headline">
      Выберите характеристики и навыки
    </h3>


    <v-expansion-panels multiple>
      <v-expansion-panel class="ui-panel" v-for="levelAncestry in characterLevel()" :key="levelAncestry" v-if="
        levelAncestry <= characterLevel() &&
        (archetype?.keywords === 'плут' ||
          levelSkill['class'].includes(levelAncestry))
      ">

        <!-- <v-expansion-panel-header>
          {{ levelAncestry }} уровень
        </v-expansion-panel-header> -->

        <v-expansion-panel-header class="ui-panel-header">
          <div class="ui-panel-header__title"> <span>{{ levelAncestry }} </span> <span class="ui-panel-level"> уровень
            </span> </div>

          <v-skeleton-loader v-if="!levelProgressMap[levelAncestry].max && levelProgressMap[levelAncestry].current"
            type="chip" width="100" height="32" class="mx-2" />


          <v-chip class="ui-chip ui-chip--progress" style="flex: none" right pill> {{
            levelProgressMap[levelAncestry].current }} / {{
              levelProgressMap[levelAncestry].max }} </v-chip>
        </v-expansion-panel-header>

        <v-expansion-panel-content class="ui-panel-content">
          <div class="ui-section">
            <v-col v-if="levelAncestry === 1">



              <div class="ui-section-title">Повышение от Наследия</div>


              <v-container v-if="species" class="bg-surface-variant">
                <v-row>
                  <!-- <v-alert v-if="!species" type="warning" class="caption ml-4 mr-4" dense outlined border="left">
                    Выберите наследие
                  </v-alert> -->

                  <div v-if="!species" class="ui-message ui-message--warning">
                    Выберите наследие
                  </div>

                  <v-col :cols="12" :md="12">
                    <div v-if="
                      selectedAncestryBoost === selectedAncestryBoost2 &&
                      selectedAncestryBoost !== '' &&
                      boost == 2
                    " class="ui-message ui-message--error">
                      Вы не можете выбрать одну и ту же характеристику
                    </div>
                  </v-col>
                  <v-col v-if="boost == 2" :cols="12" :md="6">
                    <v-select class="ui-select" label="Повышение от Наследия" v-model="selectedAncestryBoost2"
                      :items="AncestryAttribute2" item-text="name" item-value="key" dense outlined
                      @change="updateSelect2(selectedAncestryBoost2)"></v-select>
                  </v-col>

                  <v-col :cols="12" :md="6">
                    <v-select class="ui-select" label="Свободное повышение" v-model="selectedAncestryBoost"
                      :items="AncestryAttribute" item-text="name" item-value="key" dense outlined
                      @change="updateSelect(selectedAncestryBoost)"></v-select>
                  </v-col>
                </v-row>
              </v-container>

              <v-col v-else>
                <div class="ui-message ui-message--warning">
                  Выберите наследие
                </div>
              </v-col>


              <div class="ui-section-title">Повышение от Предыстории</div>


              <v-col v-if="!ascension" :cols="12">
                <div class="ui-message ui-message--warning">
                  Выберите предысторию
                </div>
              </v-col>

              <v-container v-if="ascension" class="bg-surface-variant">
                <v-row>
                  <v-col :cols="12" :md="12">
                    <div v-if="
                      selectedBackgroundBoost === selectedBackgroundBoost2 &&
                      selectedBackgroundBoost !== ''
                    " class="ui-message ui-message--error">
                      Вы не можете выбрать одну и ту же характеристику
                    </div>
                  </v-col>

                  <v-col :cols="12" :md="6">
                    <v-select class="ui-select" label="Повышение от предыстории" v-model="selectedBackgroundBoost"
                      :items="BackgroundAttribute" item-text="name" item-value="key" dense outlined
                      @change="updateSelectBackground(selectedBackgroundBoost)"></v-select>
                  </v-col>

                  <v-col :cols="12" :md="6">
                    <v-select class="ui-select" label="Свободное повышение" v-model="selectedBackgroundBoost2"
                      :items="BackgroundAttribute2" item-text="name" item-value="key" dense outlined
                      @change="updateSelectBackground2(selectedBackgroundBoost2)"></v-select>
                  </v-col>
                </v-row>
              </v-container>

              <div class="ui-section-title">
                Повышения Класса {{ archetype ? archetype.name : "" }}
              </div>



              <v-col v-if="archetype && archetype.keyAbility.length > 1" :cols="12" :md="6">
                <v-select class="ui-select" label="Повышение Характеристики от класса" v-model="selectedClassBoost"
                  :items="ClassAttribute" item-text="name" item-value="key" dense outlined
                  @change="updateSelectClassAttribute(selectedClassBoost)"></v-select>
              </v-col>

              <v-col v-if="archetype && archetype.skillTrainedChoice.length > 1" :cols="12" :md="6">
                <v-select class="ui-select" label="Повышение Навыка от класса" v-model="selectedClassSkill"
                  :items="ClassSkill" item-text="name" item-value="key" dense outlined
                  @change="updateSelectClassSkill(selectedClassSkill)"></v-select>
              </v-col>

              <v-col v-if="!archetype" :cols="12">
                <div class="ui-message ui-message--warning">
                  Выберите Класс
                </div>
              </v-col>

              <v-col v-if="
                archetype &&
                archetype.skillTrainedChoice.length == 0 &&
                archetype.keyAbility.length == 0
              " :cols="12">
                <div class="ui-message ui-message--warning">
                  У класса нет повышений на выбор
                </div>
              </v-col>

              <v-row></v-row>
              <v-col v-if="archetype">
                <v-btn outlined class="ui-btn ui-btn--accent" @click="dialogAttributeLevel1 = true">
                  Повышение Аттрибутов
                  <v-chip class="ui-chip" v-if="
                    characterProgressionBoost(levelAncestry) !== 0 && archetype
                  " style="flex: none" right pill>
                    {{ characterProgressionBoost(levelAncestry) }}</v-chip>
                </v-btn>

                <v-btn outlined class="ui-btn ui-btn--accent" @click="dialogSkillLevel1 = true">
                  Повышение Навыков
                  <v-chip class="ui-chip" v-if="
                    characterProgressionSkill(levelAncestry) !== 0 && archetype
                  " style="flex: none" right pill>
                    {{ characterProgressionSkill(levelAncestry) }}</v-chip>
                </v-btn>
              </v-col>
            </v-col>

            <div v-if="archetype && levelAncestry !== 1">

              <!-- АТРИБУТЫ -->
              <v-btn v-if="isBoostLevel(levelAncestry)" outlined class="ui-btn ui-btn--accent"
                @click="openBoostDialog(levelAncestry)">
                Повышение Аттрибутов

                <v-chip v-if="characterProgressionBoost(levelAncestry) !== 0" class="ui-chip" pill>
                  {{ characterProgressionBoost(levelAncestry) }}
                </v-chip>
              </v-btn>

              <!-- НАВЫКИ -->
              <v-btn v-if="isSkillLevel(levelAncestry)" outlined class="ui-btn ui-btn--accent"
                @click="openSkillLevel(levelAncestry)">
                Повышение Навыков

                <v-chip v-if="characterProgressionSkill(levelAncestry) !== 0" class="ui-chip" pill>
                  {{ characterProgressionSkill(levelAncestry) }}
                </v-chip>
              </v-btn>

            </div>
            <div v-if="!archetype">Для повышения Аттрибутов и навыков выберите класс</div>


          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Диалог повышения -->
    <v-dialog v-model="dialogAttributeLevel1" :fullscreen="$vuetify.breakpoint.xsOnly" width="600px" scrollable>
      <v-card>
        <v-card-title class="ui-dialog-header">
          <span>Повышение аттрибутов</span>
          <v-spacer />
          <v-icon @click="dialogAttributeLevel1 = false"> close </v-icon>
        </v-card-title>

        <v-divider />

        <v-card-title> </v-card-title>

        <v-divider />
        <v-card-text class="pa-6">
          <v-col :cols="12" :md="12">
            <v-card>
              <v-card-title class="ui-section-header">
                <h2 class="subtitle-1">
                  Количество свободных повышений: {{ 4 - characterBoost }}
                </h2>
              </v-card-title>


              <v-simple-table class="ui-table dense">
                <template v-slot:default>
                  <!-- <thead>
                <tr>
                  <th v-for="header in attributeHeaders" :class="header.class">
                    {{ header.text }}
                  </th>
                </tr>
              </thead> -->
                  <tbody>
                    <tr v-for="attribute in attributeRepository" class="ui-row"
                      :class="{ 'ui-row--disabled': isAttributeDisabledLevel(attribute.key, 1), 'ui-row--active': isAttributeUpgradedLevel(attribute.key, 1) }"
                      @click="handleAttributeClickLevel(attribute.key, 1)">
                      <!-- <td>{{ attribute.name }}</td> -->
                      <td class="ui-cell ui-cell--name">
                        {{ attribute.name }} </td>

                      <td class="skill-mod">
                        {{ ModProfAttr(attribute.key, 1) }}
                      </td>



                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card>
          </v-col>
        </v-card-text>

        <v-divider />
        <v-card-actions>
          <!-- <v-btn
            outlined
            color="red"
            left
            @click="dialogAttributeLevel1 = false"
          >
            Cancel
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="boostDialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="600px" scrollable>
      <v-card>

        <v-card-title class="ui-dialog-header">
          Повышение аттрибутов ({{ currentLevel }} уровень)
          <v-spacer />
          <v-icon @click="boostDialog = false">close</v-icon>
        </v-card-title>

        <v-card-text class="pa-4">

          <div class="ui-section-header">
            Свободные повышения: {{ 4 - currentBoost }}
          </div>

          <v-simple-table class="ui-table">
            <tbody>
              <tr v-for="attr in attributeRepository" :key="attr.key" class="ui-row" :class="{
                'ui-row--disabled': isAttributeDisabledLevel(attr.key, currentLevel),
                'ui-row--active': isAttributeUpgradedLevel(attr.key, currentLevel)
              }" @click="handleAttributeClickLevel(attr.key, currentLevel)">
                <td class="ui-cell ui-cell--name">
                  {{ attr.name }}
                </td>

                <td class="ui-cell ui-cell--mod">
                  {{ ModProfAttr(attr.key, currentLevel) }}
                </td>
              </tr>
            </tbody>
          </v-simple-table>

        </v-card-text>

      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogSkillLevel1" :fullscreen="$vuetify.breakpoint.xsOnly" width="600px" scrollable>
      <v-card>
        <v-card-title class="ui-dialog-header">
          <span>Повышение Характеристик</span>
          <v-spacer />
          <v-icon @click="dialogSkillLevel1 = false"> close </v-icon>
        </v-card-title>

        <v-divider />

        <v-card-title> </v-card-title>

        <v-divider />
        <v-card-text class="pa-6">
          <v-col :cols="12" :md="12">
            <v-card>

              <div class="ui-section-header">
                Количество свободных повышений навыков:
                {{ characterSkillPointClass + modInt(1) - skillSheetPoints("", 1) }}
              </div>


              <div class="skill-list">

                <v-card v-for="skill in finalSkillRepository" :key="skill.key" class="skill-card" :class="{
                  'skill-card--disabled': isSkillDisabled(skill),
                  'skill-card--active': isSkillUpgraded(skill)
                }" outlined @click="handleSkillClick(skill)">

                  <div class="skill-card__main">

                    <div class="skill-name">
                      {{ skill.name }}
                    </div>


                    <div class="skill-value">
                      {{
                        (ModAttribute(skill.attribute, skill.key, 1) >= 0 ? '+' : '') +
                        ModAttribute(skill.attribute, skill.key, 1)
                      }}
                    </div>

                  </div>


                  <div class="skill-meta">

                    <v-chip small outlined>
                      {{attributeRepository.find(
                        i => i.key === skill.attribute
                      )?.short}}
                    </v-chip>


                    <span>
                      Мод:
                      {{ (characterAttributes[skill.attribute] - 10) / 2 }}
                    </span>


                    <span>
                      Владение:
                      {{ ModProf(skill.attribute, skill.key, 1) }}
                    </span>


                    <span>
                      {{ skillSheetTrained(skill.key, 1) }}
                    </span>


                    <v-icon v-if="skill.custom" small class="ml-auto" @click.stop="removeCustomSkill(skill.key, 1)">
                      mdi-delete
                    </v-icon>

                  </div>


                </v-card>

              </div>



              <v-spacer></v-spacer>

              <v-card-actions style="justify-content: center">
                <v-btn x-small text @click="openSkillsSettings(1)">Дополнительное Знание <v-icon
                    small>settings</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-card-text>

        <v-divider />
        <v-card-actions>
          <!-- <v-btn outlined color="red" left @click="dialogSkillLevel1 = false">
            Cancel
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Custom Skills -->
    <v-dialog v-model="skillsEditorDialog" width="600px" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card>
        <v-alert :value="alert" type="error" text dense border="left">
          Знание уже существует
        </v-alert>
        <v-alert :value="skillLevel === 1
          ? characterSkillPointClass +
          characterSkillPointClassUp +
          characterSkillPointBackground -
          skillSheetPoints('', 1) <=
          0
          : 1 - skillSheetAll('', skillLevel) <= 0
          " type="info" text dense border="left">
          Недостаточно очков Навыка для добавления нового Знания
        </v-alert>
        <v-card-title class="ui-dialog-header">
          Редактирование Знаний
          <v-spacer />
          <v-icon dark @click="closeSkillsSettings">close</v-icon>
        </v-card-title>

        <v-card-text class="pt-4">
          <v-text-field v-model="customSkill.name" dense label="Имя Знания"></v-text-field>
          <v-textarea v-model="customSkill.description" dense label="Описание"></v-textarea>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn small right class="ui-btn ui-btn--accent" :disabled="skillLevel === 1
            ? characterSkillPointClass +
            characterSkillPointClassUp +
            characterSkillPointBackground -
            skillSheetPoints('', 1) <=
            0
            : 1 - skillSheetAll('', skillLevel) <= 0
            " @click="saveCustomSkill(skillLevel)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Скилл на каждом уровне -->
    <v-dialog v-model="dialogSkill" :fullscreen="$vuetify.breakpoint.xsOnly" width="600px" scrollable>
      <v-card>
        <v-card-title class="ui-dialog-header">
          <span>Повышение Характеристик</span>
          <v-spacer />
          <v-icon @click="dialogSkill = false"> close </v-icon>
        </v-card-title>

        <v-divider />

        <v-card-title> </v-card-title>

        <v-divider />
        <v-card-text class="pa-6">
          <v-col :cols="12" :md="12">
            <v-card>
              <v-card-title class="ui-section-header">
                <h2 class="subtitle-1">
                  Количество свободных очков навыка:
                  {{ 1 + modInt(skillLevel) - skillSheetAll("", skillLevel) }}
                </h2>
              </v-card-title>
              <div class="skill-list">

                <v-card v-for="skill in finalSkillRepository" :key="skill.key" class="skill-card" :class="{
                  'skill-card--disabled': isSkillDisabledLevel(skill, skillLevel),
                  'skill-card--active': isSkillUpgradedLevel(skill, skillLevel)
                }" outlined @click="handleSkillClickLevel(skill, skillLevel)">

                  <!-- Название + итоговый модификатор -->
                  <div class="skill-card__main">

                    <div class="skill-name">
                      {{ skill.name }}
                    </div>

                    <div class="skill-value">
                      {{
                        (ModAttribute(skill.attribute, skill.key, skillLevel) >= 0 ? '+' : '') +
                        ModAttribute(skill.attribute, skill.key, skillLevel)
                      }}
                    </div>

                  </div>


                  <!-- Информация -->
                  <div class="skill-meta">

                    <!-- Атрибут -->
                    <v-chip small outlined>
                      {{attributeRepository.find(
                        i => i.key === skill.attribute
                      )?.short}}

                      {{
                        (characterAttributes[skill.attribute] - 10) / 2
                      }}
                    </v-chip>


                    <!-- Владение -->
                    <v-chip small outlined>
                      Владение:
                      {{ ModProf(skill.attribute, skill.key, skillLevel) }}
                    </v-chip>


                    <!-- Обучение -->
                    <v-chip small outlined>
                      {{ skillSheetTrained(skill.key, skillLevel) }}
                    </v-chip>


                    <!-- Удаление кастомного навыка -->
                    <v-icon v-if="skill.custom && skill.optional !== true" small class="skill-delete"
                      @click.stop="removeCustomSkill(skill.key, skillLevel)">
                      mdi-delete
                    </v-icon>


                  </div>

                </v-card>

              </div>
              <v-spacer></v-spacer>


              <v-card-actions style="justify-content: center">
                <v-btn x-small text @click="openSkillsSettings(skillLevel)">Дополнительное Знание <v-icon
                    small>settings</v-icon></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-card-text>
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
  props: [],
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
      refEx: /\d+/g,
      manageBoost1: true,
      manageBoost5: false,
      manageBoost10: false,
      modifications: [],
      manageBoost15: false,
      manageBoost20: false,

      skillLevel: 1,
      dialogAttributeLevel1: false,
      skillsEditorDialog: false,
      dialogSkillLevel1: false,
      dialogSkill: false,

      selectedAncestryBoost: undefined,
      selectedClassBoost: undefined,
      selectedClassSkill: undefined,
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
        L: 4,
      }
      , charSkill: {
        0: "U",
        1: "T",
        2: "E",
        3: "M",
        4: "L",
      },
      boostDialog: false,
      currentLevel: null,

      dialogAttributeLevel1: false,
      dialogSkillLevel1: false,
      dialogSkill: false,

      // вместо characterBoost5/10/15/20
      boostState: {
        1: 0,
        5: 0,
        10: 0,
        15: 0,
        20: 0
      }
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
          stats:
            this.characterBackgroundBoost,
        },
        {
          source: 'Наследие',
          stats: this.mergeStats(
            this.characterAncestryBoost,
            this.characterAttributesAncestryFlaw
          )
        },
        {
          source: 'Класс',
          stats: this.characterClassBoost1
        },
        {
          source: '1 уровень',
          stats: this.characterAttributeBoost
        },
        {
          source: '5 уровень',
          stats: this.characterAttributeBoost5
        },
        {
          source: '10 уровень',
          stats: this.characterAttributeBoost10
        },
        {
          source: '15 уровень',
          stats: this.characterAttributeBoost15
        },
        {
          source: '20 уровень',
          stats: this.characterAttributeBoost20
        },
      ].filter(row => row.stats);
    },

    availableLevels() {
      return Array.from({ length: this.characterLevel }, (_, i) => i + 1)
    },
    currentBoost() {
      return this.boostState[this.currentLevel] || 0
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
      const map = {}
      for (let lvl = 1; lvl <= this.characterLevel(); lvl++) {
        const data = this.getDisplayProgress(lvl) || {}

        map[lvl] = {
          current: data.current || 0,
          max: data.max || 0
        }
      }
      return map
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
    characterBoost() {
      return this.$store.getters['characters/characterBoostById'](this.characterId);
    },
    characterBoost5() {
      return this.$store.getters['characters/characterBoost5ById'](this.characterId);
    },
    characterBoost10() {
      return this.$store.getters['characters/characterBoost10ById'](this.characterId);
    },
    characterBoost15() {
      return this.$store.getters['characters/characterBoost15ById'](this.characterId);
    },
    characterBoost20() {
      return this.$store.getters['characters/characterBoost20ById'](this.characterId);
    },
    characterSkillPoints() {
      return this.$store.getters['characters/characterSkillPointsById'](this.characterId);
    },
    characterAncestryBoost() {
      return this.$store.getters['characters/characterAncestryBoostById'](this.characterId);
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
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadSpecies(newVal);
        }
      },
      immediate: true,
    },
    characterArchetypeKey: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadArchetype(newVal);
        }
      },
      immediate: true,
    },
    characterAscensionKey: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadAscension(newVal);
        }
      },
      immediate: true,
    },

    characterAttributes: {
      handler() {
        this.needsProgressUpdate = true;
      },
      deep: true
    },
    characterBoost() {
      this.needsProgressUpdate = true;
    },
    characterBoost5() {
      this.needsProgressUpdate = true;
    },
    characterBoost10() {
      this.needsProgressUpdate = true;
    },
    characterBoost15() {
      this.needsProgressUpdate = true;
    },
    characterBoost20() {
      this.needsProgressUpdate = true;
    },
    characterSkills: {
      handler() {
        this.needsProgressUpdate = true;
      },
      deep: true
    },
    // ... остальные вотчеры

  },
  mounted() {
    // Сохраняем прогресс при загрузке компонента
    // this.saveProgress();
  },
  methods: {
    async loadArchetype(key) {
      this.loading = true;
      if (key === 'advanced') {
        this.archetype = { prerequisites: [] };
      } else {
        const { data } = await this.$axios.get(`/api/archetypes/${key}`);
        this.archetype = data;
      }
      this.selectedClassBoost = this.characterClassBoost;

      this.selectedClassSkill = this.characterSkillSheet().find(s => s.level === 1 && s.type === 'class');
      this.ClassAttribute = this.attributeRepository.filter(boost => this.archetype.keyAbility.some((m) => boost.key.includes(m)));
      this.ClassSkill = this.skillRepository.filter(boost => this.archetype.skillTrainedChoice.some((m) => boost.key.includes(m)));

      this.loading = false;
    },
    async loadAscension(key) {
      this.loading = true;
      let finalData = {};
      const { data } = await this.$axios.get(`/api/ascension-packages/${key}`);
      finalData = data;
      this.ascension = finalData;

      this.BackgroundAttribute = this.attributeRepository.filter(boost => this.ascension.boost1.some((m) => boost.key.includes(m)));
      this.BackgroundAttribute2 = this.attributeRepository;
      this.selectedBackgroundBoost = this.characterBackgroundFreeBoost;
      this.selectedBackgroundBoost2 = this.characterBackgroundFreeBoost2;
      this.loading = false;

    },
    characterSkillSheet() {
      return this.$store.getters["characters/characterSkillSheetById"](
        this.characterId
      );
    },
    async loadSpecies(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/species/${key}`);

      this.species = data;
      this.boost = this.species ? this.species.abilityBoost : 0;
      this.AncestryAttribute = this.species.attributeBoost.filter(boost => boost.value == 0);
      this.AncestryAttribute2 = this.species.attributeBoost.filter(boost => boost.value == 0);

      this.selectedAncestryBoost = this.characterAncestryFreeBoost;
      this.selectedAncestryBoost2 = this.characterAncestryFreeBoost2;
      this.selectedBoost = this.AncestryFreeBoost;
      this.loading = false;
    },

    skillChoiceModel(level) {
      return this.skillChoice[this.label(level)];
    },
    incrementSkill(skill, level) {
      //Тест
      if (this.characterSkillSheet()) {
        if (this.characterSkillSheet()?.filter(item => item.key === skill && item.type === 'skill' && item.level > level).length !== 0) {
          const sheet = this.characterSkillSheet()?.filter(item => item.key === skill && item.type === 'skill' && item.level > level).reduce((min, current) => current.level < min.level ? current : min);
          const length = this.characterSkillSheet()?.filter(item => item.key === skill).length;

          if (sheet && ((length >= 2 && level <= 3) || (length >= 3 && level <= 7) || (length >= 4 && level <= 15)))
            this.$store.commit('characters/removeSkillSheet', { id: this.characterId, key: skill, level: sheet.level, type: 'skill', optional: false });
        }

      }


      this.$store.commit('characters/addSkillSheet', { id: this.characterId, key: skill, level: level, type: 'skill', optional: false });

      this.$store.commit('characters/setCharacterskillInitial', { id: this.characterId, payload: { value: 1, skill: skill } });
      var keys = Object.keys(this.SkillsTrained);
      var loc = keys.indexOf(this.characterSkills[skill]);
      const newValue = keys[loc + 1];
      this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: skill, value: this.characterSkillPoints - 1 } });
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });
    },
    decrementSkill(skill, level) {
      this.skillChoiceInitial.filter(item => item !== skill);
      this.$store.commit('characters/setCharacterskillInitial', { id: this.characterId, payload: { value: -1, skill: skill } });

      //Тест
      this.$store.commit('characters/removeSkillSheet', { id: this.characterId, key: skill, level: level, type: 'skill', optional: false });

      var keys = Object.keys(this.SkillsTrained);
      var loc = keys.indexOf(this.characterSkills[skill]);
      const newValue = keys[loc - 1];
      this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: skill, value: this.characterSkillPoints + 1 } });
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });
    },
    incrementAttribute(attribute, level) {
      const newValue = this.characterAttributes[attribute] >= 18 ? this.characterAttributes[attribute] + 1 : this.characterAttributes[attribute] + 2;

      if (attribute == "intellect")
        this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: attribute, value: this.characterSkillPoints + 1 } });

      //В зависимости от левела
      switch (level) {
        case 1:
          this.$store.commit('characters/setCharacterAttributeBoost', { id: this.characterId, payload: { key: attribute, value: 1 } });
          this.$store.commit('characters/setCharacterBoost', { id: this.characterId, payload: { key: attribute, value: +1 } });
          this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
          break;
        case 5:
          this.$store.commit('characters/setCharacterAttributeBoost5', { id: this.characterId, payload: { key: attribute, value: 1 } });
          this.$store.commit('characters/setCharacterBoost5', { id: this.characterId, payload: { key: attribute, value: +1 } });
          this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
          break;
        case 10:
          this.$store.commit('characters/setCharacterAttributeBoost10', { id: this.characterId, payload: { key: attribute, value: 1 } });
          this.$store.commit('characters/setCharacterBoost10', { id: this.characterId, payload: { key: attribute, value: +1 } });
          this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
          break;
        case 15:
          this.$store.commit('characters/setCharacterAttributeBoost15', { id: this.characterId, payload: { key: attribute, value: 1 } });
          this.$store.commit('characters/setCharacterBoost15', { id: this.characterId, payload: { key: attribute, value: +1 } });
          this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
          break;
        case 20:
          this.$store.commit('characters/setCharacterAttributeBoost20', { id: this.characterId, payload: { key: attribute, value: 1 } });
          this.$store.commit('characters/setCharacterBoost20', { id: this.characterId, payload: { key: attribute, value: +1 } });
          this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
          break;
      }

    },
    decrementAttribute(attribute, level) {

      const newValue = this.characterAttributes[attribute] > 18 ? this.characterAttributes[attribute] - 1 : this.characterAttributes[attribute] - 2;
      if (attribute == "intellect")
        this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: attribute, value: this.characterSkillPoints - 1 } });

      switch (level) {
        case 1:
          this.$store.commit('characters/setCharacterAttributeBoost', { id: this.characterId, payload: { key: attribute, value: 0 } });
          this.$store.commit('characters/setCharacterBoost', { id: this.characterId, payload: { key: attribute, value: -1 } });
          this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
          break;
        case 5:
          this.$store.commit('characters/setCharacterAttributeBoost5', { id: this.characterId, payload: { key: attribute, value: 0 } });
          this.$store.commit('characters/setCharacterBoost5', { id: this.characterId, payload: { key: attribute, value: -1 } });
          this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
          break;
        case 10:
          this.$store.commit('characters/setCharacterAttributeBoost10', { id: this.characterId, payload: { key: attribute, value: 0 } });
          this.$store.commit('characters/setCharacterBoost10', { id: this.characterId, payload: { key: attribute, value: -1 } });
          this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
          break;
        case 15:
          this.$store.commit('characters/setCharacterAttributeBoost15', { id: this.characterId, payload: { key: attribute, value: 0 } });
          this.$store.commit('characters/setCharacterBoost15', { id: this.characterId, payload: { key: attribute, value: -1 } });
          this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
          break;
        case 20:
          this.$store.commit('characters/setCharacterAttributeBoost20', { id: this.characterId, payload: { key: attribute, value: 0 } });
          this.$store.commit('characters/setCharacterBoost20', { id: this.characterId, payload: { key: attribute, value: -1 } });
          this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
          break;
      }

    },
    characterlabel(key) {
      switch (key) {
        case "U":
          return "Нетренирован"
        case "T":
          return "Тренирован"
        case "E":
          return "Эксперт"
        case "M":
          return "Мастер"
        case "L":
          return "Легенда"
        default:
          return "Нетренирован"
      }
    },
    characterTrained(value) {
      switch (value) {
        case 0:
          return "Нетренирован"
        case 1:
          return "Тренирован"
        case 2:
          return "Эксперт"
        case 3:
          return "Мастер"
        case 4:
          return "Легенда"
        default:
          return "Нетренирован"
      }
    },
    characterLevel() {
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    characterSkillSheet() {
      return this.$store.getters['characters/characterSkillSheetById'](this.characterId);
    },
    skillSheetTrained(key, level) {
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.key === key && s.level <= level && (s.combinded === false || !s.combinded)) : undefined;
      return skill ? this.characterTrained(skill.length) : this.characterTrained(0);
    },
    skillSheetAll(key, level) {
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.level === level && (s.combinded === false || !s.combinded) && s.optional !== true) : undefined;
      return skill ? skill.length : 0;
    },
    skillSheetPoints(key, level) {
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.level === level && s.type === 'skill' && (s.combinded === false || !s.combinded)) : undefined;
      return skill ? skill.length : 0;
    },
    skillSheetSkillLevel(key, level) {
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.key === key && s.level < level && (s.combinded === false || !s.combinded)) : undefined;
      return skill ? skill.length : 0;
    },
    skillSheetValue(key, level) {
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.key === key && s.level === level && s.combinded === false && s.optional !== true) : undefined;
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
      const ProfLen = skill ? skill.length : 0;
      if (skill.length === 2 && level < 7)
        return true;
      if (skill.length === 3 && level < 15)
        return true;
      if (skill.length === 4)
        return true;
      return false;
    },
    ModAttribute(attribute, skill, level) {
      // const level = this.characterLevel();

      const sheet = this.$store.getters["characters/characterSkillSheetById"](
        this.characterId
      );
      const prof = sheet.filter(
        (s) => s.key === skill && s.level <= level && s.combinded !== true
      ).length;

      const char1 = this.SkillsTrained[this.charSkill[prof]];
      // const char1 = this.SkillsTrained[this.characterSkills[skill]];
      const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = char1 === 0 ? 0 : level;
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    ModProf(attribute, skill, level) {
      // const level = this.characterLevel();

      const sheet = this.$store.getters["characters/characterSkillSheetById"](
        this.characterId
      );
      const prof = sheet.filter(
        (s) => s.key === skill && s.level <= level && s.combinded !== true
      ).length;

      const char1 = this.SkillsTrained[this.charSkill[prof]];
      // const char1 = this.SkillsTrained[this.characterSkills[skill]];
      // const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = char1 === 0 ? 0 : level;
      return parseInt(char1) + parseInt(char3);
    },
    formatBoost(stat, rowIndex) {
      let count = 0;

      for (let i = 0; i <= rowIndex; i++) {
        count += this.tableRows[i].stats?.[stat] || 0;
      }

      if (count <= 4) return this.tableRows[rowIndex].stats?.[stat] || 0;

      // после 4
      if (this.tableRows[rowIndex].stats?.[stat] === 0) return 0;

      return (count - 4) % 2 === 1 ? 0.5 : 1;
    },
    ModProfAttr(attr, level) {
      // let result = this.characterAttributesEnhanced[attr];
      let result = 0

      this.tableRows.forEach((row, rowIndex) => {
        result += this.formatBoost(attr, rowIndex)
      })

      let boost = result > 4 ? 0.5 : 1;
      if (level !== 20 && this.characterAttributesBoost20[attr] > 0) {
        result = result - boost;
        boost = result > 4 ? 0.5 : 1;
      }

      if (level < 15 && this.characterAttributesBoost15[attr] > 0) {
        result = result - boost;
        boost = result > 4 ? 0.5 : 1;
      }

      if (level < 10 && this.characterAttributesBoost10[attr] > 0) {
        result = result - boost;
        boost = result > 4 ? 0.5 : 1;
      }

      if (level < 5 && this.characterAttributesBoost5[attr] > 0) {
        result = result - boost;
        boost = result > 4 ? 0.5 : 1;
      }
      // const result = this.characterAttributes[attribute]
      const modRaw = (result);       // настоящее дробное значение
      const mod = Math.floor(modRaw);         // отображаемое целое значение


      const arrow = Number.isInteger(modRaw) ? "" : " ⯅";  // стрелка только если дробное

      return (mod > 0 ? "+ " : " ") + mod + arrow;


    },
    ModAttributeSaving(attribute, skill) {
      const char1 = this.SkillsTrained[this.characterSaving[skill]];
      const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = this.characterLevel();
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    ModAttributeClass() {
      const char1 = this.SkillsTrained[this.SkillClass()];
      const char3 = this.characterLevel();
      if (this.archetype)
        return parseInt(char1) + parseInt(char3);
      else
        0
    },
    ModAttributePerception(attribute, skill) {
      const char1 = this.SkillsTrained[this.SkillPerception()];
      const char2 = (this.characterAttributes["wisdom"] - 10) / 2;
      const char3 = this.characterLevel();
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
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
          return this.characterAttributesBoost["intellect"] + this.characterAncestryBoost["intellect"] + this.characterBackgroundBoost["intellect"] + this.characterAttributesClass["intellect"];
        case 5:
          return this.characterAttributesBoost5["intellect"];
        case 10:
          return this.characterAttributesBoost10["intellect"];
        case 15: ;
          return this.characterAttributesBoost15["intellect"];
        case 20:
          return this.characterAttributesBoost20["intellect"];
      }

      return 0;
    },

    characterProgressionMax(level) {
      let boost = 0;
      let modInt = 0;
      let skill = 0

      if (level % 5 === 0) {
        switch (level) {
          case 5:
            boost = 4;
            modInt = this.characterAttributesBoost5["intellect"];
            break;
          case 10:
            boost = 4;
            modInt = this.characterAttributesBoost10["intellect"];
            break;
          case 15:
            boost = 4;
            modInt = this.characterAttributesBoost15["intellect"];
            break;
          case 20:
            boost = 4;
            modInt = this.characterAttributesBoost20["intellect"];
            break;
        }
      }


      if (level !== 1) {
        skill = 1 + modInt;
      }


      if (level === 1) {

        let class1 = this.archetype?.keyAbility?.length > 1 ? 1 : 0;
        let class2 = this.archetype?.skillTrainedChoice?.length > 1 ? 1 : 0;
        let back = this.BackgroundAttribute?.length > 1 ? 1 : 0;
        let back2 = this.BackgroundAttribute2?.length > 1 ? 1 : 0;
        let spec = this.AncestryAttribute?.length > 1 ? 1 : 0;
        let spec2 = this.AncestryAttribute2?.length > 1 && this.boost === 2 ? 1 : 0;


        modInt = this.characterAttributesBoost["intellect"] + this.characterAncestryBoost["intellect"] + this.characterBackgroundBoost["intellect"] + this.characterAttributesClass["intellect"];
        boost = 4;
        skill = this.characterSkillPointClass +
          this.characterSkillPointBackground +
          this.characterSkillPointClassUp + modInt;

        this.$store.commit('characters/characterProgressMax', { id: this.characterId, level: level, value: boost + skill + class1 + class2 + back + back2 + spec + spec2 });

        //let other = this.selectedAncestryBoost?.length + this.selectedAncestryBoost2?.length + this.selectedBackgroundBoost?.length + this.selectedBackgroundBoost2?.length;
        return boost + skill + class1 + class2 + back + back2 + spec + spec2;

      }
      this.$store.commit('characters/characterProgressMax', { id: this.characterId, level: level, value: boost + skill });
      return boost + skill;
    },
    characterProgressionBoost(level) {
      let boost = 0;
      let modInt = 0;
      if (level % 5 === 0) {
        switch (level) {
          case 5:
            boost = 4 - this.characterBoost5;
            modInt = this.characterAttributesBoost5["intellect"];
            break;
          case 10:
            boost = 4 - this.characterBoost10;
            modInt = this.characterAttributesBoost10["intellect"];
            break;
          case 15:
            boost = 4 - this.characterBoost15;
            modInt = this.characterAttributesBoost15["intellect"];
            break;
          case 20:
            boost = 4 - this.characterBoost20;
            modInt = this.characterAttributesBoost20["intellect"];
            break;
        }
      }

      let skill = 0
      if (level === 1) {
        boost = 4 - this.characterBoost;
      }

      return boost + skill;
    },
    // characterProgressionSkill(level) {
    //   let boost = 0;
    //   let modInt = 0;
    //   if (level % 5 === 0) {
    //     switch (level) {
    //       case 5:
    //         boost = 4 - this.characterBoost5;
    //         modInt = this.characterAttributesBoost5["intellect"];
    //         break;
    //       case 10:
    //         boost = 4 - this.characterBoost10;
    //         modInt = this.characterAttributesBoost10["intellect"];
    //         break;
    //       case 15:
    //         boost = 4 - this.characterBoost15;
    //         modInt = this.characterAttributesBoost15["intellect"];
    //         break;
    //       case 20:
    //         boost = 4 - this.characterBoost20;
    //         modInt = this.characterAttributesBoost20["intellect"];
    //         break;
    //     }
    //   }

    //   let skill = 0
    //   if (level !== 1) {
    //     skill = 1 + modInt - this.skillSheetAll("", level)
    //   }


    //   if (level === 1) {
    //     modInt = this.characterAttributesBoost["intellect"] + this.characterAncestryBoost["intellect"] + this.characterBackgroundBoost["intellect"] + this.characterAttributesClass["intellect"];
    //     skill = this.characterSkillPointClass +
    //       modInt - this.skillSheetPoints("", 1);
    //   }
    //   return skill;
    // },
    updateSelect(boost) {
      this.$store.commit('characters/setCharacterAncestryFreeBoost', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelect2(boost) {
      this.$store.commit('characters/setCharacterAncestryFreeBoost2', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectBackground(boost) {
      this.$store.commit('characters/setCharacterBackgroundFreeBoost', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectClassAttribute(boost) {
      this.$store.commit('characters/setCharacterClassAttribute', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectClassSkill(boost) {
      // Классовые повышения

      const sheet = this.$store.getters["characters/characterSkillSheetById"](
        this.characterId
      );

      this.ClassSkill.forEach(item => {
        if (sheet.find((i) => i.key === item.key && i.level === 1 && i.type === 'skill'))
          this.$store.commit("characters/setCharacterSkillPointClassUp", {
            id: this.characterId,
            write: false,
            payload: { key: 1, value: 1 },
          });

        this.$store.commit('characters/removeSkillSheet', { id: this.characterId, key: item.key, level: 1, type: 'skill', optional: true });
        this.$store.commit('characters/removeSkillSheet', { id: this.characterId, key: item.key, level: 1, type: 'class', optional: true });


      })

      let comb = true;
      if (sheet.find((i) => i.key === boost && i.level === 1))
        comb = false;

      this.$store.commit('characters/addSkillSheet', { id: this.characterId, key: boost, level: 1, type: 'class', optional: true, combinded: false });


      // this.$store.commit('characters/removeSkillSheetbyType', { id: this.characterId, key: boost, type: 'class', optional: false });
      // this.$store.commit('characters/setCharacterClassSkill', { id: this.characterId, payload: { key: boost, level: 1, optional: true, value: 1 } });
    },
    updateSelectBackground2(boost) {
      this.$store.commit('characters/setCharacterBackgroundFreeBoost2', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectClassSkillLevel(boost, level) {

      this.$store.commit('characters/setCharacterClassSkillLevel', { id: this.characterId, payload: { key: boost, level: level } });
    },
    SkillPerception() {
      return this.$store.getters['characters/characterPerseptionById'](this.characterId);
    },
    SkillClass() {
      return this.$store.getters['characters/characterSkillClassById'](this.characterId);
    },
    isAffordable(cost) {
      return cost <= this.remainingBuildPoints;
    },
    label(level) {
      return "level" + level.toString();
    },
    openSkillsSettings(level) {
      this.skillsEditorDialog = true;
      this.skillLevel = level;
    },
    openSkillLevel(level) {
      this.skillLevel = level;
      this.dialogSkill = true;
    },
    closeSkillsSettings() {
      this.customSkill = {
        key: undefined,
        name: 'Знание',
        atttribute: 'intellect',
        description: '',
      };
      this.skillsEditorDialog = false;
      this.alert = false;
    },
    // Новые методы для работы с прогрессом
    getDisplayProgress(level) {
      return {
        current: this.calculateProgress(level),
        max: this.calculateProgressMax(level)
      };
    },
    SkillLabel(skill) {
      //      const skills = [...this.skillRepository, ...this.characterCustomSkills];
      const level = this.characterLevel()
      const prof = this.characterSkillSheet.filter(
        (s) => s.key === skill && s.level <= level && s.combinded !== true
      ).length;

      switch (prof) {
        case 0:
          return "Н";
        case 1:
          return "Т";
        case 2:
          return "Э";
        case 3:
          return "М";
        case 4:
          return "Л";
        default:
          return "Н";
      }

      // const char1 = this.profiencyRepository[this.charSkill[prof]];
      // const char2 = (this.characterAttributes[attribute] - 10) / 2;
      // const char3 = char1 === 0 ? 0 : this.characterLevel();
      // return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    getSkillRank(skillKey, level) {
      const skillSheet = this.characterSkillSheet() || [];
      // const level = this.characterLevel()

      return skillSheet.filter((s) => s.key === skillKey && s.level <= level && s.combinded !== true).length;
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
    calculateProgress(level) {
      let boost = 0;
      let modInt = 0;

      if (level % 5 === 0) {
        switch (level) {
          case 5:
            boost = this.characterBoost5;
            modInt = this.characterAttributesBoost5["intellect"];
            break;
          case 10:
            boost = this.characterBoost10;
            modInt = this.characterAttributesBoost10["intellect"];
            break;
          case 15:
            boost = this.characterBoost15;
            modInt = this.characterAttributesBoost15["intellect"];
            break;
          case 20:
            boost = this.characterBoost20;
            modInt = this.characterAttributesBoost20["intellect"];
            break;
        }
      }

      let skill = 0;
      // if (level !== 1 ) {
      //   skill = 1 + modInt - this.skillSheetAll("", level);
      // }

      if (level !== 1) {
        if (this.archetype?.keywords === 'плут')
          skill = this.skillSheetAll("", level);
        else if (level % 2 !== 0)
          skill = this.skillSheetAll("", level);
        else
          skill = this.skillSheetAll("", level);
      }

      if (level === 1) {
        // let class1 = (this.archetype?.keyAbility?.length > 1 ? 1 : 0 ) - (this.characterClassBoost?.length > 0 ? 1 : 0);
        // let class2 = (this.archetype?.skillTrainedChoice?.length > 1 ? 1 : 0) - (this.characterClassSkill?.length > 0 ? 1 : 0);
        // let back = (this.BackgroundAttribute?.length > 1 ? 1 : 0) - (this.characterBackgroundFreeBoost?.length > 0 ? 1 : 0);
        // let back2 = (this.BackgroundAttribute2?.length > 1 ? 1 : 0) - (this.characterBackgroundFreeBoost2?.length > 0 ? 1 : 0);
        // let spec = (this.AncestryAttribute?.length > 1 ? 1 : 0) - (this.characterAncestryFreeBoost?.length > 0 ? 1 : 0);
        // let spec2 = (this.AncestryAttribute2?.length > 1 && this.boost === 2 ? 1 : 0) - (this.characterAncestryFreeBoost2?.length > 0 ? 1 : 0);

        let class1 = (this.characterClassBoost?.length > 0 ? 1 : 0)
        let class2 = (this.selectedClassSkill ? 1 : 0);
        let back = (this.characterBackgroundFreeBoost?.length > 0 ? 1 : 0);
        let back2 = (this.characterBackgroundFreeBoost2?.length > 0 ? 1 : 0);
        let spec = (this.characterAncestryFreeBoost?.length > 0 ? 1 : 0);
        let spec2 = (this.characterAncestryFreeBoost2?.length > 0 ? 1 : 0);

        modInt = this.characterAttributesBoost["intellect"] + this.characterAncestryBoost["intellect"] + this.characterBackgroundBoost["intellect"] + this.characterAttributesClass["intellect"];
        boost = this.characterBoost;
        skill = this.skillSheetPoints("", 1)
        this.$store.commit('characters/characterProgress', {
          id: this.characterId,
          level,
          value: boost + skill + class1 + class2 + back + back2 + spec + spec2
        });
        return boost + skill + class1 + class2 + back + back2 + spec + spec2;

      }
      this.$store.commit('characters/characterProgress', {
        id: this.characterId,
        level,
        value: boost + skill
      });
      return boost + skill;
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
    calculateProgressMax(level) {
      let boost = 0;
      let modInt = 0;
      let skill = 0;

      if (level % 5 === 0) {
        switch (level) {
          case 5:
            boost = 4;
            modInt = this.characterAttributesBoost5["intellect"];
            break;
          case 10:
            boost = 4;
            modInt = this.characterAttributesBoost10["intellect"];
            break;
          case 15:
            boost = 4;
            modInt = this.characterAttributesBoost15["intellect"];
            break;
          case 20:
            boost = 4;
            modInt = this.characterAttributesBoost20["intellect"];
            break;
        }
      }

      if (level !== 1) {
        if (this.archetype?.keywords === 'плут')
          skill = 1 + modInt;
        else if (level % 2 !== 0)
          skill = 1 + modInt;
        else
          skill = modInt;
      }



      if (level === 1) {
        let class1 = this.archetype?.keyAbility?.length > 1 ? 1 : 0;
        let class2 = this.archetype?.skillTrainedChoice?.length > 1 ? 1 : 0;
        let back = this.BackgroundAttribute?.length > 1 ? 1 : 0;
        let back2 = this.BackgroundAttribute2?.length > 1 ? 1 : 0;
        let spec = this.AncestryAttribute?.length > 1 ? 1 : 0;
        let spec2 = this.AncestryAttribute2?.length > 1 && this.boost === 2 ? 1 : 0;

        modInt = this.characterAttributesBoost["intellect"] + this.characterAncestryBoost["intellect"] + this.characterBackgroundBoost["intellect"] + this.characterAttributesClass["intellect"];
        boost = 4;
        skill = this.characterSkillPointClass +
          modInt //+ this.skillSheetBack();

        this.$store.commit('characters/characterProgressMax', {
          id: this.characterId,
          level,
          value: boost + skill + class1 + class2 + back + back2 + spec + spec2
        });
        return boost + skill + class1 + class2 + back + back2 + spec + spec2;

      }
      this.$store.commit('characters/characterProgressMax', {
        id: this.characterId,
        level,
        value: boost + skill
      });
      return boost + skill;
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
    characterProgression(level) {
      return this.calculateProgress(level);
    },

    characterProgressionMax(level) {
      return this.calculateProgressMax(level);
    },

    characterProgressionBoost(level) {
      let boost = 0;
      let modInt = 0;

      if (level % 5 === 0) {
        switch (level) {
          case 5:
            boost = 4 - this.characterBoost5;
            modInt = this.characterAttributesBoost5["intellect"];
            break;
          case 10:
            boost = 4 - this.characterBoost10;
            modInt = this.characterAttributesBoost10["intellect"];
            break;
          case 15:
            boost = 4 - this.characterBoost15;
            modInt = this.characterAttributesBoost15["intellect"];
            break;
          case 20:
            boost = 4 - this.characterBoost20;
            modInt = this.characterAttributesBoost20["intellect"];
            break;
        }
      }

      let skill = 0;
      if (level === 1) {
        boost = 4 - this.characterBoost;
      }

      return boost + skill;
    },

    characterProgressionSkill(level) {
      let boost = 0;
      let modInt = 0;

      if (level % 5 === 0) {
        switch (level) {
          case 5:
            modInt = this.characterAttributesBoost5["intellect"];
            break;
          case 10:
            modInt = this.characterAttributesBoost10["intellect"];
            break;
          case 15:
            modInt = this.characterAttributesBoost15["intellect"];
            break;
          case 20:
            modInt = this.characterAttributesBoost20["intellect"];
            break;
        }
      }

      let skill = 0;
      if (level !== 1) {
        skill = 1 + modInt - this.skillSheetAll("", level);
      }

      if (level === 1) {
        modInt = this.characterAttributesBoost["intellect"] + this.characterAncestryBoost["intellect"] + this.characterBackgroundBoost["intellect"] + this.characterAttributesClass["intellect"];
        skill = this.characterSkillPointClass +

          modInt - this.skillSheetPoints("", 1);
      }

      return skill;
    },

    // Метод для сохранения прогресса
    saveProgress() {
      for (let level = 1; level <= 20; level++) {
        const progress = this.calculateProgress(level);
        const progressMax = this.calculateProgressMax(level);

        this.$store.commit('characters/characterProgress', {
          id: this.characterId,
          level,
          value: progress
        });

        this.$store.commit('characters/characterProgressMax', {
          id: this.characterId,
          level,
          value: progressMax
        });
      }
      this.needsProgressUpdate = false;
    },
    /////

    isSkillUpgraded(skill) {
      return this.skillSheetValue(skill.key, 1) > 0;
    },

    handleSkillClick(skill) {
      if (this.isSkillDisabled(skill)) return;

      const value = this.skillSheetValue(skill.key, 1);

      if (value > 0) {
        this.decrementSkill(skill.key, 1);
      } else {
        this.incrementSkill(skill.key, 1);
      }
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
      return this.skillSheetValue(skill.key, level) > 0;
    },
    handleSkillClickLevel(skill, level) {
      if (this.isSkillDisabledLevel(skill, level)) return;

      const value = this.skillSheetValue(skill.key, level);

      if (value > 0) {
        this.decrementSkill(skill.key, level);
      } else {
        this.incrementSkill(skill.key, level);
      }
    },

    isSkillDisabledLevel(skill, skillLevel) {
      const value = this.skillSheetValue(skill.key, skillLevel);
      return (
        (
          ((1 + this.modInt(skillLevel) - this.skillSheetAll("", skillLevel)) <= 0
            && value === 0)
          || (this.skillSheetTrained(skill.key, skillLevel) === "Легенда" && value === 0)
        )
        // this.skillSheetOptional(skill.key, skillLevel) === true ||
        // (this.skillSheetValue(skill.key, 1) === 0 &&
        //   (1 + this.modInt(skillLevel) - this.skillSheetAll("", skillLevel)) <= 0)
        // || this.skillSheetTrained(skill.key, 1) === "Легенда"



      );
    },


    ///Аттрибуты
    ////по уровням
    isAttributeUpgradedLevel(att, level) {
      if (level === 1)
        return (
          this.characterAttributesBoost[att] > 0)

      if (level === 5)
        return (
          this.characterAttributesBoost5[att] > 0)

      if (level === 10)
        return (
          this.characterAttributesBoost10[att] > 0)

      if (level === 15)
        return (
          this.characterAttributesBoost15[att] > 0)


      if (level === 20)
        return (
          this.characterAttributesBoost20[att] > 0)
    },
    handleAttributeClickLevel(att, level) {
      if (this.isAttributeDisabledLevel(att, level)) return;

      let value = 0;

      if (level === 1)
        value = this.characterAttributesBoost[att]

      if (level === 5)
        value = this.characterAttributesBoost5[att]

      if (level === 10)
        value = this.characterAttributesBoost10[att]

      if (level === 15)
        value = this.characterAttributesBoost15[att]


      if (level === 20)
        value = this.characterAttributesBoost20[att]

      if (value === 0) {
        this.incrementAttribute(att, level);
      } else {
        this.decrementAttribute(att, level);
      }
    },

    isAttributeDisabledLevel(att, level) {
      if (level === 1)
        return (4 - this.characterBoost == 0 &&
          this.characterAttributesBoost[att] === 0)

      if (level === 5)
        return (4 - this.characterBoost5 == 0 &&
          this.characterAttributesBoost5[att] === 0)

      if (level === 10)
        return (4 - this.characterBoost10 == 0 &&
          this.characterAttributesBoost10[att] === 0)

      if (level === 15)
        return (4 - this.characterBoost15 == 0 &&
          this.characterAttributesBoost15[att] === 0)


      if (level === 20)
        return (4 - this.characterBoost20 == 0 &&
          this.characterAttributesBoost20[att] === 0)

    },

    // Добавляем вызов сохранения при важных событиях
    beforeDestroy() {
      if (this.needsProgressUpdate) {
        this.saveProgress();
      }
    },
    saveCustomSkill(level) {
      this.alert = false;
      const skill = {
        key: this.textToCamel(this.customSkill.name),
        name: this.customSkill.name,
        level: level,
        attribute: 'intellect',
        type: 'skill',
        description: this.customSkill.description,
        optional: false,
      };
      const doExist = this.skills.find((s) => s.key === skill.key);
      if (doExist) {
        this.alert = true;
        console.warn(`Skill ${skill.name} already exists.`);
      } else {
        this.addCustomSkill(skill);
        // this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: skill, value: this.characterSkillPoints - 1} });
        this.closeSkillsSettings();
      }
    },
    addCustomSkill(skill) {
      const id = this.characterId;
      this.$store.commit('characters/addCharacterCustomSkill', { id, skill });
    },
    removeCustomSkill(key) {
      const id = this.characterId;
      this.$store.commit('characters/removeCharacterCustomSkill', { id, key });
      // this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: key, value: this.characterSkillPoints + 1} });
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
</style>