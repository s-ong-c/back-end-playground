import apiClient from './apiClient';
import snakeCaseKeys from 'snakecase-keys';
/**
 * SEND Auth Email
 * https://documenter.getpostman.com/view/6844904/SVYwJFwS?version=latest#ddf33347-83bf-4612-b545-e25021c0b3bf
 * @param email
 */
export const sendAuthEmail = (email: string) =>
  apiClient.post<SendAuthEmailResponse>('api/v2/auth/sendmail', {
    email,
  });
export type SendAuthEmailResponse = { registered: boolean };

/**
 * Get Register Token using code
 * https://documenter.getpostman.com/view/6844904/SVYwJFwS?version=latest#a7237e10-150f-4ff9-95f2-9b4e718a860c
 * @param code
 */
export const getRegisterToken = (code: string) =>
  apiClient.get<GetRegisterTokenResponse>(`/api/v2/auth/code/${code}`);

export type GetRegisterTokenResponse = {
  email: string;
  register_token: string;
};

export const localEmailRegister = ({
  registerToken,
  form,
}: {
  registerToken: string;
  form: LocalEmailRegisterForm;
}) =>
  apiClient.post(
    `/api/v2/auth/register/local`,
    snakeCaseKeys({ registerToken, form }),
  );

export type LocalEmailRegisterForm = {
  displayName: string;
  username: string;
  shortBio: string;
};
export type AuthResponse = {
  email: string;
  is_certified: boolean;
  username: string;
  id: string;
  created_at: string;
  updated_at: string;
  profile: {
    fk_user_id: string;
    display_name: string;
    short_bio: string;
    thumbnail: null;
    id: string;
    created_at: string;
    updated_at: string;
    profile_links: any;
  };
  tokens: {
    access_token: string;
    refresh_token: string;
  };
};

/**
 * Login using email code
 * docs  https://documenter.getpostman.com/view/6844904/SVYwJFwS?version=latest#a7237e10-150f-4ff9-95f2-9b4e718a860c
 * @param code
 */
export const emailCodeLogin = (code: string) =>
  apiClient.get<AuthResponse>(`/api/v2/auth/code/${code}`);

export const logout = () => apiClient.post<void>('/api/v2/auth/logout');
