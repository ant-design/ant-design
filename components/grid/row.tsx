import * as React from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import RowContext from './RowContext';
import { tuple } from '../_util/type';
import ResponsiveObserve, {
  Breakpoint,
  BreakpointMap,
  responsiveArray,
} from '../_util/responsiveObserve';

const RowAligns = tuple('top', 'middle', 'bottom', 'stretch');
const RowJustify = tuple('start', 'end', 'center', 'space-around', 'space-between');

export type Gutter = number | Partial<Record<Breakpoint, number>>;
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: Gutter | [Gutter, Gutter];
  type?: 'flex';
  align?: (typeof RowAligns)[number];
  justify?: (typeof RowJustify)[number];
  prefixCls?: string;
}

export interface RowState {
  screens: BreakpointMap;
}

export type Gutters = [number, number];

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
    gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    prefixCls: PropTypes.string,
  };

  state: RowState = {
    screens: {},
  };

  token: string;

  componentDidMount() {
    this.token = ResponsiveObserve.subscribe(screens => {
      const { gutter } = this.props;
      if (
        typeof gutter === 'object' ||
        (Array.isArray(gutter) && (typeof gutter[0] === 'object' || typeof gutter[1] === 'object'))
      ) {
        this.setState({ screens });
      }
    });
  }

  componentWillUnmount() {
    ResponsiveObserve.unsubscribe(this.token);
  }

  getGutters(): Gutters {
    const gutters: Gutters = [0, 0];
    const { gutter } = this.props;

    (Array.isArray(gutter) ? gutter : [gutter, 0]).forEach((g, index) => {
      if (typeof g === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint: Breakpoint = responsiveArray[i];
          if (this.state.screens[breakpoint] && g[breakpoint] !== undefined) {
            gutters[index] = g[breakpoint] as number;
          }
        }
      } else {
        gutters[index] = g as number;
      }
    });

    return gutters;
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
    const gutters = this.getGutters();
    const classes = classNames(
      {
        [prefixCls]: !type,
        [`${prefixCls}-${type}`]: type,
        [`${prefixCls}-${type}-${justify}`]: type && justify,
        [`${prefixCls}-${type}-${align}`]: type && align,
      },
      className,
    );
    const rowStyle = {
      ...(gutters[0]! > 0
        ? {
            marginLeft: gutters[0]! / -2,
            marginRight: gutters[0]! / -2,
          }
        : {}),
      ...(gutters[1]! > 0
        ? {
            marginTop: gutters[1]! / -2,
            marginBottom: gutters[1]! / -2,
          }
        : {}),
      ...style,
    };
    const otherProps = { ...others };
    delete otherProps.gutter;

    return (
      <RowContext.Provider value={{ gutters }}>
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
