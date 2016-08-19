import * as React from 'react';
import RcCascader from 'rc-cascader';
import Input from '../input';
import Icon from '../icon';
import arrayTreeFilter from 'array-tree-filter';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';
import omit from 'object.omit';

export interface CascaderOptionType {
  value: string;
  label: string;
  disabled?: boolean;
  children?: Array<CascaderOptionType>;
}

export type CascaderExpandTrigger = 'click' | 'hover'
export interface CascaderProps {
  /** 可选项数据源 */
  options: Array<CascaderOptionType>;
  /** 默认的选中项 */
  defaultValue?: Array<CascaderOptionType>;
  /** 指定选中项 */
  value?: Array<CascaderOptionType>;
  /** 选择完成后的回调 */
  onChange?: (value: string, selectedOptions?: Array<CascaderOptionType>) => void;
  /** 选择后展示的渲染函数 */
  displayRender?: (label: Array<string>, selectedOptions?: Array<CascaderOptionType>) => React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 自定义浮层类名 */
  popupClassName?: string;
  /** 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` */
  popupPlacement?: string;
  /** 输入框占位文本*/
  placeholder?: string;
  /** 输入框大小，可选 `large` `default` `small` */
  size?: string;
  /** 禁用*/
  disabled?: boolean;
  /** 是否支持清除*/
  allowClear?: boolean;
  showSearch?: boolean;
  filterOption?: (inputValue: string, option: Object) => boolean;
  /** 次级菜单的展开方式，可选 'click' 和 'hover' */
  expandTrigger?: CascaderExpandTrigger;
  /** 当此项为 true 时，点选每级菜单选项值都会发生变化 */
  changeOnSelect?: boolean;
  /** 浮层可见变化时回调 */
  onPopupVisibleChange?: (popupVisible: boolean) => void;
}

const NOT_FOUND = [{ label: 'Not Found', value: 'ANT_CASCADER_NOT_FOUND', disabled: true }];

export default class Cascader extends React.Component<CascaderProps, any> {
  static defaultProps = {
    prefixCls: 'ant-cascader',
    placeholder: 'Please select',
    transitionName: 'slide-up',
    popupPlacement: 'bottomLeft',
    onChange() {},
    options: [],
    displayRender: label => label.join(' / '),
    disabled: false,
    allowClear: true,
    showSearch: false,
    filterOption(inputValue, option) {
      return option.label.indexOf(inputValue) > -1;
    },
    onPopupVisibleChange() {},
  };

  cachedOptions: CascaderOptionType[];

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defautValue || [],
      inputValue: '',
      inputFocused: false,
      popupVisible: false,
      flattenOptions: props.showSearch && this.flattenTree(props.options, props.changeOnSelect),
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value || [] });
    }
    if (nextProps.showSearch && this.props.options !== nextProps.options) {
      this.setState({ flattenOptions: this.flattenTree(nextProps.options, nextProps.changeOnSelect) });
    }
  }

  handleChange = (value, selectedOptions) => {
    const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
    this.setState({ inputValue: '' });
    this.setValue(unwrappedValue, selectedOptions);
  }

  handlePopupVisibleChange = (popupVisible) => {
    this.setState({ popupVisible });
    this.props.onPopupVisibleChange(popupVisible);
  }

  handleInputBlur = () => {
    this.setState({
      inputFocused: false,
    });
  }

  handleInputClick = (e) => {
    const inputFocused = this.state.inputFocused;
    // Prevent `Trigger` behaviour.
    if (inputFocused) {
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
    }
    if (!inputFocused) {
      this.setState({inputFocused: true});
    }
  }

  handleInputChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ inputValue });
  }

  setValue = (value, selectedOptions = []) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.props.onChange(value, selectedOptions);
  }

  getLabel() {
    const { options, displayRender } = this.props;
    const value = this.state.value;
    const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
    const selectedOptions = arrayTreeFilter(options, (o, level) => o.value === unwrappedValue[level]);
    const label = selectedOptions.map(o => o.label);
    return displayRender(label, selectedOptions);
  }

  clearSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setValue([]);
    this.setState({ popupVisible: false });
  }

  flattenTree(options, changeOnSelect, ancestor = []) {
    let flattenOptions = [];
    options.forEach((option) => {
      const path = ancestor.concat(option);
      if (changeOnSelect || !option.children) {
        flattenOptions.push(path);
      }
      if (option.children) {
        flattenOptions = flattenOptions.concat(this.flattenTree(option.children, changeOnSelect, path));
      }
    });
    return flattenOptions;
  }

  generateFilteredOptions() {
    const { filterOption } = this.props;
    const filtered = this.state.flattenOptions.filter((path) => {
      const lastItem = path[path.length - 1];
      return filterOption(this.state.inputValue, lastItem);
    });

    if (filtered.length > 0) {
      return filtered.map((path) => {
        return {
          label: path.map(o => o.label).join(' / '),
          value: path.map(o => o.value),
        };
      });
    }
    return NOT_FOUND;
  }

  render() {
    const props = this.props;
    const state = this.state;
    const [{ prefixCls, children, placeholder, size, disabled,
      className, style, allowClear, showSearch }, otherProps] = splitObject(props,
      ['prefixCls', 'children', 'placeholder', 'size', 'disabled', 'className', 'style', 'allowClear', 'showSearch']);
    const value = state.value;

    const sizeCls = classNames({
      'ant-input-lg': size === 'large',
      'ant-input-sm': size === 'small',
    });
    const clearIcon = (allowClear && !disabled && value.length > 0) ?
      <Icon type="cross-circle"
        className={`${prefixCls}-picker-clear`}
        onClick={this.clearSelection}
      /> : null;
    const arrowCls = classNames({
      [`${prefixCls}-picker-arrow`]: true,
      [`${prefixCls}-picker-arrow-expand`]: state.popupVisible,
    });
    const pickerCls = classNames({
      [className]: !!className,
      [`${prefixCls}-picker`]: true,
      [`${prefixCls}-picker-disabled`]: disabled,
    });

    // Fix bug of https://github.com/facebook/react/pull/5004
    // and https://fb.me/react-unknown-prop
    const inputProps = omit(otherProps, [
      'onChange',
      'options',
      'popupPlacement',
      'transitionName',
      'displayRender',
      'onPopupVisibleChange',
      'changeOnSelect',
      'expandTrigger',
      'popupVisible',
      'getPopupContainer',
      'loadData',
      'popupClassName',
      'filterOption',
    ]);

    let options = props.options;
    if (state.inputValue) {
      options = this.generateFilteredOptions();
    }
    // Dropdown menu should keep previous status until it is fully closed.
    if (!state.popupVisible) {
      options = this.cachedOptions;
    } else {
      this.cachedOptions = options;
    }

    return (
      <RcCascader {...props}
        options={options}
        value={value}
        popupVisible={state.popupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        onChange={this.handleChange}
      >
        {children ||
          <span
            style={style}
            className={pickerCls}
          >
            <Input {...inputProps}
              placeholder={value && value.length > 0 ? null : placeholder}
              className={`${prefixCls}-input ${sizeCls}`}
              value={state.inputValue}
              disabled={disabled}
              readOnly={!showSearch}
              onClick={showSearch ? this.handleInputClick : null}
              onBlur={showSearch ? this.handleInputBlur : null}
              onChange={showSearch ? this.handleInputChange : null}
            />
            <span className={`${prefixCls}-picker-label`}>{this.getLabel()}</span>
            {clearIcon}
            <Icon type="down" className={arrowCls} />
          </span>
        }
      </RcCascader>
    );
  }
}
