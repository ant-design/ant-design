import React, { useState, memo, useMemo } from 'react';
import { Link, useRouteMeta, useIntl, useSidebarData, Helmet } from 'dumi';
import { css } from '@emotion/react';
import debounce from 'lodash/debounce';
import { Input, Divider, Row, Col, Card, Typography, Tag, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import proComponentsList from './ProComponentsList';
import type { Component } from './ProComponentsList';
import useSiteToken from '../../../hooks/useSiteToken';

const useStyle = () => {
  const { token } = useSiteToken();

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
      color: ${token.colorTextHeading};
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
    componentsOverviewSearch: css`
      &${token.antCls}-input-affix-wrapper {
        width: 100%;
        padding: 0;
        font-size: 20px;
        border: 0;
        box-shadow: none;

        input {
          color: rgba(0, 0, 0, 0.85);
          font-size: 20px;
        }

        .anticon {
          color: #bbb;
        }
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

const reportSearch = debounce<(value: string) => void>((value) => {
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
  const data = useSidebarData();

  const { locale, formatMessage } = useIntl();
  const documentTitle = `${meta.frontmatter.title} - Ant Design`;

  const [search, setSearch] = useState<string>('');

  const sectionRef = React.useRef<HTMLElement>(null);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.keyCode === 13 && search.trim().length) {
      sectionRef.current?.querySelector<HTMLElement>('.components-overview-card')?.click();
    }
  };

  const groups = useMemo<{ title: string; children: Component[] }[]>(() => {
    return data
      .filter((item) => item.title)
      .map<{ title: string; children: Component[] }>((item) => {
        return {
          title: item.title!,
          children: item.children.map((child) => ({
            title: child.frontmatter.title,
            subtitle: child.frontmatter.subtitle,
            cover: child.frontmatter.cover,
            link: child.link,
          })),
        };
      })
      .concat([
        {
          title: locale === 'zh-CN' ? '重型组件' : 'Others',
          children:
            locale === 'zh-CN'
              ? proComponentsList.map((component) => ({ ...component, subtitle: '' }))
              : proComponentsList,
        },
      ]);
  }, [data, locale]);

  return (
    <section className="markdown" ref={sectionRef}>
      <Divider />
      <Input
        value={search}
        placeholder={formatMessage({ id: 'app.components.overview.search' })}
        css={style.componentsOverviewSearch}
        onChange={(e) => {
          setSearch(e.target.value);
          reportSearch(e.target.value);
        }}
        onKeyDown={onKeyDown}
        autoFocus // eslint-disable-line jsx-a11y/no-autofocus
        suffix={<SearchOutlined />}
      />
      <Divider />
      {groups
        .filter((i) => i.title)
        .map((group) => {
          const components = group?.children?.filter(
            (component) =>
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
                {components.map((component) => {
                  const url = `${component.link}/`;

                  /** Link 不能跳转到外链 */
                  const ComponentLink = !url.startsWith('http') ? Link : 'a';

                  return (
                    <Col xs={24} sm={12} lg={8} xl={6} key={component.title}>
                      <ComponentLink to={url} href={url} onClick={() => onClickCard(url)}>
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
                              {component.title} {component.subtitle}
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
