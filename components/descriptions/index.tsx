import * as React from 'react';
import classNames from 'classnames';
import warning from '../_util/warning';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface DescriptionsItemProps {
  prefixCls?: string;
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}

const DescriptionsItem = (props: DescriptionsItemProps) => {
  const { children } = props;
  return children;
};

export interface DescriptionsProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  border?: boolean;
  size?: 'middle' | 'small' | 'default';
  children?: React.ReactNode;
  title?: string;
  column?: number;
}

interface DescriptionsClass extends React.SFC<DescriptionsProps> {
  Item: typeof DescriptionsItem;
}

/**
 * Convert children into `column` groups.
 * @param cloneChildren: DescriptionsItem
 * @param column: number
 */
const genChildrenArray = (
  cloneChildren: React.ReactNode,
  column: number,
): React.ReactElement<DescriptionsItemProps>[][] => {
  const childrenArray: React.ReactElement<DescriptionsItemProps>[][] = [];
  let columnArray: React.ReactElement<DescriptionsItemProps>[] = [];
  let width = 0;
  React.Children.forEach(cloneChildren, (node: React.ReactElement<DescriptionsItemProps>) => {
    columnArray.push(node);
    if (node.props.span) {
      width += node.props.span;
    } else {
      width += 1;
    }
    if (width >= column) {
      childrenArray.push(columnArray);
      columnArray = [];
      width = 0;
      warning(width > column, 'Descriptions', `column max is ${column}, here has width`);
    }
  });
  if (columnArray.length > 0) {
    childrenArray.push(columnArray);
    columnArray = [];
  }
  return childrenArray;
};

/**
 * This code is for handling react15 does not support returning an array,
 * It can convert a children into two td
 * @param child DescriptionsItem
 * @returns
 * <>
 *   <td>{DescriptionsItem.label}</td>
 *   <td>{DescriptionsItem.children}</td>
 * </>
 */
const renderChildren = (child: React.ReactElement<DescriptionsItemProps>) => {
  const { prefixCls, label, children, span = 1 } = child.props;
  return [
    <td className={`${prefixCls}-item-label`} key="label">
      {label}
    </td>,
    <td className={`${prefixCls}-item-content`} key="content" colSpan={span * 2 - 1}>
      {children}
    </td>,
  ];
};

const renderRow = (
  child: React.ReactElement<DescriptionsItemProps>[],
  index: number,
  { prefixCls, column, isLast }: { prefixCls: string; column: number; isLast: boolean },
) => {
  let lastChild = child.pop() as React.ReactElement<DescriptionsItemProps>;
  if (isLast) {
    lastChild = React.cloneElement(lastChild as React.ReactElement<DescriptionsItemProps>, {
      span: column - child.length,
    });
  }
  const cloneChildren = React.Children.map(
    child,
    (children: React.ReactElement<DescriptionsItemProps>) => {
      return renderChildren(children);
    },
  );
  return (
    <tr className={`${prefixCls}-item`} key={index}>
      {cloneChildren}
      {renderChildren(lastChild)}
    </tr>
  );
};

const Descriptions: DescriptionsClass = (props: DescriptionsProps) => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        className,
        prefixCls: customizePrefixCls,
        column = 3,
        title,
        size,
        children,
        border,
      } = props;
      const prefixCls = getPrefixCls('descriptions', customizePrefixCls);

      const cloneChildren = React.Children.map(
        children,
        (child: React.ReactElement<DescriptionsItemProps>) => {
          return React.cloneElement(child, {
            prefixCls,
          });
        },
      );
      const childrenArray: Array<React.ReactElement<DescriptionsItemProps>[]> = genChildrenArray(
        cloneChildren,
        column,
      );
      return (
        <div
          className={classNames(prefixCls, className, {
            [size as string]: size !== 'default',
            border,
          })}
        >
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
          <div className={`${prefixCls}-view`}>
            <table>
              {childrenArray.map((child, index) =>
                renderRow(child, index, {
                  prefixCls,
                  column,
                  isLast: index + 1 === childrenArray.length,
                }),
              )}
            </table>
          </div>
        </div>
      );
    }}
  </ConfigConsumer>
);

Descriptions.defaultProps = {
  size: 'default',
};

Descriptions.Item = DescriptionsItem;

export default Descriptions;
