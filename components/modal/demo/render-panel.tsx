import React from 'react';
import { Button, Modal, Typography } from 'antd';
import type { ModalFuncProps } from 'antd/es/modal/interface';

/** Test usage. Do not use in your production. */
const { _InternalPanelDoNotUseOrYouWillBeFired: InternalPanel } = Modal;

const customFooterFn: ModalFuncProps['footer'] = (originNode, { OkBtn, CancelBtn }) => (
  <>
    <Typography.Paragraph>{originNode}</Typography.Paragraph>
    <Typography.Paragraph>
      <Button>Custom</Button>
      <CancelBtn />
      <OkBtn />
    </Typography.Paragraph>
  </>
);

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', rowGap: 16 }}>
    <InternalPanel title="Hello World!" style={{ width: '100%', height: 200 }}>
      Hello World?!
    </InternalPanel>
    <InternalPanel type="success" style={{ width: 200, height: 150 }}>
      A good news!
    </InternalPanel>
    <InternalPanel title="Confirm This?" type="confirm" style={{ width: 300, height: 200 }}>
      Some descriptions.
    </InternalPanel>

    <InternalPanel
      title="Custom Footer Render"
      style={{ width: 380, height: 200 }}
      footer={customFooterFn}
    >
      <Typography.Paragraph>
        <Typography.Link href="https://github.com/ant-design/ant-design/pull/44318">
          Feature #44318
        </Typography.Link>
      </Typography.Paragraph>
    </InternalPanel>
  </div>
);
