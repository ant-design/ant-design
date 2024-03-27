import React from 'react';
import { Select, Space, Cascader, Typography, TreeSelect, Segmented } from 'antd';

const options = [
  { value: 'long', label: <Typography>long, long, long piece of text</Typography> },
  { value: 'short', label: <Typography>short</Typography> },
  { value: 'normal', label: <div>normal</div> },
  {
    value: 'issue-46636',
    label: (
      <Typography.Text
        ellipsis={{
          tooltip: {
            overlay: 'https://github.com/ant-design/ant-design/issues/46636',
            overlayInnerStyle: {
              maxHeight: '50vh',
              maxWidth: '40vw',
            },
            mouseEnterDelay: 0.5,
          },
        }}
      >
        {String('Issue #46636 ').repeat(10)}
      </Typography.Text>
    ),
  },
];

const App: React.FC = () => {
  const values = options.map((item) => item.value);
  const [value, setValue] = React.useState(values.at(0));

  return (
    <>
      <Segmented options={values} onChange={setValue as any} />
      <br />
      <Space wrap key={value}>
        <Select defaultValue={value} style={{ width: 120 }} allowClear options={options} />

        <Select
          defaultValue={value}
          placeholder="Select a option"
          style={{ width: 120, height: 60 }}
          allowClear
          options={options}
        />

        <Select
          defaultValue={value}
          placeholder="Select a option"
          style={{ width: 120 }}
          allowClear
          options={options}
        />

        <Select
          defaultValue={[value]}
          mode="multiple"
          placeholder="Select a option"
          style={{ width: 120 }}
          allowClear
          options={options}
        />

        <Select
          mode="multiple"
          defaultValue={[value]}
          placeholder="Select a option"
          style={{ width: 120, height: 60 }}
          allowClear
          options={options}
        />

        <Cascader
          placeholder="Select a option"
          style={{ width: 120, height: 60 }}
          allowClear
          defaultValue={value as any}
          options={options}
        />

        <TreeSelect
          showSearch
          style={{ width: 120, height: 60 }}
          placeholder="Please select"
          allowClear
          popupMatchSelectWidth={false}
          treeDefaultExpandAll
          defaultValue={value}
          treeData={[
            {
              value: 'parent 1',
              title: 'parent 1',
              children: options,
            },
          ]}
        />
      </Space>
    </>
  );
};

export default App;
