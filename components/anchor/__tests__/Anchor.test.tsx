import React from 'react';
import Anchor from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';

const { Link } = Anchor;

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
    jest.useFakeTimers();
    getBoundingClientRectMock.mockReturnValue({
      width: 100,
      height: 100,
      top: 1000,
    } as DOMRect);
    getClientRectsMock.mockReturnValue({ length: 1 } as DOMRectList);
  });

  beforeEach(() => {
    jest.useFakeTimers();
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

  it('renders correctly', () => {
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

  it('targetOffset prop', async () => {
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
  });

  // https://github.com/ant-design/ant-design/issues/31941
  it('targetOffset prop when contain spaces', async () => {
    const hash = `${getHashUrl()} s p a c e s`;

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
      <Anchor onClick={handleClick}>
        <Link href={href} title={title} />
      </Anchor>,
    );

    fireEvent.click(container.querySelector(`a[href="${href}"]`)!);
    expect(event).not.toBe(undefined);
    expect(link).toEqual({ href, title });
  });

  it('onChange event', () => {
    const hash1 = getHashUrl();
    const hash2 = getHashUrl();
    const onChange = jest.fn();
    const { container } = render(
      <Anchor onChange={onChange}>
        <Link href={`#${hash1}`} title={hash1} />
        <Link href={`#${hash2}`} title={hash2} />
      </Anchor>,
      // https://github.com/testing-library/react-testing-library/releases/tag/v13.0.0
      // @ts-ignore
      { legacyRoot: true },
    );

    expect(onChange).toHaveBeenCalledTimes(1);
    fireEvent.click(container.querySelector(`a[href="#${hash2}"]`)!);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(`#${hash2}`);
  });

  it('handles invalid hash correctly', () => {
    const { container } = render(
      <Anchor>
        <Link href="notexsited" title="title" />
      </Anchor>,
    );

    const link = container.querySelector(`a[href="notexsited"]`)!;
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
        <Anchor getCurrentAnchor={getCurrentAnchor}>
          <Link href={`#${hash1}`} title={hash1} />
          <Link href={`#${hash2}`} title={hash2} />
        </Anchor>,
      );

      expect(container.querySelector(`.ant-anchor-link-title-active`)?.textContent).toBe(hash2);
    });

    // https://github.com/ant-design/ant-design/issues/30584
    it('should trigger onChange when have getCurrentAnchor', () => {
      const hash1 = getHashUrl();
      const hash2 = getHashUrl();
      const onChange = jest.fn();
      const { container } = render(
        <Anchor onChange={onChange} getCurrentAnchor={() => hash1}>
          <Link href={`#${hash1}`} title={hash1} />
          <Link href={`#${hash2}`} title={hash2} />
        </Anchor>,
        // https://github.com/testing-library/react-testing-library/releases/tag/v13.0.0
        // @ts-ignore
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

    // https://github.com/ant-design/ant-design/issues/37627
    it('should update active link when getCurrentAnchor changes', async () => {
      const hash1 = getHashUrl();
      const hash2 = getHashUrl();
      const Demo: React.FC<{ current: string }> = ({ current }) => (
        <Anchor getCurrentAnchor={() => `#${current}`}>
          <Link href={`#${hash1}`} title={hash1} />
          <Link href={`#${hash2}`} title={hash2} />
        </Anchor>
      );
      const { container, rerender } = render(<Demo current={hash1} />);
      expect(container.querySelector(`.ant-anchor-link-title-active`)?.textContent).toBe(hash1);
      rerender(<Demo current={hash2} />);
      expect(container.querySelector(`.ant-anchor-link-title-active`)?.textContent).toBe(hash2);
    });

    it('should render correctly when href is null', () => {
      expect(() => {
        render(
          <Anchor>
            <Link href={null as unknown as string} title="test" />
          </Anchor>,
        );
        fireEvent.scroll(window || document);
      }).not.toThrow();
    });

    it('should repeat trigger when scrolling', () => {
      const getCurrentAnchor = jest.fn();
      render(<Anchor getCurrentAnchor={getCurrentAnchor} />);

      for (let i = 0; i < 100; i += 1) {
        getCurrentAnchor.mockReset();
        fireEvent.scroll(window || document);
        expect(getCurrentAnchor).toHaveBeenCalled();
      }
    });
  });
});
