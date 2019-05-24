import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import RowContext from './RowContext';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

const objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);

// https://github.com/ant-design/ant-design/issues/14324
type ColSpanType = number | string;

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
}

export default class Col extends React.Component<ColProps, {}> {
  static propTypes = {
    span: PropTypes.number,
    order: PropTypes.number,
    offset: PropTypes.number,
    push: PropTypes.number,
    pull: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
    xs: objectOrNumber,
    sm: objectOrNumber,
    md: objectOrNumber,
    lg: objectOrNumber,
    xl: objectOrNumber,
    xxl: objectOrNumber,
  };

  renderCol = ({ getPrefixCls }: ConfigConsumerProps) => {
    const props: any = this.props;
    const {
      prefixCls: customizePrefixCls,
      span,
      order,
      offset,
      push,
      pull,
      className,
      children,
      ...others
    } = props;
    const prefixCls = getPrefixCls('col', customizePrefixCls);
    let sizeClassObj = {};
    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
      let sizeProps: ColSize = {};
      if (typeof props[size] === 'number') {
        sizeProps.span = props[size];
      } else if (typeof props[size] === 'object') {
        sizeProps = props[size] || {};
      }

      delete others[size];

      sizeClassObj = {
        ...sizeClassObj,
        [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
        [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
        [`${prefixCls}-${size}-offset-${sizeProps.offset}`]:
          sizeProps.offset || sizeProps.offset === 0,
        [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
        [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
      };
    });
    const classes = classNames(
      prefixCls,
      {
        [`${prefixCls}-${span}`]: span !== undefined,
        [`${prefixCls}-order-${order}`]: order,
        [`${prefixCls}-offset-${offset}`]: offset,
        [`${prefixCls}-push-${push}`]: push,
        [`${prefixCls}-pull-${pull}`]: pull,
      },
      className,
      sizeClassObj,
    );

    return (
      <RowContext.Consumer>
        {({ gutter }) => {
          let style = others.style;
          if (gutter! > 0) {
            style = {
              paddingLeft: gutter! / 2,
              paddingRight: gutter! / 2,
              ...style,
            };
          }
          return (
            <div {...others} style={style} className={classes}>
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
