import { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export function linkColorStyles() {
  return css<{ active?: boolean }>`
    color: ${({ theme, active }) =>
      // eslint-disable-next-line no-nested-ternary
      active ? theme.link.activeColor : theme.link.color};

    &:hover {
      color: ${({ theme }) => theme.link.hover.color};
    }
  `;
}

export function contrastLinkColorStyles() {
  return css<{ active?: boolean }>`
    color: ${({ theme, active }) =>
      // eslint-disable-next-line no-nested-ternary
      active ? theme.link.contrastActiveColor : theme.link.contrastColor};

    &:hover {
      color: ${({ theme }) => theme.link.hover.contrastColor};
    }
  `;
}
