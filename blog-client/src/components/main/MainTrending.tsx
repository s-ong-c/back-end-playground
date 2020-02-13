import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import MainWidget from './MainWidget';
import { Link } from 'react-router-dom';
import { PartialPost } from '../../lib/graphql/post';
import { formatDate } from '../../lib/utils';
import Skeleton from '../common/Skeleton';

interface MainTrendingProps {
  posts: PartialPost[];
}

const MainTrending: React.FC<MainTrendingProps> = ({ posts }) => {
  const sliced = posts.slice(0, 5);

  return (
    <StyledWidget title="공지사항">
      {posts.length === 0 && <div className="empty">공지사항이 없습니다.</div>}
      {posts.length > 0 && (
        <ul>
          {sliced.map(post => (
            <li key={post.id}>
              <h5>
                <Link to={`/@songc/${post.url_slug}`}>{post.title}</Link>
              </h5>
              <div className="date">{formatDate(post.released_at)}</div>
            </li>
          ))}

          {posts.length === 6 && (
            <li className="more">
              <Link to="/@songc">더보기</Link>
            </li>
          )}
        </ul>
      )}
    </StyledWidget>
  );
};

export function MainNoticeWidgetSkeleton() {
  return (
    <StyledWidget title="공지사항">
      <ul>
        {Array.from({ length: 3 }).map((_, index) => (
          <li key={index}>
            <h5>
              <Skeleton width="60%" />
            </h5>
            <div className="date">
              <Skeleton width="5rem" />
            </div>
          </li>
        ))}
      </ul>
    </StyledWidget>
  );
}

const StyledWidget = styled(MainWidget)`
  .empty {
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: ${palette.gray5};
    text-align: center;
    font-size: 0.875rem;
  }
  ul {
    list-style: none;
    padding: 0;
    li {
      h5 {
        margin: 0;
        font-size: 1.125rem;
        line-height: 1.5;
        color: ${palette.gray8};
        a {
          text-decoration: none;
          color: inherit;
          &:hover {
            color: ${palette.gray7};
            text-decoration: underline;
          }
        }
      }
      .date {
        color: ${palette.gray6};
        font-size: 0.875rem;
        margin-top: 0.25rem;
      }
    }
    li.more {
      color: ${palette.gray6};
      a {
        &:hover {
          color: ${palette.gray5};
        }
        text-decoration: underline;
      }
    }
    li + li {
      margin-top: 1rem;
    }
  }
`;

export default MainTrending;
