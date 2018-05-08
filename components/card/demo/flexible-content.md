---
order: 3
title:
  zh-CN: 更灵活的内容展示
  en-US: Customized content
---

## zh-CN

可以利用 `Card.Meta` 支持更灵活的内容。

## en-US

You can use `Card.Meta` to support more flexible content.


````jsx
import { Card } from 'antd';
const { Meta } = Card;

ReactDOM.render(
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <Meta
      title="Europe Street beat"
      description="www.instagram.com"
    />
  </Card>
, mountNode);
````
