import React from 'react';
import { render } from 'enzyme';
import Icon from '..';

describe('Icon', () => {
  it('should render to a <i class="xxx"><svg>...</svg></i>', () => {
    const wrapper = render(
      <Icon type="message" className="my-icon-classname" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
