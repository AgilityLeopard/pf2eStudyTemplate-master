<template lang="html">

  <v-card v-if="item">

    <v-card-title v-if="chooseMode" style="background-color: #262e37; color: #fff;">
      <span>Подтвердите Предысторию</span>
      <v-spacer />
      <v-icon dark @click="$emit('cancel')">
        close
      </v-icon>
    </v-card-title>

    <v-card-title primary-title>
      <div>
        <h3 class="headline md0">
          {{ item.nameBackground }}
        </h3>
        <!-- <span class="subtitle-1 grey--text">{{ item.teaser }}</span> -->
      </div>
      <v-spacer />
      <div class="hidden-xs-only">
        <v-avatar tile size="72">
          <img :src="`/img/avatars/species/playerCore-dwarf.png`">
        </v-avatar>
      </div>
    </v-card-title>

    <v-divider v-if="chooseMode" />

    <v-card-text class="pt-4">
      
      <!-- <p class="text-lg-justify font-italic">
          <div v-html="item.description"></div> 
      </p> -->

        <blockquote class="blockquote text-lg-justify font-italic">
          <p>"{{ item.description }}"</p>

        </blockquote>



    </v-card-text>

    <v-divider />


    <v-card-actions v-if="chooseMode">

      <v-divider />

<div class="mt-2 body-2 text-lg-justify">
  <!-- <p>
    <strong>XP Cost:</strong> {{ species.cost }}, incl. Stats ({{ species.costs.stats }} XP)
  </p> -->

  <p ><strong>Характеристика на выбор:</strong> {{ characterLabelAttribute(item.boost1) }}</p>

  <p ><strong>Характеристика на выбор 2:</strong> Свободное повышение</p>
 

  <p v-if="item.skill"><strong>Навык от предыстории:</strong> {{ characterLabelSkillTrainedChoice(item.skill) }} </p>

  <p v-if="item.lore"><strong>Знание от предыстории:</strong> {{ item.lore }} </p>

  <p v-if="item.description"><strong>Описание</strong>  {{ item.description }}</p>
 
  <!-- <p><strong>Скорость:</strong> {{ ascension.speed }}</p> -->
</div>


    </v-card-actions>

    <v-card-actions v-if="chooseMode">
      <v-btn left outlined color="red" @click="$emit('cancel')">
        Отмена
      </v-btn>
      <v-spacer />
      <v-btn right color="green" @click="$emit('select', item)" :disabled="alertText">
        Выбор
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="js">
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  name: 'AscensionPreview',
  mixins: [StatRepositoryMixin],
  props: {
    // currentCharacterTier: {
    //   type: Number,
    //   required: true,
    // },
    // maxTargetTier: {
    //   type: Number,
    //   required: true,
    // },
    item: {
      type: Object,
      required: true,
    },
    manageMode: {
      type: Boolean,
      default: false,
    },
    chooseMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      targetTier: 0,
    };
  },
  computed: {
    alertText() {
      // if (this.item.minimumCampaignTier > this.maxTargetTier) {
      //   return `The Campaign tier [${this.maxTargetTier}] does not meet the Ascensions prerequisites minimum tier [${this.item.minimumCampaignTier}]+`;
      // }
      // if (this.currentCharacterTier >= this.maxTargetTier) {
      //   return `Your character tier [${this.currentCharacterTier}] already matches the campaign tier [${this.maxTargetTier}]`;
      // }
      return false;
    },
    hasValidTierPrerequisites() {
      return this.item.minimumCampaignTier <= this.maxTargetTier;
    },
    targetTierOptions() {
      // const from = Math.max(this.currentCharacterTier + 1, this.item.minimumCampaignTier);
      // const to = this.maxTargetTier;
      return [];
    },
  },
  methods: {
    range(start, end) {
      return Array(end - start + 1).fill().map((_, idx) => start + idx);
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

</style>
