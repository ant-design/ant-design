import type { UploadProps } from '../interface';

export const successRequest: UploadProps['customRequest'] = ({ onSuccess, file }) => {
  setTimeout(() => {
    // @ts-ignore
    onSuccess?.(null, file);
  });
};

export const errorRequest: UploadProps['customRequest'] = ({ onError }) => {
  setTimeout(() => {
    // @ts-ignore
    onError?.();
  });
};
