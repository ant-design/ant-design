import React from 'react';
import { act } from 'react-dom/test-utils';
import Drawer from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

const DrawerTest = ({ getContainer }) => (
  <div>
    <Drawer visible width={400} getContainer={getContainer}>
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
      <Drawer visible width={400} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();

    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('getContainer return undefined', () => {
    const { container: wrapper, rerender } = render(<DrawerTest getContainer={() => undefined} />);
    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();

    rerender(<DrawerTest getContainer={false} />);
    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('render top drawer', () => {
    const { container: wrapper } = render(
      <Drawer visible height={400} placement="top" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('have a title', () => {
    const { container: wrapper } = render(
      <Drawer visible title="Test Title" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('closable is false', () => {
    const { container: wrapper } = render(
      <Drawer visible closable={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('destroyOnClose is true', () => {
    const { container: wrapper } = render(
      <Drawer destroyOnClose visible={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );

    triggerMotion();
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  it('className is test_drawer', () => {
    const { container: wrapper } = render(
      <Drawer destroyOnClose visible className="test_drawer" getContainer={false}>
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
        visible
        style={style}
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
      <Drawer visible footer="Test Footer" getContainer={false}>
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
      <Drawer visible closable closeIcon={<span>close</span>} width={400} getContainer={false}>
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
        <Drawer visible>Bamboo is Light</Drawer>
      </ConfigProvider>,
    );

    expect(errorSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});
