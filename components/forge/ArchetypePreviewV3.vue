<template lang="html">
  <v-card v-if="item" class="pa-0">
    <v-card-title
      v-if="chooseMode"
      style="background-color: #262e37; color: #fff"
    >
      <span>Подтвердите класс</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')"> close </v-icon>
    </v-card-title>

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">
          {{ item.name }}
        </h3>
      </div>
      <v-spacer />
      <div>
        <img :src="avatar" style="width: 96px" />
      </div>
    </v-card-title>

    <v-divider />
    <v-card-text class="pt-4">
      <div>
        <trait-view
          v-if="item.trait"
          :item="item"
          class="mb-2"
          style="font-size: 14px"
        />
      </div>
      <p class="text-lg-justify">
        <i><div v-html="item.hint"></div> </i>
      </p>

      <p><v-divider /></p>

      <div class="two-column-holder light-red-border">
        <div class="two-column-left">
          <h3 class="exclude_from_nav">Ключевые аттрибуты</h3>
          <p class="" v-if="item.keyAbility.length > 0">
            <strong> {{ characterLabelAttribute(item.keyAbility) }}</strong>
          </p>
          <p
            class=""
            v-else="characterLabelAttributeBoost(item.attributeBoost)"
          >
            <strong>
              {{ characterLabelAttributeBoost(item.attributeBoost) }}</strong
            >
          </p>
          <p class="">
            На 1-м уровне ваш класс дает вам усиление по вашему выбору
          </p>
        </div>
        <div class="two-column-right">
          <h3 class="exclude_from_nav">Хиты</h3>
          <p class="">
            <strong> {{ item.hitpoints }} + мод Телосложения</strong>
          </p>
          <p class="">
            Вы увеличиваете свое максимальное количество хитов на это число на
            1-м уровне и на каждом последующем уровне.
          </p>
        </div>
      </div>

      <div class="class-sidebar">
        <div class="two-column-holder dark-red-border">
          <div class="two-column-left">
            <h3 class="exclude_from_nav" id="Perception">Внимательность</h3>
            <p>{{ characterlabel(characterPerseption) }}</p>

            <h3 class="exclude_from_nav" id="SavingThrows">Спасброски</h3>
            <span v-for="item1 in SavingRepository" v-bind:key="item.key">
              <p>
                {{ characterlabel(item.saving[item1.key]) }} в
                {{ item1.name }}
              </p>
            </span>
            <h3 class="exclude_from_nav" id="Skills">Навыки</h3>

            <p v-if="item.skillTrainedChoice.length > 0">
              <strong>Обучен в навыке (на выбор):</strong>
              {{ characterLabelSkillTrainedChoice(item.skillTrainedChoice) }}
            </p>

            <p v-if="item.skillTrained.length > 0">
              <strong>Обучен в навыке:</strong>
              {{ characterLabelSkillTrainedChoice(item.skillTrained) }}
            </p>

            <p>
              <strong>Обучен дополнительным навыкам, в кол-ве равном:</strong>
              {{ item.skillTrainedPoints }} + мод Интеллекта
            </p>
          </div>
          <div class="two-column-right">
            <h3 class="exclude_from_nav" id="attacks">Атаки</h3>
            <span v-for="item1 in WeaponRepository" v-bind:key="item1.key">
              <p v-if="item.skillAttack[item1.key]">
                {{ characterlabel(item.skillAttack[item1.key]) }} в
                {{ item1.name }}
              </p>
            </span>
            <h3 class="exclude_from_nav" id="defenses">Защиты</h3>
            <span v-for="item1 in DefenceRepository" v-bind:key="item.key">
              <p v-if="item.skillDefence[item1.key]">
                {{ characterlabel(item.skillDefence[item1.key]) }} в
                {{ item1.name }}
              </p>
            </span>

            <h3 class="exclude_from_nav" id="ClassDC">Класс Сл</h3>
            <p>
              КС класса {{ item.name }}: {{ characterlabel(item.skillClass) }}
            </p>
          </div>
        </div>
      </div>

            <div class="mt-2 body-2 text-justify">
        <h3 class="headline">Классовые особенности</h3>
        <div v-for="feature in item.archetypeFeatures" class="text-lg-justify">
          <h3 class="main-holder split-header">
            <span class="left-header">{{ feature.name }}</span
            ><span class="right-header">{{ feature.level }}</span>
          </h3>

           
          <!-- <div >
          <h3 ><span style="display: inline-block; width: 50%;">{{ feature.name }}</span><span style="display: inline-block; text-align: right; width: 50%;">Уровень {{ feature.level }}</span></h3>
          </div> -->

          <p class="main-holder">
            <div v-if="feature.description" v-html="feature.description"></div>
            <div v-if="feature.snippet" v-html="feature.snippet"></div>

            <div
              v-if="feature.action"
              v-html="feature.action.description"
            ></div>
          </p>

          <div v-if="feature.options" v-for="feature1 in feature.options" class="mt-2">
            
            <h2 class="headline"  v-if="feature1.name">{{feature1.name}}</h2>
            <div
              v-if="
                feature.type !== 'Skill Choice' &&
                feature.type !== 'Weapon Choice' 
              "
            >
              <div>
                <trait-view
                  v-if="feature1"
                  :item="
                    feature1
                  "
                  class="mb-2"
                  style="font-size: 14px"
                />
              </div>
 
                <div
                  v-if="
                    feature1
                      .snippet
                  "
                  v-html="
                    feature1
                      .snippet
                  "
                ></div>
              
              <div
                v-if="
                  feature1.feat
                "
              >
                <strong>Черта:</strong>
                <span
                  v-html="
                    feature1.feat
                  "
                ></span>
              </div>
              <div
                v-if="
                  feature1.spells
                "
              >
                <strong>Заклинание:</strong>
                <span
                v-for="(spells, level) in feature1
                      .spells"
                >
              
               <h3>Уровень {{ level }}</h3>
              <ul>
                <li v-for="spell in spells" :key="spell">
                  {{ SpellName(spell) }}
                </li>
              </ul>
              </span>
              </div>
              <div
                v-if="
                  feature1
                    .focusSpell
                "
              >
                <strong>Фокусное заклинание:</strong>
                <span
 
                > {{SpellName( feature1.focusSpell)}}</span>
              </div>
               <div
                v-if="
                  feature1.spell
                "
              >
                <strong>Заклинание:</strong>
                <span
 
                > {{SpellName( feature1.spell)}}</span>
              </div>
              <div
                v-if="
                  feature1.skill
                "
              >
                <strong>Навык:</strong>
                <span
                  v-html="
                    feature1
                      .skill
                  "
                ></span>
              </div>

              <div></div>

              <div
                v-if="
                  feature1
                    .subFeature
                "
              >
                              <div  v-if="feature1.selected && feature1
                    .find((s) => s.key === feature1.selected)">
                  <div
                 v-if="feature1
                    .find((s) => s.key === feature1.selected).subFeature"
                  v-for="item in feature1
                    .find((s) => s.key === feature1.selected)
                    .subfeature1.filter((t) => t.level <= characterLevel())"
                >
                  <div>
                    <h4 class="main-holder split-header1">
                      <span class="left-header">{{ item.name }}</span
                      ><span class="right-header">{{ item.level }}</span>
                    </h4>
                    <div
                      v-if="item.snippet"
                      v-html="item.snippet"
                    ></div>
                    <div v-else v-html="item.snippet"></div>
                  </div>
                </div>
            </div>
              </div>

            </div>

            <div v-if="feature1.selected && feature1.type === 'Weapon Choice'">
              <div>
                <div
                  v-if="
                    feature1
                      .description
                  "
                  v-html="
                    feature1
                      .description
                  "
                ></div>
              </div>
            </div>
            <div></div>
          </div> 
        
      </div>
      </div>
    </v-card-text>

    <v-divider v-if="chooseMode" />
    <v-card-actions v-if="chooseMode">
      <v-btn left outlined color="red" @click="$emit('cancel')"> Отмена </v-btn>
      <v-spacer />
      <v-btn right color="green" @click="$emit('select', item)">
        Выберите класс
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
import KeywordRepository from '~/mixins/KeywordRepositoryMixin';
import StatRepository from '~/mixins/StatRepositoryMixin';
import SluggerMixin from '~/mixins/SluggerMixin';
import traitView from '~/components/TraitView';

export default {
  name: 'ArchetypePreview',
  mixins: [
    KeywordRepository,
    StatRepository,
    SluggerMixin,
  ],
    components:{traitView},
  props: {
    characterId: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    spells: {
      type: Object,
      required: true,
      
    },
    keywords: {
      type: Array,
      required: false,
      default: () => [],
    },
    psychicPowers: {
      type: Array,
      required: false,
      default: () => [],
    },
    chooseMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    avatar() {
      if (this.item === undefined) return '';
      return `/img/avatars/archetype/${this.item.key}.png`;
    },
    attributePrerequisites() {
      if (this.item.prerequisites) {
        return this.item.prerequisites
          .filter((p) => p.group === 'attributes')
          .map((a) => `${this.getAttributeByKey(a.value).name} ${a.threshold}`)
          .join(', ');
      }
      return this.item.attributes;
    },
    skillPrerequisites() {
      if (this.item.prerequisites && this.item.prerequisites.length > 0) {
        return this.item.prerequisites
          .filter((p) => p.group === 'skills')
          .map((a) => `${this.getSkillByKey(a.value).name} ${a.threshold}`)
          .join(', ');
      }
      return this.item.prerequisitesSkillString;
    },
    abilityObjects() {
      if (Array.isArray(this.item.abilities)) {
        return this.item.abilities;
      }
      return [];
    },
    wargearText() {
      if ( this.item.wargearString ) {
        return this.item.wargearString;
      }
      if ( this.item.wargear && this.item.wargear.length > 0 ) {
        return this.item.wargear.map((g) => {
          if (g.amount) {
            return `${g.amount}x ${g.name}`;
          }
          return `${g.name}`;
        }).join(', ');
      }
      return this.item.wargear;
    },
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
  },
  methods: {
  SpellName(spell) {
      const spell1 = this.textToKebab(spell);
      return this.spells.find(s => s.key === spell1)?.name || '';
    },
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

.right-header {
  float: right;
}

.left-header {
  float: left;
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
