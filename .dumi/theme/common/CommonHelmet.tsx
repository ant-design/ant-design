import React from 'react';
import { Helmet, useRouteMeta } from 'dumi';

const CommonHelmet: React.FC = () => {
  const meta = useRouteMeta();

  const [title, description] = React.useMemo<[string, string]>(() => {
    let helmetTitle: string;
    if (!meta.frontmatter.subtitle && !meta.frontmatter.title) {
      helmetTitle = '404 Not Found - Ant Design';
    } else {
      helmetTitle = `${meta.frontmatter.subtitle || ''} ${
        meta.frontmatter?.title || ''
      } - Ant Design`;
    }
    const helmetDescription = meta.frontmatter.description || '';
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
