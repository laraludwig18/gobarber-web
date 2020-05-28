import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

import api from '../services/apiClient';

interface User {
  id: string;
  avatarUrl?: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  useEffect(() => {
    if (data.token) {
      api.defaults.headers.Authorization = `Bearer ${data.token}`;
      return localStorage.setItem('@GoBarber:token', data.token);
    }

    api.defaults.headers.Authorization = null;
    return localStorage.removeItem('@GoBarber:token');
  }, [data.token]);

  useEffect(() => {
    if (data.user) {
      return localStorage.setItem('@GoBarber:user', JSON.stringify(data.user));
    }

    return localStorage.removeItem('@GoBarber:user');
  }, [data.user]);

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('sessions', { email, password });

    const { token, user } = response.data;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
