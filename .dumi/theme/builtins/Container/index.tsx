/**
 * copied: https://github.com/arvinxx/dumi-theme-antd-style/tree/master/src/builtins/Container
 */
import * as React from 'react';
import { Alert } from 'antd';

import useStyles from './style';

interface ContainerProps {
  type: 'info' | 'warning' | 'success' | 'error';
  title?: string;
}

const Container: React.FC<React.PropsWithChildren<ContainerProps>> = ({
  type,
  title,
  children,
}) => {
  const { styles, cx } = useStyles();

  return (
    <div data-type={type} className={styles.container}>
      <Alert
        showIcon
        type={type}
        message={title || type.toUpperCase()}
        description={
          <div
            className={cx(
              styles.desc,
              // 为了让 markdown 的样式生效，需要在这里添加一个额外的 class
              'markdown',
            )}
          >
            {children}
          </div>
        }
        className={styles.alert}
      />
    </div>
  );
};

export default Container;
