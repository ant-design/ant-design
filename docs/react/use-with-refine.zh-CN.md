---
group:
  title: 如何使用
order: 7
title: 使用 Refine
tag: New
---

[Refine](https://github.com/refinedev/refine) 是一个为 CRUD 密集型 web 应用设计的 React 元框架。它的核心钩子和组件通过提供认证、访问控制、路由、网络、状态管理和国际化解决方案来简化开发。

它通过一个集成包支持 Ant Design，其中包含即用型组件和钩子，将 Refine 与 Ant Design 连接起来。

本文将指导您使用 Refine 和 Ant Design 引导一个功能齐全的 CRUD 应用示例。

## 安装和初始化

Refine 通过一个简单的路由接口与 Vite、Next.js、Remix、React Native 和 Electron 等平台轻松集成，无需额外设置。

在本指南中，我们将使用 Vite 和 `create refine-app` CLI 的 `refine-antd` 预设，通过预定义选项快速创建一个带有 Ant Design 的新 Refine 项目。

在开始之前，您可能需要安装 [yarn](https://github.com/yarnpkg/yarn/) 或 [pnpm](https://pnpm.io/)。

<InstallDependencies npm='$ npm create refine-app@latest -- --preset refine-antd' yarn='$ yarn create refine-app@latest -- --preset refine-antd' pnpm='$ pnpm create refine-app@latest -- --preset refine-antd'></InstallDependencies>

使用 `refine-antd` 预设消除了对额外依赖的需求，并添加了使用 Ant Design 构建的示例页面以快速开始。

初始化完成后，我们进入项目并启动。

```bash
$ cd antd-demo
$ npm run dev
```

初始化完成后，所有 Ant Design 配置都会自动完成，允许您在 Refine 应用中开始使用 Ant Design 组件。

在浏览器中打开 http://localhost:5173/ ，您将看到带有 Ant Design 组件的示例 CRUD 应用。

![Refine Ant Design 示例](https://refine.ams3.cdn.digitaloceanspaces.com/example-readmes/antd-list-example.png)

## 查看代码

让我们看看 CLI 命令生成的示例组件中 Ant Design 的使用。

```tsx
import { Create, useForm } from '@refinedev/antd';
import { Form, Input } from 'antd';

export const CategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label={'Title'} name={['title']} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
```

虽然 Refine 的集成提供了一组组件和钩子，但它不是 Ant Design 包的替代品，您可以像在常规 React 应用中一样使用 Ant Design 的所有功能。

Refine 的集成仅提供组件和钩子，以便更轻松地在结合 Refine 的功能和特性时使用 Ant Design 组件。

## 如何向现有 Refine 项目添加 Ant Design

您可以按照 [Refine Ant Design 官方指南](https://refine.dev/docs/ui-integrations/ant-design/introduction/) 将 Ant Design 添加到现有的 Refine 项目中。

要使用 Next.js 和 Remix 等各种集成选项引导 Refine 应用，请使用 `npm create refine-app@latest` 并从 CLI 中选择 Ant Design 作为 UI 框架。

有关使用 Ant Design 的更详细教程和指南，请访问 [Refine 文档](https://refine.dev/tutorial/ui-libraries/intro/ant-design/react-router/)。
