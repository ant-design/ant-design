import React from 'react';
import { IndexRedirect } from 'react-router';
import MainContent from '../component/MainContent';
import Article from '../component/Article';
import ComponentDoc from '../component/ComponentDoc';
import demosList from '../../_data/demos-list';
import { redirects } from '../website.config';

if (module.hot) {
  module.hot.accept('../../_data/demos-list', () => {});
}

function fileNameToPath(fileName) {
  const snippets = fileName.replace(/(\/index)?\.md$/i, '').split('/');
  return snippets[snippets.length - 1];
}

function getMenuItems(data) {
  const menuMeta = Object.keys(data)
          .map((key) => data[key])
          .map((file) => file.meta);

  const menuItems = {};
  menuMeta.sort((a, b) => {
    return parseInt(a.order, 10) - parseInt(b.order, 10);
  }).forEach((meta) => {
    const category = meta.category || 'topLevel';
    if (!menuItems[category]) {
      menuItems[category] = {};
    }

    const type = meta.type || 'topLevel';
    if (!menuItems[category][type]) {
      menuItems[category][type] = [];
    }

    menuItems[category][type].push(meta);
  });

  return menuItems;
}

export function generateContainer(data) {
  const menuItems = getMenuItems(data);
  return (props) => {
    return (
      <MainContent {...props} menuItems={menuItems} />
    );
  };
}

export function generateIndex(data) {
  const menuItems = getMenuItems(data);
  const firstChild = menuItems.topLevel.topLevel.filter((item) => {
    return item.disabled !== 'true';
  })[0];
  return (
    <IndexRedirect key="index"
      to={fileNameToPath(firstChild.fileName)} />
  );
}

const pathToFile = {};
Object.keys(redirects).forEach((key) => pathToFile[redirects[key]] = key);
pathToFile['components/changelog'] = './CHANGELOG'; // TODO
export function getChildrenWrapper(data) {
  return function childrenWrapper(props) {
    const trimedPathname = props.location.pathname.replace(/^\//, '');
    const processedPathname = pathToFile[trimedPathname] || trimedPathname;
    const doc = data[`${processedPathname}.md`] ||
            data[`${processedPathname}/index.md`];
    const hasDemos = demosList[doc.meta.fileName];
    return !hasDemos ?
      <Article {...props} content={doc} /> :
      <ComponentDoc {...props} doc={doc} />;
  };
}
