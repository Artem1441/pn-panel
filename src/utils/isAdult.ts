const isAdult = (dateString: string): boolean => {
  const today = new Date();
  const birthDate = new Date(
    dateString.includes(".")
      ? dateString.split(".").reverse().join("-")
      : dateString
  );
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age >= 14;
};

export default isAdult;
