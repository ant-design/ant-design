import * as React from 'react';
import { Space, Button, Typography, theme } from 'antd';
import useLocale from '../../../hooks/useLocale';
import useSiteToken from '../../../hooks/useSiteToken';

const locales = {
  cn: {
    sloganIntro: '一个企业级产品设计体系',
    sloganDesc: '助力设计开发者「更灵活」的搭建出「更美」的产品，让用户「快乐工作」～',
    start: '开始使用',
    designLanguage: '设计语言',
  },
  en: {
    sloganIntro: '一个企业级产品设计体系',
    sloganDesc: '助力设计开发者「更灵活」的搭建出「更美」的产品，让用户「快乐工作」～',
    start: '开始使用',
    designLanguage: '设计语言',
  },
};

export default function Banner() {
  const [locale] = useLocale(locales);
  const { token } = useSiteToken();

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        style={{ marginBottom: token.paddingSM }}
        src="https://gw.alipayobjects.com/zos/bmw-prod/d0ed9801-804c-43f1-8172-a792eb2f8f19.svg"
      />
      <Typography.Paragraph
        style={{
          fontSize: token.fontSizeLG,
          lineHeight: 2,
          color: '#314659',
          marginBottom: token.marginXL,
        }}
      >
        <div>{locale.sloganIntro}</div>
        <div>{locale.sloganDesc}</div>
      </Typography.Paragraph>

      <Space size="middle">
        <Button shape="round" type="primary">
          {locale.start}
        </Button>
        <Button shape="round">{locale.designLanguage}</Button>
      </Space>
    </div>
  );
}
