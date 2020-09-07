import * as React from 'react';
import collect from 'bisheng/collect';
import { useIntl } from 'react-intl';
import Article from '../Content/Article';
import Footer from '../Layout/Footer';
import * as utils from '../utils';
import './index.less';
import AffixTabs from './AffixTabs';

type ContentUnit = string | Record<string, any> | ContentUnit[];

interface PageData {
  meta: {
    order?: number;
    title: string;
    filename: string;
  };
  content: ContentUnit[];
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

function getUnitString(unit: ContentUnit[]): string {
  if (!unit) return '';

  const last = unit[unit.length - 1];
  return Array.isArray(last) ? getUnitString(last) : (last as string);
}

function toList([, ...items]: ContentUnit[]): ContentUnit[] {
  return [
    'div',
    { className: 'ant-row resource-cards', style: 'margin: -12px -12px 0 -12px' },
    ...items.map(([, title, [, image, description, link]]: any) => {
      let titleStr = getUnitString(title);
      const imageStr = getUnitString(image);
      const descStr = getUnitString(description);
      const linkStr = getUnitString(link);

      let coverColor: string | null = null;
      const titleMatch = titleStr.match(/(.*)(#[\dA-Fa-f]{6})/);
      if (titleMatch) {
        titleStr = titleMatch[1].trim();
        // eslint-disable-next-line prefer-destructuring
        coverColor = titleMatch[2];
      }

      return [
        'div',
        {
          className: 'ant-col ant-col-xs-24 ant-col-sm-12 ant-col-md-8 ant-col-lg-6 gutter-row',
          style: 'padding: 12px;',
        },
        [
          'a',
          { className: 'resource-card', target: '_blank', href: linkStr },
          [
            'img',
            {
              className: 'resource-card-image',
              src: imageStr,
              alt: titleStr,
              style: coverColor
                ? {
                    backgroundColor: coverColor,
                    objectFit: 'contain',
                  }
                : {},
            },
          ],
          ['p', { className: 'resource-card-title' }, titleStr],
          ['p', { className: 'resource-card-description' }, descStr],
        ],
      ];
    }),
  ];
}

function injectCards(content: ContentUnit[]): ContentUnit[] {
  const newContent: ContentUnit[] = [];

  for (let i = 0; i < content.length; i += 1) {
    const unit = content[i];

    if (Array.isArray(unit) && (unit[1] as any).class === 'next-block-use-cards') {
      newContent.push(toList(content[i + 1] as any));

      i += 1;
    } else {
      newContent.push(unit);
    }
  }

  return newContent;
}

const Resources = (props: ResourcesProps) => {
  const { localizedPageData } = props;
  const { locale } = useIntl();

  const content = React.useMemo(() => injectCards(localizedPageData.content), [
    localizedPageData.content,
  ]);

  return (
    <div id="resources-page">
      <AffixTabs />

      <Article
        {...props}
        content={{
          ...localizedPageData,
          content,
        }}
        intl={{ locale }}
        titleRegionClassName="title-region"
      />

      <Footer />
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
