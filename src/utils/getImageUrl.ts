const getImageUrl = (fileKey: string | undefined): string | null => {
  if (fileKey)
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/cloud/images/${fileKey}`;
  return null;
};

export default getImageUrl;
