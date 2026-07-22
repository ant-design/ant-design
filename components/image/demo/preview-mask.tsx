import React from 'react';
import { ZoomInOutlined } from '@ant-design/icons';
import { Image, Space } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles((props) => {
  const { css } = props;
  return {
    mask: css`
      opacity: 1;
      font-size: 20px;
    `,
  };
});

const App: React.FC = () => {
  const { styles } = useStyles();
  return (
    <Image
      width={96}
      alt="basic image"
      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      classNames={{ popup: { mask: styles.mask } }}
      preview={{
        cover: (
          <Space vertical align="center">
            <ZoomInOutlined />
            Preview
          </Space>
        ),
      }}
    />
  );
};

export default App;
