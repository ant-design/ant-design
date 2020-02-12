import * as React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Article from '../Content/Article';
import * as utils from '../utils';

interface PageData {
  meta: {
    order?: number;
    title?: string;
    filename?: string;
  };
  content: [];
}

interface ResourcesProps {
  data: {
    'docs/resources': {
      docs: {
        resources: {
          [locale: string]: () => Promise<PageData>;
        };
      };
    };
  };
}

const Resources = (props: ResourcesProps) => {
  const { locale } = useIntl();
  const { data } = props;
  const [pageData, setPageData] = React.useState<PageData>({ meta: {} });
  console.log(locale, '==>', props);

  React.useEffect(() => {
    data['docs/resources'].docs.resources[locale]().then(localeData => {
      setPageData(localeData);
      console.log('PD:', localeData);
    });
  }, [data, locale]);

  return <h2>2333s</h2>;
};

export default Resources;
