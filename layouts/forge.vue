<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer.open"
      app
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      width="320"
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> Максимальные хиты </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action class="hidden-xs-only">
            <v-chip pill color="green" text-color="white">
              {{ characterHitPointsMax() }}
            </v-chip>
          </v-list-item-action>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> Класс доспехов </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action class="hidden-xs-only">
            <v-chip pill color="green" text-color="white">
              {{ characterArmor() }}
            </v-chip>
          </v-list-item-action>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> Скорость: </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action class="hidden-xs-only">
            {{ сharacterSpeedLabel() }}
          </v-list-item-action>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> Внимательность </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action class="hidden-xs-only">
            <v-chip pill color="green" text-color="white">
              <v-avatar left class="green darken-4">
                {{
                  ModAttributePerception(Perception.attribute, Perception.key)
                }}
              </v-avatar>
            </v-chip>
          </v-list-item-action>
          <v-list-item-action class="hidden-xs-only">
            <v-chip pill color="red" text-color="white">
              <v-avatar left class="red darken-4">
                {{ characterlabel(characterPerseption) }}
              </v-avatar>
            </v-chip>
          </v-list-item-action>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> Сложность класса </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action class="hidden-xs-only">
            <v-chip pill color="green" text-color="white">
              <v-avatar left class="green darken-4">
                {{ ModAttributeClass() }}
              </v-avatar>
            </v-chip>
          </v-list-item-action>
          <v-list-item-action class="hidden-xs-only">
            <v-chip pill color="red" text-color="white">
              <v-avatar left class="red darken-4">
                {{ characterlabel(characterSkillClass) }}
              </v-avatar>
            </v-chip>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-expansion-panels multiple>
        <!-- Характеристики -->
        <v-expansion-panel>
          <v-expansion-panel-header class="pa-4 pt-2 pb-2">
            Характеристики
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="group">
              <div class="attr" v-for="attribute in attributeRepository">
                <p>{{ attribute.short }}</p>
                <p>{{ (characterAttributes[attribute.key] - 10) / 2 }}</p>
              </div>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header class="pa-4 pt-2 pb-2">
            Навыки
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item
                v-for="skill in finalSkillRepository"
                :key="skill.key"
                two-line
                @click="openSkills(skill)"
                :style="{ backgroundColor: getSkillRankColor(skill.key) }"
                class="skill-item"
              >
                <v-list-item-content class="skill-row">
                  <v-list-item-title class="skill-label">
                    {{ skill.name }}
                    <!-- <v-chip
                      v-if="getSkillRank(skill.key) > 0"
                      x-small
                      label
                      class="ml-1"
                      :color="getRankChipColor(skill.key)"
                      dark
                    >
                      {{ getSkillRankName(skill.key) }}
                    </v-chip> -->
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action class="hidden-xs-only">
                  <v-chip
                    pill
                    :color="getRankChipColor(skill.key)"
                    dark
                    class="ml-2"
                  >
                    {{ ModAttribute(skill.attribute, skill.key) }}
                  </v-chip>
                </v-list-item-action>
                <v-list-item-action class="hidden-xs-only">
                  <v-chip
                    small
                    :color="getRankChipColor(skill.key)"
                    dark
                    class="ml-2"
                  >
                    {{ SkillLabel(skill.key) }}
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <!-- <div class="group_rec">
          <div   v-for="skill in finalSkillRepository">
         

                <v-btn class = "group_skill" style="width: 100%" @click="openSkills(skill)">
                  
                  <div>{{ skill.name }}</div> <div> {{ModAttribute(skill.attribute, skill.key)}}</div> <div>  {{characterSkills[skill.key] }}</div>

                </v-btn> 

        </div> 
      </div>-->
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header class="pa-4 pt-2 pb-2">
            Спасброски
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item
                v-for="saving in SavingRepository"
                :key="saving.key"
                two-line
                @click="openSaves(saving)"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ saving.name }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action class="hidden-xs-only">
                  <v-chip pill color="green" text-color="white">
                    <v-avatar left class="green darken-4">
                      {{ ModAttributeSaving(saving.attribute, saving.key) }}
                    </v-avatar>
                  </v-chip>
                </v-list-item-action>
                <v-list-item-action class="hidden-xs-only">
                  <v-chip pill color="red" text-color="white">
                    <v-avatar left class="red darken-4">
                      {{ characterlabel(characterSaving[saving.key]) }}
                    </v-avatar>
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <!-- <div class="group_rec">
          <div   v-for="skill in finalSkillRepository">
         

                <v-btn class = "group_skill" style="width: 100%" @click="openSkills(skill)">
                  
                  <div>{{ skill.name }}</div> <div> {{ModAttribute(skill.attribute, skill.key)}}</div> <div>  {{characterSkills[skill.key] }}</div>

                </v-btn> 

        </div> 
      </div>-->
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header class="pa-4 pt-2 pb-2">
            Владение оружием
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item
                v-for="attack in WeaponRepository"
                :key="attack.key"
                two-line
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ attack.name }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action class="hidden-xs-only">
                  <v-chip pill color="red" text-color="white">
                    <v-avatar left class="red darken-4">
                      {{ characterlabel(skillAttack[attack.key]) }}
                    </v-avatar>
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header class="pa-4 pt-2 pb-2">
            Владение доспехами
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item
                v-for="defence in DefenceRepository"
                :key="defence.key"
                two-line
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ defence.name }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action class="hidden-xs-only">
                  <v-chip pill color="red" text-color="white">
                    <v-avatar left class="red darken-4">
                      {{ characterlabel(skillDefence[defence.key]) }}
                    </v-avatar>
                  </v-chip>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- <v-expansion-panel> 
            <v-expansion-panel-header class="pa-4 pt-2 pb-2">

              Хит-поинты
            </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div>
          <div >
            <p> Максимальные хиты: {{ characterHitPointsMax() }}</p> 

        </div>
        </div>
        </v-expansion-panel-content>
      </v-expansion-panel> -->

        <v-expansion-panel>
          <v-expansion-panel-header class="pa-4 pt-2 pb-2">
            Языки
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-list>
              <v-list-item
                v-for="lang in characterLanguages"
                :key="lang.name"
                two-line
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ lang.name }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <!-- <div class="group_rec">
          <div   v-for="skill in finalSkillRepository">
         

                <v-btn class = "group_skill" style="width: 100%" @click="openSkills(skill)">
                  
                  <div>{{ skill.name }}</div> <div> {{ModAttribute(skill.attribute, skill.key)}}</div> <div>  {{characterSkills[skill.key] }}</div>

                </v-btn> 

        </div> 
      </div>-->
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <!-- Диалог по нажатию на навы -->
      <!-- <v-dialog
        v-model="skillsDialog"
        width="600px"
        scrollable
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <v-card-title style="background-color: #262e37; color: #fff">
            Навыки
            <v-spacer />
            <v-icon dark @click="closeSkills">close</v-icon>
          </v-card-title>

          <v-card-text class="pt-4">
            <v-container class="bg-primary mb-6">
              <v-row align-items="start" style="height: 150px">
                <v-col>
                  <v-sheet class="text-center small pa-1"> Навык </v-sheet>
                  <v-sheet class="text-center pa-2 ma-2">
                    {{ skill.name }}
                  </v-sheet>
                </v-col>
                <v-col>
                  <v-sheet class="text-center small pa-1">
                    {{
                      attributeRepository.find(
                        (item) => item.key === skill.attribute
                      ).short
                    }}
                  </v-sheet>
                  <v-sheet class="text-center pa-2 ma-2">
                    {{ (characterAttributes[skill.attribute] - 10) / 2 }}
                  </v-sheet>
                </v-col>
                <v-col>
                  <v-sheet class="text-center small pa-1"> Владение </v-sheet>
                  <v-sheet class="text-center pa-2 ma-2">
                    {{ profiencyRepository[SkillProf(skill.key)] }}
                  </v-sheet>
                </v-col>
                <v-col>
                  <v-sheet class="text-center small pa-1"> Уровень </v-sheet>
                  <v-sheet
                    v-if="profiencyRepository[SkillProf(skill.key)] !== 0"
                    class="text-center pa-2 ma-2"
                  >
                    {{ characterLevel() }}
                  </v-sheet>
                  <v-sheet v-else class="text-center pa-2 ma-2"> 0 </v-sheet>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <div class="pt-4 pb-2" v-html="skill.description"></div>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog> -->

      <v-dialog
        v-model="skillsDialog"
        width="1000px"
        scrollable
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <!-- Заголовок -->
          <v-card-title style="background-color: #262e37; color: #fff">
            {{ skill.name }}
            <v-spacer />
            <v-icon dark @click="closeSkills">close</v-icon>
          </v-card-title>

          <!-- Контент -->
          <v-card-text class="pt-4">
            <!-- Основная инфа -->
            <!-- <v-container class="bg-primary mb-6">
              <v-row align-items="start" style="height: 150px">
                <v-col>
                  <v-sheet class="text-center small pa-1"> Навык </v-sheet>
                  <v-sheet class="text-center pa-2 ma-2">
                    {{ skill.name }}
                  </v-sheet>
                </v-col>
                <v-col>
                  <v-sheet class="text-center small pa-1">
                    {{
                      attributeRepository.find(
                        (item) => item.key === skill.attribute
                      ).short
                    }}
                  </v-sheet>
                  <v-sheet class="text-center pa-2 ma-2">
                    {{ (characterAttributes[skill.attribute] - 10) / 2 }}
                  </v-sheet>
                </v-col>
                <v-col>
                  <v-sheet class="text-center small pa-1"> Владение </v-sheet>
                  <v-sheet class="text-center pa-2 ma-2">
                    {{ profiencyRepository[SkillProf(skill.key)] }}
                  </v-sheet>
                </v-col>
                <v-col>
                  <v-sheet class="text-center small pa-1"> Уровень </v-sheet>
                  <v-sheet
                    v-if="profiencyRepository[SkillProf(skill.key)] !== 0"
                    class="text-center pa-2 ma-2"
                  >
                    {{ characterLevel() }}
                  </v-sheet>
                  <v-sheet v-else class="text-center pa-2 ma-2"> 0 </v-sheet>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row>
                <div class="pt-4 pb-2" v-html="skill.description"></div>
              </v-row>
            </v-container> -->

            <!-- Аккордеон -->
            <v-expansion-panels multiple>
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Описание навыка</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <div class="pt-4 pb-2" v-html="skill.description"></div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!-- Actions -->
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Действия навыка</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-list dense>
                    <v-list-item
                      v-for="(action, i) in skill.actions || []"
                      :key="i"
                    >
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          {{ action?.name }}</v-expansion-panel-header
                        >
                        <v-expansion-panel-content>
                          <v-card class="glass-card pa-4">
                            <v-card-title class="headline">
                              {{ action?.name }}
                            </v-card-title>
                            <v-card-text>
                              <v-row>
                                <div>
                                  <trait-view
                                    v-if="action"
                                    :item="action"
                                    class="mb-2"
                                  />
                                </div>
                              </v-row>
                              <div
                                class="pt-4 pb-2"
                                v-html="action?.description"
                              ></div>
                              <p>
                                <strong>Category:</strong>
                                {{ action?.category }}
                              </p>
                              <p v-if="action?.requirements">
                                <strong>Requirements:</strong>
                                {{ action.requirements }}
                              </p>
                              <p v-if="action?.source">
                                <strong>Source:</strong> {{ action.source }}
                              </p>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                            </v-card-actions>
                          </v-card>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-list-item>
                    <!-- <v-list-item
                      v-for="(action, i) in skill.actions || []"
                      :key="i"
                    >
                      <v-list-item-content>{{
                        action.name
                      }}</v-list-item-content>
                      <v-list-item-action>
                        <v-chip small>{{ action.cost }}</v-chip>
                      </v-list-item-action>
                    </v-list-item> -->
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- Breakdown -->
              <v-expansion-panel>
                <v-expansion-panel-header>Расшифровка</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <span class="font-weight-bold">
                    <span v-if="skillTotal(skill) < 0"></span>
                    <span v-else>+</span>
                    {{ skillTotal(skill) }}
                  </span>
                  =
                  <!-- Бонус владения -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <kbd v-bind="attrs" v-on="on">
                        {{ profiencyRepository[SkillProf(skill.key)] }}
                      </kbd>
                    </template>
                    <span
                      >Вы {{ SkillLabelName(skill.key) }}, что дает вам бонус
                      {{ profiencyRepository[SkillProf(skill.key)] }}</span
                    >
                  </v-tooltip>

                  +

                  <!-- Модификатор атрибута -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <kbd v-bind="attrs" v-on="on">
                        {{ (characterAttributes[skill.attribute] - 10) / 2 }}
                      </kbd>
                    </template>
                    <span>
                      Модификатор атрибута
                      {{
                        attributeRepository.find(
                          (i) => i.key === skill.attribute
                        )?.short
                      }}
                    </span>
                  </v-tooltip>

                  +

                  <!-- Бонус уровня (только если есть владение) -->
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <kbd v-bind="attrs" v-on="on">
                        {{
                          profiencyRepository[SkillProf(skill.key)] !== 0
                            ? characterLevel()
                            : 0
                        }}
                      </kbd>
                    </template>
                    <span v-if="profiencyRepository[SkillProf(skill.key)] !== 0"
                      >Поскольку вы обучены этому навыку, вы добавляете свой
                      уровень.</span
                    >
                    <span v-if="profiencyRepository[SkillProf(skill.key)] === 0"
                      >Поскольку вы не обучены этому навыку, вы не добавляете
                      свой уровень.</span
                    >
                  </v-tooltip>
                </v-expansion-panel-content>
              </v-expansion-panel>

              <!-- Timeline -->
              <v-expansion-panel>
                <v-expansion-panel-header
                  >Таймлайн навыка</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  <v-list dense>
                    <v-list-item
                      v-for="(event, index) in skill.event"
                      :key="index"
                    >
                      <v-list-item-content>
                        <v-list-item-title
                          style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                          "
                        >
                          <span>{{ event.source }}</span>
                          <span style="font-size: 0.8rem; font-weight: normal"
                            >Уровень. {{ event.level }}</span
                          >
                        </v-list-item-title>
                        <v-list-item-subtitle
                          style="font-style: italic; font-size: 0.75rem"
                        >
                          {{ event.details }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <v-icon :color="event.active ? 'green' : 'grey'"
                          >mdi-badge-account</v-icon
                        >
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>

          <!-- Нижняя панель -->
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="savesDialog"
        width="600px"
        scrollable
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <v-card-title style="background-color: #262e37; color: #fff">
            Спасброски
            <v-spacer />
            <v-icon dark @click="closeSaves">close</v-icon>
          </v-card-title>

          <v-card-text class="pt-4">
            <v-container class="bg-primary mb-6">
              <v-row align="start" style="height: 150px">
                <v-col>
                  <v-sheet class="text-center small pa-1"> Спасбросок </v-sheet>
                  <v-sheet class="text-center pa-2 ma-2">
                    {{ save.name }}
                  </v-sheet>
                </v-col>
                <v-col>
                  <v-sheet class="text-center small pa-1">
                    {{
                      attributeRepository.find(
                        (item) => item.key === save.attribute
                      ).short
                    }}
                  </v-sheet>
                  <v-sheet class="text-center pa-2 ma-2">
                    {{ (characterAttributes[save.attribute] - 10) / 2 }}
                  </v-sheet>
                </v-col>
                <v-col>
                  <v-sheet class="text-center small pa-1"> Владение </v-sheet>
                  <v-sheet class="text-center pa-2 ma-2">
                    {{ profiencyRepository[characterSaving[save.key]] }}
                  </v-sheet>
                </v-col>
                <v-col>
                  <v-sheet class="text-center small pa-1"> Уровень </v-sheet>
                  <v-sheet
                    v-if="profiencyRepository[characterSaving[save.key]] !== 0"
                    class="text-center pa-2 ma-2"
                  >
                    {{ characterLevel() }}
                  </v-sheet>
                  <v-sheet v-else class="text-center pa-2 ma-2"> 0 </v-sheet>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      dense
      style="background-color: #212121"
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft"
    >
      <v-app-bar-nav-icon @click.stop="toggleDrawer" />

      <v-toolbar-title>
        <nuxt-link to="/" class="title brand-logo brand-logo__text">
          Shadow Tales (альфа версия)
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-icon v-if="$nuxt.isOffline" color="warning"> offline_bolt </v-icon>

        <v-btn
          class="d-none d-md-inline-flex"
          icon
          href="https://t.me/shadowtalesgm"
        >
          <v-icon>mdi-telegram</v-icon>
        </v-btn>

        <v-btn
          class="d-none d-md-inline-flex"
          icon
          href="https://discord.gg/5rEDvSSXSZ"
        >
          <v-icon>mdi-discord</v-icon>
        </v-btn>

        <v-btn icon @click="toggleDarkTheme">
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-toolbar dense style="overflow: auto">
        <v-toolbar-items>
          <v-btn small text nuxt :to="`/forge/my-characters`" icon>
            <v-icon>supervisor_account</v-icon>
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="`/forge/characters/${$route.params.id}/builder/setting`"
          >
            Главная
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.species"
            :disabled="!settingSelected"
          >
            1. Наследие
            <v-chip
              small
              class="select-chip"
              v-if="!characterSpeciesLabel || !characterHeritageLabel"
            >
              !
            </v-chip>
          </v-btn>
          <!-- <v-btn
            small
            text
            nuxt
            :to="routes.heritage"
            :disabled="!settingSelected"
          >
            2. Родословная
          </v-btn> -->
          <v-btn
            small
            text
            nuxt
            :to="routes.archetype"
            :disabled="!settingSelected"
          >
            2. Класс
            <v-chip small class="select-chip" v-if="!characterArchetype">
              !
            </v-chip>
            <!-- <v-alert small type="info" color="primary"> </v-alert> -->
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.ascension"
            :disabled="!settingSelected"
          >
            3. Предыстория
            <v-chip small class="select-chip" v-if="!characterAscension">
              !
            </v-chip>
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.stats"
            :disabled="!settingSelected"
          >
            4. Навыки и характеристики
            <v-chip small class="select-chip" v-if="progress !== 0"> ! </v-chip>
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.talents"
            :disabled="!settingSelected"
          >
            5. Черты
            <v-chip small class="select-chip" v-if="progressFeats !== 0">
              !
            </v-chip>
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.wargear"
            :disabled="!settingSelected"
          >
            6. Снаряжение
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.psychic"
            :disabled="!settingSelected"
          >
            7. Заклинания
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.background"
            :disabled="!settingSelected"
          >
            8. Детали Персонажа
          </v-btn>
          <v-btn
            small
            nuxt
            icon
            exact
            :to="`/forge/characters/${$route.params.id}`"
            :disabled="!settingSelected"
          >
            <v-icon>description</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container>
        <v-btn
          v-if="false"
          small
          color="green lighten-2"
          style="position: fixed; top: 174px; right: 350px; margin-right: 50%"
        >
          <v-icon>chevron_left</v-icon>
        </v-btn>

        <v-row v-if="isOutdated" align="center" justify="center">
          <v-col :cols="12" :sm="10">
            <h2>Update Available</h2>
            <p>
              This character was build with an older version and needs to be
              updated to ensure all fields are up to date. Just hit the
              <strong>update button</strong> to bring this character back in
              line. Or go to the overview page, and update all characters there.
            </p>
            <p>
              <v-alert type="warning" dense outlined>
                After thy update, please
                <strong>reselect potential ascension packages</strong>
                to ensure that influence is computed correctly.
              </v-alert>
            </p>
            <v-btn small color="success" @click="migrateCharacter"
              >Update Character</v-btn
            >
            <v-btn small color="success" nuxt exact :to="`/forge/my-characters`"
              >To the Character Overview</v-btn
            >
          </v-col>
        </v-row>

        <v-row justify="center" v-if="!isOutdated">
          <v-col :cols="12" :sm="10" :md="10" :lg="7">
            <nuxt />
          </v-col>
        </v-row>

        <v-btn
          v-if="false"
          small
          color="green lighten-2"
          style="position: fixed; top: 174px; left: 350px; margin-left: 50%"
        >
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-container>
    </v-main>

    <v-footer
      app
      dark
      :color="spendBuildingPoints > totalBuildPoints ? 'error' : ''"
      class="caption"
    >
      <v-spacer />
      <div class="caption d-none d-sm-block">
        {{ finalKeywords.join(" • ") }}
      </div>
      <div class="d-block d-sm-none">
        <v-btn
          tile
          small
          nuxt
          :to="linkPrev"
          :disabled="linkCurrentIndex === 0"
        >
          <v-icon left small> chevron_left </v-icon>prev
        </v-btn>
        <v-btn
          tile
          small
          nuxt
          :to="linkNext"
          :disabled="linkCurrentIndex === 8"
        >
          next<v-icon right small> chevron_right </v-icon>
        </v-btn>
      </div>
      <v-spacer />
      <span>&copy; {{ new Date().getFullYear() }}</span
      ><span class="d-none d-md-block">&nbsp;Shadow Tales</span>
    </v-footer>
  </v-app>
</template>

<script>
import DefaultFooter from "~/components/DefaultFooter.vue";
import ToolbarAccountActions from "~/components/user/ToolbarAccountActions.vue";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";
import SluggerMixin from "~/mixins/SluggerMixin";

export default {
  name: "Forge",
  components: {
    DefaultFooter,
    ToolbarAccountActions,
  },
  mixins: [StatRepositoryMixin, SluggerMixin],
  data() {
    return {
      skillsDialog: false,
      savesDialog: false,
      actionList: undefined,
      skill: {
        key: "acrobatics",
        name: "Акробатика",
        attribute: "dexterity",
        description: "A character’s overall physical prowess",
        optional: false,
      },
      save: {
        key: "reflex",
        name: "Рефлекс",
        attribute: "dexterity",
        description: "A character’s overall physical prowess",
      },
      drawer: {
        // sets the open status of the drawer
        open: true,
        // sets if the drawer is shown above (false) or below (true) the toolbar
        clipped: true,
        // sets if the drawer is CSS positioned as 'fixed'
        fixed: false,
        // sets if the drawer remains visible all the time (true) or not (false)
        permanent: false,
        // sets the drawer to the mini variant, showing only icons, of itself (true)
        // or showing the full drawer (false)
        mini: false,
      },
      toolbar: {
        fixed: true,
        // sets if the toolbar contents is leaving space for drawer (false) or not (true)
        clippedLeft: true,
      },
      footer: {
        // sets the CSS position of the footer
        fixed: true,
        // sets if the footer is full width (true) or gives space to the drawer (false)
        clippedLeft: true,
      },
      characterFaction: undefined,
      charSkill: {
        0: "U",
        1: "T",
        2: "E",
        3: "M",
        4: "L",
      },
    };
  },
  computed: {
    sources() {
      return [
        "playerCore",
        "playerCore2",
        // 'tnh',
        // ...this.settingHomebrews,
      ];
    },

    routes() {
      return {
        species: this.routeBuilder(
          "species",
          this.characterSpeciesLabel ? "manage" : "choose"
        ),
        // heritage: this.routeBuilder('heritage', this.characterHeritageLabel ? 'manage' : 'choose'),
        heritage: this.routeBuilder(
          "heritage",
          this.characterHeritageLabel ? "manage" : "choose"
        ),
        archetype: this.routeBuilder(
          "archetype",
          this.characterArchetype ? "manage" : "choose"
        ),
        ascension: this.routeBuilder(
          "ascension",
          this.characterAscension ? "manage" : "choose"
        ),
        stats: this.routeBuilder("stats"),
        talents: this.routeBuilder("talents"),
        psychic: this.routeBuilder("psychic-powers"),
        wargear: this.routeBuilder("wargear"),
        background: this.routeBuilder("background"),
      };
    },

    helperBox() {
      return [
        { divider: true },
        {
          id: 1,
          path: this.routes.species,
          hint: "Наследие",
          text: this.characterSpeciesLabel,
          cost: this.characterSpeciesCost,
        },
        {
          id: 2,
          path: this.routes.heritage,
          hint: "Родословная",
          text: this.characterHeritageLabel,
          cost: this.characterSpeciesCost,
        },
        {
          id: 3,
          path: this.routes.archetype,
          hint: "Класс",
          text: this.characterArchetype,
          cost: this.characterArchetypeCost,
        },
        {
          id: 4,
          path: this.routes.ascension,
          hint: "Предыстория",
          text: this.characterAscension,
          cost: this.characterAscensionCost,
        },
        {
          id: 5,
          path: this.routes.stats,
          // hint: 'Навыки и Характеристики',
          text: "Навыки и Характеристики",
          cost: this.characterAttributeCost + this.characterSkillCost,
        },
        {
          id: 6,
          path: this.routes.talents,
          hint: `Черты`,
          // text: `${this.characterTalents.length} Черт взято`,
          cost: this.characterTalentCost,
        },
        {
          id: 7,
          path: this.routes.psychic,
          hint: `Заклинания`,
          // text: `${this.characterPsychicPowers.length}Зак`,
          cost: this.characterPsychicPowerCost,
        },
        { divider: true },
        {
          id: 8,
          path: this.routes.wargear,
          hint: "",
          text: "Снаряжение",
          cost: null,
        },
        {
          id: 9,
          path: this.routes.background,
          hint: "Языки",
          // text: this.characterFaction ? this.characterFaction.name : undefined,
          cost: null,
        },
      ];
    },

    linkCurrentIndex() {
      const currentRoute = this.helperBox
        .filter((i) => i.path !== undefined)
        .find((i) => i.path.name === this.$route.name);
      return currentRoute !== undefined ? currentRoute.id : 0;
    },

    linkPrev() {
      const index = this.linkCurrentIndex;
      const prevRoute = this.helperBox.find((i) => i.id === index - 1);
      return prevRoute !== undefined
        ? prevRoute.path
        : `/forge/characters/${this.$route.params.id}/builder/setting`;
    },
    linkNext() {
      const index = this.linkCurrentIndex;
      const nextRoute = this.helperBox.find((i) => i.id === index + 1);
      return nextRoute !== undefined ? nextRoute.path : "";
    },

    settingSelected() {
      return true;
    },

    theme() {
      return this.$store.getters["theme"];
    },

    settingTier() {
      return this.$store.getters["characters/characterSettingTierById"](
        this.$route.params.id
      );
    },
    campaignCustomXp() {
      return this.$store.getters["characters/characterCampaignCustomXpById"](
        this.$route.params.id
      );
    },
    totalBuildPoints() {
      return this.$store.getters["characters/characterTotalBuildPointsById"](
        this.$route.params.id
      );
    },
    progress() {
      const progress = this.$store.getters["characters/characterProgressById"](
        this.$route.params.id
      );

      if (!progress) return 0;
      let i = 0;
      progress.forEach((t) => {
        i = i + t.value;
      });
      return i;
    },
    progressFeats() {
      const characterTalents = this.$store.getters[
        "characters/characterTalentsById"
      ](this.$route.params.id);
      const level = this.characterLevel();
      const max = characterTalents
        .filter((s) => level >= s.level)
        .filter((s) => !s.place.includes("free")).length;
      const arLevel =
        Math.trunc(this.characterLevel() / 2) +
        (this.characterLevelOne() === true ? 1 : 0);

      const ancestry = Math.trunc((this.characterLevel() - 1) / 4) + 1;
      let levelFeats =
        ancestry +
        arLevel +
        Math.trunc(this.characterLevel() / 2) +
        Math.trunc((this.characterLevel() + 1) / 4);
      return levelFeats > max ? levelFeats - max : 0;
    },

    progressMax() {
      const progress = this.$store.getters[
        "characters/characterProgressMaxById"
      ](this.$route.params.id);

      if (!progress) return 0;
      let i = 0;
      progress.forEach((t) => {
        i = i + t.value;
      });

      return i;
    },
    skillAttack() {
      return this.$store.getters["characters/characterskillAttackById"](
        this.$route.params.id
      );
    },
    skillDefence() {
      return this.$store.getters["characters/characterskillDefenceById"](
        this.$route.params.id
      );
    },
    characterSkillClass() {
      return this.$store.getters["characters/characterSkillClassById"](
        this.$route.params.id
      );
    },
    spendBuildingPoints() {
      return this.$store.getters["characters/characterSpendBuildPointsById"](
        this.$route.params.id
      );
    },
    bonus() {
      return this.$store.getters["characters/characterBonusById"](
        this.$route.params.id
      );
    },
    keywords() {
      return this.$store.getters["characters/characterKeywordsRawById"](
        this.$route.params.id
      );
    },
    finalKeywords() {
      return this.$store.getters["characters/characterKeywordsFinalById"](
        this.$route.params.id
      );
    },

    // see core page 156
    maximumBuildPointsForAttributes() {
      const bpLimits = [0, 100, 100, 150, 200, 300];
      return bpLimits[this.settingTier()];
    },
    maximumStartingTalents() {
      return Math.min(5, this.settingTier + 1);
    },
    maximumPsychicPowers() {
      return this.settingTier + 3;
    },
    characterSpeed() {
      return this.$store.getters["characters/characterSpeedById"](
        this.$route.params.id
      );
    },
    isOutdated() {
      return this.characterVersion < this.builderVersion;
    },
    builderVersion(id) {
      return this.$store.getters["builderVersion"];
    },
    characterVersion(id) {
      return this.$store.getters["characters/characterVersionById"](
        this.$route.params.id
      );
    },
    characterLanguages() {
      return this.$store.getters["characters/characterLanguagesById"](
        this.$route.params.id
      );
    },
    characterSpeciesLabel() {
      return this.$store.getters["characters/characterSpeciesLabelById"](
        this.$route.params.id
      );
    },
    characterHeritageLabel() {
      return this.$store.getters["characters/characterHeritageLabelById"](
        this.$route.params.id
      );
    },

    characterFactionKey() {
      return this.$store.getters["characters/characterFactionKeyById"](
        this.$route.params.id
      );
    },
    characterArchetype() {
      return this.$store.getters["characters/characterArchetypeLabelById"](
        this.$route.params.id
      );
    },
    characterTalents() {
      return this.$store.getters["characters/characterTalentsById"](
        this.$route.params.id
      );
    },
    characterPsychicPowers() {
      return this.$store.getters["characters/characterPsychicPowersById"](
        this.$route.params.id
      );
    },
    characterAscension() {
      return this.$store.getters["characters/characterAscensionLabelById"](
        this.$route.params.id
      );
    },

    characterBackground() {
      return this.$store.getters["characters/characterBackgroundLabelById"](
        this.$route.params.id
      );
    },
    characterAttributes() {
      return this.$store.getters["characters/characterAttributesById"](
        this.$route.params.id
      );
    },
    characterSkillSheet() {
      return this.$store.getters["characters/characterSkillSheetById"](
        this.$route.params.id
      );
    },
    characterSkills() {
      return this.$store.getters["characters/characterSkillsById"](
        this.$route.params.id
      );
    },
    characterSaving() {
      return this.$store.getters["characters/characterSavingById"](
        this.$route.params.id
      );
    },
    finalSkillRepository() {
      return [...this.skillRepository, ...this.characterCustomSkills];
    },
    characterCustomSkills() {
      return this.$store.getters["characters/characterCustomSkillsById"](
        this.$route.params.id
      );
    },
    characterHitPoints() {
      return this.$store.getters["characters/characterHitPointsById"](
        this.$route.params.id
      );
    },
    characterPerseption() {
      return this.$store.getters["characters/characterPerseptionById"](
        this.$route.params.id
      );
    },

    characterSpeciesCost() {
      return this.$store.getters["characters/characterSpeciesCostsById"](
        this.$route.params.id
      );
    },
    characterArchetypeCost() {
      return this.$store.getters["characters/characterArchetypeCostsById"](
        this.$route.params.id
      );
    },
    characterAscensionCost() {
      return this.$store.getters["characters/characterAscensionCostsById"](
        this.$route.params.id
      );
    },
    characterAttributeCost() {
      return this.$store.getters["characters/characterAttributeCostsById"](
        this.$route.params.id
      );
    },
    characterSkillCost() {
      return this.$store.getters["characters/characterSkillCostsById"](
        this.$route.params.id
      );
    },
    characterTalentCost() {
      return this.$store.getters["characters/characterTalentCostsById"](
        this.$route.params.id
      );
    },
    characterPsychicPowerCost() {
      return this.$store.getters["characters/characterPsychicPowerCostsById"](
        this.$route.params.id
      );
    },
  },
  asyncData({ params }) {
    return {};
  },
  head() {
    return {
      titleTemplate: "%s | Билдодельня",
      title: "Создай своего персонажа",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "",
        },
        { hid: "robots", name: "robots", content: "noindex,nofollow" },
      ],
      link: [
        // { rel: 'canonical', href: `http://www.shadow-of-tales.ru${this.$route.path}` },
      ],
    };
  },
  watch: {
    theme: {
      handler(newTheme, oldTheme) {
        this.$vuetify.theme.dark = newTheme !== "light";
      },
      immediate: true, // make this watch function is called when component created
    },
    characterFactionKey: {
      handler(newVal) {
        if (newVal) {
          this.loadFaction(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          // this.getWargearList(newVal);
          // this.getAbilityList(newVal);
          this.getActionList(newVal);
          // this.getSpellList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    skillTotal(skill) {
      const prof = this.profiencyRepository[this.SkillProf(skill.key)];
      const attr = (this.characterAttributes[skill.attribute] - 10) / 2;
      const lvl = prof !== 0 ? this.characterLevel() : 0;
      return prof + attr + lvl;
    },
    settingHomebrews() {
      return this.$store.getters["characters/characterSettingHomebrewsById"](
        this.$route.params.id
      );
    },
    async loadFaction(key) {
      if (key) {
        const { data } = await this.$axios.get(`/api/factions/${key}`);
        this.characterFaction = data;
      }
    },
    async getActionList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get("/api/action/", config.source);
      data.forEach((s) => {
        s.trait = s.traits;
      });
      this.actionList = data;
    },
    ModAttribute(attribute, skill) {
      //      const skills = [...this.skillRepository, ...this.characterCustomSkills];

      const prof = this.characterSkillSheet.filter(
        (s) => s.key === skill
      ).length;

      const char1 = this.profiencyRepository[this.charSkill[prof]];
      const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = char1 === 0 ? 0 : this.characterLevel();
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    SkillProf(skill) {
      const prof = this.characterSkillSheet.filter(
        (s) => s.key === skill
      ).length;

      switch (prof) {
        case 0:
          return "U";
        case 1:
          return "T";
        case 2:
          return "E";
        case 3:
          return "M";
        case 4:
          return "L";
        default:
          return "U";
      }
    },
    SkillLabelName(skill) {
      //      const skills = [...this.skillRepository, ...this.characterCustomSkills];

      const prof = this.characterSkillSheet.filter(
        (s) => s.key === skill
      ).length;

      switch (prof) {
        case 0:
          return "нетренированы";
        case 1:
          return "тренированы";
        case 2:
          return "эксперт";
        case 3:
          return "мастер";
        case 4:
          return "легенда";
        default:
          return "нетренированыН";
      }
    },
    SkillLabel(skill) {
      //      const skills = [...this.skillRepository, ...this.characterCustomSkills];

      const prof = this.characterSkillSheet.filter(
        (s) => s.key === skill
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
    ModAttributeSaving(attribute, skill) {
      const char1 = this.profiencyRepository[this.characterSaving[skill]];
      const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = this.characterLevel();
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    ModAttributePerception(attribute, skill) {
      const char1 = this.profiencyRepository[this.SkillPerception()];
      const char2 = (this.characterAttributes["wisdom"] - 10) / 2;
      const char3 = this.characterLevel();
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    ModAttributeClass() {
      const char1 = this.profiencyRepository[this.SkillClass()];
      const char3 = this.characterLevel();
      if (this.characterArchetype)
        return 10 + parseInt(char1) + parseInt(char3);
      else 0;
    },
    SkillClass() {
      return this.$store.getters["characters/characterSkillClassById"](
        this.$route.params.id
      );
    },
    SkillPerception() {
      return this.$store.getters["characters/characterPerseptionById"](
        this.$route.params.id
      );
    },
    // changes the drawer to permanent
    makeDrawerPermanent() {
      this.drawer.permanent = true;
      // set the clipped state of the drawer and toolbar
      this.drawer.clipped = false;
      this.toolbar.clippedLeft = false;
    },
    сharacterSpeedLabel() {
      const Bonus = this.$store.getters["characters/characterBonusById"](
        this.$route.params.id
      );
      const speed = this.characterSpeed["land"];

      let speedTotal = 0;
      if (Bonus) {
        Bonus.filter(
          (s) =>
            s.level <= this.characterLevel() &&
            s.type === "Speed" &&
            s.mode === "Bonus" &&
            s.key === "land"
        ).forEach((s) => {
          speedTotal += s.valueBonus;
        });
      }

      return speed + speedTotal;
    },
    characterLevelOne() {
      return (
        this.$store.getters["characters/characterLevelOneById"](
          this.$route.params.id
        ) === true
      );
    },
    characterArmor() {
      const wear = this.$store.getters["characters/characterWearById"](
        this.$route.params.id
      );
      if (wear) {
        const modDex = Math.floor(
          (this.characterAttributes["dexterity"] - 10) / 2
        );
        const wearModDex = wear.modDex ? wear.modDex : 0;
        const dex = modDex > wearModDex ? wearModDex : modDex;
        const Def = wear.category
          ? this.profiencyRepository[this.skillDefence[wear.category]]
          : 0;
        const bonusAC = wear.bonusAC ? wear.bonusAC : 0;
        const arm = Def === 0 ? 0 : this.characterLevel();
        return 10 + dex + Def + arm + bonusAC;
      }

      const modDex = Math.floor(
        (this.characterAttributes["dexterity"] - 10) / 2
      );
      return 10 + modDex;
    },
    characterHitPointsMax() {
      const species = this.characterHitPoints["species"]
        ? this.characterHitPoints["species"]
        : 0;
      const classh = this.characterHitPoints["class"]
        ? this.characterHitPoints["class"]
        : 0;

      const levelClass =
        (classh + (this.characterAttributes["constitution"] - 10) / 2) *
        this.characterLevel();
      if (levelClass <= 0) return species;
      else return species + levelClass;
    },
    // toggles the drawer variant (mini/full)
    toggleMiniDrawer() {
      this.drawer.mini = !this.drawer.mini;
    },
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      let theme = this.$vuetify.theme.dark ? "dark" : "light";
      this.$store.commit("setTheme", theme);
      this.$ga.event("Settings", "Change Theme", theme, 1);
    },

    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    toggleDrawer() {
      if (this.drawer.permanent) {
        this.drawer.permanent = !this.drawer.permanent;
        // set the clipped state of the drawer and toolbar
        this.drawer.clipped = true;
        this.toolbar.clippedLeft = true;
      } else {
        // normal drawer
        this.drawer.open = !this.drawer.open;
      }
    },
    characterLevel() {
      return this.$store.getters["characters/characterLevelById"](
        this.$route.params.id
      );
    },
    routeBuilder(parent, child) {
      if (child) {
        return {
          name: `forge-characters-id-builder-${parent}-${child}`,
          params: { id: this.$route.params.id },
        };
      }
      return {
        name: `forge-characters-id-builder-${parent}`,
        params: { id: this.$route.params.id },
      };
    },
    characterlabel(key) {
      switch (key) {
        case "U":
          return "Н";
        case "T":
          return "Т";
        case "E":
          return "Э";
        case "M":
          return "М";
        case "L":
          return "Л";
        default:
          return "Н";
      }
    },
    migrateCharacter() {
      this.$store.dispatch("characters/migrate", {
        characterId: this.$route.params.id,
      });
    },
    getRank(skill) {
      // Твой способ получения уровня тренированности
      const s = this.characterSkillSheet.find((s) => s.key === skill.key);
      return s ? s.length : 0; // если не найдено — 0 (нетрен.)
    },
    rankColorClass(skill) {
      const rank = this.getRank(skill);
      switch (rank) {
        case 0:
          return "rank-untrained";
        case 1:
          return "rank-trained";
        case 2:
          return "rank-expert";
        case 3:
          return "rank-master";
        case 4:
          return "rank-legend";
        default:
          return "";
      }
    },

    openSkills(skill) {
      ///добавляем действия к навыку
      const actions = this.actionList
        .filter((s) => s.skills)
        .filter((s) => s.skills.join(", ").includes(skill.key));

      const prof = this.characterSkillSheet
        .filter((s) => s.key === skill.key)
        .sort((a, b) => a.level - b.level);

      const event = [];
      const train = {
        0: "Нетреннированый",
        1: "Тренированный",
        2: "Эксперт",
        3: "Мастер",
        4: "Легенда",
      };

      if (prof) {
        let i = 0;

        prof.forEach((s) => {
          event.push({
            level: s.level,
            source: s.type,
            details: train[i] + "->" + train[i + 1],
          });
          i++;
        });
      }

      const skill1 = {
        ...skill,
        actions: actions,
        event: event,
      };

      this.skill = skill1;

      this.skillsDialog = true;
    },
    closeSkills() {
      this.skillsDialog = false;
    },
    openSaves(save) {
      this.save = save;
      this.savesDialog = true;
    },
    closeSaves() {
      this.savesDialog = false;
    },
    getSkillRankColor(skillKey) {
      const rank = this.getSkillRank(skillKey);
      switch (rank) {
        case 0: // Нетренирован
          return "grey lighten-3";
        case 1: // Тренирован
          return "blue lighten-4";
        case 2: // Эксперт
          return "green lighten-4";
        case 3: // Мастер
          return "orange lighten-4";
        case 4: // Легенда
          return "purple lighten-4";
        default:
          return "grey lighten-3";
      }
    },

    getSkillRank(skillKey) {
      const skillSheet = this.characterSkillSheet || [];
      return skillSheet.filter((s) => s.key === skillKey).length;
    },

    getSkillRankName(skillKey) {
      const rank = this.getSkillRank(skillKey);
      switch (rank) {
        case 0:
          return "Нетренирован";
        case 1:
          return "Тренирован";
        case 2:
          return "Эксперт";
        case 3:
          return "Мастер";
        case 4:
          return "Легенда";
        default:
          return "Нетренирован";
      }
    },
    getRankChipColor(skillKey) {
      const rank = this.getSkillRank(skillKey);
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

      //       .rank-chip-0 {
      //   background-color: #9e9e9e !important;
      // }
      // .rank-chip-1 {
      //   background-color: #171f69 !important;
      // }
      // .rank-chip-2 {
      //   background-color: #3c005e !important;
      // }
      // .rank-chip-3 {
      //   background-color: #664400 !important;
      // }
      // .rank-chip-4 {
      //   background-color: #5e0000 !important;
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.dod-container {
  @media (min-width: 768px) {
    width: 680px;
  }
}

.group_rec {
  --stack-gap: calc(0.3125rem * 1);
  --stack-align: stretch;
  --stack-justify: flex-start;
  display: flex;
  flex-direction: column;
  align-items: var(--stack-align, stretch);
  justify-content: var(--stack-justify, flex-start);
  gap: var(--stack-gap, var(--mantine-spacing-md));
}

.group {
  justify-content: center;
  display: flex;
}

.attr {
  margin-right: 8px;
}

.fancy {
  /*position: absolute;*/
  /*width: 100%;*/
  /*height: 100%;*/
  /*transform: rotate(90deg);*/
  /*background-image: url('https://i.imgur.com/E9huxA0.png');*/
  background-image: url("https://i.imgur.com/NfGsk6O.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.brand-logo {
  &__text {
    color: hsl(0, 0%, 100%);
    text-decoration: none;
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

<style scoped>
.skill-button {
  justify-content: space-between;
  background: #333;
  border-radius: 12px;
  margin-bottom: 8px;
}

.skill-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.skill-label {
  font-size: 14px;
  color: #fff;
}

.skill-values {
  display: flex;
  align-items: center;
  gap: 8px;
}

.skill-value {
  font-size: 14px;
  color: #fff;
}
</style>

<style scoped>
.skill-item.rank-0 {
  background-color: #f5f5f5;
}
.skill-item.rank-1 {
  background-color: #e3f2fd;
}
.skill-item.rank-2 {
  background-color: #e8f5e9;
}
.skill-item.rank-3 {
  background-color: #fff3e0;
}
.skill-item.rank-4 {
  background-color: #f3e5f5;
}

.rank-chip-0 {
  background-color: #9e9e9e !important;
}
.rank-chip-1 {
  background-color: #171f69 !important;
}
.rank-chip-2 {
  background-color: #3c005e !important;
}
.rank-chip-3 {
  background-color: #664400 !important;
}
.rank-chip-4 {
  background-color: #5e0000 !important;
}

.skill-label {
  display: flex;
  align-items: center;
}
</style>
