import React from 'react';

import Tabs from '..';
import type { TabsProps } from '..';
import { render } from '../../../tests/utils';

describe('Tabs.Semantic', () => {
  it('support function classNames and styles', () => {
    const classNamesFn: TabsProps['classNames'] = (info) => {
      if (info.props.type === 'card') {
        return { root: 'custom-card-root' };
      }
      return { root: 'custom-line-root' };
    };

    const stylesFn: TabsProps['styles'] = (info) => {
      if (info.props.centered) {
        return { root: { backgroundColor: 'rgb(255, 0, 0)' } };
      }
      return { root: { backgroundColor: 'rgb(0, 255, 0)' } };
    };

    const { container } = render(
      <Tabs
        defaultActiveKey="1"
        type="card"
        centered
        classNames={classNamesFn}
        styles={stylesFn}
        items={[
          { key: '1', label: 'Tab 1', children: 'Content 1' },
          { key: '2', label: 'Tab 2', children: 'Content 2' },
        ]}
      />,
    );

    const root = container.querySelector('.ant-tabs');
    expect(root).toHaveClass('custom-card-root');
    expect(root).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' });
  });
});
