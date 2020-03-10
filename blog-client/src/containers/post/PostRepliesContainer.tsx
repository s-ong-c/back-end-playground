import React, { useCallback } from 'react';
import {
  GET_REPLIES,
  CommentWithReplies,
  WRITE_COMMENT,
  REMOVE_COMMENT,
  GET_COMMENTS_COUNT,
} from '../../lib/graphql/post';
import PostReply from '../../components/post/PostReply';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { useQuery, useMutation } from '@apollo/react-hooks';

export interface PostRepliesProps {
  commentId: string;
  onHide: () => void;
}

const PostRepliesContainer: React.FC<PostRepliesProps> = ({
  commentId,
  onHide,
}) => {
  const postId = useSelector((state: RootState) => state.post.id);
  const replies = useQuery<{ comment: CommentWithReplies }>(GET_REPLIES, {
    variables: {
      id: commentId,
    },
  });
  const getCommentsCount = useQuery(GET_COMMENTS_COUNT, {
    variables: {
      id: postId,
    },
    skip: true,
  });
  const [writeComment] = useMutation(WRITE_COMMENT);
  const [removeComment] = useMutation(REMOVE_COMMENT);

  const onReply = async (text: string) => {
    console.log(postId, commentId, text);
    await writeComment({
      variables: {
        post_id: postId,
        comment_id: commentId,
        text,
      },
    });
    replies.refetch();
    getCommentsCount.refetch();
  };

  const onRemove = useCallback(
    async (id: string) => {
      await removeComment({ variables: { id } });
      replies.refetch();
      getCommentsCount.refetch();
    },
    [getCommentsCount, removeComment, replies],
  );

  console.log(replies);
  if (replies.loading || !replies.data) {
    return null;
  }

  return (
    <>
      <PostReply
        comments={replies.data.comment.replies}
        onReply={onReply}
        onHide={onHide}
        onRemove={onRemove}
      />
    </>
  );
};

export default PostRepliesContainer;
