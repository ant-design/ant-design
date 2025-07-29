import React from 'react';
import { RightOutlined, YuqueOutlined, ZhihuOutlined } from '@ant-design/icons';
import { Button, Card, Divider } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

import useLocale from '../../../hooks/useLocale';
import JuejinIcon from '../../../theme/icons/JuejinIcon';

const ANTD_IMG_URL =
  'https://picx.zhimg.com/v2-3b2bca09c2771e7a82a81562e806be4d.jpg?source=d16d100b';

const useStyle = createStyles(({ cssVar, css }) => ({
  card: css`
    width: 100%;
    margin: calc(${cssVar.marginMD} * 2) 0;
    transition: all ${cssVar.motionDurationMid};
    background-color: ${cssVar.colorFillQuaternary};
  `,
  bigTitle: css`
    color: #121212;
    font-size: ${cssVar.fontSizeLG};
    margin-bottom: ${cssVar.marginLG};
    font-weight: ${cssVar.fontWeightStrong};
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
      margin-inline-end: ${cssVar.marginLG};
      border-radius: ${cssVar.borderRadiusLG};
    }
  `,
  title: css`
    color: #444;
    font-size: ${cssVar.fontSizeLG};
    font-weight: ${cssVar.fontWeightStrong};
    user-select: none;
  `,
  subTitle: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #646464;
    font-size: ${cssVar.fontSize};
    font-weight: 400;
    margin-top: ${cssVar.marginXS};
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
    margin: 0 ${cssVar.marginXS};
    font-size: ${cssVar.fontSizeSM};
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
                  <JuejinIcon className={classNames(logo, 'juejin-logo')} />
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
              icon={<JuejinIcon className={discussLogo} />}
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
