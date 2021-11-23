import * as React from 'react';
import { mount } from 'enzyme';
import type { BasicDataNode } from 'rc-tree';
import Tree from '../index';

describe('Tree.TypeScript', () => {
  it('support generic', () => {
    interface MyDataNode extends BasicDataNode {
      bamboo: string;
    }

    const wrapper = mount(
      <Tree<MyDataNode>
        treeData={[
          {
            bamboo: 'good',
          },
        ]}
      />,
    );

    expect(wrapper).toBeTruthy();
  });
});
