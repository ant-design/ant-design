import * as React from 'react';
import collect from 'bisheng/collect';
import { useIntl } from 'react-intl';
import Article from '../Content/Article';
import * as utils from '../utils';
import './index.less';

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

type ContentUnit = string | Record<string, string> | ContentUnit[];

function getUnitString(unit: ContentUnit[]): string {
  const last = unit[unit.length - 1];
  return Array.isArray(last) ? getUnitString(last) : (last as string);
}

function toList([, ...items]: ContentUnit[]) {
  return [
    'div',
    { className: 'ant-row resource-cards', style: 'margin-left: -12px; margin-right: -12px;' },
    ...items.map(([, title, [, image, description]]: any) => {
      const titleStr = getUnitString(title);
      const imageStr = getUnitString(image);
      const descStr = getUnitString(description);
      return [
        'div',
        {
          className: 'ant-col ant-col-6 gutter-row',
          style: 'padding-left: 12px; padding-right: 12px;',
        },
        [
          'div',
          { className: 'resource-card' },
          [
            'img',
            {
              className: 'resource-card-image',
              src: imageStr,
              alt: titleStr,
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
  const newContent: ContentUnit = [];
  console.log('>>>', content);

  for (let i = 0; i < content.length; i += 1) {
    const unit = content[i];

    if (Array.isArray(unit) && (unit[1] as any).class === 'next-block-use-cards') {
      console.log('Bingo!', content[i + 1]);
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
      <Article
        {...props}
        content={{
          ...localizedPageData,
          content,
        }}
        intl={{ locale }}
        titleRegionClassName="title-region"
      />
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
