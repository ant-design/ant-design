import type { UploadProps } from '../interface';

export const successRequest: UploadProps['customRequest'] = ({ onSuccess, file }) => {
  setTimeout(() => {
    onSuccess?.(null, file);
  });
};

export const errorRequest: UploadProps['customRequest'] = ({ onError }) => {
  setTimeout(() => {
    onError?.(new Error('test error'));
  });
};
