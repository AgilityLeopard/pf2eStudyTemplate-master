<template>
    <div>
        <div class="rune-selector-header">
            <!-- <div class="subtitle-2 font-weight-medium">
                {{ title }}
            </div> -->

            <v-btn outlined small color="primary" @click="dialog = true">
                {{ label }}
            </v-btn>
        </div>

        <v-dialog v-model="dialog" max-width="1400px">
            <v-card>
                <v-card-title class="headline">{{ title }}</v-card-title>

                <v-card-text>


                    <v-row>
                        <v-col cols="6" sm="4">
                            <div class="runes-list">
                                <v-list dense>
                                    <v-list-item v-for="rune in runes" :key="rune.key" @click="select(rune.key)"
                                        :class="{ 'selected-rune': isSelected(rune.key) }">
                                        <v-list-item-title>
                                            {{ rune.name }}
                                        </v-list-item-title>

                                        <v-list-item-icon v-if="isSelected(rune.key)">
                                            <v-icon color="success">mdi-check</v-icon>
                                        </v-list-item-icon>
                                    </v-list-item>
                                </v-list>
                            </div>
                        </v-col>

                        <v-col cols="6" sm="8">
                            <div v-if="selectedRune">
                                <slot name="preview" :rune="selectedRune" />
                            </div>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer />
                    <v-btn text color="error" @click="dialog = false">Отмена</v-btn>
                    <v-btn color="success" @click="save">Сохранить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import CardItem from '../../CardItem.vue';

export default {


    components: {
        CardItem
    },
    props: {
        value: [Number, Array, String],
        runes: Array,
        title: String,
        multiple: Boolean,
    },

    data() {
        return {
            dialog: false,
            localValue: this.multiple ? [...(this.value || [])] : this.value,
            selectedRune: null,


        };
    },

    computed: {
        label() {
            if (this.multiple) {
                return this.localValue?.length ? `Выбрано: ${this.localValue.length}` : "Выбрать";
            }
            const rune = this.runes.find(r => r.key === this.localValue);
            return rune ? rune.name : "Выбрать";
        }
    },

    methods: {
        select(key) {
            if (this.multiple) {
                const i = this.localValue.indexOf(key);
                i === -1 ? this.localValue.push(key) : this.localValue.splice(i, 1);
            } else {
                this.localValue = key;
            }

            this.selectedRune = this.runes.find(r => r.key === key);
        },

        isSelected(key) {
            return this.multiple
                ? this.localValue.includes(key)
                : this.localValue === key;
        },

        save() {
            this.$emit("input", this.localValue);
            this.dialog = false;
        }
    },

    watch: {
        value(val) {
            this.localValue = this.multiple ? [...val] : val;
        }
    }
};
</script>

<style scoped>
.runes-list {
    max-height: 600px;
    /* нужная высота */
    overflow-y: auto;
}

.rune-selector-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 8px;
}

.rune-selector-header .v-btn {
    flex-shrink: 0;
}
</style>