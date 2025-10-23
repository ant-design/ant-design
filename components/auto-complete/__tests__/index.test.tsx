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

  it('should support classNames and styles', () => {
    const customClassNames = {
      root: 'custom-root',
      input: 'custom-input',
      prefix: 'custom-prefix',
      placeholder: 'custom-placeholder',
      content: 'custom-content',
      popup: {
        root: 'custom-popup',
        list: 'custom-list',
        listItem: 'custom-list-item',
      },
    };
    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      input: { color: 'rgb(0, 128, 0)' },
      prefix: { color: 'rgb(255, 165, 0)' },
      placeholder: { color: 'rgb(255, 192, 203)' },
      content: { color: 'rgb(165, 42, 42)' },
      popup: {
        root: { color: 'rgb(128, 0, 128)' },
        list: { color: 'rgb(0, 0, 255)' },
        listItem: { color: 'rgb(255, 255, 0)' },
      },
    };
    const { container } = render(
      <AutoComplete
        options={[{ label: '123', value: '123' }]}
        classNames={customClassNames}
        styles={customStyles}
        prefix={<span>prefix</span>}
        placeholder="placeholder text"
        open
      />,
    );

    const root = container.querySelector('.ant-select-auto-complete');
    const input = container.querySelector('.ant-select-selection-search-input');
    const prefix = container.querySelector('.ant-select-prefix');
    const placeholder = container.querySelector('.ant-select-selection-placeholder');
    const content = container.querySelector('.ant-select-selector');
    const list = container.querySelector('.rc-virtual-list');
    const listItem = container.querySelector('.ant-select-item-option');
    const popup = container.querySelector('.ant-select-dropdown');

    expect(root).toHaveClass(customClassNames.root);
    if (input) expect(input).toHaveClass(customClassNames.input);
    if (prefix) expect(prefix).toHaveClass(customClassNames.prefix);
    if (placeholder) expect(placeholder).toHaveClass(customClassNames.placeholder);
    if (content) expect(content).toHaveClass(customClassNames.content);
    if (list) expect(list).toHaveClass(customClassNames.popup.list);
    if (listItem) expect(listItem).toHaveClass(customClassNames.popup.listItem);
    if (popup) expect(popup).toHaveClass(customClassNames.popup.root);

    expect(root).toHaveStyle(customStyles.root);
    if (input) expect(input).toHaveStyle(customStyles.input);
    if (prefix) expect(prefix).toHaveStyle(customStyles.prefix);
    if (placeholder) expect(placeholder).toHaveStyle(customStyles.placeholder);
    if (content) expect(content).toHaveStyle(customStyles.content);
    if (list) expect(list).toHaveStyle(customStyles.popup.list);
    if (listItem) expect(listItem).toHaveStyle(customStyles.popup.listItem);
    if (popup) expect(popup).toHaveStyle(customStyles.popup.root);
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
      'Warning: [antd: AutoComplete] `popupClassName` is deprecated. Please use `classNames.popup.root` instead.',
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
        dropdownStyle={{ color: 'rgb(255, 0, 0)' }}
        open
        options={[{ label: 'little', value: 'little' }]}
      />,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: AutoComplete] `dropdownStyle` is deprecated. Please use `styles.popup.root` instead.',
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
