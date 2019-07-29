import * as React from 'react';
import PostCardList from '../../components/common/PostCardList';
import { Query, QueryResult } from 'react-apollo';
import { GET_POST_LIST, Post, PartialPost } from '../../lib/graphql/post';

interface RecentPostsProps{}

const RecentPosts: React.SFC<RecentPostsProps> = props => {
  return (
        <Query query={GET_POST_LIST}>
           {({loading, error, data}: QueryResult<{ posts: PartialPost[] }>) => {
               if (loading || error || !data) return null;
               return <PostCardList posts={data.posts} />
           }}
        </Query>
        );
  };

export default RecentPosts;