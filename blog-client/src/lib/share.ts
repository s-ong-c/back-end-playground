/**
 *
 * @param copyLINK
 */
export const copyText = (text: string) => {
  const tempInput = document.createElement('input');
  tempInput.type = 'text';
  tempInput.value = text;
  if (!document.body) return;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('Copy');
  if (!document.body) return;
  document.body.removeChild(tempInput);
};
