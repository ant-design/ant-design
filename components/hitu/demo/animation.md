---
order: 1
title:
  zh-CN: 动画
  en-US: Animation
---

## zh-CN

通过 `@ant-design/hitu` 制作交互动画。

## en-US

Make animation though `@ant-design/hitu`.

```jsx
import Hitu from '@ant-design/hitu';

const Rect = () => <rect x="0" y="0" width="14" height="14" fill="#0170FE" />;
Rect.width = 14;
Rect.height = 14;

function getFrames(x: number, y: number): FrameInfo[] {
  const delay = (x + y) * 5 + 1;

  const position = {
    x: x * (14 + 12) + 21,
    y: y * (14 + 12) + 21,
  };

  return [
    {
      frame: 0,
      rotate: 0,
      ...position,
    },
    {
      frame: delay,
      rotate: 0,
      ...position,
      cubic: Hitu.CUBIC_EASE,
    },
    {
      frame: 15 + delay,
      scaleX: 1.5,
      scaleY: 1.5,
      cubic: Hitu.CUBIC_EASE,
    },
    {
      frame: 30 + delay,
      scaleX: 1,
      scaleY: 1,
    },
  ];
}

const shapes: Shape[] = [];

for (let x = 0; x < 4; x += 1) {
  for (let y = 0; y < 4; y += 1) {
    shapes.push({
      type: 'shape',
      source: Rect,
      frames: getFrames(x, y),
    });
  }
}

const Demo = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Hitu
        loop
        frames={120}
        width={120}
        height={120}
        style={{ width: 120, height: 120 }}
        shapes={shapes}
      />
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
