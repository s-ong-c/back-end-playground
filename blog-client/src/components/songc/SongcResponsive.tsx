import * as React from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';

const SongcResponsiveBlock = styled.div`
  width: 768px;
  margin: 0 auto;
  ${media.small} {
    width: 100%;
  }
`;
export interface SongcResponsiveProps {
  className?: string;
  style?: React.CSSProperties;
}

const SongcResponsive: React.FC<SongcResponsiveProps> = ({
  children,
  className,
  style,
}) => {
  return (
    <SongcResponsiveBlock
      children={children}
      className={className}
      style={style}
    />
  );
};

export default SongcResponsive;
