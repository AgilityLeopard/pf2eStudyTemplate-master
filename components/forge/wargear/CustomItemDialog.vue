<template>
    <v-dialog :value="value" max-width="800" @input="$emit('input', $event)">
        <v-card>
            <v-card-title>
                Создание предмета
            </v-card-title>

            <v-card-text v-if="item">
                <v-col v-for="field in commonFields" :key="field.key" cols="6">
                    <FieldRenderer :item="item" :field="field" />
                </v-col>

                <WeaponEditor v-if="item.type === 'weapon'" v-model="item" />

                <ArmorEditor v-else-if="item.type === 'armor'" v-model="item" />

                <ShieldEditor v-else-if="item.type === 'shield'" v-model="item" />

                <ConsumableEditor v-else-if="item.type === 'consumable'" v-model="item" />
            </v-card-text>

            <v-card-actions>
                <v-spacer />

                <v-btn text @click="$emit('input', false)">
                    Отмена
                </v-btn>

                <v-btn color="primary" @click="save">
                    Создать
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: Boolean,
        type: String
    },

    data() {
        return {
            rarities: [
                "common",
                "uncommon",
                "rare",
                "unique"
            ],

            item: null

        };
    },
    mounted() {
        if (this.value && this.type) {
            this.item = this.createItem(this.type);
        }
    },
    watch: {
        value(v) {
            if (v) {
                this.item = this.createItem(this.type);
            }
        }
    },

    methods: {
        createBaseItem(type) {
            return {
                name: "",
                rules: [],
                level: {
                    value: 0,
                },
                sourceKey: "Custom",
                baseItem: null,

                bulk: {
                    value: 0,
                },

                hardness: 0,

                price: {
                    value: {
                        gp: 0,
                    },
                },

                material: {
                    type: null,
                    grade: null,
                },

                usage: null,
                grade: null,
                traits: [],
                group: null,
                bonusDamage: null,
                rarity: "common",
                splashDamage: null,
                damage: null,
                reload: null,
                range: null,
                expend: null,
                description: "",
                category: null,

                key: `custom-${type}-${Date.now()}`,

                hp: {
                    value: 0,
                    max: 0,
                },

                type,

                equipped: {
                    carryType: "worn",
                    invest: null,
                },

                runes: null,
                specific: null,
            };
        },
        createItem(type) {
            switch (type) {
                case "weapon":
                    return this.createWeapon();

                case "armor":
                    return this.createArmor();

                case "shield":
                    return this.createShield();

                case "consumable":
                    return this.createConsumable();

                case "equipment":
                    return this.createEquipment();

                case "treasure":
                    return this.createTreasure();

                default:
                    return this.createEquipment();
            }
        },
        createWeapon() {
            const item = this.createBaseItem("weapon");

            item.usage = {
                value: "held-in-one-hand",
                canBeAmmo: false,
            };

            item.equipped.handsHeld = 0;

            item.damage = {
                dice: 1,
                die: "d6",
                damageType: "slashing",
                persistent: null,
            };

            item.reload = {
                value: "-",
            };

            item.range = null;
            item.expend = null;

            item.bonusDamage = {
                value: 0,
            };

            item.splashDamage = {
                value: 0,
            };

            item.runes = {
                potency: 0,
                striking: 0,
                property: [],
            };

            item.category = "simple";

            return item;
        },
        createArmor() {
            const item = this.createBaseItem("armor");

            item.runes = {
                potency: 0,
                resilient: 0,
                property: [],
            };

            item.acBonus = 0;
            item.strength = 0;
            item.dexCap = 5;
            item.checkPenalty = 0;
            item.speedPenalty = 0;

            return item;
        },
        createShield() {
            const item = this.createBaseItem("shield");

            item.runes = {
                reinforcing: 0,
            };

            item.specific = {
                integrated: null,
                material: null,
                runes: {
                    reinforcing: 0,
                },
                value: false,
            };

            item.acBonus = 2;
            item.speedPenalty = 0;

            item.hp = {
                value: 20,
                max: 20,
            };

            item.hardness = 5;

            return item;
        },
        createConsumable() {
            const item = this.createBaseItem("consumable");

            item.usage = {
                value: "held-in-one-hand",
            };

            return item;
        },
        createEquipment() {
            const item = this.createBaseItem("equipment");

            item.usage = {
                value: "worn",
            };

            return item;
        },
        createTreasure() {
            return createBaseItem("treasure");
        },
        save() {
            this.$emit("save", {
                ...this.item
            });

            this.$emit("input", false);
        }
    }
};
</script>