import type { IApi } from 'dumi';

import buildAssetsPlugin from './plugins/build-assets';
import routesPlugin from './plugins/routes';
import techStackPlugin from './plugins/tech-stack';

export default async function plugin(api: IApi) {
  techStackPlugin(api);
  routesPlugin(api);
  await buildAssetsPlugin(api);
}
