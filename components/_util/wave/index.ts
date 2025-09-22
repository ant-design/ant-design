import React, { useContext, useRef } from 'react';
import isVisible from '@rc-component/util/lib/Dom/isVisible';
import { composeRef, getNodeRef, supportRef } from '@rc-component/util/lib/ref';
import classNames from 'classnames';

import type { ConfigConsumerProps } from '../../config-provider';
import { ConfigContext } from '../../config-provider';
import { cloneElement } from '../reactNode';
import type { WaveComponent } from './interface';
import useStyle from './style';
import useWave from './useWave';

export interface WaveProps {
  disabled?: boolean;
  children?: React.ReactNode;
  component?: WaveComponent;
  colorSource?: 'color' | 'backgroundColor' | 'borderColor' | null;
}

const Wave: React.FC<WaveProps> = (props) => {
  const { children, disabled, component, colorSource } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);

  const containerRef = useRef<HTMLElement | null>(null);

  // ============================== Style ===============================
  const prefixCls = getPrefixCls('wave');
  const [, hashId] = useStyle(prefixCls);

  // =============================== Wave ===============================
  const showWave = useWave(containerRef, classNames(prefixCls, hashId), component, colorSource);

  // ============================== Effect ==============================
  React.useEffect(() => {
    const node = containerRef.current;
    if (!node || node.nodeType !== window.Node.ELEMENT_NODE || disabled) {
      return;
    }

    // Click handler
    const onClick = (e: MouseEvent) => {
      // Fix radio button click twice
      if (
        !isVisible(e.target as HTMLElement) ||
        // No need wave
        !node.getAttribute ||
        node.getAttribute('disabled') ||
        (node as HTMLInputElement).disabled ||
        (node.className.includes('disabled') && !node.className.includes('disabled:')) ||
        node.getAttribute('aria-disabled') === 'true' ||
        node.className.includes('-leave')
      ) {
        return;
      }
      showWave(e);
    };

    // Bind events
    node.addEventListener('click', onClick, true);
    return () => {
      node.removeEventListener('click', onClick, true);
    };
  }, [disabled]);

  // ============================== Render ==============================
  if (!React.isValidElement(children)) {
    return children ?? null;
  }

  const ref = supportRef(children) ? composeRef(getNodeRef(children), containerRef) : containerRef;

  return cloneElement(children, { ref });
};

if (process.env.NODE_ENV !== 'production') {
  Wave.displayName = 'Wave';
}

export default Wave;
