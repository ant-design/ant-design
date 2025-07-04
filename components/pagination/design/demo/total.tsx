import React from 'react';
import { Pagination } from 'antd';

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
    <Pagination
      defaultCurrent={3}
      total={500}
      showQuickJumper
      showTotal={(total, range) => locale.total(total, range.join('-'))}
    />
  );
};

export default App;
