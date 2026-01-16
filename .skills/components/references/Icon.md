# Icon — 图标

## 功能概述

语义化的矢量图形。

## 应用场景

- 语义化的矢量图形。
- 需要在页面中以一致样式呈现图标能力时。

## 输入字段

### 通用图标 属性

#### 必填

- 无必填属性。

#### 可选

- `className`: string，设置图标的样式名。
- `rotate`: number，图标旋转角度（IE9 无效）。
- `spin`: boolean，是否有旋转动画，默认 false。
- `style`: CSSProperties，设置图标的样式，例如 `fontSize` 和 `color`。
- `twoToneColor`: string | string[]，仅适用双色图标。设置双色图标的主要颜色，支持设置十六进制颜色字符串。

### 自定义 Icon 属性

#### 必填

- 无必填属性。

#### 可选

- `component`: ComponentType<CustomIconComponentProps>，控制如何渲染图标，通常是一个渲染根标签为 `<svg>` 的 React 组件。
- `rotate`: number，图标旋转角度（IE9 无效）。
- `spin`: boolean，是否有旋转动画，默认 false。
- `style`: CSSProperties，设置图标的样式，例如 `fontSize` 和 `color`。

### <use> 属性

#### 必填

- 无必填属性。

#### 可选

- `extraCommonProps`: { \[key: string]: any }，给所有的 `svg` 图标 `<Icon />` 组件设置额外的属性，默认 {}。
- `scriptUrl`: string | string\[]，[iconfont.cn](http://iconfont.cn/) 项目在线生成的 js 地址，`@ant-design/icons@4.1.0` 之后支持 `string[]` 类型。

## 方法

无公开方法。

## 使用建议

按语义选择合适的图标；统一使用同一风格；配合 Button 等组件使用。

## 示例代码

```tsx
import Icon, {
  CheckCircleTwoTone,
  createFromIconfontCN,
  HeartTwoTone,
  HomeOutlined,
  LoadingOutlined,
  SettingFilled,
  SmileOutlined,
  SmileTwoTone,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Space } from 'antd';
import type { GetProps } from 'antd';

const App: React.FC = () => (
  <Space size="large">
    <HomeOutlined />
    <SettingFilled />
    <SmileOutlined />

    <SyncOutlined spin />
    <LoadingOutlined />

    <SmileOutlined rotate={180} />

    <SmileTwoTone />
    <HeartTwoTone twoToneColor="#eb2f96" />
    <CheckCircleTwoTone twoToneColor="#52c41a" />

    <Button type="primary" icon={<HomeOutlined />}>
      Home
    </Button>
    <Button icon={<SettingFilled />} />

    <HomeOutlined style={{ fontSize: '24px', color: '#08c' }} />
  </Space>
);

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const IconfontDemo: React.FC = () => (
  <Space>
    <IconFont type="icon-tuichu" />
    <IconFont type="icon-facebook" />
    <IconFont type="icon-twitter" />
  </Space>
);

type CustomIconComponentProps = GetProps<typeof Icon>;

const HeartSvg = () => (
  <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
    <path d="M923 283.6c-13.4-31.1-32.6-59.2-56.9-83.5..." />
  </svg>
);

const HeartIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HeartSvg} {...props} />
);

const CustomIconDemo: React.FC = () => <HeartIcon style={{ color: 'hotpink' }} />;
```

## 返回结果

渲染一个图标。
