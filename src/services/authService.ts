import type {
  AuthSession,
  LoginCredentials,
  RegisterPayload,
} from '@/types/types';
import {
  AUTH_SESSION_STORAGE_KEY,
  MOCK_ACCESS_TOKEN,
  MOCK_AUTH_DELAY_MS,
  MOCK_USER_ID,
} from '@/config/constants';
import { storageService } from './storageService';

const wait = () =>
  new Promise(resolve => setTimeout(resolve, MOCK_AUTH_DELAY_MS));

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthSession> => {
    await wait();

    const session: AuthSession = {
      user: {
        id: MOCK_USER_ID,
        email: credentials.identifier,
        phone: credentials.identifier,
      },
      accessToken: MOCK_ACCESS_TOKEN,
    };

    await storageService.setString(
      AUTH_SESSION_STORAGE_KEY,
      JSON.stringify(session),
    );

    return session;
  },

  register: async (payload: RegisterPayload): Promise<AuthSession> => {
    await wait();

    const session: AuthSession = {
      user: {
        id: MOCK_USER_ID,
        email: payload.email,
        fullName: payload.fullName,
        phone: payload.phone,
      },
      accessToken: MOCK_ACCESS_TOKEN,
    };

    await storageService.setString(
      AUTH_SESSION_STORAGE_KEY,
      JSON.stringify(session),
    );

    return session;
  },

  logout: async () => {
    await storageService.remove(AUTH_SESSION_STORAGE_KEY);
  },

  getSession: async (): Promise<AuthSession | null> => {
    const session = await storageService.getString(AUTH_SESSION_STORAGE_KEY);

    return session ? (JSON.parse(session) as AuthSession) : null;
  },
};
