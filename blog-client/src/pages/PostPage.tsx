import * as React from 'react';
import PostTemplate from '../components/post/PostTemplate';
import PostViewer from '../containers/post/PostViewer';
import { RouteComponentProps } from 'react-router';

interface PostPageProps
  extends RouteComponentProps<{
    username: string;
    urlSlug: string;
  }> {}

const PostPage: React.FC<PostPageProps> = ({ match }) => {
  const { username, urlSlug } = match.params;
  return (
    <PostTemplate>
      <PostViewer username={username} urlSlug={urlSlug} />
    </PostTemplate>
  );
};

export default PostPage;
