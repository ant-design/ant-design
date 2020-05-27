import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'bisheng/router';
import { useIntl } from 'react-intl';
import { Divider } from 'antd';
import { getChildren } from 'jsonml.js/lib/utils';
import { getMetaDescription, getLocalizedPathname } from '../utils';

const ComponentOverview = ({
  componentsData = [],
  doc: {
    meta: { title },
    content,
  },
  utils: { toReactComponent },
}) => {
  const { locale } = useIntl();
  const documentTitle = `${title} - Ant Design`;
  const contentChild = getMetaDescription(getChildren(content));
  return (
    <section className="markdown">
      <Helmet encodeSpecialCharacters={false}>
        <title>{documentTitle}</title>
        <meta property="og:title" content={documentTitle} />
        {contentChild && <meta name="description" content={contentChild} />}
      </Helmet>
      <h1>{title}</h1>
      {toReactComponent(['section', { className: 'markdown' }].concat(getChildren(content)))}
      <Divider />
      <div className="components-overview">
        {componentsData.map(({ meta }) => {
          const url = meta.filename
            .replace(/(\/index)?((\.zh-cn)|(\.en-us))?\.md$/i, '')
            .toLowerCase();
          return (
            <div key={meta.title}>
              <Link to={getLocalizedPathname(url, locale === 'zh-CN')}>
                {meta.type}: {meta.title} {meta.subtitle}
                <img src={meta.cover} alt={meta.title} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ComponentOverview;
