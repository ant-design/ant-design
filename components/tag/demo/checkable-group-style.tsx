import React, { useState } from 'react';
import { Form, Tag } from 'antd';
import { createStaticStyles } from 'antd-style';

const itemClassNames = createStaticStyles(({ css }) => ({
  movies: css`
    &.ant-tag-checkable {
      color: #1677ff;
      background: #e6f4ff;
      border-color: #91caff;
    }

    &.ant-tag-checkable.ant-tag-checkable-checked {
      color: #fff;
      background: #1677ff;
      border-color: #1677ff;
    }
  `,
  books: css`
    &.ant-tag-checkable {
      color: #389e0d;
      background: #f6ffed;
      border-color: #b7eb8f;
    }

    &.ant-tag-checkable.ant-tag-checkable-checked {
      color: #fff;
      background: #389e0d;
      border-color: #389e0d;
    }
  `,
  music: css`
    &.ant-tag-checkable {
      color: #d4380d;
      background: #fff2e8;
      border-color: #ffbb96;
    }

    &.ant-tag-checkable.ant-tag-checkable-checked {
      color: #fff;
      background: #d4380d;
      border-color: #d4380d;
    }
  `,
}));

const App: React.FC = () => {
  const [singleValue, setSingleValue] = useState<string | null>('books');
  const [multipleValue, setMultipleValue] = useState<string[]>(['react', 'vue']);
  const [mixedValue, setMixedValue] = useState<string[]>(['blue']);

  return (
    <Form labelCol={{ span: 6 }}>
      <Form.Item label="Single">
        <Tag.CheckableTagGroup
          value={singleValue}
          onChange={setSingleValue}
          options={[
            { label: 'Movies', value: 'movies', className: itemClassNames.movies },
            { label: 'Books', value: 'books', className: itemClassNames.books },
            { label: 'Music', value: 'music', className: itemClassNames.music },
          ]}
        />
      </Form.Item>
      <Form.Item label="Multiple">
        <Tag.CheckableTagGroup
          multiple
          value={multipleValue}
          onChange={setMultipleValue}
          options={[
            {
              label: 'React',
              value: 'react',
              style: {
                borderColor: '#91caff',
                boxShadow: 'inset 0 0 0 1px rgba(22, 119, 255, 0.15)',
              },
            },
            {
              label: 'Vue',
              value: 'vue',
              style: {
                borderColor: '#b7eb8f',
                boxShadow: 'inset 0 0 0 1px rgba(82, 196, 26, 0.15)',
              },
            },
            {
              label: 'Svelte',
              value: 'svelte',
              style: {
                borderColor: '#ffbb96',
                boxShadow: 'inset 0 0 0 1px rgba(250, 84, 28, 0.15)',
              },
            },
          ]}
        />
      </Form.Item>
      <Form.Item label="Merged Styles">
        <Tag.CheckableTagGroup
          multiple
          value={mixedValue}
          onChange={setMixedValue}
          styles={{
            item: {
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#d9d9d9',
            },
          }}
          options={[
            { label: 'Blue', value: 'blue', style: { borderColor: '#91caff' } },
            { label: 'Green', value: 'green', style: { borderColor: '#b7eb8f' } },
            { label: 'Orange', value: 'orange', style: { borderColor: '#ffbb96' } },
          ]}
        />
      </Form.Item>
    </Form>
  );
};

export default App;
