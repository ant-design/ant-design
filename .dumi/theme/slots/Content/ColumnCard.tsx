import { RightOutlined, YuqueOutlined, ZhihuOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Button, Card, Divider } from 'antd';
import React from 'react';
import useLocale from '../../../hooks/useLocale';
import useSiteToken from '../../../hooks/useSiteToken';
import JuejinLogo from './JuejinLogo';

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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .logo {
        width: 24px;
        height: 24px;
        font-size: 24px;
        &.zhihu-logo {
          color: #056de8;
        }
        &.yuque-logo {
          color: #00b96b;
        }
        &.juejin-logo {
          color: #1e80ff;
        }
      }
      .arrowIcon {
        margin: 0 8px;
        color: #8a8f8d;
        font-size: 12px;
      }
      .zl-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        color: #646464;
      }
    `,
    btn: css`
      display: flex;
      justify-content: center;
      align-items: center;
    `,
  };
};

const locales = {
  cn: {
    bigTitle: '文章被以下专栏收录：',
    zhiHu: '一个 UI 设计体系',
    yuQue: 'Ant Design 官方专栏',
    junjin: 'Ant Design 开源专栏',
    buttonText: '我有想法，去参与讨论',
  },
  en: {
    bigTitle: 'Articles are included in the column:',
    zhiHu: 'A UI design system',
    yuQue: 'Ant Design official column',
    junjin: 'Ant Design Open Source Column',
    buttonText: 'Go to discuss',
  },
};

interface Props {
  zhihuLink?: string;
  yuqueLink?: string;
  juejinLink?: string;
}

const ColumnCard: React.FC<Props> = ({ zhihuLink, yuqueLink, juejinLink }) => {
  const [locale] = useLocale(locales);
  const { card, bigTitle, cardBody, left, title, subTitle, btn } = useStyle();
  if (!zhihuLink && !yuqueLink && !juejinLink) {
    return null;
  }
  return (
    <Card css={card} bordered={false}>
      <h3 css={bigTitle}>{locale.bigTitle}</h3>
      {zhihuLink && (
        <div css={cardBody}>
          <div css={left}>
            <img src={ANTD_IMG_URL} alt="antd" />
            <div>
              <p css={title}>Ant Design</p>
              <div css={subTitle}>
                <ZhihuOutlined className="logo zhihu-logo" />
                <RightOutlined className="arrowIcon" />
                <Button
                  target="_blank"
                  href="https://www.zhihu.com/column/c_1564262000561106944"
                  className="zl-btn"
                  type="link"
                >
                  {locale.zhiHu}
                </Button>
              </div>
            </div>
          </div>
          <Button
            type="primary"
            css={btn}
            icon={<ZhihuOutlined style={{ fontSize: 16 }} />}
            ghost
            target="_blank"
            href={zhihuLink}
          >
            {locale.buttonText}
          </Button>
        </div>
      )}
      {yuqueLink && (
        <>
          <Divider />
          <div css={cardBody}>
            <div css={left}>
              <img src={ANTD_IMG_URL} alt="antd" />
              <div>
                <p css={title}>Ant Design</p>
                <div css={subTitle}>
                  <YuqueOutlined className="logo yuque-logo" />
                  <RightOutlined className="arrowIcon" />
                  <Button
                    target="_blank"
                    href="https://www.yuque.com/ant-design/ant-design"
                    className="zl-btn"
                    type="link"
                  >
                    {locale.yuQue}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              type="primary"
              css={btn}
              icon={<YuqueOutlined style={{ fontSize: 16 }} />}
              ghost
              target="_blank"
              href={yuqueLink}
            >
              {locale.buttonText}
            </Button>
          </div>
        </>
      )}
      {juejinLink && (
        <>
          <Divider />
          <div css={cardBody}>
            <div css={left}>
              <img src={ANTD_IMG_URL} alt="antd" />
              <div>
                <p css={title}>Ant Design</p>
                <div css={subTitle}>
                  <JuejinLogo className="logo juejin-logo" />
                  <RightOutlined className="arrowIcon" />
                  <Button
                    target="_blank"
                    href="https://juejin.cn/column/7247354308258054200"
                    className="zl-btn"
                    type="link"
                  >
                    {locale.junjin}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              type="primary"
              css={btn}
              icon={<JuejinLogo style={{ fontSize: 16, width: 16, height: 16 }} />}
              ghost
              target="_blank"
              href={juejinLink}
            >
              {locale.buttonText}
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default ColumnCard;
