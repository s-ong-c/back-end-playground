import * as React from 'react';
import styled from 'styled-components';
import Header from '../../components/base/Header';
import { getScrollTop } from '../../lib/utils';

const { useEffect, useRef, useState, useCallback } = React;

interface HeaderContainerProps{}

const HeaderContainer: React.SFC<HeaderContainerProps> = props => {
    const lastY = useRef(0);
    const direction = useRef<null | 'UP' | 'DOWN'>(null);

    const [ floating, setFloating ] = useState(false);
    const [ baseY, setBaseY] = useState(0);
    const [ floatingMargin, setFloatingMargin] = useState(-60);
    const onScroll = useCallback(() =>  {
        const scrollTop = getScrollTop();
        
        if (floating && scrollTop === 0) {
            setFloating(false);
        }
        if (floating) {
            const calculated = -60 + baseY - scrollTop;
            setFloatingMargin(calculated > 0 ? 0 : calculated);
        }
        const d = scrollTop < lastY.current ? 'UP' : 'DOWN';
        
        if ( d !== direction.current) {
            setBaseY(scrollTop + ( d === 'DOWN' ? 60 : 0));
            console.log('direction change');
        }

        if (direction.current !== 'UP' && d === 'UP') {
            setFloating(true);
        }
        direction.current = d;
        lastY.current = scrollTop;
        // if ( scrollTop < lastY.current) {
        //     if (floating) return;
        //     setFloating(true);
        //     setBaseY(scrollTop);
        // } else {
        //     setFloating(false);
        // }
       
    },[baseY, floating]);

    useEffect(() => {
        document.addEventListener('scroll',onScroll);
        const reset = () => {
            document.removeEventListener('scroll',onScroll)
        };
        return reset;
    }, [floating, baseY])
  return <Header floating={floating} floatingMargin={floatingMargin}/>;
  };

export default HeaderContainer;
