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

const BorderBeamEffectElement: React.FC<BorderBeamEffectElementProps> = ({
  prefixCls,
  className,
  style,
}) => <div aria-hidden="true" className={clsx(prefixCls, className)} style={style} />;

const BorderBeamEffect: React.FC<BorderBeamEffectProps> = ({
  prefixCls,
  hostDom,
  className,
  style,
}) => {
  if (!hostDom) {
    return null;
  }

  return createPortal(
    <BorderBeamEffectElement prefixCls={prefixCls} className={className} style={style} />,
    hostDom,
  );
};

export default BorderBeamEffect;
