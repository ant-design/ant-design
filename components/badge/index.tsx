import * as React from 'react';
import * as PropTypes from 'prop-types';
import Animate from 'rc-animate';
import omit from 'omit.js';
import classNames from 'classnames';
import ScrollNumber from './ScrollNumber';
import { PresetColorTypes } from '../_util/colors';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export { ScrollNumberProps } from './ScrollNumber';

export interface BadgeProps {
  /** Number to show in badge */
  count?: React.ReactNode;
  showZero?: boolean;
  /** Max count to show */
  overflowCount?: number;
  /** whether to show red dot without number */
  dot?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  scrollNumberPrefixCls?: string;
  className?: string;
  status?: 'success' | 'processing' | 'default' | 'error' | 'warning';
  color?: string;
  text?: React.ReactNode;
  offset?: [number | string, number | string];
  title?: string;
}

function isPresetColor(color?: string): boolean {
  return (PresetColorTypes as any[]).indexOf(color) !== -1;
}

export default class Badge extends React.Component<BadgeProps, any> {
  static defaultProps = {
    count: null,
    showZero: false,
    dot: false,
    overflowCount: 99,
  };

  static propTypes = {
    count: PropTypes.node,
    showZero: PropTypes.bool,
    dot: PropTypes.bool,
    overflowCount: PropTypes.number,
  };

  getNumberedDispayCount() {
    const { count, overflowCount } = this.props;
    const displayCount =
      (count as number) > (overflowCount as number) ? `${overflowCount}+` : count;
    return displayCount as string | number | null;
  }

  getDispayCount() {
    const isDot = this.isDot();
    // dot mode don't need count
    if (isDot) {
      return '';
    }
    return this.getNumberedDispayCount();
  }

  getScrollNumberTitle() {
    const { title, count } = this.props;
    if (title) {
      return title;
    }
    return typeof count === 'string' || typeof count === 'number' ? count : undefined;
  }

  getStyleWithOffset() {
    const { offset, style } = this.props;
    return offset
      ? {
          right: -parseInt(offset[0] as string, 10),
          marginTop: offset[1],
          ...style,
        }
      : style;
  }

  getBadgeClassName(prefixCls: string) {
    const { className, children } = this.props;
    return classNames(className, prefixCls, {
      [`${prefixCls}-status`]: this.hasStatus(),
      [`${prefixCls}-not-a-wrapper`]: !children,
    }) as string;
  }

  hasStatus(): boolean {
    const { status, color } = this.props;
    return !!status || !!color;
  }

  isZero() {
    const numberedDispayCount = this.getNumberedDispayCount();
    return numberedDispayCount === '0' || numberedDispayCount === 0;
  }

  isDot() {
    const { dot } = this.props;
    const isZero = this.isZero();
    return (dot && !isZero) || this.hasStatus();
  }

  isHidden() {
    const { showZero } = this.props;
    const displayCount = this.getDispayCount();
    const isZero = this.isZero();
    const isDot = this.isDot();
    const isEmpty = displayCount === null || displayCount === undefined || displayCount === '';
    return (isEmpty || (isZero && !showZero)) && !isDot;
  }

  renderStatusText(prefixCls: string) {
    const { text } = this.props;
    const hidden = this.isHidden();
    return hidden || !text ? null : <span className={`${prefixCls}-status-text`}>{text}</span>;
  }

  renderDispayComponent() {
    const { count } = this.props;
    const customNode = count as React.ReactElement<any>;
    if (!customNode || typeof customNode !== 'object') {
      return undefined;
    }
    return React.cloneElement(customNode, {
      style: {
        ...this.getStyleWithOffset(),
        ...(customNode.props && customNode.props.style),
      },
    });
  }

  renderBadgeNumber(prefixCls: string, scrollNumberPrefixCls: string) {
    const { status, count } = this.props;

    const displayCount = this.getDispayCount();
    const isDot = this.isDot();
    const hidden = this.isHidden();

    const scrollNumberCls = classNames({
      [`${prefixCls}-dot`]: isDot,
      [`${prefixCls}-count`]: !isDot,
      [`${prefixCls}-multiple-words`]:
        !isDot && count && count.toString && count.toString().length > 1,
      [`${prefixCls}-status-${status}`]: this.hasStatus(),
    });

    return hidden ? null : (
      <ScrollNumber
        prefixCls={scrollNumberPrefixCls}
        data-show={!hidden}
        className={scrollNumberCls}
        count={displayCount}
        displayComponent={this.renderDispayComponent()} // <Badge status="success" count={<Icon type="xxx" />}></Badge>
        title={this.getScrollNumberTitle()}
        style={this.getStyleWithOffset()}
        key="scrollNumber"
      />
    );
  }

  renderBadge = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      scrollNumberPrefixCls: customizeScrollNumberPrefixCls,
      children,
      status,
      text,
      color,
      ...restProps
    } = this.props;
    const omitArr = [
      'count',
      'showZero',
      'overflowCount',
      'className',
      'style',
      'dot',
      'offset',
      'title',
    ];

    const prefixCls = getPrefixCls('badge', customizePrefixCls);
    const scrollNumberPrefixCls = getPrefixCls('scroll-number', customizeScrollNumberPrefixCls);

    const scrollNumber = this.renderBadgeNumber(prefixCls, scrollNumberPrefixCls);
    const statusText = this.renderStatusText(prefixCls);

    const statusCls = classNames({
      [`${prefixCls}-status-dot`]: this.hasStatus(),
      [`${prefixCls}-status-${status}`]: !!status,
      [`${prefixCls}-status-${color}`]: isPresetColor(color),
    });
    const statusStyle: React.CSSProperties = {};
    if (color && !isPresetColor(color)) {
      statusStyle.background = color;
    }

    // <Badge status="success" />
    if (!children && this.hasStatus()) {
      const styleWithOffset = this.getStyleWithOffset();
      const statusTextColor = styleWithOffset && styleWithOffset.color;
      return (
        <span
          {...omit(restProps, omitArr)}
          className={this.getBadgeClassName(prefixCls)}
          style={styleWithOffset}
        >
          <span className={statusCls} style={statusStyle} />
          <span style={{ color: statusTextColor }} className={`${prefixCls}-status-text`}>
            {text}
          </span>
        </span>
      );
    }

    return (
      <span {...omit(restProps, omitArr)} className={this.getBadgeClassName(prefixCls)}>
        {children}
        <Animate
          component=""
          showProp="data-show"
          transitionName={children ? `${prefixCls}-zoom` : ''}
          transitionAppear
        >
          {scrollNumber}
        </Animate>
        {statusText}
      </span>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderBadge}</ConfigConsumer>;
  }
}
