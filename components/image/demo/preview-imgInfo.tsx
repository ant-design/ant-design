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
      imageRender(_, { imgInfo }) {
        return <div>{JSON.stringify(imgInfo)}</div>;
      },
      toolbarRender(_, { imgInfo }) {
        return <div>{JSON.stringify(imgInfo)}</div>;
      },
    }}
  />
);

export default App;
