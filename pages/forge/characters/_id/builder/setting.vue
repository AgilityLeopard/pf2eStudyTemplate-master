<template lang="html">
  <v-row>
    <v-dialog v-model="selectAvatarDialog" width="600px" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
      <v-card class="pa-0">
        <v-card-title class="ui-dialog__header">
          <span>Подтвердите аватар</span>
          <v-spacer />
          <v-icon dark @click="selectAvatarDialog = false"> закрыть </v-icon>
        </v-card-title>

        <v-card-text class="pt-4">
          <div>
            <div class="st-avatar-editor">

              <client-only>


                <croppa v-model="myCroppa" :file-size-limit="31457280" :width="300" :height="300"
                  :prevent-white-space="myCroppaConfig.preventWhiteSpace" class="croppa-circle" />
              </client-only>
            </div>
          </div>
          <span class="caption">
            Перетаскивайте и масштабируйте (прокручивая) до тех пор, пока
            изображение не впишется в размер.
          </span>

          <div>
            <v-switch v-model="myCroppaConfig.preventWhiteSpace"
              label="Изображение в пределах границы без фона"></v-switch>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn left outlined color="red" @click="selectAvatarDialog = false">
            Отмена
          </v-btn>
          <v-spacer />
          <v-btn right primary color="green" @click="setNewAvatar">
            Выбрать аватар
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-col :cols="12" :sm="7">
      <div class="st-panel">


        <h3 class="subtitle-1">

          <strong>Персонаж</strong>
        </h3>

        <v-text-field label="Имя персонажа" :value="characterName" dense outlined @input="setCharacterName" />

        <v-slider :value="characterCustomLevel" :min="1" :max="20" class="pb-2" label="Уровень"
          hint="Установите уровень персонажа" step="1" ticks thumb-label="always" dense outlined type="number"
          @change="setLevel" />
      </div>
    </v-col>

    <v-col :cols="12" :sm="5">
      <div class="st-panel">

        <div>
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
      </div>
    </v-col>

    <v-expansion-panels multiple>

      <v-expansion-panel v-for="(items, group) in groupedOfficialOptions" :key="group">

        <v-expansion-panel-header>

          <div class="d-flex align-center justify-space-between w-100">

            <div class="d-flex align-center">

              <v-icon class="mr-3">
                {{ groupIcon(group) }}
              </v-icon>

              <strong>
                {{ group }}
              </strong>

            </div>


            <v-chip small outlined>
              {{ selectedInGroup(group) }}/{{ items.length }}
            </v-chip>


          </div>

        </v-expansion-panel-header>


        <v-expansion-panel-content>


          <!-- выбор всей группы -->

          <v-switch :model-value="isGroupSelected(group)" color="primary" @change="toggleGroup(group)">

            <template #label>
              <strong>
                Выбрать всю группу
              </strong>
            </template>

          </v-switch>



          <v-divider class="mb-3" />



          <!-- книги -->

          <div v-for="homebrew in items" :key="homebrew.key" class="ml-4">

            <v-switch v-if="homebrew.optional" v-model="enabledHomebrews" :value="homebrew.key"
              :disabled="homebrew.disabled" color="primary" @change="updateHomebrew(homebrew)">

              <template #label>
                <span class="body-2">
                  {{ homebrew.name }}
                </span>
              </template>

            </v-switch>


            <v-switch v-else :model-value="true" disabled color="primary">

              <template #label>
                <span class="body-2">
                  {{ homebrew.name }}
                </span>
              </template>

            </v-switch>


          </div>


        </v-expansion-panel-content>

      </v-expansion-panel>

    </v-expansion-panels>

    <v-col :cols="12" />
  </v-row>
</template>

<script lang="js">
import { source } from '../../../../../api/db/static/_sourcesRepository';

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
      allHomebrews: false,
      avatar: '',
      selectAvatarDialog: false,
      myCroppa: {},
      myCroppaConfig: {
        preventWhiteSpace: true,
      },
      settingPlayMode: false,

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
      // enabledHomebrews: [],
    };
  },
  computed: {
    enabledHomebrews: {

      get() {

        const saved =
          this.settingHomebrews ?? [];


        // всегда добавляем Player Core
        return [
          ...new Set([
            ...saved,
            "Pathfinder Player Core 2",
            "Pathfinder Player Core"
          ])
        ];

      },


      set(value) {

        this.$store.commit(
          'characters/setSettingHomebrews',
          {
            id: this.characterId,
            content: value
          }
        );

      }

    },



    settingOfficialOptions() {
      return Object.values(source).map(book => {

        const alwaysEnabled = [
          "Pathfinder Player Core",
          "Pathfinder Player Core 2"
        ].includes(book.key);


        return {
          show: true,

          // Player Core нельзя выключить
          disabled: alwaysEnabled,

          // остальные можно переключать
          optional: !alwaysEnabled,

          key: book.key,

          name: book.book,

          hint: book.book,

          group: book.group,

          version: book.version,
          link: book.link,
        };
      });
    },

    groupedOfficialOptions() {

      const order = [
        'Core',
        'Lost Omens',
        'Adventure Paths',
        'Standalone Adventures'
      ];


      const groups = this.settingOfficialOptions
        .filter(i => i.show)
        .reduce((acc, item) => {

          const book = item.name ?? "";

          let group;

          if (
            book.includes("Lost Omens")
          ) {
            group = "Lost Omens";
          }

          else if (
            /^Pathfinder #\d+/.test(book)
          ) {
            group = "Adventure Paths";
          }
          else if (
            book.includes("Blog")
          ) {
            group = "Other";
          }
          else if (
            book.startsWith("Pathfinder Adventure:") ||
            book.startsWith("Pathfinder Adventures:") ||
            book.startsWith("Pathfinder One-Shot") ||
            book.includes("Beginner Box") ||
            book.startsWith("Pathfinder Society") ||
            book.startsWith("Pathfinder Special:")
          ) {
            group = "Standalone Adventures";
          }

          else if (
            book.startsWith("Pathfinder Adventure Path:") ||
            book.includes("Hardcover Compilation") ||
            book.startsWith("Pathfinder Wake the Dead") ||
            book.includes("Claws") ||
            book.includes("Kingmaker") ||
            book.startsWith("Wake the Dead")
          ) {
            // Полные кампании/компиляции AP
            group = "Adventure Paths";
          }

          else {
            group = "Core";
          }


          if (!acc[group])
            acc[group] = [];

          acc[group].push(item);

          return acc;

        }, {});


      return Object.fromEntries(
        order
          .filter(group => groups[group])
          .map(group => [
            group,
            groups[group]
          ])
      );

    },
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
  },
  // watch: {
  //   settingHomebrews: {
  //     handler(newVal) {
  //       if (newVal) {
  //         this.enabledHomebrews = newVal;
  //       }
  //     },
  //     immediate: true, // make this watch function is called when component created
  //   },
  // },
  methods:
  {
    selectedInGroup(group) {

      return this.groupedOfficialOptions[group]
        .filter(i =>
          this.enabledHomebrews.includes(i.key)
        )
        .length;

    },
    groupIcon(group) {

      switch (group) {

        case 'Core':
          return 'mdi-book-open-page-variant';

        case 'Lost Omens':
          return 'mdi-earth';

        case 'Adventure Paths':
          return 'mdi-map-marker-path';

        case 'Standalone Adventures':
          return 'mdi-sword-cross';

        default:
          return 'mdi-book';

      }

    },

    toggleGroup(group) {
      const items = this.groupedOfficialOptions[group];

      const keys = items
        .filter(i => i.optional && !i.disabled)
        .map(i => i.key);


      const allSelected = keys.every(
        key => this.enabledHomebrews.includes(key)
      );


      if (allSelected) {
        // выключаем группу
        this.enabledHomebrews = this.enabledHomebrews.filter(
          key => !keys.includes(key)
        );
      } else {
        // включаем группу
        this.enabledHomebrews = [
          ...new Set([
            ...this.enabledHomebrews,
            ...keys
          ])
        ];
      }
    },


    isGroupSelected(group) {
      const items = this.groupedOfficialOptions[group]
        .filter(i => i.optional && !i.disabled)
        .map(i => i.key);


      return items.length > 0 &&
        items.every(key =>
          this.enabledHomebrews.includes(key)
        );
    },
    toggleAllHomebrews(value) {
      const optionalKeys = this.settingOfficialOptions
        .filter(i => i.show && i.optional && !i.disabled)
        .map(i => i.key);

      if (value) {
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
  },
};
</script>

<style scoped>
.w-100 {
  width: 100%;
}

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

.st-panel {

  margin-bottom: 16px;

  border: 1px solid var(--ui-border);

  /* border-radius: 16px; */

  overflow: hidden;

}

.ui-dialog__header {

  position: sticky;

  top: 0;

  z-index: 20;

  background: var(--ui-surface);

  /* border-bottom: 1px solid var(--ui-border); */

}

.st-avatar-editor {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
