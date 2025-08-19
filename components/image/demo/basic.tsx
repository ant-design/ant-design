import React from 'react';
import { ConfigProvider, Image } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    image={{
      preview: {
        previewMask: { enabled: true },
      },
    }}
  >
    <Image
      width={200}
      alt="basic"
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      preview={{
        previewMask: {
          blur: false,
        },
      }}
    />
  </ConfigProvider>
);

export default App;
