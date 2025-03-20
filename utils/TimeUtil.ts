const convertTo24Hour = (time: string): number => {
  const [timeStr, period] = time.split(" ");
  let [hour] = timeStr.split(":").map(Number);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return hour;
};

// Kiểm tra xem thời gian có bị vô hiệu hóa không khi chọn "Today"
export const isTimeDisabled = (time: string, isToday: boolean): boolean => {
  if (!isToday) return false; // Không disable nếu không phải "Today"

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const hour24 = convertTo24Hour(time);

  // Disable nếu thời gian nhỏ hơn hoặc bằng thời gian hiện tại
  return hour24 < currentHour || (hour24 === currentHour && currentMinute > 0);
};

// Danh sách các khung giờ cố định
export const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "14:00 PM", "15:00 PM", "16:00 PM", "17:00 PM"];
