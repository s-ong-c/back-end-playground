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