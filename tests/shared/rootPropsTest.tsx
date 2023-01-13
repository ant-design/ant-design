/* eslint-disable global-require, import/no-dynamic-require, jest/no-export */
import React from 'react';
import { render } from '../utils';
import ConfigProvider from '../../components/config-provider';

export default function rootPropsTest(component: string) {
  const Component = require(`../../components/${component}`).default as any;

  describe('RootProps', () => {
    it('rootClassName', () => {
      const rootClassName = 'TEST_ROOT_CLS';

      const Demo = () => {
        const holderRef = React.useRef<HTMLDivElement>(null);
        const [show, setShow] = React.useState(false);
        React.useEffect(() => {
          setShow(true);
        }, []);

        return (
          <div id="holder" ref={holderRef}>
            {show && (
              <ConfigProvider getPopupContainer={() => holderRef.current!}>
                <Component rootClassName={rootClassName} open />
              </ConfigProvider>
            )}
          </div>
        );
      };

      const { container } = render(<Demo />);
      const node = container.querySelector<HTMLElement>('#holder')!.firstChild as HTMLElement;
      expect(node).toHaveClass(rootClassName);
    });
  });
}
