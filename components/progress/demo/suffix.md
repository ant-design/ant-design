---
order: 11
debug: true
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

标准的进度条。

## en-US

A standard progress bar.

````jsx
import { Progress, Icon } from 'antd';

const smileIcon = <Icon type="smile" />;
const mehIcon = <Icon type="meh" />;
const heartIcon = <Icon type="heart" theme="filled" />;
const icon = {
  success: smileIcon,
  exception: mehIcon,
};
const iconSuccessOnly = {
  success: smileIcon,
};

ReactDOM.render(
  <div>
    <h2>Icon</h2>
    <p>Use Object</p>
    <Progress icon={icon} percent={30} />
    <Progress icon={icon} percent={50} status="active" />
    <Progress icon={icon} percent={70} status="exception" />
    <Progress icon={icon} percent={100} />
    <Progress icon={icon} percent={50} showInfo={false} />
    <Progress icon={icon} type="circle" percent={75} />
    <Progress icon={icon} type="circle" percent={70} status="exception" />
    <Progress icon={icon} type="circle" percent={100} />
    <p>Use Object (only Success)</p>
    <Progress icon={iconSuccessOnly} percent={30} />
    <Progress icon={iconSuccessOnly} percent={50} status="active" />
    <Progress icon={iconSuccessOnly} percent={70} status="exception" />
    <Progress icon={iconSuccessOnly} percent={100} />
    <Progress icon={iconSuccessOnly} percent={50} showInfo={false} />
    <Progress icon={iconSuccessOnly} type="circle" percent={75} />
    <Progress icon={iconSuccessOnly} type="circle" percent={70} status="exception" />
    <Progress icon={iconSuccessOnly} type="circle" percent={100} />
    <p>Use React Node</p>
    <Progress icon={heartIcon} percent={30} />
    <Progress icon={heartIcon} percent={50} status="active" />
    <Progress icon={heartIcon} percent={70} status="exception" />
    <Progress icon={heartIcon} percent={100} />
    <Progress icon={heartIcon} percent={50} showInfo={false} />
    <Progress icon={heartIcon} type="circle" percent={75} />
    <Progress icon={heartIcon} type="circle" percent={70} status="exception" />
    <Progress icon={heartIcon} type="circle" percent={100} />
  </div>,
  mountNode);
````
