import React from 'react';
import { render, unmount } from '@rc-component/util/lib/React/render';

export type BorderBeamEffectProps = {
  className: string;
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

const showBorderBeamEffect = (
  target: HTMLElement,
  info: ShowBorderBeamEffectInfo,
): BorderBeamEffectHandler => {
  const holder = document.createElement('div');
  holder.className = `${info.prefixCls}-holder`;
  holder.style.position = 'absolute';
  holder.style.inset = '0';
  holder.style.pointerEvents = 'none';

  target.insertBefore(holder, target.firstChild);

  const update = (nextInfo: BorderBeamEffectProps) => {
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
