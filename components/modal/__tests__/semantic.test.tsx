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

    const rootElement = document.querySelector('.ant-modal-root') as HTMLElement;
    const maskElement = document.querySelector('.ant-modal-mask') as HTMLElement;
    const wrapperElement = document.querySelector('.ant-modal-wrap') as HTMLElement;
    const headerElement = document.querySelector('.ant-modal-header') as HTMLElement;
    const titleElement = document.querySelector('.ant-modal-title') as HTMLElement;
    const bodyElement = document.querySelector('.ant-modal-body') as HTMLElement;
    const footerElement = document.querySelector('.ant-modal-footer') as HTMLElement;

    // check classNames
    expect(rootElement).toHaveClass('custom-root');
    expect(maskElement).toHaveClass('custom-mask');
    expect(wrapperElement).toHaveClass('custom-wrapper');
    expect(headerElement).toHaveClass('custom-header');
    expect(titleElement).toHaveClass('custom-title');
    expect(bodyElement).toHaveClass('custom-body');
    expect(footerElement).toHaveClass('custom-footer');

    // check styles
    expect(rootElement.style.color).toBe('red');
    expect(maskElement.style.backgroundColor).toBe('rgba(0, 0, 0, 0.5)');
    expect(wrapperElement.style.padding).toBe('20px');
    expect(headerElement.style.backgroundColor).toBe('blue');
    expect(titleElement.style.fontSize).toBe('20px');
    expect(bodyElement.style.color).toBe('green');
    expect(footerElement.style.color).toBe('yellow');
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
