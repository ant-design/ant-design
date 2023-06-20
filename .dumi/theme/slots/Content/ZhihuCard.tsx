import { css } from '@emotion/react';
import { Button, Card } from 'antd';
import React from 'react';

const ANTD_IMG_URL =
  'https://picx.zhimg.com/v2-3b2bca09c2771e7a82a81562e806be4d_200x0.jpg?source=d16d100b';

const useStyle = () => ({
  card: css`
    width: 100%;
    margin: 40px 0;
    transition: all 0.2s;
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
    font-size: 15px;
    font-weight: 600;
  `,
  subTitle: css`
    color: #646464;
    font-size: 14px;
    font-weight: 400;
    margin-top: 8px;
  `,
});

interface Props {
  link?: string;
}

const ZhihuCard: React.FC<Props> = ({ link }) => {
  const { card, bigTitle, cardBody, left, title, subTitle } = useStyle();
  if (!link) {
    return null;
  }
  return (
    <Card css={card}>
      <h3 css={bigTitle}>文章被收录于专栏：</h3>
      <div css={cardBody}>
        <div css={left}>
          <img src={ANTD_IMG_URL} alt="antd" />
          <div>
            <p css={title}>Ant Design</p>
            <p css={subTitle}>一个 UI 设计体系</p>
          </div>
        </div>
        <Button type="primary" href={link}>
          去专栏参与讨论
        </Button>
      </div>
    </Card>
  );
};

export default ZhihuCard;
