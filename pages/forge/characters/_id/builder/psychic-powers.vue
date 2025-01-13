<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-col>
      <h1 class="headline">Заклинания</h1>
    </v-col>

    <v-col :cols="12">
      <v-card>
        <v-expansion-panels multiple v-if="archetype">
          <v-expansion-panel
            v-for="levelAncestry in 10"
            :key="levelAncestry"
            v-if="
              levelAncestry - 1 <=
              archetype.spellProgression[characterLevel()].findIndex(
                (t) => t == 0
              ) -
                1
            "
          >
            <v-expansion-panel-header>
              <p v-if="levelAncestry - 1 == 0">Чары</p>
              <p v-if="levelAncestry - 1 != 0">
                {{ levelAncestry - 1 }} уровень
              </p>
            </v-expansion-panel-header>

            <v-expansion-panel-content :key="levelAncestry">
              <v-row
                v-for="cell in archetype.spellProgression[characterLevel()][
                  levelAncestry - 1
                ]"
              >
                <v-btn @click="updatePreview(levelAncestry, cell)">
                  Выберите заклинание в ячейку {{ cell }}
                </v-btn>
              </v-row>

              <v-dialog
                v-model="psychicDialog"
                :fullscreen="$vuetify.breakpoint.xsOnly"
                width="600px"
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

              <!-- 
     

      <v-btn
        @click="updatePreview(levelAncestry, 'ancestry')"
        v-if="!characterAncestryTalent(levelAncestry)"
      >
        Выберите черту {{ levelAncestry }}
      </v-btn>

      <v-expansion-panels
        multiple
        v-if="characterAncestryTalent(levelAncestry)"
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
                    v-html="characterAncestryTalent(levelAncestry).label"
                  />
                </v-col>
                <v-col :cols="4" :sm="2">
                  <v-btn
                    color="error"
                    x-small
                    @click.stop.prevent="
                      removeTalent(characterAncestryTalent(levelAncestry))
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
                  {{ characterAncestryTalent(levelAncestry).snippet }}
                </v-col>
              </v-row>
            </template>
          </v-expansion-panel-header>

          <v-expansion-panel-content>
            <div
              class="body-2 mb-2"
              v-html="characterAncestryTalent(levelAncestry).description"
            ></div>

            <div v-if="characterAncestryTalent(levelAncestry).options">
              <v-select
                v-if="
                  characterAncestryTalent(levelAncestry).optionsKey ===
                  'skill'
                "
                :value="characterAncestryTalent(levelAncestry).selected"
                :items="skillRepository"
                item-text="name"
                item-value="key"
                placeholder="Выберите навык"
                filled
                dense
                @input="
                  talentUpdateSelected(
                    item,
                    characterAncestryTalent(levelAncestry),
                    levelAncestry
                  )
                "
              />
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>-->
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

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

export default {
  name: 'PsychicPowers',
  layout: 'forge',
  mixins: [
    PsychicDisciplineMixin,
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
        'fspg',
        'red1',
        'cos',
        // 'tnh',
        ...this.settingHomebrews
      ];
    },
    disciplines() {
      return this.disciplinesRepository.filter((d)=>this.sources.includes(d.source));
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
    characterAccessibleDisciplines() {
      let disciplines = [];
      if (this.characterEnhancements) {
        return this.characterEnhancements.filter((e)=> e.targetGroup === 'psychicDisciplines');
      }
      return disciplines;
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
    isPsychic() {
      const skills = this.$store.getters['characters/characterSkillsById'](this.characterId);
      const keywords = this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
      const hasSkill = skills.psychicMastery > 0;
      const hasKeyword = keywords.some( (k) => k.name === 'Psyker');
      return (hasSkill || hasKeyword);
    },
    isNavigator() { // from the PAX Homebrew
      const key = this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
      return key === 'pax-navigator';
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    maximumMinorPowers() { return this.settingTier; },
    maximumDisciplinePowers() { return Math.max(1, this.settingTier - 1); },
    maximumPsychicPowers() { return this.settingTier + 3; },
    characterPowers() {
      return this.$store.getters['characters/characterPsychicPowersById'](this.characterId);
    },
    allowedDisciplines() {
      let access = [];

      if (this.grantAllAccess) {
        return this.disciplines.map((d)=>d.name);
      }

      if(this.species && this.species.speciesFeatures) {
        this.species.speciesFeatures
          .filter((f)=> f.psychicDisciplines)
          .map((f)=> f.psychicDisciplines)
          .forEach((disciplines) => access = [ ...access, ...disciplines]);
      }

      if(this.archetype && this.archetype.archetypeFeatures) {
        this.archetype.archetypeFeatures
        .filter((f)=> f.psychicDisciplines)
        .map((f)=> f.psychicDisciplines)
        .forEach((disciplines) => access = [ ...access, ...disciplines]);
      }

      // TODO if there is no discipline access and the psyker keyword -> allow Minor
      access.push('Minor');

      this.characterAccessibleDisciplines.map((d) => d.targetValue).forEach((discipline) => {
        access = [ ...access, discipline ];
      });

      access = [...new Set(access)].sort();
      return access;
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
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
  },
  watch: {
    settingHomebrews: {
      handler(newVal) {
        if (newVal) {
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
     updatePreview(levelAncestry, cell) {


      const list = this.psychicPowersList;
      /*.filter(s => s.type === type).map(talent => {

                       return {
                         ...talent

                       }
      });*/
      list.forEach(t => {
        const tal = t;
        tal.rank = levelAncestry - 1;
        tal.cell = cell;

      })
      if (levelAncestry - 1 == 0)
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
      this.psychicPowersList = data;
      data.forEach(spell =>{
        spell.description = spell.description.replace("{{powers}}", spell.powerValue)
      });
      this.psychicPowersList = data;
    },
    addPower(power) {
      this.$store.commit('characters/addCharacterPsychicPower', { id: this.characterId, key: power.key, name: power.name, cost: power.cost });
    },
    removePower(powerName) {
      this.$store.commit('characters/removeCharacterPsychicPower', { id: this.characterId, name: powerName });
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

<style scoped lang="css"></style>
