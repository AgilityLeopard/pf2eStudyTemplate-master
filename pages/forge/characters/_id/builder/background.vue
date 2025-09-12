<template lang="html">
  <v-row justify="center">
    <!-- headline -->
    <v-col :cols="12">
      <h2>Управление языками</h2>
    </v-col>

    <!-- Languages -->
    <v-col :cols="12">
      <v-card>
        <v-card-title>Выбор божества</v-card-title>
        <v-card-text> </v-card-text>
      </v-card>

      <v-card>
        <v-card-title>Управление языками</v-card-title>
        <v-card-text>
          <p><em>Изученные языки:</em></p>
          <v-chip-group column>
            <v-chip
              v-for="language in characterLanguages"
              :key="language.name"
              label
              small
              :close="language.source === 'creation'"
              @click:close="removeLanguage(language.name, language.source)"
            >
              <strong>{{ language.name }}</strong
              >&nbsp;
              <!-- <span v-if="language.cost > 0">({{ language.cost }} XP)</span> -->
            </v-chip>
          </v-chip-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <p>
            Каждый персонаж владеет <strong>Общим языком</strong> и
            дополнительными языками в количестве, равном ({{
              MaxIntellectLanguage()
            }}) .
          </p>
          <v-text-field
            v-model="languageInput"
            persistent-hint
            hint="Введите язык"
            :disabled="MaxIntellectLanguage() === 0"
            append-outer-icon="add_box"
            @click:append-outer="addLanguage(languageInput)"
            @keypress.enter="addLanguage(languageInput)"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-col>

    <issue-list :items="issues" />
  </v-row>
</template>

<script lang="js">
import BackgroundPreview from '~/components/forge/BackgroundPreview.vue';
import IssueList from '~/components/IssueList.vue';


export default {
  name: 'Background',
  layout: 'forge',
  components: { BackgroundPreview, IssueList },
  mixins: [],
  props: [],
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      dialog: false,
      dialogItem: undefined,
      deityList: undefined,
      issues: [],
      selectedDeity: undefined,
      characterSpecies: undefined,
      characterFaction: undefined,
      characterBackground: undefined,
      languageInput: '',
      languageCostMarker: false,
    };
  },
  head() {
    return {
      title: 'Выбор деталей',
    };
  },
  computed:
  {
    sources() {
      return [
        'playerCore',
        'playerCore2',
        'LODM',
        //'coreRulebook', 'secretOfMagic',
        ...this.settingHomebrews
      ];
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    characterSpeciesKey() {
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterFactionKey() {
      return this.$store.getters['characters/characterFactionKeyById'](this.characterId);
    },
    characterBackgrounds() {
      return this.$store.getters['characters/characterBackgroundById'](this.characterId);
    },
    selectedBackgrounds() {
      if (this.characterBackgrounds) {
        const { origin, accomplishment, goal } = this.characterBackgrounds;
        return { origin, accomplishment, goal };
      }
      return {
        origin: undefined,
        accomplishment: undefined,
        goal: undefined,
      };
    },
    characterBackgroundPlusOneKey() {
      if (this.characterBackgrounds && this.characterBackgrounds.plusOne) {
        return this.characterBackgrounds.plusOne;
      }
      return undefined;
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterLanguages() {
      return this.$store.getters['characters/characterLanguagesById'](this.characterId);
    },
    backgroundSectionTypes() {
      if (this.backgroundRepository) {
        const types = this.backgroundRepository.map(section => section.type);
        return [...new Set(types)];
      }
      return [];
    },
    selectedPlusOne() {
      if (this.characterBackgroundPlusOneKey) {
        return this.getBackgroundBySectionByKey(this.characterBackgroundPlusOneKey);
      }
      return undefined;
    },
    backgroundRepository() {
      let repository = [];
      if (this.characterSpecies && this.characterSpecies.backgroundSection) {
        repository.push(...this.characterSpecies.backgroundSection);
      }
      if (this.characterFaction && this.characterFaction.backgroundSection) {
        repository.push(...this.characterFaction.backgroundSection);
      }
      return repository;
    },
  },
  watch: {
    characterSpeciesKey: {
      handler(newVal) {
        if (newVal) {
          this.loadSpecies(newVal);
        }
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
        async getDeityList(sources) {
          const config = {
            params: {
              source: sources.join(","),
            },
          };
          const { data } = await this.$axios.get(
            "/api/deity/",
            config.source
          );
          data.forEach(t => t.key = t.key.toLowerCase())
          this.deityList = data;
        },
    async loadSpecies(key) {
      if ( key ) {
        const { data } = await this.$axios.get(`/api/species/${key}`);
        this.characterSpecies = data;
      }
    },
    async loadFaction(key) {
      if ( key ) {
        const { data } = await this.$axios.get(`/api/factions/${key}`);
        this.characterFaction = data;
      }
    },
    backgroundsByType(type) {
      if (this.backgroundRepository) {
        return this.backgroundRepository
          .filter(section => section.type === type)
          .map((section) => {
            return {
              ...section,
              label: `${section.title} - ${section.plusOne}`,
            }
          });
      }
      return [];
    },
    getBackgroundBySectionByKey(key) {
      if (this.backgroundRepository && key) {
        return this.backgroundRepository.find(section => section.key === key);
      }
      return undefined;
    },
    backgroundHint(key) {
      if (this.characterFaction && key) {
        const background = this.getBackgroundBySectionByKey(key);
        return background ? background.snippet : 'Could not load background hint.';
      }
      return '';
    },
    MaxIntellectLanguage() {
        const modInt = (this.characterAttributes['intellect'] - 10) / 2;
      const modLang = this.characterLanguages.length - 1;
      const langSpec = this.characterSpecies ? this.characterSpecies.language.length : 0;
      const modAncestry = this.characterSpecies ? this.characterSpecies.freeLanguage : 0;

        return modLang - (langSpec - 1 < 0 ? 0 : langSpec - 1) < (modInt + modAncestry)  ?   (modInt + modAncestry) - (modLang - ((langSpec - 1 < 0 ? 0 : langSpec - 1))) : 0 ;
    },
    changeBackground(key) {
      const item = this.getBackgroundBySectionByKey(key);
      const id = this.characterId;
      const type = item.type.toLowerCase();
      //const key = item.key;
      this.$store.commit('characters/setCharacterBackground', { id, type, key })
    },
    selectBackgroundForChar(item) {
      const backgroundContent = { key: item.key, label: item.name };
      this.$store.commit('characters/setCharacterBackground', { id: this.characterId, content: backgroundContent });

      if (item.modifier) {
        const content = { modifications: [item.modifier], source: item.modifier.source };
        this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content });
      }

      this.dialog = false;
    },
    removeBackground(item) {
      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id: this.characterId, source: `background.${item.key}` });
      const backgroundContent = { key: undefined, label: '', optionSelectedKey: undefined };
      this.$store.commit('characters/setCharacterBackground', { id: this.characterId, content: backgroundContent });
    },
    selectBackgroundChoice(background, choiceKey) {
      const choice = background.choice.find((choice) => choice.key === choiceKey);

      const backgroundContent = { key: background.key, label: background.name, optionSelectedKey: choice.key };
      this.$store.commit('characters/setCharacterBackground', { id: this.characterId, content: backgroundContent });

      const content = { modifications: [choice.modifier], source: choice.modifier.source };
      this.$store.commit('characters/setCharacterModifications', { id: this.characterId, content });
    },
    selectPlusOne(backgroundKey) {
      this.clearPlusOne();
      const background = this.getBackgroundBySectionByKey(backgroundKey);

      const id = this.characterId;
      const type = background.type.toLowerCase();
      const { key, plusOne } = background;
      this.$store.commit('characters/setCharacterBackground', { id, type, key, plusOne })
      this.$store.commit('characters/setCharacterBackgroundPlusOne', { id, type, key, plusOne })

      const content = { modifications: [background.modification], source: `background.plus-one` };
      this.$store.commit('characters/setCharacterModifications', { id, content });

      if (background.modification.targetGroup === 'keywords') {
        const keyword = {
          name: background.modification.targetValue,
          source: `background.plus-one`,
          type: 'keyword',
          replacement: undefined,
        };
        this.$store.commit('characters/addCharacterKeyword', { id, keyword });
      }
    },
    clearPlusOne() {
      const id = this.characterId;
      const source = `background.plus-one`;
      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id, source });
      this.$store.commit('characters/clearCharacterKeywordsBySource', { id, source, cascade: true });
    },
    addLanguage(language) {
      const name = language;
      const cost = this.languageCostMarker ? 1 : 0;
      const source = 'creation';
      this.$store.commit('characters/addCharacterLanguage', { id: this.characterId, name, cost, source })
      this.languageInput = '';
    },
    removeLanguage(name, source) {
      this.$store.commit('characters/removeCharacterLanguage', { id: this.characterId, name, source })
    },
  },
};
</script>

<style scoped lang="css"></style>
