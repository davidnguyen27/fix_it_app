export const getTransactionCode = (id: string) => {
  const parts = id.split("-");
  return parts.length >= 5 ? parts[4].toUpperCase() : id;
};
