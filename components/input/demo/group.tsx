import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Cascader,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Space,
  Tooltip,
} from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles((props) => {
  const { css, prefixCls, cssVar } = props;
  return {
    inputWrapper: css`
      position: relative;
    `,
    inputSplit: css`
      background-color: ${cssVar.colorBgContainer} !important;
    `,
    inputRight: css`
      border-inline-start-width: 0;
      &:hover,
      &:focus {
        border-inline-start-width: ${cssVar.lineWidth};
      }
      &.${prefixCls}-input-rtl {
        border-inline-end-width: 0;
        &:hover,
        &:focus {
          border-inline-end-width: ${cssVar.lineWidth};
        }
      }
    `,
  };
});

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const App: React.FC = () => {
  const { styles } = useStyles();
  return (
    <div className={styles.inputWrapper}>
      <Space.Compact size="large">
        <Input style={{ width: 120 }} defaultValue="0571" />
        <Input style={{ width: 200 }} defaultValue="26888888" />
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Input style={{ width: '20%' }} defaultValue="0571" />
        <Input style={{ width: '30%' }} defaultValue="26888888" />
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="https://ant.design" />
        <Button type="primary">Submit</Button>
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Input
          style={{ width: 'calc(100% - 200px)' }}
          defaultValue="git@github.com:ant-design/ant-design.git"
        />
        <Tooltip title="search git url">
          <Button icon={<SearchOutlined />} />
        </Tooltip>
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Select
          defaultValue="Zhejiang"
          options={[
            { label: 'Zhejiang', value: 'Zhejiang' },
            { label: 'Jiangsu', value: 'Jiangsu' },
            { label: 'Other', value: 'Other' },
          ]}
        />
        <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Input.Search allowClear style={{ width: '40%' }} defaultValue="0571" />
        <Input.Search allowClear style={{ width: '40%' }} defaultValue="26888888" />
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Select
          defaultValue="Option1"
          options={[
            { label: 'Option1', value: 'Option1' },
            { label: 'Option2', value: 'Option2' },
          ]}
        />
        <Input style={{ width: '50%' }} defaultValue="input content" />
        <InputNumber prefix="@" />
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Input style={{ width: '50%' }} defaultValue="input content" />
        <DatePicker style={{ width: '50%' }} />
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Input style={{ width: '30%' }} defaultValue="input content" />
        <DatePicker.RangePicker style={{ width: '70%' }} />
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Select
          defaultValue="Option1-1"
          options={[
            { label: 'Option1-1', value: 'Option1-1' },
            { label: 'Option1-2', value: 'Option1-2' },
          ]}
        />
        <Select
          defaultValue="Option2-2"
          options={[
            { label: 'Option2-1', value: 'Option2-1' },
            { label: 'Option2-2', value: 'Option2-2' },
          ]}
        />
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Select
          defaultValue="1"
          options={[
            { label: 'Between', value: '1' },
            { label: 'Except', value: '2' },
          ]}
        />
        <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
        <Input
          className={styles.inputSplit}
          style={{ width: 30, borderInlineStart: 0, borderInlineEnd: 0, pointerEvents: 'none' }}
          placeholder="~"
          disabled
        />
        <Input
          className={styles.inputRight}
          style={{ width: 100, textAlign: 'center' }}
          placeholder="Maximum"
        />
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Select
          defaultValue="Sign Up"
          style={{ width: '30%' }}
          options={[
            { label: 'Sign Up', value: 'Sign Up' },
            { label: 'Sign In', value: 'Sign In' },
          ]}
        />
        <AutoComplete
          style={{ width: '70%' }}
          placeholder="Email"
          options={[{ value: 'text 1' }, { value: 'text 2' }]}
        />
      </Space.Compact>
      <br />
      <Space.Compact block>
        <Select
          style={{ width: '30%' }}
          defaultValue="Home"
          options={[
            { label: 'Home', value: 'Home' },
            { label: 'Company', value: 'Company' },
          ]}
        />
        <Cascader style={{ width: '70%' }} options={options} placeholder="Select Address" />
      </Space.Compact>
    </div>
  );
};

export default App;
