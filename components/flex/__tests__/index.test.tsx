import React from 'react';

import Flex from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render } from '../../../tests/utils';

const FunCom = React.forwardRef<HTMLDivElement, { className?: string }>((props, ref) => (
  <div className={props.className} ref={ref}>
    test FC
  </div>
));

class ClassCom extends React.PureComponent<{ className?: string }> {
  render() {
    return <div className={this.props.className}>test Class</div>;
  }
}

describe('Flex', () => {
  mountTest(() => (
    <Flex>
      <div>test1</div>
      <div>test2</div>
    </Flex>
  ));
  rtlTest(() => (
    <Flex>
      <div>test1</div>
      <div>test2</div>
    </Flex>
  ));
  it('Flex', () => {
    const { container, rerender } = render(<Flex justify="center">test</Flex>);
    expect(container.querySelector('.ant-flex')).toHaveStyle({ justifyContent: 'center' });
    rerender(<Flex flex="0 1 auto">test</Flex>);
    expect(container.querySelector('.ant-flex')).toHaveStyle({ flex: '0 1 auto' });
  });

  describe('Props: gap', () => {
    it('support string', () => {
      const { container } = render(<Flex id="flex-inherit" gap="inherit" />);

      expect(container.querySelector('#flex-inherit')).toHaveStyle({
        gap: 'inherit',
      });
    });

    it('support number', () => {
      const { container } = render(<Flex gap={100} />);

      expect(container.querySelector('.ant-flex')).toHaveStyle({
        gap: '100px',
      });
    });

    it('support preset size', () => {
      const { container } = render(<Flex gap="small" />);

      expect(container.querySelector('.ant-flex')).toHaveClass('ant-flex-gap-small');
    });
  });

  it('Component work', () => {
    const testFcRef = React.createRef<HTMLDivElement>();
    const testClsRef = React.createRef<ClassCom>();
    const { container, rerender } = render(<Flex>test</Flex>);
    expect(container.querySelector<HTMLDivElement>('.ant-flex')?.tagName).toBe('DIV');
    rerender(<Flex component="span">test</Flex>);
    expect(container.querySelector<HTMLSpanElement>('.ant-flex')?.tagName).toBe('SPAN');
    rerender(<Flex component={(props) => <FunCom {...props} ref={testFcRef} />}>test</Flex>);
    expect(container.querySelector<HTMLDivElement>('.ant-flex')?.textContent).toBe('test FC');
    expect(testFcRef.current).toBeTruthy();
    rerender(<Flex component={(props) => <ClassCom {...props} ref={testClsRef} />}>test</Flex>);
    expect(container.querySelector<HTMLDivElement>('.ant-flex')?.textContent).toBe('test Class');
    expect(testClsRef.current).toBeTruthy();
  });

  it('when vertical=true should stretch work', () => {
    const { container, rerender } = render(<Flex vertical>test</Flex>);
    expect(container.querySelector<HTMLDivElement>('.ant-flex')).toHaveClass(
      'ant-flex-align-stretch',
    );
    rerender(
      <Flex vertical align="center">
        test
      </Flex>,
    );
    expect(container.querySelector<HTMLDivElement>('.ant-flex')).toHaveClass(
      'ant-flex-align-center',
    );
  });

  it('wrap prop shouled support boolean', () => {
    const { container, rerender } = render(<Flex>test</Flex>);
    const element = container.querySelector<HTMLDivElement>('.ant-flex');

    ([true, 'wrap'] as const).forEach((value) => {
      rerender(<Flex wrap={value}>test</Flex>);
      expect(element).toHaveClass('ant-flex-wrap-wrap');
    });

    ([false, 'nowrap'] as const).forEach((value) => {
      rerender(<Flex wrap={value}>test</Flex>);
      expect(element).not.toHaveClass('ant-flex-wrap-wrap');
    });
  });

  // ============================= orientation =============================
  describe('orientation attribute', () => {
    it('vertical=true orientation=horizontal, result orientation=horizontal', () => {
      const { container } = render(
        <Flex vertical orientation="horizontal">
          test
        </Flex>,
      );
      expect(container.querySelector<HTMLDivElement>('.ant-flex-vertical')).toBeNull();
    });

    it('orientation=vertical, result orientation=vertical', () => {
      const { container } = render(<Flex orientation="vertical">test</Flex>);
      expect(container.querySelector<HTMLDivElement>('.ant-flex-vertical')).not.toBeNull();
    });
  });
});
