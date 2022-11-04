import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;
const description = 'This is a description.';
const App: React.FC = () => (
  <Steps current={1}>
    <Step title="Finished" description={description} />
    <Step title="In Progress" description={description} subTitle="Left 00:00:08" />
    <Step title="Waiting" description={description} />
  </Steps>
);

export default App;
