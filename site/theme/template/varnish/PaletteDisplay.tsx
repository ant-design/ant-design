import * as React from 'react';
import styled from 'styled-components';
import Typography from '../../../../components/typography';
import { Color } from '../../../../components/varnish/colors';
import { palette } from '../../../../components/varnish/palette';

const { Body, BodyMicro } = Typography;

export class PrimaryPalette extends React.PureComponent {
  render() {
    return (
      <ColorGrid>
        <ColorGroup keyName="primary" />
      </ColorGrid>
    );
  }
}

export class SecondaryPalette extends React.PureComponent {
  render() {
    return (
      <ColorGrid>
        <ColorGroup keyName="secondary" />
      </ColorGrid>
    );
  }
}

export class TextPalette extends React.PureComponent {
  render() {
    return (
      <ColorGrid>
        <ColorGroup keyName="text" />
      </ColorGrid>
    );
  }
}

export class BackgroundPalette extends React.PureComponent {
  render() {
    return (
      <ColorGrid>
        <ColorGroup keyName="background" />
      </ColorGrid>
    );
  }
}

export class BorderPalette extends React.PureComponent {
  render() {
    return (
      <ColorGrid>
        <ColorGroup keyName="border" />
      </ColorGrid>
    );
  }
}

export class CommonPalette extends React.PureComponent {
  render() {
    return (
      <ColorGrid>
        <ColorGroup keyName="common" />
      </ColorGrid>
    );
  }
}

interface ColorGroupProps {
  keyName: string;
}

class ColorGroup extends React.PureComponent<ColorGroupProps> {
  render() {
    return (
      <>
        <Label>
          <BodyMicro>theme.palette.{this.props.keyName}.</BodyMicro>
        </Label>
        {Object.keys(palette[this.props.keyName]).map((key: string) => {
          const c = palette[this.props.keyName][key];
          return <ColorRow key={key} keyName={key} color={c} />;
        })}
      </>
    );
  }
}

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: auto max-content repeat(4, auto);
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

interface ColorRowProps {
  keyName: string;
  color: Color;
}

class ColorRow extends React.PureComponent<ColorRowProps> {
  render() {
    return (
      <>
        <PaletteName>{this.props.keyName}</PaletteName>
        <ColorBoxWrapper>
          <ColorBox
            color={this.props.color.hex}
            useContrastText={this.props.color.useContrastText}
          />
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

const Col = styled(Body)`
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  display: inline-block;
  border-top: 1px solid ${({ theme }) => theme.palette.border.default};
`;

const PaletteName = styled(Col)`
  grid-column: 1;
  padding-left: ${({ theme }) => theme.spacing.md};
`;

const ColorBox = styled.div<{ color: string; useContrastText?: boolean }>`
  background: ${props => props.color};
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => `${theme.shape.borderRadius}px`};
  border: 1px solid
    ${({ theme, useContrastText }) =>
      useContrastText ? theme.palette.text.contrast : theme.palette.text.primary};
`;

const ColorBoxWrapper = styled(Col)`
  padding: 7px;
  grid-column: 2;
`;

const ColorName = styled(Col)`
  padding-left: ${({ theme }) => theme.spacing.xs};
  grid-column: 3;
`;

const ColorHex = styled(Col)`
  grid-column: 4;
`;

const ColorRgb = styled(Col)`
  grid-column: 5;
`;

const Label = styled(Col)`
  grid-column: 1 / span 5;
  padding: ${({ theme }) => `${theme.spacing.xl} 0 ${theme.spacing.sm} 0`};
`;
