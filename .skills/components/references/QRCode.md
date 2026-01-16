# QRCode — 二维码

## 功能概述

能够将文本转换生成二维码的组件，支持自定义配色和 Logo 配置。

## 应用场景

- 当需要将文本转换成为二维码时使用。

## 输入字段

### QRCode 属性

#### 必填

- 无必填属性。

#### 可选

- `value`: `string | string[]`，扫描后的文本，版本 `string[]`: 5.28.0。
- `type`: `canvas | svg `，渲染类型，默认 `canvas`，版本 5.6.0。
- `icon`: string，二维码中图片的地址（目前只支持图片地址）。
- `size`: number，二维码大小，默认 160。
- `iconSize`: number | { width: number; height: number }，二维码中图片的大小，默认 40，版本 5.19.0。
- `color`: string，二维码颜色，默认 `#000`。
- `classNames`: Record<[SemanticDOM](#semantic-dom), string> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), string>，用于自定义组件内部各语义化结构的 class，支持对象或函数。
- `bgColor`: string，二维码背景颜色，默认 `transparent`，版本 5.5.0。
- `marginSize`: number，留白（安静区）大小（单位为模块数），`0` 表示无留白，默认 `0`，版本 6.2.0。
- `bordered`: boolean，是否有边框，默认 `true`。
- `errorLevel`: `'L' | 'M' | 'Q' | 'H' `，二维码纠错等级，默认 `M`。
- `boostLevel`: `boolean`，如果启用，自动提升纠错等级，结果的纠错级别可能会高于指定的纠错级别，默认 true，版本 5.28.0。
- `status`: `active | expired | loading | scanned`，二维码状态，默认 `active`，版本 scanned: 5.13.0。
- `statusRender`: (info: [StatusRenderInfo](/components/qr-code-cn#statusrenderinfo)) => React.ReactNode，自定义状态渲染器，版本 5.20.0。
- `styles`: Record<[SemanticDOM](#semantic-dom), CSSProperties> | (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties>，用于自定义组件内部各语义化结构的行内 style，支持对象或函数。
- `type`: `canvas | svg`，渲染类型，默认 `canvas`，版本 5.6.0。
- `value`: string，扫描后的文本。

## 方法

无公开方法。

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
      <QRCode value="https://ant.design/" />

      <QRCode
        value="https://ant.design/"
        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />

      <Space>
        <QRCode value="https://ant.design/" size={80} />
        <QRCode value="https://ant.design/" size={160} />
        <QRCode value="https://ant.design/" size={240} />
      </Space>

      <QRCode value="https://ant.design/" color="#1677ff" bgColor="#f0f0f0" />

      <Space>
        <QRCode value="https://ant.design/" errorLevel="L" />
        <QRCode value="https://ant.design/" errorLevel="H" />
      </Space>

      <Space>
        <Segmented options={['active', 'expired', 'loading']} value={status} onChange={setStatus} />
        <QRCode value="https://ant.design/" status={status} onRefresh={() => setStatus('active')} />
      </Space>

      <Space direction="vertical">
        <Input
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: 200 }}
        />
        <QRCode value={text || '-'} />
      </Space>

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
