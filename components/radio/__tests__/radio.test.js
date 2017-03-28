import React from 'react';
import { shallow, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Radio from '../radio';

describe('Radio', () => {
  it('should render correctly', () => {
    const wrapper = render(<Radio className="customized">Test</Radio>);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const wrapper = shallow(
      <Radio
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    wrapper.simulate('mouseenter');
    expect(onMouseEnter).toHaveBeenCalled();

    wrapper.simulate('mouseleave');
    expect(onMouseLeave).toHaveBeenCalled();
  });
});
