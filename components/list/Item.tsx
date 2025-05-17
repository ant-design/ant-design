import type { CSSProperties, FC, HTMLAttributes, ReactElement, ReactNode } from 'react';
import React, { Children, useContext } from 'react';
import cls from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { cloneElement } from '../_util/reactNode';
import { ConfigContext } from '../config-provider';
import { Col } from '../grid';
import { ListContext } from './context';

export type ListItemSemanticName = 'actions' | 'extra' | 'item';

export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  prefixCls?: string;
  style?: CSSProperties;
  classNames?: Partial<Record<ListItemSemanticName, string>>;
  styles?: Partial<Record<ListItemSemanticName, React.CSSProperties>>;
  extra?: ReactNode;
  actions?: ReactNode[];
  colStyle?: CSSProperties;
}

export type ListItemMetaSemanticName = 'root' | 'section' | 'description' | 'title' | 'avatar';
export interface ListItemMetaProps {
  avatar?: ReactNode;
  className?: string;
  children?: ReactNode;
  description?: ReactNode;
  prefixCls?: string;
  style?: CSSProperties;
  title?: ReactNode;
  classNames?: Partial<Record<ListItemMetaSemanticName, string>>;
  styles?: Partial<Record<ListItemMetaSemanticName, React.CSSProperties>>;
}

export const Meta: FC<ListItemMetaProps> = ({
  prefixCls: customizePrefixCls,
  className,
  avatar,
  title,
  description,
  style,
  styles,
  classNames,
  ...restProps
}) => {
  const { getPrefixCls, list } = useContext(ConfigContext);
  const itemMeta = list?.itemMeta || {};
  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [itemMeta?.classNames, classNames],
    [itemMeta?.styles, styles],
  );

  const prefixCls = getPrefixCls('list', customizePrefixCls);
  const rootClassNames = cls(
    `${prefixCls}-item-meta`,
    className,
    itemMeta?.className,
    mergedClassNames.root,
  );

  const content = (
    <div
      className={cls(`${prefixCls}-item-meta-section`, mergedClassNames.section)}
      style={mergedStyles.section}
    >
      {title && (
        <h4
          className={cls(`${prefixCls}-item-meta-title`, mergedClassNames.title)}
          style={mergedStyles.title}
        >
          {title}
        </h4>
      )}
      {description && (
        <div
          className={cls(`${prefixCls}-item-meta-description`, mergedClassNames.description)}
          style={mergedStyles.description}
        >
          {description}
        </div>
      )}
    </div>
  );

  return (
    <div
      {...restProps}
      className={rootClassNames}
      style={{
        ...mergedStyles.root,
        ...itemMeta.style,
        ...style,
      }}
    >
      {avatar && (
        <div
          className={cls(`${prefixCls}-item-meta-avatar`, mergedClassNames.avatar)}
          style={mergedStyles.avatar}
        >
          {avatar}
        </div>
      )}
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
    style,
    classNames,
    colStyle,
    ...restProps
  } = props;
  const { grid, itemLayout } = useContext(ListContext);
  const { getPrefixCls, list } = useContext(ConfigContext);

  const listItem = list?.item || {};
  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [listItem?.classNames, classNames],
    [listItem?.styles, styles],
  );

  const isItemContainsTextNodeAndNotSingular = () => {
    let result = false;
    Children.forEach(children as ReactElement, (element) => {
      if (typeof element === 'string') {
        result = true;
      }
    });
    return result && Children.count(children) > 1;
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
      className={cls(`${prefixCls}-item-action`, mergedClassNames.actions)}
      key="actions"
      style={mergedStyles.actions}
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
      {...(restProps as any)} // `li` element `onCopy` prop args is not same as `div`
      {...(!grid ? { ref } : {})}
      className={cls(
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-no-flex`]: !isFlexMode(),
        },
        className,
        mergedClassNames.item,
        listItem.className,
      )}
      style={{ ...mergedStyles.item, ...listItem.style, ...style }}
    >
      {itemLayout === 'vertical' && extra
        ? [
            <div className={`${prefixCls}-item-main`} key="content">
              {children}
              {actionsContent}
            </div>,
            <div
              className={cls(`${prefixCls}-item-extra`, mergedClassNames.extra)}
              key="extra"
              style={mergedStyles.extra}
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
