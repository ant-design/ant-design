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
      <Checkbox.Group>
        <Input />
      </Checkbox.Group>
    );

    expect(group).toBeTruthy();
  });
});
