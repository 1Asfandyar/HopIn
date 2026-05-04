import type {
  AuthSession,
  LoginCredentials,
  RegisterPayload,
} from '@/types/types';
import { storageService } from './storageService';

const SESSION_KEY = 'hopin.auth.session';
const MOCK_DELAY_MS = 600;

const wait = () => new Promise(resolve => setTimeout(resolve, MOCK_DELAY_MS));

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthSession> => {
    await wait();

    const session: AuthSession = {
      user: {
        id: 'mock-user',
        email: credentials.identifier,
        phone: credentials.identifier,
      },
      accessToken: 'mock-access-token',
    };

    await storageService.setString(SESSION_KEY, JSON.stringify(session));

    return session;
  },

  register: async (payload: RegisterPayload): Promise<AuthSession> => {
    await wait();

    const session: AuthSession = {
      user: {
        id: 'mock-user',
        email: payload.email,
        fullName: payload.fullName,
        phone: payload.phone,
      },
      accessToken: 'mock-access-token',
    };

    await storageService.setString(SESSION_KEY, JSON.stringify(session));

    return session;
  },

  logout: async () => {
    await storageService.remove(SESSION_KEY);
  },

  getSession: async (): Promise<AuthSession | null> => {
    const session = await storageService.getString(SESSION_KEY);

    return session ? (JSON.parse(session) as AuthSession) : null;
  },
};
