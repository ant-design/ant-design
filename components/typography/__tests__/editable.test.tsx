import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import React from 'react';
import { fireEvent, render } from '../../../tests/utils';
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
          let html = this.innerHTML;
          html = html.replace(/<[^>]*>/g, '');
          const lines = Math.ceil(html.length / LINE_STR_COUNT);
          return lines * 16;
        },
      },
      getBoundingClientRect() {
        let html = this.innerHTML;
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

    expect(wrapper.querySelector('textarea')?.textContent).toEqual(fullStr + suffix);

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

    expect(wrapper.querySelector('textarea')?.textContent).toEqual(fullStr);

    unmount();
  });
});
