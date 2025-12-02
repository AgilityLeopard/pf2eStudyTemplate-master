<template>
  <div class="expanded-item-wrapper">
    <div class="expanded-content">
      <!-- <div class="gear-header">
        <div class="gear-title">
          {{ item.name }}
        </div>

        <div class="gear-level">Предмет {{ item.level?.value || "0" }}</div>
      </div> -->
      <div class="gear-header">
        <!-- <div class="gear-thumb">
      <img :src="item.thumbnail" :alt="item.nameGear" />
    </div> -->
        <div class="gear-info">
          <span class="gear-name">{{ item.name }}</span>
          <span class="gear-line"></span>
          <span class="gear-tag">
            <span v-if="['feat'].includes(item.type)">
              {{ `Черта ${item.system.level?.value || "-"}` }}
            </span>
            <span v-if="['weapon'].includes(item.type)">
              {{ `Оружие ${item.level?.value || "-"}` }}
            </span>
            <span v-if="['armor'].includes(item.type)">
              {{ `Доспех ${item.level?.value || "-"}` }}
            </span>
            <span v-if="['shield'].includes(item.type)">
              {{ `Щит ${item.level?.value || "-"}` }}
            </span>
            <span v-if="['spell'].includes(item.type)">
              {{ `Заклинание ${item.levelRank || "-"}` }}
            </span>
            <span v-if="['ritual'].includes(item.type)">
              {{ `Ритуал ${item.levelRank || "-"}` }}
            </span>
            <span v-if="!['ritual', 'spell', 'shield', 'armor', 'weapon', 'feat'].includes(item.type)">
              {{ `Предмет ${item.level?.value || "-"}` }}
            </span>
          </span>
        </div>
      </div>

      <div>
        <trait-view v-if="item.traits" :item="item" class="mb-2" />
      </div>

      <div class="gear-divider"></div>

      <div class="line"></div>
      <div v-if="item.type !== 'feat'">
        <div v-if="item.bulk" class="info-line">
          <!--Общее для предметов  -->
          <span v-if="item.bulk">
            <strong>Нагрузка:</strong>
            {{ item.bulk.value === 0.1 ? "Л" : item.bulk.value }}</span>
        </div>

        <div v-if="item.price" class="info-line">
          <strong>Цена:</strong> {{ wargearPrice(item) }}
        </div>

        <div class="line"></div>

        <!-- Если оружие/доспехи -->
        <div v-if="item.type === 'weapon'">
          <div v-if="item.damageOrig" class="info-line">
            <strong>Урон:</strong> {{ item.damageOrig.die }}
            {{
              typeDamage(item.damageOrig.damageType).slice(0, 1).toUpperCase()
            }}
          </div>

          <div v-else-if="item.damage" class="info-line">
            <strong>Урон:</strong> {{ item.damage.die }}
            {{
              typeDamage(item.damage.damageType).slice(0, 1).toUpperCase()
            }}
          </div>

          <div v-if="item.usage" class="info-line">
            <strong>Руки:</strong> {{ Worn(item.usage.value) }}
          </div>

          <div v-if="item.group" class="info-line">
            <strong>Группа:</strong> {{ groupName(item.group) }}
          </div>

          <div v-if="item.category" class="info-line">
            <strong>Категория:</strong> {{ category(item.category) }}
          </div>
        </div>

        <!-- Для доспехов -->
        <div v-if="item.type === 'armor'">
          <div v-if="item.acBonus" class="info-line">
            <strong> Бонус КД:</strong> {{ item.acBonus }}
          </div>

          <div v-if="item.dexCap" class="info-line">
            <strong> Макс. Лвк:</strong> {{ item.dexCap }}
          </div>

          <div v-if="item.checkPenalty" class="info-line">
            <strong> Штраф к навыкам:</strong> {{ item.checkPenalty }}
          </div>

          <div v-if="item.speedPenalty" class="info-line">
            <strong> Штраф к скорости:</strong> {{ item.speedPenalty }}
          </div>

          <div v-if="item.strength" class="info-line">
            <strong>Сила:</strong> {{ item.strength }}
          </div>

          <div v-if="item.group" class="info-line">
            <strong>Группа:</strong> {{ groupArmorName(item.group) }}
          </div>

          <div v-if="item.category" class="info-line">
            <strong>Категория:</strong> {{ categoryArmor(item.category) }}
          </div>
        </div>

        <div v-if="item.type === 'spell'">
          <div v-if="item.range">
            <p class="info-line">
              <strong>Дистанция:</strong> {{ item.range }}
            </p>
          </div>

          <div v-if="item.area">
            <p class="info-line">
              <strong>Область:</strong> {{ item?.area?.value }}-фут.
              {{ areaRepository[item?.area?.type] }}
            </p>
          </div>


          <div v-if="item.target">
            <p class="info-line" v-if="item.target">
              <strong>Цель:</strong> {{ item.target }}
            </p>
          </div>

          <div v-if="item.cost">
            <p class="info-line" v-if="item.cost.value">
              <strong>Стоимость:</strong>
              {{ item.cost.value }}
            </p>
          </div>

          <div v-if="item.duration">
            <p class="info-line" v-if="item.duration.value">
              <strong>Длительность:</strong>
              <span v-if="seleitemctedItem.duration.sustained === true">Поддерживаемое до
              </span>
              {{ item.duration.value }}
            </p>
          </div>

          <div v-if="item?.time">
            <strong>Действия:</strong>
            <span v-if="item?.time?.value === '1 to 3'" class="info-line">
              От <img :src="iconAction('1')" :class="{ 'invert-icon': !$vuetify.theme.dark }" /> до <img
                :src="iconAction('3')" :class="{ 'invert-icon': !$vuetify.theme.dark }" />
            </span>
            <span v-else class="info-line">
              <img :src="iconAction(item?.time?.value)" :class="{ 'invert-icon': !$vuetify.theme.dark }" />
            </span>
          </div>

          <div v-if="item.defense">
            <p class="info-line" v-if="item.defense.save">
              <strong>Защита:</strong>

              <span v-if="item?.defense?.save">
                <span v-if="item?.defense?.save?.basic">Базовый </span>
                {{
                  SavingRepository.find(
                    (t) => t.key === item?.defense?.save?.statistic
                  ).name
                }}
              </span>

              <span v-if="item?.traits?.includes('атака')">
                <span>КБ </span>
              </span>
            </p>
          </div>

          <div class="line"></div>
          <!-- Обычное описание предмета -->
          <div class="pt-4 pb-2 description" v-if="item.description" v-html="item.description"></div>
        </div>
      </div>
      <!-- <div class="line"></div> -->
      <div v-if="item.type === 'feat'">
        <div v-if="item.prerequisites" class="info-line">
          <strong>Требования:</strong>
          {{Object.values(item.prerequisites).map(p => p.value).join(', ')}}
        </div>


      </div>


      <!-- <div class="pt-4 pb-2 power-description" v-if="item.powerDescription" v-html="item.powerDescription"></div> -->
      <div class="pt-4 pb-2 description" v-if="item.description" v-html="item.description"></div>

      <div v-if="item.source" class="gear-footer">
        <div class="gear-source">{{ item.source.book }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import traitView from "~/components/TraitView";
import WargearTraitRepositoryMixin from "~/mixins/WargearTraitRepositoryMixin";
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  name: "CardItem",
  components: {
    traitView,
  },
  mixins: [WargearTraitRepositoryMixin, StatRepositoryMixin],
  props: {
    item: {
      type: Object,
      required: true,
    },
    wargearPrice: {
      type: Function,
      required: false,
    },
  },
  methods: {
    iconAction(action) {
      if (action === "1") return `/img/icon/action_single.png`;
      if (action === "2") return `/img/icon/action_double.png`;
      if (action === "3") return `/img/icon/action_triple.png`;
      if (action === "reaction") return `/img/icon/action_reaction.png`;
      if (action === "free") return `/img/icon/action_free.png`;
    },
    category(category) {
      return this.weaponCategoryRepository.find((t) => t.category === category)
        ? this.weaponCategoryRepository.find((t) => t.category === category)
          .name
        : category;
    },
    groupName(name) {
      return this.weaponGroup.find((item) => item.group === name)
        ? this.weaponGroup.find((item) => item.group === name).name
        : name;
    },
    categoryArmor(category) {
      return this.armourCategoryRepository.find((t) => t.category === category)
        ? this.armourCategoryRepository.find((t) => t.category === category)
          .name
        : category;
    },
    groupArmorName(name) {
      return this.armorGroup.find((item) => item.group === name)
        ? this.armorGroup.find((item) => item.group === name).name
        : name;
    },
    typeDamage(type) {
      return this.DamageType.find((t) => t.key === type)
        ? this.DamageType.find((t) => t.key === type).name
        : type;
    },
    Worn(item) {
      return this.WornGear[item];
    },
  },
};
</script>

<style scoped>
.expanded-item-wrapper {
  max-height: 400px;
  /* ограничиваем по высоте */
  overflow-y: auto;
  /* прокрутка, если текст большой */
  overflow-x: hidden;
  padding: 16px;
  background-color: var(--v-surface-base);
  /* адаптируется под тему Vuetify */
  border-radius: 8px;
}

.expanded-content {
  word-break: break-word;
}

.expanded-item-wrapper::-webkit-scrollbar {
  width: 6px;
}

.expanded-item-wrapper::-webkit-scrollbar-thumb {
  background: rgba(100, 100, 100, 0.3);
  border-radius: 3px;
}

.head h1 {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
}

.line {
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 8px 0;
}

.tag {
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.info-line {
  margin-bottom: 6px;
  font-size: 0.9rem;
}

.description,
.power-description {
  font-size: 0.9rem;
  line-height: 1.4;
}

.traits {
  background-color: #d9c484;
  display: inline-block;
  margin: 0.1em 0.15em !important;
  padding: 0.1em 0.25em;
  list-style-type: none !important;
}

.trait {
  background-color: #5e0000;
  color: #fff;
  display: inline-block;
  font-weight: bolder;
  margin: 0;
  padding: 0 0.25em;
}

.simple {
  display: inherit;
  margin-bottom: 0;
  padding-inline-start: 0.2em;
}

.head {
  /* color: rgb(57, 54, 54); */
  width: fit-content;
  /* font-size: 24px; */
  font-style: normal;
  /* font-family: goodOTCondBold; */
  font-weight: normal;
  line-height: 24px;
  /* text-transform: uppercase; */
}

.line {
  height: 1px;
  margin: 0 1rem;
  flex-grow: 1;
  background: #676767;
}

.tag {
  color: #fff;
  padding: 0.5rem;
  font-size: 18px;
  font-style: normal;
  text-align: center;
  font-family: goodOTCondBold;
  font-weight: normal;
  line-height: 24px;
  white-space: nowrap;
  border-radius: 0.25rem;
  text-transform: uppercase;
}

.rowFeat {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.main-holder p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.main-holder-divider p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  border-bottom: 1.5px solid black;
}

.row {
  margin: 0px 0px 8px;
  box-sizing: border-box;
  /* display: flex;
  border-radius: 4px; */
}

.gear-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.gear-thumb {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.gear-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.gear-info {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 8px;
}

.gear-name {
  white-space: nowrap;
  font-weight: 600;
  font-size: 1rem;
}

.gear-line {
  flex-grow: 1;
  height: 1px;
  background-color: rgba(255, 255, 255);
  margin: 0 8px;
}

/* Вот рамка с заполнением для тега */
.gear-tag {
  flex-shrink: 0;
  font-weight: 500;
  font-size: 0.85rem;
  color: white;
  background-color: rgb(13, 92, 188);
  /* зелёный фон */
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
}

.gear-footer {
  display: flex;
  justify-content: flex-end;
  /* по горизонтали вправо */
  align-items: flex-end;
  /* по вертикали вниз */
  height: 100%;
  /* занимает весь контейнер */
  padding: 4px;
}

.gear-source {
  font-size: 0.85rem;
  color: #ffffff;
}
</style>
