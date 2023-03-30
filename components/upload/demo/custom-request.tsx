/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-await-in-loop */
import * as React from 'react';
import type { UploadProps } from 'antd';
import { Button, Upload, Divider, Form, InputNumber, Switch, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const [config, contentHelper] = useUploadConfig({
    url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    retry: { count: 3, delay: 3000 },
    isChunk: false,
    chunkSize: 10 * 1024,
  });

  const { chunkSize, isChunk, retry } = config;

  const getTotalChunks = (file: File) => Math.ceil(file.size / chunkSize);
  const getChunkData = (file: File, chunkIndex: number) => {
    const start = chunkIndex * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    return file.slice(start, end);
  };

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { onProgress, onError, onSuccess, action, headers } = options;

    const rawFile = options.file as File; // fix type error
    const file = new File([rawFile], rawFile.name ?? 'ant-design.jpeg', {
      type: rawFile?.type ?? 'image/jpeg',
    });

    const totalChunks = isChunk ? getTotalChunks(file as File) : 1;

    let uploadedChunks = 0;
    let isSuccess = true;

    for (let i = 0; i < totalChunks; i++) {
      const chunkData = getChunkData(file as File, i);
      const formData = new FormData();
      formData.append('chunk', chunkData);
      formData.append('filename', file.name);
      formData.append('index', i.toString());

      const fetchOptions: FetchWithRetryOptions = {
        method: 'POST',
        body: formData,
        headers,
        retry,
      };

      try {
        const result = await fetchWithRetry(action, fetchOptions);
        // debugger log
        console.log({ result });
        if (['done', 'success'].includes(result?.data?.status) || result?.data?.code === 0) {
          uploadedChunks++;
          onProgress?.({ percent: (uploadedChunks / totalChunks) * 100 });
        } else {
          isSuccess = false;
          onError?.(result.message);
          break;
        }
      } catch (error) {
        isSuccess = false;
        onError?.(error);
        break;
      }
    }
    if (isSuccess) {
      onSuccess?.(file);
    }
  };

  return (
    <>
      {contentHelper}
      <Divider orientation="left">Preview</Divider>
      <Upload action={config.url} customRequest={customRequest}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </>
  );
};

export default App;

type RetryOptions = {
  count: number;
  delay: number;
};

type FetchWithRetryOptions = {
  retry?: number | RetryOptions;
} & RequestInit;

async function fetchWithRetry(url: string, options?: FetchWithRetryOptions): Promise<any> {
  const { retry, ...fetchOptions } = options || {};

  const retries = typeof retry === 'number' ? retry : retry?.count || 3;
  const retryDelay = (typeof retry === 'object' && retry.delay) || 3000;

  let error = null;

  for (let i = 0; i <= retries; i++) {
    try {
      // eslint-disable-next-line compat/compat
      const response = await fetch(url, fetchOptions);
      const data = await response.json();
      return { data, response };
    } catch (e) {
      error = e;
    }

    if (i < retries) {
      await new Promise((resolve) => {
        setTimeout(resolve, retryDelay);
      });
    }
  }

  throw error;
}

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
