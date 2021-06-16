/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import moment from 'moment';
import { FormattedMessage, useIntl } from 'react-intl';
import { Tabs, Skeleton, Avatar, Divider, Empty } from 'antd';
import { useSiteData } from '../../Home/util';
import './index.less';

interface Author {
  avatar: string;
  href: string;
  type: 'design' | 'develop';
  name: string;
}

interface Article {
  title: string;
  href: string;
  date: string;
  type: 'design' | 'develop';
  author: Author['name'];
}

interface Articles {
  cn: Article[];
  en: Article[];
}

type Authors = Author[];

interface ArticleListProps {
  name: React.ReactNode;
  data: Article[];
  authors: Authors;
}

const ArticleList: React.FC<ArticleListProps> = ({ name, data = [], authors = [] }) => (
  <td>
    <h4>{name}</h4>
    <ul className="article-list">
      {data.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        data.map((article, index) => {
          const author = authors.find(auth => auth.name === article.author);
          return (
            <li key={index}>
              <a href={author?.href} target="_blank" rel="noreferrer">
                <Avatar size="small" src={author?.avatar} />
              </a>
              <Divider type="vertical" />
              <a href={article.href} target="_blank" rel="noreferrer">
                {article.title}
              </a>
            </li>
          );
        })
      )}
    </ul>
  </td>
);

export default () => {
  const { locale } = useIntl();
  const isZhCN = locale === 'zh-CN';
  const [{ articles = { cn: [], en: [] }, authors = [] }, loading] =
    useSiteData<{ articles: Articles; authors: Authors }>();

  // ========================== Data ==========================
  const mergedData = React.useMemo(() => {
    const yearData: Record<number | string, Record<string, Article[]>> = {};
    articles[isZhCN ? 'cn' : 'en']?.forEach(article => {
      const year = moment(article.date).year();
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
        {yearList.map(year => (
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
    <div id="articles" className="antd-articles">
      {content}
    </div>
  );
};
