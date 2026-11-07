import * as React from 'react';
import type { BasicDataNode } from '@rc-component/tree';

import type { DataNode } from '..';
import Tree from '..';
import { render, renderHook } from '../../../tests/utils';

const { DirectoryTree } = Tree;

describe('Tree.TypeScript', () => {
  it('support useTree', () => {
    const { result } = renderHook(() =>
      Tree.useTree([{ key: 'bamboo', children: [{ key: 'little' }] }], {}),
    );
    expect(result.current.getPath('little').map(({ key }) => key)).toEqual(['bamboo', 'little']);
  });

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

  it('draggable/icon/switcherIcon params type', () => {
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
        icon={(props) => (props.isLeaf ? 1 : 0)}
        switcherIcon={(props) => (props.isLeaf ? 1 : 0)}
      />,
    );
    expect(container).toBeTruthy();
  });
});
