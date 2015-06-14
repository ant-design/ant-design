# Tab

- category: Components
- chinese: 标签页
- order: 5

---

选项卡切换组件。

## API

### Tab

| 参数             | 说明                                         | 类型     | 默认值                          |
|------------------|----------------------------------------------|----------|---------------------------------|
| activeKey        | 当前激活 tab 面板的 key                      | String   | 无                              |
| animation        | 是否启用面板切换动画                         | String   | 空。目前只支持 slide-horizontal |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey | String   | 第一个面板                      |
| onChange         | 切换面板的回调                               | Function | 无                              |
| onTabClick       | tab 被点击的回调                             | Function | 无                              |


### Tab.TabPane

| 参数 | 说明             | 类型                    | 默认值 |
|------|------------------|-------------------------|--------|
| key  | 对应 activeKey   | String                  | 无     |
| tab  | 选项卡头显示文字 | React.Element or String | 无     |
