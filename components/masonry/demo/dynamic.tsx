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
  const [items, setItems] = useState(() =>
    heights.map((height, index) => ({
      key: index,
      data: height,
    })),
  );

  const removeItem = (removeKey: React.Key) => {
    setItems((prevItems) => prevItems.filter(({ key }) => key !== removeKey));
  };

  const addItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        key: (prevItems[prevItems.length - 1]?.key || 0) + 1,
        data: Math.floor(Math.random() * 100) + 100,
      },
    ]);
  };

  return (
    <>
      <Masonry
        columns={4}
        gutter={16}
        items={items}
        itemRender={({ data, key }) => (
          <DemoItem height={data} onClick={() => removeItem(key)}>
            {Number(key) + 1}
          </DemoItem>
        )}
      />
      <Button onClick={addItem}>Add Item</Button>
    </>
  );
};

export default Update;
