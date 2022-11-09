import { useRouteMeta } from 'dumi';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

const CommonHelmet = () => {
  const meta = useRouteMeta();

  const [title, description] = useMemo(() => {
    const helmetTitle = `${meta.frontmatter.subtitle || ''} ${meta.frontmatter.title} - Ant Design`;
    let helmetDescription = meta.frontmatter.description;
    return [helmetTitle, helmetDescription];
  }, [meta]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
};

export default CommonHelmet;
