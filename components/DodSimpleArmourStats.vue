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
              {{ stats.nameGear }}
            </td>
            <td class="text-center">
              {{ stats.group }}
            </td>
            <td class="text-center">
              {{ stats.weight }} + {{ stats.weightL }}
            </td>
            <td class="text-center">
              {{ stats.category }}
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
      <p v-for="trait in stats.traits" v-if="traitByName(trait)" :key="trait">
        <strong>{{ traitByName(trait).name }}: </strong>
        {{ traitByName(trait).effect }}
      </p>
    </div>
  </div>
</template>

<script>
import WargearTraitRepositoryMixin from "~/mixins/WargearTraitRepositoryMixin";
import traitView from "~/components/TraitView";

export default {
  name: "DodSimpleArmourStats",
  components: { traitView },
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
          text: "Вес",
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
        // {
        //   text: "Руки",
        //   value: "salvo",
        //   class: "text-center",
        //   align: "center",
        // },
        {
          text: "Трейты",
          value: "traits",
          class: "text-left",
          align: "left",
        },
      ],
    };
  },
  methods: {
    traitByName(name) {
      const prefix = name.split("(")[0];
      return this.wargearTraitRepository.find((item) =>
        item.name.includes(prefix)
      );
    },
  },
};
</script>

<style scoped></style>
