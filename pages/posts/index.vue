<template>
  <div>
    <div v-show="showTooltip" class="tooltip-container" :style="{ left: tooltip.position.x, top: tooltip.position.y }">
      <v-card v-if="tooltip.loading" dark color="success" class="text-center">
        <v-progress-circular indeterminate />
      </v-card>
      <v-card v-else raised dark color="success">
        <v-card-title class="tooltip-container__header">
          {{ hintBoxItem.title }}
        </v-card-title>
        <v-card-text>
          {{ hintBoxItem.description }}
        </v-card-text>
      </v-card>
    </div>

    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center" no-gutters dense class="mt-4">
      <v-col :cols="12" :md="12">
        <ColorfulPage :headline="page.title" flavour="blog"> </ColorfulPage>

        <v-row v-if="$fetchState.pending" justify="center">
          <v-progress-circular indeterminate color="success" size="128" width="12" />
        </v-row>

        <v-row v-else>
          <v-col v-for="post in posts" :key="post.id" :cols="12" :sm="6" :md="4">
            <v-card class="patch-card" :to="`/posts/${post.slug}`" nuxt>

              <div class="patch-header">
                <v-chip small :color="getTypeColor(post.type)" dark>
                  {{ post.type || 'update' }}
                </v-chip>

                <span class="patch-time">
                  {{ post.publishedAt | timeSince }}
                </span>
              </div>
              <div class="patch-title">
                {{ post.title }}
              </div>

              <div class="patch-desc">
                {{ post.shortDescription }}
              </div>

            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from "~/components/DodDefaultBreadcrumbs";
import BreadcrumbSchemaMixin from "~/mixins/BreadcrumbSchemaMixin";
import ColorfulPage from "~/components/shared/ColorfulPage";
const fixedTime = new Date();

export default {
  name: "posts",
  components: {
    ColorfulPage,
    DodDefaultBreadcrumbs,
  },
  mixins: [BreadcrumbSchemaMixin],
  async asyncData({ $axios }) {
    const { data } = await $axios.get("/api/posts");

    return {
      posts: data || []
    };
  },
  // async asyncData({ app }) {

  //   const { data } = await app.$axios.get('/api/posts');
  //   const posts = data;

  //   return {
  //     fixedTime: new Date(),
  //     //posts,
  //   };
  // },
  data() {
    return {
      fixedTime: new Date(),
      posts: [],
      page: {
        title: "Новости",
        description:
          "Новости",
      },
      showTooltip: false,
      tooltip: {
        position: { x: 0, y: 0 },
        loading: false,
      },
      hintBoxItem: { title: "", description: "", type: "" },
    };
  },
  head() {
    const { title, description } = this.page;
    // const image = `http://www.shadow-of-tales.ru${this.post.image}`;

    return {
      title,
      titleTemplate: "Посты",
      meta: [
        { hid: "description", name: "description", content: description },

        { hid: "og:title", name: "og:title", content: title },
        { hid: "og:description", name: "og:description", content: description },
        // { hid: 'og:image', name: 'og:image', content: image },

        // { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: "twitter:title", name: "twitter:title", content: title },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        // { hid: 'twitter:image', name: 'twitter:image', content: image },
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
  computed: {
    breadcrumbItems() {
      return [
        {
          text: "",
          disabled: false,
          nuxt: true,
          exact: true,
          to: "/",
        },
        {
          text: "Посты",
          disabled: false,
          nuxt: true,
          exact: true,
          to: "/posts",
        },
      ];
    },
  },
  methods: {
    getTypeColor(type) {
      switch (type) {
        case 'patch': return 'green';
        case 'news': return 'blue';
        case 'bugfix': return 'red';
        case 'feature': return 'purple';
        default: return 'grey';
      }
    }
  },
  filters: {
    timeSince(value) {
      const date = new Date(value);
      const seconds = Math.floor((fixedTime - date) / 1000);

      let interval = Math.floor(seconds / 31536000);

      interval = Math.floor(seconds / 86400);

      if (interval > 7) {
        let options = { year: "numeric", month: "short", day: "numeric" };
        return date.toLocaleDateString("ru-RU", options);
      }

      if (interval > 1) {
        return interval + " дней назад";
      }
      interval = Math.floor(seconds / 3600);
      if (interval > 1) {
        return interval + " часов назад";
      }
      interval = Math.floor(seconds / 60);
      if (interval > 1) {
        return interval + " минут назад";
      }
      return Math.floor(seconds) + " секунд назад";
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  border-bottom: 2px solid hsl(194, 90%, 65%);
}

.posts--text {
  color: hsl(194, 90%, 65%);
}

.image-caption {
  background-color: hsla(300, 6%, 3%, 0.8);
  justify-content: flex-end;
  display: flex;

  &__time-since {}

  &__by-author {}
}

.patch-card {
  padding: 16px;
  border-radius: 12px;
  transition: all 0.2s ease;
  border-left: 4px solid #00e5ff;
  background: #151515;
}

.patch-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
}

.patch-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  opacity: 0.7;
}

.patch-title {
  font-size: 18px;
  font-weight: 700;
  margin-top: 10px;
}

.patch-desc {
  margin-top: 8px;
  font-size: 14px;
  opacity: 0.8;
}
</style>
