import { Col, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import { css } from '@emotion/react';
import { Link, useLocation } from 'dumi';
import useLocale from '../../../hooks/useLocale';
import useSiteToken from '../../../hooks/useSiteToken';
import * as utils from '../../../theme/utils';
import SiteContext from '../../../theme/slots/SiteContext';

const SECONDARY_LIST = [
  {
    img: 'https://gw.alipayobjects.com/zos/bmw-prod/b874caa9-4458-412a-9ac6-a61486180a62.svg',
    key: 'mobile',
    url: 'https://mobile.ant.design/',
    imgScale: 1.5,
  },
  {
    img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
    key: 'antv',
    url: 'https://antv.vision/',
  },
  {
    img: 'https://gw.alipayobjects.com/zos/bmw-prod/af1ea898-bf02-45d1-9f30-8ca851c70a5b.svg',
    key: 'kitchen',
    url: 'https://kitchen.alipay.com/',
  },
];

const locales = {
  cn: {
    values: '设计价值观',
    valuesDesc: '确定性、意义感、生长性、自然',
    guide: '设计指引',
    guideDesc: '全局样式、设计模式',
    lib: '组件库',
    libDesc: 'Ant Design of React / Angular / Vue',

    // Secondary
    mobile: 'Ant Design Mobile',
    mobileDesc: 'Ant Design 移动端 UI 组件库',
    antv: 'AntV',
    antvDesc: '全新一代数据可视化解决方案',
    kitchen: 'Kitchen',
    kitchenDesc: '一款为设计者提升工作效率的 Sketch 工具集',
  },
  en: {
    values: 'Design values',
    valuesDesc: 'Certainty, Meaningfulness, Growth, Naturalness',
    guide: 'Design guide',
    guideDesc: 'Global style and design pattern',
    lib: 'Components Libraries',
    libDesc: 'Ant Design of React / Angular / Vue',

    // Secondary
    mobile: 'Ant Design Mobile',
    mobileDesc: 'Mobile UI component library',
    antv: 'AntV',
    antvDesc: 'New generation of data visualization solutions',
    kitchen: 'Kitchen',
    kitchenDesc: 'Sketch Tool set for designers',
  },
};

const useStyle = () => {
  const { token } = useSiteToken();

  return {
    card: css`
      padding: ${token.paddingSM}px;
      border-radius: ${token.borderRadius * 2}px;
      background: #fff;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02),
        0 2px 4px rgba(0, 0, 0, 0.02);

      img {
        width: 100%;
        vertical-align: top;
        border-radius: ${token.borderRadius}px;
      }
    `,

    cardMini: css`
      display: block;
      border-radius: ${token.borderRadius * 2}px;
      padding: ${token.paddingMD}px ${token.paddingLG}px;
      background: rgba(0, 0, 0, 0.02);
      border: 1px solid rgba(0, 0, 0, 0.06);

      img {
        height: 48px;
      }
    `,
  };
};

export default function DesignFramework() {
  const [locale] = useLocale(locales);
  const { token } = useSiteToken();
  const style = useStyle();
  const { pathname, search } = useLocation();
  const isZhCN = utils.isZhCN(pathname);
  const { isMobile } = useContext(SiteContext);
  const colSpan = isMobile ? 24 : 8;

  const MAINLY_LIST = [
    {
      img: 'https://gw.alipayobjects.com/zos/bmw-prod/36a89a46-4224-46e2-b838-00817f5eb364.svg',
      key: 'values',
      path: utils.getLocalizedPathname('/docs/spec/values/', isZhCN, search),
    },
    {
      img: 'https://gw.alipayobjects.com/zos/bmw-prod/8379430b-e328-428e-8a67-666d1dd47f7d.svg',
      key: 'guide',
      path: utils.getLocalizedPathname('/docs/spec/colors/', isZhCN, search),
    },
    {
      img: 'https://gw.alipayobjects.com/zos/bmw-prod/1c363c0b-17c6-4b00-881a-bc774df1ebeb.svg',
      key: 'lib',
      path: utils.getLocalizedPathname('/docs/react/introduce/', isZhCN, search),
    },
  ];

  return (
    <Row gutter={[token.marginXL, token.marginXL]}>
      {MAINLY_LIST.map(({ img, key, path }, index) => {
        const title = locale[key as keyof typeof locale];
        const desc = locale[`${key}Desc` as keyof typeof locale];

        return (
          <Col key={index} span={colSpan}>
            <Link to={path}>
              <div css={style.card}>
                <img alt={title} src={img} />

                <Typography.Title
                  level={4}
                  style={{ marginTop: token.margin, marginBottom: token.marginXS }}
                >
                  {title}
                </Typography.Title>
                <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
                  {desc}
                </Typography.Paragraph>
              </div>
            </Link>
          </Col>
        );
      })}

      {SECONDARY_LIST.map(({ img, key, url, imgScale = 1 }, index) => {
        const title = locale[key as keyof typeof locale];
        const desc = locale[`${key}Desc` as keyof typeof locale];

        return (
          <Col key={index} span={colSpan}>
            <a css={style.cardMini} target="_blank" href={url} rel="noreferrer">
              <img alt={title} src={img} style={{ transform: `scale(${imgScale})` }} />

              <Typography.Title
                level={4}
                style={{ marginTop: token.margin, marginBottom: token.marginXS }}
              >
                {title}
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
                {desc}
              </Typography.Paragraph>
            </a>
          </Col>
        );
      })}
    </Row>
  );
}
