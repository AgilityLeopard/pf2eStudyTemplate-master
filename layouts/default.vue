<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

  <v-app>
    <AppLoader :visible="$store.state.ui.loading" />
    <v-navigation-drawer v-model="drawer.open" :clipped="drawer.clipped" :fixed="drawer.fixed"
      :permanent="drawer.permanent" :mini-variant="drawer.mini" app disable-resize-watcher>
      <v-list>
        <v-list-item href="https://t.me/shadowtalesgm" target="_blank">
          <v-list-item-icon>
            <v-icon>mdi-telegram</v-icon>
          </v-list-item-icon>

          <v-list-item-title>
            Telegram
          </v-list-item-title>
        </v-list-item>

        <v-list-item href="https://discord.gg/5rEDvSSXSZ" target="_blank">
          <v-list-item-icon>
            <v-icon>mdi-discord</v-icon>
          </v-list-item-icon>

          <v-list-item-title>
            Discord
          </v-list-item-title>
        </v-list-item>

        <v-list-item @click="toggleDarkTheme">
          <v-list-item-icon>
            <v-icon>mdi-theme-light-dark</v-icon>
          </v-list-item-icon>

          <v-list-item-title>
            Тема
          </v-list-item-title>
        </v-list-item>

        <div v-for="item in navigation" :key="item.to">
          <v-list-group v-if="item.children">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </template>
            <v-list-item class="ml-4" v-for="child in item.children" :key="child.to" :to="child.to" nuxt>
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :to="item.to" nuxt>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ item.subtitle }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
        </div>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark dense style="background-color: #212121" :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft">
      <v-container fluid class="px-2 fill-height" :class="{ 'pl-2 pr-2': this.$vuetify.breakpoint.mdAndUp }">
        <!-- MOBILE MENU -->
        <v-app-bar-nav-icon class="d-md-none" @click.stop="toggleDrawer" />
        <v-toolbar-title>
          <nuxt-link to="/" class="title brand-logo brand-logo__text">
            Shadow Tales
          </nuxt-link>
        </v-toolbar-title>

        <v-spacer class="d-none d-md-flex" />

        <v-toolbar-items class="mobile-actions">
          <v-btn icon class="top-icon-btn d-none d-md-flex" href="https://t.me/shadowtalesgm" target="_blank">
            <v-icon size="20">mdi-telegram</v-icon>
          </v-btn>

          <v-btn icon class="top-icon-btn d-none d-md-flex" href="https://discord.gg/5rEDvSSXSZ" target="_blank">
            <v-icon size="20">mdi-discord</v-icon>
          </v-btn>

          <v-btn icon class="top-icon-btn d-none d-md-flex" @click="toggleDarkTheme">
            <v-icon size="20">
              mdi-theme-light-dark
            </v-icon>
          </v-btn>


          <div v-if="user">

            <template v-if="user">
              <v-menu offset-y bottom left>
                <template #activator="{ on, attrs }">
                  <v-btn icon class="ml-2 profile-btn" v-bind="attrs" v-on="on">
                    <v-avatar size="36">
                      <v-icon size="26">mdi-account-circle</v-icon>
                    </v-avatar>
                  </v-btn>
                </template>

                <v-card min-width="240">
                  <v-list dense>

                    <v-list-item>
                      <v-list-item-avatar>
                        <v-avatar size="42">
                          <v-icon large>mdi-account-circle</v-icon>
                        </v-avatar>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          {{ profile?.username }}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          Игрок
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-divider />

                    <v-list-item to="/profile" nuxt>
                      <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                      </v-list-item-icon>

                      <v-list-item-title>
                        Профиль
                      </v-list-item-title>
                    </v-list-item>

                    <v-list-item @click="logout">
                      <v-list-item-icon>
                        <v-icon color="error">mdi-logout</v-icon>
                      </v-list-item-icon>

                      <v-list-item-title>
                        Выйти
                      </v-list-item-title>
                    </v-list-item>

                  </v-list>
                </v-card>
              </v-menu>
            </template>
          </div>

          <div v-else class="auth-buttons">

            <!-- MOBILE -->
            <v-menu offset-y class="d-md-none">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon class="d-flex d-md-none" v-bind="attrs" v-on="on">
                  <v-icon>
                    mdi-account-circle
                  </v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-list dense>

                  <v-list-item to="/login" nuxt>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-login
                      </v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>
                      Войти
                    </v-list-item-title>
                  </v-list-item>


                  <v-list-item to="/register" nuxt>
                    <v-list-item-icon>
                      <v-icon>
                        mdi-account-plus
                      </v-icon>
                    </v-list-item-icon>

                    <v-list-item-title>
                      Регистрация
                    </v-list-item-title>
                  </v-list-item>

                </v-list>
              </v-card>

            </v-menu>


            <!-- DESKTOP -->
            <div class="d-none d-md-flex auth-buttons">
              <v-btn text small class="auth-btn" to="/login" nuxt>
                <v-icon left small>mdi-login</v-icon>
                Войти
              </v-btn>

              <v-btn small class="auth-btn auth-btn--primary" to="/register" nuxt>
                <v-icon left small>mdi-account-plus</v-icon>
                Регистрация
              </v-btn>
            </div>

          </div>
        </v-toolbar-items>

        <!-- <v-app-bar-nav-icon @click.stop="toggleDrawer" class="d-md-none  mr-2" /> -->
      </v-container>
    </v-app-bar>

    <v-main>
      <v-toolbar dense flat class="navigation-toolbar d-none d-md-block">
        <v-container fluid class="px-2 fill-height">

          <v-toolbar-items class="nav-items">

            <v-btn v-for="item in navigation" :key="item.to" :to="item.to" nuxt text class="nav-button"
              active-class="nav-button-active">
              <v-icon v-if="item.icon" small left>
                {{ item.icon }}
              </v-icon>

              {{ item.title }}
            </v-btn>

          </v-toolbar-items>

        </v-container>
      </v-toolbar>

      <v-container>

        <nuxt />
      </v-container>
    </v-main>

    <default-footer />
  </v-app>

</template>

<script>
import DefaultFooter from "~/components/DefaultFooter.vue";
import ToolbarAccountActions from "~/components/user/ToolbarAccountActions.vue";
import AppLoader from '~/components/AppLoader.vue';

export default {
  components: {
    DefaultFooter,
    ToolbarAccountActions,
    AppLoader
  },
  head() {
    return {
      link: [
        {
          rel: "canonical",
          href: `http://www.shadow-of-tales.ru${this.$route.path}`,
        },
      ],
    };
  },
  async mounted() {
    this.$supabase.auth.onAuthStateChange((event, session) => {
      this.$store.commit('SET_USER', session?.user || null)
    })
  },
  data() {
    return {
      darkTheme: false,
      loading: false,
      navigation: [
        // { to: '/vault', title: 'Vault', subtitle: 'Browse Homebrews', icon: '' },
        {
          to: "/forge/my-characters",
          title: "Билдодельня",
          subtitle: "Создание персонажей",
          icon: "",
        },
        // { to: '/bestiary', title: 'Bestiary', subtitle: 'Find Threats', icon: '' },
        // { to: '/network', title: 'Network', subtitle: 'Find Assets', icon: '' },
        {
          to: '/posts', title: 'Новости', subtitle: 'Патчноуты и обновления', icon: ''
        },
        // { to: '/ether', title: 'Ether', subtitle: 'Browse Let´s Plays', icon: '' },
        {
          to: "/library",
          title: "Библиотека",
          subtitle: "Просмотр предметов",
          icon: "",
          children: [
            {
              to: "/library/species",
              title: "Species",
              subtitle: "Browse ",
              icon: "",
            },
            {
              to: "/library/archetypes",
              title: "Archetypes",
              subtitle: "Browse ",
              icon: "",
            },
            {
              to: "/library/ascension-packages",
              title: "Species",
              subtitle: "Browse ",
              icon: "",
            },
            {
              to: "/library/talents",
              title: "Talents",
              subtitle: "Browse ",
              icon: "",
            },
            {
              to: "/library/wargear",
              title: "Wargear",
              subtitle: "Browse ",
              icon: "",
            },
            // {
            //   to: "/library/psychic-powers",
            //   title: "Psychic Powers",
            //   subtitle: "Browse ",
            //   icon: "",
            // },
          ],
        },
        // {
        //   to: "/codex",
        //   title: "Правила",
        //   subtitle: "Просмотр правил",
        //   icon: "",
        // },
      ],
      drawer: {
        // sets the open status of the drawer
        open: false,
        // sets if the drawer is shown above (false) or below (true) the toolbar
        clipped: false,
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
    };
  },
  // mounted() {
  //   // показываем лоадер при переходе
  //   this.$nuxt.$on('route:start', () => { this.loading = true })
  //   this.$nuxt.$on('route:end', () => { this.loading = false })
  // },

  computed: {
    theme() {
      return this.$store.getters["theme"];
    },
    user() {
      return this.$store.state.user
    },
    profile() {
      return this.$store.state.profile
    },
    authReady() {
      return this.$store.state.authReady
    }
  },
  watch: {
    theme: {
      handler(newTheme, oldTheme) {
        this.$vuetify.theme.dark = newTheme !== "light";
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async logout() {
      await this.$supabase.auth.signOut()
      this.$store.commit('CLEAR_USER')
      // ❗ очищаем только cloud
      this.$store.commit('characters/CLEAR_CLOUD')
      this.$router.push('/login') // ← обязательно
    },
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      let theme = this.$vuetify.theme.dark ? "dark" : "light";
      this.$store.commit("setTheme", theme);
      this.$ga.event("Settings", "Change Theme", theme, 1);
    },
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
  },
  mounted() {
    this.$store.commit('ui/SET_LOADING', false)
  },
};
</script>

<style scoped lang="scss">
.brand-logo {
  &__text {
    color: hsl(0, 0%, 100%);
    text-decoration: none;
  }
}

.profile-btn {
  transition: .2s;
}

.profile-btn:hover {
  transform: scale(1.08);
}

.profile-btn .v-avatar {
  border: 2px solid rgba(0, 229, 255, .55);
  box-shadow: 0 0 10px rgba(0, 229, 255, .35);
}

.top-icon-btn {
  margin: 0 4px;
  border-radius: 50%;
  transition: 0.2s ease;
  background: rgba(255, 255, 255, 0.04);
}

.top-icon-btn:hover {
  transform: translateY(-2px);
  background: rgba(0, 229, 255, 0.12);
  box-shadow: 0 0 12px rgba(0, 229, 255, 0.25);
}

.theme--dark .top-icon-btn {
  background: rgba(255, 255, 255, 0.05);
}

.auth-buttons {
  display: flex;
  gap: 6px;
  align-items: center;
}

.auth-btn {
  border-radius: 8px;
  text-transform: none;
  transition: 0.2s;
}

.auth-btn:hover {
  transform: translateY(-1px);
}

.auth-btn--primary {
  background: rgba(0, 229, 255, 0.12);
}

.auth-btn--primary:hover {
  background: rgba(0, 229, 255, 0.22);
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.2);
}

@media (max-width:600px) {

  .brand-logo__text {
    font-size: 18px;
  }
}

.mobile-actions {
  display: flex;
  align-items: center;
}

@media(max-width:600px) {
  .mobile-actions {
    flex: 0 0 auto;
  }
}

.navigation-toolbar {
  background: transparent !important;
}


.nav-button {
  height: 42px !important;
  min-height: 42px !important;

  border-radius: 12px;

  text-transform: none;
  letter-spacing: 0;

  font-size: 15px;
  font-weight: 500;

  padding: 0 18px !important;

  transition: .2s ease;

  .v-icon {
    font-size: 20px;
  }

  &:hover {
    background: rgba(25, 118, 210, .12);
    transform: translateY(-1px);
  }
}


.nav-items {
  gap: 10px;
  align-items: center;
}


.nav-button-active {
  background: rgba(25, 118, 210, .18) !important;
  color: #1976d2 !important;
  font-weight: 600;

  &:before {
    opacity: 0 !important;
  }
}
</style>
