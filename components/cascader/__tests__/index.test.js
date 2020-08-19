import React from 'react';
import { render, mount } from 'enzyme';
import KeyCode from 'rc-util/lib/KeyCode';
import Cascader from '..';
import ConfigProvider from '../../config-provider';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { sleep } from '../../../tests/utils';

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
  focusTest(Cascader);
  mountTest(Cascader);
  rtlTest(Cascader);

  it('popup correctly when panel is hidden', () => {
    const wrapper = mount(<Cascader options={options} />);
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });

  it('popup correctly when panel is open', () => {
    const onPopupVisibleChange = jest.fn();
    const wrapper = mount(
      <Cascader options={options} onPopupVisibleChange={onPopupVisibleChange} />,
    );
    wrapper.find('input').simulate('click');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
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
    wrapper.find('input').simulate('click');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });

  it('should support popupVisible', () => {
    const wrapper = mount(<Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} />);
    expect(wrapper.find('Trigger').instance().getComponent().props.visible).toBe(false);
    wrapper.setProps({ popupVisible: true });
    expect(wrapper.find('Trigger').instance().getComponent().props.visible).toBe(true);
  });

  it('can be selected', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Cascader options={options} onChange={onChange} />);
    wrapper.find('input').simulate('click');
    let popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    popupWrapper
      .find('.ant-cascader-menu')
      .at(0)
      .find('.ant-cascader-menu-item')
      .at(0)
      .simulate('click');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
    popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    popupWrapper
      .find('.ant-cascader-menu')
      .at(1)
      .find('.ant-cascader-menu-item')
      .at(0)
      .simulate('click');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
    popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    popupWrapper
      .find('.ant-cascader-menu')
      .at(2)
      .find('.ant-cascader-menu-item')
      .at(0)
      .simulate('click');
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
    expect(onChange).toHaveBeenCalledWith(['zhejiang', 'hangzhou', 'xihu'], expect.anything());
  });

  it('backspace should work with `Cascader[showSearch]`', () => {
    const wrapper = mount(<Cascader options={options} showSearch />);
    wrapper.find('input').simulate('change', { target: { value: '123' } });
    expect(wrapper.state('inputValue')).toBe('123');
    wrapper.find('input').simulate('keydown', { keyCode: KeyCode.BACKSPACE });
    // Simulate onKeyDown will not trigger onChange by default, so the value is still '123'
    expect(wrapper.state('inputValue')).toBe('123');
  });

  it('should highlight keyword and filter when search in Cascader', () => {
    const wrapper = mount(<Cascader options={options} showSearch={{ filter }} />);
    wrapper.find('input').simulate('click');
    wrapper.find('input').simulate('change', { target: { value: 'z' } });
    expect(wrapper.state('inputValue')).toBe('z');
    const popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(popupWrapper).toMatchSnapshot();
  });

  it('should highlight keyword and filter when search in Cascader with same field name of label and value', () => {
    const customOptions = [
      {
        name: 'Zhejiang',
        value: 'Zhejiang',
        children: [
          {
            name: 'Hangzhou',
            value: 'Hangzhou',
            children: [
              {
                name: 'West Lake',
                value: 'West Lake',
              },
              {
                name: 'Xia Sha',
                value: 'Xia Sha',
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
    wrapper.find('input').simulate('click');
    wrapper.find('input').simulate('change', { target: { value: 'z' } });
    expect(wrapper.state('inputValue')).toBe('z');
    const popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(popupWrapper.render()).toMatchSnapshot();
  });

  it('should render not found content', () => {
    const wrapper = mount(<Cascader options={options} showSearch={{ filter }} />);
    wrapper.find('input').simulate('click');
    wrapper.find('input').simulate('change', { target: { value: '__notfoundkeyword__' } });
    expect(wrapper.state('inputValue')).toBe('__notfoundkeyword__');
    const popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(popupWrapper).toMatchSnapshot();
  });

  it('should support to clear selection', async () => {
    const wrapper = mount(<Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} />);
    const willUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    expect(wrapper.find('.ant-cascader-picker-label').text()).toBe('Zhejiang / Hangzhou');
    wrapper.find('.ant-cascader-picker-clear').at(0).simulate('click');
    await sleep(300);
    expect(wrapper.find('.ant-cascader-picker-label').text()).toBe('');
    wrapper.unmount();
    expect(willUnmount).toHaveBeenCalled();
    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('should close popup when clear selection', () => {
    const onPopupVisibleChange = jest.fn();
    const wrapper = mount(
      <Cascader
        options={options}
        popupVisible
        defaultValue={['zhejiang', 'hangzhou']}
        onPopupVisibleChange={onPopupVisibleChange}
      />,
    );
    wrapper.find('.ant-cascader-picker-clear').at(0).simulate('click');
    expect(onPopupVisibleChange).toHaveBeenCalledWith(false);
  });

  it('should clear search input when clear selection', () => {
    const wrapper = mount(
      <Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} showSearch />,
    );
    wrapper.find('input').simulate('click');
    wrapper.find('input').simulate('change', { target: { value: 'xxx' } });
    expect(wrapper.state('inputValue')).toBe('xxx');
    wrapper.find('.ant-cascader-picker-clear').at(0).simulate('click');
    expect(wrapper.state('inputValue')).toBe('');
  });

  it('should not trigger visible change when click search input', () => {
    const onPopupVisibleChange = jest.fn();
    const wrapper = mount(
      <Cascader options={options} showSearch onPopupVisibleChange={onPopupVisibleChange} />,
    );
    wrapper.find('input').simulate('focus');
    expect(onPopupVisibleChange).toHaveBeenCalledTimes(0);
    wrapper.find('input').simulate('click');
    expect(onPopupVisibleChange).toHaveBeenCalledTimes(1);
    wrapper.find('input').simulate('click');
    expect(onPopupVisibleChange).toHaveBeenCalledTimes(1);
    wrapper.find('input').simulate('blur');
    wrapper.setState({ popupVisible: false });
    wrapper.find('input').simulate('click');
    expect(onPopupVisibleChange).toHaveBeenCalledTimes(2);
  });

  it('should change filtered item when options are changed', () => {
    const wrapper = mount(<Cascader options={options} showSearch={{ filter }} />);
    wrapper.find('input').simulate('click');
    wrapper.find('input').simulate('change', { target: { value: 'a' } });
    expect(wrapper.find('.ant-cascader-menu-item').length).toBe(2);
    wrapper.setProps({ options: [options[0]] });
    expect(wrapper.find('.ant-cascader-menu-item').length).toBe(1);
  });

  it('should select item immediately when searching and pressing down arrow key', () => {
    const wrapper = mount(<Cascader options={options} showSearch={{ filter }} />);
    wrapper.find('input').simulate('click');
    wrapper.find('input').simulate('change', { target: { value: 'a' } });
    expect(wrapper.find('.ant-cascader-menu-item').length).toBe(2);
    expect(wrapper.find('.ant-cascader-menu-item-active').length).toBe(0);
    wrapper.find('input').simulate('keyDown', {
      keyCode: KeyCode.DOWN,
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
    const wrapper = mount(
      <Cascader
        options={customerOptions}
        fieldNames={{
          children: 'items',
          label: 'name',
          value: 'code',
        }}
      />,
    );
    wrapper.instance().handleChange(['zhejiang', 'hangzhou', 'xihu'], customerOptions);
    expect(wrapper.find('.ant-cascader-picker-label').text().split('/').length).toBe(3);
  });

  it('should show not found content when options.length is 0', () => {
    const customerOptions = [];
    const wrapper = mount(<Cascader options={customerOptions} />);
    wrapper.find('input').simulate('click');
    const popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(popupWrapper).toMatchSnapshot();
  });

  describe('limit filtered item count', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    afterAll(() => {
      errorSpy.mockRestore();
    });

    it('limit with positive number', () => {
      const wrapper = mount(<Cascader options={options} showSearch={{ filter, limit: 1 }} />);
      wrapper.find('input').simulate('click');
      wrapper.find('input').simulate('change', { target: { value: 'a' } });
      expect(wrapper.find('.ant-cascader-menu-item').length).toBe(1);
    });

    it('not limit', () => {
      const wrapper = mount(<Cascader options={options} showSearch={{ filter, limit: false }} />);
      wrapper.find('input').simulate('click');
      wrapper.find('input').simulate('change', { target: { value: 'a' } });
      expect(wrapper.find('.ant-cascader-menu-item').length).toBe(2);
    });

    it('negative limit', () => {
      const wrapper = mount(<Cascader options={options} showSearch={{ filter, limit: -1 }} />);
      wrapper.find('input').simulate('click');
      wrapper.find('input').simulate('change', { target: { value: 'a' } });
      expect(wrapper.find('.ant-cascader-menu-item').length).toBe(2);
      expect(errorSpy).toHaveBeenCalledWith(
        "Warning: [antd: Cascader] 'limit' of showSearch should be positive number or false.",
      );
    });
  });

  it('should warning if not find `value` in `options`', () => {
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

  // https://github.com/ant-design/ant-design/issues/18176
  it('have a notFoundContent that fit trigger input width', () => {
    const wrapper = mount(
      <Cascader
        popupVisible
        options={[]}
        fieldNames={{ label: 'name', value: 'code', children: 'items' }}
      />,
    );
    const popupWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(popupWrapper.render()).toMatchSnapshot();
  });

  it('placeholder works correctly', () => {
    const wrapper = mount(<Cascader options={[]} />);
    expect(wrapper.find('input').prop('placeholder')).toBe('Please select');

    const customPlaceholder = 'Custom placeholder';
    wrapper.setProps({
      placeholder: customPlaceholder,
    });
    expect(wrapper.find('input').prop('placeholder')).toBe(customPlaceholder);
  });

  it('popup correctly with defaultValue RTL', () => {
    const wrapper = mount(
      <ConfigProvider direction="rtl">
        <Cascader options={options} defaultValue={['zhejiang', 'hangzhou']} />
      </ConfigProvider>,
    );
    wrapper.find('Cascader').find('input').simulate('click');
    expect(
      render(wrapper.find('Cascader').find('Trigger').instance().getComponent()),
    ).toMatchSnapshot();
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

    wrapper.find('Cascader').find('input').simulate('click');
    let popupWrapper = mount(wrapper.find('Cascader').find('Trigger').instance().getComponent());
    popupWrapper
      .find('.ant-cascader-menu')
      .at(0)
      .find('.ant-cascader-menu-item')
      .at(0)
      .simulate('click');
    expect(
      render(wrapper.find('Cascader').find('Trigger').instance().getComponent()),
    ).toMatchSnapshot();
    popupWrapper = mount(wrapper.find('Cascader').find('Trigger').instance().getComponent());
    popupWrapper
      .find('.ant-cascader-menu')
      .at(1)
      .find('.ant-cascader-menu-item')
      .at(0)
      .simulate('click');
    expect(
      render(wrapper.find('Cascader').find('Trigger').instance().getComponent()),
    ).toMatchSnapshot();
    popupWrapper = mount(wrapper.find('Cascader').find('Trigger').instance().getComponent());
    popupWrapper
      .find('.ant-cascader-menu')
      .at(2)
      .find('.ant-cascader-menu-item')
      .at(0)
      .simulate('click');
    expect(onChange).toHaveBeenCalledWith(['zhejiang', 'hangzhou', 'xihu'], expect.anything());
  });

  it('defaultValue works correctly when no match options', () => {
    const wrapper = mount(<Cascader options={options} defaultValue={['options1', 'options2']} />);
    expect(wrapper.find('.ant-cascader-picker-label').text()).toBe('options1 / options2');
  });

  it('can be selected when showSearch', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Cascader options={options} onChange={onChange} showSearch />);
    wrapper.find('input').simulate('click');
    wrapper.find('input').simulate('change', { target: { value: 'Zh' } });
    const popupWrapper = mount(wrapper.find('Cascader').find('Trigger').instance().getComponent());
    expect(popupWrapper.find('.ant-cascader-menu').length).toBe(1);
    popupWrapper
      .find('.ant-cascader-menu')
      .at(0)
      .find('.ant-cascader-menu-item')
      .at(0)
      .simulate('click');
    expect(onChange).toHaveBeenCalledWith(['zhejiang', 'hangzhou', 'xihu'], expect.anything());
  });

  it('options should open after press esc and then search', () => {
    const wrapper = mount(<Cascader options={options} showSearch />);
    wrapper.find('input').simulate('change', { target: { value: 'jin' } });
    wrapper.find('input').simulate('keydown', { keyCode: KeyCode.ESC });
    wrapper.find('input').simulate('change', { target: { value: 'jin' } });
    expect(wrapper.state('popupVisible')).toBe(true);
  });
});
