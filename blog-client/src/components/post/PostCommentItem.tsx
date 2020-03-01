import * as React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import palette from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import { defaultThumbnail } from '../../static/images';
import Typography from '../common/Typography';

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
export interface PostCommentItemProps {
  comment: Comment;
}

const PostCommentItem: React.FC<PostCommentItemProps> = ({ comment }) => {
  const { user, created_at, text } = comment;
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
        <div className="actions">
          <span>수정</span>
          <span>삭제</span>
        </div>
      </CommentHead>
      <Typography>
        <CommnetText>{text}</CommnetText>
      </Typography>
      <CommentFoot>
        <div className="toggle">
          <div className="__bar"></div>
          <span>View replies</span>
        </div>
      </CommentFoot>
    </PostCommentItemBlock>
  );
};

export default PostCommentItem;
