import * as React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';

import emptyImg from './empty.svg';

export interface TransferLocale {
  description: string;
}
export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  image?: string | true;
  description?: React.ReactNode;
  footer?: React.ReactNode;
}

const Empty: React.SFC<EmptyProps> = (props: EmptyProps) => (
  <ConfigConsumer>
    {({ getPrefixCls }: ConfigConsumerProps) => {
      const { className, image, description, footer, ...restProps } = props;
      const prefixCls = getPrefixCls('empty', props.prefixCls);
      const imgSrc = image === true ? emptyImg : image;

      return (
        <LocaleReceiver componentName="Empty">
          {(locale: TransferLocale) => {
            return (
              <div className={classNames(prefixCls, className)} {...restProps}>
                {imgSrc && (
                  <div className={`${prefixCls}-image`}>
                    <img src={imgSrc} />
                  </div>
                )}

                <p className={`${prefixCls}-description`}>{description || locale.description}</p>

                {footer && <div className={`${prefixCls}-footer`}>{footer}</div>}
              </div>
            );
          }}
        </LocaleReceiver>
      );
    }}
  </ConfigConsumer>
);

export default Empty;
