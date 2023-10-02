---
title: 所见即所得
date: 2023-05-10
author: zombieJ
---

在日常开发过程中，你是否思考过一个问题。那就是范围限定和实际值不同的时候，应该如何去处理？假设我们有一个展示组件，它很简单的将你的值进行展示：

```tsx
interface StrProps {
  value: string;
}

function MyStr({ value }: StrProps) {
  return <div>{value}</div>;
}
<MyStr value="Hello World" />;
```

毫无疑问，页面上就该展示 `Hello World`。接着，我们加个范围限定：

```tsx
interface StrProps {
  value: string;
  maxLen?: number;
}
```

这个时候如果我们使用了超出范围的值应该显示什么？

```tsx
<MyStr value="Hello World" maxLen={5}>
```

“显而易见”，既然有了 `maxLen`，那么就应该显示 `Hello` 而非 `Hello World`。

但是这种直觉的处理方式，却并不是所有情况下都是正确的。如果你使用原生的 input，你就发现表现并不是这样的：

```tsx
<input value="Hello World" maxLength={5} />
```

<img height="50" alt="input limit" src="https://github.com/ant-design/ant-design/assets/5378891/31352b9b-6d68-4a42-832d-5a639fed80cc">

按照标准描述，`maxLength` 只限制用户输入。这是标准错了吗？

> A form control maxlength attribute, controlled by the dirty value flag, declares a limit on the number of characters a user can input.

### “多此一举”

带着上面的疑问，我们想象一个输入场景。现在你有一个电商系统，给商品设定价格：

```tsx
<Form>
  <Form.Item label="Name" name="name">
    <Input />
  </Form.Item>

  <Form.Item label="Price" name="price">
    <InputNumber />
  </Form.Item>
</Form>
```

<img height="160" alt="Form" src="https://github.com/ant-design/ant-design/assets/5378891/f9ad7f13-d2bf-4537-9265-48789e2c4d0e">

某天你的经理说，我们的商品价格按规定不能超过 99 元，你要直接在表单上做限制。这个改动并不难：

```diff
--  <InputNumber />
++  <InputNumber max={99} />
```

但是对于现有的商品，我们显然不能直接在表单上做限制。否则，用户在编辑商品的时候，就会发现自己的商品价格被改了。这显然是不合理的。

<img height="162" alt="Form modify" src="https://github.com/ant-design/ant-design/assets/5378891/08d07ec2-7be8-45fa-b30b-51395252bcd0">

（用户永远无法明白为什么后台的数据和看到的对不上了）

实际上在很多场景下，组件都不应该直接修改实际值。尤其是输入型组件，擅自更改展示值会出现非常严重的后果。

### 所见即所得

在组件库层面，我们不能“推测”用户的使用场景，因而需要以最保守的方式实现边界场景的处理。但是同时我们其实可以做一些优化手段。比如说将限制设置到 Form.Item 的 `rules` 上，利用表单校验能力来做限制：

<img height="160" alt="Form rules" src="https://github.com/ant-design/ant-design/assets/5378891/52b35fb3-a800-447f-85b3-684d9a65c8d1">

对于一些组件本身，也可以添加显式的样式提醒：

<img height="40" alt="InputNumber" src="https://github.com/ant-design/ant-design/assets/5378891/e14ab877-4778-49c7-af75-91e36e60ce0f">

对于非输入型自定义组件，也可以考虑通过设计来提醒用户。比如说我们可以在展示组件上添加一个 Tooltip：

```tsx
// Same demo we've seen before
<MyStr value="Hello World" maxLen={5}>
```

<img height="90" alt="Customize" src="https://github.com/ant-design/ant-design/assets/5378891/18b095c4-eee9-45df-aa05-b4f5c20c81f8">

或者使用一些其他的展示方式：

<img height="40" alt="Ellipsis" src="https://github.com/ant-design/ant-design/assets/5378891/24162b19-985c-4fc4-908a-cdddfc507fc9">

### 总结

在进行组件研发时，需要慎重处理边界场景。在大型项目中，上游使用者可能并不知道你的内部逻辑是如何处理的。因而随着复杂度以及使用场景的增加，我们更加推荐对于默认行为总是选择保守的处理方式。而对于不满足需求的情况，可以通过 HOC 的形式或者是一些额外的 Props 配置来实现，以防止开发者在使用时有过多的约定而不知。
