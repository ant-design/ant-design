import * as React from 'react';
import classNames from 'classnames';
import warning from '../_util/warning';
import ResponsiveObserve, {
  Breakpoint,
  BreakpointMap,
  responsiveArray,
} from '../_util/responsiveObserve';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Col from './Col';

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
  colon?: boolean;
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

const renderRow = (
  children: React.ReactElement<DescriptionsItemProps>[],
  index: number,
  { prefixCls, column, isLast }: { prefixCls: string; column: number; isLast: boolean },
  bordered: boolean,
  layout: 'horizontal' | 'vertical',
  colon: boolean,
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
  childrenArray.push(lastChildren);

  const renderCol = (
    childrenItem: React.ReactElement<DescriptionsItemProps>,
    type: 'label' | 'content',
    idx: number,
  ) => (
    <Col
      child={childrenItem}
      bordered={bordered}
      colon={colon}
      type={type}
      key={`${type}-${idx}`}
      layout={layout}
    />
  );

  const cloneChildren: JSX.Element[] = [];
  const cloneContentChildren: JSX.Element[] = [];
  React.Children.forEach(
    childrenArray,
    (childrenItem: React.ReactElement<DescriptionsItemProps>, idx: number) => {
      cloneChildren.push(renderCol(childrenItem, 'label', idx));
      if (layout === 'vertical') {
        cloneContentChildren.push(renderCol(childrenItem, 'content', idx));
      } else if (bordered) {
        cloneChildren.push(renderCol(childrenItem, 'content', idx));
      }
    },
  );

  if (layout === 'vertical') {
    return [
      <tr className={`${prefixCls}-row`} key={`label-${index}`}>
        {cloneChildren}
      </tr>,
      <tr className={`${prefixCls}-row`} key={`content-${index}`}>
        {cloneContentChildren}
      </tr>,
    ];
  }

  return (
    <tr className={`${prefixCls}-row`} key={index}>
      {cloneChildren}
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
    // If the configuration is not an object, it is a number, return number
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
            colon = true,
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
                        colon,
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
