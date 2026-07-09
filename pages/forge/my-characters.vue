<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <AppLoader :visible="$store.state.ui.loading" />
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row>
      <v-col :cols="12" v-if="false"> </v-col>

      <v-col :cols="12">
        <h2 class="headline">
          Мои персонажи:
          <span style="color: #1976d2">{{
            characterSets.filter((i) => i !== undefined).length
          }}
            Персонаж</span>
        </h2>

        <v-btn large color="primary" @click="newCharacter">
          Создать персонажа
        </v-btn>

        <!-- <v-btn large color="primary" outlined @click="import">
          <v-icon left>cloud_upload</v-icon>
          Импортировать персонажа
        </v-btn> -->

        <v-btn large color="primary" outlined @click="triggerFileInput">
          <v-icon left>cloud_upload</v-icon>Импортировать Персонажа
        </v-btn>

        <!-- Невидимый input для выбора файла -->
        <input type="file" ref="fileInput" accept=".json" style="display: none" @change="importJson" />

        <!-- <v-btn large color="primary" outlined nuxt to="/forge/species">
          Custom Species
        </v-btn> -->

        <v-dialog v-model="importDialog" width="600px" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
          <v-card class="pa-0">
            <v-card-title style="background-color: #262e37; color: #fff">
              <span>Импорт персонажа</span>
              <v-spacer />
              <v-icon dark @click="importDialog = false">close</v-icon>
            </v-card-title>
            <v-card-text>
              <v-textarea class="mt-4" v-model="importSnippet" persistent-hint dense
                hint="Вставьте строчку экспоритруемого персонажа сюда"></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-btn block color="success" @click="importCharacter(importSnippet)"
                :disabled="!importSnippet">import</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <v-col v-if="characterSets.filter((i) => i !== undefined).length <= 0" :cols="12">
        <v-alert type="info" prominent text border="left" color="primary">
          Осталось только <strong>Создать персонажа</strong> и начать его
          билдить
        </v-alert>
      </v-col>

      <v-col :cols="12">
        <v-row v-if="hasUnmigratedCharacters">
          <v-col :cols="12" :sm="12" :md="12" :lg="8">
            <!-- <v-card>
              <v-card-title>Updates Available</v-card-title>
              <v-card-text>
                <p>This characters were build with an older version and need to be updated to ensure all fields are up to date. Just hit the <strong>update button</strong> to bring all  characters back in line.</p>
                <p><strong>This significantly change how ascensions work.</strong> Thus, they are <strong>purged from all characters</strong> including their respective choices. Please <strong>re-select them</strong> after the update.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  @click="migrateAllCharacters"
                    color="success"
                  block
                >
                  <v-icon left small>
                    cloud_upload
                  </v-icon>
                  Обновить всех персонажей
                </v-btn>
              </v-card-actions>
            </v-card> -->
          </v-col>
        </v-row>

        <v-row>
          <v-col v-for="character in characterSets.filter((i) => i !== undefined)" v-if="characterSets"
            :key="character.id" :cols="12" :sm="6" :md="6" :lg="2">
            <v-card v-if="character">
              <v-card class="character-card" elevation="4">

                <!-- AVATAR -->
                <div class="character-cover" :style="{
                  backgroundImage: `url(${characterAvatar(character.id) || '/img/default-avatar.png'})`
                }">

                  <div class="character-overlay"></div>


                  <div class="character-info">

                    <h2>
                      {{ characterName(character.id) }}
                    </h2>


                    <div class="character-meta">

                      <span>
                        {{ characterSpeciesLabel(character.id) }}
                      </span>

                      <span v-if="characterArchetypeLabel(character.id)">
                        • {{ characterArchetypeLabel(character.id) }}
                      </span>

                    </div>


                    <v-chip small color="primary" class="mt-2">
                      Уровень {{ characterRank(character.id) }}
                    </v-chip>


                  </div>


                </div>



                <!-- ACTIONS -->

                <v-card-actions class="character-actions">


                  <v-btn icon color="primary" @click="openCharacter(character.id)"
                    :disabled="characterVersion(character.id) < builderVersion">
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>


                  <v-btn icon color="primary" nuxt :to="`/forge/characters/${character.id}`">
                    <v-icon>
                      mdi-file-document
                    </v-icon>
                  </v-btn>



                  <v-spacer />



                  <v-tooltip bottom>

                    <template v-slot:activator="{ on }">
                      <v-switch v-on="on" :disabled="!$store.state.user" :input-value="character.isMarked"
                        @change="toggleCloud(character)" inset hide-details class="mt-0" />
                    </template>


                    <span>
                      Синхронизация персонажа
                    </span>

                  </v-tooltip>



                  <v-btn icon color="primary" @click="openExportDialog(character.id)">
                    <v-icon>
                      mdi-download
                    </v-icon>
                  </v-btn>


                  <v-btn icon color="error" @click="openDeleteDialog(character.id)">
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>


                </v-card-actions>


              </v-card>

              <v-divider />

              <!-- <v-card-text class="pa-2 card__campaign-container">
                <strong>Tier {{ characterSettingTier(character.id) }}:</strong> <em>{{ characterSettingTitle(character.id) }}</em>
              </v-card-text> -->

              <v-divider />

              <!-- <v-card-actions>
                <v-btn @click="openCharacter(character.id)" color="primary" x-small text
                  :disabled="characterVersion(character.id) < builderVersion">
                  <v-icon left small> edit </v-icon>
                  Изменить
                </v-btn>
                <v-btn nuxt :to="`/forge/characters/${character.id}`" color="primary" text x-small
                  :disabled="characterVersion(character.id) < builderVersion">
                  <v-icon small left> description </v-icon>
                  Просмотр
                </v-btn>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <div v-on="on" class="d-flex align-center">
                      <v-switch :disabled="!$store.state.user" :input-value="character.isMarked"
                        @change="toggleCloud(character)" inset color="primary" hide-details class="cloud-switch ma-0">
                        <template v-slot:label>
                          <div class="d-flex align-center">
                            <v-icon small class="mr-1">cloud</v-icon>
                          </div>
                        </template>
                      </v-switch>
                    </div>
                  </template>

                  <span>
                    Сохраняет персонажа в вашем аккаунте и синхронизирует между устройствами (не более 5
                    одновременно)
                  </span>
                </v-tooltip>

                <v-btn color="primary" text x-small @click="openExportDialog(character.id)">
                  <v-icon small left>cloud_download</v-icon>
                  Экспорт
                </v-btn>


              <v-btn color="error" text small @click="openDeleteDialog(character.id)">
                <v-icon small>delete</v-icon>Удалить
              </v-btn>
              </v-card-actions> -->

            </v-card>
          </v-col>

          <v-dialog v-model="exportDialog" width="600px" scrollable :fullscreen="$vuetify.breakpoint.xsOnly">
            <v-card class="pa-0">
              <v-card-title style="background-color: #262e37; color: #fff">
                <span>Экспортировать персонажа</span>
                <v-spacer />
                <v-icon dark @click="exportDialog = false"> close </v-icon>
              </v-card-title>
              <v-card-text>
                <v-textarea id="exportSnippetId" rows="10" readonly class="mt-4" persistent-hint dense
                  hint="Персонаж импортируется без аватара" v-model="exportSnippet"></v-textarea>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn outlined block color="primary" @click="copyToClipboard"><v-icon>file_copy</v-icon>Скопируйте и
                  сохраните</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="deleteDialog" width="350" persistent>
            <v-card>
              <v-card-title style="background-color: #262e37; color: #fff">
                <span>Удалить персонажа</span>
                <v-spacer />
                <v-icon dark @click="deleteDialog = false">close</v-icon>
              </v-card-title>
              <v-card-text>
                <div class="pt-2 pb-2">
                  <p>Вы уверены? Персонаж удалится навсегда</p>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn block color="primary" @click="deleteCharacter">Удалить</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>

    <v-dialog v-model="confirmDialog.show" max-width="400">
      <v-card>
        <v-card-title>Подтверждение</v-card-title>

        <v-card-text>
          {{ confirmDialog.text }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn text @click="resolveConfirm(false)">
            Отмена
          </v-btn>

          <v-btn color="red" text @click="resolveConfirm(true)">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="js">
import { mapGetters } from 'vuex';
import SluggerMixin from '~/mixins/SluggerMixin';
import DodDefaultBreadcrumbs from '../../components/DodDefaultBreadcrumbs';
import AppLoader from '~/components/AppLoader.vue';


export default {
  name: 'MyCharacters',
  components: { DodDefaultBreadcrumbs, AppLoader },
  mixins: [
    SluggerMixin,
  ],
  props: [],
  data() {
    return {
      confirmDialog: {
        show: false,
        text: '',
        resolve: null
      },
      importDialog: false,
      importSnippet: '',
      exportDialog: false,
      exportSnippet: '',
      deleteDialog: false,
      deleteId: undefined,
      breadcrumbItems: [
        { text: '', nuxt: true, exact: true, to: '/' },
        { text: 'Билдодельня', nuxt: true, exact: true, to: '/forge' },
        { text: 'Персонажи', nuxt: true, exact: true, to: '/forge/my-characters' },
      ],
      howTo: {
        steps: [
          { name: 'Select Species', text: 'Select a species. This defines the available archetypes. You may select any species that has a base tier lower or equals the Setting Tier.' },
          { name: 'Select Archetype', text: 'Select an Archetype. The archetype provides keywords, wargear and unique abilities.' },
          { name: 'Buy Attributes, Skills and Talents', text: 'Spend points on Attributes, Skills, Talents and Psychic Powers.' },
          { name: 'Ascend the Character', text: 'If the current tier is lower than the Setting Tier, select one or more ascension packages.' },
          { name: 'Select a Background', text: 'Choose a background.' },
        ],
      },
    };
  },
  async mounted() {
    if (process.client) {
      document.addEventListener('visibilitychange', this.onVisible)
    }

    this.syncInterval = setInterval(() => {
      this.loadCloudCharacters()
    }, 5000) // каждые 5 сек

  },
  beforeDestroy() {
    if (process.client) {
      document.removeEventListener('visibilitychange', this.onVisible)
    }

    clearInterval(this.syncInterval)
  },
  head() {
    const title = 'Создание персонажа для Pathfinder 2e | Билдодельня';
    const description =
      '';
    const image = 'http://www.shadow-of-tales.ru/img/artwork_abstract.jpg';
    const imageTwitter = 'http://www.shadow-of-tales.ru/img/artwork_forge_twitter.jpg';

    const howToSchema = {
      '@context': 'http://schema.org',
      '@type': 'HowTo',
      name: '',
      description: '',
      image: 'http://www.shadow-of-tales.ru/img/artwork_abstract.jpg',
      tool: [
        {
          '@type': 'HowToTool',
          name: 'Wrath & Glory Core Rules',
        },
      ],
      supply: '', // TODO
      step: this.howTo.steps.map((item) => ({
        '@type': 'HowToStep',
        name: item.name,
        text: item.text,
        image: '', // TODO
        url: '', // TODO
      })),
      /**
       * period of 1 hour
       *
       * @see https://www.digi.com/resources/documentation/digidocs/90001437-13/reference/r_iso_8601_duration_format.htm
       */
      totalTime: 'P1H',
    };

    return {
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', name: 'og:title', content: title },
        { hid: 'og:description', name: 'og:description', content: description },
        { hid: 'og:image', name: 'og:image', content: image },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: title },
        { hid: 'twitter:description', name: 'twitter:description', content: description },
        { hid: 'twitter:image', name: 'twitter:image', content: imageTwitter },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        { innerHTML: JSON.stringify(howToSchema), type: 'application/ld+json' },
      ],
    };
  },
  computed: {
    ...mapGetters({
      version: 'version',
      builderVersion: 'builderVersion',
      characterIds: 'characters/characterIds',
      characterSets: 'characters/characterSets',
    }),
    hasLegacyCharacters() {
      if (this.characterIds === undefined) {
        return false;
      }
      return this.characterIds.map((id) => this.characterVersion(id)).some((version) => version <= 6);
    },
    hasUnmigratedCharacters() {
      if (this.characterIds === undefined) {
        return false;
      }
      return this.characterIds.map((id) => this.characterVersion(id)).some((version) => (version < this.builderVersion) && (version > 6));
    },
  },
  methods: {
    async loadCloudCharacters() {
      if (!this.$store.state.user) return

      const { data, error } = await this.$supabase
        .from('Character')
        .select('*')
        .eq('user_id', this.$store.state.user.id)

      this.$store.commit('characters/REPLACE_CLOUD', data)
    },
    async onVisible() {
      if (document.visibilityState === 'visible') {
        await this.loadCloudCharacters()
      }
    },
    openCharacter(id) {

      // 1. ставим активного персонажа
      this.$store.commit('characters/SET_ACTIVE', id)

      // 2. идём в билд
      this.$router.push(`/forge/characters/${id}/builder/setting`)
    },
    confirm(text) {
      this.confirmDialog.text = text
      this.confirmDialog.show = true

      return new Promise(resolve => {
        this.confirmDialog.resolve = resolve
      })
    },

    resolveConfirm(result) {
      this.confirmDialog.show = false
      if (this.confirmDialog.resolve) {
        this.confirmDialog.resolve(result)
      }
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    migrateAllCharacters() {
      this.migrateCharacters(this.characterIds);
    },
    migrateCharacters(ids) {
      ids.forEach((id) => this.migrateCharacter(id));
    },
    migrateCharacter(id) {
      this.$store.dispatch('characters/migrate', { characterId: id });
    },
    characterVersion(id) {
      return this.$store.getters['characters/characterVersionById'](id);
    },
    characterName(id) {
      return this.$store.getters['characters/characterNameById'](id);
    },
    characterSpeciesKey(id) {
      return this.$store.getters['characters/characterSpeciesKeyById'](id);
    },
    characterSpeciesLabel(id) {
      return this.$store.getters['characters/characterSpeciesLabelById'](id);
    },
    characterArchetypeKey(id) {
      return this.$store.getters['characters/characterArchetypeKeyById'](id);
    },
    characterArchetypeLabel(id) {
      return this.$store.getters['characters/characterArchetypeLabelById'](id);
    },
    characterRank(id) {
      return this.$store.getters['characters/characterLevelById'](id);
    },
    characterTotalBp(id) {
      return this.$store.getters['characters/characterTotalBuildPointsById'](id);
    },
    characterSpendBp(id) {
      return this.$store.getters['characters/characterSpendBuildPointsById'](id);
    },
    characterSettingTitle(id) {
      return this.$store.getters['characters/characterSettingTitleById'](id);
    },
    characterSettingTier(id) {
      return this.$store.getters['characters/characterSettingTierById'](id);
    },
    isLegacyVersion(id) {
      return this.characterVersion(id) <= 6;
    },
    async toggleCloud(character) {

      const newValue = !character.isMarked

      if (!newValue) {
        const ok = await this.confirm('Удалить из облака?')
        if (!ok) return
      }



      if (newValue) {
        await this.markToCloud(character)

      } else {
        await this.removeFromCloud(character.id)
      }
    },
    async markToCloud(character) {
      await this.$supabase
        .from('Character')
        .upsert({
          character_id: character.id,
          user_id: this.$store.state.user.id,
          data: character
        })

      this.$store.commit('characters/Mark', { id: character.id, mark: true });
    },
    async removeFromCloud(id) {

      await this.$supabase
        .from('Character')
        .delete()
        .eq('character_id', id)

      this.$store.commit('characters/Mark', { id: id, mark: false });
    },
    characterAvatar(id) {
      const customAvatarUrl = this.$store.getters['characters/characterAvatarUrlById'](id);
      if (customAvatarUrl) {
        return customAvatarUrl;
      }

      const archetypeKey = this.characterArchetypeKey(id);
      const speciesKey = this.characterSpeciesKey(id);
      if (archetypeKey !== undefined) {
        if (archetypeKey === 'advanced') {
          return '/img/avatar_placeholder.png';
        }
        if (!['core-ratling', 'core-ogryn'].includes(speciesKey)) {
          return `/img/avatars/archetype/${archetypeKey}.png`;
        }
      }

      if (speciesKey !== undefined) {
        return `/img/avatars/species/${speciesKey}.png`;
      }

      return '/img/avatars/species/playercore-human.png';
    },
    load(characterId) {

      this.$axios.get(`/api/characters/${characterId}`)
        .then((response) => {
          this.$store.dispatch('populateState', response);
        });

      // this.$store.dispatch('loadCharacterFromDatabase', characterId );
    },
    loadChar() {
      this.$store.commit('characters/SET_ACTIVE', characterId);
      this.$store.dispatch('loadCharacterFromDatabase', { id: 3 });
    },
    saveChar() {
      this.$store.dispatch('saveCurrentCharacterToDatabase');
    },
    newCharacter() {
      const newCharId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      // this.$store.commit('characters/create', newCharId);
      this.$store.dispatch('characters/createCharacter', newCharId);
      this.$ga.event('New Character', 'click', newCharId, 10);
    },
    openDeleteDialog(id) {
      this.deleteId = id;
      this.deleteDialog = true;
    },
    deleteCharacter() {
      const id = this.deleteId;
      this.removeFromCloud(id);
      this.$store.commit('characters/remove', id);
      this.deleteDialog = false;

      this.$ga.event('Delete Character', 'click', id, 1);
    },
    openExportDialog(id) {
      const characterJsonString = this.$store.getters['characters/characterStateJsonById'](id);
      // Создаём Blob из JSON строки
      const blob = new Blob([characterJsonString], { type: 'application/json' });

      // Создаём ссылку для скачивания
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `character_${id}.json`; // имя файла
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Освобождаем объект URL
      URL.revokeObjectURL(url);
      // this.exportSnippet = btoa(unescape(encodeURIComponent(characterJsonString)));
      // this.exportDialog = true;
    },
    copyToClipboard() {
      document.getElementById('exportSnippetId').select();
      document.execCommand("copy");
    },
    MarkCloud(id) {
      this.$store.commit('characters/Mark', { id: id, mark: true });
    },
    importJson(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target.result);
          // Здесь сохраняем данные в store или локальный state
          this.importCharacter(e.target.result)

        } catch (err) {

          alert('Неверный формат JSON!');
        }
      };
      reader.readAsText(file);
    },
    importCharacter(stateString) {
      const newCharId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
      const payload = {
        id: newCharId,
        stateString: stateString,
      };
      this.$store.commit('characters/import', payload);
      this.importSnippet = '';
      this.importDialog = false;
      this.$ga.event('Import Character', 'click', newCharId, 1);
    }
  },
};
</script>
<style scoped lang="scss">
.character-card {

  overflow: hidden;

  border-radius: 20px;

  transition: .25s ease;


}


.character-card:hover {

  transform: translateY(-5px);

}



/* IMAGE */

.character-cover {

  height: 190px;

  position: relative;

  background-size: cover;

  background-position: center;

  background-repeat: no-repeat;

}


.character-overlay {

  position: absolute;

  inset: 0;


  background:
    linear-gradient(180deg,
      transparent 20%,
      rgba(0, 0, 0, .85));

}




.character-info {

  position: absolute;

  left: 20px;

  bottom: 20px;

  color: white;

}



.character-info h2 {

  margin: 0;

  font-size: 26px;

  font-weight: 800;

  text-shadow:
    0 2px 8px black;

}



.character-meta {

  margin-top: 6px;

  font-size: 14px;

  opacity: .9;

}




.character-actions {

  padding: 8px 12px;

}



.character-actions .v-btn {

  margin-right: 4px;

}




/* MOBILE */

@media(max-width:600px) {


  .character-cover {

    height: 220px;

  }


  .character-info {

    left: 15px;

    bottom: 15px;

  }


  .character-info h2 {

    font-size: 22px;

  }


}
</style>