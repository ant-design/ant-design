import React from 'react';
import { Alert, Button, Space } from 'antd';

const App: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h2>Alert 组件语义类名定制示例</h2>

    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* 基础用法 - 使用自定义类名 */}
      <Alert
        message="成功提示"
        description="这是一条成功的提示信息，您的操作已完成。"
        type="success"
        showIcon
        messageClassName="custom-message"
        descriptionClassName="custom-description"
        iconClassName="custom-icon"
        contentClassName="custom-content"
      />

      {/* 使用自定义样式 */}
      <Alert
        message="错误提示"
        description="这是一条错误提示信息，请检查您的输入。"
        type="error"
        showIcon
        closable
        messageStyle={{
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#cf1322',
        }}
        descriptionStyle={{
          fontSize: '14px',
          fontStyle: 'italic',
        }}
        iconStyle={{
          fontSize: '24px',
        }}
        closeStyle={{
          fontSize: '16px',
          color: '#ff4d4f',
        }}
      />

      {/* 带操作按钮的定制 */}
      <Alert
        message="警告提示"
        description="检测到潜在的安全风险，建议立即处理。"
        type="warning"
        showIcon
        action={
          <Button size="small" type="primary" danger>
            立即处理
          </Button>
        }
        actionClassName="custom-action"
        actionStyle={{
          marginLeft: '16px',
        }}
        contentStyle={{
          backgroundColor: '#fffbe6',
        }}
      />

      {/* 信息提示定制 */}
      <Alert
        message="系统通知"
        description="您有新的消息，请及时查看。"
        type="info"
        showIcon
        closable
        messageClassName="info-message"
        descriptionClassName="info-description"
        iconClassName="info-icon"
        messageStyle={{
          color: '#1890ff',
          fontSize: '16px',
        }}
        descriptionStyle={{
          color: '#666',
          lineHeight: '1.6',
        }}
        iconStyle={{
          color: '#1890ff',
        }}
      />

      {/* Banner 模式定制 */}
      <Alert
        banner
        message="重要公告：系统将于今晚 22:00-24:00 进行维护升级"
        type="warning"
        showIcon
        messageStyle={{
          fontSize: '16px',
          fontWeight: '500',
        }}
        iconStyle={{
          fontSize: '20px',
        }}
        style={{
          borderRadius: 0,
          borderLeft: '4px solid #faad14',
        }}
      />
    </Space>
  </div>
);

export default App;
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
