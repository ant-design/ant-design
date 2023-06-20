import { css } from '@emotion/react';
import { Button, Card } from 'antd';
import React from 'react';
import useLocale from '../../../hooks/useLocale';
import useSiteToken from '../../../hooks/useSiteToken';

const ANTD_IMG_URL =
  'https://picx.zhimg.com/v2-3b2bca09c2771e7a82a81562e806be4d_200x0.jpg?source=d16d100b';

const useStyle = () => {
  const { token } = useSiteToken();
  return {
    card: css`
      width: 100%;
      margin: 40px 0;
      transition: all 0.2s;
      background-color: ${token.siteMarkdownCodeBg};
      &:hover {
        border-color: transparent;
        box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12),
          0 5px 12px 4px rgba(0, 0, 0, 0.1);
      }
    `,
    bigTitle: css`
      font-size: 16px;
      color: #121212;
      margin-bottom: 24px;
      font-weight: 500;
    `,
    cardBody: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `,
    left: css`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 200px;
        margin-right: 24px;
        overflow: hidden;
        border-radius: 8px;
      }
    `,
    title: css`
      color: #444;
      font-size: 16px;
      font-weight: 600;
    `,
    subTitle: css`
      color: #646464;
      font-size: 14px;
      font-weight: 400;
      margin-top: 8px;
    `,
  };
};

const locales = {
  cn: {
    bigTitle: '文章被收录于专栏：',
    subTitle: '一个 UI 设计体系',
    buttonText: '我有想法，去专栏参与讨论',
  },
  en: {
    bigTitle: 'Articles are included in the column:',
    subTitle: 'A UI design system',
    buttonText: 'go to discuss',
  },
};

interface Props {
  link?: string;
}

const ZhihuCard: React.FC<Props> = ({ link }) => {
  const [locale] = useLocale(locales);
  const { card, bigTitle, cardBody, left, title, subTitle } = useStyle();
  if (!link) {
    return null;
  }
  return (
    <Card css={card}>
      <h3 css={bigTitle}>{locale.bigTitle}</h3>
      <div css={cardBody}>
        <div css={left}>
          <img src={ANTD_IMG_URL} alt="antd" />
          <div>
            <p css={title}>Ant Design</p>
            <p css={subTitle}>{locale.subTitle}</p>
          </div>
        </div>
        <Button type="primary" href={link}>
          {locale.buttonText}
        </Button>
      </div>
    </Card>
  );
};

export default ZhihuCard;
