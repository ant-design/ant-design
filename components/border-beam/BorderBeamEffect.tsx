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
  // 直插模式参考 wave 的 holder 策略：不要求 child 的 React children 可控，只要求真实 DOM
  // 能承载一个装饰 holder。holder 放在第一个子节点前，避免覆盖业务内容的阅读顺序。
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
