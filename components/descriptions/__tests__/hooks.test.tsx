import React from 'react';

import Descriptions from '..';
import { render } from '../../../tests/utils';
import useBreakpoint from '../../grid/hooks/useBreakpoint';
import useItems from '../hooks/useItems';

describe('Descriptions.Hooks', () => {
  it('Should Descriptions not throw react key prop error in jsx mode', () => {
    const Demo = () => {
      const screens = useBreakpoint();
      const items = useItems(
        screens,
        undefined,
        <Descriptions.Item key="bamboo" label="UserName">
          Bamboo
        </Descriptions.Item>,
      );

      return <p>{(items[0] as any).key}</p>;
    };

    const { container } = render(<Demo />);
    expect(container.querySelector('p')?.textContent).toBe('bamboo');
  });
});
