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
                  label="Поиск по имени"
                />
              </v-col>

              <v-col :cols="12" :sm="6">
                <v-select
                  v-model="filters.source.model"
                  :items="filterSourceOptions"
                  label="Источник"
                  filled
                  clearable
                  multiple
                  dense
                />
              </v-col>

              <v-col :cols="6">
                <v-autocomplete
                  v-model="selectedtraitsFilters"
                  :items="tagFilters"
                  item-text="name"
                  item-value="name"
                  label="Трейты"
                  multiple
                  clearable
                  chips
                  dense
                >
                </v-autocomplete>
              </v-col>

              <v-col cols="12" sm="6">
                <v-card flat>
                  <v-card-text>
                    <v-range-slider
                      v-model="levelRange"
                      :min="0"
                      :max="20"
                      :step="1"
                      thumb-label="always"
                      label="Уровень"
                    ></v-range-slider>

                    <div class="d-flex justify-space-between mt-2">
                      <!-- <span>От: {{ filters.levelRange[0] }}</span>
                      <span>До: {{ filters.levelRange[1] }}</span> -->
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
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
            <template v-slot:item.name="{ item }">
              <router-link
                v-if="!item.stub"
                :to="`/library/talents/${textToKebab(item.key)}`"
                class="clickable-name"
              >
                {{ item.name }}
              </router-link>

              <span v-else class="text-disabled">
                {{ item.nameAncestry }}
              </span>
            </template>

            <template v-slot:item.rarity="{ item }">
              {{ rarity(item.rarity) }}
            </template>

            <template v-slot:item.traits="{ item }">
              {{ item.traits }}
            </template>

            <template v-slot:item.level="{ item }">
              {{ item.level }}
            </template>

            <template v-slot:item.prerequisites="{ item }">
              {{
                item.prerequisites?.value
                  ? item.prerequisites?.value.map((s) => s.value).join(", ")
                  : item.prerequisites
              }}
            </template>
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
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  layout: "talents",
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [BreadcrumbSchemaMixin, SluggerMixin, StatRepositoryMixin],
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
    const config = {
      params: {
        source: ["playerCore", "playerCore2"].join(","),
      },
    };
    const { data } = await $axios.get("/api/talents/", config);

    if (data === undefined || data.length <= 0) {
      error({ statusCode: 404, message: "No Talents found!" });
    }

    const filtersSourceModel = [];
    if (query["filter-source"]) {
      filtersSourceModel.push(query["filter-source"]);
    }

    const normalized = data.map((item) => {
      if (item) {
        let traits = item.traits;

        // Если traits — это массив, склеиваем в строку
        if (Array.isArray(traits)) {
          traits = traits.join(", ");
        }

        // Если вдруг null или undefined, делаем пустую строку
        if (!traits) {
          traits = "";
        }

        return {
          ...item,
          traits: traits.trim(), // нормализуем итог
        };
      }
    });
    return {
      repository: normalized,
      filters: {
        source: { model: filtersSourceModel, label: "Filter by Homebrew" },
      },
    };
  },
  data() {
    return {
      searchQuery: "",
      selectedtraitsFilters: [],
      traitsSearch: "",
      levelRange: [0, 20],
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
          text: "Название",
          align: "start",
          value: "name",
          class: "",
        },
        {
          text: "Описание",
          align: "start",
          value: "snippet",
          class: "",
        },
        {
          text: "Трейты",
          align: "start",
          value: "traits",
          class: "",
        },
        {
          text: "Уровень",
          align: "start",
          value: "level",
          class: "",
        },
        {
          text: "Требование",
          align: "start",
          value: "prerequisites",
          class: "",
        },

        {
          text: "Редкость",
          align: "right",
          value: "rarity",
          class: "",
        },
        {
          text: "Источник",
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
    sources() {
      return ["playerCore", "playerCore2"];
    },
    searchResult() {
      if (this.repository === undefined) {
        return [];
      }
      let searchResult = this.repository.filter((s) => s !== null);

      if (this.selectedtraitsFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedtraitsFilters.some((m) => item.traits.includes(m))
        );
      }
      const [minLevel, maxLevel] = this.levelRange;

      if (maxLevel != 0) {
        searchResult = searchResult.filter(
          (item) => item.level >= minLevel && item.level <= maxLevel
        );
      }

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
    // tagFilters() {
    //   // if (this.repository === undefined) {
    //   //   return [];
    //   // }
    //   // let reduced = [];
    //   // reduced = this.repository
    //   //   .filter((i) => i && i.traits)
    //   //   .map((s) => s.traits);
    //   // // talent.forEach((item) => {
    //   // //   if (item.traits) {
    //   // //     reduced.push(...item.traits);
    //   // //   }
    //   // // });
    //   // reduced = reduced.filter((item) => item.trim().length > 0);
    //   // const distinct = [...new Set(reduced)];
    //   // return distinct.sort().map((tag) => ({ name: tag }));

    //   let filteredTalents = this.repository.filter((i) =>
    //     i.key.includes("playerCore")
    //   );

    //   // let filteredTalents = this.repository
    //   //   .filter((i) => i && i.traits)
    //   //   .forEach((species) => {
    //   //     const tr = Array.isArray(species.traits)
    //   //       ? species.traits
    //   //       : String(species.traits).split(","); // если не массив — превращаем в массив

    //   //     const lowercaseKeywords = species.traits ? tr : "";

    //   //     species.traits = species.traits ? tr.map((s) => s.trim()) : "";
    //   //   });
    //   // const lowercaseKeywords = filteredTalents.map((s) =>
    //   //   s.traits.toUpperCase()
    //   // );

    //   // filteredTalents = filteredTalents.filter((talent) =>
    //   //   lowercaseKeywords.includes(talent.traits.toString().toUpperCase())
    //   // );
    //   let reduced = [];
    //   filteredTalents.forEach((item) => {
    //     if (item.traits) {
    //       reduced.push(...item.traits);
    //     }
    //   });
    //   reduced = reduced.filter((item) => item.trim().length > 0);
    //   const distinct = [...new Set(reduced)];
    //   return distinct.sort().map((tag) => ({ name: tag }));
    // },
    tagFilters() {
      if (this.repository === undefined) {
        return [];
      }
      let filteredTalents = this.repository;
      //const lowercaseKeywords = filteredTalents.map(s => s.traits.toString().toUpperCase());
      let lowercaseKeywords = [];
      // if (this.type === "skill" || this.type === "general")
      //   lowercaseKeywords = this.type === "skill" ? ["НАВЫК"] : ["ОБЩАЯ"];
      // else lowercaseKeywords = this.finalKeywords.map((k) => k.toUpperCase());
      // // only show those whose prerequisites are met

      // filteredTalents = filteredTalents.filter((talent) =>
      //   lowercaseKeywords.some((lw) =>
      //     talent.traits.toString().toUpperCase().includes(lw)
      //   )
      // );
      //filteredTalents = filteredTalents.filter((talent) => lowercaseKeywords.some(talent.traits.toString().toUpperCase()));
      let reduced = [];
      filteredTalents.forEach((item) => {
        if (item.traits) {
          reduced.push(...item.traits.split(","));
        }
      });
      reduced = reduced.filter(
        (item) =>
          item !== "необычный" && item !== "редкий" && item !== "уникальный"
      );
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
          text: "Библиотека",
          disabled: false,
          nuxt: true,
          exact: true,
          to: "/library",
        },
        {
          text: "Черты",
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
    rarity(rarity) {
      if (!rarity) return "";
      const s = this.rarityRepository.find((s) => s.key === rarity);
      return s && s.name ? s.name : "Обычный";
    },
  },
};
</script>

<style scoped lang="css"></style>
