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
    return (
      <div className={`${prefixCls}-title-view`}>
        <span className={`${prefixCls}-title`}>{title}</span>
        {subTitle && <span className={`${prefixCls}-sub-title`}>{subTitle}</span>}
        {tags && <span className={`${prefixCls}-tags`}>{tags}</span>}
        {extra && <span className={`${prefixCls}-extra`}>{extra}</span>}
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
          const { prefixCls: customizePrefixCls, style, footer } = this.props;
          const prefixCls = getPrefixCls('page-header', customizePrefixCls);
          const className = classnames(prefixCls, {
            [`${prefixCls}-have-footer`]: footer,
          });
          return (
            <div className={className} style={style}>
              {this.renderHeader(prefixCls)}
              {this.renderTitle(prefixCls)}
              {this.props.children && (
                <div className={`${prefixCls}-content-view`}>{this.props.children}</div>
              )}
              {this.renderFooter(prefixCls)}
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}

export default PageHeader;
