<template lang="html">
  <v-row justify="center" dense>
    <v-col v-for="section in sections" :key="section.key" cols="12" sm="6" md="4" class="pa-2">
      <v-card :to="section.link.route" :disabled="!section.isActive" class="section-card" exact nuxt hover>

        <div class="card__image-container">
          <div class="card__image" :style="{
            backgroundImage: `url(${section.imageSrc})`
          }"></div>
        </div>

        <div class="section-card__body">

          <h2 class="text-h6 font-weight-bold mb-1" v-html="section.title" />

          <div class="text-subtitle-2 mb-2 grey--text">
            {{ section.subtitle }}
          </div>

          <p class="body-2 mb-0 section-card__text" v-html="section.htmlText" />

          <v-btn class="mt-4" block small color="success">
            {{ section.link.text }}
          </v-btn>

        </div>

      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="js">
export default {

  components: {},
  head() {
    const title = 'Shadow Tales';
    const description = '';
    const image = 'http://www.shadow-of-tales.ru/img/background_abstract_green.jpg';

    return {
      title,
      meta: [
        // { hid: 'description', name: 'description', content: description },
        // // Open Graph
        // { hid: 'og:title', name: 'og:title', content: title },
        // { hid: 'og:description', name: 'og:description', content: description },
        // { hid: 'og:image', name: 'og:image', content: image },
        // // Twitter Card
        // { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        // { hid: 'twitter:title', name: 'twitter:title', content: title },
        // { hid: 'twitter:description', name: 'twitter:description', content: description },
        // { hid: 'twitter:image', name: 'twitter:image', content: image },
      ],
    };
  },
  data() {
    return {
      sections: [
        // {
        //   key: 'vault',
        //   title: 'Homebrew <strong>Vault</strong>',
        //   subtitle: 'A collection of Wrath & Glory homebrews',
        //   imageSrc: '/img/artwork_vault_tile.jpg',
        //   imageCredit: 'unknown, found at warhammer40k.fandom.com',
        //   htmlText:
        //     'The <strong>Vault</strong> contains an expanding collection of '
        //     + '<strong>homebrews from fans</strong> of the Wrath & Glory Roleplaying Game.',
        //   link: { text: 'To the Vault', route: '/vault' },
        //   isActive: true,
        //   classes: [],
        // },

        {
          key: 'forge',
          title: 'Персонажная <strong>Билдодельня</strong>',
          subtitle: 'Билдер для Патфайндер 2е',
          // imageSrc: '/img/artwork_mechanicus_aertist-alexboca_mozjpeg.jpg',
          // imageCredit: 'Artwork by AlexBoca (DevianArt)',
          imageSrc: '/img/artwork_forge_tile.jpg',
          imageCredit: 'Artwork by prettysleepy1 (Pixabay)',
          htmlText:
            'Создайте своего Персонажа для вашей сессии',
          link: { text: 'К билдодельне', route: '/forge/my-characters' },
          isActive: true,
          classes: [],
        },
        // {
        //   key: 'bestiary',
        //   title: 'Threat <strong>Bestiary</strong>',
        //   subtitle: 'A repository of player threats',
        //   imageSrc: '/img/artwork_bestiary_death.png',
        //   imageCredit: 'Artwork from Pixabay',
        //   htmlText:
        //     'In search of new <strong>threats</strong> for your players? '
        //     + 'Check out the <strong>Wrath & Glory bestiary</strong>.'
        //     + 'Those also contain enemies from the fan homebrews you can find in the <strong>Vault</strong>.',
        //   link: { text: 'To the Bestiary', route: '/bestiary' },
        //   isActive: true,
        //   classes: [],
        // },
        // {
        //   key: 'network',
        //   title: 'Community <strong>Network</strong>',
        //   subtitle: 'Assets & Links',
        //   imageSrc: '/img/artwork_network_tile.jpg',
        //   imageCredit: 'Artwork from Pixabay',
        //   htmlText: 'Check out some (one) of the assets provided by the community. E.g. some <strong>fillable character sheets</strong>.',
        //   link: { text: 'To the Network', route: '/network' },
        //   isActive: true,
        //   classes: [],
        // },
        {
          key: 'posts',
          title: '<strong>Новости</strong>',
          subtitle: 'Новости о Билдере для Pathfinder и Starfinder',
          imageSrc: '/img/artwork_posts_tile.jpg',
          imageCredit: 'Artwork from Pixabay',
          htmlText: '',
          link: { text: 'Новости и Обновления', route: '/posts' },
          isActive: true,
          classes: [],
        },
        // {
        //   key: 'eather',
        //   title: 'Прогресс заполнения базы данных',
        //   subtitle: 'Прогресс работ',
        //   imageSrc: '/img/artwork_ether.jpg',
        //   imageCredit: 'Artwork from Pixabay',
        //   htmlText: 'Тут будет ход выполнения работ',
        //   link: { text: 'To the Ether', route: '/ether' },
        //   isActive: true,
        //   classes: [],
        // },
        {
          key: 'library',
          title: '<strong>Библиотека</strong>',
          subtitle: 'Опции и возможности для персонажей',
          imageSrc: '/img/artwork_library_tile.jpg',
          imageCredit: 'Artwork from Pixabay',
          htmlText: 'Наследия, Родословные, Архетипы, Классы и т.д.',
          link: { text: 'К библиотеке', route: '/library' },
          isActive: true,
          classes: [],
        },
        // {
        //   key: 'codex',
        //   title: 'Правила',
        //   subtitle: 'Быстрые правила',
        //   imageSrc: '/img/artwork_codex_tile.jpg',
        //   imageCredit: 'Artwork from Pixabay',
        //   htmlText: 'Не знаете, как это работает? Посмотрите в правила.',
        //   link: { text: 'К правилам', route: '/codex' },
        //   isActive: true,
        //   classes: [],
        // },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.section-card {
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
  transition: .25s ease;

  &:hover {
    transform: translateY(-3px);
  }

  &__image {
    height: 150px;
    background-size: cover;
    background-position: center;
  }

  &__body {
    padding: 16px;
  }

  &__text {
    min-height: 40px;
  }
}


// телефоны
@media (max-width: 600px) {

  .section-card {

    &__image {
      height: 110px;
    }

    &__body {
      padding: 12px;
    }

    .text-h6 {
      font-size: 1rem !important;
    }

    &__text {
      display: none;
    }
  }

}


// планшеты+
@media (min-width: 960px) {

  .section-card {

    display: flex;
    min-height: 190px;

    &__image {
      width: 40%;
      height: auto;
      min-height: 190px;
    }

    &__body {
      flex: 1;
    }
  }
}
</style>