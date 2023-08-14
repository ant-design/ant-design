import React from 'react';
import { red, green } from '@ant-design/colors';
import { Progress } from 'antd';

const App: React.FC = () => (
  <>
    <Progress percent={50} steps={3} />
    <br />
    <Progress percent={30} steps={5} />
    <br />
    <Progress percent={100} steps={5} size="small" strokeColor={green[6]} />
    <br />
    <Progress percent={60} steps={5} strokeColor={[green[6], green[6], red[5]]} />
  </>
);

export default App;
