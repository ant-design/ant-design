import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'bisheng/router';
import { FormattedMessage, useIntl } from 'react-intl';
import * as utils from '../utils';

const ComponentOverview = ({ componentsData = [] }) => {
  const { formatMessage, locale } = useIntl();
  const documentTitle = `${formatMessage({
    id: 'app.docs.components.overview.title',
  })} - Ant Design`;
  return (
    <section className="markdown">
      <Helmet encodeSpecialCharacters={false}>
        <title>{documentTitle}</title>
        <meta property="og:title" content={documentTitle} />
      </Helmet>
      <h1>
        <FormattedMessage id="app.docs.components.overview.title" />
      </h1>
      <div className="components-overview">
        {componentsData.map(({ meta }) => {
          const url = meta.filename
            .replace(/(\/index)?((\.zh-cn)|(\.en-us))?\.md$/i, '')
            .toLowerCase();
          return (
            <div key={meta.title}>
              <Link to={utils.getLocalizedPathname(url, locale === 'zh-CN')}>
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
