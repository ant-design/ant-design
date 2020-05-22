import * as React from 'react';
import styled from 'styled-components';
import { Spacing } from '../../../../components/varnish/spacing';
import { breakpoints } from '../../../../components/varnish/breakpoints';

export class BreakpointDisplay extends React.PureComponent {
  render() {
    return (
      <BreakpointGrid>
        {Object.keys(breakpoints).map(bKey => {
          const breakpoint = breakpoints[bKey];
          return (
            <>
              <BreakpointRow breakpoint={breakpoint} key={bKey} label={bKey} />
              <Example width={breakpoint.px} key={bKey} />
            </>
          );
        })}
      </BreakpointGrid>
    );
  }
}

interface BreakpointRowProps {
  breakpoint: Spacing;
  label: string;
}
class BreakpointRow extends React.PureComponent<BreakpointRowProps> {
  render() {
    return (
      <>
        <Key>{this.props.label}</Key>
        <Px>{this.props.breakpoint.px}</Px>
      </>
    );
  }
}

const BreakpointGrid = styled.div`
  display: grid;
  align-items: center;
  grid-column-gap: ${({ theme }) => theme.spacing.lg};
`;

const Key = styled.div`
  grid-column: 1;
`;

const Px = styled.div`
  grid-column: 2;
`;

const Example = styled.div<{ width: string }>`
  grid-column: 1 / span 3;
  width: ${({ width }) => width};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  height: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.palette.border.main};
`;
