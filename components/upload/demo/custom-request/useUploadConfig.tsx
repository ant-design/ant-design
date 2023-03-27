import * as React from 'react';
import { Form, InputNumber, Switch, Input } from 'antd';

function useUploadConfig(config: any) {
  const [state, setState] = React.useState(config);
  const [form] = Form.useForm();

  const inputChunkSize = Form.useWatch('chunkSize', form);
  const [size, sizeM, sizeK] = React.useMemo(() => {
    const _size = inputChunkSize || 0;
    const M = Number.prototype.toFixed.call(_size / 1024 / 1024, 2);
    const K = Number.prototype.toFixed.call(_size / 1024, 2);
    return [_size, M, K];
  }, [inputChunkSize]);

  const contentHelper = (
    <Form form={form} initialValues={state} onValuesChange={(_, allValues) => setState(allValues)}>
      <Form.Item label="Url" name="url">
        <Input />
      </Form.Item>
      <Form.Item label="IsChunk" name="isChunk" valuePropName='checked'>
        <Switch />
      </Form.Item>
      <Form.Item
        label="ChunkSize(byte)"
        name="chunkSize"
        validateTrigger="blur"
        help={`${size}byte ≈ ${sizeK}kb ≈ ${sizeM}mb`}
      >
        <InputNumber
          disabled={!state.isChunk}
          min={10 * 1024}
          max={10 * 1024 * 1024}
          step={10 * 1024}
        />
      </Form.Item>
      <Form.Item name="retry">
        <Form.Item label="retry" name={['retry', 'count']}>
          <InputNumber min={1} max={10} />
        </Form.Item>
        <Form.Item label="retry(ms)" name={['retry', 'delay']}>
          <InputNumber min={100} max={30 * 1000} step={200} />
        </Form.Item>
      </Form.Item>
    </Form>
  );

  return [state, contentHelper] as const;
}

export default useUploadConfig;
