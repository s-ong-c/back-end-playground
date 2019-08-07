import * as React from 'react';
import styled, {css} from 'styled-components';
import palette from '../../lib/styles/palette';

const ButtonBlock = styled.button<{theme: string}>`
  display: inline-flex;
  height: 2rem;
  align-items: center;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  font-weight: bold;
  font-size: 1rem;
  cursor:pointer;
  outline:none;
  border: none;
 ${props => props.theme === 'default' && css`
    background: ${palette.gray8};
    color: white;
    border-radius: 1rem;
    &:hover,  &:focus  {
      background: ${palette.gray6}
    }
  `}
`;
interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  theme?: string;
}

const Button: React.SFC<ButtonProps> = ({ theme, children, ref, ...rest }) => {
  const htmlProps = rest as any;
  return (
    <ButtonBlock theme={theme} {...htmlProps}>
      {children}
    </ButtonBlock>
  );
};

Button.defaultProps = {
  theme: 'default', // black button
};

export default Button;