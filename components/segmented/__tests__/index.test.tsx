import React, { useState } from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render, waitFor } from '../../../tests/utils';
import type { SegmentedValue } from '../index';
import Segmented from '../index';

// Make CSSMotion working without transition
jest.mock('@rc-component/motion/lib/util/motion', () => ({
  ...jest.requireActual('@rc-component/motion/lib/util/motion'),
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
  mountTest(() => <Segmented options={[]} />);
  rtlTest(() => <Segmented options={[]} />);

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
          { label: <div className="little">Monthly</div>, value: 'Monthly' },
        ]}
      />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();

    expectMatchChecked(container, [true, false, false]);

    expect(container.querySelector('#weekly')?.textContent).toContain('Weekly');
    expect(container.querySelector('.little')?.textContent).toContain('Monthly');
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

    expect(container.querySelectorAll(`label.${prefixCls}-item`)[0]).toHaveClass(
      `${prefixCls}-item-selected`,
    );

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
    expect(container.querySelectorAll(`label.${prefixCls}-item`)[1]).toHaveClass(
      `${prefixCls}-item-disabled`,
    );
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
    expect(container.querySelectorAll(`.${prefixCls}`)[0]).toHaveClass(`${prefixCls}-disabled`);

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
    expect(container.querySelectorAll(`label.${prefixCls}-item`)[0]).toHaveClass(
      `${prefixCls}-item-selected`,
    );

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

    expect(container.querySelectorAll(`.${prefixCls}`)[0]).toHaveClass(`${prefixCls}-block`);
  });

  it('render segmented with `size#small`', () => {
    const { asFragment, container } = render(
      <Segmented size="small" options={['Daily', 'Weekly', 'Monthly']} />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();

    expect(container.querySelectorAll(`.${prefixCls}`)[0]).toHaveClass(`${prefixCls}-sm`);
  });

  it('render segmented with `size#large`', () => {
    const { asFragment, container } = render(
      <Segmented size="large" options={['Daily', 'Weekly', 'Monthly']} />,
    );

    expect(asFragment().firstChild).toMatchSnapshot();

    expect(container.querySelectorAll(`.${prefixCls}`)[0]).toHaveClass(`${prefixCls}-lg`);
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

  it('all children should have a name property', () => {
    const GROUP_NAME = 'GROUP_NAME';
    const { container } = render(
      <Segmented options={['iOS', 'Android', 'Web']} name={GROUP_NAME} />,
    );

    container.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((el) => {
      expect(el.name).toEqual(GROUP_NAME);
    });
  });

  // ============================= orientation =============================
  describe('orientation attribute', () => {
    it('vertical=true orientation=horizontal, result orientation=horizontal', () => {
      const { container } = render(
        <Segmented vertical orientation="horizontal" options={['Daily', 'Weekly', 'Monthly']} />,
      );
      expect(container.querySelector<HTMLDivElement>('.ant-segmented-vertical')).toBeNull();
    });

    it('orientation=vertical, result orientation=vertical', () => {
      const { container } = render(
        <Segmented orientation="vertical" options={['Daily', 'Weekly', 'Monthly']} />,
      );
      expect(container.querySelector<HTMLDivElement>('.ant-segmented-vertical')).not.toBeNull();
    });
  });

  describe('toolTip for optionItem ', () => {
    it('Configuring tooltip in the options should display the corresponding information', async () => {
      const { container } = render(
        <Segmented
          orientation="vertical"
          options={[
            { label: 'Daily', value: 'Daily', tooltip: 'hello Daily' },
            'Weekly',
            { label: 'Monthly', value: 'Monthly', tooltip: 'hello Monthly' },
          ]}
        />,
      );
      const itemList = container.querySelectorAll('.ant-segmented-item');
      fireEvent.mouseEnter(itemList[0]);
      fireEvent.mouseEnter(itemList[1]);
      fireEvent.mouseEnter(itemList[2]);
      await waitFor(() => {
        const tooltipList = document.querySelectorAll('.ant-tooltip');
        expect(tooltipList).toHaveLength(2);
        const tooltipInnerList = document.querySelectorAll('.ant-tooltip-container');
        expect(tooltipInnerList).toHaveLength(2);
        expect(tooltipInnerList[0]?.textContent).toBe('hello Daily');
        expect(tooltipInnerList[1]?.textContent).toBe('hello Monthly');
      });
    });
  });
});
