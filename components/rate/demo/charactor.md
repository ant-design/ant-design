---
order: 4
title:
  zh-CN: 其他字符
  en-US: Other Charactor
---

## zh-CN

可以将星星替换为其他字符，比如字母，数字，字体图标甚至中文。

## en-US

Replace the default star to other charactor like alphabet, digit, iconfont or even Chinese word.

````jsx
import { Rate, Icon } from 'antd';

ReactDOM.render(
  <div>
    <Rate charactor={<Icon type="heart" />} allowHalf />
    <br />
    <Rate charactor="A" allowHalf style={{ fontSize: 36 }} />
    <br />
    <Rate charactor="好" allowHalf />
  </div>
, mountNode);
````
