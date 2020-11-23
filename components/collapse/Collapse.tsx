import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import RightOutlined from '@ant-design/icons/RightOutlined';

import CollapsePanel from './CollapsePanel';
import { ConfigContext } from '../config-provider';
import animation from './openAnimation';
import { cloneElement } from '../_util/reactNode';

export type ExpandIconPosition = 'left' | 'right' | undefined;

export interface CollapseProps {
  activeKey?: Array<string | number> | string | number;
  defaultActiveKey?: Array<string | number> | string | number;
  /** 手风琴效果 */
  accordion?: boolean;
  destroyInactivePanel?: boolean;
  onChange?: (key: string | string[]) => void;
  style?: React.CSSProperties;
  className?: string;
  bordered?: boolean;
  prefixCls?: string;
  expandIcon?: (panelProps: PanelProps) => React.ReactNode;
  expandIconPosition?: ExpandIconPosition;
  ghost?: boolean;
}

interface PanelProps {
  isActive?: boolean;
  header?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  forceRender?: boolean;
  disabled?: boolean;
  extra?: React.ReactNode;
}

interface CollapseInterface extends React.FC<CollapseProps> {
  Panel: typeof CollapsePanel;
}

const Collapse: CollapseInterface = props => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const { prefixCls: customizePrefixCls, className = '', bordered, ghost } = props;
  const prefixCls = getPrefixCls('collapse', customizePrefixCls);

  const getIconPosition = () => {
    const { expandIconPosition } = props;
    if (expandIconPosition !== undefined) {
      return expandIconPosition;
    }
    return direction === 'rtl' ? 'right' : 'left';
  };

  const renderExpandIcon = (panelProps: PanelProps = {}) => {
    const { expandIcon } = props;
    const icon = (expandIcon ? (
      expandIcon(panelProps)
    ) : (
      <RightOutlined rotate={panelProps.isActive ? 90 : undefined} />
    )) as React.ReactNode;

    return cloneElement(icon, () => ({
      className: classNames((icon as any).props.className, `${prefixCls}-arrow`),
    }));
  };

  const iconPosition = getIconPosition();
  const collapseClassName = classNames(
    {
      [`${prefixCls}-borderless`]: !bordered,
      [`${prefixCls}-icon-position-${iconPosition}`]: true,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-ghost`]: !!ghost,
    },
    className,
  );
  const openAnimation = { ...animation, appear() {} };

  return (
    <RcCollapse
      openAnimation={openAnimation}
      {...props}
      expandIcon={renderExpandIcon}
      prefixCls={prefixCls}
      className={collapseClassName}
    />
  );
};

Collapse.Panel = CollapsePanel;

Collapse.defaultProps = {
  bordered: true,
};

export default Collapse;
