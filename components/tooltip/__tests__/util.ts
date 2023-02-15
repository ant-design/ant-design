/* eslint-disable import/prefer-default-export */
export function isTooltipOpen() {
  const tooltipEle = document.querySelector('.ant-tooltip');
  return tooltipEle && !tooltipEle.classList.contains('ant-tooltip-hidden');
}
