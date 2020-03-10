import * as React from 'react';
import PostCommentsTemplate from '../../components/post/PostCommentsTemplate';
import PostCommentsWriteContainer from './PostCommentsWriteContainer';
import {
  Comment,
  RELOAD_COMMENTS,
  REMOVE_COMMENT,
} from '../../lib/graphql/post';
import PostCommentList from '../../components/post/PostCommentList';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useUserId } from '../../lib/hooks/useUser';

export interface PostCommentsProps {
  comments: Comment[];
  postId: string;
}

const PostComments: React.FC<PostCommentsProps> = ({ comments, postId }) => {
  const reloadComments = useQuery(RELOAD_COMMENTS, {
    variables: {
      id: postId,
    },
    skip: true,
    fetchPolicy: 'network-only',
  });
  // const [askRemove, onToggleAskRemove] = useBoolean(false);
  //const [removeId, setRemoveId] = React.useState('');
  const currentUserId = useUserId();
  const [removeComment] = useMutation(REMOVE_COMMENT);

  // const onConfirmRemove = React.useCallback(async () => {
  //   onToggleAskRemove();
  //   await removeComment({ variables: { id: removeId } });
  //   reloadComments.refetch();
  // }, [onToggleAskRemove, reloadComments, removeComment, removeId]);

  const onRemove = React.useCallback(
    async (id: string) => {
      // setRemoveId(id);
      await removeComment({ variables: { id } });
      reloadComments.refetch();
    },
    [reloadComments, removeComment],
  );
  return (
    <>
      <PostCommentsTemplate count={comments.length}>
        <PostCommentsWriteContainer postId={postId} />
        <PostCommentList
          comments={comments}
          currentUserId={currentUserId}
          onRemove={onRemove}
        />
      </PostCommentsTemplate>
    </>
  );
};

export default PostComments;
