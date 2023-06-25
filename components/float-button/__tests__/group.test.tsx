import React from 'react';
import FloatButton from '..';
import { fireEvent, render } from '../../../tests/utils';

describe('FloatButtonGroup', () => {
  it('should correct render', () => {
    const { container } = render(
      <FloatButton.Group>
        <FloatButton />
        <FloatButton />
        <FloatButton />
      </FloatButton.Group>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('support shape', () => {
    const [defaultShape, squareShape] = ['circle', 'square'] as const;
    const { container, rerender } = render(
      <FloatButton.Group shape={defaultShape}>
        <FloatButton />
        <FloatButton />
        <FloatButton />
      </FloatButton.Group>,
    );
    expect(container.querySelectorAll(`.ant-float-btn-${defaultShape}`)).toHaveLength(3);
    rerender(
      <FloatButton.Group shape={squareShape}>
        <FloatButton />
        <FloatButton />
        <FloatButton />
      </FloatButton.Group>,
    );
    expect(container.querySelectorAll(`.ant-float-btn-${squareShape}`)).toHaveLength(3);
  });
  it('support onOpenChange for click', () => {
    const onOpenChange = jest.fn();
    const { container } = render(
      <FloatButton.Group trigger="click" onOpenChange={onOpenChange}>
        <FloatButton />
        <FloatButton />
        <FloatButton />
      </FloatButton.Group>,
    );
    fireEvent.click(container.querySelector('.ant-float-btn')!);
    expect(onOpenChange).toHaveBeenCalled();
  });
  it('support onOpenChange for hover', () => {
    const onOpenChange = jest.fn();
    const { container } = render(
      <FloatButton.Group trigger="hover" onOpenChange={onOpenChange}>
        <FloatButton />
        <FloatButton />
        <FloatButton />
      </FloatButton.Group>,
    );
    fireEvent.mouseEnter(container.querySelector('.ant-float-btn-group')!);
    fireEvent.mouseLeave(container.querySelector('.ant-float-btn-group')!);
    expect(onOpenChange).toHaveBeenCalled();
  });
  it('support click floatButtonGroup not close', () => {
    const onOpenChange = jest.fn();
    const { container } = render(
      <FloatButton.Group trigger="click" onOpenChange={onOpenChange}>
        <FloatButton />
        <FloatButton />
        <FloatButton />
      </FloatButton.Group>,
    );
    fireEvent.click(container.querySelector('.ant-float-btn')!);
    fireEvent.click(container.querySelector('.ant-float-btn-group')!);
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  });
  it('support click out auto close', () => {
    const onOpenChange = jest.fn();
    const { container } = render(
      <FloatButton.Group trigger="click" onOpenChange={onOpenChange}>
        <FloatButton />
        <FloatButton />
        <FloatButton />
      </FloatButton.Group>,
    );
    fireEvent.click(container.querySelector('.ant-float-btn')!);
    fireEvent.click(container);
    expect(onOpenChange).toHaveBeenCalledTimes(2);
  });

  it('warning if set `open` but not set `trigger`', () => {
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <FloatButton.Group open trigger="click">
        <FloatButton />
        <FloatButton />
      </FloatButton.Group>,
    );

    expect(warnSpy).not.toHaveBeenCalled();

    render(
      <FloatButton.Group open>
        <FloatButton />
        <FloatButton />
      </FloatButton.Group>,
    );
    expect(warnSpy).toHaveBeenCalledWith(
      'Warning: [antd: FloatButton.Group] `open` need to be used together with `trigger`',
    );
    warnSpy.mockRestore();
  });
});
