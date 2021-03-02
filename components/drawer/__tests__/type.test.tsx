import * as React from 'react';
import Drawer from '..';

describe('Drawer.typescript', () => {
  it('Drawer', () => {
    const onClose = jest.fn();
    const wrapper = (
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={false}
        contentWrapperStyle={{
          background: '#f00',
        }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    );

    expect(wrapper).toBeTruthy();
  });
});
