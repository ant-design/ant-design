import React from 'react';
import { mount } from 'enzyme';
import Anchor from '..';
import { spyElementPrototypes } from '../../__tests__/util/domHook';
import { sleep } from '../../../tests/utils';

const { Link } = Anchor;

describe('Anchor Render', () => {
  const getBoundingClientRectMock = jest.fn(() => ({
    width: 100,
    height: 100,
    top: 1000,
  }));
  const getClientRectsMock = jest.fn(() => ({
    length: 1,
  }));
  const headingSpy = spyElementPrototypes(HTMLHeadingElement, {
    getBoundingClientRect: getBoundingClientRectMock,
    getClientRects: getClientRectsMock,
  });

  afterAll(() => {
    headingSpy.mockRestore();
  });

  it('Anchor render perfectly', () => {
    const wrapper = mount(
      <Anchor>
        <Link href="#API" title="API" />
      </Anchor>,
    );

    wrapper.find('a[href="#API"]').simulate('click');

    wrapper.instance().handleScroll();
    expect(wrapper.instance().state).not.toBe(null);
  });

  it('Anchor render perfectly for complete href - click', () => {
    const wrapper = mount(
      <Anchor>
        <Link href="http://www.example.com/#API" title="API" />
      </Anchor>,
    );
    wrapper.find('a[href="http://www.example.com/#API"]').simulate('click');
    expect(wrapper.instance().state.activeLink).toBe('http://www.example.com/#API');
  });

  it('Anchor render perfectly for complete href - scroll', () => {
    let root = document.getElementById('root');
    if (!root) {
      root = document.createElement('div', { id: 'root' });
      root.id = 'root';
      document.body.appendChild(root);
    }
    mount(<div id="API">Hello</div>, { attachTo: root });
    const wrapper = mount(
      <Anchor>
        <Link href="http://www.example.com/#API" title="API" />
      </Anchor>,
    );
    wrapper.instance().handleScroll();
    expect(wrapper.instance().state.activeLink).toBe('http://www.example.com/#API');
  });

  it('Anchor render perfectly for complete href - scrollTo', async () => {
    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    let root = document.getElementById('root');
    if (!root) {
      root = document.createElement('div', { id: 'root' });
      root.id = 'root';
      document.body.appendChild(root);
    }
    mount(<div id="API">Hello</div>, { attachTo: root });
    const wrapper = mount(
      <Anchor>
        <Link href="##API" title="API" />
      </Anchor>,
    );
    wrapper.instance().handleScrollTo('##API');
    expect(wrapper.instance().state.activeLink).toBe('##API');
    expect(scrollToSpy).not.toHaveBeenCalled();
    await sleep(1000);
    expect(scrollToSpy).toHaveBeenCalled();
  });

  it('should remove listener when unmount', async () => {
    const wrapper = mount(
      <Anchor>
        <Link href="#API" title="API" />
      </Anchor>,
    );
    const removeListenerSpy = jest.spyOn(wrapper.instance().scrollEvent, 'remove');
    wrapper.unmount();
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it('should unregister link when unmount children', async () => {
    const wrapper = mount(
      <Anchor>
        <Link href="#API" title="API" />
      </Anchor>,
    );
    expect(wrapper.instance().links).toEqual(['#API']);
    wrapper.setProps({ children: null });
    expect(wrapper.instance().links).toEqual([]);
  });

  it('should update links when link href update', async () => {
    let anchorInstance = null;
    function AnchorUpdate({ href }) {
      return (
        <Anchor
          ref={c => {
            anchorInstance = c;
          }}
        >
          <Link href={href} title="API" />
        </Anchor>
      );
    }
    const wrapper = mount(<AnchorUpdate href="#API" />);

    expect(anchorInstance.links).toEqual(['#API']);
    wrapper.setProps({ href: '#API_1' });
    expect(anchorInstance.links).toEqual(['#API_1']);
  });

  it('Anchor onClick event', () => {
    let event;
    let link;
    const handleClick = (...arg) => {
      [event, link] = arg;
    };

    const href = '#API';
    const title = 'API';

    const wrapper = mount(
      <Anchor onClick={handleClick}>
        <Link href={href} title={title} />
      </Anchor>,
    );

    wrapper.find(`a[href="${href}"]`).simulate('click');

    wrapper.instance().handleScroll();
    expect(event).not.toBe(undefined);
    expect(link).toEqual({ href, title });
  });

  it('Different function returns the same DOM', async () => {
    let root = document.getElementById('root');
    if (!root) {
      root = document.createElement('div', { id: 'root' });
      root.id = 'root';
      document.body.appendChild(root);
    }
    mount(<div id="API">Hello</div>, { attachTo: root });
    const getContainerA = () => {
      return document.getElementById('API');
    };
    const getContainerB = () => {
      return document.getElementById('API');
    };

    const wrapper = mount(
      <Anchor getContainer={getContainerA}>
        <Link href="#API" title="API" />
      </Anchor>,
    );
    const removeListenerSpy = jest.spyOn(wrapper.instance().scrollEvent, 'remove');
    await sleep(1000);
    wrapper.setProps({ getContainer: getContainerB });
    expect(removeListenerSpy).not.toHaveBeenCalled();
  });

  it('Different function returns different DOM', async () => {
    let root = document.getElementById('root');
    if (!root) {
      root = document.createElement('div', { id: 'root' });
      root.id = 'root';
      document.body.appendChild(root);
    }
    mount(
      <div>
        <div id="API1">Hello</div>
        <div id="API2">World</div>
      </div>,
      { attachTo: root },
    );
    const getContainerA = () => {
      return document.getElementById('API1');
    };
    const getContainerB = () => {
      return document.getElementById('API2');
    };
    const wrapper = mount(
      <Anchor getContainer={getContainerA}>
        <Link href="#API1" title="API1" />
        <Link href="#API2" title="API2" />
      </Anchor>,
    );
    const removeListenerSpy = jest.spyOn(wrapper.instance().scrollEvent, 'remove');
    expect(removeListenerSpy).not.toHaveBeenCalled();
    await sleep(1000);
    wrapper.setProps({ getContainer: getContainerB });
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it('Same function returns the same DOM', () => {
    let root = document.getElementById('root');
    if (!root) {
      root = document.createElement('div', { id: 'root' });
      root.id = 'root';
      document.body.appendChild(root);
    }
    mount(<div id="API">Hello</div>, { attachTo: root });
    const getContainer = () => document.getElementById('API');
    const wrapper = mount(
      <Anchor getContainer={getContainer}>
        <Link href="#API" title="API" />
      </Anchor>,
    );
    wrapper.find('a[href="#API"]').simulate('click');
    wrapper.instance().handleScroll();
    expect(wrapper.instance().state).not.toBe(null);
  });

  it('Same function returns different DOM', async () => {
    let root = document.getElementById('root');
    if (!root) {
      root = document.createElement('div', { id: 'root' });
      root.id = 'root';
      document.body.appendChild(root);
    }
    mount(
      <div>
        <div id="API1">Hello</div>
        <div id="API2">World</div>
      </div>,
      { attachTo: root },
    );
    const holdContainer = {
      container: document.getElementById('API1'),
    };
    const getContainer = () => {
      return holdContainer.container;
    };
    const wrapper = mount(
      <Anchor getContainer={getContainer}>
        <Link href="#API1" title="API1" />
        <Link href="#API2" title="API2" />
      </Anchor>,
    );
    const removeListenerSpy = jest.spyOn(wrapper.instance().scrollEvent, 'remove');
    expect(removeListenerSpy).not.toHaveBeenCalled();
    await sleep(1000);
    holdContainer.container = document.getElementById('API2');
    wrapper.setProps({ 'data-only-trigger-re-render': true });
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it('Anchor getCurrentAnchor prop', () => {
    const getCurrentAnchor = () => '#API2';
    const wrapper = mount(
      <Anchor getCurrentAnchor={getCurrentAnchor}>
        <Link href="#API1" title="API1" />
        <Link href="#API2" title="API2" />
      </Anchor>,
    );
    expect(wrapper.instance().state.activeLink).toBe('#API2');
  });

  it('Anchor targetOffset prop', () => {
    jest.useFakeTimers();

    let dateNowMock;

    function dataNowMockFn() {
      return jest
        .spyOn(Date, 'now')
        .mockImplementationOnce(() => 0)
        .mockImplementationOnce(() => 1000);
    }

    dateNowMock = dataNowMockFn();

    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    let root = document.getElementById('root');
    if (!root) {
      root = document.createElement('div', { id: 'root' });
      root.id = 'root';
      document.body.appendChild(root);
    }
    mount(<h1 id="API">Hello</h1>, { attachTo: root });
    const wrapper = mount(
      <Anchor>
        <Link href="#API" title="API" />
      </Anchor>,
    );
    wrapper.instance().handleScrollTo('#API');
    jest.runAllTimers();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 1000);
    dateNowMock = dataNowMockFn();

    wrapper.setProps({ offsetTop: 100 });
    wrapper.instance().handleScrollTo('#API');
    jest.runAllTimers();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 900);
    dateNowMock = dataNowMockFn();

    wrapper.setProps({ targetOffset: 200 });
    wrapper.instance().handleScrollTo('#API');
    jest.runAllTimers();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);

    dateNowMock.mockRestore();
    jest.useRealTimers();
  });
});
