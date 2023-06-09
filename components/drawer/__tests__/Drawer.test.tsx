import React from 'react';
import { act } from 'react-dom/test-utils';
import type { DrawerProps } from '..';
import Drawer from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';
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
    const style = {
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
  });
});
