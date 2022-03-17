/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import { Drawer, Typography } from 'antd';

export interface PreviewProps {
  visible: boolean;
  componentName: string;
}

export default function Preview({ visible }: PreviewProps) {
  const [styleList, setStyleList] = React.useState<string[]>([]);

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      const latestStyles = Array.from(document.querySelectorAll('style[data-css-hash]'))
        .map(style => style?.innerHTML || '')
        // Break lines
        .map(style => style.replace(/{/g, ' {\n'))
        .map(style => style.replace(/}/g, '}\n\n'))
        .map(style => style.replace(/;/g, ';\n'))
        .filter(txt => txt);

      setStyleList(latestStyles);
    });
    observer.observe(document.head, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, [visible]);

  return (
    <Drawer title="cssinjs" placement="left" visible={visible} mask={false} width="40vw">
      <Typography>
        {styleList.map((style, index) => (
          <pre key={index}>{style}</pre>
        ))}
      </Typography>
    </Drawer>
  );
}
