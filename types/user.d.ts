enum UserRole {
  "Admin",
  "Customer",
  "Mechanist",
}

interface User {
  Id: string;
  Active: boolean;
  Avatar?: string;
  Address?: string;
  IsVerified: boolean;
  Fullname?: string;
  Gender?: string;
  Birthday?: string;
  UserName: string;
  Email: string;
  Balance: number;
  Password: string;
  PhoneNumber?: string;
  Roles: UserRole;
}
