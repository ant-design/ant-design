import React from 'react';
import { Flex, Switch } from 'antd';
import type { GetProp, SwitchProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles((props) => {
  const { cssVar, prefixCls, css } = props;
  return {
    root: css`
      width: 40px;
      background-color: ${cssVar.colorPrimary};
    `,
    muiRoot: css`
      min-width: 32px;
      height: 14px;
      line-height: 14px;
      &&.${prefixCls}-switch-checked {
        background-color: rgba(25, 118, 210, 0.5);
        .${prefixCls}-switch-handle {
          inset-inline-start: calc(100% - 17px);
        }
      }
    `,
    muiIndicator: css`
      top: -3px;
      width: 20px;
      height: 20px;
      &&& {
        inset-inline-start: -3px;
      }
      &&&::before {
        background-color: rgb(25, 118, 210);
        border-radius: 999px;
        box-shadow:
          rgba(0, 0, 0, 0.2) 0 2px 1px -1px,
          rgba(0, 0, 0, 0.14) 0 1px 1px 0,
          rgba(0, 0, 0, 0.12) 0 1px 4px 0;
      }
    `,
  };
});

const stylesObject: SwitchProps['styles'] = {
  root: {
    backgroundColor: '#F5D2D2',
  },
};

const stylesFn: SwitchProps['styles'] = (info): GetProp<SwitchProps, 'styles', 'Return'> => {
  if (info.props.size === 'medium') {
    return {
      root: {
        backgroundColor: '#BDE3C3',
      },
    };
  }
  return {};
};

const Demo: React.FC = () => {
  const { styles: classNames } = useStyle();
  return (
    <Flex vertical align="flex-start" justify="flex-start" gap="medium">
      <Switch
        size="small"
        checkedChildren="on"
        unCheckedChildren="off"
        styles={stylesObject}
        classNames={{ root: classNames.root }}
      />
      <Switch
        size="medium"
        checkedChildren="on"
        unCheckedChildren="off"
        styles={stylesFn}
        classNames={classNames}
      />
      <Switch
        defaultChecked
        classNames={{ root: classNames.muiRoot, indicator: classNames.muiIndicator }}
      />
    </Flex>
  );
};

export default Demo;
