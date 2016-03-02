import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Article from '../component/Article';

export function generateChildren(pagesData) {
  const children = pagesData.map((pageData, index) => {
    const ArticleWrapper = () => <Article content={pageData} />;
    return (
      <Route key={index}
        path={pageData.meta.english.toLowerCase()}
        component={ArticleWrapper} />
    );
  });
  const firstChild = pagesData.find((pageData) => {
    return pageData.meta.disabled !== 'true';
  });
  children.unshift(
    <IndexRedirect key="index"
      to={firstChild.meta.english.toLowerCase()} />
  );
  return children;
}
