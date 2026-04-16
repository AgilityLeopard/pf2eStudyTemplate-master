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

        <!-- 🔹 Общий переключатель "Выбрать все" -->
        <v-switch v-model="allHomebrews" label="Выбрать все" color="primary" dense @change="toggleAllHomebrews" />

        <div v-for="homebrew in settingOfficialOptions.filter(i => i.show === true)" :key="homebrew.key">
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
      allHomebrews: [],
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
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'advancedPlayersGuide',
          name: 'Продвинутое руководство игрока',
          hint: 'Дополнительные классы, архетипы и опции персонажей',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'gunsAndGears',
          name: 'Оружие и механизмы',
          hint: 'Огнестрельное оружие, изобретения и технологии',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'rageOfElements',
          name: 'Ярость стихий',
          hint: 'Элементальная магия и классы',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'bookOfTheDead',
          name: 'Книга мёртвых',
          hint: 'Нежить, некромантия и тёмные темы',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'warOfImmortals',
          name: 'Война бессмертных',
          hint: 'Боги, полубоги и эпические конфликты',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'howlOfTheWild',
          name: 'Вой дикой природы',
          hint: 'Звериные и природные опции',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'battlecry',
          name: 'Боевой клич!',
          hint: 'Массовые сражения и военные конфликты',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensAncestryGuide',
          name: 'Lost Omens: Руководство по происхождениям',
          hint: 'Происхождения и наследия',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensCharacterGuide',
          name: 'Lost Omens: Руководство по персонажам',
          hint: 'Культуры, фракции и архетипы',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensWorldGuide',
          name: 'Lost Omens: Путеводитель по миру',
          hint: 'Обзор Голариона',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensHighhelm',
          name: 'Lost Omens: Хайхельм',
          hint: 'Столица дворфов',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensFirebrands',
          name: 'Lost Omens: Огненные клейма',
          hint: 'Фракции и революционеры',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensImpossibleLands',
          name: 'Lost Omens: Невозможные земли',
          hint: 'Алкенстар, Некс и Геб',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensKnightsOfLastwall',
          name: 'Lost Omens: Рыцари Ластуолла',
          hint: 'Орден и крестоносцы',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensAbsalom',
          name: 'Lost Omens: Абсалом — Город утраченных предзнаменований',
          hint: 'Крупнейший город мира',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensMwangiExpanse',
          name: 'Lost Omens: Мвангийские просторы',
          hint: 'Континент и культуры',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensLegends',
          name: 'Lost Omens: Легенды',
          hint: 'Знаменитые личности',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensMonstersOfMyth',
          name: 'Lost Omens: Мифические чудовища',
          hint: 'Легендарные монстры',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensShiningKingdoms',
          name: 'Lost Omens: Сияющие королевства',
          hint: 'Региональный лор',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensRivalAcademies',
          name: 'Lost Omens: Соперничающие академии',
          hint: 'Магическое образование',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostOmensGrandBazaar',
          name: 'Lost Omens: Великий базар',
          hint: 'Торговля и предметы',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'brokenPromises',
          name: 'Путь приключений #150: Нарушенные обещания',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'showMustGoOn',
          name: 'Путь приключений #151: Шоу должно продолжаться',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'legacyOfTheLostGod',
          name: 'Путь приключений #152: Наследие утраченного бога',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lifesLongShadows',
          name: 'Путь приключений #153: Долгие тени жизни',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'apocalypseProphet',
          name: 'Путь приключений #156: Пророк апокалипсиса',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'devilAtTheDreamingPalace',
          name: 'Путь приключений #157: Дьявол во дворце грёз',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'allOrNothing',
          name: 'Путь приключений #159: Всё или ничего',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'ruinsOfGauntlight',
          name: 'Путь приключений #163: Руины Гонтлайта',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'handsOfTheDevil',
          name: 'Путь приключений #164: Руки дьявола',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'despairOnDangerIsland',
          name: 'Путь приключений #166: Отчаяние на Острове Опасности',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'readyFight',
          name: 'Путь приключений #167: Готовы? В бой!',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'kingOfTheMountain',
          name: 'Путь приключений #168: Король горы',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'spokenOnTheSongWind',
          name: 'Путь приключений #170: Сказанное поющему ветру',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'hurricanesHowl',
          name: 'Путь приключений #171: Вой урагана',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'secretsOfTheTempleCity',
          name: 'Путь приключений #172: Тайны храмового города',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'shadowsOfTheAncients',
          name: 'Путь приключений #174: Тени древних',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'brokenTuskMoon',
          name: 'Путь приключений #175: Луна сломанного клыка',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lostMammothValley',
          name: 'Путь приключений #176: Затерянная долина мамонтов',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'burningTundra',
          name: 'Путь приключений #177: Пылающая тундра',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'punksInAPowderKeg',
          name: 'Путь приключений #178: Панки в пороховой бочке',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'smokingGun',
          name: 'Путь приключений #180: Дымящийся пистолет',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'zombieFeast',
          name: 'Путь приключений #181: Пир зомби',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'ghoulsHunger',
          name: 'Путь приключений #184: Голод гулей',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'seventhArch',
          name: 'Путь приключений #187: Седьмая арка',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'destinyWar',
          name: 'Путь приключений #191: Война судеб',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'cultOfTheCaveWorm',
          name: 'Путь приключений #194: Культ пещерного червя',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'heavyIsTheCrown',
          name: 'Путь приключений #195: Тяжела корона',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'letTheLeavesFall',
          name: 'Путь приключений #197: Пусть опадут листья',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'toBloomBelowTheWeb',
          name: 'Путь приключений #199: Расцвести под паутиной',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'pactbreaker',
          name: 'Путь приключений #201: Нарушитель клятв',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'severedAtTheRoot',
          name: 'Путь приключений #202: Срублено под корень',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'stageFright',
          name: 'Путь приключений #204: Страх сцены',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'resurrectionFlood',
          name: 'Путь приключений #207: Потоп воскрешения',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'whispersInTheDirt',
          name: 'Путь приключений #210: Шёпот в пыли',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'thirstForBlood',
          name: 'Путь приключений #213: Жажда крови',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'acropolisPyre',
          name: 'Путь приключений #216: Костёр Акрополя',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'deathSailsAWineDarkSea',
          name: 'Путь приключений #217: Смерть плывёт по винно-тёмному морю',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'titanbane',
          name: 'Путь приключений #218: Губитель титанов',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'lordOfTheTrinityStar',
          name: 'Путь приключений #219: Владыка Звезды Троицы',
          hint: 'Путь приключений',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'fallOfPlaguestone',
          name: 'Падение Плагстоуна',
          hint: 'Приключение',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'slithering',
          name: 'Ползучее зло',
          hint: 'Приключение',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'nightOfTheGrayDeath',
          name: 'Ночь Серой смерти',
          hint: 'Приключение',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'preyForDeath',
          name: 'Добыча для смерти',
          hint: 'Приключение',
        },
        {
          show: true,
          disabled: false,
          optional: true,
          key: 'gatewalkersAP',
          name: 'Следопыты врат',
          hint: 'Путь приключений',
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
    toggleAllHomebrews() {
      const optionalKeys = this.settingOfficialOptions
        .filter(i => i.show && i.optional && !i.disabled)
        .map(i => i.key);

      if (this.allHomebrews) {
        // добавляем все опциональные в enabledHomebrews, не трогая уже включённые
        this.enabledHomebrews = Array.from(new Set([...this.enabledHomebrews, ...optionalKeys]));
      } else {
        // снимаем все опциональные
        this.enabledHomebrews = this.enabledHomebrews.filter(k => !optionalKeys.includes(k));
      }
      this.updateHomebrew();
    },
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
