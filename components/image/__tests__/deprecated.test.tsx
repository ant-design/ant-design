import React from 'react';

import Image from '..';
import { resetWarned } from '../../_util/warning';
import { fireEvent, render } from '../../../tests/utils';

describe('Image.Deprecated', () => {
  const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    resetWarned();
    errSpy.mockReset();
  });

  it('visible', () => {
    render(<Image preview={{ visible: true }} />);

    expect(document.querySelector('.ant-image-preview')).toBeTruthy();

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Image] `visible` is deprecated. Please use `open` instead.',
    );
  });

  describe('onVisibleChange', () => {
    it('Image', () => {
      const onVisibleChange = jest.fn();
      const { container } = render(<Image preview={{ onVisibleChange }} />);

      fireEvent.click(container.querySelector('.ant-image')!);
      expect(onVisibleChange).toHaveBeenCalledWith(true, false);

      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Image] `onVisibleChange` is deprecated. Please use `onOpenChange` instead.',
      );
    });

    it('PreviewGroup', () => {
      const onVisibleChange = jest.fn();
      render(<Image.PreviewGroup items={['']} preview={{ open: true, onVisibleChange }} />);

      fireEvent.click(document.querySelector('.ant-image-preview-mask')!);
      expect(onVisibleChange).toHaveBeenCalledWith(false, true, 0);

      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Image] `onVisibleChange` is deprecated. Please use `onOpenChange` instead.',
      );
    });
  });

  it('mask', () => {
    const { container } = render(<Image preview={{ mask: <div className="bamboo" /> }} />);

    expect(container.querySelector('.ant-image .bamboo')).toBeTruthy();

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Image] `mask` used as ReactNode is deprecated. Please use `cover` instead.',
    );
  });

  it('preview.rootClassName', () => {
    render(<Image preview={{ open: true, rootClassName: 'bamboo' }} />);

    expect(document.querySelector('.ant-image-preview.bamboo')).toBeTruthy();

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Image] `rootClassName` is deprecated. Please use `classNames.root` instead.',
    );
  });

  it('forceRender', () => {
    render(<Image preview={{ forceRender: true }} />);

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Image] `forceRender` is no longer supported.',
    );
  });

  it('destroyOnClose', () => {
    render(<Image preview={{ destroyOnClose: true }} />);

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Image] `destroyOnClose` is no longer supported.',
    );
  });

  it('wrapperStyle', () => {
    render(<Image wrapperStyle={{}} />);

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Image] `wrapperStyle` is deprecated. Please use `styles.root` instead.',
    );
  });

  it('toolbarRender', () => {
    render(<Image preview={{ toolbarRender: () => <div /> }} />);

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Image] `toolbarRender` is deprecated. Please use `actionsRender` instead.',
    );
  });
});
