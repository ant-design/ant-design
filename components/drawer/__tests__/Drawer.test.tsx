import React from 'react';

import type { DrawerProps } from '..';
import Drawer from '..';
import type { MaskType } from '../../_util/hooks';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

const DrawerTest: React.FC<DrawerProps> = ({ getContainer }) => (
  <div>
    <Drawer open width={400} getContainer={getContainer}>
      Here is content of Drawer
    </Drawer>
  </div>
);

describe('Drawer', () => {
  mountTest(Drawer);
  rtlTest(Drawer);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  function triggerMotion() {
    act(() => {
      jest.runAllTimers();
    });

    const mask = document.querySelector('.ant-drawer-mask');
    if (mask) {
      fireEvent.animationEnd(mask);
    }

    const panel = document.querySelector('.ant-drawer-section');
    if (panel) {
      fireEvent.animationEnd(panel);
    }

    act(() => {
      jest.runAllTimers();
    });
  }

  it('render correctly', () => {
    const { container: wrapper } = render(
      <Drawer open width={400} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();

    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render correctly with size default', () => {
    const { container } = render(
      <Drawer open size="default" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();

    const drawerWrapper = container.querySelector('.ant-drawer-content-wrapper');
    expect(drawerWrapper).toHaveStyle({ width: '378px' });
  });

  it('render correctly with size large', () => {
    const { container } = render(
      <Drawer open size="large" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();

    const drawerWrapper = container.querySelector('.ant-drawer-content-wrapper');
    expect(drawerWrapper).toHaveStyle({ width: '736px' });
  });

  it('getContainer return undefined', () => {
    const { container, rerender } = render(
      <DrawerTest getContainer={() => undefined as unknown as HTMLElement} />,
    );
    triggerMotion();
    expect(container.firstChild).toMatchSnapshot();

    rerender(<DrawerTest getContainer={false} />);
    triggerMotion();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('render top drawer', () => {
    const { container } = render(
      <Drawer open height={400} placement="top" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('have a title', () => {
    const { container } = render(
      <Drawer open title="Test Title" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('closable is false', () => {
    const { container: wrapper } = render(
      <Drawer open closable={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('destroyOnHidden is true', () => {
    const { container: wrapper } = render(
      <Drawer destroyOnHidden open={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('className is test_drawer', () => {
    const { container: wrapper } = render(
      <Drawer destroyOnHidden open rootClassName="test_drawer" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('style/drawerStyle/headerStyle/bodyStyle should work', () => {
    const style: React.CSSProperties = {
      backgroundColor: '#08c',
    };
    const { container: wrapper } = render(
      <Drawer
        open
        rootStyle={style}
        drawerStyle={style}
        headerStyle={style}
        bodyStyle={style}
        getContainer={false}
      >
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('have a footer', () => {
    const { container: wrapper } = render(
      <Drawer open footer="Test Footer" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('forceRender works', () => {
    const { baseElement, rerender } = render(
      <Drawer>
        <button type="button" className="forceRender">
          should not be rendered
        </button>
      </Drawer>,
    );
    expect(baseElement.querySelectorAll('button.forceRender').length).toBe(0);
    rerender(
      <Drawer forceRender>
        <button type="button" className="forceRender">
          should be rendered
        </button>
      </Drawer>,
    );
    expect(baseElement.querySelectorAll('button.forceRender').length).toBe(1);
  });

  describe('Drawer loading', () => {
    it('have a spinner', () => {
      const { container: wrapper } = render(
        <Drawer open loading getContainer={false}>
          Here is content of Drawer
        </Drawer>,
      );

      triggerMotion();
      expect(wrapper.firstChild).toMatchSnapshot();
    });
    it('have a custom loading', () => {
      const { container } = render(
        <Drawer open loading getContainer={false}>
          Here is content of Drawer
        </Drawer>,
      );
      triggerMotion();
      const wrapper = container.querySelector<HTMLDivElement>('.ant-skeleton');
      expect(wrapper).toBeTruthy();
    });
  });

  it('support closeIcon', () => {
    const { container: wrapper } = render(
      <Drawer open closable closeIcon={<span>close</span>} width={400} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('support closable placement', () => {
    const { container } = render(
      <Drawer
        open
        closable={{
          placement: 'end',
        }}
        closeIcon={<span>close</span>}
        width={400}
        getContainer={false}
      >
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    const wrapper = container.querySelector<HTMLButtonElement>('.ant-drawer-close-end');
    expect(wrapper).toBeTruthy();
  });

  it('ConfigProvider should not warning', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ConfigProvider virtual>
        <Drawer open>Bamboo is Light</Drawer>
      </ConfigProvider>,
    );

    expect(errorSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
  });

  it('zIndex should work', () => {
    const { container } = render(<Drawer getContainer={false} open zIndex={903} />);
    expect(container.querySelector('.ant-drawer')).toHaveStyle({
      zIndex: 903,
    });
  });

  describe('style migrate', () => {
    it('not warning with getContainer', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      resetWarned();

      render(<Drawer getContainer={() => document.body} />);
      expect(errorSpy).not.toHaveBeenCalled();

      errorSpy.mockRestore();
    });

    it('not warning with getContainer false', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      resetWarned();

      render(<Drawer getContainer={false} />);
      expect(errorSpy).not.toHaveBeenCalled();

      errorSpy.mockRestore();
    });

    it('warning with getContainer & style', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      resetWarned();

      render(<Drawer getContainer={false} style={{ position: 'absolute' }} />);
      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: Drawer] `style` is replaced by `rootStyle` in v5. Please check that `position: absolute` is necessary.',
      );

      errorSpy.mockRestore();
    });

    it('warning with deprecated width prop', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      resetWarned();

      render(<Drawer width={400} />);
      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: Drawer] `width` is deprecated. Please use `size` instead.',
      );

      errorSpy.mockRestore();
    });

    it('warning with deprecated height prop', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      resetWarned();

      render(<Drawer height={400} />);
      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: Drawer] `height` is deprecated. Please use `size` instead.',
      );

      errorSpy.mockRestore();
    });

    it('should hide close button when closeIcon is null or false', () => {
      const { baseElement, rerender } = render(
        <Drawer open closeIcon={null}>
          Here is content of Drawer
        </Drawer>,
      );
      expect(baseElement.querySelector('.ant-drawer-close')).toBeNull();

      rerender(
        <Drawer open closeIcon={false}>
          Here is content of Drawer
        </Drawer>,
      );
      expect(baseElement.querySelector('.ant-drawer-close')).toBeNull();

      rerender(
        <Drawer open closeIcon={<span className="custom-close">Close</span>}>
          Here is content of Drawer
        </Drawer>,
      );
      expect(baseElement.querySelector('.custom-close')).not.toBeNull();

      rerender(
        <Drawer open closable={false} closeIcon={<span className="custom-close2">Close</span>}>
          Here is content of Drawer
        </Drawer>,
      );
      expect(baseElement.querySelector('.custom-close2')).toBeNull();

      rerender(
        <Drawer open closable closeIcon={<span className="custom-close3">Close</span>}>
          Here is content of Drawer
        </Drawer>,
      );
      expect(baseElement.querySelector('.custom-close3')).not.toBeNull();

      rerender(
        <Drawer open closeIcon={0} className="custom-drawer1">
          Here is content of Drawer
        </Drawer>,
      );
      expect(baseElement.querySelector('.custom-drawer1 .ant-drawer-close')).not.toBeNull();
      expect(baseElement.querySelector('.custom-drawer1 .anticon-close')).toBeNull();

      rerender(
        <Drawer open closeIcon="" className="custom-drawer2">
          Here is content of Drawer
        </Drawer>,
      );
      expect(baseElement.querySelector('.custom-drawer2 .ant-drawer-close')).not.toBeNull();
      expect(baseElement.querySelector('.custom-drawer2 .anticon-close')).toBeNull();

      rerender(
        <Drawer open closeIcon className="custom-drawer3">
          Here is content of Drawer
        </Drawer>,
      );
      expect(baseElement.querySelector('.custom-drawer3 .anticon-close')).not.toBeNull();

      rerender(
        <Drawer open closable>
          Here is content of Drawer
        </Drawer>,
      );
      expect(baseElement.querySelector('.anticon-close')).not.toBeNull();
    });

    it('match between styles and deprecated style prop', () => {
      const initialFontSize = 10;
      let fontSize1 = initialFontSize;
      let fontSize2 = initialFontSize;
      const getStyle1 = () => ({ fontSize: fontSize1++ });
      const getStyle2 = () => ({ fontSize: fontSize2++ });
      const { container: container1 } = render(
        <Drawer
          open
          forceRender
          getContainer={false}
          footer="footer"
          styles={{
            header: getStyle1(),
            body: getStyle1(),
            footer: getStyle1(),
            section: getStyle1(),
            wrapper: getStyle1(),
            mask: getStyle1(),
          }}
        >
          <p>Some contents...</p>
        </Drawer>,
      );
      const { container: container2 } = render(
        <Drawer
          open
          forceRender
          getContainer={false}
          footer="footer"
          headerStyle={getStyle2()}
          bodyStyle={getStyle2()}
          footerStyle={getStyle2()}
          drawerStyle={getStyle2()}
          contentWrapperStyle={getStyle2()}
          maskStyle={getStyle2()}
        >
          <p>Some contents...</p>
        </Drawer>,
      );
      expect(container1).toMatchSnapshot();
      expect(container2).toMatchSnapshot();
      for (let i = initialFontSize; i < fontSize1; i += 1) {
        expect(container1.outerHTML).toContain(`font-size: ${i}px`);
      }
      for (let j = initialFontSize; j < fontSize2; j += 1) {
        expect(container2.outerHTML).toContain(`font-size: ${j}px`);
      }
      expect(container1.outerHTML).toEqual(container2.outerHTML);
    });
  });
  it('should support aria-* and closeIcon by closable', () => {
    const { baseElement } = render(
      <Drawer
        open
        closable={{
          'aria-label': 'Close',
          closeIcon: <span className="custom-close">Close</span>,
        }}
      >
        Here is content of Drawer
      </Drawer>,
    );
    expect(baseElement.querySelector('.ant-drawer-close')).not.toBeNull();
    expect(baseElement.querySelector('.custom-close')).not.toBeNull();
    expect(baseElement.querySelector('*[aria-label="Close"]')).not.toBeNull();
  });

  it('drawerRender', () => {
    const { container } = render(
      <Drawer open getContainer={false} drawerRender={(dom) => <div id="test">{dom}</div>}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(container.querySelector('#test')).toBeTruthy();
  });

  describe('Drawer mask blur className', () => {
    const testCases: [
      mask?: MaskType,
      contextMask?: MaskType,
      expectedBlurClass?: boolean,
      openMask?: boolean,
    ][] = [
      // Format: [modalMask, configMask,  expectedBlurClass, openMask]
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
    ];

    it.each(testCases)(
      'drawerMask = %s configMask = %s ,mask blur = %s',
      (modalMask, configMask, expectedBlurClass, openMask) => {
        render(
          <ConfigProvider drawer={{ mask: configMask }}>
            <Drawer open mask={modalMask} />
          </ConfigProvider>,
        );

        const maskElement = document.querySelector('.ant-drawer-mask');

        if (!openMask) {
          expect(maskElement).toBeNull();
          return;
        }

        expect(maskElement).toBeInTheDocument();
        if (expectedBlurClass) {
          expect(maskElement!.className).toContain('ant-drawer-mask-blur');
        } else {
          expect(maskElement!.className).not.toContain('ant-drawer-mask-blur');
        }
      },
    );
    it('should support closable placement with start', () => {
      const { container } = render(
        <Drawer open closable={{ placement: 'start' }} getContainer={false}>
          Test
        </Drawer>,
      );
      triggerMotion();
      // 当 placement 为 'start' 时，使用默认的类名
      expect(container.querySelector('.ant-drawer-close')).toBeInTheDocument();
      expect(container.querySelector('.ant-drawer-close-start')).toBeNull();
      expect(container.querySelector('.ant-drawer-close-end')).toBeNull();
      // 添加快照断言
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should support closable placement with end', () => {
      const { container } = render(
        <Drawer open closable={{ placement: 'end' }} getContainer={false}>
          Test
        </Drawer>,
      );
      triggerMotion();
      // 当 placement 为 'end' 时，使用新的类名
      expect(container.querySelector('.ant-drawer-close')).toBeInTheDocument();
      expect(container.querySelector('.ant-drawer-close-end')).toBeInTheDocument();
      // 添加快照断言
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it('should have aria-labelledby on drawer content when title is provided', () => {
    const { baseElement, rerender } = render(<Drawer open>Here is content of Drawer</Drawer>);
    const content = baseElement.querySelector('.ant-drawer-section');
    expect(content).not.toHaveAttribute('aria-labelledby');

    rerender(
      <Drawer open title="Test Title">
        Here is content of Drawer
      </Drawer>,
    );
    const title = baseElement.querySelector('.ant-drawer-title');
    expect(content).toHaveAttribute('aria-labelledby', title?.getAttribute('id'));

    rerender(
      <Drawer open title="Test Title" aria-labelledby="custom-id">
        Here is content of Drawer
      </Drawer>,
    );
    expect(content).toHaveAttribute('aria-labelledby', 'custom-id');
  });
});
