import { render, unmountComponentAtNode } from 'react-dom';
import * as React from 'react';
import toArray from 'rc-util/lib/Children/toArray';

interface MeasureResult {
  finished: boolean;
  reactNode: React.ReactNode;
}
interface Option {
  rows: number;
  suffix?: string;
}

// We only handle element & text node.
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;

let ellipsisContainer: HTMLParagraphElement;

const wrapperStyle: React.CSSProperties = {
  padding: 0,
  margin: 0,
  display: 'inline',
  lineHeight: 'inherit',
};

function styleToString(style: CSSStyleDeclaration) {
  // There are some different behavior between Firefox & Chrome.
  // We have to handle this ourself.
  const styleNames: string[] = Array.prototype.slice.apply(style);
  return styleNames.map(name => `${name}: ${style.getPropertyValue(name)};`).join('');
}

function mergeChildren(children: React.ReactNode[]): React.ReactNode[] {
  const childList: React.ReactNode[] = [];

  children.forEach((child: React.ReactNode) => {
    const prevChild = childList[childList.length - 1];
    if (typeof child === 'string' && typeof prevChild === 'string') {
      childList[childList.length - 1] += child;
    } else {
      childList.push(child);
    }
  });

  return childList;
}

function resetDomStyles(target: HTMLElement, origin: HTMLElement) {
  target.setAttribute('aria-hidden', 'true');
  const originStyle = window.getComputedStyle(origin);
  const originCSS = styleToString(originStyle);
  // Set shadow
  target.setAttribute('style', originCSS);
  target.style.position = 'fixed';
  target.style.left = '0';
  target.style.height = 'auto';
  target.style.minHeight = 'auto';
  target.style.maxHeight = 'auto';
  target.style.paddingTop = '0';
  target.style.paddingBottom = '0';
  target.style.borderTopWidth = '0';
  target.style.borderBottomWidth = '0';
  target.style.top = '-999999px';
  target.style.zIndex = '-1000';
  // clean up css overflow
  target.style.textOverflow = 'clip';
  target.style.whiteSpace = 'normal';
  (target.style as any).webkitLineClamp = 'none';
}

function getRealLineHeight(originElement: HTMLElement) {
  const heightContainer = document.createElement('div');
  resetDomStyles(heightContainer, originElement);
  heightContainer.appendChild(document.createTextNode('text'));
  document.body.appendChild(heightContainer);
  // The element real height is always less than multiple of line-height
  // Use getBoundingClientRect to get actual single row height of the element
  const realHeight = heightContainer.getBoundingClientRect().height;
  document.body.removeChild(heightContainer);
  return realHeight;
}

export default (
  originElement: HTMLElement,
  option: Option,
  content: React.ReactNode,
  fixedContent: React.ReactNode[],
  ellipsisStr: string,
): { content: React.ReactNode; text: string; ellipsis: boolean } => {
  if (!ellipsisContainer) {
    ellipsisContainer = document.createElement('div');
    ellipsisContainer.setAttribute('aria-hidden', 'true');
  }

  // HMR will remove this from body which should patch back
  if (!ellipsisContainer.parentNode) {
    document.body.appendChild(ellipsisContainer);
  }

  const { rows, suffix = '' } = option;
  const lineHeight = getRealLineHeight(originElement);
  const maxHeight = Math.round(lineHeight * rows * 100 ) / 100;

  resetDomStyles(ellipsisContainer, originElement);

  // Render in the fake container
  const contentList: React.ReactNode[] = mergeChildren(toArray(content));
  render(
    <div style={wrapperStyle}>
      <span style={wrapperStyle}>
        {contentList}
        {suffix}
      </span>
      <span style={wrapperStyle}>{fixedContent}</span>
    </div>,
    ellipsisContainer,
  ); // wrap in an div for old version react

  // Check if ellipsis in measure div is height enough for content
  function inRange() {
    const currentHeight =
      Math.round(ellipsisContainer.getBoundingClientRect().height * 100) / 100
    return currentHeight - .1 <= maxHeight; // -.1 for firefox
  }

  // Skip ellipsis if already match
  if (inRange()) {
    unmountComponentAtNode(ellipsisContainer);
    return { content, text: ellipsisContainer.innerHTML, ellipsis: false };
  }

  // We should clone the childNode since they're controlled by React and we can't reuse it without warning
  const childNodes: ChildNode[] = Array.prototype.slice
    .apply(ellipsisContainer.childNodes[0].childNodes[0].cloneNode(true).childNodes)
    .filter(({ nodeType }: ChildNode) => nodeType !== COMMENT_NODE);
  const fixedNodes: ChildNode[] = Array.prototype.slice.apply(
    ellipsisContainer.childNodes[0].childNodes[1].cloneNode(true).childNodes,
  );
  unmountComponentAtNode(ellipsisContainer);

  // ========================= Find match ellipsis content =========================
  const ellipsisChildren: React.ReactNode[] = [];
  ellipsisContainer.innerHTML = '';

  // Create origin content holder
  const ellipsisContentHolder = document.createElement('span');
  ellipsisContainer.appendChild(ellipsisContentHolder);
  const ellipsisTextNode = document.createTextNode(ellipsisStr + suffix);
  ellipsisContentHolder.appendChild(ellipsisTextNode);

  fixedNodes.forEach(childNode => {
    ellipsisContainer.appendChild(childNode);
  });

  // Append before fixed nodes
  function appendChildNode(node: ChildNode) {
    ellipsisContentHolder.insertBefore(node, ellipsisTextNode);
  }

  // Get maximum text
  function measureText(
    textNode: Text,
    fullText: string,
    startLoc = 0,
    endLoc = fullText.length,
    lastSuccessLoc = 0,
  ): MeasureResult {
    const midLoc = Math.floor((startLoc + endLoc) / 2);
    const currentText = fullText.slice(0, midLoc);
    textNode.textContent = currentText;

    if (startLoc >= endLoc - 1) {
      // Loop when step is small
      for (let step = endLoc; step >= startLoc; step -= 1) {
        const currentStepText = fullText.slice(0, step);
        textNode.textContent = currentStepText;

        if (inRange() || !currentStepText) {
          return step === fullText.length
            ? {
                finished: false,
                reactNode: fullText,
              }
            : {
                finished: true,
                reactNode: currentStepText,
              };
        }
      }
    }

    if (inRange()) {
      return measureText(textNode, fullText, midLoc, endLoc, midLoc);
    }
    return measureText(textNode, fullText, startLoc, midLoc, lastSuccessLoc);
  }

  function measureNode(childNode: ChildNode, index: number): MeasureResult {
    const type = childNode.nodeType;

    if (type === ELEMENT_NODE) {
      // We don't split element, it will keep if whole element can be displayed.
      appendChildNode(childNode);
      if (inRange()) {
        return {
          finished: false,
          reactNode: contentList[index],
        };
      }

      // Clean up if can not pull in
      ellipsisContentHolder.removeChild(childNode);
      return {
        finished: true,
        reactNode: null,
      };
    }

    if (type === TEXT_NODE) {
      const fullText = childNode.textContent || '';
      const textNode = document.createTextNode(fullText);
      appendChildNode(textNode);
      return measureText(textNode, fullText);
    }

    // Not handle other type of content
    // PS: This code should not be attached after react 16
    /* istanbul ignore next */
    return {
      finished: false,
      reactNode: null,
    };
  }

  childNodes.some((childNode, index) => {
    const { finished, reactNode } = measureNode(childNode, index);
    if (reactNode) {
      ellipsisChildren.push(reactNode);
    }
    return finished;
  });

  return {
    content: ellipsisChildren,
    text: ellipsisContainer.innerHTML,
    ellipsis: true,
  };
};
