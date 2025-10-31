export function isTooltipOpen() {
  return !document
    ?.querySelector<HTMLElement>('.ant-tooltip')
    ?.classList.contains('ant-tooltip-hidden');
}
