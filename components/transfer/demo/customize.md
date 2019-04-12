---
order: 5
title:
  zh-CN: 自定义列表
  en-US: Customize List
---

## zh-CN

最基本的用法，展示了 `dataSource`、`targetKeys`、每行的渲染函数 `render` 以及回调函数 `onChange` `onSelectChange` `onScroll` 的用法。

## en-US

The most basic usage of `Transfer` involves providing the source data and target keys arrays, plus the rendering and some callback functions.

````jsx
import { Transfer, Switch, Table, Tag } from 'antd';
import difference from 'lodash/difference';

const mockTags = [
  'cat', 'dog', 'bird',
];

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    disabled: i % 3 < 1,
    tag: mockTags[i % 3],
  });
}

const oriTargetKeys = mockData
  .filter(item => +item.key % 3 > 1)
  .map(item => item.key);

const leftColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
  {
    dataIndex: 'tag',
    title: 'Tag',
    render: tag => <Tag>{tag}</Tag>,
  },
  {
    dataIndex: 'description',
    title: 'Description',
  },
];
const rightColumns = [
  {
    dataIndex: 'title',
    title: 'Name',
  },
];

class App extends React.Component {
  state = {
    targetKeys: oriTargetKeys,
    selectedKeys: [],
    disabled: false,
    showSearch: false,
  }

  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys });

    console.log('targetKeys: ', nextTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({ selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys] });

    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  }

  handleDisable = (disabled) => {
    this.setState({ disabled });
  };

  handleShowSearch = (showSearch) => {
    this.setState({ showSearch });
  };

  render() {
    const { targetKeys, selectedKeys, disabled, showSearch } = this.state;
    return (
      <div>
        <Transfer
          dataSource={mockData}
          titles={['Source', 'Target']}
          targetKeys={targetKeys}
          selectedKeys={selectedKeys}
          onChange={this.handleChange}
          onSelectChange={this.handleSelectChange}
          render={item => item.title}
          disabled={disabled}
          showSearch={showSearch}
          showSelectAll={false}
          filterOption={(inputValue, item) => (
            item.title.indexOf(inputValue) !== -1 ||
            item.tag.indexOf(inputValue) !== -1
          )}
        >
          {(listProps) => {
            const { direction, filteredItems, onItemSelectAll, onItemSelect, selectedKeys: listSelectedKeys, disabled: listDisabled } = listProps;
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection = {
              getCheckboxProps: (item) => ({ disabled: listDisabled || item.disabled }),
              onSelectAll(selected, selectedRows) {
                const treeSelectedKeys = selectedRows.filter(item => !item.disabled).map(({ key }) => key);
                const diffKeys = selected ?
                  difference(treeSelectedKeys, listSelectedKeys) : difference(listSelectedKeys, treeSelectedKeys);
                onItemSelectAll(diffKeys, selected);
              },
              onSelect({ key }, selected) {
                onItemSelect(key, selected);
              },
              selectedRowKeys: listSelectedKeys,
            };

            return (
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={filteredItems}
                size="small"
              />
            );
          }}
        </Transfer>
        <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={this.handleDisable}
          style={{ marginTop: 16 }}
        />
        <Switch
          unCheckedChildren="showSearch"
          checkedChildren="showSearch"
          checked={showSearch}
          onChange={this.handleShowSearch}
          style={{ marginTop: 16 }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
````
