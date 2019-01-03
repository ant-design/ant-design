import * as React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';
import classnames from 'classnames';
import { BreadcrumbProps } from '../breadcrumb';
import { Divider, Breadcrumb } from '../index';
import Tag from '../tag';

export interface PageHeaderProps {
  backIcon?: React.ReactNode;
  prefixCls?: string;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  style?: React.CSSProperties;
  breadcrumb?: BreadcrumbProps;
  tags?: Tag[];
  footer?: React.ReactNode;
  extra?: React.ReactNode;
  onBack?: (e: React.MouseEvent<HTMLElement>) => void;
}

class PageHeader extends React.PureComponent<PageHeaderProps, {}> {
  static defaultProps = {
    backIcon: <Icon type="arrow-left" />,
  };
  renderBack(prefixCls: string) {
    const { backIcon } = this.props;
    if (!backIcon) {
      return null;
    }
    return (
      <div
        className={`${prefixCls}-back-icon`}
        onClick={e => {
          if (this.props.onBack) {
            this.props.onBack(e);
            return;
          }
          window.history.back();
        }}
      >
        {backIcon}
        <Divider type="vertical" />
      </div>
    );
  }

  renderBreadcrumb() {
    const { breadcrumb } = this.props;
    return <Breadcrumb {...breadcrumb} />;
  }

  renderHeader(prefixCls: string) {
    const { breadcrumb } = this.props;
    if (breadcrumb && breadcrumb.routes && breadcrumb.routes.length > 2) {
      return this.renderBreadcrumb();
    }
    return this.renderBack(prefixCls);
  }

  renderTitle(prefixCls: string) {
    const { title, subTitle, tags, extra } = this.props;
    const titlePrefixCls = `${prefixCls}-title-view`;
    return (
      <div className={`${prefixCls}-title-view`}>
        <span className={`${titlePrefixCls}-title`}>{title}</span>
        {subTitle && <span className={`${titlePrefixCls}-sub-title`}>{subTitle}</span>}
        {tags && <span className={`${titlePrefixCls}-tags`}>{tags}</span>}
        {extra && <span className={`${titlePrefixCls}-extra`}>{extra}</span>}
      </div>
    );
  }

  renderFooter(prefixCls: string) {
    if (this.props.footer) {
      return <div className={`${prefixCls}-footer`}>{this.props.footer}</div>;
    }
    return null;
  }

  render() {
    return (
      <ConfigConsumer>
        {({ getPrefixCls }: ConfigConsumerProps) => {
          const { prefixCls: customizePrefixCls, style, footer, children } = this.props;
          const prefixCls = getPrefixCls('page-header', customizePrefixCls);
          const className = classnames(prefixCls, {
            [`${prefixCls}-has-footer`]: footer,
          });
          return (
            <div className={className} style={style}>
              {this.renderHeader(prefixCls)}
              {this.renderTitle(prefixCls)}
              {children && <div className={`${prefixCls}-content-view`}>{children}</div>}
              {this.renderFooter(prefixCls)}
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}

export default PageHeader;
