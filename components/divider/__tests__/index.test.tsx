import * as React from 'react';

import Divider from '..';
import type { DividerProps, TitlePlacement } from '..';
import type { Orientation } from '../../_util/hooks';
import mountTest from '../../../tests/shared/mountTest';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Divider', () => {
  mountTest(Divider);

  it.each<[DividerProps['variant'], DividerProps['variant'], string]>([
    [undefined, undefined, 'solid'],
    ['dotted', undefined, 'dotted'],
    ['dashed', undefined, 'dashed'],
    ['solid', 'dotted', 'dotted'],
    ['dotted', 'solid', 'solid'],
    ['dashed', 'dotted', 'dotted'],
  ])('config variant %s and prop variant %s render %s', (configVariant, variant, expected) => {
    const { container } = render(
      <ConfigProvider divider={{ variant: configVariant }}>
        <Divider variant={variant} />
      </ConfigProvider>,
    );
    const divider = container.querySelector('.ant-divider');

    if (expected === 'solid') {
      expect(divider).not.toHaveClass('ant-divider-dashed', 'ant-divider-dotted');
    } else {
      expect(divider).toHaveClass(`ant-divider-${expected}`);
      expect(divider).toHaveStyle({ borderStyle: expected });
    }
  });

  it('passes the configured variant to semantic functions', () => {
    const { container } = render(
      <ConfigProvider divider={{ variant: 'dotted' }}>
        <Divider
          classNames={({ props }) => ({ root: `custom-${props.variant}` })}
          styles={({ props }) => ({ root: { opacity: props.variant === 'dotted' ? 0.5 : 1 } })}
        />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-divider')).toHaveClass('custom-dotted');
    expect(container.querySelector('.ant-divider')).toHaveStyle({ opacity: 0.5 });
  });

  it('does not consume the top-level variant', () => {
    const { container } = render(
      <ConfigProvider variant="filled">
        <Divider />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-divider')).not.toHaveClass('ant-divider-filled');
    expect(container.querySelector('.ant-divider')).not.toHaveClass(
      'ant-divider-dashed',
      'ant-divider-dotted',
    );
  });

  it('should support nativeElement ref', () => {
    const ref = React.createRef<React.ComponentRef<typeof Divider>>();
    const { container } = render(<Divider ref={ref} />);

    expect(ref.current?.nativeElement).toBe(container.querySelector('.ant-divider'));
  });

  it('not show children when vertical', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { container } = render(<Divider type="vertical">Bamboo</Divider>);
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-inner-text')).toBeFalsy();

    errSpy.mockRestore();
  });

  it('support string orientationMargin', () => {
    const { container } = render(
      <Divider titlePlacement="end" orientationMargin="10">
        test test test
      </Divider>,
    );
    expect(container?.querySelector<HTMLSpanElement>('.ant-divider-inner-text')).toHaveStyle({
      marginRight: 10,
    });
  });

  it('support bool dashed', () => {
    const { container } = render(<Divider dashed>test test test</Divider>);
    expect(container?.querySelector<HTMLSpanElement>('.ant-divider-dashed')).toHaveStyle({
      borderStyle: 'dashed',
    });
  });

  it('support string variant', () => {
    const { container } = render(<Divider variant="dotted">test dotted</Divider>);
    expect(container?.querySelector<HTMLSpanElement>('.ant-divider-dotted')).toHaveStyle({
      borderStyle: 'dotted',
    });
  });

  it('should apply the componentSize of ConfigProvider', () => {
    const { container, rerender } = render(
      <ConfigProvider componentSize="medium">
        <Divider />
      </ConfigProvider>,
    );
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-md')).toBeTruthy();

    rerender(
      <ConfigProvider componentSize="small">
        <Divider />
      </ConfigProvider>,
    );
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-sm')).toBeTruthy();
  });

  it('support vertical size', () => {
    const { container, rerender } = render(<Divider type="vertical" size="medium" />);
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-md')).toBeTruthy();

    rerender(<Divider type="vertical" size="small" />);
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-sm')).toBeTruthy();
  });

  it('render numeric zero children as separator text', () => {
    const { container } = render(<Divider>{0}</Divider>);

    const divider = container.querySelector<HTMLDivElement>('.ant-divider')!;
    expect(divider).toHaveClass('ant-divider-with-text');
    expect(divider).not.toHaveClass('ant-divider-rail');
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-inner-text')).toHaveTextContent(
      '0',
    );
  });

  it('keep empty children as a plain divider', () => {
    const { container } = render(<Divider />);

    const divider = container.querySelector<HTMLDivElement>('.ant-divider')!;
    expect(divider).not.toHaveClass('ant-divider-with-text');
    expect(divider).toHaveClass('ant-divider-rail');
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-inner-text')).toBeFalsy();
  });

  describe('orientation and placement attribute', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const testCases: Array<
      [
        params: [
          orientation?: Orientation | TitlePlacement,
          vertical?: boolean,
          type?: Orientation,
          titlePlacement?: TitlePlacement,
          orientationMargin?: number,
        ],
        expected: string,
      ]
    > = [
      [['right'], '.ant-divider-with-text-end'],
      [['vertical', undefined, 'horizontal'], '.ant-divider-vertical'],
      [[undefined, undefined, 'vertical'], '.ant-divider-vertical'],
      [['center', undefined, undefined, 'left'], '.ant-divider-with-text-start'],
      [['horizontal', true, undefined], '.ant-divider-horizontal'],
      [[undefined, true, 'horizontal'], '.ant-divider-vertical'],
      [['center', undefined, 'horizontal', 'left', 20], '.ant-divider-with-text-start'],
    ];
    it.each(testCases)('with args %j should have %s node', (params, expected) => {
      const { container } = render(
        <Divider
          orientation={params[0] as Orientation}
          vertical={params[1]}
          type={params[2]}
          titlePlacement={params[3]}
          {...(params[4] && { orientationMargin: params[4] })}
        >
          Bamboo
        </Divider>,
      );
      expect(container.querySelector<HTMLSpanElement>(expected)).not.toBeNull();
      if (params[4]) {
        expect(container.querySelector<HTMLSpanElement>('.ant-divider-inner-text')).toHaveStyle({
          marginInlineStart: `${params[4]}px`,
        });
      }
    });
  });
});
