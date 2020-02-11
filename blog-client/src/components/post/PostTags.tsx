import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostTagsBlock = styled.div`
  margin-top: 0.875rem;
  margin-bottom: -0.875rem;
`;

const Tag = styled(Link)`
  display: inline-flex;
  background: linear-gradient(36deg, #380036, #0cbaba);
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-family: 'Gugi', sans-serif;
  height: 2rem;
  color: white;
  align-items: center;
  margin-right: 0.875rem;
  font-weight: 400;
  text-decoration: none;
  margin-bottom: 0.75rem;
  &:hover {
    opacity: 0.6;
  }
`;
export interface PostTagsProps {
  tags: string[];
}

const PostTags: React.FC<PostTagsProps> = ({ tags }) => {
  return (
    <PostTagsBlock>
      {tags.map(tag => (
        <Tag key={tag} to={`/tags/${tag}`}>
          {tag}
        </Tag>
      ))}
    </PostTagsBlock>
  );
};

export default PostTags;
