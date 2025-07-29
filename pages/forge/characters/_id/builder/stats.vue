<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <v-col :cols="12">
      <h1 class="headline">
        Выберите характеристики и навыки
        <!-- <span>
          <v-btn color="primary" @click="resetStats" outlined small
            >Сброс статов</v-btn
          >
        </span> -->
      </h1>
    </v-col>

    <v-expansion-panels multiple>
      <v-expansion-panel
        v-for="levelAncestry in 20"
        :key="levelAncestry"
        v-if="
          levelAncestry <= characterLevel() &&
          (archetype?.isFeatLevelOne === true ||
            levelSkill['class'].includes(levelAncestry))
        "
      >
        <v-expansion-panel-header
          >{{ levelAncestry }} уровень
          <v-chip style="flex: none" right pill> 0/2 </v-chip>
        </v-expansion-panel-header>

        <v-expansion-panel-content :key="levelAncestry">
          <v-col v-if="levelAncestry === 1">
            <v-col :cols="12">
              <h3 class="headline">Повышение от Наследия</h3>
            </v-col>

            <v-container v-if="species" class="bg-surface-variant">
              <v-row>
                <v-col v-if="boost == 2" :cols="12" :md="6">
                  <v-select
                    label="Повышение от Наследия"
                    v-model="selectedAncestryBoost2"
                    :items="AncestryAttribute2"
                    item-text="name"
                    item-value="key"
                    @change="updateSelect2(selectedAncestryBoost2)"
                  ></v-select>
                </v-col>

                <v-col :cols="12" :md="6">
                  <v-select
                    label="Свободное повышение"
                    v-model="selectedAncestryBoost"
                    :items="AncestryAttribute"
                    item-text="name"
                    item-value="key"
                    @change="updateSelect(selectedAncestryBoost)"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>

            <v-col v-else>
              <v-alert
                type="warning"
                class="caption ml-4 mr-4"
                dense
                outlined
                border="left"
              >
                Выберите наследие
              </v-alert>
            </v-col>

            <v-col :cols="12">
              <h3 class="headline">Повышение от Предыстории</h3>
            </v-col>

            <v-col v-if="!ascension" :cols="12">
              <v-alert
                type="warning"
                class="caption ml-4 mr-4"
                dense
                outlined
                border="left"
              >
                Выберите предысторию
              </v-alert>
            </v-col>

            <v-container v-if="ascension" class="bg-surface-variant">
              <v-row>
                <v-col :cols="6" :md="6">
                  <v-select
                    label="Повышение от предыстории"
                    v-model="selectedBackgroundBoost"
                    :items="BackgroundAttribute"
                    item-text="name"
                    item-value="key"
                    @change="updateSelectBackground(selectedBackgroundBoost)"
                  ></v-select>
                </v-col>

                <v-col :cols="6" :md="6">
                  <v-select
                    label="Свободное повышение"
                    v-model="selectedBackgroundBoost2"
                    :items="BackgroundAttribute2"
                    item-text="name"
                    item-value="key"
                    @change="updateSelectBackground2(selectedBackgroundBoost2)"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            <v-col :cols="12">
              <h3 class="headline">
                Повышения Класса {{ archetype ? archetype.name : "" }}
              </h3>
            </v-col>

            <v-col
              v-if="archetype && archetype.keyAbility.length > 1"
              :cols="6"
              :md="6"
            >
              <v-select
                label="Повышение Характеристики от класса"
                v-model="selectedClassBoost"
                :items="ClassAttribute"
                item-text="name"
                item-value="key"
                @change="updateSelectClassAttribute(selectedClassBoost)"
              ></v-select>
            </v-col>

            <v-col
              v-if="archetype && archetype.skillTrainedChoice.length > 1"
              :cols="6"
              :md="6"
            >
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
                dense
                outlined
                border="left"
              >
                Выберите Класс
              </v-alert>
            </v-col>

            <v-col
              v-if="
                archetype &&
                archetype.skillTrainedChoice.length == 0 &&
                archetype.keyAbility.length == 0
              "
              :cols="12"
            >
              <v-alert
                type="warning"
                class="caption ml-4 mr-4"
                dense
                outlined
                border="left"
              >
                У класса нет повышений на выбор
              </v-alert>
            </v-col>

            <v-row></v-row>
            <v-col v-if="archetype">
              <v-btn
                outlined
                x-small
                color="success"
                @click="dialogAttributeLevel1 = true"
              >
                Повышение Аттрибутов
              </v-btn>

              <v-btn
                outlined
                x-small
                color="success"
                @click="dialogSkillLevel1 = true"
              >
                Повышение Навыков
              </v-btn>
            </v-col>
          </v-col>

          <v-col
            v-if="
              levelAncestry > 1 && (levelAncestry - 1) % 2 == 0 && archetype
            "
          >
            <v-btn
              outlined
              x-small
              color="success"
              @click="openSkillLevel(levelAncestry)"
            >
              Повышение Навыков
            </v-btn>
          </v-col>
          <v-col v-if="levelAncestry === 5">
            <v-btn
              outlined
              x-small
              color="success"
              @click="manageBoost5 = true"
            >
              Повышение Аттрибутов
            </v-btn>
          </v-col>

          <v-col v-if="levelAncestry === 10">
            <v-btn
              outlined
              x-small
              color="success"
              @click="manageBoost10 = true"
            >
              Повышение Аттрибутов
            </v-btn>
          </v-col>

          <v-col v-if="levelAncestry === 15">
            <v-btn
              outlined
              x-small
              color="success"
              @click="manageBoost15 = true"
            >
              Повышение Аттрибутов
            </v-btn>
          </v-col>

          <v-col v-if="levelAncestry === 20">
            <v-btn
              outlined
              x-small
              color="success"
              @click="manageBoost20 = true"
            >
              Повышение Аттрибутов
            </v-btn>
          </v-col>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- Диалог повышения -->
    <v-dialog
      v-model="dialogAttributeLevel1"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <v-card>
        <v-card-title style="background-color: #262e37; color: #fff">
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
              <v-card-title
                style="background-color: green; color: #fff"
                class="body-1 pt-1 pb-1"
              >
                <h2 class="subtitle-1">
                  Количество свободных повышений: {{ 4 - characterBoost }}
                </h2>
              </v-card-title>

              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th
                        v-for="header in attributeHeaders"
                        :class="header.class"
                      >
                        {{ header.text }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="attribute in attributeRepository"
                      :key="attribute.key"
                    >
                      <td>{{ attribute.name }}</td>
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
                      <td class="text-center pa-1 small">
                        {{
                          Math.floor(
                            (characterAttributesEnhanced[attribute.key] - 10) /
                              2
                          )
                        }}
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
          <v-btn
            outlined
            color="red"
            left
            @click="dialogAttributeLevel1 = false"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialogSkillLevel1"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <v-card>
        <v-card-title style="background-color: #262e37; color: #fff">
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
              <v-card-title
                style="background-color: green; color: #fff"
                class="body-1 pt-1 pb-1"
              >
                <h2 class="subtitle-1">
                  Количество свободных очков навыка:
                  {{
                    characterSkillPointClass +
                    characterSkillPointBackground +
                    characterSkillPointClassUp +
                    modInt(1) -
                    // characterOptional(1) -
                    skillSheetPoints("", 1)
                  }}
                </h2>
              </v-card-title>

              <v-simple-table dense>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="skill in finalSkillRepository" :key="skill.key">
                      <td>{{ skill.name }}</td>
                      <td>
                        <v-btn
                          icon
                          :disabled="
                            skillSheetValue(skill.key, 1) === 0 ||
                            (skill.custom &&
                              skillSheetTrained(skill.key, 1) ===
                                'Тренирован') ||
                            skillSheetOptional(skill.key, 1) === true
                          "
                          @click="decrementSkill(skill.key, 1)"
                        >
                          <v-icon color="red"> remove_circle </v-icon>
                        </v-btn>
                      </td>
                      <td class="text-center small pa-1">
                        <!-- {{ ModAttribute(skill.attribute, skill.key) }} -->
                        {{
                          // characterSkills[skill.key] === "U"
                          //   ? characterlabel(characterSkills[skill.key])
                          //   : "Тренирован"
                          skillSheetTrained(skill.key, 1)
                        }}
                      </td>
                      <td>
                        <v-btn
                          icon
                          :disabled="
                            skillSheetValue(skill.key, 1) > 0 ||
                            // skillSheetAll(skill.key, 1) >= characterSkillPointClass ||
                            characterSkillPointClass +
                              characterSkillPointClassUp +
                              characterSkillPointBackground +
                              modInt(1) -
                              skillSheetPoints('', 1) <=
                              0
                          "
                          @click="incrementSkill(skill.key, 1)"
                        >
                          <v-icon
                            :color="
                              affordableSkillColor(characterSkills[skill.key])
                            "
                          >
                            add_circle
                          </v-icon>
                        </v-btn>
                      </td>
                      <!-- <td>{{ characterSkills[skill.key] === "U" ? characterlabel(characterSkills[skill.key]) : "Тренирован" }}</td> -->
                      <span v-if="skill.custom">
                        <v-hover>
                          <v-icon
                            v-if="skill.optional !== true"
                            small
                            @click="removeCustomSkill(skill.key, 1)"
                            slot-scope="{ hover }"
                            :disabled="skill.optional"
                            :color="`${hover ? 'error' : ''}`"
                            >delete</v-icon
                          >
                        </v-hover>
                      </span>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>

              <v-spacer></v-spacer>

              <v-card-actions style="justify-content: center">
                <v-btn x-small text @click="openSkillsSettings(1)"
                  >Дополнительное Знание <v-icon small>settings</v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-card-text>

        <v-divider />
        <v-card-actions>
          <v-btn outlined color="red" left @click="dialogSkillLevel1 = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Custom Skills -->
    <v-dialog
      v-model="skillsEditorDialog"
      width="600px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-alert :value="alert" type="error" text dense border="left">
          Знание уже существует
        </v-alert>
        <v-alert
          :value="
            skillLevel === 1
              ? characterSkillPointClass +
                  characterSkillPointClassUp +
                  characterSkillPointBackground -
                  skillSheetPoints('', 1) <=
                0
              : 1 - skillSheetAll('', skillLevel) <= 0
          "
          type="info"
          text
          dense
          border="left"
        >
          Недостаточно очков Навыка для добавления нового Знания
        </v-alert>
        <v-card-title style="background-color: #262e37; color: #fff">
          Редактирование Знаний
          <v-spacer />
          <v-icon dark @click="closeSkillsSettings">close</v-icon>
        </v-card-title>

        <v-card-text class="pt-4">
          <v-text-field
            v-model="customSkill.name"
            dense
            label="Имя Знания"
          ></v-text-field>
          <v-textarea
            v-model="customSkill.description"
            dense
            label="Описание"
          ></v-textarea>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <v-btn
            small
            right
            color="success"
            :disabled="
              skillLevel === 1
                ? characterSkillPointClass +
                    characterSkillPointClassUp +
                    characterSkillPointBackground -
                    skillSheetPoints('', 1) <=
                  0
                : 1 - skillSheetAll('', skillLevel) <= 0
            "
            @click="saveCustomSkill(skillLevel)"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Скилл на каждом уровне -->
    <v-dialog
      v-model="dialogSkill"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <v-card>
        <v-card-title style="background-color: #262e37; color: #fff">
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
              <v-card-title
                style="background-color: green; color: #fff"
                class="body-1 pt-1 pb-1"
              >
                <h2 class="subtitle-1">
                  Количество свободных очков навыка:
                  {{ 1 + modInt(skillLevel) - skillSheetAll("", skillLevel) }}
                </h2>
              </v-card-title>
              <v-simple-table dense>
                <template v-slot:default>
                  <tbody>
                    <tr v-for="skill in finalSkillRepository" :key="skill.key">
                      <td>{{ skill.name }}</td>
                      <td>
                        <!-- :disabled="
                      skill.key == characterClassSkill ||
                      characterSkills[skill.key] == 'U' ||
                      skill.optional === true ||
                      characterSkillPoints === MaxSkillPoints() ||
                      skill.custom ||
                      skillChoiceInitial.find((item) => item === skill.key) !==
                        skill.key ||
                      CharacterskillFromModification[skill.key] > 0
                    " -->

                        <v-btn
                          icon
                          :disabled="
                            skillSheetValue(skill.key, skillLevel) === 0 ||
                            (skill.custom &&
                              skillSheetTrained(skill.key, skillLevel) ===
                                'Тренирован')
                          "
                          @click="decrementSkill(skill.key, skillLevel)"
                        >
                          <v-icon color="red"> remove_circle </v-icon>
                        </v-btn>
                      </td>
                      <td class="text-center small pa-1">
                        <!-- {{ ModAttribute(skill.attribute, skill.key) }} -->
                        {{
                          // characterSkills[skill.key] === "U"
                          //   ? characterlabel(characterSkills[skill.key])
                          //   : "Тренирован"
                          skillSheetTrained(skill.key, skillLevel)
                        }}
                      </td>
                      <td>
                        <v-btn
                          icon
                          :disabled="
                            skillSheetValue(skill.key, skillLevel) > 0 ||
                            skillSheetAll(skill.key, skillLevel) >=
                              1 + modInt(skillLevel) ||
                            levelRestrict(skill.key, skillLevel) === true ||
                            skillSheetTrained(skill.key, skillLevel) ===
                              'Легенда'
                          "
                          @click="incrementSkill(skill.key, skillLevel)"
                        >
                          <v-icon
                            :color="
                              affordableSkillColor(characterSkills[skill.key])
                            "
                          >
                            add_circle
                          </v-icon>
                        </v-btn>
                      </td>
                      <!-- <td>{{ characterSkills[skill.key] === "U" ? characterlabel(characterSkills[skill.key]) : "Тренирован" }}</td> -->
                      <span v-if="skill.custom">
                        <v-hover>
                          <v-icon
                            v-if="skill.optional !== true"
                            small
                            @click="removeCustomSkill(skill.key)"
                            slot-scope="{ hover }"
                            :disabled="skill.optional"
                            :color="`${hover ? 'error' : ''}`"
                            >delete</v-icon
                          >
                        </v-hover>
                      </span>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-spacer></v-spacer>

              <v-card-actions style="justify-content: center">
                <v-btn x-small text @click="openSkillsSettings(skillLevel)"
                  >Дополнительное Знание <v-icon small>settings</v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Аттрибуты 5, 10, 15, 20 -->
    <v-dialog
      v-model="manageBoost5"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <v-card>
        <v-card-title style="background-color: #262e37; color: #fff">
          <span>Повышение аттрибутов</span>
          <v-spacer />
          <v-icon @click="dialogAttributeLevel1 = false"> close </v-icon>
        </v-card-title>
        <v-divider />

        <v-card-title> </v-card-title>

        <v-divider />
        <v-card-text class="pa-6">
          <v-card-title
            style="background-color: green; color: #fff"
            class="body-1 pt-1 pb-1"
          >
            <h2 class="subtitle-1">
              Количество свободных повышений: {{ 4 - characterBoost5 }}
            </h2>
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
                <tr v-for="attribute in attributeRepository">
                  <td>{{ attribute.name }}</td>
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
                  <td class="text-center pa-1 small">
                    {{
                      Math.floor(
                        (characterAttributesEnhanced[attribute.key] - 10) / 2
                      )
                    }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="manageBoost10"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <v-card>
        <v-card-title
          style="background-color: green; color: #fff"
          class="body-1 pt-1 pb-1"
        >
          <h2 class="subtitle-1">
            Количество свободных повышений: {{ 4 - characterBoost10 }}
          </h2>
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
              <tr v-for="attribute in attributeRepository">
                <td>{{ attribute.name }}</td>
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
                <td class="text-center pa-1 small">
                  {{
                    Math.floor(
                      (characterAttributesEnhanced[attribute.key] - 10) / 2
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="manageBoost15"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <v-card>
        <v-card-title
          style="background-color: green; color: #fff"
          class="body-1 pt-1 pb-1"
        >
          <h2 class="subtitle-1">
            Количество свободных повышений: {{ 4 - characterBoost15 }}
          </h2>
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
              <tr v-for="attribute in attributeRepository">
                <td>{{ attribute.name }}</td>
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
                <td class="text-center pa-1 small">
                  {{
                    Math.floor(
                      (characterAttributesEnhanced[attribute.key] - 10) / 2
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="manageBoost20"
      :fullscreen="$vuetify.breakpoint.xsOnly"
      width="600px"
      scrollable
    >
      <v-card>
        <v-card-title
          style="background-color: green; color: #fff"
          class="body-1 pt-1 pb-1"
        >
          <h2 class="subtitle-1">
            Количество свободных повышений: {{ 4 - characterBoost20 }}
          </h2>
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
              <tr v-for="attribute in attributeRepository">
                <td>{{ attribute.name }}</td>
                <td class="text-center pa-1 small">
                  <v-btn
                    icon
                    :disabled="
                      4 - characterBoost15 == 4 ||
                      characterAttributesBoost15[attribute.key] < 1
                    "
                    @click="decrementAttribute(attribute.key, 20)"
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
                <td class="text-center pa-1 small">
                  {{
                    Math.floor(
                      (characterAttributesEnhanced[attribute.key] - 10) / 2
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
      // skillChoiceInitial : [],
      //Выбор навыков
      skillChoice1 : "",
      skillChoice2 : "",
      skillChoice3 : "",
      skillChoice4 : "",
      skillChoice5 : "",
      skillChoice6 : "",
      skillChoice7: "",

      skillChoice8 : "",
      skillChoice9 : "",
      skillChoice10 : "",
      skillChoice11 : "",
      skillChoice12 : "",
      skillChoice13 : "",
      skillChoice14 : "",

      skillChoice15 : "",
      skillChoice16 : "",
      skillChoice17 : "",
      skillChoice18 : "",
      skillChoice19 : "",
      skillChoice20 : "",
      ///
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
      },
      SkillsLenght: {
        U: 0,
        T: 1,
        E: 2,
        M: 3,
        L: 4,
      }
    };
  },
  head() {
    return {
      title: 'Повышение характеристик и навыков',
    };
  },
  computed: {
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

    characterAttributesClass() {
      return this.$store.getters['characters/characterAttributesClassBoost'](this.characterId);
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
    skillChoiceInitial(){
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
    settingHouserules() {
      return this.$store.getters['characters/characterSettingHouserulesById'](this.characterId);
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
    characterSkillPointsLevel: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadSkillTable(newVal);
        }
      },
      immediate: true,
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
      this.skillChoice = key;

      this.skillChoice1 = this.skillChoice[this.label(1)];
      this.skillChoice2 = this.skillChoice[this.label(2)];
      this.skillChoice3 = this.skillChoice[this.label(3)];
      this.skillChoice4 = this.skillChoice[this.label(4)];
      this.skillChoice5 = this.skillChoice[this.label(5)];
      this.skillChoice6= this.skillChoice[this.label(6)];
      this.skillChoice7 = this.skillChoice[this.label(7)];
      this.modifications = this.enhancements;

      this.skillChoice8 = this.skillChoice[this.label(8)];
      this.skillChoice9 = this.skillChoice[this.label(9)];
      this.skillChoice10= this.skillChoice[this.label(10)];
      this.skillChoice11 = this.skillChoice[this.label(11)];
      this.skillChoice12 = this.skillChoice[this.label(12)];
      this.skillChoice13 = this.skillChoice[this.label(13)];
      this.skillChoice14= this.skillChoice[this.label(14)];

      this.skillChoice15= this.skillChoice[this.label(15)];
      this.skillChoice16= this.skillChoice[this.label(16)];
      this.skillChoice17 = this.skillChoice[this.label(17)];
      this.skillChoice18= this.skillChoice[this.label(18)];
      this.skillChoice19 = this.skillChoice[this.label(19)];
      this.skillChoice120 = this.skillChoice[this.label(20)];
      this.loading = false;
    },
    skillChoiceModel(level){
      return this.skillChoice[this.label(level)];
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
      const level = this.$store.getters['characters/characterLevelById'](this.characterId);
      this.$store.commit('characters/resetCharacterStats', { id: this.characterId, optional: 'all' });
      this.$store.commit('characters/clearModification', { id: this.characterId, level });
      this.$store.commit('characters/setModification', { id: this.characterId, level });
    },
    incrementSkill(skill, level) {
      //Тест
      this.$store.commit('characters/addSkillSheet', { id: this.characterId, key: skill, level: level, type: 'skill', optional: false  });

      this.$store.commit('characters/setCharacterskillInitial', { id: this.characterId, payload: { value: 1, skill: skill } });
      var keys = Object.keys(this.SkillsTrained);
      var loc = keys.indexOf(this.characterSkills[skill]);
      const newValue = keys[loc+1];
      this.$store.commit('characters/setCharacterSkillPoints', { id: this.characterId, payload: { key: skill, value: this.characterSkillPoints - 1} });
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skill, value: newValue } });
    },
    decrementSkill(skill, level) {
      this.skillChoiceInitial.filter(item => item !== skill);
      this.$store.commit('characters/setCharacterskillInitial', { id: this.characterId, payload: { value: -1, skill: skill } });

      //Тест
      this.$store.commit('characters/removeSkillSheet', { id: this.characterId, key: skill, level: level, type: 'skill', optional: false  });

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
      const skillName = this.characterSkillPointsLevel[lab].replace(/[0-9]/g, '');
      this.$store.commit('characters/setCharacterSkill', { id: this.characterId, payload: { key: skillName, value: newValue1 } });
      this.$store.commit('characters/setCharacterSkillPointsLevel', { id: this.characterId, payload: { level: lab, value: ""} });
      }

      if(!triggerMatch)
      {
        this.$store.commit('characters/setCharacterSkillPointsLevel', { id: this.characterId, payload: { level: lab, value: skill} });
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
      const newValue = this.characterAttributes[attribute] >= 18 ? this.characterAttributes[attribute] + 1 : this.characterAttributes[attribute] + 2;

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

    },
    decrementAttribute(attribute, level) {

      const newValue = this.characterAttributes[attribute] > 18 ? this.characterAttributes[attribute] - 1 : this.characterAttributes[attribute] - 2;
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
    characterTrained(value){
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
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    characterSkillSheet(){
      return this.$store.getters['characters/characterSkillSheetById'](this.characterId);
    },
    skillSheetTrained(key, level){
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.key === key && s.level <= level) : undefined;
      return skill ? this.characterTrained(skill.length) : this.characterTrained(0);
    },
    skillSheetAll(key, level){
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.level === level) : undefined;
      return skill ? skill.length : 0;
    },
    skillSheetPoints(key, level){
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.level === level && s.type === 'skill') : undefined;
      return skill ? skill.length : 0;
    },
    skillSheetSkillLevel(key, level){
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.key === key && s.level < level) : undefined;
      return skill ? skill.length : 0;
    },
    skillSheetValue(key, level){
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.key === key && s.level === level) : undefined;
      return skill ? skill.length : 0;
    },
    skillSheetOptional(key, level){
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.find(s => s.key === key && s.level === level) : undefined;
      return skill ? skill.optional : false;
    },
        characterOptional(level) {
        const skillSheet = this.characterSkillSheet();
          const skill = skillSheet ? skillSheet.filter(s => s.level === level && s.optional === true) : undefined;
          const l = skill ? skill.length : 0;
          return l;
    },
    levelRestrict(key, level){
      const skillSheet = this.characterSkillSheet();
      const skill = skillSheet ? skillSheet.filter(s => s.key === key && s.level < level) : undefined;
      const ProfLen = skill ? skill.length : 0;

      if(skill.length === 2 &&  level < 7)
        return true;

      if(skill.length === 3 &&  level < 15)
        return true;

        if(skill.length === 4)
        return true;

        return false;
    },
    // skillSheet(key, level){
    //   const skillSheet = this.characterSkillSheet();
    //   const skill = skillSheet ? skillSheet.find(s => s.key === key && s.level === level) : undefined;
    //   return
    // },
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
      const Max = this.characterSkillPointClass + (this.characterAttributes["intellect"] - 10) / 2;
      if(Max < 0)
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
  } ,
    updateSelect(boost) {
        this.$store.commit('characters/setCharacterAncestryFreeBoost', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelect2(boost) {
        this.$store.commit('characters/setCharacterAncestryFreeBoost2', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectBackground(boost) {
        this.$store.commit('characters/setCharacterBackgroundFreeBoost', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectBackground2(boost) {
        this.$store.commit('characters/setCharacterBackgroundFreeBoost', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectClassAttribute(boost) {
        this.$store.commit('characters/setCharacterClassAttribute', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectClassSkill(boost) {
      this.$store.commit('characters/removeSkillSheetbyType', { id: this.characterId, key: boost, type: 'class', optional: false  });
        this.$store.commit('characters/setCharacterClassSkill', { id: this.characterId, payload: { key: boost, level:1, optional: true,  value: 1 } });
    },
    updateSelectBackground2(boost) {
        this.$store.commit('characters/setCharacterBackgroundFreeBoost2', { id: this.characterId, payload: { key: boost, value: 1 } });
    },
    updateSelectClassSkillLevel(boost, level) {

        this.$store.commit('characters/setCharacterClassSkillLevel', { id: this.characterId, payload: { key: boost, level: level } });
    },
    SkillPerception(){
      return this.$store.getters['characters/characterPerseptionById'](this.characterId);
    },
    SkillClass() {
      return this.$store.getters['characters/characterSkillClassById'](this.characterId);
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
    label(level){
      return "level" + level.toString();
    },
    openSkillsSettings(level){
      this.skillsEditorDialog = true;
      this.skillLevel = level;
    },
    openSkillLevel(level){
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
      const doExist = this.skills.find((s)=>s.key===skill.key);
      if ( doExist ) {
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

.sexy_line {
  display: block;
  border: none;
  color: white;
  height: 1px;
  background: black;
  background: -webkit-gradient(
    radial,
    50% 50%,
    0,
    50% 50%,
    350,
    from(#000),
    to(#fff)
  );
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

  .select-chip {
    --badge-height-xs: calc(1rem * var(--mantine-scale));
    --badge-height-sm: calc(1.125rem * var(--mantine-scale));
    --badge-height-md: calc(1.25rem * var(--mantine-scale));
    --badge-height-lg: calc(1.625rem * var(--mantine-scale));
    --badge-height-xl: calc(2rem * var(--mantine-scale));
    --badge-fz-xs: calc(0.5625rem * var(--mantine-scale));
    --badge-fz-sm: calc(0.625rem * var(--mantine-scale));
    --badge-fz-md: calc(0.6875rem * var(--mantine-scale));
    --badge-fz-lg: calc(0.8125rem * var(--mantine-scale));
    --badge-fz-xl: calc(1rem * var(--mantine-scale));
    --badge-padding-x-xs: calc(0.375rem * var(--mantine-scale));
    --badge-padding-x-sm: calc(0.5rem * var(--mantine-scale));
    --badge-padding-x-md: calc(0.625rem * var(--mantine-scale));
    --badge-padding-x-lg: calc(0.75rem * var(--mantine-scale));
    --badge-padding-x-xl: calc(1rem * var(--mantine-scale));
    --badge-height: var(--badge-height-md);
    --badge-fz: var(--badge-fz-md);
    --badge-padding-x: var(--badge-padding-x-md);
    --badge-radius: calc(62.5rem * var(--mantine-scale));
    --badge-lh: calc(
      var(--badge-height) - calc(0.125rem * var(--mantine-scale))
    );
    --badge-color: var(--mantine-color-white);
    --badge-bg: var(--mantine-primary-color-filled);
    --badge-border-width: calc(0.0625rem * var(--mantine-scale));
    --badge-bd: var(--badge-border-width) solid transparent;
    -webkit-tap-highlight-color: transparent;
    font-size: var(--badge-fz);
    border-radius: var(--badge-radius);
    height: var(--badge-height);
    line-height: var(--badge-lh);
    text-decoration: none;
    padding: 0 var(--badge-padding-x);
    display: inline-grid;
    align-items: center;
    justify-content: center;
    width: fit-content;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: calc(0.015625rem * var(--mantine-scale));
    cursor: default;
    text-overflow: ellipsis;
    overflow: hidden;
    color: var(--badge-color);
    background: var(--badge-bg);
    border: var(--badge-bd);
    background-color: blue;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    cursor: inherit;
  }
}
</style>
