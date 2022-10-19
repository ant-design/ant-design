import React, { useState, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useAppData, useLocation, useRouteMeta } from 'dumi';
import { useIntl } from 'react-intl';
import debounce from 'lodash/debounce';
import { Input, Divider, Row, Col, Card, Typography, Tag, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getLocalizedPathname, getThemeConfig, getMenuItems } from '../../utils';
import ProComponentsList from './ProComponentsList';

const onClickCard = (pathname: string) => {
  if (window.gtag) {
    window.gtag('event', '点击', {
      event_category: '组件总览卡片',
      event_label: pathname,
    });
  }
};

const reportSearch = debounce<(value: string) => void>(value => {
  if (window.gtag) {
    window.gtag('event', '搜索', {
      event_category: '组件总览卡片',
      event_label: value,
    });
  }
}, 2000);

const { Title } = Typography;

const Overview: React.FC = () => {
  const meta = useRouteMeta();
  const location = useLocation();
  const { routes } = useAppData();
  const componentsList: any[] = [];
  Object.values(routes).forEach(component => {
    if ((component as any)?.meta?.frontmatter?.category === 'Components') {
      componentsList.push(component);
    }
  });
  const enList = [...componentsList, ...ProComponentsList].filter(item =>
    item?.id?.endsWith('.en-US'),
  );

  const cnList = [...componentsList, ...ProComponentsList].filter(item =>
    item?.id?.endsWith('.zh-CN'),
  );

  const cnComponentsData = cnList.map(({ meta = {} }) => {
    const { frontmatter = {}, subtitle = '', category = 'Components' } = meta as any;
    const { group, title, cover } = frontmatter;
    const type = typeof group === 'string' ? group : group?.title;
    return { meta: { category, subtitle, type, title, cover } };
  });

  const { locale, formatMessage } = useIntl();
  const documentTitle = `${meta.frontmatter.title} - Ant Design`;
  const { categoryOrder, typeOrder } = getThemeConfig();
  const menuItems = getMenuItems(cnComponentsData, locale, categoryOrder, typeOrder);

  const [search, setSearch] = useState<string>('');
  const sectionRef = React.useRef<HTMLElement>(null);
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.keyCode === 13 && search.trim().length) {
      sectionRef.current?.querySelector<HTMLElement>('.components-overview-card')?.click();
    }
  };

  return (
    <section className="markdown" ref={sectionRef}>
      <Helmet encodeSpecialCharacters={false}>
        <title>{documentTitle}</title>
        <meta property="og:title" content={documentTitle} />
      </Helmet>
      <h1>title</h1>
      <Divider />
      <Input
        value={search}
        placeholder={formatMessage({ id: 'app.components.overview.search' })}
        className="components-overview-search"
        onChange={e => {
          setSearch(e.target.value);
          reportSearch(e.target.value);
        }}
        onKeyDown={onKeyDown}
        autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        suffix={<SearchOutlined />}
      />
      <Divider />
      {menuItems
        .filter(i => i.order! > -1)
        .map(group => {
          const components = group?.children?.filter(
            component =>
              !search.trim() ||
              component.title.toLowerCase().includes(search.trim().toLowerCase()) ||
              ((component as any).subtitle || '')
                .toLowerCase()
                .includes(search.trim().toLowerCase()),
          );
          return components?.length ? (
            <div key={group.title} className="components-overview">
              <Title level={2} className="components-overview-group-title">
                <Space align="center">
                  {group.title}
                  <Tag style={{ display: 'block' }}>{components.length}</Tag>
                </Space>
              </Title>
              <Row gutter={[24, 24]}>
                {components
                  .sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
                  .map(component => {
                    const url = `${(component as any).filename
                      ?.replace(/(\/index)?((\.zh-cn)|(\.en-us))?\.md$/i, '')
                      ?.toLowerCase()}/`;

                    // 如果是 https 就不用处理了
                    const href = url.startsWith('http')
                      ? url
                      : getLocalizedPathname(url, locale === 'zh-CN', location.pathname);

                    /** Link 不能跳转到外链 */
                    const ComponentLink = !url.startsWith('http') ? Link : 'a';

                    return (
                      <Col xs={24} sm={12} lg={8} xl={6} key={component.title}>
                        <ComponentLink
                          to={href as any}
                          href={typeof href === 'string' ? href : href.pathname}
                          onClick={() => {
                            onClickCard((href as any).onClickCard);
                          }}
                        >
                          <Card
                            bodyStyle={{
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'bottom right',
                              backgroundImage: `url(${(component as any).tag})`,
                            }}
                            size="small"
                            className="components-overview-card"
                            title={
                              <div className="components-overview-title">
                                {component.title} {(component as any).subtitle}
                              </div>
                            }
                          >
                            <div className="components-overview-img">
                              <img src={(component as any).cover} alt={component.title} />
                            </div>
                          </Card>
                        </ComponentLink>
                      </Col>
                    );
                  })}
              </Row>
            </div>
          ) : null;
        })}
    </section>
  );
};

export default memo(Overview);
