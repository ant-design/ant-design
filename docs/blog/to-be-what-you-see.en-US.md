---
title: To be what you see
date: 2023-05-10
author: zombieJ
---

With daily development, have you thought about a problem. When the range limit is different from the actual value, how should we deal with it? Suppose we have a display component that simply displays your value:

```tsx
interface StrProps {
  value: string;
}

function MyStr({ value }: StrProps) {
  return <div>{value}</div>;
}
<MyStr value="Hello World" />;
```

Without a doubt, `Hello World` should be displayed on the page. Next, we add a scope limit:

```tsx
interface StrProps {
  value: string;
  maxLen?: number;
}
```

What should be displayed if we use a value out of range at this time?

```tsx
<MyStr value="Hello World" maxLen={5}>
```

"Obviously", since you have `maxLen`, you should display `Hello` instead of `Hello World`.

But this intuitive approach is not correct in all cases. If you use native input, you will find that the behavior is not like this:

```tsx
<input value="Hello World" maxLength={5} />
```

<img height="50" alt="input limit" src="https://github.com/ant-design/ant-design/assets/5378891/31352b9b-6d68-4a42-832d-5a639fed80cc">

As described by the standard, `maxLength` only limits user input. Is this standard wrong?

> A form control maxlength attribute, controlled by the dirty value flag, declares a limit on the number of characters a user can input.

### "Unnecessary over design"

With the above questions in mind, we imagine an input scenario. Now you have an e-commerce system, set prices for products:

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

One day your manager said that the price of our product cannot exceed $99 according to regulations, and you have to set the limit directly on the form. This change is not difficult:

```diff
--  <InputNumber />
++  <InputNumber max={99} />
```

But for existing products, we obviously cannot restrict them directly on the form. Otherwise, when the user edits the product, he will find that the price of his product has been changed. This is obviously unreasonable.

<img height="162" alt="Form modify" src="https://github.com/ant-design/ant-design/assets/5378891/08d07ec2-7be8-45fa-b30b-51395252bcd0">

(Users will never be able to understand why the data in the background does not match what they see)

In fact, in many scenarios, components should not directly modify the actual value. Especially for input components, changing the display value without authorization will have very serious consequences.

### To be what you see

At the component library level, we cannot "guess" the user's usage scenarios, so we need to implement the processing of boundary scenarios in the most conservative way. But at the same time, we can actually do some optimization methods. For example, set the restriction to the `rules` of Form.Item, and use the form validation ability to make restrictions:

<img height="160" alt="Form rules" src="https://github.com/ant-design/ant-design/assets/5378891/52b35fb3-a800-447f-85b3-684d9a65c8d1">

For some components themselves, it is also possible to add explicit style reminders:

<img height="40" alt="InputNumber" src="https://github.com/ant-design/ant-design/assets/5378891/e14ab877-4778-49c7-af75-91e36e60ce0f">

For non-input custom components, you can also consider reminding users through design. For example, we can add a Tooltip to the display component:

```tsx
// Same demo we've seen before
<MyStr value="Hello World" maxLen={5}>
```

<img height="90" alt="Customize" src="https://github.com/ant-design/ant-design/assets/5378891/18b095c4-eee9-45df-aa05-b4f5c20c81f8">

Or use some other display way:

<img height="40" alt="Ellipsis" src="https://github.com/ant-design/ant-design/assets/5378891/24162b19-985c-4fc4-908a-cdddfc507fc9">

### Finally

Boundary scenarios need to be carefully handled when developing components. In complex system, upstream users may not know how your internal logic is handled. Therefore, as the complexity and usage scenarios increase, we recommend always choosing a conservative approach to the default behavior. For situations that do not meet the requirements, it can be implemented in the form of HOC or some additional Props configuration, so as to prevent developers from having too many agreements when using it without knowing it.
