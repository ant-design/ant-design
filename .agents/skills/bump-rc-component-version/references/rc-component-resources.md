# rc-component 升级参考资源

## rc-component 仓库列表

所有 `@rc-component/*` 包均位于 `https://github.com/react-component/` 下：

| 包名 | GitHub 仓库 |
|---|---|
| @rc-component/cascader | https://github.com/react-component/cascader |
| @rc-component/checkbox | https://github.com/react-component/checkbox |
| @rc-component/collapse | https://github.com/react-component/collapse |
| @rc-component/color-picker | https://github.com/react-component/color-picker |
| @rc-component/dialog | https://github.com/react-component/dialog |
| @rc-component/drawer | https://github.com/react-component/drawer |
| @rc-component/dropdown | https://github.com/react-component/dropdown |
| @rc-component/form | https://github.com/react-component/form |
| @rc-component/image | https://github.com/react-component/image |
| @rc-component/input | https://github.com/react-component/input |
| @rc-component/input-number | https://github.com/react-component/input-number |
| @rc-component/mentions | https://github.com/react-component/mentions |
| @rc-component/menu | https://github.com/react-component/menu |
| @rc-component/motion | https://github.com/react-component/motion |
| @rc-component/mutate-observer | https://github.com/react-component/mutate-observer |
| @rc-component/notification | https://github.com/react-component/notification |
| @rc-component/pagination | https://github.com/react-component/pagination |
| @rc-component/picker | https://github.com/react-component/picker |
| @rc-component/progress | https://github.com/react-component/progress |
| @rc-component/qrcode | https://github.com/react-component/qrcode |
| @rc-component/rate | https://github.com/react-component/rate |
| @rc-component/resize-observer | https://github.com/react-component/resize-observer |
| @rc-component/segmented | https://github.com/react-component/segmented |
| @rc-component/select | https://github.com/react-component/select |
| @rc-component/slider | https://github.com/react-component/slider |
| @rc-component/steps | https://github.com/react-component/steps |
| @rc-component/switch | https://github.com/react-component/switch |
| @rc-component/table | https://github.com/react-component/table |
| @rc-component/tabs | https://github.com/react-component/tabs |
| @rc-component/textarea | https://github.com/react-component/textarea |
| @rc-component/tooltip | https://github.com/react-component/tooltip |
| @rc-component/tour | https://github.com/react-component/tour |
| @rc-component/tree | https://github.com/react-component/tree |
| @rc-component/tree-select | https://github.com/react-component/tree-select |
| @rc-component/trigger | https://github.com/react-component/trigger |
| @rc-component/upload | https://github.com/react-component/upload |
| @rc-component/util | https://github.com/react-component/util |
| @rc-component/virtual-list | https://github.com/react-component/virtual-list (devDep) |

## 查看版本信息的命令

```bash
# 查看某个包的所有版本
npm view @rc-component/table versions --json

# 查看最新版本详情
npm view @rc-component/table

# 查看当前安装的版本
npm ls @rc-component/table

# 查看 package.json 中的版本范围
cat package.json | grep @rc-component
```

## 组件与 rc-component 的对应关系

| antd 组件 | 依赖的 rc-component |
|---|---|
| Cascader | @rc-component/cascader |
| Checkbox | @rc-component/checkbox |
| Collapse | @rc-component/collapse |
| ColorPicker | @rc-component/color-picker |
| Modal | @rc-component/dialog |
| Drawer | @rc-component/drawer |
| Dropdown | @rc-component/dropdown, @rc-component/trigger |
| Form | @rc-component/form |
| Image | @rc-component/image |
| Input | @rc-component/input |
| InputNumber | @rc-component/input-number |
| Mentions | @rc-component/mentions, @rc-component/select |
| Menu | @rc-component/menu |
| Notification | @rc-component/notification |
| Pagination | @rc-component/pagination |
| DatePicker | @rc-component/picker |
| TimePicker | @rc-component/picker |
| Progress | @rc-component/progress |
| QRCode | @rc-component/qrcode |
| Rate | @rc-component/rate |
| Segmented | @rc-component/segmented |
| Select | @rc-component/select |
| TreeSelect | @rc-component/tree-select, @rc-component/select |
| Slider | @rc-component/slider |
| Steps | @rc-component/steps |
| Switch | @rc-component/switch |
| Table | @rc-component/table |
| Tabs | @rc-component/tabs |
| Tooltip | @rc-component/tooltip, @rc-component/trigger |
| Popover | @rc-component/trigger |
| Tour | @rc-component/tour |
| Tree | @rc-component/tree |
| Upload | @rc-component/upload |

## 版本范围符号说明

| 符号 | 含义 | 示例 | 匹配范围 |
|---|---|---|---|
| `~` | 允许 patch 更新 | `~1.14.0` | `>=1.14.0 <1.15.0` |
| `^` | 允许 minor 更新 | `^3.9.0` | `>=3.9.0 <4.0.0` |
| `*` | 任意版本 | `*` | 所有版本 |
| `x` | 通配符 | `1.x` | `>=1.0.0 <2.0.0` |

## 相关文档

- antd 贡献者维护指南: `docs/blog/contributor-development-maintenance-guide.en-US.md`
- antd 国际化文档: `docs/react/i18n.en-US.md`
- npm 版本范围文档: https://docs.npmjs.com/about-semantic-versioning
