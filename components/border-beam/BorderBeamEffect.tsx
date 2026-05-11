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

const UNSAFE_PORTAL_HOST_TAGS = new Set([
  'area',
  'base',
  'br',
  'caption',
  'col',
  'colgroup',
  'embed',
  'hr',
  'iframe',
  'img',
  'input',
  'link',
  'meta',
  'option',
  'param',
  'script',
  'select',
  'source',
  'style',
  'tbody',
  'td',
  'template',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'wbr',
]);

const supportPortalHost = (hostDom: BorderBeamEffectProps['hostDom']): hostDom is HTMLElement =>
  typeof HTMLElement !== 'undefined' &&
  hostDom instanceof HTMLElement &&
  !UNSAFE_PORTAL_HOST_TAGS.has(hostDom.tagName.toLowerCase());

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
  if (!hostDom || !supportPortalHost(hostDom)) {
    return null;
  }

  return createPortal(
    <BorderBeamEffectElement prefixCls={prefixCls} className={className} style={style} />,
    hostDom,
  );
};

export default BorderBeamEffect;
