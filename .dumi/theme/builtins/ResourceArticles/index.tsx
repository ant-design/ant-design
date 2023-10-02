/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Suspense } from 'react';
import dayjs from 'dayjs';
import { FormattedMessage } from 'dumi';
import { createStyles } from 'antd-style';
import { Avatar, Divider, Empty, Skeleton, Tabs } from 'antd';
import type { Article, Authors } from '../../../pages/index/components/util';
import { useSiteData } from '../../../pages/index/components/util';
import useLocale from '../../../hooks/useLocale';

const useStyle = createStyles(({ token, css }) => {
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      ${antCls}-avatar > img {
        max-width: unset;
      }
    `,
  };
});

interface ArticleListProps {
  name: React.ReactNode;
  data: Article[];
  authors: Authors;
}

const ArticleList: React.FC<ArticleListProps> = ({ name, data = [], authors = [] }) => {
  const { styles } = useStyle();
  return (
    <td>
      <h4>{name}</h4>
      <ul className={styles.articleList}>
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

const Articles: React.FC = () => {
  const [, lang] = useLocale();
  const isZhCN = lang === 'cn';
  const { articles = { cn: [], en: [] }, authors = [] } = useSiteData();

  // ========================== Data ==========================
  const mergedData = React.useMemo(() => {
    const yearData: Record<number | string, Record<string, Article[]>> = {};
    articles[lang]?.forEach((article) => {
      const year = dayjs(article.date).year();
      yearData[year] = yearData[year] || {};
      yearData[year][article.type] = [...(yearData[year][article.type] || []), article];
    });
    return yearData;
  }, [articles]);

  const yearList = Object.keys(mergedData).sort((a, b) => Number(b) - Number(a));

  if (yearList.length === 0) {
    return null;
  }

  return (
    <Tabs
      items={yearList.map((year) => ({
        key: year,
        label: `${year}${isZhCN ? ' 年' : ''}`,
        children: (
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
        ),
      }))}
    />
  );
};

export default () => {
  const { styles } = useStyle();
  return (
    <div id="articles" className={styles.articles}>
      <Suspense fallback={<Skeleton active />}>
        <Articles />
      </Suspense>
    </div>
  );
};
