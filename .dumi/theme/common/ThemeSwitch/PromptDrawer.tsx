import React from 'react';
import { Drawer } from 'antd';

export interface PromptDrawerProps {
  open: boolean;
  onClose: () => void;
}

const PromptDrawer: React.FC<PromptDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer title="Theme Market" open={open} onClose={onClose} width={480} placement="right">
      {/* Drawer content will be added here */}
    </Drawer>
  );
};

export default PromptDrawer;
