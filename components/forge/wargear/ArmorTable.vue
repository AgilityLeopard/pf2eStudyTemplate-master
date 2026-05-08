<template>
    <div>
        <v-btn outlined block color="success" class="mt-2" @click="ArmorSearchDialog = true">
            Добавить доспех
        </v-btn>

        <v-data-table :headers="headersArmor" :items="items" hide-default-footer v-if="items.length">
            <!-- name -->
            <template v-slot:item.name="{ item }">
                {{ item.name }}
            </template>
            <!-- group -->
            <template v-slot:item.group="{ item }">
                <div class="text-center">
                    {{ armorGroupName(item.group) }}
                </div>
            </template>

            <!-- bulk -->
            <template v-slot:item.bulk="{ item }">
                <div class="text-center">
                    {{ item.bulk?.value === 0.1 ? 'Л' : item.bulk?.value }}
                </div>
            </template>

            <!-- category -->
            <template v-slot:item.category="{ item }">
                <div class="text-center">
                    {{ category(item.category) }}
                </div>
            </template>

            <!-- traits -->
            <template v-slot:item.traits="{ item }">
                {{ item.traits?.join(', ') }}
            </template>

            <!-- equip -->
            <template v-slot:item.equip="{ item }">
                <v-btn outlined x-small :color="isEquipped(item) ? 'info' : 'warning'" @click="$emit('toggle', item)">
                    <v-icon left>lock</v-icon>
                    {{ isEquipped(item) ? 'Снять' : 'Надеть' }}
                </v-btn>
            </template>

            <!-- view -->
            <template v-slot:item.view="{ item }">
                <v-btn outlined x-small color="info" @click="$emit('view', item)">
                    <v-icon left>visibility</v-icon> Просмотр
                </v-btn>
            </template>

            <!-- qty -->
            <template v-slot:item.qty="{ item }">
                <div class="d-flex align-center justify-center">
                    <v-btn icon :disabled="item.qty === 1" @click="decrementQty(item)">
                        <v-icon color="red">remove_circle</v-icon>
                    </v-btn>

                    {{ item.qty }}

                    <v-btn icon @click="incrementQty(item)">
                        <v-icon color="orange">add_circle</v-icon>
                    </v-btn>
                </div>
            </template>


            <!-- edit -->
            <template v-slot:item.edit="{ item }">
                <v-btn outlined x-small color="info" @click="openWeaponSettings(item)">
                    <v-icon left>edit</v-icon>
                </v-btn>
            </template>

            <!-- delete -->
            <template v-slot:item.delete="{ item }">
                <v-btn outlined x-small color="error" @click="remove(item)">
                    <v-icon left>delete</v-icon>
                </v-btn>
            </template>

        </v-data-table>

        <div v-else class="text-center mt-2 mb-2">
            <em>Нет доспехов? Возьми на вкладке Снаряжения!</em>
        </div>

        <v-dialog v-model="ArmorSearchDialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="1400px" scrollable>
            <v-col :cols="12" v-if="wargearList">

                <v-alert v-if="alertMoney" type="error" dense text border="left">
                    У вас недостаточно денег на покупку
                </v-alert>


                <wargear-search @cancel="ArmorSearchDialog = false" type="armor" :repository="wargearList.filter((item) =>
                    ['armor', 'shield'].includes(item.type)
                )" @select="add" />
            </v-col>
        </v-dialog>
    </div>
</template>

<script>

import WargearSearch from '~/components/forge/WargearSearch.vue';
import WargearTrait from '~/mixins/WargearTraitRepositoryMixin';
import WargearMixin from '~/mixins/WargearMixin';
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
    components: {

        WargearSearch,

    },
    mixins: [
        WargearTrait,
        WargearMixin,
        StatRepositoryMixin
    ],
    data() {
        return {
            ArmorSearchDialog: false,
            alertMoney: false,
            headersArmor: [
                { text: 'Название', value: 'name' },
                { text: 'Группа', value: 'group' },
                { text: 'Вес', value: 'bulk' },
                { text: 'Категория', value: 'category' },
                { text: 'Трейты', value: 'traits' },
                { text: 'Экип', value: 'equip', sortable: false },
                { text: 'Просмотр', value: 'view', sortable: false },
                {
                    text: 'Кол-во', value: 'qty', align: 'center',
                    class: 'text-center',
                    width: '150px',
                },
                { text: 'Редактировать', value: 'edit', sortable: false },
                { text: 'Удалить', value: 'delete', sortable: false },
            ]
        }
    },
    props: {
        items: Array,
        headers: Array,
        wargearList: Array,

        isEquipped: Function,

        characterId: {
            type: String,
            required: true
        },
    },
    methods: {
        remove(gear) {
            this.$store.commit('characters/unwearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
            this.$store.commit('characters/removeCharacterWargear', { id: this.characterId, gearId: gear.id });
        },
        armorGroupName(group) {
            return this.armorGroup.find(g => g.group === group)?.name || ''
        },
        category(category) {
            return this.armourCategoryRepository.find(t => t.category === category)?.name || "";
        },
        getMoney() {
            return this.$store.getters['characters/characterMoneyById'](this.characterId);
        },
        incrementQty(gear) {
            this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, qty: gear.qty + 1, gear: gear, notEnc: true });

        },
        decrementQty(gear) {
            this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, qty: gear.qty - 1, gear: gear, notEnc: true });
        },
        add(gear, buy) {

            this.alertMoney = false;
            let gear1;
            if (buy === true) {
                this.alertMoney = false;

                const newWallet = this.payItem(this.getMoney(), gear.price.value);

                if (!newWallet) {
                    this.alertMoney = true; // не хватает
                    return;
                }

                // обновляем кошелёк
                for (const [nominal, value] of Object.entries(newWallet)) {
                    this.$store.commit('characters/setCharacterMoney', {
                        id: this.characterId,
                        nominal,
                        value,
                    });

                    gear1 = { ...gear, damageOrig: gear.damage };


                }
            }
            else {
                gear1 = { ...gear, damageOrig: gear.damage };


            }

            this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: gear.name, source: 'custom', gear: gear1 });
            // Закрываем окна
            // this.WeaponSearchDialog = false;
            this.ArmorSearchDialog = false;
            // this.GearSearchDialog = false;
            // this.ConsumableSearchDialog = false;

        },
        payItem(wallet, price) {
            const rates = { cp: 1, sp: 10, gp: 100, pp: 1000 };

            // переводим всё в меди
            let walletCp = wallet.cp * rates.cp + wallet.sp * rates.sp + wallet.gp * rates.gp + wallet.pp * rates.pp;
            const priceCp = (price.cp || 0) * rates.cp + (price.sp || 0) * rates.sp + (price.gp || 0) * rates.gp + (price.pp || 0) * rates.pp;

            if (walletCp < priceCp) return null; // не хватает денег

            walletCp -= priceCp;

            // пересчитываем в монеты с правильной сдачей
            const newWallet = {};
            newWallet.pp = Math.floor(walletCp / rates.pp);
            walletCp -= newWallet.pp * rates.pp;

            newWallet.gp = Math.floor(walletCp / rates.gp);
            walletCp -= newWallet.gp * rates.gp;

            newWallet.sp = Math.floor(walletCp / rates.sp);
            walletCp -= newWallet.sp * rates.sp;

            newWallet.cp = walletCp;

            return newWallet;
        },
        changeMoney() {
            this.moneyEditorDialog = false;
            this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: this.gp === '' ? this.money : this.gp, nominal: this.labelMoney });
        },

    }
}
</script>