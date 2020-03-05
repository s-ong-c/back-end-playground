import * as React from 'react';
import PostCommentsTemplate from '../../components/post/PostCommentsTemplate';
import PostCommentsWriteContainer from './PostCommentsWriteContainer';
import { Comment, RELOAD_COMMENTS } from '../../lib/graphql/post';
import PostCommentList from '../../components/post/PostCommentList';
import { useQuery } from '@apollo/react-hooks';

export interface PostCommentsProps {
  comments: Comment[];
  postId: string;
}

const PostComments: React.FC<PostCommentsProps> = ({ comments, postId }) => {
  // const reloadComments = useQuery(RELOAD_COMMENTS, {
  //   variables: {
  //     id: postId,
  //   },
  //   skip: true,
  //   fetchPolicy: 'network-only',
  // });

  // const onConfirmRemove = React.useCallback(async () => {
  //   reloadComments.refetch();
  // }, [reloadComments]);

  console.log(comments);
  return (
    <PostCommentsTemplate count={comments.length}>
      <PostCommentsWriteContainer postId={postId} />
      <PostCommentList comments={comments} />
    </PostCommentsTemplate>
  );
};

export default PostComments;
