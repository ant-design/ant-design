import { useRouteMeta } from 'dumi';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

const CommonHelmet = () => {
  const meta = useRouteMeta();

  const [title, description] = useMemo(() => {
    const helmetTitle = `${meta.frontmatter.subtitle || ''} ${meta.frontmatter.title} - Ant Design`;
    let helmetDescription = '';
    for (const text of meta.texts) {
      if (text.paraId === 0) {
        helmetDescription += text.value;
      } else {
        // 不连贯的 paraId 0 不是同一段
        break;
      }
    }
    return [helmetTitle, helmetDescription.trim()];
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
