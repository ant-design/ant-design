import React from 'react';
import { Button, Result } from 'antd';

const App: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>Result 组件语义类名定制示例</h2>

    {/* 基础用法 - 使用自定义类名 */}
    <Result
      status="success"
      title="操作成功"
      subTitle="您的订单已成功提交，订单号：2017182818828182881"
      titleClassName="custom-title"
      subTitleClassName="custom-subtitle"
      iconClassName="custom-icon"
      extra={[
        <Button type="primary" key="console">
          返回控制台
        </Button>,
        <Button key="buy">再次购买</Button>,
      ]}
      extraClassName="custom-extra"
    />

    {/* 使用自定义样式 */}
    <Result
      status="error"
      title="支付失败"
      subTitle="请检查并修改以下信息后，再重新提交。"
      titleStyle={{
        color: '#ff4d4f',
        fontSize: '24px',
        fontWeight: 'bold',
      }}
      subTitleStyle={{
        color: '#666',
        fontSize: '16px',
      }}
      iconStyle={{
        fontSize: '72px',
      }}
      extra={<Button type="primary">重新支付</Button>}
      extraStyle={{
        marginTop: '32px',
      }}
    />

    {/* 带内容区域的定制 */}
    <Result
      status="warning"
      title="您的账户存在风险"
      subTitle="检测到异常登录行为，建议您立即修改密码"
      contentClassName="custom-content"
      contentStyle={{
        backgroundColor: '#fff7e6',
        border: '1px solid #ffd591',
        borderRadius: '6px',
        padding: '16px',
      }}
    >
      <div>
        <p>
          <strong>异常行为包括：</strong>
        </p>
        <ul>
          <li>在不同地区同时登录</li>
          <li>使用了不常用的设备</li>
          <li>登录时间异常</li>
        </ul>
      </div>
    </Result>
  </div>
);

export default App;
