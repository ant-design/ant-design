import React from 'react';
import { Table, TableColumnsType, TableProps } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    root: '根元素',
    section: '容器元素',
    'header.wrapper': '头部容器元素',
    'header.row': '头部行元素',
    'header.cell': '头部单元格元素',
    title: '标题元素',
    'body.wrapper': '主体容器元素',
    'body.row': '主体行元素',
    'body.cell': '主体单元格元素',
    footer: '底部元素',
    content: '内容元素',
    'pagination.root': '分页根元素',
    'pagination.item': '分页元素',
  },
  en: {
    root: 'Root element',
    section: 'Container element',
    'header.wrapper': 'Header wrapper element',
    'header.row': 'Header row element',
    'header.cell': 'Header cell element',
    title: 'Title element',
    'body.wrapper': 'Body wrapper element',
    'body.row': 'Body row element',
    'body.cell': 'Body cell element',
    footer: 'Footer element',
    content: 'Content element',
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
    <>
      <SemanticPreview
        componentName="Table"
        semantics={[
          { name: 'root', desc: locale.root },
          { name: 'title', desc: locale.title },
          { name: 'header.wrapper', desc: locale['header.wrapper'] },
          { name: 'header.row', desc: locale['header.row'] },
          { name: 'header.cell', desc: locale['header.cell'] },
          { name: 'section', desc: locale.section },
          { name: 'body.wrapper', desc: locale['body.wrapper'] },
          { name: 'body.row', desc: locale['body.row'] },
          { name: 'body.cell', desc: locale['body.cell'] },
          { name: 'footer', desc: locale.footer },
          { name: 'pagination.root', desc: locale['pagination.root'] },
          { name: 'pagination.item', desc: locale['pagination.item'] },
        ]}
      >
        <Block />
      </SemanticPreview>
    </>
  );
};

export default App;
