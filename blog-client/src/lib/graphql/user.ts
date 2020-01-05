import gql from 'graphql-tag';

export type UserProfile = {
  id: string;
  display_name: string;
  short_bio: string;
  thumbnail: string | null;
  about: string;
  profile_links: any;
};
export type SongcConfig = {
  id: string;
  title: string;
};
export type User = {
  id: string;
  username: string;
  email: string | null;
  is_certified: boolean;
  profile: UserProfile;
  songcConfig: SongcConfig | null;
};

export const GET_CURRENT_USER = gql`
  query CurrentUser {
    auth {
      id
      username
      profile {
        thumbnail
        display_name
      }
    }
  }
`;

export const GET_SONGC_CONFIG = gql`
  query GetSongcConfig($username: String) {
    songc_config(username: $username) {
      title
      logo_image
    }
  }
`;

export type CurrentUser = {
  id: string;
  username: string;
  profile: {
    thumbnail: string | null;
    display_name: string;
  };
};
