/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  access_key: '',
});
