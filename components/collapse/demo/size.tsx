import React from 'react';
import { Collapse, Divider } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App: React.FC = () => (
  <>
    <Divider orientation="left">Default Size</Divider>
    <Collapse>
      <Panel header="This is default size panel header" key="1">
        <p>{text}</p>
      </Panel>
    </Collapse>
    <Divider orientation="left">Small Size</Divider>
    <Collapse size="small">
      <Panel header="This is small size panel header" key="1">
        <p>{text}</p>
      </Panel>
    </Collapse>
    <Divider orientation="left">Large Size</Divider>
    <Collapse size="large">
      <Panel header="This is large size panel header" key="1">
        <p>{text}</p>
      </Panel>
    </Collapse>
  </>
);

export default App;
