import React from 'react';

const DemoItem: React.FC<{ height: number; children: React.ReactNode }> = ({
  height,
  children,
}) => {
  return (
    <div
      style={{
        height,
        background: '#f0f0f0',
        borderRadius: 4,
        padding: 4,
      }}
    >
      {children}
    </div>
  );
};

export default DemoItem;
