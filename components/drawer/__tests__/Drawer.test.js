import React from 'react';
import { render, mount } from 'enzyme';
import Drawer from '..';
import ConfigProvider from '../../config-provider';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

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

  it('render correctly', () => {
    const wrapper = render(
      <Drawer visible width={400} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('getContainer return undefined', () => {
    let wrapper = mount(<DrawerTest getContainer={() => undefined} />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper = mount(<DrawerTest getContainer={false} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render top drawer', () => {
    const wrapper = render(
      <Drawer visible height={400} placement="top" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('have a title', () => {
    const wrapper = render(
      <Drawer visible title="Test Title" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('closable is false', () => {
    const wrapper = render(
      <Drawer visible closable={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('destroyOnClose is true', () => {
    const wrapper = render(
      <Drawer destroyOnClose visible={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('className is test_drawer', () => {
    const wrapper = render(
      <Drawer destroyOnClose visible={false} className="test_drawer" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('style/drawerStyle/headerStyle/bodyStyle should work', () => {
    const style = {
      backgroundColor: '#08c',
    };
    const wrapper = render(
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
    expect(wrapper).toMatchSnapshot();
  });

  it('have a footer', () => {
    const wrapper = render(
      <Drawer visible footer="Test Footer" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('forceRender works', () => {
    const wrapper = mount(
      <Drawer>
        <button type="button" className="forceRender">
          should not be rendered
        </button>
      </Drawer>,
    );
    expect(wrapper.find('button.forceRender').length).toBe(0);
    const wrapper2 = mount(
      <Drawer forceRender>
        <button type="button" className="forceRender">
          should be rendered
        </button>
      </Drawer>,
    );
    expect(wrapper2.find('button.forceRender').length).toBe(1);
  });

  it('support closeIcon', () => {
    const wrapper = render(
      <Drawer visible closable closeIcon={<span>close</span>} width={400} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('ConfigProvider should not warning', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mount(
      <ConfigProvider virtual>
        <Drawer visible>Bamboo is Light</Drawer>
      </ConfigProvider>,
    );

    expect(errorSpy).not.toHaveBeenCalled();

    errorSpy.mockRestore();
  });

  it('should support ref', () => {
    const ref = React.createRef();
    mount(
      <Drawer visible ref={ref} width={400}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(typeof ref.current.push).toBe('function');
    expect(typeof ref.current.pull).toBe('function');
  });
});
