import { DownOutlined, SyncOutlined } from '@ant-design/icons';
import { Divider, Tag } from 'antd';
import React from 'react';
import type { TagsGroupData } from '../Group';

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return hex;
}

const App: React.FC = () => {
  const [data, setData] = React.useState(createData(12));

  function createData(count: number) {
    const generatedData: TagsGroupData = new Array(count).fill(1).map((item, index) => ({
      color: randomColor(),
      label: () => (
        <span>
          <SyncOutlined spin />
          {`Tag ${index}`}
        </span>
      ),
      closable: true,
      key: index,
      onClose(newData: TagsGroupData) {
        const newTags = newData.filter((newTag) => newTag.key !== index);
        setData([...newTags]);
      },
    }));
    return generatedData;
  }

  return (
    <>
      <Tag.Group data={data} restTagProps={{ color: 'blue' }}></Tag.Group>
      <Divider />
      <Tag.Group
        data={data}
        renderRestPlacement={() => <DownOutlined style={{ fontSize: '10px', cursor: 'pointer' }} />}
      ></Tag.Group>
    </>
  );
};

export default App;
