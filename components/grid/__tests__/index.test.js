import React from 'react';
import { render } from 'enzyme';
import { Col, Row } from '..';

describe('Grid', () => {
  it('should render Col', () => {
    const wrapper = render(
      <Col span="2" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should render Row', () => {
    const wrapper = render(
      <Row />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
