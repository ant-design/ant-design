import React, { useEffect, useRef } from 'react';
import type { JsonEditor, JSONEditorPropsOptional } from 'vanilla-jsoneditor';
import { createJSONEditor, Mode } from 'vanilla-jsoneditor';

const Editor: React.FC<JSONEditorPropsOptional> = (props) => {
  const editorRef = useRef<JsonEditor>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      editorRef.current = createJSONEditor({
        target: containerRef.current,
        props: { mode: Mode.text },
      });
    }
    return () => {
      editorRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    editorRef.current?.updateProps(props);
  }, [props]);

  return <div ref={containerRef} className="vanilla-jsoneditor-react" />;
};

export default Editor;
