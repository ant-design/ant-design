import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
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
    const wrapper = mount(
      <Drawer visible width={400} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('getContainer return undefined', () => {
    let wrapper = mount(<DrawerTest getContainer={() => undefined} />);
    expect(wrapper.render()).toMatchSnapshot();
    wrapper = mount(<DrawerTest getContainer={false} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('render top drawer', () => {
    const wrapper = mount(
      <Drawer visible height={400} placement="top" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('have a title', () => {
    const wrapper = mount(
      <Drawer visible title="Test Title" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('closable is false', () => {
    const wrapper = mount(
      <Drawer visible closable={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('destroyOnClose is true', () => {
    const wrapper = mount(
      <Drawer destroyOnClose visible={false} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('className is test_drawer', () => {
    const wrapper = mount(
      <Drawer destroyOnClose visible={false} className="test_drawer" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('style/drawerStyle/headerStyle/bodyStyle should work', () => {
    const style = {
      backgroundColor: '#08c',
    };
    const wrapper = mount(
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
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('have a footer', () => {
    const wrapper = mount(
      <Drawer visible footer="Test Footer" getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper.render()).toMatchSnapshot();
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
    const wrapper = mount(
      <Drawer visible closable closeIcon={<span>close</span>} width={400} getContainer={false}>
        Here is content of Drawer
      </Drawer>,
    );
    expect(wrapper.render()).toMatchSnapshot();
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
