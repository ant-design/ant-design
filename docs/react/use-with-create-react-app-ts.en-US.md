---
order: 4
title: Use in create-react-app-ts
---

[create-react-app](https://github.com/facebookincubator/create-react-app) is one of best React application development tool, we are going to use `antd` within it and modify the webpack config for some customized needs.

---

## Install and Initialization

We need to install `create-react-app` first, you may need install [yarn](https://github.com/yarnpkg/yarn/) too.

Additionally, install [react-scripts-ts](https://github.com/wmonk/create-react-app-typescript)

```bash
$ npm install -g create-react-app yarn react-scripts-ts
```

Create a new project named `antd-demo-ts`.

```bash
$ create-react-app antd-demo-ts --scripts-version=react-scripts-ts
```

The tool will create and initialize environment and dependencies automatically,
please try config your proxy setting or use other npm registry if any network errors happen during it.

Then we go inside `antd-demo-ts` and start it.

```bash
$ cd antd-demo-ts
$ yarn start
```

Open browser at http://localhost:3000/, it renders a header saying "Welcome to React" on the page.

## Import antd

Default directory structure below. 

```
├──.gitignore
│──package.json
│──README.md
│──tsconfig.json
│──tslint.json
│──yarn.lock
├── public
│──├── favicon.ico
│──└── index.html
├──src
│──└──App.css
│──└──  App.test.tsx
│──└──  App.tsx
│──└──  index.css
│──└──  index.tsx
│──└──  logo.svg
```

Now we install `antd` from yarn or npm.

```bash
$ yarn add antd --save
```

Modify `src/App.tsx`, import Button component from `antd`.

```jsx
import * as React from 'react';
import './App.css';
import { Button } from 'antd';

class App extends React.Component<null, null> {
  render() {
    return (
      <div className="App">
        <p>
          <Button type="primary">Hello World</Button>
        </p>
      </div>
    );
  }
}

export default App;
```

Add `antd/dist/antd.css` at the top of `src/App.css`.

```css
@import '~antd/dist/antd.css';

.App {
  text-align: center;
}

...
```

Ok, you now see a blue primary button displaying in page now, next you can choose any components of `antd` to develop your application. Visit other workflow of `create-react-app` at its [User Guide ](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Advanced Guides

We are successful in building and displaying antd components, but in the real world, there a few outstanding problems concerning this project.
For instance, we actually import all components in the project which will be a serious network perfermance issue.

> You will see a warning in your browser console.
> ![](https://zos.alipayobjects.com/rmsportal/vgcHJRVZFmPjAawwVoXK.png)

So it is necessary to customize the default webpack config. We can achieve that by using `eject` script command.

```bash
$ yarn run eject
```

### Import on demand

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) is a babel plugin for importing components on demand ([principle](/docs/react/getting-started#Import-on-Demand)). After ejecting all config files to antd-demo, we are allowed to modify `config/webpack.config.dev.js`.

Note that the following setup will effectively compile your TypeScript with ES6 module resolution and then ship it over to Babel-Loader to be transpiled.

```bash
$ yarn add babel-core babel-loader babel-plugin-import babel-plugin-import babel-preset-react babel-preset-es2015 --save-dev
```

Update the webpack loader configuration for TypeScript files.  `config/webpack.config.dev.js`

```diff
{
  test: /\.(ts|tsx)$/,
  include: paths.appSrc,
+  loader: 'babel!ts'
-  loader: 'ts',
},
```

It is recommended that you create a `.babelrc` at your project root.

```diff
+{
+    "presets": ["react", "es2015"],
+    "plugins": [["import", {"libraryName": "antd", "style": "css" }]]
+}
```

Update the `tsconfig.json` file.  Windows users may find a flag change necessary for `forceConsistentCasingInFileNames`.
```diff
{
  "compilerOptions": {
    "outDir": "build/dist",
+   "module": "es6",
-   "module": "commonjs",    
+   "target": "es6",
-   "target": "es5",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": false,
+   "jsx": "preserve",
-   "jsx": "react",    
    "moduleResolution": "node",
    "rootDir": "src",
+   "forceConsistentCasingInFileNames": false,
-   "forceConsistentCasingInFileNames": true,

+   "allowSyntheticDefaultImports": true,

  ...

```

Remove the `@import '~antd/dist/antd.css';` statement added before because `babel-plugin-import` will import styles.

Then reboot `yarn start` and visit demo page, you should find that the above warning message would be gone which prove the `import on demand` config is effective now.

### Customize Theme

According to [Customize Theme documentation](/docs/react/customize-theme), we need `less` variables modify ability of [less-loader](https://github.com/webpack/less-loader), so we add it.

```bash
$ yarn add less less-loader --save-dev
```

```diff
loaders: [
  {
    exclude: [
      /\.html$/,
      /\.(js|jsx)$/,
+     /\.less$/,
      /\.css$/,
      /\.json$/,
      /\.svg$/
    ],
    loader: 'url',
  },

...

  // Process JS with Babel.
  {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: 'babel',
    query: {
      plugins: [
-       ['import', [{ libraryName: "antd", style: 'css' }]],
+       ['import', [{ libraryName: "antd", style: true }]],  // import less
      ],
   },

...

+ // Parse less files and modify variables
+ {
+   test: /\.less$/,
+   loader: 'style!css!postcss!less?{modifyVars:{"@primary-color":"#1DA57A"}}'
+ },
]
```

We use `modifyVars` option of [less-loader](https://github.com/webpack/less-loader#less-options) here, you can see a green button rendered on the page after reboot start server.

> Note, we only modified `webpack.config.dev.js` now, if you wish this config working on production environment, you need to update `webpack.config.prod.js` as well.

## Source code and other boilerplates

Finally, we use antd with create-react-app successfully, you can learn these practice for your own webpack workflow too, and find more webpack config in the [atool-build](https://github.com/ant-tool/atool-build/blob/master/src/getWebpackCommonConfig.js). (For instance, add [moment noParse](https://github.com/ant-tool/atool-build/blob/e4bd2959689b6a95cb5c1c854a5db8c98676bdb3/src/getWebpackCommonConfig.js#L90) to avoid loading all language files)

There are a lot of great boilerplates like create-react-app in React community. There are some source code samples of importing antd in them if you encounter some problems.

- [create-react-app-antd](https://github.com/ant-design/create-react-app-antd)
- [react-boilerplate/react-boilerplate](https://github.com/ant-design/react-boilerplate)
- [kriasoft/react-starter-kit](https://github.com/ant-design/react-starter-kit)
- [wmonk/create-react-app-typescript](https://github.com/wmonk/create-react-app-typescript)