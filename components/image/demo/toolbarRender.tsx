import { DownloadOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import React from 'react';

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

const App: React.FC = () => {
  const onDownload = () => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'image.jpg';
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        link.remove();
      });
  };

  return (
    <Image
      width={200}
      preview={{
        toolbarRender: (
          _,
          {
            icons: {
              flipYIcon,
              flipXIcon,
              rotateLeftIcon,
              rotateRightIcon,
              zoomOutIcon,
              zoomInIcon,
              closeIcon,
            },
          },
        ) => (
          <ul className="ant-image-preview-operations">
            <li className="ant-image-preview-operations-operation" onClick={onDownload}>
              <DownloadOutlined className="ant-image-preview-operations-icon" />
            </li>
            {flipYIcon}
            {flipXIcon}
            {rotateLeftIcon}
            {rotateRightIcon}
            {zoomOutIcon}
            {zoomInIcon}
            {closeIcon}
          </ul>
        ),
      }}
      src={src}
    />
  );
};

export default App;
