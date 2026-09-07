---
group:
  title: Basic Usage
  order: 0
order: 0
title: Getting Started
---

Ant Design React is dedicated to providing a **good development experience** for programmers. Before starting, it is recommended to learn [React](https://react.dev) first, and correctly install and configure [Node.js](https://nodejs.org/) v16 or above.

The official guide also assumes that you have intermediate knowledge about HTML, CSS, and JavaScript, and React. If you are just starting to learn front-end or React, it may not be the best idea to use the UI framework as your first step.

Finally, if you are working in a local development environment, please refer to [Scaffolding Guide](/docs/react/use-with-vite) to create a new project.

---

## Your First Example {#first-example}

Here is a simple online CodeSandbox demo of an Ant Design component to show the usage of Ant Design React.

<!-- prettier-ignore -->
<code src="./_demo/first-example.tsx">First Example</code>

Follow the steps below to play around with Ant Design yourself:

### 1. Create a CodeSandbox {#create-codesandbox}

Visit https://u.ant.design/reproduce to create a CodeSandbox -- don't forget to press the save button as well to create a new instance.

### 2. Use and modify an antd component {#use-antd-component}

If you are working in a local React project, install `antd` first. The CodeSandbox created above already includes this dependency.

<InstallDependencies npm='$ npm install antd --save' yarn='$ yarn add antd' pnpm='$ pnpm install antd --save' bun='$ bun add antd'></InstallDependencies>

Then replace the contents of your application's entry file (for example, `src/main.jsx`) with the following code. As you can see, there is no difference between antd's components and typical React components.

```jsx
import React, { useState } from 'react';
import { DatePicker, message } from 'antd';
import { createRoot } from 'react-dom/client';

import './index.css';

const App = () => {
  const [date, setDate] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const handleChange = (value) => {
    messageApi.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
    setDate(value);
  };
  return (
    <div style={{ width: 400, margin: '100px auto' }}>
      <DatePicker onChange={handleChange} />
      <div style={{ marginTop: 16 }}>
        Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
      </div>
      {contextHolder}
    </div>
  );
};

createRoot(document.getElementById('root')).render(<App />);
```

### 3. Explore more components {#explore-components}

You can view the list of components in the side menu of the Components page, such as the [Alert](/components/alert) component. Plenty of examples are also provided in the component pages and API documentation as well.

Click the "Show Code" icon in the first example to expand the source code. Then import the `Alert` component into the previous CodeSandbox:

```diff
- import { DatePicker, message } from 'antd';
+ import { DatePicker, message, Alert } from 'antd';
```

Now add the following JSX inside the `App` component.

```diff
  <DatePicker onChange={handleChange} />
  <div style={{ marginTop: 16 }}>
-   Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
+   <Alert title="Selected Date" description={date ? date.format('YYYY-MM-DD') : 'None'} />
  </div>
```

Select a date, and you can see the effect in the preview area on the right:

<img width="420" src="https://gw.alipayobjects.com/zos/antfincdn/JrXptUm1Nz/6b50edc4-3a3c-4b2a-843e-f9f0af2c4667.png" alt="CodeSandbox screenshot" />

OK! Now that you know the basics of using antd components, you are welcome to explore more components in the CodeSandbox. When reporting a bug with Ant Design, we also strongly recommend using CodeSandbox to provide a reproducible demo as well.

### 4. Next Steps {#next-steps}

During actual real-world project development, you will most likely need a development workflow consisting of `compile/build/deploy/lint/debug/` deployment. You can read the following documents on the subject or use the following scaffolds and examples provided below:

- [Ant Design Pro](https://pro.ant.design/)
- [create-next-app](https://github.com/ant-design/ant-design-examples/tree/main/examples/with-nextjs-inline-style)
- More scaffolds at [Scaffold Market](https://scaffold.ant.design/)

## Import on Demand {#import-on-demand}

`antd` supports tree shaking of ES modules, so using `import { Button } from 'antd';` would drop js code you didn't use.

## Customize your Workflow {#customize-workflow}

If you want to customize your workflow, we recommend using [webpack](https://webpack.js.org) or [Vite](https://vite.dev/) to build and debug code. You can try out plenty of [boilerplates](https://github.com/enaqx/awesome-react#react-tools) available in the React ecosystem.

There are also some [scaffolds](https://scaffold.ant.design/) which have already been integrated into antd, so you can try and start with one of these and even contribute.
