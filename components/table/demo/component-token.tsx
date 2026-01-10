import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { ConfigProviderProps, GetProp, RadioChangeEvent, TableProps } from 'antd';
import { ConfigProvider, Form, Radio, Space, Switch, Table } from 'antd';

type SizeType = ConfigProviderProps['componentSize'];
type ColumnsType<T extends object> = GetProp<TableProps<T>, 'columns'>;
type TablePagination = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
type TablePaginationPlacement = NonNullable<TablePagination['placement']>[number];
type ExpandableConfig<T extends object> = GetProp<TableProps<T>, 'expandable'>;
type TableRowSelection<T extends object> = GetProp<TableProps<T>, 'rowSelection'>;

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value as string) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a>Delete</a>
        <a>
          <Space>
            More actions
            <DownOutlined />
          </Space>
        </a>
      </Space>
    ),
  },
];

// Comentando para dar um commit
const dataSource = Array.from({ length: 10 }).map<DataType>((_, i) => ({
  key: i,
  name: 'John Brown',
  age: Number(`${i}2`),
  address: `New York No. ${i} Lake Park`,
  description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
}));

const defaultExpandable: ExpandableConfig<DataType> = {
  expandedRowRender: (record: DataType) => <p>{record.description}</p>,
};

const defaultTitle = () => 'Here is title';
const defaultFooter = () => 'Here is footer';

const App: React.FC = () => {
  type TableStyleState = {
    bordered: boolean;
    loading: boolean;
  };

  const [styleState, setStyleState] = useState<TableStyleState>({
    bordered: false,
    loading: false,
  });

  const handleBorderChange = (enable: boolean) => {
    setStyleState(prev => ({ ...prev, bordered: enable }));
  };

  const handleLoadingChange = (enable: boolean) => {
    setStyleState(prev => ({ ...prev, loading: enable }));
  };
  const [size, setSize] = useState<SizeType>('large');
  const [expandable, setExpandable] = useState<ExpandableConfig<DataType> | undefined>(
    defaultExpandable,
  );
  type TableSectionVisibility = {
    showTitle: boolean;
    showHeader: boolean;
    showFooter: boolean;
  };

  const [sectionVisibility, setSectionVisibility] = useState<TableSectionVisibility>({
    showTitle: false,
    showHeader: true,
    showFooter: true,
  });

  const handleTitleChange = (enable: boolean) => {
    setSectionVisibility(prev => ({ ...prev, showTitle: enable }));
  };

  const handleHeaderChange = (enable: boolean) => {
    setSectionVisibility(prev => ({ ...prev, showHeader: enable }));
  };

  const handleFooterChange = (enable: boolean) => {
    setSectionVisibility(prev => ({ ...prev, showFooter: enable }));
  };
  const [rowSelection, setRowSelection] = useState<TableRowSelection<DataType> | undefined>({});

  type TableDataState = {
    hasData: boolean;
  };

  const [dataState, setDataState] = useState<TableDataState>({
    hasData: true,
  });

  const handleDataChange = (newHasData: boolean) => {
    setDataState(prev => ({ ...prev, hasData: newHasData }));
  };
  const [tableLayout, setTableLayout] = useState<string>('unset');
  const [top, setTop] = useState<TablePaginationPlacement>('none');
  const [bottom, setBottom] = useState<TablePaginationPlacement>('bottomEnd');
  type TableDisplayOptions = {
    yScroll: boolean;
    ellipsis: boolean;
  };

  const [displayOptions, setDisplayOptions] = useState<TableDisplayOptions>({
    yScroll: false,
    ellipsis: false,
  });

  const handleYScrollChange = (enable: boolean) => {
    setDisplayOptions(prev => ({ ...prev, yScroll: enable }));
  };

  const handleEllipsisChange = (enable: boolean) => {
    setDisplayOptions(prev => ({ ...prev, ellipsis: enable }));
  };
  const [xScroll, setXScroll] = useState<string>('unset');

  const handleBorderChange = (enable: boolean) => {
    setBordered(enable);
  };

  const handleLoadingChange = (enable: boolean) => {
    setLoading(enable);
  };

  const handleSizeChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

  const handleTableLayoutChange = (e: RadioChangeEvent) => {
    setTableLayout(e.target.value);
  };

  const handleExpandChange = (enable: boolean) => {
    setExpandable(enable ? defaultExpandable : undefined);
  };

  const handleEllipsisChange = (enable: boolean) => {
    setEllipsis(enable);
  };

  const handleTitleChange = (enable: boolean) => {
    setShowTitle(enable);
  };

  const handleHeaderChange = (enable: boolean) => {
    setShowHeader(enable);
  };

  const handleFooterChange = (enable: boolean) => {
    setShowFooter(enable);
  };

  const handleRowSelectionChange = (enable: boolean) => {
    setRowSelection(enable ? {} : undefined);
  };

  const handleYScrollChange = (enable: boolean) => {
    setYScroll(enable);
  };

  const handleXScrollChange = (e: RadioChangeEvent) => {
    setXScroll(e.target.value);
  };

  const handleDataChange = (newHasData: boolean) => {
    setHasData(newHasData);
  };

  const scroll: { x?: number | string; y?: number | string } = {};
  if (yScroll) {
    scroll.y = 240;
  }
  if (xScroll !== 'unset') {
    scroll.x = '100vw';
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));
  if (xScroll === 'fixed') {
    tableColumns[0].fixed = true;
    tableColumns[tableColumns.length - 1].fixed = 'right';
  }

  const tableProps: TableProps<DataType> = {
    bordered,
    loading,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showFooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    tableLayout: tableLayout === 'unset' ? undefined : (tableLayout as TableProps['tableLayout']),
  };

  return (
    <>
      <Form layout="inline" className="table-demo-control-bar" style={{ marginBottom: 16 }}>
        <Form.Item label="Bordered">
          <Switch checked={bordered} onChange={handleBorderChange} />
        </Form.Item>
        <Form.Item label="loading">
          <Switch checked={loading} onChange={handleLoadingChange} />
        </Form.Item>
        <Form.Item label="Title">
          <Switch checked={showTitle} onChange={handleTitleChange} />
        </Form.Item>
        <Form.Item label="Column Header">
          <Switch checked={showHeader} onChange={handleHeaderChange} />
        </Form.Item>
        <Form.Item label="Footer">
          <Switch checked={showFooter} onChange={handleFooterChange} />
        </Form.Item>
        <Form.Item label="Expandable">
          <Switch checked={!!expandable} onChange={handleExpandChange} />
        </Form.Item>
        <Form.Item label="Checkbox">
          <Switch checked={!!rowSelection} onChange={handleRowSelectionChange} />
        </Form.Item>
        <Form.Item label="Fixed Header">
          <Switch checked={!!yScroll} onChange={handleYScrollChange} />
        </Form.Item>
        <Form.Item label="Has Data">
          <Switch checked={!!hasData} onChange={handleDataChange} />
        </Form.Item>
        <Form.Item label="Ellipsis">
          <Switch checked={!!ellipsis} onChange={handleEllipsisChange} />
        </Form.Item>
        <Form.Item label="Size">
          <Radio.Group value={size} onChange={handleSizeChange}>
            <Radio.Button value="large">Large</Radio.Button>
            <Radio.Button value="middle">Middle</Radio.Button>
            <Radio.Button value="small">Small</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Table Scroll">
          <Radio.Group value={xScroll} onChange={handleXScrollChange}>
            <Radio.Button value="unset">Unset</Radio.Button>
            <Radio.Button value="scroll">Scroll</Radio.Button>
            <Radio.Button value="fixed">Fixed Columns</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Table Layout">
          <Radio.Group value={tableLayout} onChange={handleTableLayoutChange}>
            <Radio.Button value="unset">Unset</Radio.Button>
            <Radio.Button value="fixed">Fixed</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Pagination Top">
          <Radio.Group value={top} onChange={(e) => setTop(e.target.value)}>
            <Radio.Button value="topStart">TopStart</Radio.Button>
            <Radio.Button value="topCenter">TopCenter</Radio.Button>
            <Radio.Button value="topEnd">TopEnd</Radio.Button>
            <Radio.Button value="none">None</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Pagination Bottom">
          <Radio.Group value={bottom} onChange={(e) => setBottom(e.target.value)}>
            <Radio.Button value="bottomStart">BottomStart</Radio.Button>
            <Radio.Button value="bottomCenter">BottomCenter</Radio.Button>
            <Radio.Button value="bottomEnd">BottomEnd</Radio.Button>
            <Radio.Button value="none">None</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              colorBgContainer: '#e6f4ff',
              headerBg: '#1677ff',
              headerColor: '#fff',
              headerSortActiveBg: '#0958d9',
              headerSortHoverBg: '#69b1ff',
              bodySortBg: '#1677ff10',
              rowHoverBg: '#1677ff10',
              rowSelectedBg: '#bae0ff',
              rowSelectedHoverBg: '#91caff',
              rowExpandedBg: '#1677ff10',
              cellPaddingBlock: 20,
              cellPaddingInline: 20,
              cellPaddingBlockMD: 16,
              cellPaddingInlineMD: 16,
              cellPaddingBlockSM: 12,
              cellPaddingInlineSM: 12,
              borderColor: '#e6f4ff',
              headerBorderRadius: 0,
              footerBg: '#1677ff',
              footerColor: '#fff',
              cellFontSize: 16,
              cellFontSizeMD: 16,
              cellFontSizeSM: 14,
              headerSplitColor: '#fff',
              headerFilterHoverBg: 'rgba(0, 0, 0, 0.12)',
              filterDropdownMenuBg: '#fff',
              filterDropdownBg: '#fff',
              expandIconBg: '#e6f4ff',
            },
          },
        }}
      >
        <Table<DataType>
          {...tableProps}
          pagination={{ placement: [top, bottom] }}
          columns={tableColumns}
          dataSource={hasData ? dataSource : []}
          scroll={scroll}
        />
      </ConfigProvider>
    </>
  );
};

export default App;