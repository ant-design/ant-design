import React from 'react';
import { mount } from 'enzyme';
// eslint-disable-next-line no-unused-vars
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import { Col, Row } from '..';

jest.mock('rc-util/lib/Dom/canUseDom', () => () => false);

describe('Grid.Server', () => {
  it('use compatible gap logic', () => {
    const wrapper = mount(
      <Row gutter={[8, 16]}>
        <Col />
      </Row>,
    );

    expect(wrapper.find('.ant-row').props().style).toEqual(
      expect.objectContaining({
        marginLeft: -4,
        marginRight: -4,
        marginTop: -8,
        marginBottom: -8,
      }),
    );

    expect(wrapper.find('.ant-col').props().style).toEqual(
      expect.objectContaining({
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 8,
        paddingBottom: 8,
      }),
    );
  });
});
