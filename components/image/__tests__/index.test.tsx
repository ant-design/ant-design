import React from 'react';
import { Modal } from 'antd';

import Image from '..';
import type { MaskType } from '../../_util/hooks/useMergedMask';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import type { ImageProps } from '../index';

const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
const alt = 'test image';

describe('Image', () => {
  mountTest(Image);
  rtlTest(Image);
  it('Image preview props set false', () => {
    const { container } = render(<Image alt={alt} src={src} preview={false} />);

    fireEvent.click(container.querySelector('.ant-image')!);
    expect(container.querySelector('.ant-image-preview-root')).toBe(null);
  });
  it('Group preview props set false', () => {
    const { container } = render(
      <Image.PreviewGroup preview={false}>
        <Image alt={alt} src={src} />
      </Image.PreviewGroup>,
    );

    fireEvent.click(container.querySelector('.ant-image')!);

    expect(container.querySelector('.ant-image-preview-root')).toBe(null);
  });

  it('Default preview props', () => {
    render(<Image alt={alt} src={src} preview={{ open: true }} />);
    expect(document.querySelector('.ant-image-preview')).toHaveClass('ant-image-preview-fade');
  });

  it('Default Group preview props', () => {
    const { baseElement } = render(
      <Image.PreviewGroup preview={{ open: true }}>
        <Image alt={alt} src={src} />
      </Image.PreviewGroup>,
    );
    expect(baseElement).toMatchSnapshot();
    expect(document.querySelector('.ant-image-preview')).toHaveClass('ant-image-preview-fade');
  });

  it('Customize preview props', () => {
    render(
      <Image
        src={src}
        alt={alt}
        preview={{ open: true, motionName: 'abc', getContainer: false }}
      />,
    );

    expect(document.querySelector('.ant-image-preview')).not.toBe(null);
    expect(document.querySelector('.ant-image-preview')).toHaveClass('abc');
  });

  it('Customize Group preview props', () => {
    render(
      <Image.PreviewGroup preview={{ open: true, motionName: 'abc' }}>
        <Image alt={alt} src={src} />
      </Image.PreviewGroup>,
    );
    expect(document.querySelector('.ant-image-preview')).toHaveClass('abc');
  });

  it('ConfigProvider getPopupContainer', () => {
    const { container, baseElement } = render(
      <>
        <div className="container" />
        <ConfigProvider getPopupContainer={() => document.querySelector('.container')!}>
          <Image alt={alt} src={src} />
        </ConfigProvider>
      </>,
    );
    fireEvent.click(container.querySelector('.ant-image')!);
    expect(baseElement.querySelector('.container')?.children.length).not.toBe(0);
  });

  it('Preview should support rootClassName', () => {
    const { baseElement } = render(
      <Image.PreviewGroup preview={{ open: true, rootClassName: 'test-root-class' }}>
        <Image alt={alt} src={src} />
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
              alt={alt}
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
                alt={alt}
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <Image
                width={200}
                alt={alt}
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

    // Match classnames and styles: Image
    expect(document.querySelector('.ant-image')).toHaveClass(customClassNames.root);
    expect(document.querySelector('.ant-image')).toHaveStyle(customStyles.root);

    expect(document.querySelector('.ant-image-img')).toHaveClass(customClassNames.image);
    expect(document.querySelector('.ant-image-img')).toHaveStyle(customStyles.image);

    expect(document.querySelector('.ant-image-cover')).toHaveClass(customClassNames.cover);
    expect(document.querySelector('.ant-image-cover')).toHaveStyle(customStyles.cover);

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

    // Test dynamic classNames
    expect(document.querySelector('.ant-image')).toHaveClass('image-with-preview');
    expect(document.querySelector('.ant-image-img')).toHaveClass('dynamic-image');
    expect(document.querySelector('.ant-image-cover')).toHaveClass('dynamic-cover');

    // Test dynamic styles
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

  describe('Image.PreviewGroup mergedProps behavior', () => {
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
          <Image width={100} src="https://example.com/image.png" />
        </Image.PreviewGroup>,
      );

      expect(container.innerHTML).toMatchSnapshot();
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
          <Image width={100} src="https://example.com/image.png" />
        </Image.PreviewGroup>,
      );

      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  it('should support cover placement', () => {
    const App = () => {
      const [placement, setPlacement] = React.useState<'center' | 'top' | 'bottom'>('center');
      return (
        <>
          <button
            type="button"
            id="center"
            onClick={() => {
              setPlacement('center');
            }}
          >
            Set Center Cover
          </button>
          <button
            type="button"
            id="top"
            onClick={() => {
              setPlacement('top');
            }}
          >
            Set Center top
          </button>
          <button
            type="button"
            id="bottom"
            onClick={() => {
              setPlacement('bottom');
            }}
          >
            Set Center bottom
          </button>
          <Image
            width={96}
            alt={alt}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            preview={{
              cover: {
                placement,
                coverNode: (
                  <span>
                    <span>Custom Cover</span>
                  </span>
                ),
              },
            }}
          />
        </>
      );
    };
    const { container } = render(<App />);

    const cover = container.querySelector('.ant-image-cover');
    expect(cover).toHaveClass('ant-image-cover-center');

    fireEvent.click(container.querySelector('#top')!);
    expect(cover).toHaveClass('ant-image-cover-top');
    fireEvent.click(container.querySelector('#bottom')!);
    expect(cover).toHaveClass('ant-image-cover-bottom');
  });

  describe('Image mask blur className', () => {
    const testCases: [
      mask?: MaskType | React.ReactNode,
      contextMask?: MaskType,
      expectedBlurClass?: boolean,
      openMask?: boolean,
    ][] = [
      // Format: [imageMask, configMask,  expectedBlurClass, openMask]
      [undefined, true, true, true],
      [true, undefined, true, true],
      [undefined, undefined, true, true],
      [false, true, false, false],
      [true, false, true, true],
      [{ enabled: false }, { blur: true }, true, false],
      [{ enabled: true }, { blur: false }, false, true],
      [{ blur: true }, { enabled: false }, true, false],
      [{ blur: false }, { enabled: true, blur: true }, false, true],
      [{ blur: true, enabled: false }, { enabled: true, blur: false }, true, false],
      [<div key="1">123</div>, true, true, true],
      [<div key="2">123</div>, false, true, false],
      [<div key="3">123</div>, { blur: false }, false, true],
    ];
    const demos = [
      (imageMask?: MaskType | React.ReactNode, configMask?: MaskType) => (
        <ConfigProvider image={{ preview: { mask: configMask } }}>
          <Image
            preview={{ mask: imageMask }}
            alt="mask"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            width={20}
          />
        </ConfigProvider>
      ),
      (imageMask?: MaskType, configMask?: MaskType) => (
        <ConfigProvider image={{ preview: { mask: configMask } }}>
          <Image.PreviewGroup preview={{ mask: imageMask }}>
            <Image
              alt="mask"
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              width={20}
            />
          </Image.PreviewGroup>
        </ConfigProvider>
      ),
    ];
    demos.forEach((demo, index) => {
      it.each(testCases)(
        `${index === 0 ? 'Image:' : 'Image.PreviewGroup'} imageMask = %s configMask = %s ,mask blur = %s`,
        (imageMask, configMask, expectedBlurClass, openMask) => {
          render(demo(imageMask as MaskType, configMask));
          fireEvent.click(document.querySelector('.ant-image')!);

          const maskElement = document.querySelector('.ant-image-preview-mask');
          expect(maskElement).toBeInTheDocument();
          if (!openMask) {
            const hiddenMask = document.querySelector('.ant-image-preview-mask-hidden');
            expect(hiddenMask).toBeTruthy();
            return;
          }
          if (expectedBlurClass) {
            expect(maskElement!.className).toContain('ant-image-preview-mask-blur');
          } else {
            expect(maskElement!.className).not.toContain('ant-image-preview-mask-blur');
          }
        },
      );
    });
  });
});
