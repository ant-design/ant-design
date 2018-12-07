import React from 'react';
import { mount } from 'enzyme';
import Anchor from '..';

const { Link } = Anchor;

describe('Anchor Render', () => {
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
    await new Promise(resolve => setTimeout(resolve, 1000));
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
});
