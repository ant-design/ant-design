/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'dumi';
import { Tabs, Skeleton, Avatar, Divider, Empty } from 'antd';
import { css } from '@emotion/react';
import { useSiteData } from '../../../pages/index/components/util';
import type { Article, Authors } from '../../../pages/index/components/util';
import useSiteToken from '../../../hooks/useSiteToken';

const useStyle = () => {
  const { token } = useSiteToken();
  const { antCls } = token;

  return {
    articles: css`
      h4 {
        margin: 40px 0 24px;
        font-weight: 500;
        font-size: 20px;
      }

      ${antCls}-skeleton {
        h3 {
          margin: 0;
        }

        ul li {
          display: block;
          margin-left: 0;
        }
      }

      ${antCls}-tabs-nav::before {
        display: none;
      }

      table {
        width: 100%;
        table-layout: fixed;

        td {
          width: 50%;
          vertical-align: top;
        }
      }
    `,
    articleList: css`
      li {
        margin: 1em 0;
        padding: 0;
        font-size: 14px;
        list-style: none;
      }

      ${antCls}-avatar > img {
        max-width: unset;
      }
    `,
  };
};

interface ArticleListProps {
  name: React.ReactNode;
  data: Article[];
  authors: Authors;
}

const ArticleList: React.FC<ArticleListProps> = ({ name, data = [], authors = [] }) => {
  const { articleList } = useStyle();
  return (
    <td>
      <h4>{name}</h4>
      <ul css={articleList}>
        {data.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          data.map((article, index) => {
            const author = authors.find((auth) => auth.name === article.author);
            return (
              <li key={index}>
                <a href={author?.href} target="_blank" rel="noreferrer">
                  <Avatar size="small" src={author?.avatar} />
                </a>
                <Divider type="vertical" />
                <a href={article.href} target="_blank" rel="noreferrer">
                  {article?.title}
                </a>
              </li>
            );
          })
        )}
      </ul>
    </td>
  );
};

export default () => {
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';
  const [{ articles = { cn: [], en: [] }, authors = [] }, loading] = useSiteData();

  const styles = useStyle();

  // ========================== Data ==========================
  const mergedData = React.useMemo(() => {
    const yearData: Record<number | string, Record<string, Article[]>> = {};
    articles[isZhCN ? 'cn' : 'en']?.forEach((article) => {
      const year = dayjs(article.date).year();
      yearData[year] = yearData[year] || {};
      yearData[year][article.type] = [...(yearData[year][article.type] || []), article];
    });
    return yearData;
  }, [articles]);

  // ========================= Render =========================
  let content: React.ReactNode;

  if (loading) {
    content = <Skeleton active />;
  } else {
    const yearList = Object.keys(mergedData).sort((a, b) => Number(b) - Number(a));
    content = yearList.length ? (
      <Tabs>
        {yearList.map((year) => (
          <Tabs.TabPane tab={`${year}${isZhCN ? ' 年' : ''}`} key={year}>
            <table>
              <tbody>
                <tr>
                  <ArticleList
                    name={<FormattedMessage id="app.docs.resource.design" />}
                    data={mergedData[year].design}
                    authors={authors}
                  />
                  <ArticleList
                    name={<FormattedMessage id="app.docs.resource.develop" />}
                    data={mergedData[year].develop}
                    authors={authors}
                  />
                </tr>
              </tbody>
            </table>
          </Tabs.TabPane>
        ))}
      </Tabs>
    ) : null;
  }

  return (
    <div id="articles" css={styles.articles}>
      {content}
    </div>
  );
};
