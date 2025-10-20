<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">
      <!-- filter -->
      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col :cols="12" :sm="6">
                <v-text-field
                  v-model="searchQuery"
                  filled
                  dense
                  clearable
                  label="Поиск"
                />
              </v-col>

              <!-- filter species -->
              <v-col :cols="12" :sm="6">
                <v-select
                  v-model="filters.source.model"
                  :items="filterSourceOptions"
                  :label="filters.source.label"
                  filled
                  clearable
                  multiple
                  dense
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Table -->
      <v-col :cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="searchResult"
            :page.sync="pagination.page"
            :search="searchQuery"
            :items-per-page="15"
            item-key="key"
            sort-by="nameAncestry"
            hide-default-footer
            @page-count="pagination.pageCount = $event"
          >
            <!-- Source Book -->
            <template v-slot:item.source.book="{ item }">
              <v-row no-gutters>
                <v-col :cols="12">
                  {{ item.source.book }}
                  <NuxtLink
                    v-if="item.source.path"
                    :to="item.source.path"
                    target="_blank"
                  >
                    <v-icon small> launch </v-icon>
                  </NuxtLink>
                </v-col>
                <!-- <v-col
                  v-if="item.source.page"
                  :cols="12"
                  class="caption grey--text"
                >
                  pg. {{ item.source.page }}
                </v-col> -->
              </v-row>
            </template>

            <!-- Detail Page link -->
            <!-- <template v-slot:item.actions="{ item }">
              <v-btn
                v-if="item.stub === undefined || !item.stub"
                small
                icon
                nuxt
                :to="`/library/species/${textToKebab(item.key)}`"
              >
                <v-icon>chevron_right</v-icon>
              </v-btn>
            </template> -->

            <template v-slot:item.nameAncestry="{ item }">
              <router-link
                v-if="!item.stub"
                :to="`/library/species/${textToKebab(item.key)}`"
                class="clickable-name"
              >
                {{ item.nameAncestry }}
              </router-link>
              <span v-else class="text-disabled">
                {{ item.nameAncestry }}
              </span>
            </template>

            <template v-slot:item.size="{ item }">
              {{ size(item.size) }}
            </template>

            <template v-slot:item.rarity="{ item }">
              {{ rarity(item.rarity) }}
            </template>

            <template v-slot:item.attributeBoost="{ item }">
              <div v-for="boost in item.attributeBoost" class="text-lg-justify">
                <div v-if="boost.value > 0">
                  <strong>{{ boost.name }}</strong>
                </div>
              </div>

              <div v-for="boost in item.abilityBoost" class="text-lg-justify">
                <div>
                  <strong> Свободное повышение </strong>
                </div>
              </div>
            </template>

            <template v-slot:item.attributeFlaw="{ item }">
              <div v-for="boost in item.attributeFlaw" class="text-lg-justify">
                <div v-if="boost.value < 0">
                  <strong>{{ boost.name }}</strong>
                </div>
              </div>
            </template>

            <!-- Expand -->
            <!-- <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="pa-4">
                  <dod-species-details :item="item" class="pa-2 pb-4" />

                  <v-btn
                    v-if="item.stub === undefined || !item.stub"
                    nuxt
                    :to="`/library/species/${textToKebab(item.key)}`"
                    color="success"
                  >
                    Показать детали
                  </v-btn>
                </div>
              </td>
            </template> -->
          </v-data-table>

          <div class="text-center pt-2">
            <v-pagination
              v-model="pagination.page"
              :length="pagination.pageCount"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from "~/components/DodDefaultBreadcrumbs";
import DodSpeciesDetails from "~/components/DodSpeciesDetails";
import SluggerMixin from "~/mixins/SluggerMixin";
import BreadcrumbSchemaMixin from "~/mixins/BreadcrumbSchemaMixin";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  components: {
    DodDefaultBreadcrumbs,
    DodSpeciesDetails,
  },
  mixins: [BreadcrumbSchemaMixin, SluggerMixin, StatRepositoryMixin],
  head() {
    const title = "Родословная | Библиотека";
    const description =
      "There are some homebrew species and human variants in addition to some Xenos options. " +
      "Check out the respective linked Homebrews for detailed informations.";
    const image = "http://www.shadow-of-tales.ru/img/artwork_library.jpg";

    return {
      title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", name: "og:title", content: title },
        { hid: "og:description", name: "og:description", content: description },
        { hid: "og:image", name: "og:image", content: image },
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          innerHTML: JSON.stringify(
            this.breadcrumbJsonLdSchema(this.breadcrumbItems)
          ),
          type: "application/ld+json",
        },
      ],
    };
  },
  async asyncData({ $axios, query, params, error }) {
    const response = await $axios.get("/api/species/");
    const { data } = response;

    if (data === undefined || data.length <= 0) {
      error({ statusCode: 404, message: "No Ascension Packages found!" });
    }

    const groupFilterSelections = [];
    if (query["filter-group"]) {
      // factionFilterSelections.push(query['filter-faction']);
    }

    const filtersSourceModel = [];
    if (query["filter-source"]) {
      filtersSourceModel.push(query["filter-source"]);
    }

    return {
      items: data,
      filters: {
        source: { model: filtersSourceModel, label: "Источники" },
      },
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
        {
          text: "Родословная",
          disabled: false,
          nuxt: true,
          exact: true,
          to: "/library/species",
        },
      ],
      searchQuery: "",
      selectedTypeFilters: [],
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: "title",
        rowsPerPage: 25,
      },
      headers: [
        // Name

        // HP

        // Size
        // Speed	Ability Boost	Ability Flaw	Language
        // Vision

        // Rarity

        // PFS
        {
          text: "Имя",
          align: "start",
          value: "nameAncestry",
          class: "",
        },
        {
          text: "Хиты",
          align: "start",
          value: "ancestryHitPoint",
          class: "",
        },
        {
          text: "Размер",
          align: "start",
          value: "size",
          class: "",
        },
        {
          text: "Скорость",
          align: "center",
          value: "speed",
          class: "",
        },
        {
          text: "Повышение",
          align: "start",
          value: "attributeBoost",
          class: "",
        },
        {
          text: "Понижение",
          align: "start",
          value: "attributeFlaw",
          class: "",
        },
        {
          text: "Язык",
          align: "start",
          value: "language",
          class: "",
          sortable: false,
        },
        {
          text: "Редкость",
          align: "start",
          value: "rarity",
          class: "",
          sortable: false,
        },
      ],
      expand: false,
    };
  },
  computed: {
    activeRepository() {
      return this.items;
    },
    filterSourceOptions() {
      const options = this.activeRepository.map((i) => ({
        value: i.source.key,
        text: i.source.book,
      }));
      return [...new Set(options)].sort((a, b) => a.text.localeCompare(b.text));
    },
    searchResult() {
      if (this.activeRepository === undefined) {
        return [];
      }
      let filteredResults = this.activeRepository;

      let filter;

      filter = this.filters.source;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter((i) =>
          filter.model.includes(i.source.key)
        );
      }

      return filteredResults;
    },
    filterSettingTierOptions() {
      return [
        { text: "Show all tiers", value: 6 },
        { text: "1 - One among billions", value: 1 },
        { text: "2 - Stalwart Defenders", value: 2 },
        { text: "3 - Elite Guardians", value: 3 },
        { text: "4 - Heroic Operatives", value: 4 },
        { text: "5 - Agents of Fate", value: 5 },
      ];
    },
    filterSpeciesOptions() {
      const array = [];
      this.activeRepository.forEach((item) => {
        array.push(...item.species);
      });
      const distinct = [...new Set(array)];
      return distinct.sort();
    },
    filterGroupOptions() {
      const reduce = this.activeRepository.map((item) => item.group);
      const distinct = [...new Set(reduce)];
      return distinct.filter((d) => d !== null).sort();
    },
  },
  methods: {
    size(size) {
      if (!size) return "";
      const s = this.sizeRepository.find((s) => s.key === size);
      return s ? s.name : "";
    },
    rarity(rarity) {
      if (!rarity) return "";
      const s = this.rarityRepository.find((s) => s.key === rarity);
      return s ? s.name : "";
    },
  },
};
</script>

<style scoped lang="css"></style>
