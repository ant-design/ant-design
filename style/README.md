# style

ant-design 样式库

## 目录说明

|-- components  (定义所有组件样式)

|-- core  (定义全局样式)

|-- mixins  (less mixins)

|-- themes  (皮肤)

## 约定

@css-prefix 变量定义整个样式库的类名前缀，默认为 `ant-`，

各个组件中如要自定义类名前缀，请误重名变量，可参照如下定义：

`@btn-prefix-cls: ~"@{css-prefix}btn";`
