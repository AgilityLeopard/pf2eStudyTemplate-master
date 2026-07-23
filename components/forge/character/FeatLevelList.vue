<template>
    <v-expansion-panels multiple>

        <v-expansion-panel v-for="level in levels" :key="level" v-if="showLevel(level)" class="ui-panel">

            <!-- HEADER -->
            <v-expansion-panel-header class="ui-panel-header">

                <div class="ui-panel-header__title">

                    <span v-if="level !== 0">{{ level }}</span>
                    <span v-if="level !== 0" class="ui-panel-level">уровень</span>

                    <span v-if="level === 0" class="ui-panel-level">Предыстория</span>

                    <span v-if="getTalent(level)" class="ml-2">
                        ({{ getTalent(level)?.label }})
                    </span>
                </div>

                <div class="d-flex align-center" style="gap: 8px">

                    <v-btn v-if="!getTalent(level) && level !== 0" class="ui-btn" small
                        @click.stop="$emit('select', level)">
                        Выберите черту
                    </v-btn>

                    <v-btn v-else-if="level !== 0" class="ui-btn" color="error" small
                        @click.stop.prevent=" $emit('remove', getTalent(level))">
                        Удалить
                    </v-btn>

                </div>

            </v-expansion-panel-header>

            <!-- CONTENT -->
            <v-expansion-panel-content class="ui-panel-content">

                <div v-if="getTalent(level)" class="ui-section">

                    <CardItem :item="getTalentData(getTalent(level))" />

                </div>

                <div v-else class="ui-message ui-message--warning">
                    Черта не выбрана
                </div>

            </v-expansion-panel-content>

        </v-expansion-panel>

    </v-expansion-panels>
</template>


<script>
import CardItem from '@/components/CardItem.vue';

export default {
    components: {
        CardItem
    },

    props: {
        levels: Array,
        showLevel: Function,
        getTalent: Function,
        getTalentData: Function,
    },
};
</script>

<style scoped lang="scss">
/* =========================
   UTILITIES
========================= */

.small {
    height: 24px;
}

td.small {
    font-size: 12px;
}

/* =========================
   LAYOUT
========================= */

.my-tabs-container {
    height: 620px;
    overflow: hidden;
    background: var(--ui-background);
}

.my-tab-item {
    height: 705px;
    overflow-y: auto;
}

/* =========================
   DIVIDER
========================= */

.sexy_line {
    display: block;
    height: 1px;
    border: none;
    background: linear-gradient(to right,
            transparent,
            var(--ui-border),
            transparent);
}

/* =========================
   BOX SYSTEM (resource / faith)
========================= */

.resource-box,
.faith-box {
    border: 1px solid var(--ui-border);
    box-shadow: inset 0 0 4px var(--ui-shadow);
    margin: 2px;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    border-radius: 6px;
    transition: 0.15s ease;
}

/* sizes */
.resource-box {
    width: 12px;
    height: 12px;
}

.faith-box {
    width: 20px;
    height: 20px;
}

/* hover = subtle lift */
.resource-box:hover,
.faith-box:hover {
    transform: translateY(-1px) scale(1.03);
    border-color: var(--ui-accent);
}

/* filled */
.resource-box--filled::before,
.faith-box--filled::before {
    content: "";
    display: block;
    width: 70%;
    height: 70%;
    margin: auto;
    background: var(--ui-danger);
    border-radius: 2px;
}

/* alt fill */
.resource-box--filled-light::before {
    background: var(--ui-warning) !important;
}

/* =========================
   TABLE BASE (GLOBAL BEHAVIOR)
========================= */

tr.v-data-table__selected {
    background: var(--ui-focus) !important;
}

/* =========================
   SKILL TABLE (MAIN COMPONENT)
========================= */

.skill-table {
    font-size: 13px;
    border-collapse: collapse;

    td {
        padding: 5px 6px !important;
        color: var(--ui-text);
        vertical-align: middle;
    }

    /* ROW */
    .skill-row {
        height: 36px;
        cursor: pointer;
        position: relative;
        transition: 0.15s ease;
        border-bottom: 1px solid var(--ui-border);

        /* hover = clean elevation */
        &:hover {
            background: var(--ui-hover);
        }

        /* active click feel */
        &:active {
            background: var(--ui-surface-active);
        }

        /* disabled */
        &--disabled {
            opacity: 0.45;
            cursor: not-allowed;

            &:hover {
                background: transparent;
            }
        }

        /* trained / upgraded */
        &--trained-up {
            background: color-mix(in srgb, var(--ui-warning) 10%, transparent);

            td:first-child::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 3px;
                height: 100%;
                background: linear-gradient(to bottom,
                        var(--ui-warning),
                        var(--ui-accent));
            }
        }
    }

    /* columns */
    .skill-name {
        width: 35%;
        font-weight: 500;
    }

    .skill-mod {
        width: 40px;
        text-align: center;
        font-weight: 600;
        color: var(--ui-accent);
    }

    .skill-train {
        width: 70px;
        text-align: center;
        font-size: 12px;
        color: var(--ui-muted);
    }

    .skill-delete {
        width: 32px;
        text-align: center;
    }
}

/* =========================
   BUTTON SYSTEM (IMPORTANT UPGRADE)
========================= */

.compact-btn {
    min-width: 28px !important;
    height: 28px !important;
}

/* Vuetify override (critical for consistency) */
.v-btn {
    border-radius: 8px !important;
    text-transform: none !important;
    font-weight: 500;
    letter-spacing: 0;
}

/* primary action */
.v-btn.primary {
    background: var(--ui-accent) !important;
    color: var(--ui-text-inverse) !important;
}

/* subtle buttons */
.v-btn:not(.primary):not(.error):not(.success) {
    background: var(--ui-surface-soft) !important;
    color: var(--ui-text) !important;
}

/* hover feel */
.v-btn:hover {
    filter: brightness(1.05);
}

/* =========================
   CHIPS (VERY IMPORTANT VISUAL FIX)
========================= */

.v-chip {
    background: var(--ui-surface-soft) !important;
    color: var(--ui-text) !important;
    font-weight: 500;
    border: 1px solid var(--ui-border);
}

/* success chip (progress / stats) */
.v-chip.success--text {
    background: var(--ui-success) !important;
    color: var(--ui-text-inverse) !important;
}

/* =========================
   CARD HEADER STATES
========================= */

.v-card-title {
    color: var(--ui-text);
    font-weight: 600;
    border-bottom: 1px solid var(--ui-border);
}

/* success header */
.card-title-success {
    background: var(--ui-success);
    color: var(--ui-text-inverse);
}

/* =========================
   DIALOG SYSTEM (IMPORTANT UX FIX)
========================= */

.v-dialog .v-card {
    background: var(--ui-surface);
    color: var(--ui-text);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 40px var(--ui-shadow);
}

/* dialog header */
.v-dialog .v-card-title {
    background: var(--ui-surface-soft);
}

/* =========================
   LIST ITEMS
========================= */

.v-list-item {
    border-radius: 8px;
    transition: 0.15s ease;
}

.v-list-item:hover {
    background: var(--ui-hover);
}

/* =========================
   GLOBAL FEEL FIXES
========================= */

* {
    -webkit-font-smoothing: antialiased;
}

/* better click feedback globally */
button,
.v-btn,
.skill-row {
    user-select: none;
}

/* smoother transitions everywhere */
.skill-row,
.v-btn,
.v-chip,
.resource-box,
.faith-box {
    transition: 0.15s ease;
}

.ui-btn {
    border-radius: 10px;
    text-transform: none;
    font-weight: 500;
    letter-spacing: 0.2px;
    transition: var(--ui-transition);
}

.ui-btn--primary {
    background: var(--ui-surface);
    color: var(--ui-text);
    border: 1px solid var(--ui-border);

    &:hover {
        border-color: var(--ui-accent);
        background: var(--ui-surface-hover);
    }
}

.ui-chip {
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;

    height: 26px;
    padding: 0 10px;

    background: var(--ui-surface-soft);

    border: 1px solid var(--ui-border);
    color: var(--ui-text);

    transition: var(--ui-transition);
}

/* прогресс-чип (главный кейс у тебя) */
.ui-chip--progress {
    background: color-mix(in srgb, var(--ui-accent) 12%, transparent);
    border-color: var(--ui-accent);
    color: var(--ui-text);
}

/* hover эффект */
.ui-chip:hover {
    transform: translateY(-1px);
    border-color: var(--ui-border-strong);
}

.ui-chip--complete {
    background: color-mix(in srgb, var(--ui-success) 15%, transparent);
    border-color: var(--ui-success);
}

.ui-panel {
    border-radius: 12px;
    margin-bottom: 8px;
    border: 1px solid var(--ui-border);
    background: var(--ui-surface);
    overflow: hidden;

    transition: var(--ui-transition);
}

.ui-panel:hover {
    border-color: var(--ui-border-strong);
    background: var(--ui-surface-hover);
}

.ui-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    padding: 10px 12px;

    font-weight: 600;
    font-size: 14px;
    color: var(--ui-text);

    letter-spacing: 0.2px;
}

/* левая часть (текст + уровень) */
.ui-panel-header__title {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* уровень как бейдж */
.ui-panel-level {
    font-size: 12px;
    font-weight: 600;
    padding: 2px 8px;

    border-radius: 999px;
    background: var(--ui-surface-soft);
    border: 1px solid var(--ui-border);
    color: var(--ui-text-muted);
}

.ui-panel-content {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* секции внутри панели */
.ui-section {
    padding: 12px;
    border-radius: 12px;

    background: var(--ui-surface);
    border: 1px solid var(--ui-border);
}

.ui-section__title {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 10px;
    color: var(--ui-text);
}

.ui-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
}

/* фиксируем геометрию */
.ui-table td {
    padding: 6px 10px;
    position: relative;
    color: var(--ui-text);
    vertical-align: middle;
}

/* строки */
.ui-row {
    position: relative;
    height: 36px;
    cursor: pointer;
    transition: background 0.15s ease;
}

/* hover НЕ меняет layout */
.ui-row:hover {
    background: var(--ui-hover);
}

.ui-row--active td {
    position: relative;
}

.ui-row--active td::before {
    content: "";
    position: absolute;
    inset: 0;
    background: color-mix(in srgb, var(--ui-accent) 10%, transparent);
    pointer-events: none;
    z-index: 0;
}

/* disabled */
.ui-row--disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

/* чтобы текст был выше overlay */
.ui-row td {
    position: relative;
    z-index: 1;
}

.ui-cell {
    // display: flex;
    align-items: center;
}

.ui-cell--name {
    justify-content: flex-start;
    // font-weight: 500;
}

/* numeric center */
.ui-cell--mod,
.ui-cell--center {
    text-align: center;
    // font-weight: 600;
}

/* attribute block */
.ui-attr-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
}

.ui-attr-short {
    font-size: 12px;
    opacity: 0.8;
}

.ui-attr-mod {
    font-size: 13px;
    // font-weight: 600;
}

/* delete icon */
.ui-icon-danger {
    color: var(--ui-danger);
    opacity: 0.8;
    transition: var(--ui-transition);
}

.ui-icon-danger:hover {
    opacity: 1;
    transform: scale(1.1);
}

.ui-dialog .v-card {
    background: var(--ui-surface);
    border-radius: 14px;
    overflow: hidden;
}

.ui-dialog-header {
    background: var(--ui-surface-soft);
    border-bottom: 1px solid var(--ui-border);
    padding: 12px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.ui-message {
    display: flex;
    align-items: center;

    padding: 10px 12px;
    border-radius: 10px;

    font-size: 13px;
    font-weight: 500;

    border: 1px solid var(--ui-border);
    background: var(--ui-surface-soft);
    color: var(--ui-text);

    margin: 6px 0;
}

/* warning */
.ui-message--warning {
    border-color: var(--ui-warning);
    background: color-mix(in srgb, var(--ui-warning) 10%, transparent);
}

/* error */
.ui-message--error {
    border-color: var(--ui-danger);
    background: color-mix(in srgb, var(--ui-danger) 10%, transparent);
}

/* info */
.ui-message--info {
    border-color: var(--ui-accent);
    background: color-mix(in srgb, var(--ui-accent) 10%, transparent);
}

.ui-message--info {
    background: color-mix(in srgb, var(--ui-accent) 10%, transparent);
}

.ui-select {
    font-size: 13px;
}

/* сам input */
.ui-select .v-input__control {
    background: var(--ui-surface);
    border-radius: 10px;
    border: 1px solid var(--ui-border);
    transition: var(--ui-transition);
}

/* hover */
.ui-select:hover .v-input__control {
    border-color: var(--ui-border-strong);
}

/* focus */
.ui-select.v-input--is-focused .v-input__control {
    border-color: var(--ui-accent);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--ui-accent) 20%, transparent);
}

/* label */
.ui-select .v-label {
    font-size: 12px;
    color: var(--ui-muted);
}

.ui-h2 {
    font-size: 15px;
    font-weight: 700;
    color: var(--ui-text);

    margin: 10px 0;
    letter-spacing: 0.2px;
}

.ui-h3 {
    font-size: 13px;
    font-weight: 600;
    color: var(--ui-text);

    margin: 8px 0;
    opacity: 0.9;
}

.ui-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 10px 12px;

    background: var(--ui-surface-soft);
    border-bottom: 1px solid var(--ui-border);

    font-size: 13px;
    font-weight: 600;
    color: var(--ui-text);
}
</style>