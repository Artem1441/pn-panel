const isValidDate = (dateString: string): boolean => {
  const date = dateString.includes(".")
    ? new Date(dateString.split(".").reverse().join("-"))
    : new Date(dateString);
  return date.toString() !== "Invalid Date" && !isNaN(date.getTime());
};

export default isValidDate;
