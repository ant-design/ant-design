import React from 'react';

import Flex from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

const FunCom = React.forwardRef<HTMLDivElement, {}>((_, ref) => (
  <div className="test-fc" ref={ref}>
    test FC
  </div>
));

class ClassCom<P = any> extends React.PureComponent<P> {
  render() {
    return <div className="test-cls">test Class</div>;
  }
}

describe('Flex', () => {
  mountTest(() => <Flex>test</Flex>);
  rtlTest(() => <Flex>test</Flex>);
  it('Flex', () => {
    const { container, rerender } = render(<Flex justify="center">test</Flex>);
    expect(container.querySelector('.ant-flex')).toHaveStyle({ justifyContent: 'center' });
    rerender(<Flex flex="0 1 auto">test</Flex>);
    expect(container.querySelector('.ant-flex')).toHaveStyle({ flex: '0 1 auto' });
  });
  it('Component work', () => {
    const testFcRef = React.createRef<HTMLDivElement>();
    const testClsRef = React.createRef<HTMLDivElement>();
    const { container, rerender } = render(<Flex>test</Flex>);
    expect(container.querySelector<HTMLDivElement>('.ant-flex')?.tagName).toBe('DIV');
    rerender(<Flex component="span">test</Flex>);
    expect(container.querySelector<HTMLSpanElement>('.ant-flex')?.tagName).toBe('SPAN');
    rerender(
      <Flex component={FunCom} ref={testFcRef}>
        test
      </Flex>,
    );
    expect(container.querySelector<HTMLDivElement>('.test-fc')?.textContent).toBe('test FC');
    expect(testFcRef.current).toBeTruthy();
    rerender(
      <Flex component={ClassCom} ref={testClsRef}>
        test
      </Flex>,
    );
    expect(container.querySelector<HTMLDivElement>('.test-cls')?.textContent).toBe('test Class');
    expect(testClsRef.current).toBeTruthy();
  });
});
