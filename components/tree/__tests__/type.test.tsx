import * as React from 'react';
import { mount } from 'enzyme';
import type { BasicDataNode } from 'rc-tree';
import Tree from '../index';

describe('Tree.TypeScript', () => {
  it('without generic', () => {
    const wrapper = mount(
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

    expect(wrapper).toBeTruthy();
  });

  it('support generic', () => {
    interface MyDataNode extends BasicDataNode {
      bamboo: string;
      list?: MyDataNode[];
    }

    const wrapper = mount(
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

    expect(wrapper).toBeTruthy();
  });
});
