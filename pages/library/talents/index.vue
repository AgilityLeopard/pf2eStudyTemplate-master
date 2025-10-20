<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">
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
                  label="Search"
                />
              </v-col>

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
              <!-- 
              <v-col :cols="12">
                <v-chip-group
                  v-model="selectedTagsFilters"
                  active-class="primary--text"
                  column
                  multiple
                >
                  <v-chip
                    v-for="filter in tagFilters"
                    :key="filter.name"
                    :value="filter.name"
                    filter
                    small
                    label
                  >
                    {{ filter.name }}
                  </v-chip>
                </v-chip-group>
              </v-col> -->
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="searchResult"
            :page.sync="pagination.page"
            :search="searchQuery"
            item-key="id"
            sort-by="name"
            hide-default-footer
            @page-count="pagination.pageCount = $event"
          >
            <!-- <template v-slot:item.tags="{ item }">
              {{ item.tags ? item.tags.join(", ") : "" }}
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

      <!-- <v-col :cols="12">
        <v-card>
          <v-card-text>
            <h1>Search the Library for available wargear</h1>
            <p>
              This is a reference table for the wargear used in the Wrath and
              Glory Role Playing Game.
            </p>
          </v-card-text>
        </v-card>
      </v-col> -->
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from "~/components/DodDefaultBreadcrumbs";
import BreadcrumbSchemaMixin from "~/mixins/BreadcrumbSchemaMixin";
import SluggerMixin from "~/mixins/SluggerMixin";

export default {
  layout: "talents",
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [BreadcrumbSchemaMixin, SluggerMixin],
  head() {
    const title = "Черты | Библиотека";
    const description = "Expand your capabilities with a nice new talent.";
    const image = "https://www.doctors-of-doom.com/img/artwork_library.jpg";

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
  async asyncData({ $axios, query, error }) {
    const { data } = await $axios.get("/api/talents/");

    if (data === undefined || data.length <= 0) {
      error({ statusCode: 404, message: "No Talents found!" });
    }

    const filtersSourceModel = [];
    if (query["filter-source"]) {
      filtersSourceModel.push(query["filter-source"]);
    }

    return {
      repository: data,
      filters: {
        source: { model: filtersSourceModel, label: "Filter by Homebrew" },
      },
    };
  },
  data() {
    return {
      searchQuery: "",
      selectedTagsFilters: [],
      filters: {
        tags: {
          model: [],
          label: "Filter by Tags",
        },
      },
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: "name",
        rowsPerPage: 25,
      },
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name",
          class: "",
        },
        {
          text: "Effect",
          align: "start",
          value: "snippet",
          class: "",
        },
        {
          text: "Tags",
          align: "start",
          value: "tags",
          class: "",
        },
        {
          text: "Cost",
          align: "right",
          value: "cost",
          class: "",
        },
        {
          text: "Source",
          align: "start",
          value: "source.book",
          class: "",
        },
      ],
    };
  },
  computed: {
    filterSourceOptions() {
      const options = this.repository
        .filter((i) => i && i.source) // убираем null, undefined и объекты без source
        .map((i) => ({ value: i.source.key, text: i.source.book }));

      return [...new Set(options)].sort((a, b) => {
        const nameA = a.name || "";
        const nameB = b.name || "";
        return nameA.localeCompare(nameB);
      });
      // return [...new Set(options)].sort((a, b) => a.text.localeCompare(b.text));
    },
    searchResult() {
      if (this.repository === undefined) {
        return [];
      }
      let searchResult = this.repository;

      // if (this.selectedTagsFilters.length > 0) {
      //   searchResult = searchResult.filter((item) =>
      //     this.selectedTagsFilters.some((m) => item.tags.includes(m))
      //   );
      // }

      // searchResult = this.repository.filter(
      //   (i) =>
      //     i.source &&
      //     i.source?.key &&
      //     (i?.source?.key === "playerCore" || i?.source?.key === "playerCore2")
      // );

      let filter;

      // filter = this.filters.source;
      // if (filter.model.length > 0) {
      //   searchResult = searchResult.filter((i) =>
      //     filter.model.includes(i.source.key)
      //   );
      // }

      return searchResult;
    },
    tagFilters() {
      // if (this.repository === undefined) {
      //   return [];
      // }
      // let reduced = [];
      // reduced = this.repository
      //   .filter((i) => i && i.traits)
      //   .map((s) => s.traits);
      // // talent.forEach((item) => {
      // //   if (item.traits) {
      // //     reduced.push(...item.traits);
      // //   }
      // // });
      // reduced = reduced.filter((item) => item.trim().length > 0);
      // const distinct = [...new Set(reduced)];
      // return distinct.sort().map((tag) => ({ name: tag }));

      let filteredTalents = this.repository.filter((i) =>
        i.key.includes("playerCore")
      );

      // let filteredTalents = this.repository
      //   .filter((i) => i && i.traits)
      //   .forEach((species) => {
      //     const tr = Array.isArray(species.traits)
      //       ? species.traits
      //       : String(species.traits).split(","); // если не массив — превращаем в массив

      //     const lowercaseKeywords = species.traits ? tr : "";

      //     species.traits = species.traits ? tr.map((s) => s.trim()) : "";
      //   });
      // const lowercaseKeywords = filteredTalents.map((s) =>
      //   s.traits.toUpperCase()
      // );

      // filteredTalents = filteredTalents.filter((talent) =>
      //   lowercaseKeywords.includes(talent.traits.toString().toUpperCase())
      // );
      let reduced = [];
      filteredTalents.forEach((item) => {
        if (item.traits) {
          reduced.push(...item.traits);
        }
      });
      reduced = reduced.filter((item) => item.trim().length > 0);
      const distinct = [...new Set(reduced)];
      return distinct.sort().map((tag) => ({ name: tag }));
    },
    breadcrumbItems() {
      return [
        {
          text: "",
          disabled: false,
          nuxt: true,
          exact: true,
          to: "/",
        },
        {
          text: "Library",
          disabled: false,
          nuxt: true,
          exact: true,
          to: "/library",
        },
        {
          text: "Talents",
          disabled: false,
          nuxt: true,
          exact: true,
          to: "/library/talents",
        },
      ];
    },
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    },
  },
  methods: {
    toTypeString(item) {
      const types = [item.type];
      if (item.subtype) {
        types.push(item.subtype);
      }
      return types.join(" • ");
    },
    toggleTypeFilter(name) {
      if (this.selectedTypeFilters.includes(name)) {
        this.selectedTypeFilters = this.selectedTypeFilters.filter(
          (d) => d != name
        );
      } else {
        this.selectedTypeFilters.push(name);
      }
    },
  },
};
</script>

<style scoped lang="css"></style>
