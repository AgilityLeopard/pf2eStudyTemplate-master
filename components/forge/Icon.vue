<template>
    <component :is="resolvedIcon" />
</template>

<script>
import icons from "./icons/iconRegistry"

export default {
    name: "AppIcon",
    props: {
        name: {
            type: String,
            required: true,
        },
    },
    computed: {
        resolvedIcon() {

            return icons[this.name] || null
        },
    },
}
</script>