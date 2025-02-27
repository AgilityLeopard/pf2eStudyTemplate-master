export default {
  methods: {
    articleJsonLdSchema(post, image) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        datePublished: post.fields.publishedAt,
        dateModified: post.fields.modifiedAt,
        headline: post.fields.title,
        description: post.fields.description,
        image,
        author: {
          '@type': 'Person',
          name: post.fields.author,
        },
        "publisher": {
          "@type": "Organization",
          "name": "ShadowTales",
          "logo": {
            "@type": "ImageObject",
            "url": "shadowfoftales.ru/android-chrome-192x192.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "shadowfoftales.ru/posts"
        },
      };
    },
  },
};
