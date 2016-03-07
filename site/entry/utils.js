import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import MainContent from '../component/MainContent';
import Article from '../component/Article';
import ComponentDoc from '../component/ComponentDoc';
import demosList from '../../_site/data/demos-list';

function dashed(name) {
  return name.toLowerCase().trim().replace(/\s+/g, '-');
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

export function generateContainer(category, data) {
  const menuItems = getMenuItems(data);
  return (props) => {
    return (
      <MainContent {...props}
        category={category} menuItems={menuItems} />
    );
  };
}

function getPagesData(data) {
  return Object.keys(data)
    .map((key) => data[key]);
}

export function generateChildren(data) {
  const pagesData = getPagesData(data);
  const menuItems = getMenuItems(data);
  const children = pagesData.map((pageData, index) => {
    const hasDemos = demosList[pageData.meta.fileName];
    const Wrapper = !hasDemos ?
            () => <Article content={pageData} /> :
          () => <ComponentDoc doc={pageData} />;
    return (
      <Route key={index}
        path={dashed(pageData.meta.english)}
        component={Wrapper} />
    );
  });
  const firstChild = menuItems.topLevel.topLevel.find((item) => {
    return item.disabled !== 'true';
  });
  children.unshift(
    <IndexRedirect key="index"
      to={dashed(firstChild.english)} />
  );
  return children;
}
