import React from 'react';
import { render } from 'enzyme';
import Icon from '..';

describe('Icon', () => {
  it('should render to a <i class="xxx"></i>', () => {
    const wrapper = render(
      <Icon type="appstore" className="my-icon-classname" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
