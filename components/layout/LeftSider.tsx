// this is a special sider that 'knows' about the header so it sized properly.
// we did not replace sider, since sider can be used in other situations.

import * as React from 'react';
import styled from 'styled-components';
import Sider, { SiderProps } from './Sider';
import { AppLayoutContext } from './AppLayoutContext';

interface LeftSiderProps extends SiderProps {
  width: number | string;
  collapsedWidth: number | string;
}

const LeftSider = (props: LeftSiderProps) => (
  <AppLayoutContext.Consumer>
      {({ currentHeaderHeight }) => (
          <StyledLeftSider trigger={null} breakpoint="md" {...props}>
              <FixedContainer
                  paddingTop={currentHeaderHeight}
                  breakpoint={props.breakpoint || 'md'}
                  width={props.width}
                  collapsedWidth={props.collapsedWidth}>
                  {props.children}
              </FixedContainer>
          </StyledLeftSider>
      )}
  </AppLayoutContext.Consumer>
);

const StyledLeftSider = styled(Sider)`
  background: ${({ theme }) => theme.color.white};
  transition: none;
`;

const FixedContainer = styled.div<{
  paddingTop: number;
  width: number | string;
  collapsedWidth: number | string;
  breakpoint: string;
}>`
  border-right: 1px solid ${({ theme }) => theme.palette.border.default};
  position: fixed;
  top: 0;
  bottom: 0;
  width: ${({ width }) => width};
  padding-top: ${({ paddingTop }) => paddingTop}px;
  transition: padding-top 200ms ease-in-out;
  overflow: auto;
  background: ${({ theme }) => theme.color.white};

  @media screen and (max-width: ${({ theme, breakpoint }) => theme.breakpoints[breakpoint]}) {
      width: ${({ collapsedWidth }) => collapsedWidth};
  }
`;

export default LeftSider;
