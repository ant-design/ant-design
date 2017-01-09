import React from 'react';
import Select from '../select';
import { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
;
export default class AutoComplete extends React.Component {
    render() {
        let { size, className = '', notFoundContent, prefixCls, optionLabelProp, dataSource, children, } = this.props;
        const cls = classNames({
            [`${prefixCls}-lg`]: size === 'large',
            [`${prefixCls}-sm`]: size === 'small',
            [className]: !!className,
            [`${prefixCls}-show-search`]: true,
        });
        const options = children || (dataSource ? dataSource.map((item) => {
            switch (typeof item) {
                case 'string':
                    return <Option key={item}>{item}</Option>;
                case 'object':
                    return (<Option key={item.value}>
              {item.text}
            </Option>);
                default:
                    throw new Error('AutoComplete[dataSource] only supports type `string[] | Object[]`.');
            }
        }) : []);
        return (<Select {...this.props} className={cls} optionLabelProp={optionLabelProp} combobox notFoundContent={notFoundContent}>
        {options}
      </Select>);
    }
}
AutoComplete.Option = Option;
AutoComplete.OptGroup = OptGroup;
AutoComplete.defaultProps = {
    prefixCls: 'ant-select',
    transitionName: 'slide-up',
    optionLabelProp: 'children',
    choiceTransitionName: 'zoom',
    showSearch: false,
};
AutoComplete.contextTypes = {
    antLocale: React.PropTypes.object,
};
