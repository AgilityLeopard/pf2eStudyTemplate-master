<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <!-- <v-col>
      <h1 class="headline" v-if="archetype">
        Заклинания
        
      </h1>
    </v-col> -->
    <v-tabs centered grow color="red">
      <v-tab class="caption" key="tab-spell" :href="`#tab-spell`"
        ><h2 class="subtitle-2">Заклинания</h2></v-tab
      >
      <v-tab class="caption" key="tab-ritual" :href="`#tab-ritual`"
        ><h2 class="subtitle-2">Ритуал</h2></v-tab
      >
      <v-tab class="caption" key="tab-focus" :href="`#tab-focus`"
        ><h2 class="subtitle-2">Фокусы</h2></v-tab
      >
      <v-tab class="caption" key="tab-innate" :href="`#tab-innate`"
        ><h2 class="subtitle-2">Врожденные</h2></v-tab
      >

      <v-tab-item class="my-tab-item" key="tab-spell" :value="`tab-spell`">
        <v-col v-if="archetype && !archetype.spellTradition" :cols="12">
          <v-alert
            type="warning"
            class="caption ml-4 mr-4"
            dense
            outlined
            border="left"
          >
            У класса нет способности к заклинаниям
          </v-alert>
        </v-col>
        <!-- Характеристики заклинателя -->
        <v-col :cols="12" v-if="archetype && archetype.spellTradition">
          <span
            ><br />
            <b>Обычай:</b> {{ archetype.spellTradition }}
          </span>

          <span>
            <br />
            <b>Сложность заклинаний:</b> {{ ModAttributeClassSpell() }}
          </span>

          <span>
            <br />
            <b>Атака заклинанием:</b> +{{ ModAttributeAttackSpell() }}
          </span>
        </v-col>

        <v-col :cols="12" v-if="archetype && archetype.spellTradition">
          <v-card
            class="mb-4"
            dense
            outlined
            v-for="levelAncestry in 10"
            :key="levelAncestry"
            v-if="
              levelAncestry - 1 <=
                archetype.spellProgression[characterLevel()].findIndex(
                  (t) => t == 0
                ) -
                  1 || characterLevel() == 20
            "
          >
            <!-- <v-data-table
              :headers="headers"
              :items="
                tableRows(
                  levelAncestry - 1,
                  archetype.spellProgression[characterLevel()][
                    levelAncestry - 1
                  ]
                )
              "
              item-key="key"
              hide-default-footer
            >
              <template v-slot:item.name="{ item }">
                <v-row
                  ><span>{{ item.name }}</span></v-row
                >
                <v-row>
                  <div>
                    <trait-view v-if="item.traits" :item="item" class="mb-2" />
                  </div>
                </v-row>
              </template>
            </v-data-table> -->

            <h2 class="subtitle-1 text-center" v-if="levelAncestry - 1 == 0">
              Чары
            </h2>
            <h2 class="subtitle-1 text-center" v v-if="levelAncestry - 1 !== 0">
              {{ levelAncestry - 1 }} уровень
            </h2>

            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th v-for="header in headers" :class="header.class">
                      {{ header.text }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="cell in archetype.spellProgression[characterLevel()][
                      levelAncestry - 1
                    ]"
                  >
                    <td>
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).name
                          : "-"
                      }}
                    </td>
                    <td class="text-center pa-1 small">
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).action
                          : "-"
                      }}
                    </td>
                    <td class="text-center pa-1 small">
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).duration
                          : "-"
                      }}
                    </td>
                    <td class="text-center pa-1 small">
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).distance
                          : "-"
                      }}
                    </td>
                    <td class="text-center pa-1 small">
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).defence
                          : "-"
                      }}
                    </td>
                    <td class="text-center pa-1 small">
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).area
                          : "-"
                      }}
                    </td>
                    <td class="text-center pa-1 small">
                      <v-btn
                        v-if="characterSpell(levelAncestry - 1, cell)"
                        outlined
                        x-small
                        color="info"
                        @click="
                          openDialog(characterSpell(levelAncestry - 1, cell))
                        "
                      >
                        <v-icon left> visibility </v-icon> Просмотр
                      </v-btn>
                    </td>
                    <td>
                      <v-btn
                        v-if="characterSpell(levelAncestry - 1, cell)"
                        outlined
                        x-small
                        color="error"
                        @click.stop.prevent="
                          removeTalent(characterSpell(levelAncestry - 1, cell))
                        "
                      >
                        <v-icon left> delete </v-icon>Удалить
                      </v-btn>
                      <v-btn
                        v-if="!characterSpell(levelAncestry - 1, cell)"
                        outlined
                        x-small
                        color="success"
                        @click="updatePreview(levelAncestry - 1, cell)"
                      >
                        <v-icon left> add </v-icon>Добавить
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <v-dialog v-model="dialog" max-width="800px">
              <v-card v-if="selectedItem">
                <v-card-title>
                  <h2>{{ selectedItem.name }}</h2>
                </v-card-title>
                <v-card-text>
                  <v-row class="rowFeat">
                    <div class="head">
                      <h1>{{ selectedItem.name }}</h1>
                    </div>
                    <div class="line"></div>
                    <div class="tag">Заклинание {{ selectedItem.level }}</div>
                  </v-row>
                  <v-row>
                    <div>
                      <trait-view
                        v-if="selectedItem.traits"
                        :item="selectedItem"
                        class="mb-2"
                      />
                    </div>
                  </v-row>
                  <p></p>
                  <!-- Описание закла -->
                  <div v-if="selectedItem.traditions">
                    <p class="main-holder">
                      <strong>Традиция:</strong>
                      {{ selectedItem.traditions.join(", ") }}
                    </p>
                  </div>
                  <p></p>
                  <div v-if="selectedItem.time">
                    <p class="main-holder">
                      <strong>Сотворение:</strong>
                      {{ selectedItem.time.value }} действия
                    </p>
                  </div>
                  <p></p>
                  <div v-if="selectedItem.range">
                    <p class="main-holder">
                      <strong>Дистанция:</strong> {{ selectedItem.range }}
                    </p>
                  </div>
                  <p></p>
                  <div v-if="selectedItem.area">
                    <p class="main-holder">
                      <strong>Область:</strong> {{ selectedItem.area.value }}
                      {{ selectedItem.area.type }}
                    </p>
                  </div>
                  <p></p>
                  <div v-if="selectedItem.target">
                    <p class="main-holder">
                      <strong>Цель:</strong> {{ selectedItem.target }}
                    </p>
                  </div>
                  <div v-if="selectedItem.defense">
                    <p class="main-holder" v-if="selectedItem.defense.save">
                      <strong>Защита:</strong>
                      <span v-if="selectedItem.defense.save.basic === true"
                        >Базовый
                      </span>
                      {{ selectedItem.defense.save.statistic }}
                    </p>
                  </div>
                  <div v-if="selectedItem.duration">
                    <p class="main-holder">
                      <strong>Длительность:</strong>
                      <span v-if="selectedItem.duration.sustained === true"
                        >Поддерживомое до
                      </span>
                      {{ selectedItem.duration.value }}
                    </p>
                  </div>
                  <p></p>
                  <div class="line"></div>
                  <div
                    class="pt-4 pb-2"
                    v-html="selectedItem.description"
                  ></div>
                  <div class="line"></div>
                  <div
                    class="pt-4 pb-2"
                    v-html="selectedItem.powerDescription"
                  ></div>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" text @click="dialog = false"
                    >Закрыть</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>

            <!-- <v-expansion-panels
          multiple
          v-if="archetype && archetype.spellTradition"
        >
          <v-expansion-panel
            v-for="levelAncestry in 10"
            :key="levelAncestry"
            v-if="
              levelAncestry - 1 <=
                archetype.spellProgression[characterLevel()].findIndex(
                  (t) => t == 0
                ) -
                  1 || characterLevel() == 20
            "
          >
            <v-expansion-panel-header>
              <p v-if="levelAncestry - 1 == 0">Чары</p>
              <p v-if="levelAncestry - 1 !== 0">
                {{ levelAncestry - 1 }} уровень
              </p>
            </v-expansion-panel-header>

            <v-expansion-panel-content :key="levelAncestry">
              <v-row
                v-for="cell in archetype.spellProgression[characterLevel()][
                  levelAncestry - 1
                ]"
              >
                <v-btn
                  @click="updatePreview(levelAncestry - 1, cell)"
                  v-if="!characterSpell(levelAncestry - 1, cell)"
                >
                  Выберите заклинание в ячейку {{ cell }}
                </v-btn>

                <v-expansion-panels
                  multiple
                  v-if="characterSpell(levelAncestry - 1, cell)"
                >
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <template v-slot:default="{ open }">
                        <v-row no-gutters>
                          <v-col :cols="8" :sm="10" class="subtitle-1">
                            <span />
                          </v-col>
                          <v-col :cols="8" :sm="10" class="subtitle-2">
                            <span
                              v-html="
                                characterSpell(levelAncestry - 1, cell).label
                              "
                            />
                          </v-col>
                          <v-col :cols="4" :sm="2">
                            <v-btn
                              color="error"
                              x-small
                              @click.stop.prevent="
                                removeTalent(
                                  characterSpell(levelAncestry - 1, cell)
                                )
                              "
                              >Удалить</v-btn
                            >
                          </v-col>
                          <v-col
                            v-if="!open"
                            :cols="8"
                            :sm="10"
                            class="caption grey--text"
                          >
                            {{
                              characterSpell(levelAncestry - 1, cell).snippet
                            }}
                          </v-col>
                        </v-row>
                      </template>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>


                      <div
                        class="body-2 mb-2"
                        v-html="
                          characterSpell(levelAncestry - 1, cell).description
                        "
                      ></div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-row>


            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels> -->

            <!-- 
     

      <v-btn
        @click="updatePreview(levelAncestry, 'ancestry')"
        v-if="!characterSpell(levelAncestry - 1, cell)"
      >
        Выберите черту {{ levelAncestry }}
      </v-btn>

      <v-expansion-panels
        multiple
        v-if="characterSpell(levelAncestry - 1, cell)"
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            <template v-slot:default="{ open }">
              <v-row no-gutters>
                <v-col :cols="8" :sm="10" class="subtitle-1">
                  <span />
                </v-col>
                <v-col :cols="8" :sm="10" class="subtitle-2">
                  <span
                    v-html="characterSpell(levelAncestry - 1, cell).label"
                  />
                </v-col>
                <v-col :cols="4" :sm="2">
                  <v-btn
                    color="error"
                    x-small
                    @click.stop.prevent="
                      removeTalent(characterSpell(levelAncestry - 1, cell))
                    "
                    >Удалить</v-btn
                  >
                </v-col>
                <v-col
                  v-if="!open"
                  :cols="8"
                  :sm="10"
                  class="caption grey--text"
                >
                  {{ characterSpell(levelAncestry - 1, cell).snippet }}
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div
              class="body-2 mb-2"
              v-html="characterSpell(levelAncestry - 1, cell).description"
            ></div>

            <div v-if="characterSpell(levelAncestry - 1, cell).options">
              <v-select
                v-if="
                  characterSpell(levelAncestry - 1, cell).optionsKey ===
                  'skill'
                "
                :value="characterSpell(levelAncestry - 1, cell).selected"
                :items="skillRepository"
                item-text="name"
                item-value="key"
                placeholder="Выберите навык"
                filled
                dense
                @input="
                  talentUpdateSelected(
                    item,
                    characterSpell(levelAncestry - 1, cell),
                    levelAncestry
                  )
                "
              />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>-->

            <!-- <v-data-table
          :headers="headers"
          :items="filteredPowers"
          :search="searchQuery"
          :items-per-page="-1"
          sort-by="name"
          item-key="key"
          hide-default-footer
        >
          <template v-slot:item.source.key="{ item }">
            <v-chip
                :color="item.source && ['fspg'].includes(item.source.key) ? 'success' : 'info'"
                outlined
                tags
                x-small
                label
            >
              {{item.source.key.toUpperCase()}}
            </v-chip>
          </template>

          <template v-slot:no-results>
            <div class="text-lg-center">
              Your search for "{{ searchQuery }}" found no results.
            </div>
          </template>
        </v-data-table> -->
          </v-card>
        </v-col>
      </v-tab-item>

      <v-tab-item class="my-tab-item" key="tab-innate" :value="`tab-innate`">
        <v-col v-if="!isInnate()" :cols="12">
          <v-alert
            type="warning"
            class="caption ml-4 mr-4"
            dense
            outlined
            border="left"
          >
            У персонажа нет врожденных заклинаний
          </v-alert>
        </v-col>
        <!-- Характеристики заклинателя -->
        <v-col :cols="12" v-if="archetype && archetype.spellTradition">
          <span
            ><br />
            <b>Обычай:</b> {{ archetype.spellTradition }}
          </span>

          <span>
            <br />
            <b>Сложность заклинаний:</b> {{ ModAttributeClassSpell() }}
          </span>

          <span>
            <br />
            <b>Атака заклинанием:</b> +{{ ModAttributeAttackSpell() }}
          </span>
        </v-col>

        <v-col :cols="12" v-if="archetype && archetype.spellTradition">
          <v-card
            class="mb-4"
            dense
            outlined
            v-for="levelAncestry in 10"
            :key="levelAncestry"
            v-if="
              levelAncestry - 1 <=
                archetype.spellProgression[characterLevel()].findIndex(
                  (t) => t == 0
                ) -
                  1 || characterLevel() == 20
            "
          >
            <h2 class="subtitle-1 text-center" v-if="levelAncestry - 1 == 0">
              Чары
            </h2>
            <h2 class="subtitle-1 text-center" v v-if="levelAncestry - 1 !== 0">
              {{ levelAncestry - 1 }} уровень
            </h2>

            <v-simple-table dense>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th v-for="header in headers" :class="header.class">
                      {{ header.text }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="cell in archetype.spellProgression[characterLevel()][
                      levelAncestry - 1
                    ]"
                  >
                    <td>
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).name
                          : "-"
                      }}
                    </td>
                    <td class="text-center pa-1 small">
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).action
                          : "-"
                      }}
                    </td>
                    <td class="text-center pa-1 small">
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).duration
                          : "-"
                      }}
                    </td>
                    <td class="text-center pa-1 small">
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).distance
                          : "-"
                      }}
                    </td>
                    <td class="text-center pa-1 small">
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).defence
                          : "-"
                      }}
                    </td>
                    <td class="text-center pa-1 small">
                      {{
                        characterSpell(levelAncestry - 1, cell)
                          ? characterSpell(levelAncestry - 1, cell).area
                          : "-"
                      }}
                    </td>
                    <td>
                      <v-btn
                        v-if="characterSpell(levelAncestry - 1, cell)"
                        outlined
                        x-small
                        color="error"
                        @click.stop.prevent="
                          removeTalent(characterSpell(levelAncestry - 1, cell))
                        "
                      >
                        <v-icon left> delete </v-icon>Удалить
                      </v-btn>
                      <v-btn
                        v-if="!characterSpell(levelAncestry - 1, cell)"
                        outlined
                        x-small
                        color="success"
                        @click="updatePreview(levelAncestry - 1, cell)"
                      >
                        <v-icon left> add </v-icon>Добавить
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-tab-item>
    </v-tabs>

    <v-dialog
      v-model="psychicDialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="1200px"
      scrollable
    >
      <psychic-preview
        :character-id="characterId"
        :talents="selectedPsychic"
        :archetype="archetype"
        :rank="rankSpell"
        :level="levelSpell"
        :list="psychicPowersList"
        type="spell"
        choose-mode
        @cancel="psychicDialog = false"
      />
    </v-dialog>
  </v-row>
</template>

<script lang="js">
import PsychicDisciplineMixin from '~/mixins/PsychicDisciplineMixin';
import PsychicPreview from "~/components/forge/PsychicPreview.vue";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";
import traitView from '~/components/TraitView';

export default {
  name: 'PsychicPowers',
  layout: 'forge',
  mixins: [
    PsychicDisciplineMixin, StatRepositoryMixin
  ],
  components: {
    PsychicPreview,
    traitView
  },
  props: [],

  head() {
    return {
      title: 'Выберите заклинания',
    };
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      searchQuery: '',
      headers: [
        {
          text: 'Название',
          value: 'name',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Действия',
          value: 'action',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Длительность',
          value: 'duration',
          sortable: true,
        },
        {
          text: 'Дистанция',
          value: 'range',
          sortable: false,
        },
        {
          text: 'Спасбросок',
          value: 'saving',
          sortable: false,
        },
        {
          text: 'Область/цель',
          value: 'area',
          sortable: false,
        },
                {
          text: '',
          value: 'view',
          sortable: false,
        },
        {
          text: '',
          value: 'button',
          sortable: false,
        },
      ],
      selectedItem: undefined,
      dialog: undefined,
      cellSpell: undefined,
      rankSpell: undefined,
      levelSpell: undefined,
      grantAllAccess: false,
      selectedDisciplines: [],
      species: undefined,
      selectedPsychic: undefined,
      archetype: undefined,
      psychicPowersList: undefined,
        traitList: undefined,
      loading: false,
      showAlerts: false,
      psychicDialog: false,
    };
  },
  computed: {
    sources() {
      return [
        'playerCore',
        'playerCore2',
        'coreRulebook', 'secretOfMagic',
        ...this.settingHomebrews
      ];
    },

    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterEnhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },
    alerts() {
      const alerts = [];

      if (!this.isPsychic && !this.isNavigator) {
        const alert = {
          type: 'warning',
          text: 'You need to either possess the Psychic Keyword or have at least learned one rank in the Psychic Mastery skill.',
        };
        alerts.push(alert);
      }
      return alerts;
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    filteredPowers() {
      if (this.psychicPowersList === undefined) {
        return [];
      }

      let filteredPowers = this.psychicPowersList;

      if (this.selectedDisciplines.length > 0) {
        filteredPowers = filteredPowers.filter((p) => this.selectedDisciplines.includes(p.discipline));
      } else {
        filteredPowers = filteredPowers.filter((p) => this.allowedDisciplines.includes(p.discipline));
      }
      // filteredTalents = filteredTalents.filter( t => !this.characterTalents.includes(t.name) );

      return filteredPowers;
    },

    characterAttributes() {
      return this.$store.getters["characters/characterAttributesById"](
        this.characterId
      );
    },
  },
  watch: {
    settingHomebrews: {
      handler(newVal) {
        if (newVal) {
          this.getTraitList(newVal);
          this.getPsychicPowers(newVal);

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
    characterArchetypeKey: {
      handler(newVal) {
        if (newVal) {
          this.getArchetype(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
        openDialog(item) {
      this.selectedItem = item
      this.dialog = true
    },
    characterSpell(rank, cell)
    {
    // { id, name, cost, selection}
    if (this.psychicPowersList === undefined) {
        return false;
      }

      const characterTalents = this.$store.getters['characters/characterSpellsById'](this.characterId);


      const talents = characterTalents.filter((t) => t).map((talent) => {

      const rawTalent = this.psychicPowersList.find((r) => r.key === talent.key);

        if (rawTalent === undefined) {
          console.warn(`No talent found for ${talent.key}::${talent.name}, using dummy talent.`);
          return {
            id: talent.id,
            label: `${talent.name} (<strong>Broken</strong>, please remove!)`,
            name: talent.name,
            key: talent.key,
            snippet: 'ATTENTION, this is a legacy talent, remove and re-add again.',
            cost: 0,
          }
        }

        const aggregatedTalent = Object.assign({}, rawTalent);
        //console.info(`[${talent.id}] Found ${aggregatedTalent.name} for ${talent.key}`);

        aggregatedTalent.description = talent.description;

        aggregatedTalent.id = talent.id;

        // aggregatedTalent.cost = talent.cost;

        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.rank = talent.rank;
        aggregatedTalent.cell = talent.cell;

        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;

        }

        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));


      return talents.find(s => s.rank === rank && s.cell === cell);
    },
     updatePreview(levelAncestry, cell) {
      let list = this.psychicPowersList.filter(spell => !spell.traits.join(',').includes('фокус'))

       if (levelAncestry === 0)
         list = list.filter(spell => spell.traits.join(',').includes('заговор'))
       else
         list = list.filter(spell => !spell.traits.join(',').includes('заговор'))

      list.forEach(t => {
        const tal = t;
        tal.rank = levelAncestry ;
        tal.cell = cell;

      })
       this.levelSpell = levelAncestry;
       this.rankSpell = this.archetype.spellProgression[this.characterLevel()].findIndex(
                      (t) => t == 0
                    ) - 1;


      this.selectedPsychic = list
      this.psychicDialog = true;

    },
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    affordableColor(cost) {
      return (cost <= this.remainingBuildPoints) ? 'green' : 'grey';
    },
    InnateSpell()
    {
      const enc = this.$store.getters['characters/characterEnhancementsById'](this.characterId);
      const MagicInnate = enc.filter(s => s.targetGroup === 'Spell' && s.targetValue === 'Innate');

    },
    isInnate() {
      const enc = this.$store.getters['characters/characterEnhancementsById'](this.characterId);
      if (enc.find(s => s.targetGroup === 'Spell' && s.targetValue === 'Innate')) return true;
      return false;
    },
    // Сложность класса заклинателя и его атаки
    ModAttributeClassSpell() {
      const char1 = this.profiencyRepository[this.archetype.spellsClass["class"]];
      const char2 = (this.characterAttributes[this.archetype.attributeBoost.find(t => t.value > 0).key] - 10) / 2;
      const char3 = this.characterLevel();
      if (this.archetype)
        return 10 + parseInt(char1) + parseInt(char2) + parseInt(char3);
      else 0;
    },
    ModAttributeAttackSpell() {
      const char1 = this.profiencyRepository[this.archetype.spellsClass["attack"]];
      const char2 = (this.characterAttributes[this.archetype.attributeBoost.find(t => t.value > 0).key] - 10) / 2;
      const char3 = this.characterLevel();
      if (this.archetype)
        return parseInt(char1) + parseInt(char2) + parseInt(char3);
      else 0;
    },
    //
    async getTraitList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get(
        "/api/traits/",
        config.source
      );
      data.forEach(t => t.key = t.key.toLowerCase())
      this.traitList = data;
    },
    async getSpecies(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/species/${key}`);

      this.loading = false;
      this.species = data;
    },
    async getArchetype(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      this.loading = false;
      this.archetype = data;
    },

    async getPsychicPowers(sources) {
      const config = {
        params: { source: this.sources.join(','), },
      };
      this.loading = true;
      const { data } = await this.$axios.get('/api/psychic-powers/', config);
      this.loading = false;
       if (this.traitList !== undefined) {
        data.forEach((species) => {
          const lowercaseKeywords = species.traits.map((s) =>
            s.toUpperCase()
          );
           species.trait = species.traits;
          const List1 = this.traitList;
          const trait = List1.filter((talent) =>
            lowercaseKeywords.includes(talent.key.toString().toUpperCase())
          );

          if (trait.length > 0) {
            const listAbilities = [];
            species.traits.forEach((talent) => {

                const t = trait.find(k => k.key === talent)

                if (t)
                {
                const ability1 = {
                  name: t.key,
                  description: t.desc,
                };

                listAbilities.push(ability1);
              }


            });
            species.traitDesc = listAbilities;

          }
        });

}
      this.psychicPowersList = data;
    },
    removeTalent(talent) {
      const id = this.characterId;
      const source = `talent.${talent.id}`;
      this.$store.commit('characters/removeCharacterSpell', { id, talentId: talent.id });
    },

    toggleDisciplineFilter(name) {
      if (this.selectedDisciplines.includes(name)) {
        this.selectedDisciplines = this.selectedDisciplines.filter((d) => d !== name);
      } else {
        this.selectedDisciplines.push(name);
      }
    },

  },
};
</script>

<style scoped lang="css">
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

.head {
  /* color: rgb(57, 54, 54); */
  width: fit-content;
  /* font-size: 24px; */
  font-style: normal;
  /* font-family: goodOTCondBold; */
  font-weight: normal;
  line-height: 24px;
  /* text-transform: uppercase; */
}

.line {
  height: 1px;
  margin: 0 1rem;
  flex-grow: 1;
  background: #676767;
}

.tag {
  color: #fff;
  padding: 0.5rem;
  font-size: 18px;
  font-style: normal;
  text-align: center;
  font-family: goodOTCondBold;
  font-weight: normal;
  line-height: 24px;
  white-space: nowrap;
  border-radius: 0.25rem;
  text-transform: uppercase;
}

.rowFeat {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.main-holder p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.main-holder-divider p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  border-bottom: 1.5px solid black;
}
</style>
