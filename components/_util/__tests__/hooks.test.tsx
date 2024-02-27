import React, { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { render } from '@testing-library/react';

import type { UseClosableParams } from '../hooks/useClosable';
import useClosable from '../hooks/useClosable';

type ParamsOfUseClosable = [
  UseClosableParams['closable'],
  UseClosableParams['closeIcon'],
  UseClosableParams['defaultClosable'],
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

    // test case like: <Component closeIcon={null | false | element} />
    {
      params: [undefined, null, undefined],
      res: [false, ''],
    },
    {
      params: [undefined, false, undefined],
      res: [false, ''],
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
        const [closable, closeIcon] = useClosable({
          closable: params[0],
          closeIcon: params[1],
          defaultClosable: params[2],
        });
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
      const [closable, closeIcon] = useClosable({
        closable: true,
        defaultCloseIcon: <CloseOutlined className="custom-close-icon" />,
      });
      useEffect(() => {
        expect(closable).toBe(true);
      }, [closable]);
      return <div>hooks test {closeIcon}</div>;
    };
    const { container } = render(<App />);
    expect(container.querySelector('.custom-close-icon')).toBeTruthy();
  });

  it('useClosable with customCloseIconRender', () => {
    const App = () => {
      const customCloseIconRender = (icon: React.ReactNode) => (
        <span className="custom-close-wrapper">{icon}</span>
      );
      const [closable, closeIcon] = useClosable({
        closable: true,
        customCloseIconRender,
      });
      useEffect(() => {
        expect(closable).toBe(true);
      }, [closable]);
      return <div>hooks test {closeIcon}</div>;
    };
    const { container } = render(<App />);
    expect(container.querySelector('.custom-close-wrapper')).toBeTruthy();
  });
});
