import { useRouteMeta } from 'dumi';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

const CommonHelmet = () => {
  const meta = useRouteMeta();

  const [title] = useMemo(() => {
    const helmetTitle = `${meta.frontmatter.subtitle || ''} ${meta.frontmatter.title} - Ant Design`;
    const helmetDescription =
      meta.texts
        ?.filter(item => item.paraId === 0)
        .map(item => item.value)
        .join('') || '';
    return [helmetTitle, helmetDescription];
  }, [meta]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
    </Helmet>
  );
};

export default CommonHelmet;
