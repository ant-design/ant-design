import React from 'react';
import { mount } from 'enzyme';
import { Col, Row } from '..';
// eslint-disable-next-line no-unused-vars
import * as styleChecker from '../../_util/styleChecker';

jest.mock('../../_util/styleChecker', () => ({
  canUseDocElement: () => true,
  isStyleSupport: () => true,
  detectFlexGapSupported: () => true,
}));

describe('Grid.Gap', () => {
  it('should use gap', () => {
    const wrapper = mount(
      <Row gutter={[16, 8]}>
        <Col />
      </Row>,
    );

    expect(wrapper.find('.ant-row').props().style).toEqual(
      expect.objectContaining({
        '--column-gap': '16px',
        '--row-gap': '8px',
      }),
    );
  });
});
