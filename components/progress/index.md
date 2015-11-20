# Progress

- category: Components
- chinese: 进度条
- type: 展示

---

展示操作的当前进度。

## 何时使用

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

* 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过2秒时；
* 当需要显示一个操作完成的百分比时。

## API

## Progress Line

| 参数     | 说明           | 类型     | 默认值        |
|----------|----------------|----------|---------------|
| percent  | 百分比         | number   | 0             |
| format   | 数字的模板     | string   | "${percent}%" |
| status   | 状态，可选：normal、exception、active | string   | normal |
| strokeWidth | 进度条线的宽度，单位是px | number | 1  |
| showInfo | 是否显示进度数值和状态图标 | bool | true  |

### Progress Circle

| 参数     | 说明           | 类型     | 默认值        |
|----------|----------------|----------|---------------|
| percent  | 百分比         | number   | 0             |
| format   | 数字的模板     | string   | "${percent}%" |
| status   | 状态，可选：normal、exception | string  | normal |
| strokeWidth | 进度条线的宽度，单位是进度条画布宽度的百分比 | number | 1           |
| width | 必填，进度条画布宽度，单位px。这里没有提供height属性设置，Line型高度就是strokeWidth，Circle型高度等于width | number | null |
