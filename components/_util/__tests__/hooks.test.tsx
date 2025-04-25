import React, { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { render, renderHook } from '@testing-library/react';

import useClosable, { computeClosable } from '../hooks/useClosable';
import type { ClosableType } from '../hooks/useClosable';
import { useOrientation, useVertical } from '../hooks/useOrientation';
import type { Orientation } from '../hooks/useOrientation';

describe('hooks test', () => {
  const useClosableParams: {
    params: [closable?: ClosableType, closable?: React.ReactNode, defaultClosable?: boolean];
    res: [boolean, string];
  }[] = [
    // test case like: <Component />
    {
      params: [undefined, undefined, undefined],
      res: [false, ''],
    },
    {
      params: [undefined, undefined, true],
      res: [true, '.anticon-close'],
    },
    {
      params: [undefined, undefined, false],
      res: [false, ''],
    },

    // test case like: <Component closable={false | true} />
    {
      params: [false, undefined, undefined],
      res: [false, ''],
    },
    {
      params: [true, undefined, true],
      res: [true, '.anticon-close'],
    },
    {
      params: [true, undefined, false],
      res: [true, '.anticon-close'],
    },

    // test case like: <Component closable={false | true} closeIcon={null | false | element} />
    {
      params: [false, null, undefined],
      res: [false, ''],
    },
    {
      params: [false, false, undefined],
      res: [false, ''],
    },
    {
      params: [true, null, true],
      res: [true, '.anticon-close'],
    },
    {
      params: [true, false, true],
      res: [true, '.anticon-close'],
    },
    {
      params: [true, null, false],
      res: [true, '.anticon-close'],
    },
    {
      params: [true, false, false],
      res: [true, '.anticon-close'],
    },
    {
      params: [
        true,
        <div className="custom-close" key="close">
          close
        </div>,
        false,
      ],
      res: [true, '.custom-close'],
    },
    {
      params: [false, <div key="close">close</div>, false],
      res: [false, ''],
    },

    // test case like: <Component closeIcon={null | false | element | true} />
    {
      params: [undefined, null, undefined],
      res: [false, ''],
    },
    {
      params: [undefined, false, undefined],
      res: [false, ''],
    },
    {
      params: [undefined, true, undefined],
      res: [true, '.anticon-close'],
    },
    {
      params: [
        undefined,
        <div className="custom-close" key="close">
          close
        </div>,
        undefined,
      ],
      res: [true, '.custom-close'],
    },
    {
      params: [
        undefined,
        <div className="custom-close" key="close">
          close
        </div>,
        true,
      ],
      res: [true, '.custom-close'],
    },
    {
      params: [
        undefined,
        <div className="custom-close" key="close">
          close
        </div>,
        false,
      ],
      res: [true, '.custom-close'],
    },
    {
      params: [
        {
          closeIcon: 'Close',
          'aria-label': 'Close Btn',
        },
        undefined,
        false,
      ],
      res: [true, '*[aria-label="Close Btn"]'],
    },
  ];

  useClosableParams.forEach(({ params, res }) => {
    it(`useClosable with closable=${params[0]},closeIcon=${
      React.isValidElement(params[1]) ? 'element' : params[1]
    },defaultClosable=${params[2]}. the result should be ${res}`, () => {
      const App = () => {
        const [closable, closeIcon] = useClosable(
          {
            closable: params[0],
            closeIcon: params[1],
          },
          null,
          {
            closable: params[2],
          },
        );
        useEffect(() => {
          expect(closable).toBe(res[0]);
        }, [closable]);
        return <div>hooks test {closeIcon}</div>;
      };
      const { container } = render(<App />);
      if (res[1] === '') {
        expect(container.querySelector('.anticon-close')).toBeFalsy();
      } else {
        expect(container.querySelector(`${res[1]}`)).toBeTruthy();
      }
    });
  });

  it('useClosable with defaultCloseIcon', () => {
    const App = () => {
      const [closable, closeIcon] = useClosable(
        {
          closable: true,
        },
        null,
        {
          closeIcon: <CloseOutlined className="custom-close-icon" />,
        },
      );
      useEffect(() => {
        expect(closable).toBe(true);
      }, [closable]);
      return <div>hooks test {closeIcon}</div>;
    };
    const { container } = render(<App />);
    expect(container.querySelector('.custom-close-icon')).toBeTruthy();
  });

  it('useClosable without defaultCloseIcon', () => {
    const App = () => {
      const [closable, closeIcon] = useClosable(
        {
          closable: true,
        },
        null,
      );
      useEffect(() => {
        expect(closable).toBe(true);
      }, [closable]);
      return <div>hooks test {closeIcon}</div>;
    };
    const { container } = render(<App />);
    expect(container.querySelector('.anticon-close')).toBeTruthy();
  });

  it('useClosable with customCloseIconRender', () => {
    const App = () => {
      const customCloseIconRender = (icon: React.ReactNode) => (
        <span className="custom-close-wrapper">{icon}</span>
      );
      const [closable, closeIcon] = useClosable(
        {
          closable: true,
        },
        null,
        {
          closeIconRender: customCloseIconRender,
        },
      );
      useEffect(() => {
        expect(closable).toBe(true);
      }, [closable]);
      return <div>hooks test {closeIcon}</div>;
    };
    const { container } = render(<App />);
    expect(container.querySelector('.custom-close-wrapper')).toBeTruthy();
  });

  const computeClosableParams: { params: any[]; res: [boolean, string] }[] = [
    {
      params: [
        undefined,
        {
          closable: true,
        },
        undefined,
      ],
      res: [true, '.anticon-close'],
    },
    {
      params: [
        undefined,
        {
          closable: false,
        },
        undefined,
      ],
      res: [false, ''],
    },
    {
      params: [
        {
          closable: false,
        },
        undefined,
        undefined,
      ],
      res: [false, ''],
    },
  ];
  computeClosableParams.forEach((item) => {
    const params = item.params;
    const res = item.res;
    it(`useClosable with propCloseCollection=${JSON.stringify(params[0])} contextCloseCollection=${JSON.stringify(params[1])} fallbackCloseCollection=${params[2]} closeLabel=${params[3]} . the result should be ${JSON.stringify(res)}`, () => {
      const App = () => {
        const [closable, closeIcon] = computeClosable(params[0], params[1]);
        useEffect(() => {
          expect(closable).toBe(res[0]);
        }, [closable]);
        return <div>hooks test {closeIcon}</div>;
      };
      const { container } = render(<App />);
      if (res[1] === '') {
        expect(container.querySelector('.anticon-close')).toBeFalsy();
      } else {
        expect(container.querySelector(res[1])).toBeTruthy();
      }
      describe('useOrientation', () => {
        const orientationCases: Array<
          [
            parameters: Parameters<typeof useOrientation>[0],
            type?: Orientation,
            expected?: Orientation,
          ]
        > = [
          [{ orientation: 'horizontal' }, undefined, 'horizontal'],
          [{ orientation: 'vertical' }, undefined, 'vertical'],

          [{ vertical: true }, undefined, 'vertical'],
          [{ vertical: true, ctxVertical: false }, undefined, 'vertical'],
          [{ ctxVertical: true }, undefined, 'vertical'],

          [{}, 'horizontal', 'horizontal'],
          [{}, 'vertical', 'vertical'],
          [{}, undefined, 'horizontal'],

          [{ vertical: false, ctxVertical: true }, undefined, 'horizontal'],
          [{ vertical: undefined, ctxVertical: false }, undefined, 'horizontal'],
        ];

        it.each(orientationCases)('params %j type %s result %s', (params, type, expected) => {
          const { result } = renderHook(() => useOrientation(params, type));
          expect(result.current).toBe(expected);
        });

        it('Should respond to changes in dependencies', () => {
          const { rerender, result } = renderHook<
            any,
            { params: { orientation?: Orientation; vertical?: boolean }; type?: Orientation }
          >(({ params, type }) => useOrientation(params, type), {
            initialProps: {
              params: { orientation: undefined, vertical: true },
              type: undefined,
            },
          });

          expect(result.current).toBe('vertical');

          rerender({
            params: { orientation: 'horizontal', vertical: true },
            type: undefined,
          });
          expect(result.current).toBe('horizontal');

          rerender({
            params: { orientation: undefined, vertical: false },
            type: 'vertical',
          });
          expect(result.current).toBe('vertical');
        });
      });

      describe('useVertical', () => {
        const verticalCases: Array<
          [parameters: Parameters<typeof useVertical>[0], expected: boolean]
        > = [
          [{ orientation: 'vertical' }, true],
          [{ orientation: 'horizontal' }, false],

          [{ vertical: true }, true],
          [{ vertical: false }, false],
          [{ vertical: undefined, ctxVertical: true }, true],

          [{ vertical: true, ctxVertical: false }, true],
          [{ vertical: false, ctxVertical: true }, false],
          [{}, false],
        ];

        it.each(verticalCases)('params %j result %s', (params, expected) => {
          const { result } = renderHook(() => useVertical(params));
          expect(result.current).toBe(expected);
        });

        it('The results should be cached correctly', () => {
          const { result, rerender } = renderHook(
            (props: Parameters<typeof useVertical>[0]) => useVertical(props),
            {
              initialProps: { orientation: 'vertical' },
            },
          );

          expect(result.current).toBe(true);

          rerender({ orientation: 'vertical' });
          expect(result.current).toBe(true);

          rerender({ orientation: 'horizontal' });
          expect(result.current).toBe(false);
        });
      });
    });
  });
});
