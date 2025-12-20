import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import React, { useContext } from 'react';
import { toArray } from '@rc-component/util';
import { clsx } from 'clsx';

import { cloneElement } from '../_util/reactNode';
import { ConfigContext } from '../config-provider';
import { Col } from '../grid';
import { ListContext } from './context';

type ListItemSemanticClassNames = {
  actions?: string;
  extra?: string;
};

type ListItemSemanticStyles = {
  actions?: React.CSSProperties;
  extra?: React.CSSProperties;
};

export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  classNames?: ListItemSemanticClassNames;
  children?: ReactNode;
  prefixCls?: string;
  style?: CSSProperties;
  styles?: ListItemSemanticStyles;
  extra?: ReactNode;
  actions?: ReactNode[];
  colStyle?: CSSProperties;
}

export interface ListItemMetaProps {
  avatar?: ReactNode;
  className?: string;
  children?: ReactNode;
  description?: ReactNode;
  prefixCls?: string;
  style?: CSSProperties;
  title?: ReactNode;
}

type ListItemClassNamesModule = keyof Exclude<ListItemProps['classNames'], undefined>;
type ListItemStylesModule = keyof Exclude<ListItemProps['styles'], undefined>;

export const Meta: React.FC<ListItemMetaProps> = ({
  prefixCls: customizePrefixCls,
  className,
  avatar,
  title,
  description,
  ...others
}) => {
  const { getPrefixCls } = useContext(ConfigContext);

  const prefixCls = getPrefixCls('list', customizePrefixCls);
  const classString = clsx(`${prefixCls}-item-meta`, className);

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

const InternalItem = React.forwardRef<HTMLDivElement, ListItemProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    children,
    actions,
    extra,
    styles,
    className,
    classNames: customizeClassNames,
    colStyle,
    ...others
  } = props;
  const { grid, itemLayout } = useContext(ListContext);
  const { getPrefixCls, list } = useContext(ConfigContext);

  const moduleClass = (moduleName: ListItemClassNamesModule) =>
    clsx(list?.item?.classNames?.[moduleName], customizeClassNames?.[moduleName]);

  const moduleStyle = (moduleName: ListItemStylesModule): React.CSSProperties => ({
    ...list?.item?.styles?.[moduleName],
    ...styles?.[moduleName],
  });

  const isItemContainsTextNodeAndNotSingular = () => {
    const childNodes: React.ReactNode[] = toArray(children);
    const hasTextNode = childNodes.some((node) => typeof node === 'string');
    return hasTextNode && childNodes.length > 1;
  };

  const isFlexMode = () => {
    if (itemLayout === 'vertical') {
      return !!extra;
    }
    return !isItemContainsTextNodeAndNotSingular();
  };

  const prefixCls = getPrefixCls('list', customizePrefixCls);
  const actionsContent = actions && actions.length > 0 && (
    <ul
      className={clsx(`${prefixCls}-item-action`, moduleClass('actions'))}
      key="actions"
      style={moduleStyle('actions')}
    >
      {actions.map((action: ReactNode, i: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={`${prefixCls}-item-action-${i}`}>
          {action}
          {i !== actions.length - 1 && <em className={`${prefixCls}-item-action-split`} />}
        </li>
      ))}
    </ul>
  );
  const Element = grid ? 'div' : 'li';
  const itemChildren = (
    <Element
      {...(others as any)} // `li` element `onCopy` prop args is not same as `div`
      {...(!grid ? { ref } : {})}
      className={clsx(
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-no-flex`]: !isFlexMode(),
        },
        className,
      )}
    >
      {itemLayout === 'vertical' && extra
        ? [
            <div className={`${prefixCls}-item-main`} key="content">
              {children}
              {actionsContent}
            </div>,
            <div
              className={clsx(`${prefixCls}-item-extra`, moduleClass('extra'))}
              key="extra"
              style={moduleStyle('extra')}
            >
              {extra}
            </div>,
          ]
        : [children, actionsContent, cloneElement(extra, { key: 'extra' })]}
    </Element>
  );
  return grid ? (
    <Col ref={ref} flex={1} style={colStyle}>
      {itemChildren}
    </Col>
  ) : (
    itemChildren
  );
});

export type ListItemTypeProps = typeof InternalItem & {
  Meta: typeof Meta;
};

const Item = InternalItem as ListItemTypeProps;

Item.Meta = Meta;

export default Item;
