import { JSONEditor as Editor, Mode, type JSONEditorPropsOptional } from 'vanilla-jsoneditor';
import React from 'react';

const JSONEditor = (props: JSONEditorPropsOptional) => {
  const refContainer = React.useRef(null);
  const refEditor = React.useRef(null);

  React.useEffect(() => {
    refEditor.current = new Editor({
      target: refContainer.current,
      props: {
        mode: Mode.text,
      },
    });

    return () => {
      if (refEditor.current) {
        refEditor.current.destroy();
        refEditor.current = null;
      }
    };
  }, []);

  React.useEffect(() => {
    if (refEditor.current) {
      refEditor.current.updateProps(props);
    }
  }, [props]);

  return <div className="vanilla-jsoneditor-react" ref={refContainer} />;
};

export default JSONEditor;
