import { css } from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export default function contrastLinkColorStyles() {
  return css<{ active?: boolean }>`
    color: ${({ theme, active }) =>
      // eslint-disable-next-line no-nested-ternary
      active ? theme.link.contrastActiveColor : theme.link.contrastColor};

    &:hover {
      color: ${({ theme }) => theme.link.hover.contrastColor};
    }
  `;
}
