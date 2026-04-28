export type User = {
  id: string;
  email: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;

  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;

  checkAuth: () => Promise<void>;
};
