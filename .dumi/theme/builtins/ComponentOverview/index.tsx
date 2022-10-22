import React, { useState, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useAppData, useLocation, useRouteMeta } from 'dumi';
import { css } from '@emotion/react';
import { useIntl } from 'react-intl';
import debounce from 'lodash/debounce';
import { Input, Divider, Row, Col, Card, Typography, Tag, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getLocalizedPathname, getThemeConfig, getMenuItems } from '../../utils';
import cnProComponentsList from './ProComponentsList';

const useStyle = () => {
  return {
    componentsOverview: css`
      padding: 0;
    `,
    componentsOverviewGroupTitle: css`
      font-size: 24px;
      margin-bottom: 24px !important;
    `,
    componentsOverviewTitle: css`
      overflow: hidden;
      color: '#000000d9';
      text-overflow: ellipsis;
    `,
    componentsOverviewImg: css`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 152px;
    `,
    componentsOverviewCard: css`
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        box-shadow: 0 6px 16px -8px #00000014, 0 9px 28px #0000000d, 0 12px 48px 16px #00000008;
      }
    `,
  };
};

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
  const style = useStyle();
  const meta = useRouteMeta();
  const location = useLocation();
  const { routes } = useAppData();
  const componentsList: any[] = [];
  Object.values(routes).forEach(component => {
    if ((component as any)?.meta?.frontmatter?.category === 'Components') {
      componentsList.push(component);
    }
  });

  // const enList = componentsList.filter(item => item?.id?.endsWith('.en-US'));

  const cnList = componentsList.filter(item => item?.id?.endsWith('.zh-CN'));

  const cnComponentsData = cnList.map(({ meta, path }) => {
    const { frontmatter = {} } = meta;
    const { group, title, cover, subtitle = '', category } = frontmatter;
    const type = typeof group === 'string' ? group : group?.title;
    return { meta: { category, subtitle, type, title, cover, path } };
  });

  const { locale, formatMessage } = useIntl();
  const documentTitle = `${meta.frontmatter.title} - Ant Design`;
  const { categoryOrder, typeOrder } = getThemeConfig();
  const menuItems = getMenuItems(
    [...cnComponentsData, ...cnProComponentsList],
    locale,
    categoryOrder,
    typeOrder,
  );

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
      <h1>Components Overview</h1>
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
        .filter(i => i.order! > -1 && i.type !== 'category')
        .map(group => {
          const components = group?.children?.filter(
            component =>
              !search.trim() ||
              component.title.toLowerCase().includes(search.trim().toLowerCase()) ||
              (component?.subtitle || '').toLowerCase().includes(search.trim().toLowerCase()),
          );
          return components?.length ? (
            <div key={group.title} css={style.componentsOverview}>
              <Title level={2} css={style.componentsOverviewGroupTitle}>
                <Space align="center">
                  <span style={{ fontSize: 24 }}>{group.title}</span>
                  <Tag style={{ display: 'block' }}>{components.length}</Tag>
                </Space>
              </Title>
              <Row gutter={[24, 24]}>
                {components
                  .sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
                  .map(component => {
                    const url = `${component.path
                      ?.replace(/(\/index)?((\.zh-cn)|(\.en-us))?\.md$/i, '')
                      ?.toLowerCase()}/`;

                    // 如果是 https 就不用处理了
                    const href = url.startsWith('http')
                      ? url
                      : getLocalizedPathname(url, locale === 'zh-CN', location.pathname);

                    /** Link 不能跳转到外链 */
                    const ComponentLink = !url.startsWith('http') ? Link : 'a';

                    const linkHref = typeof href === 'string' ? href : href.pathname;

                    return (
                      <Col xs={24} sm={12} lg={8} xl={6} key={component.title}>
                        <ComponentLink
                          to={linkHref}
                          href={linkHref}
                          onClick={() => onClickCard(linkHref)}
                        >
                          <Card
                            bodyStyle={{
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'bottom right',
                              backgroundImage: `url(${component?.tag || ''})`,
                            }}
                            size="small"
                            css={style.componentsOverviewCard}
                            title={
                              <div css={style.componentsOverviewTitle}>
                                {component.title} {component?.subtitle}
                              </div>
                            }
                          >
                            <div css={style.componentsOverviewImg}>
                              <img src={component.cover} alt={component.title} />
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
