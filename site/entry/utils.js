import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import MainContent from '../component/MainContent';
import Article from '../component/Article';
import ComponentDoc from '../component/ComponentDoc';

function dashed(name) {
  return name.toLowerCase().trim().replace(/\s+/g, '-');
}

export function generateContainer(category, menuItems) {
  return (props) => {
    return (
      <MainContent {...props}
        category={category} menuItems={menuItems} />
    );
  };
}

export function generateChildren({ pagesData, menuItems }) {
  const children = pagesData.map((pageData, index) => {
    const Wrapper = pageData.demos === null ?
            () => <Article content={pageData} /> :
          () => <ComponentDoc doc={pageData} demos={pageData.demos} />;
    return (
      <Route key={index}
        path={dashed(pageData.meta.english)}
        component={Wrapper} />
    );
  });
  const firstChild = menuItems.topLevel.find((item) => {
    return item.disabled !== 'true';
  });
  children.unshift(
    <IndexRedirect key="index"
      to={dashed(firstChild.english)} />
  );
  return children;
}
