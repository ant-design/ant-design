import React from 'react';
import { useEvent } from '@rc-component/util';
import { getDOM } from '@rc-component/util/lib/Dom/findDOMNode';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import raf from '@rc-component/util/lib/raf';
import { supportRef } from '@rc-component/util/lib/ref';

import { canElementHostBorderBeam, canHTMLTagHostBorderBeam } from '../util';

type UseBorderBeamInjectionOptions = {
  prefixCls: string;
  validationStyleVar: string;
  children: React.ReactNode;
  hostElement: HTMLElement | null;
};

type WrapperFallbackReason = 'missing-ref' | 'invalid-element' | 'invalid-props' | null;

const useBorderBeamInjection = ({
  prefixCls,
  validationStyleVar,
  children,
  hostElement,
}: UseBorderBeamInjectionOptions) => {
  const childType = React.isValidElement(children) ? children.type : null;
  const childKey = React.isValidElement(children) ? children.key : null;
  const isHostElement = React.isValidElement(children) && typeof children.type === 'string';
  const childTagName = isHostElement ? (children.type as string) : null;
  const canChildTypeHostBeam = !childTagName || canHTMLTagHostBorderBeam(childTagName);
  const canProbeChildRef = React.isValidElement(children) && supportRef(children);
  const [wrapperFallbackReason, setWrapperFallbackReason] =
    React.useState<WrapperFallbackReason>(null);
  const [probeElement, setProbeElement] = React.useState<HTMLElement | null>(null);
  const canInjectIntoChild =
    canProbeChildRef && canChildTypeHostBeam && wrapperFallbackReason === null;

  const setProbeNode = useEvent((node: React.ReactInstance | HTMLElement | null) => {
    const nextProbeElement = getDOM(node);
    const nextHTMLElement =
      typeof HTMLElement === 'undefined' || nextProbeElement instanceof HTMLElement
        ? (nextProbeElement as HTMLElement | null)
        : null;

    setProbeElement(nextHTMLElement);
  });

  // child 的 type/key 变化代表 React 会换一类节点或同类节点的新实例，此时重新尝试直插。
  // 仅 props 变化不重置 `invalid-props`，避免第三方组件吞 className/style 时在 wrapper
  // 与直插模式之间来回抖动；需要强制重试时可以给子节点换 key。
  useLayoutEffect(() => {
    setWrapperFallbackReason(null);
    setProbeElement(null);
  }, [canChildTypeHostBeam, childKey, childType]);

  // wrapper 模式下仍保留一个轻量 ref 探针：有些组件第一次没有暴露 DOM ref，后续状态就绪后
  // 才暴露；也有 `as` 类组件会从 input/img 切成 div。只对“缺 ref / 宿主不可插入”做恢复，
  // 对“吞 className/style”的 invalid-props 保持稳定 fallback。
  useLayoutEffect(() => {
    if (
      (wrapperFallbackReason === 'missing-ref' || wrapperFallbackReason === 'invalid-element') &&
      canElementHostBorderBeam(probeElement)
    ) {
      setWrapperFallbackReason(null);
    }
  }, [probeElement, wrapperFallbackReason]);

  // 直插需要先拿到真实 DOM。自定义组件可能异步暴露 ref，原生 SVG 等也可能永远拿不到
  // HTMLElement，所以等一帧再退回 wrapper，和 wave 一样避免同步阶段误判。
  useLayoutEffect(() => {
    if (
      !React.isValidElement(children) ||
      !canProbeChildRef ||
      !canChildTypeHostBeam ||
      wrapperFallbackReason !== null
    ) {
      return;
    }

    if (!hostElement) {
      const frameId = raf(() => {
        setWrapperFallbackReason((prevFallbackReason) => prevFallbackReason ?? 'missing-ref');
      });

      return () => {
        raf.cancel(frameId);
      };
    }
  }, [canChildTypeHostBeam, canProbeChildRef, children, hostElement, wrapperFallbackReason]);

  // 直插成功不只看 ref：还要确认宿主能承载 holder，并且没有吞掉注入的 className/style。
  // className 用于挂样式，CSS 变量用于流光尺寸、颜色、圆角；任一缺失都会导致直插静默失败。
  useLayoutEffect(() => {
    if (!canInjectIntoChild || !hostElement) {
      return;
    }

    if (!canElementHostBorderBeam(hostElement)) {
      setWrapperFallbackReason('invalid-element');
      return;
    }

    const receivesInjectedClassName = hostElement.classList.contains(prefixCls);
    const receivesInjectedStyleVar = !!hostElement.style.getPropertyValue(validationStyleVar);

    if (!receivesInjectedClassName || !receivesInjectedStyleVar) {
      setWrapperFallbackReason('invalid-props');
    }
  }, [canInjectIntoChild, children, hostElement, prefixCls, validationStyleVar]);

  return {
    canInjectIntoChild,
    canProbeChildRef,
    setProbeNode,
  };
};

export default useBorderBeamInjection;
