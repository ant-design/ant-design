import React, { useState } from 'react';
import { Button, Flex, Input } from 'antd';

const { TextArea } = Input;

const defaultValue =
  'The autoSize property applies to textarea nodes, and only the height changes automatically. In addition, autoSize can be set to an object, specifying the minimum number of rows and the maximum number of rows. The autoSize property applies to textarea nodes, and only the height changes automatically. In addition, autoSize can be set to an object, specifying the minimum number of rows and the maximum number of rows.';

const App: React.FC = () => {
  const [autoResize, setAutoResize] = useState(false);

  return (
    <Flex vertical gap="small">
      <Button onClick={() => setAutoResize(!autoResize)} style={{ marginBottom: 16 }}>
        Auto Resize: {String(autoResize)}
      </Button>
      <TextArea rows={4} autoSize={autoResize} defaultValue={defaultValue} />
      <TextArea allowClear style={{ width: 93 }} />
      <TextArea
        style={{
          resize: 'both',
        }}
        showCount
      />
    </Flex>
  );
};

export default App;
