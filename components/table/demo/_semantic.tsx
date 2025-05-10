import React from 'react';
import { Table, TableColumnsType, TableProps } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    section: '容器元素',
    header: '头部元素',
    title: '标题元素',
    footer: '底部元素',
    body: '主体元素',
    content: '内容元素',
    item: '列表元素',
    'pagination.root': '分页根元素',
    'pagination.item': '分页元素',
  },
  en: {
    root: 'Root element',
    section: 'Container element',
    header: 'Header element',
    title: 'Title element',
    footer: 'Footer element',
    body: 'Body element',
    content: 'Content element',
    item: 'List element',
    'pagination.root': 'Pagination root element',
    'pagination.item': 'Pagination element',
  },
};

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'thinkasany',
    age: 24,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];

const Block: React.FC<TableProps<DataType>> = (props) => {
  return (
    <Table<DataType>
      columns={columns}
      dataSource={data}
      size="middle"
      pagination={{ pageSize: 3 }}
      title={() => <>table title</>}
      footer={() => <>table footer</>}
      {...props}
    />
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      componentName="Button"
      semantics={[
        { name: 'root', desc: locale.root },
        { name: 'header', desc: locale.header },
        { name: 'title', desc: locale.title },
        { name: 'section', desc: locale.section },
        { name: 'body', desc: locale.body },
        { name: 'content', desc: locale.content },
        { name: 'item', desc: locale.item },
        { name: 'footer', desc: locale.footer },
        { name: 'pagination.root', desc: locale['pagination.root'] },
        { name: 'pagination.item', desc: locale['pagination.item'] },
      ]}
    >
      <Block />
    </SemanticPreview>
  );
};

export default App;
