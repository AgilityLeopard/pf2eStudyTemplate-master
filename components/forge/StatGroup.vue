<template>
  <div class="stat-group">
    <v-btn small class="stat-name-btn" depressed>
      <span class="truncate">{{ label }}</span>
    </v-btn>

    <v-btn small class="stat-mod-btn" depressed>
      {{ value }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "StatGroup",
  props: {
    label: String,
    value: [String, Number],
  },
}
</script>

<style scoped>
.stat-group {
  display: flex;
  width: 100%;
  min-width: 0;
}

.stat-name-btn {
  flex: 1 1 auto;
  min-width: 0 !important;
  max-width: 100%;
  overflow: hidden;

  background-color: var(--ui-surface-soft) !important;
  color: var(--ui-text) !important;

  font-weight: 400;
  backdrop-filter: blur(6px);
  text-transform: none;

  border-radius: 12px 0 0 12px !important;
  height: 28px !important;
  padding: 0 8px !important;
}

.stat-mod-btn {
  flex: 0 0 35px;

  background-color: var(--ui-surface-hover) !important;
  color: var(--ui-text) !important;

  border-radius: 0 12px 12px 0 !important;
  height: 28px !important;
  padding: 0 !important;
}

.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>