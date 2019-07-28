import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { defaultThumbnail, test } from '../../static/images';
import Tag from './Tag';

const PostCardBlock = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  &:first-child {
    padding-top: 0;
  }
  .user-info {
    display: flex;
    align-items: center;
      img {
       width: 3rem;
       height: 3rem;
       display: block;
       margin-right: 1rem;
       background: ${palette.gray0};
       object-fit: cover;
       border-radius: 1.5rem;
    }
    .username {
      font-size: 0.875rem;
      color: ${palette.gray9};
      font-weight: bold;
    }
    margin-bottom: 1.5rem;
  }
  .post-thumbnail {
      width:100%;
      max-height: 369px;
      margin-bottom: 1rem;
    }
    line-height: 1.5;
    h2 {
      font-size:1.5rem;
      margin: 0;
      color:${palette.gray9};
   }
   p {
     margin-bottom:0;
     margin-top: 0.5rem;
     font-size:1rem;
     color: ${palette.gray7};
   }
   .subinfo {
    color: ${palette.gray6};
    font-size:0.875rem;
     span {

     }
     span + span:before {
      content: ' ・ ';
     }
   }
   .tags-wrapper {
     margin-top: 0.5rem;
   }
`;
interface PostCardProps{}

const PostCard: React.SFC<PostCardProps> = props => {
  return <PostCardBlock>
    <div className="user-info">
      <img src={defaultThumbnail} />
      <div className="username">SONGC</div>
    </div>
    <img className="post-thumbnail" src="https://thumb.velog.io/resize?url=https://images.velog.io/post-images/velopert/fa31faf0-95cb-11e9-9edc-c99912cb3e22/55c1bff8-8014-4997-9b0b-e5f52f1ddfed.jpeg&width=512"
    />
    <h2>감성 천재 포르투갈 포르투 인생샷 스팟 추천</h2>
    <p>내용내용....</p>
    <div className="subinfo">
      <span>2019년 3월 23일</span>
      <span>0개의 댓글</span>
    </div>
    <div className="tags-wrapper">
      <Tag>리액트</Tag>
      <Tag>웹 개발</Tag>
    </div>
  </PostCardBlock>;
  };

export default PostCard;