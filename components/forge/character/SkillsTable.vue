<template>
    <div>
        <v-card-title class="skills-header">
            <h2 class="subtitle-1">Навыки</h2>
        </v-card-title>

        <v-data-table :headers="headers" :items="skills" dense :items-per-page="25" class="elevation-1"
            hide-default-footer>
            <template v-slot:item.name="{ item }">
                <div class="text-left pa-1 small">
                    {{ item.name }}
                </div>
            </template>

            <template v-slot:item.rating="{ item }">
                <div class="text-center pa-1 small">
                    {{ getRating(item) }}
                </div>
            </template>

            <template v-slot:item.value="{ item }">
                <div class="text-center pa-1 small">
                    {{ getValue(item) }}
                </div>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    props: {
        skills: Array,
        headers: Array,
        getRating: Function,
        getValue: Function
    }
}

</script>

<style scoped>
.skills-header {
    background-color: hsl(4, 90%, 58%);
    color: #fff;
    padding-top: 4px;
    padding-bottom: 4px;
}
</style>