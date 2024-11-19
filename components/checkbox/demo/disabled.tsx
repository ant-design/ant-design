import React from 'react';
import { Checkbox } from 'antd';

const App: React.FC = () => (
  <>
    <Checkbox defaultChecked={false} disabled aria-label="disabled" />
    <br />
    <Checkbox indeterminate disabled aria-label="indeterminate" />
    <br />
    <Checkbox defaultChecked disabled aria-label="defaultChecked" />
  </>
);

export default App;
