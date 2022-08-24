import Dragger from './Dragger';
import type { UploadProps } from './Upload';
import InternalUpload, { LIST_IGNORE } from './Upload';

export { DraggerProps } from './Dragger';
export { RcFile, UploadChangeParam, UploadFile, UploadListProps, UploadProps } from './interface';

type InternalUploadType = typeof InternalUpload;
interface UploadInterface<T = any> extends InternalUploadType {
  <U extends T>(
    props: React.PropsWithChildren<UploadProps<U>> & React.RefAttributes<any>,
  ): React.ReactElement;
  Dragger: typeof Dragger;
  LIST_IGNORE: string;
}

const Upload = InternalUpload as UploadInterface;
Upload.Dragger = Dragger;
Upload.LIST_IGNORE = LIST_IGNORE;

export default Upload;
