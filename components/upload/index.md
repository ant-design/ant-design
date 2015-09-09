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

| 参数       | 说明                                                         | 类型        | 默认值|
|------------|--------------------------------------------------------------| ----------- |-------|
| name       | 可选参数, 上传的文件                                         | String      | file  |
| action     | 必选参数, 上传的地址                                         | String      | 无    |
| data       | 可选参数, 上传所需参数                                       | Object      | 无    |
| multiple   | 可选参数, 是否支持多选文件，支持 `ie10+`                     | Boolean     | false |
| accept     | 可选参数, 接受上传的文件类型, 详见 input accept Attribute    | String      | 无    |
| onChange   | 可选参数, 上传文件改变时的状态，详见 onChange                | Function    | 无    |

### onChange

文件状态改变的回调，返回为：

```js
{
  file: { ... },
  fileList: [ ... ],
  event: { ... }
}
```

1. `file` 当前操作的文件对象。

   ```js
   {
      uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
      name: 'xx.png'   // 文件名
      status: 'done',  // 状态：uploading done
      response: '{"status":"success"}'  // 服务端响应内容
   }
   ```

   如果上传控件为 multiple 且一次选择了多个文件，这个参数将为一个对象数组。

2. `fileList` 当前的文件列表。
3. `event` 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。

## 显示下载链接

请使用 fileList 属性设置数组项的 url 属性进行展示控制。
