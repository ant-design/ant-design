import * as React from 'react';
import { theme, Space, Button } from 'antd';
import useLocale from '../../../locales';

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
  const token = theme.useToken();
  const locale = useLocale(locales);

  return (
    <div>
      <h1>Ant Design 5.0</h1>
      <div>
        <p>{locale.sloganIntro}</p>
        <p>{locale.sloganDesc}</p>
      </div>

      <Space>
        <Button shape="round" type="primary">
          {locale.start}
        </Button>
        <Button shape="round">{locale.designLanguage}</Button>
      </Space>
    </div>
  );
}
