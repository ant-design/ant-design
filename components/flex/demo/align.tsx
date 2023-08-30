import React from 'react';
import { Button, Flex, Segmented } from 'antd';
import { alignItemsValues, justifyContentValues } from 'antd/es/flex/classNames';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 100,
  border: '1px solid #40a9ff',
};

const App: React.FC = () => {
  const [justifyContent, setJustifyContent] = React.useState<string>('space-around');
  const [alignItems, setAlignItems] = React.useState<string>('center');
  return (
    <>
      <Segmented
        value={justifyContent}
        options={justifyContentValues as unknown as string[]}
        onChange={(value) => setJustifyContent(value as string)}
      />
      <br />
      <br />
      <Segmented
        value={alignItems}
        options={alignItemsValues as unknown as string[]}
        onChange={(value) => setAlignItems(value as string)}
      />
      <br />
      <br />
      <Flex style={boxStyle} justify={justifyContent} align={alignItems}>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
      </Flex>
    </>
  );
};

export default App;
