import type { IApi } from 'dumi';

import buildAssetsPlugin from './plugins/build-assets';
import rawMdPlugin from './plugins/raw-md';
import routesPlugin from './plugins/routes';
import semanticMdPlugin from './plugins/semantic-md';
import techStackPlugin from './plugins/tech-stack';

export default async function plugin(api: IApi) {
  techStackPlugin(api);
  routesPlugin(api);
  await buildAssetsPlugin(api);
  rawMdPlugin(api);
  semanticMdPlugin(api);
}
