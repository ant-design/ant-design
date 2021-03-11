import React from 'react';
import { mount } from 'enzyme';
import AutoComplete from '..';
import Input from '../../input';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('AutoComplete', () => {
  mountTest(AutoComplete);
  rtlTest(AutoComplete);

  it('AutoComplete with custom Input render perfectly', () => {
    const wrapper = mount(
      <AutoComplete dataSource={['12345', '23456', '34567']}>
        <textarea />
      </AutoComplete>,
    );

    expect(wrapper.find('textarea').length).toBe(1);
    wrapper.find('textarea').simulate('change', { target: { value: '123' } });

    // should not filter data source defaultly
    expect(wrapper.find('.ant-select-item-option').length).toBe(3);
  });

  it('AutoComplete should work when dataSource is object array', () => {
    const wrapper = mount(
      <AutoComplete
        dataSource={[
          { text: 'text', value: 'value' },
          { text: 'abc', value: 'xxx' },
        ]}
      >
        <input />
      </AutoComplete>,
    );
    expect(wrapper.find('input').length).toBe(1);
    wrapper.find('input').simulate('change', { target: { value: 'a' } });

    // should not filter data source defaultly
    expect(wrapper.find('.ant-select-item-option').length).toBe(2);
  });

  it('AutoComplete throws error when contains invalid dataSource', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => {
      mount(
        <AutoComplete dataSource={[() => {}]}>
          <textarea />
        </AutoComplete>,
      );
    }).toThrow();
    // eslint-disable-next-line no-console
    console.error.mockRestore();
  });

  it('legacy dataSource should accept react element option', () => {
    const wrapper = mount(<AutoComplete open dataSource={[<span key="key">ReactNode</span>]} />);
    expect(wrapper).toMatchRenderedSnapshot();
  });

  it('legacy AutoComplete.Option should be compatiable', () => {
    const wrapper = mount(
      <AutoComplete>
        <AutoComplete.Option value="111">111</AutoComplete.Option>
        <AutoComplete.Option value="222">222</AutoComplete.Option>
      </AutoComplete>,
    );
    expect(wrapper.find('input').length).toBe(1);
    wrapper.find('input').simulate('change', { target: { value: '1' } });
    expect(wrapper.find('.ant-select-item-option').length).toBe(2);
  });

  it('should not warning when getInputElement is null', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    mount(<AutoComplete placeholder="input here" allowClear />);
    // eslint-disable-next-line no-console
    expect(console.warn).not.toBeCalled();
    // eslint-disable-next-line no-console
    console.warn.mockRestore();
  });

  fit('should not override custom input className', () => {
    const wrapper = mount(
      <AutoComplete>
        <Input className="custom" />
      </AutoComplete>,
    );
    expect(wrapper.find('input').hasClass('custom')).toBe(true);
  });
});
