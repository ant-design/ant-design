import React from 'react';
import RenderEmpty from '../defaultRenderEmpty';
import { render } from '../../../tests/utils';

describe('renderEmpty', () => {
  it.each([
    'Table',
    'Table.filter' /* 👈 5.19.0+ */,
    'List',
    'Select',
    'TreeSelect',
    'Cascader',
    'Transfer',
    'Mentions',
  ])('should render %s empty', (componentName: any) => {
    const { container } = render(<RenderEmpty componentName={componentName} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/pull/49613#issuecomment-2198857047
  it('should return false when componentName is `Table.filter`', () => {
    const { container } = render(<RenderEmpty componentName="Table.filter" />);
    expect(container.firstChild).toBeFalsy();
  });

  it('should return empty when componentName is not matched', () => {
    const { container } = render(<RenderEmpty componentName={`not_match` as any} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
