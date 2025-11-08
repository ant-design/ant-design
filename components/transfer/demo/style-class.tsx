import React from 'react';
import { Flex, Transfer } from 'antd';
import type { TransferProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token, css }) => ({
  section: { backgroundColor: 'rgba(250,250,250, 0.5)' },
  header: { color: token.colorPrimary },
  actions: css`
    & button{
      background-color: rgba(255,242,232,0.6);
    }
  `,
}));

const mockData = Array.from({ length: 20 }).map<any>((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

const stylesObject: TransferProps['styles'] = {
  header: { fontWeight: 'bold' },
};

const stylesFn: TransferProps['styles'] = (info) => {
  if (info.props.status === 'warning') {
    return {
      section: { backgroundColor: 'rgba(246,255,237, 0.6)', borderColor: '#b7eb8f' },
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
