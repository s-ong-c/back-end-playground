import * as React from 'react';
import styled from 'styled-components';

const ButtonBlock = styled.div<{ theme: string}>`
  display: flex-inline;
  padding: 0.5rem 1rem;
`;
interface ButtonProps{
  theme?: string;
}

const Button: React.SFC<ButtonProps> = ({theme, children}) => {
  return <ButtonBlock theme={theme}>{children}</ButtonBlock>;
  };

Button.defaultProps = {
  theme: 'default', // black button
};

export default Button;