import React from 'react';

import type { TableRef } from '..';
import Table from '..';
import { render } from '../../../tests/utils';

describe('Table.IE', () => {
  it('support reference', () => {
    const originWindowProxy = window.Proxy;
    const originGlobalProxy = global.Proxy;
    const tblRef = React.createRef<TableRef>();
    const { container, rerender } = render(<Table ref={tblRef} />);

    try {
      window.Proxy = undefined as any;
      global.Proxy = undefined as any;
      rerender(<Table ref={tblRef} />);

      const wrapDom = container.querySelector('.ant-table-wrapper')!;

      expect(tblRef.current).toBe(wrapDom);
      expect(tblRef.current?.nativeElement).toBe(wrapDom);
    } finally {
      window.Proxy = originWindowProxy;
      global.Proxy = originGlobalProxy;
    }
  });
});
