import React from 'react';
import { Flex, Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 2px dashed #ccc;
    padding: 8px;
  `,
}));

const styleFn: PaginationProps['styles'] = ({ props }) => {
  if (props.size === 'small') {
    return {
      item: {
        backgroundColor: `rgba(200, 200, 200, 0.3)`,
        marginInlineEnd: 4,
      },
    } satisfies PaginationProps['styles'];
  }
  return {};
};

const App: React.FC = () => {
  const paginationSharedProps: PaginationProps = {
    total: 500,
    classNames: { root: classNames.root },
  };

  return (
    <Flex vertical gap="middle">
      <Pagination {...paginationSharedProps} styles={{ item: { borderRadius: 999 } }} />
      <Pagination {...paginationSharedProps} size="small" styles={styleFn} />
    </Flex>
  );
};

export default App;
