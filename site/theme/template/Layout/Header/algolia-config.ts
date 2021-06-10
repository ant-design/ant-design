import { DocSearchHit } from '@docsearch/react/dist/esm/types';

export const Algolia_Config = {
  appId: 'BH4D9OD16A',
  apiKey: '60ac2c1a7d26ab713757e4a081e133d0',
  indexName: 'ant_design',
  getSearchParams(isZhCN: boolean) {
    return { facetFilters: [`tags:${isZhCN ? 'cn' : 'en'}`] };
  },
  transformData(hits: DocSearchHit[]) {
    hits.forEach(hit => {
      hit.url = hit.url.replace('ant.design', window.location.host);
      hit.url = hit.url.replace('https:', window.location.protocol);
    });
    return hits;
  },
  debug: false, // Set debug to true if you want to inspect the dropdown
};

export type IAlgoliaConfig = typeof Algolia_Config;
