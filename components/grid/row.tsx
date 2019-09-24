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
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number | Partial<Record<Breakpoint, number>>;
  vgutter?: number | Partial<Record<Breakpoint, number>>;
  type?: 'flex';
  align?: (typeof RowAligns)[number];
  justify?: (typeof RowJustify)[number];
  prefixCls?: string;
}

export interface RowState {
  screens: BreakpointMap;
}

export interface Gutters {
  gutter: number;
  vgutter: number;
}

export default class Row extends React.Component<RowProps, RowState> {
  static defaultProps = {
    gutter: 0,
    vgutter: 0,
  };

  static propTypes = {
    type: PropTypes.oneOf<'flex'>(['flex']),
    align: PropTypes.oneOf(RowAligns),
    justify: PropTypes.oneOf(RowJustify),
    className: PropTypes.string,
    children: PropTypes.node,
    gutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    vgutter: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    prefixCls: PropTypes.string,
  };

  state: RowState = {
    screens: {},
  };

  token: string;

  componentDidMount() {
    this.token = ResponsiveObserve.subscribe(screens => {
      if (typeof this.props.gutter === 'object' || typeof this.props.vgutter === 'object') {
        this.setState({ screens });
      }
    });
  }

  componentWillUnmount() {
    ResponsiveObserve.unsubscribe(this.token);
  }

  getGutters(): Gutters {
    const gutters: Gutters = { gutter: 0, vgutter: 0 };
    const { gutter, vgutter } = this.props;
    Object.entries({ gutter, vgutter }).forEach(([key, v]: ['gutter' | 'vgutter', number]) => {
      if (typeof v === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint: Breakpoint = responsiveArray[i];
          if (this.state.screens[breakpoint] && v[breakpoint] !== undefined) {
            gutters[key] = v[breakpoint];
          }
        }
      } else {
        gutters[key] = v;
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
    const { gutter, vgutter } = this.getGutters();
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
      ...(gutter! > 0
        ? {
            marginLeft: gutter! / -2,
            marginRight: gutter! / -2,
          }
        : {}),
      ...(vgutter! > 0
        ? {
            marginTop: vgutter! / -2,
            marginBottom: vgutter! / -2,
          }
        : {}),
      ...style,
    };
    const otherProps = { ...others };
    delete otherProps.gutter;
    delete otherProps.vgutter;
    return (
      <RowContext.Provider value={{ gutter, vgutter }}>
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
