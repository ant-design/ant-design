import { resetWarned } from 'rc-util/lib/warning';
import React, { useState } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import Anchor from '..';
import { act, fireEvent, render, waitFakeTimer } from '../../../tests/utils';
import Button from '../../button';
import type { AnchorDirection } from '../Anchor';

const { Link } = Anchor;

function createDiv() {
  const root = document.createElement('div');
  document.body.appendChild(root);
  return root;
}

let idCounter = 0;
const getHashUrl = () => `Anchor-API-${idCounter++}`;

jest.mock('scroll-into-view-if-needed', () => jest.fn());

Object.defineProperty(window, 'location', {
  value: {
    replace: jest.fn(),
  },
});

describe('Anchor Render', () => {
  const getBoundingClientRectMock = jest.spyOn(
    HTMLHeadingElement.prototype,
    'getBoundingClientRect',
  );
  const getClientRectsMock = jest.spyOn(HTMLHeadingElement.prototype, 'getClientRects');
  const scrollIntoViewMock = jest.createMockFromModule<any>('scroll-into-view-if-needed');

  beforeAll(() => {
    jest.useFakeTimers();
    getBoundingClientRectMock.mockReturnValue({
      width: 100,
      height: 100,
      top: 1000,
    } as DOMRect);
    getClientRectsMock.mockReturnValue([1] as unknown as DOMRectList);
  });

  beforeEach(() => {
    jest.useFakeTimers();
    scrollIntoViewMock.mockReset();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  afterAll(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    getBoundingClientRectMock.mockRestore();
    getClientRectsMock.mockRestore();
  });

  it('renders items correctly', () => {
    const { container, asFragment } = render(
      <Anchor
        items={[
          {
            key: '1',
            href: '#components-anchor-demo-basic',
            title: 'Item Basic Demo',
          },
          {
            key: '2',
            href: '#components-anchor-demo-static',
            title: 'Static demo',
          },
          {
            key: '3',
            href: '#api',
            title: 'API',
            children: [
              {
                key: '4',
                href: '#anchor-props',
                title: 'Anchor Props',
                children: [
                  {
                    key: '5',
                    href: '#link-props',
                    title: 'Link Props',
                  },
                ],
              },
            ],
          },
        ]}
      />,
    );
    expect(container.querySelectorAll('.ant-anchor .ant-anchor-link').length).toBe(5);
    const linkTitles = Array.from(container.querySelector('.ant-anchor')?.childNodes!).map((n) =>
      (n as HTMLElement).querySelector('.ant-anchor-link-title'),
    );
    expect((linkTitles[1] as HTMLAnchorElement).href).toContain('#components-anchor-demo-basic');
    expect((linkTitles[2] as HTMLAnchorElement).href).toContain('#components-anchor-demo-static');
    expect((linkTitles[3] as HTMLAnchorElement).href).toContain('#api');
    expect(
      (
        container.querySelector(
          '.ant-anchor .ant-anchor-link .ant-anchor-link .ant-anchor-link-title',
        ) as HTMLAnchorElement
      )?.href,
    ).toContain('#anchor-props');
    expect(
      (
        container.querySelector(
          '.ant-anchor .ant-anchor-link .ant-anchor-link .ant-anchor-link .ant-anchor-link-title',
        ) as HTMLAnchorElement
      )?.href,
    ).toContain('#link-props');
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('renders items correctly#horizontal', () => {
    const { container, asFragment } = render(
      <Anchor
        items={[
          {
            key: '1',
            href: '#components-anchor-demo-basic',
            title: 'Item Basic Demo',
          },
          {
            key: '2',
            href: '#components-anchor-demo-static',
            title: 'Static demo',
          },
          {
            key: '3',
            href: '#api',
            title: 'API',
          },
        ]}
      />,
    );
    expect(container.querySelectorAll('.ant-anchor .ant-anchor-link').length).toBe(3);
    const linkTitles = Array.from(container.querySelector('.ant-anchor')?.childNodes!).map((n) =>
      (n as HTMLElement).querySelector('.ant-anchor-link-title'),
    );
    expect((linkTitles[1] as HTMLAnchorElement).href).toContain('#components-anchor-demo-basic');
    expect((linkTitles[2] as HTMLAnchorElement).href).toContain('#components-anchor-demo-static');
    expect((linkTitles[3] as HTMLAnchorElement).href).toContain('#api');
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('render items and ignore jsx children', () => {
    const { container, asFragment } = render(
      <Anchor
        items={[
          {
            key: '1',
            href: '#components-anchor-demo-basic',
            title: 'Item Basic Demo',
          },
        ]}
      >
        <Link href="#api" title="API" />
      </Anchor>,
    );
    expect(container.querySelectorAll('.ant-anchor .ant-anchor-link').length).toBe(1);
    expect(
      (container.querySelector('.ant-anchor .ant-anchor-link-title') as HTMLAnchorElement).href,
    ).toContain('#components-anchor-demo-basic');
    expect(asFragment().firstChild).toMatchSnapshot();
  });

  it('actives the target when clicking a link', async () => {
    const hash = getHashUrl();
    const { container } = render(
      <Anchor
        prefixCls="ant-anchor"
        direction="horizontal"
        items={[
          {
            key: hash,
            title: hash,
            href: `http://www.example.com/#${hash}`,
          },
        ]}
      />,
    );
    const link = container.querySelector(`a[href="http://www.example.com/#${hash}"]`)!;
    fireEvent.click(link);
    await waitFakeTimer();
    expect(link.classList).toContain('ant-anchor-link-title-active');
  });

  it('scrolls the page when clicking a link', async () => {
    const root = createDiv();
    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    render(<div id="/faq?locale=en#Q1">Q1</div>, { container: root });
    const { container } = render(
      <Anchor items={[{ key: 'Q1', title: 'Q1', href: '/#/faq?locale=en#Q1' }]} />,
    );
    const link = container.querySelector(`a[href="/#/faq?locale=en#Q1"]`)!;
    fireEvent.click(link);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenCalled();
  });

  it('handleScroll should not be triggered when scrolling caused by clicking a link', async () => {
    const hash1 = getHashUrl();
    const hash2 = getHashUrl();
    const root = createDiv();
    const onChange = jest.fn();
    render(
      <div>
        <div id={hash1}>Hello</div>
        <div id={hash2}>World</div>
      </div>,
      { container: root },
    );
    const { container } = render(
      <Anchor
        onChange={onChange}
        items={[
          { key: hash1, href: `#${hash1}`, title: hash1 },
          { key: hash2, href: `#${hash2}`, title: hash2 },
        ]}
      />,
    );
    onChange.mockClear();

    const link = container.querySelector(`a[href="#${hash2}"]`)!;
    // this will trigger 1 onChange
    fireEvent.click(link);
    // smooth scroll caused by clicking needs time to finish.
    // we scroll the window before it finish, the scroll listener should not be triggered,
    fireEvent.scroll(window);

    await waitFakeTimer();
    // if the scroll listener is triggered, we will get 2 onChange, now we expect only 1.
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should update DOM when children are unmounted', () => {
    const hash = getHashUrl();
    const { container, rerender } = render(
      <Anchor items={[{ key: hash, href: `#${hash}`, title: hash }]} />,
    );

    expect(container.querySelectorAll('.ant-anchor-link-title')).toHaveLength(1);
    expect(container.querySelector('.ant-anchor-link-title')).toHaveAttribute('href', `#${hash}`);

    rerender(<Anchor />);
    expect(container.querySelector('.ant-anchor-link-title')).toBeFalsy();
  });

  it('should update DOM when link href is changed', async () => {
    const hash = getHashUrl();
    function AnchorUpdate({ href }: { href: string }) {
      return <Anchor items={[{ key: hash, href, title: hash }]} />;
    }
    const { container, rerender } = render(<AnchorUpdate href={`#${hash}`} />);

    expect(container.querySelector(`a[href="#${hash}"]`)).toBeTruthy();
    rerender(<AnchorUpdate href={`#${hash}_1`} />);
    expect(container.querySelector(`a[href="#${hash}_1"]`)).toBeTruthy();
  });

  it('targetOffset prop', async () => {
    const hash = getHashUrl();

    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    const root = createDiv();
    render(<h1 id={hash}>Hello</h1>, { container: root });
    const { container, rerender } = render(
      <Anchor items={[{ key: hash, href: `#${hash}`, title: hash }]} />,
    );

    const setProps = (props: Record<string, any>) =>
      rerender(<Anchor {...props} items={[{ key: hash, href: `#${hash}`, title: hash }]} />);

    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 1000);

    setProps({ offsetTop: 100 });

    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 900);

    setProps({ targetOffset: 200 });

    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);
  });

  // https://github.com/ant-design/ant-design/issues/31941
  it('targetOffset prop when contain spaces', async () => {
    const hash = `${getHashUrl()} s p a c e s`;

    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    const root = createDiv();
    render(<h1 id={hash}>Hello</h1>, { container: root });
    const { container, rerender } = render(
      <Anchor items={[{ key: hash, href: `#${hash}`, title: hash }]} />,
    );

    const setProps = (props: Record<string, any>) =>
      rerender(<Anchor {...props} items={[{ key: hash, href: `#${hash}`, title: hash }]} />);

    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 1000);

    setProps({ offsetTop: 100 });
    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 900);

    setProps({ targetOffset: 200 });
    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);
  });

  it('onClick event', () => {
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
    const { container } = render(
      <Anchor onClick={handleClick} items={[{ key: hash, href, title }]} />,
    );

    fireEvent.click(container.querySelector(`a[href="${href}"]`)!);
    expect(event).not.toBe(undefined);
    expect(link).toEqual({ href, title });
  });

  it('replaces item href in browser history', () => {
    const hash = getHashUrl();

    const href = `#${hash}`;
    const title = hash;
    const { container } = render(<Anchor replace items={[{ key: hash, href, title }]} />);

    fireEvent.click(container.querySelector(`a[href="${href}"]`)!);
    expect(window.location.replace).toHaveBeenCalledWith(href);
  });

  it('onChange event', () => {
    const hash1 = getHashUrl();
    const hash2 = getHashUrl();
    const onChange = jest.fn();
    const { container } = render(
      <Anchor
        onChange={onChange}
        items={[
          {
            key: hash1,
            href: `#${hash1}`,
            title: hash1,
          },
          {
            key: hash2,
            href: `#${hash2}`,
            title: hash2,
          },
        ]}
      />,
      // https://github.com/testing-library/react-testing-library/releases/tag/v13.0.0
      { legacyRoot: true },
    );

    expect(onChange).toHaveBeenCalledTimes(1);
    fireEvent.click(container.querySelector(`a[href="#${hash2}"]`)!);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(`#${hash2}`);
  });

  it('should be used the latest onChange method', () => {
    const hash1 = getHashUrl();
    const hash2 = getHashUrl();

    const beforeFn = jest.fn();
    const afterFn = jest.fn();

    const Demo: React.FC = () => {
      const [trigger, setTrigger] = useState(false);
      const onChange = trigger ? afterFn : beforeFn;

      return (
        <>
          <Button className="test-button" onClick={() => setTrigger(true)} />
          <Anchor
            onChange={onChange}
            items={[
              {
                key: hash1,
                href: `#${hash1}`,
                title: hash1,
              },
              {
                key: hash2,
                href: `#${hash2}`,
                title: hash2,
              },
            ]}
          />
        </>
      );
    };

    const { container } = render(<Demo />);
    expect(beforeFn).toHaveBeenCalled();
    expect(afterFn).not.toHaveBeenCalled();

    beforeFn.mockClear();
    afterFn.mockClear();

    fireEvent.click(container.querySelector('.test-button')!);
    fireEvent.click(container.querySelector(`a[href="#${hash2}"]`)!);

    expect(beforeFn).not.toHaveBeenCalled();
    expect(afterFn).toHaveBeenCalled();
  });

  it('handles invalid hash correctly', () => {
    const { container } = render(
      <Anchor items={[{ key: 'title', href: 'nonexistent', title: 'title' }]} />,
    );

    const link = container.querySelector(`a[href="nonexistent"]`)!;
    fireEvent.click(link);
    expect(container.querySelector(`.ant-anchor-link-title-active`)?.textContent).toBe('title');
  });

  it('test edge case when getBoundingClientRect return zero size', async () => {
    getBoundingClientRectMock.mockReturnValue({ width: 0, height: 0, top: 1000 } as DOMRect);
    const hash = getHashUrl();

    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    const root = createDiv();
    render(<h1 id={hash}>Hello</h1>, { container: root });
    const { container, rerender } = render(
      <Anchor>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    const setProps = (props: Record<string, any>) =>
      rerender(
        <Anchor {...props}>
          <Link href={`#${hash}`} title={hash} />
        </Anchor>,
      );

    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 1000);

    setProps({ offsetTop: 100 });
    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 900);

    setProps({ targetOffset: 200 });
    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);

    getBoundingClientRectMock.mockReturnValue({
      width: 100,
      height: 100,
      top: 1000,
    } as DOMRect);
  });

  it('test edge case when container is not windows', async () => {
    const hash = getHashUrl();

    const scrollToSpy = jest.spyOn(window, 'scrollTo');
    const root = createDiv();
    render(<h1 id={hash}>Hello</h1>, { container: root });

    const { container, rerender } = render(
      <Anchor getContainer={() => document.body}>
        <Link href={`#${hash}`} title={hash} />
      </Anchor>,
    );

    const setProps = (props: Record<string, any>) =>
      rerender(
        <Anchor getContainer={() => document.body} {...props}>
          <Link href={`#${hash}`} title={hash} />
        </Anchor>,
      );

    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);

    setProps({ offsetTop: 100 });
    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);

    setProps({ targetOffset: 200 });
    fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
    await waitFakeTimer();
    expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);
  });

  describe('getCurrentAnchor', () => {
    it('getCurrentAnchor prop', () => {
      const hash1 = getHashUrl();
      const hash2 = getHashUrl();
      const getCurrentAnchor = () => `#${hash2}`;
      const { container } = render(
        <Anchor
          getCurrentAnchor={getCurrentAnchor}
          items={[
            { key: hash1, href: `#${hash1}`, title: hash1 },
            { key: hash2, href: `#${hash2}`, title: hash2 },
          ]}
        />,
      );

      expect(container.querySelector(`.ant-anchor-link-title-active`)?.textContent).toBe(hash2);
    });

    // https://github.com/ant-design/ant-design/issues/30584
    it('should trigger onChange when have getCurrentAnchor', () => {
      const hash1 = getHashUrl();
      const hash2 = getHashUrl();
      const onChange = jest.fn();
      const { container } = render(
        <Anchor
          onChange={onChange}
          getCurrentAnchor={() => hash1}
          items={[
            { key: hash1, href: `#${hash1}`, title: hash1 },
            { key: hash2, href: `#${hash2}`, title: hash2 },
          ]}
        />,
        // https://github.com/testing-library/react-testing-library/releases/tag/v13.0.0
        { legacyRoot: true },
      );

      // Should be 2 times:
      // 1. ''
      // 2. hash1 (Since `getCurrentAnchor` still return same hash)
      expect(onChange).toHaveBeenCalledTimes(2);
      fireEvent.click(container.querySelector(`a[href="#${hash2}"]`)!);
      expect(onChange).toHaveBeenCalledTimes(3);
      expect(onChange).toHaveBeenLastCalledWith(`#${hash2}`);
    });

    // https://github.com/ant-design/ant-design/issues/34784
    it('getCurrentAnchor have default link as argument', () => {
      const hash1 = getHashUrl();
      const hash2 = getHashUrl();
      const getCurrentAnchor = jest.fn();
      const { container } = render(
        <Anchor
          getCurrentAnchor={getCurrentAnchor}
          items={[
            { key: hash1, href: `#${hash1}`, title: hash1 },
            { key: hash2, href: `#${hash2}`, title: hash2 },
          ]}
        />,
      );

      fireEvent.click(container.querySelector(`a[href="#${hash1}"]`)!);
      expect(getCurrentAnchor).toHaveBeenCalledWith(`#${hash1}`);
      fireEvent.click(container.querySelector(`a[href="#${hash2}"]`)!);
      expect(getCurrentAnchor).toHaveBeenCalledWith(`#${hash2}`);
    });

    // https://github.com/ant-design/ant-design/issues/37627
    it('should update active link when getCurrentAnchor changes', async () => {
      const hash1 = getHashUrl();
      const hash2 = getHashUrl();
      const Demo: React.FC<{ current: string }> = ({ current }) => (
        <Anchor
          getCurrentAnchor={() => `#${current}`}
          items={[
            { key: hash1, href: `#${hash1}`, title: hash1 },
            { key: hash2, href: `#${hash2}`, title: hash2 },
          ]}
        />
      );
      const { container, rerender } = render(<Demo current={hash1} />);
      expect(container.querySelector(`.ant-anchor-link-title-active`)?.textContent).toBe(hash1);
      rerender(<Demo current={hash2} />);
      expect(container.querySelector(`.ant-anchor-link-title-active`)?.textContent).toBe(hash2);
    });

    it('should render correctly when href is null', () => {
      expect(() => {
        render(
          <Anchor items={[{ key: 'test', href: null as unknown as string, title: 'test' }]} />,
        );
        fireEvent.scroll(window || document);
      }).not.toThrow();
    });

    it('should repeat trigger when scrolling', () => {
      const getCurrentAnchor = jest.fn();
      render(
        <Anchor
          getCurrentAnchor={getCurrentAnchor}
          items={[{ key: 'test', href: null as unknown as string, title: 'test' }]}
        />,
      );

      for (let i = 0; i < 100; i += 1) {
        getCurrentAnchor.mockReset();
        fireEvent.scroll(window || document);
        expect(getCurrentAnchor).toHaveBeenCalled();
      }
    });
  });

  describe('horizontal anchor', () => {
    describe('scroll x', () => {
      it('targetOffset horizontal', async () => {
        const hash = getHashUrl();
        const scrollToSpy = jest.spyOn(window, 'scrollTo');
        const root = createDiv();
        render(<h1 id={hash}>Hello</h1>, { container: root });
        const { container, rerender } = render(
          <Anchor
            direction="horizontal"
            items={[
              {
                key: hash,
                href: `#${hash}`,
                title: hash,
              },
            ]}
          />,
        );
        const setProps = (props: Record<string, any>) =>
          rerender(
            <Anchor
              {...props}
              direction="horizontal"
              items={[
                {
                  key: hash,
                  href: `#${hash}`,
                  title: hash,
                },
              ]}
            />,
          );
        fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
        await waitFakeTimer();

        expect(scrollIntoView).toHaveBeenCalled();
        expect(scrollToSpy).toHaveBeenLastCalledWith(0, 1000);

        setProps({ offsetTop: 100 });

        fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
        await waitFakeTimer();
        expect(scrollToSpy).toHaveBeenLastCalledWith(0, 900);

        setProps({ targetOffset: 200 });
        fireEvent.click(container.querySelector(`a[href="#${hash}"]`)!);
        await waitFakeTimer();
        expect(scrollToSpy).toHaveBeenLastCalledWith(0, 800);
      });
    });

    it('test direction prop', () => {
      const { container } = render(
        <Anchor
          direction="horizontal"
          items={[
            {
              key: '1',
              href: '#components-anchor-demo-basic',
              title: 'Item Basic Demo',
            },
            {
              key: '2',
              href: '#components-anchor-demo-static',
              title: 'Static demo',
            },
            {
              key: '3',
              href: '#api',
              title: 'API',
            },
          ]}
        />,
      );
      expect(container.querySelectorAll('.ant-anchor-ink').length).toBe(1);
      expect(
        container
          .querySelector('.ant-anchor-wrapper')
          ?.classList.contains('ant-anchor-wrapper-horizontal'),
      ).toBeTruthy();
    });

    it('nested children via items should be filtered out when direction is horizontal', () => {
      const { container } = render(
        <Anchor
          direction="horizontal"
          items={[
            {
              key: '1',
              href: '#components-anchor-demo-basic',
              title: 'Item Basic Demo',
            },
            {
              key: '2',
              href: '#components-anchor-demo-static',
              title: 'Static demo',
            },
            {
              key: '3',
              href: '#api',
              title: 'API',
              children: [
                {
                  key: '4',
                  href: '#anchor-props',
                  title: 'Anchor Props',
                },
                {
                  key: '5',
                  href: '#link-props',
                  title: 'Link Props',
                },
              ],
            },
          ]}
        />,
      );
      expect(container.querySelectorAll('.ant-anchor-link').length).toBe(3);
    });

    it('nested children via jsx should be filtered out when direction is horizontal', () => {
      const { container } = render(
        <Anchor direction="horizontal">
          <Link href="#components-anchor-demo-basic" title="Basic demo" />
          <Link href="#components-anchor-demo-static" title="Static demo" />
          <Link href="#api" title="API">
            <Link href="#anchor-props" title="Anchor Props" />
            <Link href="#link-props" title="Link Props" />
          </Link>
        </Anchor>,
      );
      expect(container.querySelectorAll('.ant-anchor-link').length).toBe(3);
    });
  });

  describe('deprecated/legacy jsx syntax', () => {
    it('renders jsx correctly', () => {
      const hash = getHashUrl();
      const { container } = render(
        <Anchor>
          <Link href={`#${hash}`} title={hash} />
        </Anchor>,
      );
      expect(container.querySelector(`a[href="#${hash}"]`)).not.toBe(null);
    });

    it('actives the target when clicking a link', async () => {
      const hash = getHashUrl();
      const { container } = render(
        <Anchor prefixCls="ant-anchor">
          <Link href={`http://www.example.com/#${hash}`} title={hash} />
        </Anchor>,
      );
      const link = container.querySelector(`a[href="http://www.example.com/#${hash}"]`)!;
      fireEvent.click(link);
      await waitFakeTimer();
      expect(link.classList).toContain('ant-anchor-link-title-active');
    });

    it('scrolls the page when clicking a link', async () => {
      const root = createDiv();
      const scrollToSpy = jest.spyOn(window, 'scrollTo');
      render(<div id="/faq?locale=en#Q1">Q1</div>, { container: root });
      const { container } = render(
        <Anchor>
          <Link href="/#/faq?locale=en#Q1" title="Q1" />
        </Anchor>,
      );
      const link = container.querySelector(`a[href="/#/faq?locale=en#Q1"]`)!;
      fireEvent.click(link);
      await waitFakeTimer();
      expect(scrollToSpy).toHaveBeenCalled();
    });

    it('handleScroll should not be triggered when scrolling caused by clicking a link', async () => {
      const hash1 = getHashUrl();
      const hash2 = getHashUrl();
      const root = createDiv();
      const onChange = jest.fn();
      render(
        <div>
          <div id={hash1}>Hello</div>
          <div id={hash2}>World</div>
        </div>,
        { container: root },
      );
      const { container } = render(
        <Anchor onChange={onChange}>
          <Link href={`#${hash1}`} title={hash1} />
          <Link href={`#${hash2}`} title={hash2} />
        </Anchor>,
      );
      onChange.mockClear();

      const link = container.querySelector(`a[href="#${hash2}"]`)!;
      // this will trigger 1 onChange
      fireEvent.click(link);
      // smooth scroll caused by clicking needs time to finish.
      // we scroll the window before it finish, the scroll listener should not be triggered,
      fireEvent.scroll(window);

      await waitFakeTimer();
      // if the scroll listener is triggered, we will get 2 onChange, now we expect only 1.
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should update DOM when children are unmounted', () => {
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

    it('should update DOM when link href is changed', async () => {
      const hash = getHashUrl();
      function AnchorUpdate({ href }: { href: string }) {
        return (
          <Anchor>
            <Link href={href} title={hash} />
          </Anchor>
        );
      }
      const { container, rerender } = render(<AnchorUpdate href={`#${hash}`} />);

      expect(container.querySelector(`a[href="#${hash}"]`)).toBeTruthy();
      rerender(<AnchorUpdate href={`#${hash}_1`} />);
      expect(container.querySelector(`a[href="#${hash}_1"]`)).toBeTruthy();
    });

    it('handles invalid hash correctly', () => {
      const { container } = render(
        <Anchor>
          <Link href="nonexistent" title="title" />
        </Anchor>,
      );

      const link = container.querySelector(`a[href="nonexistent"]`)!;
      fireEvent.click(link);
      expect(container.querySelector(`.ant-anchor-link-title-active`)?.textContent).toBe('title');
    });
  });

  describe('warning', () => {
    let errSpy: jest.SpyInstance;
    beforeEach(() => {
      resetWarned();
      errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      errSpy.mockRestore();
    });

    it('warning nested children when direction is horizontal ', () => {
      render(
        <Anchor
          direction="horizontal"
          items={[
            {
              key: '1',
              href: '#components-anchor-demo-basic',
              title: 'Item Basic Demo',
            },
            {
              key: '2',
              href: '#components-anchor-demo-static',
              title: 'Static demo',
            },
            {
              key: '3',
              href: '#api',
              title: 'API',
              children: [
                {
                  key: '4',
                  href: '#anchor-props',
                  title: 'Anchor Props',
                },
              ],
            },
          ]}
        />,
      );
      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Anchor] `Anchor items#children` is not supported when `Anchor` direction is horizontal.',
      );
    });

    it('deprecated jsx style', () => {
      render(
        <Anchor direction="horizontal">
          <Link href="#components-anchor-demo-basic" title="Basic demo" />
          <Link href="#components-anchor-demo-static" title="Static demo" />
        </Anchor>,
      );
      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Anchor] `Anchor children` is deprecated. Please use `items` instead.',
      );
    });

    it('deprecated jsx style for direction#vertical', () => {
      render(
        <Anchor>
          <Link href="#components-anchor-demo-basic" title="Basic demo" />
          <Link href="#components-anchor-demo-static" title="Static demo" />
        </Anchor>,
      );
      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Anchor] `Anchor children` is deprecated. Please use `items` instead.',
      );
    });

    it('deprecated jsx style for direction#vertical 1: with nested children', () => {
      render(
        <Anchor direction="horizontal">
          <Link href="#api" title="API">
            <Link href="#anchor-props" title="Anchor Props" />
          </Link>
        </Anchor>,
      );
      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Anchor] `Anchor children` is deprecated. Please use `items` instead.',
      );
      expect(errSpy).toHaveBeenCalledWith(
        'Warning: [antd: Anchor.Link] `Anchor.Link children` is not supported when `Anchor` direction is horizontal',
      );
    });
    it('switch direction', async () => {
      const Foo: React.FC = () => {
        const [direction, setDirection] = useState<AnchorDirection>('vertical');
        const toggle = () => {
          setDirection(direction === 'vertical' ? 'horizontal' : 'vertical');
        };
        return (
          <div>
            <button onClick={toggle} type="button">
              toggle
            </button>
            <Anchor
              direction={direction}
              items={[
                {
                  title: 'part-1',
                  href: 'part-1',
                  key: 'part-1',
                },
                {
                  title: 'part-2',
                  href: 'part-2',
                  key: 'part-2',
                },
              ]}
            />
          </div>
        );
      };
      const wrapper = await render(<Foo />);
      (await wrapper.findByText('part-1')).click();
      await waitFakeTimer();
      const ink = wrapper.container.querySelector<HTMLSpanElement>('.ant-anchor-ink')!;
      const toggleButton = wrapper.container.querySelector('button')!;

      fireEvent.click(toggleButton);
      act(() => jest.runAllTimers());
      expect(!!ink.style.left).toBe(true);
      expect(!!ink.style.width).toBe(true);
      expect(ink.style.top).toBe('');
      expect(ink.style.height).toBe('');

      fireEvent.click(toggleButton);
      act(() => jest.runAllTimers());
      expect(!!ink.style.top).toBe(true);
      expect(!!ink.style.height).toBe(true);
      expect(ink.style.left).toBe('');
      expect(ink.style.width).toBe('');
    });
  });
});
