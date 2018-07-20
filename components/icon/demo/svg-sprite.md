---
order: 3
title:
  zh-CN: SVG Sprite
  en-US: SVG Sprite
---

## zh-CN

利用 `Icon` 提供的 `create` 方法来创建一个只用来引用 `symbol` 的组件来实现 `SVG Sprite`。**但是必须提前引入SVG符号定义。**

## en-US

Todo, Please Replace me!

```jsx
import { Icon } from 'antd';

const DemoIcon = Icon.create({
  prefix: 'demo-',
  extraCommonProps: { viewBox: '0 0 1024 1024' },
});

const svgSpriteRenderer = (nodeId, contents) => `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    id="${nodeId}"
    style="display:none;"
  >
    <defs>${contents}</defs>
  </svg>`;

const messageSymbol = `
<symbol id="demo-message">
  <path fill="none" d="M775.1 248.9c-34.3-34.3-74.4-61.3-119-80C610.5 149.7 562 140 512 140h-1.7c-99.6.4-193 39.5-262.8 109.9-69.8 70.4-108 164.1-107.6 263.8.3 60.3 15.3 120.2 43.5 173.1l4.5 8.4V836h140.8l8.4 4.5c52.9 28.2 112.7 43.3 173.1 43.5h1.7c99 0 192-38.2 262-107.6 70.5-69.8 109.5-163.1 109.9-262.8.2-50.6-9.5-99.7-28.9-145.8-18.5-44.6-45.4-84.6-79.8-118.9zM312 560c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm200 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm200 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"></path><circle cx="512" cy="512" r="48"></circle><circle cx="712" cy="512" r="48"></circle><circle cx="312" cy="512" r="48"></circle><path d="M925.2 338.4c-22.6-53.7-55-101.9-96.3-143.3-41.3-41.3-89.5-73.8-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9-53.3 22.8-101.1 55.2-142 96.5-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9.3 69.4 16.9 138.3 48 199.9v152c0 25.4 20.6 46 46 46h152.1c61.6 31.1 130.5 47.7 199.9 48h2.1c59.9 0 118-11.6 172.7-34.3 53.5-22.3 101.6-54.3 142.8-95.2 41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path>
</symbol>`;

// insert SVG symbols into document.body
if (typeof document !== 'undefined') {
  const nodeId = '__SVG_SPRITE_NODE__';
  const spriteContent = svgSpriteRenderer(nodeId, messageSymbol);
  const existing = document.getElementById(nodeId);
  if (!existing) {
    document.body.insertAdjacentHTML('afterbegin', spriteContent);
  }
}

ReactDOM.render(
  <div>
    <DemoIcon type="message" />
  </div>,
  mountNode
);
```
