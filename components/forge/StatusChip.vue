<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-chip small close v-bind="attrs" v-on="on" @click:close="$emit('remove')">
                <span>{{ name }}</span>
                <span v-if="value !== null" class="ml-1">{{ value }}</span>
            </v-chip>
        </template>

        <span v-html="description"></span>
    </v-tooltip>
</template>

<script>
export default {
    name: "StatusChip",
    props: {
        name: String,
        value: [String, Number],
        description: String,
    },
}
</script>