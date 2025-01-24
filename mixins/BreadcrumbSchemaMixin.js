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
          item: `https://shadowfoftales.ru${item.to}`,
        })),
      };
      return breadcrumbListSchema;
    },
  },
};
