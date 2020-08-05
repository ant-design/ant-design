import * as React from 'react';
import RcCascader from 'rc-cascader';
import arrayTreeFilter from 'array-tree-filter';
import classNames from 'classnames';
import omit from 'omit.js';
import KeyCode from 'rc-util/lib/KeyCode';
import CloseCircleFilled from '@ant-design/icons/CloseCircleFilled';
import DownOutlined from '@ant-design/icons/DownOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import RedoOutlined from '@ant-design/icons/RedoOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';

import Input from '../input';
import { ConfigConsumer, ConfigConsumerProps, RenderEmptyHandler } from '../config-provider';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import devWarning from '../_util/devWarning';
import SizeContext, { SizeType } from '../config-provider/SizeContext';
import { replaceElement } from '../_util/reactNode';

export interface CascaderOptionType {
  value?: string | number;
  label?: React.ReactNode;
  disabled?: boolean;
  isLeaf?: boolean;
  loading?: boolean;
  children?: Array<CascaderOptionType>;
  [key: string]: any;
}

export interface FieldNamesType {
  value?: string | number;
  label?: string;
  children?: string;
}

export interface FilledFieldNamesType {
  value: string | number;
  label: string;
  children: string;
}

export type CascaderExpandTrigger = 'click' | 'hover';

export type CascaderValueType = (string | number)[];

export interface ShowSearchType {
  filter?: (inputValue: string, path: CascaderOptionType[], names: FilledFieldNamesType) => boolean;
  render?: (
    inputValue: string,
    path: CascaderOptionType[],
    prefixCls: string | undefined,
    names: FilledFieldNamesType,
  ) => React.ReactNode;
  sort?: (
    a: CascaderOptionType[],
    b: CascaderOptionType[],
    inputValue: string,
    names: FilledFieldNamesType,
  ) => number;
  matchInputWidth?: boolean;
  limit?: number | false;
}

export interface CascaderProps {
  /** 可选项数据源 */
  options: CascaderOptionType[];
  /** 默认的选中项 */
  defaultValue?: CascaderValueType;
  /** 指定选中项 */
  value?: CascaderValueType;
  /** 选择完成后的回调 */
  onChange?: (value: CascaderValueType, selectedOptions?: CascaderOptionType[]) => void;
  /** 选择后展示的渲染函数 */
  displayRender?: (label: string[], selectedOptions?: CascaderOptionType[]) => React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 自定义浮层类名 */
  popupClassName?: string;
  /** 浮层预设位置：`bottomLeft` `bottomRight` `topLeft` `topRight` */
  popupPlacement?: string;
  /** 输入框占位文本 */
  placeholder?: string;
  /** 输入框大小，可选 `large` `default` `small` */
  size?: SizeType;
  /** whether has border style */
  bordered?: boolean;
  /** 禁用 */
  disabled?: boolean;
  /** 是否支持清除 */
  allowClear?: boolean;
  /** 自动获取焦点 */
  autoFocus?: boolean;
  showSearch?: boolean | ShowSearchType;
  notFoundContent?: React.ReactNode;
  loadData?: (selectedOptions?: CascaderOptionType[]) => void;
  /** 次级菜单的展开方式，可选 'click' 和 'hover' */
  expandTrigger?: CascaderExpandTrigger;
  expandIcon?: React.ReactNode;
  /** 当此项为 true 时，点选每级菜单选项值都会发生变化 */
  changeOnSelect?: boolean;
  /** 浮层可见变化时回调 */
  onPopupVisibleChange?: (popupVisible: boolean) => void;
  prefixCls?: string;
  inputPrefixCls?: string;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  popupVisible?: boolean;
  /** use this after antd@3.7.0 */
  fieldNames?: FieldNamesType;
  suffixIcon?: React.ReactNode;
  dropdownRender?: (menus: React.ReactNode) => React.ReactNode
}

export interface CascaderState {
  inputFocused: boolean;
  inputValue: string;
  value: CascaderValueType;
  popupVisible: boolean | undefined;
  flattenOptions: CascaderOptionType[][] | undefined;
  prevProps: CascaderProps;
}

interface CascaderLocale {
  placeholder?: string;
}

// We limit the filtered item count by default
const defaultLimit = 50;

function highlightKeyword(str: string, keyword: string, prefixCls: string | undefined) {
  return str.split(keyword).map((node: string, index: number) =>
    index === 0
      ? node
      : [
          <span className={`${prefixCls}-menu-item-keyword`} key="seperator">
            {keyword}
          </span>,
          node,
        ],
  );
}

function defaultFilterOption(
  inputValue: string,
  path: CascaderOptionType[],
  names: FilledFieldNamesType,
) {
  return path.some(option => (option[names.label] as string).indexOf(inputValue) > -1);
}

function defaultRenderFilteredOption(
  inputValue: string,
  path: CascaderOptionType[],
  prefixCls: string | undefined,
  names: FilledFieldNamesType,
) {
  return path.map((option, index) => {
    const label = option[names.label];
    const node =
      (label as string).indexOf(inputValue) > -1
        ? highlightKeyword(label as string, inputValue, prefixCls)
        : label;
    return index === 0 ? node : [' / ', node];
  });
}

function defaultSortFilteredOption(
  a: CascaderOptionType[],
  b: CascaderOptionType[],
  inputValue: string,
  names: FilledFieldNamesType,
) {
  function callback(elem: CascaderOptionType) {
    return (elem[names.label] as string).indexOf(inputValue) > -1;
  }

  return a.findIndex(callback) - b.findIndex(callback);
}

function getFieldNames({ fieldNames }: CascaderProps) {
  return fieldNames;
}

function getFilledFieldNames(props: CascaderProps) {
  const fieldNames = getFieldNames(props) || {};
  const names: FilledFieldNamesType = {
    children: fieldNames.children || 'children',
    label: fieldNames.label || 'label',
    value: fieldNames.value || 'value',
  };
  return names;
}

function flattenTree(
  options: CascaderOptionType[],
  props: CascaderProps,
  ancestor: CascaderOptionType[] = [],
) {
  const names: FilledFieldNamesType = getFilledFieldNames(props);
  let flattenOptions: CascaderOptionType[][] = [];
  const childrenName = names.children;
  options.forEach(option => {
    const path = ancestor.concat(option);
    if (props.changeOnSelect || !option[childrenName] || !option[childrenName].length) {
      flattenOptions.push(path);
    }
    if (option[childrenName]) {
      flattenOptions = flattenOptions.concat(flattenTree(option[childrenName], props, path));
    }
  });
  return flattenOptions;
}

const defaultDisplayRender = (label: string[]) => label.join(' / ');

function warningValueNotExist(list: CascaderOptionType[], fieldNames: FieldNamesType = {}) {
  (list || []).forEach(item => {
    const valueFieldName = fieldNames.value || 'value';
    devWarning(valueFieldName in item, 'Cascader', 'Not found `value` in `options`.');
    warningValueNotExist(item[fieldNames.children || 'children'], fieldNames);
  });
}

class Cascader extends React.Component<CascaderProps, CascaderState> {
  static defaultProps = {
    transitionName: 'slide-up',
    options: [],
    disabled: false,
    allowClear: true,
    bordered: true,
  };

  static getDerivedStateFromProps(nextProps: CascaderProps, { prevProps }: CascaderState) {
    const newState: Partial<CascaderState> = {
      prevProps: nextProps,
    };

    if ('value' in nextProps) {
      newState.value = nextProps.value || [];
    }
    if ('popupVisible' in nextProps) {
      newState.popupVisible = nextProps.popupVisible;
    }
    if (nextProps.showSearch && prevProps.options !== nextProps.options) {
      newState.flattenOptions = flattenTree(nextProps.options, nextProps);
    }

    if (process.env.NODE_ENV !== 'production' && nextProps.options) {
      warningValueNotExist(nextProps.options, getFieldNames(nextProps));
    }

    return newState;
  }

  cachedOptions: CascaderOptionType[] = [];

  private input: Input;

  constructor(props: CascaderProps) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue || [],
      inputValue: '',
      inputFocused: false,
      popupVisible: props.popupVisible,
      flattenOptions: props.showSearch ? flattenTree(props.options, props) : undefined,
      prevProps: props,
    };
  }

  setValue = (value: CascaderValueType, selectedOptions: CascaderOptionType[] = []) => {
    if (!('value' in this.props)) {
      this.setState({ value });
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange(value, selectedOptions);
    }
  };

  getLabel() {
    const { options, displayRender = defaultDisplayRender as Function } = this.props;
    const names = getFilledFieldNames(this.props);
    const { value } = this.state;
    const unwrappedValue = Array.isArray(value[0]) ? value[0] : value;
    const selectedOptions: CascaderOptionType[] = arrayTreeFilter(
      options,
      (o: CascaderOptionType, level: number) => o[names.value] === unwrappedValue[level],
      { childrenKeyName: names.children },
    );
    const label = selectedOptions.length ? selectedOptions.map(o => o[names.label]) : value;
    return displayRender(label, selectedOptions);
  }

  saveInput = (node: Input) => {
    this.input = node;
  };

  handleChange = (value: any, selectedOptions: CascaderOptionType[]) => {
    this.setState({ inputValue: '' });
    if (selectedOptions[0].__IS_FILTERED_OPTION) {
      const unwrappedValue = value[0];
      const unwrappedSelectedOptions = selectedOptions[0].path;
      this.setValue(unwrappedValue, unwrappedSelectedOptions);
      return;
    }
    this.setValue(value, selectedOptions);
  };

  handlePopupVisibleChange = (popupVisible: boolean) => {
    if (!('popupVisible' in this.props)) {
      this.setState(state => ({
        popupVisible,
        inputFocused: popupVisible,
        inputValue: popupVisible ? state.inputValue : '',
      }));
    }

    const { onPopupVisibleChange } = this.props;
    if (onPopupVisibleChange) {
      onPopupVisibleChange(popupVisible);
    }
  };

  handleInputBlur = () => {
    this.setState({
      inputFocused: false,
    });
  };

  handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const { inputFocused, popupVisible } = this.state;
    // Prevent `Trigger` behaviour.
    if (inputFocused || popupVisible) {
      e.stopPropagation();
    }
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // SPACE => https://github.com/ant-design/ant-design/issues/16871
    if (e.keyCode === KeyCode.BACKSPACE || e.keyCode === KeyCode.SPACE) {
      e.stopPropagation();
    }
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    this.setState({ inputValue });
  };

  clearSelection = (e: React.MouseEvent<HTMLElement>) => {
    const { inputValue } = this.state;
    e.preventDefault();
    e.stopPropagation();
    if (!inputValue) {
      this.setValue([]);
      this.handlePopupVisibleChange(false);
    } else {
      this.setState({ inputValue: '' });
    }
  };

  generateFilteredOptions(prefixCls: string | undefined, renderEmpty: RenderEmptyHandler) {
    const { showSearch, notFoundContent } = this.props;
    const names: FilledFieldNamesType = getFilledFieldNames(this.props);
    const {
      filter = defaultFilterOption,
      render = defaultRenderFilteredOption,
      sort = defaultSortFilteredOption,
      limit = defaultLimit,
    } = showSearch as ShowSearchType;
    const { flattenOptions = [], inputValue } = this.state;

    // Limit the filter if needed
    let filtered: Array<CascaderOptionType[]>;
    if (limit > 0) {
      filtered = [];
      let matchCount = 0;

      // Perf optimization to filter items only below the limit
      flattenOptions.some(path => {
        const match = filter(this.state.inputValue, path, names);
        if (match) {
          filtered.push(path);
          matchCount += 1;
        }
        return matchCount >= limit;
      });
    } else {
      devWarning(
        typeof limit !== 'number',
        'Cascader',
        "'limit' of showSearch should be positive number or false.",
      );
      filtered = flattenOptions.filter(path => filter(this.state.inputValue, path, names));
    }

    filtered = filtered.sort((a, b) => sort(a, b, inputValue, names));

    if (filtered.length > 0) {
      return filtered.map((path: CascaderOptionType[]) => {
        return {
          __IS_FILTERED_OPTION: true,
          path,
          [names.value]: path.map((o: CascaderOptionType) => o[names.value]),
          [names.label]: render(inputValue, path, prefixCls, names),
          disabled: path.some((o: CascaderOptionType) => !!o.disabled),
          isEmptyNode: true,
        } as CascaderOptionType;
      });
    }
    return [
      {
        [names.value]: 'ANT_CASCADER_NOT_FOUND',
        [names.label]: notFoundContent || renderEmpty('Cascader'),
        disabled: true,
        isEmptyNode: true,
      },
    ];
  }

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  getPopupPlacement(direction: string = 'ltr') {
    const { popupPlacement } = this.props;
    if (popupPlacement !== undefined) {
      return popupPlacement;
    }
    return direction === 'rtl' ? 'bottomRight' : 'bottomLeft';
  }

  renderCascader = (
    {
      getPopupContainer: getContextPopupContainer,
      getPrefixCls,
      renderEmpty,
      direction,
    }: ConfigConsumerProps,
    locale: CascaderLocale,
  ) => (
    <SizeContext.Consumer>
      {size => {
        const { props, state } = this;
        const {
          prefixCls: customizePrefixCls,
          inputPrefixCls: customizeInputPrefixCls,
          children,
          placeholder = locale.placeholder || 'Please select',
          size: customizeSize,
          disabled,
          className,
          style,
          allowClear,
          showSearch = false,
          suffixIcon,
          expandIcon,
          notFoundContent,
          popupClassName,
          bordered,
          dropdownRender,
          ...otherProps
        } = props;

        const mergedSize = customizeSize || size;

        const { value, inputFocused } = state;

        const isRtlLayout = direction === 'rtl';

        const prefixCls = getPrefixCls('cascader', customizePrefixCls);
        const inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);

        const sizeCls = classNames({
          [`${inputPrefixCls}-lg`]: mergedSize === 'large',
          [`${inputPrefixCls}-sm`]: mergedSize === 'small',
        });
        const clearIcon =
          (allowClear && !disabled && value.length > 0) || state.inputValue ? (
            <CloseCircleFilled
              className={`${prefixCls}-picker-clear`}
              onClick={this.clearSelection}
            />
          ) : null;
        const arrowCls = classNames({
          [`${prefixCls}-picker-arrow`]: true,
          [`${prefixCls}-picker-arrow-expand`]: state.popupVisible,
        });
        const pickerCls = classNames(className, `${prefixCls}-picker`, {
          [`${prefixCls}-picker-rtl`]: isRtlLayout,
          [`${prefixCls}-picker-with-value`]: state.inputValue,
          [`${prefixCls}-picker-disabled`]: disabled,
          [`${prefixCls}-picker-${mergedSize}`]: !!mergedSize,
          [`${prefixCls}-picker-show-search`]: !!showSearch,
          [`${prefixCls}-picker-focused`]: inputFocused,
          [`${prefixCls}-picker-borderless`]: !bordered,
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
          'renderFilteredOption',
          'sortFilteredOption',
          'notFoundContent',
          'fieldNames',
          'bordered',
        ]);

        let { options } = props;
        const names: FilledFieldNamesType = getFilledFieldNames(this.props);
        if (options && options.length > 0) {
          if (state.inputValue) {
            options = this.generateFilteredOptions(prefixCls, renderEmpty);
          }
        } else {
          options = [
            {
              [names.label]: notFoundContent || renderEmpty('Cascader'),
              [names.value]: 'ANT_CASCADER_NOT_FOUND',
            },
          ];
        }
        // Dropdown menu should keep previous status until it is fully closed.
        if (!state.popupVisible) {
          options = this.cachedOptions;
        } else {
          this.cachedOptions = options;
        }

        const dropdownMenuColumnStyle: { width?: number; height?: string } = {};
        const isNotFound = (options || []).length === 1 && options[0].isEmptyNode;
        if (isNotFound) {
          dropdownMenuColumnStyle.height = 'auto'; // Height of one row.
        }
        // The default value of `matchInputWidth` is `true`
        const resultListMatchInputWidth = (showSearch as ShowSearchType).matchInputWidth !== false;
        if (resultListMatchInputWidth && (state.inputValue || isNotFound) && this.input) {
          dropdownMenuColumnStyle.width = this.input.input.offsetWidth;
        }

        let inputIcon: React.ReactNode;
        if (suffixIcon) {
          inputIcon = replaceElement(
            suffixIcon,
            <span className={`${prefixCls}-picker-arrow`}>{suffixIcon}</span>,
            () => ({
              className: classNames({
                [(suffixIcon as any).props.className!]: (suffixIcon as any).props.className,
                [`${prefixCls}-picker-arrow`]: true,
              }),
            }),
          );
        } else {
          inputIcon = <DownOutlined className={arrowCls} />;
        }

        const input = children || (
          <span style={style} className={pickerCls}>
            <span className={`${prefixCls}-picker-label`}>{this.getLabel()}</span>
            <Input
              {...inputProps}
              tabIndex="-1"
              ref={this.saveInput}
              prefixCls={inputPrefixCls}
              placeholder={value && value.length > 0 ? undefined : placeholder}
              className={`${prefixCls}-input ${sizeCls}`}
              value={state.inputValue}
              disabled={disabled}
              readOnly={!showSearch}
              autoComplete={inputProps.autoComplete || 'off'}
              onClick={showSearch ? this.handleInputClick : undefined}
              onBlur={showSearch ? this.handleInputBlur : undefined}
              onKeyDown={this.handleKeyDown}
              onChange={showSearch ? this.handleInputChange : undefined}
            />
            {clearIcon}
            {inputIcon}
          </span>
        );

        let expandIconNode;
        if (expandIcon) {
          expandIconNode = expandIcon;
        } else {
          expandIconNode = isRtlLayout ? <LeftOutlined /> : <RightOutlined />;
        }

        const loadingIcon = (
          <span className={`${prefixCls}-menu-item-loading-icon`}>
            <RedoOutlined spin />
          </span>
        );

        const getPopupContainer = props.getPopupContainer || getContextPopupContainer;
        const rest = omit(props, ['inputIcon', 'expandIcon', 'loadingIcon', 'bordered']);
        const rcCascaderPopupClassName = classNames(popupClassName, {
          [`${prefixCls}-menu-${direction}`]: direction === 'rtl',
          [`${prefixCls}-menu-empty`]:
            options.length === 1 && options[0].value === 'ANT_CASCADER_NOT_FOUND',
        });
        return (
          <RcCascader
            {...rest}
            prefixCls={prefixCls}
            getPopupContainer={getPopupContainer}
            options={options}
            value={value}
            popupVisible={state.popupVisible}
            onPopupVisibleChange={this.handlePopupVisibleChange}
            onChange={this.handleChange}
            dropdownMenuColumnStyle={dropdownMenuColumnStyle}
            expandIcon={expandIconNode}
            loadingIcon={loadingIcon}
            popupClassName={rcCascaderPopupClassName}
            popupPlacement={this.getPopupPlacement(direction)}
            dropdownRender={dropdownRender}
          >
            {input}
          </RcCascader>
        );
      }}
    </SizeContext.Consumer>
  );

  render() {
    return (
      <ConfigConsumer>
        {(configArgument: ConfigConsumerProps) => (
          <LocaleReceiver>{locale => this.renderCascader(configArgument, locale)}</LocaleReceiver>
        )}
      </ConfigConsumer>
    );
  }
}

export default Cascader;
