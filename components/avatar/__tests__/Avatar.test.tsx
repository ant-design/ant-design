import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Avatar from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import useBreakpoint from '../../grid/hooks/useBreakpoint';

jest.mock('../../grid/hooks/useBreakpoint');

describe('Avatar Render', () => {
  mountTest(Avatar);
  rtlTest(Avatar);

  const sizes = { xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 };
  let originOffsetWidth: PropertyDescriptor['get'];
  beforeAll(() => {
    // Mock offsetHeight
    originOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')?.get;
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
    const { container } = render(<Avatar>TestString</Avatar>);
    expect(container.querySelectorAll('.ant-avatar-string').length).toBe(1);
  });

  it('should render fallback string correctly', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const { container } = render(<Avatar src="http://error.url">Fallback</Avatar>);
    fireEvent.error(container.querySelector('img')!);
    const children = container.querySelectorAll('.ant-avatar-string');
    expect(children.length).toBe(1);
    expect(children[0].innerHTML).toBe('Fallback');
    global.document.body.removeChild(div);
  });

  it('should handle onError correctly', () => {
    const LOAD_FAILURE_SRC = 'http://error.url/';
    const LOAD_SUCCESS_SRC = 'https://xsgames.co/randomusers/avatar.php?g=pixel';
    const Foo: React.FC = () => {
      const [avatarSrc, setAvatarSrc] = useState<typeof LOAD_FAILURE_SRC | typeof LOAD_SUCCESS_SRC>(
        LOAD_FAILURE_SRC,
      );
      const onError = (): boolean => {
        setAvatarSrc(LOAD_SUCCESS_SRC);
        return false;
      };
      return <Avatar src={avatarSrc} onError={onError} />;
    };
    const { container } = render(<Foo />);
    expect(container.querySelector('img')?.src).toBe(LOAD_FAILURE_SRC);
    // mock img load Error, since jsdom do not load resource by default
    // https://github.com/jsdom/jsdom/issues/1816
    fireEvent.error(container.querySelector('img')!);
    expect(container.querySelector('img')?.src).toBe(LOAD_SUCCESS_SRC);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show image on success after a failure state', () => {
    const LOAD_FAILURE_SRC = 'http://error.url';
    const LOAD_SUCCESS_SRC = 'https://xsgames.co/randomusers/avatar.php?g=pixel';

    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    // simulate error src url
    const { container, rerender } = render(<Avatar src={LOAD_FAILURE_SRC}>Fallback</Avatar>);

    fireEvent.error(container.querySelector('img')!);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelectorAll('.ant-avatar-string').length).toBe(1);
    // children should show, when image load error without onError return false
    expect(container.querySelector<HTMLDivElement>('.ant-avatar-string')?.style).not.toHaveProperty(
      'opacity',
      0,
    );

    // simulate successful src url
    rerender(<Avatar src={LOAD_SUCCESS_SRC}>Fallback</Avatar>);

    expect(container.firstChild).toMatchSnapshot();
    expect(container.querySelectorAll('.ant-avatar-image').length).toBe(1);

    global.document.body.removeChild(div);
  });

  it('should calculate scale of avatar children correctly', () => {
    const { container, rerender } = render(<Avatar>Avatar</Avatar>);
    expect(container.querySelector('.ant-avatar-string')).toMatchSnapshot();

    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      get() {
        return this.className === 'ant-avatar-string' ? 100 : 40;
      },
    });

    rerender(<Avatar>xx</Avatar>);
    expect(container.querySelector('.ant-avatar-string')).toMatchSnapshot();
  });

  it('should calculate scale of avatar children correctly with gap', () => {
    const { container } = render(<Avatar gap={2}>Avatar</Avatar>);
    expect(container.querySelector('.ant-avatar-string')).toMatchSnapshot();
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
    const { container } = render(<Avatar size={100}>TestString</Avatar>);
    expect(container.firstChild).toMatchSnapshot();
  });

  Object.entries(sizes).forEach(([key, value]) => {
    it(`adjusts component size to ${value} when window size is ${key}`, () => {
      const wrapper = global.document.createElement('div');

      (useBreakpoint as any).mockReturnValue({ [key]: true });
      act(() => {
        ReactDOM.render(<Avatar size={sizes} />, wrapper);
      });

      expect(wrapper).toMatchSnapshot();
    });
  });

  it('support onMouseEnter', () => {
    const onMouseEnter = jest.fn();
    const { container } = render(<Avatar {...{ onMouseEnter }}>TestString</Avatar>);
    fireEvent.mouseEnter(container.firstChild!);
    expect(onMouseEnter).toHaveBeenCalled();
  });

  it('fallback', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);
    const { container } = render(
      <Avatar shape="circle" src="http://error.url">
        A
      </Avatar>,
    );
    fireEvent.error(container.querySelector('img')!);
    expect(container.firstChild).toMatchSnapshot();
    global.document.body.removeChild(div);
  });

  it('should exist crossorigin attribute', () => {
    const LOAD_SUCCESS_SRC = 'https://xsgames.co/randomusers/avatar.php?g=pixel';
    const crossOrigin = 'anonymous';
    const { container } = render(
      <Avatar src={LOAD_SUCCESS_SRC} crossOrigin={crossOrigin}>
        crossorigin
      </Avatar>,
    );
    expect(container.querySelector('img')?.crossOrigin).toBeTruthy();
    expect(container.querySelector('img')?.crossOrigin).toEqual(crossOrigin);
  });

  it('should not exist crossorigin attribute', () => {
    const LOAD_SUCCESS_SRC = 'https://xsgames.co/randomusers/avatar.php?g=pixel';
    const { container } = render(<Avatar src={LOAD_SUCCESS_SRC}>crossorigin</Avatar>);
    expect(container.querySelector('img')?.crossOrigin).toBeFalsy();
    expect(container.querySelector('img')?.crossOrigin).toEqual('');
  });

  it('clickable', () => {
    const onClick = jest.fn();
    const { container } = render(<Avatar onClick={onClick}>TestString</Avatar>);
    fireEvent.click(container.querySelector('.ant-avatar-string')!);
    expect(onClick).toHaveBeenCalled();
  });
});
