import * as React from 'react';
import { getScrollBottom } from '../../lib/utils';

interface ScrollingPaginationProps {
  loading: boolean;
  lastCursor: null | string;
  onLoadMore: (cursor: string) => Promise<void>;
  onPrefetch: (cursor: string) => void;
}

export default class ScrollingPagination extends React.Component<
  ScrollingPaginationProps,
  any
> {
  loadMore = () => {
    const { onLoadMore, lastCursor, loading } = this.props;
    if (!lastCursor) return;
    if (loading) return;
    console.log('load more ....');
    onLoadMore(lastCursor);
  };
  handlerScroll = () => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom < 768) {
      console.log('start');
      this.loadMore();
    }
  };
  componentDidMount() {
    window.addEventListener('scroll', this.handlerScroll);
    if (this.props.lastCursor) {
      this.props.onPrefetch(this.props.lastCursor);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlerScroll);
  }
  componentDidUpdate(prevProps: ScrollingPaginationProps) {
    if (
      prevProps.lastCursor !== this.props.lastCursor &&
      this.props.lastCursor
    ) {
      this.props.onPrefetch(this.props.lastCursor);
    }
  }
  public render() {
    return <div />;
  }
}
// const { useEffect, useRef, useCallback} = React;
// const ScrollingPagination: React.SFC<ScrollingPaginationProps> = ({ loading }) => {
//     const onScroll = useCallback(() => {
//         const scrollBottom = getScrollBottom();
//         console.log(loading);
//     },[]);
//     useEffect(() => {
//         window.addEventListener('scroll', onScroll);
//         return () => {
//             window.removeEventListener('scroll', onScroll);
//         }
//     });
//   return null;
//   };

// export default ScrollingPagination;
