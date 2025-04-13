import React from 'react';
import { RightOutlined, YuqueOutlined, ZhihuOutlined } from '@ant-design/icons';
import { Button, Card, Divider } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

import useLocale from '../../../hooks/useLocale';
import JuejinLogo from './JuejinLogo';

const ANTD_IMG_URL =
  'https://picx.zhimg.com/v2-3b2bca09c2771e7a82a81562e806be4d.jpg?source=d16d100b';

const useStyle = createStyles(({ token, css }) => ({
  card: css`
    width: 100%;
    margin: ${token.marginMD * 2}px 0;
    transition: all ${token.motionDurationMid};
    background-color: ${token.colorFillQuaternary};
  `,
  bigTitle: css`
    color: #121212;
    font-size: ${token.fontSizeLG}px;
    margin-bottom: ${token.marginLG}px;
    font-weight: ${token.fontWeightStrong};
  `,
  cardBody: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  leftCard: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 200px;
      overflow: hidden;
      margin-inline-end: ${token.marginLG}px;
      border-radius: ${token.borderRadiusLG}px;
    }
  `,
  title: css`
    color: #444;
    font-size: ${token.fontSizeLG}px;
    font-weight: ${token.fontWeightStrong};
    user-select: none;
  `,
  subTitle: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #646464;
    font-size: ${token.fontSize}px;
    font-weight: 400;
    margin-top: ${token.marginXS}px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  logo: css`
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
  `,
  arrowIcon: css`
    color: #8a8f8d;
    margin: 0 ${token.marginXS}px;
    font-size: ${token.fontSizeSM}px;
  `,
  zlBtn: css`
    padding: 0;
    color: #646464;
  `,
  discussLogo: css`
    width: 16px;
    height: 16px;
    font-size: 16px;
  `,
}));

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
  const {
    styles: {
      card,
      bigTitle,
      cardBody,
      leftCard,
      title,
      subTitle,
      logo,
      arrowIcon,
      zlBtn,
      discussLogo,
    },
  } = useStyle();
  if (!zhihuLink && !yuqueLink && !juejinLink) {
    return null;
  }
  return (
    <Card className={card} variant="borderless">
      <h3 className={bigTitle}>{locale.bigTitle}</h3>
      {zhihuLink && (
        <>
          <Divider />
          <div className={cardBody}>
            <div className={leftCard}>
              <img draggable={false} src={ANTD_IMG_URL} alt="antd" />
              <div>
                <p className={title}>Ant Design</p>
                <div className={subTitle}>
                  <ZhihuOutlined className={classNames(logo, 'zhihu-logo')} />
                  <RightOutlined className={arrowIcon} />
                  <Button
                    target="_blank"
                    href="https://www.zhihu.com/column/c_1564262000561106944"
                    className={zlBtn}
                    type="link"
                  >
                    {locale.zhiHu}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              ghost
              type="primary"
              icon={<ZhihuOutlined className={discussLogo} />}
              target="_blank"
              href={zhihuLink}
            >
              {locale.buttonText}
            </Button>
          </div>
        </>
      )}
      {yuqueLink && (
        <>
          <Divider />
          <div className={cardBody}>
            <div className={leftCard}>
              <img draggable={false} src={ANTD_IMG_URL} alt="antd" />
              <div>
                <p className={title}>Ant Design</p>
                <div className={subTitle}>
                  <YuqueOutlined className={classNames(logo, 'yuque-logo')} />
                  <RightOutlined className={arrowIcon} />
                  <Button
                    target="_blank"
                    href="https://www.yuque.com/ant-design/ant-design"
                    className={zlBtn}
                    type="link"
                  >
                    {locale.yuQue}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              ghost
              type="primary"
              icon={<YuqueOutlined className={discussLogo} />}
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
          <div className={cardBody}>
            <div className={leftCard}>
              <img draggable={false} src={ANTD_IMG_URL} alt="antd" />
              <div>
                <p className={title}>Ant Design</p>
                <div className={subTitle}>
                  <JuejinLogo className={classNames(logo, 'juejin-logo')} />
                  <RightOutlined className={arrowIcon} />
                  <Button
                    target="_blank"
                    href="https://juejin.cn/column/7247354308258054200"
                    className={zlBtn}
                    type="link"
                  >
                    {locale.junjin}
                  </Button>
                </div>
              </div>
            </div>
            <Button
              ghost
              type="primary"
              icon={<JuejinLogo className={discussLogo} />}
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
