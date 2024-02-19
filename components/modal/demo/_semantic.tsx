import React from 'react';
import { Modal, type ModalProps } from 'antd';

import SemanticPreview from '../../../.dumi/components/SemanticPreview';
import useLocale from '../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    mask: '遮罩层元素',
    wrapper: '包裹层元素，一般用于动画容器',
    content: 'Drawer 容器元素',
    header: '头部元素',
    body: '内容元素',
    footer: '底部元素',
  },
  en: {
    mask: 'Mask element',
    wrapper: 'Wrapper element. Used for motion container',
    content: 'Drawer container element',
    header: 'Header element',
    body: 'Body element',
    footer: 'Footer element',
  },
};

const BlockModal = (props: ModalProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);

  return (
    <div ref={divRef} style={{ position: 'absolute', inset: 0 }}>
      <Modal
        getContainer={() => divRef.current!}
        {...props}
        styles={
          {
            mask: {
              position: 'absolute',
            },
            wrapper: {
              position: 'absolute',
            },
          } as any
        }
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          marginBottom: 0,
          paddingBottom: 0,
        }}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <SemanticPreview
      semantics={[
        { name: 'mask', desc: locale.mask, version: '5.13.0' },
        { name: 'header', desc: locale.header, version: '5.13.0' },
        { name: 'body', desc: locale.body, version: '5.13.0' },
        { name: 'footer', desc: locale.footer, version: '5.13.0' },
      ]}
    >
      <BlockModal title="Title" closable={false} open getContainer={false} width={400}>
        <p>Some contents...</p>
      </BlockModal>
    </SemanticPreview>
  );
};

export default App;
