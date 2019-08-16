import apiClient from "./apiClient";

/**
 * SEND Auth Email
 * https://documenter.getpostman.com/view/6844904/SVYwJFwS?version=latest#ddf33347-83bf-4612-b545-e25021c0b3bf
 * @param email
 */
export const sendAuthEmail = (email: string) => 
    apiClient.post<SendAuthEmailResponse>('api/v2/auth/sendmail',{
    email,
});
export type SendAuthEmailResponse = { registered: boolean};


/**
 * Get Register Token using code
 * https://documenter.getpostman.com/view/6844904/SVYwJFwS?version=latest#a7237e10-150f-4ff9-95f2-9b4e718a860c
 * @param code 
 */
export const getRegisterToken = (code: string) => 
    apiClient.get<GetRegisterTokenResponse>(`/api/v2/auth/code/${code}`);

// Generated by https://quicktype.io

export type GetRegisterTokenResponse = {
    email:          string;
    register_token: string;
}
