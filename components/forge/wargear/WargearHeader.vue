<template>
    <v-row class="mb-2 align-center">

        <!-- Вес -->
        <v-col cols="12" md="4">
            <div class="badge">
                Вес: {{ bulk }}
                (Нагружен: {{ encumbered }}, Макс: {{ max }})
            </div>
        </v-col>

        <!-- Валюта -->
        <v-col cols="12" md="4">
            <div class="currencies">
                <div class="currency" v-for="c in currencies" :key="c.value">
                    <span class="value">{{ money[c.value] }}</span>
                    <img :src="`/img/icon/${c.icon}`" :alt="c.name" />
                </div>
            </div>
        </v-col>

        <!-- Фильтр -->
        <!-- <v-col cols="12" md="4">
            <v-text-field v-model="localSearch" label="Поиск" dense hide-details clearable
                @input="$emit('search', localSearch)" />
        </v-col> -->

    </v-row>
</template>

<script>
export default {
    props: {
        bulk: String,
        strength: Number,
        currencies: Array,
        money: Object
    },

    data() {
        return {
            localSearch: ''
        }
    },

    computed: {
        encumbered() {
            return 5 + Math.floor((this.strength - 10) / 2)
        },
        max() {
            return 10 + Math.floor((this.strength - 10) / 2)
        }
    }
}
</script>

<style scoped>
.badge {
    padding: 6px 12px;
    border-radius: 12px;
    font-weight: 600;
}

.badge-label {
    font-size: 0.75rem;
    color: #a6a7ab;
}

.value-badge {
    background: #2196f3;
    color: white;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
}

.currencies {
    display: flex;
    gap: 12px;
}

.currency {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    color: #adb5bd;
}

.currency img {
    width: 20px;
    height: 20px;
}
</style>