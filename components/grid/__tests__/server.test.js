import React from 'react';
import { mount } from 'enzyme';
import { Col, Row } from '..';
// eslint-disable-next-line no-unused-vars
import * as styleChecker from '../../_util/styleChecker';

jest.mock('../../_util/styleChecker', () => ({
  canUseDocElement: () => false,
  isStyleSupport: () => false,
  isFlexGapSupported: false,
}));

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
