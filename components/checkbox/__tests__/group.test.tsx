import React, { useState } from 'react';

import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import Collapse from '../../collapse';
import Input from '../../input';
import Table from '../../table';
import type { CheckboxValueType } from '../Group';
import type { CheckboxGroupProps } from '../index';
import Checkbox from '../index';

describe('CheckboxGroup', () => {
  mountTest(Checkbox.Group);
  rtlTest(Checkbox.Group);

  it('should work basically', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox.Group options={['Apple', 'Pear', 'Orange']} onChange={onChange} />,
    );
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[0]);
    expect(onChange).toHaveBeenCalledWith(['Apple']);
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[1]);
    expect(onChange).toHaveBeenCalledWith(['Apple', 'Pear']);
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[2]);
    expect(onChange).toHaveBeenCalledWith(['Apple', 'Pear', 'Orange']);
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[1]);
    expect(onChange).toHaveBeenCalledWith(['Apple', 'Orange']);
  });

  it('does not trigger onChange callback of both Checkbox and CheckboxGroup when CheckboxGroup is disabled', () => {
    const onChangeGroup = jest.fn();

    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Pear', value: 'Pear' },
    ];

    const { container } = render(
      <Checkbox.Group options={options} onChange={onChangeGroup} disabled />,
    );
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[0]);
    expect(onChangeGroup).not.toHaveBeenCalled();
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[1]);
    expect(onChangeGroup).not.toHaveBeenCalled();
  });

  it('does not prevent onChange callback from Checkbox when CheckboxGroup is not disabled', () => {
    const onChangeGroup = jest.fn();

    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange', disabled: true },
    ];

    const { container } = render(<Checkbox.Group options={options} onChange={onChangeGroup} />);
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[0]);
    expect(onChangeGroup).toHaveBeenCalledWith(['Apple']);
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[1]);
    expect(onChangeGroup).toHaveBeenCalledWith(['Apple']);
  });

  it('all children should have a name property', () => {
    const { container } = render(<Checkbox.Group name="checkboxgroup" options={['Yes', 'No']} />);
    Array.from(container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')).forEach(
      (el) => {
        expect(el.getAttribute('name')).toEqual('checkboxgroup');
      },
    );
  });

  it('passes prefixCls down to checkbox', () => {
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange', style: { fontSize: 12 } },
    ];

    const { container } = render(<Checkbox.Group prefixCls="my-checkbox" options={options} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should be controlled by value', () => {
    const options = [
      { label: 'Apple', value: 'Apple' },
      { label: 'Orange', value: 'Orange' },
    ];
    const renderCheckbox = (props: CheckboxGroupProps) => <Checkbox.Group {...props} />;
    const { container, rerender } = render(renderCheckbox({ options }));
    expect(container.querySelectorAll('.ant-checkbox-checked').length).toBe(0);
    rerender(renderCheckbox({ options, value: 'Apple' as unknown as CheckboxValueType[] }));
    expect(container.querySelectorAll('.ant-checkbox-checked').length).toBe(1);
  });

  // https://github.com/ant-design/ant-design/issues/12642
  it('should trigger onChange in sub Checkbox', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox.Group>
        <Checkbox value="my" onChange={onChange} />
      </Checkbox.Group>,
    );
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[0]);
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0].target.value).toEqual('my');
  });

  // https://github.com/ant-design/ant-design/issues/16376
  it('onChange should filter removed value', () => {
    const onChange = jest.fn();
    const { container, rerender } = render(
      <Checkbox.Group defaultValue={[1]} onChange={onChange}>
        <Checkbox key={1} value={1} />
        <Checkbox key={2} value={2} />
      </Checkbox.Group>,
    );

    rerender(
      <Checkbox.Group defaultValue={[1]} onChange={onChange}>
        <Checkbox key={2} value={2} />
      </Checkbox.Group>,
    );
    fireEvent.click(container.querySelector('.ant-checkbox-input')!);

    expect(onChange).toHaveBeenCalledWith([2]);
  });

  it('checkbox should register value again after value changed', () => {
    const onChange = jest.fn();
    const { container, rerender } = render(
      <Checkbox.Group defaultValue={[1]} onChange={onChange}>
        <Checkbox key={1} value={1} />
      </Checkbox.Group>,
    );

    rerender(
      <Checkbox.Group defaultValue={[1]} onChange={onChange}>
        <Checkbox key={1} value={2} />
      </Checkbox.Group>,
    );

    expect(container.querySelector('.ant-checkbox-input')).toHaveAttribute('checked');
  });

  // https://github.com/ant-design/ant-design/issues/17297
  it('onChange should keep the order of the original values', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox.Group onChange={onChange}>
        <Checkbox key={1} value={1} />
        <Checkbox key={2} value={2} />
        <Checkbox key={3} value={3} />
        <Checkbox key={4} value={4} />
      </Checkbox.Group>,
    );
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[0]);
    expect(onChange).toHaveBeenCalledWith([1]);
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[1]);
    expect(onChange).toHaveBeenCalledWith([1, 2]);
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[0]);
    expect(onChange).toHaveBeenCalledWith([2]);
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[0]);
    expect(onChange).toHaveBeenCalledWith([1, 2]);
  });

  // https://github.com/ant-design/ant-design/issues/21134
  it('should work when checkbox is wrapped by other components', () => {
    const { container } = render(
      <Checkbox.Group>
        <Collapse
          items={[
            {
              key: 'test panel',
              label: 'test panel',
              children: (
                <div>
                  <Checkbox value="1">item</Checkbox>
                </div>
              ),
            },
          ]}
          bordered={false}
        />
      </Checkbox.Group>,
    );

    fireEvent.click(
      container.querySelector('.ant-collapse-item')?.querySelector('.ant-collapse-header')!,
    );
    fireEvent.click(container.querySelector('.ant-checkbox-input')!);
    expect(container.querySelectorAll('.ant-checkbox-checked').length).toBe(1);
    fireEvent.click(container.querySelector('.ant-checkbox-input')!);
    expect(container.querySelectorAll('.ant-checkbox-checked').length).toBe(0);
  });

  it('skipGroup', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox.Group onChange={onChange}>
        <Checkbox value={1} />
        <Checkbox value={2} skipGroup />
      </Checkbox.Group>,
    );
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[1]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('Table rowSelection', () => {
    const onChange = jest.fn();
    const { container } = render(
      <Checkbox.Group onChange={onChange}>
        <Table
          dataSource={[{ key: 1, value: '1' }]}
          columns={[{ title: 'title', dataIndex: 'value' }]}
          rowSelection={{}}
        />
      </Checkbox.Group>,
    );
    fireEvent.click(container.querySelectorAll('.ant-checkbox-input')[1]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should get div ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Checkbox.Group options={['Apple', 'Pear', 'Orange']} ref={ref} />);
    expect(ref.current?.nodeName).toBe('DIV');
  });

  it('should support number option', () => {
    const onChange = jest.fn();

    const { container } = render(
      <Checkbox.Group options={[1, 'Pear', 'Orange']} onChange={onChange} />,
    );

    fireEvent.click(container.querySelector('.ant-checkbox-input')!);
    expect(onChange).toHaveBeenCalledWith([1]);
  });

  it('should store latest checkbox value if changed', () => {
    const onChange = jest.fn();

    const Demo: React.FC = () => {
      const [v, setV] = useState('');

      React.useEffect(() => {
        setV('1');
      }, []);

      return (
        <div>
          <Input className="my-input" value={v} onChange={(e) => setV(e.target.value)} />
          <Checkbox.Group defaultValue={['length1']} style={{ width: '100%' }} onChange={onChange}>
            <Checkbox className="target-checkbox" value={v ? `length${v}` : 'A'}>
              A
            </Checkbox>
          </Checkbox.Group>
        </div>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('.ant-checkbox-input')!);
    expect(onChange).toHaveBeenCalledWith([]);
    fireEvent.click(container.querySelector('.ant-checkbox-input')!);
    expect(onChange).toHaveBeenCalledWith(['length1']);
    fireEvent.change(container.querySelector('.ant-input')!, { target: { value: '' } });
    fireEvent.click(container.querySelector('.ant-checkbox-input')!);
    expect(onChange).toHaveBeenCalledWith(['A']);
  });

  it('options support id', () => {
    const { container } = render(
      <Checkbox.Group options={[{ label: 'bamboo', id: 'bamboo', value: 'bamboo' }]} />,
    );
    expect(container.querySelector('#bamboo')).toBeTruthy();
  });
});
