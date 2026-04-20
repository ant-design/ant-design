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
        root: props.reverse ? 'reverse-root' : 'forward-root',
        beam: props.disabled ? 'disabled-beam' : 'enabled-beam',
      }),
    );

    const stylesFn = jest.fn(({ props }: { props: React.ComponentProps<typeof BorderBeam> }) => ({
      root: { padding: props.size === 80 ? '8px' : '4px' },
      beam: { opacity: props.disabled ? 0.5 : 1 },
    }));

    const { container, rerender } = render(
      <BorderBeam reverse size={80} classNames={classNamesFn} styles={stylesFn}>
        <div>content</div>
      </BorderBeam>,
    );

    let rootElement = container.querySelector<HTMLElement>('.ant-border-beam');
    let beamElement = container.querySelector<HTMLElement>('.ant-border-beam-beam');

    expect(rootElement).toHaveClass('reverse-root');
    expect(beamElement).toHaveClass('enabled-beam');
    expect(rootElement).toHaveStyle({ padding: '8px' });
    expect(beamElement).toHaveStyle({ opacity: '1' });

    rerender(
      <BorderBeam disabled classNames={classNamesFn} styles={stylesFn}>
        <div>content</div>
      </BorderBeam>,
    );

    rootElement = container.querySelector<HTMLElement>('.ant-border-beam');
    beamElement = container.querySelector<HTMLElement>('.ant-border-beam-beam');

    expect(rootElement).toHaveClass('forward-root');
    expect(beamElement).toHaveClass('disabled-beam');
    expect(rootElement).toHaveStyle({ padding: '4px' });
    expect(beamElement).toHaveStyle({ opacity: '0.5' });
  });
});
