# QRCode — 二维码

## 功能概述

用于生成二维码的组件。

## 输入字段

### 必填

- `value`: string，扫描后的文本。

### 可选

- `type`: string，渲染类型，可选 `canvas` | `svg`，默认 `canvas`。
- `size`: number，二维码大小，默认 `160`。
- `color`: string，二维码颜色，默认 `#000`。
- `bgColor`: string，背景颜色，默认 `transparent`。
- `bordered`: boolean，是否有边框，默认 `true`。
- `errorLevel`: string，纠错等级，可选 `L` | `M` | `Q` | `H`，默认 `M`。
- `icon`: string，二维码中的图标地址。
- `iconSize`: number | { width, height }，图标尺寸，默认 `40`。
- `status`: string，状态，可选 `active` | `expired` | `loading` | `scanned`，默认 `active`。
- `statusRender`: (info) => ReactNode，自定义状态渲染（5.17.0+）。
- `onRefresh`: () => void，点击刷新回调（status 为 expired 时）。

## 使用建议

展示链接或文本使用二维码；带 logo 的二维码使用 icon 属性；过期状态配合 onRefresh 使用。

## 示例代码

```tsx
import { useState } from 'react';
import { Button, Input, QRCode, Segmented, Space } from 'antd';

const App: React.FC = () => {
  const [text, setText] = useState('https://ant.design/');
  const [status, setStatus] = useState<'active' | 'expired' | 'loading'>('active');

  return (
    <Space direction="vertical" size="middle">
      {/* 基础用法 */}
      <QRCode value="https://ant.design/" />

      {/* 带图标 */}
      <QRCode
        value="https://ant.design/"
        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />

      {/* 不同尺寸 */}
      <Space>
        <QRCode value="https://ant.design/" size={80} />
        <QRCode value="https://ant.design/" size={160} />
        <QRCode value="https://ant.design/" size={240} />
      </Space>

      {/* 自定义颜色 */}
      <QRCode value="https://ant.design/" color="#1677ff" bgColor="#f0f0f0" />

      {/* 不同纠错等级 */}
      <Space>
        <QRCode value="https://ant.design/" errorLevel="L" />
        <QRCode value="https://ant.design/" errorLevel="H" />
      </Space>

      {/* 不同状态 */}
      <Space>
        <Segmented options={['active', 'expired', 'loading']} value={status} onChange={setStatus} />
        <QRCode value="https://ant.design/" status={status} onRefresh={() => setStatus('active')} />
      </Space>

      {/* 动态内容 */}
      <Space direction="vertical">
        <Input
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: 200 }}
        />
        <QRCode value={text || '-'} />
      </Space>

      {/* 下载二维码 */}
      <Space direction="vertical">
        <QRCode id="myqrcode" value="https://ant.design/" />
        <Button
          type="primary"
          onClick={() => {
            const canvas = document
              .getElementById('myqrcode')
              ?.querySelector<HTMLCanvasElement>('canvas');
            if (canvas) {
              const url = canvas.toDataURL();
              const a = document.createElement('a');
              a.download = 'QRCode.png';
              a.href = url;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          }}
        >
          Download
        </Button>
      </Space>
    </Space>
  );
};
```

## 返回结果

渲染一个二维码组件。
