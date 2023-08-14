import { CustomerServiceOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import React from 'react';
import { FloatButton } from 'antd';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalFloatButton } = FloatButton;

const App: React.FC = () => (
  <div style={{ display: 'flex', columnGap: 16, alignItems: 'center' }}>
    <InternalFloatButton backTop />
    <InternalFloatButton icon={<CustomerServiceOutlined />} />
    <InternalFloatButton
      icon={<QuestionCircleOutlined />}
      description="HELP"
      shape="square"
      type="primary"
    />
    <InternalFloatButton
      shape="square"
      items={[
        { icon: <QuestionCircleOutlined /> },
        { icon: <CustomerServiceOutlined /> },
        { icon: <SyncOutlined /> },
      ]}
    />
    <InternalFloatButton
      open
      icon={<CustomerServiceOutlined />}
      trigger="click"
      items={[
        { icon: <QuestionCircleOutlined /> },
        { icon: <CustomerServiceOutlined /> },
        { icon: <SyncOutlined /> },
      ]}
    />
  </div>
);

export default App;
