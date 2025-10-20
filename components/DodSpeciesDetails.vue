<template lang="html">
  <v-row justify="center">
    <v-col :cols="12">
      <v-row>
        <v-col>
          <h3 class="headline">
            {{ item.nameAncestry }}
          </h3>
          <span class="subtitle-1 grey--text">{{ item.hint }}</span>
          <h5 class="subtitle-2">
            <strong>Source: </strong>
            <span>{{ item.source.book }}</span>
            <!-- <span v-if="item.source.page">, pg. {{ item.source.page }}</span> -->
          </h5>
        </v-col>

        <v-spacer />

        <v-col class="hidden-xs-only">
          <img :src="avatar" style="width: 96px" />
        </v-col>
      </v-row>
    </v-col>

    <v-col :cols="12">
      <!-- <p class="text-lg-justify">
        <strong>Build Point Cost:</strong> {{ item.cost }}
      </p> -->

      <p><v-divider /></p>

      <!-- <p class="text-lg-justify">
        <strong>Base Tier:</strong> {{ item.baseTier }}
      </p> -->

      <p class="text-lg-justify"><strong>Скорость:</strong> {{ item.speed }}</p>
      <p class="text-lg-justify">
        <strong>Хитов:</strong> {{ item.ancestryHitPoint }}
      </p>

      <span class="subtitle-1 mt-2">Повышение характеристик</span>
      <v-divider />

      <div v-for="boost in item.attributeBoost" class="text-lg-justify">
        <div v-if="boost.value > 0">
          <strong>{{ boost.name }}</strong>
        </div>
      </div>

                    <div v-for="boost in item.abilityBoost" class="text-lg-justify">
                <div>
                  <strong> Свободное повышение </strong>
                </div>
              </div>
      <p></p>
      <span
        v-if="item.attributeFlaw.find((t) => t.value < 0)"
        class="subtitle-1 mt-2"
        >Понижение характеристик</span
      >
      <v-divider v-if="item.attributeFlaw.find((t) => t.value < 0)" />

      <div v-for="flaw in item.attributeFlaw" class="text-lg-justify">
        <div v-if="flaw.value < 0">
          <strong>{{ flaw.name }}</strong>
        </div>
      </div>

      <p><v-divider /></p>
      <p>
        <strong>Доступные языки:</strong> {{ item.language.join(", ") }} +
        {{ item.freeLanguage }} на выбор
      </p>

      <p><strong>Размер:</strong> {{ size(item.size) }}</p>

      <div v-if="item.Description" class="body-2">
        <p><v-divider /></p>


        <div v-for="description in item.Description" class="text-lg-justify">
          <div v-if="description.name == 'Faith'">
            <span class="subtitle-1 mt-2">Верование</span>
            <p><v-divider /></p>
            <div v-if="description.about" v-html="description.about"></div>
            <strong> Популярные эдикты</strong>
            <div v-if="description.edicts" v-html="description.edicts"></div>

            <p></p>

            <strong> Популярные анафемы</strong>
            <div
              v-if="description.anathema"
              v-html="description.anathema"
            ></div>
          </div>

          <p></p>

          <div v-if="description.name == 'avanturist'">
            <span class="subtitle-1 mt-2">Авантюристы</span>
            <p><v-divider /></p>
            <div v-if="description.about" v-html="description.about"></div>
          </div>

          <p></p>
          <div v-if="description.name === 'physical'">
            <span class="subtitle-1 mt-2">Физическое описание</span>
            <p><v-divider /></p>
            <div v-if="description.about" v-html="description.about"></div>
           
          </div>
 <p></p>
          <div v-if="description.name === 'society'">
            <span class="subtitle-1 mt-2">Общество</span>
            <p><v-divider /></p>
            <div v-if="description.about" v-html="description.about"></div>
          </div>
        </div>
<p></p>
          <div v-if="item.exampleName">
            <span class="subtitle-1 mt-2">Имена</span>
            <p><v-divider /></p>
            <span class="subtitle-2 mt-2"><strong>Примеры имен</strong></span>
            <div v-if="item.exampleName" v-html="item.exampleName"></div>
          </div>

      </div>

        <div class="mt-2 body-2 text-justify ">

          <h3 class="headline" v-if="item.speciesFeatures.length != 0" >Особенности родословной</h3>
          <div
        v-for="feature in item.speciesFeatures"
        class="text-lg-justify " v-bind:key="feature.key">
              <h3 class="main-holder split-header"><span class="left-header">{{ feature.name }}</span></h3>
                      <p class="main-holder">
          

          <div v-if="feature.description" v-html="feature.description"></div>
          <div  v-else>{{ feature.snippet }}</div>

               <div v-if="feature.action" v-html="feature.action.description"></div>
        </p>
      </div>
        </div>
 
     
    </v-col>

    <!-- source -->
    <!-- <v-col :cols="12" style="font-style: italic">
      <span class="caption">{{ item.source.book }}</span>
      <span v-if="item.source.page" class="caption">, pg. {{ item.source.page }}</span>
    </v-col> -->
  </v-row>
</template>

<script lang="js">
import SluggerMixin from '~/mixins/SluggerMixin';
import StatRepositoryMixin from "~/mixins/StatRepositoryMixin";

export default {
  name: 'SpeciesDetails',
  mixins: [
    SluggerMixin, StatRepositoryMixin
  ],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      return `/img/avatars/species/${this.item.key}.png`;
    },
  },
  methods: {
    size(size) {
      if (!size) return "";
      const s = this.sizeRepository.find((s) => s.key === size);
      return s ? s.name : "";
    },
  },
};
</script>

<style scoped lang="css"></style>
