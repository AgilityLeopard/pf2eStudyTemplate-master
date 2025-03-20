<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">
    <!-- manage current inventory -->

    <v-col :cols="12">
      <v-btn x-small @click="openMoneySettings(getMoney['pp'], 'pp')">
        Платина: {{ getMoney["pp"] }}
      </v-btn>
      <v-btn x-small @click="openMoneySettings(getMoney['gp'], 'gp')">
        Золото: {{ getMoney["gp"] }}
      </v-btn>
      <v-btn x-small @click="openMoneySettings(getMoney['sp'], 'sp')">
        Серебро: {{ getMoney["sp"] }}
      </v-btn>
      <v-btn x-small @click="openMoneySettings(getMoney['cp'], 'cp')">
        Медь: {{ getMoney["cp"] }}
      </v-btn>
    </v-col>

    <v-alert :value="alertMoney" type="error" text dense border="left">
      У вас недостаточно денег на покупку
    </v-alert>

    <v-col :cols="12">
      <v-card
        class="mb-4"
        dark
        dense
        outlined
        :color="manageWargear ? 'info' : ''"
        @click="manageWargear = !manageWargear"
      >
        <v-card-text class="pa-1">
          <v-icon>{{ manageWargear ? "expand_less" : "expand_more" }}</v-icon>
          Управление Оружием({{ characterWeapon.length }})
        </v-card-text>
      </v-card>

      <v-simple-table v-if="manageWargear && characterWeapon" dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th v-for="header in headers" :class="header.class">
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="gear in characterWeapon" :key="gear.id">
              <td>{{ gear.nameGear }}</td>
              <td class="text-center pa-1 small">
                + {{ attackModifier(gear) }} / {{ attackModifier(gear) - 5 }} /
                {{ attackModifier(gear) - 10 }}
              </td>
              <td class="text-center pa-1 small">{{ damageModifier(gear) }}</td>
              <td>
                <v-btn
                  outlined
                  x-small
                  color="info"
                  @click="openWeaponSettings(gear)"
                >
                  <v-icon left> edit </v-icon>Изменить
                </v-btn>
              </td>
              <td>
                <v-btn outlined x-small color="error" @click="remove(gear)">
                  <v-icon left> delete </v-icon>Удалить
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-col :cols="12" v-if="manageWargear && characterWeapon">
        <v-card
          class="mb-4"
          dark
          outlined
          :color="wargearSearchActive ? 'info' : ''"
          @click="wargearSearchActive = !wargearSearchActive"
        >
          <v-card-text class="pa-1">
            <v-icon>{{
              wargearSearchActive ? "expand_less" : "expand_more"
            }}</v-icon>
            Добавить оружие
          </v-card-text>
        </v-card>

        <wargear-search
          v-if="
            wargearSearchActive &&
            wargearList &&
            manageWargear &&
            characterWeapon
          "
          :repository="
            wargearList.filter((item) =>
              weaponCategoryRepository
                .map((t) => t.category)
                .includes(item.category)
            )
          "
          @select="add"
        />
      </v-col>

      <!-- Доспехи -->
      <v-card
        class="mb-4"
        dark
        dense
        outlined
        :color="manageArmour ? 'info' : ''"
        @click="manageArmour = !manageArmour"
      >
        <v-card-text class="pa-1">
          <v-icon>{{ manageArmour ? "expand_less" : "expand_more" }}</v-icon>
          Управление Доспехами({{ characterArmour.length }})
        </v-card-text>
      </v-card>

      <v-simple-table v-if="manageArmour && characterArmour" dense>
        <template v-slot:default>
          <thead>
            <tr>
              <th v-for="header in headers" :class="header.class">
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="gear in characterArmour" :key="gear.id">
              <td>{{ gear.nameGear }}</td>
              <!-- <td class="text-center pa-1 small">
                + {{ attackModifier(gear) }} / {{ attackModifier(gear) - 5 }} /
                {{ attackModifier(gear) - 10 }}
              </td> -->
              <!-- <td class="text-center pa-1 small">{{ damageModifier(gear) }}</td> -->
              <!-- <td>
                <v-btn
                  outlined
                  x-small
                  color="info"
                  @click="openWeaponSettings(gear)"
                >
                  <v-icon left> edit </v-icon>Изменить
                </v-btn>
              </td> -->
              <td>
                <v-btn
                  outlined
                  x-small
                  :color="
                    characterWearWargear && characterWearWargear.id === gear.id
                      ? 'info'
                      : 'warning'
                  "
                  @click="
                    characterWearWargear && characterWearWargear.id === gear.id
                      ? unwear(gear)
                      : wear(gear)
                  "
                >
                  <v-icon left> lock </v-icon>

                  <span
                    v-if="
                      characterWearWargear &&
                      characterWearWargear.id === gear.id
                    "
                    >Снять
                  </span>
                  <span v-else>Надеть </span>
                </v-btn>
              </td>
              <td>
                <v-btn
                  outlined
                  x-small
                  color="info"
                  @click="openArmourSettings(gear)"
                >
                  <v-icon left> edit </v-icon>Изменить
                </v-btn>
              </td>
              <td>
                <v-btn outlined x-small color="error" @click="remove(gear)">
                  <v-icon left> delete </v-icon>Удалить
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <v-dialog
        v-model="weaponEditorDialog"
        :value="Weapon"
        width="600px"
        scrollable
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <v-alert :value="alert" type="error" text dense border="left">
            Количество рун больше мощи оружия
          </v-alert>
          <v-card-title style="background-color: #262e37; color: #fff">
            Редактирование оружия
            <v-spacer />
            <v-icon dark @click="closeWeaponSettings">close</v-icon>
          </v-card-title>

          <v-card-text v-if="Weapon" class="pt-4">
            <v-row>
              <!-- <v-sheet class="ma-2 pa-2"> -->

              <v-col cols="6" sm="6">
                <v-select
                  label="Разящая руна"
                  v-model="Striking"
                  :items="weaponRuneStriking"
                  item-text="name"
                  item-value="key"
                ></v-select>
              </v-col>

              <v-col cols="6" sm="6">
                <v-select
                  label="Руна мощи"
                  v-model="Potency"
                  :items="weaponRunePotency"
                  item-text="name"
                  item-value="key"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" sm="12">
                <v-select
                  label="Руны свойств"
                  v-model="Property"
                  :items="WeaponRuneProperty"
                  item-text="name"
                  item-value="key"
                  multiple
                  return-object
                >
                  <template #selection="{ item }">
                    <v-chip
                      color="blue"
                      :close="true"
                      @click:close="Property.pop(item)"
                    >
                      {{ item.name }}
                    </v-chip>
                  </template>
                </v-select>
              </v-col>
              <!-- </v-sheet> -->
            </v-row>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />
            <v-btn small right color="success" @click="saveWeapon">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="armorEditorDialog"
        :value="Armor"
        width="600px"
        scrollable
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <v-alert :value="alert1" type="error" text dense border="left">
            Количество рун больше мощи доспеха
          </v-alert>
          <v-card-title style="background-color: #262e37; color: #fff">
            Редактирование доспеха
            <v-spacer />
            <v-icon dark @click="closeArmourSettings">close</v-icon>
          </v-card-title>

          <v-card-text v-if="Armor" class="pt-4">
            <v-row>
              <!-- <v-sheet class="ma-2 pa-2"> -->

              <v-col cols="6" sm="6">
                <v-select
                  label="Стойкости руна"
                  v-model="Resilent"
                  :items="armourRuneResilent"
                  item-text="name"
                  item-value="key"
                ></v-select>
              </v-col>

              <v-col cols="6" sm="6">
                <v-select
                  label="Руна мощи"
                  v-model="Potency"
                  :items="armourRunePotency"
                  item-text="name"
                  item-value="key"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" sm="12">
                <v-select
                  label="Руны свойств"
                  v-model="Property"
                  :items="ArmorRuneProperty"
                  item-text="name"
                  item-value="key"
                  multiple
                  return-object
                >
                  <template #selection="{ item }">
                    <v-chip
                      color="blue"
                      :close="true"
                      @click:close="Property.pop(item)"
                    >
                      {{ item.name }}
                    </v-chip>
                  </template>
                </v-select>
              </v-col>
              <!-- </v-sheet> -->
            </v-row>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />
            <v-btn small right color="success" @click="saveArmor">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="moneyEditorDialog"
        width="600px"
        scrollable
        :fullscreen="$vuetify.breakpoint.xsOnly"
      >
        <v-card>
          <v-card-title style="background-color: #262e37; color: #fff">
            {{ groupMoney[labelMoney] }}
            <v-spacer />
            <v-icon dark @click="closeMoneySettings">close</v-icon>
          </v-card-title>

          <v-card-text class="pt-4">
            <v-row>
              <v-col cols="6" sm="6">
                <v-text-field
                  label="Установить количество монет"
                  dense
                  required
                  v-model="gp"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6">
                <v-btn small center color="info" @click="changeMoney()"
                  >Установить</v-btn
                >
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6" sm="6">
                <v-text-field
                  label="Прибавить количество монет"
                  dense
                  required
                  v-model="gpAd"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6" sm="6">
                <v-btn small right color="info" @click="adjustMoney()"
                  >Скорректировать</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer />
            <!-- <v-btn small right color="сфт" @click="changeMoney()"
              >Save</v-btn
            > -->
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-col :cols="12" v-if="manageArmour && characterArmour">
        <v-card
          class="mb-4"
          dark
          outlined
          :color="armourSearchActive ? 'info' : ''"
          @click="armourSearchActive = !armourSearchActive"
        >
          <v-card-text class="pa-1">
            <v-icon>{{
              armourSearchActive ? "expand_less" : "expand_more"
            }}</v-icon>
            Добавить доспех
          </v-card-text>
        </v-card>

        <wargear-search
          v-if="armourSearchActive"
          :repository="
            wargearList.filter((item) =>
              armourCategoryRepository
                .map((t) => t.category)
                .includes(item.category)
            )
          "
          @select="add"
        />
      </v-col>
    </v-col>
  </v-row>
</template>

<script lang="js">
import WargearSearch from '~/components/forge/WargearSearch.vue';
import WargearSelect from '~/components/forge/WargearSelect.vue';
import CharacterCreationMixin from '~/mixins/CharacterCreationMixin';
import SluggerMixin from '~/mixins/SluggerMixin';
import WargearMixin from '~/mixins/WargearMixin';
import WargearTrait from '~/mixins/WargearTraitRepositoryMixin';
import StatRepositoryMixin from '~/mixins/StatRepositoryMixin';
import RulesMixin from '~/mixins/RulesCombatActionsMixin';

export default {
  name: 'Wargear',
  layout: 'forge',
  components: {
    WargearSelect,
    WargearSearch,
  },
  mixins: [
    CharacterCreationMixin,
    SluggerMixin,
    WargearMixin,
    WargearTrait,
    StatRepositoryMixin,
    RulesMixin
  ],
  props: [],
  head() {
    return {
      title: 'Select Wargear',
    };
  },
  asyncData({ params }) {
    return {
      characterId: params.id,
    };
  },
  data() {
    return {
      manageWargear: true,
      manageArmour: true,
      weaponEditorDialog: false,
      moneyEditorDialog:false,
      armorEditorDialog: false,
      startingWargearExpand: true,
      wargearSearchActive: false,
      armourSearchActive: false,
      loading: false,
      alert: false,
      alertMoney: false,
      alert1: false,
      archetype: undefined,
      wargearList: undefined,
      armourList: undefined,
      advancedShoppingChart: [],
      groupMoney: {
        pp: "Платина",
        gp: "Золото",
        sp: "Серебро",
        cp: "Медь",
      },
      Striking: "none",
      Resilent: "none",
      Potency:  "none",
      Property: [],
      gp: undefined,
      gpAd: undefined,
      labelMoney: undefined,
      Weapon: undefined,
      money: undefined,
      Armor: undefined,
      runeWeapon:{
        potency: 'none',
        striking: 'none',
        property: [],
      },
      runeArmor:{
        potency: 'none',
        resilent: 'none',
        property: [],
      } ,
      headers: [
        {
          text: 'Название', value: 'name', class: 'text-left', align: 'left',
        },
        {
          text: 'Попадание', value: 'range', class: 'text-center', align: 'center',
        },
        {
          text: 'Урон', value: 'damage', class: 'text-center', align: 'center',
        },
        {
          text: '', value: 'ap', class: 'text-center', align: 'center',
        },
        {
          text: '', value: 'salvo', class: 'text-center', align: 'center',
        },
        // {
        //   text: 'Трейты', value: 'traits', class: 'text-left', align: 'left',
        // },
      ],
    };
  },
  computed: {
    showAdvancedStartingWargearSection() {
      return this.characterArchetypeKey === 'advanced';
    },
    showArchetypeStartingWargearSection() {
      return this.characterArchetypeKey !== 'advanced' && this.startingWargear && this.startingWargear.length > 0;
    },
    // total: 20, max: 9, maxRarity: 'Rare', maxRarityItems: 2,
    advancedWargearRestrictions() {
      return this.getAdvancedWargearOptionByTier(this.characterArchetypeTier);
    },
    advancedWargearSpend() {
      let spend = 0;
      this.advancedShoppingChart.forEach((gear) => {
        spend += parseInt(gear.value);
      });
      return spend;
    },
    // advancedWargearByRarity() {
    //   const rarityCount = {
    //     uncommon: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Uncommon').length,
    //     common: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Common').length,
    //     rare: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Rare').length,
    //     veryRare: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Very Rare').length,
    //     unique: this.advancedShoppingChart.filter((gear) => gear.rarity === 'Unique').length,
    //   };
    //   return rarityCount;
    // },
    advancedWargearViolations() {
      const alerts = [];
      const restrictions = this.advancedWargearRestrictions;
      if (restrictions) {
        // max total spend
        if ( this.advancedWargearSpend > restrictions.total ) {
          alerts.push(`You spend ${this.advancedWargearSpend} of your allowed ${restrictions.total} points.`);
        }
        // max per item spend
        const violating = this.advancedShoppingChart.filter((gear) => gear.value > restrictions.max);
        if ( violating.length > 0 ) {
          alerts.push(`${violating.length} item|s cost more than ${restrictions.max}`);
        }
        // within rarity of items
        if ( restrictions.rarity && restrictions.rarity.rare > restrictions.rarity.rare ) {
          alerts.push(`You selected ${this.advancedWargearByRarity.rare} Rare items, but are only allowed ${restrictions.rarity.rare}`);
        }
        if ( restrictions.rarity && this.advancedWargearByRarity.veryRare > restrictions.rarity.veryRare ) {
          alerts.push(`You selected ${this.advancedWargearByRarity.veryRare} Very Rare items, but are only allowed ${restrictions.rarity.veryRare}`);
        }
        if ( restrictions.rarity && this.advancedWargearByRarity.unique > restrictions.rarity.unique ) {
          alerts.push(`You selected ${this.advancedWargearByRarity.unique} Unique items, but are only allowed ${restrictions.rarity.unique}`);
        }
        //this.advancedShoppingChart.
      }
      return alerts;
    },
    sources() {
      return [
        'playerCore',
        // 'tnh',
        ...this.settingHomebrews
      ];
    },
    settingHomebrews() {
      return this.$store.getters['characters/characterSettingHomebrewsById'](this.characterId);
    },
    settingTier() {
      return this.$store.getters['characters/characterSettingTierById'](this.characterId);
    },
    characterArchetypeKey() {
      return this.$store.getters['characters/characterArchetypeKeyById'](this.characterId);
    },
    characterArchetypeLabel() {
      return this.$store.getters['characters/characterArchetypeLabelById'](this.characterId);
    },
    characterArchetypeTier() {
      return this.$store.getters['characters/characterArchetypeTierById'](this.characterId);
    },
    characterWargearRaw() {
      return this.$store.getters['characters/characterWargearById'](this.characterId);
    },
    skillAttack() {
      return this.$store.getters['characters/characterskillAttackById'](this.characterId);
    },
    skillDefence() {
      return this.$store.getters['characters/characterskillDefenceById'](this.characterId);
    },
    startingWargear() {
      if ( this.archetype ) {
        return this.archetype.wargear;
      }
      return [];
    },
    characterAttributes() {
      return this.$store.getters['characters/characterAttributesById'](this.characterId);
    },
    getMoney() {
      return this.$store.getters['characters/characterMoneyById'](this.characterId);
    },
    characterWearWargear() {
      return this.$store.getters['characters/characterWearById'](this.characterId);
    },

    characterWargear() {
      const characterWargear = [];

      if (this.wargearList){
        const Category = this.weaponCategoryRepository.map(item => item.category);
        this.characterWargearRaw.filter(item => Category.includes(item.category)).forEach((chargear) => {
          // this.characterWargearRaw.forEach((chargear) => {
          let gear = {};
          gear = this.wargearList.find((wargear) => chargear.name.localeCompare(wargear.name, 'en' , {sensitivity: 'accent'}) === 0);
          if (gear) {
            gear.id = chargear.id;
            gear.source = chargear.source;
            characterWargear.push({
              id: chargear.id,
              name: gear.nameGear,
              damage: gear.damage,
              group: this.groupLabel(gear.group),
              subtitle: this.wargearSubtitle(gear),
              type: gear.type,
              avatar: this.getAvatar(gear.type),
              source: chargear.source,
            });
          } else {
            characterWargear.push({
              id: chargear.id,
              name: chargear.name,
              type: 'Misc',
              subtitle: 'Misc',
              avatar: this.getAvatar('Misc'),
              source: chargear.source,
            });
          }
        });
      }
      return characterWargear;
    },
    characterWeapon() {
      const characterWargear = [];

      if (this.wargearList){
        const Category = this.weaponCategoryRepository.map(item => item.category);
        this.characterWargearRaw.filter(item => Category.includes(item.category)).forEach((chargear) => {
          // this.characterWargearRaw.forEach((chargear) => {
          let gear = {};
          gear = this.wargearList.find((wargear) => chargear.name.localeCompare(wargear.name, 'en' , {sensitivity: 'accent'}) === 0);
          if (gear) {
            gear.id = chargear.id;
            gear.source = chargear.source;
            characterWargear.push({
              id: chargear.id,
              // name: gear.nameGear,
              // source: chargear.source,
              ...chargear,
              // subtitle: this.wargearSubtitle(gear),
              // avatar: this.getAvatar(gear.type),

            });
          } else {
            characterWargear.push({
              id: chargear.id,
              name: chargear.name,
              type: 'Misc',
              subtitle: 'Misc',
              avatar: this.getAvatar('Misc'),
              source: chargear.source,
            });
          }
        });
      }
      return characterWargear;
    },
    characterArmour() {
      const characterWargear = [];

      if (this.wargearList){
        const Category = this.armourCategoryRepository.map(item => item.category);
        this.characterWargearRaw.filter(item => Category.includes(item.category)).forEach((chargear) => {
          // this.characterWargearRaw.forEach((chargear) => {
          let gear = {};
          gear = this.wargearList.find((wargear) => chargear.name.localeCompare(wargear.name, 'en' , {sensitivity: 'accent'}) === 0);
          if (gear) {
            gear.id = chargear.id;
            gear.source = chargear.source;
            characterWargear.push({
              id: chargear.id,
              // name: gear.nameGear,
              // source: chargear.source,
              ...chargear,
              // subtitle: this.wargearSubtitle(gear),
              // avatar: this.getAvatar(gear.type),

            });
          } else {
            characterWargear.push({
              id: chargear.id,
              name: chargear.name,
              type: 'Misc',
              subtitle: 'Misc',
              avatar: this.getAvatar('Misc'),
              source: chargear.source,
            });
          }
        });
      }
      return characterWargear;
    }
  },
  watch: {
    characterArchetypeKey: {
      handler(newVal) {
        if (newVal) {
          this.getArchetype(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
    sources: {
      handler(newVal) {
        if (newVal) {
          this.getWargearList(newVal);
        }
      },
      immediate: true, // make this watch function is called when component created
    },
  },
  methods: {
    async getArchetype(key) {
      this.loading = true;
      const { data } = await this.$axios.get(`/api/archetypes/${key}`);
      this.loading = false;
      this.archetype = data;
    },
    async getWargearList(sources) {
      const config = {
        params: {
          source: sources.join(','),
        },
      };
      const { data } = await this.$axios.get('/api/wargear/', config);
      const rune = this.runeWeapon;
      const rune1 = this.runeArmor;

      const wr = this.weaponCategoryRepository;
      const ar = this.armourCategoryRepository;
      data.forEach(item => {
        if(!item.runeWeapon && wr.find(t => t.category === item.category))
          {
            item.runeWeapon = rune;
          }

          if(!item.runeArmor && ar.find(t => t.category === item.category))
          {
            item.runeArmor = rune1;
          }
      });
      this.wargearList = data.filter((i) => i.stub === undefined || i.stub === false);
    },
    wargearSubtitle(item) {
      // const item = this.wargearRepository.find(i => i.name === gear);
      if (item) {
        const tags = [item.type];
        if (item.subtype) {
          tags.push(item.subtype);
        }
        return tags.filter((t) => t !== undefined).join(' • ');
      }
      return '';
    },
    getAvatar(type) {
      return `/img/icon/wargear/${this.textToKebab(type).toLowerCase()}.svg`;
    },
    groupLabel(group){
      return this.weaponGroup.find(a => a.group == group) ? this.weaponGroup.find(a => a.group == group).name : "";
    },
    addToBasket(gear) {
      this.advancedShoppingChart.push(gear);
    },
    removeFromBasket(index) {
      this.advancedShoppingChart.splice(index, 1);
    },

    attackModifier(gear) {
      //Если есть группа оружия у класса
      const enc = this.$store.getters['characters/characterEnhancementsById'](this.characterId).filter(s => s.level <= this.characterLevel());
      const group = enc.find(s => s.type === "Weapon Group") ? enc.find(s => s.type === "Weapon Group") : "";
      const groupLegend = enc.find(s => s.type === "Weapon Group Legend") ? enc.find(s => s.type === "Weapon Group Legend") : "";

      //Прибавка аттрибута
      const modAbility = gear.type === 'melee' ? this.characterAttributes["strength"] : this.characterAttributes["dexterity"];

      const category = enc.find(item => item.type === 'Weapon' && item.mode === 'Upgrade' && (item.key === gear.name));
      const trait = enc.find(item => item.type === 'Weapon' && item.mode === 'Upgrade' && (gear.traits.includes(item.key)));

      let categoryItem = "";
      if (category)
        categoryItem = category ? category.value : gear.category;
      if (trait)
        categoryItem = gear.category === "advanced" ? "martial" : "simple";

      categoryItem = categoryItem === "" ? gear.category : categoryItem;

      let modProfiency = "";

      //Группы Оружия и их разбивка
      if (groupLegend !== "") {
        //Смотрим проф у класса, если нет особенности с группой -- для воина
        modProfiency = groupLegend !== "" && groupLegend.selected === gear.group ? groupLegend.value[categoryItem] : this.skillAttack[categoryItem]
      }
      if (group !== "") {
        //Смотрим проф у класса, если нет особенности с группой -- для воина
        modProfiency = group !== "" && group.selected === gear.group ? group.value[categoryItem] : this.skillAttack[categoryItem];
      }

        if(modProfiency === "")
          modProfiency = this.skillAttack[categoryItem];

        //руны
        const rune = this.weaponRunePotency.find(t => t.key === gear.runeWeapon.potency).addItemBonus

        /////Бонусы, если есть
        let modLevel = modProfiency !== "U" ? this.characterLevel() : 0;

        const modProf = modLevel;
        const Bonus = this.$store.getters["characters/characterBonusById"](
        this.characterId
        );

        if (Bonus) {
        Bonus.filter(
          (s) =>
            s.level <= this.characterLevel() &&
            s.type === "Weapon" &&
            s.mode === "Bonus" &&
            (s.key === "all" || s.key === gear.group)
        ).forEach((s) => {

          modLevel = modProfiency === "U" ? this.characterLevel() : modProf;
        });
      }


        return this.profiencyRepository[modProfiency] + (modAbility - 10) / 2 + modLevel + rune;
    },
    damageModifier(gear){

    const modAbility = gear.type === 'melee' ? this.characterAttributes["strength"] : this.characterAttributes["dexterity"];
      const mod = (modAbility - 10) / 2;
      const enc = this.$store.getters['characters/characterEnhancementsById'](this.characterId).filter(s => s.level <= this.characterLevel());
      const spec = enc.find(s => s.type === "Weapon Specialization") ? enc.find(s => s.type === "Weapon Specialization") : "";
      const damSpec = spec !== "" ? spec.bonusDamage[this.skillAttack[gear.category]] : 0;

       return gear.damage.toString() + " + " + mod.toString() + " + " + damSpec.toString();
  },
    addWargearToCharacter(wargearOptions, source) {
      const finalWargear = [];

      wargearOptions.forEach((i) => {
        if (i.options) {
          if (i.selected) {
            if (i.selected.indexOf(' and ') > 0) {
              i.selected.split(' and ').forEach((o) => {
                finalWargear.push({name:o});
              });
            } else {
              finalWargear.push({name: i.selected});
            }
          }
        } else {
          finalWargear.push({name: i.name, variant: i.variant});
        }
      });



      finalWargear.forEach((w) => {
        this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: w.name, variant: w.variant, source, group: w.group, category: w.category });
      });

      this.advancedShoppingChart.length = 0;
    },
    characterLevel(){
      return this.$store.getters['characters/characterLevelById'](this.characterId);
    },
    add(gear, buy) {
      let cp = 0, sp= 0, gp= 0, pp = this.getMoney["pp"];
      this.alertMoney = false;
      if (buy === true)
      {
        // const Charmoney = this.getMoney['cp'] + this.getMoney['sp'] * 10 + this.getMoney['gp'] * 100 + this.getMoney['pp'] * 1000;
        // const price = gear.cp + gear.sp * 10 + gear.gp * 100 + gear.pp * 1000;

        if(gear.cp !== 0)
        {
          const Charmoney = this.getMoney["cp"];
          const price = gear.cp;
          cp = Charmoney - price;
        }
        if(gear.sp !== 0)
        {
          const Charmoney = this.getMoney["sp"];
          const price = gear.sp;
          sp = Charmoney - price;
        }

        if(gear.gp !== 0)
        {
          const Charmoney = this.getMoney["gp"];
          const price = gear.gp;
          gp = Charmoney - price;
        }

        if(gear.pp !== 0)
        {
          const Charmoney = this.getMoney["pp"];
          const price = gear.pp;
          pp = Charmoney - price;
        }

        //как только все вычлось, смотрим и избавляемся от минусовых значений
        if (cp < 0)
        {
          const diff = Math.abs(cp / 10) ;
          cp = cp + Math.ceil(diff) * 10;
          sp = sp  - Math.ceil(diff)
        }

        if (sp < 0)
        {
          const diff = Math.abs(sp / 10);
          sp = sp + Math.ceil(diff) * 10;
          gp = gp  - Math.ceil(diff)
        }

        if (gp < 0)
        {
          const diff = Math.abs(gp / 10);
          gp = gp + Math.ceil(diff) * 10;
          pp = pp  - Math.ceil(diff)
        }

        if (pp < 0) this.alertMoney= true;

      }

      if ((buy === true && pp >=0) || buy !== true)
      {
        if (buy === true)
        {
          this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: pp, nominal: "pp" });
          this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: gp, nominal: "gp" });
          this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: sp, nominal: "sp" });
          this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: cp, nominal: "cp" });
      }


      // const category = this.enhancements().find(item => item.type === 'Weapon' && item.mode === 'Upgrade' && (item.key === gear.name));
      // const trait = this.enhancements().find(item => item.type === 'Weapon' && item.mode === 'Upgrade' && (gear.traits.includes(item.key)));

      // gear = {
      //   ...gear,
      //   categoryOld: gear.category

      // };
      // if (category)
      //   gear.category = category ? category.value : gear.category;
      // if (trait)
      //   gear.category = gear.category === "advanced" ? "martial" : "simple";

         this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: gear.name, source: 'custom', gear });
      }


    },
    remove(gear) {
      this.$store.commit('characters/unwearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
      this.$store.commit('characters/removeCharacterWargear', { id: this.characterId, gearId: gear.id });
    },
    wear(gear) {
      this.$store.commit('characters/wearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
    },
    changeMoney() {
       this.moneyEditorDialog = false;
       this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: this.gp === '' ? this.money :  this.gp, nominal: this.labelMoney });
    },
    adjustMoney() {
      this.moneyEditorDialog = false;

      const adj = this.gpAd === undefined ? this.gp : parseInt(this.gp) + parseInt(this.gpAd);
      this.gpAd = undefined;
       this.$store.commit('characters/setCharacterMoney', { id: this.characterId, value: adj, nominal: this.labelMoney });
    },
    unwear(gear) {
      this.$store.commit('characters/unwearCharacterWargear', { id: this.characterId, gearId: gear.id, gear: gear });
    },
    enhancements() {
      return this.$store.getters['characters/characterEnhancementsById'](this.characterId);
    },
    openWeaponSettings(gear){
      this.weaponEditorDialog = true;
      const weapon = this.characterWargearRaw.find(t => t.id === gear.id);
      this.Striking = this.weaponRuneStriking.find(item => weapon.runeWeapon.striking === item.key).key;
      this.Potency = this.weaponRunePotency.find(item => weapon.runeWeapon.potency === item.key).key;
      const PropertyMap = weapon.runeWeapon.property.map(item => item.key)
      this.Property = this.WeaponRuneProperty.filter(item => PropertyMap.includes(item.key))//.map(item => item.key);
      this.Weapon = gear;
    },
    openMoneySettings(value, nominal){
      this.moneyEditorDialog = true;
      this.labelMoney = nominal;
      this.money = value;
      this.gp = value;
    },
    openArmourSettings(gear){
      this.armorEditorDialog = true;
      const armor = this.characterWargearRaw.find(t => t.id === gear.id);
      this.Resilent = this.armourRuneResilent.find(item => armor.runeArmor.resilent === item.key).key;
      this.Potency = this.armourRunePotency.find(item => armor.runeArmor.potency === item.key).key;
      const PropertyMap = armor.runeArmor.property.map(item => item.key)
      this.Property = this.ArmorRuneProperty.filter(item => PropertyMap.includes(item.key))//.map(item => item.key);
      this.Armor = gear;
    },
    closeWeaponSettings() {
      this.weaponEditorDialog = false;
      // this.alert = false;
    },
    closeArmourSettings() {
      this.armorEditorDialog = false;
      // this.alert = false;
    },
    closeMoneySettings() {
      this.moneyEditorDialog = false;
      // this.alert = false;
    },
    PotencyCap(potency){

      const mod = this.weaponRunePotency.find(item => potency === item.key).addItemBonus;
      return mod;
    },
    saveWeapon() {
      this.alert = false;
      const weapon =  this.Striking;
      const runeStriking = this.weaponRuneStriking.find(item => weapon === item.key).addDice;
      const PropertyMap = this.Property.map(item => item.key);
      const Property =  this.WeaponRuneProperty.filter(item => PropertyMap.includes(item.key));
      const weaponDamage = this.wargearList.find(t => t.key === this.Weapon.key).damage;
      const dice = (parseInt(weaponDamage.slice(0, 1)) + runeStriking) + weaponDamage.slice(1, 4);
      if ( this.PotencyCap(this.Potency) < this.Property.length) {
        this.alert = true;
        // console.warn(`Skill ${skill.name} already exists.`);
      }
      else{
        this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, damage: dice, property: Property, striking: this.Striking, potency: this.Potency, gear: this.Weapon });
        // this.characterWeapon.find(t => t.id === this.Weapon.id).damage = dice;
        this.weaponEditorDialog = false;
      }
  },
    saveArmor() {
      this.alert = false;
      const armor =  this.Resilent;
      const runeStriking = this.armourRuneResilent.find(item => weapon === item.key).addDice;
      const PropertyMap = this.Property.map(item => item.key);
      const Property =  this.ArmorRuneProperty.filter(item => PropertyMap.includes(item.key));

      // if ( this.PotencyCap(this.Potency) < this.Property.length) {
      //   this.alert = true;
      //   // console.warn(`Skill ${skill.name} already exists.`);
      // }
      // else{
      //   this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, damage: dice, property: Property, striking: this.Striking, potency: this.Potency, gear: this.Weapon });
      //   // this.characterWeapon.find(t => t.id === this.Weapon.id).damage = dice;
      //   this.weaponEditorDialog = false;
      // }
    },
    /**
     * {
        filter: true,
        valueFilter: { useCharacterTier: false, useSettingTier: true, fixedValue: 4 },
        rarityFilter: ['Uncommon', 'Common', 'Rare'],
        typeFilter: 'Ranged Weapon',
        subtypeFilter: 'Augmetics',
        keywordFilter: 'Imperium',
     * },
     * @param filter
     */
    /*
       item.value <= (this.settingTier + 4)
    && ['Uncommon', 'Common', 'Rare'].includes(item.rarity)
    && item.type.includes('Ranged Weapon')
    const keywordReq = (item.keywords) ? item.keywords.split(',').includes('Imperium') : false;
     */
    computeWargearOptionsByFilter(filter) {
      return this.wargearList ? this.filterWargear(this.wargearList, filter, this.settingTier) : [];
    },
  },
};
</script>

<style scoped lang="css"></style>
