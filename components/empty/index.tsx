import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import DefaultEmptyImg from './empty';
import SimpleEmptyImg from './simple';
import { ImageType, typeConfig } from './config';

const defaultEmptyImg = <DefaultEmptyImg />;
const simpleEmptyImg = <SimpleEmptyImg />;

export interface TransferLocale {
  description: string;
}

export interface EmptyProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /** @since 3.16.0 */
  imageStyle?: React.CSSProperties;
  image?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  type?: ImageType;
}

interface EmptyType extends React.FC<EmptyProps> {
  PRESENTED_IMAGE_DEFAULT: React.ReactNode;
  PRESENTED_IMAGE_SIMPLE: React.ReactNode;
}

const Empty: EmptyType = ({
  className,
  prefixCls: customizePrefixCls,
  image = defaultEmptyImg,
  description,
  children,
  imageStyle,
  type,
  ...restProps
}) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);

  return (
    <LocaleReceiver componentName="Empty">
      {(locale: TransferLocale) => {
        let imageNode: React.ReactNode = null;
        let des = null;

        const prefixCls = getPrefixCls('empty', customizePrefixCls);
        des = typeof description !== 'undefined' ? description : locale.description;
        const alt = typeof des === 'string' ? des : 'empty';

        if (typeof image === 'string') {
          imageNode = <img alt={alt} src={image} />;
        } else {
          if (!!type && image === defaultEmptyImg) {
            imageNode = typeConfig.get(type)?.icon;
            des = typeof description !== 'undefined' ? des : typeConfig.get(type)?.description;
          } else {
            imageNode = image;
          }
        }

        return (
          <div
            className={classNames(
              prefixCls,
              {
                [`${prefixCls}-normal`]: image === simpleEmptyImg || typeConfig.has(type as string),
                [`${prefixCls}-rtl`]: direction === 'rtl',
              },
              className,
            )}
            {...restProps}
          >
            <div className={`${prefixCls}-image`} style={imageStyle}>
              {imageNode}
            </div>
            {des && <div className={`${prefixCls}-description`}>{des}</div>}
            {children && <div className={`${prefixCls}-footer`}>{children}</div>}
          </div>
        );
      }}
    </LocaleReceiver>
  );
};

Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;

export default Empty;
