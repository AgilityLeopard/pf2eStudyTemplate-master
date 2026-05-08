<template>
    <v-expansion-panels multiple>
        <v-expansion-panel v-for="section in sections" :key="section.title">
            <v-expansion-panel-header>
                <div class="d-flex align-center justify-space-between w-100">
                    <span class="section-title">{{ section.title }}</span>
                </div>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
                <v-list dense class="action-list">
                    <v-list-item v-for="(action, i) in section.items" :key="i" class="action-item"
                        @click="$emit('select', action)">
                        <div class="action-title">
                            <span class="action-symbol">
                                {{ action.symbol }}
                            </span>

                            <span>{{ action.name }}</span>

                            <div v-if="action?.actions">
                                <img :src="iconAction(action.actions.value)"
                                    :class="{ 'invert-icon': !$vuetify.theme.dark }" />
                            </div>
                        </div>
                    </v-list-item>
                </v-list>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    props: {
        explorationActions: Array,
        restActions: Array,
        otherActions: Array,
        iconAction: Function
    },

    computed: {
        sections() {
            return [
                { title: 'Исследование', items: this.explorationActions },
                { title: 'Отдых', items: this.restActions },
                { title: 'Прочие', items: this.otherActions }
            ].filter(s => s.items && s.items.length)
        }
    }
}
</script>