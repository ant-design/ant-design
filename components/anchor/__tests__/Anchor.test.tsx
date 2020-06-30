import React from 'react';
import { mount } from 'enzyme';
import Anchor from '..';
import { sleep } from '../../../tests/utils';

const { Link } = Anchor;

function createGetContainer(id: string) {
  return () => {
    const container = document.getElementById(id);
    if (container == null) {
      throw new Error();
    }
    return container;
  };
}

function createDiv() {
  const root = document.createElement('div');
  document.body.appendChild(root);
  return root;
}

let idCounter = 0;
const getHashUrl = () => `Anchor-API-${idCounter++}`;

describe('Anchor Render', () => {
  const getBoundingClientRectMock = jest.spyOn(
    HTMLHeadingElement.prototype,
    'getBoundingClientRect',
  );
  const getClientRectsMock = jest.spyOn(HTMLHeadingElement.prototype, 'getClientRects');

  beforeAll(() => {
    getBoundingClientRectMock.mockReturnValue({
      width: 100,
      height: 100,
      top: 1000,
    } as DOMRect);
    getClientRectsMock.mockReturnValue({ length: 1 } as DOMRectList);
  });

  afterAll(() => {
    getBoundingClientRectMock.mockRestore();
    getClientRectsMock.mockRestore();
  });

  it('Anchor render perfectly', () => {
    const hash = getHashUrl();
    const wrapper = mount<Anchor>(
      <Anchor>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    wrapper.find(`a[href="#${hash}"]`).simulate('click');

    wrapper.instance().handleScroll();
    expect(wrapper.instance().state).not.toBe(null);
  });

  it('Anchor render perfectly for complete href - click', () => {
    const hash = getHashUrl();
    const wrapper = mount<Anchor>(
      <Anchor>
        <Link href={`http://www.example.com/#${hash}`} title={hash} />
      </Anchor>,
    );
    wrapper.find(`a[href="http://www.example.com/#${hash}"]`).simulate('click');
    expect(wrapper.instance().state.activeLink).toBe(`http://www.example.com/#${hash}`);
  });

  it('Anchor render perfectly for complete href - hash router', async () => {
    const root = createDiv();
    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    mount(<div id="/faq?locale=en#Q1">Q1</div>, { attachTo: root });
    const wrapper = mount<Anchor>(
      <Anchor>
        <Link href="/#/faq?locale=en#Q1" title="Q1" />
      </Anchor>,
    );

    wrapper.instance().handleScrollTo('/#/faq?locale=en#Q1');
    expect(wrapper.instance().state.activeLink).toBe('/#/faq?locale=en#Q1');
    expect(scrollToSpy).not.toHaveBeenCalled();
    await sleep(1000);
    expect(scrollToSpy).toHaveBeenCalled();
  });

  it('Anchor render perfectly for complete href - scroll', () => {
    const hash = getHashUrl();
    const root = createDiv();
    mount(<div id={hash}>Hello</div>, { attachTo: root });
    const wrapper = mount<Anchor>(
      <Anchor>
        <Link href={`http://www.example.com/#${hash}`} title={hash} />
      </Anchor>,
    );
    wrapper.instance().handleScroll();
    expect(wrapper.instance().state.activeLink).toBe(`http://www.example.com/#${hash}`);
  });

  it('Anchor render perfectly for complete href - scrollTo', async () => {
    const hash = getHashUrl();
    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    const root = createDiv();
    mount(<div id={`#${hash}`}>Hello</div>, { attachTo: root });
    const wrapper = mount<Anchor>(
      <Anchor>
        <Link href={`##${hash}`} title={hash} />
      </Anchor>,
    );
    wrapper.instance().handleScrollTo(`##${hash}`);
    expect(wrapper.instance().state.activeLink).toBe(`##${hash}`);
    const calls = scrollToSpy.mock.calls.length;
    await sleep(1000);
    expect(scrollToSpy.mock.calls.length).toBeGreaterThan(calls);
  });

  it('should remove listener when unmount', async () => {
    const hash = getHashUrl();
    const wrapper = mount<Anchor>(
      <Anchor>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );
    const removeListenerSpy = jest.spyOn((wrapper.instance() as any).scrollEvent, 'remove');
    wrapper.unmount();
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it('should unregister link when unmount children', async () => {
    const hash = getHashUrl();
    const wrapper = mount<Anchor>(
      <Anchor>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );
    expect((wrapper.instance() as any).links).toEqual([`#${hash}`]);
    wrapper.setProps({ children: null });
    expect((wrapper.instance() as any).links).toEqual([]);
  });

  it('should update links when link href update', async () => {
    const hash = getHashUrl();
    let anchorInstance: Anchor | null = null;
    function AnchorUpdate({ href }: { href: string }) {
      return (
        <Anchor
          ref={c => {
            anchorInstance = c;
          }}
        >
          <Link href={href} title={hash} />
        </Anchor>
      );
    }
    const wrapper = mount(<AnchorUpdate href={`#${hash}`} />);

    if (anchorInstance == null) {
      throw new Error('anchorInstance should not be null');
    }
    expect((anchorInstance as any).links).toEqual([`#${hash}`]);
    wrapper.setProps({ href: `#${hash}_1` });
    expect((anchorInstance as any).links).toEqual([`#${hash}_1`]);
  });

  it('Anchor onClick event', () => {
    const hash = getHashUrl();
    let event;
    let link;
    const handleClick = (
      e: React.MouseEvent<HTMLElement>,
      _link: { title: React.ReactNode; href: string },
    ) => {
      event = e;
      link = _link;
    };

    const href = `#${hash}`;
    const title = hash;

    const wrapper = mount<Anchor>(
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
    const hash = getHashUrl();
    const root = createDiv();
    mount(<div id={hash}>Hello</div>, { attachTo: root });
    const getContainerA = createGetContainer(hash);
    const getContainerB = createGetContainer(hash);

    const wrapper = mount<Anchor>(
      <Anchor getContainer={getContainerA}>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );
    const removeListenerSpy = jest.spyOn((wrapper.instance() as any).scrollEvent, 'remove');
    await sleep(1000);
    wrapper.setProps({ getContainer: getContainerB });
    expect(removeListenerSpy).not.toHaveBeenCalled();
  });

  it('Different function returns different DOM', async () => {
    const hash1 = getHashUrl();
    const hash2 = getHashUrl();
    const root = createDiv();
    mount(
      <div>
        <div id={hash1}>Hello</div>
        <div id={hash2}>World</div>
      </div>,
      { attachTo: root },
    );
    const getContainerA = createGetContainer(hash1);
    const getContainerB = createGetContainer(hash2);
    const wrapper = mount<Anchor>(
      <Anchor getContainer={getContainerA}>
        <Link href={`#${hash1}`} title={hash1} />
        <Link href={`#${hash2}`} title={hash2} />
      </Anchor>,
    );
    const removeListenerSpy = jest.spyOn((wrapper.instance() as any).scrollEvent, 'remove');
    expect(removeListenerSpy).not.toHaveBeenCalled();
    await sleep(1000);
    wrapper.setProps({ getContainer: getContainerB });
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it('Same function returns the same DOM', () => {
    const hash = getHashUrl();
    const root = createDiv();
    mount(<div id={hash}>Hello</div>, { attachTo: root });
    const getContainer = createGetContainer(hash);
    const wrapper = mount(
      <Anchor getContainer={getContainer}>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );
    wrapper.find(`a[href="#${hash}"]`).simulate('click');
    (wrapper.instance() as any).handleScroll();
    expect(wrapper.instance().state).not.toBe(null);
  });

  it('Same function returns different DOM', async () => {
    const hash1 = getHashUrl();
    const hash2 = getHashUrl();
    const root = createDiv();
    mount(
      <div>
        <div id={hash1}>Hello</div>
        <div id={hash2}>World</div>
      </div>,
      { attachTo: root },
    );
    const holdContainer = {
      container: document.getElementById(hash1),
    };
    const getContainer = () => {
      if (holdContainer.container == null) {
        throw new Error('container should not be null');
      }
      return holdContainer.container;
    };
    const wrapper = mount(
      <Anchor getContainer={getContainer}>
        <Link href={`#${hash1}`} title={hash1} />
        <Link href={`#${hash2}`} title={hash2} />
      </Anchor>,
    );
    const removeListenerSpy = jest.spyOn((wrapper.instance() as any).scrollEvent, 'remove');
    expect(removeListenerSpy).not.toHaveBeenCalled();
    await sleep(1000);
    holdContainer.container = document.getElementById(hash2);
    wrapper.setProps({ 'data-only-trigger-re-render': true });
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it('Anchor getCurrentAnchor prop', () => {
    const hash1 = getHashUrl();
    const hash2 = getHashUrl();
    const getCurrentAnchor = () => `#${hash2}`;
    const wrapper = mount<Anchor>(
      <Anchor getCurrentAnchor={getCurrentAnchor}>
        <Link href={`#${hash1}`} title={hash1} />
        <Link href={`#${hash2}`} title={hash2} />
      </Anchor>,
    );
    expect(wrapper.instance().state.activeLink).toBe(`#${hash2}`);
  });

  it('Anchor targetOffset prop', async () => {
    const hash = getHashUrl();
    let dateNowMock;

    function dataNowMockFn() {
      let start = 0;

      const handler = () => {
        start += 1000;
        return start;
      };

      return jest.spyOn(Date, 'now').mockImplementation(handler);
    }

    dateNowMock = dataNowMockFn();

    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    const root = createDiv();
    mount(<h1 id={hash}>Hello</h1>, { attachTo: root });
    const wrapper = mount<Anchor>(
      <Anchor>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );
    wrapper.instance().handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 1000);
    dateNowMock = dataNowMockFn();

    wrapper.setProps({ offsetTop: 100 });
    wrapper.instance().handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 900);
    dateNowMock = dataNowMockFn();

    wrapper.setProps({ targetOffset: 200 });
    wrapper.instance().handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);

    dateNowMock.mockRestore();
  });

  it('Anchor onChange prop', async () => {
    const hash1 = getHashUrl();
    const hash2 = getHashUrl();
    const onChange = jest.fn();
    const wrapper = mount<Anchor>(
      <Anchor onChange={onChange}>
        <Link href={`#${hash1}`} title={hash1} />
        <Link href={`#${hash2}`} title={hash2} />
      </Anchor>,
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    wrapper.instance().handleScrollTo(hash2);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(hash2);
  });

  it('invalid hash', async () => {
    const wrapper = mount<Anchor>(
      <Anchor>
        <Link href="notexsited" title="title" />
      </Anchor>,
    );

    wrapper.find(`a[href="notexsited"]`).simulate('click');

    wrapper.instance().handleScrollTo('notexsited');
    expect(wrapper.instance().state).not.toBe(null);
  });

  it('test edge case when getBoundingClientRect return zero size', async () => {
    getBoundingClientRectMock.mockReturnValue({
      width: 0,
      height: 0,
      top: 1000,
    } as DOMRect);
    const hash = getHashUrl();
    let dateNowMock;

    function dataNowMockFn() {
      let start = 0;

      const handler = () => {
        start += 1000;
        return start;
      };

      return jest.spyOn(Date, 'now').mockImplementation(handler);
    }

    dateNowMock = dataNowMockFn();

    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    const root = createDiv();
    mount(<h1 id={hash}>Hello</h1>, { attachTo: root });
    const wrapper = mount<Anchor>(
      <Anchor>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );
    wrapper.instance().handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 1000);
    dateNowMock = dataNowMockFn();

    wrapper.setProps({ offsetTop: 100 });
    wrapper.instance().handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 900);
    dateNowMock = dataNowMockFn();

    wrapper.setProps({ targetOffset: 200 });
    wrapper.instance().handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);

    dateNowMock.mockRestore();
    getBoundingClientRectMock.mockReturnValue({
      width: 100,
      height: 100,
      top: 1000,
    } as DOMRect);
  });

  it('test edge case when container is not windows', async () => {
    const hash = getHashUrl();
    let dateNowMock;

    function dataNowMockFn() {
      let start = 0;

      const handler = () => {
        start += 1000;
        return start;
      };

      return jest.spyOn(Date, 'now').mockImplementation(handler);
    }

    dateNowMock = dataNowMockFn();

    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    const root = createDiv();
    mount(<h1 id={hash}>Hello</h1>, { attachTo: root });
    const wrapper = mount<Anchor>(
      <Anchor getContainer={() => document.body}>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );
    wrapper.instance().handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);
    dateNowMock = dataNowMockFn();

    wrapper.setProps({ offsetTop: 100 });
    wrapper.instance().handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);
    dateNowMock = dataNowMockFn();

    wrapper.setProps({ targetOffset: 200 });
    wrapper.instance().handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);

    dateNowMock.mockRestore();
  });
});
