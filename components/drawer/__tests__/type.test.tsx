import * as React from 'react';
import Drawer from '..';

describe('Drawer.typescript', () => {
  it('Drawer', () => {
    const wrapper = (
      <Drawer
        title="Basic Drawer"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    );

    expect(wrapper).toBeTruthy();
  });
});
