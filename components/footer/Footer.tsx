import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { palette } from '../varnish/palette';
import { Color } from '../varnish/colors';
import Link from '../link';
import Layout, { AppLayoutVariant, AppLayoutContext } from '../layout';

export type FooterVariant = 'default' | 'dark';

interface Props {
  variant?: FooterVariant;
  children?: React.ReactNode | React.ReactNodeArray;
  /* If true, the background of the parent "page" (the body and html elements)
       is adjusted to match that of the footer. */
  setPageBackground?: boolean;
  layout?: AppLayoutVariant;
  className?: string;
}

export default class Footer extends React.PureComponent<Props> {
  static defaultProps = {
    setPageBackground: true,
  };

  render() {
    const contrast = this.props.variant === 'dark' ? true : undefined;
    return (
      <AppLayoutContext.Consumer>
        {({ appLayoutVariant }) => (
          <StyledFooter
            contrast={contrast}
            layout={appLayoutVariant}
            className={this.props.className}
          >
            {this.props.setPageBackground ? (
              <WithPageBackground
                color={contrast ? palette.background.dark : palette.background.light}
              />
            ) : null}
            {this.props.children ? (
              this.props.children
            ) : (
              <span>
                <a href="https://allenai.org">© The Allen Institute for Artificial Intelligence</a>{' '}
                - All Rights Reserved |{' '}
                <a href="https://allenai.org/privacy-policy.html">Privacy Policy</a> |{' '}
                <a href="https://allenai.org/terms.html">Terms of Use</a>
              </span>
            )}
          </StyledFooter>
        )}
      </AppLayoutContext.Consumer>
    );
  }
}

const WithPageBackground = createGlobalStyle<{ color: Color }>`
    html, body {
        background: ${({ color }) => `${color}`};
    }
`;

const StyledFooter = styled(Layout.Footer)<{ contrast?: boolean; layout?: AppLayoutVariant }>`
  && {
    background: ${({ theme, contrast }) =>
      contrast ? theme.palette.background.dark : theme.palette.background.light};
    color: ${({ theme, contrast }) =>
      contrast ? theme.palette.text.contrast : theme.palette.text.default};
    text-align: ${({ layout }) => (layout !== 'app' ? 'center' : null)};

    a[href] {
      ${({ contrast }) => (contrast ? Link.contrastLinkColorStyles() : null)};
    }
  }
`;
