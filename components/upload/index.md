---
category: Components
chinese: 上传
type: Form Control
english: Upload
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
| defaultFileList | 可选参数，默认已经上传的文件列表                           | Array[Object] | 无  |
| fileList   | 可选参数，已经上传的文件列表                                   | Array[Object] | 无 |
| action     | 必选参数, 上传的地址                                         | String      | 无    |
| data       | 可选参数, 上传所需参数或返回上传参数的方法                   | Object or function(file) | 无    |
| headers    | 可选参数, 设置上传的请求头部，IE10 以上有效                    | Object      | 无    |
| showUploadList | 可选参数, 是否展示 uploadList, 默认开启                  | Boolean     | true  |
| multiple   | 可选参数, 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件。  | Boolean     | false |
| accept     | 可选参数, 接受上传的文件类型, 详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-accept)    | String      | 无    |
| beforeUpload | 可选参数, 上传文件之前的钩子，参数为上传的文件，若返回 `false` 或者 Promise 则停止上传。**注意：该方法不支持老 IE**。 | Function    | 无    |
| onChange   | 可选参数, 上传文件改变时的状态，详见 onChange                | Function    | 无    |
| listType   | 上传列表的内建样式，支持两种基本样式 `text` or `picture`     | String      | 'text'|
| onPreview  | 点击文件链接时的回调                                       | Function(file) | 无    |
| onRemove   | 点击移除文件时的回调                                       | Function(file) | 无    |
| supportServerRender | 服务端渲染时需要打开这个                           | Boolean | false    |

### onChange

> 上传中、完成、失败都会调用这个函数。

文件状态改变的回调，返回为：

```js
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```

1. `file` 当前操作的文件对象。

   ```js
   {
      uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
      name: 'xx.png'   // 文件名
      status: 'done',  // 状态有：uploading done error removed
      response: '{"status": "success"}',  // 服务端响应内容
   }
   ```

   如果上传控件是 multiple 时，此参数将为一个对象数组 `[file, ...]`。

2. `fileList` 当前的文件列表。
3. `event` 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。

## 显示下载链接

请使用 fileList 属性设置数组项的 url 属性进行展示控制。

## IE note

- [https://github.com/react-component/upload#ie89-note](https://github.com/react-component/upload#ie89-note)
