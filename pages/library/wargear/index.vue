<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center">
      <v-col :cols="12">
        <v-card>
          <v-card-text>
            <v-row justify="center">
              <v-col :cols="12">
                <v-text-field
                  v-model="filters.search"
                  filled
                  dense
                  clearable
                  label="Search"
                />
              </v-col>
              <!-- 
              <v-col :cols="12" :sm="6">
                <v-select
                  v-model="filters.keywords.model"
                  :items="filterKeywordsOptions"
                  :label="filters.keywords.label"
                  filled
                  dense
                  clearable
                  multiple
                  chips
                  deletable-chips
                  single-line
                />
              </v-col> -->

              <!-- filter species -->
              <!-- <v-col :cols="12" :sm="6">
                <v-select
                  v-model="filters.source.model"
                  :items="filterSourceOptions"
                  :label="filters.source.label"
                  filled
                  clearable
                  multiple
                  dense
                  single-line
                />
              </v-col> -->

              <v-col :cols="12">
                <v-chip-group
                  v-model="filters.type"
                  active-class="primary--text"
                  column
                  multiple
                >
                  <v-chip
                    v-for="filter in typeFilters"
                    :key="filter.name"
                    :value="filter.name"
                    filter
                    small
                    label
                  >
                    {{ toTypeString(filter.name) }}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col :cols="12">
        <v-card>
          <v-data-table
            :headers="headers"
            :items="items"
            :page.sync="pagination.page"
            item-key="key"
            sort-by="name"
            show-expand
            hide-default-footer
            :items-per-page="perPage"
          >
            <template v-slot:item.type="{ item }">
              {{ toTypeString(item.type) }}
            </template>
            <template v-slot:item.value="{ item }">
              {{ rarity(item.rarity) }}
            </template>
            <!--
            <template v-slot:item.keywords="{ item }">
              {{ item.keywords.join(', ') }}
            </template>
            -->
            <!-- <template v-slot:item.source.book="{ item }">
              <v-row no-gutters>
                <v-col :cols="12">
                  {{ item.source.book }}
                </v-col>
                <v-col
                  v-if="item.source.page"
                  :cols="12"
                  class="caption grey--text"
                >
                  pg. {{ item.source.page }}
                </v-col>
              </v-row>
            </template> -->

            <!-- detail preview -->
            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <div class="pt-4 pb-4">
                  <div>
                    <h3 class="title-1">
                      {{ item.name }}
                    </h3>
                    <h4 class="subtitle-2 grey--text">
                      {{ toTypeString(item.type) }}
                    </h4>

                    <hr class="mb-0" />

                    <div class="grey--text">
                      <span class="subtitle-2"
                        ><strong>Редкость:</strong>
                        {{ rarity(item.rarity) }}</span
                      >
                      <span
                        ><strong>Стоимость:</strong>
                        {{ wargearPrice(item) }}</span
                      >
                    </div>

                    <div
                      v-if="item.description"
                      class="mt-2"
                      v-html="item.description"
                    ></div>
                    <p v-else-if="item.snippet" class="mt-2">
                      {{ item.snippet }}
                    </p>

                    <dod-simple-weapon-stats
                      v-if="
                        item.meta !== undefined &&
                        item.meta.length > 0 &&
                        ['ranged-weapon', 'melee-weapon'].includes(
                          item.meta[0].type
                        )
                      "
                      :name="item.name"
                      :stats="item.meta[0]"
                      show-traits
                      class="mb-2"
                    />
                    <dod-simple-armour-stats
                      v-if="
                        item.meta !== undefined &&
                        item.meta.length > 0 &&
                        ['armour'].includes(item.meta[0].type)
                      "
                      :name="item.name"
                      :stats="item.meta[0]"
                      show-traits
                      class="mb-2"
                    />

                    <div>
                      <!-- <span>Keywords:</span>
                      <v-chip
                        v-for="keyword in item.keywords"
                        :key="keyword"
                        label
                        small
                        class="mr-1"
                      >
                        {{ keyword }}
                      </v-chip> -->
                    </div>
                  </div>

                  <div class="pt-4">
                    <v-btn
                      nuxt
                      :to="`/library/wargear/${item.key}`"
                      color="success"
                      small
                    >
                      Детали
                    </v-btn>
                    <!-- <v-btn
                      v-if="
                        !['core', 'fspg', 'red1', 'cos'].includes(
                          item.source.key
                        )
                      "
                      :href="`/api/wargear/${item.key}?format=foundry`"
                      download
                      small
                      color="warning"
                      >foundry (.json)</v-btn
                    > -->
                  </div>
                </div>
              </td>
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
import DodSimpleWeaponStats from "~/components/DodSimpleWeaponStats";
import DodSimpleArmourStats from "~/components/DodSimpleArmourStats";
import BreadcrumbSchemaMixin from "~/mixins/BreadcrumbSchemaMixin";
import SluggerMixin from "~/mixins/SluggerMixin";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  // layout: "library",
  components: {
    DodDefaultBreadcrumbs,
    DodSimpleArmourStats,
    DodSimpleWeaponStats,
  },
  mixins: [BreadcrumbSchemaMixin, SluggerMixin, StatRepositoryMixin],
  head() {
    const title = "Снаряжение | Библиотека";
    const description = "А тут ваше снаряжение";
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
    try {
      const page = parseInt(query.page, 10) || 1;
      const perPage = 25;

      const params = { page, perPage };

      if (query["search"]) params.search = query["search"];
      if (query["filter-source"]) params.source = query["filter-source"];
      if (query["filter-type"]) params.type = query["filter-type"];
      if (query["filter-rarity"]) params.rarity = query["filter-rarity"];

      const response = await $axios.get("/api/wargear", { params });
      const { data, total, filters } = response.data;

      if (!data || data.length === 0) {
        return error({ statusCode: 404, message: "No Wargear found!" });
      }

      return {
        items: data,
        total,
        perPage,
        filters: filters,
        searchQuery: params.search || "",
        pagination: {
          page,
          pageCount: Math.ceil(total / perPage),
        },
      };
    } catch (err) {
      return error({ statusCode: 500, message: err.message });
    }
  },

  data() {
    return {
      items: [],
      total: 0, // всего элементов
      limit: 25, // элементов на странице
      filters: {
        search: "",
        type: [],
        source: [],
        rarity: [],
      },
      searchQuery: "",
      selectedTypeFilters: [],
      // pagination: {
      //   page: 1,
      //   pageCount: 0,
      //   sortBy: "title",
      //   rowsPerPage: 25,
      // },
      headers: [
        { text: "Name", align: "left", value: "name", class: "" },
        { text: "Type", align: "left", value: "type", class: "" },
        { text: "Value", align: "left", value: "value", class: "" },
        //{ text: 'Keywords', align: 'left', value: 'keywords', class: '' },
        // { text: "Source", align: "start", value: "source.book", class: "" },
      ],
    };
  },
  computed: {
    activeRepository() {
      return this.items;
    },
    filteredWargear() {
      // Если фильтры не выбраны — показываем всё
      if (!this.selectedTypeFilters.length) return this.items;
      const selectedTypeFilters = this.selectedTypeFilters;
      // Иначе фильтруем по типам
      return this.items.filter((item) =>
        selectedTypeFilters.includes(item.type)
      );
    },
    searchResult() {
      if (!this.items) return [];
      return this.items; // items уже приходят с сервера с учетом searchQuery
    },
    typeFilters() {
      // const reduceToType = this.items.map((item) => item.type);
      // const distinctTypes = [...new Set(reduceToType)];
      return this.filters.types.map((t) => ({ name: t }));
    },
    filterKeywordsOptions() {
      // const keywordArray = [];
      // this.activeRepository.forEach((item) => {
      //   keywordArray.push(...item.keywords);
      // });
      // const distinctOptions = [...new Set(keywordArray)];
      // return distinctOptions.filter((o) => o.indexOf("<") !== 0).sort();
      return [];
    },
    filterSourceOptions() {
      const options = this.activeRepository.map((i) => ({
        value: i.source.key,
        text: i.source.book,
      }));
      return [...new Set(options)].sort((a, b) => a.text.localeCompare(b.text));
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
          text: "Снаряжение",
          disabled: false,
          nuxt: true,
          exact: true,
          to: "/library/wargear",
        },
      ];
    },
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(this.total / this.perPage);
    },
  },
  watch: {
    searchQuery(newVal) {
      this.pagination.page = 1; // сброс на первую страницу при поиске
      this.fetchWargear();
    },
    filters: {
      deep: true,
      handler() {
        this.pagination.page = 1; // сбрасываем на первую страницу
        this.fetchWargear();
      },
    },
    "pagination.page"(newPage) {
      this.fetchWargear();
    },
  },
  methods: {
    async fetchWargear() {
      const params = {
        page: this.pagination.page || 1,
        perPage: this.pagination.perPage || 25,
        type:
          this.filters.type && this.filters.type.length
            ? this.filters.type.join(",")
            : undefined,
        source:
          this.filters.source && this.filters.source.length
            ? this.filters.source.join(",")
            : undefined,
        rarity:
          this.filters.rarity && this.filters.rarity.length
            ? this.filters.rarity.join(",")
            : undefined,
        search: this.filters.search || undefined,
      };

      try {
        const response = await this.$axios.get("/api/wargear", { params });
        const { data, total, pageCount } = response.data;

        console.log(this.items.filter((t) => t.type === "Kit"));

        this.items = data || [];
        this.pagination.pageCount = pageCount || 1;
        this.total = total || 0;
      } catch (err) {
        console.error("Ошибка загрузки wargear:", err);
      }
    },

    toTypeString(item) {
      return this.typeRepository.find((t) => t.key === item)
        ? this.typeRepository.find((t) => t.key === item).name
        : "";
    },
    rarity(item) {
      return this.rarityRepository.find((t) => t.key === item).name;
    },
    wargearPrice(item) {
      if (item) {
        const pp = item.price.value.pp ? item.price.value.pp + " пм" : "";
        const gp = item.price.value.gp ? item.price.value.gp + " зм" : "";
        const sp = item.price.value.sp ? item.price.value.sp + " см" : "";
        const cp = item.price.value.cp ? item.price.value.cp + " мм" : "";
        return pp + gp + sp + cp;
      }
    },
  },
};
</script>

<style scoped lang="css"></style>
