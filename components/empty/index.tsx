import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultEmptyImg from './empty.svg';
import simpleEmptyImg from './simple.svg';

export interface TransferLocale {
  description: string;
}

export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * @since 3.16.0
   */
  imageStyle?: React.CSSProperties;
  image?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}

export default class Empty extends React.Component<EmptyProps, any> {
  static PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;

  static PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

  renderEmpty = ({ getPrefixCls }: ConfigConsumerProps, locale: TransferLocale) => {
    const {
      className,
      prefixCls: customizePrefixCls,
      image = Empty.PRESENTED_IMAGE_DEFAULT,
      description,
      children,
      imageStyle,
      ...restProps
    } = this.props;

    const prefixCls = getPrefixCls('empty', customizePrefixCls);
    const des = description || locale.description;
    const alt = typeof des === 'string' ? des : 'empty';

    let imageNode: React.ReactNode = null;

    if (typeof image === 'string') {
      imageNode = <img alt={alt} src={image} />;
    } else {
      imageNode = image;
    }

    return (
      <div className={classNames(prefixCls, className)} {...restProps}>
        <div className={`${prefixCls}-image`} style={imageStyle}>
          {imageNode}
        </div>

        <p className={`${prefixCls}-description`}>{des}</p>

        {children && <div className={`${prefixCls}-footer`}>{children}</div>}
      </div>
    );
  };

  render() {
    return (
      <ConfigConsumer>
        {(configArgument: ConfigConsumerProps) => (
          <LocaleReceiver componentName="Empty">
            {(locale: TransferLocale) => this.renderEmpty(configArgument, locale)}
          </LocaleReceiver>
        )}
      </ConfigConsumer>
    );
  }
}
