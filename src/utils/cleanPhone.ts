const cleanPhone = (phone: string) => {
  return phone.replace(/\D/g, "");
};

export default cleanPhone;
