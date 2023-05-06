import type { BasicDataNode } from 'rc-tree';
import * as React from 'react';
import { render } from '../../../tests/utils';
import type { DataNode } from '../index';
import Tree from '../index';

const { DirectoryTree } = Tree;

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

  it('directoryTree support generic', () => {
    interface MyDataNode extends BasicDataNode {
      bamboo: string;
      list?: MyDataNode[];
    }

    const { container } = render(
      <DirectoryTree<MyDataNode>
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

  it('draggable params type', () => {
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
        draggable={(node: DataNode) => node.title === 'Little'}
      />,
    );
    expect(container).toBeTruthy();
  });
});
