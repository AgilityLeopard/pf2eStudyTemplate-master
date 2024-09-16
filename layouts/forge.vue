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
    <v-expansion-panels multiple>
      <!-- Характеристики -->
      <v-expansion-panel>
      <v-expansion-panel-header class="pa-4 pt-2 pb-2">

          Характеристики
      </v-expansion-panel-header>
      <v-expansion-panel-content>
                <div class="group">
                    <div class= "attr" v-for="attribute in attributeRepository">
                      <p>{{ attribute.short }}</p> 
                      <p> {{ (characterAttributes[attribute.key] - 10) / 2}}</p>
                    </div>
                </div>

          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel> 
            <v-expansion-panel-header class="pa-4 pt-2 pb-2">

              Навыки
            </v-expansion-panel-header>
          <v-expansion-panel-content >
        
        <div class="group_rec">
          <div   v-for="skill in finalSkillRepository">
         
                <v-btn class = "group_skill" style="width: 100%" @click="openSkills(skill)">
                  
                  <div>{{ skill.name }}</div> <div> {{ModAttribute(skill.attribute, skill.key)}}</div> <div>  {{characterSkills[skill.key] }}</div>

                </v-btn> 

        </div>
      </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel> 
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
      </v-expansion-panel>
    </v-expansion-panels>

    <v-dialog
              v-model="skillsDialog"
              width="600px"
              scrollable
              :fullscreen="$vuetify.breakpoint.xsOnly"
            >
              <v-card>
          
                <v-card-title style="background-color: #262e37; color: #fff;">
                  Навыки
                  <v-spacer />
                  <v-icon dark @click="closeSkills">close</v-icon>
                </v-card-title>

                <v-card-text class="pt-4">
                 
                    
                    <v-container class="bg-primary mb-6">
                        <v-row align="start" style="height: 150px">
                          <v-col >
                            <v-sheet class="text-center small pa-1"> 
                              Навык

                            </v-sheet>
                            <v-sheet class="text-center pa-2 ma-2"> 
                              {{ skill.name }}

                            </v-sheet>
                           
                          </v-col >
                          <v-col>
                            <v-sheet class="text-center small pa-1"> 
                              {{ this.attributeRepository.find(item => item.key === skill.attribute).short }}

                            </v-sheet>
                            <v-sheet class="text-center pa-2 ma-2"> 
                              {{ (characterAttributes[skill.attribute] - 10) / 2}}

                            </v-sheet>
                          </v-col>
                          <v-col>
                            <v-sheet class="text-center small pa-1"> 
                              Владение

                            </v-sheet>
                            <v-sheet class="text-center pa-2 ma-2"> 
                              {{profiencyRepository[characterSkills[skill.key]]}}

                            </v-sheet>
                          </v-col>
                          <v-col>
                            <v-sheet class="text-center small pa-1"> 
                             Уровень

                            </v-sheet>
                            <v-sheet v-if="profiencyRepository[characterSkills[skill.key]] !== 0" class="text-center pa-2 ma-2">

                              {{characterLevel()}}

                            </v-sheet>
                            <v-sheet v-else class="text-center pa-2 ma-2">

                              0

                            </v-sheet>
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
      
<!--           
      
        <v-list-item
          nuxt
          :to="`/forge/characters/${$route.params.id}/builder/setting`"
        >
          <v-list-item-content>
          
            <v-list-item-subtitle>Главная</v-list-item-subtitle>
          </v-list-item-content>


        </v-list-item>

        <div
      
        >



           <v-list-item
            v-else
            nuxt
            :to="entry.path"
          >
            <v-list-item-content>
              <v-list-item-title>{{ entry.text }}</v-list-item-title>
              <v-list-item-subtitle>{{ entry.hint }}</v-list-item-subtitle>
            </v-list-item-content>

          </v-list-item> 
        </div>
      </v-list> -->
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      dense
      style="background-color: #212121;"
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
        <v-icon v-if="$nuxt.isOffline" color="warning">
          offline_bolt
        </v-icon>

        <!-- <v-btn class="d-none d-md-inline-flex" icon href="https://discordapp.com/channels/256930339878993920/600107858486493193">
          <v-icon>mdi-discord</v-icon>
        </v-btn>
        <v-btn class="d-none d-md-inline-flex" icon href="https://twitter.com/doctors_of_doom">
          <v-icon color="#1DA1F2">mdi-twitter</v-icon>
        </v-btn> -->
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
          <v-btn small text nuxt :to="`/forge/characters/${$route.params.id}/builder/setting`">
            Главная
          </v-btn>
          <v-btn small text nuxt :to="routes.species" :disabled="!settingSelected">
            1. Наследие
          </v-btn>
          <v-btn small text nuxt :to="routes.heritage" :disabled="!settingSelected">
            2. Родословная
          </v-btn>
          <v-btn small text nuxt :to="routes.archetype" :disabled="!settingSelected">
            3. Класс
          </v-btn>
          <v-btn small text nuxt :to="routes.ascension" :disabled="!settingSelected">
            4. Предыстория
          </v-btn>
          <v-btn small text nuxt :to="routes.stats" :disabled="!settingSelected">
            5. Навыки и характеристики
          </v-btn>
          <v-btn small text nuxt :to="routes.talents" :disabled="!settingSelected">
            6. Черты
          </v-btn>
          <v-btn small text nuxt :to="routes.wargear" :disabled="!settingSelected">
            7. Снаряжение
          </v-btn>
          <v-btn small text nuxt :to="routes.psychic" :disabled="!settingSelected">
            8. Заклинания
          </v-btn>
          <v-btn small text nuxt :to="routes.background" :disabled="!settingSelected">
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
          style="position: fixed; top: 174px; right: 350px; margin-right: 50%;"
        >
          <v-icon>chevron_left</v-icon>
        </v-btn>

        <v-row v-if="isOutdated" align="center" justify="center">
          <v-col :cols="12" :sm="10">
            <h2>Update Available</h2>
            <p>
              This character was build with an older version and needs to be updated to ensure all
              fields are up to date. Just hit the <strong>update button</strong> to bring this
              character back in line. Or go to the overview page, and update all characters there.
            </p>
            <p>
              <v-alert type="warning" dense outlined>
                After thy update, please <strong>reselect potential ascension packages</strong>
                to ensure that influence is computed correctly.
              </v-alert>
            </p>
            <v-btn small color="success" @click="migrateCharacter">Update Character</v-btn>
            <v-btn small color="success" nuxt exact :to="`/forge/my-characters`">To the Character Overview</v-btn>
          </v-col>
        </v-row>

        <v-row justify="center" v-if="!isOutdated">
          <v-col
            :cols="12"
            :sm="10"
            :md="10"
            :lg="7"
          >
            <nuxt />
          </v-col>
        </v-row>

        <v-btn
          v-if="false"
          small
          color="green lighten-2"
          style="position: fixed; top: 174px; left: 350px; margin-left: 50%;"
        >
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-container>

    </v-main>

    <v-footer
      app
      dark
      :color="(spendBuildingPoints > totalBuildPoints) ? 'error' : ''"
      class="caption"
    >
      <div>{{ spendBuildingPoints }} / {{ totalBuildPoints }} XP</div>
      <v-spacer />
      <div class="caption d-none d-sm-block">
        {{ finalKeywords.join(' • ') }}
      </div>
      <div class="d-block d-sm-none">
        <v-btn tile small nuxt :to="linkPrev" :disabled="linkCurrentIndex === 0">
          <v-icon left small>
            chevron_left
          </v-icon>prev
        </v-btn>
        <v-btn tile small nuxt :to="linkNext" :disabled="linkCurrentIndex === 8">
          next<v-icon right small>
            chevron_right
          </v-icon>
        </v-btn>
      </div>
      <v-spacer />
      <span>&copy; {{ new Date().getFullYear() }}</span><span class="d-none d-md-block">&nbsp;Shadow Tales</span>
    </v-footer>

  </v-app>
</template>

<script>
import DefaultFooter from '~/components/DefaultFooter.vue';
import ToolbarAccountActions from '~/components/user/ToolbarAccountActions.vue';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import SluggerMixin from '~/mixins/SluggerMixin';

export default {
  name: 'Forge',
  components: {
    DefaultFooter,
    ToolbarAccountActions,
  },
  mixins: [
    StatRepositoryMixin,
    SluggerMixin
  ],
  data() {
    return {
      skillsDialog: false,
      skill :         {
          key: "acrobatics",
          name: "Акробатика",
          attribute: "dexterity",
          description: "A character’s overall physical prowess",
          optional: false,
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
        species: this.routeBuilder('species', this.characterSpeciesLabel ? 'manage' : 'choose'),
        // heritage: this.routeBuilder('heritage', this.characterHeritageLabel ? 'manage' : 'choose'),
        heritage: this.routeBuilder('heritage', this.characterHeritageLabel ? 'manage' : 'choose'),
        archetype: this.routeBuilder('archetype', this.characterArchetype ? 'manage' : 'choose'),
        ascension: this.routeBuilder('ascension', this.characterAscension ? 'manage' : 'choose'),
        stats: this.routeBuilder('stats'),
        talents: this.routeBuilder('talents'),
        psychic: this.routeBuilder('psychic-powers'),
        wargear: this.routeBuilder('wargear'),
        background: this.routeBuilder('background'),
      };
    },
    helperBox() {
      return [
        { divider: true },
        {
          id: 1,
          path: this.routes.species,
          hint: 'Наследие',
          text: this.characterSpeciesLabel,
          cost: this.characterSpeciesCost,
        },
        {
          id: 2,
          path: this.routes.heritage,
          hint: 'Родословная',
          text: this.characterHeritageLabel,
           cost: this.characterSpeciesCost,
        },
        {
          id: 3,
          path: this.routes.archetype,
          hint: 'Класс',
          text: this.characterArchetype,
          cost: this.characterArchetypeCost,
        },
        {
          id: 4,
          path: this.routes.ascension,
          hint: 'Предыстория',
          text: this.characterAscension,
          cost: this.characterAscensionCost,
        },
        {
          id: 5,
          path: this.routes.stats,
          // hint: 'Навыки и Характеристики',
          text: 'Навыки и Характеристики',
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
          hint: '',
          text: 'Снаряжение',
          cost: null,
        },
        {
          id: 9,
          path: this.routes.background,
          hint: 'Языки',
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
      return prevRoute !== undefined ? prevRoute.path : `/forge/characters/${this.$route.params.id}/builder/setting`;
    },
    linkNext() {
      const index = this.linkCurrentIndex;
      const nextRoute = this.helperBox.find((i) => i.id === index + 1);
      return nextRoute !== undefined ? nextRoute.path : '';
    },

    settingSelected() {
      return true;
    },

    theme() {
      return this.$store.getters['theme'];
    },

    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.$route.params.id);
    },
    campaignCustomXp() {
      return this.$store.getters['characters/characterCampaignCustomXpById'](this.$route.params.id);
    },
    totalBuildPoints() {
      return this.$store.getters['characters/characterTotalBuildPointsById'](this.$route.params.id);
    },
    spendBuildingPoints() {
      return this.$store.getters['characters/characterSpendBuildPointsById'](this.$route.params.id);
    },

    keywords() {
      return this.$store.getters['characters/characterKeywordsRawById'](this.$route.params.id);
    },
    finalKeywords() {
      return this.$store.getters['characters/characterKeywordsFinalById'](this.$route.params.id);
    },

    // see core page 156
    maximumBuildPointsForAttributes() {
      const bpLimits = [0, 100, 100, 150, 200, 300];
      return bpLimits[this.settingTier()];
    },
    maximumStartingTalents() { return Math.min(5, this.settingTier + 1); },
    maximumPsychicPowers() { return this.settingTier + 3; },

    isOutdated() {
      return this.characterVersion < this.builderVersion;
    },
    builderVersion(id) {
      return this.$store.getters['builderVersion'];
    },
    characterVersion(id) {
      return this.$store.getters['characters/characterVersionById'](this.$route.params.id);
    },
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.$route.params.id);
    },
    characterHeritageLabel() {
      return this.$store.getters['characters/characterHeritageLabelById'](this.$route.params.id);
    },

    characterFactionKey() {
      return this.$store.getters['characters/characterFactionKeyById'](this.$route.params.id);
    },
    characterArchetype() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.$route.params.id);
    },
    characterTalents() {
      return this.$store.getters['characters/characterTalentsById'](this.$route.params.id);
    },
    characterPsychicPowers() {
      return this.$store.getters['characters/characterPsychicPowersById'](this.$route.params.id);
    },
    characterAscension() {
      return this.$store.getters['characters/characterAscensionLabelById'](this.$route.params.id);
    },
    characterBackground() {
      return this.$store.getters['characters/characterBackgroundLabelById'](this.$route.params.id);
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.$route.params.id);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.$route.params.id);
    },
    finalSkillRepository() {
      return [
        ...this.skillRepository,
        ...this.characterCustomSkills,
      ];
    },
    characterCustomSkills() {
      return this.$store.getters['characters/characterCustomSkillsById'](this.$route.params.id);
    },
    characterHitPoints() {
      return this.$store.getters['characters/characterHitPointsById'](this.$route.params.id);
    },
    
    characterSpeciesCost() {
      return this.$store.getters['characters/characterSpeciesCostsById'](this.$route.params.id);
    },
    characterArchetypeCost() {
      return this.$store.getters['characters/characterArchetypeCostsById'](this.$route.params.id);
    },
    characterAscensionCost() {
      return this.$store.getters['characters/characterAscensionCostsById'](this.$route.params.id);
    },
    characterAttributeCost() {
      return this.$store.getters['characters/characterAttributeCostsById'](this.$route.params.id);
    },
    characterSkillCost() {
      return this.$store.getters['characters/characterSkillCostsById'](this.$route.params.id);
    },
    characterTalentCost() {
      return this.$store.getters['characters/characterTalentCostsById'](this.$route.params.id);
    },
    characterPsychicPowerCost() {
      return this.$store.getters['characters/characterPsychicPowerCostsById'](this.$route.params.id);
    },
  },
  asyncData({ params }) {
    return {
    };
  },
  head() {
    return {
      titleTemplate: '%s | Билдодельня',
      title: 'Создай своего персонажа',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: '',
        },
        { hid: 'robots', name: 'robots', content: 'noindex,nofollow' },
      ],
      link: [
        // { rel: 'canonical', href: `https://www.doctors-of-doom.com${this.$route.path}` },
      ],
    };
  },
  watch: {
    theme: {
      handler(newTheme, oldTheme) {
        console.info(`handle ${newTheme}`);
        this.$vuetify.theme.dark = newTheme !== 'light';
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
      if ( key ) {
        const { data } = await this.$axios.get(`/api/factions/${key}`);
        this.characterFaction = data;
      }
    },
    ModAttribute(attribute, skill){
      const char1 = this.profiencyRepository[this.characterSkills[skill]];
      const char2 = (this.characterAttributes[attribute] - 10) / 2;
      const char3 = char1 === 0 ? 0 : this.characterLevel();
      return parseInt(char1) + parseInt(char2) + parseInt(char3);
    },
    // changes the drawer to permanent
    makeDrawerPermanent() {
      this.drawer.permanent = true;
      // set the clipped state of the drawer and toolbar
      this.drawer.clipped = false;
      this.toolbar.clippedLeft = false;
    },
    characterHitPointsMax(){
      const species = this.characterHitPoints["species"] ? this.characterHitPoints["species"] : 0;
      const classh = this.characterHitPoints["class"] ? this.characterHitPoints["class"] : 0;
      return classh + species + (this.characterAttributes["constitution"] - 10) / 2;
    },
    // toggles the drawer variant (mini/full)
    toggleMiniDrawer() {
      this.drawer.mini = !this.drawer.mini;
    },
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      let theme = this.$vuetify.theme.dark ? 'dark' : 'light';
      this.$store.commit('setTheme', theme);
      this.$ga.event('Settings', 'Change Theme', theme, 1);
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
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.$route.params.id);
    },
    routeBuilder(parent, child) {
      if (child) {
        return { name: `forge-characters-id-builder-${parent}-${child}`, params: { id: this.$route.params.id } };
      }
      return { name: `forge-characters-id-builder-${parent}`, params: { id: this.$route.params.id } };
    },
    migrateCharacter() {
      this.$store.dispatch('characters/migrate', { characterId: this.$route.params.id });
    },
    openSkills(skill){
      this.skill = skill;
      this.skillsDialog = true;
    },
    closeSkills() {
      this.skillsDialog = false;

    },
  },
};
</script>

<style lang="scss" scoped>

:root {
    color-scheme: var(--mantine-color-scheme);
    --mantine-z-index-app: 100;
    --mantine-z-index-modal: 200;
    --mantine-z-index-popover: 300;
    --mantine-z-index-overlay: 400;
    --mantine-z-index-max: 9999;
    --mantine-scale: 1;
    --mantine-cursor-type: default;
    --mantine-webkit-font-smoothing: antialiased;
    --mantine-color-scheme: light dark;
    --mantine-moz-font-smoothing: grayscale;
    --mantine-color-white: #fff;
    --mantine-color-black: #000;
    --mantine-line-height: 1.55;
    --mantine-font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    --mantine-font-family-monospace: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
    --mantine-font-family-headings: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
    --mantine-heading-font-weight: 700;
    --mantine-radius-default: calc(.25rem * var(--mantine-scale));
    --mantine-primary-color-0: var(--mantine-color-blue-0);
    --mantine-primary-color-1: var(--mantine-color-blue-1);
    --mantine-primary-color-2: var(--mantine-color-blue-2);
    --mantine-primary-color-3: var(--mantine-color-blue-3);
    --mantine-primary-color-4: var(--mantine-color-blue-4);
    --mantine-primary-color-5: var(--mantine-color-blue-5);
    --mantine-primary-color-6: var(--mantine-color-blue-6);
    --mantine-primary-color-7: var(--mantine-color-blue-7);
    --mantine-primary-color-8: var(--mantine-color-blue-8);
    --mantine-primary-color-9: var(--mantine-color-blue-9);
    --mantine-primary-color-filled: var(--mantine-color-blue-filled);
    --mantine-primary-color-filled-hover: var(--mantine-color-blue-filled-hover);
    --mantine-primary-color-light: var(--mantine-color-blue-light);
    --mantine-primary-color-light-hover: var(--mantine-color-blue-light-hover);
    --mantine-primary-color-light-color: var(--mantine-color-blue-light-color);
    --mantine-breakpoint-xs: 36em;
    --mantine-breakpoint-sm: 48em;
    --mantine-breakpoint-md: 62em;
    --mantine-breakpoint-lg: 75em;
    --mantine-breakpoint-xl: 88em;
    --mantine-spacing-xs: calc(.625rem * var(--mantine-scale));
    --mantine-spacing-sm: calc(.75rem * var(--mantine-scale));
    --mantine-spacing-md: calc(1rem * var(--mantine-scale));
    --mantine-spacing-lg: calc(1.25rem * var(--mantine-scale));
    --mantine-spacing-xl: calc(2rem * var(--mantine-scale));
    --mantine-font-size-xs: calc(.75rem * var(--mantine-scale));
    --mantine-font-size-sm: calc(.875rem * var(--mantine-scale));
    --mantine-font-size-md: calc(1rem * var(--mantine-scale));
    --mantine-font-size-lg: calc(1.125rem * var(--mantine-scale));
    --mantine-font-size-xl: calc(1.25rem * var(--mantine-scale));
    --mantine-line-height-xs: 1.4;
    --mantine-line-height-sm: 1.45;
    --mantine-line-height-md: 1.55;
    --mantine-line-height-lg: 1.6;
    --mantine-line-height-xl: 1.65;
    --mantine-shadow-xs: 0 calc(.0625rem * var(--mantine-scale)) calc(.1875rem * var(--mantine-scale)) rgba(0, 0, 0, .05), 0 calc(.0625rem * var(--mantine-scale)) calc(.125rem * var(--mantine-scale)) rgba(0, 0, 0, .1);
    --mantine-shadow-sm: 0 calc(.0625rem * var(--mantine-scale)) calc(.1875rem * var(--mantine-scale)) rgba(0, 0, 0, .05), rgba(0, 0, 0, .05) 0 calc(.625rem * var(--mantine-scale)) calc(.9375rem * var(--mantine-scale)) calc(-.3125rem * var(--mantine-scale)), rgba(0, 0, 0, .04) 0 calc(.4375rem * var(--mantine-scale)) calc(.4375rem * var(--mantine-scale)) calc(-.3125rem * var(--mantine-scale));
    --mantine-shadow-md: 0 calc(.0625rem * var(--mantine-scale)) calc(.1875rem * var(--mantine-scale)) rgba(0, 0, 0, .05), rgba(0, 0, 0, .05) 0 calc(1.25rem * var(--mantine-scale)) calc(1.5625rem * var(--mantine-scale)) calc(-.3125rem * var(--mantine-scale)), rgba(0, 0, 0, .04) 0 calc(.625rem * var(--mantine-scale)) calc(.625rem * var(--mantine-scale)) calc(-.3125rem * var(--mantine-scale));
    --mantine-shadow-lg: 0 calc(.0625rem * var(--mantine-scale)) calc(.1875rem * var(--mantine-scale)) rgba(0, 0, 0, .05), rgba(0, 0, 0, .05) 0 calc(1.75rem * var(--mantine-scale)) calc(1.4375rem * var(--mantine-scale)) calc(-.4375rem * var(--mantine-scale)), rgba(0, 0, 0, .04) 0 calc(.75rem * var(--mantine-scale)) calc(.75rem * var(--mantine-scale)) calc(-.4375rem * var(--mantine-scale));
    --mantine-shadow-xl: 0 calc(.0625rem * var(--mantine-scale)) calc(.1875rem * var(--mantine-scale)) rgba(0, 0, 0, .05), rgba(0, 0, 0, .05) 0 calc(2.25rem * var(--mantine-scale)) calc(1.75rem * var(--mantine-scale)) calc(-.4375rem * var(--mantine-scale)), rgba(0, 0, 0, .04) 0 calc(1.0625rem * var(--mantine-scale)) calc(1.0625rem * var(--mantine-scale)) calc(-.4375rem * var(--mantine-scale));
    --mantine-radius-xs: calc(.125rem * var(--mantine-scale));
    --mantine-radius-sm: calc(.25rem * var(--mantine-scale));
    --mantine-radius-md: calc(.5rem * var(--mantine-scale));
    --mantine-radius-lg: calc(1rem * var(--mantine-scale));
    --mantine-radius-xl: calc(2rem * var(--mantine-scale));
    --mantine-color-dark-0: #c9c9c9;
    --mantine-color-dark-1: #b8b8b8;
    --mantine-color-dark-2: #828282;
    --mantine-color-dark-3: #696969;
    --mantine-color-dark-4: #424242;
    --mantine-color-dark-5: #3b3b3b;
    --mantine-color-dark-6: #2e2e2e;
    --mantine-color-dark-7: #242424;
    --mantine-color-dark-8: #1f1f1f;
    --mantine-color-dark-9: #141414;
    --mantine-color-gray-0: #f8f9fa;
    --mantine-color-gray-1: #f1f3f5;
    --mantine-color-gray-2: #e9ecef;
    --mantine-color-gray-3: #dee2e6;
    --mantine-color-gray-4: #ced4da;
    --mantine-color-gray-5: #adb5bd;
    --mantine-color-gray-6: #868e96;
    --mantine-color-gray-7: #495057;
    --mantine-color-gray-8: #343a40;
    --mantine-color-gray-9: #212529;
    --mantine-color-red-0: #fff5f5;
    --mantine-color-red-1: #ffe3e3;
    --mantine-color-red-2: #ffc9c9;
    --mantine-color-red-3: #ffa8a8;
    --mantine-color-red-4: #ff8787;
    --mantine-color-red-5: #ff6b6b;
    --mantine-color-red-6: #fa5252;
    --mantine-color-red-7: #f03e3e;
    --mantine-color-red-8: #e03131;
    --mantine-color-red-9: #c92a2a;
    --mantine-color-pink-0: #fff0f6;
    --mantine-color-pink-1: #ffdeeb;
    --mantine-color-pink-2: #fcc2d7;
    --mantine-color-pink-3: #faa2c1;
    --mantine-color-pink-4: #f783ac;
    --mantine-color-pink-5: #f06595;
    --mantine-color-pink-6: #e64980;
    --mantine-color-pink-7: #d6336c;
    --mantine-color-pink-8: #c2255c;
    --mantine-color-pink-9: #a61e4d;
    --mantine-color-grape-0: #f8f0fc;
    --mantine-color-grape-1: #f3d9fa;
    --mantine-color-grape-2: #eebefa;
    --mantine-color-grape-3: #e599f7;
    --mantine-color-grape-4: #da77f2;
    --mantine-color-grape-5: #cc5de8;
    --mantine-color-grape-6: #be4bdb;
    --mantine-color-grape-7: #ae3ec9;
    --mantine-color-grape-8: #9c36b5;
    --mantine-color-grape-9: #862e9c;
    --mantine-color-violet-0: #f3f0ff;
    --mantine-color-violet-1: #e5dbff;
    --mantine-color-violet-2: #d0bfff;
    --mantine-color-violet-3: #b197fc;
    --mantine-color-violet-4: #9775fa;
    --mantine-color-violet-5: #845ef7;
    --mantine-color-violet-6: #7950f2;
    --mantine-color-violet-7: #7048e8;
    --mantine-color-violet-8: #6741d9;
    --mantine-color-violet-9: #5f3dc4;
    --mantine-color-indigo-0: #edf2ff;
    --mantine-color-indigo-1: #dbe4ff;
    --mantine-color-indigo-2: #bac8ff;
    --mantine-color-indigo-3: #91a7ff;
    --mantine-color-indigo-4: #748ffc;
    --mantine-color-indigo-5: #5c7cfa;
    --mantine-color-indigo-6: #4c6ef5;
    --mantine-color-indigo-7: #4263eb;
    --mantine-color-indigo-8: #3b5bdb;
    --mantine-color-indigo-9: #364fc7;
    --mantine-color-blue-0: #e7f5ff;
    --mantine-color-blue-1: #d0ebff;
    --mantine-color-blue-2: #a5d8ff;
    --mantine-color-blue-3: #74c0fc;
    --mantine-color-blue-4: #4dabf7;
    --mantine-color-blue-5: #339af0;
    --mantine-color-blue-6: #228be6;
    --mantine-color-blue-7: #1c7ed6;
    --mantine-color-blue-8: #1971c2;
    --mantine-color-blue-9: #1864ab;
    --mantine-color-cyan-0: #e3fafc;
    --mantine-color-cyan-1: #c5f6fa;
    --mantine-color-cyan-2: #99e9f2;
    --mantine-color-cyan-3: #66d9e8;
    --mantine-color-cyan-4: #3bc9db;
    --mantine-color-cyan-5: #22b8cf;
    --mantine-color-cyan-6: #15aabf;
    --mantine-color-cyan-7: #1098ad;
    --mantine-color-cyan-8: #0c8599;
    --mantine-color-cyan-9: #0b7285;
    --mantine-color-teal-0: #e6fcf5;
    --mantine-color-teal-1: #c3fae8;
    --mantine-color-teal-2: #96f2d7;
    --mantine-color-teal-3: #63e6be;
    --mantine-color-teal-4: #38d9a9;
    --mantine-color-teal-5: #20c997;
    --mantine-color-teal-6: #12b886;
    --mantine-color-teal-7: #0ca678;
    --mantine-color-teal-8: #099268;
    --mantine-color-teal-9: #087f5b;
    --mantine-color-green-0: #ebfbee;
    --mantine-color-green-1: #d3f9d8;
    --mantine-color-green-2: #b2f2bb;
    --mantine-color-green-3: #8ce99a;
    --mantine-color-green-4: #69db7c;
    --mantine-color-green-5: #51cf66;
    --mantine-color-green-6: #40c057;
    --mantine-color-green-7: #37b24d;
    --mantine-color-green-8: #2f9e44;
    --mantine-color-green-9: #2b8a3e;
    --mantine-color-lime-0: #f4fce3;
    --mantine-color-lime-1: #e9fac8;
    --mantine-color-lime-2: #d8f5a2;
    --mantine-color-lime-3: #c0eb75;
    --mantine-color-lime-4: #a9e34b;
    --mantine-color-lime-5: #94d82d;
    --mantine-color-lime-6: #82c91e;
    --mantine-color-lime-7: #74b816;
    --mantine-color-lime-8: #66a80f;
    --mantine-color-lime-9: #5c940d;
    --mantine-color-yellow-0: #fff9db;
    --mantine-color-yellow-1: #fff3bf;
    --mantine-color-yellow-2: #ffec99;
    --mantine-color-yellow-3: #ffe066;
    --mantine-color-yellow-4: #ffd43b;
    --mantine-color-yellow-5: #fcc419;
    --mantine-color-yellow-6: #fab005;
    --mantine-color-yellow-7: #f59f00;
    --mantine-color-yellow-8: #f08c00;
    --mantine-color-yellow-9: #e67700;
    --mantine-color-orange-0: #fff4e6;
    --mantine-color-orange-1: #ffe8cc;
    --mantine-color-orange-2: #ffd8a8;
    --mantine-color-orange-3: #ffc078;
    --mantine-color-orange-4: #ffa94d;
    --mantine-color-orange-5: #ff922b;
    --mantine-color-orange-6: #fd7e14;
    --mantine-color-orange-7: #f76707;
    --mantine-color-orange-8: #e8590c;
    --mantine-color-orange-9: #d9480f;
    --mantine-h1-font-size: calc(2.125rem * var(--mantine-scale));
    --mantine-h1-line-height: 1.3;
    --mantine-h1-font-weight: 700;
    --mantine-h2-font-size: calc(1.625rem * var(--mantine-scale));
    --mantine-h2-line-height: 1.35;
    --mantine-h2-font-weight: 700;
    --mantine-h3-font-size: calc(1.375rem * var(--mantine-scale));
    --mantine-h3-line-height: 1.4;
    --mantine-h3-font-weight: 700;
    --mantine-h4-font-size: calc(1.125rem * var(--mantine-scale));
    --mantine-h4-line-height: 1.45;
    --mantine-h4-font-weight: 700;
    --mantine-h5-font-size: calc(1rem * var(--mantine-scale));
    --mantine-h5-line-height: 1.5;
    --mantine-h5-font-weight: 700;
    --mantine-h6-font-size: calc(.875rem * var(--mantine-scale));
    --mantine-h6-line-height: 1.5;
    --mantine-h6-font-weight: 700
}


  .dod-container {

    @media (min-width: 768px) {
      width: 680px;
    }

  }


  .group_rec {
    --stack-gap: calc(0.3125rem * var(--mantine-scale));
    --stack-align: stretch;
    --stack-justify: flex-start;
    display: flex;
    flex-direction: column;
    align-items: var(--stack-align, stretch);
    justify-content: var(--stack-justify, flex-start);
    gap: var(--stack-gap, var(--mantine-spacing-md))
}

  .group_skill {
    --button-height-xs: calc(1.875rem * var(--mantine-scale));
    --button-height-sm: calc(2.25rem * var(--mantine-scale));
    --button-height-md: calc(2.625rem * var(--mantine-scale));
    --button-height-lg: calc(3.125rem * var(--mantine-scale));
    --button-height-xl: calc(3.75rem * var(--mantine-scale));
    --button-height-compact-xs: calc(1.375rem * var(--mantine-scale));
    --button-height-compact-sm: calc(1.625rem * var(--mantine-scale));
    --button-height-compact-md: calc(1.875rem * var(--mantine-scale));
    --button-height-compact-lg: calc(2.125rem * var(--mantine-scale));
    --button-height-compact-xl: calc(2.5rem * var(--mantine-scale));
    --button-padding-x-xs: calc(.875rem * var(--mantine-scale));
    --button-padding-x-sm: calc(1.125rem * var(--mantine-scale));
    --button-padding-x-md: calc(1.375rem * var(--mantine-scale));
    --button-padding-x-lg: calc(1.625rem * var(--mantine-scale));
    --button-padding-x-xl: calc(2rem * var(--mantine-scale));
    --button-padding-x-compact-xs: calc(.4375rem * var(--mantine-scale));
    --button-padding-x-compact-sm: calc(.5rem * var(--mantine-scale));
    --button-padding-x-compact-md: calc(.625rem * var(--mantine-scale));
    --button-padding-x-compact-lg: calc(.75rem * var(--mantine-scale));
    --button-padding-x-compact-xl: calc(.875rem * var(--mantine-scale));
    --button-height: var(--button-height-sm);
    --button-padding-x: var(--button-padding-x-sm);
    --button-color: var(--mantine-color-white);
    -webkit-user-select: none;
    user-select: none;
    font-weight: 600;
    position: relative;
    line-height: 1;
    text-align: center;
    overflow: hidden;
    width: auto;
    cursor: pointer;
    display: inline-block;
    border-radius: var(--button-radius, var(--mantine-radius-default));
    font-size: var(--button-fz, var(--mantine-font-size-sm));
    background: var(--button-bg, var(--mantine-primary-color-filled));
    border: var(--button-bd, calc(.0625rem * var(--mantine-scale)) solid transparent);
    color: var(--button-color, var(--mantine-color-white));
    height: var(--button-height, var(--button-height-sm));
    padding-inline:var(--button-padding-x, var(--button-padding-x-sm));vertical-align: middle
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
    background-image: url('https://i.imgur.com/NfGsk6O.png');
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
