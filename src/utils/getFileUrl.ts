const getFileUrl = (
  fileKey: string | undefined,
  type: string
): string | null => {
  if (fileKey)
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/cloud/files/${fileKey}?type=${type}`;
  return null;
};

export default getFileUrl;
