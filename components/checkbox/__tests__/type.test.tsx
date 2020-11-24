import * as React from 'react';
import Checkbox from '..';
import Input from '../../input';

describe('Checkbox.typescript', () => {
  it('Checkbox', () => {
    const ref = React.createRef<HTMLInputElement>();
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
