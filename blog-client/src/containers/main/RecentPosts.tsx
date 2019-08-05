import * as React from 'react';
import PostCardList from '../../components/common/PostCardList';
import { Query, QueryResult } from 'react-apollo';
import { GET_POST_LIST, Post, PartialPost } from '../../lib/graphql/post';

interface RecentPostsProps{}

const RecentPosts: React.SFC<RecentPostsProps> = props => {
  return (
        <Query query={GET_POST_LIST}>
           {({
             loading, 
             error, 
             data, 
             fetchMore,
            }: QueryResult<{ posts: PartialPost[] }>) => {
               if (loading || error || !data) return null;
               return (
                <PostCardList posts={data.posts} onLoadMore={() => {
                  fetchMore({
                    variables: {
                      cursor: data.posts[data.posts.length - 1].id,
                    },
                    updateQuery: (prev, { fetchMoreResult}) => {
                      return {posts: [
                        ...data.posts, ...fetchMoreResult!.posts] };
                    }
                  })
               }} />
              );
           }}
        </Query>
        );
  };

export default RecentPosts;