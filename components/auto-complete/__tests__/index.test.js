import React from 'react';
import AutoComplete from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import Input from '../../input';

describe('AutoComplete', () => {
  mountTest(AutoComplete);
  rtlTest(AutoComplete);

  it('AutoComplete with custom Input render perfectly', () => {
    const { container } = render(
      <AutoComplete dataSource={['12345', '23456', '34567']}>
        <textarea />
      </AutoComplete>,
    );

    expect(container.querySelectorAll('textarea').length).toBe(1);
    fireEvent.change(container.querySelector('textarea'), { target: { value: '123' } });

    // should not filter data source defaultly
    expect(container.querySelectorAll('.ant-select-item-option').length).toBe(3);
  });

  it('AutoComplete should work when dataSource is object array', () => {
    const { container } = render(
      <AutoComplete
        dataSource={[
          { text: 'text', value: 'value' },
          { text: 'abc', value: 'xxx' },
        ]}
      >
        <input />
      </AutoComplete>,
    );
    expect(container.querySelectorAll('input').length).toBe(1);
    fireEvent.change(container.querySelector('input'), { target: { value: 'a' } });

    // should not filter data source defaultly
    expect(container.querySelectorAll('.ant-select-item-option').length).toBe(2);
  });

  it('AutoComplete throws error when contains invalid dataSource', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    render(
      <AutoComplete dataSource={[() => {}]}>
        <textarea />
      </AutoComplete>,
    );

    expect(spy).toHaveBeenCalled();
  });

  it('legacy dataSource should accept react element option', () => {
    const { asFragment } = render(
      <AutoComplete open dataSource={[<span key="key">ReactNode</span>]} />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('legacy AutoComplete.Option should be compatiable', () => {
    const { container } = render(
      <AutoComplete>
        <AutoComplete.Option value="111">111</AutoComplete.Option>
        <AutoComplete.Option value="222">222</AutoComplete.Option>
      </AutoComplete>,
    );
    expect(container.querySelectorAll('input').length).toBe(1);
    fireEvent.change(container.querySelector('input'), { target: { value: '1' } });
    expect(container.querySelectorAll('.ant-select-item-option').length).toBe(2);
  });

  it('should not warning when getInputElement is null', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    render(<AutoComplete placeholder="input here" allowClear />);
    // eslint-disable-next-line no-console
    expect(console.warn).not.toBeCalled();
    // eslint-disable-next-line no-console
    console.warn.mockRestore();
  });

  it('should not override custom input className', () => {
    const { container } = render(
      <AutoComplete>
        <Input className="custom" />
      </AutoComplete>,
    );
    expect(container.querySelector('input').classList.contains('custom')).toBeTruthy();
  });
});
