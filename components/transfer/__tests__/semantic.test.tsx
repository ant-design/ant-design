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
      item: 'custom-item',
      itemIcon: 'custom-item-icon',
      itemContent: 'custom-item-content',
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
      item: ['.ant-transfer-list-item', mockData.length],
      itemIcon: ['.ant-transfer-list-item-icon', mockData.length],
      itemContent: ['.ant-transfer-list-item-content', mockData.length],
      footer: ['.ant-transfer-list-footer', 2],
      actions: ['.ant-transfer-action', 1],
    };

    const styles = {
      root: {
        backgroundColor: 'rgb(255, 0, 0)',
      },
      section: {
        backgroundColor: 'rgb(0, 0, 255)',
      },
      header: {
        backgroundColor: 'rgb(0, 128, 0)',
      },
      title: {
        backgroundColor: 'rgb(128, 128, 128)',
      },
      body: {
        backgroundColor: 'rgb(255, 255, 0)',
      },
      list: {
        backgroundColor: 'rgb(128, 0, 128)',
      },
      item: {
        backgroundColor: 'rgb(255, 165, 0)',
      },
      itemIcon: {
        backgroundColor: 'rgb(173, 216, 230)',
      },
      itemContent: {
        backgroundColor: 'rgb(144, 238, 144)',
      },
      footer: {
        backgroundColor: 'rgb(255, 192, 203)',
      },
      actions: {
        backgroundColor: 'rgb(255, 0, 0)',
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
