import * as React from 'react';
import styled from 'styled-components';
import Header from '../../components/base/Header';
import { getScrollTop } from '../../lib/utils';

const { useEffect, useRef, useState } = React;

const HeaderContainerBlock = styled.div``;
interface HeaderContainerProps{}

const HeaderContainer: React.SFC<HeaderContainerProps> = props => {
    const lastY = useRef(0);
    const [ floating, setFloating ] = useState(false);
    const onScroll = () =>  {
        const scrollTop = getScrollTop();
        if (  scrollTop < lastY.current) {
            setFloating(true);
        } else {
            setFloating(false);
        }
        lastY.current = scrollTop;
    }
    useEffect(() => {
        document.addEventListener('scroll',onScroll);
        const unmount = () => {};
        return unmount;
    }, [])
  return <Header floating={floating} />;
  };

export default HeaderContainer;
