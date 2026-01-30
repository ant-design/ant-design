import { useCallback, useState } from 'react';

export default function useCollapseAnimation(duration: number = 300) {
  const [isCollapsing, setIsCollapsing] = useState(false);

  const triggerAnimation = useCallback(() => {
    setIsCollapsing(true);
    setTimeout(() => setIsCollapsing(false), duration);
  }, [duration]);

  return [isCollapsing, triggerAnimation] as const;
}
