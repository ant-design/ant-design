import React from 'react';

import BorderBeam from '..';
import { render } from '../../../tests/utils';

describe('BorderBeam.Semantic', () => {
  it('should support classNames and styles as objects', () => {
    const { container } = render(
      <BorderBeam
        classNames={{
          root: 'custom-root',
          beam: 'custom-beam',
        }}
        styles={{
          root: { padding: 8 },
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
    expect(beamElement).toHaveStyle({ opacity: '0.8' });
  });

  it('should support classNames and styles as functions', () => {
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
    expect(beamElement).toHaveStyle({ opacity: '1' });
  });
});
