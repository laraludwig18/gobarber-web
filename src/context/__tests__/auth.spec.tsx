import { renderHook, act } from '@testing-library/react-hooks';

import { apiMock } from '../../../testUtils/mocks';
import { useAuth, AuthProvider } from '../auth';

const user = {
  id: 'id',
  email: 'johndoe@gmail.com',
  password: '212121',
  name: 'Jonh Doe',
};

const token = 'eyJhbGciOiJIUzI1NiIs';

const loginResponse = {
  user,
  token,
};

const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

describe('Auth Hook', () => {
  beforeAll(() => {
    apiMock.onPost('sessions').reply(200, loginResponse);
  });

  beforeEach(() => {
    setItemSpy.mockClear();
  });

  it('should be able to sign in', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const { email, password } = user;

    result.current.signIn({ email, password });

    await waitForNextUpdate();

    expect(result.current.user).toStrictEqual(user);
    expect(result.current.token).toStrictEqual(token);

    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:token', token);
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
  });

  describe('Pre saved user', () => {
    beforeAll(() => {
      jest.spyOn(Storage.prototype, 'getItem').mockImplementationOnce((key) => {
        switch (key) {
          case '@GoBarber:user':
            return JSON.stringify(user);
          case '@GoBarber:token':
            return token;
          default:
            return null;
        }
      });
    });

    it('should restore saved data from storage when auth inits', () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      expect(result.current.user).toStrictEqual(user);
      expect(result.current.token).toStrictEqual(token);
    });

    it('should be able to sign out', () => {
      const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      act(() => {
        result.current.signOut();
      });

      expect(result.current.user).toBeUndefined();
      expect(result.current.token).toBeUndefined();

      expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:token');
      expect(removeItemSpy).toHaveBeenCalledWith('@GoBarber:user');
    });

    it('should be able to update user data', () => {
      const updatedUser = {
        name: 'John Doe 2',
        email: 'johndoe2@example.com',
        id: 'id',
      };

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      act(() => {
        result.current.updateUser(updatedUser);
      });

      expect(result.current.user).toStrictEqual(updatedUser);

      expect(setItemSpy).toHaveBeenCalledWith(
        '@GoBarber:user',
        JSON.stringify(updatedUser),
      );
    });
  });
});
