import React from 'react';

import Button from '..';
import type { ButtonProps } from '..';
import { render } from '../../../tests/utils';

describe('Button.Semantic', () => {
  it('should apply dynamic classNames and styles from props function', () => {
    const classNames: ButtonProps['classNames'] = (info) => {
      if (info.props.type === 'primary') {
        return { root: 'primary-default' };
      }
    };
    const styles: ButtonProps['styles'] = (info) => {
      if (info.props.type === 'primary') {
        return { root: { background: 'red' } };
      }
      if (info.props.type === 'default') {
        return { root: { background: 'blue' } };
      }
    };

    const { rerender, container } = render(
      <Button type="primary" classNames={classNames} styles={styles}>
        Dynamic
      </Button>,
    );

    expect(container.querySelector('.ant-btn')).toHaveClass('primary-default');
    expect(container.querySelector('.ant-btn')).toHaveStyle({ background: 'red' });
    rerender(
      <Button classNames={classNames} styles={styles}>
        Dynamic
      </Button>,
    );

    expect(container.querySelector('.ant-btn')).toHaveStyle({ background: 'blue' });
  });
});
