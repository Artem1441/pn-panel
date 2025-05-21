const cleanPhone = (phone: string): string => {
  return phone.replace(/\D/g, "");
};

export default cleanPhone;
