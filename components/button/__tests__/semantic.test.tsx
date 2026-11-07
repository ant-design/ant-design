import React from 'react';

import Button from '..';
import type { ButtonProps } from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import {
  expectSemanticRootStylePriority,
  semanticRootStylePriority,
} from '../../../tests/shared/semanticStylePriority';

describe('Button.Semantic', () => {
  it('should apply dynamic classNames and styles from props function', () => {
    const classNames: ButtonProps['classNames'] = (info) => {
      if (info.props.type === 'primary') {
        return { root: 'primary-default' };
      }
    };
    const styles: ButtonProps['styles'] = (info) => {
      if (info.props.type === 'primary') {
        return { root: { backgroundColor: 'rgb(255, 0, 0)' } };
      }
      if (info.props.type === 'default') {
        return { root: { backgroundColor: 'rgb(0, 0, 255)' } };
      }
    };

    const { rerender, container } = render(
      <Button type="primary" classNames={classNames} styles={styles}>
        Dynamic
      </Button>,
    );

    expect(container.querySelector('.ant-btn')).toHaveClass('primary-default');
    expect(container.querySelector('.ant-btn')).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
    rerender(
      <Button classNames={classNames} styles={styles}>
        Dynamic
      </Button>,
    );

    expect(container.querySelector('.ant-btn')).toHaveStyle({ backgroundColor: 'rgb(0, 0, 255)' });
  });
  it('should follow root style priority', () => {
    const { container } = render(
      <ConfigProvider
        button={{
          styles: semanticRootStylePriority.contextStyles,
          style: semanticRootStylePriority.contextStyle,
        }}
      >
        <Button styles={semanticRootStylePriority.styles} style={semanticRootStylePriority.style}>
          Button
        </Button>
      </ConfigProvider>,
    );

    expectSemanticRootStylePriority(container.querySelector('.ant-btn'));
  });
});
