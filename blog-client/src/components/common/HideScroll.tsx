import * as React from 'react';

export interface HideScrollProps {}

const { useEffect, useLayoutEffect } = React;
/**
 *
 * Hides body scrollbar on mount
 * Revert on unmount
 *
 */

/**
 * class 작성시
 */
// class HideScroll extends React.Component<HideScrollProps> {
//   prevStyles: CSSStyleDeclaration | null = null;

//   constructor(props: HideScrollProps) {
//     super(props);
//     if (typeof window === 'undefined') return;
//     this.prevStyles = getComputedStyle(window.document.body);
//   }

//   componentWillMount() {
//     if (typeof window === 'undefined' || !this.prevStyles) return;
//     window.document.body.style.overflowX = this.prevStyles.overflowX;
//     window.document.body.style.overflowY = this.prevStyles.overflowY;
//   }
//   render() {
//     return null;
//   }
// }

/**
 *
 *  useLayoutEffect :components 가 나타나기전에
 *                   반영이 되는 componentWillMount() 과 같은역할을 한다
 */
const HideScroll: React.SFC<HideScrollProps> = props => {
  useLayoutEffect(() => {
    const prevStyles = getComputedStyle(window.document.body);
    window.document.body.style.overflowX = 'hidden';
    window.document.body.style.overflowY = 'hidden';
    return () => {
      window.document.body.style.overflowX = prevStyles.overflowX;
      window.document.body.style.overflowY = prevStyles.overflowY;
    };
  }, []);
  return null;
};

export default HideScroll;
