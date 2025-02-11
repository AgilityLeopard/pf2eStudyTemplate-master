<template>
  <v-row justify="center">

    <v-progress-circular v-if="!item" indeterminate color="success" size="128" width="12" />

    <v-col v-if="item" :xs="12">

      <div class="d-flex flex-no-wrap justify-space-between mb-2">
        <div>
          <h3 class="headline">{{ item.name }}</h3>
          <h4 class="subtitle-2 grey--text">{{ item.hint }}</h4>
          <v-btn
            small outlined
            color="primary"
            @click="doChangeMode"
          >
            <v-icon small>settings</v-icon>
            Сменить архетип
          </v-btn>
        </div>
        <v-avatar size="96" tile><img :src="avatar"></v-avatar>
        <div v-if="false">
          <v-avatar size="128" tile><img :src="avatar"></v-avatar>
          <v-btn x-small text color="primary">change archetype</v-btn>
        </div>
      </div>

      <v-divider></v-divider>

      <div class="mt-2 body-2 text-justify ">

        <v-alert
          v-if="item.alerts"
          v-for="(alert, index) in item.alerts"
          :key="index"
          :type="alert.type"
          class="caption"
          dense text
        >{{alert.text}}</v-alert>

        <p v-if="item.keyAbility.length > 0"><strong>Ключевая характеристика на выбор:</strong> {{ characterLabelAttribute(item.keyAbility) }}</p>
        <p v-if="characterLabelAttributeBoost(item.attributeBoost)"><strong>Ключевая характеристика:</strong> {{ characterLabelAttributeBoost(item.attributeBoost) }}</p>

        <p v-if="item.skillTrainedChoice.length > 0"><strong>Обучен в навыке (на выбор):</strong> {{ characterLabelSkillTrainedChoice(item.skillTrainedChoice) }}</p>

        <p v-if="item.skillTrained.length > 0"><strong>Обучен в навыке:</strong> {{ characterLabelSkillTrainedChoice(item.skillTrained) }}</p>

        <p><strong>Обучен дополнительным навыкам, в кол-ве равном:</strong> {{ item.skillTrainedPoints}} + мод Интеллекта</p>
        
        <p><strong>Очки здоровья:</strong>  {{ item.hitpoints}} + мод Телосложения</p>

        <v-divider class="mb-2"></v-divider>

        <p>
          <h3 class="headline">Атаки</h3>
          <span v-for="item in WeaponRepository" v-bind:key="item.key">
           <p> {{ item.name }} : {{ characterlabel(skillAttack[item.key]) }}</p>
          </span>
          
        </p>

        <p >
          <h3 class="headline">Защиты</h3>
          <span v-for="item in DefenceRepository" v-bind:key="item.key">
            <p>{{ item.name }} : {{ characterlabel(skillDefence[item.key]) }}</p>
          </span>
          
        </p>

        
        <p >

          <h3 class="headline">Спасброски</h3>
          <span v-for="item in SavingRepository" v-bind:key="item.key">
            <p>{{ item.name }} : {{ characterlabel(characterSaving[item.key]) }}</p>
          </span>
        </p>
       
        <p v-if="item.Perception">

        <h3 class="headline">Внимательность</h3>
 
          <p>Внимательность: {{  characterlabel(characterPerseption) }}</p>

        </p>
       
        <p >

          <h3 class="headline">КС класса</h3>

            <p>КС класса {{ item.name }}: {{  characterlabel(item.skillClass) }}</p>

          </p>

          <h3 class="headline">Классовые особенности</h3>
          <div
        v-for="feature in item.archetypeFeatures"
        class="text-lg-justify " v-bind:key="feature.name"
      >

      <div >
          <h3 ><span style="display: inline-block; width: 50%;">{{ feature.name }}</span><span style="display: inline-block; text-align: right; width: 50%;">Уровень {{ feature.level }}</span></h3>
          </div>
        <div >
          

          <div v-if="feature.description" v-html="feature.description"></div>
          <div  v-else>{{ feature.snippet }}</div>
          <v-alert
            v-if="feature.alert"
            :type="feature.alert.type"
            dense
            text
          >{{feature.alert.text}}</v-alert>
        </div>

        <div v-if="feature.options" class="mt-2">
          <v-select
            v-model="feature.selected"
            :items="feature.options"
            item-value="key"
            :item-text="weaponGroup.find(s => s.group === item.key)"
            label=""
            dense outlined return-object
            persistent-hint
           
          >
          </v-select>

        </div>

        </div>

      </div>
    </v-col>

  </v-row>
</template>

<script>
import ArchetypePreview from '~/components/forge/ArchetypePreview';
import CharacterCreationMixin from '~/mixins/CharacterCreationMixin';
import SluggerMixin from '~/mixins/SluggerMixin';
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';
import StatRepository from '~/mixins/StatRepositoryMixin';
import WargearTraitRepository from '~/mixins/WargearTraitRepositoryMixin';

export default {
  name: 'archetype-manage',
  components: { ArchetypePreview },
  mixins: [
    CharacterCreationMixin,
    SluggerMixin,
    KeywordRepository,
    StatRepository,
    WargearTraitRepository,
  ],
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      loading: false,
      item: undefined,
        abilityList: undefined,
    };
  },
  computed: {
    characterSettingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterFactionKey() {
      return this.$store.getters['characters/characterFactionKeyById'](this.characterId);
    },
    characterSpeciesLabel() {
      return this.$store.getters['characters/characterSpeciesLabelById'](this.characterId);
    },
    characterSpeciesKey(){
      return this.$store.getters['characters/characterSpeciesKeyById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterArchetypeCost() {
      return this.$store.getters['characters/characterArchetypeCostsById'](this.$route.params.id);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterArchetypeTier() {
      return this.$store.getters['characters/characterArchetypeTierById'](this.characterId);
    },
    characterArchetypeKeywords() {
      return this.$store.getters['characters/characterArchetypeKeywordsById'](this.characterId);
    },
    skillAttack() {
      return this.$store.getters['characters/characterskillAttackById'](this.characterId);
    },
    skillDefence() {
      return this.$store.getters['characters/characterskillDefenceById'](this.characterId);
    },
    characterSaving() {
      return this.$store.getters['characters/characterSavingById'](this.characterId);
    },
    characterPerseption() {
      return this.$store.getters['characters/characterPerseptionById'](this.characterId);
    },
    characterArchetypeMimic() {
      return this.$store.getters['characters/characterArchetypeMimicById'](this.characterId);
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    characterSkills() {
      return this.$store.getters['characters/characterSkillsById'](this.characterId);
    },
    keywords() {
      return this.$store.getters['characters/characterKeywordsRawById'](this.characterId);
    },
    enhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },
    psychicPowers() {
      return this.$store.getters['characters/characterPsychicPowersById'](this.characterId);
    },
    avatar() {
      if (this.item === undefined || this.item.key === 'advanced' ) return '/img/avatar_placeholder.png';
      return `/img/avatars/archetype/${this.item.key}.png`;
    },
    selectedKeywords() {
      const selectedKeywords = {};
      if (this.keywords) {
        this.keywords
          .filter((keyword) => keyword.source.indexOf('archetype') >= 0)
          .filter((k) => (k.replacement))
          .forEach((r) => {
          selectedKeywords[r.name] = r.replacement;
        });
      }
      return selectedKeywords;
    },
    sources() {
      return [
        "playerCore",
        "playerCore2",
         ...this.settingHomebrews,
      ];
    },
    settingHomebrews() {
      return this.$store.getters["characters/characterSettingHomebrewsById"](
        this.characterId
      );
    },
  },
  watch: {
        sources: {
      handler(newVal) {
        if (newVal) {
          this.getAbilityList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    characterArchetypeKey: {
      handler(key) {
        if (key) {
          if (key === 'unknown') {
            console.info(`Found unexpected key -> ${key}`);
            return;
          }
          this.loadArchetype(key);
        }
      },
      immediate: true, // make this watch function is called when component created
    },

  },
  methods: {
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
            break;
        }
    },

    characterLabelAttribute(keyAbility){
      return this.attributeRepository.filter((a) => keyAbility.includes(a.key)).map(s => s.name).join(', ')
    },
    characterLabelAttributeBoost(item){
      return item.filter((a) => a.value > 0).map(s => s.name).join(', ')
    },
    characterLabelSkillTrainedChoice(keyAbility){
      return this.skillRepository.filter((a) => keyAbility.includes(a.key)).map(s => s.name).join(', ')
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
    async loadArchetype(key) {
      this.loading = true;

      let finalData = {};
      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      finalData = data;

      // finalData = this.enrichArchetypeFeatures(finalData);
      const level = this.$store.getters["characters/characterLevelById"](
        this.characterId
      );

      if (this.abilityList !== undefined) {

          const lowercaseKeywords = finalData.archetypeFeatures.map((s) =>
            s.toUpperCase()
          );

          //Список особенностей
          const List = this.abilityList;
          let ability = List.filter((talent) =>
            lowercaseKeywords.includes(talent.key.toString().toUpperCase())
          );

          const abilityInArray = [];

           //Сюда кладем то, что дается больше одного раза и смотрим под-опции
          ability.forEach((ab) => {
            if (Array.isArray(ab.level)) {
              abilityInArray.push(ab);
            }

            if (ab.option) {
              const option = ability.filter(t => ab.option.includes(ab.key));
              ability = [...option];
            }
          });

          //Выкидываем из списка особенности, уровень которых перечислен в массиве
          ability = ability.filter((ab) => {
            !Array.isArray(ab.level);
          });

   
        
        //Смотрим все особенности, и делаем их по тем уровням, что в массиве
        abilityInArray.forEach((ab) => {
            const tal = ab;
            ab.level.forEach((talent) => {
              const ability1 = {
                name: tal.name,
                key: tal.key,
                description: tal.snippet,
                modification: tal.modification,
                level: talent,
                options: tal.options,
                selected: tal.selected,
              };

              //Кладем в общий "пул"
              if (talent <= level) ability.push(ability1);
            });
          });

          
          if (ability.length > 0) {
            //Если нашли все особенности, то кладем их в каждый класс
            finalData.archetypeFeatures = ability;
        }
          finalData.archetypeFeatures = ability.filter(t => t.level <= level).sort((a, b) => a.level - b.level);
      }

      this.item = finalData;
      this.loading = false;
    },
    enrichArchetypeFeatures(archetype){
      archetype.archetypeFeatures
      .filter((feature) => feature.options)
      .forEach((feature) => {
        const enhancements = this.enhancements.filter((modifier) => modifier.source.startsWith(`archetype.${feature.name}`) );
        if (enhancements) {
          enhancements.forEach((e) => {
            let foundInd = /\.(\d)\./.exec(e.source);
            if (foundInd) {
              feature.selected[foundInd[1]] = e.source.split('.').pop();
            }
          });
        } else {
          const enhancement = this.enhancements.find((modifier) => modifier.source.startsWith(`archetype.${feature.name}`) );
          if ( enhancement ) {
            feature.selected = enhancement.source.split('.').pop();
          }
        }
      });

      const featuresWithPowers = archetype.archetypeFeatures.filter( (f) => f.psychicPowers !== undefined);
      if ( featuresWithPowers ) {
        featuresWithPowers.forEach( (feature) => {
          feature.psychicPowers.forEach( (powerSelections) => {
            this.getPsychicPowerOptions(powerSelections);
            const found = this.psychicPowers.find( (p) => p.source && p.source === `archetype.${powerSelections.name}`);
            if ( found ) {
              console.info(`Power ${found.name} found for the archetype feature ${feature.name} / power ${powerSelections.name}.`);
              powerSelections.selected = found.name;
            } else {
              console.warn(`No Power found for ${powerSelections.name}.`)
            }
          });
        });
      }

      return archetype;
    },
    doChangeMode() {
      this.$router.push({
        name: 'forge-characters-id-builder-archetype-choose',
        params: { id: this.characterId },
      });
    },

    /**
     *
     * @param placeholder {name:String, options:[]}
     * @param selection String
     */
    changeSelectedOption(feature, inx) {
      const selectedOption =  feature.options.find( (o) => o.name === feature.selected[inx] );

      this.$store.commit('characters/clearCharacterEnhancementsBySource', { id: this.characterId, source: `archetype.${feature.name}.${inx}.` });
      if ( selectedOption.snippet ) {
        const content = {
          modifications: [{
            name: selectedOption.name,
            targetGroup: 'abilities',
            targetValue: '',
            effect: selectedOption.snippet,
          }],
          source: `archetype.${feature.name}.${inx}.${selectedOption.name}`,
        };
        this.$store.commit('characters/addCharacterModifications', { id: this.characterId, content });
      }
      if ( selectedOption.modifications ) {
        const content = {
          modifications: selectedOption.modifications,
          source: `archetype.${feature.name}.${inx}.${selectedOption.name}`,
        };
        this.$store.commit('characters/addCharacterModifications', { id: this.characterId, content });
      }

      if ( selectedOption.keywords ) {
        const payload = { id: this.characterId, source: `archetype.${feature.name}`, cascade: true };
        this.$store.commit('characters/clearCharacterKeywordsBySource', payload);
        selectedOption.keywords.forEach( (keyword) => {
          const payload = {
            name: keyword,
            source: `archetype.${feature.name}`,
            type: 'keyword',
            replacement: undefined,
          };
          this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword: payload });
        });
      }

    },
    getPsychicPowerOptions(psychicPowerSelection) {
      const config = {
        params: {
          ...psychicPowerSelection.query,
          fields: 'id,name,effect,discipline',
        },
      };

      this.$axios.get('/api/psychic-powers/', config)
      .then( (response) => {
        psychicPowerSelection.options = response.data;
      });
    },
  },
};
</script>

<style scoped>
.right{
    float:right;
}

.left{
    float:left;
}
</style>
