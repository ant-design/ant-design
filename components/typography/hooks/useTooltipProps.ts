import { isValidElement, useMemo } from 'react';
import type { TooltipProps } from '../../tooltip';

const useTooltipProps = (
  tooltip: React.ReactNode | TooltipProps,
  editConfigText: React.ReactNode,
  children: React.ReactNode,
) =>
  useMemo(() => {
    if (tooltip === true) {
      return { title: editConfigText ?? children };
    }
    if (isValidElement(tooltip)) {
      return { title: tooltip };
    }
    if (typeof tooltip === 'object') {
      return { title: editConfigText ?? children, ...tooltip };
    }
    return { title: tooltip };
  }, [tooltip, editConfigText, children]);

export default useTooltipProps;
