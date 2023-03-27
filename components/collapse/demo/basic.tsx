import React from 'react';
import { Collapse } from 'antd';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse
      defaultActiveKey={['1']}
      onChange={onChange}
      items={[
        {
          key: '1',
          header: 'This is panel header 1',
          content: <p>{text}</p>,
        },
        {
          key: '2',
          header: 'This is panel header 2',
          content: <p>{text}</p>,
        },
        {
          key: '3',
          header: 'This is panel header 3',
          content: <p>{text}</p>,
        },
      ]}
    />
  );
};

export default App;
