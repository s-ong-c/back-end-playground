import * as React from 'react';
import styled from 'styled-components';
import PostCard from './PostCard';
import { PartialPost } from '../../lib/graphql/post';

const PostCardListBlock = styled.div``;
interface PostCardListProps{
  posts: PartialPost[];
  onLoadMore: Function;
}

const PostCardList: React.SFC<PostCardListProps> = ({ posts, onLoadMore }) => {
  return <PostCardListBlock>
    {posts.map(post => (
      <PostCard key={post.id} post={post} />
    ))}
    <button onClick={() => onLoadMore()} />
    </PostCardListBlock>;
  };

export default PostCardList;