export const USER_ROLE = {
  student: 'student',
  faculty: 'faculty',
  admin: 'admin',
 ['super-admin']: 'super-admin',
} as const; // never change the value

export const UserStatus = {
  'in-progress': 'in-progress',
  blocked: 'blocked',
} as const;
