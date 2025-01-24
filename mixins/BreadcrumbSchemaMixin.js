export default {
  methods: {
    breadcrumbJsonLdSchema(items) {
      const breadcrumbListSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: (index === 0 ? 'Shadow Tales' : item.text),
          item: `https://pf2e-builder-ru.netlify.app${item.to}`,
        })),
      };
      return breadcrumbListSchema;
    },
  },
};
