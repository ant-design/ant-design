import React from 'react';

import type { TableRef } from '..';
import Table from '..';
import { render } from '../../../tests/utils';

describe('Table.IE', () => {
  beforeAll(() => {
    window.Proxy = undefined as any;
    global.Proxy = undefined as any;
  });

  it('support reference', () => {
    const tblRef = React.createRef<TableRef>();
    const { container } = render(<Table ref={tblRef} />);

    const wrapDom = container.querySelector('.ant-table-wrapper')!;

    expect(tblRef.current).toBe(wrapDom);
    expect(tblRef.current?.nativeElement).toBe(wrapDom);
  });
});
