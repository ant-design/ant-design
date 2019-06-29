import * as React from 'react';
import classnames from 'classnames';
import { ConfigConsumerProps, ConfigConsumer } from '../config-provider';
import Icon from '../icon';
import noFound from './noFound';
import serverError from './serverError';
import unauthorized from './unauthorized';

const IconMap = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'exclamation-circle',
  warning: 'warning',
};

const ExceptionImageMap = {
  '404': noFound,
  '500': serverError,
  '403': unauthorized,
};

export type ExceptionStatusType = keyof typeof ExceptionImageMap;
export type ResultStatusType = ExceptionStatusType | keyof typeof IconMap;

export interface ResultProps {
  icon?: React.ReactNode;
  status: ResultStatusType;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
}

// ExceptionImageMap keys
const ExceptionStatus = Object.keys(ExceptionImageMap);

/**
 * render icon
 * if ExceptionStatus includes ,render svg image
 * else render iconNode
 * @param prefixCls
 * @param {status, icon}
 */
const renderIcon = (prefixCls: string, { status, icon }: ResultProps) => {
  const className = classnames(`${prefixCls}-icon`);

  if (ExceptionStatus.includes(status)) {
    const SVGComponent = ExceptionImageMap[status as ExceptionStatusType];
    return (
      <div className={`${className} ${prefixCls}-image`}>
        <SVGComponent />
      </div>
    );
  }

  const iconString: string = IconMap[status as Exclude<ResultStatusType, ExceptionStatusType>];
  const iconNode = icon || <Icon type={iconString} theme="filled" />;

  return <div className={className}>{iconNode}</div>;
};

const renderExtra = (prefixCls: string, { extra }: ResultProps) =>
  extra && <div className={`${prefixCls}-extra`}>{extra}</div>;

export const OriginResult: React.SFC<ResultProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls: customizePrefixCls,
        className,
        subTitle,
        title,
        style,
        children,
        status,
      } = props;

      const prefixCls = getPrefixCls('result', customizePrefixCls);
      return (
        <div className={`${prefixCls} ${prefixCls}-${status} ${className}`} style={style}>
          {renderIcon(prefixCls, props)}
          <div className={`${prefixCls}-title`}>{title}</div>
          {subTitle && <div className={`${prefixCls}-subtitle`}>{subTitle}</div>}
          {children && <div className={`${prefixCls}-content`}>{children}</div>}
          {renderExtra(prefixCls, props)}
        </div>
      );
    }}
  </ConfigConsumer>
);

OriginResult.defaultProps = {
  status: 'info',
};

type ResultType = typeof OriginResult & { PRESENTED_SVG_DEFAULT: typeof ExceptionImageMap };

const Result: ResultType = OriginResult as ResultType;

Result.PRESENTED_SVG_DEFAULT = ExceptionImageMap;

export default Result;
