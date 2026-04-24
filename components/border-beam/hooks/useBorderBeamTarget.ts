import React from 'react';
import { useMutateObserver } from '@rc-component/mutate-observer';
import { useEvent } from '@rc-component/util';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';

import { isHTMLElement } from '../util';

type UseBorderBeamTargetOptions = {
  prefixCls: string;
  children: React.ReactNode;
  hostElement: HTMLElement | null;
  canInjectIntoChild: boolean;
};

const EMPTY_MUTATION_TARGETS: HTMLElement[] = [];
const HOST_MUTATION_OBSERVER_OPTIONS: MutationObserverInit = {
  childList: true,
};

const useBorderBeamTarget = ({
  prefixCls,
  children,
  hostElement,
  canInjectIntoChild,
}: UseBorderBeamTargetOptions) => {
  const [targetElement, setTargetElement] = React.useState<HTMLElement | null>(null);

  const syncTargetElement = useEvent(() => {
    if (!hostElement) {
      setTargetElement(null);

      return;
    }

    if (canInjectIntoChild) {
      setTargetElement((prevTargetElement) =>
        prevTargetElement === hostElement ? prevTargetElement : hostElement,
      );

      return;
    }

    // wrapper 模式优先把“真实渲染出来的第一个 HTMLElement”视为视觉目标，这样 Card 等
    // 单容器子节点的圆角可以被继承；文本、Fragment、SVG 等场景则回退到合成 wrapper。
    const nextTargetElement =
      (Array.from(hostElement.children).find(
        (node) =>
          isHTMLElement(node) &&
          !node.classList.contains(`${prefixCls}-beam`) &&
          !node.classList.contains(`${prefixCls}-holder`),
      ) as HTMLElement | undefined) ?? hostElement;

    setTargetElement((prevTargetElement) =>
      prevTargetElement === nextTargetElement ? prevTargetElement : nextTargetElement,
    );
  });

  useLayoutEffect(() => {
    syncTargetElement();
  }, [canInjectIntoChild, children, hostElement, syncTargetElement]);

  const hostMutationTarget =
    !canInjectIntoChild && hostElement ? hostElement : EMPTY_MUTATION_TARGETS;

  useMutateObserver(hostMutationTarget, syncTargetElement, HOST_MUTATION_OBSERVER_OPTIONS);

  return {
    targetElement,
  };
};

export default useBorderBeamTarget;
