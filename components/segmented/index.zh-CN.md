---
category: Components
subtitle: 分段控制器
type: 数据展示
title: Segmented
cover: https://gw.alipayobjects.com/zos/alicdn/tX6-md4H6/Affix.svg
---

分段控制器。

## 何时使用

- 用于展示多个选项并允许用户选择其中单个选项；
- 当切换选中选项时，关联区域的内容会发生变化。

## API

### Segmented

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| block | 将宽度调整为父元素宽度的选项 | boolean | false |  |
| defaultValue | 默认选中的值 | string \| number |  |  |
| disabled | 是否禁用 | boolean | false |  |
| onChange | 选项变化时的回调函数 | function(e:Event) |  |  |
| options | 数据化配置选项内容 | string\[] \| number\[] \| Array<{ label: string value: string icon? ReactNode disabled?: boolean className?: string }> | [] |  |
| value | 当前选中的值 | string \| number |  |  |
