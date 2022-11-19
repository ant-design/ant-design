import React from 'react';
import { Mentions } from 'antd';

const { Option } = Mentions;

const getOptions = () =>
  ['afc163', 'zombiej', 'yesmeck'].map((value) => (
    <Option key={value} value={value}>
      {value}
    </Option>
  ));

const App: React.FC = () => (
  <>
    <div style={{ marginBottom: 10 }}>
      <Mentions style={{ width: '100%' }} placeholder="this is disabled Mentions" disabled>
        {getOptions()}
      </Mentions>
    </div>
    <Mentions style={{ width: '100%' }} placeholder="this is readOnly Mentions" readOnly>
      {getOptions()}
    </Mentions>
  </>
);

export default App;
