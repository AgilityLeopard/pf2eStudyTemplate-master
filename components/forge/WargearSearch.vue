<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-card class="mb-4">
      <v-card-title style="background-color: #262e37; color: #fff">
        <span>Подтвердите выбор снаряжения</span>
        <v-spacer />
        <v-icon dark @click="$emit('cancel')"> close </v-icon>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6" sm="6">
            <v-select
              label="Трейты"
              v-model="selectedTypeFilters"
              :items="typeFilters"
              item-text="name"
              item-value="name"
              multiple
            >
            </v-select>
          </v-col>

          <v-col cols="6" sm="6">
            <v-select
              label="Категория"
              v-model="selectedCategoryFilters"
              :items="weaponCategoryRepository"
              item-text="name"
              item-value="category"
              multiple
            >
            </v-select>
          </v-col>
        </v-row>

        <v-chip
          v-for="filter in typeFilters"
          v-if="
            typeFilters.length > 1 && selectedTypeFilters.includes(filter.name)
          "
          :key="filter.key"
          :color="selectedTypeFilters.includes(filter.name) ? 'primary' : ''"
          small
          label
          class="mr-2 mb-2"
          @click="toggleTypeFilter(filter.name)"
        >
          {{ filter.name }}
        </v-chip>

        <v-text-field
          v-model="searchQuery"
          filled
          dense
          clearable
          prepend-inner-icon="search"
          label="Поиск"
        />
      </v-card-text>
    </v-card>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="searchResult"
        item-key="key"
        :search="searchQuery"
        :page.sync="pagination.page"
        hide-default-footer
        show-expand
        @page-count="pagination.pageCount = $event"
      >
        <template v-slot:item.nameGear="{ item }">
          {{ item.nameGear }} <br />
          <div>
            <trait-view v-if="item.traits" :item="item" />
          </div>
          <!-- <span class="grey--text caption">{{ wargearSubtitle(item) }}</span> -->
        </template>

        <template v-slot:item.price="{ item }">
          {{ wargearPrice(item) }}
        </template>

        <template v-slot:item.rarity="{ item }">
          {{ rarity(item.rarity) }}
        </template>

        <template v-slot:item.action-add="{ item }">
          <v-btn color="success" x-small @click="$emit('select', item)">
            add
          </v-btn>
        </template>
        <template v-slot:item.action-buy="{ item }">
          <v-btn color="info" x-small @click="$emit('select', item, true)">
            buy
          </v-btn>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div class="pa-2 pt-4 pb-4">
              <span>{{ item.hint }}</span>
              <p v-if="item.snippet">{{ item.snippet }}</p>
              <div v-else-if="item.description" v-html="item.description"></div>

              <dod-simple-weapon-stats
                v-if="
                  item.category !== undefined &&
                  weaponCategoryRepository
                    .map((t) => t.category)
                    .includes(item.category)
                "
                :name="item.nameGear"
                :stats="item"
                :show-traits="false"
                class="mb-2"
              />
              <dod-simple-armour-stats
                v-if="
                  item.meta !== undefined &&
                  item.meta.length > 0 &&
                  ['armour'].includes(item.meta[0].type)
                "
                :name="item.name"
                :stats="item"
                :show-traits="false"
                class="mb-2"
              />
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
  </div>
</template>

<script>
import DodSimpleWeaponStats from "~/components/DodSimpleWeaponStats";
import DodSimpleArmourStats from "~/components/DodSimpleArmourStats";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";
import WargearTraitRepositoryMixin from "~/mixins/WargearTraitRepositoryMixin";
import traitView from "~/components/TraitView";

export default {
  name: "WargearSearch",
  components: {
    DodSimpleArmourStats,
    DodSimpleWeaponStats,
    traitView,
  },
  mixins: [StatRepositoryMixin, WargearTraitRepositoryMixin],
  props: {
    repository: Array,
  },
  data() {
    return {
      searchQuery: "",
      selectedTypeFilters: [],
      selectedCategoryFilters: [],
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: "title",
        rowsPerPage: 25,
      },
      headers: [
        { text: "Название", align: "left", value: "nameGear", class: "" },
        { text: "Цена", align: "left", value: "price", class: "" },
        { text: "Редкость", align: "left", value: "rarity", class: "" },
        { text: "", align: "right", value: "action-add", class: "" },
        { text: "", align: "right", value: "action-buy", class: "" },
      ],
    };
  },
  computed: {
    typeFilters() {
      if (this.repository === undefined) {
        return [];
      }
      const reduceToType = this.repository.flatMap((item) => item.traits);
      const distinctTypes = [...new Set(reduceToType)];
      const types = distinctTypes.map((t) => ({ name: t }));
      return types;
    },
    categoryFilters() {
      if (this.repository === undefined) {
        return [];
      }
      const reduceToType = this.repository.flatMap((item) => item.category);
      const distinctTypes = [...new Set(reduceToType)];
      const types = distinctTypes.map((t) => ({ name: t }));
      return types;
    },
    searchResult() {
      if (this.repository === undefined) {
        return [];
      }
      let searchResult = this.repository;

      if (this.selectedTypeFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedTypeFilters.some((r) => item.traits.includes(r))
        );
      }

      if (this.selectedCategoryFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedCategoryFilters.some((r) => item.category.includes(r))
        );
      }

      return searchResult;
    },
  },
  methods: {
    toggleTypeFilter(name) {
      if (this.selectedTypeFilters.includes(name)) {
        this.selectedTypeFilters = this.selectedTypeFilters.filter(
          (d) => d != name
        );
      } else {
        this.selectedTypeFilters.push(name);
      }
    },
    rarity(item) {
      return this.rarityRepository.find((t) => (t.key = item)).name;
    },
    wargearSubtitle(item) {
      // const item = this.wargearRepository.find(i => i.name === gear);
      if (item) {
        return item.category;
        // const tags = [item.type];
        // if (item.subtype) {
        //   tags.push(item.subtype);
        // }
        // return tags.filter((t) => t !== undefined).join(' • ');
      }
      return "";
    },
    wargearPrice(item) {
      if (item) {
        const pp = item.pp !== 0 ? item.pp + " пм" : "";
        const gp = item.gp !== 0 ? item.gp + " зм" : "";
        const sp = item.sp !== 0 ? item.sp + " см" : "";
        const cp = item.cp !== 0 ? item.cp + " мм" : "";
        return pp + gp + sp + cp;
      }
    },
  },
};
</script>

<style scoped></style>
