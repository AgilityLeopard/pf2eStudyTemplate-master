<template>
    <div>

        <v-btn class="ui-btn ui-btn--success mt-2" block @click="GearSearchDialog = true">

            Добавить снаряжение
        </v-btn>

        <v-data-table :headers="headersGear" :items="items" :search="searchQuery"
            class="gear-section-table fixed-columns-table" hide-default-footer item-key="id">
            <template v-slot:no-data> Нет предметов </template>

            <template v-slot:item.nameGear="{ item }">
                <!-- <v-row> -->
                <span>{{ item.name }}</span>
                <!-- </v-row>
                <v-row>
                  <div>
                    <trait-view v-if="item.traits" :item="item" class="mb-2" />
                  </div>
                </v-row> -->
            </template>

            <template v-slot:item.qty="{ item }">
                <span>
                    <v-btn icon :disabled="item.qty === 1" @click="decrementQty(item)">
                        <v-icon color="red"> remove_circle </v-icon>
                    </v-btn>
                    {{ item.qty }}
                    <v-btn icon @click="incrementQty(item)">
                        <!--"-->
                        <v-icon color="orange"> add_circle </v-icon>
                    </v-btn>
                </span>
            </template>

            <template v-slot:item.edit="{ item }">
                <v-btn outlined x-small color="error" @click="remove(item)">
                    <v-icon left> delete </v-icon>
                </v-btn>
            </template>

            <!-- view -->
            <template v-slot:item.view="{ item }">
                <v-btn outlined x-small color="info" @click="$emit('view', item)">
                    <v-icon left>visibility</v-icon> Просмотр
                </v-btn>
            </template>


        </v-data-table>


        <v-dialog v-model="GearSearchDialog" :fullscreen="$vuetify.breakpoint.xsOnly" width="1400px" scrollable>
            <v-col :cols="12" v-if="wargearList">
                <v-alert v-if="alertMoney" type="error" dense text border="left">
                    У вас недостаточно денег на покупку
                </v-alert>


                <wargear-search @cancel="GearSearchDialog = false" type="other" :repository="wargearList.filter(
                    (item) =>
                        ['consumable'].includes(
                            item.type
                        )
                )
                    " @select="add" />
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
            GearSearchDialog: false,
            alertMoney: false,
            headersGear: [
                {
                    text: 'Название',
                    value: 'nameGear',
                    align: 'left',
                    class: 'text-left',
                    width: '250px',
                },
                {
                    text: 'Количество',
                    value: 'qty',
                    align: 'center',
                    class: 'text-center',
                    width: '150px',
                },
                {
                    text: '',
                    value: 'edit',
                    align: 'center',
                    class: 'text-center',
                    width: '60px',
                },
                { text: 'Просмотр', value: 'view', sortable: false },
                {
                    text: '',
                    value: 'delete',
                    align: 'center',
                    class: 'text-center',
                    width: '60px',
                },
                { text: '', value: 'data-table-expand', width: '50px' }
            ],
        }
    },
    props: {
        items: Array,
        headers: Array,
        wargearList: Array,



        characterId: {
            type: String,
            required: true
        },
    },
    computed: {
        groupedGear() {
            const groups = {};
            this.items.forEach(item => {
                const type = item.usage.value || "Прочее";
                if (!groups[type]) groups[type] = [];
                groups[type].push(item);
            });
            return Object.entries(groups).map(([type, items]) => ({
                header: type,
                items
            }));
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
            this.GearSearchDialog = false;
            //this.ArmorSearchDialog = false;
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


        Worn(item) {
            return this.WornGear[item] ? this.WornGear[item] : 'Прочее'
        },

    }
}
</script>