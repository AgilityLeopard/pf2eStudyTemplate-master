<template>
  <div>
    <div class="patch-hero">
      <dod-default-breadcrumbs :items="breadcrumbItems" />

      <v-chip v-if="post" :color="getTypeColor(post.type)" dark>
        {{ post.type || 'update' }}
      </v-chip>

      <h1 v-if="post">{{ post.title }}</h1>

      <div class="meta" v-if="post">
        {{ post.publishedAt | timeSince }}
      </div>
    </div>

    <v-row justify="center" no-gutters dense class="mt-4">
      <v-col :cols="12" :md="12">
        <v-row>
          <v-col :cols="12" :md="10">
            <div v-if="post" class="patch-content" v-html="toMarkdown(post.description)" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DodDefaultBreadcrumbs from "~/components/DodDefaultBreadcrumbs";
import BreadcrumbSchemaMixin from "~/mixins/BreadcrumbSchemaMixin";
import ArticleSchemaMixin from "~/mixins/ArticleSchemaMixin";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export default {
  name: "BlogPostDetail",
  components: {
    DodDefaultBreadcrumbs,
  },
  mixins: [BreadcrumbSchemaMixin],

  data() {
    return {
      post: null,
      showTooltip: false,
      tooltip: {
        position: { x: 0, y: 0 },
        loading: false,
      },
      tooltipItem: { title: "", description: "", type: "" },
    };
  },

  async fetch() {
    try {
      const { data } = await this.$axios.get(
        `/api/posts/${this.$route.params.slug}`
      );

      const post = Array.isArray(data) ? data[0] : data;

      this.post = post || null;
    } catch (e) {
      console.error(e);
      this.post = null;
    }
  },

  head() {
    if (!this.post) {
      return {
        title: "Загрузка...",
      };
    }

    const { title, description } = this.page;

    return {
      title,
      titleTemplate: "Новости",
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", name: "og:title", content: title },
        { hid: "og:description", name: "og:description", content: description },
        { hid: "og:image", name: "og:image", content: image },
      ],
    };
  },

  computed: {
    breadcrumbItems() {
      return [
        { text: "", to: "/" },
        { text: "Посты", to: "/posts" },
        {
          text: this.post?.title || "",
          to: this.post?.slug ? `/posts/${this.post.slug}` : "/posts",
        },
      ];
    },
  },

  methods: {
    toMarkdown(content) {
      if (!content) return "";
      return md.render(content);
    },

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
      if (!value) return "";

      const date = new Date(value);
      const now = new Date();
      const seconds = Math.floor((now - date) / 1000);

      let interval = Math.floor(seconds / 86400);

      if (interval > 7) {
        return date.toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }

      if (interval > 1) return interval + " дней назад";

      interval = Math.floor(seconds / 3600);
      if (interval > 1) return interval + " часов назад";

      interval = Math.floor(seconds / 60);
      if (interval > 1) return interval + " минут назад";

      return Math.floor(seconds) + " секунд назад";
    },
  },
};
</script>