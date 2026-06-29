import React, { useRef, useState } from 'react';
import { Button, Input, Tooltip } from 'antd';
import type { TextAreaRef } from 'antd/es/input/TextArea';

const { TextArea } = Input;

const defaultValue =
  'The autoSize property applies to textarea nodes, and only the height changes automatically. In addition, autoSize can be set to an object, specifying the minimum number of rows and the maximum number of rows. The autoSize property applies to textarea nodes, and only the height changes automatically. In addition, autoSize can be set to an object, specifying the minimum number of rows and the maximum number of rows.';

const App: React.FC = () => {
  const [autoResize, setAutoResize] = useState(false);
  const textAreaRef = useRef<TextAreaRef>(null);

  return (
    <>
      <Button onClick={() => setAutoResize(!autoResize)} style={{ marginBottom: 16 }}>
        Auto Resize: {String(autoResize)}
      </Button>
      <TextArea rows={4} autoSize={autoResize} defaultValue={defaultValue} />
      <TextArea allowClear style={{ width: 93 }} />
      <br />
      <TextArea
        style={{
          resize: 'both',
        }}
        showCount
      />
      <br />
      <Tooltip title="Debug TextArea with Tooltip">
        <TextArea
          ref={textAreaRef}
          placeholder="TextArea wrapped in Tooltip for debugging"
          style={{ marginTop: 16 }}
          onFocus={() => console.log('nativeElement:', textAreaRef.current?.nativeElement)}
        />
      </Tooltip>
    </>
  );
};

export default App;
