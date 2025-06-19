import React from 'react';

import { render } from '../../../tests/utils';
import Transfer from '../index';

describe('Transfer.Semantic', () => {
  it('semantic structure', () => {
    const mockData = Array.from({ length: 20 }).map((_, i) => ({
      key: i,
      title: `content ${i + 1}`,
    }));

    const classNames = {
      root: 'custom-root',
      section: 'custom-section',
      header: 'custom-header',
      title: 'custom-title',
      body: 'custom-body',
      list: 'custom-list',
      listItem: 'custom-list-item',
      footer: 'custom-footer',
      actions: 'custom-actions',
    };

    const semanticsStructure: Record<string, [selector: string, count: number]> = {
      root: ['.ant-transfer', 1],
      section: ['.ant-transfer-section', 2],
      header: ['.ant-transfer-list-header', 2],
      title: ['.ant-transfer-list-title', 2],
      body: ['.ant-transfer-list-body', 2],
      list: ['.ant-transfer-list-content', 2],
      listItem: ['.ant-transfer-list-item', mockData.length],
      footer: ['.ant-transfer-list-footer', 2],
      actions: ['.ant-transfer-action', 1],
    };

    const styles = {
      root: {
        backgroundColor: 'red',
      },
      section: {
        backgroundColor: 'blue',
      },
      header: {
        backgroundColor: 'green',
      },
      title: {
        backgroundColor: 'gray',
      },
      body: {
        backgroundColor: 'yellow',
      },
      list: {
        backgroundColor: 'purple',
      },
      listItem: {
        backgroundColor: 'orange',
      },
      footer: {
        backgroundColor: 'pink',
      },
      actions: {
        backgroundColor: 'cyan',
      },
    };

    const { container } = render(
      <Transfer
        showSearch
        dataSource={mockData}
        selectedKeys={[]}
        targetKeys={[3, 9]}
        render={(item) => item.title}
        footer={() => <div style={{ padding: 8 }}>Custom Footer</div>}
        classNames={classNames}
        styles={styles}
      />,
    );

    Object.keys(classNames).forEach((key) => {
      const eleList = container.querySelectorAll(`.${classNames[key as keyof typeof classNames]}`);
      expect(eleList[0]).toHaveStyle(styles[key as keyof typeof styles]);

      const structureInfo = semanticsStructure[key as keyof typeof semanticsStructure];
      expect(eleList).toHaveLength(structureInfo[1]);
    });
  });
});
