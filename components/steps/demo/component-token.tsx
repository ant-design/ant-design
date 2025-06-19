import React from 'react';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { ConfigProvider, Steps } from 'antd';

const content = 'This is a content.';
const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Steps: {
          titleLineHeight: 20,
          customIconSize: 40,
          customIconTop: 0,
          customIconFontSize: 32,
          iconSize: 20,
          iconTop: 0, // magic for ui experience
          iconFontSize: 12,
          iconSizeSM: 16,
          dotSize: 20,
          dotCurrentSize: 24,
          navArrowColor: '#163CFF',
          navContentMaxWidth: 100,
          descriptionMaxWidth: 100,
        },
      },
    }}
  >
    <Steps
      current={1}
      items={[
        {
          title: 'Finished',
          content,
        },
        {
          title: 'In Progress',
          content,
          subTitle: 'Left 00:00:08',
        },
        {
          title: 'Waiting',
          content,
        },
      ]}
    />
    <Steps
      size="small"
      current={1}
      items={[
        {
          title: 'Finished',
          content,
        },
        {
          title: 'In Progress',
          content,
          subTitle: 'Left 00:00:08',
        },
        {
          title: 'Waiting',
          content,
        },
      ]}
    />
    <Steps
      items={[
        {
          title: 'Login',
          status: 'finish',
          icon: <UserOutlined />,
        },
        {
          title: 'Verification',
          status: 'finish',
          icon: <SolutionOutlined />,
        },
        {
          title: 'Pay',
          status: 'process',
          icon: <LoadingOutlined />,
        },
        {
          title: 'Done',
          status: 'wait',
          icon: <SmileOutlined />,
        },
      ]}
    />
    <Steps
      type="dot"
      current={1}
      items={[
        {
          title: 'Finished',
          content: 'This is a content.',
        },
        {
          title: 'In Progress',
          content: 'This is a content.',
        },
        {
          title: 'Waiting',
          content: 'This is a content.',
        },
      ]}
    />
    <Steps
      type="navigation"
      current={1}
      items={[
        {
          title: 'Step 1',
          subTitle: '00:00:05',
          status: 'finish',
          content: 'This is a content.',
        },
        {
          title: 'Step 2',
          subTitle: '00:01:02',
          status: 'process',
          content: 'This is a content.',
        },
        {
          title: 'Step 3',
          subTitle: 'waiting for longlong time',
          status: 'wait',
          content: 'This is a content.',
        },
      ]}
    />
  </ConfigProvider>
);

export default App;
