import React from 'react';
import { createPortal } from 'react-dom';
import { render, unmount } from '@rc-component/util/lib/React/render';
import { clsx } from 'clsx';

export type BorderBeamEffectProps = {
  prefixCls: string;
  hostDom: HTMLElement | SVGElement | null;
  className?: string;
  style?: React.CSSProperties;
};

type BorderBeamEffectElementProps = Omit<BorderBeamEffectProps, 'hostDom'>;
type ShowBorderBeamEffectInfo = BorderBeamEffectElementProps & {
  rootClassName?: string;
};
type BorderBeamEffectUpdateInfo = Omit<ShowBorderBeamEffectInfo, 'prefixCls'>;

export type BorderBeamEffectHandler = {
  target: HTMLElement;
  update: (info: BorderBeamEffectUpdateInfo) => void;
  destroy: () => void;
};

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

export const showBorderBeamEffect = (
  target: HTMLElement,
  info: ShowBorderBeamEffectInfo,
): BorderBeamEffectHandler => {
  const holder = document.createElement('div');

  target.insertBefore(holder, target.firstChild);

  const update = (nextInfo: BorderBeamEffectUpdateInfo) => {
    holder.className = clsx(nextInfo.rootClassName, `${info.prefixCls}-holder`);
    render(
      <BorderBeamEffectElement
        prefixCls={info.prefixCls}
        className={nextInfo.className}
        style={nextInfo.style}
      />,
      holder,
    );
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

export default BorderBeamEffect;
