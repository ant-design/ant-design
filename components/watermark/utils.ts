import { mergeProps } from '@rc-component/util';

import type { WatermarkContent, WatermarkFont, WatermarkText } from '.';
import { isPlainObject } from '../_util/is';
import toList from '../_util/toList';

/** converting camel-cased strings to be lowercase and link it with Separator */
export function toLowercaseSeparator(key: string) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function getStyleStr(style: React.CSSProperties): string {
  return Object.keys(style)
    .map((key) => `${toLowercaseSeparator(key)}: ${style[key as keyof React.CSSProperties]};`)
    .join(' ');
}

/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
export function getPixelRatio() {
  return window.devicePixelRatio || 1;
}

const isWatermarkText = (content: WatermarkContent | null | undefined): content is WatermarkText =>
  isPlainObject<WatermarkText>(content);

export interface WatermarkContentLine {
  text: string;
  font: Required<WatermarkFont>;
}

export const getFontSize = (font: Required<WatermarkFont>, ratio = 1) => {
  return Number(font.fontSize) * ratio;
};

export const getCanvasFont = (font: Required<WatermarkFont>, ratio = 1, lineHeight?: number) => {
  const mergedLineHeight = lineHeight === undefined ? '' : `/${lineHeight}px`;

  return `${font.fontStyle} normal ${font.fontWeight} ${getFontSize(
    font,
    ratio,
  )}px${mergedLineHeight} ${font.fontFamily}`;
};

export const getContentLines = (
  content: WatermarkContent | WatermarkContent[] | undefined,
  font: Required<WatermarkFont>,
): WatermarkContentLine[] =>
  toList(content, { skipEmpty: true }).map((item) => {
    if (isWatermarkText(item)) {
      return {
        text: item.text ?? '',
        font: mergeProps(font, item.font ?? {}),
      };
    }

    return {
      text: item ?? '',
      font,
    };
  });

/** Whether to re-render the watermark */
export const reRendering = (
  mutation: MutationRecord,
  isWatermarkEle: (ele: Node, index?: number) => boolean,
) => {
  let flag = false;
  // Whether to delete the watermark node
  if (mutation.removedNodes.length) {
    flag = Array.from<Node>(mutation.removedNodes).some(isWatermarkEle);
  }
  // Whether the watermark dom property value has been modified
  if (mutation.type === 'attributes' && isWatermarkEle(mutation.target)) {
    flag = true;
  }
  return flag;
};
