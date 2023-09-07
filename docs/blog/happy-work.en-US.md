---
title: Happy Work Theme
date: 2023-08-04
author: zombieJ
---

In the v5 release announce, our design team mentioned that we will provide a happy work theme. This part of the work is still in progress, but we have made some progress and would like to share it with you here.

## TL;DR

You can directly use `@ant-design/happy-work-theme` to switch theme effects (or continue reading to see what we have done):

```tsx
import { HappyProvider } from '@ant-design/happy-work-theme';

export default () => (
  <HappyProvider>
    <Button />
  </HappyProvider>
);
```

![Happy Work Theme](https://github.com/react-component/picker/assets/5378891/3c54ef05-5448-4619-b492-b5328c032c52)

## Customize Wave Effect

There is a special design interaction in Ant Design, which is the click wave effect on some components. You can see them everywhere:

- <img alt="Button" height="110" src="https://github.com/react-component/picker/assets/5378891/60aaad50-cfd5-4c1f-b91f-0be217877f3f" />
- <img alt="Checkbox" height="70" src="https://github.com/react-component/picker/assets/5378891/f7d64d64-29db-4c9c-a0d6-de8b36a31d48" />
- <img alt="Radio" height="70" src="https://github.com/react-component/picker/assets/5378891/9f4edaa8-26f7-468c-bcf3-1ce80163bf0e" />
- <img alt="Switch" height="84" src="https://github.com/react-component/picker/assets/5378891/16abcee6-32d0-4075-bc4c-440d8aade067" />

In the past major versions, this wave effect could not be modified. If want to turn it off, developers even need to do some "magic code" to achieve it. So when the designer proposed a happy work theme, as a developer, we think this is a good time to make some changes.

### Wave component

Wave effect is actually an component, which listens to the click event of the child component. Then add a `box-shadow` animation to generate a wave effect:

```tsx
// Sample code.
const Button = (
  <Wave>
    <button />
  </Wave>
);
```

In the early design ([#40111](https://github.com/ant-design/ant-design/pull/40111)), we hope that the wave customization ability belongs to part of the Design Token. But in this way, the Design Token will become a bit too complicated, from the original pure `string | number` type to `string | number | Function<T>`. From the API design point of view, `Function<T>` also has a bad smell, and if there are new customization requirements in the future, the type of Function will become more and more divergent. So [#40111](https://github.com/ant-design/ant-design/pull/40111) stays in the Draft version forever.

### ConfigProvider

Next, we choose to put it in ConfigProvider. ConfigProvider is a global configuration component, which can affect all child components. Its API has also included a lot of component configuration capabilities, so we only need to add a `wave` property:

```tsx
<ConfigProvider wave={{ showEffect }}>
  <Button />
</ConfigProvider>
```

![Customize Wave Effect](https://github.com/react-component/picker/assets/5378891/425094d8-8767-4a53-85fb-5b13b888f2c4)

Click to [view ConfigProvider demo](/components/config-provider#config-provider-demo-wave).

`showEffect` method will tell you the DOM node that needs to generate the effect. This node has been encapsulated and will always correspond to the correct element (for example, Button is itself, and Radio will find the circle shape dom from `label`). And tell you which component it is and which Design Token the current node belongs to:

```tsx
type ShowEffect = (target: HTMLElement, info: { component: string; token: GlobalToken }) => void;
```

Through Design Token, you can implement effects that conform to the current theme. For example, in the GIF at the beginning of the article, when the theme color changes, we can get the current theme color and add the corresponding effect.

## One more thing

Happy work theme is still in progress, and we will gradually add more capabilities in subsequent versions. The HappyProvider provided by `@ant-design/happy-work-theme` currently replaces the wave effect through ConfigProvider. We plan that developers will not need to make additional changes in the future, and will gradually add more "happiness" through HappyProvider as the version iterates. Stay tuned.
