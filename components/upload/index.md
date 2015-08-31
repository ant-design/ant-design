# Upload

- category: Components
- chinese: 文件上传
- type: 表单

---

文件选择上传和拖拽上传控件。

## 何时使用

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。

## API

| 参数        | 说明                                                      | 类型        | 默认值 |
|----------- |---------------------------------------------------------  | ---------- |-------|
| name       | 可选参数, 上传的文件                                         | String      | file    |
| action     | 必选参数, 上传的地址                                         | String      | 无    |
| data       | 可选参数, 上传所需参数                                       | Object      | 无    |
| multiple   | 可选参数, 是否支持多选文件，支持ie10+                        | Boolean     | false |
| accept     | 可选参数, 接受上传的文件类型, 详见input accept Attribute     | String      | 无    |
| onError    | 可选参数, error callback                                   |Function     | 无    |
| onSuccess  | 可选参数, success callback                                 | Function     | 无    |
| onProgress | 可选参数, progress callback, 现代浏览器有效                  | Function     | 无    |
| urlResolver| 通过解析请求返回数据，获得文件上传的远程地址                 | Function     | `function() { return JSON.parse(ret).url }` |
| limit      | 文件上传数量的限制                 | Number     | Number.MAX_VALUE |

### onError

错误回调，有三个参数返回：

1. `err` 请求返回错误信息
2. `responce` 请求响应，包括错误状态码等信息
3. `file` 错误的文件对象

### onSuccess

成功回调，返回两个参数

1. `result` 上传图片返回结果
2. `file` 文件对象
