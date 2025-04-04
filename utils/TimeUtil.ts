const convertTo24Hour = (time: string): number => {
  const [timeStr, period] = time.split(" ");
  let [hour] = timeStr.split(":").map(Number);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return hour;
};

export const isTimeDisabled = (time: string, isToday: boolean): boolean => {
  if (!isToday) return false;

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const hour24 = convertTo24Hour(time);

  return hour24 < currentHour || (hour24 === currentHour && currentMinute > 0);
};

export const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
