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
    const { container: wrapper } = render(<Image src={src} preview={false} />);

    fireEvent.click(wrapper.querySelector('.ant-image'));
    expect(wrapper.querySelector('.ant-image-preview-root')).toBe(null);
  });
  it('Group preview props set false', () => {
    const { container: wrapper } = render(
      <Image.PreviewGroup preview={false}>
        <Image src={src} />
      </Image.PreviewGroup>,
    );

    fireEvent.click(wrapper.querySelector('.ant-image'));

    expect(wrapper.querySelector('.ant-image-preview-root')).toBe(null);
  });

  it('Default preview props', () => {
    const { container: wrapper, baseElement } = render(
      <Image src={src} preview={{ visible: true }} />,
    );

    fireEvent.click(wrapper.querySelector('.ant-image'));

    expect(baseElement.querySelector('.ant-image-preview-mask')).toHaveClass('ant-fade');
    expect(baseElement.querySelector('.ant-image-preview')).toHaveClass('ant-zoom');
  });
  it('Default Group preview props', () => {
    const { container: wrapper, baseElement } = render(
      <Image.PreviewGroup preview={{ visible: true }}>
        <Image src={src} />
      </Image.PreviewGroup>,
    );

    fireEvent.click(wrapper.querySelector('.ant-image'));

    expect(baseElement.querySelector('.ant-image-preview-mask')).toHaveClass('ant-fade');
    expect(baseElement.querySelector('.ant-image-preview')).toHaveClass('ant-zoom');
  });
  it('Customize preview props', () => {
    const { container: wrapper, baseElement } = render(
      <Image
        src={src}
        preview={{ visible: true, transitionName: 'abc', maskTransitionName: 'def' }}
      />,
    );

    fireEvent.click(wrapper.querySelector('.ant-image'));

    expect(baseElement.querySelector('.ant-image-preview')).toHaveClass('abc');
    expect(baseElement.querySelector('.ant-image-preview-mask')).toHaveClass('def');
  });
  it('Customize Group preview props', () => {
    const { container: wrapper, baseElement } = render(
      <Image.PreviewGroup
        preview={{ visible: true, transitionName: 'abc', maskTransitionName: 'def' }}
      >
        <Image src={src} />
      </Image.PreviewGroup>,
    );

    fireEvent.click(wrapper.querySelector('.ant-image'));

    expect(baseElement.querySelector('.ant-image-preview')).toHaveClass('abc');
    expect(baseElement.querySelector('.ant-image-preview-mask')).toHaveClass('def');
  });
  it('ConfigProvider getPopupContainer', () => {
    const { container: wrapper, baseElement } = render(
      <>
        <div className="container" />
        <ConfigProvider getPopupContainer={() => document.querySelector('.container')}>
          <Image src={src} />
        </ConfigProvider>
      </>,
    );
    fireEvent.click(wrapper.querySelector('.ant-image'));
    const containerElement = baseElement.querySelector('.container');
    expect(containerElement.children.length).not.toBe(0);
  });
});
