import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';

const ComponentOverview = ({ componentsData = [] }) => {
  const { formatMessage } = useIntl();
  const documentTitle = `${formatMessage({
    id: 'app.docs.components.overview.title',
  })}} - Ant Design`;
  console.log(componentsData);
  return (
    <article>
      <Helmet encodeSpecialCharacters={false}>
        <title>{documentTitle}</title>
        <meta property="og:title" content={documentTitle} />
      </Helmet>
      <h1>
        <FormattedMessage id="app.docs.components.overview.title" />
      </h1>
      {componentsData.map(({ meta }) => (
        <div key={meta.title}>
          {meta.type}: {meta.title} {meta.subtitle}
          <img src={meta.cover} alt={meta.title} />
        </div>
      ))}
    </article>
  );
};

export default ComponentOverview;
