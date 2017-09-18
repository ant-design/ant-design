import styled, { css } from 'styled-components';

const primaryColor = '#108ee9';

export default styled.label.attrs({
  className: ({ wrapperClass }: any) => wrapperClass
})`
  ${({ prefixCls, theme }: any) => css`
    &:hover .${prefixCls!}-inner,
    .${prefixCls}:hover .${prefixCls!}-inner,
    .${prefixCls!}-input:focus + .${prefixCls!}-inner {
      border-color: ${theme && theme.primaryColor || primaryColor};
    }
  `}
`;
