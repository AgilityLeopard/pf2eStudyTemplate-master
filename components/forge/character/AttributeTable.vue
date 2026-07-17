<template>
  <table class="boost-table">
    <thead>
      <thead>
        <tr>
          <th v-for="attr in finalRepository">{{ attr }}</th>
        </tr>
      </thead>
    </thead>

    <tbody>
      <tr v-for="(row, rowIndex) in tableRows" :key="row.source">
        <td class="boost-cell">{{ row.source }}</td>
        <td class="boost-cell">{{ formatBoost('strength', rowIndex) }}</td>
        <td class="boost-cell">{{ formatBoost('dexterity', rowIndex) }}</td>
        <td class="boost-cell">{{ formatBoost('constitution', rowIndex) }}</td>
        <td class="boost-cell">{{ formatBoost('intellect', rowIndex) }}</td>
        <td class="boost-cell">{{ formatBoost('wisdom', rowIndex) }}</td>
        <td class="boost-cell">{{ formatBoost('charisma', rowIndex) }}</td>

      </tr>
    </tbody>

    <tfoot>
      <tr>
        <th></th>
        <th v-for="attr in attributeRepository">
          = {{ modReal(attr.key) }}
        </th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  mixins: [StatRepositoryMixin],

  props: {

    characterId: {
      type: String,
      required: true
    },
    tableRows: {
      type: Array,
      required: false
    }
  },

  computed: {
    finalRepository() {
      return ["Источник", ...this.attributeRepository.map(s => s.name)];
    },
    tableRows() {
      return [
        {
          source: 'Предыстория',
          stats:
            this.mergeStats(
              this.characterBackgroundBoost,
              this.characterBackground2
            )

        },
        {
          source: 'Наследие',
          stats: this.mergeStats(
            this.characterAncestryBoost,
            this.characterAttributesAncestryFlaw
          )
        },
        {
          source: 'Класс',
          stats: this.characterClassBoost
        },
        {
          source: '1 уровень',
          stats: this.characterAttributeBoost
        },
        {
          source: '5 уровень',
          stats: this.characterAttributeBoost5
        },
        {
          source: '10 уровень',
          stats: this.characterAttributeBoost10
        },
        {
          source: '15 уровень',
          stats: this.characterAttributeBoost15
        },
        {
          source: '20 уровень',
          stats: this.characterAttributeBoost20
        },
      ].filter(row => row.stats);
    },

    characterBackground2() {
      return this.$store.getters['characters/characterBackgroundFreeBoost2ById'](this.characterId);
    },
    characterBackgroundBoost() {
      return this.$store.getters['characters/characterBackgroundBoostId'](this.characterId);
    },
    // characterBackground2Boost() {
    //   return this.$store.getters['characters/characterBackgroundBoost2IdById'](this.characterId);
    // },
    characterAncestryFreeBoost() {
      return this.$store.getters['characters/characterAncestryFreeBoostById'](this.characterId);
    },
    characterAttributesAncestryFlaw() {
      return this.$store.getters['characters/characterAttributesAncestryFlaw'](this.characterId);
    },

    characterAncestryFreeBoost2() {
      return this.$store.getters['characters/characterAncestryFreeBoost2ById'](this.characterId);
    },
    characterClassBoost() {
      return this.$store.getters['characters/characterAttributesClassBoost'](this.characterId);
    },

    characterAttributeBoost() {
      return this.$store.getters['characters/characterAttributeBoost'](this.characterId);
    },
    characterAttributeBoost5() {
      return this.$store.getters['characters/characterAttributeBoost5'](this.characterId);
    },
    characterAttributeBoost10() {
      return this.$store.getters['characters/characterAttributeBoost10'](this.characterId);
    },
    characterAttributeBoost15() {
      return this.$store.getters['characters/characterAttributeBoost15'](this.characterId);
    },
    characterAttributeBoost20() {
      return this.$store.getters['characters/characterAttributeBoost20'](this.characterId);
    },
    characterAncestryBoost() {
      return this.$store.getters['characters/characterAncestryBoostById'](this.characterId);
    },
    characterAttributes() {
      return this.$store.getters["characters/characterAttributesById"](
        this.characterId
      );
    },
  },

  methods: {
    modReal(key) {
      return this.ModAttributeReal(key)
    },

    ModAttributeReal(attribute) {
      let result = 0

      this.tableRows.forEach((row, rowIndex) => {
        result += this.formatBoost(attribute, rowIndex)
      })

      // const result = this.characterAttributes[attribute]
      const modRaw = (result);       // настоящее дробное значение
      const mod = Math.floor(modRaw);         // отображаемое целое значение


      const arrow = Number.isInteger(modRaw) ? "" : " ⯅";  // стрелка только если дробное

      return (mod > 0 ? "+ " : " ") + mod + arrow;


    },
    mergeStats(...inputs) {
      const result = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intellect: 0,
        wisdom: 0,
        charisma: 0
      };

      inputs.forEach(input => {
        if (!input) return;

        // 2️⃣ Если это объект со значениями
        if (typeof input === 'object') {
          Object.keys(result).forEach(stat => {
            result[stat] += Number(input[stat] || 0);
          });
        }
      });



      return result;
    },
    formatBoost(stat, rowIndex) {
      let count = 0;

      for (let i = 0; i <= rowIndex; i++) {
        count += this.tableRows[i].stats?.[stat] || 0;
      }

      if (count <= 4) return this.tableRows[rowIndex].stats?.[stat] || 0;

      // после 4
      if (this.tableRows[rowIndex].stats?.[stat] === 0) return 0;

      return (count - 4) % 2 === 1 ? 0.5 : 1;
    },
  },

}
</script>

<style scoped>
.boost-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  background: var(--ui-surface);
  color: var(--ui-text);

  border: 1px solid var(--ui-border);
  border-radius: 12px;
  overflow: hidden;

  box-shadow: 0 6px 18px var(--ui-shadow);
}

/* HEADER */
.boost-table thead th {
  background: var(--ui-surface-soft);
  color: var(--ui-text);

  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.3px;

  padding: 10px 8px;

  border-bottom: 1px solid var(--ui-border);
}

/* ROWS */
.boost-table tbody td {
  padding: 8px 6px;
  font-size: 0.85rem;

  border-bottom: 1px solid var(--ui-border);

  transition: background 0.15s ease;
}

/* hover строки */
.boost-table tbody tr:hover td {
  background: var(--ui-surface-hover);
}

/* first column (source) */
.boost-table tbody td:first-child {
  font-weight: 500;
  text-align: center;

  padding-left: 10px;
  color: var(--ui-text);
}

/* FOOTER */
.boost-table tfoot th {
  background: var(--ui-surface-soft);
  border-top: 2px solid var(--ui-border-strong);

  padding: 10px 6px;
  font-weight: 600;

  color: var(--ui-text);
}

/* boost cells */
.boost-cell {
  color: var(--ui-text);
  font-variant-numeric: tabular-nums;
  text-align: center;
}

/* subtle grid separation */
.boost-table td:not(:last-child),
.boost-table th:not(:last-child) {
  border-right: 1px solid var(--ui-border);
}
</style>