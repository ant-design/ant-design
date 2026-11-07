import React from 'react';

import { render } from './utils';

const distTest = process.env.LIB_DIR === 'dist' ? it : it.skip;

describe('antd dist files', () => {
  // https://github.com/ant-design/ant-design/issues/56021
  distTest('should keep Form hook order stable after rerender', () => {
    const { Form } = jest.requireActual<{ Form: React.ComponentType<React.PropsWithChildren> }>(
      '../dist/antd',
    );

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const Test: React.FC = () => {
      const [count, setCount] = React.useState<number>(0);

      React.useEffect(() => {
        setCount(1);
      }, []);

      return <Form>{count}</Form>;
    };

    try {
      const { container } = render(<Test />);
      expect(container).toHaveTextContent('1');
      expect(errorSpy.mock.calls.flat().join(' ')).not.toContain('change in the order of Hooks');
    } finally {
      errorSpy.mockRestore();
    }
  });
});
