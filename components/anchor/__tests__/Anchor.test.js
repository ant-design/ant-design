import React from 'react';
import { mount } from 'enzyme';
import Anchor from '..';

const { Link } = Anchor;

describe('Anchor Render', () => {
  it('Anchor render perfectly', () => {
    const wrapper = mount(
      <Anchor>
        <Link href="#API" title="API" />
      </Anchor>
    );

    wrapper.find('a[href="#API"]').simulate('click');

    wrapper.instance().handleScroll();
    expect(wrapper.instance().state).not.toBe(null);
  });

  it('Anchor render perfectly for complete href - click', () => {
    const wrapper = mount(
      <Anchor>
        <Link href="http://www.example.com/#API" title="API" />
      </Anchor>
    );
    wrapper.find('a[href="http://www.example.com/#API"]').simulate('click');
    expect(wrapper.instance().state.activeLink).toBe('http://www.example.com/#API');
  });

  it('Anchor render perfectly for complete href - scoll', () => {
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
      </Anchor>
    );
    wrapper.instance().handleScroll();
    expect(wrapper.instance().state.activeLink).toBe('http://www.example.com/#API');
  });

  it('Anchor render perfectly for complete href - scollTo', () => {
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
      </Anchor>
    );
    wrapper.instance().handleScrollTo('##API');
    expect(wrapper.instance().state.activeLink).toBe('##API');
  });
});
