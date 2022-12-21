/* eslint-disable @typescript-eslint/no-use-before-define */
import { updateCSS } from 'rc-util/lib/Dom/dynamicCSS';
import { composeRef, supportRef } from 'rc-util/lib/ref';
import React, { useContext, useEffect, useRef } from 'react';
import type { ConfigConsumerProps, CSPConfig } from '../../config-provider';
import { ConfigConsumer, ConfigContext } from '../../config-provider';
import raf from '../raf';
import { cloneElement } from '../reactNode';
import useStyle from './style';

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
    (ele) => ele?.nodeType === Node.ELEMENT_NODE,
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

function isValidWaveColor(color: string) {
  return (
    color &&
    color !== '#fff' &&
    color !== '#ffffff' &&
    color !== 'rgb(255, 255, 255)' &&
    color !== 'rgba(255, 255, 255, 1)' &&
    isNotGrey(color) &&
    !/rgba\((?:\d*, ){3}0\)/.test(color) && // any transparent rgba color
    color !== 'transparent'
  );
}

function getTargetWaveColor(node: HTMLElement) {
  const computedStyle = getComputedStyle(node);
  const borderTopColor = computedStyle.getPropertyValue('border-top-color');
  const borderColor = computedStyle.getPropertyValue('border-color');
  const backgroundColor = computedStyle.getPropertyValue('background-color');
  if (isValidWaveColor(borderTopColor)) {
    return borderTopColor;
  }
  if (isValidWaveColor(borderColor)) {
    return borderColor;
  }
  return backgroundColor;
}

export interface WaveProps {
  insertExtraNode?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const InternalWave: React.FC<WaveProps> = (props) => {
  const { children, insertExtraNode, disabled } = props;

  const instanceRef = useRef<{ cancel?: () => void }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const extraNode = useRef<HTMLDivElement>();
  const clickWaveTimeoutId = useRef<NodeJS.Timer | null>(null);
  const animationStartId = useRef<number>();
  const animationStart = useRef<boolean>(false);
  const destroyed = useRef<boolean>(false);
  const cspRef = useRef<CSPConfig>({});

  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

  const attributeName = React.useMemo<string>(
    () =>
      insertExtraNode
        ? `${getPrefixCls('')}-click-animating`
        : `${getPrefixCls('')}-click-animating-without-extra-node`,
    [insertExtraNode],
  );

  const onTransitionStart = (e: AnimationEvent) => {
    if (destroyed.current) {
      return;
    }
    const node = containerRef.current;
    if (!e || e.target !== node || animationStart.current) {
      return;
    }
    resetEffect(node as HTMLDivElement);
  };

  const onTransitionEnd = (e: AnimationEvent) => {
    if (!e || e.animationName !== 'fadeEffect') {
      return;
    }
    resetEffect(e.target as HTMLDivElement);
  };

  const onClick = (node: HTMLDivElement, waveColor: string) => {
    if (disabled || !node || isHidden(node) || node.className.includes('-leave')) {
      return;
    }

    extraNode.current = document.createElement('div');

    extraNode.current.className = `${getPrefixCls('')}-click-animating-node`;

    node.setAttribute(attributeName, 'true');
    // Not white or transparent or grey
    if (isValidWaveColor(waveColor)) {
      extraNode.current.style.borderColor = waveColor;

      const nodeRoot = node.getRootNode?.() || node.ownerDocument;
      const nodeBody = getValidateContainer(nodeRoot) ?? nodeRoot;

      styleForPseudo = updateCSS(
        `
      [${getPrefixCls()}-click-animating-without-extra-node='true']::after, .${getPrefixCls()}-click-animating-node {
        --antd-wave-shadow-color: ${waveColor};
      }`,
        'antd-wave',
        { csp: cspRef.current, attachTo: nodeBody },
      );
    }
    if (insertExtraNode) {
      node.appendChild(extraNode.current);
    }
    ['transition', 'animation'].forEach((name) => {
      node.addEventListener(`${name}start`, onTransitionStart);
      node.addEventListener(`${name}end`, onTransitionEnd);
    });
  };

  const bindAnimationEvent = (node?: HTMLDivElement) => {
    if (
      !node ||
      !node.getAttribute ||
      node.getAttribute('disabled') ||
      node.className.includes('disabled')
    ) {
      return;
    }
    const internalClick = (e: MouseEvent) => {
      // Fix radio button click twice
      if ((e.target as HTMLElement).tagName === 'INPUT' || isHidden(e.target as HTMLElement)) {
        return;
      }
      resetEffect(node);
      // Get wave color from target
      const waveColor = getTargetWaveColor(node);
      clickWaveTimeoutId.current = setTimeout(() => {
        onClick(node, waveColor);
      }, 0);

      raf.cancel(animationStartId.current);
      animationStart.current = true;

      // Render to trigger transition event cost 3 frames. Let's delay 10 frames to reset this.
      animationStartId.current = raf(() => {
        animationStart.current = false;
      }, 10);
    };
    node.addEventListener('click', internalClick, true);
    return {
      cancel() {
        node.removeEventListener('click', internalClick, true);
      },
    };
  };

  function resetEffect(node: HTMLDivElement) {
    if (!node || node === extraNode.current || !(node instanceof Element)) {
      return;
    }

    node.setAttribute(attributeName, 'false'); // edge has bug on `removeAttribute` #14466

    if (styleForPseudo) {
      styleForPseudo.innerHTML = '';
    }

    if (insertExtraNode && extraNode.current && node.contains(extraNode.current)) {
      node.removeChild(extraNode.current);
    }
    ['transition', 'animation'].forEach((name) => {
      node.removeEventListener(`${name}start`, onTransitionStart);
      node.removeEventListener(`${name}end`, onTransitionEnd);
    });
  }

  useEffect(() => {
    destroyed.current = false;
    const node = containerRef.current;
    if (!node || node.nodeType !== 1) {
      return;
    }
    instanceRef.current = bindAnimationEvent(node)!;
    return () => {
      destroyed.current = true;
      if (instanceRef.current) {
        instanceRef.current.cancel?.();
      }
      if (clickWaveTimeoutId.current) {
        clearTimeout(clickWaveTimeoutId.current);
      }
    };
  }, []);

  return (
    <ConfigConsumer>
      {({ csp }: ConfigConsumerProps) => {
        cspRef.current = csp!;
        if (!React.isValidElement(children)) {
          return children;
        }
        const ref = supportRef(children)
          ? composeRef((children as any).ref, containerRef)
          : containerRef;
        return cloneElement(children, { ref });
      }}
    </ConfigConsumer>
  );
};

const Wave: React.FC<WaveProps> = (props) => {
  useStyle();
  return <InternalWave {...props} />;
};

export default Wave;
