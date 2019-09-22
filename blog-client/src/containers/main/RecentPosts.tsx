import * as React from 'react';
import PostCardList from '../../components/common/PostCardList';
import { Query, QueryResult } from 'react-apollo';
import { GET_POST_LIST, Post, PartialPost } from '../../lib/graphql/post';
import ScrollingPagination from '../../components/common/ScrollingPagination';
import client from '../../lib/graphql/client';

interface RecentPostsProps {}
const { useState } = React;
const RecentPosts: React.SFC<RecentPostsProps> = props => {
  const [loadingMore, setLoadingMore] = useState(false);
  return (
    <Query query={GET_POST_LIST}>
      {({
        loading,
        error,
        data,
        fetchMore,
      }: QueryResult<{ posts: PartialPost[] }>) => {
        if (error || !data || !data.posts) return null;
        return (
          <>
            <PostCardList posts={data.posts} />
            <ScrollingPagination
              loading={loadingMore}
              lastCursor={data.posts[data.posts.length - 1].id}
              onLoadMore={async cursor => {
                setLoadingMore(true);
                try {
                  const result = await client.query<{ posts: PartialPost[] }>({
                    query: GET_POST_LIST,
                    variables: { cursor },
                  });
                  client.writeQuery({
                    query: GET_POST_LIST,
                    data: {
                      posts: [...data.posts, ...result.data.posts],
                    },
                  });
                } catch (error) {}
                setLoadingMore(false);
              }}
              onPrefetch={cursor => {
                client.query({
                  query: GET_POST_LIST,
                  variables: { cursor },
                });
              }}
            />
          </>
        );
      }}
    </Query>
  );
};

export default RecentPosts;
