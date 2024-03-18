import React from 'react';
import type { RadioGroupProps } from '..';
import Radio, { Button } from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

import { fireEvent, render } from '../../../tests/utils';

describe('Radio Button', () => {
  focusTest(Button, { refFocus: true });
  mountTest(Button);

  rtlTest(Button);

  it('should render correctly', () => {
    const { container } = render(<Button className="customized">Test</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const { container } = render(
      <Button onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />,
    );

    fireEvent.mouseEnter(container.querySelector('label')!);
    expect(onMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(container.querySelector('label')!);
    expect(onMouseLeave).toHaveBeenCalled();
  });
});

describe('Radio Group', () => {
  const RadioGroupComponent = React.forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => (
    <Radio.Group {...props} ref={ref}>
      <Radio value="A">A</Radio>
      <Radio value="B">B</Radio>
      <Radio value="C">C</Radio>
    </Radio.Group>
  ));

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const { container } = render(
      <Radio.Group onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <Radio />
      </Radio.Group>,
    );

    fireEvent.mouseEnter(container.querySelectorAll('div')[0]);
    expect(onMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(container.querySelectorAll('div')[0]);
    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('fire change events when value changes', () => {
    const onChange = jest.fn();

    const { container, rerender } = render(<RadioGroupComponent onChange={onChange} />);

    const radios = container.querySelectorAll('input');

    // controlled component
    rerender(<RadioGroupComponent value="A" onChange={onChange} />);
    fireEvent.click(radios[1]);
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('both of radio and radioGroup will trigger onchange event when they exists', () => {
    const onChange = jest.fn();
    const onChangeRadioGroup = jest.fn();

    const { container } = render(
      <Radio.Group onChange={onChangeRadioGroup}>
        <Radio value="A" onChange={onChange}>
          A
        </Radio>
        <Radio value="B" onChange={onChange}>
          B
        </Radio>
        <Radio value="C" onChange={onChange}>
          C
        </Radio>
      </Radio.Group>,
    );
    const radios = container.querySelectorAll('input');

    // controlled component
    fireEvent.click(radios[1]);
    expect(onChange.mock.calls.length).toBe(1);
    expect(onChangeRadioGroup.mock.calls.length).toBe(1);
  });

  it('Trigger onChange when both of Button and radioGroup exists', () => {
    const onChange = jest.fn();

    const { container, rerender } = render(
      <Radio.Group onChange={onChange}>
        <Button value="A">A</Button>
        <Button value="B">B</Button>
        <Button value="C">C</Button>
      </Radio.Group>,
    );
    const radios = container.querySelectorAll('input');

    // controlled component
    rerender(
      <Radio.Group value="A" onChange={onChange}>
        <Button value="A">A</Button>
        <Button value="B">B</Button>
        <Button value="C">C</Button>
      </Radio.Group>,
    );
    fireEvent.click(radios[1]);
    expect(onChange.mock.calls.length).toBe(1);
  });

  it('should only trigger once when in group with options', () => {
    const onChange = jest.fn();
    const options = [{ label: 'Bamboo', value: 'Bamboo' }];
    const { container } = render(<Radio.Group options={options} onChange={onChange} />);

    fireEvent.click(container.querySelector('input')!);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("won't fire change events when value not changes", () => {
    const onChange = jest.fn();

    const { container, rerender } = render(<RadioGroupComponent onChange={onChange} />);
    const radios = container.querySelectorAll('input');

    // controlled component
    rerender(<RadioGroupComponent value="A" onChange={onChange} />);
    fireEvent.click(radios[0]);
    expect(onChange.mock.calls.length).toBe(0);
  });

  it('all children should have a name property', () => {
    const GROUP_NAME = 'GROUP_NAME';
    const { container } = render(<RadioGroupComponent name={GROUP_NAME} />);
    container.querySelectorAll<HTMLInputElement>('input[type="radio"]').forEach((el) => {
      expect(el.name).toEqual(GROUP_NAME);
    });
  });

  it('passes prefixCls down to radio', () => {
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange', style: { fontSize: 12 } },
    ];
    const { container } = render(<Radio.Group prefixCls="my-radio" options={options} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should forward ref', () => {
    let radioGroupRef: HTMLDivElement;
    const { container } = render(
      <RadioGroupComponent
        ref={(ref: HTMLDivElement) => {
          radioGroupRef = ref;
        }}
      />,
    );

    expect(radioGroupRef!).toBe(container.querySelector('.ant-radio-group'));
  });

  it('should support data-* or aria-* props', () => {
    const { container } = render(
      <RadioGroupComponent data-radio-group-id="radio-group-id" aria-label="radio-group" />,
    );
    expect((container.firstChild as HTMLDivElement)?.getAttribute('data-radio-group-id')).toBe(
      'radio-group-id',
    );
    expect((container.firstChild as HTMLDivElement)?.getAttribute('aria-label')).toBe(
      'radio-group',
    );
  });

  it('Radio type should not be override', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Radio.Group onChange={onChange}>
        <Radio value={1} type="1">
          A
        </Radio>
        <Radio value={2} type="2">
          B
        </Radio>
        <Radio value={3} type="3">
          C
        </Radio>
        <Radio value={4} type="4">
          D
        </Radio>
      </Radio.Group>,
    );
    const radios = container.querySelectorAll('input');
    fireEvent.click(radios[0]);
    expect(onChange).toHaveBeenCalled();
    expect(radios[1].type).toBe('radio');
  });

  describe('value is null or undefined', () => {
    it('use `defaultValue` when `value` is undefined', () => {
      const { container } = render(
        <Radio.Group defaultValue="bamboo" value={undefined}>
          <Button value="bamboo">Bamboo</Button>
        </Radio.Group>,
      );
      expect(container.querySelectorAll('.ant-radio-button-wrapper-checked').length).toBe(1);
    });

    [undefined, null].forEach((newValue) => {
      it(`should set value back when value change back to ${newValue}`, () => {
        const { container, rerender } = render(
          <Radio.Group value="bamboo">
            <Button value="bamboo">Bamboo</Button>
          </Radio.Group>,
        );
        expect(container.querySelectorAll('.ant-radio-button-wrapper-checked').length).toBe(1);
        rerender(
          <Radio.Group value={newValue}>
            <Button value="bamboo">Bamboo</Button>
          </Radio.Group>,
        );
        expect(container.querySelectorAll('.ant-radio-button-wrapper-checked').length).toBe(0);
      });
    });
  });
});
