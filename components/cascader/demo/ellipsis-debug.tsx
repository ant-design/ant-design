import React from 'react';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
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

const App: React.FC = () => <Cascader.Panel options={options} onChange={onChange} />;

export default App;
