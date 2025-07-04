import React from 'react';
import { Flex, Progress } from 'antd';

import useLocale from '../../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    loading: '加载中',
  },
  en: {
    loading: 'Loading',
  },
};

const Demo: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <Flex vertical gap="middle">
      <Progress type="line" percent={50} style={{ width: 320 }} />
      <Progress percent={50} format={() => locale.loading} style={{ width: 320 }} />
      <Progress percent={100} status="success" style={{ width: 320 }} />
      <Progress percent={70} status="exception" style={{ width: 320 }} />
    </Flex>
  );
};

export default Demo;
