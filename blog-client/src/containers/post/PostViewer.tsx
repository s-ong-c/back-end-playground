import * as React from 'react';
import { READ_POST, SinglePost } from '../../lib/graphql/post';
import PostHead from '../../components/post/PostHead';
import PostContent from '../../components/post/PostContent';
import { useQuery } from '@apollo/react-hooks';
import PostComments from './PostComments';

export interface PostViewerProps {
  username: string;
  urlSlug: string;
}

const PostViewer: React.FC<PostViewerProps> = ({ username, urlSlug }) => {
  const readPost = useQuery<{ post: SinglePost }>(READ_POST, {
    variables: {
      username,
      url_slug: urlSlug,
    },
  });
  //return (
  // <Query
  //   query={READ_POST}
  //   variables={{
  //     username,
  //     url_slug: urlSlug,
  //   }}
  // >
  //   {({ loading, data, error }: QueryResult<{ post: SinglePost }>) => {
  //     if (error) {
  //       console.log(error);
  //       return null; // SHOW ERROR
  //     }
  //     if (loading) return null;
  //     if (!data || !data.post) return null;
  //     const { post } = data;
  //     return (
  //       <>
  //         <PostHead
  //           title={post.title}
  //           tags={post.tags}
  //           username={username}
  //           date={post.released_at}
  //           thumbnail={post.thumbnail}
  //           hideThumbnail={
  //             !!post.thumbnail && post.body.includes(post.thumbnail)
  //           }
  //         />
  //         <PostContent isMarkdown={post.is_markdown} body={post.body} />
  //       </>
  //     );
  //   }}
  // </Query>
  const { error, data } = readPost;
  if (error) {
    return null;
  }
  if (!data || !data.post) return null;
  const { post } = data;
  return (
    <>
      <PostHead
        title={post.title}
        tags={post.tags}
        username={username}
        date={post.released_at}
        thumbnail={post.thumbnail}
        hideThumbnail={!!post.thumbnail && post.body.includes(post.thumbnail)}
      />
      <PostContent isMarkdown={post.is_markdown} body={post.body} />
      <PostComments />
    </>
  );
};

export default PostViewer;
