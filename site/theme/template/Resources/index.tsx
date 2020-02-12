import * as React from 'react';
import { useIntl } from 'react-intl';
import Article from '../Content/Article';

interface PageData {
  meta: {
    order?: number;
    title: string;
    filename: string;
  };
  content: any[];
  toc: any[];
}

interface ResourcesProps {
  location: {
    pathname: string;
  };
  data: {
    'docs/resources': {
      docs: {
        resources: {
          [locale: string]: () => Promise<PageData>;
        };
      };
    };
  };
  utils: {
    toReactComponent: (content: any[]) => React.ReactElement;
  };
}

const Resources = (props: ResourcesProps) => {
  const { locale } = useIntl();
  const { data } = props;
  const [pageData, setPageData] = React.useState<PageData | null>(null);

  React.useEffect(() => {
    data['docs/resources'].docs.resources[locale]().then(localeData => {
      setPageData(localeData);
    });
  }, [data, locale]);

  if (pageData) {
    return (
      <div>
        <Article {...props} content={pageData} intl={{ locale }} />
      </div>
    );
  }

  return <div>null</div>;
};

export default Resources;
