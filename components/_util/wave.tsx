import useIsomorphicLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import { composeRef, supportRef } from 'rc-util/lib/ref';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import raf from './raf';
import { cloneElement } from './reactNode';

let styleForPseudo: HTMLStyleElement | null;

// Where el is the DOM element you'd like to test for visibility
function isHidden(element: HTMLElement) {
  if (process.env.NODE_ENV === 'test') {
    return false;
  }
  return !element || element.offsetParent === null || element.hidden;
}

function getValidateContainer(nodeRoot: Node): Element {
  if (nodeRoot instanceof Document) {
    return nodeRoot.body;
  }

  return Array.from(nodeRoot.childNodes).find(
    ele => ele?.nodeType === Node.ELEMENT_NODE,
  ) as Element;
}

function isNotGrey(color: string) {
  // eslint-disable-next-line no-useless-escape
  const match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);
  if (match && match[1] && match[2] && match[3]) {
    return !(match[1] === match[2] && match[2] === match[3]);
  }
  return true;
}

export interface WaveProps {
  insertExtraNode?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Wave: React.FC<WaveProps> = ({ insertExtraNode, disabled, children }) => {
  const { csp, getPrefixCls } = React.useContext(ConfigContext);
  const destroyedRef = React.useRef(false);
  const clickWaveTimeoutTimerRef = React.useRef<number>();
  const animationStartTimerRef = React.useRef<number>();
  const animationStartRef = React.useRef(false);
  const instanceRef = React.useRef<{
    cancel: () => void;
  }>();
  const containerRef = React.useRef<HTMLDivElement>();
  const extraNodeRef = React.useRef<HTMLDivElement>();
  const attributeName = React.useMemo(
    () =>
      insertExtraNode
        ? `${getPrefixCls('')}-click-animating`
        : `${getPrefixCls('')}-click-animating-without-extra-node`,
    [insertExtraNode, getPrefixCls],
  );

  const onTransitionStartRef = React.useRef((e: AnimationEvent) => {
    if (destroyedRef.current) {
      return;
    }

    const node = containerRef.current;
    if (!e || e.target !== node || animationStartTimerRef.current) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    resetEffect.current(node);
  });

  const onTransitionEndRef = React.useRef((e: AnimationEvent) => {
    if (!e || e.animationName !== 'fadeEffect') {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    resetEffect.current(e.target as HTMLElement);
  });

  const resetEffect = React.useRef((node: HTMLElement) => {
    if (!node || node === extraNodeRef.current || !(node instanceof Element)) {
      return;
    }
    node.setAttribute(attributeName, 'false'); // edge has bug on `removeAttribute` #14466

    if (styleForPseudo) {
      styleForPseudo.innerHTML = '';
    }

    if (insertExtraNode && extraNodeRef.current && node.contains(extraNodeRef.current)) {
      node.removeChild(extraNodeRef.current);
    }
    ['transition', 'animation'].forEach(name => {
      node.removeEventListener(`${name}start`, onTransitionStartRef.current);
      node.removeEventListener(`${name}end`, onTransitionEndRef.current);
    });
  });

  const handleClick = React.useRef((node: HTMLElement, waveColor: string) => {
    if (disabled || !node || isHidden(node) || node.className.includes('-leave')) {
      return;
    }

    const extraNode = document.createElement('div');
    extraNodeRef.current = extraNode;
    extraNode.className = `${getPrefixCls('')}-click-animating-node`;
    node.setAttribute(attributeName, 'true');
    // Not white or transparent or grey
    if (
      waveColor &&
      waveColor !== '#fff' &&
      waveColor !== '#ffffff' &&
      waveColor !== 'rgb(255, 255, 255)' &&
      waveColor !== 'rgba(255, 255, 255, 1)' &&
      isNotGrey(waveColor) &&
      !/rgba\((?:\d*, ){3}0\)/.test(waveColor) && // any transparent rgba color
      waveColor !== 'transparent'
    ) {
      extraNode.style.borderColor = waveColor;

      const nodeRoot = node.getRootNode?.() || node.ownerDocument;
      const nodeBody = getValidateContainer(nodeRoot) ?? nodeRoot;

      styleForPseudo = updateCSS(
        `
      [${getPrefixCls('')}-click-animating-without-extra-node='true']::after, .${getPrefixCls(
          '',
        )}-click-animating-node {
        --antd-wave-shadow-color: ${waveColor};
      }`,
        'antd-wave',
        { csp, attachTo: nodeBody },
      );
    }
    if (insertExtraNode) {
      node.appendChild(extraNode);
    }

    ['transition', 'animation'].forEach(name => {
      node.addEventListener(`${name}start`, onTransitionStartRef.current);
      node.addEventListener(`${name}end`, onTransitionEndRef.current);
    });
  });

  const bindAnimationEvent = React.useRef((node: HTMLElement) => {
    if (
      !node ||
      !node.getAttribute ||
      node.getAttribute('disabled') ||
      node.className.includes('disabled')
    ) {
      return;
    }

    const onClick = (e: MouseEvent) => {
      // Fix radio button click twice
      if ((e.target as HTMLElement).tagName === 'INPUT' || isHidden(e.target as HTMLElement)) {
        return;
      }
      resetEffect.current(node);
      // Get wave color from target
      const waveColor =
        getComputedStyle(node).getPropertyValue('border-top-color') || // Firefox Compatible
        getComputedStyle(node).getPropertyValue('border-color') ||
        getComputedStyle(node).getPropertyValue('background-color');
      clickWaveTimeoutTimerRef.current = window.setTimeout(
        () => handleClick.current(node, waveColor),
        0,
      );

      raf.cancel(animationStartTimerRef.current);
      animationStartRef.current = true;

      // Render to trigger transition event cost 3 frames. Let's delay 10 frames to reset this.
      animationStartTimerRef.current = raf(() => {
        animationStartRef.current = false;
      }, 10);
    };
    node.addEventListener('click', onClick, true);
    return {
      cancel: () => {
        node.removeEventListener('click', onClick, true);
      },
    };
  });

  useIsomorphicLayoutEffect(() => {
    const node = containerRef.current;
    if (!node || node.nodeType !== 1) {
      return;
    }
    instanceRef.current = bindAnimationEvent.current(node);

    return () => {
      if (instanceRef.current) {
        instanceRef.current.cancel();
      }
      window.clearTimeout(clickWaveTimeoutTimerRef.current);

      destroyedRef.current = true;
    };
  }, []);

  if (!React.isValidElement(children)) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
  }

  const ref = supportRef(children) ? composeRef((children as any).ref, containerRef) : containerRef;

  return <>{cloneElement(children, { ref })}</>;
};

export default Wave;
