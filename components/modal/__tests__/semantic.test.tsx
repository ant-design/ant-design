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
      root: { padding: 10 },
      mask: { padding: 20 },
      wrapper: { padding: 30 },
      header: { padding: 40 },
      title: { padding: 50 },
      body: { padding: 60 },
      footer: { padding: 70 },
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
    expect(rootElement).toHaveStyle({ padding: customStyles.root.padding });
    expect(maskElement).toHaveStyle({ padding: customStyles.mask.padding });
    expect(wrapperElement).toHaveStyle({ padding: customStyles.wrapper.padding });
    expect(headerElement).toHaveStyle({ padding: customStyles.header.padding });
    expect(titleElement).toHaveStyle({ padding: customStyles.title.padding });
    expect(bodyElement).toHaveStyle({ padding: customStyles.body.padding });
    expect(footerElement).toHaveStyle({ padding: customStyles.footer.padding });
  });

  it('Modal should apply dynamic classNames and styles from props function', () => {
    const { rerender } = render(
      <Modal open classNames={classNames} styles={styles}>
        test
      </Modal>,
    );
    const root = document.querySelector<HTMLDivElement>('.ant-modal-root');
    expect(root).toHaveClass('modal-props-width-default');
    expect(root).toHaveStyle({ backgroundColor: '#fff' });
    rerender(
      <Modal open classNames={classNames} styles={styles} width={999}>
        test
      </Modal>,
    );
    expect(root).toHaveClass('modal-props-width-other');
    expect(root).toHaveStyle({ backgroundColor: '#000' });
  });
});
