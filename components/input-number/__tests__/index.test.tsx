import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import React from 'react';
import InputNumber from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import Button from '../../button';

describe('InputNumber', () => {
  focusTest(InputNumber, { refFocus: true });
  mountTest(InputNumber);
  rtlTest(InputNumber);

  // https://github.com/ant-design/ant-design/issues/13896
  it('should return null when blur a empty input number', () => {
    const onChange = jest.fn();
    const { container } = render(<InputNumber defaultValue="1" onChange={onChange} />);
    fireEvent.change(container.querySelector('input')!, { target: { value: '' } });
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('should call onStep when press up or down button', () => {
    const onStep = jest.fn();
    const { container } = render(<InputNumber defaultValue={1} onStep={onStep} />);
    fireEvent.mouseDown(container.querySelector('.ant-input-number-handler-up')!);
    expect(onStep).toHaveBeenCalledTimes(1);
    expect(onStep).toHaveBeenLastCalledWith(2, { offset: 1, type: 'up' });

    fireEvent.mouseDown(container.querySelector('.ant-input-number-handler-down')!);
    expect(onStep).toHaveBeenCalledTimes(2);
    expect(onStep).toHaveBeenLastCalledWith(1, { offset: 1, type: 'down' });
  });

  it('renders correctly when controls is boolean', () => {
    const { asFragment } = render(<InputNumber controls={false} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('renders correctly when controls is {}', () => {
    const { asFragment } = render(<InputNumber controls={{}} />);
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('renders correctly when controls has custom upIcon and downIcon', () => {
    const { asFragment } = render(
      <InputNumber
        controls={{
          upIcon: <ArrowUpOutlined />,
          downIcon: <ArrowDownOutlined />,
        }}
      />,
    );
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('should support className', () => {
    const { container } = render(
      <InputNumber
        controls={{
          upIcon: <ArrowUpOutlined className="my-class-name" />,
          downIcon: <ArrowDownOutlined className="my-class-name" />,
        }}
      />,
    );
    expect(container.querySelector('.anticon-arrow-up')?.className.includes('my-class-name')).toBe(
      true,
    );
    expect(
      container.querySelector('.anticon-arrow-down')?.className.includes('my-class-name'),
    ).toBe(true);
  });

  it('renders correctly when the controlled mode number is out of range', () => {
    const App: React.FC = () => {
      const [value, setValue] = React.useState<number | null>(1);
      return (
        <>
          <InputNumber min={1} max={10} value={value} onChange={(v) => setValue(v)} />
          <Button
            type="primary"
            onClick={() => {
              setValue(99);
            }}
          >
            Reset
          </Button>
        </>
      );
    };
    const { container } = render(<App />);
    fireEvent.click(container.querySelector('button')!);
    expect(
      container
        .querySelector('.ant-input-number')
        ?.className.includes('ant-input-number-out-of-range'),
    ).toBe(true);
  });
});
