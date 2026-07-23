<template>
  <v-app>
    <AppLoader :visible="$store.state.ui.loading" />
    <v-navigation-drawer v-model="drawer.open" app :clipped="drawer.clipped" :fixed="drawer.fixed"
      :permanent="drawer.permanent" :mini-variant="drawer.mini" :width="$vuetify.breakpoint.smAndDown ? 280 : 320">

      <v-card outlined class="builder-sidebar pa-3 ui-panel">

        <!-- TOP -->
        <div class="top-block st-panel mb-4">
          <v-list dense class="st-list">

            <v-list-item class="st-row">
              <v-list-item-content>
                <v-list-item-title>Максимальные хиты</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ui-chip ui-chip--success">
                  {{ characterHitPointsMax() }}
                </v-chip>
              </v-list-item-action>
            </v-list-item>

            <v-list-item class="st-row">
              <v-list-item-content>
                <v-list-item-title>Класс доспехов</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-chip class="ui-chip ui-chip--success">
                  {{ characterArmor() }}
                </v-chip>
              </v-list-item-action>
            </v-list-item>

            <v-list-item class="st-row">
              <v-list-item-content>
                <v-list-item-title>Скорость</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                {{ сharacterSpeedLabel() }}
              </v-list-item-action>
            </v-list-item>

            <v-list-item class="st-row">
              <v-list-item-content>
                <v-list-item-title>Внимательность</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <div class="chip-row">
                  <v-chip small class="ui-chip ">
                    {{ ModAttributePerception(Perception.attribute, Perception.key) }}
                  </v-chip>
                  <v-chip :color="getClassChipColor(characterPerseption)" small class="ui-chip--class">
                    {{ characterlabel(characterPerseption) }}
                  </v-chip>
                </div>
              </v-list-item-action>
            </v-list-item>

            <v-list-item class="st-row">
              <v-list-item-content>
                <v-list-item-title>Сложность класса</v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <div class="chip-row">
                  <v-chip small class="ui-chip ">
                    {{ ModAttributeClass() }}
                  </v-chip>
                  <v-chip :color="getClassChipColor(characterSkillClass)" small class="ui-chip--class">
                    {{ characterlabel(characterSkillClass) }}
                  </v-chip>
                </div>
              </v-list-item-action>
            </v-list-item>

          </v-list>
        </div>


        <!-- BOTTOM -->
        <div class="bottom-block">

          <!-- ATTRIBUTES -->
          <div class="section st-panel">
            <h2 class="section-title">Характеристики</h2>

            <div v-for="attribute in attributeRepository" :key="attribute.key" class="stat-row" @click="openAtt()">

              <div class="stat-name">
                {{ attribute.name }}
              </div>

              <v-chip small class="stat-value">
                {{ ModAttributeReal(attribute.key) }}
              </v-chip>

            </div>
          </div>
          <!-- SAVES -->
          <div class="section st-panel mt-4">
            <h2 class="section-title">Спасброски</h2>

            <v-list dense class="st-list">
              <v-list-item v-for="saving in SavingRepository" :key="saving.key" @click="openSaves(saving)">
                <v-list-item-content>{{ saving.name }}</v-list-item-content>

                <v-list-item-action>
                  <div class="chip-row">
                    <v-chip small class="ui-chip ">
                      {{ ModAttributeSaving(saving.attribute, saving.key) }}
                    </v-chip>
                    <v-chip :color="getClassChipColor(characterSaving[saving.key])" small class="ui-chip--class">
                      {{ characterlabel(characterSaving[saving.key]) }}
                    </v-chip>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </div>

          <!-- Сопротивления и иммунитеты -->
          <div v-if="ResImWeak.length > 0" class="section st-panel mt-4">
            <h2 class="section-title">Сопротивления</h2>

            <v-chip bottom v-for="res in ResImWeak">
              <span>{{DamageType.find(t => t.key === res.key)?.name || res.key}} {{ res.NewValue }} </span>

            </v-chip>
          </div>

          <!-- SKILLS -->
          <div class="section st-panel mt-4">
            <h2 class="section-title">Навыки</h2>

            <v-list dense class="st-list">
              <v-list-item class="st-list-item" v-for="skill in finalSkillRepository" :key="skill.key"
                @click="openSkills(skill)">
                <v-list-item-content class="st-list-content">{{ skill.name }}</v-list-item-content>

                <v-list-item-action class="st-list-action">
                  <div class="chip-row">
                    <v-chip small class="ui-chip ">
                      {{ ModAttribute(skill.attribute, skill.key) }}
                    </v-chip>
                    <v-chip :color="getRankChipColor(skill.key)" small class="ui-chip--class">
                      {{ SkillLabel(skill.key) }}
                    </v-chip>
                  </div>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </div>





        </div>

      </v-card>

      <v-dialog v-model="attDialog" width="1000px" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card>
          <!-- Заголовок -->
          <v-card-title style="background-color: #262e37; color: #fff">

            <v-spacer />
            <v-icon dark @click="closeAtt">close</v-icon>
          </v-card-title>

          <attribute-table :characterId="$route.params.id" :tableRows="this.tableRows" />

        </v-card>
      </v-dialog>

      <v-dialog v-model="skillsDialog" max-width="1000" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card class="ui-dialog">

          <!-- HEADER -->
          <v-card-title class="ui-dialog__header">
            <div class="text-h6">{{ skill.name }}</div>
            <v-spacer />
            <v-btn icon @click="closeSkills">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-divider />

          <!-- CONTENT -->
          <v-card-text class="ui-dialog__content">

            <!-- DESCRIPTION -->
            <v-card class="ui-section mb-4" outlined>
              <v-card-title class="ui-section__title">
                Описание навыка
              </v-card-title>
              <v-card-text v-html="skill.description" />
            </v-card>

            <!-- ACTIONS -->
            <v-card class="ui-section mb-4" outlined>
              <v-card-title class="ui-section__title">
                Действия
              </v-card-title>

              <v-list dense class="st-list">
                <v-list-item v-for="action in skill.actions || []" :key="action.id">
                  <v-list-item-content>
                    <v-list-item-title class="font-weight-medium">
                      {{ action.name }}
                    </v-list-item-title>

                    <v-list-item-subtitle v-html="action.description" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>

            <!-- BREAKDOWN (НОРМАЛЬНАЯ ФОРМУЛА) -->
            <v-card class="ui-section mb-4" outlined>
              <v-card-title class="ui-section__title">
                Расчёт
              </v-card-title>

              <div class="ui-formula">

                <div class="ui-formula__total">
                  {{ skillTotal(skill) >= 0 ? '+' : '' }}{{ skillTotal(skill) }}
                </div>

                <div class="ui-formula__parts">

                  <div class="ui-formula__part">
                    <v-chip small class="ui-chip">{{ profiencyRepository[SkillProf(skill.key)] }}</v-chip>
                    <span>Владение</span>
                  </div>

                  <div class="ui-formula__operator">+</div>

                  <div class="ui-formula__part">
                    <v-chip small class="ui-chip">
                      {{ (characterAttributes[skill.attribute] - 10) / 2 }}
                    </v-chip>
                    <span>Атрибут</span>
                  </div>

                  <div class="ui-formula__operator">+</div>

                  <div class="ui-formula__part">
                    <v-chip small class="ui-chip">
                      {{ profiencyRepository[SkillProf(skill.key)] !== 0 ? characterLevel() : 0 }}
                    </v-chip>
                    <span>Уровень</span>
                  </div>


                  <div v-if="itemBonus(skill.key)" class="ui-formula__operator">+</div>

                  <div class="ui-formula__part" v-if="itemBonus(skill.key)">
                    <v-chip small class="ui-chip">
                      {{ itemBonus(skill.key).value }}
                    </v-chip>
                    <span>Предмет</span>
                  </div>

                </div>
              </div>
            </v-card>

            <!-- MODIFIERS -->
            <v-card class="ui-section" outlined>
              <v-card-title class="ui-section__title">
                Модификаторы
              </v-card-title>

              <div v-for="char in charactermodificatorsBonus" :key="char.id">
                <div v-if="char.selector === skill.key || char.selector === 'skill-check'" class="ui-modifier">
                  <div class="ui-formula__part" v-if="char.type !== 'item'">
                    <v-chip small class="ui-chip">
                      {{ char.value }}
                    </v-chip>
                    <span>{{ char.type }}</span>
                    для {{ char.predicate }}
                  </div>
                </div>
                <v-divider />
              </div>
            </v-card>

            <v-card class="ui-section mt-4" outlined>
              <v-card-title class="ui-section__title">
                Таймлайн
              </v-card-title>

              <v-timeline dense align-top>

                <v-timeline-item v-for="(event, index) in skill.event" :key="index"
                  :color="event.active ? 'green' : 'grey'" small>

                  <template v-slot:icon>
                    <v-icon small>
                      mdi-badge-account
                    </v-icon>
                  </template>

                  <v-card class="ui-timeline-card" outlined>

                    <v-card-title class="ui-timeline-header">
                      <div class="ui-timeline-source">
                        {{ event.source }}
                      </div>

                      <v-spacer />

                      <v-chip small class="ui-timeline-level">
                        Уровень {{ event.level }}
                      </v-chip>
                    </v-card-title>

                    <v-card-text class="ui-timeline-text">
                      {{ event.details }}
                    </v-card-text>

                  </v-card>

                </v-timeline-item>

              </v-timeline>
            </v-card>

            <!-- <v-list
    dense
    class="st-list"
>
                    <v-list-item v-for="(event, index) in save.event">
                      <v-list-item-content>
                        <v-list-item-title style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                          ">
                          <span>{{ event.source }}</span>
                          <span style="font-size: 0.8rem; font-weight: normal">Уровень {{ event.level }}</span>
                        </v-list-item-title>
                        <v-list-item-subtitle style="font-style: italic; font-size: 0.75rem">
                          {{ event.details }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-icon>
                        <v-icon :color="event.active ? 'green' : 'grey'">mdi-badge-account</v-icon>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list> -->

          </v-card-text>

          <v-divider />

          <!-- FOOTER -->
          <v-card-actions class="ui-dialog__footer">
            <v-spacer />
          </v-card-actions>

        </v-card>
      </v-dialog>

      <v-dialog v-model="savesDialog" max-width="600" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card class="ui-dialog">

          <v-card-title class="ui-dialog__header">
            <div class="text-h6">Спасбросок</div>
            <v-spacer />
            <v-btn icon @click="closeSaves">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-divider />

          <v-card-text class="ui-dialog__content">

            <v-card class="ui-section mb-4" outlined>
              <v-card-title class="ui-section__title">
                Описание
              </v-card-title>
              <v-card-text v-html="save.description" />
            </v-card>

            <v-card class="ui-section" outlined>
              <v-card-title class="ui-section__title">
                Расчёт
              </v-card-title>

              <div class="ui-formula">

                <div class="ui-formula__total">
                  {{ saveTotal(save) >= 0 ? '+' : '' }}{{ saveTotal(save) }}
                </div>

                <div class="ui-formula__parts">

                  <div class="ui-formula__part">
                    <v-chip small class="ui-chip">
                      {{ profiencyRepository[characterSaving[save.key]] }}
                    </v-chip>
                    <span>Владение</span>
                  </div>

                  <div class="ui-formula__operator">+</div>

                  <div class="ui-formula__part">
                    <v-chip small class="ui-chip">
                      {{ (characterAttributes[save.attribute] - 10) / 2 }}
                    </v-chip>
                    <span>Атрибут</span>
                  </div>

                  <div class="ui-formula__operator">+</div>

                  <div class="ui-formula__part">
                    <v-chip small class="ui-chip">
                      {{ profiencyRepository[characterSaving[save.key]] !== 0 ? characterLevel() : 0 }}
                    </v-chip>
                    <span>Уровень</span>
                  </div>

                </div>
              </div>

            </v-card>

            <v-card class="ui-section mt-4" outlined>
              <v-card-title class="ui-section__title">
                Таймлайн
              </v-card-title>

              <v-timeline dense align-top>

                <v-timeline-item v-for="(event, index) in save.event" :key="index"
                  :color="event.active ? 'green' : 'grey'" small>

                  <template v-slot:icon>
                    <v-icon small>
                      mdi-badge-account
                    </v-icon>
                  </template>

                  <v-card class="ui-timeline-card" outlined>

                    <v-card-title class="ui-timeline-header">
                      <div class="ui-timeline-source">
                        {{ event.source }}
                      </div>

                      <v-spacer />

                      <v-chip small class="ui-timeline-level">
                        Уровень {{ event.level }}
                      </v-chip>
                    </v-card-title>

                    <v-card-text class="ui-timeline-text">
                      {{ event.details }}
                    </v-card-text>

                  </v-card>

                </v-timeline-item>

              </v-timeline>
            </v-card>

          </v-card-text>

          <v-divider />

          <v-card-actions class="ui-dialog__footer">
            <v-spacer />
          </v-card-actions>

        </v-card>
      </v-dialog>

    </v-navigation-drawer>

    <v-app-bar app dark dense flat style="background-color: #212121" :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft">
      <v-app-bar-nav-icon @click.stop="toggleDrawer" />

      <v-toolbar-title class="pa-0">
        <nuxt-link to="/" class="brand-logo">
          Shadow Tales
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-icon v-if="$nuxt.isOffline" color="warning"> offline_bolt </v-icon>

        <v-btn class="d-none d-md-inline-flex" icon href="https://t.me/shadowtalesgm">
          <v-icon>mdi-telegram</v-icon>
        </v-btn>

        <v-btn class="d-none d-md-inline-flex" icon href="https://discord.gg/5rEDvSSXSZ">
          <v-icon>mdi-discord</v-icon>
        </v-btn>

        <v-btn icon @click="toggleDarkTheme">
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-toolbar class="builder-toolbar" dense flat>
        <v-toolbar-items>
          <v-btn small text nuxt :to="`/forge/my-characters`" icon>
            <v-icon>supervisor_account</v-icon>
          </v-btn>
          <v-btn small text nuxt :to="`/forge/characters/${$route.params.id}/builder/setting`">
            Главная
          </v-btn>
          <v-btn small text nuxt :to="routes.species" :disabled="!settingSelected">
            1. Родословная
            <v-chip small class="ui-chip ui-chip--info" v-if="!characterSpeciesLabel || !characterHeritageLabel">
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
          <v-btn small text nuxt :to="routes.archetype" :disabled="!settingSelected">
            2. Класс
            <v-chip small class="ui-chip ui-chip--info" v-if="!characterArchetype">
              !
            </v-chip>
            <!-- <v-alert small type="info" color="primary"> </v-alert> -->
          </v-btn>
          <v-btn small text nuxt :to="routes.ascension" :disabled="!settingSelected">
            3. Предыстория
            <v-chip small class="ui-chip ui-chip--info" v-if="!characterAscension">
              !
            </v-chip>
          </v-btn>
          <v-btn small text nuxt :to="routes.stats" :disabled="!settingSelected">
            4. Навыки и характеристики
            <v-chip small class="ui-chip ui-chip--info" v-if="
              progress !== progressMax && progress !== 0 && progressMax !== 0
            ">
              !
            </v-chip>
          </v-btn>
          <v-btn small text nuxt :to="routes.talents" :disabled="!settingSelected">
            5. Черты
            <v-chip small class="ui-chip ui-chip--info" v-if="progressFeats !== 0">
              !
            </v-chip>
          </v-btn>
          <!-- <v-btn small text nuxt :to="routes.wargear" :disabled="!settingSelected">
            6. Снаряжение
          </v-btn> -->
          <!-- <v-btn small text nuxt :to="routes.psychic" :disabled="!settingSelected">
            7. Заклинания
          </v-btn> -->
          <!-- <v-btn small text nuxt :to="routes.background" :disabled="!settingSelected">
            8. Детали Персонажа
          </v-btn> -->
          <v-btn small nuxt icon exact :to="`/forge/characters/${$route.params.id}`" :disabled="!settingSelected">
            <v-icon>description</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-container :fluid="$vuetify.breakpoint.smAndDown" class="builder-container">
        <v-btn v-if="false" small color="green lighten-2"
          style="position: fixed; top: 174px; right: 350px; margin-right: 50%">
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
            <v-btn small color="success" @click="migrateCharacter">Update Character</v-btn>
            <v-btn small color="success" nuxt exact :to="`/forge/my-characters`">To the Character Overview</v-btn>
          </v-col>
        </v-row>

        <v-row justify="center" v-if="!isOutdated">
          <v-col :cols="12" :sm="10" :md="10" :lg="7">

            <nuxt />
          </v-col>
        </v-row>

        <v-btn v-if="false" small color="green lighten-2"
          style="position: fixed; top: 174px; left: 350px; margin-left: 50%">
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-container>
      <!-- <DiceChat /> -->

      <!-- <v-btn fab small color="primary" dark class="dice-fab" @click="showDiceChat = !showDiceChat">
        <v-icon>casino</v-icon>
      </v-btn>
      <transition name="slide-fade">
        <div v-if="showDiceChat" class="dice-chat-wrapper">
          <DiceChat />
        </div>
      </transition> -->
    </v-main>

    <v-footer app dark :color="spendBuildingPoints > totalBuildPoints ? 'error' : ''" class="caption">
      <v-spacer />
      <div class="caption d-none d-sm-block">
        {{ finalKeywords.join(" • ") }}
      </div>
      <div class="d-block d-sm-none">
        <v-btn tile small nuxt :to="linkPrev" :disabled="linkCurrentIndex === 0">
          <v-icon left small> chevron_left </v-icon>Пред
        </v-btn>
        <v-btn tile small nuxt :to="linkNext" :disabled="linkCurrentIndex === 8">
          След<v-icon right small> chevron_right </v-icon>
        </v-btn>
      </div>
      <v-spacer />
      <span>&copy; {{ new Date().getFullYear() }}</span><span class="d-none d-md-block">&nbsp;Shadow Tales</span>
    </v-footer>
  </v-app>
</template>

<script>
import DefaultFooter from "~/components/DefaultFooter.vue";
import ToolbarAccountActions from "~/components/user/ToolbarAccountActions.vue";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";
import SluggerMixin from "~/mixins/SluggerMixin";
import AppLoader from '~/components/AppLoader.vue';
import WargearTraitRepositoryMixin from "~/mixins/WargearTraitRepositoryMixin";
import DiceChat from '@/components/DiceChat.vue';
import AttributeTable from '~/components/forge/character/AttributeTable.vue';

export default {
  name: "Forge",
  components: {
    DefaultFooter,
    ToolbarAccountActions,
    AppLoader,
    DiceChat,
    AttributeTable
  },

  mixins: [StatRepositoryMixin, SluggerMixin, WargearTraitRepositoryMixin],
  data() {
    return {
      skillsDialog: false,
      savesDialog: false,
      attDialog: false,
      actionList: undefined,
      showDiceChat: false,
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
  mounted() {
    this.$store.commit('ui/SET_LOADING', false)
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

    attributes() {
      return ["strength", "dexterity", "constitution", "intellect", "wisdom", "charisma"];
    },
    finalRepository() {
      return ["Источник", ...this.attributeRepository.map(s => s.name)];
    },

    tableRows() {
      return [
        {
          source: 'Предыстория',
          stats:
            this.characterBackgroundBoost,
        },
        {
          source: 'Наследие',
          stats: this.mergeStats(
            this.characterAncestryBoost,
            this.characterAttributesAncestryFlaw
          )
        },
        {
          source: 'Класс',
          stats: this.characterClassBoost
        },
        {
          source: '1 уровень',
          stats: this.characterAttributeBoost
        },
        {
          source: '5 уровень',
          stats: this.characterAttributeBoost5
        },
        {
          source: '10 уровень',
          stats: this.characterAttributeBoost10
        },
        {
          source: '15 уровень',
          stats: this.characterAttributeBoost15
        },
        {
          source: '20 уровень',
          stats: this.characterAttributeBoost20
        },
      ].filter(row => row.stats);
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
        // {
        //   id: 2,
        //   path: this.routes.heritage,
        //   hint: "Родословная",
        //   text: this.characterHeritageLabel,
        //   cost: this.characterSpeciesCost,
        // },
        {
          id: 2,
          path: this.routes.archetype,
          hint: "Класс",
          text: this.characterArchetype,
          cost: this.characterArchetypeCost,
        },
        {
          id: 3,
          path: this.routes.ascension,
          hint: "Предыстория",
          text: this.characterAscension,
          cost: this.characterAscensionCost,
        },
        {
          id: 4,
          path: this.routes.stats,
          // hint: 'Навыки и Характеристики',
          text: "Навыки и Характеристики",
          cost: this.characterAttributeCost + this.characterSkillCost,
        },
        {
          id: 5,
          path: this.routes.talents,
          hint: `Черты`,
          // text: `${this.characterTalents.length} Черт взято`,
          cost: this.characterTalentCost,
        },
        // {
        //   id: 6,
        //   path: this.routes.psychic,
        //   hint: `Заклинания`,
        //   // text: `${this.characterPsychicPowers.length}Зак`,
        //   cost: this.characterPsychicPowerCost,
        // },
        { divider: true },
        // {
        //   id: 8,
        //   path: this.routes.wargear,
        //   hint: "",
        //   text: "Снаряжение",
        //   cost: null,
        // },
        // {
        //   id: 9,
        //   path: this.routes.background,
        //   hint: "Языки",
        //   // text: this.characterFaction ? this.characterFaction.name : undefined,
        //   cost: null,
        // },
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
    Resistance() {
      return this.$store.getters["characters/characterResistanceById"](
        this.$route.params.id
      );
    },
    ResImWeak() {
      return this.Resistance
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

      const totalValue = progress.reduce(
        (sum, item) => sum + (item.value || 0),
        0
      );

      return totalValue;
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
      const totalValue = progress.reduce(
        (sum, item) => sum + (item.value || 0),
        0
      );

      return totalValue;
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
    charGear() {
      return this.$store.getters['characters/characterWargearById'](this.$route.params.id);
    },
    charactermodificatorsBonus() {
      return (
        this.$store.getters["characters/charactermodificatorsBonusById"](
          this.$route.params.id
        )
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


    characterBackgroundBoost() {
      return this.$store.getters['characters/characterBackgroundBoost'](this.$route.params.id);
    },
    characterBackground2() {
      return this.$store.getters['characters/characterBackgroundFreeBoost2ById'](this.$route.params.id);
    },
    characterBackgroundBoost() {
      return this.$store.getters['characters/characterBackgroundBoostId'](this.$route.params.id);
    },
    // characterBackground2Boost() {
    //   return this.$store.getters['characters/characterBackgroundBoost2IdById'](this.characterId);
    // },
    characterAncestryFreeBoost() {
      return this.$store.getters['characters/characterAncestryFreeBoostById'](this.$route.params.id);
    },
    characterAttributesAncestryFlaw() {
      return this.$store.getters['characters/characterAttributesAncestryFlaw'](this.$route.params.id);
    },

    characterAncestryFreeBoost2() {
      return this.$store.getters['characters/characterAncestryFreeBoost2ById'](this.$route.params.id);
    },
    characterClassBoost() {
      return this.$store.getters['characters/characterAttributesClassBoost'](this.$route.params.id);
    },

    characterAttributeBoost() {
      return this.$store.getters['characters/characterAttributeBoost'](this.$route.params.id);
    },
    characterAttributeBoost5() {
      return this.$store.getters['characters/characterAttributeBoost5'](this.$route.params.id);
    },
    characterAttributeBoost10() {
      return this.$store.getters['characters/characterAttributeBoost10'](this.$route.params.id);
    },
    characterAttributeBoost15() {
      return this.$store.getters['characters/characterAttributeBoost15'](this.$route.params.id);
    },
    characterAttributeBoost20() {
      return this.$store.getters['characters/characterAttributeBoost20'](this.$route.params.id);
    },
    characterAncestryBoost() {
      return this.$store.getters['characters/characterAncestryBoostById'](this.$route.params.id);
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
    '$route.params.id': {
      immediate: true,
      handler(id) {
        if (id) {
          this.$store.commit('characters/SET_ACTIVE', id)
        }
      }
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
      const item = this.itemBonus(skill.key) ? this.itemBonus(skill.key).value : 0;
      return prof + attr + lvl + item;
    },
    enhancements() {
      return this.$store.getters["characters/characterEnhancementsById"](
        this.$route.params.id
      );
    },
    saveTotal(skill) {
      const prof = this.profiencyRepository[this.characterSaving[skill.key]];
      const attr = (this.characterAttributes[skill.attribute] - 10) / 2;
      const lvl = prof !== 0 ? this.characterLevel() : 0;
      return prof + attr + lvl;
    },
    characterBonus(skill) {
      const bonus = this.$store.getters["characters/characterBonusById"](
        this.$route.params.id
      );
      return bonus ? bonus.filter(s => s.key === skill) : []
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

    ModAttributeReal(attribute) {
      let result = 0

      this.tableRows.forEach((row, rowIndex) => {
        result += this.formatBoost(attribute, rowIndex)
      })

      // const result = this.characterAttributes[attribute]
      const modRaw = (result);       // настоящее дробное значение
      const mod = Math.floor(modRaw);         // отображаемое целое значение


      const arrow = Number.isInteger(modRaw) ? "" : " ⯅";  // стрелка только если дробное

      return (mod > 0 ? "+ " : " ") + mod + arrow;


    },
    ModAttribute(attribute, skill) {
      //      const skills = [...this.skillRepository, ...this.characterCustomSkills];
      const level = this.characterLevel();
      const prof = this.characterSkillSheet.filter(
        (s) => s.key === skill && s.level <= level && s.combinded !== true
      ).length;

      const char1 = this.profiencyRepository[this.charSkill[prof]];
      const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = char1 === 0 ? 0 : this.characterLevel();

      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    SkillProf(skill) {
      const level = this.characterLevel()
      const prof = this.characterSkillSheet.filter(
        (s) => s.key === skill && s.level <= level && s.combinded !== true
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

      const level = this.characterLevel()
      const prof = this.characterSkillSheet.filter(
        (s) => s.key === skill && s.level <= level && s.combinded !== true
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
    formatCell(value, row, name) {

      if (value === 0 || value === undefined || value === null) return "";
      return value > 0 ? "+" + value : value;
    },

    formatTotal(attr) {
      let sum = 0;
      for (const row of this.tableRows) {
        if (row[attr]) sum += row[attr];
      }
      return sum > 0 ? "+" + sum : sum;
    },
    SaveLabelName(skill) {
      //      const skills = [...this.skillRepository, ...this.characterCustomSkills];
      switch (skill) {
        case "U":
          return "нетренированы";
        case "T":
          return "тренированы";
        case "E":
          return "эксперт";
        case "M":
          return "мастер";
        case "L":
          return "легенда";
        default:
          return "нетренированыН";
      }
    },
    SkillLabel(skill) {
      //      const skills = [...this.skillRepository, ...this.characterCustomSkills];
      const level = this.characterLevel()
      const prof = this.characterSkillSheet.filter(
        (s) => s.key === skill && s.level <= level && s.combinded !== true
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

    characterResistance() {
      return this.$store.getters["characters/characterResistanceById"](
        this.$route.params.id
      )
    },
    itemBonus(skill) {
      if (!this.charactermodificatorsBonus) return undefined
      const charGear = this.charGear.filter(item => item.equipped?.invest === true)
      const itemBonus = this.charactermodificatorsBonus.filter(
        item =>
          item.selector === skill &&
          item.type === 'item' &&
          charGear.some(gear => gear.key === item.source)
      )

      let typeMaxItem = itemBonus.length > 0 ? itemBonus[0] : undefined

      if (itemBonus) {
        itemBonus.forEach(item => {
          if (typeMaxItem.value < item.value)
            typeMaxItem = item

        })
        return typeMaxItem
      }

      return undefined
    },
    formatBoost(stat, rowIndex) {
      let count = 0;

      for (let i = 0; i <= rowIndex; i++) {
        count += this.tableRows[i].stats?.[stat] || 0;
      }

      if (count <= 4) return this.tableRows[rowIndex].stats?.[stat] || 0;

      // после 4
      if (this.tableRows[rowIndex].stats?.[stat] === 0) return 0;

      return (count - 4) % 2 === 1 ? 0.5 : 1;
    },

    characterArmor() {
      const wear = this.$store.getters["characters/characterWearById"](
        this.$route.params.id
      );
      if (wear) {
        const modDex = Math.floor(
          (this.characterAttributes["dexterity"] - 10) / 2
        );
        const wearModDex = wear.dexCap ? wear.dexCap : 0;
        const dex = modDex > wearModDex ? wearModDex : modDex;
        const Def = wear.category
          ? this.profiencyRepository[this.skillDefence[wear.category]]
          : 0;

        const bonusAC = wear.acBonus ? wear.acBonus : 0;
        const arm = Def === 0 ? 0 : this.characterLevel();
        return 10 + dex + Def + arm + bonusAC;
      }

      const modDex = Math.floor(
        (this.characterAttributes["dexterity"] - 10) / 2
      );

      const Def = this.profiencyRepository[this.skillDefence["unarmored"]];
      return 10 + modDex + Def;
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

      // сумма кастомных хитов
      let customHP = 0;
      for (const key in this.characterHitPoints) {
        if (!["species", "class", "heritage"].includes(key)) {
          customHP += this.characterHitPoints[key];
        }
      }

      if (levelClass <= 0) return species + customHP;
      else return species + levelClass + customHP;
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
    mergeStats(...inputs) {
      const result = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intellect: 0,
        wisdom: 0,
        charisma: 0
      };

      inputs.forEach(input => {
        if (!input) return;

        // 2️⃣ Если это объект со значениями
        if (typeof input === 'object') {
          Object.keys(result).forEach(stat => {
            result[stat] += Number(input[stat] || 0);
          });
        }
      });



      return result;
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
        .filter((s) => s.key === skill.key && s.combinded === false)
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
          let type = '';
          switch (s.type) {
            case 'archetype':
              type = 'Класс'
              break;
            case 'skill':
              type = 'Навык'
              break;
            case 'background':
              type = 'Предыстория'
              break;

          }

          event.push({
            level: s.level,
            source: type,
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
    closeAtt() {
      this.attDialog = false;
    },
    openAtt() {
      this.attDialog = true;
    },
    openSaves(save) {
      this.save = save;
      const event = [];
      const train = {
        "U": "Нетреннированый",
        "T": "Тренированный",
        "E": "Эксперт",
        "M": "Мастер",
        "L": "Легенда",
      };


      const level = this.characterLevel();
      const prof = this.enhancements()
        .filter((s) => s.key === save.key).filter(s => s.level <= level).sort((a, b) => b.level - a.level);

      if (prof) {
        let i = 0;

        prof.forEach((s) => {
          let type = '';
          switch (s.source) {
            case 'archetype':
              type = 'Класс'
              break;
            case 'skill':
              type = 'Навык'
              break;
            case 'background':
              type = 'Предыстория'
              break;

          }
          event.push({
            level: s.level,
            source: type,
            details: train[s.upgrade],
          });
          i++;
        });
      }

      const save1 = {
        ...save,
        // actions: actions,
        event: event,
      };

      this.save = save1;

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
    getSkillRank(skillKey) {
      const skillSheet = this.characterSkillSheet || [];
      const level = this.characterLevel()

      return skillSheet.filter((s) => s.key === skillKey && s.level <= level && s.combinded !== true).length;
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
  },
};
</script>

<!-- 
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
    --badge-lh: calc(var(--badge-height) - calc(0.125rem * var(--mantine-scale)));
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
  color: var(--v-theme-on-surface);
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

/* Для характеристик */
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
  background-color: rgba(233, 236, 239, 0.1);
  color: var(--v-theme-on-surface);
  font-weight: 400;
  backdrop-filter: blur(6px);
  text-transform: none;
  border-radius: 12px 0 0 12px !important;
  height: 28px !important;
  padding: 0 8px !important;
}

.stat-mod-btn {
  flex: 0 0 35px;
  background-color: rgba(144, 146, 150, 0.1);
  color: var(--v-theme-on-surface);
  border-radius: 0 12px 12px 0 !important;
  height: 28px !important;
  padding: 0 !important;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.compact-text {
  font-size: 0.875rem;
  /* немного меньше стандартного (примерно 14px) */
  line-height: 1.1;
  /* плотнее строки */
  margin: 0;
  /* убирает внешние отступы */
  padding: 0;
  /* убирает внутренние */
}
</style>

<style scoped>
.compact-list .v-list {
  padding-top: 0;
  padding-bottom: 0;
}

.compact-list .v-list-item {
  min-height: 0 !important;
  /* убираем минимальную высоту по умолчанию */
  height: 24px !important;
  /* задаём фиксированную минимальную высоту */

  padding-top: 0px !important;
  /* минимальный верхний отступ */
  padding-bottom: 0px !important;
  /* минимальный нижний отступ */
}

.compact-list .v-list-item-content {
  font-size: 0.75rem !important;
  margin: 0 !important;
  /* убираем любые внешние отступы */
  padding: 0 !important;
  /* убираем внутренние отступы */
}

.compact-list .v-list-item-title {
  font-size: 0.75rem !important;
  line-height: 1 !important;
  /* плотная строка */
  margin: 0 !important;
}

.compact-list .v-chip {
  font-size: 0.65rem !important;
  height: 18px !important;
  /* минимальная высота */
  line-height: 1 !important;
  padding: 2 4px !important;
  /* сжатая внутренняя область */
}


.boost-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.boost-table th,
.boost-table td {
  border: 1px solid #25262b;
  padding: 6px;
}

.boost-footer {
  border-top: 2px solid #25262b;
}

.builder-sidebar {

  min-width: 220px;


  font-size: 0.75rem;
}

.top-block {
  border-bottom: 1px solid #ccc;
  padding-bottom: 4px;
}

.stat-title {
  font-weight: 500;
  font-size: 0.75rem;
}

.bottom-block {
  margin-top: 4px;
}

.section {
  margin-bottom: 12px;
}

.section-title {
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 4px;
}

/* Строки со статистикой */
.stat-row {
  display: flex;
  align-items: center;
  margin-bottom: 2px;
  flex-wrap: nowrap;
  /* чтобы чипы не переносились */
}

/* Чипы в списках (включая list-item-action) */
.v-list-item-action {
  display: flex !important;
  flex-wrap: nowrap;
  align-items: center;
}

.v-chip {
  font-weight: 600;
  letter-spacing: 0.2px;

  color: var(--ui-text);


  border: 1px solid rgba(255, 255, 255, 0.12);

}

/* тёмная тема */
.theme--dark .v-chip {
  border: 1px solid rgba(255, 255, 255, 0.18);

}

/* светлая тема */
.theme--light .v-chip {
  border: 1px solid rgba(0, 0, 0, 0.12);

}

.chip-row {
  display: flex !important;
  flex-wrap: nowrap;
  align-items: center;
}

.dice-fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.dice-chat-wrapper {
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 1000;

  width: 350px;
  max-height: 500px;
}

/* =========================
   PANEL / CARD SYSTEM
========================= */

.ui-panel {
  background: var(--ui-surface);
  border: 1px solid var(--ui-border);
  border-radius: 14px;
}

/* =========================
   BUTTON SYSTEM
========================= */

.ui-btn {
  border-radius: 10px;
  font-weight: 500;
  letter-spacing: 0.2px;
  text-transform: none;
  transition: 0.2s ease;

  border: 1px solid var(--ui-border);
  background: var(--ui-surface);
  color: var(--ui-text);
}

.ui-btn--primary {
  border: 1px solid var(--ui-accent);
  background: var(--ui-accent-soft);
}

.ui-btn--secondary {
  border: 1px solid var(--ui-border);
  background: var(--ui-surface);
}

.ui-btn--ghost {
  border: 1px solid transparent;
  background: transparent;
}

/* контраст под тему */
.theme--light .ui-btn {
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.theme--dark .ui-btn {
  border: 1px solid rgba(255, 255, 255, 0.15);
}

/* =========================
   CHIP SYSTEM
========================= */



. {
  color: #ccc;
}



/* =========================
   SIDEBAR LAYOUT HELPERS
========================= */

.section-title {
  font-size: 14px;
  font-weight: 600;
  margin: 12px 0 8px;
  opacity: 0.9;
}

.stat-row {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.stat-name-btn {
  width: 100%;
  justify-content: flex-start;
}

.stat-mod-btn {
  min-width: 44px;
  justify-content: center;
}

.chip-row {
  display: flex;
  align-items: center;
}

/* =========================
   OPTIONAL: smooth UI feel
========================= */

.ui-btn:hover {
  transform: translateY(-1px);
}

.builder-toolbar {
  position: sticky;
  width: 100%;

  z-index: 5;

  background: var(--ui-surface);
  border-bottom: 1px solid var(--ui-border);

  height: 48px;
}

.toolbar-scroll {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  -webkit-overflow-scrolling: touch;
}



.toolbar-items {
  padding-top: 55px !important;
}

.ui-dialog {
  border-radius: 14px;
}

.ui-dialog__header {
  background: #262e37;
  color: #fff;
}

.ui-dialog__content {
  background: var(--ui-surface, #1e1e1e);
}

/* Секции */
.ui-section {
  border-radius: 12px;
}

/* Формула */
.ui-formula {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}

.ui-formula__total {
  font-size: 28px;
  font-weight: 600;
}

.ui-formula__parts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.ui-formula__part {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
}

.ui-formula__operator {
  opacity: 0.6;
  font-weight: bold;
}

.ui-chip {
  font-weight: 600;

}

/* Модификаторы */
.ui-modifier {
  padding: 8px 0;
  opacity: 0.9;
}

.ui-timeline-card {
  border-radius: 10px;
  padding: 6px;
}

.ui-timeline-header {
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-bottom: 4px;
}

.ui-timeline-source {
  font-weight: 600;
}

.ui-timeline-level {
  font-size: 11px;
  opacity: 0.85;
}

.ui-timeline-text {
  font-size: 12px;
  opacity: 0.85;
  font-style: italic;
}

.v-container {
  padding-top: 112px !important;
  /* 64 (app-bar) + 48 (toolbar) */
}
</style>
 
-->

<style scoped>
/* =========================================
   SHADOW TALES UI FOUNDATION
   Step 1
   Theme aware version
========================================= */


/* =========================================
   THEME TOKENS
========================================= */


/* DARK THEME */

.theme--dark {

  --ui-background: #0d1117;

  --ui-surface: #161c23;

  --ui-surface-hover: #202833;

  --ui-border: rgba(255, 255, 255, .08);

  --ui-text: #e6e6e6;

  --ui-text-muted: #e6e6e6;

  --ui-chip-bg: rgba(255, 255, 255, .08);

}


/* LIGHT THEME */

.theme--light {

  --ui-background: #f4f5f7;

  --ui-surface: #ffffff;

  --ui-surface-hover: #eef1f5;

  --ui-border: rgba(0, 0, 0, .10);

  --ui-text: #1b1d22;

  --ui-text-muted: rgba(0, 0, 0, .55);

  --ui-chip-bg: rgba(0, 0, 0, .06);

}



/* =========================================
   APPLICATION
========================================= */


.v-application {

  background: var(--ui-background) !important;

}


.v-main {

  background:

    radial-gradient(circle at top,
      rgba(255, 255, 255, .04),
      transparent 450px),

    var(--ui-background);

}



/* =========================================
   CARDS / PANELS
========================================= */


.v-card {

  background: var(--ui-surface) !important;

  color: var(--ui-text) !important;

}



/* Sidebar */

.builder-sidebar {

  background: var(--ui-surface) !important;

  border: none !important;

}



/* =========================================
   SECTIONS
========================================= */


.ui-section {


  background:

    linear-gradient(145deg,
      rgba(255, 255, 255, .04),
      rgba(255, 255, 255, .01)),

    var(--ui-surface) !important;


  border:

    1px solid var(--ui-border) !important;


  border-radius: 16px !important;

  overflow: hidden;


}



/* Section title */


.ui-section__title {


  padding: 14px 18px !important;


  font-size: .78rem !important;


  text-transform: uppercase;


  letter-spacing: .12em;


  font-weight: 700;


  color: var(--ui-text-muted) !important;


}



/* =========================================
   LISTS
========================================= */


.v-list-item {


  border-radius: 12px;


  transition: .2s ease;


}



.v-list-item:hover {


  background: var(--ui-surface-hover);


}



.v-list-item__title,

.v-list-item__content {


  color: var(--ui-text) !important;


}



/* =========================================
   TITLES
========================================= */


.section-title {

  display: flex;

  align-items: center;

  min-height: 42px;

  padding: 0 16px;

  margin: 0;

  border-bottom: 1px solid var(--ui-border);

  font-size: .72rem;

  letter-spacing: .14em;

  text-transform: uppercase;

  font-weight: 700;

}

.st-panel>.st-list {

  padding: 6px !important;

}

.st-panel>.st-list {

  padding: 6px !important;

}

/* ========================================
   Builder Navigation
======================================== */

.builder-toolbar {

  overflow-x: auto;

  overflow-y: hidden;

  scrollbar-width: none;

}

.builder-toolbar::-webkit-scrollbar {

  display: none;

}

.builder-toolbar .v-toolbar__content {

  gap: 6px;

  padding: 0 8px;

  min-width: max-content;

}

.builder-toolbar .v-btn {

  border-radius: 999px !important;

  min-width: auto;

  padding: 0 14px;

  font-size: .84rem;

}

.builder-toolbar .v-btn {

  border-radius: 999px !important;

  min-width: auto;

  padding: 0 14px;

  font-size: .84rem;

}

.builder-toolbar .v-btn:hover {

  background: var(--ui-surface-hover) !important;

}

.select-chip {

  transform: scale(.8);

  margin-left: 4px;

}


/* =========================================
   DIVIDERS
========================================= */


.v-divider {


  border-color: var(--ui-border) !important;


}



/* =========================================
   DIALOGS
========================================= */


.ui-dialog {


  border-radius: 20px !important;


  overflow: hidden;


}



.ui-dialog__header {


  background:


    linear-gradient(90deg,

      var(--ui-surface-hover),

      var(--ui-surface));


}



/* =========================================
   CHIPS
========================================= */


.ui-chip {


  /* background: var(--ui-chip-bg) !important; */


  color: var(--ui-text) !important;


  border-radius: 8px !important;


  font-weight: 600;


}

.ui-chip--class {


  /* background: var(--ui-chip-bg) !important; */


  color: #e6e6e6;


  border-radius: 8px !important;


  font-weight: 600;


}


.ui-chip--success {


  background: var(--ui-chip-bg) !important;

  color: var(--ui-text) !important;


}



/* . {


  font-size: .72rem !important;


} */



/* =========================================
   BUTTONS
========================================= */


.ui-btn {


  border-radius: 10px !important;


  text-transform: none !important;


}



.ui-btn--secondary {


  background: var(--ui-chip-bg) !important;


}



/* =========================================
   BRAND
========================================= */


.brand-logo {

  text-decoration: none;

  font-size: 1.2rem;

  font-weight: 600;

  letter-spacing: -.02em;

  color: var(--ui-text);

  transition: .2s;

}


.brand-logo:hover {

  opacity: .85;

}



/* =========================================
   ATTRIBUTE FIX
========================================= */


.stat-row,

.builder-sidebar .v-list-item {


  display: flex;

  align-items: center;


}



.stat-name-btn {


  flex: 1;


}



.stat-mod-btn {


  min-width: 52px;


  justify-content: center;


  margin-left: 8px;


}

/* Формула */
.ui-formula {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
}

.ui-formula__total {
  font-size: 28px;
  font-weight: 600;
}

.ui-formula__parts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.ui-formula__part {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
}

.ui-formula__operator {
  opacity: 0.6;
  font-weight: bold;
}

/* смысловые состояния */
.ui-chip--success {
  border-color: rgba(76, 175, 80, 0.5);
}

.ui-chip--danger {
  border-color: rgba(244, 67, 54, 0.5);
}

.ui-chip--info {
  border-color: rgba(33, 150, 243, 0.5);
  background-color: rgba(33, 150, 243, 0.5) !important;
}

/* =========================================
   APP BAR
========================================= */

.v-app-bar {

  backdrop-filter: blur(18px);

  -webkit-backdrop-filter: blur(18px);

  border-bottom: 1px solid var(--ui-border);

  box-shadow: none !important;

}

/* =========================================
   BUILDER TOOLBAR
========================================= */

.builder-toolbar {

  background: transparent !important;

  box-shadow: none !important;

  border-bottom: 1px solid var(--ui-border);

  padding: 0 8px;

}

.builder-toolbar .v-btn {

  text-transform: none;

  letter-spacing: 0;

  border-radius: 10px;

  font-weight: 500;

  padding: 0 14px;

  transition: .18s;

}

.builder-toolbar .v-btn {

  text-transform: none;

  letter-spacing: 0;

  border-radius: 10px;

  font-weight: 500;

  padding: 0 14px;

  transition: .18s;

}

.builder-toolbar .nuxt-link-exact-active {

  background: var(--ui-surface-hover) !important;

  font-weight: 600;

}

.v-footer {

  border-top: 1px solid var(--ui-border);

  box-shadow: none !important;

}

.v-footer {

  border-top: 1px solid var(--ui-border);

  box-shadow: none !important;

}

/* =========================================
   CHARACTER SUMMARY
========================================= */

.st-panel {

  margin-bottom: 16px;

  border: 1px solid var(--ui-border);

  border-radius: 16px;

  overflow: hidden;

}



.st-list {

  padding: 6px !important;

}



.st-row {

  border-radius: 12px;

  min-height: 52px !important;

  transition: .18s;

}



.st-row:hover {

  background: var(--ui-surface-hover);

}

.st-panel .v-list-item__title {

  font-size: .86rem;

  font-weight: 500;

}

.st-panel .v-list-item__action {

  margin-left: 20px;

}

.st-panel .ui-chip {

  min-width: 42px;

  justify-content: center;

}

.chip-row {

  display: flex;

  align-items: center;

  gap: 6px;

}



/* =========================================
   ATTRIBUTES
========================================= */

.stat-row {

  display: flex;

  align-items: center;

  justify-content: space-between;

  min-height: 46px;

  padding: 0 14px;

  border-radius: 12px;

  cursor: pointer;

  transition: .18s;

}

.stat-row:hover {

  background: var(--ui-surface-hover);

}

.stat-name {

  font-weight: 500;

  font-size: .92rem;

}

.stat-value {

  min-width: 42px;

  justify-content: center;

  font-weight: 700;

}

.builder-container {

  padding-top: 16px !important;

}

@media(max-width:600px) {

  .builder-container {

    padding: 8px !important;

  }

}



@media(max-width:600px) {

  .st-row {

    min-height: 40px !important;

  }

  .ui-chip {

    min-height: 28px;

    padding: 0 10px;

  }



  @media (max-width: 600px) {

    .st-row,
    .st-list-item,
    .v-list-item {

      min-height: 56px !important;

    }

  }
}

.ui-dialog__header {

  position: sticky;

  top: 0;

  z-index: 20;

  background: var(--ui-surface);

  border-bottom: 1px solid var(--ui-border);

}

.ui-dialog__content {

  overscroll-behavior: contain;

  -webkit-overflow-scrolling: touch;

}

.ui-dialog__footer {

  position: sticky;

  bottom: 0;

  background: var(--ui-surface);

  border-top: 1px solid var(--ui-border);

  z-index: 20;

}

@media(max-width:600px) {

  .v-timeline {

    padding-left: 0 !important;

  }

  .v-timeline-item__body {

    max-width: 100% !important;

  }

}

@media(max-width:600px) {

  .v-main {

    padding-top: 56px !important;

  }

}

@media(max-width:600px) {

  .v-main {

    padding-top: 56px !important;

  }

}
</style>
