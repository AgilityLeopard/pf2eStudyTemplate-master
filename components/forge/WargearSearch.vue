<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-card class="mb-4">
      <v-card-title style="background-color: #262e37; color: #fff">
        <span>Добавление снаряжения</span>
        <v-spacer />
        <v-btn @click="$emit('custom-item')">
          Свой предмет
        </v-btn>
        <v-icon dark @click="$emit('cancel')"> close </v-icon>
      </v-card-title>
      <v-card-text>
        <v-row>


          <v-col cols="12" sm="4">


            <v-expansion-panels flat>
              <v-expansion-panel>

                <v-expansion-panel-header>
                  <v-icon left small>mdi-filter-variant</v-icon>
                  Фильтры
                </v-expansion-panel-header>

                <v-expansion-panel-content>

                  <v-text-field v-model="searchQuery" filled dense clearable prepend-inner-icon="search"
                    label="Поиск" />

                  <v-range-slider v-model="levelRange" :min="0" :max="20" :step="1" thumb-label="always"
                    label="Уровень" />

                  <v-select v-if="type === 'weapon'" label="Категория" v-model="selectedCategoryWeaponFilters"
                    :items="weaponCategoryRepository" item-text="name" item-value="category" multiple />

                  <v-select v-if="type === 'weapon'" label="Тип оружия" v-model="selectedTypeWeaponFilters"
                    :items="weaponGroup" item-text="name" item-value="group" multiple />

                  <v-select v-if="type === 'armor'" label="Категория доспехов" v-model="selectedCategoryArmorFilters"
                    :items="armourCategoryRepository" item-text="name" item-value="category" multiple />

                  <v-select v-if="type === 'armor'" label="Тип доспехов" v-model="selectedTypeArmorFilters"
                    :items="armorGroup" item-text="name" item-value="group" multiple />

                  <v-select label="Редкость" v-model="selectedRarityFilters" :items="rarityRepository" item-text="name"
                    item-value="key" multiple />

                  <v-select label="Трейты" v-model="selectedTraitFilters" :items="typeFilters" item-text="name"
                    item-value="name" multiple />

                </v-expansion-panel-content>

              </v-expansion-panel>
            </v-expansion-panels>

          </v-col>

          <v-col cols="12" sm="8">
            <div class="table-wrapper">
              <v-data-table :headers="tableHeaders" :items="searchResult" item-key="key" :search="searchQuery"
                mobile-breakpoint="0" :page.sync="pagination.page" hide-default-footer class="ui-table" show-expand
                @page-count="pagination.pageCount = $event">
                <template v-slot:item.name="{ item }">
                  {{ item.name }}
                  <!-- <div>
                    <trait-view v-if="item.traits" :item="item" />
                  </div> -->
                  <!-- <span class="grey--text caption">{{ wargearSubtitle(item) }}</span> -->
                </template>

                <template v-slot:item.price="{ item }">
                  {{ wargearPrice(item) }}
                </template>

                <template v-slot:item.level="{ item }">
                  {{ item.level ? item.level.value : 0 }}
                </template>

                <template v-slot:item.category="{ item }">
                  {{ item.category }}
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
                    <CardItem :item="item" :wargearPrice="wargearPrice" />
                  </td>
                </template>
                <!-- <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    <div class="pa-2 pt-4 pb-4">
                      <span>{{ item.hint }}</span>
                      <p v-if="item.snippet">{{ item.snippet }}</p>
                      <div
                        v-else-if="item.description"
                        v-html="item.description"
                      ></div>

                      <dod-simple-weapon-stats
                        v-if="type === 'weapon'"
                        :name="item.nameGear"
                        :stats="item"
                        :show-traits="false"
                        class="mb-2"
                      />
                      <dod-simple-armour-stats
                        v-if="type === 'armor'"
                        :name="item.name"
                        :stats="item"
                        :show-traits="false"
                        class="mb-2"
                      />
                    </div>
                  </td>
                </template> -->
              </v-data-table>
            </div>
            <div class="text-center pt-2">
              <v-pagination v-model="pagination.page" :length="pagination.pageCount" />
            </div>
          </v-col>
        </v-row>


      </v-card-text>
      <CustomItemDialog v-model="customItemDialog" :type="type" @save="onCustomItemCreated" />
    </v-card>
  </div>
</template>

<script>
import DodSimpleWeaponStats from "~/components/DodSimpleWeaponStats";
import DodSimpleArmourStats from "~/components/DodSimpleArmourStats";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";
import WargearTraitRepositoryMixin from "~/mixins/WargearTraitRepositoryMixin";
import traitView from "~/components/TraitView";
import CardItem from "@/components/CardItem.vue";
import CustomItemDialog from "~/components/forge/wargear/CustomItemDialog.vue";


export default {
  name: "WargearSearch",
  components: {
    DodSimpleArmourStats,
    DodSimpleWeaponStats,
    traitView,
    CardItem,
    CustomItemDialog
  },
  mixins: [StatRepositoryMixin, WargearTraitRepositoryMixin],
  props: {
    repository: {
      type: Array,
      required: false,
      default: () => [],
    },

    type: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      searchQuery: "",
      selectedTypeFilters: [],
      selectedCategoryFilters: [],
      selectedCategoryWeaponFilters: [],
      selectedCategoryArmorFilters: [],
      selectedTypeWeaponFilters: [],
      selectedTypeArmorFilters: [],
      selectedTraitFilters: [],
      selectedRarityFilters: [],
      levelRange: [0, 20],
      customItemDialog: false,
      pagination: {
        page: 1,
        pageCount: 0,
        sortBy: "title",
        rowsPerPage: 25,
      },
      typeList:
        ["weapon", "armor", "equipment", "consumable"],
      headers: [
        {
          text: "Название",
          value: "name",
          align: "left",
          class: "text-left",
          width: "250px",
        },
        {
          text: "Цена",
          align: "left",
          value: "price",
          width: "100px",
          class: "text-left",
        },
        {
          text: "Уровень",
          align: "left",
          value: "level",
          class: "",
          width: "100px",
        },
        {
          text: "Редкость",
          align: "left",
          value: "rarity",
          class: "",
          width: "100px",
        },
        // { text: "Категория", align: "left", value: "category", class: "" },
        {
          text: "",
          align: "right",
          value: "action-add",
          class: "",
          width: "50px",
        },
        {
          text: "",
          align: "right",
          value: "action-buy",
          class: "",
          width: "50px",
        },
        { text: "", value: "data-table-expand", width: "50px" },
      ],
      headersСonsumable: [
        {
          text: "Название",
          value: "nameGear",
          align: "left",
          class: "text-left",
          width: "250px",
        },
        {
          text: "Количество",
          value: "qty",
          align: "center",
          class: "text-center",
          width: "150px",
        },
        {
          text: "",
          value: "edit",
          align: "center",
          class: "text-center",
          width: "60px",
        },
        {
          text: "",
          value: "delete",
          align: "center",
          class: "text-center",
          width: "60px",
        },
        { text: "", value: "data-table-expand", width: "50px" },
      ],
    };
  },
  computed: {
    tableHeaders() {

      if (this.$vuetify.breakpoint.xsOnly) {

        return [
          { text: "Название", value: "name", width: '35%' },
          { text: "Ур.", value: "level", width: 50 },
          { text: "", value: "action-add", sortable: false, width: 40 },
          { text: "", value: "action-buy", sortable: false, width: 40 },
        ]

      }

      return this.headers
    },
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

      const [minLevel, maxLevel] = this.levelRange;

      if (maxLevel != 0) {
        searchResult = searchResult.filter(
          (item) => item.level.value >= minLevel && item.level.value <= maxLevel
        );
      }

      if (this.selectedCategoryWeaponFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedCategoryWeaponFilters.some((r) =>
            item.category.includes(r)
          )
        );
      }

      if (this.selectedCategoryArmorFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedCategoryArmorFilters.some(
            (r) => item.category && item.category.includes(r)
          )
        );
      }

      if (this.selectedTypeWeaponFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedTypeWeaponFilters.some(
            (r) => item.group && item.group.includes(r)
          )
        );
      }

      if (this.selectedTypeArmorFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedTypeArmorFilters.some(
            (r) => item.group && item.group.includes(r)
          )
        );
      }

      if (this.selectedTraitFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedTraitFilters.some(
            (m) => item.traits && item.traits.includes(m)
          )
        );
      }

      if (this.selectedRarityFilters.length > 0) {
        searchResult = searchResult.filter((item) =>
          this.selectedRarityFilters.some(
            (r) => item.rarity && item.rarity.includes(r)
          )
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
    CustomAddItem() {
      this.customItemDialog = true;
    },

    onCustomItemCreated(item) {
      this.$emit("select", item);
      this.customItemDialog = false;
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
      if (item && item.price) {
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

<style scoped>
.fixed-columns-table .v-data-table__wrapper table {
  table-layout: fixed !important;
  /* фиксированная сетка */
  width: 100%;
}

.fixed-columns-table th,
.fixed-columns-table td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.fixed-columns-table th {
  font-weight: 600;
  background-color: rgba(var(--v-theme-surface-variant), 0.5);
}

/* Настраиваем ширину каждой колонки (по порядку) */
.fixed-columns-table th:nth-child(1),
.fixed-columns-table td:nth-child(1) {
  width: 40%;
  /* Название предмета */
}

.fixed-columns-table th:nth-child(2),
.fixed-columns-table td:nth-child(2) {
  width: 20%;
  /* Тип */
}

.fixed-columns-table th:nth-child(3),
.fixed-columns-table td:nth-child(3) {
  width: 15%;
  /* Цена */
}

.fixed-columns-table th:nth-child(4),
.fixed-columns-table td:nth-child(4) {
  width: 25%;
  /* Прочее */
}

.table-wrapper {
  max-height: 500px;
  /* или любая фиксированная высота */
  overflow-y: auto;
  /* добавляет прокрутку */
}

.expanded-content {
  max-height: 300px;
  /* ограничиваем раскрытие */
  overflow-y: auto;
  /* прокрутка внутри строки */
}

/* Можно ограничить высоту ячеек */
.v-data-table tbody td {
  max-width: 250px;
  /* можно подбирать */
}

/* Убираем растягивание при раскрытии */
.v-data-table__expanded__content td {
  max-width: none !important;
}

.table-container {
  width: 100%;
  overflow-x: hidden;
  /* не даем появиться горизонтальному скроллу */
}

.expanded-cell {
  padding: 0 !important;
  background-color: rgba(var(--v-theme-surface-variant), 0.05);
}

.expanded-wrapper {
  display: block;
  max-width: 100%;
  overflow-x: hidden;
  padding: 16px 20px;
  box-sizing: border-box;
  background-color: var(--v-theme-surface);
  border-left: 3px solid var(--v-theme-primary);
  border-radius: 0 0 8px 8px;
}

.expanded-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
}

.expanded-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  word-break: break-word;
}

.expanded-tag {
  background-color: rgba(var(--v-theme-primary), 0.15);
  color: var(--v-theme-primary);
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 0.8rem;
}

.expanded-meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 4px 12px;
  font-size: 0.85rem;
  margin-top: 8px;
  word-break: break-word;
}

.expanded-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(var(--v-border-color, 150, 150, 150), 0.2);
  margin: 10px 0;
}

.expanded-description {
  font-size: 0.9rem;
  line-height: 1.4;
  color: var(--v-theme-on-surface);
  word-break: break-word;
  white-space: normal;
}

.v-data-table {
  table-layout: fixed !important;
}

.v-data-table thead th,
.v-data-table tbody td {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  /* чтобы переносились строки */
  word-wrap: break-word;
  vertical-align: top;
}

@media (max-width:600px) {

  .fixed-columns-table table {
    table-layout: fixed;
  }

  .fixed-columns-table thead {
    display: none;
  }

  .fixed-columns-table :deep(td) {
    padding: 6px 4px !important;
    font-size: 12px;
  }

}

.fixed-columns-table :deep(td:first-child) {
  width: auto;
}

.fixed-columns-table :deep(td:nth-child(2)) {
  width: 40px;
  white-space: nowrap;
  text-align: center;
}

.fixed-columns-table :deep(td:nth-child(3)) {
  width: 42px;
  text-align: center;
}

/* TABLE */
.ui-table {
  width: 100%;
  min-width: 0;
}

.table-wrapper {

  overflow-x: auto;
  overflow-y: auto;

}

/* NAME */
.table-name {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.name-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media(max-width:600px) {

  .mobile-hide {
    display: none;
  }

}

.ui-table :deep(td) {

  padding: 8px !important;

}


@media(max-width:600px) {

  .ui-table :deep(td) {

    padding: 6px 4px !important;
    font-size: 12px;

  }


  .name-text {

    font-size: 13px;

  }

}

@media(max-width:600px) {

  .mobile-traits {

    max-width: 120px;
    overflow: hidden;

  }

}

.ui-table :deep(th:first-child),
.ui-table :deep(td:first-child) {
  width: auto;
}

@media (max-width:600px) {

  .ui-table :deep(table) {
    table-layout: fixed;
    width: 100%;
  }

  .ui-table thead {
    display: none;
  }

}

.ui-table :deep(th:nth-child(2)),
.ui-table :deep(td:nth-child(2)) {
  width: 52px;
  min-width: 52px;
  max-width: 52px;
  text-align: center;
}

.ui-table :deep(th:nth-child(3)),
.ui-table :deep(td:nth-child(3)) {
  width: 42px;
  min-width: 42px;
  max-width: 42px;
  text-align: center;
}
</style>
