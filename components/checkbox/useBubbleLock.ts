import React from 'react';
import raf from 'rc-util/lib/raf';

/**
 * When click on the label,
 * the event will be stopped to prevent the label from being clicked twice.
 * label click -> input click -> label click again
 */
export default function useBubbleLock(
  onOriginInputClick?: React.MouseEventHandler<HTMLInputElement>,
) {
  const labelClickLockRef = React.useRef<number | null>(null);

  const clearLock = () => {
    raf.cancel(labelClickLockRef.current!);
    labelClickLockRef.current = null;
  };

  const onLabelClick: React.MouseEventHandler<HTMLLabelElement> = () => {
    clearLock();

    labelClickLockRef.current = raf(() => {
      labelClickLockRef.current = null;
    });
  };

  const onInputClick: React.MouseEventHandler<HTMLInputElement> = (e) => {
    if (labelClickLockRef.current) {
      e.stopPropagation();
      clearLock();
    }

    onOriginInputClick?.(e);
  };

  return [onLabelClick, onInputClick] as const;
}
