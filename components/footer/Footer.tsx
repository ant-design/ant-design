import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { palette } from '../style/themes/varnish/palette';
import { Color } from '../style/themes/varnish/colors';
import { contrastLinkColorStyles } from '../link';
import Layout, { LayoutVariant, LayoutContext }  from '../layout';

export type FooterVariant = 'default' | 'dark';

interface Props {
    variant?: FooterVariant;
    children?: React.ReactNode | React.ReactNodeArray;
    /* If true, the background of the parent "page" (the body and html elements)
       is adjusted to match that of the footer. */
    setPageBackground?: boolean;
    layout?: LayoutVariant;
    className?: string;
}

export class Footer extends React.PureComponent<Props> {
    static defaultProps = {
        setPageBackground: true,
    };

    render() {
        const contrast = this.props.variant === 'dark' ? true : undefined;
        return (
            <LayoutContext.Consumer>
                {({ layoutVariant }) => (
                    <StyledFooter
                        contrast={contrast}
                        layout={layoutVariant}
                        className={this.props.className}>
                        {this.props.setPageBackground ? (
                            <WithPageBackground
                                color={
                                    contrast ? palette.background.dark : palette.background.light
                                }
                            />
                        ) : null}
                        {this.props.children ? (
                            this.props.children
                        ) : (
                            <span>
                                <a href="https://allenai.org">
                                    © The Allen Institute for Artificial Intelligence
                                </a>{' '}
                                - All Rights Reserved |{' '}
                                <a href="https://allenai.org/privacy-policy.html">
                                    Privacy Policy
                                </a>{' '}
                                |{' '}
                                <a href="https://allenai.org/terms.html">
                                    Terms of Use
                                </a>
                            </span>
                        )}
                    </StyledFooter>
                )}
            </LayoutContext.Consumer>
        );
    }
}

const WithPageBackground = createGlobalStyle<{ color: Color }>`
    html, body {
        background: ${({ color }) => `${color}`};
    }
`;

const StyledFooter = styled(Layout.Footer)<{ contrast?: boolean; layout?: LayoutVariant }>`
    && {
        background: ${({ theme, contrast }) =>
            contrast ? theme.palette.background.dark : theme.palette.background.light};
        color: ${({ theme, contrast }) =>
            contrast ? theme.palette.text.contrast : theme.palette.text.default};
        text-align: ${({ layout }) => (layout !== 'app' ? 'center' : null)};

        a[href] {
            ${({ contrast }) =>
                contrast ? contrastLinkColorStyles() : null
            };
        }
    }
`;
