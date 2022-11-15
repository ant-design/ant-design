## zh-CN

三列栅格式的表单排列方式，常用于数据表格的高级搜索。

有部分定制的样式代码，由于输入标签长度不确定，需要根据具体情况自行调整。

> 🛎️ 想要 3 分钟实现？ 试试 ProForm 的[查询表单](https://procomponents.ant.design/components/form#%E6%9F%A5%E8%AF%A2%E7%AD%9B%E9%80%89)！

## en-US

Three columns layout is often used for advanced searching of data table.

Because the width of label is not fixed, you may need to adjust it by customizing its style.

```css
[data-theme='compact'] .ant-advanced-search-form,
.ant-advanced-search-form {
  padding: 24px !important;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 2px;
}

[data-theme='compact'] .ant-advanced-search-form .ant-form-item,
.ant-advanced-search-form .ant-form-item {
  display: flex;
}

[data-theme='compact'] .ant-advanced-search-form .ant-form-item-control-wrapper,
.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}
```

<style>
#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 2px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}
[data-theme="dark"] .ant-advanced-search-form  {
  background: rgba(255,255,255,0.04);
  border: 1px solid #434343;
  padding: 24px;
  border-radius: 2px;
}
[data-theme="dark"] #components-form-demo-advanced-search .search-result-list {
  border: 1px dashed #434343;
  background: rgba(255,255,255,0.04);
}
</style>
