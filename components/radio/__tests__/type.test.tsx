import * as React from 'react';

import Radio from '..';
import type { RadioRef } from '..';

describe('Radio.typescript', () => {
  it('Radio', () => {
    const ref = React.createRef<RadioRef>();
    const checkbox = <Radio value ref={ref} />;

    expect(checkbox).toBeTruthy();
  });

  it('Radio.Group', () => {
    const group = (
      <Radio.Group
        classNames={{ root: 'group-root', item: 'group-item' }}
        styles={{ root: { gap: 8 }, itemIcon: { color: 'red' } }}
      >
        <Radio />
      </Radio.Group>
    );

    expect(group).toBeTruthy();
  });
});
