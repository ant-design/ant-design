import React from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Divider, Flex, Tag } from 'antd';

const App: React.FC = () => (
  <>
    <Divider orientation="left">Status (Outlined)</Divider>
    <Flex gap="small" align="center" wrap>
      <Tag icon={<CheckCircleOutlined />} color="success">
        success
      </Tag>
      <Tag icon={<SyncOutlined spin />} color="processing">
        processing
      </Tag>
      <Tag icon={<CloseCircleOutlined />} color="error">
        error
      </Tag>
      <Tag icon={<ExclamationCircleOutlined />} color="warning">
        warning
      </Tag>
      <Tag icon={<ClockCircleOutlined />} color="default">
        waiting
      </Tag>
      <Tag icon={<MinusCircleOutlined />} color="default">
        stop
      </Tag>
    </Flex>
    <Divider orientation="left">Status (Filled)</Divider>
    <Flex gap="small" align="center" wrap>
      <Tag icon={<CheckCircleOutlined />} color="success" variant="filled">
        success
      </Tag>
      <Tag icon={<SyncOutlined spin />} color="processing" variant="filled">
        processing
      </Tag>
      <Tag icon={<CloseCircleOutlined />} color="error" variant="filled">
        error
      </Tag>
      <Tag icon={<ExclamationCircleOutlined />} color="warning" variant="filled">
        warning
      </Tag>
      <Tag icon={<ClockCircleOutlined />} color="default" variant="filled">
        waiting
      </Tag>
      <Tag icon={<MinusCircleOutlined />} color="default" variant="filled">
        stop
      </Tag>
    </Flex>
    <Divider orientation="left">Status (Borderless)</Divider>
    <Flex gap="small" align="center" wrap>
      <Tag icon={<CheckCircleOutlined />} color="success" variant="borderless">
        success
      </Tag>
      <Tag icon={<SyncOutlined spin />} color="processing" variant="borderless">
        processing
      </Tag>
      <Tag icon={<CloseCircleOutlined />} color="error" variant="borderless">
        error
      </Tag>
      <Tag icon={<ExclamationCircleOutlined />} color="warning" variant="borderless">
        warning
      </Tag>
      <Tag icon={<ClockCircleOutlined />} color="default" variant="borderless">
        waiting
      </Tag>
      <Tag icon={<MinusCircleOutlined />} color="default" variant="borderless">
        stop
      </Tag>
    </Flex>
  </>
);

export default App;
