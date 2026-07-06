<template>
    <svg class="icon-ac" viewBox="0 0 150 220">
        <g transform="translate(0, 0)">
            <path class="ac-path" d="M75 10 
                   L130 35 
                   V85 
                   C130 120 105 155 75 180 
                   C45 155 20 120 20 85 
                   V35 
                   Z" />
        </g>
    </svg>
</template>

<script>
export default { name: "ShieldIcon" }
</script>

<style scoped>
.icon-ac {
    width: 100%;
    height: 130%;
}

/* основной стиль */
.ac-path {
    fill: var(--icon-fill);
    stroke: var(--icon-stroke);
    stroke-width: 2;

    transition: all 0.2s ease;
}

/* лёгкий glow — делает иконку “живой” */
.ac-path {
    filter: drop-shadow(0 2px 6px var(--ui-shadow));
}

/* hover эффект */
.icon-ac:hover .ac-path {
    stroke: var(--ui-accent);
    filter: drop-shadow(0 0 6px var(--ui-accent));
}
</style>