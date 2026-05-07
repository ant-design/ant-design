import React from 'react';
import { render, unmount } from '@rc-component/util/lib/React/render';

import { isNonNullable } from '../_util/is';

export type BorderBeamEffectProps = {
  className: string;
  holderClassName?: string;
  holderStyle: React.CSSProperties;
  style?: React.CSSProperties;
};

type ShowBorderBeamEffectInfo = BorderBeamEffectProps & {
  prefixCls: string;
};

export type BorderBeamEffectHandler = {
  target: HTMLElement;
  update: (info: BorderBeamEffectProps) => void;
  destroy: () => void;
};

const BorderBeamEffect: React.FC<BorderBeamEffectProps> = ({ className, style }) => (
  <div aria-hidden="true" className={className} style={style} />
);

const unitlessStyleNames = new Set([
  'flex',
  'flexGrow',
  'flexShrink',
  'fontWeight',
  'lineHeight',
  'opacity',
  'order',
  'scale',
  'zIndex',
  'zoom',
]);

const getStyleValue = (key: string, value: string | number) => {
  if (typeof value === 'number' && value !== 0 && !unitlessStyleNames.has(key)) {
    return `${value}px`;
  }

  return String(value);
};

const applyHolderStyle = (holder: HTMLDivElement, style: React.CSSProperties) => {
  holder.removeAttribute('style');
  holder.style.position = 'absolute';
  holder.style.inset = '0';
  holder.style.pointerEvents = 'none';

  Object.entries(style).forEach(([key, value]) => {
    /* istanbul ignore next -- nullable values may exist in user style objects, but BorderBeam does not create them */
    if (!isNonNullable(value)) {
      return;
    }

    if (key.startsWith('--')) {
      holder.style.setProperty(key, String(value));
    } else {
      (holder.style as unknown as Record<string, string>)[key] = getStyleValue(
        key,
        value as string | number,
      );
    }
  });
};

const showBorderBeamEffect = (
  target: HTMLElement,
  info: ShowBorderBeamEffectInfo,
): BorderBeamEffectHandler => {
  // Follow Wave's holder strategy in direct mode: the child React tree does not need to be
  // controllable, but the real DOM must be able to host one decorative holder. Insert the
  // holder before the first child so the extra node does not reorder the business content.
  const holder = document.createElement('div');

  target.insertBefore(holder, target.firstChild);

  const update = (nextInfo: BorderBeamEffectProps) => {
    holder.className = [nextInfo.holderClassName, `${info.prefixCls}-holder`]
      .filter(Boolean)
      .join(' ');
    applyHolderStyle(holder, nextInfo.holderStyle);
    render(<BorderBeamEffect {...nextInfo} />, holder);
  };

  update(info);

  const destroy = () => {
    unmount(holder).then(() => {
      holder.remove();
    });
  };

  return {
    target,
    update,
    destroy,
  };
};

export default showBorderBeamEffect;
