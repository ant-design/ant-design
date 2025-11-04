import React from 'react';
import { Flex } from 'antd';
import type { FlexProps } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';

import ImagePreview from '../ImagePreview';
import type { ImagePreviewProps } from '../ImagePreview';

const isNonNullable = <T,>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};

const useStyle = createStyles(({ css, token }) => {
  return {
    wrapper: css`
      color: ${token.colorText};
      font-size: ${token.fontSize}px;
      line-height: 2;
    `,
    title: css`
      margin: 1em 0;
    `,
    description: css`
      margin: 1em 0;
      padding-inline-start: 0.8em;
      color: ${token.colorTextSecondary};
      font-size: 90%;
      border-inline-start: 4px solid ${token.colorSplit};
      p {
        margin: 0;
      }
    `,
  };
});

interface FlexWithImagePreviewProps {
  imagePreviewProps?: ImagePreviewProps;
  title?: string;
  description?: string;
}

const FlexWithImagePreview: React.FC<
  FlexWithImagePreviewProps & React.PropsWithChildren<FlexProps>
> = (props) => {
  const { imagePreviewProps, title, description, className, style, children, ...rest } = props;
  const { styles } = useStyle();
  if (!title && !description) {
    return <ImagePreview {...imagePreviewProps}>{children}</ImagePreview>;
  }
  return (
    <Flex className={classNames(styles.wrapper, className)} style={style} {...rest}>
      <Flex align="flex-start" justify="flex-start" vertical>
        {isNonNullable(title) && <div className={styles.title}>{title}</div>}
        {isNonNullable(description) && <div className={styles.description}>{description}</div>}
      </Flex>
      <ImagePreview {...imagePreviewProps}>{children}</ImagePreview>
    </Flex>
  );
};

export default FlexWithImagePreview;
