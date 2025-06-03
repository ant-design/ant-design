import React from 'react';
import { ConfigProvider, Divider } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        margin: 24,
        marginLG: 48,
        lineWidth: 5,
        colorSplit: '#1677ff',
      },
      components: {
        Divider: {
          verticalMarginInline: 16,
          textPaddingInline: 16,
          orientationMargin: 0.2,
        },
      },
    }}
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider>Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider titlePlacement="start">Left Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider titlePlacement="end">Right Text</Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider titlePlacement="start" styles={{ content: { margin: 0 } }}>
      Left Text margin with 0
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
    <Divider titlePlacement="end" styles={{ content: { margin: '0 50px' } }}>
      Right Text margin with 50px
    </Divider>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
      probare, quae sunt a te dicta? Refert tamen, quo modo.
    </p>
  </ConfigProvider>
);

export default App;
