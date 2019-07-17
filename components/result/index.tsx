import * as React from 'react';
import classnames from 'classnames';
import { ConfigConsumerProps, ConfigConsumer } from '../config-provider';
import Icon from '../icon';
import noFound from './noFound';
import serverError from './serverError';
import unauthorized from './unauthorized';

export const IconMap = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'exclamation-circle',
  warning: 'warning',
};

export const ExceptionMap = {
  '404': noFound,
  '500': serverError,
  '403': unauthorized,
};

export type ExceptionStatusType = keyof typeof ExceptionMap;
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
const ExceptionStatus = Object.keys(ExceptionMap);

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
    const SVGComponent = ExceptionMap[status as ExceptionStatusType];
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
        className: customizeClassName,
        subTitle,
        title,
        style,
        children,
        status,
      } = props;
      const prefixCls = getPrefixCls('result', customizePrefixCls);
      const className = classnames(prefixCls, `${prefixCls}-${status}`, customizeClassName);
      return (
        <div className={className} style={style}>
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

// Provide default svg for user access
interface PrivateSVG {
  PRESENTED_IMAGE_404: React.ReactNode;
  PRESENTED_IMAGE_403: React.ReactNode;
  PRESENTED_IMAGE_500: React.ReactNode;
}

type ResultType = typeof OriginResult & PrivateSVG;

const Result: ResultType = OriginResult as ResultType;

ExceptionStatus.forEach((key: ExceptionStatusType) => {
  const privateKey = `PRESENTED_IMAGE_${key}` as keyof PrivateSVG;
  Result[privateKey] = ExceptionMap[key];
});

export default Result;
