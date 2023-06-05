import classNames from 'classnames';
import { composeRef, supportRef } from 'rc-util/lib/ref';
import isVisible from 'rc-util/lib/Dom/isVisible';
import React, { useContext, useRef } from 'react';
import type { ConfigConsumerProps } from '../../config-provider';
import { ConfigContext } from '../../config-provider';
import { cloneElement } from '../reactNode';
import useStyle from './style';
import useWave from './useWave';

export interface WaveProps {
  disabled?: boolean;
  children?: React.ReactNode;
}

const Wave: React.FC<WaveProps> = (props) => {
  const { children, disabled } = props;
  const { getPrefixCls } = useContext<ConfigConsumerProps>(ConfigContext);
  const containerRef = useRef<HTMLElement>(null);

  // ============================== Style ===============================
  const prefixCls = getPrefixCls('wave');
  const [, hashId] = useStyle(prefixCls);

  // =============================== Wave ===============================
  const showWave = useWave(containerRef, classNames(prefixCls, hashId));

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
        (e.target as HTMLElement).tagName === 'INPUT' ||
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

      showWave();
    };

    // Bind events
    node.addEventListener('click', onClick, true);
    return () => {
      node.removeEventListener('click', onClick, true);
    };
  }, [disabled]);

  // ============================== Render ==============================
  if (!React.isValidElement(children)) {
    return (children ?? null) as unknown as React.ReactElement;
  }

  const ref = supportRef(children) ? composeRef((children as any).ref, containerRef) : containerRef;

  return cloneElement(children, { ref });
};

if (process.env.NODE_ENV !== 'production') {
  Wave.displayName = 'Wave';
}

export default Wave;
