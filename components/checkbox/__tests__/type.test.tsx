import * as React from 'react';

import Checkbox from '..';
import type { CheckboxRef } from '..';
import Input from '../../input';

describe('Checkbox.typescript', () => {
  it('Checkbox', () => {
    const ref = React.createRef<CheckboxRef>();
    const checkbox = <Checkbox value ref={ref} />;

    expect(checkbox).toBeTruthy();
  });

  it('Checkbox.Group', () => {
    const group = (
      <Checkbox.Group<'test-type-1' | 'test-type-2' | 'test-type-3'>
        classNames={{ root: 'group-root', item: 'group-item' }}
        options={[
          {
            label: <span>test</span>,
            value: 'test-type-1',
          },
        ]}
        styles={{ root: { gap: 8 }, itemIcon: { color: 'red' } }}
      >
        <Input />
      </Checkbox.Group>
    );
    expect(group).toBeTruthy();
  });
  it('Checkbox.Group defaultValue', () => {
    const defaultValue: React.Key[] = ['1'];
    const group = (
      <Checkbox.Group options={[{ label: 'test', value: '1' }]} defaultValue={defaultValue} />
    );
    expect(group).toBeTruthy();
  });
});
