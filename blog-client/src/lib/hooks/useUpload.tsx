import { useState, useCallback } from 'react';

const useUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const upload = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      if (!input.files) return;
      const file = input.files[0];
      setFile(file);
    };
  }, []);
  return [upload, file];
};

export default useUpload;
