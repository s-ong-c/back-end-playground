import * as React from 'react';
import PostCardList from '../../components/common/PostCardList';
import { GET_POST_LIST, PartialPost } from '../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';
import useScrollPagination from '../../lib/hooks/useScrollPagination';
import { safe } from '../../lib/utils';
import { Helmet } from 'react-helmet-async';

interface RecentPostsProps {}

const RecentPosts: React.FC<RecentPostsProps> = props => {
  const getPostList = useQuery<{ posts: PartialPost[] }>(GET_POST_LIST, {
    notifyOnNetworkStatusChange: true,
  });

  const { data } = getPostList;
  const onLoadMore = React.useCallback(
    (cursor: string) => {
      getPostList.fetchMore({
        variables: {
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            posts: [...prev.posts, ...fetchMoreResult.posts],
          };
        },
      });
    },
    [getPostList],
  );

  const cursor = safe(() => data!.posts[data!.posts.length - 1].id);
  useScrollPagination({
    cursor,
    onLoadMore,
  });

  if (!data || !data.posts) return null;

  return (
    <>
      <Helmet>
        <title>포스트 - songc</title>
        <meta name="description" />
      </Helmet>
      <PostCardList posts={data.posts} />
      {/* {getPostList.loading && <PostCardListSkeleton forLoading />} */}
    </>
  );
};

export default RecentPosts;
