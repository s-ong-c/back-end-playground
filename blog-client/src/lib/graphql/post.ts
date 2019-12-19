import gql from 'graphql-tag';
import { User } from './user';

export type Post = {
  id: string;
  title: string;
  body: string;
  thumbnail: string;
  is_markdown: boolean;
  is_temp: boolean;
  user: any;
  url_slug: string;
  likes: number;
  meta: any;
  views: number;
  is_private: boolean;
  released_at: string;
  created_at: string;
  updated_at: string;
  short_description: string;
  comments: [any];
  tags: [string];
  comments_count: number;
};

// Post Type for PostList
export type PartialPost = {
  id: string;
  title: string;
  short_description: string;
  thumbnail: string;
  user: User;
  url_slug: string;
  is_private: boolean;
  released_at: string;
  tags: [string];
  comments_count: number;
};

export interface SinglePost {
  id: string;
  title: string;
  released_at: string;
  updated_at: string;
  tags: string[];
  body: string;
  is_markdown: boolean;
  is_private: boolean;
  is_temp: boolean;
  user: {
    username: string;
    profile: {
      display_name: string;
      thumbnail: string;
      short_bio: string;
    };
  };
}

export const GET_POST_LIST = gql`
  query Post($cursor: ID) {
    posts(cursor: $cursor) {
      id
      title
      short_description
      thumbnail
      user {
        id
        username
        profile {
          thumbnail
        }
      }
      url_slug
      released_at
      comments_count
      tags
      is_private
    }
  }
`;

export const READ_POST = gql`
  query ReadPost($username: String, $url_slug: String) {
    post(username: $username, url_slug: $url_slug) {
      id
      title
      released_at
      updated_at
      tags
      body
      is_markdown
      is_private
      is_temp
      user {
        username
        profile {
          display_name
          thumbnail
          short_bio
        }
      }
    }
  }
`;

export const WRITE_POST = gql`
  mutation WritePost(
    $title: String
    $body: String
    $tags: [String]
    $is_markdown: Boolean
    $is_temp: Boolean
    $is_private: Boolean
    $url_slug: String
    $thumbnail: String
    $meta: JSON
  ) {
    writePost(
      title: $title
      body: $body
      tags: $tags
      is_markdown: $is_markdown
      is_temp: $is_temp
      is_private: $is_private
      url_slug: $url_slug
      thumbnail: $thumbnail
      meta: $meta
    ) {
      id
      user {
        id
        username
      }
      url_slug
    }
  }
`;
