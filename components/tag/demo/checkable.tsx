import React, { useState } from 'react';
import { Form, Tag } from 'antd';

const tagsData = ['Movies', 'Books', 'Music', 'Sports'];

const App: React.FC = () => {
  const [checked, setChecked] = useState(true);
  const [singleSelected, setSingleSelected] = useState<string | null>('Books');
  const [radioSelected, setRadioSelected] = useState<string>('Books');
  const [multipleSelected, setMultipleSelected] = useState<string[]>(['Movies', 'Music']);

  return (
    <Form labelCol={{ span: 6 }}>
      <Form.Item label="Checkable">
        <Tag.CheckableTag checked={checked} onChange={(val) => setChecked(val)}>
          Yes
        </Tag.CheckableTag>
      </Form.Item>
      <Form.Item label="Single" help="mode='single' allow unselect">
        <Tag.CheckableTagGroup
          options={tagsData}
          value={singleSelected}
          onChange={(val) => setSingleSelected(val)}
        />
      </Form.Item>
      <Form.Item label="Radio" help="mode='radio' always have one value">
        <Tag.CheckableTagGroup
          mode="radio"
          options={tagsData}
          value={radioSelected}
          onChange={(val) => setRadioSelected(val)}
        />
      </Form.Item>
      <Form.Item label="Multiple">
        <Tag.CheckableTagGroup
          mode="multiple"
          options={tagsData}
          value={multipleSelected}
          onChange={(val) => setMultipleSelected(val)}
        />
      </Form.Item>
    </Form>
  );
};

export default App;
