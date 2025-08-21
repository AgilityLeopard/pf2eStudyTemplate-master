<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-container fluid class="pa-0" style="max-width: 1200px">
      <v-row justify="center" align="stretch">
        <v-col cols="12" md="4">
          <v-card class="glass-card pa-3" height="100%">
            <div class="card-content">
              <!-- <v-col :cols="8">
                <div align="center">{{ characterName }}</div>
                <div
                  v-if="archetypeLabel !== '' && speciesLabel !== ''"
                  class="caption"
                  align="center"
                >
                  {{ [archetypeLabel, speciesLabel].join(" • ") }}
                </div>
                <div class="caption" align="center">
                  <span>{{ [`Уровень ${characterRank}`].join(" • ") }}</span>
                </div>
                <div class="caption" align="center">
                  <v-progress-linear
                    :value="campaignCustomXp"
                    height="2"
                    color="red"
                  ></v-progress-linear> -->

              <v-avatar size="75" color="#25262b">
                <v-icon size="40">mdi-account</v-icon>
              </v-avatar>

              <!-- Имя + теги -->
              <div class="side">
                <div class="name">{{ characterName }}</div>
                <div class="tags">
                  <v-btn small depressed class="tag-btn">
                    <v-icon left small>mdi-tree</v-icon>{{ speciesLabel }}
                  </v-btn>
                  <v-btn small depressed class="tag-btn">
                    <v-icon left small>mdi-window-maximize</v-icon
                    >{{ archetypeLabel }}
                  </v-btn>
                  <v-btn small depressed class="tag-btn">
                    <v-icon left small>mdi-book</v-icon> {{ backgroundLabel }}
                  </v-btn>
                </div>
              </div>

              <!-- Кнопки + уровень -->
              <div class="side">
                <div class="actions">
                  <!-- <v-btn
            nuxt
            
            color="success"
           
            outlined
            small
          >
            <v-icon left small>print</v-icon>
            Печать
          </v-btn>
          <v-btn
            nuxt
            
            color="success"
            small
          >
            <v-icon left small>edit</v-icon>
            Изменить
          </v-btn> -->
                  <v-btn
                    target="_blank"
                    :to="`/forge/characters/${characterId}/builder/print`"
                    small
                    depressed
                    class="action-btn"
                    >Печать</v-btn
                  >
                  <v-btn
                    :to="`/forge/characters/${characterId}/builder/setting`"
                    small
                    depressed
                    class="action-btn"
                    >Изменить</v-btn
                  >
                </div>
                <div class="level-xp">
                  <span class="level">Уровень {{ characterRank }}</span>
                  <v-text-field
                    dense
                    hide-details
                    solo
                    flat
                    placeholder="XP"
                    class="xp-input"
                  />
                </div>
              </div>
            </div>
          </v-card>
        </v-col>

        <!-- Правая карточка -->
        <v-col cols="12" md="4">
          <v-card
            class="glass-card pa-4 d-flex flex-column align-center stat-card"
            height="100%"
          >
            <v-row
              no-gutters
              align="center"
              justify="start"
              style="width: 100%"
            >
              <v-col cols="6" class="d-flex flex-column align-center">
                <div class="title white--text mb-2">Хиты</div>

                <div class="d-flex align-center">
                  <!-- <span class="hp-value"> {{ characterHitPointsMax() }}</span> -->
                  <div
                    v-if="!editingHp"
                    class="hp-value"
                    @click="editingHp = true"
                    :style="{
                      width: '3ch',
                      fontSize: '1.5rem',
                      textAlign: 'center',
                      color: hpColor(),
                    }"
                  >
                    {{ characterCurHP() }}
                  </div>

                  <!-- Поле ввода -->
                  <v-text-field
                    v-else
                    v-model.number="currentHP"
                    type="number"
                    hide-details
                    single-line
                    solo
                    flat
                    background-color="transparent"
                    class="hp-input"
                    :style="{
                      width: '4ch',
                      fontSize: '1.5rem',
                      textAlign: 'center',
                    }"
                    @input="addCurrentHP"
                    @blur="editingHp = false"
                    @keyup.enter="editingHp = false"
                  ></v-text-field>

                  <span class="grey--text mx-2">/</span>
                  <span class="hp-value grey--text">
                    {{ characterHitPointsMax() }}</span
                  >
                </div>
              </v-col>

              <v-col cols="6" class="d-flex flex-column align-center">
                <div class="title white--text align-start mb-4">Временные</div>

                <div class="grey--text d-flex flex-end">—</div>
              </v-col>
            </v-row>
            <v-row justify="center" class="mt-4">
              <v-btn small text class="mt-4 grey--text text--lighten-1">
                Сопротивление
              </v-btn>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="glass-card pa-3 stat-card" height="100%">
            <div class="d-flex align-center justify-space-between mb-2">
              <span class="subtitle-2 white--text">Conditions</span>
              <v-btn icon small>
                <v-icon small>mdi-plus</v-icon>
              </v-btn>
            </div>
            <div class="grey--text text-center caption mb-4">None active</div>

            <!-- Hero Points -->
            <div class="subtitle-2 white--text text-center mb-1">
              Hero Points
            </div>
            <div class="d-flex justify-center">
              <v-icon small color="yellow darken-1">mdi-star</v-icon>
              <v-icon small color="yellow darken-1">mdi-star-outline</v-icon>
              <v-icon small color="yellow darken-1">mdi-star-outline</v-icon>
            </div>
          </v-card>
        </v-col>

        <!-- <v-row dense align="stretch"> -->
        <v-col cols="12" md="4">
          <v-card class="glass-card pa-3 stat-card" height="100%">
            <v-row dense>
              <v-col
                v-for="(attribute, index) in attributeRepository"
                :key="index"
                cols="12"
                sm="6"
                class="d-flex stat-row"
              >
                <div class="stat-group">
                  <v-btn block small class="stat-name-btn" depressed>
                    <span class="truncate"> {{ attribute.name }}</span>
                  </v-btn>
                  <v-btn small class="stat-mod-btn" depressed>
                    {{
                      (characterAttributes[attribute.key] - 10) / 2 >= 0
                        ? "+"
                        : ""
                    }}{{ (characterAttributes[attribute.key] - 10) / 2 }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- 2. Armor Class -->
        <v-col cols="12" md="4">
          <v-card
            class="glass-card pa-3 d-flex flex-column align-center stat-card"
            height="100%"
          >
            <v-row
              no-gutters
              align="center"
              justify="start"
              style="width: 100%"
            >
              <v-col
                cols="4"
                class="d-flex justify-center align-center"
                style="position: relative"
              >
                <svg viewBox="100 90 55 160" width="100" height="100">
                  <g>
                    <path
                      fill="rgba(70,130,180,0.8)"
                      stroke="#ffffffaa"
                      stroke-width="1"
                      d="M89.5,109.1c-6.5,1.1-12,2.2-12.1,2.3c-0.1,0.1,0.4,2.1,1.2,4.3c3.7,10.2,5.6,19.5,5.1,25.1c-0.4,4.1-2.6,10.8-4.9,15.2l-1.8,3.2l3.2,4.7C91,180.1,93.4,186.3,91.3,193c-0.4,1.3-0.7,2.5-0.7,2.6c0,0.4,4.3,5.4,8,9.2c4.6,4.8,12.6,8.5,25.1,11.7l4.6,1.2l6.6-1.9c7.7-2.2,15.1-5.1,18.5-7.2c1.3-0.9,4.5-4,7.1-7l4.8-5.5l-0.8-3c-1.8-7.1,0.3-12.8,10.7-28.6l3.6-5.5l-1.7-3.2c-1-1.8-2.4-5.3-3.3-7.8c-1.4-4-1.6-5.2-1.6-9.8c0-4.5,0.2-6.3,1.6-11.5c0.9-3.5,2.3-8.2,3.3-10.7c0.9-2.4,1.5-4.6,1.4-4.7c-0.1-0.1-5.2-1.1-11.2-2.1c-6-1-11.6-2-12.4-2.1l-1.4-0.2l-4.3,8.6l-4.3,8.6h-17h-17l-4.3-8.6c-2.4-4.7-4.5-8.6-4.8-8.6C101.6,107,96,107.9,89.5,109.1z"
                    />
                  </g>
                </svg>

                <!-- Число КД и подпись -->
                <div
                  style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-align: center;
                    z-index: 1;
                  "
                >
                  <div class="text-h5">{{ characterArmor() }}</div>
                  <div class="text-subtitle-2">КД</div>
                </div>
              </v-col>

              <!-- Кнопки -->
              <v-col
                cols="8"
                class="d-flex stat-row"
                style="flex-direction: column; gap: 8px"
              >
                <div class="stat-group">
                  <v-btn small class="stat-name-btn" depressed>Рефлекс:</v-btn>

                  <v-btn small class="stat-mod-btn" depressed>
                    +{{ ModAttributeSaving("dexterity", "reflex") }}
                    {{ characterlabelL(characterSaving["reflex"]) }}
                  </v-btn>
                </div>

                <div class="stat-group">
                  <v-btn small class="stat-name-btn" depressed
                    >Стойкость:</v-btn
                  >

                  <v-btn small class="stat-mod-btn" depressed>
                    +{{ ModAttributeSaving("constitution", "fortitude") }}
                    {{ characterlabelL(characterSaving["fortitude"]) }}
                  </v-btn>
                </div>

                <div class="stat-group">
                  <v-btn small class="stat-name-btn" depressed>Воля:</v-btn>

                  <v-btn small class="stat-mod-btn" depressed>
                    +{{ ModAttributeSaving("wisdom", "will") }}
                    {{ characterlabelL(characterSaving["will"]) }}
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <!-- 3. Speed -->
        <v-col cols="12" md="4">
          <v-card
            class="glass-card pa-3 d-flex flex-column align-center stat-card"
            height="100%"
          >
            <v-row
              no-gutters
              align="center"
              justify="start"
              style="width: 100%"
            >
              <v-col
                cols="4"
                class="d-flex flex-column align-center"
                style="position: relative"
              >
                <!-- Надпись сверху -->
                <div class="stat-title">Скорость</div>
                <div class="stat-icon-wrapper">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="75"
                    height="75"
                    viewBox="0 0 1280.000000 1002.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,1002.000000) scale(0.100000,-0.100000)"
                      fill="#dee2e625"
                      stroke="none"
                    >
                      <path
                        d="M4765 10014 c-22 -2 -80 -11 -130 -20 -496 -88 -933 -478 -1239
-1109 -65 -133 -82 -190 -130 -435 -70 -351 -99 -722 -85 -1070 9 -200 12
-222 69 -575 51 -315 60 -374 61 -432 1 -26 6 -1 10 57 16 198 41 302 162 680
36 113 84 264 107 335 155 496 415 991 636 1211 260 259 505 345 764 270 207
-60 373 -164 665 -415 55 -48 116 -99 135 -115 19 -16 99 -87 177 -158 198
-181 302 -260 418 -318 125 -63 189 -79 341 -87 234 -12 329 37 427 218 60
109 81 189 81 314 0 130 -17 190 -98 356 -192 386 -534 697 -1077 978 -256
133 -547 237 -779 281 -36 6 -87 16 -115 21 -54 11 -336 20 -400 13z"
                      ></path>
                      <path
                        d="M8925 9614 c-102 -20 -140 -30 -205 -51 -284 -95 -514 -289 -644
-543 -97 -191 -130 -350 -114 -542 29 -343 246 -681 539 -842 185 -101 364
-148 569 -148 203 0 359 36 528 121 290 147 476 382 574 729 29 104 32 313 4
417 -39 150 -95 271 -189 408 -155 227 -451 404 -747 447 -63 9 -275 12 -315
4z"
                      ></path>
                      <path
                        d="M12700 7683 c-18 -95 -47 -168 -143 -361 -128 -254 -265 -475 -419
-669 -237 -301 -787 -753 -1129 -928 -147 -75 -207 -95 -290 -95 -164 0 -334
100 -499 295 -99 116 -147 217 -290 605 -131 356 -247 549 -395 658 -81 59
-122 80 -213 103 -67 17 -85 18 -140 8 -81 -15 -158 -65 -240 -155 -152 -167
-219 -372 -209 -634 6 -146 19 -217 68 -374 171 -546 518 -1004 1009 -1333 95
-64 140 -86 234 -118 221 -74 509 -75 746 -1 334 103 761 377 1065 681 273
273 455 545 649 967 184 401 248 597 292 897 3 24 0 151 -7 282 l-13 239 -32
0 c-31 0 -32 -1 -44 -67z"
                      ></path>
                      <path
                        d="M4205 5883 c-138 -16 -280 -77 -351 -149 -50 -52 -116 -179 -140
-269 -57 -217 -5 -491 130 -678 54 -77 136 -160 305 -311 131 -117 132 -118
114 -139 -225 -264 -861 -924 -1439 -1493 -741 -731 -1057 -1051 -1663 -1687
-156 -164 -419 -427 -585 -584 -276 -262 -579 -564 -572 -570 1 -2 38 6 82 18
149 39 670 336 1744 994 434 266 540 329 1470 875 744 437 872 515 1160 704
273 180 390 265 515 375 119 103 163 137 400 306 99 71 204 148 234 172 l53
43 112 -58 c138 -73 258 -150 358 -231 115 -92 125 -107 133 -195 7 -69 5 -77
-21 -122 -44 -77 -216 -241 -330 -317 -56 -37 -236 -137 -400 -221 -165 -84
-445 -231 -624 -326 -511 -270 -984 -498 -1295 -622 -167 -67 -390 -187 -375
-201 3 -3 55 -9 115 -14 117 -9 328 -2 528 16 67 6 174 16 237 22 330 29 556
70 845 150 226 63 261 73 550 149 556 148 852 248 1130 385 436 214 806 562
961 902 55 120 64 152 64 233 0 101 -30 214 -89 335 -63 130 -109 196 -260
385 -276 343 -520 595 -836 863 -71 61 -173 150 -225 198 -289 266 -789 630
-1045 761 -114 58 -538 233 -635 262 -60 19 -247 46 -295 44 -16 0 -43 -3 -60
-5z"
                      ></path>
                    </g>
                  </svg>
                  <!-- SVG с числом внутри -->

                  <div class="stat-number">
                    <div class="text-h5">
                      {{ characterSpeed["land"] }}
                    </div>
                  </div>
                </div>
              </v-col>

              <v-col
                cols="4"
                class="d-flex flex-column align-center"
                style="position: relative"
              >
                <!-- Надпись сверху -->
                <div class="stat-title">Внимательность</div>

                <!-- SVG с числом внутри -->
                <div class="stat-icon-wrapper">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="72"
                    viewBox="0 0 1280.000000 863.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,863.000000) scale(0.100000,-0.100000)"
                      fill="#dee2e625"
                      stroke="none"
                    >
                      <path
                        d="M8120 8624 c-554 -26 -956 -72 -1425 -164 -1186 -232 -2320 -725
                      -3304 -1438 -425 -308 -727 -567 -1132 -971 -603 -603 -1071 -1201 -1511
                      -1931 -165 -274 -430 -782 -415 -796 10 -11 24 5 98 109 253 354 559 708 916
                      1057 222 218 347 330 318 285 -194 -300 -514 -899 -699 -1310 -135 -298 -306
                      -729 -367 -925 -22 -69 -45 -103 -311 -457 -159 -210 -288 -386 -288 -392 0
                      -27 105 -122 178 -159 124 -65 214 -85 347 -80 130 6 194 27 284 93 115 84
                      170 181 271 473 331 959 723 1779 1173 2457 96 144 239 346 243 343 1 -2 -6
                      -50 -17 -106 -66 -361 -81 -810 -39 -1157 135 -1108 708 -2081 1605 -2726 338
                      -244 754 -447 1150 -562 66 -20 129 -37 140 -40 66 -13 -413 -35 -960 -43
                      -374 -6 -926 3 -1512 23 -292 10 -252 -13 117 -66 945 -137 2001 -175 2894
                      -105 231 18 292 24 701 74 409 51 564 79 810 150 55 15 177 49 270 74 519 140
                      913 316 1340 601 973 649 1771 1745 2295 3150 136 365 244 724 329 1095 43
                      187 111 571 111 629 0 47 7 56 60 84 93 48 350 203 485 292 368 242 553 444
                      521 568 -16 64 -56 90 -304 200 -1180 522 -2283 870 -3192 1007 -80 12 -153
                      25 -164 29 -31 11 760 138 1409 226 187 25 381 53 430 61 157 27 142 39 -115
                      93 -583 122 -1030 186 -1640 232 -250 18 -903 32 -1100 23z m1191 -1880 c264
                      -85 581 -204 844 -316 239 -101 894 -423 901 -442 3 -7 -4 -87 -16 -177 -129
                      -1024 -464 -2044 -947 -2886 -36 -62 -66 -113 -68 -113 -2 0 7 33 21 73 36
                      104 100 373 123 512 73 442 73 879 0 1310 -128 762 -497 1501 -1013 2033 -39
                      39 -65 72 -59 72 6 0 102 -30 214 -66z"
                      ></path>
                    </g>
                    <!-- Число внутри SVG -->
                  </svg>

                  <div class="stat-number">
                    <div class="text-h5">
                      + {{ ModAttributePerception("", "") }}
                    </div>
                  </div>
                </div>
              </v-col>

              <v-col
                cols="4"
                class="d-flex flex-column align-center"
                style="position: relative"
              >
                <!-- Надпись сверху -->
                <div class="stat-title">Сл Класса</div>

                <!-- SVG с числом внутри -->
                <div class="stat-icon-wrapper">
                  <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="75"
                    height="75"
                    viewBox="0 0 1278.000000 1280.000000"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g
                      transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
                      fill="#dee2e625"
                      stroke="none"
                    >
                      <path
                        d="M1535 12720 c-372 -7 -468 -19 -660 -81 -367 -118 -619 -382 -730
-767 -35 -120 -53 -236 -65 -417 -14 -218 -14 -9972 0 -10180 51 -765 429
-1143 1195 -1194 218 -15 10004 -15 10230 -1 253 16 453 64 617 146 99 50 148
85 236 168 211 201 315 469 342 881 14 222 14 9970 0 10190 -28 421 -128 690
-339 908 -181 188 -410 289 -762 338 -63 9 -1277 12 -4904 14 -2651 1 -4973
-1 -5160 -5z"
                      ></path>
                    </g>
                  </svg>

                  <div class="stat-number">
                    <div class="text-h5">+ {{ ModAttributeClass() }}</div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <!-- </v-row> -->
      </v-row>

      <!-- skills -->
      <!-- <v-col :cols="12" :sm="6" :md="6" :lg="3">
        <v-row no-gutters> </v-row>
      </v-col> -->
      <v-row justify="center">
        <!-- actions, gear, feats, spells, ... -->
        <v-col cols="12" md="12">
          <v-card>
            <v-tabs centered grow color="red">
              <!-- <v-tab class="caption" key="actions" :href="`#tab-actions`"
              ><h2 class="subtitle-2">Оружие</h2></v-tab
            > -->
              <v-tab class="caption" key="wargear" :href="`#tab-wargear`"
                ><h2 class="subtitle-2">Снаряжение</h2></v-tab
              >
              <v-tab
                class="caption"
                key="abilities-talents"
                :href="`#tab-abilities-talents`"
                ><h2 class="subtitle-2">Способности</h2></v-tab
              >
              <v-tab class="caption" key="actions" :href="`#tab-actions`"
                ><h2 class="subtitle-2">Скиллы</h2>
              </v-tab>
              <v-tab
                class="caption"
                key="psychic-powers"
                :href="`#tab-psychic-powers`"
                v-if="psychicPowers.length > 0"
                ><h2 class="subtitle-2">Заклинания</h2></v-tab
              >
              <v-tab class="caption" key="objectives" :href="`#tab-objectives`"
                ><h2 class="subtitle-2">Описание</h2></v-tab
              >

              <!-- actions (all, weapons, powers, other) -->
              <v-tab-item
                class="my-tab-item"
                key="actions"
                :value="`tab-actions`"
              >
                <v-col :cols="12" class="pa-1">
                  <v-card style="display: flex; flex-flow: column">
                    <v-row no-gutters style="height: 100%">
                      <!-- Левая колонка (30%) -->
                      <v-col cols="12" md="4" class="pa-2 left-col">
                        <v-card-title
                          style="
                            background-color: hsl(4, 90%, 58%);
                            color: #fff;
                          "
                          class="body-1 pt-1 pb-1"
                        >
                          <h2 class="subtitle-1">Навыки</h2>
                        </v-card-title>

                        <!-- сюда что-то -->
                        <v-data-table
                          :headers="skillHeaders"
                          :items="skills"
                          dense
                          :items-per-page="25"
                          class="elevation-1"
                          hide-default-footer
                        >
                          <template v-slot:item.name="{ item }">
                            <div class="text-left pa-1 small">
                              {{ item.name }}
                            </div>
                          </template>

                          <!-- <template v-slot:item.attributeName="{ item }">
                        <div class="text-center pa-1 small">
                          {{ item.attributeName.substring(0, 3) }}
                        </div>
                      </template> -->

                          <template v-slot:item.rating="{ item }">
                            <div class="text-center pa-1 small">
                              {{ characterlabel(item) }}
                            </div>
                          </template>

                          <template v-slot:item.value="{ item }">
                            <div class="text-center pa-1 small">
                              {{ computeSkillPool(item) }}
                            </div>
                          </template>
                        </v-data-table>
                      </v-col>

                      <!-- Правая колонка (70%) -->
                      <v-col cols="12" md="8" class="pa-2 right-col">
                        <div class="content-box"></div>
                        <div v-if="actionList"></div>
                        <div>
                          <v-expansion-panels multiple>
                            <!-- Панель для Исследование -->
                            <v-expansion-panel v-if="explorationActions">
                              <v-expansion-panel-header>
                                <div
                                  class="d-flex align-center justify-space-between w-100"
                                >
                                  <span class="section-title"
                                    >Исследование</span
                                  >
                                  <!-- <v-badge
                                    color="grey"
                                    :content="explorationActions"
                                    bordered
                                    overlap
                                    class="ml-2"
                                  ></v-badge> -->
                                </div>
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <v-list dense class="action-list">
                                  <v-list-item
                                    v-for="(action, i) in explorationActions"
                                    :key="i"
                                    class="action-item"
                                    @click="openDialogAction(action)"
                                  >
                                    <div class="action-title">
                                      <span class="action-symbol">{{
                                        action.symbol
                                      }}</span>
                                      <span>{{ action.name }}</span>
                                      <div v-if="action?.actions">
                                        <img
                                          :src="
                                            iconAction(action?.actions?.value)
                                          "
                                          :class="{
                                            'invert-icon': !$vuetify.theme.dark,
                                          }"
                                        />
                                      </div>
                                    </div>
                                    <!-- <v-badge color="grey" bordered class="ml-2">
                                      <span class="badge-label">{{
                                        action.category
                                      }}</span>
                                    </v-badge> -->
                                  </v-list-item>
                                </v-list>
                              </v-expansion-panel-content>
                            </v-expansion-panel>

                            <!-- Панель для Отдых -->
                            <v-expansion-panel v-if="restActions">
                              <v-expansion-panel-header>
                                <div
                                  class="d-flex align-center justify-space-between w-100"
                                >
                                  <span class="section-title">Отдых</span>
                                  <!-- <v-badge
                                    color="grey"
                                    :content="restActions"
                                    bordered
                                    overlap
                                    class="ml-2"
                                  ></v-badge> -->
                                </div>
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <v-list dense class="action-list">
                                  <v-list-item
                                    v-for="(action, i) in restActions"
                                    :key="i"
                                    class="action-item"
                                    @click="openDialogAction(action)"
                                  >
                                    <div class="action-title">
                                      <span class="action-symbol">{{
                                        action.symbol
                                      }}</span>
                                      <span>{{ action.name }}</span>
                                      <div v-if="action?.actions">
                                        <img
                                          :src="
                                            iconAction(action?.actions?.value)
                                          "
                                          :class="{
                                            'invert-icon': !$vuetify.theme.dark,
                                          }"
                                        />
                                      </div>
                                    </div>
                                    <!-- <v-badge color="grey" bordered class="ml-2">
                                      <span class="badge-label">{{
                                        action.category
                                      }}</span> -->
                                    <!-- </v-badge> -->
                                  </v-list-item>
                                </v-list>
                              </v-expansion-panel-content>
                            </v-expansion-panel>

                            <!-- Панель для всех остальных -->
                            <v-expansion-panel v-if="otherActions">
                              <v-expansion-panel-header>
                                <div
                                  class="d-flex align-center justify-space-between w-100"
                                >
                                  <span class="section-title">Прочие</span>
                                  <!-- <v-badge
                                    color="grey"
                                    :content="otherActions"
                                    bordered
                                    overlap
                                    class="ml-2"
                                  ></v-badge> -->
                                </div>
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
                                <v-list dense class="action-list">
                                  <v-list-item
                                    v-for="(action, i) in otherActions"
                                    :key="i"
                                    class="action-item"
                                    @click="openDialogAction(action)"
                                  >
                                    <div class="action-title">
                                      <span class="action-symbol">{{
                                        action.symbol
                                      }}</span>
                                      <span>{{ action.name }}</span>
                                      <div v-if="action?.actions">
                                        <img
                                          :src="
                                            iconAction(action?.actions?.value)
                                          "
                                          :class="{
                                            'invert-icon': !$vuetify.theme.dark,
                                          }"
                                        />
                                      </div>
                                    </div>
                                    <!-- <v-badge color="grey" bordered class="ml-2">
                                      <span class="badge-label">{{
                                        action.category
                                      }}</span>
                                    </v-badge> -->
                                  </v-list-item>
                                </v-list>
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
                        </div>
                      </v-col>
                    </v-row>

                    <v-spacer></v-spacer>
                  </v-card>
                </v-col>
              </v-tab-item>

              <!-- wargear (All, Weapons, Armour, Gear, Other Possessions) -->
              <v-tab-item
                class="my-tab-item"
                key="wargear"
                :value="`tab-wargear`"
              >
                <div class="pa-2">
                  <v-chip-group
                    mandatory
                    active-class="red--text"
                    v-model="wargearSection.selection"
                  >
                    <v-chip
                      label
                      small
                      v-for="item in [
                        `Оружие`,
                        `Доспехи`,
                        `Расходники`,
                        `Сокровища`,
                        `Снаряжение`,
                        `Все`,
                      ]"
                      :key="item.toLowerCase()"
                      :value="item.toLowerCase()"
                    >
                      {{ item }}
                    </v-chip>
                  </v-chip-group>

                  <div style="height: 505px; overflow-y: auto">
                    <!-- species < abilities -->
                    <div
                      v-show="
                        wargearSection.selection === 'оружие' ||
                        wargearSection.selection === 'все'
                      "
                    >
                      <v-data-table
                        :headers="weaponHeaders"
                        :items="weapons"
                        hide-default-footer
                        v-if="weapons.length !== 0"
                      >
                        <template v-slot:item="{ item }">
                          <tr v-if="item">
                            <td class="text-left pa-1 small">
                              {{ item.nameGear }}
                            </td>

                            <td class="text-center pa-1 small">
                              <span>{{ groupName(item.group) }}</span>
                            </td>

                            <td class="text-center pa-1 small">
                              + {{ attackModifier(item) }} /
                              {{ attackModifier(item) - 5 }} /
                              {{ attackModifier(item) - 10 }}
                            </td>

                            <td class="text-center pa-1 small">
                              <div v-if="item.damage">
                                <span
                                  >{{ item.damage }}
                                  {{ typeDamage(item.typeDamage) }}</span
                                >
                              </div>
                            </td>

                            <td class="text-center pa-1 small">
                              <span>{{ category(item.category) }}</span>
                            </td>

                            <td class="text-center pa-1 small">
                              <span>{{ item.hands }}</span>
                            </td>

                            <td class="text-left pa-1 small">
                              <span
                                v-if="item.traits && item.traits.length > 0"
                                >{{ item.traits.join(", ") }}</span
                              >
                            </td>
                            <td class="text-left">
                              <v-btn
                                outlined
                                x-small
                                color="info"
                                @click="openDialogItem(item)"
                              >
                                <v-icon left>visibility</v-icon> Просмотр
                              </v-btn>
                            </td>
                          </tr>
                        </template>
                      </v-data-table>

                      <div
                        v-if="weapons.length === 0"
                        align="center"
                        class="mt-2 mb-2"
                      >
                        <em>Нет оружия? Возьми на вкладке Снаряжения!</em>
                      </div>
                    </div>

                    <!-- species < abilities -->
                    <div
                      v-show="
                        wargearSection.selection === 'доспехи' ||
                        wargearSection.selection === 'все'
                      "
                    >
                      <v-data-table
                        :headers="armorHeaders"
                        :items="armour"
                        hide-default-footer
                        v-if="armour.length !== 0"
                      >
                        <template v-slot:item="{ item }">
                          <tr v-if="item">
                            <td class="text-left">
                              {{ item.nameGear }}
                            </td>
                            <td class="text-center">
                              {{ item.group }}
                            </td>
                            <td class="text-center">
                              {{ item.weight }} + {{ item.weightL }}
                            </td>
                            <td class="text-center">
                              {{ item.category }}
                            </td>
                            <td class="text-left">
                              <span
                                v-if="item.traits && item.traits.length > 0"
                                >{{ item.traits.join(", ") }}</span
                              >
                            </td>
                            <td class="text-left">
                              <v-btn
                                outlined
                                x-small
                                color="info"
                                @click="openDialogItem(item)"
                              >
                                <v-icon left>visibility</v-icon> Просмотр
                              </v-btn>
                            </td>
                          </tr>
                        </template>
                      </v-data-table>

                      <div
                        v-if="armour.length === 0"
                        align="center"
                        class="mt-2 mb-2"
                      >
                        <em>Нет доспехов? Возьми на вкладке Снаряжения!</em>
                      </div>
                    </div>

                    <!-- species < abilities -->
                    <div
                      v-show="
                        wargearSection.selection === 'снаряжение' ||
                        wargearSection.selection === 'все'
                      "
                    >
                      <div
                        v-for="gearItem in wargear"
                        :key="gearItem.id"
                        class="caption mb-2"
                      >
                        <div v-if="gearItem.variant" style="display: inline">
                          <strong>{{ gearItem.variant }}</strong>
                          <span> ({{ gearItem.name }})</span>
                        </div>
                        <strong v-else>{{ gearItem.name }}</strong>
                        <em v-if="gearItem.type"> • {{ gearItem.type }}</em>
                        <span v-if="gearItem.source">
                          <em v-if="gearItem.source.key">
                            • {{ gearItem.source.key }}</em
                          ><em v-if="!isNaN(gearItem.source.page)"
                            >, pg. {{ gearItem.source.page }}</em
                          >
                        </span>

                        <p class="mb-1" v-if="gearItem.snippet">
                          {{ gearItem.snippet }}
                        </p>
                        <div
                          class="mb-1"
                          v-else
                          v-html="gearItem.description"
                        ></div>

                        <div
                          v-if="
                            gearItem.meta !== undefined &&
                            gearItem.meta.length > 0 &&
                            ['armour'].includes(gearItem.meta[0].type)
                          "
                        >
                          <p
                            class="ml-1 pl-2 mb-1"
                            style="border-left: solid 3px lightgrey"
                            v-for="trait in gearItem.meta[0].traits"
                            v-if="traitByName(trait, true)"
                            :key="trait"
                          >
                            <strong>{{ trait }}: </strong>
                            {{ traitByName(trait, true).crunch }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-tab-item>

              <!-- abilities (All, Race, Archetype, Talents, Faith?, Other) -->
              <v-tab-item
                class="my-tab-item"
                key="abilities-talents"
                :value="`tab-abilities-talents`"
              >
                <div class="pa-2">
                  <v-chip-group
                    mandatory
                    active-class="red--text"
                    v-model="abilitySection.selection"
                  >
                    <v-chip
                      label
                      small
                      v-for="item in [
                        `Все`,
                        `Наследие`,
                        `Класс`,
                        `Предыстория`,
                        `Черты`,
                        `Другое`,
                      ]"
                      :key="item.toLowerCase()"
                      :value="item.toLowerCase()"
                    >
                      {{ item }}
                    </v-chip>
                  </v-chip-group>

                  <div style="height: 505px; overflow-y: auto">
                    <!-- species < abilities -->
                    <div
                      v-show="
                        abilitySection.selection === 'наследие' ||
                        (abilitySection.selection === 'все' &&
                          speciesAbilities.length > 0)
                      "
                    >
                      <div
                        class="mb-1"
                        style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
                      >
                        <span class="body-2 red--text"
                          >Наследие/Родословная</span
                        >
                      </div>
                      <div
                        v-for="ability in speciesAbilities"
                        :key="ability.name"
                        class="caption mb-2"
                      >
                        <strong>{{ ability.name }}</strong
                        ><em v-if="ability.source"> • {{ ability.source }}</em>
                        <div v-html="computeFormatedText(ability.effect)" />

                        <div
                          v-if="ability.selectedOptions"
                          v-for="selectedOption in ability.selectedOptions"
                          class="ml-1 pl-2"
                          style="border-left: solid 3px lightgrey"
                        >
                          <strong>{{ selectedOption.name }}</strong>
                          <div v-if="selectedOption.snippet">
                            <p
                              class="mb-1"
                              v-html="
                                computeFormatedText(selectedOption.snippet)
                              "
                            ></p>
                          </div>
                          <div
                            v-else
                            v-html="
                              computeFormatedText(selectedOption.description)
                            "
                          ></div>
                        </div>
                      </div>
                      <div
                        v-if="speciesAbilities.length === 0"
                        align="center"
                        class="mt-2 mb-2"
                      >
                        <em
                          >Нет особенностей? Выберите наследие и все
                          увидите!</em
                        >
                      </div>
                    </div>

                    <!-- archetype < abilities -->
                    <div
                      v-show="
                        ['все', 'класс'].some(
                          (i) => i === abilitySection.selection
                        )
                      "
                    >
                      <div
                        class="mb-1"
                        style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
                      >
                        <span class="body-2 red--text">Класс</span>
                      </div>

                      <div
                        v-for="ability in archetypeAbilities"
                        :key="ability.key"
                        class="caption mb-2"
                      >
                        <strong>{{ ability.name }}</strong>
                        <em v-if="ability.source"> • {{ ability.source }}</em>
                        <em v-if="ability.level"> {{ ability.level }}</em>
                        <div v-if="ability.snippet">
                          <p
                            class="mb-1"
                            v-html="computeFormatedText(ability.snippet)"
                          ></p>
                        </div>
                        <div
                          v-else
                          v-html="computeFormatedText(ability.description)"
                        ></div>

                        <div
                          v-if="ability.selectedOptions"
                          v-for="selectedOption in ability.selectedOptions"
                          class="ml-1 pl-2"
                          style="border-left: solid 3px lightgrey"
                        >
                          <strong>{{ selectedOption.name }}</strong>
                          <div v-if="selectedOption.snippet">
                            <p
                              class="mb-1"
                              v-html="
                                computeFormatedText(selectedOption.snippet)
                              "
                            ></p>
                          </div>
                          <div
                            v-else
                            v-html="
                              computeFormatedText(selectedOption.description)
                            "
                          ></div>
                        </div>
                      </div>
                    </div>

                    <!-- Ascensions < abilities (Background, Other) -->
                    <div
                      v-show="
                        abilitySection.selection === 'предыстория' ||
                        (abilitySection.selection === 'все' &&
                          ascensionAbilities.length > 0)
                      "
                    >
                      <div
                        class="mb-1"
                        style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
                      >
                        <span class="body-2 red--text">Предыстория</span>
                      </div>

                      <div
                        v-for="ability in ascensionAbilities"
                        :key="ability.name"
                        class="caption mb-2"
                      >
                        <strong>{{ ability.name }}</strong>
                        <em v-if="ability.source"> • {{ ability.source }}</em>

                        <div v-if="ability.snippet">
                          <p
                            class="mb-1"
                            v-html="computeFormatedText(ability.snippet)"
                          ></p>
                        </div>
                        <div
                          v-else
                          v-html="computeFormatedText(ability.description)"
                        ></div>

                        <div
                          v-if="ability.selectedOption"
                          class="ml-1 pl-2"
                          style="border-left: solid 3px lightgrey"
                        >
                          <strong v-if="ability.selectedOption.name">{{
                            ability.selectedOption.name
                          }}</strong>
                          <div v-if="ability.selectedOption.snippet">
                            <p
                              class="mb-1"
                              v-html="ability.selectedOption.snippet"
                            ></p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- talents < abilities -->
                    <div
                      v-show="
                        ['все', 'черты'].some(
                          (i) => i === abilitySection.selection
                        )
                      "
                    >
                      <div
                        class="mb-1"
                        style="
                          border-bottom: 1px solid rgba(0, 0, 0, 0.12);
                          display: flex;
                        "
                      >
                        <span class="body-2 red--text" style="flex: 1"
                          >Черты</span
                        >
                      </div>

                      <div
                        v-if="talents.length > 0"
                        v-for="talent in talents"
                        :key="talent.name"
                        class="caption mb-2"
                      >
                        <strong>{{ talent.name }}</strong>
                        <em> • Черта </em>
                        <span v-if="talent.type && talent.level">
                          <em v-if="talent.type"> • {{ talent.type }}</em
                          ><em v-if="talent.level"> • {{ talent.level }}</em>
                        </span>
                        <div v-if="talent.snippet">
                          <p
                            class="mb-1"
                            v-html="computeFormatedText(talent.snippet)"
                          ></p>
                        </div>
                        <div
                          v-else
                          v-html="computeFormatedText(talent.description)"
                        ></div>

                        <div
                          v-if="talent.selectedOptions"
                          v-for="selectedOption in talent.selectedOptions"
                          class="ml-1 pl-2"
                          style="border-left: solid 3px lightgrey"
                        >
                          <strong>{{ selectedOption.name }}</strong>
                          <div v-if="selectedOption.snippet">
                            <p
                              class="mb-1"
                              v-html="
                                computeFormatedText(selectedOption.snippet)
                              "
                            ></p>
                          </div>
                          <div
                            v-else
                            v-html="
                              computeFormatedText(selectedOption.description)
                            "
                          ></div>
                        </div>

                        <div
                          v-if="false"
                          class="mt-1 mb-1 ml-1 pl-2"
                          style="
                            flex-wrap: wrap;
                            display: flex;
                            border-left: solid 3px lightgrey;
                          "
                        >
                          <div
                            v-for="pointIndex in characterFaith.points"
                            class="faith-box"
                            :class="{
                              'faith-box--filled':
                                pointIndex <= characterFaith.spend,
                            }"
                            @click="toggleResourceFaith(pointIndex)"
                          ></div>
                          <span class="caption ml-2">/ Faith Points</span>
                        </div>
                      </div>

                      <div
                        v-if="talents.length === 0"
                        align="center"
                        class="mt-2 mb-2"
                      >
                        <em>Knowledge is treason.</em>
                      </div>
                    </div>

                    <!-- other < abilities (Ascensions, Background, Other) -->
                    <div
                      v-show="
                        abilitySection.selection === 'другое' ||
                        (abilitySection.selection === 'все' &&
                          otherAbilities.length > 0)
                      "
                    >
                      <div
                        class="mb-1"
                        style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
                      >
                        <span class="body-2 red--text">Other</span>
                      </div>

                      <div
                        v-for="ability in otherAbilities"
                        :key="`${ability.id ? ability.id : ability.name}`"
                        class="caption mb-3"
                      >
                        <strong>{{ ability.name }}</strong>
                        <em v-if="ability.source"> • {{ ability.source }}</em>
                        <span v-if="ability.source === 'Mutation'">
                          <v-hover>
                            <v-icon
                              small
                              @click="removeMutation(ability.id)"
                              slot-scope="{ hover }"
                              :color="`${hover ? 'error' : ''}`"
                              >delete</v-icon
                            >
                          </v-hover>
                        </span>

                        <div v-if="ability.snippet">
                          <p
                            class="mb-1"
                            v-html="computeFormatedText(ability.snippet)"
                          ></p>
                        </div>
                        <div
                          v-else
                          v-html="computeFormatedText(ability.description)"
                        ></div>

                        <div
                          v-if="ability.selectedOption"
                          class="ml-1 pl-2 mt-1"
                          style="border-left: solid 3px lightgrey"
                        >
                          <strong v-if="ability.selectedOption.name">{{
                            ability.selectedOption.name
                          }}</strong>
                          <p v-if="ability.selectedOption.snippet">
                            {{ ability.selectedOption.snippet }}
                          </p>
                        </div>

                        <div
                          v-if="ability.selectedOptions"
                          v-for="selectedOption in ability.selectedOptions"
                          class="ml-1 pl-2"
                          style="border-left: solid 3px lightgrey"
                        >
                          <strong>{{ selectedOption.name }}</strong>
                          <div v-if="selectedOption.snippet">
                            <p
                              class="mb-1"
                              v-html="
                                computeFormatedText(selectedOption.snippet)
                              "
                            ></p>
                          </div>
                          <div
                            v-else
                            v-html="
                              computeFormatedText(selectedOption.description)
                            "
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </v-tab-item>

              <!-- powers -->
              <v-tab-item
                class="my-tab-item"
                key="psychic-powers"
                :value="`tab-psychic-powers`"
              >
                <div class="pa-2">
                  <v-col
                    :cols="12"
                    v-if="
                      characterArchetype && characterArchetype.spellProgression
                    "
                  >
                    <v-card
                      class="mb-4"
                      dense
                      outlined
                      v-for="levelAncestry in 10"
                      :key="levelAncestry"
                      v-if="
                        levelAncestry - 1 <=
                          characterArchetype.spellProgression[
                            characterLevel()
                          ].findIndex((t) => t == 0) -
                            1 || characterLevel() == 20
                      "
                    >
                      <h2 class="subtitle-1 text-center">
                        {{
                          levelAncestry - 1 === 0
                            ? "Чары"
                            : `${levelAncestry - 1} уровень`
                        }}
                      </h2>
                      <div
                        class="ammo-container"
                        v-if="characterArchetype.prepared === false"
                      >
                        <!-- Патроны -->
                        <div
                          class="magazine"
                          @click="
                            handleClick(
                              $event,
                              levelAncestry - 1,
                              characterSpont[levelAncestry - 1]
                                ? characterSpont[levelAncestry - 1].value
                                : characterArchetype.spellProgression[
                                    characterLevel()
                                  ]?.[levelAncestry - 1]
                            )
                          "
                          @contextmenu.prevent="
                            handleClick(
                              $event,
                              levelAncestry - 1,
                              characterSpont[levelAncestry - 1]
                                ? characterSpont[levelAncestry - 1].value
                                : characterArchetype.spellProgression[
                                    characterLevel()
                                  ]?.[levelAncestry - 1]
                            )
                          "
                        >
                          <span
                            v-for="n in characterArchetype.spellProgression[
                              characterLevel()
                            ]?.[levelAncestry - 1] || 0"
                            class="bullet"
                            :class="{
                              filled:
                                n <=
                                (characterSpont[levelAncestry - 1]?.value || 0),
                            }"
                          >
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

                      <v-data-table
                        :headers="filteredHeaders"
                        :items="psychicPowers(levelAncestry - 1)"
                        :item-class="getItemClass"
                        item-key="cellIndex"
                        hide-default-footer
                        dense
                      >
                        <template v-slot:item.cast="{ item }">
                          <v-btn
                            v-if="item.name"
                            outlined
                            x-small
                            color="info"
                            @click="updateCast(item)"
                          >
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
                            <img
                              :src="iconAction(item?.time?.value)"
                              :class="{ 'invert-icon': !$vuetify.theme.dark }"
                            />
                          </div>
                        </template>

                        <template v-slot:item.duration="{ item }">
                          <span v-if="item?.duration?.sustained === true"
                            >Поддерживаемое до
                          </span>
                          {{ item?.duration?.value }}
                        </template>

                        <template v-slot:item.distance="{ item }">
                          {{ item?.distance || "-" }}
                        </template>

                        <template v-slot:item.saving="{ item }">
                          <span v-if="item?.defense?.save">
                            <span v-if="item?.defense?.save?.basic"
                              >Базовый
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
                          <v-btn
                            v-if="item.name"
                            outlined
                            x-small
                            color="info"
                            @click="openDialog(item)"
                          >
                            <v-icon left>visibility</v-icon> Просмотр
                          </v-btn>
                        </template>

                        <!-- <template v-slot:item.button="{ item }">
                        <v-btn
                          v-if="item.name"
                          outlined
                          x-small
                          color="error"
                          @click.stop.prevent="removeTalent(item)"
                        >
                          <v-icon left>delete</v-icon> Удалить
                        </v-btn>

                        <v-btn
                          v-if="!item.name"
                          outlined
                          x-small
                          color="success"
                          @click="updatePreview(item.rank, item.cell)"
                        >
                          <v-icon left>add</v-icon> Добавить
                        </v-btn>
                      </template> -->
                      </v-data-table>
                    </v-card>
                  </v-col>

                  <!-- <v-data-table
                  :headers="psychicPowersHeaders"
                  :items="psychicPowers"
                  hide-default-footer
                  :items-per-page="-1"
                >
                  <template v-slot:item="{ item }">
                    <tr>
                      <td class="text-left pa-1 small">
                        {{ item.name }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.crunch_difficulty_number }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.crunch_activation }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.crunch_duration }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.crunch_range }}
                      </td>
                      <td class="text-center pa-1 small">
                        {{ item.crunch_multi_target }}
                      </td>
                      <td class="text-left pa-1 small">
                        {{ item.effect }}
                      </td>
                    </tr>
                  </template>
                </v-data-table> -->
                </div>
                <div
                  v-if="!characterArchetype?.spellProgression"
                  align="center"
                  class="mt-2 mb-2"
                >
                  <em>Нет заклинаний? Выберите класс заклинателя и увидите!</em>
                </div>
                <!-- notes, bound, others -->
              </v-tab-item>

              <!-- objectives -->
              <v-tab-item
                class="my-tab-item"
                key="objectives"
                :value="`tab-objectives`"
              >
                <div class="pa-2">
                  <v-chip-group
                    mandatory
                    active-class="red--text"
                    v-model="descriptionSection.selection"
                  >
                    <v-chip
                      label
                      small
                      v-for="item in [`Все`, `Языки`, `Трейты`, `Заметки`]"
                      :key="item.toLowerCase()"
                      :value="item.toLowerCase()"
                    >
                      {{ item }}
                    </v-chip>
                  </v-chip-group>

                  <div style="height: 505px; overflow-y: auto">
                    <!-- objectives < description -->
                    <!-- <div
                    v-show="
                      ['all', 'objectives'].some(
                        (i) => i === descriptionSection.selection
                      )
                    "
                  >
                    <div
                      class="mb-1"
                      style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
                    >
                      <span class="body-2 red--text">Objectives</span>
                      <v-icon small v-if="false" @click="objectiveEditorOpen"
                        >редактировать</v-icon
                      >
                    </div>
                    <div
                      v-for="(objective, index) in objectives"
                      :key="objective.name"
                      class="pl-2 pr-2 pt-1 pb-1 caption"
                    >
                      <strong>{{ index + 1 }}:</strong> {{ objective.text }}
                    </div>
                    <div v-if="false">
                      <span class="caption" @click="objectiveEditorOpen"
                        >+ Add/edit objectives</span
                      >
                    </div>
                    <div
                      style="display: flex"
                      justify="center"
                      align
                      v-if="objectiveEditorShow"
                    >
                      <v-textarea
                        flat
                        single-lined
                        dense
                        v-model="objectiveEditorValue"
                      ></v-textarea>
                    </div>
                  </div> -->

                    <!-- languages < description -->
                    <div
                      v-show="
                        ['все', 'языки'].some(
                          (i) => i === descriptionSection.selection
                        )
                      "
                    >
                      <div
                        class="mb-2"
                        style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
                      >
                        <span class="body-2 red--text">Языки</span>
                      </div>
                      <div v-if="languages.length > 0" class="caption">
                        {{ languages.map((l) => l.name).join(" • ") }}
                      </div>
                    </div>

                    <!-- keywords < description -->
                    <div
                      v-show="
                        ['все', 'трейты'].some(
                          (i) => i === descriptionSection.selection
                        )
                      "
                    >
                      <div
                        class="mb-2"
                        style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
                      >
                        <span class="body-2 red--text">Трейты</span>
                      </div>
                      <div
                        v-for="keyword in keywords"
                        :key="keyword.name"
                        class="caption"
                      >
                        <strong>{{ keyword.name }}</strong>
                        <!-- <em> • {{ keyword.type }}</em> -->
                        <!-- <span v-if="keyword.custom">
                        <v-hover>
                          <v-icon
                            small
                            @click="removeCustomKeyword(keyword.name)"
                            slot-scope="{ hover }"
                            :color="`${hover ? 'error' : ''}`"
                            >delete</v-icon
                          >
                        </v-hover>
                      </span> -->
                        <p>
                          {{ keyword.description }}
                        </p>
                      </div>
                      <!-- <div style="display: flex; justify-content: center">
                      <v-btn x-small text @click="keywordsEditorDialog = true"
                        >Additional Keywords
                        <v-icon small>settings</v-icon></v-btn
                      >
                    </div> -->
                    </div>

                    <!-- objectives < description -->
                    <div
                      v-show="
                        ['все', 'заметки'].some(
                          (i) => i === descriptionSection.selection
                        )
                      "
                    >
                      <div
                        class="mb-1"
                        style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)"
                      >
                        <span class="body-2 red--text">
                          Notes
                          <v-icon
                            v-if="!characterNotesShowEditor"
                            small
                            @click="characterNotesOpenEditor"
                            >edit</v-icon
                          >
                        </span>
                      </div>
                      <div v-if="characterNotesShowEditor">
                        <v-textarea
                          v-model="characterNotesEditorModel"
                          hint="Используй markdown, например **жирный** _курсив_"
                          persistent-hint
                          filled
                          auto-grow
                        ></v-textarea>
                        <v-btn @click="characterNotesSave" small color="success"
                          >Save</v-btn
                        >
                      </div>
                      <div
                        v-else-if="characterNotes"
                        class="caption"
                        v-html="characterNotes"
                      ></div>
                      <span
                        v-else
                        class="caption"
                        @click="characterNotesOpenEditor"
                        >Добавить заметики</span
                      >
                    </div>
                  </div>
                </div>

                <!-- <v-row v-if="false" no-gutters>
                <v-col :cols="6" class="pa-1">
                  <v-card height="100%" class="flexcard">
                    <v-card-text>
                      <p class="caption">
                        Spend one <strong>Wrath</strong> to:
                      </p>
                      <ul class="pl-3">
                        <li class="caption">
                          Re-roll failures once on a test
                        </li>
                        <li class="caption">
                          Re-roll failures once on a soak attempt
                        </li>
                        <li class="caption">
                          Add +1 to a Defiance check
                        </li>
                        <li class="caption">
                          Make a narrative declaration
                        </li>
                        <li class="caption">
                          As an Action: restore 1d3+1 Shock
                        </li>
                      </ul>
                    </v-card-text>
                  </v-card>
                </v-col>

                <v-col :cols="6" class="pa-1">
                  <v-card height="100%" class="flexcard">
                    <v-card-text>
                      <p class="caption">
                        Spend one <strong>Glory</strong> to:
                      </p>
                      <ul class="pl-3">
                        <li class="caption">
                          Add +1d to a test after any re-rolls
                        </li>
                        <li class="caption">
                          Add +1 damage to a successful attack
                        </li>
                        <li class="caption">
                          Increase the severity of a Critical Hit
                        </li>
                        <li class="caption">
                          Seize the Initiative
                        </li>
                      </ul>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row> -->
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
                    <trait-view
                      v-if="selectedItem.traits"
                      :item="selectedItem"
                      class="mb-2"
                    />
                  </div>
                </v-row>
                <p></p>
                <!-- Описание закла -->
                <div v-if="selectedItem.traditions">
                  <p
                    class="main-holder"
                    v-if="selectedItem.traditions.length > 0"
                  >
                    <strong>Традиция:</strong>
                    {{ selectedItem.traditions.join(", ") }}
                  </p>
                </div>
                <div v-if="selectedItem.ritual">
                  <p class="main-holder">
                    <strong>Первичный кастер:</strong>
                    {{ selectedItem.ritual.primary.check }}
                  </p>

                  <p class="main-holder" v-if="selectedItem.ritual">
                    <strong>Вторичные кастеры:</strong>
                    {{ selectedItem.ritual.secondary.casters }}
                    ( {{ selectedItem.ritual.secondary.checks }} )
                  </p>
                </div>
                <p></p>
                <div v-if="selectedItem.time">
                  <p class="main-holder" v-if="!selectedItem.ritual">
                    <strong>Сотворение:</strong>
                    <img
                      :src="iconAction(selectedItem?.time?.value)"
                      :class="{ 'invert-icon': !$vuetify.theme.dark }"
                    />
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
                    <!-- <strong>Защита:</strong>
              <span v-if="selectedItem.defense.save.basic === true"
                >Базовый
              </span>
              {{ selectedItem.defense.save.statistic }} -->
                    <span v-if="selectedItem?.defense?.save">
                      <span v-if="selectedItem?.defense?.save?.basic"
                        >Базовый
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
                    <span v-if="selectedItem.duration.sustained === true"
                      >Поддерживаемое до
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
                <div
                  class="pt-4 pb-2"
                  v-html="selectedItem.powerDescription"
                ></div>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" text @click="dialog = false"
                  >Закрыть</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogItem" max-width="800px">
            <v-card v-if="selectedItem">
              <v-card-text>
                <v-row class="rowFeat">
                  <div class="head">
                    <h1>{{ selectedItem.nameGear }}</h1>
                  </div>
                  <div class="line"></div>
                  <div class="tag">
                    <span
                      v-if="['melee', 'ranged'].includes(selectedItem.type)"
                    >
                      Оружие
                    </span>
                    <span
                      v-if="!['melee', 'ranged'].includes(selectedItem.type)"
                    >
                      Доспех
                    </span>
                    {{ selectedItem.level }}
                  </div>
                </v-row>
                <v-row>
                  <!-- <div>
                    <trait-view v-if="selectedItem.traits" :selectedItem="selectedItem" class="mb-2" />
                  </div> -->
                </v-row>
                <p></p>
                <!-- Описание закла -->
                <div v-if="selectedItem.source.book">
                  <strong>Источник:</strong> {{ selectedItem.source.book }}
                </div>
                <div v-if="selectedItem.hands">
                  <p class="main-holder">
                    <strong>Руки:</strong> {{ selectedItem.hands }}
                  </p>
                </div>
                <p></p>
                <div>
                  <p class="main-holder">
                    <strong>Цена:</strong> {{ wargearPrice(selectedItem) }}
                  </p>
                </div>
                <p></p>
                <div v-if="selectedItem.distance">
                  <p class="main-holder">
                    <strong>Дистанция:</strong> {{ selectedItem.distance }}
                  </p>
                </div>
                <p></p>
                <div v-if="selectedItem.area">
                  <p class="main-holder">
                    <strong>Область:</strong>
                    <span v-html="selectedItem.area"></span>
                  </p>
                </div>
                <p></p>
                <div v-if="selectedItem.target">
                  <p class="main-holder">
                    <strong>Дистанция:</strong> {{ selectedItem.target }}
                  </p>
                </div>
                <p></p>
                <div class="line"></div>
                <div class="pt-4 pb-2" v-html="selectedItem.description"></div>
                <div class="line"></div>
                <div
                  class="pt-4 pb-2"
                  v-html="selectedItem.powerDescription"
                ></div>
              </v-card-text>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogAction" max-width="800px">
            <v-card class="glass-card pa-4">
              <v-card-title class="headline">
                {{ selectedAction?.name }}
              </v-card-title>
              <v-card-text>
                <v-row>
                  <div>
                    <trait-view
                      v-if="selectedAction"
                      :item="selectedAction"
                      class="mb-2"
                    />
                  </div>
                </v-row>
                <div
                  class="pt-4 pb-2"
                  v-html="selectedAction?.description"
                ></div>
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
                <v-btn text color="grey" @click="dialogAction = false"
                  >Close</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
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
import {marked} from 'marked';
import traitView from '~/components/TraitView';

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
    traitView
  },
  props: [],
  head() {
    return {
      title: this.characterName,
    };
  },
  async asyncData({ params, $axios }) {

    const factionResponse = await $axios.get('/api/factions/');
    const chaptersResponse = await $axios.get('/api/species/chapters/');
    const talentResponse = await $axios.get('/api/talents/');
    const psychicPowersResponse = await $axios.get('/api/psychic-powers/');
    const psychicAbilitiesResponse = await $axios.get('/api/psychic-powers/universal-abilities');
    const abilityAncestryResponse = await $axios.get('/api/abilityAncestry/');
    return {
      characterId: params.id,
      astartesChapterRepository: chaptersResponse.data,
      factionRepository: factionResponse.data,
      psychicPowersRepository: psychicPowersResponse.data,
      psychicAbilitiesRepository: psychicAbilitiesResponse.data,
      talentRepository: talentResponse.data,
      abilityRepository: abilityAncestryResponse.data,
      breadcrumbItems: [
        { text: '', nuxt: true, exact: true, to: '/' },
        { text: 'Билдодельня', nuxt: true, exact: true, to: '/forge/my-characters' },
        { text: 'Персонаж', nuxt: true, exact: true, to: `/forge/characters/${params.id}` },
      ],
    };
  },
  data() {
    return {
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
        // { text: 'Характеристика', sortable: false, align: 'center', class: 'text-center small pa-1' },
        { text: 'Владение', value: 'rating', sortable: false, align: 'center', class: 'text-center small pa-1' },
        { text: 'Значение', value: 'value', sortable: false, align: 'center', class: 'text-center small pa-1' },
        // { text: 'Notes', sortable: false, style: 'center', class: 'text-center small pa-1' },
      ],

      armorHeaders: [
        { text: 'Название', sortable: false, align: 'left', class: 'small pa-1' },
        { text: 'Группа доспеха', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Вес', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Категория', sortable: false, align: 'center', class: 'small pa-1' },
        // { text: 'Руки', sortable: false, align: 'center', class: 'small pa-1' },
        { text: 'Трейты', sortable: false, align: 'left', class: 'small pa-1' },
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
      psychicPowersHeaders: [
                 {
          text: 'Сотв.',
          value: 'cast',
          align: 'left',
          sortable: false, class: 'small pa-1'
        },
         {
          text: 'Название',
          value: 'name',
          align: 'left',
          sortable: true, class: 'small pa-1'
        },
        {
          text: 'Действия',
          value: 'action',
          align: 'center',
          sortable: true, class: 'small pa-1'
        },
        {
          text: 'Длительность',
          value: 'duration',
          sortable: true, class: 'small pa-1'
        },
        {
          text: 'Дистанция',
          value: 'range',
          sortable: false, class: 'small pa-1'
        },
        {
          text: 'Защита',
          value: 'saving',
          sortable: false, class: 'small pa-1'
        },
        {
          text: 'Область/цель',
          value: 'area',
          sortable: false, class: 'small pa-1'
        },
        {
          text: '',
          value: 'view',
          sortable: false, class: 'small pa-1'
        },
        {
          text: '',
          value: 'button',
          sortable: false, class: 'small pa-1'
        },
        // { text: 'Name', sortable: false, align: 'left', class: 'small pa-1' },
        // { text: 'DN', sortable: false, align: 'center', class: 'small pa-1' },
        // { text: 'Activation', sortable: false, align: 'center', class: 'small pa-1' },
        // { text: 'Duration', sortable: false, align: 'center', class: 'small pa-1' },
        // { text: 'Range', sortable: false, align: 'center', class: 'small pa-1' },
        // { text: 'Multi-Target', sortable: false, align: 'center', class: 'small pa-1' },
        // { text: 'Effect', sortable: false, align: 'left', class: 'small pa-1' },
      ],
        editingHp: false,
      crossedRows: [],
      descriptionSection: { selection: 'all' },
      abilitySection: { filter: 'all' },
      wargearSection: { filter: 'all' },
      currentHP: 0,

      tempHP: 0,
      loading: false,
      selectedItem: undefined,
      selectedAction: undefined,
      dialogAction: false,
      //
      showContextDialog: false,
      contextDialogComponent: undefined,
      contextDialogTraitKey: undefined,
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
      dialog: false,
      dialogItem: false,
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
  computed: {
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
    campaignCustomXp() {
      return this.$store.getters['characters/characterCampaignCustomXpById'](this.characterId);
    },
    speciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    heritageKey() {
      return this.$store.getters['characters/characterHeritageKeyById'](this.characterId);
    },
    character()
    {
      //При открытии компонента подгружать из Персонажа
      this.currentHP = this.$store.getters['characters/characterCurrentHitPointsById'](this.characterId);
      this.tempHP =  this.$store.getters['characters/characterTempHitPointsById'](this.characterId);
      return 1;
    },
    speciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    speciesAstartesChapter() {
      let chapter = this.$store.getters['characters/characterSpeciesAstartesChapterById'](this.characterId);
      if ( chapter && chapter.includes(' ') ) { // its an old chapter name, using CORE
        chapter = `core ${chapter}`.toLowerCase().replace(/\W/gm, '-');
      }
      return chapter;
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
      return this.$store.getters["characters/characterSpeedById"](
        this.characterId
      );
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
            description: 'Alright then, keep your secrets.',
            custom: charKeyword?.custom || false,
          };
          const k = this.keywordCombinedRepository.find(i => i.name===keyword.name);
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
    avatar() {
      const customAvatarUrl = this.$store.getters['characters/characterAvatarUrlById'](this.characterId);

      if ( customAvatarUrl ) {
        return customAvatarUrl;
      }

      if (this.archetypeKey !== undefined) {
        if (this.archetypeKey === 'advanced') {
          return '/img/avatar_placeholder.png';
        }
        if (!['core-ratling', 'core-ogryn'].includes(this.speciesKey)) {
          return `/img/avatars/archetype/${this.archetypeKey}.png`;
        }
      }

      if (this.speciesKey !== undefined) {
        return `/img/avatars/species/${this.speciesKey}.png`;
      }

      return '/img/avatars/species/core-human.png';
    },

    characterAttributesEnhanced() {
      let enhancedAttributes = this.$store.getters['characters/characterAttributesEnhancedById'](this.characterId);
      return enhancedAttributes;
    },

    /**
     * {
     *  name: 'Strength',
     *  key: 'strength,
     *  rating: 3, // aka bought value / rating
     *  adjustedRating: 5, // adjuste rating,
     *  adjustment: 2, // the adjusted amount
     *  modifiers: [
     *    // +1 from Attribute Modification * Space Marine Species
     *    // +3 from Powered(3) * Astartes MK VII
     *    { static: 1, rank: false, halfRank: false, }
     *  ],
     * }
     */
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

      // this.enhancements
      // .filter((enhancement)=>enhancement.targetGroup==='attributes')
      // .forEach((enhancement)=>{
      //   let attr = attributes.find((a)=>a.key===enhancement.targetValue);
      //   attr.adjustment += enhancement.modifier;
      //   attr.adjustedRating += enhancement.modifier;
      //   attr.modifiers.push(`${enhancement.modifier < 0 ? '-' : '+'}${enhancement.modifier} • ${enhancement.provider} • (${enhancement.category})`);
      // });

      // attributes = attributes.map((a) => {
      //   if (a.adjustedRating < 1) {
      //     a.adjustedRating = Math.max(1, a.adjustedRating);
      //     a.modifiers.push('(i) Value is increase to at least 1.');
      //   }
      //   return a;
      // });

      // let poweredStrength = 0;
      // // enrich with (equipped) gear
      // if ( this.armour && this.armour.length > 0 ) {
      //   const wornArmour = this.armour
      //     .filter((armour) => !armour.meta[0].traits.includes('Shield'))
      //     .filter((armour) => armour.meta[0].traits.find((trait) => trait.indexOf('Powered') >= 0 ))
      //     .sort((a, b) => a.meta[0].armourRating < b.meta[0].armourRating ? 1 : -1)
      //     .find((i) => true);
      //   if (wornArmour) {
      //     let poweredString = wornArmour.meta[0].traits.find((trait)=>trait.includes('Powered'));
      //     if (poweredString) {
      //       const trait = this.normalizeTrait(poweredString);
      //       if ( trait.variant) {
      //         poweredStrength = parseInt(trait.variant);
      //         let strength = attributes.find((a)=>a.key==='strength');
      //         strength.adjustedRating += poweredStrength;
      //         strength.adjustment += poweredStrength;
      //         strength.modifiers.push(`+${poweredStrength} • ${wornArmour.name} (Powered Armour)`);
      //       }
      //     }
      //   }
      // }

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
        if (t.key === 'influence' && this.speciesKey === 'core-ork') {
          relatedAttribute = attributes.find((attribute) => attribute.name === 'Strength');
        }

        if (relatedAttribute) {
          baseTraitValue += Math.ceil(relatedAttribute.adjustedRating * t.compute.multi);
        } else {
          let relatedSkill = this.skills.find((skill) => skill.name === t.skill);
          if (relatedSkill) {
            // todo better find the correct value
            baseTraitValue += Math.ceil(this.computeSkillPool(relatedSkill) * t.compute.multi);
          }
        }

        if (t.key === 'speed') {
          baseTraitValue = characterTraits[t.key];
        }

        baseTraitValue += t.compute.static;
        baseTraitValue += t.compute.tier * this.characterSettingTier ;

        const enhancedValue = baseTraitValue;
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

      // We search all enhancements that have TRAIT modifications
      // this.enhancements
      // .filter((enhancement) => enhancement.targetGroup==='traits')
      // .forEach((enhancement) => {
      //   // {"targetGroup":"attributes","targetValue":"strength","modifier":1,"source":"species"}
      //   let traity = finalTraits.find((a) => a.key === enhancement.targetValue);
      //   let mody = enhancement.modifier;
      //   if (enhancement.rank) {
      //     mody += (enhancement.rank * this.characterRank );
      //   }
      //   if (enhancement.modifierPerAscendedTier) {
      //     mody += (enhancement.modifierPerAscendedTier * enhancement.ascendedTiers);
      //   }
      //   if ( traity ) {
      //     const modifier = {
      //       value: mody,
      //       valueString: `${mody < 0 ? '-' : '+'}${mody}`,
      //       type: 'MODIFIER',
      //       condition: enhancement.condition || null,
      //       provider: enhancement.provider,
      //       category: enhancement.category,
      //     };
      //     traity.modifiers.push(modifier);
      //     if (enhancement.condition) {
      //       traity.conditionalAdjustment += mody;
      //     } else {
      //       traity.adjustment += mody;
      //       traity.adjustedRating += mody;
      //     }
      //   } else {
      //     console.warn(`Unexpected undefined trait for ${enhancement.targetValue}.`);
      //   }
      // });

      if (this.armour && this.armour.length > 0) {
        let resilience = finalTraits.find((a) => a.key === 'resilience');
        let defence = finalTraits.find((a) => a.key === 'defence');
        const wornArmour = this.armour
          .filter((armour) => !armour.meta[0].traits.includes('Shield'))
          .sort((a, b) => a.meta[0].armourRating < b.meta[0].armourRating ? 1 : -1)
          .find((i) => true)
        if (wornArmour) {
          resilience.adjustment += wornArmour.meta[0].armourRating;
          resilience.adjustedRating += wornArmour.meta[0].armourRating;
          const modifier = {
            value: wornArmour.meta[0].armourRating,
            valueString: `${wornArmour.meta[0].armourRating < 0 ? '-' : '+'}${wornArmour.meta[0].armourRating}`,
            type: 'MODIFIER',
            condition: null,
            provider: wornArmour.name,
            category: wornArmour.type,
          };
          resilience.modifiers.push(modifier);
        }
        const wornShield = this.armour
          .filter((armour) => armour.meta[0].traits.includes('Shield'))
          .sort((a, b) => a.meta[0].armourRating < b.meta[0].armourRating ? 1 : -1)
          .find((i) => true);
        if (wornShield) {
          const modifier = {
            value: wornShield.meta[0].armourRating,
            valueString: `${wornShield.meta[0].armourRating < 0 ? '-' : '+'}${wornShield.meta[0].armourRating}`,
            type: 'MODIFIER',
            condition: null,
            provider: wornShield.name,
            category: wornShield.type,
          };
          resilience.adjustment += wornShield.meta[0].armourRating;
          resilience.adjustedRating += wornShield.meta[0].armourRating;
          resilience.modifiers.push(modifier);
          defence.adjustment += wornShield.meta[0].armourRating;
          defence.adjustedRating += wornShield.meta[0].armourRating;
          defence.modifiers.push(modifier);
        }
      }

      let influence = finalTraits.find((t) => t.key === 'influence');
      if (influence && this.keywordStrings.includes('Adeptus Mechanicus')) {
        const intellect = attributes.find((attribute) => attribute.name === 'Intellect');
        let baseIntellect = 0;
        baseIntellect = influence.calculate(intellect.adjustedRating);
        influence.baseHelp = `${influence.baseHelp} / ${baseIntellect} (with Adeptus Mechanicus)`;
        influence.alternativeRating = baseIntellect + influence.adjustment;
      }

      finalTraits
      .filter((t)=>['maxWounds', 'maxShock', 'wealth'].includes(t.key))
      .forEach((t)=>{
        t.spend = this.$store.getters['characters/characterResourceSpendById'](this.characterId, t.key);
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
    characterReloads() {
      const spend = this.$store.getters['characters/characterReloadsSpendById'](this.characterId);
      let points = 3;
      this.wargear.forEach((w)=>{
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

        return skill;
      });

      /**
       * modifiers [
       *  { value: 3, type: 'BONUS_DICE', condition: null || 'when attacking AELDARI', provider: 'Hatret (AELDARI)', category: 'Talent' },
       * ]
       */

      // We search all enhancements that have SKILL modifications
      // this.enhancements
      // .filter((enhancement) => enhancement.targetGroup==='skills')
      // .forEach((enhancement) => {
      //   let skill = skills.find((a) => a.key === enhancement.targetValue);
      //   let mody = enhancement.modifier;
      //   if (enhancement.rank) {
      //     mody += (enhancement.rank * this.characterRank);
      //   }
      //   if ( skill ) {
      //     const modifier = {
      //       value: mody,
      //       valueString: `${mody < 0 ? '-' : '+'}${mody}`,
      //       type: 'MODIFIER',
      //       condition: enhancement.condition || null,
      //       provider: enhancement.provider,
      //       category: enhancement.category,
      //     };
      //     skill.modifiers.push(modifier);
      //     if (enhancement.condition) {
      //       skill.conditionalAdjustment += mody;
      //     } else {
      //       skill.adjustment += mody;
      //       skill.adjustedRating += mody;
      //     }
      //   } else {
      //     console.warn(`Unexpected undefined skill for ${enhancement.targetValue}.`);
      //   }
      // });

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
          if ( feature.options ) {
            const traitSelection = this.characterEnhancements.find( (e) => e.source.startsWith(`species.${feature.name}.`));

            // TODO ?
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
        if(this.characterArchetype.influence) {
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
      if (this.gear && this.gear.length >0) {
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
      this.keywordStrings.forEach( k => {
        const keyword = this.keywordCombinedRepository.find( i => i.name === k );
        if ( keyword === undefined ) {
          console.warn(`No keyword found for ${k}!`);
        } else if ( keyword.modifications ) {
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

    speciesAbilities(){
      const abilities = [];

      if (this.characterSpecies !== undefined && this.characterSpecies.speciesFeatures) {

          this.characterSpecies.speciesFeatures.forEach( (feature) => {
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
                source: this.speciesLabel,
                hint: this.speciesLabel,
                selectedOptions: [],
              };
              if ( feature.options ) {
                const traitSelection = this.characterEnhancements
                  .filter( (e) => e.source.startsWith(`species.${feature.name}.`));
                if ( traitSelection ) {
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
          this.characterHeritage.speciesFeatures.forEach( (feature) => {
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
              if ( feature.options ) {
                const traitSelection = this.characterEnhancements
                  .filter( (e) => e.source.startsWith(`species.${feature.name}.`));
                if ( traitSelection ) {
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

              if(!abilities.find(s => s.key === ability.key))
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
            description: feature.description,
            source: archetype.name,
            hint: archetype.name,
            selectedOptions: [],
          };
          if ( feature.options ) {
            const traitSelection = this.characterEnhancements.filter( (e) => e.source.startsWith(`archetype.${feature.name}.`));
            if ( traitSelection ) {
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

      // if (ascensionRepository && ascensionRepository.length > 0) {

      //   ascensionRepository.forEach((ascension) => {

      //     ascension.ascensionFeatures
      //     .filter((feature) => feature.hideInSheet === undefined || feature.hideInSheet === false)
      //     .forEach((feature) => {
      //       const ability = {
      //         name: feature.name,
      //         effect: feature.snippet ? feature.snippet : feature.description, // todo deprecated
      //         snippet: feature.snippet,
      //         description: feature.description,
      //         source: ascension.name,
      //         hint: ascension.name,
      //       };

      //       if ( feature.options ) {
      //         const featureOption = this.characterEnhancements.find( (e) => e.source.startsWith(`ascension.${ascension.key}.${feature.key}.`));
      //         if ( featureOption ) {
      //           if ( featureOption.targetValue ) {
      //             ability['selectedOption'] = {
      //               effect: featureOption.targetValue, // todo e.g. corruption
      //               snippet: featureOption.targetValue,
      //             };
      //           } else { // e.g. memorabie injury
      //             ability['selectedOption'] = {
      //               name: featureOption.name,
      //               effect: featureOption.effect,
      //               snippet: featureOption.effect,
      //             };
      //           }
      //         }
      //       }
      //       abilities.push(ability);
      //     });
      //   });
      // }

      return abilities;
    },
 filteredHeaders() {
      if (this.characterArchetype.prepared === false) {
        return this.psychicPowersHeaders.filter(h => h.value !== 'cast');
      }
      return this.psychicPowersHeaders;
    },
    otherAbilities() {
      const abilities = [];

      // keyword abilities
      this.keywordStrings.forEach( k => {
        const keyword = this.keywordCombinedRepository.find( i => i.name === k );
        if ( keyword === undefined ) {
          console.warn(`No keyword found for ${k}!`);
        } else if ( keyword.effect ) {
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
        .filter( (a) =>
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
      return this.characterEnhancements ? this.characterEnhancements.filter( (i) => i.targetGroup === 'abilities' ) : [];
    },
    enrichedTalents() {
      if (this.characterTalents && this.characterTalents.length > 0) {
        return this.characterTalents
          .map((charTalent) => this.talentRepository.find((t) => t.key === charTalent.key))
          .filter((t) => t !== undefined);
      }
      return [];
    },
    talents() {
      const finalTalents = [];

      this.characterTalents.forEach((charTalent) => {
        const rawTalent = this.talentRepository.find((t) => t.key === charTalent.key);
        if (rawTalent) {
          const ability = {
            name: rawTalent.name,
            snippet: rawTalent.snippet,
            description: rawTalent.description,
            source: rawTalent.source,
            level: charTalent.place.replace(/[a-z]/gi, '') ,
            type: rawTalent.type,
            hint: rawTalent.name,
            selectedOptions: [],
            modifications: rawTalent.modifications || [],
          };

          if (rawTalent.wargear && this.charGear){
            const gear = this.charGear.filter((g) => g.source && g.source.startsWith(`talent.${charTalent.id}.`));
            if (gear) {
              gear.forEach((g) => {
                ability.selectedOptions.push({ name: g.name });
              });
            }
          }

          if (charTalent.selected) {
            if (rawTalent.options) {
              const choice = this.getTalentOption(rawTalent, charTalent.selected);
              ability.name = ability.name.replace(/\[.*\]/, `(${choice.name})`);

              if (choice.modifications) {
                ability.modifications.push(...choice.modifications);
              }

              if (choice.effect || choice.snippet ) {
                ability.selectedOptions.push({ name: choice.name, snippet: choice.snippet });
              }
            } else {
              ability.name = ability.name.replace(/\[.*\]/, `(${charTalent.selected})`);
            }
          }
          finalTalents.push(ability);
        } else {
          console.info(`No talent found for ${charTalent.key}`);
        }
      });
      return finalTalents.sort(a => a.level);
    },
    talentsForFaith() {
      if ( this.enrichedTalents.length > 0 ) {
        return this.enrichedTalents.filter( talent => talent.groupKey && talent.groupKey === 'core-faith' );
      }
      return [];
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

              if (choice.snippet ) {
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
    wargear() {
      const chargear = this.charGear;
      const wargear = [];
      if(this.wargearRepository) {
        chargear.forEach((gear) => {
          const { name, id, variant } = gear;
          const foundGear = this.wargearRepository.find((w) => gear.name.localeCompare(w.name, 'en', {sensitivity: 'accent'}) === 0 );
          if (foundGear && !['ranged', 'melee'].includes(gear.type)) {
            wargear.push({ ...foundGear, variant, id });
          }
        });
      }
      return wargear;
    },
    weapons() {
      return this.charGear.filter((wargear) => {
        let hasWeaponsProfile = false;
        if (['ranged', 'melee'].includes(wargear.type)) {
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
      return this.wargear.filter((w) => ['Armour'].includes(w.type));
    },
    gear() {
      return this.wargear.filter((w) => !['Armour', 'Ranged Weapon', 'Melee Weapon'].includes(w.type));
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
       if(this.actionList)
      return this.actionList.filter(a => a.traits?.includes("исследование"));
    },
    restActions() {
      if(this.actionList)
      return this.actionList.filter(a => a.traits?.includes("отдых"));
    },
    otherActions() {
       if(this.actionList)
      return this.actionList.filter(
        a => !a.traits?.includes("исследование") && !a.traits?.includes("отдых")
      );
    },
  },
  watch: {
        sources: {
      handler(newVal) {
        if (newVal) {
          this.getWargearList(newVal);
          this.getAbilityList(newVal);
          this.getActionList(newVal);
          this.getSpellList(newVal);
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
      psychicPowers(levelIndex) {
      const powers = this.$store.getters['characters/characterSpellsById'](this.characterId);

       const progression = this.characterArchetype.spellProgression[this.characterLevel()]?.[levelIndex] || 0;
      //const prep = this.$store.getters["characters/characterSpellsPrepareById"](this.characterId);
      if (progression !== 0)
      {
        //this.crossedRows = [];
        let spells = [];
        for (let i = 1; i <= progression; i++)
        {

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

          // if (spell?.cast === true)
          //   this.crossedRows.push(spell.id);
          spells.push(spell);
        }
        return spells;
      }

      return [];

    },
     getItemClass(item) {
  return item.cast ? 'crossed-row' : ''
},
    updateCast(item) {
      const spell =  this.$store.getters["characters/characterSpellsById"](
        this.characterId
      );
      if (spell.find(s => s.id === item.id))
      {
        item.cast =  item.rank !== 0 ? !item.cast : item.cast ;
        this.$store.commit('characters/editCharacterSpell', { id :this.characterId, talentId: item.id, cast: item.cast });
        // if (this.crossedRows?.includes(item.id))
        //   this.crossedRows = this.crossedRows.filter(rowId => rowId !== item.id)
        // else
        //   this.crossedRows.push(item.id);
      }

    },
    openDialog(item) {
          this.selectedItem = item
          this.dialog = true
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
    async loadSpecies(key) {
      if ( key ) {
        let finalData = {};
        if ( key.startsWith('custom-')) {
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
      if ( key ) {
        let finalData = {};
        if ( key.startsWith('custom-')) {
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
        config.source
      );
      this.abilityList = data;
    },
    async getActionList(sources) {
      const config = {
        params: {
          source: sources.join(","),
        },
      };
      const { data } = await this.$axios.get(
        "/api/action/",
        config.source
       );


 data.forEach(s => {
         s.trait = s.traits;
       })
      this.actionList =  data;
    },
    async getSpellList(sources) {
            const config = {
        params: { source: sources.join(','), },
      };
      this.loading = true;
      const { data } = await this.$axios.get('/api/psychic-powers/', config);
      this.loading = false;

      this.psychicPowersList = data;
    },
    async loadArchetype(key) {
      this.loading = true;
      if ( key ) {
        // if (key === 'advanced'){
        //   const mimic = this.$store.getters['characters/characterArchetypeMimicById'](this.characterId);
        //   if (mimic) {
        //     const { data } = await this.$axios.get(`/api/archetypes/${mimic}`);
        //     this.characterArchetype = {
        //       faction: this.characterFactionKey.toLowerCase(),
        //       factionKey: this.characterFactionKey,
        //       archetypeFeatures: data.archetypeFeatures,
        //     };
        //   }
        // } else {
        //   const { data } = await this.$axios.get(`/api/archetypes/${key}`);
        //   this.characterArchetype = data;
        // }
      let finalData = {};
      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      finalData = data;

      // finalData = this.enrichArchetypeFeatures(finalData);
      const level = this.$store.getters["characters/characterLevelById"](
        this.characterId
      );

      const enc = this.$store.getters['characters/characterEnhancementsById'](this.characterId);

      if (this.abilityList !== undefined && this.actionList !== undefined ) {

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
                key: tal.key+talent,
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

      this.loading = false;
    },
     handleClick(e, level, value) {
      if (e.button === 0) { // ЛКМ
        this.addBullet(level, value + 1);
      } else if (e.button === 2) { // ПКМ
        this.removeBullet(level, value - 1);
      }
    },
    addBullet(level, value) {
      const progression = this.characterArchetype.spellProgression[this.characterLevel()]?.[level] || 0;
            if (!this.characterSpont[level] ) {
         this.$store.commit('characters/addCharacterSpontSpell', { id: this.characterId, level: level, value: 1 })
      }else
      if (this.characterSpont[level].value < progression) {
         this.$store.commit('characters/addCharacterSpontSpell', { id: this.characterId, level: level, value: value })
      }


    },
    removeBullet(level, value) {
      const progression = this.characterArchetype.spellProgression[this.characterLevel()]?.[level] || 0;
            if (!this.characterSpont[level] ) {
         this.$store.commit('characters/addCharacterSpontSpell', { id: this.characterId, level: level, value: 0 })
      }else
      if (value >= 0) {
         this.$store.commit('characters/addCharacterSpontSpell', { id: this.characterId, level: level, value: value })
      }

    },
    async getAscensionPackageList(ascensionList) {

      let packages = [];

      if ( ascensionList.length > 0 ){
        for (const ascension of ascensionList) {
          const { data } = await this.$axios.get(`/api/ascension-packages/${ascension.key}`);
          const enrichedAscension = {
            ...data,
            ...ascension,
          };
          packages.push(enrichedAscension);
        }
      }
      this.ascensionPackagesRepository = packages;
    },
    async getWargearList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/wargear/', config);
      //this.wargearRepository = data.filter((i) => i.stub === undefined || i.stub === false);
      this.wargearRepository = data;
    },
            SkillPerception() {
      return this.$store.getters["characters/characterPerseptionById"](
        this.characterId
      );
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
    showContext(type) {
      switch (type) {
        case 'wealth':
        default:
          this.contextDialogTraitKey = type;
          this.contextDialogComponent = () => import('~/components/forge/DodWealthManager.vue');
          this.showContextDialog = true;
      }
    },

    hideContextDialog() {
      this.showContextDialog = false;
      this.contextDialogComponent = null;
      this.contextDialogTraitKey = null;
    },

    valueHintColor(item) {
      const value = item.adjustment + item.conditionalAdjustment;
      if (value > 0 ) return 'success';
      if (value < 0 ) return 'error';
      return 'primary';
    },
    valueHintIcon(item) {
      const value = item.adjustment + item.conditionalAdjustment;
      if (value > 0 ) return 'arrow_drop_up';
      if (value < 0 ) return 'arrow_drop_down';
      if (value === 0 ) return 'swap_vert';
      return 'swap_vert';
    },
    objectiveEditorOpen() {
      this.objectiveEditorValue = this.objectives.map((o) => o.text).join('\r\n');
      this.objectiveEditorShow = true;
    },
    addObjective(value) {
      this.objectiveEditorShow = false;
    },
    characterNotesOpenEditor() {
      this.characterNotesEditorModel = this.$store.getters['characters/characterFluffNotesById'](this.characterId);
      this.characterNotesShowEditor = true;
    },
        characterCurHP() {
      this.currentHP = this.$store.getters['characters/characterCurrentHitPointsById'](this.characterId) || 0;
      return this.currentHP;
    },
      hpColor() {
      const ratio = this.characterHitPointsMax() !== 0 ? this.currentHP / this.characterHitPointsMax() : 0;
      if (ratio >= 0.75) return 'green';
      if (ratio >= 0.5) return '#9acd32'; // салатовый
      if (ratio >= 0.25) return 'orange';
      return 'red';
    },
    addCurrentHP() {
      const curHP = this.currentHP > this.characterHitPointsMax() ? this.characterHitPointsMax() : this.currentHP;
      this.$store.commit('characters/setCurrentHP', { id: this.characterId, curHP })
    },
    addTempHP() {

      this.$store.commit('characters/setTempHP', { id: this.characterId, tempHP: this.tempHP })
    },
  characterArmor() {
      const wear = this.$store.getters["characters/characterWearById"](
         this.characterId
      );
      if (wear) {
        const modDex = Math.floor(
          (this.characterAttributes["dexterity"] - 10) / 2
        );
        const wearModDex = wear.modDex ? wear.modDex : 0;
        const dex = modDex > wearModDex ? wearModDex : modDex;
        const Def = wear.category ? this.profiencyRepository[this.skillDefence[wear.category]] : 0;
        const bonusAC = wear.bonusAC ? wear.bonusAC : 0;
        const arm = Def === 0 ? 0 : this.characterLevel();
        return 10 + dex + Def + arm + bonusAC;
      }

      const modDex = Math.floor(
        (this.characterAttributes["dexterity"] - 10) / 2
      );
      return 10 + modDex;
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
    normalizeTrait(traitString) {
      const regex = /(\w+) ?\(?(\w+)?\)?/m;
      let trait = traitString.match(regex);
      let traitFromRep = this.wargearTraitRepository.find((item) => item.name === trait[1]);
      return {
        ...traitFromRep,
        variant: trait[2],
      };
    },
    traitByName(name, withParanteris) {
      let traitName = name;
      if ( withParanteris ) {
        // weaponsTraitSet = weaponsTraitSet.map((t) => t.split(/ ?\(/)[0]);
        traitName = traitName.split(/ ?\(/)[0];
      }
      // return this.combinedTraitsRepository.find( item => item.name.indexOf(prefix) >= 0);
      return this.wargearTraitRepository.find((item) => item.name === traitName);
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
      return parseInt(char1) + parseInt(char2) + parseInt(char3);

      // const attribute = (this.characterAttributesEnhanced[skill.attribute.toLowerCase()] - 10) / 2;

      // return attribute + this.SkillsTrained[skill.value] + this.characterLevel();


    },
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    characterlabel(key){

      if(key.value)
        switch (key.value) {
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
    attackModifier(gear){

      const modAbility = gear.type === 'melee' ? this.characterAttributesEnhanced["strength"] : this.characterAttributesEnhanced["dexterity"];

      const modProfiency = this.characterArchetype ? this.skillAttack[gear.category] : "U";
      const modLevel = modProfiency !== "U" ? this.characterLevel() : 0;
      const rune = this.weaponRunePotency.find(t => t.key === gear.runeWeapon.potency).addItemBonus

         return this.profiencyRepository[modProfiency] + (modAbility - 10) / 2 + modLevel + rune;
    },

    getTalentOption(talent, choiceKey) {
      return talent.options.find((t) => t.key === choiceKey);
    },
    computeFormatedText(text) {
      if ( text === undefined ) {
        return text;
      }
      const rank = this.characterRank;

      let computed = text;

      // computed = computed.replace(/(1d3\+Rank Shock)/g, `<strong>1d3+${rank} Shock</strong>`);
      computed = computed.replace(/(\d+) Faith/g, '<em>$1 Faith</em>');
      computed = computed.replace(/(\d+ meters)/g, '<strong>$1</strong>');
      computed = computed.replace(/(\d+ metres)/g, '<strong>$1</strong>');
      computed = computed.replace(/15 \+Rank metres/g, `<strong title="15 +Rank meters">${15 + rank} meters</strong>`);
      computed = computed.replace(/15 \+Rank meters/g, `<strong title="15 +Rank meters">${15 + rank} meters</strong>`);
      computed = computed.replace(/15\+Double Rank metres/g, `<strong>${15 + (2*rank)} metres</strong>`);
      computed = computed.replace(/1\+Rank/g, `<strong>${(rank)+1}</strong>`);
      computed = computed.replace(/1\+Double Rank/g, `<strong>+${(2*rank)+1}</strong>`);
      computed = computed.replace(/2\+Double Rank/g, `<strong>${(2*rank)+2}</strong>`);
      computed = computed.replace(/3\+Double Rank/g, `<strong>${(2*rank)+3}</strong>`);
      computed = computed.replace(/15\+Double Rank/g, `<strong>${(2*rank)+15}</strong>`);
      computed = computed.replace(/20\+Double Rank/g, `<strong>${(2*rank)+20}</strong>`);
      computed = computed.replace(/\+Rank/g, `<strong>+${rank}</strong>`);
      computed = computed.replace(/\+Double Rank/g, `<strong>+${2*rank}</strong>`);
      computed = computed.replace(/10 ?x ?Rank/g, `<strong>${10*rank}</strong>`);
      computed = computed.replace(/10 ?x ?Double Rank/g, `<strong>${10*2*rank}</strong>`);
      computed = computed.replace(/ Double Rank/g, ` <strong>${2*rank}</strong>`);

      return computed;
    },
    wargearPrice(item) {
      if (item) {
        const pp = item.pp !== 0 ? item.pp + " пм" : "";
        const gp = item.gp !== 0 ? item.gp + " зм" : "";
        const sp = item.sp !== 0 ? item.sp + " см" : "";
        const cp = item.cp !== 0 ? item.cp + " мм" : "";
        return pp + gp + sp + cp;
      }
    },

    toggleResource(resourceItem, index) {
      const id = this.characterId;
      const resourceKey = resourceItem.key;

      const current = this.$store.getters['characters/characterResourceSpendById'](this.characterId, resourceKey);
      const spend = (index > current) ? current+1 : current-1;

      this.$store.commit('characters/setCharacterResourceSpend', { id, resourceKey, spend });
    },
    toggleResourceReloads(index) {
      const id = this.characterId;
      const current = this.characterReloads.spend;
      const spend = (index > current) ? current+1 : current-1;
      const resourceKey = 'reloads';
      this.$store.commit('characters/setCharacterResourceSpend', { id, spend, resourceKey });
    },
    toggleResourceFaith(index) {
      const id = this.characterId;
      const current = this.characterFaith.spend;
      const spend = (index > current) ? current+1 : current-1;
      this.$store.commit('characters/setCharacterFaithSpend', { id, spend });
    },
    openSkillsSettings(){
      this.skillsEditorDialog = true;
    },
    category(category)
    {
      return this.weaponCategoryRepository.find(t => t.category === category).name;
    },
    typeDamage(type)
    {
      return this.DamageType.find(t => t.key === type).name;
    },
    groupName(name){
      return this.weaponGroup.find(item => item.group === name).name;
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
      if (levelClass <= 0) return species;
      else return species + levelClass;
    },
    closeSkillsSettings() {
      this.customSkill = {
        key: undefined,
        name: 'Custom Skill',
        atttribute: '',
        description: '',
      };
      this.skillsEditorDialog = false;
    },
    closeKeywordsSettings() {
      this.customKeyword = {
        key: undefined,
        name: 'Custom Keyword',
        description: '',
      };
      this.keywordsEditorDialog = false;
    },
        SkillClass() {
      return this.$store.getters["characters/characterSkillClassById"](
        this.characterId
      );
    },
    saveCustomKeyword(){

      const keyword = {
        name: this.customKeyword.name,
        description: this.customKeyword.description,
        source: `custom.${this.customKeyword.name}`,
        type: 'keyword',
        replacement: undefined,
        custom: true,
      };
      this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword });

      this.closeKeywordsSettings();
    },
    removeMutation(mutationId) {
      const id = this.characterId;
      this.$store.commit('characters/removeCharacterMutation', { id, uuid: mutationId });
    },
    removeCustomKeyword(keywordName) {
      const id = this.characterId;
      const source = `custom.${keywordName}`;
      this.$store.commit('characters/clearCharacterKeywordsBySource', { id, source });
    },
    saveCustomSkill() {
      // validate
      const skill = {
        key: this.textToCamel(this.customSkill.name),
        name: this.customSkill.name,
        attribute: this.customSkill.attribute,
        description: this.customSkill.description,
      };

      const doExist = this.skills.find((s)=>s.key===skill.key);
      if ( doExist ) {
        console.warn(`Skill ${skill.name} already exists.`);
      } else {
        this.addCustomSkill(skill);
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
    },

    /**
     * Respite, aka Long Rest, see pg. 196
     * > Heal all Shock and Wounds
     * > Wreath is reset to 2
     * > Refresh all Faith
     */
    doRespite() {
      const id = this.characterId;
      const spend = 0;
      this.$store.commit('characters/setCharacterResourceSpend', { id, spend, resourceKey: 'maxShock' });
      this.$store.commit('characters/setCharacterResourceSpend', { id, spend, resourceKey: 'maxWounds' });
      this.$store.commit('characters/setCharacterResourceSpend', { id, spend, resourceKey: 'faith' });
    }
  },
};
</script>

<style scoped lang="scss">
.attribute-box {
  &__container {
    box-sizing: border-box;
    display: block;
    width: 64px;
    align-content: center;
    // border: 3px double orangered;
    padding: 0;
    height: 64px;
    float: left;
    margin: 2px;
    border-radius: 10px;
  }

  &__value {
    justify-content: center;
    font-size: 14px;
    // font-weight: 600;
    display: flex;
  }

  &__label {
    display: flex;
    justify-content: center;
    font-size: 12px;
  }
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

.my-card-item {
  height: 120px;
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

.main-holder-divider p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  border-bottom: 1.5px solid black;
}
.invert-icon {
  filter: brightness(1) invert(1); /* черный цвет из светлого */
}

// .crossed-row td {
//   background-color: yellow;
//   text-decoration: line-through;
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

<style>
/* Не scoped! */
.crossed-row td {
  /* background-color: #f0f0f0; */
  text-decoration: line-through;
  color: #999;
}
</style>

<style>
.ammo-container {
  font-size: 2rem;
}
.magazine {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  user-select: none;
}
.bullet {
  opacity: 0.3;
  transition: opacity 0.2s;
  cursor: pointer;
}
.bullet.filled {
  opacity: 1;
}
.controls button {
  margin-right: 10px;
}
</style>

<style scoped>
.glass-card {
  background: linear-gradient(145deg, #2a2b31, #1f1f23); /* мягкий градиент */
  border: 1px solid rgba(255, 255, 255, 0.15); /* легкая обводка */
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6); /* мягкая тень */
  backdrop-filter: blur(12px) brightness(1.05); /* эффект стекла */
  padding: 1rem;
  color: #e0e0e0; /* мягкий светло-серый текст */
  transition: all 0.3s ease;
}

.glass-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(14px) brightness(1.1);
}
.tag-chip {
  background-color: transparent !important;
  font-weight: 400;
  margin: 2px;
}
.action-btn {
  background-color: rgba(233, 236, 239, 0.1) !important;
  color: #dee2e6 !important;
  backdrop-filter: blur(6px);
  font-weight: 500;
}
.hp-value {
  color: rgb(0, 224, 122);
  font-size: 1.5rem;
  font-weight: bold;
}
.xp-input-wrapper {
  display: inline-block;
  padding: 4px; /* небольшие внутренние отступы */
  background-color: rgba(222, 226, 230, 0.15); /* похожий фон на твой пример */
  border-radius: 50px; /* полностью круглое */
  backdrop-filter: blur(6px);
}

.xp-input {
  border: none;
  outline: none;
  padding: 4px 12px;
  border-radius: 50px;
  background: transparent;
  color: #fff; /* цвет текста */
  font-size: 0.9rem;
  width: 80px; /* компактная ширина */
  text-align: center;
}

.xp-input::placeholder {
  color: #bbb; /* цвет placeholder */
}

.stat-btn {
  background-color: rgba(233, 236, 239, 0.1) !important;
  color: #dee2e6 !important;
  font-weight: 400;
  backdrop-filter: blur(6px);
}
.mod-btn {
  background-color: rgba(144, 146, 150, 0.1) !important;
  color: #fff !important;
  min-width: 40px;
}
.ac-value {
  color: rgb(0, 224, 122);
  font-size: 1.5rem;
  font-weight: bold;
}
.speed-value {
  color: rgb(0, 224, 122);
  font-size: 1.5rem;
  font-weight: bold;
}

.stat-row {
  margin-bottom: 4px;
}

.stat-group {
  display: flex;
  width: 100%;
  min-width: 0;
}

.stat-name-btn {
  flex: 1 1 auto;
  min-width: 0 !important;
  max-width: 100%;
  overflow: hidden;
  background-color: rgba(233, 236, 239, 0.1) !important;
  color: #dee2e6 !important;
  font-weight: 400;
  backdrop-filter: blur(6px);
  text-transform: none;
  border-radius: 12px 0 0 12px !important;
  height: 28px !important;
  padding: 0 8px !important;
}

.stat-mod-btn {
  flex: 0 0 35px;
  background-color: rgba(144, 146, 150, 0.1) !important;
  color: #fff !important;
  border-radius: 0 12px 12px 0 !important;
  height: 28px !important;
  padding: 0 !important;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-card {
  min-height: 80px; /* фиксированная высота */
}

/* Общий контейнер в одну линию */
.card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
}

.tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  flex-direction: column;
}

.tag-btn {
  background-color: transparent !important;
  color: rgba(222, 226, 230, 0.75) !important;
  text-transform: none;
  height: 22px !important;
  min-height: 22px !important;
  padding: 0 8px !important;
}

.side {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.action-btn {
  background-color: rgba(233, 236, 239, 0.1) !important;
  color: #dee2e6 !important;
  text-transform: none;
}

.level {
  color: #adb5bd;
  font-size: 0.75rem;
}

.level-xp {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
}

/* .xp-input {
  max-width: 60px;
} */

.text-h5 {
  color: white;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
}

.text-subtitle-2 {
  color: #ccc;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.stack {
  margin-top: 80%;
}

.label {
  color: var(--mantine-color-gray-0);
  font-size: var(--mantine-font-size-sm);
  font-weight: 500;
}

.value {
  color: var(--mantine-color-gray-0);
  font-size: var(--mantine-font-size-lg);
  font-weight: 500;
  line-height: 1.5em;
  position: relative;
}

.asterisk {
  position: absolute;
  top: -6px;
  right: -7px;
  color: var(--mantine-color-guide-5);
}

.description {
  color: var(--mantine-color-gray-5);
  font-size: calc(0.625rem * var(--mantine-scale));
}

.unit {
  color: var(--mantine-color-gray-3);
  font-size: var(--mantine-font-size-xs);
}
.stat-icon-wrapper {
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-title {
  text-align: center;
  margin-bottom: 8px;
  font-size: 14px; /* подгони под свой стиль */
  line-height: 1.2;
}
.stat-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
}

/* Vuetify 2 — убираем спиннеры у поля внутри */
.hp-input >>> input[type="number"]::-webkit-inner-spin-button,
.hp-input >>> input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.hp-input >>> input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
  text-align: center;
}

.section-title {
  font-weight: 600;
  font-size: 0.9rem;
  color: #adb5bd;
}

.action-list {
  background: transparent;
  padding: 0;
}

.action-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #25262b;
  padding: 6px 4px;
}

.action-title {
  position: relative;
  padding-left: 20px;
  font-size: 0.9rem;
  color: #fff;
}

.action-symbol {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.4rem;
  font-weight: bold;
  color: #868e96;
  font-family: "ActionIcons", sans-serif;
  pointer-events: none;
  user-select: none;
}

.badge-label {
  font-size: 0.75rem;
  color: #a6a7ab;
}
</style>
