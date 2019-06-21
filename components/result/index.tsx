import * as React from 'react';
import classnames from 'classnames';

import { ConfigConsumerProps, ConfigConsumer } from '../config-provider';
import Icon from '../icon';
import noFound from './noFound.svg';
import serverError from './serverError.svg';
import unauthorized from './unauthorized.svg';

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
  style?: React.CSSProperties;
}

/**
 * render title function
 * @param prefixCls
 * @param {title,subTitle}
 */
const renderTitle = (prefixCls: string, props: ResultProps) => {
  const { title, subTitle } = props;
  const titlePrefixCls = `${prefixCls}-title-view`;

  return (
    <div className={`${titlePrefixCls}`}>
      <div className={`${titlePrefixCls}-title`}>{title}</div>
      {subTitle && <div className={`${titlePrefixCls}-subtitle`}>{subTitle}</div>}
    </div>
  );
};

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
  //gen className ant-result-{status}
  const className = classnames(`${prefixCls}-icon-view`, `${prefixCls}-${status}`);

  if (ExceptionStatus.includes(status)) {
    return (
      <div className={className}>
        <img
          className={`${prefixCls}-image`}
          src={ExceptionImageMap[status as ExceptionStatusType]}
          alt={status}
        />
      </div>
    );
  }
  const iconString: string = IconMap[status as Exclude<ResultStatusType, ExceptionStatusType>];
  const iconNode = icon || <Icon type={iconString} theme="filled" />;

  return <div className={className}>{iconNode}</div>;
};

const renderExtra = (prefixCls: string, { extra }: ResultProps) =>
  extra && <div className={`${prefixCls}-extra-view`}>{extra}</div>;

const Result: React.SFC<ResultProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, style, children } = props;

      const prefixCls = getPrefixCls('result', customizePrefixCls);

      return (
        <div className={prefixCls} style={style}>
          {renderIcon(prefixCls, props)}
          {renderTitle(prefixCls, props)}
          {children && <div className={`${prefixCls}-content`}>{children}</div>}
          {renderExtra(prefixCls, props)}
        </div>
      );
    }}
  </ConfigConsumer>
);

Result.defaultProps = {
  status: 'info',
};

export default Result;
