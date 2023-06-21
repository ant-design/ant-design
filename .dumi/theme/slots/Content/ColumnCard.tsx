import { RightOutlined, YuqueOutlined, ZhihuOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Card, Divider } from 'antd';
import React from 'react';
import useLocale from '../../../hooks/useLocale';
import useSiteToken from '../../../hooks/useSiteToken';

const ANTD_IMG_URL =
  'https://picx.zhimg.com/v2-3b2bca09c2771e7a82a81562e806be4d.jpg?source=d16d100b';

const useStyle = () => {
  const { token } = useSiteToken();
  return {
    card: css`
      width: 100%;
      margin: 40px 0;
      transition: all 0.2s;
      background-color: ${token.colorFillQuaternary};
    `,
    bigTitle: css`
      font-size: 16px;
      color: #121212;
      margin-bottom: 24px;
      font-weight: 600;
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
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #646464;
      font-size: 14px;
      font-weight: 400;
      margin-top: 8px;
      .logo {
        font-size: 24px;
        &.zhihu-logo {
          color: #056de8;
        }
        &.yuque-logo {
          color: #00b96b;
        }
      }
      .arrowIcon {
        margin: 0 8px;
        color: #8a8f8d;
        font-size: 12px;
      }
    `,
  };
};

const locales = {
  cn: {
    bigTitle: '文章被以下专栏收录：',
    zhiHu: '一个 UI 设计体系',
    yuQue: 'Ant Design 官方专栏',
    buttonText: '我有想法，去参与讨论',
  },
  en: {
    bigTitle: 'Articles are included in the column:',
    zhiHu: 'A UI design system',
    yuQue: 'Ant Design official column',
    buttonText: 'Go to discuss',
  },
};

interface Props {
  zhihuLink?: string;
  yuqueLink?: string;
}

const ColumnCard: React.FC<Props> = ({ zhihuLink, yuqueLink }) => {
  const [locale] = useLocale(locales);
  const { card, bigTitle, cardBody, left, title, subTitle } = useStyle();
  if (!zhihuLink && !yuqueLink) {
    return null;
  }
  return (
    <Card css={card} bordered={false}>
      <h3 css={bigTitle}>{locale.bigTitle}</h3>
      <div css={cardBody}>
        <div css={left}>
          <img src={ANTD_IMG_URL} alt="antd" />
          <div>
            <p css={title}>Ant Design</p>
            <div css={subTitle}>
              <ZhihuOutlined className="logo zhihu-logo" />
              <RightOutlined className="arrowIcon" />
              {locale.zhiHu}
            </div>
          </div>
        </div>
        <Button
          type="primary"
          icon={<ZhihuOutlined style={{ fontSize: 14 }} />}
          ghost
          target="_blank"
          href={zhihuLink}
        >
          {locale.buttonText}
        </Button>
      </div>
      <Divider />
      <div css={cardBody}>
        <div css={left}>
          <img src={ANTD_IMG_URL} alt="antd" />
          <div>
            <p css={title}>Ant Design</p>
            <div css={subTitle}>
              <YuqueOutlined className="logo yuque-logo" />
              <RightOutlined className="arrowIcon" />
              {locale.yuQue}
            </div>
          </div>
        </div>
        <Button
          type="primary"
          icon={<YuqueOutlined style={{ fontSize: 14 }} />}
          ghost
          target="_blank"
          href={yuqueLink}
        >
          {locale.buttonText}
        </Button>
      </div>
    </Card>
  );
};

export default ColumnCard;
