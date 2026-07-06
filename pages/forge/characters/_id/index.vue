<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-container fluid class="pa-0" style="max-width: 1200px">

      <v-row justify="center" align="stretch">
        <v-col cols="12" md="4">
          <character-header-card :characterId="characterId" :characterArchetype="characterArchetype" />
        </v-col>

        <v-col cols="12" md="4">
          <character-hit-points-card :characterId="characterId" />
        </v-col>

        <v-col cols="12" md="4">
          <character-status-card />
        </v-col>

        <v-col cols="12" md="4">
          <character-attributes-card @click.native="openAtt()" />
        </v-col>

        <v-col cols="12" md="4">
          <character-armor-card @click.native="openStatDialog('character-armor-card', 'КД')" :characterId="characterId"
            :armorClass="armorClass" />
        </v-col>

        <v-col cols="12" md="4">
          <character-speed-card @click.native="openStatDialog('character-speed-card', 'Скорость')" />
        </v-col>
      </v-row>

      <v-dialog v-model="dialogStat.open" width="1000px" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card>

          <!-- HEADER -->
          <v-card-title class="dialog-header">
            <span>{{ dialogStat.title }}</span>
            <v-spacer />
            <v-icon dark @click="dialogStat.open = false">mdi-close</v-icon>
          </v-card-title>

          <!-- BODY -->
          <v-card-text class="pt-4">

            <!-- 1. ATT TABLE -->
            <attribute-table v-if="dialogStat.type === 'att'" :characterId="characterId" />

            <!-- 2. SKILLS -->
            <skills-dialog v-if="dialogStat.type === 'skill'" :skill="dialogStat.payload" />

            <!-- 3. SAVES -->
            <saves-dialog v-if="dialogStat.type === 'save'" :save="dialogStat.payload" />

          </v-card-text>

        </v-card>
      </v-dialog>

      <v-row justify="center">
        <!-- actions, gear, feats, spells, ... -->
        <v-col cols="12" md="12">
          <v-card>
            <v-tabs centered grow color="red">

              <!-- <v-tab class="caption" key="actions" :href="`#tab-actions`"
              ><h2 class="subtitle-2">Оружие</h2></v-tab
            > -->
              <v-tab class="caption" key="wargear" :href="`#tab-wargear`">
                <h2 class="subtitle-2">Снаряжение</h2>
              </v-tab>
              <v-tab class="caption" key="abilities-talents" :href="`#tab-abilities-talents`">
                <h2 class="subtitle-2">Способности</h2>
              </v-tab>
              <v-tab class="caption" key="actions" :href="`#tab-actions`">
                <h2 class="subtitle-2">Скиллы</h2>
              </v-tab>
              <v-tab class="caption" key="psychic-powers" :href="`#tab-psychic-powers`">
                <h2 class="subtitle-2">Заклинания</h2>
              </v-tab>
              <v-tab class="caption" key="objectives" :href="`#tab-objectives`">
                <h2 class="subtitle-2">Описание</h2>
              </v-tab>
              <v-tab class="caption" key="notes" :href="`#tab-notes`">
                <h2 class="subtitle-2">Заметки</h2>
              </v-tab>

              <!-- actions (all, weapons, powers, other) -->
              <v-tab-item class="my-tab-item" key="actions" :value="`tab-actions`">
                <v-col :cols="12" class="pa-1">
                  <v-card style="display: flex; flex-flow: column">
                    <v-row no-gutters style="height: 100%">
                      <!-- Левая колонка (30%) -->
                      <v-col cols="12" md="4" class="pa-2 left-col">
                        <SkillsTable :skills="skills" :headers="skillHeaders" :get-rating="characterlabel"
                          :get-value="computeSkillPool" :characterId="characterId" :actionList="actionList" />
                      </v-col>

                      <!-- Правая колонка (70%) -->
                      <v-col cols="12" md="8" class="pa-2 right-col">
                        <div class="content-box"></div>
                        <div v-if="actionList"></div>
                        <ActionPanels :exploration-actions="explorationActions" :rest-actions="restActions"
                          :other-actions="otherActions" :basic-actions="basicActions"
                          :basic-special-actions="basicSpecialActions" :icon-action="iconAction"
                          @select="openDialogAction" />
                      </v-col>
                    </v-row>

                    <v-spacer></v-spacer>
                  </v-card>
                </v-col>
              </v-tab-item>


              <!-- wargear (All, Weapons, Armour, Gear, Other Possessions) -->
              <v-tab-item class="my-tab-item" key="wargear" :value="`tab-wargear`">
                <v-col :cols="12" class="pa-1">
                  <v-card style="display: flex; flex-flow: column">
                    <v-row no-gutters style="height: 100%">
                      <v-col cols="12" md="12" class="pa-2 left-col">
                        <WargearHeader :bulk="bulkCount" :strength="characterAttributes.strength"
                          :currencies="currencies" :money="getMoney" @search="search = $event" />

                        <v-row>
                          <v-col :cols="12" class="pa-1">

                            <v-chip-group mandatory active-class="red--text" v-model="wargearSection.selection">
                              <v-chip label small v-for="item in [
                                `Оружие`,
                                `Доспехи`,
                                `Расходники`,

                                `Снаряжение`,

                              ]" :key="item.toLowerCase()" :value="item.toLowerCase()">
                                {{ item }}
                              </v-chip>
                            </v-chip-group>


                            <div style="height: 505px; overflow-y: auto">
                              <!-- species < abilities -->
                              <WeaponsTable
                                v-show="wargearSection.selection === 'оружие' || wargearSection.selection === 'все'"
                                :items="weapons" :headers="weaponHeaders" :attack-modifier="attackModifier"
                                :damage-modifier="damageModifier" :characterId="characterId" @view="openDialogItem"
                                :wargearList="wargearList" :traitList="traitRepository" />
                              <!-- species < abilities -->

                              <ArmorTable
                                v-show="wargearSection.selection === 'доспехи' || wargearSection.selection === 'все'"
                                :items="armour" :headers="armorHeaders" :characterId="characterId" @toggle="toggleWear"
                                @view="openDialogItem" :wargearList="wargearList" :traitList="traitRepository" />

                              <!-- species < abilities -->
                              <GearTable
                                v-show="wargearSection.selection === 'снаряжение' || wargearSection.selection === 'все'"
                                :items="gear" :headers="gearHeaders" @view="openDialogItem" :wargearList="wargearList"
                                :characterId="characterId" :traitList="traitRepository" />

                              <ConsumableTable
                                v-show="wargearSection.selection === 'расходники' || wargearSection.selection === 'все'"
                                :items="consumable" :headers="gearHeaders" @view="openDialogItem"
                                :wargearList="wargearList" :characterId="characterId" />


                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>


              </v-tab-item>

              <!-- abilities (All, Race, Archetype, Talents, Faith?, Other) -->
              <v-tab-item class="my-tab-item" key="abilities-talents" :value="`tab-abilities-talents`">
                <v-dialog v-model="dialogFeat" max-width="800px">
                  <v-card>
                    <CardItem :item="selectedItem" />
                  </v-card>
                </v-dialog>

                <v-row>

                  <!-- LEFT -->
                  <v-col cols="6">

                    <v-sheet class="pa-2 overflow-y-auto" height="600" outlined>

                      <v-expansion-panels multiple>

                        <v-expansion-panel v-for="section in leftSections" :key="section.key">

                          <!-- HEADER -->
                          <v-expansion-panel-header class="font-weight-bold">
                            {{ section.title }}
                          </v-expansion-panel-header>

                          <!-- CONTENT -->
                          <v-expansion-panel-content>

                            <v-card v-for="(items, level) in section.levels" :key="level" class="mb-2" outlined>

                              <v-list dense>

                                <v-list-item v-for="item in items" :key="item.name" @click="openFeat(item)"
                                  class="feat-row">

                                  <v-list-item-content>
                                    <span class="level">
                                      {{ item.level }}. {{ item.name }}

                                    </span>
                                  </v-list-item-content>

                                </v-list-item>

                              </v-list>

                            </v-card>

                          </v-expansion-panel-content>

                        </v-expansion-panel>

                      </v-expansion-panels>

                    </v-sheet>

                  </v-col>

                  <!-- RIGHT -->
                  <v-col cols="6">

                    <v-sheet class="pa-2 overflow-y-auto" height="600" outlined>

                      <v-expansion-panels multiple>

                        <v-expansion-panel v-for="section in rightSections" :key="section.key">

                          <!-- HEADER -->
                          <v-expansion-panel-header class="font-weight-bold">
                            {{ section.title }}
                          </v-expansion-panel-header>

                          <!-- CONTENT -->
                          <v-expansion-panel-content>

                            <v-card v-for="(items, level) in section.levels" :key="level" class="mb-2" outlined>

                              <v-list dense>

                                <v-list-item v-for="item in items" :key="item.name" @click="openDialogItem(item)"
                                  class="feat-row">

                                  <v-list-item-content>
                                    <span class="level">
                                      <span v-if="item.level">{{ item.level }}.</span> {{ item.name }}

                                    </span>
                                  </v-list-item-content>

                                </v-list-item>

                              </v-list>

                            </v-card>

                          </v-expansion-panel-content>

                        </v-expansion-panel>

                      </v-expansion-panels>

                    </v-sheet>

                  </v-col>

                </v-row>

                <!-- <v-expansion-panels multiple>

                  <v-expansion-panel v-for="group in groupedTalents" :key="group.type">
                    <v-expansion-panel-title>
                      {{ group.label }}
                    </v-expansion-panel-title>

                    <v-expansion-panel-text>

                      <div v-for="talent in group.items" :key="talent.id || talent.name">
                        <talents-card :talent="talent" />
                      </div>

                    </v-expansion-panel-text>

                  </v-expansion-panel>

                </v-expansion-panels> -->
              </v-tab-item>

              <!-- powers -->
              <v-tab-item class="my-tab-item" key="psychic-powers" :value="`tab-psychic-powers`">
                <v-expansion-panels multiple class="custom-panels">
                  <v-expansion-panel v-if="characterArchetype && characterArchetype.spellProgression"
                    class="custom-panel">
                    <v-expansion-panel-header>Заклинания {{ archetype }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="pa-2">
                        <v-col :cols="12" v-if="
                          characterArchetype && characterArchetype.spellProgression
                        ">
                          <v-col :cols="12">
                            <span><br />
                              <b>Обычай:</b> {{ characterArchetype.spellTradition }}
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
                          <v-card class="mb-4" dense outlined v-for="levelAncestry in 10" :key="levelAncestry" v-if="
                            levelAncestry - 1 <=
                            characterArchetype.spellProgression[
                              characterLevel()
                            ].findIndex((t) => t == 0) -
                            1 || characterLevel() == 20
                          ">
                            <h2 class="subtitle-1 text-center">
                              {{
                                levelAncestry - 1 === 0
                                  ? "Чары"
                                  : `${levelAncestry - 1} уровень`
                              }}
                            </h2>
                            <div class="ammo-container" v-if="characterArchetype.prepared === false">
                              <!-- Патроны -->
                              <div class="magazine" @click="
                                handleClick(
                                  $event,
                                  levelAncestry - 1,
                                  characterSpont[levelAncestry - 1]
                                    ? characterSpont[levelAncestry - 1].value
                                    : characterArchetype.spellProgression[
                                    characterLevel()
                                    ]?.[levelAncestry - 1]
                                )
                                " @contextmenu.prevent="
                                  handleClick(
                                    $event,
                                    levelAncestry - 1,
                                    characterSpont[levelAncestry - 1]
                                      ? characterSpont[levelAncestry - 1].value
                                      : characterArchetype.spellProgression[
                                      characterLevel()
                                      ]?.[levelAncestry - 1]
                                  )
                                  ">
                                <span v-for="n in characterArchetype.spellProgression[
                                  characterLevel()
                                ]?.[levelAncestry - 1] || 0" class="bullet" :class="{
                                  filled:
                                    n <=
                                    (characterSpont[levelAncestry - 1]?.value || 0),
                                }">
                                  🔸
                                  <!-- 
                          <p>
                            Value:
                            {{ characterSpont[levelAncestry - 1]?.value }}
                          </p>
                          <p>n: {{ n }}</p> -->
                                </span>
                              </div>
                            </div>

                            <v-data-table :headers="filteredHeaders" :items="psychicPowers(levelAncestry - 1)"
                              :item-class="getItemClass" item-key="cellIndex" hide-default-footer dense>
                              <template v-slot:item.cast="{ item }">
                                <v-btn v-if="item.name" outlined x-small color="info" @click="updateCast(item)">
                                  <v-icon left>mdi-auto-fix</v-icon> Сотв
                                </v-btn>
                              </template>

                              <template v-slot:item.name="{ item }">
                                <span v-if="!item.name"> Пустой слот </span>
                                {{ item.name }}
                              </template>

                              <template v-slot:item.action="{ item }">
                                <!-- {{ item?.time }} -->
                                <div v-if="item?.time">
                                  <img :src="iconAction(item?.time?.value)"
                                    :class="{ 'invert-icon': !$vuetify.theme.dark }" />
                                </div>
                              </template>

                              <template v-slot:item.duration="{ item }">
                                <span v-if="item?.duration?.sustained === true">Поддерживаемое до
                                </span>
                                {{ item?.duration?.value }}
                              </template>

                              <template v-slot:item.distance="{ item }">
                                {{ item?.distance || "-" }}
                              </template>

                              <template v-slot:item.saving="{ item }">
                                <span v-if="item?.defense?.save">
                                  <span v-if="item?.defense?.save?.basic">Базовый
                                  </span>
                                  {{
                                    SavingRepository.find(
                                      (t) => t.key === item?.defense?.save?.statistic
                                    ).name
                                  }}
                                </span>

                                <span v-if="item?.traits?.includes('атака')">
                                  <span>КБ </span>
                                </span>
                              </template>

                              <template v-slot:item.area="{ item }">
                                <span v-if="item?.area">
                                  {{ item?.area?.value }}-фут.
                                  {{ areaRepository[item?.area?.type] }}
                                </span>
                                <span v-if="item?.area && item?.target"> / </span>
                                <span v-if="item?.target">
                                  {{ item?.target }}
                                </span>
                              </template>

                              <template v-slot:item.view="{ item }">
                                <v-btn v-if="item.name" outlined x-small color="info" @click="openDialogItem(item)">
                                  <v-icon left>visibility</v-icon> Просмотр
                                </v-btn>
                              </template>


                              <template v-slot:item.button="{ item }">
                                <v-btn v-if="item.name" outlined x-small color="error"
                                  @click.stop.prevent="removeTalent(item)">
                                  <v-icon left>delete</v-icon> Удалить
                                </v-btn>

                                <v-btn v-if="!item.name" outlined x-small color="success"
                                  @click="updatePreview(item.rank, item.cell)">
                                  <v-icon left>add</v-icon> Добавить
                                </v-btn>
                              </template>

                            </v-data-table>


                          </v-card>
                        </v-col>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>

                  <v-expansion-panel class="custom-panel">
                    <v-expansion-panel-header>Ритуалы</v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="pa-2">
                        <v-btn class="action-btn" outlined x-small @click="updatePreviewRitual()">
                          <v-icon left>add</v-icon> Добавить
                        </v-btn>
                        <h2 class="subtitle-1 text-center">
                          "Ритуалы"
                        </h2>

                        <v-data-table :headers="filteredHeadersRitual" :items="generateTableRitualRows()"
                          item-key="cellIndex" hide-default-footer dense>
                          <template v-slot:item.name="{ item }">
                            <span v-if="!item.name"> Пустой слот </span>
                            {{ item.name }}
                          </template>

                          <template v-slot:item.action="{ item }">
                            <!-- {{ item?.time }} -->
                            <div v-if="item?.time">
                              <img :src="iconAction(item?.time?.value)"
                                :class="{ 'invert-icon': !$vuetify.theme.dark }" />
                            </div>
                          </template>

                          <template v-slot:item.duration="{ item }">
                            <span v-if="item?.duration?.sustained === true">Поддерживаемое до
                            </span>
                            {{ item?.duration?.value }}
                          </template>

                          <template v-slot:item.distance="{ item }">
                            {{ item?.distance || "-" }}
                          </template>

                          <template v-slot:item.saving="{ item }">
                            <span v-if="item?.defense?.save">
                              <span v-if="item?.defense?.save?.basic">Базовый </span>
                              {{
                                SavingRepository.find(
                                  (t) => t.key === item?.defense?.save?.statistic
                                ).name
                              }}
                            </span>

                            <span v-if="item?.traits?.includes('атака')">
                              <span>КБ </span>
                            </span>
                          </template>

                          <template v-slot:item.area="{ item }">
                            <span v-if="item?.area">
                              {{ item?.area?.value }}-фут.
                              {{ areaRepository[item?.area?.type] }}
                            </span>
                            <span v-if="item?.area && item?.target"> / </span>
                            <span v-if="item?.target">
                              {{ item?.target }}
                            </span>
                          </template>

                          <template v-slot:item.view="{ item }">
                            <v-btn v-if="item.name" outlined x-small color="info" @click="openDialog(item)">
                              <v-icon left>visibility</v-icon> Просмотр
                            </v-btn>
                          </template>

                          <template v-slot:item.button="{ item }">
                            <v-btn v-if="item.name" outlined x-small color="error"
                              @click.stop.prevent="removeTalent(item)">
                              <v-icon left>delete</v-icon> Удалить
                            </v-btn>
                          </template>
                        </v-data-table>
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>

                <v-dialog v-model="psychicDialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="1200px" scrollable>
                  <psychic-preview :character-id="characterId" :talents="selectedPsychic"
                    :archetype="characterArchetype" :rank="rankSpell" :level="levelSpell" :list="psychicPowersList"
                    :type=spell choose-mode @cancel="psychicDialog = false" />
                </v-dialog>
              </v-tab-item>

              <!-- objectives -->
              <v-tab-item class="my-tab-item" key="objectives" :value="`tab-objectives`">
                <div class="pa-2">

                  <v-row>
                    <!-- LEFT COLUMN -->
                    <v-col cols="12" md="6">
                      <v-card class="pa-3" outlined>
                        <v-tabs v-model="tab" background-color="transparent" grow>
                          <v-tab>General</v-tab>
                          <v-tab>Organized Play</v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                          <!-- GENERAL -->
                          <v-tab-item>
                            <v-card flat>
                              <v-textarea placeholder="Внешность" rows="1" auto-grow hide-details
                                :value="getFluff('appearance')" @input="value => onInput('appearance', value)" />

                              <v-textarea placeholder="Характер" rows="1" auto-grow hide-details
                                :value="getFluff('personality')" @input="value => onInput('personality', value)" />

                              <v-textarea placeholder="Мировоззрение" rows="1" auto-grow hide-details
                                :value="getFluff('alignment')" @input="value => onInput('alignment', value)" />

                              <v-textarea placeholder="Убеждения" rows="1" auto-grow hide-details
                                :value="getFluff('beliefs')" @input="value => onInput('beliefs', value)" />

                              <v-divider class="my-3" />

                              <v-textarea placeholder="Возраст" rows="1" auto-grow hide-details :value="getFluff('age')"
                                @input="value => onInput('age', value)" />

                              <v-textarea placeholder="Рост" rows="1" auto-grow hide-details :value="getFluff('height')"
                                @input="value => onInput('height', value)" />

                              <v-textarea placeholder="Вес" rows="1" auto-grow hide-details :value="getFluff('weight')"
                                @input="value => onInput('weight', value)" />

                              <v-textarea placeholder="Пол" rows="1" auto-grow hide-details :value="getFluff('gender')"
                                @input="value => onInput('gender', value)" />

                              <v-divider class="my-3" />

                              <v-textarea placeholder="Фракция" rows="1" auto-grow hide-details
                                :value="getFluff('faction')" @input="value => onInput('faction', value)" />

                              <v-textarea placeholder="Этнос" rows="1" auto-grow hide-details
                                :value="getFluff('ethnicity')" @input="value => onInput('ethnicity', value)" />

                              <v-textarea placeholder="Национальность" rows="1" auto-grow hide-details
                                :value="getFluff('nationality')" @input="value => onInput('nationality', value)" />

                              <v-textarea placeholder="Место рождения" rows="1" auto-grow hide-details
                                :value="getFluff('birthplace')" @input="value => onInput('birthplace', value)" />
                            </v-card>
                          </v-tab-item>

                          <!-- ORGANIZED PLAY -->
                          <v-tab-item>
                            <v-card flat>
                              <v-textarea label="Organized Play ID" dense />

                              <v-row>
                                <v-col>
                                  <v-textarea label="Faction" dense />
                                </v-col>
                                <v-col cols="4">
                                  <v-textarea label="Rep" dense />
                                </v-col>
                              </v-row>

                              <v-divider class="my-3" />

                              <div class="d-flex justify-space-between align-center">
                                <span class="text-subtitle-1">Adventures</span>
                                <v-btn small outlined>Add</v-btn>
                              </div>

                              <v-row class="text-center mt-2">
                                <v-col>
                                  <div>Lvl</div>
                                  <v-chip>1</v-chip>
                                </v-col>
                                <v-col>
                                  <div>XP</div>
                                  <v-chip>0</v-chip>
                                </v-col>
                                <v-col>
                                  <div>GP</div>
                                  <v-chip>0</v-chip>
                                </v-col>
                                <v-col>
                                  <div>Rep</div>
                                  <v-chip>0</v-chip>
                                </v-col>
                              </v-row>
                            </v-card>
                          </v-tab-item>
                        </v-tabs-items>
                      </v-card>
                    </v-col>

                    <!-- RIGHT COLUMN -->
                    <v-col cols="12" md="6">
                      <!-- Languages -->
                      <v-card class="pa-3 mb-3" outlined>
                        <div class="text-h6 mb-2">Языки</div>
                        <v-chip v-for="language in languages" class="ma-1">{{ language.name }}</v-chip>

                      </v-card>

                      <!-- Traits -->
                      <v-card class="pa-3 mb-3" outlined>
                        <div class="text-h6 mb-2">Трейты</div>
                        <v-chip class="ma-1" v-for="trait in keywords" :key="trait.name">{{ trait.name }}</v-chip>

                      </v-card>

                      <!-- Size -->
                      <v-card class="pa-3 mb-3" outlined>
                        <div class="text-h6 mb-2">Размер</div>
                        <v-chip v-if="characterSpecies">{{ size(characterSpecies.size) }}</v-chip>
                      </v-card>

                      <!-- Proficiencies -->
                      <v-card class="pa-3" outlined>
                        <div class="text-h6 mb-2">Владения</div>

                        <v-expansion-panels>
                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              Атаки
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-list dense>
                                <v-list-item v-for="item1 in WeaponRepository" :key="item1.key"
                                  v-if="skillAttack[item1.key]">

                                  <v-list-item-content v-if="skillAttack[item1.key]">{{ item1.name }}

                                  </v-list-item-content>
                                  <v-chip v-if="skillAttack[item1.key]" small
                                    :color="getClassChipColor(skillAttack[item1.key])" dark>
                                    {{
                                      characterlabel(skillAttack[item1.key]) }}</v-chip>
                                </v-list-item>
                              </v-list>
                            </v-expansion-panel-content>
                          </v-expansion-panel>

                          <v-expansion-panel>
                            <v-expansion-panel-header>
                              Защиты
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-list dense>
                                <v-list-item v-for="item1 in DefenceRepository" :key="item1.key"
                                  v-if="skillDefence[item1.key]">

                                  <v-list-item-content v-if="skillDefence[item1.key]">{{ item1.name }}

                                  </v-list-item-content>
                                  <v-chip v-if="skillDefence[item1.key]" small
                                    :color="getClassChipColor(skillDefence[item1.key])" dark>
                                    {{
                                      characterlabel(skillDefence[item1.key]) }}</v-chip>
                                </v-list-item>
                              </v-list>
                            </v-expansion-panel-content>
                          </v-expansion-panel>

                          <v-expansion-panel v-if="
                            characterArchetype && characterArchetype.spellProgression
                          ">
                            <v-expansion-panel-header>
                              Заклинанательская Сложность
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-list dense>

                                <v-list-item>
                                  <v-list-item-content>Сложность заклинаний</v-list-item-content>
                                  <span>{{ ModAttributeClassSpell() }}</span>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content>Атака заклинанием</v-list-item-content>
                                  <span>+{{ ModAttributeAttackSpell() }}</span>
                                </v-list-item>
                              </v-list>
                            </v-expansion-panel-content>
                          </v-expansion-panel>

                          <v-expansion-panel v-if="
                            characterArchetype
                          ">
                            <v-expansion-panel-header>
                              Сложность Класса
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                              <v-list dense>
                                <v-list-item>
                                  <v-list-item-content>Сложность Класса</v-list-item-content>
                                  <span>{{ ModAttributeClass() }}</span>
                                </v-list-item>
                              </v-list>
                            </v-expansion-panel-content>
                          </v-expansion-panel>

                        </v-expansion-panels>


                      </v-card>
                    </v-col>
                  </v-row>



                </div>
              </v-tab-item>

              <v-tab-item class="my-tab-item" key="notes" :value="`tab-notes`">

                <!-- <div class="mb-2 d-block">{{ field.label }}</div> -->
                <div class="notes-wrapper">

                  <!-- LEFT: список -->
                  <div class="notes-sidebar">

                    <v-btn small block color="primary" @click="createNote">
                      + Добавить
                    </v-btn>

                    <v-dialog v-model="settingsDialog" max-width="500">
                      <v-card class="pa-4">

                        <!-- TITLE -->
                        <v-text-field v-model="editNote.title" label="Заголоваок" dense outlined class="mb-3" />

                        <!-- ICON + COLOR -->
                        <div class="d-flex align-center mb-4">

                          <!-- ICON -->
                          <v-menu v-model="iconPicker" offset-y>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon large v-bind="attrs" v-on="on">
                                <v-icon>{{ editNote.icon || 'mdi-notebook' }}</v-icon>
                              </v-btn>
                            </template>

                            <v-card style="max-width: 240px">
                              <div class="d-flex flex-wrap pa-2">

                                <v-btn v-for="icon in icons" :key="icon" icon @click="selectIcon(icon)">
                                  <v-icon>{{ icon }}</v-icon>
                                </v-btn>

                              </div>
                            </v-card>
                          </v-menu>

                          <!-- COLOR -->
                          <v-menu v-model="colorPicker" offset-y>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on">
                                <div :style="{
                                  width: '20px',
                                  height: '20px',
                                  borderRadius: '4px',
                                  background: editNote.color || '#ccc',
                                  border: '1px solid #ddd'
                                }" />
                              </v-btn>
                            </template>

                            <v-card class="pa-2" style="max-width: 220px">
                              <div class="d-flex flex-wrap">

                                <div v-for="color in colors" :key="color" @click="selectColor(color)" :style="{
                                  width: '24px',
                                  height: '24px',
                                  margin: '4px',
                                  borderRadius: '6px',
                                  background: color,
                                  cursor: 'pointer',
                                  border: editNote.color === color ? '2px solid black' : '1px solid #ddd'
                                }" />

                              </div>
                            </v-card>
                          </v-menu>

                        </div>

                        <!-- ACTIONS -->
                        <div class="d-flex justify-space-between">

                          <!-- DELETE -->
                          <v-btn color="red" text @click="deleteNote(editNote.id)">
                            Удалить Заметку
                          </v-btn>

                          <!-- RIGHT SIDE -->
                          <div>
                            <v-btn text @click="settingsDialog = false">
                              Отмена
                            </v-btn>

                            <v-btn color="primary" @click="saveNoteSettings">
                              Обновление
                            </v-btn>
                          </div>

                        </div>

                      </v-card>
                    </v-dialog>

                    <div class="notes-list">
                      <div v-for="note in notes" :key="note.id" class="note-item" :style="getNoteStyle(note)"
                        :class="{ active: note.id === activeNoteId }" @click="selectNote(note.id)">

                        <div class="note-title">
                          <v-icon>{{ note.icon || 'mdi-notebook' }} </v-icon> {{ note.title || 'Без имени' }}
                        </div>
                      </div>

                    </div>


                  </div>

                  <!-- RIGHT: editor -->
                  <div class="notes-editor">

                    <div v-if="activeNote">


                      <!-- TOOLBAR -->
                      <div class="tiptap-toolbar mb-2">
                        <v-menu offset-y>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn small icon v-bind="attrs" v-on="on">
                              <img src="/img/icon/action_single.png" :class="{ 'action-icon': !$vuetify.theme.dark }" />
                            </v-btn>
                          </template>

                          <v-list dense>
                            <v-list-item @click="insertAction1('1')">
                              <img src="/img/icon/action_single.png" :class="{ 'action-icon': !$vuetify.theme.dark }" />
                            </v-list-item>

                            <v-list-item @click="insertAction1('2')">
                              <img src="/img/icon/action_double.png" :class="{ 'action-icon': !$vuetify.theme.dark }" />
                            </v-list-item>

                            <v-list-item @click="insertAction1('3')">
                              <img src="/img/icon/action_triple.png" :class="{ 'action-icon': !$vuetify.theme.dark }" />
                            </v-list-item>

                            <v-divider />

                            <v-list-item @click="insertAction1('reaction')">
                              <img src="/img/icon/action_reaction.png"
                                :class="{ 'action-icon': !$vuetify.theme.dark }" />
                            </v-list-item>

                            <v-list-item @click="insertAction1('free')">
                              <img src="/img/icon/action_free.png" :class="{ 'action-icon': !$vuetify.theme.dark }" />
                            </v-list-item>
                          </v-list>
                        </v-menu>

                        <v-btn small icon @click="editor && editor.chain().focus().toggleBold().run()"
                          :class="{ 'primary--text': editor && editor.isActive('bold') }">
                          <v-icon>format_bold</v-icon>
                        </v-btn>

                        <v-btn small icon @click="editor && editor.chain().focus().toggleItalic().run()"
                          :class="{ 'primary--text': editor && editor.isActive('italic') }">
                          <v-icon>format_italic</v-icon>
                        </v-btn>

                        <v-btn small icon @click="editor && editor.chain().focus().toggleStrike().run()"
                          :class="{ 'primary--text': editor && editor.isActive('strike') }">
                          <v-icon>strikethrough_s</v-icon>
                        </v-btn>

                        <v-btn small icon @click="editor && editor.chain().focus().toggleBulletList().run()"
                          :class="{ 'primary--text': editor && editor.isActive('bulletList') }">
                          <v-icon>format_list_bulleted</v-icon>
                        </v-btn>

                        <v-btn small icon @click="editor && editor.chain().focus().toggleOrderedList().run()"
                          :class="{ 'primary--text': editor && editor.isActive('orderedList') }">
                          <v-icon>format_list_numbered</v-icon>
                        </v-btn>
                        <v-spacer />
                        <v-btn right small icon @click="openNoteSettings(activeNote)">
                          <v-icon>settings</v-icon>
                        </v-btn>
                      </div>

                      <!-- EDITOR -->
                      <EditorContent :editor="editor" class="tiptap-editor"
                        :class="{ 'is-dark': $vuetify.theme.dark }" />

                    </div>

                    <div v-else class="empty-state">
                      Выбери или создай заметку
                    </div>

                  </div>

                </div>

              </v-tab-item>
            </v-tabs>
          </v-card>

          <v-dialog v-model="dialog" max-width="800px">
            <v-card v-if="selectedItem">
              <!-- <v-card-title>
          <h2>{{ selectedItem.name }}</h2>
        </v-card-title> -->
              <v-card-text>
                <v-row class="rowFeat">
                  <div class="head">
                    <h1>{{ selectedItem.name }}</h1>
                  </div>
                  <div class="line"></div>
                  <div class="tag" v-if="selectedItem.ritual">
                    Ритуал {{ selectedItem.level }}
                  </div>
                  <div class="tag" v-if="!selectedItem.ritual">
                    Заклинание {{ selectedItem.level }}
                  </div>
                </v-row>
                <v-row>
                  <div>
                    <trait-view v-if="selectedItem.traits" :item="selectedItem" class="mb-2" />
                  </div>
                </v-row>
                <p></p>
                <!-- Описание закла -->
                <div v-if="selectedItem.traditions">
                  <p class="main-holder" v-if="selectedItem.traditions.length > 0">
                    <strong>Традиция:</strong>
                    {{ selectedItem.traditions.join(", ") }}
                  </p>
                </div>
                <div v-if="selectedItem.ritual">
                  <p class="main-holder" v-if="selectedItem.ritual.primary">
                    <strong>Первичный кастер:</strong>
                    {{ selectedItem.ritual.primary.check }}
                  </p>

                  <p class="main-holder" v-if="selectedItem.ritual.secondary">
                    <strong>Вторичные кастеры:</strong>
                    {{ selectedItem.ritual.secondary.casters }}
                    ( {{ selectedItem.ritual.secondary.checks }} )
                  </p>
                </div>
                <p></p>
                <div v-if="selectedItem.time">
                  <p class="main-holder" v-if="!selectedItem.ritual">
                    <strong>Сотворение:</strong>
                    <img :src="iconAction(selectedItem?.time?.value)"
                      :class="{ 'invert-icon': !$vuetify.theme.dark }" />
                  </p>
                  <p class="main-holder" v-if="selectedItem.ritual">
                    <strong>Сотворение:</strong> {{ selectedItem?.time?.value }}
                  </p>
                </div>
                <div v-if="selectedItem.cost">
                  <p class="main-holder" v-if="selectedItem.cost.value">
                    <strong>Стоимость:</strong>
                    {{ selectedItem.cost.value }}
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
                    <strong>Область:</strong>
                    {{ selectedItem?.area?.value }}-фут.
                    {{ areaRepository[selectedItem?.area?.type] }}
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

                    <span v-if="selectedItem?.defense?.save">
                      <span v-if="selectedItem?.defense?.save?.basic">Базовый
                      </span>
                      {{
                        SavingRepository.find(
                          (t) =>
                            t.key === selectedItem?.defense?.save?.statistic
                        ).name
                      }}
                    </span>

                    <span v-if="selectedItem?.traits?.includes('атака')">
                      <span>КБ </span>
                    </span>
                  </p>
                </div>
                <div v-if="selectedItem.duration">
                  <p class="main-holder" v-if="selectedItem.duration.value">
                    <strong>Длительность:</strong>
                    <span v-if="selectedItem.duration.sustained === true">Поддерживаемое до
                    </span>
                    {{ selectedItem.duration.value }}
                  </p>
                </div>
                <p></p>
                <div>
                  <p class="main-holder" v-if="selectedItem.Power">
                    <strong>Урон на этом уровне:</strong>
                    <span v-html="selectedItem.Power"></span>
                  </p>
                </div>
                <p></p>
                <div class="line"></div>
                <div class="pt-4 pb-2" v-html="selectedItem.description"></div>
                <div class="line"></div>
                <div class="pt-4 pb-2" v-html="selectedItem.powerDescription"></div>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click="dialog = false">Закрыть</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogItem" max-width="1000px">
            <v-card>
              <CardItem :item="selectedItem" :wargearPrice="wargearPrice" />
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogAction" max-width="1000px">
            <v-card>
              <CardItem :item="selectedAction" />
            </v-card>
          </v-dialog>

          <!-- <v-dialog v-model="dialogAction" max-width="800px">
            <v-card class="glass-card pa-4">
              <v-card-title class="headline">
                {{ selectedAction?.name }}
              </v-card-title>
              <v-card-text>
                <v-row>
                  <div>
                    <trait-view v-if="selectedAction" :item="selectedAction" class="mb-2" />
                  </div>
                </v-row>
                <div class="pt-4 pb-2" v-html="selectedAction?.description"></div>
                <p><strong>Category:</strong> {{ selectedAction?.category }}</p>
                <p v-if="selectedAction?.requirements">
                  <strong>Requirements:</strong>
                  {{ selectedAction.requirements }}
                </p>
                <p v-if="selectedAction?.source">
                  <strong>Source:</strong> {{ selectedAction.source }}
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="grey" @click="dialogAction = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script lang="js">
import BackgroundRepositoryMixin from '~/mixins/BackgroundRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import SluggerMixin from '~/mixins/SluggerMixin';
import WargearTraitRepositoryMixin from '~/mixins/WargearTraitRepositoryMixin';
import MutationsMixin from '~/mixins/MutationsMixin';
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';
import DodCorruptionManager from '~/components/forge/DodCorruptionManager';
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';
import GridSheet from '~/components/forge/sheetGrid';
import { marked } from 'marked';
import traitView from '~/components/TraitView';
import NotesApp from '~/components/NotesApp.vue';

//Для Оформления Верхней части:
import StatGroup from '~/components/forge/StatGroup.vue';
import AppIcon from '~/components/forge/Icon.vue';
import StatusChip from '~/components/forge/StatusChip.vue';
import StatIconNumber from '~/components/forge/StatIconNumber.vue';
import CharacterAttributesCard from '~/components/forge/character/CharacterAttributesCard.vue';
import CharacterHitPointsCard from '~/components/forge/character/CharacterHPCard.vue';
import CharacterStatusCard from '~/components/forge/character/CharacterStatusCard.vue';
import CharacterHeaderCard from '~/components/forge/character/CharacterHeaderCard.vue';
import CharacterArmorCard from '~/components/forge/character/CharacterArmorCard.vue';
import CharacterSpeedCard from '~/components/forge/character/CharacterSpeedCard.vue';
import ActionPanels from '~/components/forge/character/ActionPanels.vue';
import SkillsTable from '~/components/forge/character/SkillsTable.vue';
import WeaponsTable from '~/components/forge/wargear/WeaponsTable.vue';
import ArmorTable from '~/components/forge/wargear/ArmorTable.vue';
import GearTable from '~/components/forge/wargear/GearTable.vue';
import ConsumableTable from '~/components/forge/wargear/ConsumableTable.vue';
import TreasureTable from '~/components/forge/wargear/TreasureTable.vue';
import WargearHeader from '~/components/forge/wargear/WargearHeader.vue';
import TalentsCard from '~/components/forge/character/TalentsCard.vue';
import CardItem from '@/components/CardItem.vue';
import PsychicPreview from "~/components/forge/PsychicPreview.vue";
import debounce from 'lodash.debounce'
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import { ActionIcon } from '../../../../components/forge/ActionIcon';
import AttributeTable from '../../../../components/forge/character/AttributeTable.vue';

export default {
  name: 'in-app-view',
  //layout: '',
  mixins: [
    BackgroundRepositoryMixin,
    StatRepositoryMixin,
    SluggerMixin,
    WargearTraitRepositoryMixin,
    KeywordRepository,
    MutationsMixin,
  ],
  components: {
    DodDefaultBreadcrumbs,
    DodCorruptionManager,
    GridSheet,
    traitView,
    NotesApp,
    StatGroup,
    AppIcon,
    StatusChip,
    StatIconNumber,
    CharacterAttributesCard,
    CharacterHitPointsCard,
    CharacterStatusCard,
    CharacterHeaderCard,
    CharacterSpeedCard,
    CharacterArmorCard,
    ActionPanels,
    SkillsTable,
    ArmorTable,
    WeaponsTable,
    GearTable,
    WargearHeader,
    TalentsCard,
    CardItem,
    PsychicPreview,
    EditorContent,
    AttributeTable,
    ConsumableTable,
    TreasureTable
  },
  extensions: [
    StarterKit,
  ],
  beforeDestroy() {
    this.editor.destroy()
  },

  props: [],
  head() {
    return {
      title: this.characterName,
    };
  },
  async asyncData({ params, $axios }) {

    const talentResponse = await $axios.get('/api/talents/');
    const traitsList = await $axios.get('/api/traits/');
    const psychicPowersResponse = await $axios.get('/api/psychic-powers/');
    const psychicAbilitiesResponse = await $axios.get('/api/psychic-powers/universal-abilities');
    const abilityAncestryResponse = await $axios.get('/api/abilityAncestry/');
    return {
      characterId: params.id,


      psychicPowersRepository: psychicPowersResponse.data,
      psychicAbilitiesRepository: psychicAbilitiesResponse.data,
      talentRepository: talentResponse.data.data,
      abilityRepository: abilityAncestryResponse.data,
      traitRepository: traitsList.data.map(t => ({
        ...t,
        key: t.key.toLowerCase()
      })),
      breadcrumbItems: [
        { text: '', nuxt: true, exact: true, to: '/' },
        { text: 'Билдодельня', nuxt: true, exact: true, to: '/forge/my-characters' },
        { text: 'Персонаж', nuxt: true, exact: true, to: `/forge/characters/${params.id}` },
      ],
    };
  },

  data() {
    return {
      statDialog: false,
      dialogComponent: null,
      dialogTitle: '',
      dialogStat: {
        open: false,
        type: null,
        title: '',
        payload: null
      },
      search: '',
      wargearList: [],
      settingsDialog: false,
      editNote: {},
      spell: "spell",
      iconPicker: false,
      icons: [
        'mdi-notebook',
        'mdi-book-open',
        'mdi-star',
        'mdi-heart',
        'mdi-sword',
        'mdi-shield',
        'mdi-fire',
        'mdi-lightning-bolt',
        'mdi-skull',
        'mdi-account',
        'mdi-map',
        'mdi-feather'
      ],
      colorPicker: false,
      colors: [
        '#F44336', '#E91E63', '#9C27B0', '#673AB7',
        '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
        '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
        '#FFC107', '#FF9800', '#FF5722', '#795548',
        '#607D8B'
      ],
      typeSpell: undefined,
      fluff: {},
      editor: null,   // 👈 сюда
      activeNoteId: null,
      currencies: [
        { name: 'Platinum', value: "pp", icon: 'platinum.png' },
        { name: 'Gold', value: "gp", icon: 'gold.png' },
        { name: 'Silver', value: "sp", icon: 'silver.png' },
        { name: 'Copper', value: "cp", icon: 'copper.png' }
      ],

      maxBullets: 10,      // размер обоймы
      currentBullets: 5,    // текущее количество патронов
      attributeHeaders: [
        { text: 'Название', sortable: false, align: 'left', class: 'text-left small pa-1' },
        { text: 'Сокращение', sortable: false, align: 'center', class: 'text-center small pa-1' },
        { text: 'Значение', sortable: false, align: 'right', class: 'text-center small pa-1' },
        { text: 'Модификатор', sortable: false, style: 'center', class: 'text-center small pa-1' },
      ],
      traitHeaders: [
        { text: 'Trait', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Rating', sortable: false, align: 'center', class: 'small pa-1' },
      ],
      skillHeaders: [
        { text: 'Навык', value: 'name', sortable: false, align: 'left', class: 'text-left small pa-1' },
        { text: 'Владение', value: 'rating', sortable: false, align: 'center', class: 'text-center small pa-1' },
        { text: 'Значение', value: 'value', sortable: false, align: 'center', class: 'text-center small pa-1' },
      ],

      armorHeaders: [
        { text: 'Название', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Группа доспеха', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Вес', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Категория', sortable: false, align: 'center', class: 'small pa-1' },
        // { text: 'Руки', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Трейты', sortable: false, align: 'left', class: 'small pa-1' },
        {
          text: 'Надетое',
          value: 'view',
          sortable: false, class: 'small pa-1'
        },
        {
          text: '',
          value: 'view',
          sortable: false, class: 'small pa-1'
        },
      ],
      weaponHeaders: [
        { text: 'Название', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Группа оружия', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Попадание', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Урон', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Категория', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Руки', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Трейты', sortable: false, align: 'left', class: 'small pa-1' },
        {
          text: '',
          value: 'view',
          sortable: false, class: 'small pa-1'
        },
      ],
      gearHeaders: [
        { text: 'Название', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Вес', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Трейты', sortable: false, align: 'center', class: 'small pa-1' },
        {
          text: '',
          value: 'view',
          sortable: false, class: 'small pa-1'
        },
      ],
      psychicPowersHeaders: [
        {
          text: 'Сотв.',
          value: 'cast',
          align: 'center',
          sortable: false, class: 'small pa-1'
          , width: '50px'
        },
        {
          text: 'Название',
          value: 'name',
          align: 'center',
          sortable: true, class: 'small pa-1'
          , width: '200px'
        },
        {
          text: 'Действия',
          value: 'action',
          align: 'center',
          sortable: true, class: 'small pa-1'
          , width: '80px'
        },
        {
          text: 'Длительность',
          value: 'duration',
          align: 'center',
          sortable: true, class: 'small pa-1'
          , width: '150px'
        },
        {
          text: 'Дистанция',
          value: 'range',
          align: 'center',
          sortable: false, class: 'small pa-1'
          , width: '100px'
        },
        {
          text: 'Защита',
          value: 'saving',
          align: 'center',
          sortable: false, class: 'small pa-1'
          , width: '80px'
        },
        {
          text: 'Область/цель',
          value: 'area',
          align: 'center',
          sortable: false, class: 'small pa-1'
          , width: '150px'
        },
        {
          text: '',
          value: 'view',
          sortable: false, class: 'small pa-1'
          , width: '120px'
        },
        {
          text: '',
          value: 'button',
          sortable: false, class: 'small pa-1'
          , width: '120px'
        },
      ],
      editingHp: false,
      crossedRows: [],
      descriptionSection: { selection: 'all' },
      abilitySection: { filter: 'all' },
      wargearSection: { filter: 'all' },
      currentHP: 0,
      debouncers: {},
      selectedPsychic: undefined,
      psychicDialog: false,
      cellSpell: undefined,
      rankSpell: undefined,
      levelSpell: undefined,
      tempHP: 0,
      loading: false,
      selectedItem: undefined,
      selectedAction: undefined,
      dialogAction: false,
      //
      showContextDialog: false,
      contextDialogComponent: undefined,
      contextDialogTraitKey: undefined,
      statusDialog: false,
      //
      objectiveEditorShow: false,
      objectiveEditorValue: '',
      //
      characterNotesShowEditor: false,
      characterNotesEditorModel: '',
      //
      skillsEditorDialog: false,
      keywordsEditorDialog: false,
      showCorruptionManagerDialog: false,
      // activeStatuses: [],

      statusEffects: [],
      customSkill: {
        key: undefined,
        name: 'Custom Skill',
        attribute: '',
        description: '',
      },
      SkillsTrained: {
        U: 0,
        T: 2,
        E: 4,
        M: 6,
        L: 8,
      },
      statusSearch: '',
      tab: 0,
      dialog: false,
      dialogItem: false,
      dialogFeat: false,
      customKeyword: {
        key: undefined,
        name: 'Custom Keywords',
        description: '',
      },
      keywordFormValid: true,
      //
      characterSpecies: undefined,
      characterArchetype: undefined,
      characterHeritage: undefined,
      ascensionPackagesRepository: undefined,
      wargearRepository: undefined,
      abilityList: undefined,
      actionList: undefined,
      psychicPowersList: undefined,

    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, ActionIcon],
      content: '',

      onUpdate: ({ editor }) => {
        this.localContent = editor.getHTML()
        this.saveDebounced()
      }
    })
  },
  computed: {
    //---------------------------
    notes() {
      return this.$store.getters['characters/characterFluffNotesById'](this.characterId)
    },
    activeNoteTitle() {
      return this.activeNote?.title || ''
    },
    activeNote() {

      return this.notes.find(n => n.id === this.activeNoteId)
    },
    //Переделанное
    leftSections() {
      return this.buildSections([
        'general',
        'class',
        'ancestry'
      ])
    },

    notes() {
      return this.$store.getters['characters/characterFluffNotesById'](this.characterId)
    },
    rightSections() {
      return this.buildSectionsAb([
        'archetype',
        'species'
      ])
    },
    reflexSave() {
      return this.ModAttributeSavingWithStatuses("dexterity", "reflex")
    },
    fortitudeSave() {
      return this.ModAttributeSavingWithStatuses("constitution", "fortitude")
    },
    willSave() {
      return this.ModAttributeSavingWithStatuses("wisdom", "will")
    },
    perception() {
      return this.ModAttributePerceptionWithStatuses("", "")
    },
    armorClass() {
      return this.characterArmor()
    },
    //---------------------------

    groupedTalents() {
      const map = new Map()

      for (const t of this.talents || []) {
        const key = t.type || "other"

        if (!map.has(key)) {
          map.set(key, {
            type: key,
            label: this.talentTypeLabel?.(key) || key,
            items: []
          })
        }

        map.get(key).items.push(t)
      }

      return Array.from(map.values())
    },
    groupedFeats() {
      const result = {}

      this.talents.forEach(feat => {
        const category = feat.category || 'other'
        const level = feat.level || '0'

        if (!result[category]) {
          result[category] = {}
        }

        if (!result[category][level]) {
          result[category][level] = []
        }

        result[category][level].push(feat)
      })

      return result
    },

    //---------------------------
    // Статусы
    availableStatuses() {
      return this.statusRepository;
    },
    filteredStatuses() {
      if (!this.statusSearch) return this.statusRepository;

      const search = this.statusSearch.toLowerCase();
      return this.statusRepository.filter(status =>
        status.name.toLowerCase().includes(search) ||
        status.description.toLowerCase().includes(search)
      );
    },

    // Модифицированные характеристики с учетом состояний
    characterAttributesWithStatuses() {
      const baseAttributes = { ...this.characterAttributes };
      // this.activeStatuses.forEach(status => {
      //   this.applyStatusEffect(status, baseAttributes);
      // });
      return baseAttributes;
    },

    // Модифицированные навыки с учетом состояний
    skillsWithStatuses() {
      const baseSkills = this.skills;
      return baseSkills.map(skill => {
        const modifiedSkill = { ...skill };
        this.activeStatuses.forEach(status => {
          this.applyStatusEffects(status, modifiedSkill);
        });
        return modifiedSkill;
      });
    },

    //---------------------------
    // Данные для  источников
    sources() {
      return [
        'playerCore',
        'playerCore2',
        // 'tnh',
        ...this.settingHomebrews
      ];
    },
    skillAttack() {
      return this.$store.getters['characters/characterskillAttackById'](this.characterId);
    },
    characterResistance() {
      return this.$store.getters['characters/characterResistanceById'](this.characterId);
    },

    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    characterName() {
      return this.$store.getters['characters/characterNameById'](this.characterId);
    },

    characterSettingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterRank() {
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    activeStatuses() {
      return this.$store.getters['characters/characterStatusById'](this.characterId);
    },
    campaignCustomXp() {
      return this.$store.getters['characters/characterCampaignCustomXpById'](this.characterId);
    },
    speciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    heritageKey() {
      return this.$store.getters['characters/characterHeritageKeyById'](this.characterId);
    },

    heritageLabel() {
      return this.$store.getters['characters/characterHeritageLabelById'](this.characterId);
    },
    speciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    characterTalents() {
      return this.$store.getters['characters/characterTalentsById'](this.characterId);
    },
    characterMutations() {
      return this.$store.getters['characters/characterMutationsById'](this.characterId);
    },
    archetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    archetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    backgroundLabel() {
      return this.$store.getters['characters/characterAscensionLabelById'](this.characterId);
    },
    characterSpont() {
      return this.$store.getters['characters/characterSpellsSpontaneousById'](this.characterId);
    },
    characterFactionKey() {
      return this.$store.getters['characters/characterFactionKeyById'](this.characterId);
    },
    characterBackgroundKey() {
      return this.$store.getters['characters/characterBackgroundKeyById'](this.characterId);
    },
    characterAscensionPackages() {
      return this.$store.getters['characters/characterAscensionPackagesById'](this.characterId);
    },
    characterWearWargear() {
      return this.$store.getters['characters/characterWearById'](this.characterId);
    },
    characterWearShield() {
      return this.$store.getters['characters/characterWearShieldById'](this.characterId);
    },
    charactermodificatorsBonus() {
      return this.$store.getters['characters/charactermodificatorsBonusById'](this.characterId);
    },


    keywordStrings() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.characterId);
    },
    characterHitPoints() {
      return this.$store.getters["characters/characterHitPointsById"](
        this.characterId
      );
    },
    characterPerseption() {
      return this.$store.getters["characters/characterPerseptionById"](
        this.characterId
      );
    },
    skillDefence() {
      return this.$store.getters["characters/characterskillDefenceById"](
        this.characterId
      );
    },
    characterSpeed() {
      let status = 0
      this.activeStatuses.forEach(effect => {
        if (effect && effect.rules) {
          if (effect.rules.find(s => s.selector))
            if (effect.rules.find(s => s.key === 'FlatModifier')) {
              const att = effect.rules.find(s => s.selector).selector.filter(s => s.slice(3) === '-based' || s === 'speeds' || s === 'skill-check').map(s => s.slice(0, 3));


              if (att.find(s => s === att.find(s => s === 'spe')))
                if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
                  status = effect.value
                else
                  status = -effect.rules.find(s => s.key === 'FlatModifier').value;

            }
        }
      })

      // Получаем speed из store
      const originalSpeed = this.$store.getters["characters/characterSpeedById"](this.characterId);

      // Создаем копию объекта, чтобы не мутировать store
      const speed = { ...originalSpeed };

      Object.keys(speed).forEach(key => {
        speed[key] = speed[key] - status; // чтобы не стало отрицательным
      });


      return speed
    },
    characterAttributes() {
      return this.$store.getters["characters/characterAttributesById"](
        this.$route.params.id
      );
    },

    keywords() {
      const enrichedKeywords = [];
      const characterKeywords = this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
      if (characterKeywords) {
        characterKeywords.forEach(charKeyword => {
          const keyword = {
            name: charKeyword?.replacement || charKeyword.name,
            type: null,
            source: charKeyword.source,
            description: 'Alright then, keep your secrets.',
            custom: charKeyword?.custom || false,
          };
          const k = this.keywordCombinedRepository.find(i => i.name === keyword.name);
          keyword.description = k?.description || charKeyword.description;
          keyword.type = k?.type || 'Custom';
          enrichedKeywords.push(keyword);
        });
      }
      return enrichedKeywords;
    },
    languages() {
      return this.$store.getters['characters/characterLanguagesById'](this.characterId);
    },
    characterHeroPoints() {
      return this.$store.getters['characters/characterHeroPointsById'](this.characterId);
    },
    avatar() {
      const customAvatarUrl = this.$store.getters['characters/characterAvatarUrlById'](this.characterId);

      if (customAvatarUrl) {
        return customAvatarUrl;
      }

      if (this.archetypeKey !== undefined) {
        if (!['core-ratling', 'core-ogryn'].includes(this.speciesKey)) {
          return `/img/avatars/archetype/${this.archetypeKey}.png`;
        }
      }

      if (this.speciesKey !== undefined) {
        return `/img/avatars/species/${this.speciesKey}.png`;
      }

      return '/img/avatars/species/playercore-human.png';
    },

    characterAttributesEnhanced() {
      let enhancedAttributes = this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
      return enhancedAttributes;
    },
    getMoney() {
      return this.$store.getters['characters/characterMoneyById'](this.characterId);
    },
    attributes() {

      const characterAttributes = this.$store.getters['characters/characterAttributesById'](this.characterId);
      let attributes = this.attributeRepository.map((repositoryAttribute) => {
        return {
          ...repositoryAttribute,
          value: characterAttributes[repositoryAttribute.key],
          enhancedValue: parseInt(this.characterAttributesEnhanced[repositoryAttribute.key]),
          rating: characterAttributes[repositoryAttribute.key],
          adjustedRating: parseInt(characterAttributes[repositoryAttribute.key]),
          adjustment: 0,
          short: repositoryAttribute.short,
          mod: (characterAttributes[repositoryAttribute.key] - 10) / 2,
          modifiers: [],
          conditionalAdjustment: 0,
        };
      });


      this.activeStatuses.forEach(status => {
        const effect = this.statusEffects[status.key];
        if (effect && effect.type === 'attribute') {
          const attr = attributes.find(a => a.key === effect.target);
          if (attr) {
            attr.adjustment += effect.value;
            attr.adjustedRating += effect.value;
            attr.modifiers.push(`${effect.value} • ${status.name}`);
          }
        }
      });


      return attributes;
    },

    /**
     *
     * @returns [{Talents}]
     */
    traits() {
      const characterTraits = this.$store.getters['characters/characterTraitsById'](this.characterId);
      const traitsEnhanced = this.$store.getters['characters/characterTraitsEnhancedById'](this.characterId);
      const attributes = this.attributes;

      let finalTraits = this.traitRepository.map((t) => {

        let baseTraitValue = 0;

        let relatedAttribute = attributes.find((attribute) => attribute.name === t.attribute);



        const aggregatedTrait = {
          ...t,
          value: enhancedValue,
          enhancedValue: enhancedValue,
          rating: enhancedValue,
          adjustedRating: enhancedValue,
          adjustment: 0,
          conditionalAdjustment: 0,
          baseHelp: `Base = ${baseTraitValue}`,
          baseTraitValue: baseTraitValue,
          modifiers: [],
        };

        return aggregatedTrait;
      });


      return finalTraits;
    },
    groupedTraits() {
      return [
        // ...this.traits.filter((i) => i.type === 'Combat'),
        // ...this.traits.filter((i) => i.type === 'Mental'),
        // ...this.traits.filter((i) => i.type === 'Social'),
      ];
    },
    bulkCount() {
      let Sum = 0;
      let SumL = 0;
      this.charGear.forEach(item => {
        if (item.bulk && item.bulk?.value >= 1)
          Sum = Sum + (item.bulk ? item.bulk.value : 0) * item.qty;
        else
          SumL = SumL + 1 * item.qty;

        // Sum = Sum + (SumL >= 10 ? 1 : 0)
        // SumL = SumL - (SumL >= 10 ? 10 : 0)
      })

      const carry = Math.floor(SumL / 10)

      Sum += carry
      SumL = SumL % 10

      return Sum + " + " + (SumL === 0 ? "" : SumL + "Л");
    },
    characterReloads() {
      const spend = this.$store.getters['characters/characterReloadsSpendById'](this.characterId);
      let points = 3;
      this.wargear.forEach((w) => {
        points += w.key === 'core-ammo-backpack' ? 10 : 0;
        points += w.key === 'core-bandolier' ? 2 : 0;
        points += w.key === 'core-ammo-drum' ? 1 : 0;
      });

      return { points, spend };
    },
    characterFaith() {
      //const points = this.$store.getters['characters/characterFaithPointsById'](this.characterId);
      const spend = this.$store.getters['characters/characterFaithSpendById'](this.characterId);

      let points = 0;
      // this.enhancements
      //     .filter((enhancement) => enhancement.targetGroup==='resources')
      //     .filter((enhancement) => enhancement.targetValue==='faith')
      //     .forEach((enhancement) => {
      //       points += enhancement.modifier;
      //     });

      return { points, spend };
    },
    skills() {
      const customSkills = this.$store.getters['characters/characterCustomSkillsById'](this.characterId);

      const adHocSkillRepository = [
        ...this.skillRepository,
        ...customSkills,
      ];

      const characterSkills = this.$store.getters['characters/characterSkillsById'](this.characterId);
      const characterAttributes = this.attributeRepository;

      let skills = adHocSkillRepository.map((repositorySkill) => {
        const skill = {
          ...repositorySkill,
          value: characterSkills[repositorySkill.key],
          enhancedValue: parseInt(characterSkills[repositorySkill.key]),
          rating: characterSkills[repositorySkill.key],
          adjustedRating: parseInt(characterSkills[repositorySkill.key]),
          adjustment: 0,
          conditionalAdjustment: 0,
          attributeName: characterAttributes.find((a) => a.key === repositorySkill.attribute).name,
          dnPenalty: 0,
          modifiers: [],
          adjustedAttributeValue: 0,
          attributeObject: {},
        };
        const attribute = this.attributes.find((a) => a.name === skill.attribute);

        // Добавим модификаторы от состояний
        // this.statusRepository.forEach(status => {
        //   const effect = this.activeStatuses[status.key];
        //   if (effect) {
        //     // Логика применения эффектов к навыкам
        //     skill.modifiers.push(`${effect.value} • ${status.name}`);
        //   }
        // });

        this.activeStatuses.forEach(effect => {
          if (effect && effect.rules) {
            if (effect.rules.find(s => s.selector))
              if (effect.rules.find(s => s.key === 'FlatModifier')) {
                const att = effect.rules.find(s => s.selector).selector.filter(s => s.slice(3) === '-based' || s === 'all' || s === 'skill-check').map(s => s.slice(0, 3));


                if (att.find(s => s === skill.attribute.slice(0, 3)) || att.find(s => s === 'all') || att.find(s => s === 'ski'))
                  if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
                    skill.conditionalAdjustment = effect.value
                  else
                    skill.conditionalAdjustment = -effect.rules.find(s => s.key === 'FlatModifier').value;

              }
          }
        })

        return skill;
      });

      return skills;
    },

    characterEnhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },
    characterSaving() {
      return this.$store.getters["characters/characterSavingById"](
        this.characterId
      );
    },

    /**
     * Enriched enhancements, gather all directly given and also drived from other sources
     * modifier (current) { targetGroup, targetValue, modifier, rank, condition, source }
     * modifier (proposal) { value: 3, type: 'BONUS_DICE', condition: null || 'when attacking AELDARI', provider: 'Hatret (AELDARI)', category: 'Talent' },
     */
    enhancements() {
      let finalEnhancements = [];

      if (!this.wargearRepository) {
        return finalEnhancements;
      }

      // from species
      if (this.characterSpecies) {
        this.characterSpecies.speciesFeatures
          .filter((feature) => feature.modifications)
          .forEach((feature) => {
            feature.modifications.forEach((mod) => {
              const newMod = {
                ...mod,
                provider: feature.name,
                category: this.characterSpecies.name,
                source: this.characterSpecies.source,
              };
              finalEnhancements.push(newMod);
            });
            if (feature.options) {
              const traitSelection = this.characterEnhancements.find((e) => e.source.startsWith(`species.${feature.name}.`));



            }
          })
      }

      // from archetype
      if (this.characterArchetype) {
        this.characterArchetype.archetypeFeatures
          .filter((feature) => feature.modifications)
          .forEach((feature) => {
            feature.modifications.forEach((mod) => {
              const newMod = {
                ...mod,
                provider: feature.name,
                category: this.characterArchetype.name,
                source: this.characterArchetype.source,
              };
              finalEnhancements.push(newMod);
            });
          });
        if (this.characterArchetype.influence) {
          const newMod = {
            targetGroup: 'traits',
            targetValue: 'influence',
            modifier: this.characterArchetype.influence,
            provider: 'Archetype Influence',
            category: this.characterArchetype.name,
            source: this.characterArchetype.source,
          };
          finalEnhancements.push(newMod);
        }
      }

      if (this.characterEnhancements) {
        this.characterEnhancements
          .filter((mod) => mod.source
            && mod.source !== 'species'
            && mod.source !== 'archetype'
            && mod.source !== 'ascension'
          )
          .forEach((mod) => {
            let provider = 'Unknown';
            let category = 'Unknown';
            const sourceParts = mod.source.split('.');
            if (sourceParts.length === 1) {
              if (sourceParts[0] === 'custom') {
                // aka custom mutations
                provider = mod.hint;
                category = 'Custom'
              } else {
                provider = '';
                category = sourceParts[0].charAt(0).toUpperCase() + sourceParts[0].slice(1);
              }
            }
            if (sourceParts.length > 1) {
              provider = mod.name || sourceParts.slice(1).join(' • ');
              category = sourceParts[0].charAt(0).toUpperCase() + sourceParts[0].slice(1);
            }
            const newMod = {
              ...mod,
              provider,
              category,
            };
            finalEnhancements.push(newMod);
          });
      }

      // from talents
      this.talents
        .filter((talent) => talent.modifications)
        .forEach((talent) => {
          talent.modifications.forEach((mod) => {
            const newMod = {
              ...mod,
              provider: talent.name,
              category: 'Talent',
            };
            finalEnhancements.push(newMod);
          });
        });

      // from (equipped) wargear, mostly cybernetics
      if (this.gear && this.gear.length > 0) {
        let modGear = this.gear
          .filter((gear) => gear.modifications)
          .forEach((gear) => {
            gear.modifications.forEach(mod => {
              const newMod = {
                ...mod,
                provider: gear.name,
                category: gear.type,
              };
              return finalEnhancements.push(newMod);
            });
          });
      }

      // from keywords
      this.keywordStrings.forEach(k => {
        const keyword = this.keywordCombinedRepository.find(i => i.name === k);
        if (keyword === undefined) {
          console.warn(`No keyword found for ${k}!`);
        } else if (keyword.modifications) {
          keyword.modifications.forEach(mod => {
            const newMod = {
              ...mod,
              provider: keyword.name,
              category: 'Keyword',
            };
            return finalEnhancements.push(newMod);
          });
        }
      });

      // from mutations
      this.mutations
        .filter((mutation) => mutation.modifications)
        .forEach((mutation) => {
          if (mutation.modifications) {
            mutation.modifications.forEach(mod => {
              const newMod = {
                ...mod,
                provider: mutation.name,
                category: 'Mutation',
              };
              return finalEnhancements.push(newMod);
            });
          }
        });

      // from others TODO

      return finalEnhancements;
    },

    speciesAbilities() {
      const abilities = [];

      if (this.characterSpecies !== undefined && this.characterSpecies.speciesFeatures) {

        this.characterSpecies.speciesFeatures.forEach((feature) => {
          // Honour the Chapter
          if (feature.name === 'Honour the Chapter') {
            const chapter = this.astartesChapterRepository.find((a) => a.key === this.speciesAstartesChapter) || [];
            const traditions = chapter.beliefsAndTraditions;
            if (traditions !== undefined) {
              traditions.forEach((t) => {
                const tradition = {
                  name: t.name,
                  effect: t.effect,
                  snippet: t.effect,
                  source: chapter.name,
                };
                abilities.push(tradition);
              });
            }
          } else {
            // other abilities
            const ability = {
              name: feature.name,
              effect: feature.snippet ? feature.snippet : feature.description,
              snippet: feature.snippet,
              description: feature.description,
              key: feature.key,
              type: "species",
              source: this.speciesLabel,
              hint: this.speciesLabel,
              selectedOptions: [],
            };
            if (feature.options) {
              const traitSelection = this.characterEnhancements
                .filter((e) => e.source.startsWith(`species.${feature.name}.`));
              if (traitSelection) {
                traitSelection.forEach((selection) => {
                  if (selection.effect) {
                    ability.selectedOptions.push({
                      name: selection.name,
                      snippet: selection.effect,
                    });
                  } else if (selection.name) {
                    ability.selectedOptions.push({
                      name: selection.name,
                    });
                  }
                })
              }
            }
            abilities.push(ability);
          }
        });
      }

      if (this.characterHeritage !== undefined && this.characterHeritage.speciesFeatures) {

        const heritageName = this.characterHeritage.nameAncestry;
        this.characterHeritage.speciesFeatures.forEach((feature) => {
          // Honour the Chapter
          if (feature.name === 'Honour the Chapter') {
            const chapter = this.astartesChapterRepository.find((a) => a.key === this.speciesAstartesChapter) || [];
            const traditions = chapter.beliefsAndTraditions;
            if (traditions !== undefined) {
              traditions.forEach((t) => {
                const tradition = {
                  name: t.name,
                  effect: t.effect,
                  snippet: t.effect,
                  source: chapter.name,
                };
                abilities.push(tradition);
              });
            }
          } else {
            // other abilities
            const ability = {
              name: feature.name,
              effect: feature.snippet ? feature.snippet : feature.description,
              snippet: feature.snippet,
              description: feature.description,
              key: feature.key,
              source: heritageName,
              hint: heritageName,
              selectedOptions: [],
            };
            if (feature.options) {
              const traitSelection = this.characterEnhancements
                .filter((e) => e.source.startsWith(`species.${feature.name}.`));
              if (traitSelection) {
                traitSelection.forEach((selection) => {
                  if (selection.effect) {
                    ability.selectedOptions.push({
                      name: selection.name,
                      snippet: selection.effect,
                    });
                  } else if (selection.name) {
                    ability.selectedOptions.push({
                      name: selection.name,
                    });
                  }
                })
              }
            }

            if (!abilities.find(s => s.key === ability.key))
              abilities.push(ability);
          }
        });
      }

      return abilities;
    },
    archetypeAbilities() {
      const abilities = [];
      const archetype = this.characterArchetype;

      if (archetype && archetype.archetypeFeatures) {
        // const lowercaseKeywords = archetype.archetypeFeatures.map((s) =>
        //     s.toUpperCase()
        // );
        // this.abilityRepository.filter(s=> s.level <= this.characterLevel() &&  lowercaseKeywords.includes(s.key.toString().toUpperCase())).forEach((feature) => {

        archetype.archetypeFeatures.forEach((feature) => {
          const ability = {
            name: feature.name,
            key: feature.key,
            effect: feature.snippet ? feature.snippet : feature.description,
            snippet: feature.snippet,
            level: feature.level,
            type: "archetype",
            description: feature.description,
            source: archetype.name,
            hint: archetype.name,
            selectedOptions: [],
          };

          if (feature.options) {
            const traitSelection = this.characterEnhancements.filter((e) => e.source.startsWith(`archetype.${feature.name}.`));
            if (traitSelection) {
              traitSelection.forEach((selection) => {
                if (selection.effect) {
                  ability.selectedOptions.push({
                    name: selection.name,
                    snippet: selection.effect,
                  });
                } else if (selection.name) {
                  ability.selectedOptions.push({
                    name: selection.name,
                  });
                }
              })
            }
          }
          abilities.push(ability);
        });
      }
      return abilities;
    },
    ascensionAbilities() {
      const abilities = [];

      const ascensionPackages = this.characterAscensionPackages;
      const ascensionRepository = this.ascensionPackagesRepository;

      if (ascensionPackages && ascensionRepository) {
        const feature = ascensionRepository;
        const ability = {
          name: feature.name,
          effect: feature.snippet ? feature.snippet : feature.description, // todo deprecated
          snippet: feature.snippet,
          description: feature.description,
          source: feature.name,
          hint: feature.name,
        };
        abilities.push(ability)

      }


      return abilities;
    },
    filteredHeaders() {
      if (this.characterArchetype.prepared === false) {
        return this.psychicPowersHeaders.filter(h => h.value !== 'cast');
      }
      return this.psychicPowersHeaders;
    },
    filteredHeadersRitual() {

      return this.psychicPowersHeaders.filter(h => h.value !== 'cast');

    },
    otherAbilities() {
      const abilities = [];

      // keyword abilities
      this.keywordStrings.forEach(k => {
        const keyword = this.keywordCombinedRepository.find(i => i.name === k);
        if (keyword === undefined) {
          console.warn(`No keyword found for ${k}!`);
        } else if (keyword.effect) {
          const keywordAbility = {
            name: keyword.effectLabel ? keyword.effectLabel : keyword.name,
            effect: keyword.effect, // Deprecated
            snippet: keyword.effect,
            source: keyword.effectLabel ? `${keyword.name} Keyword` : `${keyword.type} Keyword`,
          };
          abilities.push(keywordAbility);
        }
      });

      // background abilities
      if (this.characterBackgroundKey) {
        this.backgroundRepository
          .filter((b) => b.key === this.characterBackgroundKey)
          .forEach((b) => {
            const backgroundAbility = {
              name: b.name,
              effect: b.bonus, // Deprecated
              snippet: b.bonus,
              source: 'Background',
            };
            const backgroundEnhancements = this.characterEnhancements.find((e) => e.source.startsWith(`background.`));
            if (backgroundEnhancements) {
              backgroundAbility.selectedOption = {
                name: backgroundEnhancements.targetValue,
              }
            }
            abilities.push(backgroundAbility);
          });
      }

      // mutations
      if (this.mutations) {
        this.mutations.forEach((item) => {
          item.source = 'Mutation',
            abilities.push(item);
        });
      }

      // other
      if (this.customAbilities) {
        this.customAbilities
          .filter((a) =>
            a.source
            && !a.source.startsWith('species.')
            && !a.source.startsWith('archetype.')
            && !a.source.startsWith('ascension.')
          )
          .forEach((item) => {
            const ability = {
              name: item.name,
              effect: item.effect,
              snippet: item.effect,
            };
            abilities.push(ability);
          });
      }

      return abilities;
    },
    abilities() {
      return [
        ...this.speciesAbilities,
        ...this.archetypeAbilities,
        ...this.otherAbilities
      ];
    },
    customAbilities() {
      return this.characterEnhancements ? this.characterEnhancements.filter((i) => i.targetGroup === 'abilities') : [];
    },

    enrichedTalents() {
      if (this.characterTalents && this.characterTalents.length > 0) {
        const talent = this.talentRepository;
        return this.characterTalents
          .map((charTalent) => talent.find((t) => t.key === charTalent.key))
          .filter((t) => t !== undefined);
      }
      return [];
    },
    talents() {
      const finalTalents = [];
      const talent = this.talentRepository;

      this.characterTalents.forEach((charTalent) => {
        const rawTalent = talent.find((t) => t.key === charTalent.key);
        if (rawTalent) {
          const ability = {
            name: rawTalent.name,
            snippet: rawTalent.snippet,
            description: rawTalent.description,
            source: rawTalent.source,
            level: charTalent.place.replace(/[a-z]/gi, ''),
            type: rawTalent.type,
            key: rawTalent.key,
            system: rawTalent.system,
            category: rawTalent.system.category,
            hint: rawTalent.name,
            selectedOptions: [],
            modifications: rawTalent.modifications || [],
          };


          finalTalents.push(ability);
        } else {
          console.info(`No talent found for ${charTalent.key}`);
        }
      });
      const characterTalents = this.$store.getters['characters/characterTalentsById'](this.characterId);
      return finalTalents.sort(a => a.level);

    },
    mutations() {
      const finalMutations = [];

      this.characterMutations.forEach((charMutation) => {
        const rawMutation = this.mutationsRepository.find((m) => m.key === charMutation.key);
        if (rawMutation) {
          const ability = {
            id: charMutation.id,
            name: rawMutation.name, // we use the custom name
            snippet: rawMutation.snippet,
            description: rawMutation.description,
            source: rawMutation.source,
            hint: rawMutation.name,
            selectedOptions: [],
            modifications: rawMutation.modifications || [],
          };

          if (charMutation.selected) {
            if (rawMutation.options) {
              const choice = rawMutation.options.find((m) => m.key === charMutation.selected);

              if (choice.modifications) {
                ability.modifications.push(...choice.modifications);
              }

              if (choice.snippet) {
                ability.selectedOptions.push(choice);
              }
            } else {
              ability.name = ability.name.replace(/\[.*\]/, `(${charMutation.selected})`);
            }
          }
          finalMutations.push(ability);
        } else {
          console.info(`No mutation found for ${charMutation.key}`);
        }
      });
      return finalMutations.sort((a, b) => a.name.localeCompare(b.name));
    },
    charGear() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
    characterXp() {
      return this.$store.getters['characters/characterXpById'](this.characterId) || '';
    },
    wargear() {
      const chargear = this.charGear;
      const wargear = [];
      if (this.wargearRepository) {
        chargear.forEach((gear) => {
          const { name, id, variant } = gear;
          const foundGear = this.wargearRepository.find((w) => gear.name.localeCompare(w.name, 'en', { sensitivity: 'accent' }) === 0);
          if (foundGear && !['ranged', 'melee'].includes(gear.type)) {
            wargear.push({ ...foundGear, damageOrig: foundGear.damage, variant, id });
          }
        });
      }
      return wargear;
    },
    weapons() {
      return this.charGear.filter((wargear) => {
        let hasWeaponsProfile = false;
        if (['weapon'].includes(wargear.type)) {
          hasWeaponsProfile = true;
        } else {
          if (wargear.meta) {
            wargear.meta.forEach((meta) => {

              if (['ranged-weapon', 'melee-weapon'].includes(meta.type)) {
                hasWeaponsProfile = true;
              }
            })
          }
        }
        return hasWeaponsProfile;
      });
    },
    armour() {


      return this.charGear.filter((w) => ['armor', 'shield'].includes(w.type));
    },
    gear() {
      return this.charGear.filter((w) => !['consumable', 'armor', 'weapon', 'shield'].includes(w.type));
    },
    consumable() {
      return this.charGear.filter((w) => ['consumable'].includes(w.type));
    },


    objectives() {
      if (this.characterSpecies && this.characterSpecies.objectives) {
        return this.characterSpecies.objectives.map((objective) => ({ text: objective }));
      } else if (this.characterArchetype && this.factionRepository) {
        const faction = this.factionRepository.find((faction) => faction.name === this.characterArchetype.faction);
        if (faction) {
          const objectiveList = faction.objectives;
          if (objectiveList) {
            return objectiveList.map((o) => ({ text: o }));
          }
        }
      } else {
        if (this.characterFactionKey) {
          const faction = this.factionRepository.find((faction) => faction.key === this.characterFactionKey);
          if (faction) {
            const objectiveList = faction.objectives;
            if (objectiveList) {
              return objectiveList.map((o) => ({ text: o }));
            }
          }
        }
      }
      return [];
    },
    characterNotes() {
      const notes = this.$store.getters['characters/characterFluffNotesById'](this.characterId) || '';
      return marked.parse(notes);
    },
    weaponsTraitSet() {
      let weaponsTraitSet = [];
      const { weapons } = this;

      weapons.forEach((weapon) => {
        weapon.meta.forEach((meta) => {
          if (meta.traits && meta.traits.length > 0) {
            weaponsTraitSet = [...weaponsTraitSet, ...meta.traits];
          }
        })
      });
      weaponsTraitSet = weaponsTraitSet.map((t) => t.split(/ ?\(/)[0]);
      return [...new Set(weaponsTraitSet)].sort();
    },
    explorationActions() {
      if (this.actionList)
        return this.actionList.filter(a => a.system.traits?.value.includes("exploration") && a.source.key.includes("playerCore"));
    },
    basicActions() {
      if (this.actionList)
        return this.actionList.filter(a => !a.system.traits?.value.includes("exploration") && !a.system.traits?.value.includes("downtime"))
          .filter(a =>
            a.category = "basic");
    },
    basicSpecialActions() {
      if (this.actionList)
        return this.actionList.filter(a => !a.system.traits?.value.includes("exploration") && !a.system.traits?.value.includes("downtime"))
          .filter(a =>
            a.category = "special basic");
    },
    restActions() {
      if (this.actionList)
        return this.actionList.filter(a => a.traits?.includes("exploration"));
    },
    otherActions() {
      if (this.actionList)
        return this.actionList.filter(
          a => !a.traits?.includes("исследование") && !a.traits?.includes("отдых")
        );
    },
    archetype() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId)
    },
    potencyArmor() {
      const wear = this.$store.getters["characters/characterWearById"](
        this.characterId
      );

      return wear && wear.runes ? wear.runes.potency : 0
    },



  },
  watch: {
    notes: {
      deep: true,
      handler(val) {

        const cleanNote = {
          id: val.id,
          title: val.title,
          content: val.content,
          updatedAt: val.updatedAt
        }
        this.$store.commit('characters/setCharacterFluffNotes', { id: this.characterId, notes: cleanNote });
      }
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getWargearList(newVal);
          this.getAbilityList(newVal);
          this.getActionList(newVal);
          this.getSpellList(newVal);
          this.getStatus(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    speciesKey: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadSpecies(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    heritageKey: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.loadHeritage(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    archetypeKey: {
      handler(newVal) {
        if (newVal) {
          this.loadArchetype(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    characterAscensionPackages: {
      handler(newVal) {
        if (newVal && newVal !== 'unknown') {
          this.getAscensionPackageList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },

    // character: {
    //   handler(newVal) {

    //   },
    //   immediate: true, // make this watch function is called when component created
    // },

  },
  methods: {

    /*Стили Картинок */
    getContrastColor(hex) {
      if (!hex) return '#000'

      const c = hex.substring(1) // убираем #
      const rgb = parseInt(c, 16)

      const r = (rgb >> 16) & 0xff
      const g = (rgb >> 8) & 0xff
      const b = (rgb >> 0) & 0xff

      // формула яркости
      const brightness = (r * 299 + g * 587 + b * 114) / 1000

      return brightness > 150 ? '#000' : '#fff'
    },

    getNoteStyle(note) {
      const isActive = note.id === this.activeNoteId

      if (isActive) {
        return {
          background: note.color
            ? note.color + '30'   // сильнее подсветка
            : '#e3f2fd',

          borderLeft: `4px solid ${note.color || '#1976d2'}`,
          fontWeight: '500'
        }
      }

      return {
        background: note.color
          ? note.color + '15'
          : 'transparent',

        borderLeft: `4px solid ${note.color || 'transparent'}`
      }
    },
    getNoteClass(note) {
      return {
        'note-active': note.id === this.activeNoteId
      }
    },
    selectIcon(icon) {
      this.editNote.icon = icon
      this.iconPicker = false
    },
    selectColor(color) {
      this.editNote.color = color
      this.colorPicker = false
    },
    updateTitle(value) {
      if (!this.activeNote) return
      const cleanNote = {
        id: this.activeNote.id,
        title: this.activeNote.title,
        content: this.activeNote.content,
        updatedAt: this.activeNote.updatedAt
      }
      this.$store.commit('characters/setCharacterFluffNotes', {
        id: this.characterId,
        notes: {
          ...cleanNote,
          title: value
        }
      })
    },
    saveDebounced: debounce(function () {
      if (!this.activeNote) return
      const cleanNote = {
        id: this.activeNote.id,
        title: this.activeNote.title,
        content: this.activeNote.content,
        updatedAt: this.activeNote.updatedAt
      }
      this.$store.commit('characters/setCharacterFluffNotes', {
        id: this.characterId,
        notes: {
          ...cleanNote,
          content: this.localContent
        }
      })
    }, 500),
    // Переключение состояния
    selectNote(id) {
      this.activeNoteId = id
      this.editNote = this.activeNote
      this.$nextTick(() => {
        const note = this.activeNote
        this.editor.commands.setContent(note?.content || '')
      })
    },
    createNote() {
      const UniqueId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      const newNote = {
        date: Date.now(),
        id: UniqueId,
        title: 'Новая заметка',
        content: '<p></p>',
        updatedAt: new Date(),

      }
      this.$store.commit('characters/addCharacterFluffNotes', { id: this.characterId, notes: newNote });

      this.selectNote(newNote.id)
    },
    openNoteSettings(note) {
      this.editNote = { ...note } // КЛОНИРУЕМ, не ссылку!
      this.settingsDialog = true
    },
    saveNoteSettings() {

      const cleanNote = {
        id: this.activeNote.id,
        title: this.activeNote.title,
        content: this.activeNote.content,
        updatedAt: this.activeNote.updatedAt
      }

      this.$store.commit('characters/setCharacterFluffNotes', {
        id: this.characterId,
        notes: {
          ...cleanNote,
          ...this.editNote
        }
      })

      this.settingsDialog = false
    },
    deleteNote(id) {
      this.$store.commit('characters/deleteFluffNotes', {
        id: this.characterId,
        noteId: id
      })
      this.settingsDialog = false;

      if (this.activeNoteId === id) {
        this.activeNoteId = null
        this.editor.commands.setContent('')
      }
    },


    insertAction1(type) {
      if (!this.editor) return

      this.editor.chain().focus().insertActionIcon(type).run()
    },
    onInput(field, value) {
      if (!this.debouncers[field]) {
        this.debouncers[field] = this.createDebounce(field)
      }

      this.debouncers[field](value)
    },

    createDebounce(field) {
      return (value) => {
        clearTimeout(this.debouncers[field]?.timer)

        this.debouncers[field].timer = setTimeout(() => {
          this.setFluff(field, value)
        }, 300)
      }
    },
    getFluff(field) {
      return this.$store.getters['characters/CharacterFluffById'](this.characterId)[field]
    },
    setFluff(field, value) {
      this.$store.commit('characters/setCharacterFluff', { id: this.characterId, field: field, value: value });
    },
    /*Конец функций с заметками */

    //Секция со Способностями и особенностями
    buildSections(categories) {
      return categories.map(cat => {
        const items = this.talents
          .filter(f => f.category === cat)
          .sort((a, b) => Number(a.level) - Number(b.level))

        return {
          key: cat,
          title: this.getCategoryTitle(cat),
          levels: this.groupByLevel(items)
        }
      })
    },
    buildSectionsAb(categories) {
      return categories.map(cat => {

        const speciesItems = this.speciesAbilities
          .filter(f => f.type === cat)

        const classItems = this.archetypeAbilities
          .filter(f => f.type === cat)

        const items = Array.from(
          new Map(
            [...speciesItems, ...classItems]
              .map(item => [item.key, item])
          ).values()
        ).sort((a, b) => Number(a.level) - Number(b.level))

        return {
          key: cat,
          title: this.getCategoryTitle(cat),
          levels: this.groupByLevel(items)
        }
      })
    },
    groupByLevel(items) {
      const res = {}

      items.forEach(item => {
        const level = item.level || '0'
        if (!res[level]) res[level] = []
        res[level].push(item)
      })

      return res
    },
    size(size) {
      if (!size) return "";
      const s = this.sizeRepository.find((s) => s.key === size);
      return s ? s.name : "";
    },
    getClassChipColor(skillKey) {
      //const rank = this.getSkillRank(skillKey);
      switch (skillKey) {
        case "U":
          return "grey";
        case "T":
          return "#171f69";
        case "E":
          return "#3c005e";
        case "M":
          return "#664400";
        case "L":
          return "#5e0000";
        default:
          return "grey";
      }
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
    getCategoryTitle(cat) {
      const map = {
        general: 'Общие и Навыки',
        class: 'Классовые способности',
        ancestry: 'Родословные способности',
        archetype: 'Классовые особенности',
        species: 'Родословные особенности'
      }

      return map[cat] || cat
    },
    toggleStatus(status) {
      if (this.isStatusActive(status.key)) {
        this.removeStatus(status.key);
      } else {
        this.addStatus(status);
      }
    },
    talentTypeLabel(type) {
      const map = {
        class: "Классовые",
        skill: "Навыковые",
        general: "Общие",
        ancestry: "Родословная",
        archetype: "Архетип",
        bonus: "Бонусные"
      };

      return map[type] || type || "Прочее";
    },
    groupName(name) {
      return this.weaponGroup.find(item => item.group === name).name;
    },
    category(category) {
      return this.weaponCategoryRepository.find(t => t.category === category)?.name || "";
    },

    // Добавление состояния
    addStatus(status) {

      const newStatus = {
        ...status,
        value: 1 // Значение по умолчанию
      };

      // this.activeStatuses.push(newStatus);


      this.applyStatusEffects(newStatus.value, newStatus);
    },

    // Обновление значения состояния
    updateStatusValue(status, delta) {
      const index = this.activeStatuses.findIndex(s => s.key === status.key);
      if (index !== -1) {
        // if(this.statusRepository.find(s => s.key === status.key) !== '')
        const newValue = this.activeStatuses.find(s => s.key === status.key).value + delta;

        // Ограничиваем значения от 1 до 10
        if (newValue >= 1 && newValue <= 10) {

          this.$store.commit('characters/setCharacterValueStatusById', { id: this.characterId, status: status, value: newValue });
          // this.activeStatuses.find(s => s.key === status.key).value = newValue;

          this.applyStatusEffects(newValue, status);
        }
      }
    },

    // Удаление состояния
    removeStatus(statusKey) {
      this.$store.commit('characters/deleteCharacterStatusById', { id: this.characterId, status: this.activeStatuses.find(s => s.key === statusKey) });
      // this.activeStatuses = this.activeStatuses.filter(s => s.key !== statusKey);
    },

    // Проверка активности состояния
    isStatusActive(statusKey) {
      return this.activeStatuses.some(s => s.key === statusKey);
    },

    // Получение значения состояния
    getStatusValue(statusKey) {
      const status = this.activeStatuses.find(s => s.key === statusKey);
      return status ? status.value : 0;
    },

    // Получение цвета для состояния
    getStatusColor(status) {
      const effect = this.statusEffects[status.key];
      if (!effect) return 'grey';

      if (effect.value > 0) return 'green';
      if (effect.value < 0) return 'red';
      return 'blue';
    },
    openStatDialog(component, title) {
      this.dialogComponent = component
      this.dialogTitle = title
      this.statDialog = true
    },
    // Применение эффектов состояний
    applyStatusEffects(baseValue, status) {
      let result = baseValue;
      const skills = this.skills;
      const effect = this.activeStatuses.find(s => s.key === status.key);
      this.$store.commit('characters/setCharacterStatusById', { id: this.characterId, status: status });

      return Math.max(result, 1); // Минимальное значение 1
    },


    // Обновленные методы с учетом состояний
    ModAttributeSavingWithStatuses(attribute, skill) {
      const char1 = this.profiencyRepository[this.characterSaving[skill]];
      const char2 = (this.characterAttributesWithStatuses[attribute] - 10) / 2;
      const char3 = this.characterLevel();
      const item = this.itemBonus(skill) && this.itemBonus(skill).value ? this.itemBonus(skill).value : 0

      let status = 0;

      this.activeStatuses.forEach(effect => {
        if (effect && effect.rules) {
          if (effect.rules.find(s => s.selector))
            if (effect.rules.find(s => s.key === 'FlatModifier')) {
              const att = effect.rules.find(s => s.selector).selector.filter(s => s === 'saving-throw' || s === 'all');


              if (att.length !== 0)
                if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
                  status = effect.value
                else
                  status = -effect.rules.find(s => s.key === 'FlatModifier').value;

            }
        }
      })
      const result = parseInt(char1) + parseInt(char2) + parseInt(char3) + parseInt(item) - status;

      return result > 0 ? "+" + result : result;

    },

    ModAttributePerceptionWithStatuses(attribute, skill) {
      const char1 = this.profiencyRepository[this.SkillPerception()];
      const char2 = (this.characterAttributesWithStatuses["wisdom"] - 10) / 2;
      const char3 = this.characterLevel();
      let status = 0;

      this.activeStatuses.forEach(effect => {
        if (effect && effect.rules) {
          if (effect.rules.find(s => s.selector))
            if (effect.rules.find(s => s.key === 'FlatModifier')) {
              const att = effect.rules.find(s => s.selector).selector.filter(s => s === 'perception' || s === 'all');


              if (att.length !== 0)
                if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
                  status = effect.value
                else
                  status = -effect.rules.find(s => s.key === 'FlatModifier').value;

            }
        }
      })
      const result = parseInt(char1) + parseInt(char2) + parseInt(char3) - status;
      return result > 0 ? "+" + result : result;
    },

    generateTableRitualRows() {

      const ritual = this.$store.getters['characters/characterRitualSpellsById'](this.characterId);

      if (ritual) {
        let spells = [];
        let i = 0;
        ritual.forEach(spell => {
          const spell1 = {
            ...spell,

            type: "ritual",
            //  name: this.characterSpell(levelIndex, i).name ? this.characterSpell(levelIndex, i).name : 'пустой слот',
            // rank: this.characterSpellFocus(levelIndex, i, spell.key)?.traits?.includes('фокус') ? 1 : 0,
            cell: i,
          }
          if (spell)
            spells.push(spell1);

          i++;
        }
        )
        return spells || [];
      }

    },

    psychicPowers(levelIndex) {
      const powers = this.$store.getters['characters/characterSpellsById'](this.characterId);

      const progression = this.characterArchetype.spellProgression[this.characterLevel()]?.[levelIndex] || 0;
      //const prep = this.$store.getters["characters/characterSpellsPrepareById"](this.characterId);
      if (progression !== 0) {
        //this.crossedRows = [];
        let spells = [];
        for (let i = 1; i <= progression; i++) {

          const rawTalent = this.psychicPowersList?.find(s => s.key === powers.find((power) => power.rank === levelIndex && power.cell === i)?.key);
          const spell = {
            ...powers.find((power) => power.rank === levelIndex && power.cell === i),
            ...rawTalent,
            rank: levelIndex,
            cell: i,
            trait: rawTalent?.traits
          }

          if (spell.damage && spell.heightening?.damage /*&& spell.key === 'grisly-growths'*/) {


            const cant = this.characterArchetype.spellProgression[this.characterLevel()].findIndex(
              (t) => t == 0
            ) - 1;

            const index = spell.damage?.formula?.indexOf("d", 0);
            ///Кубики до и после
            const dice = spell.damage?.formula?.slice(0, index);
            const diceSize = spell.damage.formula?.slice(index + 1);

            const heightened = Object.values(spell.heightening?.damage)[0];

            const index1 = heightened?.indexOf("d", 0);
            const diceInterval = heightened?.slice(0, index1);
            const interval = spell.heightening?.interval;

            const rank = spell.traits.join(',').includes('заговор') ? cant : spell.rank;

            const powerLevel2 = parseInt(dice) + (rank - interval) * (parseInt(diceInterval));
            spell.Power = "<span style='color: green'>" + powerLevel2 + "d" + diceSize + "</span>";
          }

          spells.push(spell);
        }
        return spells;
      }

      return [];

    },
    groupedGear() {
      const groups = {};

      this.charGear.filter((w) => !['armor', 'weapon', 'shield'].includes(w.type)).forEach(item => {
        const type = item.usage.value || "Прочее";

        if (!groups[type]) groups[type] = [];
        groups[type].push(item);
      });
      return Object.entries(groups).map(([type, items]) => ({
        header: type,
        items
      }));
    },
    getItemClass(item) {
      return item.cast ? 'crossed-row' : ''
    },
    updateCast(item) {
      const spell = this.$store.getters["characters/characterSpellsById"](
        this.characterId
      );
      if (spell.find(s => s.id === item.id)) {
        item.cast = item.rank !== 0 ? !item.cast : item.cast;
        this.$store.commit('characters/editCharacterSpell', { id: this.characterId, talentId: item.id, cast: item.cast });
      }

    },
    Worn(item) {
      return this.WornGear[item] ? this.WornGear[item] : 'Прочее'
    },
    openFeat(item) {
      this.selectedItem = item
      this.dialogFeat = true
    },
    openDialog(item) {
      this.selectedItem = item
      this.dialogItem = true
    },
    openDialogItem(item) {
      this.selectedItem = item
      this.dialogItem = true
    },
    openDialogAction(action) {
      this.selectedAction = action;
      this.dialogAction = true;
    },
    iconAction(action) {
      if (action == '1') return `/img/icon/action_single.png`;
      if (action == '2') return `/img/icon/action_double.png`;
      if (action == '3') return `/img/icon/action_triple.png`;
      if (action === 'reaction') return `/img/icon/action_reaction.png`;
      if (action === 'free') return `/img/icon/action_free.png`;
    },
    ModAttributeReal(attribute) {


      const result = this.characterAttributes[attribute]
      const modRaw = (result - 10) / 2;       // настоящее дробное значение
      const mod = Math.floor(modRaw);         // отображаемое целое значение


      const arrow = Number.isInteger(modRaw) ? "" : " ⯅";  // стрелка только если дробное

      return (mod > 0 ? "+ " : " ") + mod + arrow;


    },
    async handlePrint() {
      const pdfUrl = await this.fillPdf(this);
      window.open(pdfUrl, '_blank'); // открываем заполненный PDF в новой вкладке
    },
    async loadSpecies(key) {
      if (key) {
        let finalData = {};
        if (key.startsWith('custom-')) {
          finalData = this.$store.getters['species/getSpecies'](key);
        } else {
          const { data } = await this.$axios.get(`/api/species/${key}`);
          finalData = data;
        }


        if (this.abilityList !== undefined) {
          const lowercaseKeywords = finalData.ancestryAbility.map((s) =>
            s.toUpperCase()
          );

          const List = this.abilityList;
          const ability = List.filter((talent) =>
            lowercaseKeywords.includes(talent.key.toString().toUpperCase())
          );

          if (ability.length > 0) {
            const listAbilities = [];
            ability.forEach((talent) => {
              const ability1 = {
                name: talent.name,
                key: talent.key,
                description: talent.description,
                modification: talent.modification,
              };

              listAbilities.push(talent);
            });
            finalData.speciesFeatures = listAbilities;
          }
        }



        this.characterSpecies = finalData;

      }
    },
    async loadHeritage(key) {
      if (key) {
        let finalData = {};
        if (key.startsWith('custom-')) {
          finalData = this.$store.getters['species/getHeritage'](key);
        } else {
          const { data } = await this.$axios.get(`/api/heritage/${key}`);
          finalData = data;
        }


        if (this.abilityList !== undefined) {
          const lowercaseKeywords = finalData.ancestryAbility.map((s) =>
            s.toUpperCase()
          );

          const List = this.abilityList;
          const ability = List.filter((talent) =>
            lowercaseKeywords.includes(talent.key.toString().toUpperCase())
          );

          if (ability.length > 0) {
            const listAbilities = [];
            ability.forEach((talent) => {
              const ability1 = {
                name: talent.name,
                key: talent.key,
                description: talent.description,
                modification: talent.modification,
              };

              listAbilities.push(talent);
            });
            finalData.speciesFeatures = listAbilities;
          }
        }



        this.characterHeritage = finalData;

      }
    },
    async getAbilityList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get(
        "/api/abilityAncestry/",
        //config.source
      );
      this.abilityList = data;
    },
    async getActionList(sources) {
      const config = {
        params: {
          //source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get(
        "/api/action/",
        config.source
      );


      data.forEach(s => {
        s.trait = s.traits;
      })
      this.actionList = data;
    },
    async getStatus(sources) {

      this.loading = true;

      const status = this.$store.getters['characters/characterStatusById'](this.characterId);
      // this.activeStatuses = status;
      this.loading = false;

      // this.psychicPowersList = data;
    },
    async getSpellList(sources) {
      const config = {
        params: { /*source: sources.join(','),*/ },
      };
      this.loading = true;
      const { data } = await this.$axios.get('/api/psychic-powers/', config);
      this.loading = false;
      const itemName = data.map(item => {
        const [nameRu, nameEng] = item.name.split(/\s*\/\s*/, 2);

        return {
          ...item,
          name: nameRu,
          nameEng: nameEng || nameRu
        };
      });
      this.psychicPowersList = itemName;
    },
    async loadArchetype(key) {

      if (key) {

        let finalData = {};
        const { data } = await this.$axios.get(`/api/archetypes/${key}`);
        finalData = data;

        // finalData = this.enrichArchetypeFeatures(finalData);
        const level = this.$store.getters["characters/characterLevelById"](
          this.characterId
        );

        const enc = this.$store.getters['characters/characterEnhancementsById'](this.characterId);

        if (this.abilityList !== undefined && this.actionList !== undefined) {

          const lowercaseKeywords = finalData.archetypeFeatures.map((s) =>
            s.toUpperCase()
          );

          //Список особенностей
          const List = this.abilityList;
          let ability = List.filter((talent) =>
            lowercaseKeywords.includes(talent.key.toString().toUpperCase())
          );

          const abilityInArray = [];
          let SubFeature = [];

          //Сюда кладем то, что дается больше одного раза и смотрим под-опции
          ability.forEach((ab) => {
            if (Array.isArray(ab.level)) {
              abilityInArray.push(ab);
            }

            if (ab.options) {
              if (ab.type.includes("Weapon Group")) {
                const options = this.weaponGroup.filter(s => ab.options.includes(s.group));
                const listOption = [];
                options.forEach(s => {
                  const op = {
                    key: s.group,
                    ...s
                  }
                  listOption.push(op);
                  ab.options = listOption;

                });
              }

              if (ab.type === "Class Feature") {
                const options = List.filter(ability => ab.options.includes(ability.key));

                ab.options = options;
              }


              ab.selected = enc.find(s => s.key === ab.key) ? enc.find(s => s.key === ab.key).selected : "";


              //Наподобие подкласса Жреца
              ab.options.forEach(s => {
                if (s.subFeature) {
                  const sub = s.subFeature;
                  SubFeature = List.filter(s => sub.includes(s.key));
                  s.subFeature = SubFeature;
                }


              })
            }


          });

          //Выкидываем из списка особенности, уровень которых перечислен в массиве
          ability = ability.filter((ab) => !Array.isArray(ab.level));

          let abilityList = [];
          let ac = this.actionList;
          ability.forEach((tal) => {
            let action;
            if (tal.item)
              action = ac.find(ac => ac.key === tal.item.key)
            const ability1 = {
              name: tal.name,
              key: tal.key,
              description: tal.snippet,
              modification: tal.modification,
              level: tal.level,
              subFeature: tal.subFeature,
              options: tal.options,
              selected: tal.selected,
              action: action ? action : undefined,
              type: tal.type,
              value: tal.value,
            };
            if (ability1.level <= level) abilityList.push(ability1);
          }
          );
          //Смотрим все особенности, и делаем их по тем уровням, что в массиве
          abilityInArray.forEach((ab) => {
            const tal = ab;
            ab.level.forEach((talent) => {
              const ability1 = {
                name: tal.name,
                key: tal.key + talent,
                description: tal.snippet,
                modification: tal.modification,
                subFeature: tal.subFeature,
                level: talent,
                options: tal.options,
                selected: tal.selected,
                type: tal.type,
                value: tal.value,
              };

              //Кладем в общий "пул"
              if (talent <= level) abilityList.push(ability1);
            });
          });

          // abilityList = [
          //     ...abilityList, ...SubFeature
          //   ]

          if (ability.length > 0) {
            //Если нашли все особенности, то кладем их в каждый класс
            finalData.archetypeFeatures = abilityList;
          }
          finalData.archetypeFeatures = abilityList.filter(t => t.level <= level).sort((a, b) => a.level - b.level);
          this.characterArchetype = finalData;
        }
      }

      if (this.characterArchetype)
        this.characterArchetype.spellTradition = this.$store.getters['characters/characterSpellTraditionsById'](this.characterId);


    },
    handleClick(e, level, value) {
      if (e.button === 0) { // ЛКМ
        this.addBullet(level, value + 1);
      } else if (e.button === 2) { // ПКМ
        this.removeBullet(level, value - 1);
      }
    },
    handleClick2(e, value) {
      if (e.button === 0) { // ЛКМ
        this.addBullet2(value + 1);
      } else if (e.button === 2) { // ПКМ
        this.removeBullet2(value - 1);
      }
    },
    addBullet(level, value) {
      const progression = this.characterArchetype.spellProgression[this.characterLevel()]?.[level] || 0;
      if (!this.characterSpont[level]) {
        this.$store.commit('characters/addCharacterSpontSpell', { id: this.characterId, level: level, value: 1 })
      } else
        if (this.characterSpont[level].value < progression) {
          this.$store.commit('characters/addCharacterSpontSpell', { id: this.characterId, level: level, value: value })
        }


    },
    removeBullet(level, value) {
      const progression = this.characterArchetype.spellProgression[this.characterLevel()]?.[level] || 0;
      if (!this.characterSpont[level]) {
        this.$store.commit('characters/addCharacterSpontSpell', { id: this.characterId, level: level, value: 0 })
      } else
        if (value >= 0) {
          this.$store.commit('characters/addCharacterSpontSpell', { id: this.characterId, level: level, value: value })
        }

    },
    addBullet2(value) {

      if (value < 4)
        this.$store.commit('characters/setCharacterHeroPoints', { id: this.characterId, value: value })

    },
    removeBullet2(value) {
      if (value >= 0)
        this.$store.commit('characters/setCharacterHeroPoints', { id: this.characterId, value: value })
    },
    removeTalent(talent) {
      const id = this.characterId;
      const source = `talent.${talent.id}`;
      if (!talent.ritual)
        this.$store.commit('characters/removeCharacterSpell', { id, talentId: talent.id });
      else
        this.$store.commit('characters/removeCharacterRitualSpell', { id, talentId: talent.id });
    },
    updatePreviewRitual() {
      let list = this.psychicPowersList.filter(spell => spell.ritual)

      this.spell = "ritual";
      this.selectedPsychic = list
      this.psychicDialog = true;

    },
    updatePreview(levelAncestry, cell) {
      let list = this.psychicPowersList.filter(spell => !spell.ritual).filter(spell => !spell.ritual).filter(spell => !['фокус', 'композиция'].some(trait => spell.traits.includes(trait)))//.filter(spell => spell != 'композиция')
      const sources = this.sources;
      list = this.psychicPowersList.filter(i => i.source && i.source.key ? sources.includes(i.source.key) : false)
      if (levelAncestry === 0)
        list = list.filter(spell => spell.traits.join(',').includes('заговор'))
      else
        list = list.filter(spell => !spell.traits.join(',').includes('заговор'))

      if (this.characterArchetype.spellTradition)
        list = list.filter(spell => spell.traditions.join(',').includes(this.characterArchetype.spellTradition))


      const l = this.$store.getters['characters/characterSpellListById'](this.characterId);
      const camelSpells = Object.values(l).flat().map(s => this.textToKebab(s));
      // добавить к list все объекты, название которых есть в l
      const extraFromSpellList = this.psychicPowersList.filter(spell => camelSpells.includes(this.textToKebab(spell.key)));

      // объединить в один список
      list = [...list, ...extraFromSpellList];
      const prepare = this.$store.getters['characters/characterPreparedById'](this.characterId);
      this.spell = "spell";
      this.levelSpell = levelAncestry;
      this.rankSpell = this.characterArchetype.spellProgression[this.characterLevel()].findIndex(
        (t) => t == 0
      ) - 1 < 0
        ? 10 : this.characterArchetype.spellProgression[this.characterLevel()].findIndex(
          (t) => t == 0
        ) - 1;
      const rankSpell = this.characterArchetype.spellProgression[this.characterLevel()].findIndex(
        (t) => t == 0
      ) - 1 < 0
        ? 10 : this.characterArchetype.spellProgression[this.characterLevel()].findIndex(
          (t) => t == 0
        ) - 1;

      list.forEach(t => {
        const tal = t;
        tal.rank = levelAncestry;
        tal.cell = cell;
        tal.levelRank = rankSpell
        tal.prepared = prepare.find(s => s.key === t.key) === true;
      })



      this.selectedPsychic = list
      this.psychicDialog = true;

    },
    async getAscensionPackageList(key) {
      this.loading = true;
      let finalData = {};

      // if (key.startsWith("custom-")) {
      //   const speciesDetails = this.$store.getters["species/getSpecies"](key);
      //   finalData = speciesDetails;
      // } else {
      const { data } = await this.$axios.get(`/api/ascension-packages/${key}`);
      finalData = data;
      // }

      this.loading = false;
      this.ascensionPackagesRepository = finalData;
    },
    async getWargearList(sources) {
      const page = 1;
      const perPage = 10000;

      const params = { page, perPage, /*source: sources.join(',')*/ };

      const { data, total } = await this.$axios.get('/api/wargear/', { params });
      const wr = this.weaponCategoryRepository;
      const ar = this.armourCategoryRepository;
      data.data.forEach(item => {
        if (!item.runes && wr.find(t => t.category === item.category)) {
          item.runes = item.runes;
        }

        if (!item.runes && ar.find(t => t.category === item.category)) {
          item.runes = item.runes;
        }

        item.qty = 1;
        item.trait = item.traits;
      });

      const config = {
        params: {
          source: sources.join(','),
        },
      };

      data.data = data.data.map(item => {
        const [nameRu, nameEng] = item.name.split(/\s*\/\s*/, 2);

        return {
          ...item,
          name: nameRu,
          nameEng: nameEng || nameRu
        };
      });
      this.wargearList = data.data;

    },
    SkillPerception() {
      return this.$store.getters["characters/characterPerseptionById"](
        this.characterId
      );
    },


    ModAttributeClass() {
      const char1 = this.profiencyRepository[this.SkillClass()] ? this.profiencyRepository[this.SkillClass()] : 0;
      const char3 = this.characterLevel();

      return 10 + parseInt(char1) + parseInt(char3);

    },

    characterNotesOpenEditor() {
      this.characterNotesEditorModel = this.$store.getters['characters/characterFluffNotesById'](this.characterId);
      this.characterNotesShowEditor = true;
    },
    CharacterFlufftById() {
      this.fluff = this.$store.getters['characters/characterFluffById'](this.characterId);
    },
    characterShield() {
      const wear = this.$store.getters["characters/characterWearShieldById"](
        this.characterId
      );



      if (wear) {
        return wear
      }
      return undefined

    },
    characterShieldHP(newHp) {
      const wear = this.$store.getters["characters/characterWearShieldById"](
        this.characterId
      );




      if (wear) {
        this.$store.commit('characters/wearUpdateCharacterShield', { id: this.characterId, gearId: wear.id, newHp: newHp });
      }


    },

    characterArmor() {
      const wear = this.$store.getters["characters/characterWearById"](
        this.characterId
      );

      let status = 0;
      console.log(wear)
      this.activeStatuses.forEach(effect => {
        if (effect && effect.rules) {
          if (effect.rules.find(s => s.selector))
            if (effect.rules.find(s => s.key === 'FlatModifier')) {
              const att = effect.rules.find(s => s.selector).selector.filter(s => s === 'ac' || s === 'all');


              if (att)
                if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
                  status = effect.value
                else
                  status = -effect.rules.find(s => s.key === 'FlatModifier').value;

            }
        }
      })

      if (wear) {
        const modDex = Math.floor(
          (this.characterAttributes["dexterity"] - 10) / 2
        );
        const wearModDex = wear.dexCap ? wear.dexCap : 0;
        const dex = modDex > wearModDex ? wearModDex : modDex;
        const Def = wear.category
          ? this.profiencyRepository[this.skillDefence[wear.category]]
          : 0;
        let potency = 0
        console.log(wear)
        potency = this.potencyArmor
        const bonusAC = wear.acBonus ? wear.acBonus : 0;
        const arm = Def === 0 ? 0 : this.characterLevel();

        return 10 + dex + Def + arm + bonusAC + potency - status;
      }

      const modDex = Math.floor(
        (this.characterAttributes["dexterity"] - 10) / 2
      );
      const Def = this.profiencyRepository[this.skillDefence["unarmored"]];
      return 10 + modDex + Def - status;
    },

    characterNotesCancel() {
      this.characterNotesEditorModel = '';
      this.characterNotesShowEditor = false;
    },
    characterNotesSave() {
      const id = this.characterId;
      const notes = this.characterNotesEditorModel;
      this.$store.commit('characters/setCharacterFluffNotes', { id, notes });
      this.characterNotesEditorModel = '';
      this.characterNotesShowEditor = false;
    },

    // Сложность класса заклинателя и его атаки
    ModAttributeClassSpell() {
      const char1 = this.profiencyRepository[this.characterArchetype.spellsClass["class"]];
      const char2 = (this.characterAttributes[this.characterArchetype.attributeBoost.find(t => t.value > 0).key] - 10) / 2;
      const char3 = this.characterLevel();
      if (this.characterArchetype)
        return 10 + parseInt(char1) + parseInt(char2) + parseInt(char3);
      else 0;
    },
    ModAttributeAttackSpell() {
      const char1 = this.profiencyRepository[this.characterArchetype.spellsClass["attack"]];
      const char2 = (this.characterAttributes[this.characterArchetype.attributeBoost.find(t => t.value > 0).key] - 10) / 2;
      const char3 = this.characterLevel();
      if (this.characterArchetype)
        return parseInt(char1) + parseInt(char2) + parseInt(char3);
      else 0;
    },
    computeSkillPool(skill) {
      //const attribute = this.attributes.find((a) => a.name === skill.attribute);
      // if (attribute) {
      //     return attribute.adjustedRating + skill.adjustedRating;
      // }
      // return skill.adjustedRating;

      const char1 = this.SkillsTrained[this.characterSkills[skill.key]];
      const char2 = (this.characterAttributesEnhanced[skill.attribute.toLowerCase()] - 10) / 2;
      const char3 = char1 === 0 ? 0 : this.characterLevel();
      const item = this.itemBonus(skill.key) && this.itemBonus(skill.key).value && this.itemBonus(skill.key).invest ? this.itemBonus(skill.key).value : 0;
      return parseInt(char1) + parseInt(char2) + parseInt(char3) + parseInt(item) - skill.conditionalAdjustment;

      // const attribute = (this.characterAttributesEnhanced[skill.attribute.toLowerCase()] - 10) / 2;

      // return attribute + this.SkillsTrained[skill.value] + this.characterLevel();


    },
    itemBonus(skill) {
      if (!this.charactermodificatorsBonus) return undefined
      const wear = this.$store.getters["characters/characterWearById"](
        this.characterId
      );
      const charGear = [
        ...this.charGear.filter(item => item.equipped?.invest === true)
      ].filter(Boolean);
      const itemBonus = this.charactermodificatorsBonus.filter(
        item =>
          (item.selector.includes(skill) || item.selector.includes("saving-throw")) &&
          item.type === 'item' &&
          charGear.some(gear => gear.key === item.source)
      )

      let typeMaxItem = itemBonus.length > 0 ? itemBonus[0] : 0

      if (itemBonus) {
        let invest = itemBonus.length > 0 && charGear.find(gear => gear.key === itemBonus[0].source) ? charGear.find(gear => gear.key === itemBonus[0].source).equipped.invest : false
        itemBonus.forEach(item => {
          if (typeMaxItem.value < item.value) {
            typeMaxItem = item
            invest = charGear.find(gear => gear.key === item.source).equipped.invest
          }


        })
        return { ...typeMaxItem, invest: invest }
      }

      return { ...typeMaxItem, invest: false }
    },
    handleXpInput(value) {
      // Немедленная фильтрация
      const numericValue = value.replace(/[^\d]/g, '');

      // Обновляем значение в поле
      this.$refs.xpInput.internalValue = numericValue;

      // Дебаунс для сохранения в хранилище
      clearTimeout(this.xpTimeout);
      this.xpTimeout = setTimeout(() => {
        this.$store.commit('characters/setCustomXp', {
          id: this.characterId,
          xp: numericValue
        });
      }, 300);
    },
    characterLevel() {
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },

    characterlabelL(key) {
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
    attackModifier(gear) {

      const modAbility = gear.range === null ? this.characterAttributesEnhanced["strength"] : this.characterAttributesEnhanced["dexterity"];

      const modProfiency = this.characterArchetype ? this.skillAttack[gear.category] : "U";

      const modLevel = modProfiency !== "U" ? this.characterLevel() : 0;
      const rune = this.weaponRunePotency.find(t => gear.runes && t.key === gear.runes.potency) ? this.weaponRunePotency.find(t => gear.runes && t.key === gear.runes.potency).addItemBonus : 0;

      return this.profiencyRepository[modProfiency] + (modAbility - 10) / 2 + modLevel + rune;
    },

    getTalentOption(talent, choiceKey) {
      return talent.options.find((t) => t.key === choiceKey);
    },
    wargearPrice(item) {
      if (item && item.price) {
        const pp = item.price.value.pp ? item.price.value.pp + " пм " : "";
        const gp = item.price.value.gp ? item.price.value.gp + " зм " : "";
        const sp = item.price.value.sp ? item.price.value.sp + " см " : "";
        const cp = item.price.value.cp ? item.price.value.cp + " мм " : "";
        return pp + gp + sp + cp;
      }
    },

    toggleResource(resourceItem, index) {
      const id = this.characterId;
      const resourceKey = resourceItem.key;

      const current = this.$store.getters['characters/characterResourceSpendById'](this.characterId, resourceKey);
      const spend = (index > current) ? current + 1 : current - 1;

      this.$store.commit('characters/setCharacterResourceSpend', { id, resourceKey, spend });
    },
    toggleResourceReloads(index) {
      const id = this.characterId;
      const current = this.characterReloads.spend;
      const spend = (index > current) ? current + 1 : current - 1;
      const resourceKey = 'reloads';
      this.$store.commit('characters/setCharacterResourceSpend', { id, spend, resourceKey });
    },
    toggleResourceFaith(index) {
      const id = this.characterId;
      const current = this.characterFaith.spend;
      const spend = (index > current) ? current + 1 : current - 1;
      this.$store.commit('characters/setCharacterFaithSpend', { id, spend });
    },
    openSkillsSettings() {
      this.skillsEditorDialog = true;
    },

    typeDamage(type) {
      return this.DamageType.find(t => t.key === type) ? this.DamageType.find(t => t.key === type).name : type;
    },
    damageModifier(gear) {

      const modAbility = gear.range === null ? this.characterAttributes["strength"] : this.characterAttributes["dexterity"];
      const mod = (modAbility - 10) / 2;
      const enc = this.$store.getters['characters/characterEnhancementsById'](this.characterId).filter(s => s.level <= this.characterLevel());

      //Для вычисления специализаций
      const spec = enc.find(s => s.type === "Weapon Specialization") ? enc.find(s => s.type === "Weapon Specialization") : "";
      const specGreater = enc.find(s => s.type === "greater-weapon-specialization") ? enc.find(s => s.type === "greater-weapon-specialization") : "";

      const damSpec = spec !== "" ? spec.bonusDamage[this.skillAttack[gear.category]] : 0;
      const damGreaterSpec = specGreater !== "" ? specGreater.bonusDamage[this.skillAttack[gear.category]] : 0;
      const modSpec = damGreaterSpec !== 0 ? damGreaterSpec : damSpec;

      //Для руны мощи 
      const runeStriking = gear.runes ? gear.runes.striking : 0;
      const damage = gear.damage?.die ? (gear.damage.dice + runeStriking) + gear.damage.die : gear.damage;
      const type = this.DamageType.find(t => t.key === gear.damageOrig.damageType) ? this.DamageType.find(t => t.key === gear.damageOrig.damageType).name : gear.damageOrig.damageType;

      ///Руны свойств
      let damageProperty = " ";
      const runeList = this.WeaponRuneProperty;
      gear.runes.property.forEach(rune => {
        const damageRune = runeList.find(t => t.key === rune.toLowerCase());
        if (damageRune) {
          damageProperty = damageProperty + " + " + damageRune.damage + " " + damageRune.type + " ";
        }
      })

      return damage.toString() + (mod + modSpec < 0 ? " " : " + ") + (mod + modSpec).toString() + " " + type + damageProperty;
    },

    wear(gear) {
      this.$store.commit('characters/wearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
    },

    unwear(gear) {
      this.$store.commit('characters/unwearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
    },
    wearShield(gear) {

      this.$store.commit('characters/wearCharacterShield', { id: this.characterId, gearId: gear.id, gear: gear });
    },

    unwearShield(gear) {
      this.$store.commit('characters/unwearCharacterShield', { id: this.characterId, gearId: gear.id, gear: gear });
    },
    toggleWear(item) {
      if (item.type === 'shield') {
        if (this.characterWearShield && this.characterWearShield.id === item.id) {
          this.unwearShield(item)
          const gear1 = {
            ...item,
            equip: false,
            equipped: {
              ...item.equipped,
              invest: false
            }
          };

          this.$store.commit(
            'characters/updateCharacterWargear',
            {
              id: this.characterId,
              gear: gear1
            }
          );
        } else {
          this.wearShield(item)
        }
      }
      else
        if (this.characterWearWargear && this.characterWearWargear.id === item.id) {
          this.unwear(item)
          const gear1 = {
            ...item,
            equip: false,
            equipped: {
              ...item.equipped,
              invest: false
            }
          };

          this.$store.commit(
            'characters/updateCharacterWargear',
            {
              id: this.characterId,
              gear: gear1
            }
          )
        } else {
          this.wear(item)
        }
    },
    openAtt() {
      this.dialogStat = {
        open: true,
        type: 'att',
        title: 'Атрибуты',
        payload: null
      }
    },
    openSkill(skill) {
      this.dialogStat = {
        open: true,
        type: 'skill',
        title: skill.name,
        payload: skill
      }
    },
    openSkill(skill) {
      this.dialogStat = {
        open: true,
        type: 'skill',
        title: skill.name,
        payload: skill
      }
    },
    characterHitPointsMax() {
      const species = this.characterHitPoints["species"]
        ? this.characterHitPoints["species"]
        : 0;
      const classh = this.characterHitPoints["class"]
        ? this.characterHitPoints["class"]
        : 0;

      const levelClass =
        (classh + (this.characterAttributesEnhanced["constitution"] - 10) / 2) *
        this.characterLevel();

      let status = 0;

      this.activeStatuses.forEach(effect => {
        if (effect && effect.rules) {
          if (effect.rules.find(s => s.selector))
            if (effect.rules.find(s => s.key === 'FlatModifier')) {
              const att = effect.rules.filter(s => s.selector).find(s => s.selector.join(',').includes('hp'))


              if (att)
                // if (effect.rules.find(s => s.key === 'FlatModifier').value === '-value')
                status = effect.value * this.characterLevel();

            }
        }
      })

      if (levelClass <= 0) return species - status;
      else return species + levelClass - status;
    },


    SkillClass() {
      return this.$store.getters["characters/characterSkillClassById"](
        this.characterId
      );
    },


  },
};
</script>

<style scoped lang="scss">
/* =========================
   BASE LAYOUT BLOCKS
========================= */

.attribute-box {
  &__container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 64px;
    height: 64px;
    margin: 2px;
    padding: 4px;
    border-radius: 10px;

    background: var(--ui-surface);
    border: 1px solid var(--ui-border);
  }

  &__value {
    display: flex;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--ui-text);
  }

  &__label {
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: var(--ui-muted);
  }
}

/* =========================
   SIZES
========================= */

.small {
  height: 24px;
}

td.small {
  font-size: 12px;
}

/* =========================
   SCROLL CONTAINERS
========================= */

.my-tabs-container {
  height: 620px;
  overflow: hidden;
}

.my-tab-item {
  height: 705px;
  overflow-y: auto;
}

.my-card-item {
  height: 120px;
  overflow-y: auto;
}

/* =========================
   DIVIDERS / LINES
========================= */

.sexy_line {
  display: block;
  border: none;
  height: 1px;
  background: linear-gradient(to right,
      transparent,
      var(--ui-border),
      transparent);
}

.line {
  height: 1px;
  margin: 0 1rem;
  flex-grow: 1;
  background: var(--ui-border);
}

/* =========================
   TAGS
========================= */

.tag {
  color: var(--ui-text-inverse);
  background: var(--ui-accent);
  padding: 0.5rem;
  font-size: 18px;
  border-radius: 0.25rem;
  text-transform: uppercase;
  text-align: center;
}

/* =========================
   TEXT BLOCKS
========================= */

.main-holder p {
  margin: 1em 0;
}

.head {
  font-weight: 600;
  color: var(--ui-text);
}

.main-holder-divider p {
  border-bottom: 1px solid var(--ui-border);
}

/* =========================
   ICONS
========================= */

.invert-icon {
  filter: invert(1) brightness(1.2);
}

/* =========================
   FAITH BOX
========================= */

.faith-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;

  border: 1px solid var(--ui-border);
  box-shadow: inset 0 0 4px var(--ui-shadow);

  margin: 2px;
  cursor: pointer;

  &--filled::before {
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    margin: 4px;
    background: var(--ui-danger);
  }
}

/* =========================
   TABLE STRIKE
========================= */

.crossed-row td {
  text-decoration: line-through;
  color: var(--ui-muted);
}

/* =========================
   ACTION / UI BUTTONS
========================= */

.action-btn,
.stat-btn {
  background: var(--ui-surface-soft) !important;
  color: var(--ui-text) !important;
  backdrop-filter: blur(6px);
}

.mod-btn {
  background: var(--ui-surface) !important;
  color: var(--ui-text) !important;
  min-width: 40px;
}

/* =========================
   VALUES
========================= */

.hp-value,
.ac-value,
.speed-value {
  color: var(--ui-success);
  font-size: 1.5rem;
  font-weight: bold;
}

/* =========================
   CARDS / LAYOUT
========================= */

.card-content {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  color: var(--ui-text);
  font-size: 0.9rem;
  font-weight: 500;
}

/* =========================
   ACTION LIST
========================= */

.action-item {
  display: flex;
  justify-content: space-between;
  padding: 6px 4px;
  border-bottom: 1px solid var(--ui-border);
}

.action-title {
  padding-left: 20px;
  color: var(--ui-text);
}

/* =========================
   VUETIFY FIXES
========================= */

.v-list-item {
  border-radius: 8px;
}

.v-list-item:hover {
  background: var(--ui-hover);
}

.custom-panel {
  border-radius: 10px;
  margin-bottom: 8px;

  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
}

.custom-panel:hover {
  border-color: var(--ui-border-strong);
  background: var(--ui-surface-hover);
}

.v-expansion-panel--active.custom-panel {
  background: var(--ui-surface-active);
}

/* =========================
   THEME TOKENS
========================= */



.notes-wrapper {
  display: flex;
  height: 100%;
}

.notes-sidebar {
  width: 220px;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px;
  overflow-y: auto;
}

.notes-editor {
  flex: 1;
  padding: 12px;
}

.note-item {
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
}

.note-item:hovesr {
  background: rgba(0, 0, 0, 0.05);
}

.note-item.active {
  background: rgba(53, 159, 223, 0.15);
}

.note-title-input {
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  border: none;
  outline: none;
  margin-bottom: 10px;
  color: var(--ui-text);
}

.note-active {
  background: rgba(0, 0, 0, 0.05);
  font-weight: 500;
}

.stat-left {
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.stat-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
