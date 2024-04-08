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
        open={false}
      >
        <p>Some contents...</p>
      </Drawer>
    );

    expect(wrapper).toBeTruthy();
  });

  it('deprecated style props', () => {
    const style: React.CSSProperties = {
      background: '#f00',
    };
    const wrapper = (
      <Drawer
        contentWrapperStyle={style}
        drawerStyle={style}
        headerStyle={style}
        bodyStyle={style}
        footerStyle={style}
        maskStyle={style}
      >
        <p>Some contents...</p>
      </Drawer>
    );
    expect(wrapper).toBeTruthy();
  });

  it('style and styles props', () => {
    const style: React.CSSProperties = {
      background: '#f00',
    };
    const wrapper = (
      <Drawer
        style={style}
        rootStyle={style}
        styles={{
          header: style,
          body: style,
          footer: style,
          content: style,
          wrapper: style,
          mask: style,
        }}
      >
        <p>Some contents...</p>
      </Drawer>
    );
    expect(wrapper).toBeTruthy();
  });
});
