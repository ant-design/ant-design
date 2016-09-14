---
order: 4
title:
  zh-CN: 图标
  en-US: Icon
---

## zh-CN

可口的图标让信息类型更加醒目。

## en-US

Decent icon make information more clear and more friendly.

````jsx
import { Alert } from 'antd';

ReactDOM.render(<div>
  <Alert message="Copywriting Success Tips" type="success" showIcon />
  <Alert message="Copywriting Informational Notes" type="info" showIcon />
  <Alert message="Copywriting Warning" type="warning" showIcon />
  <Alert message="Copywriting Error" type="error" showIcon />
  <Alert
    message="Copywriting success tips"
    description="Detailed description and advices about successful copywriting."
    type="success"
    showIcon
  />
  <Alert
    message="Copywriting Informational Notes"
    description="Additional description and informations about copywriting."
    type="info"
    showIcon
  />
  <Alert
    message="Copywriting Warning"
    description="This is a warning notice about copywriting."
    type="warning"
    showIcon
  />
  <Alert
    message="Copywriting Error"
    description="This is an error message about copywriting."
    type="error"
    showIcon
  />
</div>, mountNode);
````
