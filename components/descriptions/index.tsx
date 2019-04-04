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
  bordered?: boolean;
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
      warning(
        width > column,
        'Descriptions',
        'Sum of column `span` in a line exceeds `column` of Descriptions.',
      );
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
const renderCol = (child: React.ReactElement<DescriptionsItemProps>) => {
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
  children: React.ReactElement<DescriptionsItemProps>[],
  index: number,
  { prefixCls, column, isLast }: { prefixCls: string; column: number; isLast: boolean },
) => {
  let lastChildren = children[children.length - 1] as React.ReactElement<DescriptionsItemProps>;
  const span = column - children.length;
  if (isLast && span > 0) {
    lastChildren = React.cloneElement(lastChildren as React.ReactElement<DescriptionsItemProps>, {
      span,
    });
  }
  const cloneChildren = React.Children.map(
    children,
    (childrenItem: React.ReactElement<DescriptionsItemProps>) => {
      return renderCol(childrenItem);
    },
  );
  return (
    <tr className={`${prefixCls}-item`} key={index}>
      {cloneChildren}
      {renderCol(lastChildren)}
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
    }

    //If the configuration is not an object, it is a number, return number
    if (typeof column === 'number') {
      return column as number;
    }
    // If it is an object, but no response is found, this happens only in the test.
    // Maybe there are some strange environments
    return 3;
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
            bordered,
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
                bordered,
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
