import * as React from 'react';
import { ConfigProvider } from 'antd';

import Divider from '..';
import type { Orientation } from '../../_util/hooks';
import mountTest from '../../../tests/shared/mountTest';
import { render } from '../../../tests/utils';
import type { TitlePlacement } from '../index';

describe('Divider', () => {
  mountTest(Divider);

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
      <ConfigProvider componentSize="middle">
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
    const { container, rerender } = render(<Divider type="vertical" size="middle" />);
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-md')).toBeTruthy();

    rerender(<Divider type="vertical" size="small" />);
    expect(container.querySelector<HTMLSpanElement>('.ant-divider-sm')).toBeTruthy();
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
        expect(
          container
            .querySelector<HTMLSpanElement>('.ant-divider-inner-text')
            ?.style.getPropertyValue('margin-inline-start'),
        ).toBe('20px');
      }
    });
  });
});
