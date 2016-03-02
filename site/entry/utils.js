import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Article from '../component/Article';

function dashed(name) {
  return name.toLowerCase().trim().replace(/\s+/g, '-');
}

export function generateChildren(pagesData) {
  const children = pagesData.map((pageData, index) => {
    const ArticleWrapper = () => <Article content={pageData} />;
    return (
      <Route key={index}
        path={dashed(pageData.meta.english)}
        component={ArticleWrapper} />
    );
  });
  const firstChild = pagesData.find((pageData) => {
    return pageData.meta.disabled !== 'true';
  });
  children.unshift(
    <IndexRedirect key="index"
      to={dashed(firstChild.meta.english)} />
  );
  return children;
}
