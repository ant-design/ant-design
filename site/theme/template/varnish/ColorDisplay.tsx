import * as React from 'react';
import styled from 'styled-components';
import Typography from '../../../../components/typography';
import Theme from '../../../../components/varnish';
import { Color } from '../../../../components/varnish/colors';
import { dictionaryToArray } from '../../../../components/_util/varnish/base';

const { BodyJumbo, Body, BodyMicro } = Typography;

const DefaultTheme = Theme.default;
const { color, chartingColor } = DefaultTheme;

const colorGroups: { [k: string]: Color[] } = {
  blues: [
    color.B10,
    color.B9,
    color.B8,
    color.B7,
    color.B6,
    color.B5,
    color.B4,
    color.B3,
    color.B2,
    color.B1,
  ],
  aqua: [
    color.A10,
    color.A9,
    color.A8,
    color.A7,
    color.A6,
    color.A5,
    color.A4,
    color.A3,
    color.A2,
    color.A1,
  ],
  teals: [
    color.T10,
    color.T9,
    color.T8,
    color.T7,
    color.T6,
    color.T5,
    color.T4,
    color.T3,
    color.T2,
    color.T1,
  ],
  greens: [
    color.G10,
    color.G9,
    color.G8,
    color.G7,
    color.G6,
    color.G5,
    color.G4,
    color.G3,
    color.G2,
    color.G1,
  ],
  oranges: [
    color.O10,
    color.O9,
    color.O8,
    color.O7,
    color.O6,
    color.O5,
    color.O4,
    color.O3,
    color.O2,
    color.O1,
  ],
  reds: [
    color.R10,
    color.R9,
    color.R8,
    color.R7,
    color.R6,
    color.R5,
    color.R4,
    color.R3,
    color.R2,
    color.R1,
  ],
  magentas: [
    color.M10,
    color.M9,
    color.M8,
    color.M7,
    color.M6,
    color.M5,
    color.M4,
    color.M3,
    color.M2,
    color.M1,
  ],
  purples: [
    color.P10,
    color.P9,
    color.P8,
    color.P7,
    color.P6,
    color.P5,
    color.P4,
    color.P3,
    color.P2,
    color.P1,
  ],
  neutrals: [
    color.N10,
    color.N9,
    color.N8,
    color.N7,
    color.N6,
    color.N5,
    color.N4,
    color.N3,
    color.N2,
    color.N1,
  ],
  charting: dictionaryToArray(chartingColor),
};

export class PrimaryColorDisplay extends React.PureComponent {
  render() {
    return (
      <PrimaryGrid>
        {[
          DefaultTheme.palette.primary.veryDark,
          DefaultTheme.palette.primary.dark,
          DefaultTheme.palette.primary.default,
          DefaultTheme.palette.secondary.default,
        ].map((c: Color) => (
          <PrimaryColor key={c.displayName} color={c} />
        ))}
      </PrimaryGrid>
    );
  }
}

export class ExtendedColorDisplay extends React.PureComponent {
  render() {
    return (
      <ExtendedGrid>
        {Object.keys(colorGroups).map((group: string) => (
          <ColorGroup key={group} colors={colorGroups[group]} group={group} />
        ))}
      </ExtendedGrid>
    );
  }
}

interface PrimaryColorProps {
  color: Color;
}

class PrimaryColor extends React.PureComponent<PrimaryColorProps> {
  render() {
    return (
      <PrimaryColorGrid>
        <PrimaryColorBox color={this.props.color.hex} />
        <PrimaryColorName>{this.props.color.displayName}</PrimaryColorName>
        <PrimaryColorHex>{this.props.color.hex}</PrimaryColorHex>
        {this.props.color.rgb ? (
          <PrimaryColorRgb>
            {this.props.color.rgb.r}, {this.props.color.rgb.g}, {this.props.color.rgb.b}
          </PrimaryColorRgb>
        ) : null}
      </PrimaryColorGrid>
    );
  }
}

interface ColorGroupProps {
  colors: Color[];
  group: string;
}

class ColorGroup extends React.PureComponent<ColorGroupProps> {
  render() {
    return (
      <>
        <ExtendedHeadRow>
          <Label>{this.props.group}</Label>
        </ExtendedHeadRow>
        {this.props.colors.map((col: Color) => {
          return col ? <ColorRow key={col.displayName} color={col} /> : null;
        })}
      </>
    );
  }
}

interface ColorRowProps {
  color: Color;
}

class ColorRow extends React.PureComponent<ColorRowProps> {
  render() {
    return (
      <>
        <ColorBoxWrapper>
          <ColorBox
            color={this.props.color.hex}
            borderColor={
              this.props.color.useContrastText
                ? DefaultTheme.palette.text.contrast.hex
                : DefaultTheme.palette.text.primary.hex
            }
          >
            <ColorText
              color={
                this.props.color.useContrastText
                  ? DefaultTheme.palette.text.contrast.hex
                  : DefaultTheme.palette.text.primary.hex
              }
            >
              A
            </ColorText>
          </ColorBox>
        </ColorBoxWrapper>
        <ColorName>{this.props.color.displayName}</ColorName>
        <ColorHex>{this.props.color.hex}</ColorHex>
        {this.props.color.rgb ? (
          <ColorRgb>
            {this.props.color.rgb.r}, {this.props.color.rgb.g}, {this.props.color.rgb.b}
          </ColorRgb>
        ) : null}
      </>
    );
  }
}

// TODO:  implement the <Columns count={x} /> component as seen in the Incubator project
const PrimaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: ${({ theme }) => `0 ${theme.spacing.lg}`};
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xlg};
`;

const PrimaryColorGrid = styled.div`
  display: grid;
  grid-template-columns: max-content auto max-content;
  align-items: center;
  grid-template-rows: repeat(2, max-content);
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PrimaryColorBox = styled.div`
  background: ${props => props.color};
  width: 100%;
  height: 76px;
  border-radius: ${({ theme }) =>
    `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`};
  grid-column: 1 / span 3;
`;

const MicroCol = styled(BodyMicro)`
  background: ${({ theme }) => theme.palette.background.light};
  padding: ${({ theme }) => theme.spacing.md};
`;

const PrimaryColorName = styled(MicroCol)`
  grid-column: 1;
  padding-right: 0;
`;

const PrimaryColorHex = styled(MicroCol)`
  grid-column: 2;
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xs}`};
`;

const PrimaryColorRgb = styled(MicroCol)`
  grid-column: 3;
  padding-left: 0;
`;

// TODO:  implement the <Columns count={x} /> component as seen in the Incubator project
const ExtendedGrid = styled.div`
  display: grid;
  grid-template-columns: max-content repeat(3, auto);
  align-items: center;
  grid-template-rows:
    75px repeat(10, auto)
    75px repeat(10, auto)
    75px repeat(10, auto)
    75px repeat(10, auto)
    75px repeat(10, auto)
    75px repeat(10, auto)
    75px repeat(10, auto)
    75px repeat(10, auto);
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ExtendedHeadRow = styled.div`
  grid-column: 1 / span 4;
  align-self: end;
  padding: ${({ theme }) => `${theme.spacing.lg} 0`};
`;

const Label = styled(BodyJumbo)`
  text-transform: capitalize;
`;

const Col = styled(Body)`
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  display: inline-block;
  border-top: 1px solid ${({ theme }) => theme.palette.border.default};
`;

const ColorBox = styled.div<{ color: string; borderColor: string }>`
  display: flex;
  background: ${props => props.color};
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => `${theme.shape.borderRadius}px`};
  border: ${props => `1px solid ${props.borderColor}`};
`;

const ColorText = styled.div`
  align-self: center;
  width: 100%;
  text-align: center;
  color: ${props => props.color};
`;

const ColorBoxWrapper = styled(Col)`
  padding: 7px;
  grid-column: 1;
`;

const ColorName = styled(Col)`
  padding-left: ${({ theme }) => theme.spacing.xs};
  grid-column: 2;
`;

const ColorHex = styled(Col)`
  grid-column: 3;
`;

const ColorRgb = styled(Col)`
  grid-column: 4;
`;
