<template lang="html">
  <v-row>
    <v-dialog v-model="selectAvatarDialog" width="600px" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card class="pa-0">
        <v-card-title style="background-color: #262e37; color: #fff">
          <span>Подтвердите аватар</span>
          <v-spacer />
          <v-icon dark @click="selectAvatarDialog = false"> закрыть </v-icon>
        </v-card-title>

        <v-card-text class="pt-4">
          <div>
            <client-only>
              <croppa v-model="myCroppa" :file-size-limit="31457280" :width="300" :height="300"
                :prevent-white-space="myCroppaConfig.preventWhiteSpace" class="croppa-circle" />
            </client-only>
          </div>
          <span class="caption">
            Перетаскивайте и масштабируйте (прокручивая) до тех пор, пока
            изображение не впишется в размер.
          </span>

          <div>
            <v-switch v-model="myCroppaConfig.preventWhiteSpace" label="Изображение в пределах границы без фона"
              dense></v-switch>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn left outlined color="red" @click="selectAvatarDialog = false">
            Отмена
          </v-btn>
          <v-spacer />
          <v-btn right color="green" @click="setNewAvatar">
            Выбрать аватар
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col :cols="12" :sm="7">
      <h2 class="title mb-2">
        <strong>Персонаж</strong>
      </h2>

      <v-text-field label="Имя персонажа" :value="characterName" dense outlined @input="setCharacterName" />

      <v-slider :value="characterCustomLevel" :min="1" :max="20" class="pb-2" label="Уровень"
        hint="Установите уровень персонажа" step="1" ticks thumb-label="always" dense outlined persistent-hint
        type="number" @input="setLevel" />
    </v-col>

    <v-col :cols="12" :sm="5">
      <div class="mb-2">
        <!-- custom avatar -->
        <v-badge bordered overlap color="error" v-show="characterAvatarUrl">
          <template v-slot:badge>
            <v-icon color="white" @click.stop="setCharacterAvatar(undefined)">close</v-icon>
          </template>
          <v-avatar size="86" style="border-radius: 50%" @click="selectAvatarDialog = true">
            <v-img :src="characterAvatarUrl"></v-img>
          </v-avatar>
        </v-badge>

        <!-- placeholder -->
        <v-avatar size="86" @click="selectAvatarDialog = true" v-show="!characterAvatarUrl">
          <v-img src="/img/avatar_placeholder_grey.png"></v-img>
        </v-avatar>

        <em class="d-none">{{
          characterAvatarUrl ? characterAvatarUrl.length : 0
        }}</em>
        <div><a @click="selectAvatarDialog = true">изменить аватар</a></div>
      </div>
    </v-col>

    <v-col :cols="12">
      <div>
        <h3 class="subtitle-1"><strong>Источники</strong></h3>

        <p class="body-2">Включить контент из других источников</p>

        <div v-for="homebrew in settingOfficialOptions.filter(
          (i) => i.show === true
        )" :key="homebrew.key">
          <v-switch v-if="homebrew.optional" v-model="enabledHomebrews" :value="homebrew.key" :hint="homebrew.hint"
            persistent-hint color="primary" dense :disabled="homebrew.disabled" @change="updateHomebrew(homebrew)">
            <template v-slot:label><span class="body-2">{{ homebrew.name }}</span></template>
          </v-switch>
          <v-switch v-else value input-value="true" :hint="homebrew.hint" persistent-hint color="primary" dense disabled
            @change="updateHomebrew(homebrew)">
            <template v-slot:label><span class="body-2">{{ homebrew.name }}</span></template>
          </v-switch>
        </div>
      </div>
    </v-col>

    <v-col :cols="12" />
  </v-row>
</template>

<script lang="js">

export default {
  name: 'Setting',
  layout: 'forge',
  mixins: [],
  props: [],
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      currentPage: 1,
      setting: {
        name: '',
        tier: 3,
        species: { exclude: [] },
        archetypes: { exclude: [] },
        homebrews: [],
      },
      avatar: '',
      selectAvatarDialog: false,
      myCroppa: {},
      myCroppaConfig: {
        preventWhiteSpace: true,
      },
      settingPlayMode: false,
      settingOfficialOptions: [
        {
          show: true,
          disabled: true,
          optional: false, // always active
          key: 'playerCore',
          name: 'Основная книга игрока (Ремастер)',
          hint: 'Основные правила',
          nuxt: '',
        },
        {
          show: true,
          disabled: true,
          optional: false, // always active
          key: 'playerCore2',
          name: 'Основная книга игрока 2 (Ремастер)',
          hint: 'Основные правила',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'secretOfMagic',
          name: 'Секреты магии',
          hint: 'Дополнение, включающее класс Магус и Призывателя',
        },


      ],
      settingHomebrewOptions: [
        {
          active: true,
          key: 'custom',
          name: '\'Your own Custom\' content',
          hint: 'You homebrew species.',
          enabled: true,
          nuxt: '',
          source: '',
        },
        {
          active: true,
          key: 'aaoa',
          name: '\'An Abundance of Apocrypha\' content',
          hint: 'Add Human Homeworlds, Squad, Pariah, more is on the way.',
          enabled: true,
          nuxt: '/vault/an-abundance-of-apocrypha',
          source: '',
        },
      ],
      enabledHomebrews: [],
      settingHouseruleSelectors: [
        {
          key: 'skill-attribute-advancement-costs',
          name: 'Skill & Attribute Advancement Costs Method',
          hint: 'Use regular advancement costs or legacy (v1) advancement costs, that favour skills.',
          selected: 'v15',
          items: [
            { value: 'v10', text: 'Legacy Flair (Cheaper skills)' },
            { value: 'v15', text: 'By the book (Revised Rules)' },
          ],
        },
      ],
    };
  },
  computed: {
    customXp() {
      return this.$store.getters['characters/characterCampaignCustomXpById'](this.characterId);
    },
    characterCustomRank() {
      return this.$store.getters['characters/characterCampaignCustomRankById'](this.characterId);
    },
    characterCustomLevel() {
      const t = this.$store.getters['characters/characterLevelById'](this.characterId);
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    characterAvatarUrl() {
      return this.$store.getters['characters/characterAvatarUrlById'](this.characterId);
    },
    characterName() {
      return this.$store.getters['characters/characterNameById'](this.characterId);
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    settingTitle() {
      return this.$store.getters['characters/characterSettingTitleById'](this.characterId);
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    settingHouserules() {
      return this.$store.getters['characters/characterSettingHouserulesById'](this.characterId);
    },
  },
  watch: {
    settingHomebrews: {
      handler(newVal) {
        if (newVal) {
          this.enabledHomebrews = newVal;
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    settingHouserules: {
      handler(newVal) {
        if (newVal) {
          this.settingHouseruleSelectors.forEach((rules) => {
            rules.selected = newVal[rules.key];
          });
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    setNewAvatar: function () {
      const url = this.myCroppa.generateDataUrl('jpg', 0.8);
      if (!url) {
        console.warn('no image');
        return undefined;
      }

      this.setCharacterAvatar(url);
      this.selectAvatarDialog = false;
    },
    setCharacterAvatar(url) {
      this.$store.commit('characters/setCharacterAvatar', { id: this.characterId, url: url });
      this.avatar = url;
    },
    setCharacterName(name) {
      this.$store.commit('characters/setCharacterName', { id: this.characterId, name });
    },
    setCustomXp(xp) {
      this.$store.commit('characters/setCustomXp', { id: this.characterId, xp });
    },
    setLevel(rank) {
      const level = parseInt(rank);

      this.$store.commit('characters/setLevel', { id: this.characterId, level });
      this.$store.commit('characters/resetCharacterStats', { id: this.characterId, optional: 'level' });
      this.$store.commit('characters/clearModification', { id: this.characterId, level });
      this.$store.commit('characters/setModification', { id: this.characterId, level });
    },
    setSettingTier(tier) {
      this.$store.commit('characters/setSettingTier', { id: this.characterId, tier });
    },
    setSettingTitle(title) {
      this.$store.commit('characters/setSettingTitle', { id: this.characterId, title });
    },
    updateHomebrew(event) {
      this.$store.commit('characters/setSettingHomebrews', { id: this.characterId, content: this.enabledHomebrews });
    },
    updateOfficial(event) {
      this.$store.commit('characters/setSettingOfficial', { id: this.characterId, content: this.enabledHomebrews });
    },
    updateHouserules(value, key) {
      this.$store.commit('characters/setSettingHouserules', { id: this.characterId, houserule: { key, value } });
    },
  },
};
</script>

<style lang="scss">
.croppa-container canvas {
  border: 0.5px dashed grey;
}

.text--keyword {
  color: rgb(244 64 52);
  font-weight: 600;
  font-family: serif;
  text-transform: uppercase;
}

.croppa-circle {
  border-radius: 50%;
  /* делаем контейнер круглым */
  overflow: hidden;
  /* обрезаем всё, что выходит за границы круга */
  width: 300px;
  height: 300px;
}
</style>
