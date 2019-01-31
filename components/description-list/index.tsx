import * as React from 'react';
import classNames from 'classnames';
import warning from '../_util/warning';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface DescriptionListItemProps {
  prefixCls?: string;
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}

const DescriptionListItem = (props: DescriptionListItemProps) => {
  const { prefixCls, label, children, span = 1 } = props;
  return [
    <td className={`${prefixCls}-item-label`} key="label">
      {label}
    </td>,
    <td className={`${prefixCls}-item-content`} key="content" colSpan={span * 2 - 1}>
      {children}
    </td>,
  ];
};

export interface DescriptionListProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  border?: boolean;
  size?: 'middle' | 'small' | 'default';
  children?: React.ReactNode;
  title?: string;
  column?: number;
}

interface DescriptionListClass extends React.SFC<DescriptionListProps> {
  Item: typeof DescriptionListItem;
}

const genChildrenArray = (
  cloneChildren: React.ReactNode,
  column: number,
): Array<React.ReactNode[]> => {
  const childrenArray: Array<React.ReactNode[]> = [];
  let columnArray: React.ReactNode[] = [];
  let width = 0;
  React.Children.forEach(
    cloneChildren,
    (children: React.ReactElement<DescriptionListItemProps>) => {
      columnArray.push(children);
      if (children.props.span) {
        width += children.props.span;
      } else {
        width += 1;
      }
      if (width >= column) {
        childrenArray.push(columnArray);
        columnArray = [];
        width = 0;
        warning(width > column, `column max is ${column}, here has width`);
      }
    },
  );
  if (columnArray.length > 0) {
    childrenArray.push(columnArray);
    columnArray = [];
  }
  return childrenArray;
};

const renderRow = (
  child: React.ReactNode[],
  index: number,
  { prefixCls, column, isLast }: { prefixCls: string; column: number; isLast: boolean },
) => {
  let lastChild = child.pop();
  if (isLast) {
    lastChild = React.cloneElement(lastChild as React.ReactElement<any>, {
      span: column - child.length,
    });
  }
  return (
    <tr className={`${prefixCls}-item`} key={index}>
      {child}
      {lastChild}
    </tr>
  );
};

const DescriptionList: DescriptionListClass = (props: DescriptionListProps) => (
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
      const prefixCls = getPrefixCls('description-list', customizePrefixCls);

      const cloneChildren = React.Children.map(children, (child: React.ReactElement<any>) => {
        return React.cloneElement(child, {
          prefixCls,
        });
      });
      const childrenArray: Array<React.ReactNode[]> = genChildrenArray(cloneChildren, column);
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

DescriptionList.defaultProps = {
  size: 'default',
};

DescriptionList.Item = DescriptionListItem;

export default DescriptionList;
