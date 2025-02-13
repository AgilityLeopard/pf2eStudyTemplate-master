<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row
      justify="center"
      no-gutters
      dense
    >
      <v-col
        v-for="section in sortedSections"
        :key="section.key"
        :cols="12"
        :sm="6"
        :md="4"
        :lg="4"
        class="pa-3"
      >
        <v-card
          :to="section.link.route"
          :disabled="!section.isActive"
          class="card"
          exact
          nuxt
          hover
        >
          <div class="card__image-container">
            <div class="card__image" :style="{ backgroundImage: 'url('+section.imageSrc+')' }" loading />
          </div>

          <div class="card__content-container pa-4">
            <h2 class="headline" v-html="section.title" />

            <h3 class="card__content-subtitle pb-4 subtitle-2">
              {{ section.subtitle }}
            </h3>

            <p class="body-2" v-html="section.htmlText" />

            <div class="card__content-footer">
              <v-btn block color="success">
                Управлять {{ section.title }}
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from '~/components/DodDefaultBreadcrumbs';

export default {
  components: {
    DodDefaultBreadcrumbs,
  },
  head() {
    const breadcrumbListSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: this.breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: (index === 0 ? 'Shadow of Tales' : item.text),
        item: `https://www.doctors-of-doom.com${item.to}`,
      })),
    };

    const title = 'Создание персонажа';
    const description =
      '';
    const image = 'https://www.doctors-of-doom.com/img/artwork_abstract.jpg';
    const imageTwitter = 'https://www.doctors-of-doom.com/img/artwork_forge_twitter.jpg';

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
        { innerHTML: JSON.stringify(breadcrumbListSchema), type: 'application/ld+json' },
      ],
    };
  },
  data() {
    return {
      breadcrumbItems: [
        { text: '', disabled: false, nuxt: true, exact: true, to: '/' },
        { text: 'Билдодельня', disabled: false, nuxt: true, exact: true, to: '/forge' },
      ],
      sections: [
        {
          key: 'characters',
          title: 'Персонажи',
          subtitle: 'Создание и управление своим персонажем',
          imageSrc: '/img/artwork_vault_bright.jpg',
          htmlText: '',
          link: { text: 'Manage Characters', route: '/forge/my-characters' },
          isActive: true,
          classes: [],
        },
        // {
        //   key: 'species',
        //   title: 'Species',
        //   subtitle: 'Create and manage custom Species',
        //   imageSrc: '/img/artwork_vault_bright.jpg',
        //   htmlText: '',
        //   link: { text: 'Manage Species', route: '/forge/species' },
        //   isActive: true,
        //   classes: [],
        // },
      ],
    };
  },
  computed: {
    sortedSections() {
      return this.sections.sort((a, b) => a.title.localeCompare(b.title));
    },
  },
  methods: {
  },
};
</script>

<style scoped lang="css">
</style>
                                                                                                                                                                                                                                                                                                                                                                                           
