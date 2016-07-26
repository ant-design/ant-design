import React from 'react';
import MainContent from './MainContent';
import Promise from 'bluebird';
import * as utils from '../utils';

export function collect(nextProps, callback) {
  const componentsList = utils.collectDocs(nextProps.data.components);

  const pathname = nextProps.location.pathname;
  let moduleDocs;
  if (/(docs\/react\/)|(components\/)|(changelog)/i.test(pathname)) {
    moduleDocs = [
      ...utils.collectDocs(nextProps.data.docs.react),
      ...componentsList,
      /* eslint-disable new-cap */
      nextProps.data.CHANGELOG(),
      /* eslint-enable new-cap */
    ];
  } else {
    moduleDocs = utils.collectDocs(
      nextProps.utils.get(nextProps.data, pathname.split('/').slice(0, 2))
    );
  }

  const demos = nextProps.utils.get(nextProps.data, [...pathname.split('/'), 'demo']);

  const promises = [Promise.all(componentsList), Promise.all(moduleDocs)];
  if (demos) {
    promises.push(Promise.all(
      Object.keys(demos).map((key) => demos[key]())
    ));
  }
  Promise.all(promises)
    .then((list) => callback(null, {
      ...nextProps,
      components: list[0],
      moduleData: list[1],
      demos: list[2],
    }));
}

export default (props) => {
  return <MainContent {...props} />;
};
