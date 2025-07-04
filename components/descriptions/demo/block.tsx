import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';

const items: DescriptionsProps['items'] = [
  {
    label: 'UserName',
    children: 'Zhou Maomao',
  },
  {
    label: 'Live',
    span: 'filled', // span = 2
    children: 'Hangzhou, Zhejiang',
  },
  {
    label: 'Remark',
    span: 'filled', // span = 3
    children: 'empty',
  },
  {
    label: 'Address',
    span: 1, // span will be 3 and warning for span is not align to the end
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  },
];

const App: React.FC = () => <Descriptions bordered title="User Info" items={items} />;

export default App;
