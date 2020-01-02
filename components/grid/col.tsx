import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import RowContext from './RowContext';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { tuple } from '../_util/type';
import { BreakpointMap } from '../_util/responsiveObserve';

// https://github.com/ant-design/ant-design/issues/14324
type ColSpanType = number | string;

type FlexType = number | 'none' | 'auto' | string;

export interface ColSize {
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
}

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: ColSpanType;
  order?: ColSpanType;
  offset?: ColSpanType;
  push?: ColSpanType;
  pull?: ColSpanType;
  xs?: ColSpanType | ColSize;
  sm?: ColSpanType | ColSize;
  md?: ColSpanType | ColSize;
  lg?: ColSpanType | ColSize;
  xl?: ColSpanType | ColSize;
  xxl?: ColSpanType | ColSize;
  prefixCls?: string;
  flex?: FlexType;
}

function parseFlex(flex: FlexType): string {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`;
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`;
  }

  return flex;
}

const RESPONSIVE_LIST = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

const ResponsiveTypes = tuple('xxl', 'xl', 'lg', 'md', 'sm', 'xs');
export type ResponsiveType = typeof ResponsiveTypes[number];

export function getScreenClassNames(
  prefixCls: string,
  screens: BreakpointMap,
  { span, order, offset, push, pull, ...restProps }: ColProps,
) {
  let mergedScreenObj: ColSize = {
    span,
    order,
    offset,
    push,
    pull,
  };

  for (let i = 0; i < RESPONSIVE_LIST.length; i += 1) {
    const screen = RESPONSIVE_LIST[i] as ResponsiveType;
    const screenObj = restProps[screen];
    if (screens[screen] && screenObj !== undefined) {
      mergedScreenObj = typeof screenObj === 'object' ? screenObj : { span: screenObj };
      break;
    }
  }

  return classNames({
    [`${prefixCls}-base-${mergedScreenObj.span}`]: mergedScreenObj.span !== undefined,
    [`${prefixCls}-base-order-${mergedScreenObj.order}`]: mergedScreenObj.order !== undefined,
    [`${prefixCls}-base-offset-${mergedScreenObj.offset}`]: mergedScreenObj.offset !== undefined,
    [`${prefixCls}-base-push-${mergedScreenObj.push}`]: mergedScreenObj.push !== undefined,
    [`${prefixCls}-base-pull-${mergedScreenObj.pull}`]: mergedScreenObj.pull !== undefined,
  });
}

export default class Col extends React.Component<ColProps, {}> {
  renderCol = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { props } = this;
    const { prefixCls: customizePrefixCls, className, children, flex, style, ...others } = props;
    const prefixCls = getPrefixCls('col', customizePrefixCls);
    const restProps = omit(others, [...RESPONSIVE_LIST, 'span', 'order', 'offset', 'push', 'pull']);

    return (
      <RowContext.Consumer>
        {({ gutter, screens = {} }) => {
          let mergedStyle: React.CSSProperties = { ...style };
          const screenClassNames = getScreenClassNames(prefixCls, screens, this.props);

          if (gutter) {
            mergedStyle = {
              ...(gutter[0]! > 0
                ? {
                    paddingLeft: gutter[0]! / 2,
                    paddingRight: gutter[0]! / 2,
                  }
                : {}),
              ...(gutter[1]! > 0
                ? {
                    paddingTop: gutter[1]! / 2,
                    paddingBottom: gutter[1]! / 2,
                  }
                : {}),
              ...mergedStyle,
            };
          }
          if (flex) {
            mergedStyle.flex = parseFlex(flex);
          }

          return (
            <div
              {...restProps}
              style={mergedStyle}
              className={classNames(prefixCls, className, screenClassNames, {
                [`${prefixCls}-rtl`]: direction === 'rtl',
              })}
            >
              {children}
            </div>
          );
        }}
      </RowContext.Consumer>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderCol}</ConfigConsumer>;
  }
}
