# Breadcrumb

- category: Components
- chinese: 面包屑
- type: 导航

---

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时；
- 当需要告知用户“你在哪里”时；
- 当需要向上导航的功能时。

## API

```html
<Breadcrumb>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
  <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
  <Breadcrumb.Item>某应用</Breadcrumb.Item>
</Breadcrumb>
```

### Breadcrumb

| 参数      | 说明                              | 类型              |  可选值 | 默认值 |
|-----------|-----------------------------------|-------------------|---------|--------|
| router    | 可传入 react-router 的实例        | Object            |         | -      |
| routes    | router 的路由栈信息               | Array             |         | -      |
| params    | 路由的参数                        | Object            |         | -      |
| separator | 分隔符自定义                      | String or Element |         | '/'    |

### Breadcrumb.Item

| 参数      | 说明                                     | 类型       |  可选值 | 默认值 |
|-----------|------------------------------------------|------------|---------|--------|
| href      | 链接，如不传则不可点击                   | string     |         | -      |
