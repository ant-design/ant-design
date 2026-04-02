import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader, Flex, Typography } from 'antd';
import type { HTMLAriaDataAttributes } from 'antd/es/_util/aria-data-attrs';

type Option = {
  value: string;
  label: string;
  children?: Option[];
} & HTMLAriaDataAttributes;

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'ZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiangZhejiang',
    'aria-label': 'Zhejiang',
    'data-title': 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'HangzhouHangzhouHangzhouHangzhouHangzhouHangzhou',
        'aria-label': 'Hangzhou',
        'data-title': 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West LakeWest LakeWest LakeWest LakeWest Lake',
            'aria-label': 'West Lake',
            'data-title': 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'JiangsuJiangsuJiangsuJiangsuJiangsuJiangsuJiangsu',
    'aria-label': 'Jiangsu',
    'data-title': 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'NanjingNanjingNanjingNanjingNanjing',
        'aria-label': 'Nanjing',
        'data-title': 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua MenZhong Hua MenZhong Hua Men',
            'aria-label': 'Zhong Hua Men',
            'data-title': 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const onChange: CascaderProps<Option>['onChange'] = (value) => {
  console.log(value);
};

const App: React.FC = () => (
  <Flex gap="middle" wrap align="flex-start">
    <style>{`
      .cascader-panel-ellipsis-debug-fixed .ant-cascader-menu {
        width: 160px;
        min-width: 160px;
        flex: none;
      }
    `}</style>

    <Flex vertical gap="small">
      <Typography.Text strong>Constrained item width</Typography.Text>
      <Cascader.Panel
        className="cascader-panel-ellipsis-debug-fixed"
        options={options}
        onChange={onChange}
      />
    </Flex>

    <Flex vertical gap="small">
      <Typography.Text strong>Default item width</Typography.Text>
      <Cascader.Panel options={options} onChange={onChange} />
    </Flex>
  </Flex>
);

export default App;
