import { DocSearchHit } from '@docsearch/react/dist/esm/types';

let _internalATag: HTMLAnchorElement | null;

export function transformHitUrl(hitUrl: string) {
  _internalATag = _internalATag || document.createElement('a');
  // `new URL` is not supported in IE
  _internalATag.href = hitUrl;
  return `${_internalATag.pathname}${window.location.search || ''}${_internalATag.hash}`;
}

export const AlgoliaConfig = {
  appId: 'BH4D9OD16A',
  apiKey: '60ac2c1a7d26ab713757e4a081e133d0',
  indexName: 'ant_design',
  getSearchParams(isZhCN: boolean) {
    return { facetFilters: [`tags:${isZhCN ? 'cn' : 'en'}`] };
  },
  transformData(hits: DocSearchHit[]) {
    hits.forEach(hit => {
      hit.url = transformHitUrl(hit.url);
    });
    return hits;
  },
  debug: false, // Set debug to true if you want to inspect the dropdown
};

export type IAlgoliaConfig = typeof AlgoliaConfig;
