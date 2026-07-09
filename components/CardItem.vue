<template>
  <div :class="['expanded-item-wrapper', `type-${item.type}`]">
    <div class="expanded-content">

      <!-- HEADER -->
      <div class="gear-header">
        <div class="gear-info">
          <span class="gear-name">

            {{ item.name }}


            <span v-if="item.actions" class="action-icon">


              <template v-if="item.actions.value !== null">
                <img :src="iconAction(item.actions.value.toString())" class="action-single"
                  :class="{ 'invert-icon': !$vuetify.theme.dark }" />
              </template>

              <template v-if="item.actions.value === null && item.actionType">
                <img :src="iconAction(item.actionType.value)" class="action-single"
                  :class="{ 'invert-icon': !$vuetify.theme.dark }" />
              </template>
            </span>


          </span>

          <span class="gear-line"></span>

          <span class="gear-tag">
            <template v-if="['archetype', 'species'].includes(item.type)">
              Особенность {{ item.level || "-" }}
            </template>

            <template v-else-if="item.type === 'feat'">
              Черта {{ item.system.level?.value || "-" }}
            </template>

            <template v-else-if="item.type === 'weapon'">
              Оружие {{ item.level?.value || "-" }}
            </template>

            <template v-else-if="item.type === 'armor'">
              Доспех {{ item.level?.value || "-" }}
            </template>

            <template v-else-if="item.type === 'shield'">
              Щит {{ item.level?.value || "-" }}
            </template>

            <template v-else-if="item.type === 'spell'">
              Заклинание {{ item.levelRank || "-" }}
            </template>

            <template v-else-if="item.type === 'ritual'">
              Ритуал {{ item.levelRank || "-" }}
            </template>


            <template v-else-if="item.type === 'action'">
              Действие {{ item.level?.value || "-" }}
            </template>

            <template v-else>
              Предмет {{ item.level?.value || "-" }}
            </template>
          </span>
        </div>
      </div>

      <!-- TRAITS -->
      <trait-view v-if="item.traits" :item="item" class="mb-2" />

      <div class="divider"></div>

      <!-- ОБЩЕЕ ДЛЯ ПРЕДМЕТОВ -->
      <template v-if="['weapon', 'armor', 'shield', 'gear', 'equipment', 'consumable'].includes(item.type)">

        <div v-if="item.bulk" class="info-line">
          <strong>Нагрузка:</strong>
          {{ item.bulk.value === 0.1 ? "Л" : item.bulk.value }}
        </div>

        <div v-if="item.price" class="info-line">
          <strong>Цена:</strong> {{ wargearPrice(item) }}
        </div>

        <div class="divider"></div>

        <!-- ОРУЖИЕ -->
        <template v-if="item.type === 'weapon'">
          <div v-if="item.damageOrig" class="info-line">
            <strong>Урон:</strong>
            {{ item.damageOrig.die }}
            {{ typeDamage(item.damageOrig.damageType).slice(0, 1).toUpperCase() }}
          </div>

          <div v-else-if="item.damage" class="info-line">
            <strong>Урон:</strong>
            {{ item.damage.die }}
            {{ typeDamage(item.damage.damageType).slice(0, 1).toUpperCase() }}
          </div>

          <div v-if="item.reload && item.reload.value != '-'" class="info-line">
            <strong>Перезарядка:</strong>
            {{ item.reload.value }}

          </div>

          <div v-if="item.range" class="info-line">
            <strong>Дистанция:</strong>
            {{ item.range }}

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
        </template>

        <!-- ДОСПЕХ -->
        <template v-if="item.type === 'armor'">
          <div v-if="item.acBonus" class="info-line">
            <strong>Бонус КД:</strong> {{ item.acBonus }}
          </div>

          <div v-if="item.dexCap" class="info-line">
            <strong>Макс. Лвк:</strong> {{ item.dexCap }}
          </div>

          <div v-if="item.checkPenalty" class="info-line">
            <strong>Штраф к навыкам:</strong> {{ item.checkPenalty }}
          </div>

          <div v-if="item.speedPenalty" class="info-line">
            <strong>Штраф к скорости:</strong> {{ item.speedPenalty }}
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
        </template>



        <div class="divider"></div>

        <!-- DESCRIPTION -->
        <div v-if="item.description" class="description" :class="{ 'light-view': !$vuetify.theme.isDark }"
          v-html="item.description"></div>

      </template>

      <!-- ЗАКЛИНАНИЕ -->
      <template v-if="['spell', 'ritual'].includes(item.type)">
        <div v-if="item.range" class="info-line">
          <strong>Дистанция:</strong> {{ item.range }}
        </div>

        <div v-if="item.area" class="info-line">
          <strong>Область:</strong>
          {{ item.area.value }}-фут. {{ areaRepository[item.area.type] }}
        </div>

        <div v-if="item.target" class="info-line">
          <strong>Цель:</strong> {{ item.target }}
        </div>

        <div v-if="item.cost?.value" class="info-line">
          <strong>Стоимость:</strong> {{ item.cost.value }}
        </div>

        <div v-if="item.duration?.value" class="info-line">
          <strong>Длительность:</strong>
          <span v-if="item.duration.sustained">Поддерживаемое до </span>
          {{ item.duration.value }}
        </div>

        <div v-if="item.time" class="info-line">
          <strong>Действия:</strong>
          <span v-if="item.time.value === '1 to 3'">
            От
            <img :src="iconAction('1')" :class="{ 'invert-icon': !$vuetify.theme.dark }" />
            до
            <img :src="iconAction('3')" :class="{ 'invert-icon': !$vuetify.theme.dark }" />
          </span>
          <span v-else>
            <img :src="iconAction(item.time.value)" :class="{ 'invert-icon': !$vuetify.theme.dark }" />
          </span>
        </div>

        <div v-if="item.Power" class="info-line">
          <strong>Урон этой ячейкой:</strong>
          <span v-if="item.Power" v-html="item.Power"></span>
        </div>


        <div v-if="item.defense?.save" class="info-line">
          <strong>Защита:</strong>
          <span v-if="item.defense.save.basic">Базовый </span>
          {{
            SavingRepository.find(
              t => t.key === item.defense.save.statistic
            ).name
          }}
        </div>

        <div class="divider"></div>

        <!-- DESCRIPTION -->
        <div v-if="item.description" class="description" :class="{ 'light-view': !$vuetify.theme.dark }"
          v-html="item.description"></div>

      </template>

      <!-- FEAT -->
      <template v-if="item.type === 'feat'">
        <div v-if="item.prerequisites" class="info-line">
          <strong>Требования:</strong>
          {{ item.prerequisites.value }}
        </div>

        <div v-if="item.description" class="description" :class="{ 'light-view': !$vuetify.theme.isDark }"
          v-html="item.description"></div>
      </template>

      <!-- ПРОЧЕЕ (archetype / species) -->
      <template v-if="['archetype', 'species'].includes(item.type)">
        <div class="divider"></div>

        <div v-if="item.description" class="description" :class="{ 'light-view': !$vuetify.theme.isDark }"
          v-html="item.description"></div>
      </template>

      <!-- ПРОЧЕЕ (archetype / species) -->
      <template v-if="item.type === 'action'">
        <div v-if="item.prerequisites" class="info-line">
          <strong>Требования:</strong>
          {{ item.prerequisites.value }}
        </div>

        <div v-if="item.system.description.value" class="description" :class="{ 'light-view': !$vuetify.theme.isDark }"
          v-html="item.system.description.value"></div>
      </template>

      <!-- ПРОЧЕЕ (archetype / species) -->
      <!-- <template v-if="['archetype', 'species'].includes(item.type)">
        <div class="divider"></div>

        <div v-if="item.description"  class="description"  :class="{ 'light-view': !$vuetify.theme.isDark }" v-html="item.description"></div>
      </template> -->

      <!-- FOOTER -->
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
    type: {
      type: Function,
      required: false,
    },
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
  max-height: 420px;
  overflow-y: auto;
  padding: 16px;

  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.06);

  backdrop-filter: blur(6px);
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

.type-weapon {
  border-left: 3px solid #ef5350;
}

.type-armor {
  border-left: 3px solid #42a5f5;
}

.type-spell {
  border-left: 3px solid #ab47bc;
}

.type-feat {
  border-left: 3px solid #66bb6a;
}



.info-line {
  margin-bottom: 6px;
  font-size: 0.9rem;
}

.traits {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.trait {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;

  background: rgba(255, 255, 255, 0.08);
  color: inherit;
}

.simple {
  display: inherit;
  margin-bottom: 0;
  padding-inline-start: 0.2em;
}



.gear-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.gear-info {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.gear-name {
  font-weight: 600;
  font-size: 15px;
}

.gear-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}



/* Вот рамка с заполнением для тега */
.gear-tag {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 500;

  background: rgba(255, 0, 0, 0.15);
  color: rgb(255, 80, 80);

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

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 12px 0;
}

.description {
  font-size: 13px;
  line-height: 1.5;
  opacity: 0.9;
}

.invert-icon {
  filter: invert(1) brightness(1.2);
}

::v-deep(.description.light-view img.action-icon) {
  filter: invert(1);
}
</style>
