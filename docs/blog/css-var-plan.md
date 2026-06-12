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
  background-color: var(--color-primary);
}

:where(.css-hash2).ant-btn {
  background-color: var(--color-primary);
}

.css-hash1 {
  --color-primary: blue;
}

.css-hash2 {
  --color-primary: green;
}
```

The result is as expected, combining CSS variables with hashes. But in fact, we should adjust our thinking slightly and return the hash calculation to the original value of the token, or directly use CSS variables to calculate the hash:

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

### Dynamic Themes with CSS Variables

Consider the following scenario: users can freely modify the theme color and text font size on the webpage to suit their preferences. This scenario does not align with the research discussed earlier because our previous study was based on a complete set of known themes (such as a dark theme). When users can freely modify the value of a variable, we cannot pre-build the theme; instead, we must rely on runtime capabilities for modifications. This situation can be referred to as a true 'dynamic theme'.

As mentioned earlier, there are two obstacles to implementing dynamic themes based on CSS variables:

1. Changes in hash values will cause components and the DOM to re-render.
2. Users cannot know the hash value in advance.

There are two solutions for these two points, respectively.

#### Random Hash

For the first issue, the apparent problem to solve is the dynamic hash value caused by token changes. The existence of hash values serves two purposes: style isolation and caching. In the context of dynamic CSS themes, we can discard the caching feature since we have replaced all tokens with CSS variables. The styles themselves do not change; each token change only affects the inserted CSS variables. At this point, the performance impact of serializing CSS has been significantly reduced. Therefore, we can use random hashes to ensure style isolation.

![image](https://github.com/ant-design/ant-design/assets/27722486/c7128e5e-6330-4dd4-939f-312e11f88af3)

At this point, we can see that users can simply modify tokens in the ConfigProvider, just like before, to use dynamic themes without any noticeable changes in usage. An additional point is that we eliminate the performance cost of calculating hashes here. However, as a trade-off, we might generate two sets of CSS variables that are identical, yet their hashes are different. The impact of this depends on the user's specific usage patterns.

#### Custom Hash

The above solution can actually address most of the issues in various scenarios. However, let's revisit a problem mentioned from the beginning: the FOUC issue. In a statically compiled web page, all theme changes implemented through React lifecycle methods cannot be reflected in the user's browser immediately. We must provide users with the ability to modify the theme before the browser renders the page.

The implementation of this capability essentially involves allowing users to replace CSS variables in scripts. As mentioned earlier, one method is to directly replace the class or attribute on the HTML in the script to apply statically compiled CSS variables, which is not suitable for dynamic themes. Therefore, users need to directly modify the values of CSS variables in the script, introducing the problem of 'needing to know the hash value in advance.' If the hash value is completely random or calculated based on tokens, users cannot use this hash value outside the React lifecycle, or it is challenging to save this hash value for use in scripts outside the React lifecycle.

In other words, as long as the user knows the hash value, is that sufficient? Therefore, we allow users to customize the hash value, and users do not need to worry about the loss of style isolation due to custom reasons—because we can easily detect if users are using the same hash value in the application. In this way, users only need to override hashed CSS variables in the format of Ant Design (antd)—we can provide a factory function to help users generate CSS variable styles.

![image](https://github.com/ant-design/ant-design/assets/27722486/257c5811-bd67-48b3-8ea3-29a428d96bc8)

### Farewell Hash

After ceasing the active calculation of the hash, two questions arise:

1. Is it still a hash?
2. Do we still need to add hash to the styles?

The first question is somewhat philosophical. From a historical perspective, it is still a hash. However, since it is no longer necessary to compute it, it is simply a pure random value or a user-defined string.

The second question is crucial. Now that all tokens have been replaced, styles under different themes no longer have any differences, and the isolating role played by the hash is no longer significant. We still add the hash class to the DOM as the scope of the theme, which directly affects where the components derive their CSS variable values. However, the styles themselves do not care about these, so we can optimize further:

![image](https://github.com/ant-design/ant-design/assets/27722486/f49c5e57-f17e-4725-b850-43708e9a6235)

Styles can now exist independently! This means that different themes can share the same set of styles—there is no longer a need to generate these styles repeatedly.

However, we still need to consider micro-application scenarios. Although hash values are isolated between different versions of antd, styles lose their scope without a hash. Without hash, different versions of antd can contaminate each other. Therefore, we will still provide the ability to apply hash to the overall styles of the application—this is the application-level hash. Unlike the theme hash, the entire application can still reuse the same set of styles.
