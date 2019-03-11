import * as React from 'react';
import classNames from 'classnames';
import warning from '../_util/warning';
import { responsiveMap, Breakpoint, RowState, enquire, responsiveArray } from '../grid/row';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface DescriptionsItemProps {
  prefixCls?: string;
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}

const DescriptionsItem = (props: DescriptionsItemProps) => {
  return props.children;
};

export interface DescriptionsProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  border?: boolean;
  size?: 'middle' | 'small' | 'default';
  children?: React.ReactNode;
  title?: string;
  column?: number | Partial<Record<Breakpoint, number>>;
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

const defaultColumnMap = {
  xxl: 4,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1,
};

class Descriptions extends React.Component<DescriptionsProps, RowState> {
  static defaultProps: DescriptionsProps = {
    size: 'default',
    column: defaultColumnMap,
  };
  static Item: typeof DescriptionsItem;
  state: RowState = {
    screens: {},
  };

  componentDidMount() {
    const { column } = this.props;
    Object.keys(responsiveMap).map((screen: Breakpoint) =>
      enquire.register(responsiveMap[screen], {
        match: () => {
          if (typeof column !== 'object') {
            return;
          }
          this.setState(prevState => ({
            screens: {
              ...prevState.screens,
              [screen]: true,
            },
          }));
        },
        unmatch: () => {
          if (typeof column !== 'object') {
            return;
          }
          this.setState(prevState => ({
            screens: {
              ...prevState.screens,
              [screen]: false,
            },
          }));
        },
        // Keep a empty destory to avoid triggering unmatch when unregister
        destroy() {},
      }),
    );
  }

  componentWillUnmount() {
    Object.keys(responsiveMap).map((screen: Breakpoint) =>
      enquire.unregister(responsiveMap[screen]),
    );
  }

  getColumn(): number {
    const { column } = this.props;
    if (typeof column === 'object') {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        if (this.state.screens[breakpoint] && column[breakpoint] !== undefined) {
          return column[breakpoint] || defaultColumnMap[breakpoint];
        }
      }
      return column.md as number;
    }
    return column as number;
  }

  render() {
    return (
      <ConfigConsumer>
        {({ getPrefixCls }: ConfigConsumerProps) => {
          const {
            className,
            prefixCls: customizePrefixCls,
            title,
            size,
            children,
            border,
          } = this.props;
          const prefixCls = getPrefixCls('descriptions', customizePrefixCls);

          const column = this.getColumn();

          const cloneChildren = React.Children.map(
            children,
            (child: React.ReactElement<DescriptionsItemProps>) => {
              return React.cloneElement(child, {
                prefixCls,
              });
            },
          );

          const childrenArray: Array<
            React.ReactElement<DescriptionsItemProps>[]
          > = genChildrenArray(cloneChildren, column);

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
  }
}

Descriptions.Item = DescriptionsItem;

export default Descriptions;
