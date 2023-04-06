import { PictureOutlined } from '@ant-design/icons';
import { Modal, Tooltip, Typography } from 'antd';
import React from 'react';
import useLocale from '../../../hooks/useLocale';

const locales = {
  cn: {
    tip: '预览',
  },
  en: {
    tip: 'Preview',
  },
};

export interface InlinePopoverProps {
  previewURL?: string;
}

// 鼠标悬浮弹出 Popover 组件，用于帮助用户更快看到一些属性对应的预览效果
const InlinePopover: React.FC = (props: InlinePopoverProps) => {
  const { previewURL } = props;

  const [locale] = useLocale(locales);
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Tooltip title={locale.tip}>
        <Typography.Link onClick={() => setShow(true)}>
          <PictureOutlined />
        </Typography.Link>
      </Tooltip>

      <Modal title={locale.tip} open={show} onCancel={() => setShow(false)} footer={null}>
        <img alt="preview" src={previewURL} style={{ width: '100%' }} />
      </Modal>
    </>
  );
};

export default InlinePopover;
