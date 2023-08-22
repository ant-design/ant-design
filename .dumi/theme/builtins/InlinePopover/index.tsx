import { PictureOutlined } from '@ant-design/icons';
import React from 'react';
import { Image, Tooltip, Typography } from 'antd';
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
const InlinePopover: React.FC<InlinePopoverProps> = (props) => {
  const { previewURL } = props;
  const [locale] = useLocale(locales);
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Tooltip title={locale.tip}>
        <Typography.Link onClick={() => setVisible(true)}>
          <PictureOutlined />
        </Typography.Link>
      </Tooltip>

      <Image
        width={10}
        style={{ display: 'none' }}
        src={previewURL}
        preview={{
          visible,
          src: previewURL,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </>
  );
};

export default InlinePopover;
