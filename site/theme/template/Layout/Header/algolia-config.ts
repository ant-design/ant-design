export const AlgoliaConfig = {
  appId: 'BH4D9OD16A',
  apiKey: '60ac2c1a7d26ab713757e4a081e133d0',
  indexName: 'ant_design',
  getSearchParams(isZhCN: boolean) {
    return { facetFilters: [`tags:${isZhCN ? 'cn' : 'en'}`] };
  },
  transformData(hits: { url: string }[]) {
    const a = document.createElement('a');
    hits.forEach(hit => {
      // `new URL` is not supported in IE
      a.href = hit.url;
      hit.url = `${a.pathname}${window.location.search || ''}${a.hash}`;
    });
    return hits;
  },
  debug: false, // Set debug to true if you want to inspect the dropdown
};

export type IAlgoliaConfig = typeof AlgoliaConfig;
