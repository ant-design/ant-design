import React from 'react';
import userEvent from '@testing-library/user-event';

import AutoComplete from '..';
import { resetWarned } from '../../_util/warning';
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
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

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

  it('legacy AutoComplete.Option should be compatible', async () => {
    render(
      <AutoComplete>
        <AutoComplete.Option value="111">111</AutoComplete.Option>
        <AutoComplete.Option value="222">222</AutoComplete.Option>
      </AutoComplete>,
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    await userEvent.type(screen.getByRole('combobox'), '1');
    expect(screen.getByTitle(/111/)).toBeInTheDocument();
    expect(screen.getByTitle(/222/)).toBeInTheDocument();
  });

  it('should not warning when getInputElement is null', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<AutoComplete placeholder="input here" allowClear />);
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('should not override custom input className', () => {
    render(
      <AutoComplete>
        <Input className="custom" />
      </AutoComplete>,
    );
    expect(screen.getByRole('combobox')).toHaveClass('custom');
  });

  it('deprecated dropdownClassName', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(
      <AutoComplete
        dropdownClassName="legacy"
        open
        options={[{ label: 'little', value: 'little' }]}
        searchValue="l"
      />,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: AutoComplete] `dropdownClassName` is deprecated. Please use `classNames.popup` instead.',
    );
    expect(container.querySelector('.legacy')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('deprecated popupClassName', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(
      <AutoComplete
        popupClassName="legacy"
        open
        options={[{ label: 'little', value: 'little' }]}
        searchValue="l"
      />,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: AutoComplete] `popupClassName` is deprecated. Please use `classNames.popup` instead.',
    );
    expect(container.querySelector('.legacy')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('deprecated dropdownMatchSelectWidth', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <AutoComplete
        dropdownMatchSelectWidth
        open
        options={[{ label: 'little', value: 'little' }]}
      />,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: AutoComplete] `dropdownMatchSelectWidth` is deprecated. Please use `popupMatchSelectWidth` instead.',
    );

    errSpy.mockRestore();
  });

  it('deprecated dropdownStyle', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <AutoComplete
        dropdownStyle={{ color: 'red' }}
        open
        options={[{ label: 'little', value: 'little' }]}
      />,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: AutoComplete] `dropdownStyle` is deprecated. Please use `styles.popup` instead.',
    );

    errSpy.mockRestore();
  });

  it('deprecated dropdownRender', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <AutoComplete
        dropdownRender={(menu) => <div>{menu}</div>}
        open
        options={[{ label: 'little', value: 'little' }]}
      />,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: AutoComplete] `dropdownRender` is deprecated. Please use `popupRender` instead.',
    );

    errSpy.mockRestore();
  });

  it('deprecated onDropdownVisibleChange', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <AutoComplete
        onDropdownVisibleChange={() => {}}
        options={[{ label: 'little', value: 'little' }]}
      />,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: AutoComplete] `onDropdownVisibleChange` is deprecated. Please use `onOpenChange` instead.',
    );

    errSpy.mockRestore();
  });
});
