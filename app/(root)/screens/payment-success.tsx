import { Text } from "react-native";

const PaymentSuccess = () => {
  return (
    <Text>
      Xử lý logic chỗ này như sau:
      {"\n\n"}
      <Text>Có 2 cách:</Text>
      {"\n\n"}
      <Text>
        Cách 1: Chỉ hiển thị 1 hình thành công và có 1 nút chuyển qua xem lại đơn đặt.
      </Text>
      {"\n\n"}
      <Text>
        Cách 2: Truyền lại thông tin thanh toán qua luôn rồi cũng có nút chuyển qua xem lại đơn đặt.
      </Text>
      {"\n\n"}
      <Text>Cách 2 rõ ràng hơn và logic hơn.</Text>
    </Text>
  );
};

export default PaymentSuccess;
