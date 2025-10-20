<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <v-simple-table dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header.value"
              :class="header.class"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td class="text-left">
              {{ stats.name }}
            </td>
            <td class="text-center">
              <span>{{ groupName(stats.group) }}</span>
            </td>
            <td class="text-center">
              <div v-if="stats.damage.static === '*'">
                <span>*</span>
              </div>
              <div v-else-if="stats.damage">
                <span
                  >{{ stats.damage.dice }}{{ stats.damage.die }}
                  {{ stats.damage.damageType }}</span
                >
              </div>
            </td>
            <td class="text-center">
              <span>{{ category(stats.category) }}</span>
            </td>
            <td class="text-center">
              <span v-if="stats.usage.value === 'held-in-one-hand'"> 1 </span>
              <span v-if="stats.usage.value === 'held-in-two-hand'"> 2 </span>
            </td>
            <td class="text-left">
              <span v-if="stats.traits && stats.traits.length > 0">{{
                stats.traits.join(", ")
              }}</span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div v-if="showTraits" class="mt-4">
      <div
        v-for="trait in stats.traits"
        v-if="traitByName(trait)"
        :key="trait"
        class="mb-3"
      >
        <strong>{{ traitByName(trait).name }}</strong>
        <div v-html="traitByName(trait).description"></div>
      </div>
    </div>
  </div>
</template>

<script>
import WargearTraitRepositoryMixin from "~/mixins/WargearTraitRepositoryMixin";

export default {
  name: "DodSimpleWeaponStats",
  mixins: [WargearTraitRepositoryMixin],
  props: {
    name: {
      type: String,
      required: true,
    },
    stats: {
      type: Object,
      required: true,
    },
    showTraits: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      headers: [
        {
          text: "Название",
          value: "name",
          class: "text-left",
          align: "left",
        },
        {
          text: "Группа",
          value: "range",
          class: "text-center",
          align: "center",
        },
        {
          text: "Урон",
          value: "damage",
          class: "text-center",
          align: "center",
        },
        {
          text: "Категория",
          value: "ap",
          class: "text-center",
          align: "center",
        },
        {
          text: "Руки",
          value: "salvo",
          class: "text-center",
          align: "center",
        },
        {
          text: "Трейты",
          value: "traits",
          class: "text-left",
          align: "left",
        },
      ],
    };
  },
  computed: {
    isMelee() {
      return this.stats.type === "melee-weapon";
    },
  },
  methods: {
    traitByName(name) {
      const prefix = name.split("(")[0];
      return this.wargearTraitRepository.find((item) =>
        item.name.includes(prefix)
      );
    },
    groupName(name) {
      return this.weaponGroup.find((item) => item.group === name).name;
    },
    category(category) {
      return this.weaponCategoryRepository.find((t) => t.category === category)
        .name;
    },
  },
};
</script>

<style scoped></style>
