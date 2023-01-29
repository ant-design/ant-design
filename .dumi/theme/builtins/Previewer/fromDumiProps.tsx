import React, { useEffect, useState } from 'react';
import JsonML from 'jsonml.js/lib/utils';
import toReactComponent from 'jsonml-to-react-element';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import { useLocation, useIntl, type IPreviewerProps } from 'dumi';
import { ping } from '../../utils';

let pingDeferrer: PromiseLike<boolean>;

function useShowRiddleButton() {
  const [showRiddleButton, setShowRiddleButton] = useState(false);

  useEffect(() => {
    pingDeferrer ??= new Promise<boolean>((resolve) => {
      ping((status) => {
        if (status !== 'timeout' && status !== 'error') {
          return resolve(true);
        }

        return resolve(false);
      });
    });
    pingDeferrer.then(setShowRiddleButton);
  }, []);

  return showRiddleButton;
}

/**
 * HOC for convert dumi previewer props to bisheng previewer props
 */
export default function fromDumiProps<P extends object>(
  WrappedComponent: React.ComponentType<P>,
): React.FC<IPreviewerProps> {
  const hoc = function DumiPropsAntdPreviewer(props: IPreviewerProps) {
    const showRiddleButton = useShowRiddleButton();
    const location = useLocation();
    const { asset, children, demoUrl, expand, description = '', ...meta } = props;
    const intl = useIntl();
    const entryCode = asset.dependencies['index.tsx'].value;
    const transformedProps = {
      meta: {
        id: asset.id,
        title: '',
        filename: meta.filePath,
        ...meta,
      },
      content: description,
      preview: () => children,
      utils: {
        toReactComponent(jsonML: any) {
          return toReactComponent(jsonML, [
            [
              (node: any) => JsonML.isElement(node) && JsonML.getTagName(node) === 'pre',
              (node: any, index: any) => {
                // ref: https://github.com/benjycui/bisheng/blob/master/packages/bisheng/src/bisheng-plugin-highlight/lib/browser.js#L7
                const attr = JsonML.getAttributes(node);
                return React.createElement(
                  'pre',
                  {
                    key: index,
                    className: `language-${attr.lang}`,
                  },
                  React.createElement('code', {
                    dangerouslySetInnerHTML: { __html: attr.highlighted },
                  }),
                );
              },
            ],
          ]);
        },
      },
      intl: { locale: intl.locale },
      showRiddleButton,
      sourceCodes: {
        jsx: meta.jsx,
        tsx: entryCode,
      },
      highlightedCodes: {
        jsx: Prism.highlight(meta.jsx, Prism.languages.javascript, 'jsx'),
        tsx: Prism.highlight(entryCode, Prism.languages.typescript, 'tsx'),
      },
      style: meta.style,
      location,
      src: demoUrl,
      expand,
      highlightedStyle: meta.style ? Prism.highlight(meta.style, Prism.languages.css, 'css') : '',
    } as P;

    return <WrappedComponent {...transformedProps} />;
  };

  return hoc;
}
