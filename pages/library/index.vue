<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">
      <v-col
        v-for="section in sortedSections"
        :key="section.key"
        :cols="12"
        :sm="6"
        :md="4"
        :lg="4"
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
            <div
              class="card__image"
              :style="{ backgroundImage: 'url(' + section.imageSrc + ')' }"
              loading
            />
          </div>

          <div class="card__content-container pa-4">
            <h2 class="headline" v-html="section.title" />

            <h3 class="card__content-subtitle pb-4 subtitle-2">
              {{ section.subtitle }}
            </h3>

            <p class="body-2" v-html="section.htmlText" />

            <div class="card__content-footer">
              <v-btn block color="success">
                {{ section.link.text }}
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from "~/components/DodDefaultBreadcrumbs";

export default {
  components: { DodDefaultBreadcrumbs },
  head() {
    const breadcrumbListSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: this.breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: index === 0 ? "Shadow Tales" : item.text,
        item: `http://www.shadow-of-tales.ru${item.to}`,
      })),
    };

    return {
      title: "Библиотека",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "" +
            "used by friends and foes. Enter the library and search for weapons, armour and tools.",
        },
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          innerHTML: JSON.stringify(breadcrumbListSchema),
          type: "application/ld+json",
        },
      ],
    };
  },
  data() {
    return {
      breadcrumbItems: [
        {
          text: "",
          disabled: false,
          nuxt: true,
          exact: true,
          to: "/",
        },
        {
          text: "Библиотека",
          disabled: false,
          nuxt: true,
          exact: true,
          to: "/library",
        },
      ],
      sections: [
        {
          key: "species",
          title: "Родословная",
          subtitle: "Всякие родословные",
          imageSrc: "/img/artwork_vault_bright.jpg",
          htmlText: "",
          link: { text: "Поиск Родословной", route: "/library/species" },
          isActive: true,
          classes: [],
        },
        {
          key: "archetypes",
          title: "Класс",
          subtitle: "Классы, что можно найти",
          imageSrc: "/img/artwork_vault_bright.jpg",
          htmlText: "",
          link: { text: "Поиск Классов", route: "/library/archetypes" },
          isActive: true,
          classes: [],
        },
        {
          key: "ascensionPackages",
          title: "Предыстории",
          subtitle: "Поиск предыстории",
          imageSrc: "/img/artwork_vault_bright.jpg",
          htmlText: "",
          link: {
            text: "Поиск Предысторий",
            route: "/library/ascension-packages",
          },
          isActive: true,
          classes: [],
        },
        {
          key: "talents",
          title: "Черты",
          subtitle: "Черты Навыков, Общие и т.д.",
          imageSrc: "/img/artwork_vault_bright.jpg",
          htmlText: "",
          link: { text: "Поиск Черт", route: "/library/talents" },
          isActive: true,
          classes: [],
        },
        // {
        //   key: "psychicPowers",
        //   title: "Заклинания (в разработке!)",
        //   subtitle: "Найди заклинания на свой вкус",
        //   imageSrc: "/img/artwork_vault_bright.jpg",
        //   htmlText: "",
        //   link: { text: "Поиск Заклинаний", route: "/library/psychic-powers" },
        //   isActive: true,
        //   classes: [],
        // },
        {
          key: "wargear",
          title: "Снаряжение",
          subtitle: "Оружие, Доспехи, Зелья",
          imageSrc: "/img/artwork_vault_bright.jpg",
          htmlText: "",
          link: { text: "Поиск Снаряжений", route: "/library/wargear" },
          isActive: true,
          classes: [],
        },
      ],
    };
  },
  computed: {
    sortedSections() {
      return this.sections.sort((a, b) => a.title.localeCompare(b.key));
    },
  },
  methods: {},
};
</script>

<style scoped lang="css"></style>
