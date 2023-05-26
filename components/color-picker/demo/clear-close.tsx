import { ColorPicker } from 'antd';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <ColorPicker open={open} allowClear onOpenChange={setOpen} onClear={() => setOpen(false)} />
  );
};
