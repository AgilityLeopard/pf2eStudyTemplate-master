<template lang="html" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-row justify="center">

    <!-- manage current inventory -->
    <v-col :cols="12">
      <v-card
        class="mb-4"
        dark
        dense
        outlined
        :color=" manageWargear ? 'info' : '' "
        @click="manageWargear = !manageWargear"
      >
        <v-card-text class="pa-1">
          <v-icon>{{ manageWargear ? 'expand_less' : 'expand_more' }}</v-icon>
          Управление Оружием ({{characterWeapon.length}})
        </v-card-text>
      </v-card>

      <v-simple-table  v-if="manageWargear && characterWeapon" dense>
          <template v-slot:default>
            <thead>
                <tr>
                  <th v-for="header in headers" :class="header.class">
                    {{ header.text }}
                  </th>
                </tr>
              </thead>
            <tbody>
              <tr  v-for="gear in characterWeapon"
              :key="gear.id">
                <td >{{ gear.nameGear }}</td>
                <td  class="text-center pa-1 small">{{ attackModifier(gear) }}</td>
                <td  class="text-center pa-1 small">{{ damageModifier(gear) }}</td>
                <td >                
                  <v-btn outlined x-small color="info" @click="openWeaponSettings(gear)">
                    <v-icon left>
                      edit
                    </v-icon>Изменить
                  </v-btn>
                </td>
                <td >                
                  <v-btn outlined x-small color="error" @click="remove(gear)">
                    <v-icon left>
                      delete
                    </v-icon>Удалить
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
                <v-card-title style="background-color: #262e37; color: #fff;">
                  Редактирование оружия
                  <v-spacer />
                  <v-icon dark @click="closeWeaponSettings">close</v-icon>
                </v-card-title>

                <v-card-text v-if="Weapon" class="pt-4">

                  <v-select  
                    label="Руны"
                    v-model="Striking"
                    :items="weaponRuneStriking"
                    item-text="name"
                    item-value="key"
                    
                  ></v-select>
                  <!-- <v-text-field v-if="Weapon" v-model="weaponRuneStriking" dense label="Имя Знания">{{ weaponRuneStriking.key }}</v-text-field> -->
                  <!-- <v-textarea v-model="customSkill.description" dense label="Описание"></v-textarea> -->
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer />
                  <v-btn small right color="success" 
                  
                  @click="saveCustomSkill">Save</v-btn>

                </v-card-actions>
              </v-card>
            </v-dialog>

        <v-col :cols="12" v-if="manageWargear && characterWeapon">
      <v-card 
        class="mb-4"
        dark
        outlined
        :color=" wargearSearchActive ? 'info' : '' "
        @click="wargearSearchActive = !wargearSearchActive"
      >
        <v-card-text class="pa-1">
          <v-icon>{{ wargearSearchActive ? 'expand_less' : 'expand_more' }}</v-icon>
          Добавить снаряжение
        </v-card-text>
      </v-card>

      <wargear-search
        v-if="wargearSearchActive && wargearList && manageWargear && characterWeapon"
        :repository="wargearList"
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
    StatRepositoryMixin
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
      weaponEditorDialog: false,
      startingWargearExpand: true,
      wargearSearchActive: false,
      loading: false,
      archetype: undefined,
      wargearList: undefined,
      advancedShoppingChart: [],
      Striking:  "",
      Weapon: undefined,
      runeWeapon:{
        property: 0,
        striking: 'none',
        property: [],
      }  ,  
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
          text: 'Категория', value: 'ap', class: 'text-center', align: 'center',
        },
        {
          text: 'Руки', value: 'salvo', class: 'text-center', align: 'center',
        },
        {
          text: 'Трейты', value: 'traits', class: 'text-left', align: 'left',
        },
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
        'fspg',
        'red1',
        'cos',
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
      data.forEach(item => {
        if(!item.runeWeapon) 
          {
            item.runeWeapon = rune;
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
      return `/img/icon/wargear/${this.textToKebab(type)}.svg`;
    },
    groupLabel(group){
      return this.weaponGroup.find(a => a.group == group) ? this.weaponGroup.find(a => a.group == group).name : "";
    },
    addToBasket(gear) {
      this.advancedShoppingChart.push(gear);
    },
    removeFromBasket(index) {
      console.info(index)
      this.advancedShoppingChart.splice(index, 1);
    },

    attackModifier(gear){
    
      const modAbility = gear.type === 'melee' ? this.characterAttributes["strength"] : this.characterAttributes["dexterity"];
     
       const modProfiency = this.archetype ? this.skillAttack[gear.category] : "U";
         return this.profiencyRepository[modProfiency] + (modAbility - 10) / 2;
    },
    damageModifier(gear){
    
    const modAbility = gear.type === 'melee' ? this.characterAttributes["strength"] : this.characterAttributes["dexterity"];
    const mod = (modAbility - 10) / 2
   
       return gear.damage.toString() + " + " + mod.toString();
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
    add(gear) {
      this.$store.commit('characters/addCharacterWargear', { id: this.characterId, name: gear.name, source: 'custom', gear });
    },
    remove(gear) {
      this.$store.commit('characters/removeCharacterWargear', { id: this.characterId, gearId: gear.id });
    },
    openWeaponSettings(gear){
      this.weaponEditorDialog = true;
      const weapon = this.characterWargearRaw.find(t => t.id === gear.id);
      this.Striking = this.weaponRuneStriking.find(item => weapon.runeWeapon.striking === item.key);
      this.Weapon = gear;
    },
    updateRune(Striking){
      this.Weapon.runeWeapon.striking = Striking;
    },
    closeWeaponSettings() {
      this.weaponEditorDialog = false;
      // this.alert = false;
    },
    saveCustomSkill() {
      this.alert = false;
      const weapon =  this.Striking;
      const runeStriking = this.weaponRuneStriking.find(item => weapon === item.key).addDice;
      const weaponDamage = this.wargearList.find(t => t.key === this.Weapon.key).damage;
      const dice = (parseInt(weaponDamage.slice(0, 1)) + runeStriking) + weaponDamage.slice(1, 4);
      this.$store.commit('characters/updateCharacterWargear', { id: this.characterId, damage: dice, striking: this.Striking, gear: this.Weapon });
      // this.characterWeapon.find(t => t.id === this.Weapon.id).damage = dice;
      this.weaponEditorDialog = false;
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

<style scoped lang="css">
</style>
