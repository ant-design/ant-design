import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
let enquire: any;
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {},
      removeListener() {},
    };
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  enquire = require('enquire.js');
}

import * as React from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import RowContext from './RowContext';
import { tuple } from '../_util/type';

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BreakpointMap = Partial<Record<Breakpoint, string>>;
const RowAligns = tuple('top', 'middle', 'bottom');
const RowJustify = tuple('start', 'end', 'center', 'space-around', 'space-between');
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number | Partial<Record<Breakpoint, number>>;
  type?: 'flex';
  align?: (typeof RowAligns)[number];
  justify?: (typeof RowJustify)[number];
  prefixCls?: string;
}

export interface RowState {
  screens: BreakpointMap;
}

const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
};

export default class Row extends React.Component<RowProps, RowState> {
  static defaultProps = {
    gutter: 0,
  };

  static propTypes = {
    type: PropTypes.oneOf<'flex'>(['flex']),
    align: PropTypes.oneOf(RowAligns),
    justify: PropTypes.oneOf(RowJustify),
    className: PropTypes.string,
    children: PropTypes.node,
    gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    prefixCls: PropTypes.string,
  };

  state: RowState = {
    screens: {},
  };

  componentDidMount() {
    Object.keys(responsiveMap).map((screen: Breakpoint) =>
      enquire.register(responsiveMap[screen], {
        match: () => {
          if (typeof this.props.gutter !== 'object') {
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
          if (typeof this.props.gutter !== 'object') {
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
  getGutter(): number | undefined {
    const { gutter } = this.props;
    if (typeof gutter === 'object') {
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint: Breakpoint = responsiveArray[i];
        if (this.state.screens[breakpoint] && gutter[breakpoint] !== undefined) {
          return gutter[breakpoint];
        }
      }
    }
    return gutter as number;
  }
  renderRow = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      type,
      justify,
      align,
      className,
      style,
      children,
      ...others
    } = this.props;
    const prefixCls = getPrefixCls('row', customizePrefixCls);
    const gutter = this.getGutter();
    const classes = classNames(
      {
        [prefixCls]: !type,
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${type}-${justify}`]: type && justify,
        [`${prefixCls}-${type}-${align}`]: type && align,
      },
      className,
    );
    const rowStyle =
      gutter! > 0
        ? {
            marginLeft: gutter! / -2,
            marginRight: gutter! / -2,
            ...style,
          }
        : style;
    const otherProps = { ...others };
    delete otherProps.gutter;
    return (
      <RowContext.Provider value={{ gutter }}>
        <div {...otherProps} className={classes} style={rowStyle}>
          {children}
        </div>
      </RowContext.Provider>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderRow}</ConfigConsumer>;
  }
}
