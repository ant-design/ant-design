import React, { useState } from 'react';
import { Button } from 'antd';

import Masonry from '../Masonry';

const DemoItem: React.FC<{ height: number; children: React.ReactNode; onClick: () => void }> = ({
  height,
  children,
  onClick,
}) => {
  return (
    <div
      style={{
        height,
        background: '#f0f0f0',
        borderRadius: 4,
        padding: 4,
        width: '100%',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

const Update: React.FC = () => {
  const [items, setItems] = useState(heights);

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, idx) => idx !== index));
  };

  const addItem = () => {
    setItems((prevItems) => [...prevItems, Math.floor(Math.random() * 100) + 100]);
  };

  return (
    <>
      <Masonry
        columns={4}
        gutter={16}
        items={items}
        itemRender={(height, { index }) => (
          <DemoItem height={height} onClick={() => removeItem(index)}>
            {index + 1}
          </DemoItem>
        )}
      />
      <Button onClick={addItem}>Add Item</Button>
    </>
  );
};

export default Update;
