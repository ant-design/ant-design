import React from 'react';
import { render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Button from '..';

describe('Button', () => {
  it('renders correctly', () => {
    const wrapper = render(
      <Button>Follow</Button>
    );
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('renders Chinese characters correctly', () => {
    const wrapper = render(
      <Button>按钮</Button>
    );
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });
});
