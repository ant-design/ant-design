import React from 'react';
import { Modal } from 'antd';

import Image from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

describe('Image', () => {
  mountTest(Image);
  rtlTest(Image);
  it('Image preview props set false', () => {
    const { container } = render(<Image src={src} preview={false} />);

    fireEvent.click(container.querySelector('.ant-image')!);
    expect(container.querySelector('.ant-image-preview-root')).toBe(null);
  });
  it('Group preview props set false', () => {
    const { container } = render(
      <Image.PreviewGroup preview={false}>
        <Image src={src} />
      </Image.PreviewGroup>,
    );

    fireEvent.click(container.querySelector('.ant-image')!);

    expect(container.querySelector('.ant-image-preview-root')).toBe(null);
  });

  it('Default preview props', () => {
    render(<Image src={src} preview={{ open: true }} />);
    expect(document.querySelector('.ant-image-preview')).toHaveClass('ant-image-preview-fade');
  });
  it('Default Group preview props', () => {
    render(
      <Image.PreviewGroup preview={{ open: true }}>
        <Image src={src} />
      </Image.PreviewGroup>,
    );

    expect(document.querySelector('.ant-image-preview')).toHaveClass('ant-image-preview-fade');
  });
  it('Customize preview props', () => {
    render(
      <Image
        src={src}
        preview={{
          open: true,
          motionName: 'abc',
          getContainer: false,
        }}
      />,
    );

    expect(document.querySelector('.ant-image-preview')).not.toBe(null);
    expect(document.querySelector('.ant-image-preview')).toHaveClass('abc');
  });
  it('Customize Group preview props', () => {
    render(
      <Image.PreviewGroup preview={{ open: true, motionName: 'abc' }}>
        <Image src={src} />
      </Image.PreviewGroup>,
    );

    expect(document.querySelector('.ant-image-preview')).toHaveClass('abc');
  });
  it('ConfigProvider getPopupContainer', () => {
    const { container, baseElement } = render(
      <>
        <div className="container" />
        <ConfigProvider getPopupContainer={() => document.querySelector('.container')!}>
          <Image src={src} />
        </ConfigProvider>
      </>,
    );
    fireEvent.click(container.querySelector('.ant-image')!);
    expect(baseElement.querySelector('.container')?.children.length).not.toBe(0);
  });
  it('Preview should support rootClassName', () => {
    const { baseElement } = render(
      <Image.PreviewGroup preview={{ open: true, rootClassName: 'test-root-class' }}>
        <Image src={src} />
      </Image.PreviewGroup>,
    );

    expect(baseElement.querySelector('.test-root-class')).toBeTruthy();
  });
  it('Image.PreviewGroup preview in a nested modal where z-index Settings should be correct', () => {
    const App = () => (
      <Modal open>
        <Modal open>
          <Modal open>
            <Image
              width={200}
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              preview={{
                open: true,
                rootClassName: 'test-image-preview-class',
              }}
            />
            <Image.PreviewGroup
              preview={{
                open: true,
                rootClassName: 'test-image-preview-group-class',
              }}
            >
              <Image
                width={200}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <Image
                width={200}
                src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
              />
            </Image.PreviewGroup>
          </Modal>
        </Modal>
      </Modal>
    );
    render(<App />);

    expect(document.querySelector('.test-image-preview-class') as HTMLElement).toHaveStyle({
      zIndex: '1301',
    });

    expect(document.querySelector('.test-image-preview-group-class') as HTMLElement).toHaveStyle({
      zIndex: '1301',
    });
  });

  it('support classnames and styles', () => {
    const customClassNames = {
      root: 'props-root',
      image: 'props-image',
      cover: 'props-cover',
    };
    const customStyles = {
      root: { color: 'red' },
      image: { color: 'yellow' },
      cover: { color: 'blue' },
    };
    const previewClassNames = {
      cover: 'preview-cover',
      root: 'preview-root',
      mask: 'preview-mask',
      body: 'preview-body',
      footer: 'preview-footer',
      actions: 'preview-actions',
    };
    const previewStyles = {
      cover: { color: 'red' },
      root: { color: 'yellow' },
      mask: { color: 'blue' },
      body: { color: 'green' },
      footer: { color: 'black' },
      actions: { color: 'white' },
    };

    render(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        classNames={customClassNames}
        styles={customStyles}
        preview={{
          classNames: previewClassNames,
          styles: previewStyles,
          open: true,
        }}
      />,
    );

    // Match classnames and styles: Image
    expect(document.querySelector('.ant-image')).toHaveClass(customClassNames.root);
    expect(document.querySelector('.ant-image')).toHaveStyle(customStyles.root);

    expect(document.querySelector('.ant-image-img')).toHaveClass(customClassNames.image);
    expect(document.querySelector('.ant-image-img')).toHaveStyle(customStyles.image);

    expect(document.querySelector('.ant-image-cover')).toHaveClass(previewClassNames.cover);
    expect(document.querySelector('.ant-image-cover')).toHaveStyle(previewStyles.cover);

    // Match classnames and styles: Preview
    expect(document.querySelector('.ant-image-preview')).toHaveClass(previewClassNames.root);
    expect(document.querySelector('.ant-image-preview')).toHaveStyle(previewStyles.root);

    expect(document.querySelector('.ant-image-preview-mask')).toHaveClass(previewClassNames.mask);
    expect(document.querySelector('.ant-image-preview-mask')).toHaveStyle(previewStyles.mask);

    expect(document.querySelector('.ant-image-preview-body')).toHaveClass(previewClassNames.body);
    expect(document.querySelector('.ant-image-preview-body')).toHaveStyle(previewStyles.body);

    expect(document.querySelector('.ant-image-preview-footer')).toHaveClass(
      previewClassNames.footer,
    );
    expect(document.querySelector('.ant-image-preview-footer')).toHaveStyle(previewStyles.footer);

    expect(document.querySelector('.ant-image-preview-actions')).toHaveClass(
      previewClassNames.actions,
    );
    expect(document.querySelector('.ant-image-preview-actions')).toHaveStyle(previewStyles.actions);
  });
});
