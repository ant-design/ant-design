import * as React from 'react';
import classNames from 'classnames';
import toArray from 'rc-util/lib/Children/toArray';
import warning from '../_util/warning';
import ResponsiveObserve, {
  Breakpoint,
  ScreenMap,
  responsiveArray,
} from '../_util/responsiveObserve';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Col from './Col';

// https://github.com/smooth-code/react-flatten-children/
function flattenChildren(children: React.ReactNode): JSX.Element[] {
  if (!children) {
    return [];
  }
  return toArray(children).reduce((flatChildren: JSX.Element[], child: JSX.Element) => {
    if (child && child.type === React.Fragment) {
      return flatChildren.concat(flattenChildren(child.props.children));
    }
    flatChildren.push(child);
    return flatChildren;
  }, []);
}

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
 * @param children: DescriptionsItem
 * @param column: number
 */
const generateChildrenRows = (
  children: React.ReactNode,
  column: number,
): React.ReactElement<DescriptionsItemProps>[][] => {
  const rows: React.ReactElement<DescriptionsItemProps>[][] = [];
  let columns: React.ReactElement<DescriptionsItemProps>[] | null = null;
  let leftSpans: number;

  const itemNodes = flattenChildren(children);
  itemNodes.forEach((node: React.ReactElement<DescriptionsItemProps>, index: number) => {
    let itemNode = node;

    if (!columns) {
      leftSpans = column;
      columns = [];
      rows.push(columns);
    }

    // Always set last span to align the end of Descriptions
    const lastItem = index === itemNodes.length - 1;
    let lastSpanSame = true;
    if (lastItem) {
      lastSpanSame = !itemNode.props.span || itemNode.props.span === leftSpans;
      itemNode = React.cloneElement(itemNode, {
        span: leftSpans,
      });
    }

    // Calculate left fill span
    const { span = 1 } = itemNode.props;
    columns.push(itemNode);
    leftSpans -= span;

    if (leftSpans <= 0) {
      columns = null;

      warning(
        leftSpans === 0 && lastSpanSame,
        'Descriptions',
        'Sum of column `span` in a line not match `column` of Descriptions.',
      );
    }
  });

  return rows;
};

const renderRow = (
  children: React.ReactElement<DescriptionsItemProps>[],
  index: number,
  { prefixCls }: { prefixCls: string },
  bordered: boolean,
  layout: 'horizontal' | 'vertical',
  colon: boolean,
) => {
  const renderCol = (
    colItem: React.ReactElement<DescriptionsItemProps>,
    type: 'label' | 'content',
    idx: number,
  ) => {
    return (
      <Col
        child={colItem}
        bordered={bordered}
        colon={colon}
        type={type}
        key={`${type}-${colItem.key || idx}`}
        layout={layout}
      />
    );
  };

  const cloneChildren: JSX.Element[] = [];
  const cloneContentChildren: JSX.Element[] = [];
  flattenChildren(children).forEach(
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
    screens: ScreenMap;
  }
> {
  static defaultProps: DescriptionsProps = {
    size: 'default',
    column: defaultColumnMap,
  };

  static Item: typeof DescriptionsItem = DescriptionsItem;

  state: {
    screens: ScreenMap;
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
        {({ getPrefixCls, direction }: ConfigConsumerProps) => {
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
          const cloneChildren = flattenChildren(children)
            .map((child: React.ReactElement<DescriptionsItemProps>) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  prefixCls,
                });
              }
              return null;
            })
            .filter((node: React.ReactElement) => node);

          const childrenArray: Array<React.ReactElement<
            DescriptionsItemProps
          >[]> = generateChildrenRows(cloneChildren, column);
          return (
            <div
              className={classNames(prefixCls, className, {
                [`${prefixCls}-${size}`]: size !== 'default',
                [`${prefixCls}-bordered`]: !!bordered,
                [`${prefixCls}-rtl`]: direction === 'rtl',
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
