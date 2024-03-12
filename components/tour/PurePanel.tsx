import * as React from 'react';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';

import useClosable from '../_util/hooks/useClosable';
import { withPureRenderTheme } from '../_util/PurePanel';
import { cloneElement } from '../_util/reactNode';
import { ConfigContext } from '../config-provider';
import { RawPurePanel as PopoverRawPurePanel } from '../popover/PurePanel';
import type { TourStepProps } from './interface';
import TourPanel from './panelRender';
import useStyle from './style';

export interface PurePanelProps extends TourStepProps {}

const PurePanel: React.FC<PurePanelProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    current = 0,
    total = 6,
    className,
    style,
    type,
    closable,
    closeIcon,
    ...restProps
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const [mergedClosable, mergedCloseIcon] = useClosable({
    closable,
    closeIcon,
    customCloseIconRender: (icon) =>
      React.isValidElement(icon)
        ? cloneElement(icon, {
            className: classNames(icon.props.className, `${prefixCls}-close-icon`),
          })
        : icon,
    defaultCloseIcon: <CloseOutlined />,
    defaultClosable: true,
  });

  return wrapCSSVar(
    <PopoverRawPurePanel
      prefixCls={prefixCls}
      hashId={hashId}
      className={classNames(
        className,
        `${prefixCls}-pure`,
        type && `${prefixCls}-${type}`,
        cssVarCls,
      )}
      style={style}
    >
      <TourPanel
        stepProps={{
          ...restProps,
          prefixCls,
          total,
          closable: mergedClosable ? { closeIcon: mergedCloseIcon } : undefined,
        }}
        current={current}
        type={type}
      />
    </PopoverRawPurePanel>,
  );
};

export default withPureRenderTheme(PurePanel);
