import React from 'react';
import { Children, cloneElement } from 'react';
import classNames from 'classnames';
import assign from 'object-assign';
import PropTypes from 'prop-types';

export interface RowProps {
  className?: string;
  gutter?: number;
  type?: 'flex';
  align?: 'top' | 'middle' | 'bottom';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  style?: React.CSSProperties;
  prefixCls?: string;
}

export default class Row extends React.Component<RowProps, any> {
  static defaultProps = {
    gutter: 0,
  };

  static propTypes = {
    type: PropTypes.string,
    align: PropTypes.string,
    justify: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.node,
    gutter: PropTypes.number,
    prefixCls: PropTypes.string,
  };
  render() {
    const { type, justify, align, className, gutter, style, children,
      prefixCls = 'ant-row', ...others } = this.props;
    const classes = classNames({
      [prefixCls]: !type,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${type}-${justify}`]: type && justify,
      [`${prefixCls}-${type}-${align}`]: type && align,
    }, className);
    const rowStyle = (gutter as number) > 0 ? assign({}, {
      marginLeft: (gutter as number) / -2,
      marginRight: (gutter as number) / -2,
    }, style) : style;
    const cols = Children.map(children, (col: React.ReactElement<any>) => {
      if (!col) {
        return null;
      }
      if (col.props && (gutter as number) > 0) {
        return cloneElement(col, {
          style: assign({}, {
            paddingLeft: (gutter as number) / 2,
            paddingRight: (gutter as number) / 2,
          }, col.props.style),
        });
      }
      return col;
    });
    return <div {...others} className={classes} style={rowStyle}>{cols}</div>;
  }
}
