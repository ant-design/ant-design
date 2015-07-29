# Motion

- category: CSS
- chinese: 组件动画
- order: 4
- cols: 1

---

## 组件的动画

通过设置组件的 `transitionName` 指定组件动画。

| 组件         | 中文名              | 采用动画                                        |
|--------------|---------------------|-------------------------------------------------|
| popover      | 气泡浮出层          | `zoom-up` `zoom-down` `zoom-left` `zoom-right`  |
| popconfirm   | 气泡确认框          | `zoom-up` `zoom-down` `zoom-left` `zoom-right`  |
| tooltip      | 文字提示框          | `zoom-up` `zoom-down` `zoom-left` `zoom-right`  |
| modal        | 弹出框              | `zoom`                                          |
| confirm      | 弹出确认框          | `zoom`                                          |
| message      | 信息提示条          | `move-up`                                       |
| dropdown     | 下拉菜单            | `slide-up`                                      |
| select       | 选择框              | `slide-up`                                      |
| datepicker   | 日期选择框          | `slide-up`                                      |

## 缓动函数

在以上组件的动画不适合时，请用以下缓动。

|名称               |参数                                      |说明与适用                  |
|-------------------|------------------------------------------|---------------------------|
|@ease-out          | `cubic-bezier(0.215, 0.61, 0.355, 1);`   |默认后缓动；适合元素展开时；    |
|@ease-in           | `cubic-bezier(0.55, 0.055, 0.675, 0.19);`|默认前缓动；适合元素关闭时；    |
|@ease-in-out       | `cubic-bezier(0.645, 0.045, 0.355, 1);`  |默认前后缓动；适合元素移动；    |
|@ease-out-back     | `cubic-bezier(0.18, 0.89, 0.32, 1.28);`  |结束回动；适合弹出框出现时；    |
|@ease-in-back      | `cubic-bezier(0.6, -0.3, 0.74, 0.05);`   |开始回动；适合弹出框关闭；     |
|@ease-in-out-back  | `cubic-bezier(0.68, -0.55, 0.27, 1.55);` |前后回动；                   |
|@ease-out-circ     | `cubic-bezier(0.08, 0.82, 0.17, 1);`     |圆形后缓动；适合元素展开时；    |
|@ease-in-circ      | `cubic-bezier(0.6, 0.04, 0.98, 0.34);`   |圆形前缓动；适合元素关闭时；    |
|@ease-in-out-circ  | `cubic-bezier(0.78, 0.14, 0.15, 0.86);`  |圆形缓动；适合元素移动；       |
