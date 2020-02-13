import * as React from 'react';
import styled from 'styled-components';
import PageTemplate from '../base/PageTemplate';
import { breakpoints } from '../../lib/styles/responsive';
import media from '../../lib/styles/media';

const MainTemplateBlock = styled(PageTemplate)`
  main {
    width: ${breakpoints.xlarge};
    ${media.large} {
      width: 1024px;
    }
    margin: 0 auto;
    margin-top: 3.5rem;
    margin-bottom: 8rem;
    display: flex;
    justify-content: space-between;
  }
  ${media.medium} {
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
  }
`;
const Left = styled.div`
  width: 192px;
  ${media.medium} {
    display: none;
  }
`;
const Main = styled.div`
  width: 702px;
`;
const Right = styled.div`
  width: 240px;
  ${media.medium} {
    display: none;
  }
`;

type MainTemplateNamespace = {
  Left: typeof Left;
  Main: typeof Main;
  Right: typeof Right;
};

interface MainTemplateProps {}
const MainTemplate: React.FC<MainTemplateProps> & MainTemplateNamespace = ({
  children,
}) => {
  return (
    <MainTemplateBlock>
      <main>{children}</main>
    </MainTemplateBlock>
  );
};

MainTemplate.Left = Left;
MainTemplate.Main = Main;
MainTemplate.Right = Right;
export default MainTemplate;
