<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-col :cols="12">
      <h1 class="headline">
        Выберите характеристики и навыки
        <span>


          <v-btn color="primary" @click="resetStats" outlined small
            >Сброс статов</v-btn
          >
        </span>
      </h1>
    </v-col>





    <v-col :cols="12">
      <h3 class="headline">
          Повышение от Наследия
      </h3>
    </v-col>

    <v-col v-if="boost == 2"  :cols="12" :md="6">
      <v-select  
        label="Свободное повышение"
        v-model="selectedAncestryBoost"
        :items="AncestryAttribute"
        item-text="name"
        item-value="key"
        @change="updateSelect(selectedAncestryBoost)"
      ></v-select>
    </v-col>

    <v-col v-else :cols="12" :md="12">
      <v-select  
        label="Свободное повышение"
        v-model="selectedAncestryBoost"
        :items="AncestryAttribute"
        item-text="name"
        item-value="key"
        @change="updateSelect(selectedAncestryBoost)"
      ></v-select>
    </v-col>

    <v-col v-if="boost == 2"  :cols="12" :md="6">
      <v-select  
        label="Повышение от Наследия"
        v-model="selectedAncestryBoost2"
        :items="AncestryAttribute2"
        item-text="name"
        item-value="key"
        @change="updateSelect2(selectedAncestryBoost2)"
      ></v-select>
    </v-col>

    <!-- <v-card-text>
      <p>Количество свободных повышений: {{ 4 - characterBoost }}</p>
    </v-card-text> -->

    <v-col :cols="12" :md="5">
      <v-card>
        <p>Количество свободных повышений: {{ 4 - characterBoost }}</p>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
                <tr>
                  <th v-for="header in attributeHeaders" :class="header.class">
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
            <tbody>
              <tr v-for="attribute in attributeRepository" :key="attribute.key">
                <td >{{ attribute.name }}</td>
                <td class="text-center pa-1 small">
                  <v-btn
                    icon
                    :disabled="
                      4 - characterBoost == 4 ||
                      characterAttributesBoost[attribute.key] < 1
                    "
                    @click="decrementAttribute(attribute.key)"
                  >
                    <v-icon color="red"> remove_circle </v-icon>
                  </v-btn>
                  {{ characterAttributes[attribute.key] }}
                  <v-btn
                    icon
                    :disabled="
                      4 - characterBoost == 0 ||
                      characterAttributesBoost[attribute.key] > 0
                    "
                    @click="incrementAttribute(attribute.key)"
                  >
                    <!--"-->
                    <v-icon
                      :color="
                        affordableAttributeColor(
                          characterAttributes[attribute.key]
                        )
                      "
                    >
                      add_circle
                    </v-icon>
                  </v-btn>
                </td>
    
                <td class="text-center pa-1 small">  {{ (characterAttributesEnhanced[attribute.key] - 10) / 2 }}</td>
              </tr>

              <!-- <tr v-for="trait in traitRepository" :key="trait.key">
                <td>{{ trait.name }}:</td>
                <td>{{ characterTraits[trait.key] }}</td>
                <td>{{ characterTraitsEnhanced[trait.key] }}</td>
              </tr> -->
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>

    <!-- <v-card-text>
      <p>Количество свободных очков навыка: {{ 4 - characterSkillPoints }}</p>
    </v-card-text> -->

    <v-col :cols="12" :md="7">
      <v-card>
        <p>Количество свободных очков навыка: {{  characterSkillPoints }}</p>
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr v-for="skill in finalSkillRepository" :key="skill.key">
                <td>{{ skill.name }}</td>
                <td>
                  <v-btn
                    icon
                    :disabled="characterSkills[skill.key] == 'U' || characterSkillPoints == MaxSkillPoints() || skill.custom"
                    @click="decrementSkill(skill.key)"
                  >
                    <v-icon color="red"> remove_circle </v-icon>
                  </v-btn>
                   {{  ModAttribute(skill.attribute, skill.key)  }}
                  <v-btn
                    icon
                    :disabled="characterSkills[skill.key] == 'L' || RestrictionLevel(characterSkills[skill.key]) == true || characterSkillPoints <= 0"
                    
                    @click="incrementSkill(skill.key)"
                  >
                    <v-icon
                      :color="affordableSkillColor(characterSkills[skill.key])"
                    >
                      add_circle
                    </v-icon>
                  </v-btn>
                </td>
                <td>{{ characterlabel(characterSkills[skill.key]) }}</td>
                <span v-if="skill.custom">
                    <v-hover>
                      <v-icon
                        small
                        @click="removeCustomSkill(skill.key)"
                        slot-scope="{ hover }"
                        :color="`${ hover ? 'error' : '' }`"
                      >delete</v-icon>
                    </v-hover>
                  </span>
              </tr>
            
            </tbody>
          </template>

          
        </v-simple-table>

        
        <v-spacer></v-spacer>

<v-card-actions style="justify-content: center;">
  <v-btn x-small text @click="openSkillsSettings">Дополнительное Знание <v-icon small>settings</v-icon></v-btn>
</v-card-actions>

            <!-- Custom Skills -->
            <v-dialog
      v-model="skillsEditorDialog"
      width="600px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-alert
               :value="alert"
               type="error"
               text
               dense
               border="left"
       
               >
       Знание уже существует
      </v-alert>
      <v-alert
               :value="characterSkillPoints <= 0"
               type="info"
               text
               dense
               border="left"
       
               >
       Недостаточно очков Навыка для добавления нового Знания
      </v-alert>
        <v-card-title style="background-color: #262e37; color: #fff;">
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
          <v-btn small right color="success" 
          :disabled="characterSkillPoints <= 0"
          @click="saveCustomSkill">Save</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>

      </v-card>
    </v-col>
  
    <v-col :cols="12" :md="6">
      <v-card>
      
        <v-simple-table dense>
      
          Внимательность
            <tbody>
          <tr>
                
                <td>{{ Perception.name }}</td>
                  <td>{{ ModAttributePerception(Perception.attribute, Perception.key) }}</td>
                  <td>{{ characterlabel(characterPerseption) }}</td>
                </tr>
            
            </tbody>
        </v-simple-table>

        <v-simple-table dense>
      
      Спасброски
        <tbody>
      <tr v-for="saving in SavingRepository" :key="saving.key">
            
            <td>{{ saving.name }}</td>
              <td>{{ ModAttributeSaving(saving.attribute, saving.key) }}</td>
              <td>{{ characterlabel(characterSaving[saving.key]) }}</td>
            </tr>
        
        </tbody>
    </v-simple-table>
      </v-card>
    </v-col>
 
    <v-col :cols="12" :md="6">
      <v-card>
      
        <v-simple-table dense>
      
          Оружие
            <tbody>
          <tr v-for="attack in WeaponRepository" :key="attack.key">
                
                <td>{{ attack.name }}</td>

                  <td>{{ characterlabel(skillAttack[attack.key]) }}</td>
                </tr>
                
                <!-- <tr v-for="defence in DefenceRepository" :key="defence.key">
                
                <td>{{ defence.name }}</td>

                  <td>{{ characterlabel(skillDefence[defence.key]) }}</td>
                </tr> -->
            </tbody>
        </v-simple-table>

        <v-spacer></v-spacer>

        <v-simple-table dense>
      
          
      Доспехи
        <tbody>
      <!-- <tr v-for="attack in WeaponRepository" :key="attack.key">
            
            <td>{{ attack.name }}</td>
            
              <td>{{ characterlabel(skillAttack[attack.key]) }}</td>
            </tr> -->

            <tr v-for="defence in DefenceRepository" :key="defence.key">
            
            <td>{{ defence.name }}</td>
            
              <td>{{ characterlabel(skillDefence[defence.key]) }}</td>
            </tr>
        </tbody>
    </v-simple-table>
      </v-card>
    </v-col>
    
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
        // { text: 'Notes', sortable: false, style: 'center', class: 'text-center small pa-1' },
      ],
      alert: false,
      skillsEditorDialog: false,
      selectedAncestryBoost: undefined,
      selectedAncestryBoost2: undefined,
      selectedBoost: { },
      customSkill: {
        key: undefined,
        name: 'Знание',
        attribute: 'intellect',
        description: '',
      },
      showAlerts: false,
      archetype: undefined,
      species: undefined,
      loading: false,
      select: { },
      AncestryAttribute: [],
      AncestryAttribute2: [],
      boost : 0,
      SkillsTrained: {
        U: 0,
        T: 2,
        E: 4,
        M: 6,
        L: 8,
      }
    };
  },
  head() {
    return {
      title: 'Повышение характеристик и навыков',
    };
  },
  computed: {
    alerts() {
      const alerts = [];

      // archetype prerequisites matched?
      if (!this.archetypePrerequisitesValid) {
        alerts.push({
          key: 'prerequisites',
          type: 'warning',
          text: 'Your attributes are lower than the picked archetype `demands`.',
        });
      }

      // tree of learning valid?
      if (!this.treeOfLearningValid) {
        alerts.push({
          key: 'tree',
          type: 'warning',
          text: 'Tree of Learning violated. You must have at least as many skills learned as your highest skill value.',
        });
      }

      return alerts;
    },
    archetypePrerequisitesValid() {
      const archetype = this.archetype;

      let fulfilled = true;
      if (archetype && archetype.prerequisites.length > 0) {
        archetype.prerequisites.forEach((prerequisite) => {
          // { group: 'attributes', value: 'willpower', threshold: 3, }
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
      // const ascensions = this.

      return fulfilled;
    },
    treeOfLearningValid() {
      let valueOfHighestSkill = 0;
      let numberOfLearnedSkills = 0;
      for (const key in this.characterSkills) {
        if (this.characterSkills[key] > valueOfHighestSkill) {
          valueOfHighestSkill = this.characterSkills[key];
        }
        if (this.characterSkills[key] > 0) {
          numberOfLearnedSkills++;
        }
      }
      return numberOfLearnedSkills >= valueOfHighestSkill;
    },
    skillMaximum() {
      return 8;
    },

    // Character Data
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterAttributeCosts() {
      return this.$store.getters['characters/characterAttributeCostsById'](this.characterId);
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterBoost() {
      return this.$store.getters['characters/characterBoostById'](this.characterId);
    },
    characterSkillPoints() {
      return this.$store.getters['characters/characterSkillPointsById'](this.characterId);
    },
    characterAncestryBoost() {
      return this.$store.getters['characters/characterAncestryBoostById'](this.characterId);
    },
    characterAncestryFreeBoost() {
      return this.$store.getters['characters/characterAncestryFreeBoostById'](this.characterId);
    },
    characterAncestryFreeBoost2() {
      return this.$store.getters['characters/characterAncestryFreeBoost2ById'](this.characterId);
    },
    characterAttributesBoost() {
      return this.$store.getters['characters/characterAttributeBoost'](this.characterId);
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
    characterTraits() {
      return this.$store.getters['characters/characterTraitsById'](this.characterId);
    },
    characterTraitsEnhanced() {
      return this.$store.getters['characters/characterTraitsEnhancedById'](this.characterId);
    },
    // characterLevel() {
    //   return this.$store.getters['characters/characterLevelbyId'](this.characterId);
    // },
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
    finalWDRepository() {
      return [
        ...this.skillAttack,
        ...this.skillDefence,
      ];
    },
    
    // Perception() {
    //   return [
    //     ...this.Perception,
       
    //   ];
    // },
    settingHouserules() {
      return this.$store.getters['characters/characterSettingHouserulesById'](this.characterId);
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
      immediate: true, // make this watch function is called when component created
    },
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
      this.loading = false;
    },
    async loadSpecies(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/species/${key}`);
      this.loading = false;
      this.species = data;
      this.boost = this.species ? this.species.abilityBoost : 0;
      // this.AncestryAttribute = this.species.attributeBoost.filter(boost => boost.key == this.species.AncestryAttribute);
      // this.AncestryAttribute2 = this.species.attributeBoost.filter(boost => boost.key == this.species.AncestryAttribute2);
       this.AncestryAttribute = this.species.attributeBoost.filter(boost => boost.value == 0);
       this.AncestryAttribute2 = this.species.attributeBoost.filter(boost => boost.value == 0);

       this.selectedAncestryBoost = this.characterAncestryFreeBoost;
       this.selectedAncestryBoost2 = this.characterAncestryFreeBoost2; 
      this.selectedBoost = this.AncestryFreeBoost;
     // this.species.attributeBoost.forEach(boost => this.AncestryAttribute.push(boost));

    },
    resetStats() {
      const key = this.selectedAncestryBoost ? this.selectedAncestryBoost.key : "";
      const key2 = this.selectedAncestryBoost2 ? this.selectedAncestryBoost2.key : "";
      this.$store.commit('characters/setCharacterAncestryFreeBoost', { id: this.characterId, payload: { key: key , value: 0 } });
      this.$store.commit('characters/setCharacterAncestryFreeBoost2', { id: this.characterId, payload: { key: key2 , value: 0 } });
      this.selectedAncestryBoost = "";
      this.selectedAncestryBoost2 = "";
      this.$store.commit('characters/resetCharacterStats', { id: this.characterId });
    },
    incrementSkill(skill) {
      var keys = Object.keys(this.SkillsTrained);
      var loc = keys.indexOf(this.characterSkills[skill]);
      const newValue = keys[loc+1];
      this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: skill, value: this.characterSkillPoints - 1} });
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });
    },
    decrementSkill(skill) {
      var keys = Object.keys(this.SkillsTrained);
      var loc = keys.indexOf(this.characterSkills[skill]);
      const newValue = keys[loc-1];
      this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: skill, value: this.characterSkillPoints + 1} });
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });
    },
    incrementAttribute(attribute) {
      const newValue = this.characterAttributes[attribute] + 2;
      if(attribute == "intellect") 
        this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: attribute, value: this.characterSkillPoints + 1} });
      
      this.$store.commit('characters/setCharacterAttributeBoost', { id: this.characterId, payload: { key: attribute, value: 1 } });
      this.$store.commit('characters/setCharacterBoost', { id: this.characterId, payload: { key: attribute, value: +1 } });
      this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
    },
    decrementAttribute(attribute) {
      const newValue = this.characterAttributes[attribute] - 2;
      if(attribute == "intellect") 
        this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: attribute, value: this.characterSkillPoints - 1} });
      this.$store.commit('characters/setCharacterAttributeBoost', { id: this.characterId, payload: { key: attribute, value: 0 } });
      this.$store.commit('characters/setCharacterBoost', { id: this.characterId, payload: { key: attribute, value: -1 } });
      this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
    },

    skillsByAttribute(attribute) {
      if (this.finalSkillRepository !== undefined) {
  

        return this.finalSkillRepository.filter((s) => s.attribute === attribute);
      }
      return [];
    },
    traitsByAttribute(attribute) {
      if (this.traitRepository !== undefined) {
        return this.traitRepository.filter((t) => t.attribute === attribute);
      }
      return [];
    },
    characterlabel(key){
        switch (key) {
          case "U":
            return "Нетренирован"
            break;
         case "T":
            return "Тренирован"
            break;
         case "E":
            return "Эксперт"
            break;
          case "M":
            return "Мастер"
            break;
          case "L":
            return "Легенда"
            break;
          default:
            break;
        }
    },
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    RestrictionLevel(skill){
      const level = this.$store.getters['characters/characterLevelById'](this.characterId);

      if(level < 3 && skill == 'T')
        return true;

      if(level < 7 && skill == 'E')
        return true;

      if(level < 15 && skill == 'M')
        return true;

        return false;
    },
    ModAttribute(attribute, skill){
      const char1 = this.SkillsTrained[this.characterSkills[skill]];
      const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = this.characterLevel();
       
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    ModAttributeSaving(attribute, skill){
      const char1 = this.SkillsTrained[this.characterSaving[skill]];
      const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = this.characterLevel();
       
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    ModAttributePerception(attribute, skill){
      const char1 = this.SkillsTrained[this.SkillPerception()];
      const char2 = (this.characterAttributes["wisdom"] - 10) / 2;
      const char3 = this.characterLevel();
       
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    MaxSkillPoints(){
      const Max = (this.characterAttributes["intellect"] - 10) / 2
      if(Max < 0)
        return 0;
      
      return Max;
    },
    updateSelect(boost) {
        this.$store.commit('characters/setCharacterAncestryFreeBoost', { id: this.characterId, payload: { key: boost, value: 1 } });

    },
    updateSelect2(boost) {
        this.$store.commit('characters/setCharacterAncestryFreeBoost2', { id: this.characterId, payload: { key: boost, value: 1 } });

    },
    SkillPerception(){
      return this.$store.getters['characters/characterPerseptionById'](this.characterId);
    },
    
    affordableAttributeColor(currentValue) {
      const attributeNewValueCost = {
        //   [0, 1, 2, 3,  4,  5,  6,  7,  8,  9, 10, 11, 12],
        v10: [0, 0, 4, 6,  8, 15, 18, 21, 32, 36, 40, 55, 72],
        v15: [0, 0, 4, 6, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      };
      const costKey = this.settingHouserules['skill-attribute-advancement-costs'] ? this.settingHouserules['skill-attribute-advancement-costs'] : 'v15';
      const cost = attributeNewValueCost[costKey][currentValue + 1];
      return this.isAffordable(cost) ? 'green' : 'orange';
    },
    affordableSkillColor(currentSkillValue) {
      const skillNewValueCost = {
        //   [0, 1, 2, 3, 4,  5,  6,  7,  8],
        v10: [0, 1, 2, 3, 4, 10, 12, 14, 24],
        v15: [0, 2, 4, 6, 8, 10, 12, 14, 16],
      };
      const costKey = this.settingHouserules['skill-attribute-advancement-costs'] ? this.settingHouserules['skill-attribute-advancement-costs'] : 'v15';
      const cost = skillNewValueCost[costKey][currentSkillValue + 1];
      return this.isAffordable(cost) ? 'green' : 'orange';
    },
    isAffordable(cost) {
      return cost <= this.remainingBuildPoints;
    },
    freeBoost(name) {
    this.boost =  this.boost - 1;
      // if (this.species && this.species.attributeMaximums) {
      //   return this.species.attributeMaximums.find((attribute) => attribute.name === name).value;
      // }
      return this.boost;
    },
    computeSkillPool(skill) {
      const attribute = this.characterAttributesEnhanced[skill.attribute.toLowerCase()];
   
        return attribute + this.characterSkills[skill.key];
      
      // return this.characterSkills[skill.key];
    },
    openSkillsSettings(){
      this.skillsEditorDialog = true;
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
    saveCustomSkill() {
      // validate
      this.alert = false;
      const skill = {
        key: this.textToCamel(this.customSkill.name),
        name: this.customSkill.name,
        attribute: 'intellect',
        description: this.customSkill.description,
      };
      const doExist = this.skills.find((s)=>s.key===skill.key);
      if ( doExist ) {
        this.alert = true;
        console.warn(`Skill ${skill.name} already exists.`);
      } else {
        this.addCustomSkill(skill);
        this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: skill, value: this.characterSkillPoints - 1} });
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
      this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: key, value: this.characterSkillPoints + 1} });
    },
    ensurePrerequisites() {
      const archetype = this.archetype;

      if (archetype && archetype.prerequisites.length > 0) {
        archetype.prerequisites.forEach((prerequisite) => {
          // { group: 'attributes', value: 'willpower', threshold: 3, }
          switch (prerequisite.group) {
            case 'attributes':
              const attributeValue = this.characterAttributesEnhanced[prerequisite.value];
              if (attributeValue < prerequisite.threshold) {
                this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: prerequisite.value, value: prerequisite.threshold } });
              }
              break;
            case 'skills':
              const skillValue = this.characterSkills[prerequisite.value];
              if (skillValue < prerequisite.threshold) {
                this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: prerequisite.value, value: prerequisite.threshold } });
              }
              break;
          }
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">

  .page-title {
  }

  .small {
    height: 24px;
  }

  td.small {
    font-size: 12px;
  }

  .my-tabs-container {
    height: 620px;
    overflow: hidden;
  }

  .my-tab-item {
    height: 705px;
    overflow-y: auto;
  }

  .sexy_line{
    display:block;
    border:none;
    color:white;
    height:1px;
    background:black;
    background: -webkit-gradient(radial, 50% 50%, 0, 50% 50%, 350, from(#000), to(#fff));
  }

  .resource-box {
    $size: 12px;
    min-height: $size;
    max-height: $size;
    min-width: $size;
    max-width: $size;
    border: 1px solid hsl(0, 0%, 85%);
    box-shadow: inset 0 0 4px 0 hsl(0, 0%, 85%);
    cursor: pointer;

    box-sizing: inherit;
    margin: 2px;

    &--filled {

      &:before {
        content: "";
        display: block;
        height: 7px;
        width: 7px;
        margin-top: 1.5px;
        margin-left: 1.5px;
      }

      &::before {
        background-color: hsl(0, 100%, 37%);
      }
    }

    &--filled-light::before {
      background-color: hsl(62, 70%, 44%) !important;
    }
  }

  .faith-box {
    min-height: 20px;
    max-height: 20px;
    min-width: 20px;
    max-width: 20px;
    border: 1px solid hsl(0, 0%, 85%);
    box-shadow: inset 0 0 4px 0 hsl(0, 0%, 85%);
    cursor: pointer;

    box-sizing: inherit;
    margin: 2px;

    &--filled {

      &:before {
        content: "";
        display: block;
        height: 10px;
        width: 10px;
        margin-top: 4px;
        margin-left: 4px;
      }

      &::before {
        background-color: hsl(0, 100%, 37%);
      }
    }

  }
</style>
