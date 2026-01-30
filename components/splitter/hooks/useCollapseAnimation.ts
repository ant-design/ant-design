import { useCallback, useEffect, useRef, useState } from 'react';

export default function useCollapseAnimation(duration: number = 200) {
  const [isCollapsing, setIsCollapsing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const triggerAnimation = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsCollapsing(true);
    timerRef.current = setTimeout(() => {
      setIsCollapsing(false);
    }, duration);
  }, [duration]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return [isCollapsing, triggerAnimation] as const;
}
