<template>
    <svg class="icon-ac" viewBox="0 0 150 220">
        <g transform="translate(-50, -100)">
            <path class="ac-path"
                d="M89.5,109.1c-6.5,1.1-12,2.2-12.1,2.3c-0.1,0.1,0.4,2.1,1.2,4.3c3.7,10.2,5.6,19.5,5.1,25.1c-0.4,4.1-2.6,10.8-4.9,15.2l-1.8,3.2l3.2,4.7C91,180.1,93.4,186.3,91.3,193c-0.4,1.3-0.7,2.5-0.7,2.6c0,0.4,4.3,5.4,8,9.2c4.6,4.8,12.6,8.5,25.1,11.7l4.6,1.2l6.6-1.9c7.7-2.2,15.1-5.1,18.5-7.2c1.3-0.9,4.5-4,7.1-7l4.8-5.5l-0.8-3c-1.8-7.1,0.3-12.8,10.7-28.6l3.6-5.5l-1.7-3.2c-1-1.8-2.4-5.3-3.3-7.8c-1.4-4-1.6-5.2-1.6-9.8c0-4.5,0.2-6.3,1.6-11.5c0.9-3.5,2.3-8.2,3.3-10.7c0.9-2.4,1.5-4.6,1.4-4.7c-0.1-0.1-5.2-1.1-11.2-2.1c-6-1-11.6-2-12.4-2.1l-1.4-0.2l-4.3,8.6l-4.3,8.6h-17h-17l-4.3-8.6c-2.4-4.7-4.5-8.6-4.8-8.6C101.6,107,96,107.9,89.5,109.1z" />
        </g>
    </svg>
</template>

<script>
export default { name: "ACIcon" }
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