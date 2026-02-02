import React from 'react';
import { Button, Flex, Tooltip } from 'antd';
import type { TooltipProps, TooltipSemanticAllType } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  container: css`
    padding: 10px;
  `,
}));

const styles: TooltipProps['styles'] = {
  container: {
    borderRadius: 12,
    boxShadow: 'inset 0 0 8px #ccc',
  },
};

const stylesFn: TooltipProps['styles'] = (info): TooltipSemanticAllType['styles'] => {
  if (!info.props.arrow) {
    return {
      container: {
        backgroundColor: 'rgba(53, 71, 125, 0.8)',
        padding: 12,
        color: '#fff',
        borderRadius: 4,
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  return (
    <Flex gap="middle">
      <Tooltip classNames={classNames} styles={styles} arrow={false} title="Object text">
        <Button>Object Style</Button>
      </Tooltip>
      <Tooltip classNames={classNames} styles={stylesFn} arrow={false} title="Function text">
        <Button type="primary">Function Style</Button>
      </Tooltip>
    </Flex>
  );
};

export default App;
