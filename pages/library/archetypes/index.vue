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

              <!-- <v-col :cols="12" :sm="6">
                <v-select
                  v-model="filters.settingTier.model"
                  :items="filterSettingTierOptions"
                  label="Setting Tier (Max Tier)"
                  filled
                  dense
                />
              </v-col> -->

              <!-- filter species -->
              <!-- <v-col :cols="12" :sm="4">
                <v-select
                  v-model="filters.species.model"
                  :items="filterSpeciesOptions"
                  :label="filters.species.label"
                  filled
                  clearable
                  multiple
                  dense
                />
              </v-col>


              <v-col :cols="12" :sm="4">
                <v-select
                  v-model="filters.faction.model"
                  :items="filterGroupOptions"
                  :label="filters.faction.label"
                  filled
                  clearable
                  multiple
                  dense
                />
              </v-col> -->

              <!-- filter source -->
              <v-col :cols="12" :sm="4">
                <v-select
                  v-model="filters.source.model"
                  :items="filterSourceOptions"
                  label="Источники"
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
            :items-per-page="25"
            item-key="key"
            sort-by="name"
            hide-default-footer
            @page-count="pagination.pageCount = $event"
          >
            <!-- <template v-slot:item.species="{ item }">
              <span v-for="species in item.species">
                {{ species.name }}
                <v-chip
                  v-if="species.sourceKey && !species.sourceKey.startsWith('c')"
                  color="info"
                  outlined
                  tags
                  x-small
                  label
                  >{{ species.sourceKey.toUpperCase() }}</v-chip
                >
              </span>
            </template> -->

            <template v-slot:item.source.book="{ item }">
              <v-row no-gutters>
                <v-col :cols="12">
                  {{ item.source.book }}
                  <nuxt-link
                    v-if="item.source.path"
                    :to="item.source.path"
                    target="_blank"
                  >
                    <v-icon small> launch </v-icon>
                  </nuxt-link>
                </v-col>
                <v-col
                  v-if="item.source.page"
                  :cols="12"
                  class="caption grey--text"
                >
                  pg. {{ item.source.page }}
                </v-col>
              </v-row>
            </template>

            <template v-slot:item.name="{ item }">
              <router-link
                v-if="!item.stub"
                :to="`/library/archetypes/${textToKebab(item.key)}`"
                class="clickable-name"
              >
                {{ item.name }}
              </router-link>
              <span v-else class="text-disabled">
                {{ item.name }}
              </span>
            </template>

            <template v-slot:item.keyAbility="{ item }">
              <strong> {{ characterLabelAttribute(item.keyAbility) }}</strong>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td :colspan="headers.length">
                <archetype-preview :item="item" class="pa-2 pt-4 pb-4" />
              </td>
            </template>

            <template v-slot:item.weapon="{ item }">
              <span v-for="item1 in WeaponRepository" v-bind:key="item1.key">
                <p>
                  {{ characterlabel(item.skillAttack[item1.key]) }} в
                  {{ item1.name }}
                </p>
              </span>
            </template>

            <template v-slot:item.defence="{ item }">
              <span v-for="item1 in DefenceRepository" v-bind:key="item1.key">
                <p>
                  {{ characterlabel(item.skillDefence[item1.key]) }} в
                  {{ item1.name }}
                </p>
              </span>
            </template>

            <template v-slot:item.perception="{ item }">
              <span>
                <p>{{ characterlabel(item.Perception) }} в Восприятии</p>
              </span>
            </template>

            <template v-slot:item.will="{ item }">
              <span>
                <p>{{ characterlabel(item.saving["will"]) }} в Воле</p>
              </span>
            </template>

            <template v-slot:item.fortitude="{ item }">
              <span>
                <p>
                  {{ characterlabel(item.saving["fortitude"]) }} в Стойкость
                </p>
              </span>
            </template>

            <template v-slot:item.rarity="{ item }">
              {{ rarity(item.rarity) }}
            </template>

            <template v-slot:item.reflex="{ item }">
              <span>
                <p>{{ characterlabel(item.saving["reflex"]) }} в Рефлекс</p>
              </span>
            </template>

            <template v-slot:item.skill="{ item }">
              <p v-if="item.skillTrainedChoice.length > 0">
                Обучен в
                {{ characterLabelSkillTrainedChoice(item.skillTrainedChoice) }}
              </p>

              <p v-if="item.skillTrained.length > 0">
                Обучен в
                {{ characterLabelSkillTrainedChoice(item.skillTrained) }}
              </p>

              <p>
                Обучен дополнительным навыкам, в кол-ве равном:
                {{ item.skillTrainedPoints }} + мод Интеллекта
              </p>
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
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from "~/components/DodDefaultBreadcrumbs";
import ArchetypePreview from "~/components/forge/ArchetypePreviewV2";
import BreadcrumbSchemaMixin from "~/mixins/BreadcrumbSchemaMixin";
import SluggerMixin from "~/mixins/SluggerMixin";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  components: { DodDefaultBreadcrumbs, ArchetypePreview },
  mixins: [BreadcrumbSchemaMixin, SluggerMixin, StatRepositoryMixin],
  head() {
    const title = "Классы | Библиотека";
    const description = "";
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
          text: "Классы",
          disabled: false,
          nuxt: true,
          exact: true,
          to: "/library/archetypes",
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
        {
          text: "Name",
          align: "start",
          value: "name",
          class: "",
        },
        {
          text: "Ключевая характеристика",
          align: "start",
          value: "keyAbility",
          class: "",
        },
        {
          text: "Хиты",
          align: "start",
          value: "hitpoints",
          class: "",
        },
        {
          text: "Традиции",
          align: "center",
          value: "spellTradition",
          class: "",
        },
        {
          text: "Оружие",
          align: "center",
          value: "weapon",
          class: "",
        },
        {
          text: "Доспехи",
          align: "start",
          value: "defence",
          class: "",
        },
        {
          text: "Воля",
          align: "start",
          value: "will",
          class: "",
        },
        {
          text: "Стойкость",
          align: "start",
          value: "fortitude",
          class: "",
        },
        {
          text: "Рефлекс",
          align: "start",
          value: "reflex",
          class: "",
        },
        {
          text: "Восприятие",
          align: "start",
          value: "perception",
          class: "",
        },
        {
          text: "Навыки",
          align: "start",
          value: "skill",
          class: "",
        },
        {
          text: "Редкость",
          align: "start",
          value: "rarity",
          class: "",
        },
        {
          text: "",
          align: "end",
          value: "actions",
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
        text: `${i.source.book}${
          i.source.version ? " (" + i.source.version + ")" : ""
        }`,
      }));
      return [...new Set(options)].sort((a, b) => a.text.localeCompare(b.text));
    },
    searchResult() {
      if (this.activeRepository === undefined) {
        return [];
      }
      let filteredResults = this.activeRepository;

      let filter;

      // filter = this.filters.settingTier;
      // if (filter.model) {
      //   filteredResults = filteredResults.filter((i) => i.tier <= filter.model);
      // }

      filter = this.filters.source;
      if (filter.model.length > 0) {
        filteredResults = filteredResults.filter((i) =>
          filter.model.includes(i.source.key)
        );
      }

      // filter = this.filters.species;
      // if (filter.model.length > 0) {
      //   filteredResults = filteredResults.filter((item) =>
      //     filter.model.some((m) => item.species.map((s) => s.name).includes(m))
      //   );
      // }

      // filter = this.filters.faction;
      // if (filter.model.length > 0) {
      //   filteredResults = filteredResults.filter((item) =>
      //     filter.model.includes(item.faction)
      //   );
      // }

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
        const speciesNames = item.species.map((s) => s.name);
        array.push(...speciesNames);
      });
      const distinct = [...new Set(array)];
      return distinct.filter((d) => d !== null && d !== undefined).sort();
    },
    filterGroupOptions() {
      const reduce = this.activeRepository.map((item) => item.faction);
      const distinct = [...new Set(reduce)];
      return distinct.filter((d) => d !== null && d !== undefined).sort();
    },
  },
  async asyncData({ $axios, query, error }) {
    const archetypeResponse = await $axios.get("/api/archetypes/");
    const items = archetypeResponse.data;

    if (items === undefined || items.length <= 0) {
      error({ statusCode: 404, message: "No Archetypes found!" });
    }

    // TODO
    const factionGroupSelections = [];
    if (query["filter-group"]) {
      factionGroupSelections.push(query["filter-group"]);
    }

    const filtersSourceModel = [];
    if (query["filter-source"]) {
      filtersSourceModel.push(query["filter-source"]);
    }

    return {
      items,
      filters: {
        // settingTier: { model: 6, label: "Filter by Archetype-Group" },
        // species: { model: [], label: "Filter by Species" },
        // faction: { model: factionGroupSelections, label: "Filter by Faction" },
        source: { model: filtersSourceModel, label: "Filter by Homebrew" },
      },
    };
  },
  methods: {
    characterLabelAttribute(keyAbility) {
      return this.attributeRepository
        .filter((a) => keyAbility.includes(a.key))
        .map((s) => s.name)
        .join(", ");
    },
    characterlabel(key) {
      switch (key) {
        case "U":
          return "Нетренирован";
        case "T":
          return "Тренирован";
        case "E":
          return "Эксперт";
        case "M":
          return "Мастер";
        case "L":
          return "Легенда";
        default:
          break;
      }
    },
    characterLabelSkillTrainedChoice(keyAbility) {
      return this.skillRepository
        .filter((a) => keyAbility.includes(a.key))
        .map((s) => s.name)
        .join(", ");
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
