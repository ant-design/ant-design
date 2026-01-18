# @rc-component/form 修复补丁

## Issue

Form.List 在 preserve={false} 时，通过 setFieldsValue 赋值无效。

相关 Issue: https://github.com/ant-design/ant-design/issues/52931

## 修复内容

### 文件 1: node_modules/@rc-component/form/es/hooks/useForm.js

**位置**: 第 544 行

**修改前**:

```js
if (!this.isMergedPreserve(preserve) && (!isListField || subNamePath.length > 1)) {
```

**修改后**:

```js
if (!this.isMergedPreserve(preserve) && !isListField) {
```

### 文件 2: node_modules/@rc-component/form/lib/hooks/useForm.js

**位置**: 第 553 行

应用相同的修改。

## 修复原理

通过添加 `&& !isListField` 条件，确保 **Form.List 的子字段**（`isListField: true`）在 `preserve={false}` 时也不会被清理。

## 应用方法

每次 `npm install` 后，需要手动应用以上修改。

## 自动化脚本

可以在 `package.json` 中添加一个 postinstall 脚本来自动应用补丁：

```json
"scripts": {
  "postinstall": "node scripts/patch-rc-component-form.js"
}
```

然后创建 `scripts/patch-rc-component-form.js` 文件来自动应用补丁。
