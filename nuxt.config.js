//import redirectSSL from 'redirect-ssl';

const colors = require("vuetify/es5/util/colors").default;
const path = require("path");
const axios = require("axios");
const config = require('./.contentful.json');

module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },
  generate: {
    fallback: true
  },
  target: "static",
  ssr: false,
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: "en",
    },
    titleTemplate: "%s",
    title: "Shadow Tales" || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "robots", name: "robots", content: "index,follow" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "Pathfinder, патфайндер, pathbuilder, патфайндер на русском",
      },
      { hid: "theme-color", name: "theme-color", content: "#4caf50" },
      // {
      //   hid: "google-site-verification",
      //   name: "google-site-verification",
      //   content: "5Eig5Vs_1-k3HAZdkGwTDu4Tu94AM9H-xny9n80IgJ0",
      // },

      /**
       *  Open Graph, used in facebook
       */
      // { hid: "og:site_name", name: "og:site_name", content: "Shadow Tales" },
      // {
      //   hid: "og:image",
      //   name: "og:image",
      //   content: "https://shadow-of-tales.ru/website_logo.png",
      // },

      // /**
      //  * Twitter Card, used in Twitter, Discord
      //  * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary-card-with-large-image
      //  * @see https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/summary
      //  */
      // {
      //   hid: "twitter:site",
      //   name: "twitter:site",
      //   content: "@",
      // },
      // {
      //   hid: "twitter:creator",
      //   name: "twitter:creator",
      //   content: "@",
      // },
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "shortcut icon",
        type: "image/x-icon",
        sizes: "192x192",
        href: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "stylesheet", href: "/css/materialdesignicons.min.css" },
      {
        rel: "preload",
        href: "/fonts/Material-Icons.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "crossorigin",
      },
      {
        rel: "preload",
        href: "/fonts/Roboto-Regular.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "crossorigin",
      },
      {
        rel: "preload",
        href: "/fonts/Roboto-Bold.woff2",
        as: "font",
        type: "font/woff2",
        crossorigin: "crossorigin",
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: colors.green.base },
  /*
   ** Global CSS
   */
  css: ["@/assets/scss/config/_fonts.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/vuex-persist", ssr: false },
    { src: "~/plugins/vue-croppa.js", ssr: false },
    "~/plugins/filters.js",
    "~/plugins/hint-box-component.js",
  ],
  /*
   ** Nuxt.js dev-modules
   */

  env: {
    ...config
  },
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    //'@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    [
      "@nuxtjs/vuetify",
      {
        /* @see https://github.com/nuxt-community/vuetify-module#defaultassets */
        defaultAssets: false,
      },
    ],
    "@nuxtjs/sitemap",
    "@nuxtjs/axios",
    // '@nuxtjs/auth',
    [
      "@nuxtjs/redirect-module",
      [
        { from: "^/builder.*", to: "/forge/my-characters", statusCode: 301 },
        {
          from: "^/vault/the-emperors-angles",
          to: "/vault/the-emperors-angels",
          statusCode: 301,
        },
        {
          from: "^/blog/our-migration-from-deathwatch-to-wrath-and-glory",
          to: "/posts/1-our-migration-from-deathwatch-to-wrath-and-glory",
          statusCode: 301,
        },
      ],
    ],
    // https://github.com/nuxt-community/redirect-module
    [
      "@nuxtjs/google-analytics",
      {
        id: "UA-141676237-2",
        disabled: false,
        set: [{ field: "anonymizeIp", value: true }],
        debug: {
          sendHitTask: process.env.NODE_ENV === "production",
        },
      },
    ],
    [
      "@nuxtjs/pwa",
      {
        manifest: false,
      },
    ],
  ],

  /*
   * Sitemap module configuration
   */
  sitemap: {
    hostname: "http://shadow-of-tales.ru",
    gzip: true,
    exclude: [
      // dynamic and user specific parts should not be sitemaped
      "/about",
      "/forge/characters/**",
      "/api/**"
    ],
    routes: async () => {
      // const base =
      //   process.env.NODE_ENV === "production"
      //     ? "http://shadow-of-tales.ru      "
      //     : "http://127.0.0.1:3000";

      // const homebrewResponse = await axios.get(`${base}/api/homebrews/`);
      // const homebrewRoutes = homebrewResponse.data.map((item) => {
      //   return {
      //     url: `/vault/${item.fields.urlSlug}`,
      //     changefreq: "weekly",
      //     priority: 1,
      //     lastmod: item.sys.updatedAt,
      //   };
      // });

      // const threatResponse = await axios.get(`${base}/api/threats/`);
      // const threatRoutes = threatResponse.data
      //   .filter((item) => item.source.key !== "core")
      //   .map((item) => {
      //     const slug = item.key.replace(
      //       /([a-z][A-Z])/g,
      //       (g) => `${g[0]}-${g[1].toLowerCase()}`
      //     );
      //     return `/bestiary/${slug}`;
      //   });

      // const postResponse = await axios.get(`${base}/api/posts/`);
      // const postRoutes = postResponse.data.map((item) => {
      //   return {
      //     url: `/posts/${item.fields.slug}`,
      //     changefreq: "weekly",
      //     priority: 1,
      //     lastmod: item.sys.updatedAt,
      //   };
      // });

      // return [...homebrewRoutes, ...threatRoutes, ...postRoutes];
      return [];
    },
    defaults: {
      changefreq: "weekly",
      priority: 1,
      lastmod: new Date(),
      lastmodrealtime: true,
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    browserBaseURL: "/",
  },

  /* auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'api/users/login', method: 'post', propertyName: 'token' },
          logout: false,
          user: { url: 'api/users/me', mthod: 'get', propertyName: 'data'},
        },
        // tokenRequired: true,
        // tokenType: 'Bearer'
      },
    },
    plugins: [
      '~/plugins/auth.js'
    ]
  }, */

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    theme: {
      dark: false,
      light: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.base,
      },
    },
  },

  // serverMiddleware: [
  //'redirect-ssl',
  //redirectSSL.create({enabled: process.env.NODE_ENV === 'production'}),
  // "~/api/express", // handles /api/** calls
  // '~/serverMiddleware/forcedomain'
  // ],

  /**
   * Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */

    extend(config, ctx) {
      (config.devtool = "#source-map"),
        (config.node = {
          fs: "empty",
        });

      // Include the compiler version of Vue so that wp-content works
      config.resolve.alias["vue$"] = "vue/dist/vue.esm.js";
    },
  },
};
