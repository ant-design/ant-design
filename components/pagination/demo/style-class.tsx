import React from 'react';
import { Flex, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    padding: 8px;
  `,
}));

const styleFn: PaginationProps['styles'] = ({ props: { size } }) => {
  if (size === 'small') {
    return {
      item: {
        background: `rgba(200,200,200,0.3)`,
        marginInlineEnd: 4,
      },
    };
  }

  return {};
};

const App: React.FC = () => {
  const { styles } = useStyle();

  const paginationSharedProps: PaginationProps = {
    total: 500,
    classNames: {
      root: styles.root,
    },
  };

  return (
    <Flex vertical gap="middle">
      <Pagination
        {...paginationSharedProps}
        styles={{
          item: {
            borderRadius: 999,
          },
        }}
      />

      <Pagination {...paginationSharedProps} size="small" styles={styleFn} />
    </Flex>
  );
};

export default App;
