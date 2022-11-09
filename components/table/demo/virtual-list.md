## zh-CN

通过 `react-window` 引入虚拟滚动方案，实现 100000 条数据的高性能表格。

## en-US

Integrate virtual scroll with `react-window` to achieve a high performance table of 100,000 data.

<style>
  .virtual-table .ant-table-container:before,
  .virtual-table .ant-table-container:after {
    display: none;
  }
  .virtual-table-cell {
    box-sizing: border-box;
    padding: 16px;
    border-bottom: 1px solid #e8e8e8;
    background: #FFF;
  }
 [data-theme="dark"]  .virtual-table-cell {
    box-sizing: border-box;
    padding: 16px;
    border-bottom: 1px solid #303030;
    background: #141414;
  }

</style>
