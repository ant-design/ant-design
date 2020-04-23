import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { ListGridType, ColumnType, ListContext } from './index';
import { Col } from '../grid';
import { ConfigContext } from '../config-provider';
import { cloneElement } from '../_util/reactNode';

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
  extra?: React.ReactNode;
  actions?: React.ReactNode[];
  grid?: ListGridType;
}

export interface ListItemMetaProps {
  avatar?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  description?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
  title?: React.ReactNode;
}

export const Meta: React.FC<ListItemMetaProps> = ({
  prefixCls: customizePrefixCls,
  className,
  avatar,
  title,
  description,
  ...others
}) => {
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('list', customizePrefixCls);
  const classString = classNames(`${prefixCls}-item-meta`, className);

  const content = (
    <div className={`${prefixCls}-item-meta-content`}>
      {title && <h4 className={`${prefixCls}-item-meta-title`}>{title}</h4>}
      {description && <div className={`${prefixCls}-item-meta-description`}>{description}</div>}
    </div>
  );

  return (
    <div {...others} className={classString}>
      {avatar && <div className={`${prefixCls}-item-meta-avatar`}>{avatar}</div>}
      {(title || description) && content}
    </div>
  );
};

function getGrid(grid: ListGridType, t: ColumnType) {
  return grid[t] && Math.floor(24 / grid[t]!);
}

export interface ListItemTypeProps extends React.FC<ListItemProps> {
  Meta: typeof Meta;
}

const Item: ListItemTypeProps = props => {
  const { grid, itemLayout } = React.useContext(ListContext);
  const { getPrefixCls } = React.useContext(ConfigContext);

  const isItemContainsTextNodeAndNotSingular = () => {
    const { children } = props;
    let result;
    React.Children.forEach(children, (element: React.ReactElement<any>) => {
      if (typeof element === 'string') {
        result = true;
      }
    });
    return result && React.Children.count(children) > 1;
  };

  const isFlexMode = () => {
    const { extra } = props;
    if (itemLayout === 'vertical') {
      return !!extra;
    }
    return !isItemContainsTextNodeAndNotSingular();
  };

  const { prefixCls: customizePrefixCls, children, actions, extra, className, ...others } = props;
  const prefixCls = getPrefixCls('list', customizePrefixCls);
  const actionsContent = actions && actions.length > 0 && (
    <ul className={`${prefixCls}-item-action`} key="actions">
      {actions.map((action: React.ReactNode, i: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={`${prefixCls}-item-action-${i}`}>
          {action}
          {i !== actions.length - 1 && <em className={`${prefixCls}-item-action-split`} />}
        </li>
      ))}
    </ul>
  );
  const Tag = grid ? 'div' : 'li';
  const itemChildren = (
    <Tag
      {...(others as any)} // `li` element `onCopy` prop args is not same as `div`
      className={classNames(`${prefixCls}-item`, className, {
        [`${prefixCls}-item-no-flex`]: !isFlexMode(),
      })}
    >
      {itemLayout === 'vertical' && extra
        ? [
            <div className={`${prefixCls}-item-main`} key="content">
              {children}
              {actionsContent}
            </div>,
            <div className={`${prefixCls}-item-extra`} key="extra">
              {extra}
            </div>,
          ]
        : [children, actionsContent, cloneElement(extra, { key: 'extra' })]}
    </Tag>
  );

  return grid ? (
    <Col
      span={getGrid(grid, 'column')}
      xs={getGrid(grid, 'xs')}
      sm={getGrid(grid, 'sm')}
      md={getGrid(grid, 'md')}
      lg={getGrid(grid, 'lg')}
      xl={getGrid(grid, 'xl')}
      xxl={getGrid(grid, 'xxl')}
    >
      {itemChildren}
    </Col>
  ) : (
    itemChildren
  );
};

Item.Meta = Meta;

Item.contextTypes = {
  grid: PropTypes.any,
  itemLayout: PropTypes.string,
};

export default Item;
