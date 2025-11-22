import React from 'react';

import Image from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';
import type { ImageProps } from '../index';

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
const alt = 'test image';

describe('Image.Semantic', () => {
  mountTest(Image);
  rtlTest(Image);
  it('support classnames and styles', () => {
    const customClassNames = {
      root: 'props-root',
      image: 'props-image',
      cover: 'props-cover',
    };
    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      image: { color: 'rgb(255, 255, 0)' },
      cover: { color: 'rgb(0, 0, 255)' },
    };
    const previewClassNames = {
      root: 'preview-root',
      mask: 'preview-mask',
      body: 'preview-body',
      footer: 'preview-footer',
      actions: 'preview-actions',
    };
    const previewStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      mask: { color: 'rgb(0, 0, 255)' },
      body: { color: 'rgb(0, 255, 0)' },
      footer: { color: 'rgb(0, 0, 0)' },
      actions: { color: 'rgb(255, 255, 255)' },
    };

    render(
      <Image
        alt={alt}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        classNames={{
          ...customClassNames,
          popup: previewClassNames,
        }}
        styles={{
          ...customStyles,
          popup: previewStyles,
        }}
        preview={{
          open: true,
        }}
      />,
    );

    expect(document.querySelector('.ant-image')).toHaveClass(customClassNames.root);
    expect(document.querySelector('.ant-image')).toHaveStyle(customStyles.root);

    expect(document.querySelector('.ant-image-img')).toHaveClass(customClassNames.image);
    expect(document.querySelector('.ant-image-img')).toHaveStyle(customStyles.image);

    expect(document.querySelector('.ant-image-cover')).toHaveClass(customClassNames.cover);
    expect(document.querySelector('.ant-image-cover')).toHaveStyle(customStyles.cover);

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
  it('support classNames and styles as functions', () => {
    render(
      <Image
        src={src}
        alt={alt}
        preview={{ open: true }}
        classNames={(info) => ({
          root: info.props.preview ? 'image-with-preview' : 'image-no-preview',
          image: 'dynamic-image',
          cover: 'dynamic-cover',
          popup: {
            root: 'dynamic-popup-root',
            mask: 'dynamic-popup-mask',
            body: 'dynamic-popup-body',
            footer: 'dynamic-popup-footer',
            actions: 'dynamic-popup-actions',
          },
        })}
        styles={(info) => ({
          root: {
            backgroundColor: info.props.preview ? 'lightblue' : 'lightgray',
            width: '200px',
          },
          image: {
            borderRadius: info.props.preview ? '8px' : '4px',
          },
          cover: {
            opacity: info.props.preview ? '0.8' : '0.5',
          },
          popup: {
            root: { backgroundColor: 'rgba(0, 0, 0, 0.9)' },
            mask: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
            body: { padding: '20px' },
            footer: { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            actions: { gap: '16px' },
          },
        })}
      />,
    );

    expect(document.querySelector('.ant-image')).toHaveClass('image-with-preview');
    expect(document.querySelector('.ant-image-img')).toHaveClass('dynamic-image');
    expect(document.querySelector('.ant-image-cover')).toHaveClass('dynamic-cover');

    expect(document.querySelector('.ant-image')).toHaveAttribute('style');
    const rootStyle = document.querySelector('.ant-image')?.getAttribute('style');
    expect(rootStyle).toContain('background-color: lightblue');
    expect(rootStyle).toContain('width: 200px');

    expect(document.querySelector('.ant-image-img')).toHaveAttribute('style');
    const imageStyle = document.querySelector('.ant-image-img')?.getAttribute('style');
    expect(imageStyle).toContain('border-radius: 8px');

    // Test preview popup dynamic classNames and styles
    expect(document.querySelector('.ant-image-preview')).toHaveClass('dynamic-popup-root');
    expect(document.querySelector('.ant-image-preview-mask')).toHaveClass('dynamic-popup-mask');
    expect(document.querySelector('.ant-image-preview-body')).toHaveClass('dynamic-popup-body');
    expect(document.querySelector('.ant-image-preview-footer')).toHaveClass('dynamic-popup-footer');
    expect(document.querySelector('.ant-image-preview-actions')).toHaveClass(
      'dynamic-popup-actions',
    );
  });

  it('should render with classNames and styles when passed as functions to PreviewGroup', () => {
    const classNamesFn: ImageProps['classNames'] = (info) => ({
      root: info.props.preview ? 'fn-root' : 'fn-root-no',
      image: 'fn-img',
      cover: 'fn-cover',
      popup: {
        root: 'fn-popup-root',
        mask: 'fn-popup-mask',
      },
    });

    const stylesFn: ImageProps['styles'] = (info) => ({
      root: { border: info.props.preview ? '1px solid blue' : '1px solid gray' },
      image: { borderRadius: info.props.preview ? 4 : 2 },
      popup: { root: { background: info.props.preview ? 'white' : 'black' } },
    });

    const { container } = render(
      <Image.PreviewGroup preview={{ open: false }} classNames={classNamesFn} styles={stylesFn}>
        <Image src="https://example.com/image.png" />
      </Image.PreviewGroup>,
    );

    expect(container.innerHTML).toMatchSnapshot();
  });

  it('should render with custom classNames and styles when passed to PreviewGroup', () => {
    const classNamesObject: ImageProps['classNames'] = {
      root: 'test-root',
      image: 'test-img',
      cover: 'test-cover',
      popup: {
        root: 'test-popup-root',
        mask: 'test-popup-mask',
      },
    };

    const stylesObject: ImageProps['styles'] = {
      root: { border: '1px solid red' },
      image: { borderRadius: 2 },
      popup: { root: { background: 'black' } },
    };

    const { container } = render(
      <Image.PreviewGroup
        preview={{ open: false }}
        classNames={classNamesObject}
        styles={stylesObject}
      >
        <Image src="https://example.com/image.png" />
      </Image.PreviewGroup>,
    );

    expect(container.innerHTML).toMatchSnapshot();
  });
});
