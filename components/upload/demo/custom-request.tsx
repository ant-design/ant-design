/* eslint-disable no-await-in-loop */
import * as React from 'react';
import type { UploadProps } from 'antd';
import { Button, Upload, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FetchWithRetryOptions } from './custom-request/useFetch';
import { fetchWithRetry } from './custom-request/useFetch';
import useUploadConfig from './custom-request/useUploadConfig';

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
