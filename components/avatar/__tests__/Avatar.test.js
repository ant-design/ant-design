import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { render, fireEvent } from '../../../tests/utils';
import Avatar from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import useBreakpoint from '../../grid/hooks/useBreakpoint';

jest.mock('../../grid/hooks/useBreakpoint');

describe('Avatar Render', () => {
  mountTest(Avatar);
  rtlTest(Avatar);

  const sizes = { xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 };
  let originOffsetWidth;
  beforeAll(() => {
    // Mock offsetHeight
    originOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth').get;
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get() {
        if (this.className === 'ant-avatar-string') {
          return 100;
        }
        return 80;
      },
    });
  });

  afterAll(() => {
    // Restore Mock offsetHeight
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get: originOffsetWidth,
    });
  });

  it('Render long string correctly', () => {
    const { container: wrapper } = render(<Avatar>TestString</Avatar>);
    const children = wrapper.querySelectorAll('.ant-avatar-string');
    expect(children.length).toBe(1);
  });

  it('should render fallback string correctly', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    const { container: wrapper, unmount } = render(
      <Avatar src="http://error.url">Fallback</Avatar>,
      { container: div },
    );
    fireEvent.error(wrapper.querySelector('img'));
    const children = wrapper.querySelectorAll('.ant-avatar-string');
    expect(children.length).toBe(1);
    expect(children[0].textContent).toBe('Fallback');

    unmount();
    global.document.body.removeChild(div);
  });

  it('should handle onError correctly', () => {
    const LOAD_FAILURE_SRC = 'http://error.url';
    const LOAD_SUCCESS_SRC = 'https://joeschmoe.io/api/v1/random';

    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    class Foo extends React.Component {
      state = {
        src: LOAD_FAILURE_SRC,
      };

      handleImgError = () => {
        this.setState({
          src: LOAD_SUCCESS_SRC,
        });
        return false;
      };

      render() {
        const { src } = this.state;
        return <Avatar src={src} onError={this.handleImgError} />;
      }
    }

    const { container: wrapper, unmount } = render(<Foo />, { container: div });
    expect(div.querySelector('img').getAttribute('src')).toBe(LOAD_FAILURE_SRC);
    // mock img load Error, since jsdom do not load resource by default
    // https://github.com/jsdom/jsdom/issues/1816
    fireEvent.error(wrapper.querySelector('img'));

    expect(wrapper.firstChild).toMatchSnapshot();
    expect(div.querySelector('img').getAttribute('src')).toBe(LOAD_SUCCESS_SRC);

    unmount();
    global.document.body.removeChild(div);
  });

  it('should show image on success after a failure state', () => {
    const LOAD_FAILURE_SRC = 'http://error.url';
    const LOAD_SUCCESS_SRC = 'https://joeschmoe.io/api/v1/random';

    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    // simulate error src url
    const {
      container: wrapper,
      unmount,
      rerender,
    } = render(<Avatar src={LOAD_FAILURE_SRC}>Fallback</Avatar>, { container: div });
    fireEvent.error(wrapper.querySelector('img'));

    expect(wrapper.firstChild).toMatchSnapshot();
    expect(wrapper.querySelectorAll('.ant-avatar-string').length).toBe(1);
    // children should show, when image load error without onError return false
    expect(wrapper.querySelector('.ant-avatar-string')).not.toHaveStyle({ opacity: 0 });

    // simulate successful src url
    rerender(<Avatar src={LOAD_SUCCESS_SRC}>Fallback</Avatar>);

    expect(wrapper.firstChild).toMatchSnapshot();
    expect(wrapper.querySelectorAll('.ant-avatar-image').length).toBe(1);

    // cleanup
    unmount();
    global.document.body.removeChild(div);
  });

  it('should calculate scale of avatar children correctly', () => {
    const { container, rerender } = render(<Avatar>Avatar</Avatar>);
    expect(container.querySelector('.ant-avatar-string')).toMatchSnapshot();

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get() {
        if (this.className === 'ant-avatar-string') {
          return 100;
        }
        return 40;
      },
    });

    rerender(<Avatar>xx</Avatar>);
    expect(container.querySelector('.ant-avatar-string')).toMatchSnapshot();
  });

  it('should calculate scale of avatar children correctly with gap', () => {
    const { container: wrapper } = render(<Avatar gap={2}>Avatar</Avatar>);
    expect(wrapper.querySelector('.ant-avatar-string')).toMatchSnapshot();
  });

  it('should warning when pass a string as icon props', () => {
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Avatar size={64} icon="aa" />);
    expect(warnSpy).not.toHaveBeenCalled();

    render(<Avatar size={64} icon="user" />);
    expect(warnSpy).toHaveBeenCalledWith(
      `Warning: [antd: Avatar] \`icon\` is using ReactNode instead of string naming in v4. Please check \`user\` at https://ant.design/components/icon`,
    );
    warnSpy.mockRestore();
  });

  it('support size is number', () => {
    const { container: wrapper } = render(<Avatar size={100}>TestString</Avatar>);
    expect(wrapper.firstChild).toMatchSnapshot();
  });

  Object.entries(sizes).forEach(([key, value]) => {
    it(`adjusts component size to ${value} when window size is ${key}`, () => {
      const wrapper = global.document.createElement('div');

      useBreakpoint.mockReturnValue({ [key]: true });
      act(() => {
        ReactDOM.render(<Avatar size={sizes} />, wrapper);
      });

      expect(wrapper).toMatchSnapshot();
    });
  });

  it('support onMouseEnter', () => {
    const onMouseEnter = jest.fn();
    const { container } = render(<Avatar onMouseEnter={onMouseEnter}>TestString</Avatar>);
    fireEvent.mouseEnter(container.firstChild);
    expect(onMouseEnter).toHaveBeenCalled();
  });

  it('fallback', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const element = (
      <Avatar shape="circle" src="http://error.url">
        A
      </Avatar>
    );
    const { container: wrapper, unmount, rerender } = render(element, { container: div });
    fireEvent.error(wrapper.querySelector('img'));
    rerender(element);
    expect(wrapper.firstChild).toMatchSnapshot();
    unmount();
    global.document.body.removeChild(div);
  });

  it('should exist crossorigin attribute', () => {
    const LOAD_SUCCESS_SRC = 'https://joeschmoe.io/api/v1/random';
    const { container: wrapper, getByRole } = render(
      <Avatar src={LOAD_SUCCESS_SRC} crossOrigin="anonymous">
        crossorigin
      </Avatar>,
    );
    expect(wrapper.querySelector('[crossorigin]')).not.toBeNull();
    expect(getByRole('img').getAttribute('crossOrigin')).toEqual('anonymous');
  });

  it('should not exist crossorigin attribute', () => {
    const LOAD_SUCCESS_SRC = 'https://joeschmoe.io/api/v1/random';
    const { container: wrapper, getByRole } = render(
      <Avatar src={LOAD_SUCCESS_SRC}>crossorigin</Avatar>,
    );
    expect(wrapper.querySelector('[crossorigin]')).toBeNull();
    expect(getByRole('img').getAttribute('crossOrigin')).toEqual(null);
  });
});
