import React, { useState } from 'react';
import { Button, Transfer, message } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import type { TransferProps } from 'antd';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `内容${i + 1}`,
  description: `描述${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

const App: React.FC = () => {
  const [targetKeys, setTargetKeys] = useState<string[]>(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [loadingRight, setLoadingRight] = useState<boolean>(false);
  const [loadingLeft, setLoadingLeft] = useState<boolean>(false);

  // 处理数据转移
  const handleChange: TransferProps['onChange'] = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys as string[]);

    // 模拟异步操作
    if (direction === 'right') {
      setLoadingRight(true);
      setTimeout(() => {
        setLoadingRight(false);
        message.success(`已成功添加 ${moveKeys.length} 项到右侧`);
      }, 1000);
    } else {
      setLoadingLeft(true);
      setTimeout(() => {
        setLoadingLeft(false);
        message.success(`已成功添加 ${moveKeys.length} 项到左侧`);
      }, 1000);
    }
  };

  // 处理选中项变化
  const handleSelectChange: TransferProps['onSelectChange'] = (
    sourceSelectedKeys,
    targetSelectedKeys,
  ) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys] as string[]);
  };

  // 右侧按钮是否可用（有选中的左侧项且不在右侧列表中）
  const rightButtonDisabled =
    selectedKeys.length === 0 || selectedKeys.every((key) => targetKeys.includes(key));

  // 左侧按钮是否可用（有选中的右侧项）
  const leftButtonDisabled =
    selectedKeys.length === 0 || selectedKeys.every((key) => !targetKeys.includes(key));

  // 自定义右侧按钮点击事件
  const handleRightButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 这里可以添加自定义逻辑，例如显示确认对话框
    console.log('右侧按钮被点击', event);
    // Transfer 组件会自动处理数据转移
  };

  // 自定义左侧按钮点击事件
  const handleLeftButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 这里可以添加自定义逻辑，例如显示确认对话框
    console.log('左侧按钮被点击', event);
    // Transfer 组件会自动处理数据转移
  };

  return (
    <>
      <p>本示例展示了如何自定义操作按钮，包括处理禁用状态和加载状态。</p>
      <Transfer
        dataSource={mockData}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        render={(item) => item.title}
        operations={[
          // 自定义右侧按钮（向右转移数据）
          <Button
            key="to-right"
            type="primary"
            icon={<DoubleRightOutlined />}
            loading={loadingRight}
            disabled={rightButtonDisabled}
            onClick={handleRightButtonClick}
          >
            向右
          </Button>,
          // 自定义左侧按钮（向左转移数据）
          <Button
            key="to-left"
            type="primary"
            icon={<DoubleLeftOutlined />}
            loading={loadingLeft}
            disabled={leftButtonDisabled}
            onClick={handleLeftButtonClick}
          >
            向左
          </Button>,
        ]}
      />
    </>
  );
};

export default App;
