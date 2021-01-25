---
order: 13
title:
  zh-CN: maxLength
  en-US: maxLength
---

## zh-CN

在原生限制用户输入长度的基础上，同时还限制了动态赋值的长度

## en-US

On the basis of natively limiting the length of user input, it also limits the length of dynamic assignment

```jsx
import { Input ,Button} from 'antd';
import {useState} from 'react'

const Max = ()=>{
    const [value,setValue] = useState('1234')
    
    return (
        <>
        <Input placeholder="maxLength" maxLength={5} value={value} onChange={e=>setValue(e.target.value)} />
        <Input.TextArea placeholder="maxLength" maxLength={5} value={value} onChange={e=>setValue(e.target.value)} showCount />
        <Button onClick={()=>setValue('123456')}> set value </Button>
        </>
    )
}
ReactDOM.render(<Max />, mountNode);
```
