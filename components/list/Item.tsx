import classNames from 'classnames';
import type {
  CSSProperties,
  FC,
  ForwardRefExoticComponent,
  ForwardRefRenderFunction,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import React, { Children, forwardRef, useContext } from 'react';
import { cloneElement } from '../_util/reactNode';
import { ConfigContext } from '../config-provider';
import { Col } from '../grid';
import { ListContext } from './context';

export interface ListItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
  prefixCls?: string;
  style?: CSSProperties;
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

export const Meta: FC<ListItemMetaProps> = ({
  prefixCls: customizePrefixCls,
  className,
  avatar,
  title,
  description,
  ...others
}) => {
  const { getPrefixCls } = useContext(ConfigContext);

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

export interface ListItemTypeProps
  extends ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLElement>> {
  Meta: typeof Meta;
}

const InternalItem: ForwardRefRenderFunction<HTMLDivElement, ListItemProps> = (
  { prefixCls: customizePrefixCls, children, actions, extra, className, colStyle, ...others },
  ref,
) => {
  const { grid, itemLayout } = useContext(ListContext);
  const { getPrefixCls } = useContext(ConfigContext);

  const isItemContainsTextNodeAndNotSingular = () => {
    let result;
    Children.forEach(children, (element: ReactElement<any>) => {
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
    <ul className={`${prefixCls}-item-action`} key="actions">
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
      className={classNames(
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
            <div className={`${prefixCls}-item-extra`} key="extra">
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
};
const Item = forwardRef(InternalItem) as ListItemTypeProps;

Item.Meta = Meta;

export default Item;
