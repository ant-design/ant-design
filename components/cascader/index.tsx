import * as React from 'react';
import RcCascader from 'rc-cascader';
import Input from '../input';
import Icon from '../icon';
import arrayTreeFilter from 'array-tree-filter';
import classNames from 'classnames';
import splitObject from '../_util/splitObject';
import omit from 'object.omit';

export interface CascaderOptionType {
  value:string,
  label:string,
  disabled?:boolean,
  children?:Array<CascaderOptionType>
}

type CascaderExpandTrigger = 'click' | 'hover'
interface CascaderProps {
  /** 可选项数据源*/
  options:Array<CascaderOptionType>,
  /** 默认的选中项*/
  defaultValue?:Array<CascaderOptionType>,
  /** 指定选中项*/
  value?:Array<CascaderOptionType>,
  /** 选择完成后的回调*/
  onChange?:(value:string, selectedOptions?:Array<CascaderOptionType>) => void,
  /** 选择后展示的渲染函数*/
  displayRender?:(label:Array<string>, selectedOptions?:Array<CascaderOptionType>) => React.ReactNode,
  /** 自定义样式*/
  style?:React.CSSProperties,
  /** 自定义类名*/
  className?:string,
  /** 自定义浮层类名*/
  popupClassName?:string,
  /** 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` */
  popupPlacement?:string,
  /** 输入框占位文本*/
  placeholder?:string,
  /** 输入框大小，可选 `large` `default` `small` */
  size?:string,
  /** 禁用*/
  disabled?:boolean,
  /** 是否支持清除*/
  allowClear?:boolean,
  /** 次级菜单的展开方式，可选 'click' 和 'hover' */
  expandTrigger?:CascaderExpandTrigger,
  /** 当此项为 true 时，点选每级菜单选项值都会发生变化 */
  changeOnSelect?:boolean,
  /** 浮层可见变化时回调 */
  onPopupVisibleChange?: (popupVisible: boolean) => void
  
}

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
    onPopupVisibleChange() {},
  }

  constructor(props) {
    super(props);
    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    }
    this.state = {
      value: value || [],
      popupVisible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({ value: nextProps.value || [] });
    }
  }

  handleChange = (value, selectedOptions) => {
    this.setValue(value, selectedOptions);
  }

  handlePopupVisibleChange = (popupVisible) => {
    this.setState({ popupVisible });
    this.props.onPopupVisibleChange(popupVisible);
  }

  setValue = (value, selectedOptions = []) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    this.props.onChange(value, selectedOptions);
  }

  getLabel() {
    const { options, displayRender } = this.props;
    const selectedOptions = arrayTreeFilter(options, (o, level) => o.value === this.state.value[level]);
    const label = selectedOptions.map(o => o.label);
    return displayRender(label, selectedOptions);
  }

  clearSelection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setValue([]);
    this.setState({ popupVisible: false });
  }

  render() {
    const props = this.props;
    const [{prefixCls, children, placeholder, size, disabled,
      className, style, allowClear}, otherProps] = splitObject(props,
      ['prefixCls', 'children','placeholder', 'size','disabled', 'className','style','allowClear']);

    const sizeCls = classNames({
      'ant-input-lg': size === 'large',
      'ant-input-sm': size === 'small',
    });
    const clearIcon = (allowClear && !disabled && this.state.value.length > 0) ?
      <Icon type="cross-circle"
        className={`${prefixCls}-picker-clear`}
        onClick={this.clearSelection}
      /> : null;
    const arrowCls = classNames({
      [`${prefixCls}-picker-arrow`]: true,
      [`${prefixCls}-picker-arrow-expand`]: this.state.popupVisible,
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
    ]);

    return (
      <RcCascader {...props}
        value={this.state.value}
        popupVisible={this.state.popupVisible}
        onPopupVisibleChange={this.handlePopupVisibleChange}
        onChange={this.handleChange}
      >
        {children ||
          <span
            style={style}
            className={pickerCls}
          >
            <Input {...inputProps}
              placeholder={this.state.value && this.state.value.length > 0 ? null : placeholder}
              className={`${prefixCls}-input ant-input ${sizeCls}`}
              value={null}
              disabled={disabled}
              readOnly
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
