import React from 'react';
import { render, unmount } from '@rc-component/util/lib/React/render';

export type BorderBeamEffectProps = {
  className: string;
  rootClassName: string;
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
  // Follow Wave's holder strategy in direct mode: the child React tree does not need to be
  // controllable, but the real DOM must be able to host one decorative holder. Insert the
  // holder before the first child so the extra node does not reorder the business content.
  const holder = document.createElement('div');

  target.insertBefore(holder, target.firstChild);

  const update = (nextInfo: BorderBeamEffectProps) => {
    holder.className = `${nextInfo.rootClassName} ${info.prefixCls}-holder`;
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
