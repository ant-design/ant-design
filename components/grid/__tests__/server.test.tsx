import React from 'react';
import { mount } from 'enzyme';
import { spyElementPrototype } from 'rc-util/lib/test/domHook';
import { Col, Row } from '..';

describe('Grid.Server', () => {
  let documentElementSpy: ReturnType<typeof spyElementPrototype>;

  beforeAll(() => {
    documentElementSpy = spyElementPrototype(Document, 'documentElement', {
      get: () => null,
    });
  });

  afterAll(() => {
    documentElementSpy.mockRestore();
  });

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
