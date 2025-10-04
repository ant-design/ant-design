import React from 'react';

import Modal from '..';
import type { ModalProps } from '..';
import { render } from '../../../tests/utils';

const classNames: ModalProps['classNames'] = (info) => {
  return info.props?.width === 520
    ? { root: 'modal-props-width-default' }
    : { root: 'modal-props-width-other' };
};

const styles: ModalProps['styles'] = (info) => {
  return info.props?.width === 520
    ? { root: { backgroundColor: '#fff' } }
    : { root: { backgroundColor: '#000' } };
};

describe('Modal classNames & styles function', () => {
  it('Modal should apply dynamic classNames and styles from props function', () => {
    const { rerender } = render(
      <Modal open classNames={classNames} styles={styles}>
        test
      </Modal>,
    );
    const root = document.querySelector<HTMLDivElement>('.ant-modal-root');
    expect(root).toHaveClass('modal-props-width-default');
    expect(root).toHaveStyle({ 'background-color': '#fff' });
    rerender(
      <Modal open classNames={classNames} styles={styles} width={999}>
        test
      </Modal>,
    );
    expect(root).toHaveClass('modal-props-width-other');
    expect(root).toHaveStyle({ 'background-color': '#000' });
  });
});
