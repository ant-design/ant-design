import * as React from 'react';
import classnames from 'classnames';

import { ConfigConsumerProps, ConfigConsumer } from '../config-provider';
import Icon from '../icon';

type ResultStatus = 'success' | 'error' | 'info' | 'warning';

export interface ResultProps {
  icon: React.ReactNode;
  status: ResultStatus;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
  prefixCls?: string;
  style?: React.CSSProperties;
}

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

const IconMap = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'exclamation-circle',
  warning: 'warning',
};

const renderIcon = (prefixCls: string, { status, icon }: ResultProps) => {
  const iconString: string = IconMap[status];
  const className = classnames(`${prefixCls}-icon-view`, `${prefixCls}-${status}`);
  const iconNode = icon || <Icon type={iconString} theme="filled" />;

  return <div className={className}>{iconNode}</div>;
};

const renderExtra = (prefixCls: string, { extra }: ResultProps) => (
  <div className={`${prefixCls}-extra-view`}>{extra}</div>
);

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
