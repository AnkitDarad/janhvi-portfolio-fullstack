import bcrypt from 'bcryptjs';

export const USER_TYPES = {
  ADMIN: 'admin',
  CLIENT: 'client',
  GUEST: 'guest',
};

const hashPassword = (plain) => bcrypt.hashSync(plain, 10);

export const users = [
  {
    id: 1,
    username: 'admin',
    password: hashPassword('portfolio2026'),
    userType: USER_TYPES.ADMIN,
    displayName: 'Admin',
  },
  {
    id: 2,
    username: 'janhvi',
    password: hashPassword('designer@0801'),
    userType: USER_TYPES.ADMIN,
    displayName: 'Janhvi',
  },
  {
    id: 3,
    username: 'ankit',
    password: hashPassword('developer@1204'),
    userType: USER_TYPES.ADMIN,
    displayName: 'Ankit',
  },
  {
    id: 4,
    username: 'client',
    password: hashPassword('client@123'),
    userType: USER_TYPES.CLIENT,
    displayName: 'Client',
  },
  {
    id: 5,
    username: 'guest',
    password: hashPassword('guest@123'),
    userType: USER_TYPES.GUEST,
    displayName: 'Guest',
  },
];
