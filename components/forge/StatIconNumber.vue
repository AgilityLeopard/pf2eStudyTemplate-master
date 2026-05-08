<template>
    <div class="stat-icon-wrapper">

        <div class="stat-title">
            {{ title }}
        </div>

        <div class="icon-box">
            <slot />
        </div>

        <div class="stat-value">
            {{ value }}
        </div>

    </div>
</template>

<script>
export default {
    props: {
        title: String,
        value: [String, Number],
    },
}
</script>

<style scoped>
.stat-icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}

.icon-box {
    position: relative;
    width: 80px;
    height: 80px;
}

.stat-value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
}
</style>
