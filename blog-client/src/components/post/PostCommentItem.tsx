import * as React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import { defaultThumbnail } from '../../static/images';
import Typography from '../common/Typography';
import PostRepliesContainer from '../../containers/post/PostRepliesContainer';
import useBoolean from '../../lib/hooks/useBoolean';
import PostCommentExtra from './PostCommentExtra';
import useToggle from '../../lib/hooks/useToggle';
import { MdMoreVert } from 'react-icons/md';
const PostCommentItemBlock = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  & + & {
    border-top: 1px solid ${palette.gray2};
  }
`;
const CommentHead = styled.div`
  display: flex;
  margin-bottom: 2rem;
  justify-content: space-between;
  .profile {
    display: flex;
    align-items: center;
    img {
      width: 3.375rem;
      height: 3.375rem;
      display: block;
      border-radius: 50%;
    }
    .comment-info {
      margin-left: 1rem;
      line-height: 1;
      font-size: 1rem;
      .username {
        font-weight: bold;
        color: ${palette.gray8};
      }
      .date {
        margin-top: 0.25rem;
        color: ${palette.gray5};
        font-size: 0.875rem;
      }
    }
  }
  .actions {
    font-size: 0.875rem;
    color: ${palette.gray6};
    span {
      cursor: pointer;
      &:hover {
        color: ${palette.gray6};
        text-decoration: underline;
      }
    }
    span + span {
      margin-left: 0.5rem;
    }
  }
`;

const CommnetText = styled.p``;
const CommentFoot = styled.div`
  margin-top: 2rem;
  .toggle {
    cursor: pointer;
    display: flex;
    align-items: center;
    /* color: ${palette.gray4}; */
    color: rgba(var(--f52,153,153,153),1);
    font-weight: bold;
    &:hover,&:active {
        color: ${palette.gray4} ;
      }
    .__bar {
      /* border-bottom: 1px solid ${palette.gray4}; */
      border-bottom: 1px solid rgba(var(--f52, 153, 153, 153), 1);
      display: inline-block;
      height: 0;
      margin-right: 0.5rem;
      vertical-align: middle;
      width: 24px;
    }
  }
`;
const TogglerBlock = styled.div`
  display: flex;
  align-items: center;
  color: black;
  font-weight: bold;
  svg {
    margin-right: 0.5rem;
  }
`;
export interface PostCommentItemProps {
  comment: Comment;
  ownComment: boolean;
  onRemove: (id: string) => any;
}

export interface TogglerProps {
  open: boolean;
  count: number;
  onToggle: () => any;
}

const Toggler: React.FC<TogglerProps> = ({ open, onToggle, count }) => {
  //const openText = count ? `${count}개의 답글` : `답글 달기`;
  return (
    <TogglerBlock onClick={onToggle}>
      <div className="toggle">
        <div className="__bar"></div>
        <span> {open ? 'Hide replies' : 'View replie'}</span>
      </div>
    </TogglerBlock>
  );
};
const PostCommentItem: React.FC<PostCommentItemProps> = ({
  comment,
  ownComment,
  onRemove,
}) => {
  const [extra, toggle] = useToggle(false);
  const moreButtonRef = React.useRef<HTMLDivElement | null>(null);

  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    if (!moreButtonRef.current) return;
    if (
      e.target === moreButtonRef.current ||
      moreButtonRef.current.contains(e.target as Node)
    ) {
      return;
    }
    toggle();
  };

  const { id, user, created_at, text, replies_count, level } = comment;
  const [open, onToggle] = useBoolean(false);
  // const [editing, isEditing] = useBoolean(false);
  const onAction = () => {
    onRemove(id);
    toggle();
  };
  return (
    <PostCommentItemBlock>
      <CommentHead>
        <div className="profile">
          <img
            src={user.profile.thumbnail || defaultThumbnail}
            alt="comment-user-thumbnail"
          />
          <div className="comment-info">
            <div className="username">{user.username}</div>
            <div className="date">{formatDate(created_at)}</div>
          </div>
        </div>
        {/* {ownComment && !editing && (
            )} */}
        <div className="actions">
          {/* <span>수정</span>
            <span onClick={() => onRemove(id)}>삭제</span> */}
          <div ref={moreButtonRef}>
            <MdMoreVert className="more" onClick={toggle} />
          </div>
          <PostCommentExtra
            visible={extra}
            onClose={onClose}
            onRemove={onAction}
            onConfirm={onAction}
          />
        </div>
      </CommentHead>
      <Typography>
        <CommnetText>{text}</CommnetText>
      </Typography>
      <CommentFoot>
        {level < 2 && (
          <Toggler open={open} count={replies_count} onToggle={onToggle} />
        )}
        {open && <PostRepliesContainer commentId={id} onHide={onToggle} />}
      </CommentFoot>
    </PostCommentItemBlock>
  );
};

export default PostCommentItem;
