<template>
    <div class="talent-row">

        <div @click="toggle(talent)">
            <div class="talent-row">
                {{ talent.name }}
            </div>

            <div v-if="opened === talent.id" class="talent-description">
                <CardItem :item="talent" />
            </div>
        </div>

        <div class="talent-right">
            <span v-if="talent.level">{{ talent.level }}</span>
        </div>

    </div>
</template>
<script>
import CardItem from '@/components/CardItem.vue';

export default {
    component: {
        CardItem
    },
    props: {
        talent: Object
    },
}

</script>

<style scoped>
.talent-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    border-bottom: 1px solid var(--imprint-border-color);
    cursor: pointer;
}

.talent-left {
    display: flex;
    gap: 8px;
    align-items: center;
}

.index {
    color: gray;
    width: 20px;
    text-align: right;
}
</style>