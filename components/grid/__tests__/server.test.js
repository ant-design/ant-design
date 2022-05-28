import { mount } from 'enzyme';
import React from 'react';
import { Col, Row } from '..';

describe('Grid.Server', () => {
  it('use compatible gap logic', () => {
    const wrapper = mount(
      <Row gutter={[8, 16]}>
        <Col />
      </Row>,
    );

    expect(wrapper.find('.ant-row').props().style).toEqual(
      expect.objectContaining({
        '--row-gutter-x': '8px',
        '--row-gutter-y': '16px',
      }),
    );
  });
});
