<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>

    <v-row justify="center">

      <v-col :cols="12">
        <h1 class="headline">
          Выбор черт
        </h1>
      </v-col>

      <v-progress-circular v-if="!talentList && !wargearList" indeterminate color="success" size="128" width="12" />


      <v-col :cols="8" :sm="10" class="subtitle-1">
                    Черты родословной
                  </v-col>
                  
    <v-expansion-panels multiple>
      <v-expansion-panel   
          v-for="level in 20"
          :key="level"
          v-if="level <= characterLevel() && (level == 1 || (level - 1) % 4 == 0)"
          >
        <v-expansion-panel-header>{{level}} уровень</v-expansion-panel-header> 
      <v-expansion-panel-content :key="level" >

        
        <v-dialog
      v-model="talentsDialog"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <talents-preview
        
        :character-id="characterId"
        :talents="selectedTalentsAncestry"
        :level="levelAncestry"
        type="ancestry"
        choose-mode

        @cancel="talentsDialog = false"
      />
    </v-dialog>

    <v-btn @click="updatePreview(level)" v-if="!characterAncestryTalent(level)">
        Выберите черту {{ level }}
      </v-btn>

      <v-expansion-panels multiple v-if="characterAncestryTalent(level)">
          <v-expansion-panel
          >
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
           
                <v-row no-gutters>
                  <v-col :cols="8" :sm="10" class="subtitle-1">
                    <span v-html="placeText[characterAncestryTalent(level).place]" />
                  </v-col>
                  <v-col :cols="8" :sm="10" class="subtitle-2">
                    <span v-html="characterAncestryTalent(level).label" />
                  </v-col>
                  <v-col :cols="4" :sm="2">
                    <v-btn color="error" x-small @click.stop.prevent="removeTalent(characterAncestryTalent(level))">Удалить</v-btn>
                  </v-col>
                  <v-col v-if="!open" :cols="8" :sm="10" class="caption grey--text">
                    {{ characterAncestryTalent(level).snippet }}
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <div class="mb-4">
                <span>Cost:</span>
                <v-chip v-if="characterAncestryTalent(level).extraCost" label x-small>
                  {{ characterAncestryTalent(level).cost+characterAncestryTalent(level).extraCost }} XP
                </v-chip>
                <v-chip v-else label x-small>
                  {{ characterAncestryTalent(level).cost }} XP
                </v-chip>
              </div>

              <div class="body-2 mb-2" v-html="characterAncestryTalent(level).description"></div>

              <v-alert
                v-if="characterAncestryTalent(level).alert"
                :type="characterAncestryTalent(level).alert.type"
                dense
                text
              >{{characterAncestryTalent(level).alert.text}}</v-alert>

              <div v-if="characterAncestryTalent(level).options">
                <v-select
                  :value="characterAncestryTalent(level).selected"
                  :items="characterAncestryTalent(level).options"
                  item-text="name"
                  item-value="key"
                  :placeholder="characterAncestryTalent(level).optionsPlaceholder"
                  filled
                  dense
                  @input="talentUpdateSelected($event, characterAncestryTalent(level))"
                />
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

    </v-expansion-panel-content>
    </v-expansion-panel>
    </v-expansion-panels> 

    <v-col :cols="8" :sm="10" class="subtitle-1">
                    Черты Класса
                  </v-col>
                  
    <v-expansion-panels multiple>
      <v-expansion-panel   
      v-for="level in 20"
      :key="level"
      v-if="level <= characterLevel() && (level == 1 || (level) % 2 == 0)"
      >
        <v-expansion-panel-header>{{level}} уровень</v-expansion-panel-header> 

      <v-expansion-panel-content :key="level" >

        
        <v-dialog
      v-model="talentsDialogClass"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <talents-preview
        
        :character-id="characterId"
        :talents="selectedTalentsClass"
        :level="levelClass"
        type="class"
        choose-mode

        @cancel="talentsDialogClass = false"
      />
    </v-dialog>

    <v-btn @click="updatePreviewClass(level)" v-if="!characterClassTalent(level)">
        Выберите черту {{ level }}
      </v-btn>

      <v-expansion-panels multiple v-if="characterClassTalent(level)">
          <v-expansion-panel
          >
         
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
           
                <v-row no-gutters>
                  <v-col :cols="8" :sm="10" class="subtitle-1">
                    <span v-html="placeText[characterClassTalent(level).place]" />
                  </v-col>
                  <v-col :cols="8" :sm="10" class="subtitle-2">
                    <span v-html="characterClassTalent(level).label" />
                  </v-col>
                  <v-col :cols="4" :sm="2">
                    <v-btn color="error" x-small @click.stop.prevent="removeTalent(characterClassTalent(level))">Удалить</v-btn>
                  </v-col>
                  <v-col v-if="!open" :cols="8" :sm="10" class="caption grey--text">
                    {{ characterClassTalent(level).snippet }}
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <div class="mb-4">
                <span>Cost:</span>
                <v-chip v-if="characterClassTalent(level).extraCost" label x-small>
                  {{ characterClassTalent(level).cost+characterClassTalent(level).extraCost }} XP
                </v-chip>
                <v-chip v-else label x-small>
                  {{ characterClassTalent(level).cost }} XP
                </v-chip>
              </div>

              <div class="body-2 mb-2" v-html="characterClassTalent(level).description"></div>

              <v-alert
                v-if="characterClassTalent(level).alert"
                :type="characterClassTalent(level).alert.type"
                dense
                text
              >{{characterClassTalent(level).alert.text}}</v-alert>

              <div v-if="characterClassTalent(level).options">
                <v-select
                  :value="characterClassTalent(level).selected"
                  :items="characterClassTalent(level).options"
                  item-text="name"
                  item-value="key"
                  :placeholder="characterClassTalent(level).optionsPlaceholder"
                  filled
                  dense
                  @input="talentUpdateSelected($event, characterClassTalent(level))"
                />
              </div>

            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

    </v-expansion-panel-content>
    </v-expansion-panel>
    </v-expansion-panels> 

    <v-col :cols="8" :sm="10" class="subtitle-1">
                    Черты Навыков
                  </v-col>


    <v-expansion-panels multiple>
      <v-expansion-panel  >
        <v-expansion-panel-header>Черта Предыстории</v-expansion-panel-header> 
        <v-expansion-panel-content >
          <v-expansion-panels multiple v-if="characterBackgroundTalent(level)">
          <v-expansion-panel
          >
         
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
           
                <v-row no-gutters>
                  <v-col :cols="8" :sm="10" class="subtitle-1">
                    <span v-html="placeText[characterBackgroundTalent(level).place]" />
                  </v-col>
                  <v-col :cols="8" :sm="10" class="subtitle-2">
                    <span v-html="characterBackgroundTalent(level).label" />
                  </v-col>
                  <!-- <v-col :cols="4" :sm="2">
                    <v-btn color="error" x-small @click.stop.prevent="removeTalent(characterSkillTalent(level))">Удалить</v-btn>
                  </v-col> -->
                  <v-col v-if="!open" :cols="8" :sm="10" class="caption grey--text">
                    {{ characterBackgroundTalent(level).snippet }}
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <div class="mb-4">
                <span>Cost:</span>
                <v-chip v-if="characterBackgroundTalent(level).extraCost" label x-small>
                  {{ characterBackgroundTalent(level).cost+characterBackgroundTalent(level).extraCost }} XP
                </v-chip>
                <v-chip v-else label x-small>
                  {{ characterBackgroundTalent(level).cost }} XP
                </v-chip>
              </div>

              <div class="body-2 mb-2" v-html="characterBackgroundTalent(level).description"></div>

              <v-alert
                v-if="characterBackgroundTalent(level).alert"
                :type="characterBackgroundTalent(level).alert.type"
                dense
                text
              >{{characterBackgroundTalent(level).alert.text}}</v-alert>

              <div v-if="characterBackgroundTalent(level).options">
                <v-select
                  :value="characterBackgroundTalent(level).selected"
                  :items="characterBackgroundTalent(level).options"
                  item-text="name"
                  item-value="key"
                  :placeholder="characterBackgroundTalent(level).optionsPlaceholder"
                  filled
                  dense
                  @input="talentSkillUpdateSelected($event, characterBackgroundTalent(level))"
                />
              </div>

            </v-expansion-panel-content>

          </v-expansion-panel>

        </v-expansion-panels>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel   
      v-for="level in 20"
      :key="level"
      v-if="level <= characterLevel() && (level == 1 || (level - 1) % 4 == 0)"
      >
        <v-expansion-panel-header>{{level}} уровень</v-expansion-panel-header> 

      <v-expansion-panel-content :key="level" >

        
        <v-dialog
      v-model="talentsDialogSkill"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <talents-preview
        
        :character-id="characterId"
        :talents="selectedTalentsSkill"
        :level="levelSkill"
        type="skill"
        choose-mode

        @cancel="talentsDialogSkill = false"
      />
    </v-dialog>

    <v-btn @click="updatePreviewSkill(level)" v-if="!characterSkillTalent(level)">
        Выберите черту {{ level }}
      </v-btn>



      <v-expansion-panels multiple v-if="characterSkillTalent(level)">
          <v-expansion-panel
          >
         
            <v-expansion-panel-header>
              <template v-slot:default="{ open }">
           
                <v-row no-gutters>
                  <v-col :cols="8" :sm="10" class="subtitle-1">
                    <span v-html="placeText[characterSkillTalent(level).place]" />
                  </v-col>
                  <v-col :cols="8" :sm="10" class="subtitle-2">
                    <span v-html="characterSkillTalent(level).label" />
                  </v-col>
                  <v-col :cols="4" :sm="2">
                    <v-btn color="error" x-small @click.stop.prevent="removeTalent(characterSkillTalent(level))">Удалить</v-btn>
                  </v-col>
                  <v-col v-if="!open" :cols="8" :sm="10" class="caption grey--text">
                    {{ characterSkillTalent(level).snippet }}
                  </v-col>
                </v-row>
              </template>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <div class="mb-4">
                <span>Cost:</span>
                <v-chip v-if="characterSkillTalent(level).extraCost" label x-small>
                  {{ characterSkillTalent(level).cost+characterSkillTalent(level).extraCost }} XP
                </v-chip>
                <v-chip v-else label x-small>
                  {{ characterSkillTalent(level).cost }} XP
                </v-chip>
              </div>

              <div class="body-2 mb-2" v-html="characterSkillTalent(level).description"></div>

              <v-alert
                v-if="characterSkillTalent(level).alert"
                :type="characterSkillTalent(level).alert.type"
                dense
                text
              >{{characterSkillTalent(level).alert.text}}</v-alert>

              <div v-if="characterSkillTalent(level).options">
                <v-select
                  :value="characterSkillTalent(level).selected"
                  :items="characterSkillTalent(level).options"
                  item-text="name"
                  item-value="key"
                  :placeholder="characterSkillTalent(level).optionsPlaceholder"
                  filled
                  dense
                  @input="talentSkillUpdateSelected($event, characterSkillTalent(level))"
                />
              </div>

            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
    </v-expansion-panel-content>
    </v-expansion-panel>
    </v-expansion-panels>              
    </v-row>
  </div>
</template>

<script lang="js">
import KeywordRepositoryMixin from '~/mixins/KeywordRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import WargearMixin from '~/mixins/WargearMixin';
import IssueList from '~/components/IssueList.vue';
import WargearSelect from '~/components/forge/WargearSelect.vue';
import TalentsPreview from "~/components/forge/TalentsPreview.vue";

export default {
  name: 'Talents',
  layout: 'forge',
  
  components: {
    WargearSelect,
    IssueList,
    TalentsPreview,
  },
  mixins: [
    KeywordRepositoryMixin,
    StatRepositoryMixin,
    WargearMixin,
  ],
  props: [],
  head() {
    return {
      title: 'Выбор Таланта',
    };
  },
  async asyncData({ params, error }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      issues: [
        '.',
        '.',
      ],
      selectedTalentsAncestry: undefined, 
      selectedTalentsClass: undefined,
      selectedTalentsSkill: undefined,  
      talentsDialog: false,
      talentsDialogClass: false,
      talentsDialogSkill: false,
      levelAncestry: 0,
      levelSkill: 0,
      levelClass: 0,
      searchQuery: '',
      selectedTagsFilters: [],
      filters: {
        tags: {
          model: [],
          label: 'Фильтры',
        },
      },
      filterOnlyPrerequisites: false,
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'name',
        rowsPerPage: 25,
      },
      placeText: {
        ancestry1: "Черта родословной 1 Уровня",
        ancestry2: "Черта родословной 2 Уровня",
      },
      headers: [
        {
          text: 'Name',
          value: 'name',
          align: 'left',
          sortable: true,
        },
        {
          text: 'Cost',
          value: 'cost',
          align: 'center',
          sortable: true,
        },
        {
          text: 'Prerequisites',
          value: 'prerequisitesHtml',
          sortable: false,
        },
        {
          text: 'Buy',
          value: 'buy',
          align: 'center',
          sortable: false,
        },
      ],
   
      talentList: undefined,
      abilityList: undefined,
      wargearList: undefined,
      loading: false,
      talentGroupFilterHelp: false,
      selectedTalentGroups: ['Talents'],
      talentGroupList: [
        {
          source: {
            book: 'Core Rules',
            key: 'playerCore',
            page: 169,
          },
          key: 'playerCore-talents',
          name: 'Talents',
          description:
            '<',
        },
      ],
    };
  },
  computed: {
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    searchResult() {
      if (this.talentList === undefined) {
        return [];
      }
      let searchResult = this.talentList;

      if (this.selectedTagsFilters.length > 0) {
        searchResult = searchResult.filter((item) => this.selectedTagsFilters.some((m) => item.tags.includes(m)));
      }
      let filter;

      filter = this.filters.source;
      if (filter.model.length > 0) {
        searchResult = searchResult.filter((i) => filter.model.includes(i.source.key));
      }

      return searchResult;
    },
    
    tagFilters() {
      if (this.talentList === undefined) {
        return [];
      }
      let filteredTalents = this.talentList;
      const lowercaseKeywords = filteredTalents.map(s => s.tags.toUpperCase());
    
      filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.includes(talent.tags.toString().toUpperCase()));
      let reduced = [];
      filteredTalents.forEach((item) => {
        if (item.tags) {
          reduced.push(...item.tags);
        }
      });
      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((tag) => ({ name: tag }));
    },

    sources() {
      return [
        'playerCore',
        ...this.settingHomebrews,
      ];
    },
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
    TalentsLabel() {
      return this.$store.getters['characters/characterTalentsLabelById'](this.characterId);
    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },
    effectiveCharacterTier() {
      return this.$store.getters['characters/characterEffectiveTierById'](this.characterId);
    },
    characterAttributesEnhanced() {
      return this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
    characterTalents() {
      return this.$store.getters['characters/characterTalentsById'](this.characterId);
    },
    characterTalentLabels() {
      return this.characterTalents.filter((talent) => talent).map((talent) => talent.name);
    },
    characterWargear() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    characterTalentsEnriched() {
      if (this.talentList === undefined) {
        return [];
      }

      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);
      const talents = characterTalents.filter((t) => t).map((talent) => {

      const rawTalent = this.talentList.find((r) => r.key === talent.key);

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

        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;
          aggregatedTalent.extraCost = 0;
          if (talent.extraCost && typeof talent.extraCost === 'object') {
            Object.keys(talent.extraCost).forEach((extraCostKey) => {
              aggregatedTalent.extraCost  += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
            });
          } else {
            aggregatedTalent.extraCost += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
          }
          if (aggregatedTalent.options) {
            const replacementTargetString = aggregatedTalent.options.find((t) => t.key === talent.selected).name;
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${replacementTargetString})</em>`);
            console.info(`[${talent.id}] Compute label ${aggregatedTalent.label} from ${talent.selected}/${replacementTargetString}`);
          } else {
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${talent.selected})</em>`);
          }
        }

        if (['core-special-weapons-trooper'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
          }
        }

        if (['red1-devastator-doctrine'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
          }
        }

        if (aggregatedTalent.key.startsWith('core-augmetic')) {
          console.info(`[${aggregatedTalent.id}] Check if gear exists for ...`)
          aggregatedTalent.wargear.forEach((g, i, warArray) => {
            const sourceKey = `talent.${aggregatedTalent.id}.${g.key}`;
            console.info(`[${aggregatedTalent.id}] Searching for <${sourceKey}>...`);
            const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
            if (charGear && charGear.length > 0 && this.wargearList) {
              console.info(`[${aggregatedTalent.id}] Found ${charGear.length} gears ${charGear[0].name} for the source...`);
              const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
              console.info(`[${aggregatedTalent.id}] found ${wargear.name}...`);
              g.selected = wargear.name;
              console.info(g.selected)

            }
          });
          console.info(`[${aggregatedTalent.id}] DONE.`);
        }

        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));
      return talents;
    },
    filteredTalents() {
      if (this.talentList === undefined) {
        return [];
      }

      let filteredTalents = this.talentList;

      if (this.selectedTagsFilters.length > 0) {
        filteredTalents = filteredTalents.filter((item) => this.selectedTagsFilters.some((m) => item.tags.includes(m)));
      }

      filteredTalents = filteredTalents.map((talent) => {
        let fulfilled = true;
        let TagsFilter = true;
        if (talent.requirements && talent.requirements.length > 0) {
          talent.requirements.forEach((requirement) => {
            switch (requirement.type) {
              case 'keyword':
                const lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
                const found = requirement.key.some((k) => {
                  return lowercaseKeywords.includes(k.toString().toUpperCase());
                });
                if (
                  found
                ) {
                  fulfilled = false;
                }
                break;
      
              case 'attribute':
                const attribute = this.attributeRepository.find((a) => a.key == requirement.key);
                if (attribute) {
                  const charAttributeValue = this.characterAttributesEnhanced[attribute.key];
                  if (charAttributeValue < requirement.value) {
                    fulfilled = false;
                  }
                } else {
                  console.warn(`No attribute found for ${requirement.key}.`);
                }
                break;
              case 'skill':
                const skill = this.skillRepository.find((a) => a.key == requirement.key);
                if (skill) {
                  const charSkillValue = this.characterSkills[skill.key];
                  if (charSkillValue < requirement.value) {
                    fulfilled = false;
                  }
                } else {
                  console.warn(`No skill found for ${requirement.key}.`);
                }
                break;
              case 'character':
                switch (requirement.key) {
                  case 'Tier':
                    fulfilled = (this.effectiveCharacterTier <= requirement.value)
                    break;
                  case 'Rank':
                    fulfilled = (this.characterRank <= requirement.value)
                    break;
                }
                break;
              case 'Talents':
                fulfilled = requirement.value.some((s) => s.toString() === this.TalentsLabel);
                break;

              default:
                console.info(`Unexpected requirement -> ${JSON.stringify(requirement)}`);
            }
          });
        }
        talent.prerequisitesFulfilled = fulfilled;
        return talent;
      });

      const lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
      filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.includes(talent.tags.toString().toUpperCase()));
      return filteredTalents;
    },
    talentHatredKeywordOptions() {
      return this.keywordRepository.filter((k) => k.placeholder === undefined && k.name.indexOf('<') !== 0);
    },
    selectableKeywordOptions() {
      return this.keywordRepository.filter((k) => k.name.indexOf('[') !== 0);
    },
    talentTrademarkWeaponOptions() {
      const wargearLabels = this.$store.getters['characters/characterWargearById'](this.characterId).map((w) => w.name);
      const wargear = [];
      if (this.wargearList) {
        wargearLabels.sort().forEach((wargearName) => {
          const foundGear = this.wargearList.find((w) => w.name === wargearName);
          if (foundGear && ['Melee Weapon', 'Ranged Weapon'].includes(foundGear.type)) {
            wargear.push(foundGear);
          }
        });
      }
      return wargear;
    },
    visibleTalentGroups() {
      return this.talentGroupList.filter((t) => this.sources.includes(t.source.key));
    }
  },
  watch: {
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getTalents(newVal);
          this.getAbility(newVal);
        }
      },
      immediate: true, 
    },
  },
  methods: {
    async updatePreview(level) {
      
      const config = {
        params: { source: this.sources.join(','), },
      };
      
      const TalentsDetails = await this.$axios.get('/api/talents/', config);
      this.levelAncestry = level;
      this.selectedTalentsAncestry = TalentsDetails.data.filter(s => s.type == 'ancestry').map(talent => {
                       const prerequisitesHtml = this.requirementsToText(talent).join(', ');
                       return {
                         ...talent
                       }
                      });
      this.talentsDialog = true;
    },
    async updatePreviewSkill(level) {
      
      const config = {
        params: { source: this.sources.join(','), },
      };
      
      const TalentsDetails = await this.$axios.get('/api/talents/', config);
      this.levelSkill = level;
      this.selectedTalentsSkill = TalentsDetails.data.filter(s => s.type == 'skill').map(talent => {
 
                       const prerequisitesHtml = this.requirementsToText(talent).join(', ');
                       return {
                         ...talent
                       }
                      });
      this.talentsDialogSkill = true;
    },
    async updatePreviewClass(level) {
      
      const config = {
        params: { source: this.sources.join(','), },
      };
      
      const TalentsDetails = await this.$axios.get('/api/talents/', config);
      this.levelClass = level;
      this.selectedTalentsClass = TalentsDetails.data.filter(s => s.type == 'class').map(talent => {

                       const prerequisitesHtml = this.requirementsToText(talent).join(', ');
                       return {
                         ...talent
                       }
                      });
      this.talentsDialogClass = true;
    },
    async getTalents(sources) {
      this.loading = true;
      const config = {
        params: { source: this.sources.join(','), },
      };
      {
        const { data } = await this.$axios.get('/api/talents/', config);
        this.talentList = data.map(talent => {

          const prerequisitesHtml = this.requirementsToText(talent).join(', ');
          return {
            ...talent
          }
        });
      }
      
      {
        const { data } = await this.$axios.get('/api/wargear/', config);
        this.wargearList = data;
      }
      this.loading = false;
    },
    async getAbility(sources) {
      this.loading = true;
      const config = {
        params: { source: this.sources.join(','), },
      };
      {
        const { data } = await this.$axios.get('/api/abilityAncestry/', config);
        this.abilityList = data.map(talent => {
          const prerequisitesHtml = this.requirementsToText(talent).join(', ');
          return {
            ...talent
          }
        });

      }
      
      {
        const { data } = await this.$axios.get('/api/wargear/', config);
        this.wargearList = data;
      }
      this.loading = false;
    },
    dynamicSort(property) {
      let sortOrder = 1;
      if (property[0] === '-') {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        const result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      };
    },
    isAffordable(cost) {
      return cost <= this.remainingBuildPoints;
    },
    characterAncestryTalent(level)
    {
    // { id, name, cost, selection}
    if (this.talentList === undefined) {
        return false;
      }

      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);

      const talents = characterTalents.filter((t) => t).map((talent) => {

        // find the plain talent by key
        const rawTalent = this.talentList.find((r) => r.key === talent.key);

        // not found? return a custom talent without special properties and no cost
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

        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        // for each special talent, check respectively
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;
          aggregatedTalent.extraCost = 0;
          if (talent.extraCost && typeof talent.extraCost === 'object') {
            Object.keys(talent.extraCost).forEach((extraCostKey) => {
              aggregatedTalent.extraCost  += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
            });
          } else {
            aggregatedTalent.extraCost += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
          }
          if (aggregatedTalent.options) {
            const replacementTargetString = aggregatedTalent.options.find((t) => t.key === talent.selected).name;
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${replacementTargetString})</em>`);
            console.info(`[${talent.id}] Compute label ${aggregatedTalent.label} from ${talent.selected}/${replacementTargetString}`);
          } else {
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${talent.selected})</em>`);
          }
        }

        // Fetch gear for selected weapon trooper
        if (['core-special-weapons-trooper'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
            /*
            charGear.forEach( g => {
              characterPackage
              .wargearOptions.find(o=>o.key === characterPackage.wargearChoice)
              .selectList.find(s=> g.source.endsWith(s.key))
                .itemChoice = g.name
            });
            */
          }
        }

        if (['red1-devastator-doctrine'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
          }
        }

        // Fetch gear for selected augmetis
        if (aggregatedTalent.key.startsWith('core-augmetic')) {
          console.info(`[${aggregatedTalent.id}] Check if gear exists for ...`)
          aggregatedTalent.wargear.forEach((g, i, warArray) => {
            const sourceKey = `talent.${aggregatedTalent.id}.${g.key}`;
            console.info(`[${aggregatedTalent.id}] Searching for <${sourceKey}>...`);
            const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
            if (charGear && charGear.length > 0 && this.wargearList) {
              console.info(`[${aggregatedTalent.id}] Found ${charGear.length} gears ${charGear[0].name} for the source...`);
              const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
              console.info(`[${aggregatedTalent.id}] found ${wargear.name}...`);
              g.selected = wargear.name;
              console.info(g.selected)

            }
          });
          console.info(`[${aggregatedTalent.id}] DONE.`);
        }

        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));
      //console.warn(talents.map((t) => t.wargear[0].selected).join('-'));
      return talents.find(s => s.place === 'ancestry'+level);



    },
    characterSkillTalent(level)
    {
    // { id, name, cost, selection}
    if (this.talentList === undefined) {
        return false;
      }

      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);

      const talents = characterTalents.filter((t) => t).map((talent) => {

        // find the plain talent by key
        const rawTalent = this.talentList.find((r) => r.key === talent.key);

        // not found? return a custom talent without special properties and no cost
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

        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        // for each special talent, check respectively
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;
          aggregatedTalent.extraCost = 0;
          if (talent.extraCost && typeof talent.extraCost === 'object') {
            Object.keys(talent.extraCost).forEach((extraCostKey) => {
              aggregatedTalent.extraCost  += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
            });
          } else {
            aggregatedTalent.extraCost += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
          }
          if (aggregatedTalent.options) {
            const replacementTargetString = aggregatedTalent.options.find((t) => t.key === talent.selected).name;
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${replacementTargetString})</em>`);
            console.info(`[${talent.id}] Compute label ${aggregatedTalent.label} from ${talent.selected}/${replacementTargetString}`);
          } else {
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${talent.selected})</em>`);
          }
        }

        // Fetch gear for selected weapon trooper
        if (['core-special-weapons-trooper'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
            /*
            charGear.forEach( g => {
              characterPackage
              .wargearOptions.find(o=>o.key === characterPackage.wargearChoice)
              .selectList.find(s=> g.source.endsWith(s.key))
                .itemChoice = g.name
            });
            */
          }
        }

        if (['red1-devastator-doctrine'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
          }
        }

        // Fetch gear for selected augmetis
        if (aggregatedTalent.key.startsWith('core-augmetic')) {
          console.info(`[${aggregatedTalent.id}] Check if gear exists for ...`)
          aggregatedTalent.wargear.forEach((g, i, warArray) => {
            const sourceKey = `talent.${aggregatedTalent.id}.${g.key}`;
            console.info(`[${aggregatedTalent.id}] Searching for <${sourceKey}>...`);
            const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
            if (charGear && charGear.length > 0 && this.wargearList) {
              console.info(`[${aggregatedTalent.id}] Found ${charGear.length} gears ${charGear[0].name} for the source...`);
              const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
              console.info(`[${aggregatedTalent.id}] found ${wargear.name}...`);
              g.selected = wargear.name;
              console.info(g.selected)

            }
          });
          console.info(`[${aggregatedTalent.id}] DONE.`);
        }

        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));
      //console.warn(talents.map((t) => t.wargear[0].selected).join('-'));
      return talents.find(s => s.place === 'skill'+level);



    },
    characterBackgroundTalent(level)
    {
    // { id, name, cost, selection}
    if (this.talentList === undefined) {
        return false;
      }

      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);

      const talents = characterTalents.filter((t) => t).map((talent) => {

        // find the plain talent by key
        const rawTalent = this.talentList.find((r) => r.key === talent.key);

        // not found? return a custom talent without special properties and no cost
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

        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        // for each special talent, check respectively
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;
          aggregatedTalent.extraCost = 0;
          if (talent.extraCost && typeof talent.extraCost === 'object') {
            Object.keys(talent.extraCost).forEach((extraCostKey) => {
              aggregatedTalent.extraCost  += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
            });
          } else {
            aggregatedTalent.extraCost += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
          }
          if (aggregatedTalent.options) {
            const replacementTargetString = aggregatedTalent.options.find((t) => t.key === talent.selected).name;
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${replacementTargetString})</em>`);
            console.info(`[${talent.id}] Compute label ${aggregatedTalent.label} from ${talent.selected}/${replacementTargetString}`);
          } else {
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${talent.selected})</em>`);
          }
        }

        // Fetch gear for selected weapon trooper
        if (['core-special-weapons-trooper'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
            /*
            charGear.forEach( g => {
              characterPackage
              .wargearOptions.find(o=>o.key === characterPackage.wargearChoice)
              .selectList.find(s=> g.source.endsWith(s.key))
                .itemChoice = g.name
            });
            */
          }
        }

        if (['red1-devastator-doctrine'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
          }
        }

        // Fetch gear for selected augmetis
        if (aggregatedTalent.key.startsWith('core-augmetic')) {
          console.info(`[${aggregatedTalent.id}] Check if gear exists for ...`)
          aggregatedTalent.wargear.forEach((g, i, warArray) => {
            const sourceKey = `talent.${aggregatedTalent.id}.${g.key}`;
            console.info(`[${aggregatedTalent.id}] Searching for <${sourceKey}>...`);
            const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
            if (charGear && charGear.length > 0 && this.wargearList) {
              console.info(`[${aggregatedTalent.id}] Found ${charGear.length} gears ${charGear[0].name} for the source...`);
              const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
              console.info(`[${aggregatedTalent.id}] found ${wargear.name}...`);
              g.selected = wargear.name;
              console.info(g.selected)

            }
          });
          console.info(`[${aggregatedTalent.id}] DONE.`);
        }

        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));
      //console.warn(talents.map((t) => t.wargear[0].selected).join('-'));
      return talents.find(s => s.place === 'background');



    },
    characterClassTalent(level)
    {
    // { id, name, cost, selection}
    if (this.talentList === undefined) {
        return false;
      }

      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);

      const talents = characterTalents.filter((t) => t).map((talent) => {

        // find the plain talent by key
        const rawTalent = this.talentList.find((r) => r.key === talent.key);

        // not found? return a custom talent without special properties and no cost
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

        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        // for each special talent, check respectively
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;
          aggregatedTalent.extraCost = 0;
          if (talent.extraCost && typeof talent.extraCost === 'object') {
            Object.keys(talent.extraCost).forEach((extraCostKey) => {
              aggregatedTalent.extraCost  += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
            });
          } else {
            aggregatedTalent.extraCost += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
          }
          if (aggregatedTalent.options) {
            const replacementTargetString = aggregatedTalent.options.find((t) => t.key === talent.selected).name;
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${replacementTargetString})</em>`);
            console.info(`[${talent.id}] Compute label ${aggregatedTalent.label} from ${talent.selected}/${replacementTargetString}`);
          } else {
            aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${talent.selected})</em>`);
          }
        }

        // Fetch gear for selected weapon trooper
        if (['core-special-weapons-trooper'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
            /*
            charGear.forEach( g => {
              characterPackage
              .wargearOptions.find(o=>o.key === characterPackage.wargearChoice)
              .selectList.find(s=> g.source.endsWith(s.key))
                .itemChoice = g.name
            });
            */
          }
        }

        if (['red1-devastator-doctrine'].includes(aggregatedTalent.key)) {
          const sourceKey = `talent.${aggregatedTalent.id}`;
          const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
          if (charGear && charGear.length > 0 && this.wargearList) {
            const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
            aggregatedTalent.selected = wargear.key;
            aggregatedTalent.label = `${aggregatedTalent.name} <em>(${wargear.name})</em>`;
          }
        }

        // Fetch gear for selected augmetis
        if (aggregatedTalent.key.startsWith('core-augmetic')) {
          console.info(`[${aggregatedTalent.id}] Check if gear exists for ...`)
          aggregatedTalent.wargear.forEach((g, i, warArray) => {
            const sourceKey = `talent.${aggregatedTalent.id}.${g.key}`;
            console.info(`[${aggregatedTalent.id}] Searching for <${sourceKey}>...`);
            const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
            if (charGear && charGear.length > 0 && this.wargearList) {
              console.info(`[${aggregatedTalent.id}] Found ${charGear.length} gears ${charGear[0].name} for the source...`);
              const wargear = this.wargearList.find((g) => g.name === charGear[0].name);
              console.info(`[${aggregatedTalent.id}] found ${wargear.name}...`);
              g.selected = wargear.name;
              console.info(g.selected)

            }
          });
          console.info(`[${aggregatedTalent.id}] DONE.`);
        }

        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));

      
      //console.warn(talents.map((t) => t.wargear[0].selected).join('-'));
      return talents.find(s => s.place === 'class'+level);



    },
    addTalent(talent, place) {
      const match = talent.name.match(/(<.*>)/);
      const talentUniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      const payload = {
        id: talentUniqueId,
        name: talent.name,
        key: talent.key,
        cost: talent.cost,
        place: place,
        placeholder: (match !== null && match !== undefined) ? match[1] : undefined,
        selected: undefined,
        choice: talent.optionsKey,
        source: `talent.${talentUniqueId}`,
      };
      this.$store.commit('characters/addCharacterTalent', { id: this.characterId, talent: payload });
    },
    removeTalent(talent) {
      const id = this.characterId;
      const source = `talent.${talent.id}`;
      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id, source });
      this.$store.commit('characters/removeCharacterWargearBySource', { id, source });
      this.$store.commit('characters/removeCharacterTalent', { id, talentId: talent.id });
    },
    requirementsToText(item) {
      const texts = [];

      if (item.requirements === undefined || item.requirements.length <= 0) {
        return ['-'];
      }

      item.requirements.forEach((p) => {
        let text = '';

        switch (p.type) {
          case 'keyword': text = ''; break;
          case 'talent':
            if (p.condition === 'mustNot') {
              text = `<strong>must not</strong> possess the ${p.key.join(' or ')} ${p.type}`;
            } else {
              text = `${p.key.join(' or ')}`;
            }
            break;

          case 'attribute':
            //text = `${this.getAttributeByKey(p.key).name} Rating ${p.value}+`;
            break;

          case 'skill':
            //text = `${this.getSkillByKey(p.key).name} Rating ${p.value}+`;
            break;

          case 'character':
            text = `${p.key} ${p.value}+`;
            break;

          case 'Talents':
            if (p.condition === 'mustNot') {
              text = `<strong>must not</strong> ${p.value} Talents`;
            } else {
              text = `${p.value} Talents`
            }
            break;

          default:
            text = `${p.key}`;
        }
        texts.push(text);
      });

      return texts;
    },
    toggleTypeFilter(name) {
      if (this.selectedTypeFilters.includes(name)) {
        this.selectedTypeFilters = this.selectedTypeFilters.filter((d) => d != name);
      } else {
        this.selectedTypeFilters.push(name);
      }
    },
    /** Special Talent Selections */
    talentUpdateSelected(selectedValue, talent) {
      const id = this.characterId;
      const talentPayload = {
        id: talent.id,
        key: talent.key,
        name: talent.name,
        choice: talent.optionsKey,
        selected: selectedValue,
      };
      /*
      const selectedOption = talent.options.find((o) => o.key === selectedValue);
      if(selectedOption && selectedOption.modifications) {
        this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { modifications: selectedOption.modifications, source: `talent.${talent.id}` } });
      }
      */
      this.$store.commit('characters/setCharacterTalentSelected', { id, talent: talentPayload });
    },
    talentAugmeticImplantsUpdateImplantChoice(gear, itemKey, talent) {

      const id = this.characterId;
      const name = gear.name;
      const source = `talent.${talent.id}.${itemKey}`;

      this.$store.commit('characters/removeCharacterWargearBySource', { id, source });
      this.$store.commit('characters/addCharacterWargear', { id, name, source });

      // TODO obsolete ?
      this.talentUpdateSelected(name, talent);

      // We add the additional point costs to the talent
      const talentPayload = {
        charId: this.characterId,
        id: talent.id,
        key: talent.key,
        name: talent.name,
        extraKey: itemKey,
        extraCost: parseInt(gear.value),
      };
      this.$store.commit('characters/setCharacterTalentExtraCost', talentPayload);
    },
    talentSpecialWeaponTrooperUpdateWeaponChoiceLabel(key, talent) {
      const wargear = this.wargearList.find((gear) => gear.key === key);
      this.talentSpecialWeaponTrooperUpdateWeaponChoice(wargear, talent);
    },
    talentSpecialWeaponTrooperUpdateWeaponChoice(wargear, talent) {
      const payload = {
        id: this.characterId,
        name: wargear.name,
        source: `talent.${talent.id}.weapon`,
      };
      this.$store.commit('characters/removeCharacterWargearBySource', payload);
      this.$store.commit('characters/addCharacterWargear', payload);

      this.talentUpdateSelected(wargear.name, talent);

      // We add the additional point costs to the talent
      const talentPayload = {
        charId: this.characterId,
        id: talent.id,
        key: talent.key,
        name: talent.name,
        extraKey: 'special-weapon',
        extraCost: parseInt(wargear.value),
      };
      this.$store.commit('characters/setCharacterTalentExtraCost', talentPayload);
    },
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    startLevel(){
      return 1;
      //return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    talentDevastatorDoctrineWeaponChoiceLabel(key, talent) {
      const wargear = this.wargearList.find((gear) => gear.key === key);
      this.talentDevastatorDoctrineUpdateWeaponChoice(wargear, talent);
    },
    talentDevastatorDoctrineUpdateWeaponChoice(wargear, talent) {
      const payload = {
        id: this.characterId,
        name: wargear.name,
        source: `talent.${talent.id}.weapon`,
      };
      this.$store.commit('characters/removeCharacterWargearBySource', payload);
      this.$store.commit('characters/addCharacterWargear', payload);

      this.talentUpdateSelected(wargear.name, talent);
    },
    toggleTalentGroupsFilter(name) {
      if (this.selectedTalentGroups.includes(name)) {
        this.selectedTalentGroups = this.selectedTalentGroups.filter((d) => d !== name);
      } else {
        this.selectedTalentGroups.push(name);
      }
    },
    computeWargearOptionsByFilter(filter) {
      return this.wargearList ? this.filterWargear(this.wargearList, filter, this.settingTier) : [];
    },
  },
};
</script>

<style scoped lang="css">
</style>
