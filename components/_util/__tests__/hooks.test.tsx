import { render } from '@testing-library/react';
import React, { useEffect } from 'react';
import useClosable from '../hooks/useClosable';

type ParamsOfUseClosable = Parameters<typeof useClosable>;

describe('hooks test', () => {
  const useClosableParams: { params: ParamsOfUseClosable; res: boolean }[] = [
    // test case like: <Component />
    {
      params: [undefined, undefined, undefined],
      res: false,
    },
    {
      params: [undefined, undefined, true],
      res: true,
    },
    {
      params: [undefined, undefined, false],
      res: false,
    },

    // test case like: <Component closable={false | true} />
    {
      params: [false, undefined, undefined],
      res: false,
    },
    {
      params: [true, undefined, true],
      res: true,
    },
    {
      params: [true, undefined, false],
      res: true,
    },

    // test case like: <Component closable={false | true} closeIcon={null | false | element} />
    {
      params: [false, null, undefined],
      res: false,
    },
    {
      params: [false, false, undefined],
      res: false,
    },
    {
      params: [true, null, true],
      res: true,
    },
    {
      params: [true, false, true],
      res: true,
    },
    {
      params: [true, null, false],
      res: true,
    },
    {
      params: [true, false, false],
      res: true,
    },
    {
      params: [true, <div key="close">close</div>, false],
      res: true,
    },
    {
      params: [false, <div key="close">close</div>, false],
      res: false,
    },

    // test case like: <Component closeIcon={null | false | element} />
    {
      params: [undefined, null, undefined],
      res: false,
    },
    {
      params: [undefined, false, undefined],
      res: false,
    },
    {
      params: [undefined, <div key="close">close</div>, undefined],
      res: true,
    },
    {
      params: [undefined, <div key="close">close</div>, true],
      res: true,
    },
    {
      params: [undefined, <div key="close">close</div>, false],
      res: true,
    },
  ];

  useClosableParams.forEach(({ params, res }) => {
    it(`useClosable with closable=${params[0]},closeIcon=${
      React.isValidElement(params[1]) ? 'element' : params[1]
    },defaultClosable=${params[2]}. the result should be ${res}`, () => {
      const App = () => {
        const closable = useClosable(params[0], params[1], params[2]);
        useEffect(() => {
          expect(closable).toBe(res);
        }, [closable]);
        return <div>hooks test</div>;
      };
      render(<App />);
    });
  });
});
