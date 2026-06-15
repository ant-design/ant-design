import React, { useRef, useState } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, message, theme } from 'antd';

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

const items: MenuProps['items'] = Object.entries(labels).map(([key, label]) => ({ key, label }));

const App: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    token: { borderRadiusLG, colorBgLayout, colorText },
  } = theme.useToken();
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

  const handleMouseUp = () => {
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
        open={!!selection}
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
          style={{
            position: 'fixed',
            left: selection?.x ?? -9999,
            top: selection?.y ?? -9999,
            display: 'block',
            width: 1,
            height: 1,
            margin: 0,
            padding: 0,
            pointerEvents: 'none',
          }}
        />
      </Dropdown>
      <div
        ref={wrapperRef}
        onMouseUp={handleMouseUp}
        style={{
          color: colorText,
          background: colorBgLayout,
          borderRadius: borderRadiusLG,
          lineHeight: 1.8,
          padding: 24,
          userSelect: 'text',
        }}
      >
        Select any text in this paragraph to open a Dropdown menu near the selection. This is useful
        for actions such as masking sensitive words, marking entities, or searching the selected
        keyword. Example data: Alice, phone 13800138000, ID 110101199001011234.
      </div>
    </>
  );
};

export default App;
