import { useRouteMeta } from 'dumi';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const CommonHelmet = () => {
  const meta = useRouteMeta();
  const helmetTitle = `${meta.frontmatter.subtitle || ''} ${meta.frontmatter.title} - Ant Design`;

  return (
    <Helmet>
      <title>{helmetTitle}</title>
      <meta property="og:title" content={helmetTitle} />
    </Helmet>
  );
};

export default CommonHelmet;
