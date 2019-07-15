import * as React from 'react';
import classnames from 'classnames';

import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';
import Divider from '../divider';
import Tag from '../tag';
import Breadcrumb, { BreadcrumbProps } from '../breadcrumb';
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
  if (breadcrumb && breadcrumb.routes) {
    return renderBreadcrumb(breadcrumb);
  }
  return renderBack(prefixCls, backIcon, onBack);
};

const renderTitle = (prefixCls: string, props: PageHeaderProps) => {
  const { title, subTitle, tags, extra } = props;
  const headingPrefixCls = `${prefixCls}-heading`;
  if (title || subTitle || tags || extra) {
    return (
      <div className={headingPrefixCls}>
        {title && <span className={`${headingPrefixCls}-title`}>{title}</span>}
        {subTitle && <span className={`${headingPrefixCls}-sub-title`}>{subTitle}</span>}
        {tags && <span className={`${headingPrefixCls}-tags`}>{tags}</span>}
        {extra && <span className={`${headingPrefixCls}-extra`}>{extra}</span>}
      </div>
    );
  }
  return null;
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
          {children && <div className={`${prefixCls}-content`}>{children}</div>}
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
