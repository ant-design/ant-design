import React from 'react';
import { Flex, Transfer } from 'antd';
import type { TransferProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  section: { backgroundColor: '#fafafa' },
  header: { color: token.colorPrimary },
}));

const mockData = Array.from({ length: 20 }).map<any>((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

const stylesObject: TransferProps['styles'] = {
  section: { backgroundColor: '#fafafa' },
  header: { fontWeight: 'bold' },
  actions: { backgroundColor: '#fff2e8' },
};

const stylesFn: TransferProps['styles'] = (info) => {
  if (info.props.status === 'warning') {
    return {
      section: { backgroundColor: '#f6ffed', borderColor: '#b7eb8f' },
      header: { color: '#8DBCC7', fontWeight: 'normal' },
    } satisfies TransferProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  const sharedProps: TransferProps = {
    dataSource: mockData,
    targetKeys: initialTargetKeys,
    render: (item) => item.title,
    classNames,
  };
  return (
    <Flex vertical gap="large" style={{ width: '100%' }}>
      <Transfer {...sharedProps} status="error" styles={stylesObject} />
      <Transfer {...sharedProps} status="warning" styles={stylesFn} />
    </Flex>
  );
};

export default App;
