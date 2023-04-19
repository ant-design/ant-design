import React from 'react';
import { Alert } from 'antd';
import Marquee from 'react-fast-marquee';

const App = () => (
  <Alert
    banner
    message={
      <Marquee pauseOnHover gradient={false}>
        I can be a React component, multiple React components, or just some text.
      </Marquee>
    }
  />
);

export default App;
