import React from 'react';

import { render } from '../../../tests/utils';
import Breadcrumb from '..';

describe('Breadcrumb.Semantic', () => {
  it('should support function classNames and styles', () => {
    const classNamesFn: React.ComponentProps<typeof Breadcrumb>['classNames'] = (info) => {
      const len = info.props.items?.length ?? 0;
      return { root: len > 2 ? 'fn-root-long' : 'fn-root-short' };
    };

    const stylesFn: React.ComponentProps<typeof Breadcrumb>['styles'] = (info) => {
      const len = info.props.items?.length ?? 0;
      return { root: { backgroundColor: len > 2 ? 'rgb(240, 249, 255)' : 'rgb(255, 255, 255)' } };
    };

    const items = [{ title: 'One' }, { title: 'Two' }, { title: 'Three' }];

    const { container, rerender } = render(
      <Breadcrumb classNames={classNamesFn} styles={stylesFn} items={items.slice(0, 2)} />,
    );

    const rootShort = container.querySelector('.ant-breadcrumb');
    expect(rootShort).toHaveClass('fn-root-short');
    expect(rootShort).toHaveStyle({ backgroundColor: 'rgb(255, 255, 255)' });

    rerender(<Breadcrumb classNames={classNamesFn} styles={stylesFn} items={items} />);

    const rootLong = container.querySelector('.ant-breadcrumb');
    expect(rootLong).toHaveClass('fn-root-long');
    expect(rootLong).toHaveStyle({ backgroundColor: 'rgb(240, 249, 255)' });
  });
});
