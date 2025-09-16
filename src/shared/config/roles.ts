export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MANAGER: 'manager',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
