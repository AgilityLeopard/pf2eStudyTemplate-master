<template>
  <div>
    <dod-default-breadcrumbs :items="breadcrumbItems" />

    <v-row justify="center" no-gutters dense class="mt-4">
      <v-col :cols="12" :md="12">
        <ColorfulPage :headline="page.title" flavour="blog" />

        <v-row v-if="!posts.length" justify="center">
          <v-progress-circular indeterminate color="success" />
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

export default {
  name: "posts",

  components: {
    ColorfulPage,
    DodDefaultBreadcrumbs,
  },

  mixins: [BreadcrumbSchemaMixin],

  // 💥 ВАЖНО: максимально простой SSR-safe запрос
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get("/api/posts");
      return { posts: data || [] };
    } catch (e) {
      console.error("POSTS SSR ERROR:", e);
      return { posts: [] };
    }
  },

  data() {
    return {
      posts: [],
      page: {
        title: "Новости",
        description: "Новости",
      },
    };
  },

  computed: {
    breadcrumbItems() {
      return [
        { text: "", to: "/" },
        { text: "Посты", to: "/posts" },
      ];
    },
  },

  methods: {
    getTypeColor(type) {
      switch (type) {
        case "patch":
          return "green";
        case "news":
          return "blue";
        case "bugfix":
          return "red";
        case "feature":
          return "purple";
        default:
          return "grey";
      }
    },
  },

  filters: {
    timeSince(value) {
      const date = new Date(value);
      const seconds = Math.floor((new Date() - date) / 1000);

      const days = Math.floor(seconds / 86400);
      if (days > 7) {
        return date.toLocaleDateString("ru-RU");
      }
      if (days > 0) return `${days} дней назад`;

      const hours = Math.floor(seconds / 3600);
      if (hours > 0) return `${hours} часов назад`;

      const minutes = Math.floor(seconds / 60);
      if (minutes > 0) return `${minutes} минут назад`;

      return `${seconds} секунд назад`;
    },
  },
};
</script>