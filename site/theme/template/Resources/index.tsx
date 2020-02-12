import * as React from 'react';
import collect from 'bisheng/collect';
import { useIntl } from 'react-intl';
import Article from '../Content/Article';
import * as utils from '../utils';

interface PageData {
  meta: {
    order?: number;
    title: string;
    filename: string;
  };
  content: any[];
  toc: any[];
}

interface PagesData {
  'docs/resources': {
    docs: {
      resources: {
        [locale: string]: () => Promise<PageData>;
      };
    };
  };
}

interface ResourcesProps {
  location: {
    pathname: string;
  };
  data: PagesData;
  localizedPageData: PageData;
  utils: {
    toReactComponent: (content: any[]) => React.ReactElement;
    get: (data: PagesData, path: string[]) => any;
  };
}

const Resources = (props: ResourcesProps) => {
  const { localizedPageData } = props;
  const { locale } = useIntl();

  return (
    <div>
      <Article {...props} content={localizedPageData} intl={{ locale }} />
    </div>
  );
};

export default collect(async (nextProps: ResourcesProps) => {
  const { pathname } = nextProps.location;
  const pageDataPath = pathname.replace('-cn', '').split('/');
  const pageData = nextProps.utils.get(nextProps.data, pageDataPath);

  const locale = utils.isZhCN(pathname) ? 'zh-CN' : 'en-US';
  const pageDataPromise = pageData[locale]();
  return { localizedPageData: await pageDataPromise };
})(Resources);
