import React from 'react';
import Promise from 'bluebird';
import MainContent from './MainContent';
import * as utils from '../utils';

export function collect(nextProps, callback) {
  const pathname = nextProps.location.pathname;
  const locale = utils.isZhCN(pathname) ? 'zh-CN' : 'en-US';
  const pageDataPath = pathname.replace('-cn', '').split('/');
  let pageData = nextProps.pageData;
  if (!pageData && locale === 'zh-CN') {
    pageData = nextProps.utils.get(nextProps.data, pageDataPath);
  }
  if (!pageData) {
    callback(404, nextProps);
    return;
  }

  const pageDataPromise = typeof pageData === 'function' ?
          pageData() : (pageData[locale] || pageData.index[locale] || pageData.index)();
  const promises = [pageDataPromise];

  const demos = nextProps.utils.get(nextProps.data, [...pageDataPath, 'demo']);
  if (demos) {
    promises.push(demos());
  }
  Promise.all(promises)
    .then(list => callback(null, {
      ...nextProps,
      localizedPageData: list[0],
      demos: list[1],
    }));
}

export default (props) => {
  return <MainContent {...props} />;
};
