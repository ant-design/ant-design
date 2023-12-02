import React from 'react';
import { render } from '../../../tests/utils';
import Breadcrumb from '../index';

describe('Breadcrumb.ItemRender', () => {
  it('render as expect', () => {
    const { container } = render(
      <Breadcrumb
        items={[
          {
            path: '/',
            title: 'Home',
          },
          {
            path: '/bamboo',
            title: 'Bamboo',
          },
        ]}
        itemRender={(route) => (
          <a className="my-link" data-path={route.path}>
            {route.title}
          </a>
        )}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
