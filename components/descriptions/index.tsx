import * as React from 'react';
import classNames from 'classnames';
import warning from '../_util/warning';
import ResponsiveObserve, {
  Breakpoint,
  BreakpointMap,
  responsiveArray,
} from '../_util/responsiveObserve';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface DescriptionsItemProps {
  prefixCls?: string;
  className?: string;
  label?: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}

const DescriptionsItem: React.SFC<DescriptionsItemProps> = ({ children }) =>
  children as JSX.Element;

export interface DescriptionsProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  bordered?: boolean;
  size?: 'middle' | 'small' | 'default';
  children?: React.ReactNode;
  title?: React.ReactNode;
  column?: number | Partial<Record<Breakpoint, number>>;
  layout?: 'horizontal' | 'vertical';
}

/**
 * Convert children into `column` groups.
 * @param cloneChildren: DescriptionsItem
 * @param column: number
 */
const generateChildrenRows = (
  cloneChildren: React.ReactNode,
  column: number,
): React.ReactElement<DescriptionsItemProps>[][] => {
  const childrenArray: React.ReactElement<DescriptionsItemProps>[][] = [];
  let columnArray: React.ReactElement<DescriptionsItemProps>[] = [];
  let totalRowSpan = 0;
  React.Children.forEach(cloneChildren, (node: React.ReactElement<DescriptionsItemProps>) => {
    columnArray.push(node);
    if (node.props.span) {
      totalRowSpan += node.props.span;
    } else {
      totalRowSpan += 1;
    }
    if (totalRowSpan >= column) {
      warning(
        totalRowSpan <= column,
        'Descriptions',
        'Sum of column `span` in a line exceeds `column` of Descriptions.',
      );

      childrenArray.push(columnArray);
      columnArray = [];
      totalRowSpan = 0;
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
 * It can convert a children into th and td
 * @param child DescriptionsItem
 * @returns
 * <>
 *   <th>{DescriptionsItem.label}</th>
 *   <td>{DescriptionsItem.children}</td>
 * </>
 */
const renderCol = (child: React.ReactElement<DescriptionsItemProps>, bordered: boolean) => {
  const { prefixCls, label, className, children, span = 1 } = child.props;
  if (bordered) {
    return [
      <th
        className={classNames(`${prefixCls}-item-label`, className, {
          [`${prefixCls}-item-no-label`]: !label,
        })}
        key="label"
      >
        {label}
      </th>,
      <td
        className={classNames(`${prefixCls}-item-content`, className)}
        key="content"
        colSpan={span * 2 - 1}
      >
        {children}
      </td>,
    ];
  }
  return (
    <td colSpan={span} className={classNames(`${prefixCls}-item`, className)}>
      <span
        className={classNames(`${prefixCls}-item-label`, {
          [`${prefixCls}-item-no-label`]: !label,
        })}
        key="label"
      >
        {label}
      </span>
      <span className={`${prefixCls}-item-content`} key="content">
        {children}
      </span>
    </td>
  );
};

const renderLabelCol = (child: React.ReactElement<DescriptionsItemProps>, bordered: boolean) => {
  const { prefixCls, label, span = 1 } = child.props;
  if (bordered) {
    return (
      <td className={`${prefixCls}-item-label`} key="label" colSpan={span * 2 - 1}>
        {label}
      </td>
    );
  }
  return (
    <td colSpan={span} className={`${prefixCls}-item`}>
      <span className={`${prefixCls}-item-label`} key="label">
        {label}
      </span>
    </td>
  );
};

const renderContentCol = (child: React.ReactElement<DescriptionsItemProps>, bordered: boolean) => {
  const { prefixCls, children, span = 1 } = child.props;
  if (bordered) {
    return (
      <td className={`${prefixCls}-item-content`} key="content" colSpan={span * 2 - 1}>
        {children}
      </td>
    );
  }
  return (
    <td colSpan={span} className={`${prefixCls}-item`}>
      <span className={`${prefixCls}-item-content`} key="content">
        {children}
      </span>
    </td>
  );
};

const renderRow = (
  children: React.ReactElement<DescriptionsItemProps>[],
  index: number,
  { prefixCls, column, isLast }: { prefixCls: string; column: number; isLast: boolean },
  bordered: boolean,
  layout: string,
) => {
  // copy children,prevent changes to incoming parameters
  const childrenArray = [...children];
  let lastChildren = childrenArray.pop() as React.ReactElement<DescriptionsItemProps>;
  const span = column - childrenArray.length;
  if (isLast) {
    lastChildren = React.cloneElement(lastChildren as React.ReactElement<DescriptionsItemProps>, {
      span,
    });
  }

  if (layout === 'vertical') {
    const cloneLabelChildren = React.Children.map(
      childrenArray,
      (childrenItem: React.ReactElement<DescriptionsItemProps>) => {
        return renderLabelCol(childrenItem, bordered);
      },
    );
    const cloneContentChildren = React.Children.map(
      childrenArray,
      (childrenItem: React.ReactElement<DescriptionsItemProps>) => {
        return renderContentCol(childrenItem, bordered);
      },
    );
    return [
      <tr className={`${prefixCls}-row`} key={`label-${index}`}>
        {cloneLabelChildren}
        {renderLabelCol(lastChildren, bordered)}
      </tr>,
      <tr className={`${prefixCls}-row`} key={`content-${index}`}>
        {cloneContentChildren}
        {renderContentCol(lastChildren, bordered)}
      </tr>,
    ];
  }
  const cloneChildren = React.Children.map(
    childrenArray,
    (childrenItem: React.ReactElement<DescriptionsItemProps>) => {
      return renderCol(childrenItem, bordered);
    },
  );
  return (
    <tr className={`${prefixCls}-row`} key={index}>
      {cloneChildren}
      {renderCol(lastChildren, bordered)}
    </tr>
  );
};

const defaultColumnMap = {
  xxl: 3,
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1,
};

class Descriptions extends React.Component<
  DescriptionsProps,
  {
    screens: BreakpointMap;
  }
> {
  static defaultProps: DescriptionsProps = {
    size: 'default',
    column: defaultColumnMap,
  };
  static Item: typeof DescriptionsItem = DescriptionsItem;
  state: {
    screens: BreakpointMap;
  } = {
    screens: {},
  };
  token: string;
  componentDidMount() {
    const { column } = this.props;
    this.token = ResponsiveObserve.subscribe(screens => {
      if (typeof column !== 'object') {
        return;
      }
      this.setState({
        screens,
      });
    });
  }

  componentWillUnmount() {
    ResponsiveObserve.unsubscribe(this.token);
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
            bordered = false,
            layout = 'horizontal',
            style,
          } = this.props;
          const prefixCls = getPrefixCls('descriptions', customizePrefixCls);

          const column = this.getColumn();
          const cloneChildren = React.Children.map(
            children,
            (child: React.ReactElement<DescriptionsItemProps>) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  prefixCls,
                });
              }
              return child;
            },
          );

          const childrenArray: Array<
            React.ReactElement<DescriptionsItemProps>[]
          > = generateChildrenRows(cloneChildren, column);
          return (
            <div
              className={classNames(prefixCls, className, {
                [`${prefixCls}-${size}`]: size !== 'default',
                [`${prefixCls}-bordered`]: !!bordered,
              })}
              style={style}
            >
              {title && <div className={`${prefixCls}-title`}>{title}</div>}
              <div className={`${prefixCls}-view`}>
                <table>
                  <tbody>
                    {childrenArray.map((child, index) =>
                      renderRow(
                        child,
                        index,
                        {
                          prefixCls,
                          column,
                          isLast: index + 1 === childrenArray.length,
                        },
                        bordered,
                        layout,
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}

export default Descriptions;
