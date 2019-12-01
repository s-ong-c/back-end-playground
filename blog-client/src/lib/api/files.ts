import apiClient from './apiClient';

export interface PreuploadInfo {
  image_path: string;
  signed_url: string;
}
export const createSignedUrl = (info: {
  type: string;
  filename: string;
  refId?: string;
}) => {
  return apiClient.post<PreuploadInfo>('/api/v2/files/create-url', info);
};
