import * as React from 'react';

import Divider from '..';
import type { DividerProps, DividerSemanticAllType } from '..';
import mountTest from '../../../tests/shared/mountTest';
import { render } from '../../../tests/utils';

describe('Divider.Semantic', () => {
  mountTest(Divider);

  it('not show children when vertical', () => {
    const testClassNames = {
      root: 'test-root',
      rail: 'test-rail',
      content: 'test-content',
    };
    const testStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      rail: { color: 'rgb(0, 0, 255)' },
      content: { color: 'rgb(0, 255, 0)' },
    };
    const { container } = render(
      <Divider classNames={testClassNames} styles={testStyles}>
        Text
      </Divider>,
    );
    const root = container.querySelector('.ant-divider');
    const rail = container.querySelector('.ant-divider-rail');
    const content = container.querySelector('.ant-divider-inner-text');
    expect(root).toHaveClass(testClassNames.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(rail).toHaveClass(testClassNames.rail);
    expect(rail).toHaveStyle(testStyles.rail);
    expect(content).toHaveClass(testClassNames.content);
    expect(content).toHaveStyle(testStyles.content);
  });

  it('should support function classNames/styles with merged props', () => {
    const classNames: DividerProps['classNames'] = (info): DividerSemanticAllType['classNames'] => {
      if (info.props.titlePlacement === 'start') {
        return { root: 'divider-start' };
      }
      return { root: 'divider-center' };
    };
    const styles: DividerProps['styles'] = (info): DividerSemanticAllType['styles'] => {
      if (info.props.size === 'small') {
        return { root: { opacity: 0.5 } };
      }
      return { root: { opacity: 1 } };
    };

    const { container, rerender } = render(
      <Divider titlePlacement="start" size="small" classNames={classNames} styles={styles}>
        Text
      </Divider>,
    );
    let root = container.querySelector('.ant-divider')!;
    expect(root).toHaveClass('divider-start');
    expect(root).toHaveStyle({ opacity: 0.5 });

    rerender(
      <Divider titlePlacement="center" size="large" classNames={classNames} styles={styles}>
        Text
      </Divider>,
    );
    root = container.querySelector('.ant-divider')!;
    expect(root).toHaveClass('divider-center');
    expect(root).toHaveStyle({ opacity: 1 });
  });
});
