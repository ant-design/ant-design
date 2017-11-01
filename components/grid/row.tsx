// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string): MediaQueryList => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {
      },
      removeListener() {
      },
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

import React from 'react';
import { Children, cloneElement } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
const enquire = require('enquire.js').default;

export interface RowProps {
  className?: string;
  gutter?: number;
  type?: 'flex';
  align?: 'top' | 'middle' | 'bottom';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  style?: React.CSSProperties;
  prefixCls?: string;
}

const responsiveMap = {
  xs: '(max-width: 575px)',
  sm: 'only screen and (min-width: 576px) and (max-width: 767px)',
  md: 'only screen and (min-width: 767px) and (max-width: 991px)',
  lg: 'only screen and (min-width: 992px) and (max-width: 1199px)',
  xl: 'only screen and (min-width: 1200px) and (max-width: 1599px)',
  xxl: '(min-width: 1600px)',
};

export default class Row extends React.Component<RowProps, {}> {
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
  state = {
    screen: 'xxl',
  };
  componentDidMount() {
    Object.keys(responsiveMap)
      .map((screen) => enquire.register(
        responsiveMap[screen], () => this.setState({ screen }),
      ));
  }
  componentWillUnmount() {
    Object.keys(responsiveMap)
      .map(screen => enquire.unregister(responsiveMap[screen]));
  }
  getGutter() {
    const { gutter } = this.props;
    if (typeof gutter === 'object') {
      return gutter[this.state.screen];
    }
    return gutter;
  }
  render() {
    const {
      type, justify, align, className, style, children,
      prefixCls = 'ant-row', ...others,
    } = this.props;
    const gutter = this.getGutter();
    const classes = classNames({
      [prefixCls]: !type,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${type}-${justify}`]: type && justify,
      [`${prefixCls}-${type}-${align}`]: type && align,
    }, className);
    const rowStyle = (gutter as number) > 0 ? {
      marginLeft: (gutter as number) / -2,
      marginRight: (gutter as number) / -2,
      ...style,
    } : style;
    const cols = Children.map(children, (col: React.ReactElement<HTMLDivElement>) => {
      if (!col) {
        return null;
      }
      if (col.props && (gutter as number) > 0) {
        return cloneElement(col, {
          style: {
            paddingLeft: (gutter as number) / 2,
            paddingRight: (gutter as number) / 2,
            ...col.props.style,
          },
        });
      }
      return col;
    });
    const otherProps = { ...others };
    delete otherProps.gutter;
    return <div {...otherProps} className={classes} style={rowStyle}>{cols}</div>;
  }
}
