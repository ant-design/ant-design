import React from 'react';
import { createPortal } from 'react-dom';
import { clsx } from 'clsx';

export type BorderBeamEffectProps = {
  prefixCls: string;
  hostDom: HTMLElement | SVGElement | null;
  className?: string;
  style?: React.CSSProperties;
};

type BorderBeamEffectElementProps = Omit<BorderBeamEffectProps, 'hostDom'>;

const supportPortalHost = (hostDom: BorderBeamEffectProps['hostDom']): hostDom is HTMLElement =>
  typeof HTMLElement !== 'undefined' && hostDom instanceof HTMLElement;

const BorderBeamEffectElement: React.FC<BorderBeamEffectElementProps> = (props) => {
  const { prefixCls, className, ...rest } = props;
  return <div aria-hidden="true" className={clsx(prefixCls, className)} {...rest} />;
};

const BorderBeamEffect: React.FC<BorderBeamEffectProps> = (props) => {
  const { prefixCls, hostDom, ...rest } = props;

  if (!hostDom || !supportPortalHost(hostDom)) {
    return null;
  }

  return createPortal(<BorderBeamEffectElement prefixCls={prefixCls} {...rest} />, hostDom);
};

export default BorderBeamEffect;
