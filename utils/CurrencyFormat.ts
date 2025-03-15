export const formatCurrencyVND = (amount: number | undefined) => {
  if (!amount) return 0; // Nếu `amount` là null hoặc undefined, trả về "0"

  // Chuyển đổi `amount` thành số (nếu là chuỗi)
  const num = typeof amount === "string" ? parseFloat(amount) : amount;

  return num.toLocaleString("vi-VN"); // Định dạng số theo chuẩn Việt Nam (có dấu `.`)
};
