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
  const firstChild = menuItems.topLevel.topLevel.filter((item) => !item.disabled)[0];
  return (
    <IndexRedirect key="index"
      to={fileNameToPath(firstChild.fileName)} />
  );
}

const pathToFile = {};
Object.keys(redirects).forEach((key) => pathToFile[redirects[key]] = key);
pathToFile['docs/react/changelog'] = './CHANGELOG'; // TODO

function getDoc(data, props) {
  const trimedPathname = props.location.pathname.replace(/^\//, '');
  const processedPathname = pathToFile[trimedPathname] || trimedPathname;
  const doc = data[`${processedPathname}.md`] ||
          data[`${processedPathname}/index.md`];
  return doc;
}

export function getChildrenWrapper(data) {
  return function childrenWrapper(props) {
    const doc = getDoc(data, props);
    const hasDemos = demosList[doc.meta.fileName];
    return !hasDemos ?
      <Article {...props} content={doc} /> :
      <ComponentDoc {...props} doc={doc} />;
  };
}

export function getEnterHandler(data) {
  return function handleEnter(nextState, replace) {
    const doc = getDoc(data, nextState);
    if (!doc) {
      replace('/404');
    }
  };
}
