import React from 'react';
import { mount } from 'enzyme';

import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

import Segmented from '../index';
import type { SegmentedValue } from '../index';

// Make CSSMotion working without transition
jest.mock('rc-motion/lib/util/motion', () => ({
  ...jest.requireActual('rc-motion/lib/util/motion'),
  supportTransition: false,
}));

const prefixCls = 'ant-segmented';

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
    const wrapper = mount(<Segmented options={[]} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render segmented ok', () => {
    const wrapper = mount(
      <Segmented options={[{ label: 'Daily', value: 'Daily' }, 'Weekly', 'Monthly']} />,
    );

    expect(wrapper.render()).toMatchSnapshot();

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([true, false, false]);
  });

  it('render label with ReactNode', () => {
    const wrapper = mount(
      <Segmented
        options={[
          { label: 'Daily', value: 'Daily' },
          { label: <div id="weekly">Weekly</div>, value: 'Weekly' },
          { label: <h2>Monthly</h2>, value: 'Monthly' },
        ]}
      />,
    );

    expect(wrapper.render()).toMatchSnapshot();

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([true, false, false]);

    expect(wrapper.find('#weekly').at(0).text()).toContain('Weekly');
    expect(wrapper.find('h2').at(0).text()).toContain('Monthly');
  });

  it('render segmented with defaultValue', () => {
    const wrapper = mount(
      <Segmented
        options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
        defaultValue="Quarterly"
      />,
    );

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([false, false, false, true, false]);
  });

  it('render segmented with string options', () => {
    const handleValueChange = jest.fn();
    const wrapper = mount(
      <Segmented
        options={['Daily', 'Weekly', 'Monthly']}
        onChange={e => handleValueChange(e.target.value)}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([true, false, false]);
    expect(
      wrapper.find(`.${prefixCls}-item`).at(0).hasClass(`${prefixCls}-item-selected`),
    ).toBeTruthy();

    wrapper.find(`.${prefixCls}-item-input`).at(2).simulate('change');
    expect(handleValueChange).toBeCalledWith('Monthly');

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([false, false, true]);
  });

  it('render segmented with numeric options', () => {
    const handleValueChange = jest.fn();
    const wrapper = mount(
      <Segmented options={[1, 2, 3, 4, 5]} onChange={e => handleValueChange(e.target.value)} />,
    );
    expect(wrapper.render()).toMatchSnapshot();
    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([true, false, false, false, false]);

    wrapper.find(`.${prefixCls}-item-input`).last().simulate('change');
    expect(handleValueChange).toBeCalledWith(5);

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([false, false, false, false, true]);
  });

  it('render segmented with mixed options', () => {
    const handleValueChange = jest.fn();
    const wrapper = mount(
      <Segmented
        options={['Daily', { label: 'Weekly', value: 'Weekly' }, 'Monthly']}
        onChange={e => handleValueChange(e.target.value)}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();

    wrapper.find(`.${prefixCls}-item-input`).at(1).simulate('change');
    expect(handleValueChange).toBeCalledWith('Weekly');

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([false, true, false]);
  });

  it('render segmented with options: disabled', () => {
    const handleValueChange = jest.fn();
    const wrapper = mount(
      <Segmented
        options={['Daily', { label: 'Weekly', value: 'Weekly', disabled: true }, 'Monthly']}
        onChange={e => handleValueChange(e.target.value)}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
    expect(
      wrapper.find(`.${prefixCls}-item`).at(1).hasClass(`${prefixCls}-item-disabled`),
    ).toBeTruthy();
    expect(wrapper.find(`.${prefixCls}-item-input`).at(1).prop('disabled')).toBeTruthy();

    wrapper.find(`.${prefixCls}-item-input`).at(1).simulate('change');
    expect(handleValueChange).not.toBeCalled();

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([true, false, false]);

    wrapper.find(`.${prefixCls}-item-input`).at(2).simulate('change');
    expect(handleValueChange).toBeCalledWith('Monthly');
    expect(handleValueChange).toBeCalledTimes(1);

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([false, false, true]);
  });

  it('render segmented: disabled', () => {
    const handleValueChange = jest.fn();
    const wrapper = mount(
      <Segmented
        disabled
        options={['Daily', 'Weekly', 'Monthly']}
        onChange={e => handleValueChange(e.target.value)}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.find(`.${prefixCls}`).hasClass(`${prefixCls}-disabled`)).toBeTruthy();

    wrapper.find(`.${prefixCls}-item-input`).at(1).simulate('change');
    expect(handleValueChange).not.toBeCalled();

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([true, false, false]);

    wrapper.find(`.${prefixCls}-item-input`).at(2).simulate('change');
    expect(handleValueChange).not.toBeCalled();

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([true, false, false]);
  });

  it('render segmented with className and other html attributes', () => {
    const wrapper = mount(
      <Segmented
        options={['Daily', 'Monthly', 'Weekly']}
        defaultValue="Weekly"
        className="mock-cls"
        data-test-id="hello"
      />,
    );

    expect(wrapper.hasClass('mock-cls')).toBeTruthy();
    expect(wrapper.prop('data-test-id')).toBe('hello');
  });

  it('render segmented with ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    const wrapper = mount(
      <Segmented options={['Daily', 'Monthly', 'Weekly']} defaultValue="Weekly" ref={ref} />,
    );

    expect((wrapper.find(Segmented).getElement() as any).ref).toBe(ref);
  });

  it('render segmented with controlled mode', () => {
    class Demo extends React.Component<{}, { value: SegmentedValue }> {
      state = {
        value: 'Map',
      };

      render() {
        return (
          <Segmented
            options={['Map', 'Transit', 'Satellite']}
            value={this.state.value}
            onChange={e =>
              this.setState({
                value: e.target.value,
              })
            }
          />
        );
      }
    }

    const wrapper = mount<typeof Demo>(<Demo />);
    wrapper.find('Segmented').find(`.${prefixCls}-item-input`).at(0).simulate('change');
    expect(wrapper.state().value).toBe('Map');

    wrapper.find('Segmented').find(`.${prefixCls}-item-input`).at(1).simulate('change');
    expect(wrapper.state().value).toBe('Transit');
  });

  it('render segmented with options null/undefined', () => {
    const handleValueChange = jest.fn();
    const wrapper = mount(
      <Segmented
        options={[null, undefined, ''] as any}
        disabled
        onChange={e => handleValueChange(e.target.value)}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
    expect(wrapper.find(`.${prefixCls}-item-label`).map(n => n.getDOMNode().textContent)).toEqual([
      '',
      '',
      '',
    ]);
  });

  it('render segmented with thumb', () => {
    const handleValueChange = jest.fn();
    const wrapper = mount(
      <Segmented
        options={['Map', 'Transit', 'Satellite']}
        onChange={e => handleValueChange(e.target.value)}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([true, false, false]);
    expect(
      wrapper.find(`.${prefixCls}-item`).at(0).hasClass(`${prefixCls}-item-selected`),
    ).toBeTruthy();

    wrapper.find(`.${prefixCls}-item-input`).at(2).simulate('change');
    expect(handleValueChange).toBeCalledWith('Satellite');

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([false, false, true]);

    // thumb appeared
    expect(wrapper.find(`.${prefixCls}-thumb`).length).toBe(1);

    // change selection again
    wrapper.find(`.${prefixCls}-item-input`).at(1).simulate('change');
    expect(handleValueChange).toBeCalledWith('Transit');

    expect(
      wrapper
        .find(`.${prefixCls}-item-input`)
        .map(el => (el.getDOMNode() as HTMLInputElement).checked),
    ).toEqual([false, true, false]);

    // thumb appeared
    expect(wrapper.find(`.${prefixCls}-thumb`).length).toBe(1);
  });

  it('render segmented with `block`', () => {
    const wrapper = mount(<Segmented block options={['Daily', 'Weekly', 'Monthly']} />);

    expect(wrapper.render()).toMatchSnapshot();

    expect(wrapper.find(`.${prefixCls}`).at(0).hasClass(`${prefixCls}-block`)).toBeTruthy();
  });

  it('render segmented with `size#small`', () => {
    const wrapper = mount(<Segmented size="small" options={['Daily', 'Weekly', 'Monthly']} />);

    expect(wrapper.render()).toMatchSnapshot();

    expect(wrapper.find(`.${prefixCls}`).at(0).hasClass(`${prefixCls}-sm`)).toBeTruthy();
  });

  it('render segmented with `size#large`', () => {
    const wrapper = mount(<Segmented size="large" options={['Daily', 'Weekly', 'Monthly']} />);

    expect(wrapper.render()).toMatchSnapshot();

    expect(wrapper.find(`.${prefixCls}`).at(0).hasClass(`${prefixCls}-lg`)).toBeTruthy();
  });
});
