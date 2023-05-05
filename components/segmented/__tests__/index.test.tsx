import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';

import type { SegmentedValue } from '../index';
import Segmented from '../index';

// Make CSSMotion working without transition
jest.mock('rc-motion/lib/util/motion', () => ({
  ...jest.requireActual('rc-motion/lib/util/motion'),
  supportTransition: false,
}));

const prefixCls = 'ant-segmented';

function expectMatchChecked(container: HTMLElement, checkedList: boolean[]) {
  const inputList = Array.from(
    container.querySelectorAll<HTMLInputElement>(`.${prefixCls}-item-input`),
  );
  expect(inputList).toHaveLength(checkedList.length);

  inputList.forEach((input, i) => {
    const checked = checkedList[i];

    expect(input.checked).toBe(checked);
  });
}

describe('Segmented', () => {
  mountTest(Segmented);
  rtlTest(Segmented);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('render empty segmented', () => {
    const { asFragment } = render(<Segmented options={[]} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('render segmented ok', () => {
    const { asFragment, container } = render(
      <Segmented options={[{ label: 'Daily', value: 'Daily' }, 'Weekly', 'Monthly']} />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();

    expectMatchChecked(container, [true, false, false]);
  });

  it('render label with ReactNode', () => {
    const { asFragment, container } = render(
      <Segmented
        options={[
          { label: 'Daily', value: 'Daily' },
          { label: <div id="weekly">Weekly</div>, value: 'Weekly' },
          { label: <h2>Monthly</h2>, value: 'Monthly' },
        ]}
      />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();

    expectMatchChecked(container, [true, false, false]);

    expect(container.querySelector('#weekly')?.textContent).toContain('Weekly');
    expect(container.querySelectorAll('h2')[0].textContent).toContain('Monthly');
  });

  it('render segmented with defaultValue', () => {
    const { container } = render(
      <Segmented
        options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
        defaultValue="Quarterly"
      />,
    );

    expectMatchChecked(container, [false, false, false, true, false]);
  });

  it('render segmented with string options', () => {
    const handleValueChange = jest.fn();
    const { asFragment, container } = render(
      <Segmented options={['Daily', 'Weekly', 'Monthly']} onChange={handleValueChange} />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();

    expectMatchChecked(container, [true, false, false]);
    expect(
      container
        .querySelectorAll(`label.${prefixCls}-item`)[0]
        .classList.contains(`${prefixCls}-item-selected`),
    ).toBeTruthy();

    fireEvent.click(container.querySelectorAll(`.${prefixCls}-item-input`)[2]);
    expect(handleValueChange).toHaveBeenCalledWith('Monthly');

    expectMatchChecked(container, [false, false, true]);
  });

  it('render segmented with numeric options', () => {
    const handleValueChange = jest.fn();
    const { asFragment, container } = render(
      <Segmented options={[1, 2, 3, 4, 5]} onChange={(value) => handleValueChange(value)} />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
    expectMatchChecked(container, [true, false, false, false, false]);

    fireEvent.click(container.querySelectorAll(`.${prefixCls}-item-input`)[4]);
    expect(handleValueChange).toHaveBeenCalledWith(5);

    expectMatchChecked(container, [false, false, false, false, true]);
  });

  it('render segmented with mixed options', () => {
    const handleValueChange = jest.fn();
    const { asFragment, container } = render(
      <Segmented
        options={['Daily', { label: 'Weekly', value: 'Weekly' }, 'Monthly']}
        onChange={(value) => handleValueChange(value)}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
    expectMatchChecked(container, [true, false, false]);

    fireEvent.click(container.querySelectorAll(`.${prefixCls}-item-input`)[1]);
    expect(handleValueChange).toHaveBeenCalledWith('Weekly');

    expectMatchChecked(container, [false, true, false]);
  });

  it('render segmented with options: disabled', () => {
    const handleValueChange = jest.fn();
    const { asFragment, container } = render(
      <Segmented
        options={['Daily', { label: 'Weekly', value: 'Weekly', disabled: true }, 'Monthly']}
        onChange={(value) => handleValueChange(value)}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(
      container
        .querySelectorAll(`label.${prefixCls}-item`)[1]
        .classList.contains(`${prefixCls}-item-disabled`),
    ).toBeTruthy();
    expect(container.querySelectorAll(`.${prefixCls}-item-input`)[1]).toHaveAttribute('disabled');

    fireEvent.click(container.querySelectorAll(`.${prefixCls}-item-input`)[1]);
    expect(handleValueChange).not.toHaveBeenCalled();

    expectMatchChecked(container, [true, false, false]);

    fireEvent.click(container.querySelectorAll(`.${prefixCls}-item-input`)[2]);
    expect(handleValueChange).toHaveBeenCalledWith('Monthly');
    expect(handleValueChange).toHaveBeenCalledTimes(1);

    expectMatchChecked(container, [false, false, true]);
  });

  it('render segmented: disabled', () => {
    const handleValueChange = jest.fn();
    const { asFragment, container } = render(
      <Segmented
        disabled
        options={['Daily', 'Weekly', 'Monthly']}
        onChange={(value) => handleValueChange(value)}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(
      container.querySelectorAll(`.${prefixCls}`)[0].classList.contains(`${prefixCls}-disabled`),
    ).toBeTruthy();

    fireEvent.click(container.querySelectorAll(`.${prefixCls}-item-input`)[1]);
    expect(handleValueChange).not.toHaveBeenCalled();

    expectMatchChecked(container, [true, false, false]);

    fireEvent.click(container.querySelectorAll(`.${prefixCls}-item-input`)[2]);
    expect(handleValueChange).not.toHaveBeenCalled();

    expectMatchChecked(container, [true, false, false]);
  });

  it('render segmented with className and other html attributes', () => {
    const { container } = render(
      <Segmented
        options={['Daily', 'Monthly', 'Weekly']}
        defaultValue="Weekly"
        className="mock-cls"
        data-test-id="hello"
      />,
    );

    expect(container.querySelector('.mock-cls')).toBeTruthy();
    expect(container.querySelector('[data-test-id]')).toHaveAttribute('data-test-id', 'hello');
  });

  it('render segmented with ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { container } = render(
      <Segmented options={['Daily', 'Monthly', 'Weekly']} defaultValue="Weekly" ref={ref} />,
    );

    expect(ref.current).toBe(container.querySelector(`.${prefixCls}`));
  });

  it('render segmented with controlled mode', async () => {
    const Demo: React.FC = () => {
      const [value, setValue] = useState<SegmentedValue>('Map');
      return (
        <>
          <Segmented options={['Map', 'Transit', 'Satellite']} value={value} onChange={setValue} />
          <div className="value">{value}</div>
          <input
            className="control"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </>
      );
    };
    const { container } = render(<Demo />);
    fireEvent.click(container.querySelectorAll(`.${prefixCls}-item-input`)[0]);
    expect(container.querySelector('.value')?.textContent).toBe('Map');

    fireEvent.click(container.querySelectorAll(`.${prefixCls}-item-input`)[1]);
    expect(container.querySelector('.value')?.textContent).toBe('Transit');
  });

  it('render segmented with options null/undefined', () => {
    const handleValueChange = jest.fn();
    const { asFragment, container } = render(
      <Segmented
        options={[null, undefined, ''] as any}
        disabled
        onChange={(value) => handleValueChange(value)}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(
      Array.from(container.querySelectorAll(`.${prefixCls}-item-label`)).map((n) => n.textContent),
    ).toEqual(['', '', '']);
  });

  it('render segmented with thumb', () => {
    const handleValueChange = jest.fn();
    const { asFragment, container } = render(
      <Segmented
        options={['Map', 'Transit', 'Satellite']}
        onChange={(value) => handleValueChange(value)}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();

    expectMatchChecked(container, [true, false, false]);
    expect(
      container
        .querySelectorAll(`label.${prefixCls}-item`)[0]
        .classList.contains(`${prefixCls}-item-selected`),
    ).toBeTruthy();

    fireEvent.click(container.querySelectorAll(`.${prefixCls}-item-input`)[2]);
    expect(handleValueChange).toHaveBeenCalledWith('Satellite');

    expectMatchChecked(container, [false, false, true]);

    // thumb appeared
    // expect(container.querySelectorAll(`.${prefixCls}-thumb`).length).toBe(1);

    // change selection again
    fireEvent.click(container.querySelectorAll(`.${prefixCls}-item-input`)[1]);
    expect(handleValueChange).toHaveBeenCalledWith('Transit');

    expectMatchChecked(container, [false, true, false]);

    // thumb appeared
    // expect(container.querySelectorAll(`.${prefixCls}-thumb`).length).toBe(1);
  });

  it('render segmented with `block`', () => {
    const { asFragment, container } = render(
      <Segmented block options={['Daily', 'Weekly', 'Monthly']} />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();

    expect(
      container.querySelectorAll(`.${prefixCls}`)[0].classList.contains(`${prefixCls}-block`),
    ).toBeTruthy();
  });

  it('render segmented with `size#small`', () => {
    const { asFragment, container } = render(
      <Segmented size="small" options={['Daily', 'Weekly', 'Monthly']} />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();

    expect(
      container.querySelectorAll(`.${prefixCls}`)[0].classList.contains(`${prefixCls}-sm`),
    ).toBeTruthy();
  });

  it('render segmented with `size#large`', () => {
    const { asFragment, container } = render(
      <Segmented size="large" options={['Daily', 'Weekly', 'Monthly']} />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();

    expect(
      container.querySelectorAll(`.${prefixCls}`)[0].classList.contains(`${prefixCls}-lg`),
    ).toBeTruthy();
  });

  it('render with icons', () => {
    const { asFragment, container } = render(
      <Segmented
        options={[
          {
            value: 'List',
            icon: <BarsOutlined />,
          },
          {
            value: 'Kanban',
            label: 'KanbanYes',
            icon: <AppstoreOutlined />,
          },
        ]}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
    expect(container.querySelectorAll(`span.${prefixCls}-item-icon`).length).toBe(2);
    expect(
      container
        .querySelectorAll(`div.${prefixCls}-item-label`)[1]
        .textContent?.includes('KanbanYes'),
    ).toBeTruthy();
  });
});
