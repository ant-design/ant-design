import * as React from 'react';
import styled from 'styled-components';
import { spacing, Spacing as ThemeSpacing } from '../../../../components/varnish/spacing';

export class SpacingDisplay extends React.PureComponent {
  render() {
    return (
      <SpacingGrid>
        {Object.keys(spacing).map(sKey => {
          const spac = spacing[sKey];
          return <SpacingRow spacing={spac} key={sKey} label={sKey} />;
        })}
      </SpacingGrid>
    );
  }
}

interface SpacingRowProps {
  spacing: ThemeSpacing;
  label: string;
}
class SpacingRow extends React.PureComponent<SpacingRowProps> {
  render() {
    return (
      <>
        <Key>{this.props.label}</Key>
        <Px>{this.props.spacing.px}</Px>
        <Example width={this.props.spacing.px}>
          <ExampleInner />
          <ExampleInner />
          <ExampleInner />
          <ExampleInner />
          <ExampleInner />
          <ExampleInner />
        </Example>
      </>
    );
  }
}

const SpacingGrid = styled.div`
  display: grid;
  align-items: center;
  grid-gap: ${({ theme }) => theme.spacing.lg};
`;

const Key = styled.div`
  grid-column: 1;
`;

const Px = styled.div`
  grid-column: 2;
`;

const Example = styled.div<{ width: string }>`
  display: grid;
  grid-gap: ${props => props.width};
  grid-template-columns: repeat(6, min-content);
  grid-column: 4;
  overflow: hidden;
  max-width: 14em;
`;

const ExampleInner = styled.div`
  display: inline-block;
  width: ${({ theme }) => theme.spacing.xl};
  height: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.palette.primary.main};
`;
