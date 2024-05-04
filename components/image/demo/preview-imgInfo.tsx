import React from 'react';
import { Image } from 'antd';

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

const App: React.FC = () => (
  <Image
    src={src}
    width="200px"
    height="200px"
    alt="test"
    preview={{
      imageRender: (_, { image }) => <div>{JSON.stringify(image)}</div>,
      toolbarRender: (_, { image }) => <div>{JSON.stringify(image)}</div>,
    }}
  />
);

export default App;
