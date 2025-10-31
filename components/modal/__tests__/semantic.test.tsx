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

describe('Modal.Semantic', () => {
  it('should apply custom styles to Modal', () => {
    const customClassNames = {
      root: 'custom-root',
      mask: 'custom-mask',
      wrapper: 'custom-wrapper',
      header: 'custom-header',
      title: 'custom-title',
      body: 'custom-body',
      footer: 'custom-footer',
    };
    const customStyles = {
      root: { color: 'red' },
      mask: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
      wrapper: { padding: '20px' },
      header: { backgroundColor: 'blue' },
      title: { fontSize: '20px' },
      body: { color: 'green' },
      footer: { color: 'yellow' },
    };

    render(<Modal classNames={customClassNames} styles={customStyles} open title="title" />);

    const rootElement = document.querySelector<HTMLElement>('.ant-modal-root');
    const maskElement = document.querySelector<HTMLElement>('.ant-modal-mask');
    const wrapperElement = document.querySelector<HTMLElement>('.ant-modal-wrap');
    const headerElement = document.querySelector<HTMLElement>('.ant-modal-header');
    const titleElement = document.querySelector<HTMLElement>('.ant-modal-title');
    const bodyElement = document.querySelector<HTMLElement>('.ant-modal-body');
    const footerElement = document.querySelector<HTMLElement>('.ant-modal-footer');

    // check classNames
    expect(rootElement).toHaveClass('custom-root');
    expect(maskElement).toHaveClass('custom-mask');
    expect(wrapperElement).toHaveClass('custom-wrapper');
    expect(headerElement).toHaveClass('custom-header');
    expect(titleElement).toHaveClass('custom-title');
    expect(bodyElement).toHaveClass('custom-body');
    expect(footerElement).toHaveClass('custom-footer');

    // check styles
    expect(rootElement).toHaveStyle({ color: 'red' });
    expect(maskElement).toHaveStyle({ backgroundColor: 'rgba(0, 0, 0, 0.5)' });
    expect(wrapperElement).toHaveStyle({ padding: '20px' });
    expect(headerElement).toHaveStyle({ backgroundColor: 'blue' });
    expect(titleElement).toHaveStyle({ fontSize: '20px' });
    expect(bodyElement).toHaveStyle({ color: 'green' });
    expect(footerElement).toHaveStyle({ color: 'yellow' });
  });

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
