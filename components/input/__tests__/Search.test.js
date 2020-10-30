import React from 'react';
import { mount } from 'enzyme';
import Search from '../Search';
import Button from '../../button';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Input.Search', () => {
  focusTest(Search, { refFocus: true });
  mountTest(Search);
  rtlTest(Search);

  it('should support custom button', () => {
    const wrapper = mount(<Search enterButton={<button type="button">ok</button>} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support custom Button', () => {
    const wrapper = mount(<Search enterButton={<Button>ok</Button>} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support ReactNode suffix without error', () => {
    const wrapper = mount(<Search suffix={<div>ok</div>} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should disable enter button when disabled prop is true', () => {
    const wrapper = mount(<Search placeholder="input search text" enterButton disabled />);
    expect(wrapper.find('.ant-btn-primary[disabled]')).toHaveLength(1);
  });

  it('should disable search icon when disabled prop is true', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<Search defaultValue="search text" onSearch={onSearch} disabled />);
    wrapper.find('Button').simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(0);
  });

  it('should trigger onSearch when click search icon', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<Search defaultValue="search text" onSearch={onSearch} />);
    wrapper.find('Button').simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'click',
        preventDefault: expect.any(Function),
      }),
    );
  });

  it('should trigger onSearch when click search button', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<Search defaultValue="search text" enterButton onSearch={onSearch} />);
    wrapper.find('Button').simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'click',
        preventDefault: expect.any(Function),
      }),
    );
  });

  it('should trigger onSearch when click search button with text', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <Search defaultValue="search text" enterButton="button text" onSearch={onSearch} />,
    );
    wrapper.find('Button').simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'click',
        preventDefault: expect.any(Function),
      }),
    );
  });

  it('should trigger onSearch when click search button with customize button', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <Search
        defaultValue="search text"
        enterButton={<Button>antd button</Button>}
        onSearch={onSearch}
      />,
    );
    wrapper.find('Button').simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'click',
        preventDefault: expect.any(Function),
      }),
    );
  });

  it('should trigger onSearch when click search button of native', () => {
    const onSearch = jest.fn();
    const wrapper = mount(
      <Search
        defaultValue="search text"
        enterButton={<button type="button">antd button</button>}
        onSearch={onSearch}
      />,
    );
    wrapper.find('button').simulate('click');
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'click',
        preventDefault: expect.any(Function),
      }),
    );
  });

  it('should trigger onSearch when press enter', () => {
    const onSearch = jest.fn();
    const wrapper = mount(<Search defaultValue="search text" onSearch={onSearch} />);
    wrapper.find('input').simulate('keydown', { key: 'Enter', keyCode: 13 });
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith(
      'search text',
      expect.objectContaining({
        type: 'keydown',
        preventDefault: expect.any(Function),
      }),
    );
  });

  // https://github.com/ant-design/ant-design/issues/14785
  it('should support addonAfter', () => {
    const addonAfter = <span>Addon After</span>;
    const wrapper = mount(<Search addonAfter={addonAfter} />);
    const wrapperWithEnterButton = mount(<Search enterButton addonAfter={addonAfter} />);
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapperWithEnterButton.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/18729
  it('should trigger onSearch when click clear icon', () => {
    const onSearch = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(
      <Search allowClear defaultValue="value" onSearch={onSearch} onChange={onChange} />,
    );
    wrapper.find('.ant-input-clear-icon').at(0).simulate('click');
    expect(onSearch).toHaveBeenLastCalledWith('', expect.anything());
    expect(onChange).toHaveBeenCalled();
  });

  it('should support loading', () => {
    const wrapper = mount(<Search loading />);
    const wrapperWithEnterButton = mount(<Search loading enterButton />);
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapperWithEnterButton.render()).toMatchSnapshot();
  });

  it('should support addonAfter and suffix for loading', () => {
    const wrapper = mount(<Search loading suffix="suffix" addonAfter="addonAfter" />);
    const wrapperWithEnterButton = mount(
      <Search loading enterButton suffix="suffix" addonAfter="addonAfter" />,
    );
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapperWithEnterButton.render()).toMatchSnapshot();
  });

  it('should support invalid suffix', () => {
    const wrapper = mount(<Search suffix={[]} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support invalid addonAfter', () => {
    const wrapper = mount(<Search addonAfter={[]} enterButton />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should prevent search button mousedown event', () => {
    const ref = React.createRef();
    const wrapper = mount(<Search ref={ref} enterButton="button text" />, {
      attachTo: document.body,
    });
    let prevented = false;
    ref.current.focus();
    expect(document.activeElement).toBe(wrapper.find('input').at(0).getDOMNode());
    wrapper.find('button').simulate('mousedown', {
      preventDefault: () => {
        prevented = true;
      },
    });
    expect(prevented).toBeTruthy();
    expect(document.activeElement).toBe(wrapper.find('input').at(0).getDOMNode());
  });

  it('not crash when use function ref', () => {
    const ref = jest.fn();
    const wrapper = mount(<Search ref={ref} enterButton />);
    expect(() => {
      wrapper.find('button').simulate('mousedown');
    }).not.toThrow();
  });

  // https://github.com/ant-design/ant-design/issues/27258
  it('Search with allowClear should have one className only', () => {
    const wrapper = mount(<Search allowClear className="className" />);
    expect(wrapper.find('.ant-input-group-wrapper').hasClass('className')).toBe(true);
    expect(wrapper.find('.ant-input-affix-wrapper').hasClass('className')).toBe(false);
  });
});
