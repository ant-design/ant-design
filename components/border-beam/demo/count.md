## zh-CN

通过 `count` 设置流光数量，`count` 应为正整数，多条流光会均匀分布在容器边框上。通过 `items` 分别设置每条流光的 `color`、`lineWidth`、`outset` 和 `size`，流光数量由数组长度决定。`count` 与 `items` 同时传入时，以 `items` 为准。数组项未设置的属性会继承组件的同名属性。

## en-US

Use `count` to set the number of beams. `count` should be a positive integer, and multiple beams are evenly distributed around the container border. Use `items` to configure each beam's `color`, `lineWidth`, `outset`, and `size`; the array length determines the number of beams. When both `count` and `items` are provided, `items` takes precedence. Omitted item properties inherit the corresponding component props.
