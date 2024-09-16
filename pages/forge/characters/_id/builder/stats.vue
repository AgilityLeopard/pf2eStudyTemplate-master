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

    <v-col :cols="12" :md="6">
      <v-card>
        <v-card-title style="background-color: green; color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Внимательность</h2>
            </v-card-title>
        <v-simple-table dense>
          
            <tbody>
            <tr> 
                <td>{{ Perception.name }}</td>
                <td>{{ ModAttributePerception(Perception.attribute, Perception.key) }}</td>
                <td>{{ characterlabel(characterPerseption) }}</td>
                </tr>
            </tbody>
            
          
            <tbody>
              <tr>  
                <td> Сложность Класса</td>
                <td>{{ ModAttributeClass() }}</td>
                <td>{{ characterlabel(characterSkillClass)  }}</td>
              </tr>
            
            </tbody>
        </v-simple-table>

        <v-card-title style="background-color: green; color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Спасброски</h2>
            </v-card-title>
        <v-simple-table dense>
      

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
 
    <v-col :cols="12" :md="6" left>
      <v-card>
        <v-card-title style="background-color: green; color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Оружие</h2>
            </v-card-title>
        <v-simple-table dense>
      
          
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
        <v-card-title style="background-color: green; color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Доспехи</h2>
            </v-card-title>
        <v-simple-table dense>
      
          
  
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

    <v-col :cols="12">
      <h3 class="headline">
          Повышение от Наследия
      </h3>
    </v-col>

    <v-col v-if="species" :cols="12" :md="6" >

      <v-col v-if="boost == 2 "  :cols="12" :md="6" >
        <v-select  
          label="Повышение от Наследия"
          v-model="selectedAncestryBoost2"
          :items="AncestryAttribute2"
          item-text="name"
          item-value="key"
          @change="updateSelect2(selectedAncestryBoost2)"
        ></v-select>
      </v-col>
      
      <v-col cols="12" :md="6">
        <v-select  
          label="Свободное повышение"
          v-model="selectedAncestryBoost"
          :items="AncestryAttribute"
          item-text="name"
          item-value="key"
          @change="updateSelect(selectedAncestryBoost)"
        ></v-select>
      </v-col>

    </v-col>

    <v-col v-else>
      <v-alert  
          type="warning"
          class="caption ml-4 mr-4"
          dense outlined border="left"
            >
          Выберите наследие
        </v-alert>

      </v-col>
    
    <v-col :cols="12">
      <h3 class="headline">
          Повышение от Предыстории
      </h3>
    </v-col>

    <v-col v-if="!ascension" :cols="12">
        <v-alert
          type="warning"
          class="caption ml-4 mr-4"
          dense outlined border="left"
        >
        Выберите предысторию
      </v-alert>
    </v-col>
    
    <v-col  v-if="ascension" :cols="6" :md="6">
      <v-select  
        label="Повышение от предыстории"
        v-model="selectedBackgroundBoost"
        :items="BackgroundAttribute"
        item-text="name"
        item-value="key"
        @change="updateSelectBackground(selectedBackgroundBoost)"
      ></v-select>
      <!--  -->
    </v-col>

    <v-col   :cols="12">
      <h3 class="headline">
          Повышения Класса {{ archetype ? archetype.name : "" }}
      </h3>
    </v-col>

    <v-col  v-if="archetype && archetype.keyAbility.length > 1" :cols="6" :md="6">
      <v-select  
        label="Повышение Характеристики от класса"
        v-model="selectedClassBoost"
        :items="ClassAttribute"
        item-text="name"
        item-value="key"
        @change="updateSelectClassAttribute(selectedClassBoost)"
      ></v-select>
    </v-col>

    <v-col  v-if="archetype && archetype.skillTrainedChoice.length > 1" :cols="6" :md="6">
      <v-select  
        label="Повышение Навыка от класса"
        v-model="selectedClassSkill"
        :items="ClassSkill"
        item-text="name"
        item-value="key"
        @change="updateSelectClassSkill(selectedClassSkill)"
      ></v-select>
    </v-col>

    <v-col v-if="!archetype" :cols="12">
        <v-alert  
          type="warning"
          class="caption ml-4 mr-4"
          dense outlined border="left"
        >
        Выберите Класс
      </v-alert>
    </v-col>

    <v-col v-if="archetype && archetype.skillTrainedChoice.length == 0 &&  archetype.keyAbility.length == 0" :cols="12">
        <v-alert  
          type="warning"
          class="caption ml-4 mr-4"
          dense outlined border="left"
        >
        У класса нет повышений на выбор
      </v-alert>
    </v-col>



    <v-col :cols="12">
      <!-- <h3 class="headline">
          Общие повышения
      </h3> -->
      <v-card
        class="mb-4"
        dark
        dense
        outlined
        :color=" manageBoost1 ? 'info' : '' "
        @click="manageBoost1 = !manageBoost1"
      >
      <v-card-text class="pa-1">
          <v-icon>{{ manageBoost1 ? 'expand_less' : 'expand_more' }}</v-icon>
          Повышение на 1-й уровень
        </v-card-text>
      </v-card>
    </v-col>

    <v-col v-if="manageBoost1" :cols="12" :md="5" >
      <v-card>
        <v-card-title style="background-color: green; color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Количество свободных повышений: {{ 4 - characterBoost }}</h2>
            </v-card-title>

      
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
                    @click="decrementAttribute(attribute.key, 1)"
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
                    @click="incrementAttribute(attribute.key, 1)"
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
                <td class="text-center pa-1 small">  {{ Math.floor((characterAttributesEnhanced[attribute.key] - 10) / 2) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>

    <v-col v-if="manageBoost1" :cols="12" :md="7">
      <v-card>
        <v-card-title style="background-color: green; color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Количество свободных очков навыка: {{  characterSkillPoints }}</h2>
            </v-card-title>
      
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr v-for="skill in finalSkillRepository" :key="skill.key">
                <td>{{ skill.name }}</td>
                <td>
                  <v-btn
                    icon
                    :disabled="skill.key == characterClassSkill  || characterSkills[skill.key] == 'U' || RestrictionSkill(skill) == true || skill.optional === true || characterSkillPoints == MaxSkillPoints() || skill.custom"
                    @click="decrementSkill(skill.key)"
                  >
                    <v-icon color="red"> remove_circle </v-icon>
                  </v-btn>
                   {{  ModAttribute(skill.attribute, skill.key)  }}
                  <v-btn
                    icon
                    :disabled="characterSkills[skill.key] == 'L' || RestrictionLevel(characterSkills[skill.key], 1) == true || characterSkillPoints <= 0"
                    
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
                        :disabled="skill.optional"
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

    <v-container class="bg-surface-variant">
  <v-row>
     <!-- 5-й уровень -->
    <v-col :cols="6" :md="6" v-if="characterLevel() >=5" >
      
      <v-card
        class="mb-4"
        dark
        dense
        outlined
        :color=" manageBoost5 ? 'info' : '' "
        @click="manageBoost5 = !manageBoost5"
      >
      <v-card-text class="pa-1">
          <v-icon>{{ manageBoost5 ? 'expand_less' : 'expand_more' }}</v-icon>
          Повышение на 5-й уровень
        </v-card-text>
      </v-card>
    
      <!-- </v-col>

    <v-col  :cols="12" :md="5" > -->
      <v-card :cols="12" :md="6" v-if="manageBoost5 && characterLevel() >=5">
        <v-card-title style="background-color: green; color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Количество свободных повышений: {{ 4 - characterBoost5 }}</h2>
            </v-card-title>
       
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
                <tr>
                  <th v-for="header in attributeHeaders" :class="header.class" >
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
            <tbody>
              <tr v-for="attribute in attributeRepository">
                <td >{{ attribute.name }}</td>
                <td class="text-center pa-1 small">
                  <v-btn
                    icon
                    :disabled="
                      4 - characterBoost5 == 4 ||
                      characterAttributesBoost5[attribute.key] < 1
                    "
                    @click="decrementAttribute(attribute.key, 5)"
                  >
                    <v-icon color="red"> remove_circle </v-icon>
                  </v-btn>
                  {{ characterAttributes[attribute.key] }}
                  <v-btn
                    icon
                    :disabled="
                      4 - characterBoost5 == 0 ||
                      characterAttributesBoost5[attribute.key] > 0
                    "
                    @click="incrementAttribute(attribute.key, 5)"
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
                <td class="text-center pa-1 small">  {{ Math.floor((characterAttributesEnhanced[attribute.key] - 10) / 2) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    
    </v-col>

        <!-- 10-й уровень -->
    <v-col :cols="6" :md="6" v-if="characterLevel() >=10" >
      
      <v-card
        class="mb-4"
        dark
        dense
        outlined
        :color=" manageBoost10 ? 'info' : '' "
        @click="manageBoost10 = !manageBoost10"
      >
      <v-card-text class="pa-1">
          <v-icon>{{ manageBoost10 ? 'expand_less' : 'expand_more' }}</v-icon>
          Повышение на 10-й уровень
        </v-card-text>
      </v-card>
    
      <!-- </v-col>

    <v-col  :cols="12" :md="5" > -->
      <v-card v-if="manageBoost10 && characterLevel() >=10">
        <v-card-title style="background-color: green; color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Количество свободных повышений: {{ 4 - characterBoost10 }}</h2>
            </v-card-title>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
                <tr>
                  <th v-for="header in attributeHeaders" :class="header.class" >
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
            <tbody>
              <tr v-for="attribute in attributeRepository">
                <td >{{ attribute.name }}</td>
                <td class="text-center pa-1 small">
                  <v-btn
                    icon
                    :disabled="
                      4 - characterBoost10 == 4 ||
                      characterAttributesBoost10[attribute.key] < 1
                    "
                    @click="decrementAttribute(attribute.key, 10)"
                  >
                    <v-icon color="red"> remove_circle </v-icon>
                  </v-btn>
                  {{ characterAttributes[attribute.key] }}
                  <v-btn
                    icon
                    :disabled="
                      4 - characterBoost10 == 0 ||
                      characterAttributesBoost10[attribute.key] > 0
                    "
                    @click="incrementAttribute(attribute.key, 10)"
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
                <td class="text-center pa-1 small">  {{ Math.floor((characterAttributesEnhanced[attribute.key] - 10) / 2) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>

    
    </v-col>
    
  </v-row>  
</v-container>

  <v-row >
     <!-- 15-й уровень -->
    <v-col :cols="6" :md="6" v-if="characterLevel() >=15" >
      
          
   
      <v-card
        class="mb-4"
        dark
        dense
        outlined
        :color=" manageBoost15 ? 'info' : '' "
        @click="manageBoost15 = !manageBoost15"
      >
      <v-card-text class="pa-1">
          <v-icon>{{ manageBoost5 ? 'expand_less' : 'expand_more' }}</v-icon>
          Повышение на 15-й уровень
        </v-card-text>
      </v-card>
   
      <!-- </v-col>

    <v-col  :cols="12" :md="5" > -->
      <v-card v-if="manageBoost15 && characterLevel() >=15">
        <v-card-title style="background-color: green; color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Количество свободных повышений: {{ 4 - characterBoost15 }}</h2>
            </v-card-title>
       
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
                <tr>
                  <th v-for="header in attributeHeaders" :class="header.class" >
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
            <tbody>
              <tr v-for="attribute in attributeRepository">
                <td >{{ attribute.name }}</td>
                <td class="text-center pa-1 small">
                  <v-btn
                    icon
                    :disabled="
                      4 - characterBoost15 == 4 ||
                      characterAttributesBoost15[attribute.key] < 1
                    "
                    @click="decrementAttribute(attribute.key, 15)"
                  >
                    <v-icon color="red"> remove_circle </v-icon>
                  </v-btn>
                  {{ characterAttributes[attribute.key] }}
                  <v-btn
                    icon
                    :disabled="
                      4 - characterBoost15 == 0 ||
                      characterAttributesBoost15[attribute.key] > 0
                    "
                    @click="incrementAttribute(attribute.key, 15)"
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
                <td class="text-center pa-1 small">  {{ Math.floor((characterAttributesEnhanced[attribute.key] - 10) / 2) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    
    </v-col>

        <!-- 20-й уровень -->
    <v-col :cols="6" :md="6" v-if="characterLevel() >=20" >
      <v-card
        class="mb-4"
        dark
        dense
        outlined
        :color=" manageBoost20 ? 'info' : '' "
        @click="manageBoost20 = !manageBoost20"
      >
      <v-card-text class="pa-1">
          <v-icon>{{ manageBoost20 ? 'expand_less' : 'expand_more' }}</v-icon>
          Повышение на 20-й уровень
        </v-card-text>
      </v-card>
    
      <!-- </v-col>

    <v-col  :cols="12" :md="5" > -->
      <v-card v-if="manageBoost20 && characterLevel() >=20">
        <v-card-title style="background-color: green; color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">Количество свободных повышений: {{ 4 - characterBoost20 }}</h2>
            </v-card-title>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
                <tr>
                  <th v-for="header in attributeHeaders" :class="header.class" >
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
            <tbody>
              <tr v-for="attribute in attributeRepository">
                <td >{{ attribute.name }}</td>
                <td class="text-center pa-1 small">
                  <v-btn
                    icon
                    :disabled="
                      4 - characterBoost20 == 4 ||
                      characterAttributesBoost20[attribute.key] < 1
                    "
                    @click="decrementAttribute(attribute.key, 20)"
                  >
                    <v-icon color="red"> remove_circle </v-icon>
                  </v-btn>
                  {{ characterAttributes[attribute.key] }}
                  <v-btn
                    icon
                    :disabled="
                      4 - characterBoost20 == 0 ||
                      characterAttributesBoost20[attribute.key] > 0
                    "
                    @click="incrementAttribute(attribute.key, 20)"
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
                <td class="text-center pa-1 small">  {{ Math.floor((characterAttributesEnhanced[attribute.key] - 10) / 2) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
  <v-col  v-for="(level, index) in 20"
          :key="level"
        
          v-if="level <= characterLevel() && level != 1 && (level - 1) % 2 == 0" :cols="12" :md="7">
      <v-card>
        <v-card-title style="background-color: green; color: #fff;" class="body-1 pt-1 pb-1">
              <h2 class="subtitle-1">{{level}} уровень </h2>
            </v-card-title>
       
        <!-- <v-data-table dense 
        :items="SkillLeveL(finalSkillRepository, level)" 
         
         @click:row="rowClick"
        
       
          hide-default-footer
          item-key="name"
          :items-per-page=-1
          single-select
          show-select
         :headers="skillHeaders"
        >
 
        <template v-slot:item.key="{ item }">
              <span>{{ item.name }}</span>
            </template>

            <template v-slot:item.name="{ item }">
              <span>  {{  ModAttribute(item.attribute, item.key)  }}</span>
            </template>

            <template v-slot:item.attribute="{ item }">
              <span>{{ characterlabel(characterSkills[item.key]) }}</span>
            </template>

             <template v-slot:item.actions="{  item }">
              <v-checkbox
                class="me-2"
                size="small"
                @click="editItem(item)"
              >
              mdi-pencil
              </v-checkbox>
            </template>


        </v-data-table> -->
        
        <!-- <v-select
            :items="[currentCharacterTier]"
            :value="currentCharacterTier"
            :label="Выберите навык"
            dense
            disabled
            readonly
          />  -->

        <v-spacer></v-spacer>


      </v-card>
    </v-col>
 </v-row>
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
      alert: false,
      refEx: /\d+/g,
      manageBoost1: true,
      manageBoost5: true,
      manageBoost10: true,
      manageBoost15: true,
      manageBoost20: true,
      skillsEditorDialog: false,
      selectedAncestryBoost: undefined,
      selectedClassBoost: undefined,
      selectedClassSkill: undefined,
      selectedAncestryBoost2: undefined,
      selectedBackgroundBoost: undefined,
      selectedBackgroundBoost2: undefined,
      selectedBoost: { },
      customSkill: {
        key: undefined,
        name: 'Знание',
        attribute: 'intellect',
        description: '',
      },
      selectedId :undefined,
      showAlerts: false,
      archetype: undefined,
      species: undefined,
      ascension: undefined,
      loading: false,
      skillChoice : undefined,
      select: { },
      AncestryAttribute: [],
      AncestryAttribute2: [],
      ClassAttribute: [],
      BackgroundAttribute: [],
      BackgroundAttribute2: [],
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

      if (!this.archetypePrerequisitesValid) {
        alerts.push({
          key: 'prerequisites',
          type: 'warning',
          text: 'Your attributes are lower than the picked archetype `demands`.',
        });
      }

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

    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
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
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterSkillPointsLevel() {
      return this.$store.getters['characters/characterSkillPointsLevelById'](this.characterId);
    },
    characterSkillTableLevel() {
      return this.$store.getters['characters/characterSkillTableLevelById'](this.characterId);
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
    finalWDRepository() {
      return [
        ...this.skillAttack,
        ...this.skillDefence,
      ];
    },
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
    characterSkillTableLevel: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadSkillTable(newVal);
        }
      }
    }
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
      this.selectedClassSkill= this.characterClassSkill;
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
      this.BackgroundAttribute2 =  this.attributeRepository;
      this.selectedBackgroundBoost = this.characterBackgroundFreeBoost;
      this.selectedBackgroundBoost2 = this.characterBackgroundFreeBoost2; 
      this.loading = false;
      
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
    async loadSkillTable(key) {
      this.loading = true;
      // this.skillChoice = key;

      this.loading = false;
    },
    resetStats() {
      const key = this.selectedAncestryBoost ? this.selectedAncestryBoost.key : "";
      const key2 = this.selectedAncestryBoost2 ? this.selectedAncestryBoost2.key : "";
      const key3 = this.selectedBackgroundBoost ? this.selectedBackgroundBoost.key : "";
      const key4 = this.selectedBackgroundBoost2 ? this.selectedBackgroundBoost2.key : "";
      this.$store.commit('characters/setCharacterAncestryFreeBoost', { id: this.characterId, payload: { key: key , value: 0 } });
      this.$store.commit('characters/setCharacterAncestryFreeBoost2', { id: this.characterId, payload: { key: key2 , value: 0 } });
      this.selectedAncestryBoost = "";
      this.selectedAncestryBoost2 = "";
      this.selectedBackgroundBoost = "";
      this.selectedBackgroundBoost2 = "";
      this.$store.commit('characters/resetCharacterStats', { id: this.characterId, optional: 'all' });
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
    incrementSkillLevel(skill, level, choice) {
      //level+число
      const lab = this.label(level);
      const triggerMatch = this.characterSkillPointsLevel[lab] === skill ? true : false;
      //Для нового значения
      const val = this.characterSkillPointsLevel[lab] ? -1 : 1;
      var keys = Object.keys(this.SkillsTrained);
      var loc = keys.indexOf(this.characterSkills[skill]);
      const newValue = keys[loc+1];

      //Убрать старое
      if(this.characterSkillPointsLevel[lab] !== '')
      {
        var loc1 = keys.indexOf(this.characterSkills[this.characterSkillPointsLevel[lab]]);
        const newValue1 = keys[loc1-1] <= 0 ? 0 : keys[loc1-1];
      
    
      //Убрать старое
      const skillName = this.characterSkillPointsLevel[lab].replace(/[0-9]/g, '');
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skillName, value: newValue1 } });
      this.$store.commit('characters/setCharacterSkillPointsLevel', { id: this.characterId, payload: { level: lab, value: ""} });
      }

      if(!triggerMatch)
      {
        this.$store.commit('characters/setCharacterSkillPointsLevel', { id: this.characterId, payload: { level: lab, value: skill} });
        // this.$store.commit('characters/setCharacterSkillPointsLevel', { id: this.characterId, payload: { level: lab, value: 0} });
        this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });
      }
        
    },
    decrementSkillLevel(skill, level) {
      var keys = Object.keys(this.SkillsTrained);
      var loc = keys.indexOf(this.characterSkills[skill]);
      const newValue = keys[loc-1];
      const lab = this.label(level);
      // this.$store.commit('characters/setCharacterSkillPointsLevel', { id: this.characterId, payload: { level: lab, value: 1} });
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });
    },
    incrementAttribute(attribute, level) {
      // const newValue = this.characterAttributes[attribute] + 2;
      
      const newValue = this.characterAttributes[attribute] >= 18 ? this.characterAttributes[attribute] + 1 : this.characterAttributes[attribute] + 2;
      // if(this.characterAttributes[attribute] >= 18)
      //   const newValue = this.characterAttributes[attribute] + 1;
      // else  
      //   const newValue = this.characterAttributes[attribute] + 2;

      if(attribute == "intellect") 
        this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: attribute, value: this.characterSkillPoints + 1} });

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
      // this.$store.commit('characters/setCharacterAttributeBoost', { id: this.characterId, payload: { key: attribute, value: 1 } });
      // this.$store.commit('characters/setCharacterBoost', { id: this.characterId, payload: { key: attribute, value: +1 } });
      // this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
    },
    decrementAttribute(attribute, level) {

      const newValue = this.characterAttributes[attribute] > 18 ? this.characterAttributes[attribute] - 1 : this.characterAttributes[attribute] - 2;
      // if(this.characterAttributes[attribute] > 18)
      //   const newValue = this.characterAttributes[attribute] - 1;
      // else  
      //   const newValue = this.characterAttributes[attribute] - 2;

      if(attribute == "intellect") 
        this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: attribute, value: this.characterSkillPoints - 1} });

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
            this.$store.commit('characters/setCharacterAttributeBoost15', { id: this.characterId, payload: { key: attribute, value: 0} });
            this.$store.commit('characters/setCharacterBoost15', { id: this.characterId, payload: { key: attribute, value: -1 } });
            this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
            break;
        case 20:
            this.$store.commit('characters/setCharacterAttributeBoost20', { id: this.characterId, payload: { key: attribute, value: 0 } });
            this.$store.commit('characters/setCharacterBoost20', { id: this.characterId, payload: { key: attribute, value: -1 } });
            this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
            break;
        }  

      // this.$store.commit('characters/setCharacterAttributeBoost', { id: this.characterId, payload: { key: attribute, value: 0 } });
      // this.$store.commit('characters/setCharacterBoost', { id: this.characterId, payload: { key: attribute, value: -1 } });
      // this.$store.commit('characters/setCharacterAttribute', { id: this.characterId, payload: { key: attribute, value: newValue } });
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
    rowClick(item, row)
    {
      // this.skillChoice[item.level] = item;
      this.$store.commit('characters/setCharacterSkillTableLevel', { id: this.characterId, payload: { level: item.level, value: item } });

      row.select(true);
      this.incrementSkillLevel(item.key, item.level);
 
    },
    characterlabel(key){
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
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    RestrictionLevel(skill, key){
      const level = this.$store.getters['characters/characterLevelById'](this.characterId);

      if(key < 3 && skill == 'T')
        return true;

      if(key < 7 && skill == 'E')
        return true;

      if(key < 15 && skill == 'M')
        return true;

        return false;
    },
    RestrictionSkill(skill){
      const level = this.$store.getters['characters/characterLevelById'](this.characterId);
      if(this.ascension !== undefined)
        if(this.ascension.skill === skill.key  && this.characterSkills[skill.key] === 'T')
          return true;
        if(this.characterClassSkill != ""  && this.characterClassSkill === skill.key)
        {
          return true;
        }
        
        if(this.characterTrainedSkillClass.find(item => item === skill.key))
          return true;
        return false;
    },
    ModAttribute(attribute, skill){
      const char1 = this.SkillsTrained[this.characterSkills[skill]];
      const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = char1 === 0 ? 0 : this.characterLevel();
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    ModAttributeSaving(attribute, skill){
      const char1 = this.SkillsTrained[this.characterSaving[skill]];
      const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = this.characterLevel();
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    ModAttributeClass(){
      const char1 = this.SkillsTrained[this.SkillClass()];
      const char3 = this.characterLevel();
      if(this.archetype)
        return parseInt(char1) + parseInt(char3);
      else  
        0
    },
    ModAttributePerception(attribute, skill){
      const char1 = this.SkillsTrained[this.SkillPerception()];
      const char2 = (this.characterAttributes["wisdom"] - 10) / 2;
      const char3 = this.characterLevel();
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    MaxSkillPoints(){
      const Max = (this.characterAttributes["intellect"] - 10) / 2 + this.characterSkillPoints;
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
    updateSelectBackground(boost) {
        this.$store.commit('characters/setCharacterBackgroundFreeBoost', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectClassAttribute(boost) {
        this.$store.commit('characters/setCharacterClassAttribute', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectClassSkill(boost) {
        this.$store.commit('characters/setCharacterClassSkill', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectBackground2(boost) {
        this.$store.commit('characters/setCharacterBackgroundFreeBoost2', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    SkillPerception(){
      return this.$store.getters['characters/characterPerseptionById'](this.characterId);
    },
    SkillClass() {
      return this.$store.getters['characters/characterSkillClassById'](this.characterId);
    },
    // SkillValue(skill, index){
    //   return this.characterSkillPointsLevel.find( item => item === skill.key+index);
    // },
    Checkbox(skill, index){
      const Restr = this.RestrictionLevel(this.characterSkills[skill.key], index);
      
      const level = "level"+index;
      // if (Restr)
      //   return Restr


      const listLevel = this.characterSkillPointsLevel[level] ? this.characterSkillPointsLevel[level] : undefined;

      if(!listLevel)
        if (Restr)
          return Restr
        else
          return false;

      if(listLevel === skill.key+index)
        return false;
      else
        return true;
    },
    affordableAttributeColor(currentValue) {
      const attributeNewValueCost = {
        v10: [0, 0, 4, 6,  8, 15, 18, 21, 32, 36, 40, 55, 72],
        v15: [0, 0, 4, 6, 10, 15, 20, 25, 30, 35, 40, 45, 50],
      };
      const costKey = this.settingHouserules['skill-attribute-advancement-costs'] ? this.settingHouserules['skill-attribute-advancement-costs'] : 'v15';
      const cost = attributeNewValueCost[costKey][currentValue + 1];
      return this.isAffordable(cost) ? 'green' : 'orange';
    },
    affordableSkillColor(currentSkillValue) {
      const skillNewValueCost = {
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
      return this.boost;
    },
    label(level){
      return "level" + level.toString();
    },
    computeSkillPool(skill) {
      const attribute = this.characterAttributesEnhanced[skill.attribute.toLowerCase()];
      return attribute + this.characterSkills[skill.key];
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
      this.alert = false;
      const skill = {
        key: this.textToCamel(this.customSkill.name),
        name: this.customSkill.name,
        attribute: 'intellect',
        description: this.customSkill.description,
        optional: false,
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
    SkillLeveL(finalSkillRepository, level, row)
    {
  
      let finalEnhancements = [];
      const skillChoice = this.characterSkillTableLevel;
      finalSkillRepository.forEach(item => 
            {
            
              const newMod = {
                      ...item,
                      level: level,
                      
                    };    
                    // const cur = skillTrainedPoints[Object.keys(skillTrainedPoints)[Object.keys(skillTrainedPoints).indexOf('level'+level)]];
                    // if(cur === item.key)
                    //   Choice.push(newMod);
                    return finalEnhancements.push(newMod);
            }
            );


  
      return finalEnhancements;
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

  tr.v-data-table__selected {
  background: #7d92f5 !important;
}

  // .select {
  //   background: #7d92f5 !important;
  // }

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
