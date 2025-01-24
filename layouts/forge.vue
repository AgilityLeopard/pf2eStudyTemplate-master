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
            {{ characterSpeed["land"] }}
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
              >
                <v-list-item-content>
                  <v-list-item-title>
                    {{ skill.name }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action class="hidden-xs-only">
                  <v-chip pill color="green" text-color="white">
                    <v-avatar left class="green darken-4">
                      {{ ModAttribute(skill.attribute, skill.key) }}
                    </v-avatar>
                  </v-chip>
                </v-list-item-action>
                <v-list-item-action class="hidden-xs-only">
                  <v-chip pill color="red" text-color="white">
                    <v-avatar left class="red darken-4">
                      {{ characterlabel(characterSkills[skill.key]) }}
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
      <v-dialog
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
                    {{ profiencyRepository[characterSkills[skill.key]] }}
                  </v-sheet>
                </v-col>
                <v-col>
                  <v-sheet class="text-center small pa-1"> Уровень </v-sheet>
                  <v-sheet
                    v-if="profiencyRepository[characterSkills[skill.key]] !== 0"
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
          Shadow Tales
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-icon v-if="$nuxt.isOffline" color="warning"> offline_bolt </v-icon>

        <!-- <v-btn class="d-none d-md-inline-flex" icon href="https://discordapp.com/channels/256930339878993920/600107858486493193">
          <v-icon>mdi-discord</v-icon>
        </v-btn>
     -->
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
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.heritage"
            :disabled="!settingSelected"
          >
            2. Родословная
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.archetype"
            :disabled="!settingSelected"
          >
            3. Класс
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.ascension"
            :disabled="!settingSelected"
          >
            4. Предыстория
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.stats"
            :disabled="!settingSelected"
          >
            5. Навыки и характеристики
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.talents"
            :disabled="!settingSelected"
          >
            6. Черты
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.wargear"
            :disabled="!settingSelected"
          >
            7. Снаряжение
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.psychic"
            :disabled="!settingSelected"
          >
            8. Заклинания
          </v-btn>
          <v-btn
            small
            text
            nuxt
            :to="routes.background"
            :disabled="!settingSelected"
          >
            8. Языки
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
      <div>{{ spendBuildingPoints }} / {{ totalBuildPoints }} XP</div>
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
    };
  },
  computed: {
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
        // { rel: 'canonical', href: `https://shadowfoftales.ru${this.$route.path}` },
      ],
    };
  },
  watch: {
    theme: {
      handler(newTheme, oldTheme) {
        console.info(`handle ${newTheme}`);
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
  },
  methods: {
    async loadFaction(key) {
      if (key) {
        const { data } = await this.$axios.get(`/api/factions/${key}`);
        this.characterFaction = data;
      }
    },
    ModAttribute(attribute, skill) {
      const char1 = this.profiencyRepository[this.characterSkills[skill]];
      const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = char1 === 0 ? 0 : this.characterLevel();
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
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
    characterArmor() {
      const wear = this.$store.getters["characters/characterWearById"](
        this.$route.params.id
      );
      if (wear) {
        const modDex = Math.floor(
          (this.characterAttributes["dexterity"] - 10) / 2
        );
        const dex = modDex > wear.modDex ? wear.modDex : modDex;
        const Def = this.profiencyRepository[this.skillDefence[wear.category]];
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
    openSkills(skill) {
      this.skill = skill;
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
}
</style>
