import type { IApi } from 'dumi';
import { getBuildInfo } from './_utils';

let buildInfo: any;
(async () => {
  buildInfo = await getBuildInfo();
})();

export default (api: IApi) => {
  api.describe({
    key: 'antd-website',
  });

  api.addHTMLMetas(() => buildInfo);
};
