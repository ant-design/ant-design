import React from 'react';
import { Flex, Image } from 'antd';
import type { ImageProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(() => ({
  root: {
    padding: 4,
    borderRadius: 8,
  },
}));

const App: React.FC = () => {
  const { styles: classNames } = useStyles();

  const styles: ImageProps['styles'] = {
    image: {
      borderRadius: '4px',
    },
  };

  const stylesFn: ImageProps['styles'] = (info) => {
    if (info.props.preview) {
      return {
        root: {
          border: '2px solid #A594F9',
          borderRadius: 8,
          padding: 4,
          transition: 'all 0.3s ease',
        },
        image: {
          borderRadius: 4,
          filter: 'grayscale(50%)',
        },
      };
    }
  };

  const sharedProps: ImageProps = {
    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    width: 160,
    alt: '示例图片',
    classNames,
  };
  return (
    <Flex gap="middle">
      <Image {...sharedProps} styles={styles} />
      <Image {...sharedProps} preview={{ open: false }} styles={stylesFn} />
    </Flex>
  );
};

export default App;
