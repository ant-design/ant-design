<Antd component="Alert" title="以下 API 为 Skeleton、Avatar、Button、Input、Image、Node 共享的 API。" type="info" banner="true"></Antd>

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| active | 是否展示动画效果 | boolean | false |  |
| classNames | 用于自定义 Skeleton 组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - | 6.0.0 |
| styles | 用于自定义 Skeleton 组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - | 6.0.0 |
