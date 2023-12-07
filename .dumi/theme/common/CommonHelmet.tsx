import { useRouteMeta, Helmet } from 'dumi';
import React, { useMemo } from 'react';

const CommonHelmet = () => {
  const meta = useRouteMeta();

  const [title, metas] = useMemo(() => {
    let helmetTitle;
    if (!meta.frontmatter.subtitle && !meta.frontmatter.title) {
      helmetTitle = '404 Not Found - Ant Design';
    } else {
      helmetTitle = `${meta.frontmatter.subtitle || ''} ${
        meta.frontmatter?.title || ''
      } - Ant Design`;
    }
    const helmetDescription = meta.frontmatter.description || '';
    const helmetMetas: JSX.IntrinsicElements['meta'][] = [
      {
        property: 'og:title',
        content: title,
      },
    ];
    if (helmetDescription) {
      helmetMetas.push({
        name: 'description',
        content: helmetDescription,
      });
    }

    return [helmetTitle, helmetMetas];
  }, [meta]);

  return <Helmet title={title} meta={metas} />;
};

export default CommonHelmet;
