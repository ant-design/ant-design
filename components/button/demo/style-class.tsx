import React from 'react';
import { Button, Flex } from 'antd';
import type { ButtonProps, GetProp } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ cssVar }) => ({
  root: {
    border: `${cssVar.lineWidth} ${cssVar.lineType} ${cssVar.colorBorder}`,
    borderRadius: cssVar.borderRadius,
    padding: `${cssVar.paddingXS} ${cssVar.padding}`,
    height: 'auto',
  },
  content: {
    color: cssVar.colorText,
  },
}));

const stylesObject: ButtonProps['styles'] = {
  root: {
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
  },
};

const stylesFn: ButtonProps['styles'] = (info): GetProp<ButtonProps, 'styles', 'Return'> => {
  if (info.props.type === 'primary') {
    return {
      root: {
        backgroundColor: '#171717',
      },
      content: {
        color: '#fff',
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles: classNames } = useStyles();
  return (
    <Flex gap="small">
      <Button type="default" classNames={classNames} styles={stylesObject}>
        Object
      </Button>
      <Button type="primary" classNames={classNames} styles={stylesFn}>
        Function
      </Button>
    </Flex>
  );
};

export default App;
