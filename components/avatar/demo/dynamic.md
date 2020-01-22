---
order: 2
title:
  zh-CN: 自动调整字符大小
  en-US: Autoset Font Size
---

## zh-CN

对于字符型的头像，当字符串较长时，字体大小可以根据头像宽度自动调整。

## en-US

For letter type Avatar, when the letters are too long to display, the font size can be automatically adjusted according to the width of the Avatar.

```tsx
import React, { useState } from 'react';
import { Avatar, Button } from 'antd';

const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

const Autoset: React.FC = () => {
  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
  };
  return (
    <div>
      <Avatar style={{ backgroundColor: color, verticalAlign: 'middle' }} size="large">
        {user}
      </Avatar>
      <Button size="small" style={{ marginLeft: 16, verticalAlign: 'middle' }} onClick={changeUser}>
        Change
      </Button>
    </div>
  );
};

ReactDOM.render(<Autoset />, mountNode);
```
