---
category: Components
title: QRCode
subtitle: 二维码
description: 能够将文本转换生成二维码的组件，支持自定义配色和 Logo 配置。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*cJopQrf0ncwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*M4PBTZ_n9OgAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

当需要将文本转换成为二维码时使用。

## 代码演示 {#examples}

### 基本使用

基本用法。

```tsx
import React from 'react';
import { Input, QRCode, Space } from 'antd';

const App: React.FC = () => {
  const [text, setText] = React.useState('https://ant.design/');

  return (
    <Space vertical align="center">
      <QRCode value={text || '-'} />
      <Input
        placeholder="-"
        maxLength={60}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Space>
  );
};

export default App;
```

### 带 Icon 的例子

带 Icon 的二维码。

```tsx
import React from 'react';
import { QRCode } from 'antd';

const App: React.FC = () => (
  <QRCode
    errorLevel="H"
    value="https://ant.design/"
    icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
  />
);

export default App;
```

### 不同的状态

可以通过 `status` 的值控制二维码的状态，提供了 `active`、`expired`、`loading`、`scanned` 四个值。

```tsx
import React from 'react';
import { Flex, QRCode } from 'antd';

const value = 'https://ant.design';

const App: React.FC = () => (
  <Flex gap="middle" wrap>
    <QRCode value={value} status="loading" />
    <QRCode value={value} status="expired" onRefresh={() => console.log('refresh')} />
    <QRCode value={value} status="scanned" />
  </Flex>
);

export default App;
```

### 自定义状态渲染器

可以通过 `statusRender` 的值控制二维码不同状态的渲染逻辑。

```tsx
import React from 'react';
import { CheckCircleFilled, CloseCircleFilled, ReloadOutlined } from '@ant-design/icons';
import type { QRCodeProps } from 'antd';
import { Button, Flex, QRCode, Space, Spin } from 'antd';

const value = 'https://ant.design';

const customStatusRender: QRCodeProps['statusRender'] = (info) => {
  switch (info.status) {
    case 'expired':
      return (
        <div>
          <CloseCircleFilled style={{ color: 'red' }} /> {info.locale?.expired}
          <p>
            <Button type="link" onClick={info.onRefresh}>
              <ReloadOutlined /> {info.locale?.refresh}
            </Button>
          </p>
        </div>
      );
    case 'loading':
      return (
        <Space vertical>
          <Spin />
          <p>Loading...</p>
        </Space>
      );
    case 'scanned':
      return (
        <div>
          <CheckCircleFilled style={{ color: 'green' }} /> {info.locale?.scanned}
        </div>
      );
    default:
      return null;
  }
};

const App: React.FC = () => (
  <Flex gap="middle" wrap>
    <QRCode value={value} status="loading" statusRender={customStatusRender} />
    <QRCode
      value={value}
      status="expired"
      onRefresh={() => console.log('refresh')}
      statusRender={customStatusRender}
    />
    <QRCode value={value} status="scanned" statusRender={customStatusRender} />
  </Flex>
);

export default App;
```

### 自定义渲染类型

通过设置 `type` 自定义渲染结果，提供 `canvas` 和 `svg` 两个选项。

```tsx
import React from 'react';
import { QRCode, Space } from 'antd';

const App: React.FC = () => (
  <Space>
    <QRCode type="canvas" value="https://ant.design/" />
    <QRCode type="svg" value="https://ant.design/" />
  </Space>
);

export default App;
```

### 自定义尺寸

自定义尺寸

```tsx
import React, { useState } from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, QRCode, Space } from 'antd';

const MIN_SIZE = 48;
const MAX_SIZE = 300;

const App: React.FC = () => {
  const [size, setSize] = useState<number>(160);

  const increase = () => {
    setSize((prevSize) => {
      const newSize = prevSize + 10;
      if (newSize >= MAX_SIZE) {
        return MAX_SIZE;
      }
      return newSize;
    });
  };

  const decline = () => {
    setSize((prevSize) => {
      const newSize = prevSize - 10;
      if (newSize <= MIN_SIZE) {
        return MIN_SIZE;
      }
      return newSize;
    });
  };

  return (
    <>
      <Space.Compact style={{ marginBottom: 16 }}>
        <Button onClick={decline} disabled={size <= MIN_SIZE} icon={<MinusOutlined />}>
          Smaller
        </Button>
        <Button onClick={increase} disabled={size >= MAX_SIZE} icon={<PlusOutlined />}>
          Larger
        </Button>
      </Space.Compact>
      <QRCode
        errorLevel="H"
        size={size}
        iconSize={size / 4}
        value="https://ant.design/"
        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
    </>
  );
};

export default App;
```

### 自定义颜色

通过设置 `color` 自定义二维码颜色，通过设置 `bgColor` 自定义背景颜色。

```tsx
import React from 'react';
import { QRCode, Space, theme } from 'antd';

const { useToken } = theme;

const App: React.FC = () => {
  const { token } = useToken();
  return (
    <Space>
      <QRCode value="https://ant.design/" color={token.colorSuccessText} />
      <QRCode
        value="https://ant.design/"
        color={token.colorInfoText}
        bgColor={token.colorBgLayout}
      />
    </Space>
  );
};

export default App;
```

### 下载二维码

下载二维码的简单实现。

```tsx
import React from 'react';
import { Button, QRCode, Segmented, Space } from 'antd';
import type { QRCodeProps } from 'antd';

function doDownload(url: string, fileName: string) {
  const a = document.createElement('a');
  a.download = fileName;
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

const downloadCanvasQRCode = () => {
  const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
  if (canvas) {
    const url = canvas.toDataURL();
    doDownload(url, 'QRCode.png');
  }
};

const downloadSvgQRCode = () => {
  const svg = document.getElementById('myqrcode')?.querySelector<SVGElement>('svg');
  const svgData = new XMLSerializer().serializeToString(svg!);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  doDownload(url, 'QRCode.svg');
};

const App: React.FC = () => {
  const [renderType, setRenderType] = React.useState<QRCodeProps['type']>('canvas');
  return (
    <Space id="myqrcode" vertical>
      <Segmented options={['canvas', 'svg']} value={renderType} onChange={setRenderType} />
      <div>
        <QRCode
          type={renderType}
          value="https://ant.design/"
          bgColor="rgba(255,255,255,0.5)"
          style={{ marginBottom: 16 }}
          icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
        <Button
          type="primary"
          onClick={renderType === 'canvas' ? downloadCanvasQRCode : downloadSvgQRCode}
        >
          Download
        </Button>
      </div>
    </Space>
  );
};

export default App;
```

### 纠错比例

通过设置 errorLevel 调整不同的容错等级。

```tsx
import React, { useState } from 'react';
import type { QRCodeProps } from 'antd';
import { QRCode, Segmented } from 'antd';

const App: React.FC = () => {
  const [level, setLevel] = useState<QRCodeProps['errorLevel']>('L');
  return (
    <>
      <QRCode
        style={{ marginBottom: 16 }}
        errorLevel={level}
        value="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
      />
      <Segmented options={['L', 'M', 'Q', 'H']} value={level} onChange={setLevel} />
    </>
  );
};

export default App;
```

### 高级用法

带气泡卡片的例子。

```tsx
import React from 'react';
import { Button, Popover, QRCode } from 'antd';

const App: React.FC = () => (
  <Popover content={<QRCode value="https://ant.design" bordered={false} />}>
    <Button type="primary">Hover me</Button>
  </Popover>
);

export default App;
```

### 自定义语义结构的样式和类

通过 `classNames` 和 `styles` 传入对象/函数可以自定义 QRCode 的[语义化结构](#semantic-dom)样式。

```tsx
import React from 'react';
import { Flex, QRCode } from 'antd';
import type { QRCodeProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const classNames = createStaticStyles(({ css }) => ({
  root: css`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
  `,
}));

const stylesObject: QRCodeProps['styles'] = {
  root: {
    border: '2px solid #1890ff',
    borderRadius: 8,
    padding: 16,
    backgroundColor: 'rgb(24, 144, 255, 0.1)',
  },
};

const stylesFunction: QRCodeProps['styles'] = (info) => {
  if (info.props.type === 'canvas') {
    return {
      root: {
        border: '2px solid #ff4d4f',
        borderRadius: 8,
        padding: 16,
        backgroundColor: 'rgba(255, 77, 79, 0.1)',
      },
    } satisfies QRCodeProps['styles'];
  }
};

const App: React.FC = () => {
  const sharedProps: QRCodeProps = {
    value: 'https://ant.design/',
    size: 160,
    classNames,
  };

  return (
    <Flex gap="middle">
      <QRCode {...sharedProps} styles={stylesObject} />
      <QRCode
        {...sharedProps}
        type="canvas"
        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        styles={stylesFunction}
      />
    </Flex>
  );
};

export default App;
```


## API

通用属性参考：[通用属性](/docs/react/common-props)

> 自 `antd@5.1.0` 版本开始提供该组件。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| :-- | :-- | :-- | :-- | :-- |
| value | 扫描后的文本 | `string \| string[]` | - | `string[]`: 5.28.0 |
| type | 渲染类型 | `canvas \| svg ` | `canvas` | 5.6.0 |
| icon | 二维码中图片的地址（目前只支持图片地址） | string | - |
| size | 二维码大小 | number | 160 |
| iconSize | 二维码中图片的大小 | number \| { width: number; height: number } | 40 | 5.19.0 |
| color | 二维码颜色 | string | `#000` |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| bgColor | 二维码背景颜色 | string | `transparent` | 5.5.0 |
| marginSize | 留白（安静区）大小（单位为模块数），`0` 表示无留白 | number | `0` | 6.2.0 |
| bordered | 是否有边框 | boolean | `true` |
| errorLevel | 二维码纠错等级 | `'L' \| 'M' \| 'Q' \| 'H' ` | `M` |
| boostLevel | 如果启用，自动提升纠错等级，结果的纠错级别可能会高于指定的纠错级别 | `boolean` | true | 5.28.0 |
| status | 二维码状态 | `active \| expired \| loading \| scanned` | `active` | scanned: 5.13.0 |
| statusRender | 自定义状态渲染器 | (info: [StatusRenderInfo](/components/qr-code-cn#statusrenderinfo)) => React.ReactNode | - | 5.20.0 |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| type | 渲染类型 | `canvas \| svg` | `canvas` | 5.6.0 |
| value | 扫描后的文本 | string | - |  |

### StatusRenderInfo

```typescript
type StatusRenderInfo = {
  status: QRStatus;
  locale: Locale['QRCode'];
  onRefresh?: () => void;
};
```

## Semantic DOM

https://ant.design/components/qr-code-cn/semantic.md

## 主题变量（Design Token）{#design-token}



## 全局 Token
| Token 名称 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| borderRadiusLG | LG号圆角，用于组件中的一些大圆角，如 Card、Modal 等一些组件样式。 | number |  |
| colorSplit | 用于作为分割线的颜色，此颜色和 colorBorderSecondary 的颜色一致，但是用的是透明色。 | string |  |
| colorText | 最深的文本色。为了符合W3C标准，默认的文本颜色使用了该色，同时这个颜色也是最深的中性色。 | string |  |
| colorWhite | 不随主题变化的纯白色 | string |  |
| controlHeight | Ant Design 中按钮和输入框等基础控件的高度 | number |  |
| fontFamily | Ant Design 的字体家族中优先使用系统默认的界面字体，同时提供了一套利于屏显的备用字体库，来维护在不同平台以及浏览器的显示下，字体始终保持良好的易读性和可读性，体现了友好、稳定和专业的特性。 | string |  |
| fontSize | 设计系统中使用最广泛的字体大小，文本梯度也将基于该字号进行派生。 | number |  |
| lineHeight | 文本行高 | number |  |
| lineType | 用于控制组件边框、分割线等的样式，默认是实线 | string |  |
| lineWidth | 用于控制组件边框、分割线等的宽度 | number |  |
| marginXS | 控制元素外边距，小尺寸。 | number |  |
| paddingSM | 控制元素的小内间距。 | number |  |



## FAQ

### 关于二维码纠错等级 {#faq-error-correction-level}

纠错等级也叫纠错率，就是指二维码可以被遮挡后还能正常扫描，而这个能被遮挡的最大面积就是纠错率。

通常情况下二维码分为 4 个纠错级别：`L级` 可纠正约 `7%` 错误、`M级` 可纠正约 `15%` 错误、`Q级` 可纠正约 `25%` 错误、`H级` 可纠正约`30%` 错误。并不是所有位置都可以缺损，像最明显的三个角上的方框，直接影响初始定位。中间零散的部分是内容编码，可以容忍缺损。当二维码的内容编码携带信息比较少的时候，也就是链接比较短的时候，设置不同的纠错等级，生成的图片不会发生变化。

> 有关更多信息，可参阅相关资料：[https://www.qrcode.com/zh/about/error_correction](https://www.qrcode.com/zh/about/error_correction.html)

### ⚠️⚠️⚠️ 二维码无法扫描？ {#faq-cannot-scan}

若二维码无法扫码识别，可能是因为链接地址过长导致像素过于密集，可以通过 size 配置二维码更大，或者通过短链接服务等方式将链接变短。
