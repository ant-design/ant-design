import * as React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';
import classnames from 'classnames';
import { BreadcrumbProps } from '../breadcrumb';
import Divider from '../divider';
import Tag from '../tag';
import Breadcrumb from '../breadcrumb';
import TransButton from '../_util/transButton';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

export interface PageHeaderProps {
  backIcon?: React.ReactNode;
  prefixCls?: string;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  style?: React.CSSProperties;
  breadcrumb?: BreadcrumbProps;
  tags?: React.ReactElement<Tag> | React.ReactElement<Tag>[];
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  onBack?: (e: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
}

const renderBack = (
  prefixCls: string,
  backIcon?: React.ReactNode,
  onBack?: (e: React.MouseEvent<HTMLElement>) => void,
) => {
  if (!backIcon || !onBack) {
    return null;
  }
  return (
    <LocaleReceiver componentName="PageHeader">
      {({ back }: { back: string }) => (
        <div className={`${prefixCls}-back`}>
          <TransButton
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              if (onBack) {
                onBack(e);
              }
            }}
            className={`${prefixCls}-back-button`}
            aria-label={back}
          >
            {backIcon}
          </TransButton>
          <Divider type="vertical" />
        </div>
      )}
    </LocaleReceiver>
  );
};

const renderBreadcrumb = (breadcrumb: BreadcrumbProps) => {
  return <Breadcrumb {...breadcrumb} />;
};

const renderHeader = (prefixCls: string, props: PageHeaderProps) => {
  const { breadcrumb, backIcon, onBack } = props;
  if (breadcrumb && breadcrumb.routes && breadcrumb.routes.length >= 2) {
    return renderBreadcrumb(breadcrumb);
  }
  return renderBack(prefixCls, backIcon, onBack);
};

const renderTitle = (prefixCls: string, props: PageHeaderProps) => {
  const { title, subTitle, tags, extra } = props;
  const titlePrefixCls = `${prefixCls}-title-view`;
  return (
    <div className={`${prefixCls}-title-view`}>
      <span className={`${titlePrefixCls}-title`}>{title}</span>
      {subTitle && <span className={`${titlePrefixCls}-sub-title`}>{subTitle}</span>}
      {tags && <span className={`${titlePrefixCls}-tags`}>{tags}</span>}
      {extra && <span className={`${titlePrefixCls}-extra`}>{extra}</span>}
    </div>
  );
};

const renderFooter = (prefixCls: string, footer: React.ReactNode) => {
  if (footer) {
    return <div className={`${prefixCls}-footer`}>{footer}</div>;
  }
  return null;
};

const PageHeader: React.SFC<PageHeaderProps> = props => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const {
        prefixCls: customizePrefixCls,
        style,
        footer,
        children,
        className: customizeClassName,
      } = props;

      const prefixCls = getPrefixCls('page-header', customizePrefixCls);
      const className = classnames(
        prefixCls,
        {
          [`${prefixCls}-has-footer`]: footer,
        },
        customizeClassName,
      );

      return (
        <div className={className} style={style}>
          {renderHeader(prefixCls, props)}
          {renderTitle(prefixCls, props)}
          {children && <div className={`${prefixCls}-content-view`}>{children}</div>}
          {renderFooter(prefixCls, footer)}
        </div>
      );
    }}
  </ConfigConsumer>
);

PageHeader.defaultProps = {
  backIcon: <Icon type="arrow-left" />,
};

export default PageHeader;
