import { mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import React from 'react';
import Cascader from '..';
import excludeAllWarning from '../../../tests/shared/excludeWarning';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import ConfigProvider from '../../config-provider';

const { SHOW_CHILD, SHOW_PARENT } = Cascader;

function toggleOpen(wrapper) {
  wrapper.find('.ant-select-selector').simulate('mousedown');
}

function isOpen(wrapper) {
  return !!wrapper.find('Trigger').props().popupVisible;
}

function getDropdown(wrapper) {
  return wrapper.find('.ant-select-dropdown');
}

function clickOption(wrapper, menuIndex, itemIndex, type = 'click') {
  const menu = wrapper.find('ul.ant-cascader-menu').at(menuIndex);
  const itemList = menu.find('li.ant-cascader-menu-item');

  itemList.at(itemIndex).simulate(type);
}

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

function filter(inputValue, path) {
  return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
}

describe('Cascader', () => {
  excludeAllWarning();

  focusTest(Cascader, { refFocus: true });
  mountTest(Cascader);
  rtlTest(Cascader);

  it('popup correctly when panel is hidden', () => {
    const wrapper = mount(<Cascader options={options} />);
    expect(isOpen(wrapper)).toBeFalsy();
  });

  it('popup correctly when panel is open', () => {
    const onPopupVisibleChange = jest.fn();
    const wrapper = mount(
      <Cascader options={options} onPopupVisibleChange={onPopupVisibleChange} />,
    );
    toggleOpen(wrapper);
    expect(isOpen(wrapper)).toBeTruthy();
    expect(onPopupVisibleChange).toHaveBeenCalledWith(true);
  });

  it('support controlled mode', () => {
    const wrapper = mount(<Cascader options={options} />);
    wrapper.setProps({
      value: ['zhejiang', 'hangzhou', 'xihu'],
    });
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('popup correctly with defaultValue', () => {
    const wrapper = mount(<Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} />);
    toggleOpen(wrapper);
    expect(getDropdown(wrapper).render()).toMatchSnapshot();
  });

  it('should support popupVisible', () => {
    const wrapper = mount(<Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} />);
    expect(isOpen(wrapper)).toBeFalsy();
    wrapper.setProps({ popupVisible: true });
    expect(isOpen(wrapper)).toBeTruthy();
  });

  it('can be selected', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Cascader options={options} onChange={onChange} />);

    toggleOpen(wrapper);
    expect(isOpen(wrapper)).toBeTruthy();

    clickOption(wrapper, 0, 0);
    expect(getDropdown(wrapper).render()).toMatchSnapshot();

    clickOption(wrapper, 1, 0);
    expect(getDropdown(wrapper).render()).toMatchSnapshot();

    clickOption(wrapper, 2, 0);
    expect(getDropdown(wrapper).render()).toMatchSnapshot();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['zhejiang', 'hangzhou', 'xihu'], expect.anything());
  });

  it('backspace should work with `Cascader[showSearch]`', () => {
    const wrapper = mount(<Cascader options={options} showSearch />);
    wrapper.find('input').simulate('change', { target: { value: '123' } });
    expect(isOpen(wrapper)).toBeTruthy();

    wrapper.find('input').simulate('keydown', { which: KeyCode.BACKSPACE });
    expect(isOpen(wrapper)).toBeTruthy();

    wrapper.find('input').simulate('change', { target: { value: '' } });
    expect(isOpen(wrapper)).toBeTruthy();

    wrapper.find('input').simulate('keydown', { which: KeyCode.BACKSPACE });
    expect(isOpen(wrapper)).toBeFalsy();
  });

  it('should highlight keyword and filter when search in Cascader', () => {
    const wrapper = mount(<Cascader options={options} showSearch={{ filter }} />);
    wrapper.find('input').simulate('change', { target: { value: 'z' } });
    expect(getDropdown(wrapper).render()).toMatchSnapshot();
  });

  it('should highlight keyword and filter when search in Cascader with same field name of label and value', () => {
    const customOptions = [
      {
        name: 'Zhejiang',
        children: [
          {
            name: 'Hangzhou',
            children: [
              {
                name: 'West Lake',
              },
              {
                name: 'Xia Sha',
                disabled: true,
              },
            ],
          },
        ],
      },
    ];
    function customFilter(inputValue, path) {
      return path.some(option => option.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
    }
    const wrapper = mount(
      <Cascader
        options={customOptions}
        fieldNames={{ label: 'name', value: 'name' }}
        showSearch={{ filter: customFilter }}
      />,
    );
    wrapper.find('input').simulate('change', { target: { value: 'z' } });
    expect(getDropdown(wrapper).render()).toMatchSnapshot();
  });

  it('should render not found content', () => {
    const wrapper = mount(<Cascader options={options} showSearch={{ filter }} />);
    wrapper.find('input').simulate('change', { target: { value: '__notfoundkeyword__' } });
    expect(getDropdown(wrapper).render()).toMatchSnapshot();
  });

  it('should support to clear selection', () => {
    const wrapper = mount(<Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} />);
    expect(wrapper.find('.ant-select-selection-item').text()).toEqual('Zhejiang / Hangzhou');
    wrapper.find('.ant-select-clear').at(0).simulate('mouseDown');
    expect(wrapper.exists('.ant-select-selection-item')).toBeFalsy();
  });

  it('should clear search input when clear selection', () => {
    const wrapper = mount(
      <Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} showSearch />,
    );
    wrapper.find('input').simulate('change', { target: { value: 'xxx' } });

    wrapper.find('.ant-select-clear').at(0).simulate('mouseDown');
    expect(wrapper.find('input').props().value).toEqual('');
  });

  it('should change filtered item when options are changed', () => {
    const wrapper = mount(<Cascader options={options} showSearch={{ filter }} />);
    wrapper.find('input').simulate('change', { target: { value: 'a' } });
    expect(wrapper.find('.ant-cascader-menu-item').length).toBe(2);
    wrapper.setProps({ options: [options[0]] });
    expect(wrapper.find('.ant-cascader-menu-item').length).toBe(1);
  });

  it('should select item immediately when searching and pressing down arrow key', () => {
    const wrapper = mount(<Cascader options={options} showSearch={{ filter }} />);
    wrapper.find('input').simulate('change', { target: { value: 'a' } });
    expect(wrapper.find('.ant-cascader-menu-item').length).toBe(2);
    expect(wrapper.find('.ant-cascader-menu-item-active').length).toBe(0);

    wrapper.find('input').simulate('keyDown', {
      which: KeyCode.DOWN,
    });
    expect(wrapper.find('.ant-cascader-menu-item-active').length).toBe(1);
  });

  it('can use fieldNames', () => {
    const customerOptions = [
      {
        code: 'zhejiang',
        name: 'Zhejiang',
        items: [
          {
            code: 'hangzhou',
            name: 'Hangzhou',
            items: [
              {
                code: 'xihu',
                name: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        code: 'jiangsu',
        name: 'Jiangsu',
        items: [
          {
            code: 'nanjing',
            name: 'Nanjing',
            items: [
              {
                code: 'zhonghuamen',
                name: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];

    const onChange = jest.fn();

    const wrapper = mount(
      <Cascader
        options={customerOptions}
        onChange={onChange}
        fieldNames={{
          children: 'items',
          label: 'name',
          value: 'code',
        }}
        open
      />,
    );

    clickOption(wrapper, 0, 0);
    clickOption(wrapper, 1, 0);
    clickOption(wrapper, 2, 0);
    expect(wrapper.find('.ant-select-selection-item').text()).toEqual(
      'Zhejiang / Hangzhou / West Lake',
    );
    expect(onChange).toHaveBeenCalledWith(['zhejiang', 'hangzhou', 'xihu'], expect.anything());
  });

  it('should show not found content when options.length is 0', () => {
    const customerOptions = [];
    const wrapper = mount(<Cascader options={customerOptions} />);
    toggleOpen(wrapper);
    expect(getDropdown(wrapper).render()).toMatchSnapshot();
  });

  it('not found content should be disabled', () => {
    const wrapper = mount(<Cascader options={[]} open />);
    expect(wrapper.find('.ant-cascader-menu-item-disabled').length).toBe(1);
  });

  describe('limit filtered item count', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    afterAll(() => {
      errorSpy.mockRestore();
    });

    it('limit with positive number', () => {
      const wrapper = mount(<Cascader options={options} showSearch={{ filter, limit: 1 }} />);
      wrapper.find('input').simulate('change', { target: { value: 'a' } });
      expect(wrapper.find('.ant-cascader-menu-item')).toHaveLength(1);
    });

    it('not limit', () => {
      const wrapper = mount(<Cascader options={options} showSearch={{ filter, limit: false }} />);
      wrapper.find('input').simulate('change', { target: { value: 'a' } });
      expect(wrapper.find('.ant-cascader-menu-item')).toHaveLength(2);
    });

    it('negative limit', () => {
      const wrapper = mount(<Cascader options={options} showSearch={{ filter, limit: -1 }} />);
      wrapper.find('input').simulate('click');
      wrapper.find('input').simulate('change', { target: { value: 'a' } });
      expect(wrapper.find('.ant-cascader-menu-item')).toHaveLength(2);
    });
  });

  // FIXME: Move to `rc-tree-select` instead
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should warning if not find `value` in `options`', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mount(<Cascader options={[{ label: 'a', value: 'a', children: [{ label: 'b' }] }]} />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Cascader] Not found `value` in `options`.',
    );
    errorSpy.mockRestore();
  });

  // https://github.com/ant-design/ant-design/issues/17690
  it('should not breaks when children is null', () => {
    const optionsWithChildrenNull = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: null,
          },
        ],
      },
    ];
    expect(() => {
      mount(<Cascader options={optionsWithChildrenNull} />);
    }).not.toThrow();
  });

  it('placeholder works correctly', () => {
    const wrapper = mount(<Cascader options={[]} />);
    expect(wrapper.find('.ant-select-selection-placeholder').text()).toEqual('');

    const customPlaceholder = 'Custom placeholder';
    wrapper.setProps({
      placeholder: customPlaceholder,
    });
    expect(wrapper.find('.ant-select-selection-placeholder').text()).toEqual(customPlaceholder);
  });

  it('placement work correctly', () => {
    const customerOptions = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
          },
        ],
      },
    ];
    const wrapper = mount(<Cascader options={customerOptions} placement="topRight" />);
    expect(wrapper.find('Trigger').prop('popupPlacement')).toEqual('topRight');
  });

  it('popup correctly with defaultValue RTL', () => {
    const wrapper = mount(
      <ConfigProvider direction="rtl">
        <Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} open />
      </ConfigProvider>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('can be selected in RTL direction', () => {
    const options2 = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ];
    const onChange = jest.fn();
    const wrapper = mount(
      <ConfigProvider direction="rtl">
        <Cascader
          options={options2}
          defaultValue={['zhejiang', 'hangzhou']}
          onChange={onChange}
          popupPlacement="bottomRight"
        />
      </ConfigProvider>,
    );

    toggleOpen(wrapper);
    clickOption(wrapper, 0, 0);
    expect(getDropdown(wrapper).render()).toMatchSnapshot();

    toggleOpen(wrapper);
    clickOption(wrapper, 1, 0);
    expect(getDropdown(wrapper).render()).toMatchSnapshot();

    toggleOpen(wrapper);
    clickOption(wrapper, 2, 0);
    expect(getDropdown(wrapper).render()).toMatchSnapshot();

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(['zhejiang', 'hangzhou', 'xihu'], expect.anything());
  });

  it('defaultValue works correctly when no match options', () => {
    const wrapper = mount(<Cascader options={options} defaultValue={['options1', 'options2']} />);
    expect(wrapper.find('.ant-select-selection-item').text()).toEqual('options1 / options2');
  });

  it('can be selected when showSearch', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Cascader options={options} onChange={onChange} showSearch />);
    wrapper.find('input').simulate('change', { target: { value: 'Zh' } });
    expect(wrapper.find('.ant-cascader-menu').length).toBe(1);
    clickOption(wrapper, 0, 0);
    expect(onChange).toHaveBeenCalledWith(['zhejiang', 'hangzhou', 'xihu'], expect.anything());
  });

  it('options should open after press esc and then search', () => {
    const wrapper = mount(<Cascader options={options} showSearch />);
    wrapper.find('input').simulate('change', { target: { value: 'jin' } });
    expect(isOpen(wrapper)).toBeTruthy();
    wrapper.find('input').simulate('keydown', { which: KeyCode.ESC });
    expect(isOpen(wrapper)).toBeFalsy();
    wrapper.find('input').simulate('change', { target: { value: 'jin' } });
    expect(isOpen(wrapper)).toBeTruthy();
  });

  it('onChange works correctly when the label of fieldNames is the same as value', () => {
    const onChange = jest.fn();
    const sameNames = { label: 'label', value: 'label' };
    const wrapper = mount(
      <Cascader options={options} onChange={onChange} showSearch fieldNames={sameNames} />,
    );
    wrapper.find('input').simulate('change', { target: { value: 'est' } });
    clickOption(wrapper, 0, 0);
    expect(onChange).toHaveBeenCalledWith(['Zhejiang', 'Hangzhou', 'West Lake'], expect.anything());
  });

  it('rtl should work well with placement', () => {
    const wrapper = mount(<Cascader options={options} direction="rtl" />);

    expect(wrapper.find('Trigger').prop('popupPlacement')).toEqual('bottomRight');
  });

  describe('legacy props', () => {
    it('popupClassName', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      const wrapper = mount(
        <Cascader open popupPlacement="bottomLeft" popupClassName="mock-cls" />,
      );

      expect(wrapper.exists('.mock-cls')).toBeTruthy();
      expect(wrapper.find('Trigger').prop('popupPlacement')).toEqual('bottomLeft');

      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: Cascader] `popupClassName` is deprecated. Please use `dropdownClassName` instead.',
      );

      errorSpy.mockRestore();
    });

    it('should support showCheckedStrategy child', () => {
      const multipleOptions = [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
                {
                  value: 'donghu',
                  label: 'East Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ];

      let selectedValue;
      const onChange = function onChange(value) {
        selectedValue = value;
      };

      const wrapper = mount(
        <Cascader
          options={multipleOptions}
          onChange={onChange}
          multiple
          showCheckedStrategy={SHOW_CHILD}
        />,
      );
      toggleOpen(wrapper);
      expect(wrapper.render()).toMatchSnapshot();

      clickOption(wrapper, 0, 0);
      clickOption(wrapper, 1, 0);
      clickOption(wrapper, 2, 0);
      clickOption(wrapper, 2, 1);
      expect(selectedValue[0].join(',')).toBe('zhejiang,hangzhou,xihu');
      expect(selectedValue[1].join(',')).toBe('zhejiang,hangzhou,donghu');
      expect(selectedValue.join(',')).toBe('zhejiang,hangzhou,xihu,zhejiang,hangzhou,donghu');
    });

    it('should support showCheckedStrategy parent', () => {
      const multipleOptions = [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
                {
                  value: 'donghu',
                  label: 'East Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ];

      let selectedValue;
      const onChange = function onChange(value) {
        selectedValue = value;
      };

      const wrapper = mount(
        <Cascader
          options={multipleOptions}
          onChange={onChange}
          multiple
          showCheckedStrategy={SHOW_PARENT}
        />,
      );
      toggleOpen(wrapper);
      expect(wrapper.render()).toMatchSnapshot();
      clickOption(wrapper, 0, 0);
      clickOption(wrapper, 1, 0);
      clickOption(wrapper, 2, 0);
      clickOption(wrapper, 2, 1);

      expect(selectedValue.length).toBe(1);
      expect(selectedValue.join(',')).toBe('zhejiang');
    });
  });
});
