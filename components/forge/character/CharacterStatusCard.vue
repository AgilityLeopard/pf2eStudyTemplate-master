<template>
    <v-card class="glass-card pa-3 stat-card" height="100%">

        <!-- Header -->

        <div class="title mb-3 text-center">Состояния <v-btn icon small @click="openDialog">
                <v-icon small>mdi-plus</v-icon>
            </v-btn></div>






        <!-- Active statuses -->
        <div v-if="activeStatuses.length > 0" class="mb-3">
            <v-tooltip bottom v-for="status in activeStatuses" :key="status.key">
                <template v-slot:activator="{ on, attrs }">

                    <v-chip small close class="ma-1" v-bind="attrs" v-on="on" @click:close="removeStatus(status.key)">
                        <span>{{ status.name }}</span>

                        <span class="ml-1" v-if="hasFlatModifier(status)">
                            {{ status.value }}
                        </span>
                    </v-chip>

                </template>

                <span v-html="status.description"></span>
            </v-tooltip>
        </div>

        <div v-else class="grey--text text-center caption mb-4">
            Нет активных состояний
        </div>

        <!-- Hero points -->
        <div class="subtitle-2 text-center mb-1">
            Очки Героизма
        </div>

        <div class="d-flex justify-center">
            <div class="magazine" @click="handleHero($event)" @contextmenu.prevent="handleHero($event)">
                <span v-for="n in 3" :key="n" class="bullet" :class="{ filled: n <= heroPoints }">
                    <v-icon small color="yellow darken-1">
                        mdi-star
                    </v-icon>
                </span>
            </div>
        </div>

        <!-- Dialog -->
        <v-dialog v-model="dialog" max-width="700">

            <v-card>

                <v-card-title>
                    Управление состояниями
                    <v-spacer />
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Поиск" hide-details single-line />
                </v-card-title>

                <v-card-text>

                    <v-tabs v-model="tab" grow>
                        <v-tab>Активные</v-tab>
                        <v-tab>Доступные</v-tab>
                    </v-tabs>

                    <v-tabs-items v-model="tab">

                        <!-- ACTIVE -->
                        <v-tab-item>
                            <v-list v-if="activeStatuses.length">

                                <v-list-item v-for="status in activeStatuses" :key="status.key">

                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ status.name }}

                                            <v-icon small class="ml-1">
                                                mdi-information
                                            </v-icon>
                                        </v-list-item-title>
                                    </v-list-item-content>

                                    <v-list-item-action>

                                        <div v-if="hasFlatModifier(status)" class="d-flex align-center">

                                            <v-btn x-small icon @click="updateValue(status, -1)">
                                                <v-icon x-small>mdi-minus</v-icon>
                                            </v-btn>

                                            <span class="mx-2">
                                                {{ status.value }}
                                            </span>

                                            <v-btn x-small icon @click="updateValue(status, 1)">
                                                <v-icon x-small>mdi-plus</v-icon>
                                            </v-btn>

                                        </div>

                                        <v-btn icon color="error" @click="removeStatus(status.key)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>

                                    </v-list-item-action>

                                </v-list-item>

                            </v-list>

                            <div v-else class="text-center grey--text py-4">
                                Нет активных
                            </div>
                        </v-tab-item>

                        <!-- AVAILABLE -->
                        <v-tab-item>
                            <v-list>

                                <v-list-item v-for="status in filteredStatuses" :key="status.key"
                                    @click="toggleStatus(status)">

                                    <v-list-item-action>
                                        <v-checkbox :input-value="isActive(status.key)" />
                                    </v-list-item-action>

                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{ status.name }}
                                        </v-list-item-title>
                                    </v-list-item-content>

                                </v-list-item>

                            </v-list>
                        </v-tab-item>

                    </v-tabs-items>

                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn color="primary" @click="dialog = false">
                        Close
                    </v-btn>
                </v-card-actions>

            </v-card>

        </v-dialog>

    </v-card>
</template>

<script>
export default {
    name: "CharacterStatusCard",

    data() {
        return {
            dialog: false,
            tab: 0,
            search: "",
        }
    },

    computed: {
        activeStatuses() {
            return this.$parent.activeStatuses
        },

        filteredStatuses() {
            return this.$parent.filteredStatuses
        },

        heroPoints() {
            return this.$parent.characterHeroPoints
        },
    },

    methods: {
        openDialog() {
            this.dialog = true
        },

        removeStatus(key) {
            this.$parent.removeStatus(key)
        },

        toggleStatus(status) {
            this.$parent.toggleStatus(status)
        },

        updateValue(status, delta) {
            this.$parent.updateStatusValue(status, delta)
        },

        isActive(key) {
            return this.$parent.isStatusActive(key)
        },

        handleHero(e) {
            this.$parent.handleClick2(e, this.heroPoints)
        },

        hasFlatModifier(status) {
            return (
                status.rules?.find(s => s.key === "FlatModifier") &&
                status.rules?.find(s => s.value === "-value")
            )
        },
    },
}

</script>

<style scoped>
/* overlay */
.glass-card {
    position: relative;
    overflow: hidden;

    background: var(--ui-surface) !important;
    border: 1px solid var(--ui-border);
    border-radius: 14px;

    box-shadow: 0 6px 18px var(--ui-shadow);

    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;

    color: var(--ui-text);

    z-index: 0;
    /* важно */
}

/* overlay */
.glass-card::after {
    content: "";
    position: absolute;
    inset: 0;

    background: var(--ui-hover);
    opacity: 0;

    transition: opacity 0.2s ease;

    pointer-events: none;
    z-index: 1;
    /* overlay сверху */
}

.glass-card::after {
    content: "";
    position: absolute;
    inset: 0;

    background: var(--ui-hover);
    opacity: 0;

    transition: opacity 0.2s ease;

    pointer-events: none;
    z-index: 1;
    /* overlay сверху */
}

/* ВСЁ содержимое карточки — выше overlay */
.glass-card>* {
    position: relative;
    z-index: 2;
}

/* hover */
.glass-card:hover {
    transform: translateY(-2px);
    border-color: var(--ui-border-strong);
    box-shadow: 0 10px 24px var(--ui-shadow);
}

.glass-card:hover::after {
    opacity: 1;
}
</style>