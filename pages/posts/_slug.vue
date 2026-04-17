<template>


  <div>
    <div class="patch-hero">

      <dod-default-breadcrumbs :items="breadcrumbItems" />

      <v-chip :color="getTypeColor(post.type)" dark>
        {{ post.type || 'update' }}
      </v-chip>

      <h1>{{ post.title }}</h1>

      <div class="meta">
        {{ post.publishedAt | timeSince }}

      </div>

    </div>
    <!-- 
    <doom-tooltip v-show="showTooltip" :loading="tooltip.loading" :position="tooltip.position"
      :title="tooltipItem.title" :type="tooltipItem.type">
      {{ tooltipItem.description }}
    </doom-tooltip> -->



    <v-row justify="center" no-gutters dense class="mt-4">
      <v-col :cols="12" :md="12">
        <!-- <ColorfulEntry :headline="post.fields.title" flavour="blog"> -->
        <v-row>

          <v-col :cols="12" :md="10">
            <div class="patch-content" v-html="toMarkdown(post.description)" />
          </v-col>
        </v-row>
        <!-- </ColorfulEntry> -->

        <v-row>
          <v-col :cols="12"> </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import DodDefaultBreadcrumbs from "~/components/DodDefaultBreadcrumbs";
import BreadcrumbSchemaMixin from "~/mixins/BreadcrumbSchemaMixin";
import ArticleSchemaMixin from "~/mixins/ArticleSchemaMixin";
import { BLOCKS } from "@contentful/rich-text-types";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import ColorfulEntry from "~/components/shared/ColorfulEntry";
import ContentfulHtmlText from "@/components/shared/ContentulHtmlText";
import DoomTooltip from "@/components/shared/DoomTooltip";
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

const fixedTime = new Date();

export default {
  name: "BlogPostDetail",
  components: {
    DoomTooltip,
    ContentfulHtmlText,
    ColorfulEntry,
    DodDefaultBreadcrumbs,
  },
  mixins: [ArticleSchemaMixin, BreadcrumbSchemaMixin],
  /*async fetch() {
    const { data } = await this.$axios.get(`/api/posts/${this.$route.params.slug}`);
    this.post = data[0];
  },*/
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/api/posts/${params.slug}`);

    return {
      post: data
    };
  },
  data() {
    return {
      showTooltip: false,
      tooltip: {
        position: { x: 0, y: 0 },
        loading: false,
      },
      tooltipItem: { title: "", description: "", type: "" },
    };
  },
  head() {
    const { title, description } = this.post;
    const image = this.post.image
      ? `https:${this.post.image.fields.file.url}`
      : `http://www.shadow-of-tales.ru/img/artwork_posts.jpg`;

    return {
      title,
      titleTemplate: "Новости",
      meta: [
        { hid: "description", name: "description", content: description },
        { hid: "og:title", name: "og:title", content: title },
        { hid: "og:description", name: "og:description", content: description },
        { hid: "og:image", name: "og:image", content: image },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        { hid: "twitter:title", name: "twitter:title", content: title },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: description,
        },
        { hid: "twitter:image", name: "twitter:image", content: image },
      ],
      __dangerouslyDisableSanitizers: ["script"],
      script: [
        {
          innerHTML: JSON.stringify(
            this.breadcrumbJsonLdSchema(this.breadcrumbItems)
          ),
          type: "application/ld+json",
        },
        // {
        //   innerHTML: JSON.stringify(this.articleJsonLdSchema(this.post, image)),
        //   type: "application/ld+json",
        // },
      ],
    };
  },
  mounted() {
    this.$root.$on("hoverHint", (payload) => {
      const { event, endpoint } = payload;
      const category = endpoint.split("/")[1].replace(/(^\w|-\w)/g, (g) => {
        return g.replace(/-/, "").toUpperCase();
      });
      this.$axios.get(`/api${endpoint}`).then(({ data }) => {
        this.tooltipItem = {
          title: data.name,
          description: data.snippet,
          type: category,
          data,
        };
        this.tooltip.loading = false;
      });
      this.showTooltip = true;
      this.tooltip.position.x = `${event.pageX}px`;
      this.tooltip.position.y = `${event.pageY}px`;
    });
    this.$root.$on("hideHint", () => (this.showTooltip = false));
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
        {
          text: this.post.title,
          disabled: false,
          nuxt: true,
          exact: true,
          to: `/posts/${this.post.slug}`,
        },
      ];
    },
  },
  methods: {
    toHtml(rich) {
      const options = {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: (node) =>
            `<img src="https:${node.data.target.fields.file.url}"/>`,
        },
      };
      return documentToHtmlString(rich, options);
    },
    toMarkdown(content) {
      if (!content) return '';
      return md.render(content);
    },
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
.post-hero {
  position: relative;
  height: 300px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 30px;
}

.post-hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-hero .overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
}

.post-hero h1 {
  margin: 0;
  font-size: 28px;
}

.meta {
  font-size: 13px;
  opacity: 0.8;
}

.content {
  font-size: 16px;
  line-height: 1.7;
  color: #ddd;
}

.content h2 {
  margin-top: 30px;
  font-size: 22px;
}

.content p {
  margin-bottom: 16px;
}

.content img {
  max-width: 100%;
  border-radius: 10px;
  margin: 20px 0;
}

a {
  transition: color 0.2s;
}

a:hover {
  color: #00e5ff;
}

.patch-hero {
  padding: 20px;
  border-radius: 14px;
  // background: linear-gradient(135deg, #1a1a1a, #101010) !important;
  margin-bottom: 20px;
}

.patch-hero h1 {
  margin-top: 10px;
  font-size: 28px;
}

.meta {
  margin-top: 6px;
  font-size: 12px;
  opacity: 0.7;
}

.patch-content {
  font-size: 15px;
  line-height: 1.7;
  color: #eaeaea;
}

.patch-content h1,
.patch-content h2 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.patch-content h2 {
  border-left: 3px solid #00e5ff;
  padding-left: 10px;
}

.patch-content ul {
  padding-left: 20px;
}

.patch-content code {
  background: #1e1e1e;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
