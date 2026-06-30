export type UserRole = "admin" | "marketing_intern" | "member";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
};

export const USER_ROLES: UserRole[] = ["admin", "marketing_intern", "member"];

export function isUserRole(value: string): value is UserRole {
  return USER_ROLES.includes(value as UserRole);
}
