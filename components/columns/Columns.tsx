import styled from 'styled-components';

export interface Props {
  count?: number;
  gridTemplateColumns?: string;
  breakpoint?: string;
}

export const Columns = styled.div<Props>`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns, count }) =>
    gridTemplateColumns || (count ? `repeat(${count}, 1fr)` : null)};
  grid-column-gap: ${({ theme }) => theme.spacing.md};
  grid-row-gap: ${({ theme }) => theme.spacing.md};
  list-style-type: none;
  margin: 0;
  padding: 0;
  @media (max-width: ${({ theme, breakpoint }) =>
      breakpoint ? theme.breakpoints[breakpoint] : null}) {
    justify-items: center;
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: ${({ theme }) => theme.spacing.sm};
  }
`;
