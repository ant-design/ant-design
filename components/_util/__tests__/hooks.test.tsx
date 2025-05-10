import React, { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { render, renderHook } from '@testing-library/react';

import type { UseClosableParams } from '../hooks/useClosable';
import useClosable from '../hooks/useClosable';
import { useOrientation, useVertical } from '../hooks/useOrientation';
import type { Orientation } from '../hooks/useOrientation';

type ParamsOfUseClosable = [
  closable: UseClosableParams['closable'],
  closeIcon: UseClosableParams['closeIcon'],
  defaultClosable: UseClosableParams['defaultClosable'],
];

describe('hooks test', () => {
  const useClosableParams: { params: ParamsOfUseClosable; res: [boolean, string] }[] = [
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

  describe('useOrientation', () => {
    const testCases: Array<
      [
        params: [orientation?: Orientation, defaultVertical?: boolean, type?: Orientation],
        expected: Orientation,
      ]
    > = [
      [['horizontal'], 'horizontal'],
      [['vertical'], 'vertical'],

      [[undefined, true], 'vertical'],
      [[undefined, true, 'horizontal'], 'vertical'],

      [[undefined, undefined, 'horizontal'], 'horizontal'],
      [[undefined, undefined, 'vertical'], 'vertical'],

      [[undefined, false, 'vertical'], 'vertical'],
      [[undefined, false], 'horizontal'],
    ];

    it.each(testCases)('with args %j should return %s', (params, expected) => {
      const { result } = renderHook(() => useOrientation(...params));
      expect(result.current).toBe(expected);
    });

    it('should handle invalid types correctly', () => {
      const invalidResult = renderHook(() => useOrientation('invalid' as any));
      expect(invalidResult.result.current).toBe('horizontal');
    });
  });

  describe('useVertical', () => {
    const testCases: Array<
      [params: [orientation?: Orientation, defaultVertical?: boolean], expected: boolean]
    > = [
      [['vertical'], true],
      [['horizontal'], false],

      [[undefined, true], true],
      [[undefined, false], false],

      [['horizontal', true], false],
      [['vertical', false], true],
      [[], false],
    ];

    it.each(testCases)('with args %j should return %s', (params, expected) => {
      const { result } = renderHook(() => useVertical(...params));
      expect(result.current).toBe(expected);
    });

    it('should respond to parameter changes', () => {
      const { rerender, result } = renderHook(
        ({ orientation, defaultVertical }) => useVertical(orientation, defaultVertical),
        {
          initialProps: {
            orientation: undefined as 'horizontal' | 'vertical' | undefined,
            defaultVertical: false,
          },
        },
      );

      expect(result.current).toBe(false);

      rerender({ orientation: 'vertical', defaultVertical: false });
      expect(result.current).toBe(true);

      rerender({ orientation: undefined, defaultVertical: true });
      expect(result.current).toBe(true);
    });
  });
});
