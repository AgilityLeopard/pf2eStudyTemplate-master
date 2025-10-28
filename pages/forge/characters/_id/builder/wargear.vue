<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <!-- manage current inventory -->

    <v-col :cols="6">
      <v-btn x-small @click="openMoneySettings(getMoney['pp'], 'pp')">
        Платина: {{ getMoney["pp"] }}
      </v-btn>
      <v-btn x-small @click="openMoneySettings(getMoney['gp'], 'gp')">
        Золото: {{ getMoney["gp"] }}
      </v-btn>
      <v-btn x-small @click="openMoneySettings(getMoney['sp'], 'sp')">
        Серебро: {{ getMoney["sp"] }}
      </v-btn>
      <v-btn x-small @click="openMoneySettings(getMoney['cp'], 'cp')">
        Медь: {{ getMoney["cp"] }}
      </v-btn>
    </v-col>

    <v-tabs centered grow color="red">
      <v-tab class="caption" key="tab-weapon" :href="`#tab-weapon`"
        ><h2 class="subtitle-2">Оружие</h2></v-tab
      >
      <v-tab class="caption" key="tab-armor" :href="`#tab-armor`"
        ><h2 class="subtitle-2">Доспех</h2></v-tab
      >
      <v-tab class="caption" key="tab-consumable" :href="`#tab-consumable`"
        ><h2 class="subtitle-2">Расходники</h2></v-tab
      >
      <v-tab class="caption" key="tab-gear" :href="`#tab-gear`"
        ><h2 class="subtitle-2">Снаряжение</h2></v-tab
      >

      <v-tab-item class="my-tab-item" key="tab-weapon" :value="`tab-weapon`">
        <v-col :cols="12">
          <!-- <v-card
            class="mb-4"
            dark
            dense
            outlined
            :color="manageWargear ? 'info' : ''"
            @click="manageWargear = !manageWargear"
          >
            <v-card-text class="pa-1">
              <v-icon>{{
                manageWargear ? "expand_less" : "expand_more"
              }}</v-icon>
              Управление Оружием({{ characterWeapon.length }})
            </v-card-text>
          </v-card> -->

          <!-- <h2 class="subtitle-1 text-center">Оружие</h2> -->

          <v-btn
            outlined
            block
            class="mt-2"
            color="success"
            @click="OpenWeaponSearch()"
          >
            Добавить оружие
          </v-btn>

          <v-data-table
            :headers="headers"
            :items="characterWeapon"
            :search="searchQuery"
            :page.sync="paginationWeapon.page"
            hide-default-footer
            @page-count="paginationWeapon.pageCount = $event"
            show-expand
            item-key="id"
          >
            <template v-slot:no-data> Нет предметов </template>

            <template v-slot:item.name="{ item }">
              <!-- <v-row> -->
              <span>{{ item.name }}</span>
              <!-- </v-row>
              <v-row> -->
              <!-- <div>
                  <trait-view v-if="item.traits" :item="item" class="mb-2" />
                </div> -->
              <!-- </v-row> -->
            </template>

            <template v-slot:item.attack="{ item }">
              <span>
                {{ attackModifier(item) }} /
                {{
                  item.traits.includes("быстрое")
                    ? attackModifier(item) - 4
                    : attackModifier(item) - 5
                }}

                /
                {{
                  item.traits.includes("быстрое")
                    ? attackModifier(item) - 8
                    : attackModifier(item) - 10
                }}
              </span>
            </template>

            <template v-slot:item.damage="{ item }">
              <span>
                {{ damageModifier(item) }}
                {{ typeDamage(item.damageOrig.damageType) }}
              </span>
            </template>

            <template v-slot:item.qty="{ item }">
              <span>
                <v-btn
                  icon
                  :disabled="item.qty === 1"
                  @click="decrementQty(item)"
                >
                  <v-icon color="red"> remove_circle </v-icon>
                </v-btn>
                {{ item.qty }}
                <v-btn icon @click="incrementQty(item)">
                  <v-icon color="orange"> add_circle </v-icon>
                </v-btn>
              </span>
            </template>

            <template v-slot:item.delete="{ item }">
              <v-btn
                outlined
                x-small
                color="info"
                @click="openWeaponSettings(item)"
              >
                <v-icon left> edit </v-icon>
              </v-btn>
            </template>

            <template v-slot:item.edit="{ item }">
              <v-btn outlined x-small color="error" @click="remove(item)">
                <v-icon left> delete </v-icon>
              </v-btn>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <CardItem :item="item" :wargearPrice="wargearPrice" />
              </td>
            </template>

            <template v-slot:no-results>
              <span class="text-center"
                >Ваш поиск по "{{ searchQuery }}" не дал результатов.</span
              >
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination
              v-model="paginationWeapon.page"
              :length="paginationWeapon.pageCount"
            />
          </div>
          <!-- Доспехи -->

          <v-dialog
            v-model="WeaponSearchDialog"
            :fullscreen="$vuetify.breakpoint.xsOnly"
            width="1400px"
            scrollable
          >
            <wargear-search
              v-if="
                // wargearSearchActive &&
                wargearList
                // manageWargear &&
                // characterWeapon
              "
              @cancel="WeaponSearchDialog = false"
              :repository="wargearList.filter((item) => item.type === 'weapon')"
              type="weapon"
              @select="add"
            />
          </v-dialog>

          <v-dialog
            v-model="weaponEditorDialog"
            :value="Weapon"
            width="600px"
            scrollable
            :fullscreen="$vuetify.breakpoint.xsOnly"
          >
            <v-card>
              <v-alert
                :value="alertMoney"
                type="error"
                text
                dense
                border="left"
              >
                У вас недостаточно денег на покупку
              </v-alert>

              <v-alert :value="alert" type="error" text dense border="left">
                Количество рун больше мощи оружия
              </v-alert>

              <v-card-title style="background-color: #262e37; color: #fff">
                Редактирование оружия
                <v-spacer />

                <v-icon dark @click="closeWeaponSettings">close</v-icon>
              </v-card-title>

              <v-card-text v-if="Weapon" class="pt-4">
                <v-row>
                  <!-- <v-sheet class="ma-2 pa-2"> -->

                  <v-col cols="6" sm="6">
                    <!-- <v-select
                      label="Разящая руна"
                      v-model="Striking"
                      :items="weaponRuneStriking"
                      item-text="name"
                      item-value="key"
                    ></v-select> -->

                    <!-- Кнопка, открывающая диалог -->
                    <span
                      >Руна Разящая:
                      <v-btn
                        outlined
                        small
                        color="primary"
                        @click="dialogStriking = true"
                      >
                        {{ strikingLabel }}
                      </v-btn>
                    </span>
                    <!-- Диалог выбора -->
                    <v-dialog v-model="dialogStriking" max-width="1400px">
                      <v-card>
                        <v-card-title class="headline"
                          >Выбор разящей руны</v-card-title
                        >
                        <v-card-text>
                          <v-row>
                            <v-col cols="6" sm="4">
                              <!-- <v-select
                                label="Разящая руна"
                                v-model="localStriking"
                                :items="weaponRuneStriking"
                                item-text="name"
                                item-value="key"
                                outlined
                              ></v-select> -->

                              <v-list dense class="rune-list">
                                <v-subheader>Выберите разящую руну</v-subheader>

                                <v-list-item
                                  v-for="rune in weaponRuneStriking"
                                  :key="rune.key"
                                  :value="rune.key"
                                  @click="localStriking = rune.key"
                                  :class="{
                                    'selected-rune': localStriking === rune.key,
                                  }"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>{{
                                      rune.name
                                    }}</v-list-item-title>
                                  </v-list-item-content>

                                  <v-list-item-icon
                                    v-if="localStriking === rune.key"
                                  >
                                    <v-icon color="success">mdi-check</v-icon>
                                  </v-list-item-icon>
                                </v-list-item>
                              </v-list>
                            </v-col>

                            <v-col cols="6" sm="8">
                              <div v-if="localStriking === 0">
                                Нет Руны (снять руну разящую с оружия)
                              </div>
                              <div
                                v-else-if="
                                  localStriking !== 0 &&
                                  weaponRuneStriking.find(
                                    (k) => k.key === localStriking
                                  ) !== undefined
                                "
                              >
                                <CardItem
                                  :item="
                                    StrikeItem(
                                      weaponRuneStriking.find(
                                        (k) => k.key === localStriking
                                      )
                                    )
                                  "
                                  :wargearPrice="wargearPrice"
                                />
                              </div>
                            </v-col>
                          </v-row>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="error"
                            @click="dialogStriking = false"
                          >
                            Отмена
                          </v-btn>
                          <v-btn color="success" @click="saveStrikingSelection">
                            Сохранить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>

                  <v-col cols="6" sm="6">
                    <!-- <v-select
                      label="Руна мощи"
                      v-model="Potency"
                      :items="weaponRunePotency"
                      item-text="name"
                      item-value="key"
                    ></v-select> -->

                    <!-- Кнопка, открывающая диалог -->
                    <span
                      >Руна Мощи:
                      <v-btn
                        outlined
                        small
                        color="primary"
                        @click="dialogPotency = true"
                      >
                        {{ potencyLabel }}
                      </v-btn>
                    </span>

                    <!-- Диалог выбора -->
                    <v-dialog v-model="dialogPotency" max-width="1400px">
                      <v-card>
                        <v-card-title class="headline"
                          >Выбор руны Мощи</v-card-title
                        >
                        <v-card-text>
                          <v-row>
                            <v-col cols="6" sm="4">
                              <!-- <v-select
                                label="Руна Мощи"
                                v-model="localPotency"
                                :items="weaponRunePotency"
                                item-text="name"
                                item-value="key"
                                outlined
                              ></v-select> -->
                              <v-list dense class="rune-list">
                                <v-subheader>Выберите разящую руну</v-subheader>

                                <v-list-item
                                  v-for="rune in weaponRunePotency"
                                  :key="rune.key"
                                  :value="rune.key"
                                  @click="localPotency = rune.key"
                                  :class="{
                                    'selected-rune': localPotency === rune.key,
                                  }"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>{{
                                      rune.name
                                    }}</v-list-item-title>
                                  </v-list-item-content>

                                  <v-list-item-icon
                                    v-if="localPotency === rune.key"
                                  >
                                    <v-icon color="success">mdi-check</v-icon>
                                  </v-list-item-icon>
                                </v-list-item>
                              </v-list>
                            </v-col>

                            <v-col cols="6" sm="8">
                              <div v-if="localPotency === 0">
                                Нет Руны (снять руну мощи с оружия)
                              </div>
                              <div
                                v-else-if="
                                  localPotency !== 0 &&
                                  weaponRunePotency.find(
                                    (k) => k.key === localPotency
                                  ) !== undefined
                                "
                              >
                                <CardItem
                                  :item="
                                    StrikeItem(
                                      weaponRunePotency.find(
                                        (k) => k.key === localPotency
                                      )
                                    )
                                  "
                                  :wargearPrice="wargearPrice"
                                />
                              </div>
                            </v-col>
                          </v-row>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="error"
                            @click="dialogPotency = false"
                          >
                            Отмена
                          </v-btn>
                          <v-btn color="success" @click="savePotencySelection">
                            Сохранить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>

                <!-- РУНЫ СВОЙСТВ -->
                <v-row>
                  <v-col cols="6" sm="6">
                    <span
                      >Руна Свойств:
                      <v-btn
                        outlined
                        small
                        color="primary"
                        @click="dialogProperty = true"
                      >
                        Выберите руны
                      </v-btn>
                    </span>
                    <v-row>
                      <v-chip class="mt-2" v-for="pr in Property" color="blue">
                        {{ RuneWeaponProperty.find((t) => t.key === pr).name }}
                      </v-chip>
                    </v-row>
                    <!-- Диалог выбора -->
                    <v-dialog v-model="dialogProperty" max-width="1400px">
                      <v-card>
                        <v-card-title class="headline"
                          >Выбор руны Свойств</v-card-title
                        >
                        <v-card-text>
                          <v-row>
                            <v-col cols="6" sm="4">
                              <!-- <v-select
                                label="Руна Мощи"
                                v-model="localPotency"
                                :items="weaponRunePotency"
                                item-text="name"
                                item-value="key"
                                outlined
                              ></v-select> -->
                              <v-list dense class="rune-list">
                                <v-subheader>Выберите Руну Свойств</v-subheader>

                                <v-list-item
                                  v-for="rune in PropertyRune"
                                  :key="rune.key"
                                  @click="toggleProperty(rune.key)"
                                  :class="{
                                    'selected-rune': localProperty.includes(
                                      rune.key
                                    ),
                                  }"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>{{
                                      rune.name
                                    }}</v-list-item-title>
                                  </v-list-item-content>

                                  <v-list-item-icon
                                    v-if="localProperty.includes(rune.key)"
                                  >
                                    <v-icon color="success">mdi-check</v-icon>
                                  </v-list-item-icon>
                                </v-list-item>
                              </v-list>
                            </v-col>

                            <v-col cols="6" sm="8">
                              <div>
                                <CardItem
                                  v-if="selectedRune"
                                  :item="PropertyItem(selectedRune)"
                                  :wargearPrice="wargearPrice"
                                />
                              </div>
                            </v-col>
                          </v-row>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="error"
                            @click="dialogProperty = false"
                          >
                            Отмена
                          </v-btn>
                          <v-btn color="success" @click="savePropertySelection">
                            Сохранить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                  <!-- </v-sheet> -->
                </v-row>
              </v-card-text>
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer />
                <v-btn small right color="success" @click="saveWeapon"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-tab-item>

      <v-tab-item class="my-tab-item" key="tab-armor" :value="`tab-armor`">
        <!-- <h2 class="subtitle-1 text-center">Доспехи</h2> -->

        <v-btn
          outlined
          block
          color="success"
          class="mt-2"
          @click="ArmorSearchDialog = true"
        >
          Добавить доспех
        </v-btn>

        <v-data-table
          :headers="headersArmor"
          :items="characterArmour"
          :search="searchQuery"
          :page.sync="paginationArmor.page"
          show-expand
          item-key="id"
          hide-default-footer
          @page-count="paginationArmor.pageCount = $event"
        >
          <template v-slot:no-data> Нет предметов </template>

          <template v-slot:item.nameGear="{ item }">
            <v-row
              ><span>{{ item.name }}</span></v-row
            >
            <v-row>
              <div>
                <trait-view v-if="item.traits" :item="item" class="mb-2" />
              </div>
            </v-row>
          </template>

          <template v-slot:item.wear="{ item }">
            <span>
              <v-btn
                outlined
                x-small
                :color="
                  characterWearWargear && characterWearWargear.id === item.id
                    ? 'info'
                    : 'warning'
                "
                @click="
                  characterWearWargear && characterWearWargear.id === item.id
                    ? unwear(item)
                    : wear(item)
                "
              >
                <v-icon left> lock </v-icon>

                <span
                  v-if="
                    characterWearWargear && characterWearWargear.id === item.id
                  "
                  >Снять
                </span>
                <span v-else>Надеть </span>
              </v-btn>
            </span>
          </template>

          <template v-slot:item.qty="{ item }">
            <span>
              <v-btn
                icon
                :disabled="item.qty === 1"
                @click="decrementQty(item)"
              >
                <v-icon color="red"> remove_circle </v-icon>
              </v-btn>
              {{ item.qty }}
              <v-btn icon @click="incrementQty(item)">
                <!--"-->
                <v-icon color="orange"> add_circle </v-icon>
              </v-btn>
            </span>
          </template>

          <template v-slot:item.delete="{ item }">
            <v-btn
              outlined
              x-small
              color="info"
              @click="openArmourSettings(item)"
            >
              <v-icon left> edit </v-icon>
            </v-btn>
          </template>

          <template v-slot:item.edit="{ item }">
            <v-btn outlined x-small color="error" @click="remove(item)">
              <v-icon left> delete </v-icon>
            </v-btn>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <CardItem :item="item" :wargearPrice="wargearPrice" />
            </td>
          </template>

          <template v-slot:no-results>
            <span class="text-center"
              >Ваш поиск по "{{ searchQuery }}" не дал результатов.</span
            >
          </template>
        </v-data-table>

        <div class="text-center pt-2">
          <v-pagination
            v-model="paginationArmor.page"
            :length="paginationArmor.pageCount"
          />
        </div>

        <v-col :cols="12">
          <v-dialog
            v-model="armorEditorDialog"
            :value="Armor"
            width="1000px"
            scrollable
            :fullscreen="$vuetify.breakpoint.xsOnly"
          >
            <v-card>
              <v-alert :value="alert1" type="error" text dense border="left">
                Количество рун больше мощи доспеха
              </v-alert>
              <v-card-title style="background-color: #262e37; color: #fff">
                Редактирование доспеха
                <v-spacer />
                <v-icon dark @click="closeArmourSettings">close</v-icon>
              </v-card-title>

              <v-card-text v-if="Armor" class="pt-4">
                <v-row>
                  <v-col cols="6" sm="6">
                    <!-- Кнопка, открывающая диалог -->
                    <span
                      >Руна Стойкости:
                      <v-btn
                        outlined
                        small
                        color="primary"
                        @click="dialogResilientArmor = true"
                      >
                        {{ ResilientArmorLabel }}
                      </v-btn>
                    </span>
                    <!-- Диалог выбора -->
                    <v-dialog v-model="dialogResilientArmor" max-width="1400px">
                      <v-card>
                        <v-card-title class="headline"
                          >Выбор разящей руны</v-card-title
                        >
                        <v-card-text>
                          <v-row>
                            <v-col cols="6" sm="4">
                              <!-- <v-select
                                label="Разящая руна"
                                v-model="localStriking"
                                :items="weaponRuneStriking"
                                item-text="name"
                                item-value="key"
                                outlined
                              ></v-select> -->

                              <v-list dense class="rune-list">
                                <v-subheader>Выберите разящую руну</v-subheader>

                                <v-list-item
                                  v-for="rune in armourRuneResilent"
                                  :key="rune.key"
                                  :value="rune.key"
                                  @click="localResilientArmor = rune.key"
                                  :class="{
                                    'selected-rune':
                                      localResilientArmor === rune.key,
                                  }"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>{{
                                      rune.name
                                    }}</v-list-item-title>
                                  </v-list-item-content>

                                  <v-list-item-icon
                                    v-if="localResilientArmor === rune.key"
                                  >
                                    <v-icon color="success">mdi-check</v-icon>
                                  </v-list-item-icon>
                                </v-list-item>
                              </v-list>
                            </v-col>

                            <v-col cols="6" sm="8">
                              <div v-if="localResilientArmor === 0">
                                Нет Руны (снять руну с доспеха)
                              </div>
                              <div
                                v-else-if="
                                  localResilientArmor !== 0 &&
                                  armourRuneResilent.find(
                                    (k) => k.key === localResilientArmor
                                  ) !== undefined
                                "
                              >
                                <CardItem
                                  :item="
                                    StrikeItem(
                                      armourRuneResilent.find(
                                        (k) => k.key === localResilientArmor
                                      )
                                    )
                                  "
                                  :wargearPrice="wargearPrice"
                                />
                              </div>
                            </v-col>
                          </v-row>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="error"
                            @click="dialogResilientArmor = false"
                          >
                            Отмена
                          </v-btn>
                          <v-btn
                            color="success"
                            @click="saveResilientArmorSelection"
                          >
                            Сохранить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>

                  <v-col cols="6" sm="6">
                    <!-- Кнопка, открывающая диалог -->
                    <span
                      >Руна Мощи:
                      <v-btn
                        outlined
                        small
                        color="primary"
                        @click="dialogPotencyArmor = true"
                      >
                        {{ PotencyArmorLabel }}
                      </v-btn>
                    </span>
                    <!-- Диалог выбора -->
                    <v-dialog v-model="dialogPotencyArmor" max-width="1400px">
                      <v-card>
                        <v-card-title class="headline"
                          >Выбор руны Мощи</v-card-title
                        >
                        <v-card-text>
                          <v-row>
                            <v-col cols="6" sm="4">
                              <!-- <v-select
                                label="Руна Мощи"
                                v-model="localPotency"
                                :items="weaponRunePotency"
                                item-text="name"
                                item-value="key"
                                outlined
                              ></v-select> -->
                              <v-list dense class="rune-list">
                                <v-subheader>Выберит руну vjob</v-subheader>

                                <v-list-item
                                  v-for="rune in armourRunePotency"
                                  :key="rune.key"
                                  :value="rune.key"
                                  @click="localPotencyArmor = rune.key"
                                  :class="{
                                    'selected-rune':
                                      localPotencyArmor === rune.key,
                                  }"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>{{
                                      rune.name
                                    }}</v-list-item-title>
                                  </v-list-item-content>

                                  <v-list-item-icon
                                    v-if="localPotencyArmor === rune.key"
                                  >
                                    <v-icon color="success">mdi-check</v-icon>
                                  </v-list-item-icon>
                                </v-list-item>
                              </v-list>
                            </v-col>

                            <v-col cols="6" sm="8">
                              <div v-if="localPotencyArmor === 0">
                                Нет Руны (снять руну мощи с оружия)
                              </div>
                              <div
                                v-else-if="
                                  localPotencyArmor !== 0 &&
                                  armourRunePotency.find(
                                    (k) => k.key === localPotencyArmor
                                  ) !== undefined
                                "
                              >
                                <CardItem
                                  :item="
                                    StrikeItem(
                                      armourRunePotency.find(
                                        (k) => k.key === localPotencyArmor
                                      )
                                    )
                                  "
                                  :wargearPrice="wargearPrice"
                                />
                              </div>
                            </v-col>
                          </v-row>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="error"
                            @click="dialogPotencyArmor = false"
                          >
                            Отмена
                          </v-btn>
                          <v-btn
                            color="success"
                            @click="savePotencyArmorSelection"
                          >
                            Сохранить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                </v-row>

                <!-- РУНЫ СВОЙСТВ -->
                <v-row>
                  <v-col cols="6" sm="6">
                    <span
                      >Руна Свойств:
                      <v-btn
                        outlined
                        small
                        color="primary"
                        @click="dialogPropertyArmor = true"
                      >
                        Выберите руны
                      </v-btn>
                    </span>
                    <v-row>
                      <v-chip
                        class="mt-2"
                        v-for="pr in PropertyArmor"
                        color="blue"
                      >
                        {{ RuneArmorProperty.find((t) => t.key === pr).name }}
                      </v-chip>
                    </v-row>
                    <!-- Диалог выбора -->
                    <v-dialog v-model="dialogPropertyArmor" max-width="1400px">
                      <v-card>
                        <v-card-title class="headline"
                          >Выбор руны Свойств</v-card-title
                        >
                        <v-card-text>
                          <v-row>
                            <v-col cols="6" sm="4">
                              <!-- <v-select
                                label="Руна Мощи"
                                v-model="localPotency"
                                :items="weaponRunePotency"
                                item-text="name"
                                item-value="key"
                                outlined
                              ></v-select> -->
                              <v-list dense class="rune-list">
                                <v-subheader>Выберите Руну Свойств</v-subheader>

                                <v-list-item
                                  v-for="rune in PropertyArmorRune"
                                  :key="rune.key"
                                  @click="togglePropertyArmor(rune.key)"
                                  :class="{
                                    'selected-rune':
                                      localPropertyArmor.includes(rune.key),
                                  }"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>{{
                                      rune.name
                                    }}</v-list-item-title>
                                  </v-list-item-content>

                                  <v-list-item-icon
                                    v-if="localPropertyArmor.includes(rune.key)"
                                  >
                                    <v-icon color="success">mdi-check</v-icon>
                                  </v-list-item-icon>
                                </v-list-item>
                              </v-list>
                            </v-col>

                            <v-col cols="6" sm="8">
                              <div>
                                <CardItem
                                  v-if="selectedRuneArmor"
                                  :item="PropertyArmorItem(selectedRuneArmor)"
                                  :wargearPrice="wargearPrice"
                                />
                              </div>
                            </v-col>
                          </v-row>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            text
                            color="error"
                            @click="dialogPropertyArmor = false"
                          >
                            Отмена
                          </v-btn>
                          <v-btn
                            color="success"
                            @click="savePropertyArmorSelection"
                          >
                            Сохранить
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-col>
                  <!-- </v-sheet> -->
                </v-row>
              </v-card-text>
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer />
                <v-btn small right color="success" @click="saveArmor"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="ArmorSearchDialog"
            :fullscreen="$vuetify.breakpoint.xsOnly"
            width="1400px"
            scrollable
          >
            <v-col :cols="12" v-if="wargearList">
              <wargear-search
                @cancel="ArmorSearchDialog = false"
                type="armor"
                :repository="
                  wargearList.filter((item) =>
                    ['armor', 'shield'].includes(item.type)
                  )
                "
                @select="add"
              />
            </v-col>
          </v-dialog>
        </v-col>
      </v-tab-item>

      <v-tab-item
        class="my-tab-item"
        key="tab-consumable"
        :value="`tab-consumable`"
      >
        <!-- <h2 class="subtitle-1 text-center">Расходники</h2> -->

        <v-btn
          outlined
          block
          color="success"
          class="mt-2"
          @click="ConsumableSearchDialog = true"
        >
          Добавить расходники
        </v-btn>

        <v-data-table
          :headers="headersСonsumable"
          :items="characterConsumable"
          :search="searchQuery"
          :page.sync="paginationCon.page"
          show-expand
          item-key="id"
          hide-default-footer
          @page-count="paginationCon.pageCount = $event"
        >
          <template v-slot:no-data> Нет предметов </template>

          <template v-slot:item.nameGear="{ item }">
            <span>{{ item.name }}</span>

            <!-- <v-row>
              <div>
                <trait-view v-if="item.traits" :item="item" class="mb-2" />
              </div>
            </v-row> -->
          </template>

          <template v-slot:item.qty="{ item }">
            <span>
              <v-btn
                icon
                :disabled="item.qty === 1"
                @click="decrementQty(item)"
              >
                <v-icon color="red"> remove_circle </v-icon>
              </v-btn>
              {{ item.qty }}
              <v-btn icon @click="incrementQty(item)">
                <!--"-->
                <v-icon color="orange"> add_circle </v-icon>
              </v-btn>
            </span>
          </template>

          <template v-slot:item.edit="{ item }">
            <v-btn outlined x-small color="error" @click="remove(item)">
              <v-icon left> delete </v-icon>
            </v-btn>
          </template>

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <CardItem :item="item" :wargearPrice="wargearPrice" />
            </td>
          </template>

          <template v-slot:no-results>
            <span class="text-center"
              >Ваш поиск по "{{ searchQuery }}" не дал результатов.</span
            >
          </template>
        </v-data-table>

        <div class="text-center pt-2">
          <v-pagination
            v-model="paginationCon.page"
            :length="paginationCon.pageCount"
          />
        </div>

        <v-dialog
          v-model="ConsumableSearchDialog"
          :fullscreen="$vuetify.breakpoint.xsOnly"
          width="1400px"
          scrollable
        >
          <v-col :cols="12" v-if="wargearList">
            <!-- <v-card
              class="mb-4"
              dark
              outlined
              :color="armourSearchActive ? 'info' : ''"
              @click="armourSearchActive = !armourSearchActive"
            >
              <v-card-text class="pa-1">
                <v-icon>{{
                  armourSearchActive ? "expand_less" : "expand_more"
                }}</v-icon>
                Добавить доспех
              </v-card-text>
            </v-card> -->

            <wargear-search
              @cancel="ConsumableSearchDialog = false"
              type="consumable"
              :repository="
                wargearList.filter((item) => item.type.includes('consumable'))
              "
              @select="add"
            />
          </v-col>
        </v-dialog>
      </v-tab-item>

      <v-tab-item class="my-tab-item" key="tab-gear" :value="`tab-gear`">
        <!-- <h2 class="subtitle-1 text-center">Снаряжение</h2> -->

        <!-- <v-btn
          color="success"
          small
          rounded
          elevation="0"
          class="gear-btn"
          @click="GearSearchDialog = true"
        >
          <v-icon left>mdi-plus-circle-outline</v-icon>
          Добавить снаряжение
        </v-btn> -->

        <v-btn
          outlined
          block
          class="mt-2"
          color="success"
          @click="GearSearchDialog = true"
        >
          Добавить снаряжение
        </v-btn>

        <div
          v-for="group in groupedGear"
          :key="group.header"
          class="gear-section"
        >
          <!-- <v-subheader>{{ Worn(group.header) }}</v-subheader> -->

          <div class="gear-section-header">
            <v-icon small class="mr-2">mdi-shield-outline</v-icon>
            {{ Worn(group.header) }}
          </div>
          <div class="table-container">
            <v-data-table
              :headers="headersСonsumable"
              :items="group.items"
              :search="searchQuery"
              class="gear-section-table fixed-columns-table"
              show-expand
              item-key="id"
            >
              <template v-slot:no-data> Нет предметов </template>

              <template v-slot:item.nameGear="{ item }">
                <!-- <v-row> -->
                <span>{{ item.name }}</span>
                <!-- </v-row>
                <v-row>
                  <div>
                    <trait-view v-if="item.traits" :item="item" class="mb-2" />
                  </div>
                </v-row> -->
              </template>

              <template v-slot:item.qty="{ item }">
                <span>
                  <v-btn
                    icon
                    :disabled="item.qty === 1"
                    @click="decrementQty(item)"
                  >
                    <v-icon color="red"> remove_circle </v-icon>
                  </v-btn>
                  {{ item.qty }}
                  <v-btn icon @click="incrementQty(item)">
                    <!--"-->
                    <v-icon color="orange"> add_circle </v-icon>
                  </v-btn>
                </span>
              </template>

              <template v-slot:item.edit="{ item }">
                <v-btn outlined x-small color="error" @click="remove(item)">
                  <v-icon left> delete </v-icon>
                </v-btn>
              </template>

              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <CardItem :item="item" :wargearPrice="wargearPrice" />
                </td>
              </template>

              <template v-slot:no-results>
                <span class="text-center"
                  >Ваш поиск по "{{ searchQuery }}" не дал результатов.</span
                >
              </template>
            </v-data-table>
          </div>
        </div>

        <v-dialog
          v-model="GearSearchDialog"
          :fullscreen="$vuetify.breakpoint.xsOnly"
          width="1400px"
          scrollable
        >
          <v-col :cols="12" v-if="wargearList">
            <!-- <v-card
              class="mb-4"
              dark
              outlined
              :color="armourSearchActive ? 'info' : ''"
              @click="armourSearchActive = !armourSearchActive"
            >
              <v-card-text class="pa-1">
                <v-icon>{{
                  armourSearchActive ? "expand_less" : "expand_more"
                }}</v-icon>
                Добавить доспех
              </v-card-text>
            </v-card> -->

            <wargear-search
              @cancel="GearSearchDialog = false"
              type="other"
              :repository="
                wargearList.filter(
                  (item) =>
                    !['consumable', 'weapon', 'armor', 'shield'].includes(
                      item.type
                    )
                )
              "
              @select="add"
            />
          </v-col>
        </v-dialog>
      </v-tab-item>
    </v-tabs>

    <v-dialog
      v-model="moneyEditorDialog"
      width="600px"
      scrollable
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card>
        <v-card-title style="background-color: #262e37; color: #fff">
          {{ groupMoney[labelMoney] }}
          <v-spacer />
          <v-icon dark @click="closeMoneySettings">close</v-icon>
        </v-card-title>

        <v-card-text class="pt-4">
          <v-row>
            <v-col cols="6" sm="6">
              <v-text-field
                label="Установить количество монет"
                dense
                required
                v-model="gp"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-btn small center color="info" @click="changeMoney()"
                >Установить</v-btn
              >
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6" sm="6">
              <v-text-field
                label="Прибавить количество монет"
                dense
                required
                v-model="gpAd"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="6">
              <v-btn small right color="info" @click="adjustMoney()"
                >Скорректировать</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer />
          <!-- <v-btn small right color="сфт" @click="changeMoney()"
              >Save</v-btn
            > -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="js">
import WargearSearch from '~/components/forge/WargearSearch.vue';
import WargearSelect from '~/components/forge/WargearSelect.vue';
import CharacterCreationMixin from '~/mixins/CharacterCreationMixin';
import SluggerMixin from '~/mixins/SluggerMixin';
import WargearMixin from '~/mixins/WargearMixin';
import WargearTrait from '~/mixins/WargearTraitRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import traitView from '~/components/TraitView';
import CardItem from '@/components/CardItem.vue';
import { rearg } from 'lodash';

// import RulesMixin from '~/mixins/RulesCombatActionsMixin';


export default {
  name: 'Wargear',
  layout: 'forge',
  components: {
    WargearSelect,
    WargearSearch,
    traitView,
    CardItem
  },

  mixins: [
    CharacterCreationMixin,
    SluggerMixin,
    WargearMixin,
    WargearTrait,
    StatRepositoryMixin,

  ],
  props: [],
  head() {
    return {
      title: 'Select Wargear',
    };
  },

  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      manageWargear: true,
      manageArmour: true,
      //Диалоги
      weaponEditorDialog: false,
      moneyEditorDialog:false,
      armorEditorDialog: false,
      WeaponSearchDialog: false,
      ArmorSearchDialog: false,
      GearSearchDialog: false,
      ConsumableSearchDialog: false,
      //

      searchQuery: '',
        pagination: {
        page: 1,
        pageCount: 0,
        sortBy: 'name',
        rowsPerPage: 8,
      },
      paginationArmor: {
        page: 1,
        pageCount: 0,
        sortBy: 'name',
        rowsPerPage: 8,
      },
            paginationWeapon: {
        page: 1,
        pageCount: 0,
        sortBy: 'name',
        rowsPerPage: 8,
      },
            paginationCon: {
        page: 1,
        pageCount: 0,
        sortBy: 'name',
        rowsPerPage: 8,
      },
            paginationGear: {
        page: 1,
        pageCount: 0,
        sortBy: 'name',
        rowsPerPage: 8,
      },
      startingWargearExpand: true,
      wargearSearchActive: false,
      armourSearchActive: false,
      loading: false,
      alert: false,
      alertMoney: false,
      alert1: false,
      archetype: undefined,
      wargearList: undefined,
      armourList: undefined,
      advancedShoppingChart: [],
      groupMoney: {
        pp: "Платина",
        gp: "Золото",
        sp: "Серебро",
        cp: "Медь",
      },
      Striking: "none",
      Resilent: "none",
      Potency: "none",

      ResilientArmor: "none",
      PotencyArmor: "none",

      Property: [],
      PropertyArmor: [],

      dialogStriking: false,
      dialogPotency: false,
      dialogProperty: false,
            localProperty: [], // выбранные ключи
    selectedRune: null, // последняя кликнутая руна
      localStriking: undefined, // временное значение для диалога
      localPotency: undefined,


      dialogResilientArmor: false,
      dialogPotencyArmor: false,
      dialogPropertyArmor: false,
            localPropertyArmor: [], // выбранные ключи
    selectedRuneArmor: null, // последняя кликнутая руна
      localResilientArmor: undefined, // временное значение для диалога
      localPotencyArmor: undefined,



      gp: undefined,
      gpAd: undefined,
      labelMoney: undefined,
      Weapon: undefined,
      money: undefined,
      Armor: undefined,
      runeWeapon:{
        potency: 'none',
        striking: 'none',
        property: [],
      },
      runeArmor:{
        potency: 'none',
        resilient: 'none',
        property: [],
      } ,
      headers: [
  {
    text: 'Название',
    value: 'name',
    align: 'left',
    class: 'text-left',
    width: '250px',
  },
        {
          text: 'Попадание', value: 'attack', class: 'text-center', align: 'center', width: '120px',
        },
        {
          text: 'Урон', value: 'damage', class: 'text-center ', align: 'center', width: '150px',
        },
          {
    text: 'Количество',
    value: 'qty',
    align: 'center',
    class: 'text-center',
    width: '150px',
  },
        {
    text: '',
    value: 'edit',
    align: 'center',
    class: 'text-center',
    width: '60px',
  },
  {
    text: '',
    value: 'delete',
    align: 'center',
    class: 'text-center',
    width: '60px',
  },
   { text: '', value: 'data-table-expand', width: '50px' }
      ],
        headersArmor: [
  {
    text: 'Название',
    value: 'name',
    align: 'left',
    class: 'text-left',
    width: '250px',
  },
        {
          text: 'Надето', value: 'wear', class: 'text-center', align: 'center',  width: '100px',
        },
          {
    text: 'Количество',
    value: 'qty',
    align: 'center',
    class: 'text-center',
    width: '150px',
  },
 {
    text: '',
    value: 'edit',
    align: 'center',
    class: 'text-center',
    width: '60px',
  },
  {
    text: '',
    value: 'delete',
    align: 'center',
    class: 'text-center',
    width: '60px',
  },
   { text: '', value: 'data-table-expand', width: '50px' }
      ],
headersСonsumable: [
  {
    text: 'Название',
    value: 'nameGear',
    align: 'left',
    class: 'text-left',
    width: '250px',
  },
  {
    text: 'Количество',
    value: 'qty',
    align: 'center',
    class: 'text-center',
    width: '150px',
  },
  {
    text: '',
    value: 'edit',
    align: 'center',
    class: 'text-center',
    width: '60px',
  },
  {
    text: '',
    value: 'delete',
    align: 'center',
    class: 'text-center',
    width: '60px',
  },
   { text: '', value: 'data-table-expand', width: '50px' }
],

    };
  },
  computed: {
    showAdvancedStartingWargearSection() {
      return this.characterArchetypeKey === 'advanced';
    },
    showArchetypeStartingWargearSection() {
      return this.characterArchetypeKey !== 'advanced' && this.startingWargear && this.startingWargear.length > 0;
    },
    // total: 20, max: 9, maxRarity: 'Rare', maxRarityItems: 2,
    advancedWargearRestrictions() {
      return this.getAdvancedWargearOptionByTier(this.characterArchetypeTier);
    },
    advancedWargearSpend() {
      let spend = 0;
      this.advancedShoppingChart.forEach((gear) => {
        spend += parseInt(gear.value);
      });
      return spend;
    },
    // advancedWargearByRarity() {
    //   const rarityCount = {
    //     uncommon: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Uncommon').length,
    //     common: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Common').length,
    //     rare: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Rare').length,
    //     veryRare: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Very Rare').length,
    //     unique: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Unique').length,
    //   };
    //   return rarityCount;
    // },
    advancedWargearViolations() {
      const alerts = [];
      const restrictions = this.advancedWargearRestrictions;
      if (restrictions) {
        // max total spend
        if ( this.advancedWargearSpend > restrictions.total ) {
          alerts.push(`You spend ${this.advancedWargearSpend} of your allowed ${restrictions.total} points.`);
        }
        // max per item spend
        const violating = this.advancedShoppingChart.filter((gear) => gear.value > restrictions.max);
        if ( violating.length > 0 ) {
          alerts.push(`${violating.length} item|s cost more than ${restrictions.max}`);
        }
        // within rarity of items
        if ( restrictions.rarity && restrictions.rarity.rare > restrictions.rarity.rare ) {
          alerts.push(`You selected ${this.advancedWargearByRarity.rare} Rare items, but are only allowed ${restrictions.rarity.rare}`);
        }
        if ( restrictions.rarity && this.advancedWargearByRarity.veryRare > restrictions.rarity.veryRare ) {
          alerts.push(`You selected ${this.advancedWargearByRarity.veryRare} Very Rare items, but are only allowed ${restrictions.rarity.veryRare}`);
        }
        if ( restrictions.rarity && this.advancedWargearByRarity.unique > restrictions.rarity.unique ) {
          alerts.push(`You selected ${this.advancedWargearByRarity.unique} Unique items, but are only allowed ${restrictions.rarity.unique}`);
        }
        //this.advancedShoppingChart.
      }
      return alerts;
    },

    // Руны и их выбор
     // -------------------
 strikingLabel() {
    const found = this.weaponRuneStriking.find(i => i.key === this.Striking);
    return found && found.key !== 0 ? found.name : "Выбрать разящую руну";
    },

   potencyLabel() {
    const found = this.weaponRunePotency.find(i => i.key === this.Potency);
    return found && found.key !== 0 ? found.name : "Выбрать руну мощи";
  },

   ResilientArmorLabel() {
    const found = this.armourRuneResilent.find(i => i.key === this.ResilientArmor);
    return found  && found.key !== 0 ? found.name : "Выбрать руну стойкости";
    },

   PotencyArmorLabel() {
    const found = this.armourRunePotency.find(i => i.key === this.PotencyArmor);
    return found && found.key !== 0 ? found.name : "Выбрать руну мощи";
  },
    // -------------------

    sources() {
      return [
        'playerCore',
        'GMCore',
        // 'tnh',
        ...this.settingHomebrews
      ];
    },
    RuneWeaponProperty() {
      return this.wargearList
  .filter(
    s =>
      s.usage?.value === 'etched-onto-a-weapon' &&
      s.name.toLowerCase().includes('руна')
  )
  .map(s => ({
    name: s.name,
    key: s.key
  }));
    },
        RuneArmorProperty() {
      return this.wargearList
  .filter(
    s =>
      s.usage?.value === 'etched-onto-armor' &&
      s.name.toLowerCase().includes('руна')
  )
  .map(s => ({
    name: s.name,
    key: s.key
  }));
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterArchetypeTier() {
      return this.$store.getters['characters/characterArchetypeTierById'](this.characterId);
    },
    characterWargearRaw() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    skillAttack() {
      return this.$store.getters['characters/characterskillAttackById'](this.characterId);
    },
    skillDefence() {
      return this.$store.getters['characters/characterskillDefenceById'](this.characterId);
    },
    startingWargear() {
      if ( this.archetype ) {
        return this.archetype.wargear;
      }
      return [];
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },

    getMoney() {
      return this.$store.getters['characters/characterMoneyById'](this.characterId);
    },
    characterWearWargear() {
      return this.$store.getters['characters/characterWearById'](this.characterId);
    },

    characterWargear() {
      const characterWargear = [];

      if (this.wargearList){
        const Category = this.weaponCategoryRepository.map(item => item.category);
        this.characterWargearRaw.filter(item => Category.includes(item.category)).forEach((chargear) => {
          // this.characterWargearRaw.forEach((chargear) => {
          let gear = {};
          gear = this.wargearList.find((wargear) => chargear.name.localeCompare(wargear.name, 'en' , {sensitivity: 'accent'}) === 0);
          if (gear) {
            gear.id = chargear.id;
            gear.source = chargear.source;
            characterWargear.push({
              id: chargear.id,
              name: gear.nameGear,
              damage: gear.damage,
              damageOrig: gear.damage,
              group: this.groupLabel(gear.group),
              subtitle: this.wargearSubtitle(gear),
              type: gear.type,
              avatar: this.getAvatar(gear.type),
              source: chargear.source,
              ...gear
            });
          } else {
            characterWargear.push({
              id: chargear.id,
              name: chargear.name,
              type: 'Misc',
              subtitle: 'Misc',
              avatar: this.getAvatar('Misc'),
              source: chargear.source,
            });
          }
        });
      }
      return characterWargear;
    },
    characterWeapon() {
      const characterWargear = [];

      if (this.wargearList){
        const Category = this.weaponCategoryRepository.map(item => item.category);
        this.characterWargearRaw.filter(item => Category.includes(item.category)).forEach((chargear) => {
          // this.characterWargearRaw.forEach((chargear) => {
          let gear = {};
          gear = this.wargearList.find((wargear) => chargear.name.localeCompare(wargear.name, 'en' , {sensitivity: 'accent'}) === 0);
          if (gear) {
            gear.id = chargear.id;
            gear.source = chargear.source;
            characterWargear.push({
              id: chargear.id,
              trait: gear.traits,
              qty: gear.qty,
               damageOrig: gear.damage,
              // name: gear.nameGear,
              // source: chargear.source,
              ...chargear,
              // subtitle: this.wargearSubtitle(gear),
              // avatar: this.getAvatar(gear.type),

            });
          } else {
            characterWargear.push({
              id: chargear.id,
              name: chargear.name,
              type: 'Misc',
              subtitle: 'Misc',
              avatar: this.getAvatar('Misc'),
              source: chargear.source,
            });
          }
        });
      }
      return characterWargear;
    },
    characterArmour() {
      const characterWargear = [];

      if (this.wargearList){
        const Category = this.armourCategoryRepository.map(item => item.category);
        this.characterWargearRaw.filter(item => Category.includes(item.category)).forEach((chargear) => {
          // this.characterWargearRaw.forEach((chargear) => {
          let gear = {};
          gear = this.wargearList.find((wargear) => chargear.name.localeCompare(wargear.name, 'en' , {sensitivity: 'accent'}) === 0);
          if (gear) {
            gear.id = chargear.id;
            gear.source = chargear.source;
            characterWargear.push({
              id: chargear.id,
              // name: gear.nameGear,
              // source: chargear.source,
              ...chargear,
              // subtitle: this.wargearSubtitle(gear),
              // avatar: this.getAvatar(gear.type),

            });
          } else {
            characterWargear.push({
              id: chargear.id,
              name: chargear.name,
              type: 'Misc',
              subtitle: 'Misc',
              avatar: this.getAvatar('Misc'),
              source: chargear.source,
            });
          }
        });
      }
      return characterWargear;
    },
        characterConsumable() {
      const characterWargear = [];

      if (this.wargearList){
        const Category = this.armourCategoryRepository.map(item => item.category);
        this.characterWargearRaw.filter(item => item.type.includes("consumable")).forEach((chargear) => {
          // this.characterWargearRaw.forEach((chargear) => {
          let gear = {};
          gear = this.wargearList.find((wargear) => chargear.name.localeCompare(wargear.name, 'en' , {sensitivity: 'accent'}) === 0);
          if (gear) {
            gear.id = chargear.id;
            gear.source = chargear.source;
            characterWargear.push({
              id: chargear.id,
              // name: gear.nameGear,
              // source: chargear.source,
              ...chargear,
              // subtitle: this.wargearSubtitle(gear),
              // avatar: this.getAvatar(gear.type),

            });
          } else {
            characterWargear.push({
              id: chargear.id,
              name: chargear.name,
              type: 'Misc',
              subtitle: 'Misc',
              avatar: this.getAvatar('Misc'),
              source: chargear.source,
            });
          }
        });
      }
      return characterWargear;
    },
    characterGear() {
      const characterWargear = [];

      if (this.wargearList){
        const Category = this.armourCategoryRepository.map(item => item.category);
        this.characterWargearRaw.filter(item => !['consumable', 'weapon', 'armor', 'shield'].includes(
                      item.type)).forEach((chargear) => {
          // this.characterWargearRaw.forEach((chargear) => {
          let gear = {};
          gear = this.wargearList.find((wargear) => chargear.name.localeCompare(wargear.name, 'en' , {sensitivity: 'accent'}) === 0);
          if (gear) {
            gear.id = chargear.id;
            gear.source = chargear.source;
            characterWargear.push({
              id: chargear.id,
              // name: gear.nameGear,
              // source: chargear.source,
              ...chargear,
              // subtitle: this.wargearSubtitle(gear),
              // avatar: this.getAvatar(gear.type),

            });
          } else {
            characterWargear.push({
              id: chargear.id,
              name: chargear.name,
              type: 'Misc',
              subtitle: 'Misc',
              avatar: this.getAvatar('Misc'),
              source: chargear.source,
            });
          }
        });
      }
      return characterWargear;
    },
     groupedGear() {
    const groups = {};
    this.characterGear.forEach(item => {
      const type = item.usage.value || "Прочее";
      if (!groups[type]) groups[type] = [];
      groups[type].push(item);
    });
    return Object.entries(groups).map(([type, items]) => ({
      header: type ,
      items
    }));
  },
      PropertyRune() {
      const result = this.wargearList.filter(s => s.usage?.value === 'etched-onto-a-weapon' && s.name.toLowerCase().includes('руна')).map(s => (
        {
        name: s.name,
    key: s.key
  }));
      const property = result.filter(s => !s.key.includes("striking")).filter(s => !s.key.includes("potency"))
    return property
    },
PropertyArmorRune() {
      const result = this.wargearList.filter(s => s.usage?.value === 'etched-onto-armor' && s.name.toLowerCase().includes('руна')).map(s => (
        {
        name: s.name,
    key: s.key
  }));
      const property = result.filter(s => !s.key.includes("resilient")).filter(s => !s.key.includes("potency"))
    return property
    },

  },
  watch: {
        "pagination.page"(newPage) {
      this.fetchWargear(); // при смене страницы
    },
    characterArchetypeKey: {
      handler(newVal) {
        if (newVal) {
          this.getArchetype(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getWargearList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async getArchetype(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      this.loading = false;
      this.archetype = data;
    },
          Worn(item) {
     return this.WornGear[item] ? this.WornGear[item] : 'Прочее'
    },
    async getWargearList(sources) {
      const page =  1;
      const perPage = 10000;

      const params = { page, perPage, source: sources.join(',') };


      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data, total } = await this.$axios.get('/api/wargear/', { params });
      const rune = this.runeWeapon;
      const rune1 = this.runeArmor;

      const wr = this.weaponCategoryRepository;
      const ar = this.armourCategoryRepository;
      //       "runes": {
      //   "potency": 0,
      //   "striking": 0,
      //   "property": []
      // },
      data.data.forEach(item => {
        if(!item.runeWeapon && wr.find(t => t.category === item.category))
          {
            item.runeWeapon = item.runes;
          }

          if(!item.runeArmor && ar.find(t => t.category === item.category))
          {
            item.runeArmor = item.runes;
        }
        this.pagination = {
          page,
          pageCount: Math.ceil(total / perPage),
        },
        item.qty = 1;
        item.trait = item.traits;
      });
      this.wargearList = data.data;



    },
     toggleProperty(key) {
    const index = this.localProperty.indexOf(key);

    if (index === -1) {
      // если руна не выбрана — добавляем
      this.localProperty.push(key);
    } else {
      // если выбрана — убираем
      this.localProperty.splice(index, 1);
    }

    // запоминаем последнюю кликнутую руну
    this.selectedRune = this.RuneWeaponProperty.find(r => r.key === key);
    },
       togglePropertyArmor(key) {
    const index = this.localPropertyArmor.indexOf(key);

    if (index === -1) {
      // если руна не выбрана — добавляем
      this.localPropertyArmor.push(key);
    } else {
      // если выбрана — убираем
      this.localPropertyArmor.splice(index, 1);
    }

    // запоминаем последнюю кликнутую руну
    this.selectedRuneArmor = this.RuneArmorProperty.find(r => r.key === key);
  },
    wargearSubtitle(item) {
      // const item = this.wargearRepository.find(i => i.name === gear);
      if (item) {
        const tags = [item.type];
        if (item.subtype) {
          tags.push(item.subtype);
        }
        return tags.filter((t) => t !== undefined).join(' • ');
      }
      return '';
    },
    getAvatar(type) {
      return `/img/icon/wargear/${this.textToKebab(type).toLowerCase()}.svg`;
    },

    groupLabel(group){
      return this.weaponGroup.find(a => a.group == group) ? this.weaponGroup.find(a => a.group == group).name : "";
    },
    addToBasket(gear) {
      this.advancedShoppingChart.push(gear);
    },
    removeFromBasket(index) {
      this.advancedShoppingChart.splice(index, 1);
    },

    attackModifier(gear) {
      //Если есть группа оружия у класса
      const enc = this.$store.getters['characters/characterEnhancementsById'](this.characterId).filter(s => s.level <= this.characterLevel());
      const group = enc.find(s => s.type === "Weapon Group") ? enc.find(s => s.type === "Weapon Group") : "";
      const groupLegend = enc.find(s => s.type === "Weapon Group Legend") ? enc.find(s => s.type === "Weapon Group Legend") : "";

      //Прибавка аттрибута
      const modAbility = gear.type === 'melee' && !gear.traits.includes('точное')  ? this.characterAttributes["strength"] : this.characterAttributes["dexterity"];

      const category = enc.find(item => item.type === 'Weapon' && item.mode === 'Upgrade' && (item.key === gear.name));
      const trait = enc.find(item => item.type === 'Weapon' && item.mode === 'Upgrade' && (gear.traits.includes(item.key)));

      let categoryItem = "";
      if (category)
        categoryItem = category ? category.value : gear.category;
      if (trait)
        categoryItem = gear.category === "advanced" ? "martial" : "simple";

      categoryItem = categoryItem === "" ? gear.category : categoryItem;

      let modProfiency = "";

      //Группы Оружия и их разбивка
      if (groupLegend !== "") {
        //Смотрим проф у класса, если нет особенности с группой -- для воина
        modProfiency = groupLegend !== "" && groupLegend.selected === gear.group ? groupLegend.value[categoryItem] : this.skillAttack[categoryItem]
      }
      if (group !== "") {
        //Смотрим проф у класса, если нет особенности с группой -- для воина
        modProfiency = group !== "" && group.selected === gear.group ? group.value[categoryItem] : this.skillAttack[categoryItem];
      }

        if(modProfiency === "")
          modProfiency = this.skillAttack[categoryItem];

        //руны
        const rune = this.weaponRunePotency.find(t => t.key === gear.runeWeapon.potency).addItemBonus

        /////Бонусы, если есть
        let modLevel = modProfiency !== "U" ? this.characterLevel() : 0;

        const modProf = modLevel;
        const Bonus = this.$store.getters["characters/characterBonusById"](
        this.characterId
        );

        if (Bonus) {
        Bonus.filter(
          (s) =>
            s.level <= this.characterLevel() &&
            s.type === "Weapon" &&
            s.mode === "Bonus" &&
            (s.key === "all" || s.key === gear.group)
        ).forEach((s) => {

          modLevel = modProfiency === "U" ? this.characterLevel() : modProf;
        });
      }

      const result = this.profiencyRepository[modProfiency] + (modAbility - 10) / 2 + modLevel + rune;
        return (result < 0 ? "" : "+") + result.toString();
    },
    StrikeItem(item) {
      if(!item) return "None"
      if (item.key === 0) return "None"
      else
      return this.wargearList.find((i) =>i.key === item.slug)

    },
       PropertyItem(item) {
      if(!item) return "None"
      if (item.key === 0) return "None"
      else
      return this.wargearList.find((i) =>i.key === item.key)

    },
           PropertyArmorItem(item) {
      if(!item) return "None"
      if (item.key === 0) return "None"
      else
      return this.wargearList.find((i) =>i.key === item.key)

    },
    damageModifier(gear){

    const modAbility = gear.range === null ? this.characterAttributes["strength"] : this.characterAttributes["dexterity"];
      const mod = (modAbility - 10) / 2;
      const enc = this.$store.getters['characters/characterEnhancementsById'](this.characterId).filter(s => s.level <= this.characterLevel());

      const spec = enc.find(s => s.type === "Weapon Specialization") ? enc.find(s => s.type === "Weapon Specialization") : "";
      const specGreater = enc.find(s => s.type === "greater-weapon-specialization") ? enc.find(s => s.type === "greater-weapon-specialization") : "";

      const damSpec = spec !== "" ? spec.bonusDamage[this.skillAttack[gear.category]] : 0;
      const damGreaterSpec = specGreater !== "" ? specGreater.bonusDamage[this.skillAttack[gear.category]] : 0;
      const modSpec = damGreaterSpec !== 0 ? damGreaterSpec : damSpec;

      //const runePot = gear.runeWeapon.potency ? gear.runeWeapon.potency : 0;
      const damage = gear.damage?.die ? gear.damage.dice + gear.damage.die : gear.damage;

      return damage.toString() + (mod + modSpec  < 0 ? " " : " + ") + (mod + modSpec).toString();
  },
    incrementQty(gear) {
     this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, qty: gear.qty+1, gear: gear, notEnc: true});

    },
  decrementQty(gear) {
     this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, qty: gear.qty-1, gear: gear, notEnc: true});
  },
    addWargearToCharacter(wargearOptions, source) {
      const finalWargear = [];

      wargearOptions.forEach((i) => {
        if (i.options) {
          if (i.selected) {
            if (i.selected.indexOf(' and ') > 0) {
              i.selected.split(' and ').forEach((o) => {
                finalWargear.push({name:o});
              });
            } else {
              finalWargear.push({name: i.selected});
            }
          }
        } else {
          finalWargear.push({name: i.name, variant: i.variant});
        }
      });



      finalWargear.forEach((w) => {
        this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: w.name, variant: w.variant, source, group: w.group, category: w.category });
      });

      this.advancedShoppingChart.length = 0;
    },
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    add(gear, buy) {
      // let cp = 0, sp= 0, gp= 0, pp = this.getMoney["pp"];
      // this.alertMoney = false;

      // gear.cp = gear.price.value.cp ? gear.price.value.cp : 0;
      // gear.sp = gear.price.value.sp ? gear.price.value.sp : 0;
      // gear.gp = gear.price.value.gp ? gear.price.value.gp : 0;
      // gear.pp = gear.price.value.pp ? gear.price.value.pp : 0;
      // if (buy === true)
      // {
      //   // const Charmoney = this.getMoney['cp'] + this.getMoney['sp'] * 10 + this.getMoney['gp'] * 100 + this.getMoney['pp'] * 1000;
      //   // const price = gear.cp + gear.sp * 10 + gear.gp * 100 + gear.pp * 1000;

      //   if(gear.cp !== 0)
      //   {
      //     const Charmoney = this.getMoney["cp"];
      //     const price = gear.price.value.cp ? gear.price.value.cp : 0;
      //     cp = Charmoney - price;
      //   }
      //   if(gear.sp !== 0)
      //   {
      //     const Charmoney = this.getMoney["sp"];
      //       const price = gear.price.value.sp ? gear.price.value.sp : 0;
      //     sp = Charmoney - price;
      //   }

      //   if(gear.gp !== 0)
      //   {
      //     const Charmoney = this.getMoney["gp"];
      //       const price = gear.price.value.gp ? gear.price.value.gp : 0;
      //     gp = Charmoney - price;
      //   }

      //   if(gear.pp !== 0)
      //   {
      //     const Charmoney = this.getMoney["pp"];
      //       const price = gear.price.value.pp ? gear.price.value.pp : 0;
      //     pp = Charmoney - price;
      //   }

      //   //как только все вычлось, смотрим и избавляемся от минусовых значений
      //   if (cp < 0)
      //   {
      //     const diff = Math.abs(cp / 10) ;
      //     cp = cp + Math.ceil(diff) * 10;
      //     sp = sp  - Math.ceil(diff)
      //   }

      //   if (sp < 0)
      //   {
      //     const diff = Math.abs(sp / 10);
      //     sp = sp + Math.ceil(diff) * 10;
      //     gp = gp  - Math.ceil(diff)
      //   }

      //   if (gp < 0)
      //   {
      //     const diff = Math.abs(gp / 10);
      //     gp = gp + Math.ceil(diff) * 10;
      //     pp = pp  - Math.ceil(diff)
      //   }

      //   if (pp < 0) this.alertMoney= true;

      // }

      // if ((buy === true && pp >=0) || buy !== true)
      // {
      //   if (buy === true)
      //   {
      //     this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: pp, nominal: "pp" });
      //     this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: gp, nominal: "gp" });
      //     this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: sp, nominal: "sp" });
      //     this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: cp, nominal: "cp" });
      // }

      //   const gear1 = { ...gear, damageOrig: gear.damage };

      //   this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: gear.name, source: 'custom', gear: gear1 });
      //   this.WeaponSearchDialog = false;
      //   this.ArmorSearchDialog = false;

      //   this.GearSearchDialog = false;
      //   this.ConsumableSearchDialog = false;
      // }
      this.alertMoney = false;
      if (buy === true) {
        this.alertMoney = false;

        const newWallet = this.payItem(this.getMoney, gear.price.value);

        if (!newWallet) {
          this.alertMoney = true; // не хватает
          return;
        }

// обновляем кошелёк
for (const [nominal, value] of Object.entries(newWallet)) {
  this.$store.commit('characters/setCharacterMoney', {
    id: this.characterId,
    nominal,
    value,
  });

          const gear1 = { ...gear, damageOrig: gear.damage };

   this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: gear.name, source: 'custom', gear: gear1 });
}
 }
 else
 {
      const gear1 = { ...gear, damageOrig: gear.damage };

   this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: gear.name, source: 'custom', gear: gear1 });
 }
  // Закрываем окна
  this.WeaponSearchDialog = false;
  this.ArmorSearchDialog = false;
  this.GearSearchDialog = false;
  this.ConsumableSearchDialog = false;

    },

payItem(wallet, price) {
  const rates = { cp: 1, sp: 10, gp: 100, pp: 1000 };

  // переводим всё в меди
  let walletCp = wallet.cp * rates.cp + wallet.sp * rates.sp + wallet.gp * rates.gp + wallet.pp * rates.pp;
  const priceCp = (price.cp || 0) * rates.cp + (price.sp || 0) * rates.sp + (price.gp || 0) * rates.gp + (price.pp || 0) * rates.pp;

  if (walletCp < priceCp) return null; // не хватает денег

  walletCp -= priceCp;

  // пересчитываем в монеты с правильной сдачей
  const newWallet = {};
  newWallet.pp = Math.floor(walletCp / rates.pp);
  walletCp -= newWallet.pp * rates.pp;

  newWallet.gp = Math.floor(walletCp / rates.gp);
  walletCp -= newWallet.gp * rates.gp;

  newWallet.sp = Math.floor(walletCp / rates.sp);
  walletCp -= newWallet.sp * rates.sp;

  newWallet.cp = walletCp;

  return newWallet;
},


    remove(gear) {
      this.$store.commit('characters/unwearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
      this.$store.commit('characters/removeCharacterWargear', { id: this.characterId, gearId: gear.id });
    },
    wear(gear) {
      this.$store.commit('characters/wearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
    },
    changeMoney() {
       this.moneyEditorDialog = false;
       this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: this.gp === '' ? this.money :  this.gp, nominal: this.labelMoney });
    },
    adjustMoney() {
      this.moneyEditorDialog = false;

      const adj = this.gpAd === undefined ? this.gp : parseInt(this.gp) + parseInt(this.gpAd);
      this.gpAd = undefined;
       this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: adj, nominal: this.labelMoney });
    },
    unwear(gear) {
      this.$store.commit('characters/unwearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
    },
    enhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },
    openWeaponSettings(gear){
      this.weaponEditorDialog = true;
      const weapon = this.characterWargearRaw.find(t => t.id === gear.id);

      this.Striking = this.weaponRuneStriking.find(item => weapon.runeWeapon.striking === item.key).key;
      this.localStriking = this.weaponRuneStriking.find(item => weapon.runeWeapon.striking === item.key).key;

      this.Potency = this.weaponRunePotency.find(item => weapon.runeWeapon.potency === item.key).key;
      this.localPotency = this.weaponRunePotency.find(item => weapon.runeWeapon.potency === item.key).key;

      // this.Property = this.wargearList.filter(item => PropertyMap.includes(item.key))//.map(item => item.key);
      this.Property = weapon.runes.property ? [...weapon.runes.property] : [];
      this.localProperty = weapon.runes.property ? [...weapon.runes.property] : [];

      this.Weapon = gear;
    },
    openMoneySettings(value, nominal){
      this.moneyEditorDialog = true;
      this.labelMoney = nominal;
      this.money = value;
      this.gp = value;
    },
    OpenWeaponSearch()
    {
      this.WeaponSearchDialog = true;
    },
    CloseWeaponSearch()
    {
      this.WeaponSearchDialog = true;
    },
    openArmourSettings(gear){
      this.armorEditorDialog = true;
      const armor = this.characterWargearRaw.find(t => t.id === gear.id);



      ///////////////////////////
      this.ResilientArmor = this.armourRuneResilent.find(item => armor.runeArmor.resilient === item.key).key;
      this.localResilent = this.armourRuneResilent.find(item => armor.runeArmor.resilient === item.key).key;

      this.PotencyArmor = this.armourRunePotency.find(item => armor.runeArmor.potency === item.key).key;
      this.localPotencyArmor = this.armourRunePotency.find(item => armor.runeArmor.potency === item.key).key;

// this.Property = this.wargearList.filter(item => PropertyMap.includes(item.key))//.map(item => item.key);
      this.PropertyArmor = armor.runes.property ? [...armor.runes.property] : [];
      this.localPropertyArmor = armor.runes.property ? [...armor.runes.property] : [];


      this.Armor = gear;
    },
    closeWeaponSettings() {
      this.weaponEditorDialog = false;
      // this.alert = false;
    },
    closeArmourSettings() {
      this.armorEditorDialog = false;
      // this.alert = false;
    },
    closeMoneySettings() {
      this.moneyEditorDialog = false;
      // this.alert = false;
    },
    saveStrikingSelection() {
    this.Striking = this.localStriking;
    this.dialogStriking = false;
    },
      savePotencySelection() {
    this.Potency = this.localPotency;
    this.dialogPotency= false;
  },
      savePropertySelection() {
    this.Property = this.localProperty;
    this.dialogProperty= false;
  },

      saveResilientArmorSelection() {
    this.ResilientArmor= this.localResilientArmor;
    this.dialogResilientArmor = false;
    },
      savePotencyArmorSelection() {
    this.PotencyArmor = this.localPotencyArmor;
    this.dialogPotencyArmor = false;
  },
      savePropertyArmorSelection() {
    this.PropertyArmor = this.localPropertyArmor;
    this.dialogPropertyArmor = false;
  },
    PotencyCap(potency){

      const mod = this.weaponRunePotency.find(item => potency === item.key).addItemBonus;
      return mod;
    },
    PotencyCapArmor(potency){

      const mod = this.armourRunePotency.find(item => potency === item.key).addItemBonus;
      return mod;
    },
    saveWeapon() {
      this.alert = false;
      const weapon =  this.Striking;
      const runeStriking = this.weaponRuneStriking.find(item => weapon === item.key).addDice;
      const PropertyMap = this.Property;
      const Property =  this.wargearList.filter(item => PropertyMap.includes(item.key)).map(item => item.key);
      const weaponDamage = this.wargearList.find(t => t.key === this.Weapon.key).damage.dice;

      const die = this.wargearList.find(t => t.key === this.Weapon.key).damage.die;
      const dice = weaponDamage + runeStriking  + die;//(parseInt(weaponDamage.slice(0, 1)) + runeStriking) + weaponDamage.slice(1, 4);
      if ( this.PotencyCap(this.Potency) < this.Property.length) {
        this.alert = true;
        // console.warn(`Skill ${skill.name} already exists.`);
      }
      else{
        this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, damage: dice, property: Property, striking: this.Striking, potency: this.Potency, gear: this.Weapon, armor: true, notEnc: false });
        // this.characterWeapon.find(t => t.id === this.Weapon.id).damage = dice;
        this.weaponEditorDialog = false;
      }
    },
      wargearPrice(item) {
      if (item && item.price) {
        const pp = item.price.value.pp ? item.price.value.pp + " пм" : "";
        const gp = item.price.value.gp  ? item.price.value.gp + " зм" : "";
        const sp = item.price.value.sp  ? item.price.value.sp + " см" : "";
        const cp = item.price.value.cp ? item.price.value.cp + " мм" : "";
        return pp + gp + sp + cp;
      }
    },
     typeDamage(type)
    {
      return this.DamageType.find(t => t.key === type) ? this.DamageType.find(t => t.key === type).name : type;
    },
    saveArmor() {
      this.alert = false;

      const armor =  this.ResilentArmor;

      const PropertyMap = this.PropertyArmor;
      const PropertyArmor =  this.wargearList.filter(item => PropertyMap.includes(item.key)).map(item => item.key);

      if (this.PotencyCapArmor(this.PotencyArmor) < this.PropertyArmor.length) {
        this.alert = true;
        // console.warn(`Skill ${skill.name} already exists.`);
      }
      else{
        this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, property: PropertyArmor, resilient: this.ResilientArmor, potency: this.PotencyArmor, gear: this.Armor, armor: true, notEnc: false });
        // this.characterWeapon.find(t => t.id === this.Weapon.id).damage = dice;
        this.armorEditorDialog = false;
      }

      // const armor =  this.Resilent;
      // const runeStriking = this.armourRuneResilent.find(item => weapon === item.key).addDice;
      // const PropertyMap = this.Property.map(item => item.key);
      // const Property =  this.ArmorRuneProperty.filter(item => PropertyMap.includes(item.key));

      // if ( this.PotencyCap(this.Potency) < this.Property.length) {
      //   this.alert = true;
      //   // console.warn(`Skill ${skill.name} already exists.`);
      // }
      // else{
      //   this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, damage: dice, property: Property, striking: this.Striking, potency: this.Potency, gear: this.Weapon, notEnc: false });
      //   // this.characterWeapon.find(t => t.id === this.Weapon.id).damage = dice;
      //   this.weaponEditorDialog = false;
      // }
    },
    /**
     * {
        filter: true,
        valueFilter: { useCharacterTier: false, useSettingTier: true, fixedValue: 4 },
        rarityFilter: ['Uncommon', 'Common', 'Rare'],
        typeFilter: 'Ranged Weapon',
        subtypeFilter: 'Augmetics',
        keywordFilter: 'Imperium',
     * },
     * @param filter
     */
    /*
       item.value <= (this.settingTier + 4)
    && ['Uncommon', 'Common', 'Rare'].includes(item.rarity)
    && item.type.includes('Ranged Weapon')
    const keywordReq = (item.keywords) ? item.keywords.split(',').includes('Imperium') : false;
     */
    computeWargearOptionsByFilter(filter) {
      return this.wargearList ? this.filterWargear(this.wargearList, filter, this.settingTier) : [];
    },
     async fetchWargear() {
      try {
        const params = { page: this.pagination.page };
        if (this.searchQuery) params.search = this.searchQuery;

        const response = await this.$axios.get("/api/wargear", { params });
        const { data, total, pageCount } = response.data;

        const uniqueItems = [];
        const seen = new Set();
        data.forEach((item) => {
          const key = item.key;
          if (!seen.has(key)) {
            seen.add(key);
            uniqueItems.push(item);
          }
        });
        this.items = uniqueItems;

        // this.items = Array.isArray(data) ? data : [];
        this.total = total || 0;
        this.pagination.pageCount = pageCount || 1;
      } catch (err) {
        this.items = [];
        this.total = 0;
        this.pagination.pageCount = 1;
        console.error(err);
      }
    }
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

.row {
  margin: 0px 0px 8px;
  box-sizing: border-box;
  /* display: flex;
  border-radius: 4px; */
}

/* Для заголовков */
.gear-section {
  margin-bottom: 16px;
  border-radius: 8px;
  overflow: hidden;
  background-color: rgba(var(--v-theme-surface), 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.gear-section-header {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 8px 16px;
  color: rgba(var(--v-theme-on-surface), 0.87);
  background-color: rgba(var(--v-theme-surface-variant, 0, 0, 0), 0.05);
  border-bottom: 1px solid rgba(var(--v-border-color, 0, 0, 0), 0.1);
}

.gear-section-table {
  border-radius: 0;
  background-color: transparent !important;
}

.gear-section + .gear-section {
  margin-top: 12px;
}

.fixed-columns-table .v-data-table__wrapper table {
  table-layout: fixed !important; /* фиксированная сетка */
  width: 100%;
}

.fixed-columns-table th,
.fixed-columns-table td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fixed-columns-table th {
  font-weight: 600;
  background-color: rgba(var(--v-theme-surface-variant), 0.5);
}

/* Настраиваем ширину каждой колонки (по порядку) */
.fixed-columns-table th:nth-child(1),
.fixed-columns-table td:nth-child(1) {
  width: 40%; /* Название предмета */
}

.fixed-columns-table th:nth-child(2),
.fixed-columns-table td:nth-child(2) {
  width: 20%; /* Тип */
}

.fixed-columns-table th:nth-child(3),
.fixed-columns-table td:nth-child(3) {
  width: 15%; /* Цена */
}

.fixed-columns-table th:nth-child(4),
.fixed-columns-table td:nth-child(4) {
  width: 25%; /* Прочее */
}

.table-container {
  width: 100%;
  overflow-x: hidden; /* не даем появиться горизонтальному скроллу */
}

.expanded-cell {
  padding: 0 !important;
  background-color: rgba(var(--v-theme-surface-variant), 0.05);
}

.expanded-wrapper {
  display: block;
  max-width: 100%;
  overflow-x: hidden;
  padding: 16px 20px;
  box-sizing: border-box;
  background-color: var(--v-theme-surface);
  border-left: 3px solid var(--v-theme-primary);
  border-radius: 0 0 8px 8px;
}

.expanded-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.expanded-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  word-break: break-word;
}

.expanded-tag {
  background-color: rgba(var(--v-theme-primary), 0.15);
  color: var(--v-theme-primary);
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 0.8rem;
}

.expanded-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 4px 12px;
  font-size: 0.85rem;
  margin-top: 8px;
  word-break: break-word;
}

.expanded-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(var(--v-border-color, 150, 150, 150), 0.2);
  margin: 10px 0;
}

.expanded-description {
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--v-theme-on-surface);
  word-break: break-word;
  white-space: normal;
}

.v-data-table {
  table-layout: fixed !important;
}

.v-data-table thead th,
.v-data-table tbody td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal; /* чтобы переносились строки */
  word-wrap: break-word;
  vertical-align: top;
}

/* Можно ограничить высоту ячеек */
.v-data-table tbody td {
  max-width: 250px; /* можно подбирать */
}

/* Убираем растягивание при раскрытии */
.v-data-table__expanded__content td {
  max-width: none !important;
}

/* Кнопка */
.gear-btn {
  transition: all 0.2s ease-in-out;
}

.gear-btn:hover {
  background-color: rgba(56, 142, 60, 0.1); /* светло-зеленый фон */
  transform: translateY(-1px);
}

/* Список выбора рун */

.rune-list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.selected-rune {
  background-color: rgba(76, 175, 80, 0.15); /* мягкий зелёный фон */
  transition: background-color 0.2s;
}

.selected-rune:hover {
  background-color: rgba(76, 175, 80, 0.25);
}
</style>
