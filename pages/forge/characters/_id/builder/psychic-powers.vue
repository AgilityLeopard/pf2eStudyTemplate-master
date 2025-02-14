<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-col>
      <h1 class="headline" v-if="archetype && archetype.spellTradition">
        Заклинания
      </h1>
    </v-col>

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

    <v-col :cols="12">
      <v-card>
        <v-expansion-panels
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
                      <!-- <template
                        v-for="child in characterSpell(levelAncestry - 1, cell)
                          .description"
                      >
                        <component
                          v-bind:is="
                            child.includes('v-tooltip') ? 'v-tooltip' : 'span'
                          "
                        >
                          {{ child }}</component
                        >
                      </template> -->

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

              <v-dialog
                v-model="psychicDialog"
                :fullscreen="$vuetify.breakpoint.xsOnly"
                width="1000px"
                scrollable
              >
                <psychic-preview
                  :character-id="characterId"
                  :talents="selectedPsychic"
                  :archetype="archetype"
                  :rank="
                    archetype.spellProgression[characterLevel()].findIndex(
                      (t) => t == 0
                    ) - 1
                  "
                  :level="levelAncestry - 1"
                  :list="psychicPowersList"
                  type="spell"
                  choose-mode
                  @cancel="psychicDialog = false"
                />
              </v-dialog>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
  </v-row>
</template>

<script lang="js">
import PsychicDisciplineMixin from '~/mixins/PsychicDisciplineMixin';
import PsychicPreview from "~/components/forge/PsychicPreview.vue";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  name: 'PsychicPowers',
  layout: 'forge',
  mixins: [
    PsychicDisciplineMixin, StatRepositoryMixin
  ],
  components: {
    PsychicPreview,
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
          text: 'Имя',
          value: 'name',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Уровень',
          value: 'level',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Традиция',
          value: 'tradition',
          sortable: true,
        },
        {
          text: 'Детали',
          value: 'description',
          sortable: false,
        },
      ],
      cellSpell: undefined,
      grantAllAccess: false,
      selectedDisciplines: [],
      species: undefined,
      selectedPsychic: undefined,
      archetype: undefined,
      psychicPowersList: undefined,
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
          this.getPsychicPowers(newVal);
          this.getTraitList(newVal);
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
        console.info(`[${talent.id}] Found ${aggregatedTalent.name} for ${talent.key}`);

        aggregatedTalent.description = talent.description;
        // const temp = "<span class=\"data-tooltip\" data-tooltip=\"Всплывающая подсказка сообщает о чём-то многозначном и полезном...\">Наведи сюда курсор.</span>"
        // aggregatedTalent.description = talent.description.replace("Ослаблена", temp);
        aggregatedTalent.id = talent.id;
        // aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.rank = talent.rank;
        aggregatedTalent.cell = talent.cell;
        // aggregatedTalent.place = talent.place;
        // for each special talent, check respectively
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;

        }

        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));


      return talents.find(s => s.rank === rank && s.cell === cell);
    },
     updatePreview(levelAncestry, cell) {


      const list = this.psychicPowersList;
      /*.filter(s => s.type === type).map(talent => {

                       return {
                         ...talent

                       }
      });*/
      list.forEach(t => {
        const tal = t;
        tal.rank = levelAncestry ;
        tal.cell = cell;

      })
      if (levelAncestry == 0)
        this.selectedPsychic = list.filter(spell => spell.cantrip === true);
      else
        this.selectedPsychic = list.filter(spell => spell.cantrip === false);

      this.psychicDialog = true;

    },
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    affordableColor(cost) {
      return (cost <= this.remainingBuildPoints) ? 'green' : 'grey';
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
      this.traitList = data;
    },
    async getSpecies(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/species/${key}`);
            if (this.traitList !== undefined) {
        data.forEach((species) => {
          const lowercaseKeywords = species.trait.map((s) =>
            s.toUpperCase()
          );

          const List1 = this.traitList;
          const trait = List1.filter((talent) =>
            lowercaseKeywords.includes(talent.key.toString().toUpperCase())
          );

          if (trait.length > 0) {
            const listAbilities = [];
            species.trait.forEach((talent) => {

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
          const lowercaseKeywords = species.trait.map((s) =>
            s.toUpperCase()
          );

          const List1 = this.traitList;
          const trait = List1.filter((talent) =>
            lowercaseKeywords.includes(talent.key.toString().toUpperCase())
          );

          if (trait.length > 0) {
            const listAbilities = [];
            species.trait.forEach((talent) => {

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
      // data.forEach(spell =>{
      //   spell.description = spell.description.replace("{{powers}}", spell.powerValue)
      // });
      // this.psychicPowersList = data;
    },
    removeTalent(talent) {
      const id = this.characterId;
      const source = `talent.${talent.id}`;
      // this.$store.commit('characters/clearModification', { id: this.characterId, level });
      // this.$store.commit('characters/removeModification', { id: this.characterId,   talentId: talent.id });
      this.$store.commit('characters/removeCharacterSpell', { id, talentId: talent.id });
      // this.$store.commit('characters/setModification', { id: this.characterId, level });
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
[data-tooltip] {
  position: relative; /* Относительное позиционирование */
}
[data-tooltip]::after {
  content: attr(data-tooltip); /* Выводим текст */
  position: absolute; /* Абсолютное позиционирование */
  width: 300px; /* Ширина подсказки */
  left: 0;
  top: 0; /* Положение подсказки */
  background: #3989c9; /* Синий цвет фона */
  color: #fff; /* Цвет текста */
  padding: 0.5em; /* Поля вокруг текста */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3); /* Параметры тени */
  pointer-events: none; /* Подсказка */
  opacity: 0; /* Подсказка невидима */
  transition: 1s; /* Время появления подсказки */
}

[data-tooltip]:hover::after {
  opacity: 1; /* Показываем подсказку */
  top: 2em; /* Положение подсказки */
}
</style>
