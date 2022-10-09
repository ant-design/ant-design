import * as React from 'react';
import { Space, Button, Typography, theme } from 'antd';
import useLocale from '../../../locales';
import useSiteToken from '../../../hooks/useSiteToken';

const locales = {
  cn: {
    sloganIntro: '一个企业级产品设计体系',
    sloganDesc: '助力设计开发者「更灵活」的搭建出「更美」的产品，让用户「快乐工作」～',
    start: '开始使用',
    designLanguage: '设计语言',
  },
  default: {
    sloganIntro: '一个企业级产品设计体系',
    sloganDesc: '助力设计开发者「更灵活」的搭建出「更美」的产品，让用户「快乐工作」～',
    start: '开始使用',
    designLanguage: '设计语言',
  },
};

export default function Banner() {
  const locale = useLocale(locales);
  const { token } = useSiteToken();

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography.Title level={1}>Ant Design 5.0</Typography.Title>
      <Typography.Paragraph style={{ fontSize: token.fontSizeLG, lineHeight: 2 }}>
        <div>{locale.sloganIntro}</div>
        <div>{locale.sloganDesc}</div>
      </Typography.Paragraph>

      <Space size="middle" style={{ marginTop: token.gridSpaceLG * 3 }}>
        <Button shape="round" type="primary">
          {locale.start}
        </Button>
        <Button shape="round">{locale.designLanguage}</Button>
      </Space>
    </div>
  );
}
