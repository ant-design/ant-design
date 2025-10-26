import React from 'react';
import { Modal } from 'antd';

import Image from '..';
import type { MaskType } from '../../_util/hooks';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

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
        <ConfigProvider
          getPopupContainer={() => document.querySelector<HTMLDivElement>('.container')!}
        >
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
