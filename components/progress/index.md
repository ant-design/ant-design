# Progress

- category: Components
- chinese: 进度条
- order: 0

---

展示操作的当前进度。

## 何时使用

- 需要告知用户进行时、失败、已完成的等运行状态。
- 需要展示操作的百分比时。

## 属性参数

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| percent    | 百分比           | number   | 0           |
| status   | 状态，有两个值normal、exception | string   | normal |
| strokeWidth | 进度条线宽度，单位是进度条画布宽度的百分比 | number | 1           |
| width | 必填，进度条画布宽度，单位px。这里没有提供height属性设置，Line型高度就是strokeWidth，Circle型高度等于width | number | null |




