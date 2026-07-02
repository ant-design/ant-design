import React from 'react';
import { Mentions } from 'antd';

const App: React.FC = () => (
  <Mentions
    style={{ width: '100%' }}
    popupRender={(menu) => (
      <div className="custom-popup">
        <div className="custom-header">Custom Header</div>
        {menu}
      </div>
    )}
    options={[
      {
        value: 'afc163',
        label: 'afc163',
      },
      {
        value: 'zombieJ',
        label: 'zombieJ',
      },
      {
        value: 'yesmeck',
        label: 'yesmeck',
      },
    ]}
  />
);

export default App;
