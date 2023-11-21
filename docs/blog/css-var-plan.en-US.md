---
title: Ant Design meets CSS Variables
date: 2023-11-21
author: MadCcc
---

## Pain of Ant Design 5.0

Ant Design allows customization of theme tokens through ConfigProvider, supporting nested themes. Nested theme tokens inherit modifications made in the parent theme. From this perspective, antd's theme capabilities have reached their peak in the 5.0 version.

However, the purpose of this article is not to praise antd 5.0 again; that has already been done when it was released. Since the release of version 5.0, almost a year has passed, during which the community has raised various questions and demands. These issues and directions for improvement are the pain points faced by antd.

### CSS Output Size

One significant impact is on users in SSR (Server-Side Rendering) scenarios.

While antd switched to cssinjs, it implemented the ability to selectively import CSS without relying on babel-plugin-import for automatic tree-shaking. However, compared to component libraries like MUI or Mantine, which started using cssinjs from the beginning, antd's adoption of cssinjs can be considered a partial departure. One key difference is that **antd's cssinjs does not follow changes in component props**.

In libraries like MUI or Mantine 6.x, the generated CSS for components with different props configurations is actually different. These styles are placed within a hash class. For example, named classNames in MUI, such as `xxx-focused`, are essentially empty shells, allowing users to customize them easily. The benefit is a significant reduction in the size of the style file. If a page only uses the outlined variant of a Button, there won't be any styles for the filled variant in the final output.

![image](https://github.com/ant-design/ant-design/assets/27722486/e3a1fbe4-2cba-487b-9e3d-06233dda40b4)

In antd 5.0, whenever a component is used, antd automatically includes all styles related to that component—whether they are used or not. This approach has two reasons:

1. Antd did not change the organization of styles from version 4.x to 5.x; it still combines classes to achieve different style effects.
2. To reduce the frequency of dynamically generating styles, antd has implemented a caching strategy at the component level. The same component will only insert styles once, reducing the performance cost of cssinjs during CSS serialization.

It is evident that the advantages of traditional cssinjs and antd are also each other's disadvantages. Antd's css output size becomes significantly large, which is particularly noticeable in SSR scenarios where inline style tags are required.

### Theme Switching

When switching between light and dark themes in cssinjs component libraries, two common issues arise:

1. There is a delay when switching themes.
2. When a static site is switched to a dark theme and then refreshed, it always reverts from the light theme to the dark theme.

Antd has encountered these two issues, and they stem from the nature of runtime-generated styles using cssinjs. The delay is due to the need for a new round of CSS serialization when switching themes. The inability to seamlessly refresh from a static site to a dark theme is because static sites cannot retain the styles of the switched theme.

These issues are non-existent in theme systems based on CSS variables. Examples of such pages include [react.dev](https://react.dev). The principle is simple:

1. Modifying CSS variables does not require re-serialization of CSS, eliminating this performance cost.
2. CSS variables can be injected before page rendering using a script under the body, blocking rendering and avoiding unnecessary style rendering.

## How to Break Through?

Looking at the case of Mantine 7.0, it seems that a theme system/style engine based on CSS variables has a better user experience. However, for cssinjs, there are reasons not to abandon its flexible theme capabilities. In other words, there is a desire to have both the small size and fast switching features of CSS variables, while retaining cssinjs's theme nesting and ability to have multiple themes coexist.

Naturally, the question arises: can we combine cssinjs with CSS variables? After all, they don't seem to be completely mutually exclusive.

## Ant Design and CSS Variables

Antd has collaborated with CSS variables before, as seen in the 4.x era, where there was a set of CSS files based on CSS variables. In version 4.x, antd's theme was mainly implemented using less variables, assigning less variables as CSS variable names, and then assigning values to these CSS variables elsewhere. This was the capability of antd's 4.x CSS variable theme.

The theme capability of antd 5.0 is actually an evolution from 4.x, still using a set of theme tokens for customization. The current theme system's processing flow involves calculating a unique hash variable based on the values of theme tokens to ensure isolation between themes:

![image](https://github.com/ant-design/ant-design/assets/27722486/29ccf0be-3b8e-4ab2-a01d-24dff391ea98)

> The :where selector does not increase the overall specificity, making it suitable for theme isolation.

### Mapping CSS Variables

Naturally, we thought of mapping all tokens to CSS variables. In this [RFC](https://github.com/ant-design/ant-design/discussions/44654), all tokens are mapped to CSS variables, and CSS variables are used to fill the values of the tokens with. As a result, the hash calculation for theme isolation becomes fixed because the values of each token, now represented as CSS variables, will not change. Now, we have a stable HTML, and switching themes only requires replacing the corresponding CSS variables without going through the lengthy cssinjs serialization process.

![image](https://github.com/ant-design/ant-design/assets/27722486/ef9eeb23-b231-45f9-b27d-9ea9b21dc098)

In this approach, the insertion of CSS variables is excluded from the lifecycle of the entire theme. Antd only cares about the replacement between tokens and CSS variables. As long as antd applies CSS variables to various parts of component styles, we can build themes based on CSS variables on top of this.

As shown in the figure, the control of CSS variables for the entire theme is placed under the `:root` selector. This implies that we can modify these CSS variables at any time, either at compile time or in the browser environment. However, placing CSS variables under :root also means that this will be a theme affecting the entire document, and we cannot make adjustments to a specific part of the theme.

Now the question becomes: Can we make CSS variables work locally?

### CSS Variables Isolation

The answer is yes. Recall the hash introduced in 5.0. It plays a crucial role in solving this problem.

By constraining CSS variables within a hash class selector, we can make these CSS variables only effective for components under that theme. At the same time, we can use the provided theme context to dynamically generate CSS variables based on the current theme. We directly convert the values of current theme tokens into CSS variables, combining them with the current hash value to obtain a complete set of styles.

![image](https://github.com/ant-design/ant-design/assets/27722486/7f01d46c-63be-4a81-b576-bfbbfb9a2988)

It appears perfect, utilizing the existing theme features to achieve the isolation of CSS variables between themes. However, up to this point, there is a significant flaw in this approach, as mentioned earlier: to ensure the stability of HTML, when calculating the hash, we actually use the mapped token values to CSS variables, similar to var(--color-primary); and these values do not change because we do not intentionally modify the mapping between CSS variables and tokens. This results in a **fixed hash value**.

Consider the scenario of nesting:

```tsx
<ConfigProvider theme={{ token: { colorPrimary: 'blue' } }}>
  <Button>Button 1</Button>
  <ConfigProvider theme={{ token: { colorPrimary: 'green' } }}>
    <Button>Button 2</Button>
  </ConfigProvider>
</ConfigProvider>
```

In the current theme system of Ant Design 5.0, the hash values corresponding to these two buttons are different. As a result, their styles do not affect each other, illustrating the role of hash in theme isolation.

However, in the CSS variable solution, the modification of these two tokens does not actually affect the calculation of the hash. Consequently, theme isolation breaks down, and both `colorPrimary` values end up under the same hash, leading to mutual overlap. To maintain theme isolation, we require different hash values for Button 1 and Button 2, creating a clear contradiction and a new issue.

Let's reconsider the original intention of adopting CSS variables: to achieve faster theme switching and reduce the performance overhead of theme changes. It can be observed that the emphasis is on **switching**.

For nested or parallel themes, their focus is not on "switching" but on "isolation." Therefore, they require distinct and stable hash values, and in most scenarios, their HTML remains stable.

For theme switching, the emphasis is on "switching". What we expect is to achieve fast and high-performance theme switching using CSS variables under a fixed hash (i.e., stable HTML). This does not conflict with theme isolation. Therefore, we still need different hashes to achieve CSS variable isolation. On top of this, different themes corresponding to various hash values can be generated based on user preferences for CSS variable styles.

It might sound a bit abstract, so let's use code to explain the desired outcome. Taking the example of nested themes mentioned earlier, here's what we want the generated CSS file to include:

```css
:where(.css-hash1).ant-btn {
  background: var(--color-primary);
}

:where(.css-hash2).ant-btn {
  background: var(--color-primary);
}

.css-hash1 {
  --color-primary: blue;
}

.css-hash2 {
  --color-primary: green;
}
```

这样的产物是符合预期的，它将 CSS 变量与 hash 结合到了一起。但实际上这样我们应该稍微调整一下我们的思路，将 hash 计算回归到 token 原本的值上，或者直接利用 CSS 变量来计算 hash：

![image](https://github.com/ant-design/ant-design/assets/27722486/e4c2a109-34d6-4fe7-a3e4-03ed532775b8)

<a name="HAyMz"></a>

### CSS Variables Switching

So far, we have integrated theme isolation with CSS variables using hash, meeting our ambitious goals. However, there is still an issue with hash. It is dynamically calculated, and users cannot know the hash value in advance, making it impossible to directly manipulate CSS variables using JavaScript.

But there is always a solution. Besides directly using JavaScript to modify CSS variables, we can also utilize CSS selectors to switch CSS variables in different scenarios. This requires us to generate CSS variables for different themes in advance:

```css
/* Using custom classes as selectors */
.light .css-hash {
  --color-text: rgba(0, 0, 0, 0.85);
}

.dark .css-hash {
  --color-text: rgba(255, 255, 255, 0.88);
}
```

At this point, we only need to switch the class on the outermost DOM element wrapping the component to easily achieve theme switching. This outer DOM element can be `html`, `body`, or a specific element in the application. It depends on users.

The problems always seem to be interconnected. We mentioned that the hash is normally calculated based on tokens, but when it comes to dynamic switching, we want the hash to remain constant. So, for the two sets of themes mentioned earlier, their hashes should be consistent, even though their corresponding CSS variables are different. Therefore, we need to make some adjustments to the hash calculation method.

![image](https://github.com/ant-design/ant-design/assets/27722486/43639237-e286-4a06-85c2-f2e93d82087a)

In fact, it can be observed that after applying CSS variables, what we have been doing is turning the 'dynamic' into 'static', making every effort to avoid dynamically modifying tokens using JavaScript. This is crucial as it would trigger JavaScript computation, thereby slowing down webpage performance. Conversely, we leverage the static compilation capability of CSS variables to gradually narrow down the scope of things that would change at runtime. Ultimately, it becomes a matter of efficiently switching themes by modifying only a class name or a DOM attribute.

Finally, don't forget that tokens can be passed through the context. In the case of nested themes, the current tokens inherit values from the context to override them. As described earlier, we need to provide multiple tokens in the theme, each with a different theme name. If multiple themes are used in nested themes at different levels, the computational complexity is actually multiplied. For example:

![image](https://github.com/ant-design/ant-design/assets/27722486/c5493235-68af-495c-b5cd-7e1730c38898)

This can become a potential burden.

### CSS 变量动态主题

考虑这样的场景：用户可以在网页中任意修改主题色以及文字字号，以符合自己的喜好。这个场景与上文所研究的就并不适配了，原因是我们之前的研究建立在有一整套已知的主题（如暗色主题）上，但用户可以随意修改某个变量值的时候我们就不能够提前对主题进行构建，只能够依赖运行时的能力进行修改。这种场景可以称为是真正的“动态主题”。

如同上文所说，实现基于 CSS 变量的动态主题有两个阻碍：

1. hash 值变化会导致组件和 dom 重新渲染；
2. 用户无法提前得知 hash 值

而针对这两点分别有两种解决方案。

#### 随机 hash

对于前者，我们需要解决的问题明显是 token 变化带来的动态 hash 值。hash 值存在的原因有两个，样式隔离和缓存。样式隔离需要的是每个主题对应不一样的 hash，缓存需要的是每个主题对应唯一的 hash。在 CSS 动态主题的场景下，我们可以抛弃缓存这一特性，因为我们已经将所有的 token 替换为了 CSS 变量，样式本身并不会改变，每次改变 token 只会改变插入的 CSS 变量，这时**序列化 CSS 带来的性能消耗已经被大幅减小了**。因此我们完全可以采用随机 hash 来保证样式隔离。

![image](https://github.com/ant-design/ant-design/assets/27722486/c7128e5e-6330-4dd4-939f-312e11f88af3)

这时我们可以发现用户想要使用动态主题时只要像之前一样在 ConfigProvider 里修改 token 就可以了，不会产生任何使用上的变化。而额外的一点就是，这里我们省去了计算 hash 带来的性能损耗，但相对的我们可能会生产出一模一样的两套 CSS 变量而他们的 hash 并不一致。这一点具体会带来正面还是负面的影响还得具体看用户的使用方法。

#### 自定义 hash

上述的方案其实已经可以解决大部分场景下的问题，但我们回过头看还有一个从一开始就提到的问题：FOUC 问题。在一个已经静态编译的网页上，所有利用 react 生命周期实现的主题变化都不能在第一时间反应到用户的浏览器上。我们必须提供给用户能够在浏览器渲染页面前，就能够修改主题的能力。

这种能力的实现方式其实就是能够让用户在脚本中替换 CSS 变量。我们在上面提到了一种方法是在脚本中直接替换 html 上的 class 或者属性来套用已经静态编译完成的 CSS 变量，这对于动态主题并不适用。所以用户就需要在脚本中直接修改 CSS 变量的值，所以就引入了“需要提前得知 hash 值”这个问题，因为如果 hash 值完全随机或者根据 token 计算，用户就无法在 react 生命周期之外使用这个 hash 值；或者说很难把这个 hash 值存下来，供在 react 生命周期之外的 script 使用。

那么换句话讲，只要用户知道 hash 值是不是就可以了呢？

所以我们允许用户 diy hash 值，用户也不需要担心因为自定义的原因导致样式隔离失效——我们很容易就可以检测出用户在应用中使用了相同的 hash 值。如此一来用户只需要按照 antd 的格式来覆盖 hashed CSS 变量就可以了——我们可以提供一个工厂函数来帮助用户生产 CSS 变量样式。

![image](https://github.com/ant-design/ant-design/assets/27722486/257c5811-bd67-48b3-8ea3-29a428d96bc8)

### 再见了 hash

不再主动计算 hash 后，我们心中冒出了两个问题：

1. hash 它还是 hash 吗？
2. 我们还需要在样式上添加 hash 吗？

第一个问题其实有点哲学，从发展历程来讲，它就是 hash。但是他已经不再需要计算了，所以就是一个纯粹的随机值或者用户自定义的字符串。

第二个问题很重要。在所有 token 都被替换的现在，不同主题下的样式已经不会再有任何区别了，hash 起到的隔离作用也不再重要。我们仍然会在 dom 上添加 hash class 作为主题的 scope，它会直接影响组件所采用的 CSS 变量源于何处。但是样式并不关心这些，所以我们再进行一次优化：

![image](https://github.com/ant-design/ant-design/assets/27722486/f49c5e57-f17e-4725-b850-43708e9a6235)

样式居然可以单独存在了！这意味着不同的主题可以共用同一份样式——我们不再需要重复生成这些样式了。

当然还需要考虑微应用场景，不同版本的 antd 之间虽然 hash 是隔离的，但是样式失去了 hash 之后也就失去了作用域，不同版本的 antd 会相互污染，所以我们仍会提供对应用整体的样式打上 hash 的能力——这就是应用级别的 hash，与主题 hash 不同，整个应用仍然可以复用同一份样式。
