import { Redirect, Slot, usePathname } from "expo-router";

export default function RootLayout() {
  const pathname = usePathname();

  // Chỉ redirect nếu đang ở trang gốc
  if (pathname === "/") {
    return <Redirect href="/(root)/(tabs)" />;
  }

  return <Slot />;
}
