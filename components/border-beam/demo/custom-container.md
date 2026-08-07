## zh-CN

自定义容器也可以作为 `BorderBeam` 的宿主。由于流光层会被插入到子节点内部，并通过 `position: absolute` 贴合容器边缘，因此宿主元素需要提供定位上下文，通常设置 `position: relative` 即可。

## en-US

A custom container can also host `BorderBeam`. The beam layer is inserted into the child node and positioned with `position: absolute` along the container edge, so the host element needs to provide a positioning context. In most cases, set `position: relative`.
