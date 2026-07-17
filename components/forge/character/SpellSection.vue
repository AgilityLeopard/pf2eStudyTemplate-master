<template>
  <v-expansion-panels multiple class="custom-panels">
    <!-- ========================================================== -->
    <!-- MAIN SPELLS -->
    <!-- ========================================================== -->
    <v-expansion-panel v-if="hasSpellProgression" class="custom-panel">
      <v-expansion-panel-header>Заклинания {{ archetypeName }}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="pa-2">
          <v-col cols="12">
            <!-- Spell Info -->
            <v-col cols="12">
              <span><br /><b>Обычай:</b> {{ spellTradition || 'Не выбран' }}</span>
              <span><br /><b>Сложность заклинаний:</b> {{ spellDC }}</span>
              <span><br /><b>Атака заклинанием:</b> +{{ spellAttack }}</span>
            </v-col>

            <!-- Spell Levels -->
            <v-card v-for="level in maxSpellLevels" :key="level" class="mb-4" dense outlined>
              <h2 class="subtitle-1 text-center">
                {{ level === 0 ? 'Чары' : `${level} уровень` }}
              </h2>

              <!-- Spontaneous Charges -->
              <div v-if="!isPrepared" class="ammo-container">
                <div class="spell-charges">
                  <div v-for="n in spellSlots[level] || 0" :key="n" class="charge-dot"
                    :class="{ used: n > (characterSpont[level]?.value || 0) }" @click.left="changeBullet(level, -1)"
                    @contextmenu.prevent="changeBullet(level, +1)">
                    <v-icon small>mdi-flash</v-icon>
                  </div>
                </div>
              </div>

              <!-- Spell Table -->
              <v-data-table :headers="spellHeaders" :items="getSpellsForLevel(level)" :item-class="getItemClass"
                item-key="cellIndex" hide-default-footer dense>
                <!-- Cast Button -->
                <template v-slot:item.cast="{ item }">
                  <v-btn v-if="item.name && isPrepared" outlined x-small color="info"
                    @click="$emit('update-cast', item)">
                    <v-icon left>mdi-auto-fix</v-icon> Сотв
                  </v-btn>
                </template>

                <!-- Signature -->
                <template v-slot:item.signature="{ item }">
                  <v-icon v-if="canBeSignature(item, level)" small :color="isSignature(item) ? 'amber' : ''"
                    @click="$emit('toggle-signature', item)">
                    mdi-star-circle
                  </v-icon>
                </template>

                <!-- Name -->
                <template v-slot:item.name="{ item }">
                  <span v-if="!item.name" class="text--disabled">Пустой слот</span>
                  <span v-else>{{ item.name }}</span>
                </template>

                <!-- Action -->
                <template v-slot:item.action="{ item }">
                  <div v-if="item?.time" class="d-flex justify-center">
                    <img :src="$emit('get-action-icon', item?.time?.value)"
                      :class="{ 'invert-icon': !$vuetify.theme.dark }" style="width: 24px; height: 24px" />
                  </div>
                </template>

                <!-- Duration -->
                <template v-slot:item.duration="{ item }">
                  <span v-if="item?.duration?.sustained">Поддерживаемое до </span>
                  {{ item?.duration?.value || '-' }}
                </template>

                <!-- Distance -->
                <template v-slot:item.distance="{ item }">
                  {{ item?.distance || '-' }}
                </template>

                <!-- Saving -->
                <template v-slot:item.saving="{ item }">
                  <span v-if="item?.defense?.save">
                    <span v-if="item?.defense?.save?.basic">Базовый </span>
                    {{ getSaveName(item?.defense?.save?.statistic) }}
                  </span>
                  <span v-if="item?.traits?.includes('атака')">КБ</span>
                  <span v-else>-</span>
                </template>

                <!-- Area -->
                <template v-slot:item.area="{ item }">
                  <template v-if="item?.area">
                    {{ item?.area?.value }}-фут. {{ getAreaName(item?.area?.type) }}
                  </template>
                  <template v-if="item?.area && item?.target"> / </template>
                  <template v-if="item?.target">{{ item?.target }}</template>
                  <template v-if="!item?.area && !item?.target">-</template>
                </template>

                <!-- View -->
                <template v-slot:item.view="{ item }">
                  <v-btn v-if="item.name" outlined x-small color="info" @click="$emit('open-dialog', item)">
                    <v-icon left>visibility</v-icon> Просмотр
                  </v-btn>
                </template>

                <!-- Actions (Add/Remove) -->
                <template v-slot:item.button="{ item }">
                  <!-- Remove -->
                  <v-btn v-if="item.name && canRemove(item)" outlined x-small color="error"
                    @click.stop.prevent="$emit('remove-talent', item)">
                    <v-icon left>delete</v-icon> Удалить
                  </v-btn>

                  <!-- Add -->
                  <v-btn v-if="!item.name" outlined x-small color="success"
                    @click="$emit('update-preview', level, item.cell)">
                    <v-icon left>add</v-icon> Добавить
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- ========================================================== -->
    <!-- FOCUS SPELLS -->
    <!-- ========================================================== -->
    <v-expansion-panel v-if="hasFocusPool" class="custom-panel">
      <v-expansion-panel-header>Фокусные заклинания</v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-col cols="12">
          <v-col cols="12">
            <span><br /><b>Сложность заклинаний:</b> {{ spellDC }}</span>
            <span><br /><b>Атака заклинанием:</b> +{{ spellAttack }}</span>
            <span><br /><b>Запас фокуса:</b> {{ focusPool }}</span>
          </v-col>

          <v-card v-for="rank in [0, 1]" :key="rank" class="mb-4" dense outlined>
            <h2 class="subtitle-1 text-center">
              {{ rank === 0 ? 'Чары' : 'Фокусные заклинания' }}
            </h2>

            <v-data-table :headers="focusHeaders" :items="getFocusSpells(rank)" item-key="cellIndex" hide-default-footer
              dense>
              <!-- Name -->
              <template v-slot:item.name="{ item }">
                <span v-if="!item.name" class="text--disabled">Пустой слот</span>
                <span v-else>{{ item.name }}</span>
              </template>

              <!-- Action -->
              <template v-slot:item.action="{ item }">
                <div v-if="item?.time" class="d-flex justify-center">
                  <img :src="$emit('get-action-icon', item?.time?.value)"
                    :class="{ 'invert-icon': !$vuetify.theme.dark }" style="width: 24px; height: 24px" />
                </div>
              </template>

              <!-- Duration -->
              <template v-slot:item.duration="{ item }">
                <span v-if="item?.duration?.sustained">Поддерживаемое до </span>
                {{ item?.duration?.value || '-' }}
              </template>

              <!-- Distance -->
              <template v-slot:item.distance="{ item }">
                {{ item?.distance || '-' }}
              </template>

              <!-- Saving -->
              <template v-slot:item.saving="{ item }">
                <span v-if="item?.defense?.save">
                  <span v-if="item?.defense?.save?.basic">Базовый </span>
                  {{ getSaveName(item?.defense?.save?.statistic) }}
                </span>
                <span v-if="item?.traits?.includes('атака')">КБ</span>
                <span v-else>-</span>
              </template>

              <!-- Area -->
              <template v-slot:item.area="{ item }">
                <template v-if="item?.area">
                  {{ item?.area?.value }}-фут. {{ getAreaName(item?.area?.type) }}
                </template>
                <template v-if="item?.area && item?.target"> / </template>
                <template v-if="item?.target">{{ item?.target }}</template>
                <template v-if="!item?.area && !item?.target">-</template>
              </template>

              <!-- View -->
              <template v-slot:item.view="{ item }">
                <v-btn v-if="item.name" outlined x-small color="info" @click="$emit('open-dialog', item)">
                  <v-icon left>visibility</v-icon> Просмотр
                </v-btn>
              </template>

              <!-- Actions -->
              <template v-slot:item.button="{ item }">
                <v-btn v-if="item.name && !item.removeBlock" outlined x-small color="error"
                  @click.stop.prevent="$emit('remove-talent', item)">
                  <v-icon left>delete</v-icon> Удалить
                </v-btn>

                <v-btn v-if="!item.name" outlined x-small color="success"
                  @click="$emit('update-preview', rank, item.cell)">
                  <v-icon left>add</v-icon> Добавить
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- ========================================================== -->
    <!-- RITUALS -->
    <!-- ========================================================== -->
    <v-expansion-panel class="custom-panel">
      <v-expansion-panel-header>Ритуалы</v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="pa-2">
          <v-btn class="action-btn" outlined x-small @click="$emit('update-preview-ritual')">
            <v-icon left>add</v-icon> Добавить
          </v-btn>

          <v-data-table :headers="ritualHeaders" :items="ritualSpells" item-key="cellIndex" hide-default-footer dense>
            <!-- Name -->
            <template v-slot:item.name="{ item }">
              <span v-if="!item.name" class="text--disabled">Пустой слот</span>
              <span v-else>{{ item.name }}</span>
            </template>

            <!-- Action -->
            <template v-slot:item.action="{ item }">
              <div v-if="item?.time">
                <img :src="$emit('get-action-icon', item?.time?.value)" :class="{ 'invert-icon': !$vuetify.theme.dark }"
                  style="width: 24px; height: 24px" />
              </div>
            </template>

            <!-- Duration -->
            <template v-slot:item.duration="{ item }">
              <span v-if="item?.duration?.sustained">Поддерживаемое до </span>
              {{ item?.duration?.value || '-' }}
            </template>

            <!-- Distance -->
            <template v-slot:item.distance="{ item }">
              {{ item?.distance || '-' }}
            </template>

            <!-- Saving -->
            <template v-slot:item.saving="{ item }">
              <span v-if="item?.defense?.save">
                <span v-if="item?.defense?.save?.basic">Базовый </span>
                {{ getSaveName(item?.defense?.save?.statistic) }}
              </span>
              <span v-if="item?.traits?.includes('атака')">КБ</span>
              <span v-else>-</span>
            </template>

            <!-- Area -->
            <template v-slot:item.area="{ item }">
              <template v-if="item?.area">
                {{ item?.area?.value }}-фут. {{ getAreaName(item?.area?.type) }}
              </template>
              <template v-if="item?.area && item?.target"> / </template>
              <template v-if="item?.target">{{ item?.target }}</template>
              <template v-if="!item?.area && !item?.target">-</template>
            </template>

            <!-- View -->
            <template v-slot:item.view="{ item }">
              <v-btn v-if="item.name" outlined x-small color="info" @click="$emit('open-dialog', item)">
                <v-icon left>visibility</v-icon> Просмотр
              </v-btn>
            </template>

            <!-- Remove -->
            <template v-slot:item.button="{ item }">
              <v-btn v-if="item.name" outlined x-small color="error" @click.stop.prevent="$emit('remove-talent', item)">
                <v-icon left>delete</v-icon> Удалить
              </v-btn>
            </template>
          </v-data-table>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <!-- ========================================================== -->
    <!-- PSYCHIC DIALOG -->
    <!-- ========================================================== -->
    <v-dialog v-model="psychicDialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="1200px" scrollable>
      <PsychicPreview :character-id="characterId" :talents="selectedPsychic" :archetype="characterArchetype"
        :rank="rankSpell" :level="levelSpell" :list="psychicPowersList" :type="spellType" choose-mode
        @cancel="psychicDialog = false" />
    </v-dialog>
  </v-expansion-panels>
</template>

<script>
import { mapGetters } from 'vuex'
import PsychicPreview from '~/components/forge/PsychicPreview.vue'

export default {
  name: 'SpellSection',

  components: {
    PsychicPreview,
  },

  props: {
    characterId: { type: String, required: true },
    characterArchetype: { type: Object, default: null },
    psychicPowersList: { type: Array, default: () => [] },
    signatureSpells: { type: Array, default: () => [] },
    characterSpont: { type: Object, default: () => ({}) },
    savingRepository: { type: Array, default: () => [] },
    areaRepository: { type: Object, default: () => ({}) },
    characterLevel: { type: Number, default: 1 },
    getActionIcon: { type: Function, required: true },
  },

  data() {
    return {
      psychicDialog: false,
      selectedPsychic: null,
      rankSpell: null,
      levelSpell: null,
      spellType: 'spell',
    }
  },

  computed: {
    ...mapGetters('characters', [
      'characterSpellsById',
      'characterFocusSpellById',
      'characterFocusPoolById',
      'characterRitualSpellsById',
      'characterSignatureSpellsById',
      'characterAttributesById',
    ]),

    hasSpellProgression() {
      return !!this.characterArchetype?.spellProgression
    },

    hasFocusPool() {
      return !!this.characterArchetype?.spellFocusPool
    },

    archetypeName() {
      return this.characterArchetype?.name || ''
    },

    spellTradition() {
      return this.characterArchetype?.spellTradition || ''
    },

    isPrepared() {
      return this.characterArchetype?.prepared !== false
    },

    spellSlots() {
      const prog = this.characterArchetype?.spellProgression?.[this.characterLevel] || []
      return prog
    },

    maxSpellLevels() {
      const prog = this.characterArchetype?.spellProgression?.[this.characterLevel] || []
      return prog.map((_, i) => i).filter(i => i <= 10)
    },

    focusPool() {
      return this.characterArchetype?.spellFocusPool || 0
    },

    focusSpells() {
      return this.characterFocusSpellById(this.characterId) || []
    },

    ritualSpells() {
      return this.characterRitualSpellsById(this.characterId) || []
    },

    spellDC() {
      if (!this.characterArchetype?.spellProgression) return 0
      const prof = this.characterArchetype.spellsClass?.class || 'U'
      const attrKey = this.characterArchetype.attributeBoost?.find(t => t.value > 0)?.key || 'intelligence'
      const attr = this.characterAttributesById(this.characterId)?.[attrKey] || 10
      const profValue = this.getProficiencyValue(prof)

      return 10 + profValue + Math.floor((attr - 10) / 2) + this.characterLevel
    },

    spellAttack() {
      if (!this.characterArchetype?.spellProgression) return 0
      const prof = this.characterArchetype.spellsClass?.attack || 'U'
      const attrKey = this.characterArchetype.attributeBoost?.find(t => t.value > 0)?.key || 'intelligence'
      const attr = this.characterAttributesById(this.characterId)?.[attrKey] || 10
      const profValue = this.getProficiencyValue(prof)

      return profValue + Math.floor((attr - 10) / 2) + this.characterLevel
    },

    spellHeaders() {
      const base = [
        { text: 'Сотв.', value: 'cast', align: 'center', sortable: false, class: 'small pa-1', width: '50px' },
        { text: 'Коронное', value: 'signature', align: 'center', class: 'small pa-1', sortable: false, width: '50px' },
        { text: 'Название', value: 'name', align: 'left', sortable: true, class: 'small pa-1', width: '200px' },
        { text: 'Действия', value: 'action', align: 'center', sortable: true, class: 'small pa-1', width: '80px' },
        { text: 'Длительность', value: 'duration', align: 'center', sortable: true, class: 'small pa-1', width: '150px' },
        { text: 'Дистанция', value: 'distance', align: 'center', sortable: false, class: 'small pa-1', width: '100px' },
        { text: 'Защита', value: 'saving', align: 'center', sortable: false, class: 'small pa-1', width: '80px' },
        { text: 'Область/цель', value: 'area', align: 'center', sortable: false, class: 'small pa-1', width: '150px' },
        { text: '', value: 'view', sortable: false, class: 'small pa-1', width: '120px' },
        { text: '', value: 'button', sortable: false, class: 'small pa-1', width: '120px' },
      ]

      if (this.isPrepared) {
        return base.filter(h => h.value !== 'signature')
      }
      return base.filter(h => h.value !== 'cast')
    },

    focusHeaders() {
      return this.spellHeaders.filter(h => h.value !== 'cast' && h.value !== 'signature')
    },

    ritualHeaders() {
      return this.focusHeaders
    },

    allSpells() {
      return this.characterSpellsById(this.characterId) || []
    },
  },

  methods: {
    getProficiencyValue(key) {
      const map = { U: 0, T: 2, E: 4, M: 6, L: 8 }
      return map[key] || 0
    },

    getSpellsForLevel(level) {
      const spells = this.allSpells.filter(spell => spell.rank === level)
      const progression = this.spellSlots[level] || 0

      if (progression === 0) return []

      const result = []

      for (let i = 1; i <= progression; i++) {
        const existing = spells.find(s => s.cell === i)
        const raw = this.psychicPowersList?.find(s => s.key === existing?.key)

        let spell = {
          ...existing,
          ...raw,
          rank: level,
          cell: i,
          isSignature: false,
          disableSign: false,
        }

        // Check if signature
        const signature = this.signatureSpells.find(s => s.key === spell.key)
        if (signature && this.characterLevel >= 3) {
          spell.isSignature = true
          spell.signatureRank = signature.rank
        }

        // Damage calculation
        if (spell?.damage && spell?.heightening?.damage) {
          const cant = this.spellSlots.findIndex(t => t === 0) - 1
          const index = spell.damage?.formula?.indexOf('d')
          const dice = spell.damage?.formula?.slice(0, index)
          const diceSize = spell.damage?.formula?.slice(index + 1)
          const heightened = Object.values(spell.heightening.damage)[0]
          const index1 = heightened?.indexOf('d')
          const diceInterval = heightened?.slice(0, index1)
          const interval = spell.heightening.interval
          const rank = spell.traits?.join(',')?.includes('заговор') ? cant : spell.rank

          const powerLevel = parseInt(dice) + Math.floor((rank - spell.level) / interval) * parseInt(diceInterval)
          spell.Power = `<span style='color: green'>${powerLevel}d${diceSize}</span>`
        }

        result.push(spell)
      }

      // Virtual signature spells
      if (level > 0 && this.characterLevel >= 3) {
        const signatures = this.signatureSpells.filter(s => s.rank <= level)

        signatures.forEach(signature => {
          if (result.some(s => s.key === signature.key)) return

          const raw = this.psychicPowersList?.find(s => s.key === signature.key)
          if (!raw) return

          const virtual = {
            ...raw,
            key: raw.key,
            rank: level,
            sourceRank: signature.rank,
            cell: progression + result.length + 1,
            isSignature: true,
            signature: true,
            disableSign: true,
            signatureCopy: true,
          }

          // Damage for virtual
          if (virtual.damage && virtual.heightening?.damage) {
            const cant = this.spellSlots.findIndex(t => t === 0) - 1
            const index = virtual.damage.formula.indexOf('d')
            const dice = virtual.damage.formula.slice(0, index)
            const diceSize = virtual.damage.formula.slice(index + 1)
            const heightened = Object.values(virtual.heightening.damage)[0]
            const index1 = heightened.indexOf('d')
            const diceInterval = heightened.slice(0, index1)
            const interval = virtual.heightening.interval
            const rank = virtual.traits?.includes('заговор') ? cant : virtual.rank

            virtual.Power = `<span style='color:green'>${parseInt(dice) + Math.floor((rank - virtual.level) / interval) * parseInt(diceInterval)}d${diceSize}</span>`
          }

          result.push(virtual)
        })
      }

      return result
    },

    getFocusSpells(rank) {
      const spells = this.focusSpells
      const result = []
      let i = 0

      spells.forEach(spell => {
        const raw = this.psychicPowersList?.find(s => s.key === spell.key)
        const spellData = {
          ...raw,
          rank: rank,
          cell: i,
          removeBlock: spell.source === 'archetype',
        }
        if (raw) result.push(spellData)
        i++
      })

      return result
    },

    getItemClass(item) {
      return item.isSignature ? 'signature-row' : ''
    },

    isSignature(item) {
      return this.signatureSpells.some(s => s.rank === item.rank && s.key === item.key)
    },

    canBeSignature(item, level) {
      return !item.disableSign && level !== 0 && this.characterLevel >= 3 && !!item.name
    },

    canRemove(item) {
      return !this.isPrepared || (this.isPrepared && !item.disableSign)
    },

    getSaveName(key) {
      return this.savingRepository.find(t => t.key === key)?.name || key
    },

    getAreaName(type) {
      return this.areaRepository[type] || type
    },

    changeBullet(level, delta) {
      const max = this.spellSlots[level] || 0
      const current = this.characterSpont[level]?.value || 0
      const next = Math.max(0, Math.min(max, current + delta))
      this.$emit('change-bullet', level, next)
    },

    // Dialog methods
    openPsychicDialog(list, level, rank, type) {
      this.selectedPsychic = list
      this.levelSpell = level
      this.rankSpell = rank
      this.spellType = type
      this.psychicDialog = true
    },
  },
}
</script>

<style scoped lang="scss">
// Стили наследуются от родителя
// Добавляем только специфичные для этого компонента

.custom-panels {
  .custom-panel {
    border-radius: 10px;
    margin-bottom: 8px;
    background: var(--ui-surface, #fff);
    border: 1px solid var(--ui-border, rgba(0, 0, 0, 0.12));

    &:hover {
      border-color: var(--ui-border-strong, rgba(0, 0, 0, 0.2));
      background: var(--ui-surface-hover, #f5f5f5);
    }
  }

  .v-expansion-panel--active.custom-panel {
    background: var(--ui-surface-active, #e8e8e8);
  }
}

.spell-charges {
  display: flex;
  gap: 6px;
  padding: 6px 0;
  align-items: center;
}

.charge-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 229, 255, 0.12);
  border: 1px solid rgba(0, 229, 255, 0.25);
  cursor: pointer;
  transition: 0.15s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(0, 229, 255, 0.25);
  }

  &.used {
    opacity: 0.25;
    filter: grayscale(1);
  }
}

.invert-icon {
  filter: invert(1) brightness(1.2);
}

::v-deep .signature-row {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.15), rgba(255, 140, 0, 0.08));
  border-left: 3px solid gold;
  font-weight: 600;

  td {
    color: #ffd86b;
  }
}

::v-deep .crossed-row td {
  text-decoration: line-through;
  color: var(--ui-muted, #888);
}

.theme--dark {
  .custom-panel {
    background: var(--ui-surface-dark, #1e1e1e);
    border-color: var(--ui-border-dark, rgba(255, 255, 255, 0.08));

    &:hover {
      border-color: var(--ui-border-strong-dark, rgba(255, 255, 255, 0.15));
      background: var(--ui-surface-hover-dark, #2a2a2a);
    }
  }

  .v-expansion-panel--active.custom-panel {
    background: var(--ui-surface-active-dark, #333);
  }
}
</style>