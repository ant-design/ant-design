import React, { useContext, useRef } from 'react';
import classNames from 'classnames';
import isVisible from 'rc-util/lib/Dom/isVisible';
import { composeRef, supportRef } from 'rc-util/lib/ref';

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
}

const Wave: React.FC<WaveProps> = (props) => {
  const { children, disabled, component } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const containerRef = useRef<HTMLElement>(null);

  // ============================== Style ===============================
  const prefixCls = getPrefixCls('wave');
  const [, hashId] = useStyle(prefixCls);

  // =============================== Wave ===============================
  const showWave = useWave(containerRef, classNames(prefixCls, hashId), component);

  // ============================== Effect ==============================
  React.useEffect(() => {
    const node = containerRef.current;
    if (!node || node.nodeType !== 1 || disabled) {
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
        node.className.includes('disabled') ||
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

  const ref = supportRef(children) ? composeRef((children as any).ref, containerRef) : containerRef;

  return cloneElement(children, { ref });
};

if (process.env.NODE_ENV !== 'production') {
  Wave.displayName = 'Wave';
}

export default Wave;
