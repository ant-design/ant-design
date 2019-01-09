import * as React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import classnames from 'classnames';
import { Icon } from '../';

type ResultIcon = 'success' | 'error' | 'info' | 'warning';

export interface ResultProps {
  icon: ResultIcon | React.ReactNode;
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

const renderIcon = (prefixCls: string, icon: ResultIcon | React.ReactNode) => {
  let iconNode = icon;
  let className = `${prefixCls}-icon-view`;
  const iconString: string = IconMap[icon as ResultIcon];
  if (typeof icon === 'string' && iconString) {
    iconNode = <Icon type={iconString} theme="filled" />;
    className = classnames(className, {
      [icon]: icon,
    });
  }
  return <div className={className}>{iconNode}</div>;
};

const renderExtra = (prefixCls: string, extra: React.ReactNode) => {
  return <div className={`${prefixCls}-extra-view`}>{extra}</div>;
};

const Result: React.SFC<ResultProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { prefixCls: customizePrefixCls, icon, extra, style, children } = props;
      const prefixCls = getPrefixCls('result', customizePrefixCls);
      return (
        <div className={prefixCls} style={style}>
          {renderIcon(prefixCls, icon)}
          {renderTitle(prefixCls, props)}
          {children && <div className={`${prefixCls}-content`}>{children}</div>}
          {renderExtra(prefixCls, extra)}
        </div>
      );
    }}
  </ConfigConsumer>
);

Result.defaultProps = {
  icon: 'info',
};

export default Result;
