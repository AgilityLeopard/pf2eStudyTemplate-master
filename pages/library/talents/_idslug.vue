<template>
  <div>
    <!-- Breadcrumbs -->
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <!-- Species Details -->
    <v-row justify="center" no-gutters>
      <v-col :cols="12" :sm="10">
        <!-- <div class="pa-2 pt-4 pb-4">
          <h3 class="title-1">
            {{ item.name }}
          </h3>
          <h4 class="subtitle-2 grey--text" />

          <hr class="mb-0" />

          <p class="mt-2">
            {{ item.description }}
          </p>

          <span class="mt-2 grey--text">Prerequisites</span>
          <p><v-divider /></p>
          <ul>
            <li v-for="pereq in prerequisitesToText(item)" :key="pereq">
              {{ pereq }}
            </li>
          </ul>

          <div v-if="item.tags && item.tags.length > 0">
            <span>Tags:</span>
            <v-chip
              v-for="tag in item.tags"
              :key="tag"
              label
              small
              class="mr-1"
            >
              {{ tag }}
            </v-chip>
          </div>
        </div> -->

        <div v-if="item">
          <v-row class="rowFeat">
            <div class="head">
              <h1>
                {{ item.name }}
              </h1>
            </div>
            <div class="line"></div>
            <div class="tag">Черта {{ item.level }}</div>
          </v-row>
          <v-row>
            <div>
              <trait-view v-if="item.traits" :item="item" class="mb-2" />
            </div>
          </v-row>
          <div v-if="item.requirements">
            <p class="main-holder">
              {{ item.requirements.key }}
            </p>
          </div>
          <p></p>
          <div class="pt-4 pb-2" v-html="item.description"></div>
          <p></p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from "~/components/DodDefaultBreadcrumbs";
import BreadcrumbSchemaMixin from "~/mixins/BreadcrumbSchemaMixin";

export default {
  name: "Wargear",
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [BreadcrumbSchemaMixin],
  head() {
    const title = `${this.item.name}`;
    const description = ""; /* this.item.source.key.indexOf('core') >= 0
      ? `The ${this.item.name} from ${this.item.group} is an official Species described in the ${this.item.source.book}.`
      : `The ${this.item.name} from ${this.item.group} is a homebrew Species provided by ${this.item.source.book}.`; */
    const image = this.item.thumbnail
      ? `http://www.shadow-of-tales.ru${this.item.thumbnail}`
      : undefined;

    return {
      titleTemplate: "%s | Библиотека",
      title,
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", name: "og:title", content: title },
        { hid: "og:description", name: "og:description", content: description },
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          innerHTML: JSON.stringify(
            this.breadcrumbJsonLdSchema(this.breadcrumbItems)
          ),
          type: "application/ld+json",
        },
      ],
    };
  },
  async asyncData({ params, $axios, error }) {
    const regex = /(?<id>\d+)-(?<slug>[\w-]*)/;

    const { idslug } = params;

    const response = await $axios.get(`/api/talents/${idslug}`);
    const item = response.data;

    if (item === undefined || item.length <= 0) {
      error({ statusCode: 404, message: "Wargear not found" });
      return;
    }

    return {
      item,
      idslug,
      breadcrumbItems: [
        {
          text: "",
          nuxt: true,
          exact: true,
          to: "/",
        },
        {
          text: "Библиотека",
          nuxt: true,
          exact: true,
          to: "/library",
        },
        {
          text: "Черты",
          nuxt: true,
          exact: true,
          to: "/library/talents",
        },
        {
          text: item.name,
          disabled: true,
          nuxt: true,
          to: `/library/talents/${idslug}`,
        },
      ],
    };
  },
  methods: {
    prerequisitesToText(item) {
      const texts = [];

      if (item.prerequisites.length <= 0) {
        return ["None"];
      }

      item.prerequisites.forEach((p) => {
        let text = "";

        switch (p.type) {
          case "keyword":
          case "talent":
            if (p.condition === "mustNot") {
              text = `<strong>must not</strong> possess the ${p.key.join(
                " or "
              )} ${p.type}`;
            } else {
              text = `${p.key.join(" or ")}`;
            }
            break;

          case "attribute":
          case "skill":
          case "character":
            text = `${p.key} ${p.value}`;
            break;

          default:
            text = `${p.key}`;
        }
        texts.push(text);
      });

      return texts;
    },
    toTypeString(item) {
      const types = [item.type];
      if (item.subtype) {
        types.push(item.subtype);
      }
      return types.join(" • ");
    },
  },
};
</script>

<style scoped></style>

<style scoped lang="css">
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
</style>
