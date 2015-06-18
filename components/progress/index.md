# Progress

- category: Components
- chinese: 进度条
- order: 0

---

展示操作的当前进度。

## 何时使用

> 在操作需要很长时间才能完成时，为用户显示该操作的当前进度和状态。

#### 什么时候使用

    * 当一个操作会打断当前界面，或者需要在后台运行，且耗时会超过2秒时；
    * 当需要显示一个操作大致完成的百分比时。
    
#### 为什么使用

    * 告知用户当前操作处理进度；
    * 告知用户系统运行状态是否正常。

## 属性参数

| 参数     | 说明           | 类型     | 默认值       |
|----------|---------------|----------|-------------|
| percent  | 百分比         | number   | 0           |
| status   | 状态，有两个值normal、exception | string   | normal |
| strokeWidth | 进度条线宽度，单位是进度条画布宽度的百分比 | number | 1           |
| width | 必填，进度条画布宽度，单位px。这里没有提供height属性设置，Line型高度就是strokeWidth，Circle型高度等于width | number | null |




