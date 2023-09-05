import React, { useState } from 'react';
import type { CSSProperties } from 'react';
import { Button, Flex, Radio } from 'antd';
import type { RadioChangeEvent } from 'antd';

const boxStyle: React.CSSProperties = {
  width: '100%',
  height: 120,
  borderRadius: 6,
  border: '1px solid #40a9ff',
};

const App: React.FC = () => {
  const [justify, setJustify] = useState<CSSProperties['justifyContent']>('space-around');
  const [alignItems, setAlignItems] = useState<CSSProperties['alignItems']>('center');
  const onChangeJustify = (e: RadioChangeEvent) => {
    setJustify(e.target.value);
  };
  const onChangeAlignItems = (e: RadioChangeEvent) => {
    setAlignItems(e.target.value);
  };
  return (
    <>
      <p>Select justify :</p>
      <br />
      <Radio.Group value={justify} onChange={onChangeJustify}>
        {['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map(
          (jus) => (
            <Radio key={jus} value={jus}>
              {jus}
            </Radio>
          ),
        )}
      </Radio.Group>
      <br />
      <br />
      <p>Select align :</p>
      <br />
      <Radio.Group value={alignItems} onChange={onChangeAlignItems}>
        {['flex-start', 'center', 'flex-end'].map((ali) => (
          <Radio key={ali} value={ali}>
            {ali}
          </Radio>
        ))}
      </Radio.Group>
      <br />
      <br />
      <Flex style={boxStyle} justify={justify} align={alignItems}>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
      </Flex>
    </>
  );
};

export default App;
