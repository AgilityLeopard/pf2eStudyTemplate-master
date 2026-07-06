<template>
  <div class="shield-stat">

    <div class="stat-title">
      {{ title }}
    </div>





    <v-menu offset-y :close-on-content-click="false">
      <template v-slot:activator="{ on, attrs }">
        <div class="shield-container" v-bind="attrs" v-on="on">

          <div class="shield-ac">
            {{ value }}
          </div>

          <div class="shield-icon">
            <app-icon name="shield" />
          </div>

          <div class="shield-hardness">
            Твд {{ hardness }}
          </div>

          <!-- HP кольцо -->
          <div class="shield-hp-ring">

            <svg viewBox="0 0 40 40">

              <circle class="ring-bg" cx="20" cy="20" r="14" />

              <circle class="ring-value" cx="20" cy="20" r="14" :stroke="ringColor" :stroke-dasharray="circumference"
                :stroke-dashoffset="dashOffset" />

            </svg>

            <span>{{ current }}</span>

          </div>

        </div>


      </template>

      <v-card width="220">
        <v-card-title class="text-subtitle-1">
          Прочность щита
        </v-card-title>

        <v-card-text>

          <v-text-field v-model.number="localHp" type="number" dense outlined label="HP" />

          <div class="text-caption">
            Максимум: {{ max }}
          </div>

          <div class="d-flex mt-2">
            <v-btn small @click="localHp -= 1">-1</v-btn>
            <v-btn small @click="localHp -= 5">-5</v-btn>

            <v-spacer />

            <v-btn small @click="localHp += 1">+1</v-btn>
            <v-btn small @click="localHp += 5">+5</v-btn>
          </div>

        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="saveHp">
            Сохранить
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-menu>
  </div>
</template>

<script>

import ShieldIcon from "./ShieldIcon.vue"
import AppIcon from '~/components/forge/Icon.vue';

export default {
  components: {

    AppIcon,
    ShieldIcon
  },
  data() {
    return {
      localHp: this.current
    }
  },
  props: {
    title: {
      type: String,
      default: 'ЩИТ'
    },

    hardness: {
      type: Number,
      default: 0
    },


    value: {
      type: [String, Number],
      required: true
    },

    current: {
      type: Number,
      required: true
    },

    max: {
      type: Number,
      required: true
    }
  },
  watch: {
    current(val) {
      this.localHp = val
    }
  },
  methods: {
    saveHp() {
      this.localHp = this.localHp < 0 ? 0 : this.localHp;
      this.localHp = this.localHp > this.max ? this.max : this.localHp
      this.$emit('update-hp', this.localHp)
    }
  },
  computed: {
    percent() {
      if (!this.max) return 0

      return Math.min(
        100,
        Math.max(0, (this.current / this.max) * 100)
      )
    },

    circumference() {
      return 2 * Math.PI * 14
    },

    dashOffset() {
      return this.circumference * (1 - this.percent / 100)
    },

    ringColor() {
      if (this.percent > 60) return '#42a5f5'
      if (this.percent > 30) return '#ff9800'
      return '#f44336'
    }
  }
}
</script>

<style scoped>
.shield-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}


.progress-ring {
  position: absolute;
  inset: 0;

  transform: rotate(-90deg);
}

.ring-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.15);
  stroke-width: 4;
}

.ring-value {
  fill: none;
  stroke-width: 4;
  stroke-linecap: round;

  transition:
    stroke-dashoffset 0.3s ease,
    stroke 0.3s ease;
}

.shield-container {
  position: relative;
  width: 80px;
  height: 80px;
}

.shield-icon {
  position: absolute;
  inset: 0;

  display: flex;
  justify-content: center;
  align-items: center;
}

.shield-ac {
  position: absolute;
  top: 6px;
  left: 50%;

  transform: translateX(-50%);

  font-weight: 700;
  font-size: 14px;

  z-index: 3;
}

.shield-hardness {
  position: absolute;
  top: 22px;
  left: 50%;

  transform: translateX(-50%);

  font-size: 11px;
  font-weight: 600;

  z-index: 3;
}

.shield-hp-ring {
  position: absolute;

  bottom: 14px;
  left: 50%;

  transform: translateX(-50%);

  width: 28px;
  height: 28px;

  z-index: 3;
}

.shield-hp-ring svg {
  width: 100%;
  height: 100%;

  transform: rotate(-90deg);
}

.shield-hp-ring span {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 10px;
  font-weight: 700;
}
</style>