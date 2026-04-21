import React from 'react';

import BorderBeam from '..';
import { render, waitFor } from '../../../tests/utils';
import ConfigProvider, { defaultPrefixCls } from '../../config-provider';
import { genCssVar } from '../../theme/util/genStyleUtils';

describe('BorderBeam.Semantic', () => {
  const [varName] = genCssVar(defaultPrefixCls, 'border-beam');

  it('should support classNames and styles as objects', async () => {
    const { container } = render(
      <BorderBeam
        classNames={{
          root: 'custom-root',
          beam: 'custom-beam',
        }}
        styles={{
          root: { padding: 8, borderRadius: 18 },
          beam: { opacity: 0.8 },
        }}
      >
        <div>content</div>
      </BorderBeam>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-border-beam');
    const beamElement = container.querySelector<HTMLElement>('.ant-border-beam-beam');

    expect(rootElement).toHaveClass('custom-root');
    expect(beamElement).toHaveClass('custom-beam');
    expect(rootElement).toHaveStyle({ padding: '8px' });
    expect(rootElement).toHaveStyle({ borderRadius: '18px' });
    expect(rootElement?.style.getPropertyValue(varName('beam-clip-radius'))).toBe('18px');

    await waitFor(() => {
      expect(beamElement).toHaveStyle({ opacity: '0.8' });
    });
  });

  it('should support classNames and styles as functions', async () => {
    const classNamesFn = jest.fn(
      ({ props }: { props: React.ComponentProps<typeof BorderBeam> }) => ({
        root: props.style?.borderRadius ? 'radius-root' : 'default-root',
        beam: props.color === '#36cfc9' ? 'custom-beam' : 'default-beam',
      }),
    );

    const stylesFn = jest.fn(({ props }: { props: React.ComponentProps<typeof BorderBeam> }) => ({
      root: { padding: props.style?.borderRadius ? '8px' : '4px' },
      beam: { opacity: props.color === '#36cfc9' ? 0.5 : 1 },
    }));

    const { container, rerender } = render(
      <BorderBeam
        color="#36cfc9"
        style={{ borderRadius: 20 }}
        classNames={classNamesFn}
        styles={stylesFn}
      >
        <div>content</div>
      </BorderBeam>,
    );

    let rootElement = container.querySelector<HTMLElement>('.ant-border-beam');
    let beamElement = container.querySelector<HTMLElement>('.ant-border-beam-beam');

    expect(rootElement).toHaveClass('radius-root');
    expect(beamElement).toHaveClass('custom-beam');
    expect(rootElement).toHaveStyle({ padding: '8px' });
    expect(beamElement).toHaveStyle({ opacity: '0.5' });

    rerender(
      <BorderBeam classNames={classNamesFn} styles={stylesFn}>
        <div>content</div>
      </BorderBeam>,
    );

    rootElement = container.querySelector<HTMLElement>('.ant-border-beam');
    beamElement = container.querySelector<HTMLElement>('.ant-border-beam-beam');

    expect(rootElement).toHaveClass('default-root');
    expect(beamElement).toHaveClass('default-beam');
    expect(rootElement).toHaveStyle({ padding: '4px' });

    await waitFor(() => {
      expect(beamElement).toHaveStyle({ opacity: '1' });
    });
  });

  it('should apply ConfigProvider root styles to both the wrapper and beam track', () => {
    const { container } = render(
      <ConfigProvider borderBeam={{ style: { borderRadius: 22, padding: 6 } }}>
        <BorderBeam>
          <div>content</div>
        </BorderBeam>
      </ConfigProvider>,
    );

    const rootElement = container.querySelector<HTMLElement>('.ant-border-beam');

    expect(rootElement).toHaveStyle({ borderRadius: '22px' });
    expect(rootElement).toHaveStyle({ padding: '6px' });
    expect(rootElement?.style.getPropertyValue(varName('beam-clip-radius'))).toBe('22px');
  });
});
