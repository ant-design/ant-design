/**
 * Since Select, TreeSelect, Cascader is same Select like component.
 * We just use same hook to handle this logic.
 *
 * If `suffix` is not equal to `null`, always show it.
 */
export default function useShowArrow(suffix?: unknown, showArrow?: boolean) {
  return showArrow !== undefined ? showArrow : suffix !== null;
}
