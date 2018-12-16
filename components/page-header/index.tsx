import * as React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Icon from '../icon';
import { BreadcrumbProps } from '../breadcrumb';
import { Divider, Breadcrumb } from '../index';

export interface IPageHeaderProps {
  prefixCls: string;
  title: string;
  style: React.CSSProperties;
  breadcrumb: BreadcrumbProps;
  onBack: (e: React.MouseEvent<HTMLElement>) => void;
}
export interface IPageHeaderState {}

class PageHeader extends React.PureComponent<IPageHeaderProps, IPageHeaderState> {
  renderBase(prefixCls: string) {
    return (
      <>
        <Icon
          type="arrow-left"
          onClick={e => {
            if (this.props.onBack) {
              this.props.onBack(e);
              return;
            }
            history.back();
          }}
          className={`${prefixCls}-back-icon`}
        />
        <Divider type="vertical" />
      </>
    );
  }

  renderBreadcrumb() {
    const { breadcrumb } = this.props;
    return (
      <>
        <Breadcrumb {...breadcrumb} />
      </>
    );
  }

  renderHeader(prefixCls: string) {
    const { breadcrumb } = this.props;
    if (breadcrumb && breadcrumb.routes && breadcrumb.routes.length > 2) {
      return this.renderBreadcrumb();
    }
    return this.renderBase(prefixCls);
  }

  renderTitle(prefixCls: string) {
    const { title } = this.props;
    return <span className={`${prefixCls}-title`}>{title}</span>;
  }

  render() {
    return (
      <ConfigConsumer>
        {({ getPrefixCls }: ConfigConsumerProps) => {
          const { prefixCls: customizePrefixCls, style } = this.props;
          const prefixCls = getPrefixCls('pageheader', customizePrefixCls);
          return (
            <div className={prefixCls} style={style}>
              {this.renderHeader(prefixCls)}
              {this.renderTitle(prefixCls)}
            </div>
          );
        }}
      </ConfigConsumer>
    );
  }
}

export default PageHeader;
