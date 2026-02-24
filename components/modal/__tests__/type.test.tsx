import * as React from 'react';

import Modal from '..';

describe('Modal.typescript', () => {
  it('Modal.okType', () => {
    const modal = <Modal okType="danger" />;

    expect(modal).toBeTruthy();
  });

  it('Modal.styles', () => {
    const style: React.CSSProperties = {
      position: 'absolute',
    };
    const modal = (
      <Modal
        styles={{
          header: style,
          body: style,
          footer: style,
          mask: style,
          wrapper: style,
          container: style,
        }}
      />
    );

    expect(modal).toBeTruthy();
  });

  it('Modal.onCancel should support keyboard event', () => {
    const onCancel: React.ComponentProps<typeof Modal>['onCancel'] = (e) => {
      if (e instanceof KeyboardEvent) {
        const key = e.key;
        expect(key).toBeTruthy();
      }
    };

    const modal = <Modal onCancel={onCancel} />;

    expect(modal).toBeTruthy();
  });
});
