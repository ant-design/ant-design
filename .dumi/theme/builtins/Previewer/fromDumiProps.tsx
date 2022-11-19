import React, { useEffect, useState, type FC } from 'react';
// @ts-ignore
import JsonML from 'jsonml.js/lib/utils';
// @ts-ignore
import toReactComponent from 'jsonml-to-react-element';
// @ts-ignore
import Prism from 'prismjs';
import { useLocation } from 'dumi';
import { useIntl, type IPreviewerProps } from 'dumi';
import { ping } from '../../utils';
import sylvanas from 'sylvanas';

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
): FC<IPreviewerProps> {
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
              function (node: any) {
                return JsonML.isElement(node) && JsonML.getTagName(node) === 'pre';
              },
              function (node: any, index: any) {
                // @ts-ignore
                // ref: https://github.com/benjycui/bisheng/blob/master/packages/bisheng/src/bisheng-plugin-highlight/lib/browser.js#L7
                var attr = JsonML.getAttributes(node);
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
      highlightedCodes: {
        jsx: Prism.highlight(meta.jsx, Prism.languages.javascript, 'jsx'),
        tsx: Prism.highlight(entryCode, Prism.languages.javascript, 'tsx'),
      },
      style: meta.style,
      location,
      src: demoUrl,
      expand,
      // FIXME: confirm is there has any case?
      highlightedStyle: '',
      // FIXME: dumi support usePrefersColor
      theme: 'light',
    } as P;

    return <WrappedComponent {...transformedProps} />;
  };

  return hoc;
}
