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

      <div class="class-block">
        <div class="two-column-holder light-red-border">
        <div class="two-column-left">
          <h3 class="exclude_from_nav" >Ключевые аттрибуты</h3>
          <p class="" v-if="item.keyAbility.length > 0"><strong> {{ characterLabelAttribute(item.keyAbility) }}</strong></p>
          <p class="" v-else="characterLabelAttributeBoost(item.attributeBoost)"><strong> {{ characterLabelAttributeBoost(item.attributeBoost) }}</strong></p>
          <p class="">На 1-м уровне ваш класс дает вам усиление по вашему выбору</p></div>
          <div class="two-column-right"><h3 class="exclude_from_nav">Хиты</h3><p class=""><strong> {{ item.hitpoints}} + мод Телосложения</strong></p>
            <p class="">Вы увеличиваете свое максимальное количество хитов на это число на 1-м уровне и на каждом последующем уровне.</p></div></div></div>


            <div class="class-sidebar">
              <div class="two-column-holder dark-red-border">
                <div class="two-column-left">
                  <h3 class="exclude_from_nav" id="Perception">Внимательность</h3>
                        <p>{{  characterlabel(characterPerseption) }}</p>

                  <h3 class="exclude_from_nav" id="SavingThrows">Спасброски</h3>
          <span v-for="item in SavingRepository" v-bind:key="item.key">
            <p>{{ characterlabel(characterSaving[item.key]) }} в {{ item.name }} </p>
          </span>
                  <h3 class="exclude_from_nav" id="Skills">Навыки</h3>
                  
        <p v-if="item.skillTrainedChoice.length > 0"><strong>Обучен в навыке (на выбор):</strong> {{ characterLabelSkillTrainedChoice(item.skillTrainedChoice) }}</p>

        <p v-if="item.skillTrained.length > 0"><strong>Обучен в навыке:</strong> {{ characterLabelSkillTrainedChoice(item.skillTrained) }}</p>


                   <p><strong>Обучен дополнительным навыкам, в кол-ве равном:</strong> {{ item.skillTrainedPoints}} + мод Интеллекта</p>
    
                </div>
                  <div class="two-column-right"><h3 class="exclude_from_nav" id="attacks">Атаки</h3>
                  <span v-for="item in WeaponRepository" v-bind:key="item.key">
                      <p class=""> {{ characterlabel(skillAttack[item.key]) }} в {{ item.name }} </p>
                  </span>
                    <h3 class="exclude_from_nav" id="defenses">Защиты</h3>
                  <span v-for="item in DefenceRepository" v-bind:key="item.key">
                    <p> {{ characterlabel(skillDefence[item.key]) }} в {{ item.name }} </p>
                  </span>
          
                    <h3 class="exclude_from_nav" id="ClassDC">Класс Сл</h3>
                       <p>КС класса {{ item.name }}: {{  characterlabel(item.skillClass) }}</p>
                  </div></div></div>
      
      
            <div class="mt-2 body-2 text-justify ">

          <h3 class="headline">Классовые особенности</h3>
          <div
        v-for="feature in item.archetypeFeatures"
        class="text-lg-justify " v-bind:key="feature.key"
      >

      <h3 class="main-holder split-header"><span class="left-header">{{ feature.name }}</span><span class="right-header">{{ feature.level }}</span></h3>
        <!-- <div >
          <h3 ><span style="display: inline-block; width: 50%;">{{ feature.name }}</span><span style="display: inline-block; text-align: right; width: 50%;">Уровень {{ feature.level }}</span></h3>
          </div> -->

        <p class="main-holder">
          

          <div v-if="feature.description" v-html="feature.description"></div>
          <div  v-else>{{ feature.snippet }}</div>

               <div v-if="feature.action" v-html="feature.action.description"></div>
        </p>

        <div v-if="feature.options" class="mt-2">
          <v-select
            v-model="feature.selected"
            :items="feature.options"
            item-value="key"
            item-text="name"
            label=""
            dense outlined 
            persistent-hint
            @input="changeSelectedOption(feature, item)"
       
          >
          </v-select>
          
           <div v-if="feature.selected">
             <p><div v-if="feature.options.find(s=> s.key === feature.selected).snippet" v-html="feature.options.find(s=> s.key === feature.selected).snippet"></div></p>
             <p v-if="feature.options.find(s=> s.key === feature.selected).feat"><strong>Черта:</strong> <span  v-html="feature.options.find(s=> s.key === feature.selected).feat"></span></p>
             <p v-if="feature.options.find(s=> s.key === feature.selected).spell"><strong>Заклинание:</strong> <span  v-html="feature.options.find(s=> s.key === feature.selected).spell"></span></p>
             <p v-if="feature.options.find(s=> s.key === feature.selected).focusSpell"><strong>Фокусное заклинание:</strong> <span  v-html="feature.options.find(s=> s.key === feature.selected).focusSpell"></span></p>
             <p v-if="feature.options.find(s=> s.key === feature.selected).skill"><strong>Навык:</strong> <span  v-html="feature.options.find(s=> s.key === feature.selected).skill"></span></p>
         
           

            <div v-if="feature.options.find(s=> s.key === feature.selected).subFeature">
                <div  v-for="item in feature.options.find(s=> s.key === feature.selected).subFeature.filter(t => t.level <= characterLevel())">
                  <p><h4 class="main-holder split-header1"><span class="left-header">{{ item.name }}</span><span class="right-header">{{ item.level }}</span></h4>
                  <div v-if="item.description" v-html="item.description"></div>
                  <div  v-else>{{ item.snippet }}</div></p>
               
                </div>
              </div>
            </div>

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
      actionList: undefined,
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
      if (this.item === undefined || this.item.key === 'advanced') return '/img/avatar_placeholder.png';
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
          this.getActionList(newVal);
          // this.getPsychicPowers(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    characterArchetypeKey: {
      handler(key) {
        if (key) {
          if (key === 'unknown') {
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
      
      this.actionList = data;
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
      //const selectedOption = feature.options.find((o) => o.name === feature.selected[inx]).group;


      const mod = {
        key: feature.key,
        type: feature.type,
        selected: feature.selected,
        value: feature.value,
        level: feature.level,
        source: "archetype"
      };
      
      this.$store.commit('characters/clearCharacterClassModFeature', { id: this.characterId, content: mod });
      this.$store.commit('characters/addCharacterClassModFeature', { id: this.characterId, content: mod });



      // this.$store.commit("characters/addCharacterModifications", {
      //   id: this.characterId,
      //   content: { modifications: mod, source: "archetype" },
      // });

      //this.$store.commit('characters/clearCharacterEnhancementsBySource', { id: this.characterId, source: `archetype` });
      // if ( selectedOption.snippet ) {
      //   const content = {
      //     modifications: [{
      //       name: selectedOption.name,
      //       targetGroup: 'abilities',
      //       targetValue: '',
      //       effect: selectedOption.snippet,
      //     }],
      //     source: `archetype.${feature.name}.${inx}.${selectedOption.name}`,
      //   };
      //   this.$store.commit('characters/addCharacterModifications', { id: this.characterId, content });
      // }

      // if ( selectedOption.modifications ) {
      //   const content = {
      //     modifications: selectedOption.modifications,
      //     source: `archetype.${feature.name}.${inx}.${selectedOption.name}`,
      //   };
      //   this.$store.commit('characters/addCharacterModifications', { id: this.characterId, content });
      // }

      // if ( selectedOption.keywords ) {
      //   const payload = { id: this.characterId, source: `archetype.${feature.name}`, cascade: true };
      //   this.$store.commit('characters/clearCharacterKeywordsBySource', payload);
      //   selectedOption.keywords.forEach( (keyword) => {
      //     const payload = {
      //       name: keyword,
      //       source: `archetype.${feature.name}`,
      //       type: 'keyword',
      //       replacement: undefined,
      //     };
      //     this.$store.commit('characters/addCharacterKeyword', { id: this.characterId, keyword: payload });
      //   });
      // }

    },
        characterLevel() {
      return this.$store.getters["characters/characterLevelById"](
        this.characterId
      );
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
.right-header{
    float:right;
}

.left-header{
    float:left;
}

.h3 {
  font-size: 24px;
  font-weight: normal;
  color: #5d0000;
}

.h4 {
color: #a76652;
    font-weight: normal;
    font-size: 20px;
    margin-top: 50px;
    margin-bottom: 10px;
}

.split-header {
  border-bottom: 1.5px solid;
  padding-bottom: 5px;
  overflow: hidden;
}

.split-header1 {
  border-bottom: 1.5px;
  padding-bottom: 5px;
  overflow: hidden;
}

.main-holder p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.two-column-holder {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.two-column-left {
  flex: 50%;
  flex-wrap: wrap;
  padding: 20px 30px;
}

@media screen and (max-width: 600px) {
  .two-column-left {
    flex: 100%;
    flex-wrap: wrap;
    padding: 20px 30px;
  }
}

.two-column-right {
  flex: 50%;
  flex-wrap: wrap;
  padding: 20px 30px;
}

.light-red-border .two-column-left {
  border-right: 1px solid #d85058;
}

@media screen and (max-width: 600px) {
  .light-red-border .two-column-left {
    border-bottom: 1px solid #d85058;
    border-right: none;
  }
}

.class-sidebar {
    /* background: #fdfdfd; */
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0px 2px 12px rgb(0 0 0 / 20%);
    /* color: #5c1c16; */
    word-break: break-word;
}

.dark-red-border .two-column-left {
  border-right: 1px solid #5c1c16;
}

@media screen and (max-width: 600px) {
  .dark-red-border .two-column-left {
    border-bottom: 1px solid #5c1c16;
    border-right: none;
  }
}
</style>
