/*
 * debug: true
 */

import { Avatar } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Avatar shape="circle" src="http://abc.com/not-exist.jpg">
      A
    </Avatar>
    <Avatar shape="circle" src="http://abc.com/not-exist.jpg">
      ABC
    </Avatar>
  </>
);

export default App;
