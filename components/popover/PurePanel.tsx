import * as React from 'react';
import { Popup } from '@rc-component/tooltip';
import { clsx } from 'clsx';

import type { PopoverProps, PopoverSemanticAllType } from '.';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { useMergeSemantic } from '../_util/hooks';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

interface OverlayProps {
  prefixCls?: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
  classNames?: PopoverSemanticAllType['classNames'];
  styles?: PopoverSemanticAllType['styles'];
}

export const Overlay: React.FC<OverlayProps> = (props) => {
  const { title, content, prefixCls, classNames, styles } = props;

  if (!title && !content) {
    return null;
  }

  return (
    <>
      {title && (
        <div className={clsx(`${prefixCls}-title`, classNames?.title)} style={styles?.title}>
          {title}
        </div>
      )}
      {content && (
        <div className={clsx(`${prefixCls}-content`, classNames?.content)} style={styles?.content}>
          {content}
        </div>
      )}
    </>
  );
};

export interface PurePanelProps extends Omit<PopoverProps, 'children'> {
  children?: React.ReactNode;
}

interface RawPurePanelProps extends PopoverProps {
  hashId: string;
}

export const RawPurePanel: React.FC<RawPurePanelProps> = (props) => {
  const {
    hashId,
    prefixCls,
    className,
    style,
    placement = 'top',
    title,
    content,
    children,
    classNames,
    styles,
  } = props;

  const titleNode = getRenderPropValue(title);
  const contentNode = getRenderPropValue(content);

  const mergedProps: PopoverProps = {
    ...props,
    placement,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic([classNames], [styles], {
    props: mergedProps,
  });

  const rootClassName = clsx(
    hashId,
    prefixCls,
    `${prefixCls}-pure`,
    `${prefixCls}-placement-${placement}`,
    className,
  );

  return (
    <div className={rootClassName} style={style}>
      <div className={`${prefixCls}-arrow`} />
      <Popup
        {...props}
        className={hashId}
        prefixCls={prefixCls}
        classNames={mergedClassNames}
        styles={mergedStyles}
      >
        {children || (
          <Overlay
            prefixCls={prefixCls}
            title={titleNode}
            content={contentNode}
            classNames={mergedClassNames}
            styles={mergedStyles}
          />
        )}
      </Popup>
    </div>
  );
};

const PurePanel: React.FC<PurePanelProps> = (props) => {
  const { prefixCls: customizePrefixCls, className, ...restProps } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('popover', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  return (
    <RawPurePanel
      {...restProps}
      prefixCls={prefixCls}
      hashId={hashId}
      className={clsx(className, cssVarCls)}
    />
  );
};

export default PurePanel;
