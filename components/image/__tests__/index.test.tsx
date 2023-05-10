import React from 'react';
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
    const { container, baseElement } = render(<Image src={src} preview={{ visible: true }} />);

    fireEvent.click(container.querySelector('.ant-image')!);

    expect(baseElement.querySelector('.ant-image-preview-mask')).toHaveClass('ant-fade');
    expect(baseElement.querySelector('.ant-image-preview')).toHaveClass('ant-zoom');
  });
  it('Default Group preview props', () => {
    const { container, baseElement } = render(
      <Image.PreviewGroup preview={{ visible: true }}>
        <Image src={src} />
      </Image.PreviewGroup>,
    );

    fireEvent.click(container.querySelector('.ant-image')!);

    expect(baseElement.querySelector('.ant-image-preview-mask')).toHaveClass('ant-fade');
    expect(baseElement.querySelector('.ant-image-preview')).toHaveClass('ant-zoom');
    expect(baseElement).toMatchSnapshot();
  });
  it('Customize preview props', () => {
    const { container, baseElement } = render(
      <Image
        src={src}
        preview={{ visible: true, transitionName: 'abc', maskTransitionName: 'def' }}
      />,
    );

    fireEvent.click(container.querySelector('.ant-image')!);

    expect(baseElement.querySelector('.ant-image-preview')).toHaveClass('abc');
    expect(baseElement.querySelector('.ant-image-preview-mask')).toHaveClass('def');
  });
  it('Customize Group preview props', () => {
    const { container, baseElement } = render(
      <Image.PreviewGroup
        preview={{ visible: true, transitionName: 'abc', maskTransitionName: 'def' }}
      >
        <Image src={src} />
      </Image.PreviewGroup>,
    );

    fireEvent.click(container.querySelector('.ant-image')!);

    expect(baseElement.querySelector('.ant-image-preview')).toHaveClass('abc');
    expect(baseElement.querySelector('.ant-image-preview-mask')).toHaveClass('def');
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
  it('Preview forceRender props', async () => {
    const onLoadCb = jest.fn();
    const PreviewImage: React.FC = () => (
      <Image
        preview={{
          visible: false,
          src,
          forceRender: true,
        }}
      />
    );
    const { baseElement } = render(<PreviewImage />);
    expect(baseElement.querySelector('.ant-image-preview-root')).not.toBe(null);
    baseElement.querySelector('.ant-image-preview-img')?.addEventListener('load', onLoadCb);
    fireEvent.load(baseElement.querySelector('.ant-image-preview-img')!);
    expect(onLoadCb).toHaveBeenCalled();
  });
  it('Preview should support rootClassName', () => {
    const { container, baseElement } = render(
      <Image.PreviewGroup preview={{ visible: true, rootClassName: 'test-root-class' }}>
        <Image src={src} />
      </Image.PreviewGroup>,
    );

    fireEvent.click(container.querySelector('.ant-image')!);

    expect(baseElement.querySelector('.test-root-class')).toBeTruthy();
  });
});
