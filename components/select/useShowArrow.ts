/**
 * Since Select, TreeSelect, Cascader is same Select like component.
 * We just use same hook to handle this logic.
 *
 * If `showArrow` not configured, always show it.
 */
export default function useShowArrow(showArrow?: boolean) {
  return showArrow ?? true;
}
