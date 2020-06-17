---
order: 2
title: Getting Started
---

Ant Design React is dedicated to providing a **good development experience** for programmers. Make sure that you have installed [Node.js](https://nodejs.org/)(> 8.0.0) correctly.

If you try in local environment, Please refer to [Install and Initialization](/docs/react/use-with-create-react-app#Install-and-Initialization) section of "Use in create-react-app".

> Before delving into Ant Design React, a good knowledge base of [React](https://reactjs.org) and [JavaScript ES2015](http://babeljs.io/docs/learn-es2015/) is needed.

---

## First Example

Here is a simple codesandbox example to show the usage of Ant Design React.

<iframe
  src="https://codesandbox.io/embed/antd-reproduction-template-6e93z?autoresize=1&fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="antd reproduction template"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
/>

### 1. Create one codesandbox

Visit http://u.ant.design/codesandbox-repro to create a codesandbox. Don't forget to press the save button.

### 2. Using antd component

Replace the content of `index.js` with the following code. As you can see, there is no difference between antd's components and typical React components.

If you already set up by [Install and Initialization](/docs/react/use-with-create-react-app#Install-and-Initialization) section of "Use in create-react-app", Please replace the content of /src/index.js

```jsx
import React, { useState } from 'react';
import { render } from 'react-dom';
import { DatePicker, message } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

const App = () => {
  const [date, setDate] = useState(null);
  const handleChange = value => {
    message.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
    setDate(value);
  };
  return (
    <div style={{ width: 400, margin: '100px auto' }}>
      <DatePicker onChange={handleChange} />
      <div style={{ marginTop: 16 }}>
        Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
```

### 3. Explore more components

You can look up components in the side menu of the Components page like the [Alert](/components/alert) component. Plenty of examples are provided in the component pages and API documentation.

Click the "Open in Editor" icon in the first example to open an editor with source code to use out-of-the-box. Now you can import the `Alert` component into the codesandbox:

```diff
- import { DatePicker, message } from 'antd';
+ import { DatePicker, message, Alert } from 'antd';
```

Add the following jsx into the `render` function.

```diff
  <DatePicker onChange={value => this.handleChange(value)} />
  <div style={{ marginTop: 20 }}>
-   Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
+   <Alert message="Selected Date" description={date ? date.format('YYYY-MM-DD') : 'None'} />
  </div>
```

Now you can see the result in the preview section.

<img width="420" src="https://gw.alipayobjects.com/zos/antfincdn/JrXptUm1Nz/6b50edc4-3a3c-4b2a-843e-f9f0af2c4667.png" alt="codesandbox screenshot" />

OK! Now you know how to use antd components in a clear way. You are welcome to explore more components in the codesandbox. We also strongly recommend using codesandbox to provide a reproducible demo when reporting a bug.

### 4. Next Step

In the real world you will need a development workflow consisting of `compile/build/deploy/lint/debug`. You can find and read articles on the subject or try other scaffolds provided below:

- [Ant Design Pro](http://pro.ant.design/)
- [antd-admin](https://github.com/zuiidea/antd-admin)
- [d2-admin](https://github.com/d2-projects/d2-admin)
- more scaffolds at [Scaffold Market](http://scaffold.ant.design/)

## Import on Demand

`antd` supports tree shaking of ES modules, so using `import { Button } from 'antd';` would drop js code you didn't use.

If you see logs like in the screenshot below, you might still be using `webpack@1.x` or have a wrong webpack config which can't support tree shaking.

```
You are using a whole package of antd, please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size. Please upgrade webpack or check the config.
```

> ![console warning](https://zos.alipayobjects.com/rmsportal/GHIRszVcmjccgZRakJDQ.png)

## Replace momentjs to Day.js

You can use [antd-dayjs-webpack-plugin](https://github.com/ant-design/antd-dayjs-webpack-plugin) plugin to replace momentjs to Day.js to reduce bundle size dramatically. You need to update your webpack config file like this:

```js
// webpack-config.js
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin';

module.exports = {
  // ...
  plugins: [new AntdDayjsWebpackPlugin()],
};
```

## Customized Work Flow

If you want to customize your work flow, we recommend using [webpack](http://webpack.github.io/) to build and debug code. You can try out plents of [boilerplates](https://github.com/enaqx/awesome-react#react-tools) available in the React ecosystem.

There are some [scaffolds](http://scaffold.ant.design/) which have already integrated antd, so you can try and start with one of these and even contribute.
