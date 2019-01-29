import * as React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import classnames from 'classnames';
import { Icon } from '../';

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

const renderIcon = (prefixCls: string, status: ResultStatus, icon: React.ReactNode) => {
  let iconNode = icon;
  let className = `${prefixCls}-icon-view`;
  const iconString: string = IconMap[status];

  className = classnames(className, {
    [status]: true,
  });
  if (!icon) {
    iconNode = <Icon type={iconString} theme="filled" />;
  }

  return <div className={className}>{iconNode}</div>;
};

const renderExtra = (prefixCls: string, extra: React.ReactNode) => {
  return <div className={`${prefixCls}-extra-view`}>{extra}</div>;
};

const Result: React.SFC<ResultProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, icon, status, extra, style, children } = props;
      const prefixCls = getPrefixCls('result', customizePrefixCls);
      return (
        <div className={prefixCls} style={style}>
          {renderIcon(prefixCls, status, icon)}
          {renderTitle(prefixCls, props)}
          {children && <div className={`${prefixCls}-content`}>{children}</div>}
          {renderExtra(prefixCls, extra)}
        </div>
      );
    }}
  </ConfigConsumer>
);

Result.defaultProps = {
  status: 'info',
};

export default Result;
