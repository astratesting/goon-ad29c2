export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Goon',
    url: 'https://goon.so',
    description:
      'Goon turns one paragraph about your business into a polished, conversion-tested landing page in under a minute.',
    foundingDate: '2025',
    sameAs: [],
  };
}

export function buildWebPageJsonLd(title: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    publisher: {
      '@type': 'Organization',
      name: 'Goon',
      url: 'https://goon.so',
    },
  };
}
