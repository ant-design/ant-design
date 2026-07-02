import React from 'react';
import { Divider, Mentions, theme } from 'antd';

const App: React.FC = () => {
  const { token } = theme.useToken();
  return (
    <Mentions
      style={{ width: '100%' }}
      popupRender={(menu) => (
        <>
          <div
            style={{
              padding: `${token.paddingXS}px ${token.paddingSM}px`,
              fontWeight: token.fontWeightStrong,
              color: token.colorTextDescription,
            }}
          >
            Custom Header
          </div>
          <Divider style={{ margin: `${token.marginXXS}px 0` }} />
          {menu}
        </>
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
};

export default App;
