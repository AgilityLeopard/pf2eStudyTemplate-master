export default {
  methods: {
    articleJsonLdSchema(post, image) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        datePublished: post.publishedAt,
        dateModified: post.modifiedAt,
        headline: post.title,
        description: post.description,
        image,
        author: {
          '@type': 'Person',
          name: post.author,
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
