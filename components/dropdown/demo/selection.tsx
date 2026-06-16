import React, { useRef, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, message } from 'antd';
import { createStyles } from 'antd-style';
import type { ItemType } from 'antd/es/menu/interface';

interface SelectionInfo {
  text: string;
  x: number;
  y: number;
}

const labels: Record<string, string> = {
  mask: 'Mask keyword',
  mark: 'Mark keyword',
  search: 'Search keyword',
};

const useStyle = createStyles(({ cssVar, css }) => {
  const { colorText, colorBgLayout, borderRadiusLG, paddingLG } = cssVar;
  return {
    wrapper: css`
      padding: ${paddingLG};
      user-select: text;
      color: ${colorText};
      background-color: ${colorBgLayout};
      border-radius: ${borderRadiusLG};
    `,
    trigger: css`
      position: fixed;
      display: block;
      width: 1px;
      height: 1px;
      margin: 0;
      padding: 0;
      pointer-events: none;
    `,
  };
});

const items = Object.entries(labels).map<ItemType>(([key, label]) => ({ key, label }));

const Demo: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { styles } = useStyle();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const [selection, setSelection] = useState<SelectionInfo | null>(null);

  const handleSelect = () => {
    const selectionInstance = window.getSelection();
    const selectedText = selectionInstance?.toString().trim();

    if (!selectionInstance || !selectedText || selectionInstance.rangeCount === 0) {
      setSelection(null);
      return;
    }

    const range = selectionInstance.getRangeAt(0);

    if (!wrapperRef.current?.contains(range.commonAncestorContainer)) {
      setSelection(null);
      return;
    }

    const rect = range.getBoundingClientRect();

    if (!rect.width || !rect.height) {
      setSelection(null);
      return;
    }

    setSelection({
      text: selectedText,
      x: rect.left + rect.width / 2,
      y: rect.bottom + 4,
    });
  };

  const handleMouseUp: React.MouseEventHandler<HTMLDivElement> = () => {
    setTimeout(handleSelect);
  };

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (!selection) {
      return;
    }
    messageApi.info(`${labels[key]}: ${selection.text}`);
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  };

  return (
    <>
      {contextHolder}
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        open={Boolean(selection)}
        placement="bottom"
        trigger={[]}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setSelection(null);
          }
        }}
      >
        <span
          aria-hidden
          className={styles.trigger}
          style={{
            left: selection?.x ?? -9999,
            top: selection?.y ?? -9999,
          }}
        />
      </Dropdown>
      <div
        ref={wrapperRef}
        onMouseDown={() => setSelection(null)}
        onMouseUp={handleMouseUp}
        className={styles.wrapper}
      >
        Select any text in this paragraph to open a Dropdown menu near the selection. This is useful
        for actions such as masking sensitive words, marking entities, or searching the selected
        keyword. Example data: Alice, phone 13800138000, ID 110101199001011234.
      </div>
    </>
  );
};

export default Demo;
