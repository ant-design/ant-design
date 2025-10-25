import React, { useState } from 'react';
import { Form, Tag } from 'antd';

const tagsData = ['Movies', 'Books', 'Music', 'Sports'];

const App: React.FC = () => {
  const [checked, setChecked] = useState(true);
  const [radioSelected, setRadioSelected] = useState<string | null>('Books');
  const [checkboxSelected, setCheckboxSelected] = useState<string[]>(['Movies', 'Music']);

  return (
    <Form labelCol={{ span: 6 }}>
      <Form.Item label="Checkable">
        <Tag.CheckableTag checked={checked} onChange={(val) => setChecked(val)}>
          Yes
        </Tag.CheckableTag>
      </Form.Item>
      <Form.Item label="Checkable group (radio mode)">
        <Tag.CheckableTagGroup
          mode="radio"
          options={tagsData}
          value={radioSelected}
          onChange={(val) => setRadioSelected(val)}
        />
      </Form.Item>
      <Form.Item label="Checkable group (checkbox mode)">
        <Tag.CheckableTagGroup
          mode="checkbox"
          options={tagsData}
          value={checkboxSelected}
          onChange={(val) => setCheckboxSelected(val)}
        />
      </Form.Item>
    </Form>
  );
};

export default App;
