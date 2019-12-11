import { useState, useCallback } from 'react';
import axios from 'axios';
import { createSignedUrl } from '../api/files';
import { useSongbar } from '../songbar';

const useS3Upload = () => {
  const [error, setError] = useState<Error | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [setProgress] = useSongbar();
  const s3Upload = useCallback(
    async (
      file: File,
      info: {
        type: string;
        refId?: string;
      },
    ) => {
      if (file.size > 1024 * 1024 * 15) {
        const e = new Error('File is too big');
        e.name = 'FileToBig';
        throw e;
      }
      if (!file.type.includes('image/')) {
        const e = new Error('Not an image');
        e.name = 'Not An Image';
        throw e;
      }

      try {
        const response = await createSignedUrl({
          ...info,
          filename: file.name,
        });
        const { image_path, signed_url } = response.data;
        await axios.put(signed_url, file, {
          headers: {
            'Content-Type': file.type,
          },
          onUploadProgress: e => {
            setProgress(Math.round((e.loaded / e.total) * 100));
          },
        });
        setImage(image_path);
      } catch (e) {
        console.log(e);
        setError(e);
      }
    },
    [setProgress],
  );

  return [s3Upload, image, error] as [
    typeof s3Upload,
    typeof image,
    typeof error,
  ];
};

export default useS3Upload;
