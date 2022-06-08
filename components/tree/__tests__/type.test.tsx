import type { BasicDataNode } from 'rc-tree';
import * as React from 'react';
import { render } from '../../../tests/utils';
import Tree from '../index';

describe('Tree.TypeScript', () => {
  it('without generic', () => {
    const { container } = render(
      <Tree
        treeData={[
          {
            title: 'Bamboo',
            key: 'bamboo',
            children: [
              {
                title: 'Little',
                key: 'little',
              },
            ],
          },
        ]}
      />,
    );

    expect(container).toBeTruthy();
  });

  it('support generic', () => {
    interface MyDataNode extends BasicDataNode {
      bamboo: string;
      list?: MyDataNode[];
    }

    const { container } = render(
      <Tree<MyDataNode>
        treeData={[
          {
            bamboo: 'good',
            list: [
              {
                bamboo: 'well',
              },
            ],
          },
        ]}
      />,
    );

    expect(container).toBeTruthy();
  });
});
