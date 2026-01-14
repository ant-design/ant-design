import React from 'react';
import { Flex, Image } from 'antd';
import type { ImageProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`padding: 4px; border-radius: 8px; overflow: hidden;`,
}));

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
    } satisfies ImageProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const sharedProps: ImageProps = {
    src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    width: 160,
    alt: '示例图片',
    classNames,
  };

  return (
    <Flex gap="middle">
      <Image {...sharedProps} styles={styles} />
      <Image {...sharedProps} styles={stylesFn} preview={{ open: false }} />
    </Flex>
  );
};

export default App;
