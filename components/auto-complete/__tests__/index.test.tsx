import React from 'react';
import userEvent from '@testing-library/user-event';
import AutoComplete from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, screen } from '../../../tests/utils';
import Input from '../../input';

describe('AutoComplete', () => {
  mountTest(AutoComplete);
  rtlTest(AutoComplete);

  it('AutoComplete with custom Input render perfectly', async () => {
    render(
      <AutoComplete dataSource={['12345', '23456', '34567']}>
        <textarea />
      </AutoComplete>,
    );

    expect(screen.getByRole('combobox')).toBeInTheDocument();

    // should show options when type in input
    await userEvent.type(screen.getByRole('combobox'), '123');

    // should not filter data source by default
    expect(screen.getByTitle('12345')).toBeInTheDocument();
    expect(screen.getByTitle('23456')).toBeInTheDocument();
    expect(screen.getByTitle('34567')).toBeInTheDocument();
  });

  it('AutoComplete should work when dataSource is object array', async () => {
    render(
      <AutoComplete
        dataSource={[
          { text: 'text', value: 'value' },
          { text: 'abc', value: 'xxx' },
        ]}
      >
        <input />
      </AutoComplete>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('combobox'), 'a');

    // should not filter data source by default
    expect(screen.getByTitle('text')).toBeInTheDocument();
    expect(screen.getByTitle('abc')).toBeInTheDocument();
  });

  it('AutoComplete throws error when contains invalid dataSource', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);

    render(
      // @ts-ignore
      <AutoComplete dataSource={[() => {}]}>
        <textarea />
      </AutoComplete>,
    );

    expect(spy).toHaveBeenCalled();
  });

  it('legacy dataSource should accept react element option', () => {
    render(<AutoComplete open dataSource={[<span key="key">ReactNode</span>]} />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByTitle(/reactnode/i)).toBeInTheDocument();
  });

  it('legacy AutoComplete.Option should be compatiable', async () => {
    render(
      <AutoComplete>
        <AutoComplete.Option value="111">111</AutoComplete.Option>
        <AutoComplete.Option value="222">222</AutoComplete.Option>
      </AutoComplete>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('combobox'), '1');
    expect(screen.getByTitle(/111/i)).toBeInTheDocument();
    expect(screen.getByTitle(/222/i)).toBeInTheDocument();
  });

  it('should not warning when getInputElement is null', () => {
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    render(<AutoComplete placeholder="input here" allowClear />);
    // eslint-disable-next-line no-console
    expect(console.warn).not.toHaveBeenCalled();
    // @ts-ignore
    // eslint-disable-next-line no-console
    console.warn.mockRestore();
  });

  it('should not override custom input className', () => {
    render(
      <AutoComplete>
        <Input className="custom" />
      </AutoComplete>,
    );
    expect(screen.getByRole('combobox')).toHaveClass('custom');
  });

  it('should show warning when use dropdownClassName', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <AutoComplete dropdownClassName="myCustomClassName">
        <AutoComplete.Option value="111">111</AutoComplete.Option>
        <AutoComplete.Option value="222">222</AutoComplete.Option>
      </AutoComplete>,
    );
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: AutoComplete] `dropdownClassName` is deprecated which will be removed in next major version. Please use `popupClassName` instead.',
    );
    errorSpy.mockRestore();
  });
});
