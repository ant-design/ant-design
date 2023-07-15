## zh-CN

可以自定义工具栏并添加下载原图或翻转旋转后图片的按钮。

## en-US

You can customize the toolbar and add a button for downloading the original image or downloading the flipped and rotated image.

```css
.toolbar-wrapper {
  position: fixed;
  bottom: 32px;
  left: 50%;
  padding: 0px 24px;
  color: #fff;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 100px;
  transform: translateX(-50%);
}

.toolbar-wrapper .anticon {
  padding: 12px;
  cursor: pointer;
}

.toolbar-wrapper .anticon[disabled] {
  cursor: not-allowed;
  opacity: 0.3;
}

.toolbar-wrapper .anticon:hover {
  opacity: 0.3;
}
```
