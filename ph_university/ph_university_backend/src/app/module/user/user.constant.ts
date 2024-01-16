export const USER_ROLE = {
  student: 'student',
  faculty: 'faculty',
  admin: 'admin',
} as const; // never change the value

export const UserStatus = {
  'in-progress': 'in-progress',
  blocked: 'blocked',
} as const;
