# Radio

- category: Components
- chinese: 单选框

---

单选框。

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。


## API


| 参数      | 说明                                     | 类型       |  可选值 |默认值 |
|-----------|------------------------------------------|------------|-------|--------|
|  checked | 指定当前是否选中 | boolean  |   | false    |
|  defaultChecked | 初始是否选中 | boolean |  | false |
|  onChange | 变化时回调函数，组合时必须 | Function(e:Event) |  |  |
| value | value参数，组合时根据此项判定checked | -- | | | |

####组合使用：
以value值来决定自身的checked，

gruop里需一个做全局checked的参数
`getInitialState() {
  return {
    r: 'a'
  }
}`

在自身checked上判断`this.state.r === 'a'`；

回调接口里
`this.setState({
       r: e.target.value
     })`
