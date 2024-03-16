import React from 'react';
import { act } from 'react-dom/test-utils';

import type { DrawerProps } from '..';
import Drawer from '..';
import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
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

    const panel = document.querySelector('.ant-drawer-content');
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

  it('destroyOnClose is true', () => {
    const { container: wrapper } = render(
      <Drawer destroyOnClose open={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('className is test_drawer', () => {
    const { container: wrapper } = render(
      <Drawer destroyOnClose open rootClassName="test_drawer" getContainer={false}>
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

  it('support closeIcon', () => {
    const { container: wrapper } = render(
      <Drawer open closable closeIcon={<span>close</span>} width={400} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
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

    it('should hide close button when closeIcon is null or false', async () => {
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

    it('match between styles and deprecated style prop', async () => {
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
            content: getStyle1(),
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
});
