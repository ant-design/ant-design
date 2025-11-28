import React, { useState } from 'react';
import { Form, Tag } from 'antd';

const tagsData = ['Movies', 'Books', 'Music', 'Sports'];

const App: React.FC = () => {
  const [checked, setChecked] = useState(true);
  const [singleSelected, setSingleSelected] = useState<string | null>('Books');
  const [multipleSelected, setMultipleSelected] = useState<string[]>(['Movies', 'Music']);

  return (
    <Form labelCol={{ span: 6 }}>
      <Form.Item label="Checkable">
        <Tag.CheckableTag checked={checked} onChange={(val) => setChecked(val)}>
          Yes
        </Tag.CheckableTag>
      </Form.Item>
      <Form.Item label="Single">
        <Tag.CheckableTagGroup
          options={tagsData}
          value={singleSelected}
          onChange={(val) => setSingleSelected(val)}
        />
      </Form.Item>
      <Form.Item label="Multiple">
        <Tag.CheckableTagGroup
          multiple
          options={tagsData}
          value={multipleSelected}
          onChange={(val) => setMultipleSelected(val)}
        />
      </Form.Item>
    </Form>
  );
};

export default App;
