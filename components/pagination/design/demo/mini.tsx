import React from 'react';
import { Flex, Pagination } from 'antd';

import useLocale from '../../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    total: (total: number, current: string | number) => `第 ${current} 条 / 共 ${total} 条`,
  },
  en: {
    total: (total: number, current: string | number) => `${current} of ${total} items`,
  },
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <Flex vertical gap="middle">
      <Pagination defaultCurrent={1} total={50} showSizeChanger={false} size="small" />
      <Pagination defaultCurrent={1} total={100} showSizeChanger={false} size="small" />
      <Pagination defaultCurrent={1} total={100} size="small" />
      <Pagination defaultCurrent={1} total={100} showQuickJumper size="small" />
      <Pagination
        defaultCurrent={1}
        total={100}
        showQuickJumper
        size="small"
        showTotal={(total, range) => locale.total(total, range.join('-'))}
      />
    </Flex>
  );
};

export default App;
