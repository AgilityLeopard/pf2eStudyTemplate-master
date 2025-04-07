<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-row justify="center">
      <v-col :cols="12">
        <h1 class="headline">Выбор черт</h1>
      </v-col>

      <!-- Динамическое изменение столбцов -->
      <v-tabs centered grow color="red">
        <v-tab class="caption" key="tab-ancestry" :href="`#tab-ancestry`"
          ><h2 class="subtitle-2">Черты родословной</h2></v-tab
        >
        <v-tab class="caption" key="tab-class" :href="`#tab-class`"
          ><h2 class="subtitle-2">Черты класса</h2></v-tab
        >
        <v-tab class="caption" key="tab-skill" :href="`#tab-skill`"
          ><h2 class="subtitle-2">Черты Навыков</h2></v-tab
        >
        <v-tab class="caption" key="tab-general" :href="`#tab-general`"
          ><h2 class="subtitle-2">Черты общие</h2></v-tab
        >
        <v-tab class="caption" key="tab-additional" :href="`#tab-additional`"
          ><h2 class="subtitle-2">Черты дополнительные</h2></v-tab
        >

        <!-- Черты родословной -->
        <v-tab-item
          class="my-tab-item"
          key="tab-ancestry"
          :value="`tab-ancestry`"
        >
          <v-expansion-panels multiple>
            <v-expansion-panel
              v-for="levelAncestry in 20"
              :key="levelAncestry"
              v-if="
                levelAncestry <= characterLevel() &&
                (levelAncestry == 1 || (levelAncestry - 1) % 4 == 0)
              "
            >
              <v-expansion-panel-header
                >{{ levelAncestry }} уровень
                <v-col :cols="4" :sm="2">
                  <v-btn
                    color="error"
                    align="right"
                    x-small
                    v-if="characterAncestryTalent(levelAncestry)"
                    @click.stop.prevent="
                      removeTalent(characterAncestryTalent(levelAncestry))
                    "
                    >Удалить</v-btn
                  >
                </v-col>
              </v-expansion-panel-header>

              <v-expansion-panel-content :key="levelAncestry">
                <v-btn
                  @click="updatePreview(levelAncestry, 'ancestry')"
                  v-if="!characterAncestryTalent(levelAncestry)"
                >
                  Выберите черту {{ levelAncestry }}
                </v-btn>

                <div v-if="characterAncestryTalent(levelAncestry)">
                  <v-row class="rowFeat">
                    <div class="head">
                      <h1>
                        {{ characterAncestryTalent(levelAncestry).label }}
                      </h1>
                    </div>
                    <div class="line"></div>
                    <div class="tag">
                      Черта {{ characterAncestryTalent(levelAncestry).level }}
                    </div>
                  </v-row>
                  <v-row>
                    <div>
                      <trait-view
                        v-if="characterAncestryTalent(levelAncestry).traits"
                        :item="characterAncestryTalent(levelAncestry)"
                        class="mb-2"
                      />
                    </div>
                  </v-row>
                  <div
                    v-if="characterAncestryTalent(levelAncestry).requirements"
                  >
                    <p class="main-holder">
                      {{
                        characterAncestryTalent(levelAncestry).requirements.key
                      }}
                    </p>
                  </div>
                  <p></p>
                  <div
                    class="pt-4 pb-2"
                    v-html="characterAncestryTalent(levelAncestry).description"
                  ></div>
                  <p></p>
                  <div v-if="characterAncestryTalent(levelAncestry).options">
                    <v-select
                      :value="characterAncestryTalent(levelAncestry).selected"
                      :items="characterAncestryTalent(levelAncestry).options"
                      item-text="name"
                      item-value="key"
                      :placeholder="
                        characterAncestryTalent(levelAncestry)
                          .optionsPlaceholder
                      "
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
                  <!-- <v-row no-gutters>
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
                  </v-row> -->
                </div>
                <!-- <v-expansion-panels
                  multiple
                  v-if="characterAncestryTalent(levelAncestry)"
                >
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <template v-slot:default="{ open }">
                       
                      </template>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                      <div
                        class="body-2 mb-2"
                        v-html="
                          characterAncestryTalent(levelAncestry).description
                        "
                      ></div>

                      <div
                        v-if="characterAncestryTalent(levelAncestry).options"
                      >
                        <v-select
                          v-if="
                            characterAncestryTalent(levelAncestry)
                              .optionsKey === 'skill'
                          "
                          :value="
                            characterAncestryTalent(levelAncestry).selected
                          "
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
                </v-expansion-panels> -->
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-tab-item>

        <!-- Черты класса -->
        <v-tab-item class="my-tab-item" key="tab-class" :value="`tab-class`">
          <!-- <v-col :cols="8" :sm="10" class="subtitle-1"> Черты Класса </v-col> -->
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

          <v-col v-else="archetype">
            <v-expansion-panels multiple>
              <v-expansion-panel
                v-for="levelAncestry in 20"
                :key="levelAncestry"
                v-if="
                  levelAncestry <= characterLevel() &&
                  (levelAncestry === 2 ||
                    levelAncestry % 2 === 0 ||
                    (archetype.isFeatLevelOne && levelAncestry === 1))
                "
              >
                <v-expansion-panel-header
                  >{{ levelAncestry }} уровень
                  <v-col :cols="4" :sm="2">
                    <v-btn
                      color="error"
                      align="right"
                      x-small
                      v-if="characterClassTalent(levelAncestry)"
                      @click.stop.prevent="
                        removeTalent(characterClassTalent(levelAncestry))
                      "
                      >Удалить</v-btn
                    >
                  </v-col>
                </v-expansion-panel-header>

                <v-expansion-panel-content :key="levelAncestry">
                  <v-btn
                    @click="updatePreview(levelAncestry, 'class')"
                    v-if="!characterClassTalent(levelAncestry)"
                  >
                    Выберите черту {{ levelAncestry }}
                  </v-btn>

                  <div v-if="characterClassTalent(levelAncestry)">
                    <v-row class="rowFeat">
                      <div class="head">
                        <h1>
                          {{ characterClassTalent(levelAncestry).label }}
                        </h1>
                      </div>
                      <div class="line"></div>
                      <div class="tag">
                        Черта {{ characterClassTalent(levelAncestry).level }}
                      </div>
                    </v-row>
                    <v-row>
                      <div>
                        <trait-view
                          v-if="characterClassTalent(levelAncestry).traits"
                          :item="characterClassTalent(levelAncestry)"
                          class="mb-2"
                        />
                      </div>
                    </v-row>
                    <div
                      v-if="characterClassTalent(levelAncestry).requirements"
                    >
                      <p class="main-holder">
                        {{
                          characterClassTalent(levelAncestry).requirements.key
                        }}
                      </p>
                    </div>
                    <p></p>
                    <div
                      class="pt-4 pb-2"
                      v-html="characterClassTalent(levelAncestry).description"
                    ></div>
                    <p></p>
                    <div v-if="characterClassTalent(levelAncestry).options">
                      <v-select
                        :value="characterClassTalent(levelAncestry).selected"
                        :items="characterClassTalent(levelAncestry).options"
                        item-text="name"
                        item-value="key"
                        :placeholder="
                          characterClassTalent(levelAncestry).optionsPlaceholder
                        "
                        filled
                        dense
                        @input="
                          talentUpdateSelected(
                            item,
                            characterClassTalent(levelAncestry),
                            levelAncestry
                          )
                        "
                      />
                    </div>
                    <!-- <v-row no-gutters>
                    <v-col :cols="8" :sm="10" class="subtitle-1">
                      <span />
                    </v-col>
                    <v-col :cols="8" :sm="10" class="subtitle-2">
                      <span
                        v-html="characterClassTalent(levelAncestry).label"
                      />
                    </v-col>
                    <v-col :cols="4" :sm="2">
                      <v-btn
                        color="error"
                        x-small
                        @click.stop.prevent="
                          removeTalent(characterClassTalent(levelAncestry))
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
                      {{ characterClassTalent(levelAncestry).snippet }}
                    </v-col>
                  </v-row> -->
                  </div>
                  <!-- <v-expansion-panels
                  multiple
                  v-if="characterClassTalent(levelAncestry)"
                >
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <template v-slot:default="{ open }">
                       
                      </template>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                      <div
                        class="body-2 mb-2"
                        v-html="
                          characterClassTalent(levelAncestry).description
                        "
                      ></div>

                      <div
                        v-if="characterClassTalent(levelAncestry).options"
                      >
                        <v-select
                          v-if="
                            characterClassTalent(levelAncestry)
                              .optionsKey === 'skill'
                          "
                          :value="
                            characterClassTalent(levelAncestry).selected
                          "
                          :items="skillRepository"
                          item-text="name"
                          item-value="key"
                          placeholder="Выберите навык"
                          filled
                          dense
                          @input="
                            talentUpdateSelected(
                              item,
                              characterClassTalent(levelAncestry),
                              levelAncestry
                            )
                          "
                        />
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels> -->
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-tab-item>

        <!-- Черты навыков -->
        <v-tab-item class="my-tab-item" key="tab-skill" :value="`tab-skill`">
          <v-expansion-panels multiple>
            <v-expansion-panel
              v-for="levelAncestry in 20"
              :key="levelAncestry"
              v-if="
                levelAncestry <= characterLevel() &&
                (levelAncestry == 2 || levelAncestry % 2 == 0)
              "
            >
              <v-expansion-panel-header
                >{{ levelAncestry }} уровень
                <v-col :cols="4" :sm="2">
                  <v-btn
                    color="error"
                    align="right"
                    x-small
                    v-if="characterSkillTalent(levelAncestry)"
                    @click.stop.prevent="
                      removeTalent(characterSkillTalent(levelAncestry))
                    "
                    >Удалить</v-btn
                  >
                </v-col>
              </v-expansion-panel-header>

              <v-expansion-panel-content :key="levelAncestry">
                <v-btn
                  @click="updatePreview(levelAncestry, 'skill')"
                  v-if="!characterSkillTalent(levelAncestry)"
                >
                  Выберите черту {{ levelAncestry }}
                </v-btn>

                <div v-if="characterSkillTalent(levelAncestry)">
                  <v-row class="rowFeat">
                    <div class="head">
                      <h1>
                        {{ characterSkillTalent(levelAncestry).label }}
                      </h1>
                    </div>
                    <div class="line"></div>
                    <div class="tag">
                      Черта {{ characterSkillTalent(levelAncestry).level }}
                    </div>
                  </v-row>
                  <v-row>
                    <div>
                      <trait-view
                        v-if="characterSkillTalent(levelAncestry).traits"
                        :item="characterSkillTalent(levelAncestry)"
                        class="mb-2"
                      />
                    </div>
                  </v-row>
                  <div v-if="characterSkillTalent(levelAncestry).requirements">
                    <p class="main-holder">
                      {{ characterSkillTalent(levelAncestry).requirements.key }}
                    </p>
                  </div>
                  <p></p>
                  <div
                    class="pt-4 pb-2"
                    v-html="characterSkillTalent(levelAncestry).description"
                  ></div>
                  <p></p>
                  <div v-if="characterSkillTalent(levelAncestry).options">
                    <v-select
                      :value="characterSkillTalent(levelAncestry).selected"
                      :items="characterSkillTalent(levelAncestry).options"
                      item-text="name"
                      item-value="key"
                      :placeholder="
                        characterSkillTalent(levelAncestry).optionsPlaceholder
                      "
                      filled
                      dense
                      @input="
                        talentUpdateSelected(
                          item,
                          characterSkillTalent(levelAncestry),
                          levelAncestry
                        )
                      "
                    />
                  </div>
                  <!-- <v-row no-gutters>
                    <v-col :cols="8" :sm="10" class="subtitle-1">
                      <span />
                    </v-col>
                    <v-col :cols="8" :sm="10" class="subtitle-2">
                      <span
                        v-html="characterSkillTalent(levelAncestry).label"
                      />
                    </v-col>
                    <v-col :cols="4" :sm="2">
                      <v-btn
                        color="error"
                        x-small
                        @click.stop.prevent="
                          removeTalent(characterSkillTalent(levelAncestry))
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
                      {{ characterSkillTalent(levelAncestry).snippet }}
                    </v-col>
                  </v-row> -->
                </div>
                <!-- <v-expansion-panels
                  multiple
                  v-if="characterSkillTalent(levelAncestry)"
                >
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      <template v-slot:default="{ open }">
                       
                      </template>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                      <div
                        class="body-2 mb-2"
                        v-html="
                          characterSkillTalent(levelAncestry).description
                        "
                      ></div>

                      <div
                        v-if="characterSkillTalent(levelAncestry).options"
                      >
                        <v-select
                          v-if="
                            characterSkillTalent(levelAncestry)
                              .optionsKey === 'skill'
                          "
                          :value="
                            characterSkillTalent(levelAncestry).selected
                          "
                          :items="skillRepository"
                          item-text="name"
                          item-value="key"
                          placeholder="Выберите навык"
                          filled
                          dense
                          @input="
                            talentUpdateSelected(
                              item,
                              characterSkillTalent(levelAncestry),
                              levelAncestry
                            )
                          "
                        />
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels> -->
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-tab-item>

        <v-tab-item
          class="my-tab-item"
          key="tab-general"
          :value="`tab-general`"
        >
          <!-- <v-col :cols="8" :sm="10" class="subtitle-1"> Черты Общие </v-col> -->

          <v-expansion-panels multiple>
            <v-expansion-panel
              v-for="levelAncestry in 20"
              :key="levelAncestry"
              v-if="
                levelAncestry <= characterLevel() &&
                (levelAncestry == 3 || (levelAncestry + 1) % 4 == 0)
              "
            >
              <v-expansion-panel-header
                >{{ levelAncestry }} уровень</v-expansion-panel-header
              >
              <v-expansion-panel-content :key="levelAncestry">
                <v-dialog
                  v-model="talentsDialogGeneral"
                  :fullscreen="$vuetify.breakpoint.xsOnly"
                  width="600px"
                  scrollable
                >
                  <talents-preview
                    :character-id="characterId"
                    :talents="selectedTalentsGeneral"
                    :level="levelAncestry"
                    :list="talentList"
                    type="general"
                    choose-mode
                    @cancel="talentsDialogGeneral = false"
                  />
                </v-dialog>

                <v-btn
                  @click="updatePreview(levelAncestry, 'general')"
                  v-if="!characterGeneralTalent(levelAncestry)"
                >
                  Выберите черту {{ levelAncestry }}
                </v-btn>

                <v-expansion-panels
                  multiple
                  v-if="characterGeneralTalent(levelAncestry)"
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
                                characterGeneralTalent(levelAncestry).label
                              "
                            />
                          </v-col>
                          <v-col :cols="4" :sm="2">
                            <v-btn
                              color="error"
                              x-small
                              @click.stop.prevent="
                                removeTalent(
                                  characterGeneralTalent(levelAncestry)
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
                            {{ characterGeneralTalent(levelAncestry).snippet }}
                          </v-col>
                        </v-row>
                      </template>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                      <div
                        class="body-2 mb-2"
                        v-html="
                          characterGeneralTalent(levelAncestry).description
                        "
                      ></div>

                      <v-alert
                        v-if="characterGeneralTalent(levelAncestry).alert"
                        :type="characterGeneralTalent(levelAncestry).alert.type"
                        dense
                        text
                        >{{
                          characterGeneralTalent(levelAncestry).alert.text
                        }}</v-alert
                      >

                      <div v-if="characterGeneralTalent(levelAncestry).options">
                        <v-select
                          :value="
                            characterGeneralTalent(levelAncestry).selected
                          "
                          :items="characterGeneralTalent(levelAncestry).options"
                          item-text="name"
                          item-value="key"
                          :placeholder="
                            characterGeneralTalent(levelAncestry)
                              .optionsPlaceholder
                          "
                          filled
                          dense
                          @input="
                            talentUpdateSelected(
                              item,
                              characterGeneralTalent(levelAncestry),
                              levelAncestry
                            )
                          "
                        />
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-tab-item>
        <!-- Доп черты это те, что получены не выбором (например, доп знание от черт наследия) -->

        <v-tab-item
          class="my-tab-item"
          key="tab-additional"
          :value="`tab-additional`"
        >
          <!-- <v-col
          v-if="FreeTalentsLength() !== 0"
          :cols="8"
          :sm="10"
          class="subtitle-1"
        >
          Дополнительные черты
        </v-col> -->

          <v-expansion-panels multiple>
            <v-expansion-panel
              v-if="FreeTalentsLength() !== 0"
              v-for="levelAncestry in FreeTalentsLength()"
              :key="levelAncestry"
            >
              <v-expansion-panel-header
                >Черта {{ levelAncestry }}</v-expansion-panel-header
              >
              <v-expansion-panel-content :key="levelAncestry">
                <v-expansion-panels
                  multiple
                  v-if="characteFreeTalent(levelAncestry)"
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
                              v-html="characteFreeTalent(levelAncestry).label"
                            />
                          </v-col>
                          <!-- <v-col :cols="4" :sm="2">
                    <v-btn color="error" x-small @click.stop.prevent="removeTalent(characteFreeTalent(levelAncestry))">Удалить</v-btn>
                  </v-col> -->
                          <v-col
                            v-if="!open"
                            :cols="8"
                            :sm="10"
                            class="caption grey--text"
                          >
                            {{ characteFreeTalent(levelAncestry).snippet }}
                          </v-col>
                        </v-row>
                      </template>
                    </v-expansion-panel-header>

                    <v-expansion-panel-content>
                      <div
                        class="body-2 mb-2"
                        v-html="characteFreeTalent(levelAncestry).description"
                      ></div>

                      <v-alert
                        v-if="characteFreeTalent(levelAncestry).alert"
                        :type="characteFreeTalent(levelAncestry).alert.type"
                        dense
                        text
                        >{{
                          characteFreeTalent(levelAncestry).alert.text
                        }}</v-alert
                      >

                      <div v-if="characteFreeTalent(levelAncestry).options">
                        <v-select
                          :value="characteFreeTalent(levelAncestry).selected"
                          :items="characteFreeTalent(levelAncestry).options"
                          item-text="name"
                          item-value="key"
                          :placeholder="
                            characteFreeTalent(levelAncestry).optionsPlaceholder
                          "
                          filled
                          dense
                          @input="
                            talentUpdateSelected(
                              item,
                              characteFreeTalent(levelAncestry),
                              levelAncestry
                            )
                          "
                        />
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-tab-item>
        <!-- Открытие диалогов выбора черт -->
        <!-- Класс -->
        <v-dialog
          v-model="talentsDialogClass"
          :fullscreen="$vuetify.breakpoint.xsOnly"
          width="800px"
          scrollable
        >
          <talents-preview
            :character-id="characterId"
            :talents="selectedTalentsClass"
            :level="levelTalent"
            :list="talentList"
            type="class"
            choose-mode
            @cancel="talentsDialogClass = false"
          />
        </v-dialog>

        <!-- Наследие -->
        <v-dialog
          v-model="talentsDialog"
          :fullscreen="$vuetify.breakpoint.xsOnly"
          width="800px"
          scrollable
        >
          <talents-preview
            :character-id="characterId"
            :talents="selectedTalentsAncestry"
            :level="levelTalent"
            :list="talentList"
            type="ancestry"
            choose-mode
            @cancel="talentsDialog = false"
          />
        </v-dialog>

        <!-- Навыки -->
        <v-dialog
          v-model="talentsDialogSkill"
          :fullscreen="$vuetify.breakpoint.xsOnly"
          width="800px"
          scrollable
        >
          <talents-preview
            :character-id="characterId"
            :talents="selectedTalentsSkill"
            :list="talentList"
            :level="levelTalent"
            type="skill"
            choose-mode
            @cancel="talentsDialogSkill = false"
          />
        </v-dialog>
      </v-tabs>
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
import traitView from '~/components/TraitView';

export default {
  name: 'Talents',
  layout: 'forge',

  components: {
    WargearSelect,
    IssueList,
    TalentsPreview,
    traitView
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
      selectedTalentsGeneral: undefined,
      talentsDialog: false,
      talentsDialogClass: false,
      talentsDialogSkill: false,
      talentsDialogGeneral: false,
      levelAncestry: 0,
      levelSkill: 0,
      levelClass: 0,
      levelGeneral : 0,
      searchQuery: '',
      modifications :[],
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
      archetype: undefined,
      talentList: undefined,
      traitList: undefined,
      levelTalent: undefined,
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
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    searchResult() {
      if (this.talentList === undefined) {
        return [];
      }
      let searchResult = this.talentList;

      if (this.selectedTagsFilters.length > 0) {
        searchResult = searchResult.filter((item) => this.selectedTagsFilters.some((m) => item.traits.includes(m)));
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
      const lowercaseKeywords = filteredTalents.map(s => s.traits.toUpperCase());

      filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.includes(talent.traits.toString().toUpperCase()));
      let reduced = [];
      filteredTalents.forEach((item) => {
        if (item.traits) {
          reduced.push(...item.traits);
        }
      });
      reduced = reduced.filter(item => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((tag) => ({ name: tag }));
    },

    sources() {
      return [
        'playerCore',
        'playerCore2',
        ...this.settingHomebrews,
      ];
    },
    enhancements() {
      return this.$store.getters["characters/characterEnhancementsById"](
        this.characterId
      );
    },
    remainingBuildPoints() {
      return this.$store.getters['characters/characterRemainingBuildPointsById'](this.characterId);
    },
    TalentsLabel() {
      return this.$store.getters['characters/characterTalentsLabelById'](this.characterId);
    },
    finalSkillRepository() {
      return [
        ...this.skillRepository,
      ];
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
    filteredTalents() {
      if (this.talentList === undefined) {
        return [];
      }

      let filteredTalents = this.talentList;

      if (this.selectedTagsFilters.length > 0) {
        filteredTalents = filteredTalents.filter((item) => this.selectedTagsFilters.some((m) => item.traits.includes(m)));
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
      filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.includes(talent.traits.toString().toUpperCase()));
      return filteredTalents;
    },
    talentHatredKeywordOptions() {
      return this.keywordRepository.filter((k) => k.placeholder === undefined && k.name.indexOf('<') !== 0);
    },
    selectableKeywordOptions() {
      return this.keywordRepository.filter((k) => k.name.indexOf('[') !== 0);
    },
  },
  watch: {
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getTraitList(newVal);
          this.getTalents(newVal);
          this.getAbility(newVal);
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
    //Вывод окна для выбора черт
     updatePreview(levelAncestry, type) {

      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);
      const archetype = this.archetype;

      const list = this.talentList.filter(s => s.type === type);
      list.forEach(t => {
        const tal = t;
        tal.place = type + levelAncestry;
        tal.placeLevel = levelAncestry;
        tal.trait = tal.traits;
        tal.isVal = false;

        let isVal = false;
        const Rest = {
          "U": 0,
          "T": 1,
          "E": 2,
          "M": 3,
          "L": 4,
        }

      if (tal.prerequisitesKey) {
        const skillList = this.characterSkillSheet();
        const attList = this.characterAttributes();
        const level = this.characterLevel();

        if (tal.prerequisitesKey.skill)
        {
          const skill = tal.prerequisitesKey.skill;
          const prof = skillList.filter(s => s.key === skill.key && s.level <= level).length;
          tal.isVal = Rest[skill.value] <= prof ? false : true;

        }
        if (tal.prerequisitesKey.ability)
        {
          const ability = tal.prerequisitesKey.ability;
          const score = (attList[ability.key] - 10) / 2;
          tal.isVal = ability.value <= score ? false : true;
        }
        if (tal.prerequisitesKey.feat)
        {
          isVal =  true;
          if(tal.prerequisitesKey.feat.value)
          {
            if(tal.prerequisitesKey.feat.value === "OR")
             {
              const lowercaseKeywords = tal.prerequisitesKey.feat.key;
          const isFeat = characterTalents.find(t => lowercaseKeywords.includes(t.nameEng));
          if (isFeat === undefined )
            tal.isVal =  true;
          }
          if(tal.prerequisitesKey.feat.value === "AND")
             {
              const lowercaseKeywords = tal.prerequisitesKey.feat.key.split(',');
              const isFeat = characterTalents.filter(t => t.nameEng === lowercaseKeywords.find(s => s === t.nameEng));
              if (isFeat === undefined )
                tal.isVal =  true;
              }
              if (isFeat.length === lowercaseKeywords.length )
                tal.isVal =  true;
              }


          else
          {
          const isFeat = characterTalents.find(t => t.nameEng === tal.prerequisitesKey.feat.key);
          if (isFeat === undefined )
            tal.isVal =  true;
          }
        }
        if (tal.prerequisitesKey.features)
        {
          isVal =  true;
          const isFeat = archetype.find(t => t === tal.prerequisitesKey.features.key);
          if (isFeat === undefined )
            tal.isVal =  true;
        }

      }

      // tal.isVal = isVal;

      })

      this.levelTalent = levelAncestry;
      switch (type) {
        case "ancestry":
          this.talentsDialog = true;
          this.selectedTalentsAncestry = list;
          break;
         case "class":
          this.talentsDialogClass = true;
          this.selectedTalentsClass  = list;
          break;
         case "skill":
          this.talentsDialogSkill = true;
          this.selectedTalentsSkill  = list;
          break;
        case "general":
          this.talentsDialogGeneral = true;
          this.selectedTalentsGeneral  = list;
          break;

        }

    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterSkillSheet(){
      return this.$store.getters['characters/characterSkillSheetById'](this.characterId);
      },
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    //АПИ по чертам
    async getTalents(sources) {
      this.loading = true;
      const config = {
        params: {
          source: sources.join(","),
        },
      };

        const { data } = await this.$axios.get('/api/talents/',  config.source);
        const talents = data.map(talent => {


          return {
            ...talent
          }
        });
       if (this.traitList !== undefined) {
        talents.forEach((species) => {
          const lowercaseKeywords = species.traits.split(',').map((s) =>
            s.trim().toUpperCase()
          );

        species.traits = species.traits.split(',').map((s) =>
            s.trim()
          );

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
      this.talentList = talents;
      this.modifications = this.enhancements;
      this.loading = false;
    },
    async getAbility(sources) {
      this.loading = true;
      const config = {
        params: { source: this.sources.join(','), },
      };

        const { data } = await this.$axios.get('/api/abilityAncestry/', config);
        this.abilityList = data.map(talent => {

          return {
            ...talent
          }
        });


      this.loading = false;
    },
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
      data.forEach(t => t.key = t.key.toLowerCase());
      this.traitList = data;
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

        aggregatedTalent.trait = talent.traits;
        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        aggregatedTalent.level = talent.level;
        // for each special talent, check respectively
        if (talent.options) {
          aggregatedTalent.selected = talent.selected;
          if (aggregatedTalent.optionsKey === 'skill')
            aggregatedTalent.options = this.finalSkillRepository;

        }

        // Fetch gear for selected weapon trooper

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


        aggregatedTalent.id = talent.id;
        aggregatedTalent.trait = talent.traits;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        // for each special talent, check respectively
        if (talent.options) {
          aggregatedTalent.selected = talent.selected;
          if (aggregatedTalent.choice === 'skill')
            aggregatedTalent.options = this.finalSkillRepository;
          // aggregatedTalent.extraCost = 0;
          // if (talent.extraCost && typeof talent.extraCost === 'object') {
          //   Object.keys(talent.extraCost).forEach((extraCostKey) => {
          //     aggregatedTalent.extraCost  += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
          //   });
          // } else {
          //   aggregatedTalent.extraCost += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
          // }
          // if (aggregatedTalent.options) {
          //   const replacementTargetString = aggregatedTalent.options.find((t) => t.key === talent.selected).name;
          //   aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${replacementTargetString})</em>`);
          //   console.info(`[${talent.id}] Compute label ${aggregatedTalent.label} from ${talent.selected}/${replacementTargetString}`);
          // } else {
          //   aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${talent.selected})</em>`);
          // }
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

          aggregatedTalent.wargear.forEach((g, i, warArray) => {
            const sourceKey = `talent.${aggregatedTalent.id}.${g.key}`;

            const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
            if (charGear && charGear.length > 0 && this.wargearList) {

              const wargear = this.wargearList.find((g) => g.name === charGear[0].name);

              g.selected = wargear.name;


            }
          });

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


        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        // for each special talent, check respectively
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;

          // aggregatedTalent.extraCost = 0;
          // if (talent.extraCost && typeof talent.extraCost === 'object') {
          //   Object.keys(talent.extraCost).forEach((extraCostKey) => {
          //     aggregatedTalent.extraCost  += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
          //   });
          // } else {
          //   aggregatedTalent.extraCost += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
          // }
          // if (aggregatedTalent.options) {
          //   const replacementTargetString = aggregatedTalent.options.find((t) => t.key === talent.selected).name;
          //   aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${replacementTargetString})</em>`);
          //   console.info(`[${talent.id}] Compute label ${aggregatedTalent.label} from ${talent.selected}/${replacementTargetString}`);
          // } else {
          //   aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${talent.selected})</em>`);
          // }
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


        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        aggregatedTalent.level = talent.level;
        aggregatedTalent.trait = talent.traits;
        // for each special talent, check respectively
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;
          // aggregatedTalent.extraCost = 0;
          // if (talent.extraCost && typeof talent.extraCost === 'object') {
          //   Object.keys(talent.extraCost).forEach((extraCostKey) => {
          //     aggregatedTalent.extraCost  += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
          //   });
          // } else {
          //   aggregatedTalent.extraCost += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
          // }
          // if (aggregatedTalent.options) {
          //   const replacementTargetString = aggregatedTalent.options.find((t) => t.key === talent.selected).name;
          //   aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${replacementTargetString})</em>`);
          //   console.info(`[${talent.id}] Compute label ${aggregatedTalent.label} from ${talent.selected}/${replacementTargetString}`);
          // } else {
          //   aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${talent.selected})</em>`);
          // }
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

          aggregatedTalent.wargear.forEach((g, i, warArray) => {
            const sourceKey = `talent.${aggregatedTalent.id}.${g.key}`;

            const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
            if (charGear && charGear.length > 0 && this.wargearList) {

              const wargear = this.wargearList.find((g) => g.name === charGear[0].name);

              g.selected = wargear.name;


            }
          });

        }

        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));


      //console.warn(talents.map((t) => t.wargear[0].selected).join('-'));
      return talents.find(s => s.place === 'class'+level);



    },
    characterGeneralTalent(level)
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


        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        // for each special talent, check respectively
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;
          // aggregatedTalent.extraCost = 0;
          // if (talent.extraCost && typeof talent.extraCost === 'object') {
          //   Object.keys(talent.extraCost).forEach((extraCostKey) => {
          //     aggregatedTalent.extraCost  += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
          //   });
          // } else {
          //   aggregatedTalent.extraCost += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
          // }
          // if (aggregatedTalent.options) {
          //   const replacementTargetString = aggregatedTalent.options.find((t) => t.key === talent.selected).name;
          //   aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${replacementTargetString})</em>`);
          //   console.info(`[${talent.id}] Compute label ${aggregatedTalent.label} from ${talent.selected}/${replacementTargetString}`);
          // } else {
          //   aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${talent.selected})</em>`);
          // }
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

          aggregatedTalent.wargear.forEach((g, i, warArray) => {
            const sourceKey = `talent.${aggregatedTalent.id}.${g.key}`;

            const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
            if (charGear && charGear.length > 0 && this.wargearList) {

              const wargear = this.wargearList.find((g) => g.name === charGear[0].name);

              g.selected = wargear.name;


            }
          });

        }

        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));


      //console.warn(talents.map((t) => t.wargear[0].selected).join('-'));
      return talents.find(s => s.place === 'general'+level);



    },
    characteFreeTalent(level)
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


        aggregatedTalent.id = talent.id;
        aggregatedTalent.cost = talent.cost;
        aggregatedTalent.label = aggregatedTalent.name;
        aggregatedTalent.place = talent.place;
        // for each special talent, check respectively
        if (talent.selected) {
          aggregatedTalent.selected = talent.selected;
          // aggregatedTalent.extraCost = 0;
          // if (talent.extraCost && typeof talent.extraCost === 'object') {
          //   Object.keys(talent.extraCost).forEach((extraCostKey) => {
          //     aggregatedTalent.extraCost  += talent.extraCost[extraCostKey] ? talent.extraCost[extraCostKey] : 0;
          //   });
          // } else {
          //   aggregatedTalent.extraCost += talent.extraCost && parseInt(talent.extraCost) ? talent.extraCost : 0;
          // }
          // if (aggregatedTalent.options) {
          //   const replacementTargetString = aggregatedTalent.options.find((t) => t.key === talent.selected).name;
          //   aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${replacementTargetString})</em>`);
          //   console.info(`[${talent.id}] Compute label ${aggregatedTalent.label} from ${talent.selected}/${replacementTargetString}`);
          // } else {
          //   aggregatedTalent.label = aggregatedTalent.name.replace(/(\[.*\])/, `<em>(${talent.selected})</em>`);
          // }
        }

        // Fetch gear for selected weapon trooper
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

        // Fetch gear for selected augmetis
        if (aggregatedTalent.key.startsWith('core-augmetic')) {

          aggregatedTalent.wargear.forEach((g, i, warArray) => {
            const sourceKey = `talent.${aggregatedTalent.id}.${g.key}`;

            const charGear = this.characterWargear.filter((gear) => gear.source && gear.source.startsWith(sourceKey));
            if (charGear && charGear.length > 0 && this.wargearList) {

              const wargear = this.wargearList.find((g) => g.name === charGear[0].name);

              g.selected = wargear.name;


            }
          });

        }

        return aggregatedTalent;
      }).sort((a, b) => a.id.localeCompare(b.id));
      return talents.find(s => s.place === 'free'+level);

    },
    FreeTalentsLength(){
      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);
      const length = characterTalents.filter(s => s.place.includes("free")).length ;
      return length < 1 ? 0 : length;
    },
    removeTalent(talent) {
      const id = this.characterId;
      const source = `talent.${talent.id}`;
      const level = this.characterLevel();
      this.$store.commit('characters/clearModification', { id: this.characterId, level });
      this.$store.commit('characters/removeModification', { id: this.characterId,   talentId: talent.id });
      this.$store.commit('characters/removeCharacterTalent', { id, talentId: talent.id });
      this.$store.commit('characters/setModification', { id: this.characterId, level });
    },
    /** Special Talent Selections */
    talentUpdateSelected(selectedValue, talent, level) {
      const id = this.characterId;
      const talentPayload = {
        id: talent.id,
        key: talent.key,
        name: talent.name,
        choice: talent.optionsKey,
        selected: selectedValue,
      };


      const mod =   [{
                      type: 'Skill',
                      mode: 'Upgrade',
                      key: selectedValue,
                      optionsSelect: true,

                      // option: ['all'],
                      value: "T",
                      // name: item.value,
                      // value: this.textToCamel(item.value),
                      // isValueModify : false,
                      // LoreSkill : LoreSkill,
      }]

      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content: { item: talent, level: level, modifications: mod, talentId: talent.id, optionsSelect: true, source: talent.place } });
      this.$store.commit('characters/clearModification', { id: this.characterId, level });
      this.$store.commit('characters/setModification', { id: this.characterId, level });
      this.$store.commit('characters/setCharacterTalentSelected', { id, talent: talentPayload });
    },
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
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
</style>
