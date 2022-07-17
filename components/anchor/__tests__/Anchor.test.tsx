import React from 'react';
import Anchor from '..';
import { fireEvent, render, sleep } from '../../../tests/utils';
import type { InternalAnchorClass } from '../Anchor';

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
    let anchorInstance: InternalAnchorClass;
    const { container } = render(
      <Anchor
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    anchorInstance!.handleScroll();
    expect(anchorInstance!.state).not.toBe(null);
  });

  it('Anchor render perfectly for complete href - click', () => {
    const hash = getHashUrl();
    let anchorInstance: InternalAnchorClass;
    const { container } = render(
      <Anchor
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`http://www.example.com/#${hash}`} title={hash} />
      </Anchor>,
    );
    fireEvent.click(container.querySelector(`a[href="http://www.example.com/#${hash}"]`)!);
    expect(anchorInstance!.state!.activeLink).toBe(`http://www.example.com/#${hash}`);
  });

  it('Anchor render perfectly for complete href - hash router', async () => {
    const root = createDiv();
    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    render(<div id="/faq?locale=en#Q1">Q1</div>, { container: root });
    let anchorInstance: InternalAnchorClass;
    render(
      <Anchor
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href="/#/faq?locale=en#Q1" title="Q1" />
      </Anchor>,
    );
    anchorInstance!.handleScrollTo('/#/faq?locale=en#Q1');
    expect(anchorInstance!.state.activeLink).toBe('/#/faq?locale=en#Q1');
    expect(scrollToSpy).not.toHaveBeenCalled();
    await sleep(1000);
    expect(scrollToSpy).toHaveBeenCalled();
  });

  it('Anchor render perfectly for complete href - scroll', () => {
    const hash = getHashUrl();
    const root = createDiv();
    render(<div id={hash}>Hello</div>, { container: root });
    let anchorInstance: InternalAnchorClass;
    render(
      <Anchor
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`http://www.example.com/#${hash}`} title={hash} />
      </Anchor>,
    );
    anchorInstance!.handleScroll();
    expect(anchorInstance!.state!.activeLink).toBe(`http://www.example.com/#${hash}`);
  });

  it('Anchor render perfectly for complete href - scrollTo', async () => {
    const hash = getHashUrl();
    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    const root = createDiv();
    render(<div id={`#${hash}`}>Hello</div>, { container: root });
    let anchorInstance: InternalAnchorClass;
    render(
      <Anchor
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`##${hash}`} title={hash} />
      </Anchor>,
    );

    anchorInstance!.handleScrollTo(`##${hash}`);
    expect(anchorInstance!.state.activeLink).toBe(`##${hash}`);
    const calls = scrollToSpy.mock.calls.length;
    await sleep(1000);
    expect(scrollToSpy.mock.calls.length).toBeGreaterThan(calls);
  });

  it('should remove listener when unmount', async () => {
    const hash = getHashUrl();
    let anchorInstance: InternalAnchorClass;
    const { unmount } = render(
      <Anchor
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    const removeListenerSpy = jest.spyOn((anchorInstance! as any).scrollEvent, 'remove');
    unmount();
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it('should unregister link when unmount children', () => {
    const hash = getHashUrl();
    const { container, rerender } = render(
      <Anchor>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    expect(container.querySelectorAll('.ant-anchor-link-title')).toHaveLength(1);
    expect(container.querySelector('.ant-anchor-link-title')).toHaveAttribute('href', `#${hash}`);

    rerender(<Anchor />);
    expect(container.querySelector('.ant-anchor-link-title')).toBeFalsy();
  });

  it('should update links when link href update', async () => {
    const hash = getHashUrl();
    let anchorInstance: InternalAnchorClass;
    function AnchorUpdate({ href }: { href: string }) {
      return (
        <Anchor
          ref={node => {
            anchorInstance = node as InternalAnchorClass;
          }}
        >
          <Link href={href} title={hash} />
        </Anchor>
      );
    }
    const { rerender } = render(<AnchorUpdate href={`#${hash}`} />);

    if (anchorInstance! == null) {
      throw new Error('anchorInstance should not be null');
    }

    expect((anchorInstance as any)!.links).toEqual([`#${hash}`]);
    rerender(<AnchorUpdate href={`#${hash}_1`} />);
    expect((anchorInstance as any)!.links).toEqual([`#${hash}_1`]);
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
    let anchorInstance: InternalAnchorClass;
    const { container } = render(
      <Anchor
        onClick={handleClick}
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={href} title={title} />
      </Anchor>,
    );

    fireEvent.click(container.querySelector(`a[href="${href}"]`)!);
    anchorInstance!.handleScroll();
    expect(event).not.toBe(undefined);
    expect(link).toEqual({ href, title });
  });

  it('Different function returns the same DOM', async () => {
    const hash = getHashUrl();
    const root = createDiv();
    render(<div id={hash}>Hello</div>, { container: root });
    const getContainerA = createGetContainer(hash);
    const getContainerB = createGetContainer(hash);
    let anchorInstance: InternalAnchorClass;
    const { rerender } = render(
      <Anchor
        getContainer={getContainerA}
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    const removeListenerSpy = jest.spyOn((anchorInstance! as any).scrollEvent, 'remove');
    await sleep(1000);
    rerender(
      <Anchor getContainer={getContainerB}>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );
    expect(removeListenerSpy).not.toHaveBeenCalled();
  });

  it('Different function returns different DOM', async () => {
    const hash1 = getHashUrl();
    const hash2 = getHashUrl();
    const root = createDiv();
    render(
      <div>
        <div id={hash1}>Hello</div>
        <div id={hash2}>World</div>
      </div>,
      { container: root },
    );
    const getContainerA = createGetContainer(hash1);
    const getContainerB = createGetContainer(hash2);
    let anchorInstance: InternalAnchorClass;
    const { rerender } = render(
      <Anchor
        getContainer={getContainerA}
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`#${hash1}`} title={hash1} />
        <Link href={`#${hash2}`} title={hash2} />
      </Anchor>,
    );

    const removeListenerSpy = jest.spyOn((anchorInstance! as any).scrollEvent, 'remove');
    expect(removeListenerSpy).not.toHaveBeenCalled();
    await sleep(1000);
    rerender(
      <Anchor getContainer={getContainerB}>
        <Link href={`#${hash1}`} title={hash1} />
        <Link href={`#${hash2}`} title={hash2} />
      </Anchor>,
    );
    expect(removeListenerSpy).toHaveBeenCalled();
  });

  it('Same function returns the same DOM', () => {
    const hash = getHashUrl();
    const root = createDiv();
    render(<div id={hash}>Hello</div>, { container: root });
    const getContainer = createGetContainer(hash);
    let anchorInstance: InternalAnchorClass;
    const { container } = render(
      <Anchor
        getContainer={getContainer}
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);

    anchorInstance!.handleScroll();
    expect(anchorInstance!.state).not.toBe(null);
  });

  it('Same function returns different DOM', async () => {
    const hash1 = getHashUrl();
    const hash2 = getHashUrl();
    const root = createDiv();
    render(
      <div>
        <div id={hash1}>Hello</div>
        <div id={hash2}>World</div>
      </div>,
      { container: root },
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
    let anchorInstance: InternalAnchorClass;
    const { rerender } = render(
      <Anchor
        getContainer={getContainer}
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`#${hash1}`} title={hash1} />
        <Link href={`#${hash2}`} title={hash2} />
      </Anchor>,
    );
    const removeListenerSpy = jest.spyOn((anchorInstance! as any).scrollEvent, 'remove');
    expect(removeListenerSpy).not.toHaveBeenCalled();
    await sleep(1000);
    holdContainer.container = document.getElementById(hash2);
    rerender(
      <Anchor getContainer={getContainer}>
        <Link href={`#${hash1}`} title={hash1} />
        <Link href={`#${hash2}`} title={hash2} />
      </Anchor>,
    );
    expect(removeListenerSpy).toHaveBeenCalled();
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
    render(<h1 id={hash}>Hello</h1>, { container: root });
    let anchorInstance: InternalAnchorClass;
    const { rerender } = render(
      <Anchor
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    const setProps = (props: Record<string, any>) =>
      rerender(
        <Anchor
          ref={node => {
            anchorInstance = node as InternalAnchorClass;
          }}
          {...props}
        >
          <Link href={`#${hash}`} title={hash} />
        </Anchor>,
      );

    anchorInstance!.handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 1000);
    dateNowMock = dataNowMockFn();

    setProps({ offsetTop: 100 });

    anchorInstance!.handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 900);
    dateNowMock = dataNowMockFn();

    setProps({ targetOffset: 200 });

    anchorInstance!.handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);

    dateNowMock.mockRestore();
  });

  // https://github.com/ant-design/ant-design/issues/31941
  it('Anchor targetOffset prop when contain spaces', async () => {
    const hash = `${getHashUrl()} s p a c e s`;
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
    render(<h1 id={hash}>Hello</h1>, { container: root });
    let anchorInstance: InternalAnchorClass;
    const { rerender } = render(
      <Anchor
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    const setProps = (props: Record<string, any>) =>
      rerender(
        <Anchor
          ref={node => {
            anchorInstance = node as InternalAnchorClass;
          }}
          {...props}
        >
          <Link href={`#${hash}`} title={hash} />
        </Anchor>,
      );

    anchorInstance!.handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 1000);
    dateNowMock = dataNowMockFn();

    setProps({ offsetTop: 100 });
    anchorInstance!.handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 900);
    dateNowMock = dataNowMockFn();

    setProps({ targetOffset: 200 });
    anchorInstance!.handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);

    dateNowMock.mockRestore();
  });

  it('Anchor onChange prop', async () => {
    const hash1 = getHashUrl();
    const hash2 = getHashUrl();
    const onChange = jest.fn();
    let anchorInstance: InternalAnchorClass;
    render(
      <Anchor
        onChange={onChange}
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`#${hash1}`} title={hash1} />
        <Link href={`#${hash2}`} title={hash2} />
      </Anchor>,
      // https://github.com/testing-library/react-testing-library/releases/tag/v13.0.0
      // @ts-ignore
      { legacyRoot: true },
    );

    expect(onChange).toHaveBeenCalledTimes(1);
    anchorInstance!.handleScrollTo(hash2);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(hash2);
  });

  it('invalid hash', async () => {
    let anchorInstance: InternalAnchorClass;
    const { container } = render(
      <Anchor
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href="notexsited" title="title" />
      </Anchor>,
    );

    fireEvent.click(container.querySelector(`a[href="notexsited"]`)!);

    anchorInstance!.handleScrollTo('notexsited');
    expect(anchorInstance!.state).not.toBe(null);
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
    render(<h1 id={hash}>Hello</h1>, { container: root });
    let anchorInstance: InternalAnchorClass;
    const { rerender } = render(
      <Anchor
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    const setProps = (props: Record<string, any>) =>
      rerender(
        <Anchor
          ref={node => {
            anchorInstance = node as InternalAnchorClass;
          }}
          {...props}
        >
          <Link href={`#${hash}`} title={hash} />
        </Anchor>,
      );
    anchorInstance!.handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 1000);
    dateNowMock = dataNowMockFn();

    setProps({ offsetTop: 100 });
    anchorInstance!.handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 900);
    dateNowMock = dataNowMockFn();

    setProps({ targetOffset: 200 });
    anchorInstance!.handleScrollTo(`#${hash}`);
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
    render(<h1 id={hash}>Hello</h1>, { container: root });

    let anchorInstance: InternalAnchorClass;
    const { rerender } = render(
      <Anchor
        getContainer={() => document.body}
        ref={node => {
          anchorInstance = node as InternalAnchorClass;
        }}
      >
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    const setProps = (props: Record<string, any>) =>
      rerender(
        <Anchor
          getContainer={() => document.body}
          ref={node => {
            anchorInstance = node as InternalAnchorClass;
          }}
          {...props}
        >
          <Link href={`#${hash}`} title={hash} />
        </Anchor>,
      );
    anchorInstance!.handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);
    dateNowMock = dataNowMockFn();

    setProps({ offsetTop: 100 });
    anchorInstance!.handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);
    dateNowMock = dataNowMockFn();
    setProps({ targetOffset: 200 });
    anchorInstance!.handleScrollTo(`#${hash}`);
    await sleep(30);
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);

    dateNowMock.mockRestore();
  });

  describe('getCurrentAnchor', () => {
    it('Anchor getCurrentAnchor prop', () => {
      const hash1 = getHashUrl();
      const hash2 = getHashUrl();
      const getCurrentAnchor = () => `#${hash2}`;
      let anchorInstance: InternalAnchorClass;
      render(
        <Anchor
          getCurrentAnchor={getCurrentAnchor}
          ref={node => {
            anchorInstance = node as InternalAnchorClass;
          }}
        >
          <Link href={`#${hash1}`} title={hash1} />
          <Link href={`#${hash2}`} title={hash2} />
        </Anchor>,
      );

      expect(anchorInstance!.state.activeLink).toBe(`#${hash2}`);
    });

    // https://github.com/ant-design/ant-design/issues/30584
    it('should trigger onChange when have getCurrentAnchor', async () => {
      const hash1 = getHashUrl();
      const hash2 = getHashUrl();
      const onChange = jest.fn();
      let anchorInstance: InternalAnchorClass;
      render(
        <Anchor
          onChange={onChange}
          getCurrentAnchor={() => hash1}
          ref={node => {
            anchorInstance = node as InternalAnchorClass;
          }}
        >
          <Link href={`#${hash1}`} title={hash1} />
          <Link href={`#${hash2}`} title={hash2} />
        </Anchor>,
        // https://github.com/testing-library/react-testing-library/releases/tag/v13.0.0
        // @ts-ignore
        { legacyRoot: true },
      );

      expect(onChange).toHaveBeenCalledTimes(1);
      anchorInstance!.handleScrollTo(hash2);
      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange).toHaveBeenCalledWith(hash2);
    });

    // https://github.com/ant-design/ant-design/issues/34784
    it('getCurrentAnchor have default link as argument', async () => {
      const hash1 = getHashUrl();
      const hash2 = getHashUrl();
      const getCurrentAnchor = jest.fn();
      const { container } = render(
        <Anchor getCurrentAnchor={getCurrentAnchor}>
          <Link href={`#${hash1}`} title={hash1} />
          <Link href={`#${hash2}`} title={hash2} />
        </Anchor>,
      );

      fireEvent.click(container.querySelector(`a[href="#${hash1}"]`)!);
      expect(getCurrentAnchor).toHaveBeenCalledWith(`#${hash1}`);
      fireEvent.click(container.querySelector(`a[href="#${hash2}"]`)!);
      expect(getCurrentAnchor).toHaveBeenCalledWith(`#${hash2}`);
    });
  });
});
