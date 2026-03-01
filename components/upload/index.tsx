import Dragger from './Dragger';
import type { UploadProps, UploadRef } from './Upload';
import InternalUpload, { LIST_IGNORE } from './Upload';

export type { DraggerProps } from './Dragger';
export type {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadListProps,
  UploadProps,
} from './interface';
export type { UploadRef } from './Upload';

type InternalUploadType = typeof InternalUpload;

type CompoundedComponent<T = any> = InternalUploadType & {
  <U extends T>(
    props: React.PropsWithChildren<UploadProps<U>> & React.RefAttributes<UploadRef<U>>,
  ): React.ReactElement;
  Dragger: typeof Dragger;
  LIST_IGNORE: string;
};

const Upload = InternalUpload as CompoundedComponent;
Upload.Dragger = Dragger;
Upload.LIST_IGNORE = LIST_IGNORE;

export default Upload;
