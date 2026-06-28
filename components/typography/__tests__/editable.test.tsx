import React from 'react';
import { spyElementPrototypes } from '@rc-component/util';

import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import Base from '../Base';

jest.mock('copy-to-clipboard');

jest.mock('../../_util/styleChecker', () => ({
  isStyleSupport: () => true,
}));

describe('Typography.Editable', () => {
  const LINE_STR_COUNT = 20;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  let mockRectSpy: ReturnType<typeof spyElementPrototypes>;

  beforeAll(() => {
    mockRectSpy = spyElementPrototypes(HTMLElement, {
      offsetHeight: {
        get() {
          let html = (this as any).innerHTML;
          html = html.replace(/<[^>]*>/g, '');
          const lines = Math.ceil(html.length / LINE_STR_COUNT);
          return lines * 16;
        },
      },
      getBoundingClientRect() {
        let html: any = this.innerHTML;
        html = html.replace(/<[^>]*>/g, '');
        const lines = Math.ceil(html.length / LINE_STR_COUNT);
        return { height: lines * 16 };
      },
    });
  });

  afterAll(() => {
    errorSpy.mockRestore();
    mockRectSpy.mockRestore();
  });

  const fullStr =
    'Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light Bamboo is Little Light';

  it('should use editConfig.text over children in editing mode ', async () => {
    const suffix = '--The information is very important';
    const ref = React.createRef<HTMLElement>();
    const { container: wrapper, unmount } = render(
      <Base
        ellipsis={{ rows: 1, suffix }}
        component="p"
        editable={{ text: fullStr + suffix }}
        ref={ref}
      >
        {fullStr}
      </Base>,
    );

    fireEvent.click(wrapper.querySelector('.ant-typography-edit')!);

    expect(wrapper.querySelector('textarea')?.textContent).toBe(fullStr + suffix);

    unmount();
  });

  it('should use children as the fallback of editConfig.text in editing mode', async () => {
    const suffix = '--The information is very important';
    const ref = React.createRef<HTMLElement>();
    const { container: wrapper, unmount } = render(
      <Base ellipsis={{ rows: 1, suffix }} component="p" ref={ref} editable>
        {fullStr}
      </Base>,
    );

    fireEvent.click(wrapper.querySelector('.ant-typography-edit')!);

    expect(wrapper.querySelector('textarea')?.textContent).toBe(fullStr);

    unmount();
  });

  it('dynamic set editable', () => {
    const { container, rerender } = render(<Base component="p">test</Base>);
    expect(container.querySelector('.ant-typography-edit')).toBeFalsy();

    rerender(
      <Base component="p" editable>
        test
      </Base>,
    );
    expect(container.querySelector('.ant-typography-edit')).toBeTruthy();
  });

  it('tabIndex of edit button', () => {
    const { container, rerender } = render(<Base component="p">test</Base>);
    expect(container.querySelector('.ant-typography-edit')).toBeFalsy();

    rerender(
      <Base component="p" editable={{ tabIndex: -1 }}>
        test
      </Base>,
    );
    expect(container.querySelector('.ant-typography-edit')?.getAttribute('tabIndex')).toBe('-1');
  });

  // https://github.com/ant-design/ant-design/issues/56626
  it('editing textarea inherits the edited element font size', () => {
    const { container, unmount } = render(
      <ConfigProvider theme={{ components: { Typography: { fontSizeHeading1: 40 } } }}>
        <Base component="h1" editable>
          Bamboo
        </Base>
      </ConfigProvider>,
    );

    fireEvent.click(container.querySelector('.ant-typography-edit')!);

    // The editing wrapper carries the heading class, so its computed font size
    // is the (customized) heading size; the textarea must inherit it instead of
    // falling back to the user-agent form-control font.
    expect(container.querySelector('.ant-typography-edit-content')).toHaveClass(
      'ant-typography-h1',
    );

    const styleText = Array.from(document.querySelectorAll('style'))
      .map((style) => style.innerHTML)
      .join('');
    expect(styleText).toMatch(/edit-content[^{}]*textarea\{[^}]*font-size:inherit/);
    expect(styleText).toMatch(/edit-content[^{}]*textarea\{[^}]*line-height:inherit/);
    expect(styleText).toMatch(/edit-content[^{}]*textarea\{[^}]*font-family:inherit/);
    expect(styleText).toMatch(/edit-content[^{}]*textarea\{[^}]*font-weight:inherit/);

    unmount();
  });
});
