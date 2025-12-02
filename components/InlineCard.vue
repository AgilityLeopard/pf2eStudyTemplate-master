<template>
    <span class="inline-item" @mouseenter="open = true" @mouseleave="open = false">
        <span class="inline-item-text">{{ item.name }}</span>

        <v-menu v-model="open" activator="parent" close-on-content-click>
            <CardItem :item="item" />
        </v-menu>
    </span>
</template>

<script setup>
import { ref } from "vue";
import CardItem from "@/components/CardItem.vue";

const props = defineProps({
    item: Object
});

const open = ref(false);
</script>

<style>
.inline-item-text {
    color: var(--v-theme-primary);
    text-decoration: underline dotted;
    cursor: pointer;
}
</style>
