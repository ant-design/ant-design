import React, { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { render, renderHook } from '@testing-library/react';

import { computeClosable, useClosable, useOrientation } from '../hooks';
import type { ClosableType, Orientation } from '../hooks';

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
    });
  });

  describe('useOrientation', () => {
    const testCases: Array<
      [
        params: [orientation?: Orientation, defaultVertical?: boolean, type?: Orientation],
        expected: [Orientation, boolean],
      ]
    > = [
      [['horizontal'], ['horizontal', false]],
      [['vertical'], ['vertical', true]],

      [
        [undefined, true],
        ['vertical', true],
      ],
      [
        [undefined, true, 'horizontal'],
        ['vertical', true],
      ],

      [
        [undefined, undefined, 'horizontal'],
        ['horizontal', false],
      ],
      [
        [undefined, undefined, 'vertical'],
        ['vertical', true],
      ],

      [
        [undefined, false, 'vertical'],
        ['horizontal', false],
      ],
      [
        [undefined, false],
        ['horizontal', false],
      ],

      [
        ['horizontal', true],
        ['horizontal', false],
      ],
      [
        ['vertical', false],
        ['vertical', true],
      ],
      [[], ['horizontal', false]],
      [['invalid'] as any, ['horizontal', false]],
    ];

    it.each(testCases)('with args %j should return %s', (params, expected) => {
      const { result } = renderHook(() => useOrientation(...params));
      expect(result.current).toEqual(expected);
    });
  });
});
