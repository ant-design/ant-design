import * as React from 'react';
import List from './list';
import Operation from './operation';
import Search from './search';
import classNames from 'classnames';

function noop() {
}

export interface TransferItem {
  key: number | string;
  title: string;
  description?: string;
  chosen: boolean;
}

// Transfer
export interface TransferProps {
  /** 数据源 */
  dataSource: Array<TransferItem>;
  /** 每行数据渲染函数 */
  render?: (record: TransferItem) => any;
  /** 显示在右侧框数据的key集合 */
  targetKeys: Array<string>;
  /** 变化时回调函数 */
  onChange?: (targetKeys: Array<TransferItem>, direction: string, moveKeys: any) => void;
  /** 两个穿梭框的自定义样式 */
  listStyle?: React.CSSProperties;
  /** 自定义类*/
  className?: string;
  /** 标题集合,顺序从左至右 */
  titles?: Array<string>;
  /** 操作文案集合,顺序从上至下 */
  operations?: Array<string>;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 搜索框的默认值 */
  searchPlaceholder?: string;
  /** 当列表为空时显示的内容 */
  notFoundContent?: React.ReactNode | string;
  /** 底部渲染函数 */
  footer?: (props: any) => any;
  style?: React.CSSProperties;
}

export default class Transfer extends React.Component<TransferProps, any> {
  static List = List;
  static Operation = Operation;
  static Search = Search;

  static defaultProps = {
    prefixCls: 'ant-transfer',
    dataSource: [],
    render: noop,
    targetKeys: [],
    onChange: noop,
    titles: ['源列表', '目的列表'],
    operations: [],
    showSearch: false,
    body: noop,
    footer: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      leftFilter: '',
      rightFilter: '',
      leftCheckedKeys: [],
      rightCheckedKeys: [],
    };
  }
  componentWillReceiveProps(nextProps) {
    const { leftCheckedKeys, rightCheckedKeys } = this.state;
    if (nextProps.targetKeys !== this.props.targetKeys ||
        nextProps.dataSource !== this.props.dataSource) {
      // clear cached splited dataSource
      this.splitedDataSource = null;

      const { dataSource, targetKeys } = nextProps;
      // clear key nolonger existed
      // clear checkedKeys according to targetKeys
      this.setState({
        leftCheckedKeys: leftCheckedKeys
          .filter(data => dataSource.filter(item => item.key === data).length)
          .filter(data => targetKeys.filter(key => key === data).length === 0),
        rightCheckedKeys: rightCheckedKeys
          .filter(data => dataSource.filter(item => item.key === data).length)
          .filter(data => targetKeys.filter(key => key === data).length > 0),
      });
    }
  }
  splitDataSource(props) {
    if (this.splitedDataSource) {
      return this.splitedDataSource;
    }
    const { targetKeys } = props;
    let { dataSource } = props;

    if (props.rowKey) {
      dataSource = dataSource.map(record => {
        record.key = props.rowKey(record);
        return record;
      });
    }
    let leftDataSource = [...dataSource];
    let rightDataSource = [];

    if (targetKeys.length > 0) {
      targetKeys.forEach((targetKey) => {
        rightDataSource.push(leftDataSource.filter((data, index) => {
          if (data.key === targetKey) {
            leftDataSource.splice(index, 1);
            return true;
          }
          return false;
        })[0]);
      });
    }

    this.splitedDataSource = {
      leftDataSource,
      rightDataSource,
    };

    return this.splitedDataSource;
  }

  moveTo = (direction) => {
    const { targetKeys } = this.props;
    const { leftCheckedKeys, rightCheckedKeys } = this.state;
    const moveKeys = direction === 'right' ? leftCheckedKeys : rightCheckedKeys;
    // move items to target box
    const newTargetKeys = direction === 'right'
      ? moveKeys.concat(targetKeys)
      : targetKeys.filter(targetKey => !moveKeys.some(checkedKey => targetKey === checkedKey));

    // empty checked keys
    this.setState({
      [direction === 'right' ? 'leftCheckedKeys' : 'rightCheckedKeys']: [],
    });

    this.props.onChange(newTargetKeys, direction, moveKeys);
  }

  moveToLeft = () => this.moveTo('left')
  moveToRight = () => this.moveTo('right')

  getGlobalCheckStatus(direction) {
    const { leftDataSource, rightDataSource } = this.splitDataSource(this.props);
    const { leftCheckedKeys, rightCheckedKeys } = this.state;

    const dataSource = direction === 'left' ? leftDataSource : rightDataSource;
    const checkedKeys = direction === 'left' ? leftCheckedKeys : rightCheckedKeys;

    let globalCheckStatus;

    if (checkedKeys.length > 0) {
      if (checkedKeys.length < dataSource.length) {
        globalCheckStatus = 'part';
      } else {
        globalCheckStatus = 'all';
      }
    } else {
      globalCheckStatus = 'none';
    }
    return globalCheckStatus;
  }

  handleSelectAll = (direction) => {
    const { leftDataSource, rightDataSource } = this.splitDataSource(this.props);
    const dataSource = direction === 'left' ? leftDataSource : rightDataSource;
    const checkStatus = this.getGlobalCheckStatus(direction);
    const holder = (checkStatus === 'all') ? [] : dataSource.map(item => item.key);

    this.setState({
      [`${direction}CheckedKeys`]: holder,
    });
  }

  handleLeftSelectAll = () => this.handleSelectAll('left')
  handleRightSelectAll = () => this.handleSelectAll('right')

  handleFilter = (direction, e) => {
    this.setState({
      // add filter
      [`${direction}Filter`]: e.target.value,
    });
  }

  handleLeftFilter = (e) => this.handleFilter('left', e)
  handleRightFilter = (e) => this.handleFilter('right', e)

  handleClear = (direction) => {
    this.setState({
      [`${direction}Filter`]: '',
    });
  }

  handleLeftClear = () => this.handleClear('left')
  handleRightClear = () => this.handleClear('right')

  handleSelect = (direction, selectedItem, checked) => {
    const { leftCheckedKeys, rightCheckedKeys } = this.state;
    const holder = direction === 'left' ? [...leftCheckedKeys] : [...rightCheckedKeys];
    let index;
    holder.forEach((key, i) => {
      if (key === selectedItem.key) {
        index = i;
      }
    });
    if (index > -1) {
      holder.splice(index, 1);
    }
    if (checked) {
      holder.push(selectedItem.key);
    }
    this.setState({
      [`${direction}CheckedKeys`]: holder,
    });
  }

  handleLeftSelect = (selectedItem, checked) => this.handleSelect('left', selectedItem, checked);
  handleRightSelect = (selectedItem, checked) => this.handleSelect('right', selectedItem, checked);

  render() {
    const {
      prefixCls, titles, operations, showSearch, notFoundContent,
      searchPlaceholder, body, footer, listStyle, className,
      render,
    } = this.props;
    const { leftFilter, rightFilter, leftCheckedKeys, rightCheckedKeys } = this.state;

    const { leftDataSource, rightDataSource } = this.splitDataSource(this.props);
    const leftActive = rightCheckedKeys.length > 0;
    const rightActive = leftCheckedKeys.length > 0;

    const leftCheckStatus = this.getGlobalCheckStatus('left');
    const rightCheckStatus = this.getGlobalCheckStatus('right');

    const cls = classNames({
      [className]: !!className,
      [prefixCls]: true,
    });

    return (
      <div className={cls}>
        <List titleText={titles[0]}
          dataSource={leftDataSource}
          filter={leftFilter}
          style={listStyle}
          checkedKeys={leftCheckedKeys}
          checkStatus={leftCheckStatus}
          handleFilter={this.handleLeftFilter}
          handleClear={this.handleLeftClear}
          handleSelect={this.handleLeftSelect}
          handleSelectAll={this.handleLeftSelectAll}
          render={render}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          notFoundContent={notFoundContent}
          body={body}
          footer={footer}
          prefixCls={`${prefixCls}-list`}
        />
        <Operation rightActive={rightActive}
          rightArrowText={operations[0]}
          moveToRight={this.moveToRight}
          leftActive={leftActive}
          leftArrowText={operations[1]}
          moveToLeft={this.moveToLeft}
          className={`${prefixCls}-operation`}
        />
        <List titleText={titles[1]}
          dataSource={rightDataSource}
          filter={rightFilter}
          style={listStyle}
          checkedKeys={rightCheckedKeys}
          checkStatus={rightCheckStatus}
          handleFilter={this.handleRightFilter}
          handleClear={this.handleRightClear}
          handleSelect={this.handleRightSelect}
          handleSelectAll={this.handleRightSelectAll}
          render={render}
          showSearch={showSearch}
          searchPlaceholder={searchPlaceholder}
          notFoundContent={notFoundContent}
          body={body}
          footer={footer}
          prefixCls={`${prefixCls}-list`}
        />
      </div>
    );
  }
}
