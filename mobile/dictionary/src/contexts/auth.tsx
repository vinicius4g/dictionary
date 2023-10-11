import React, { createContext, useState, type ReactNode } from 'react';

import { api } from '@services/api';

import { type UserModel } from '@models/UserModel';

import { storageService } from '@storage/storageService';

import { storageKeys } from '@constants/storageKeys';

interface IValuesAuth {
  signIn: (username: string, password: string) => Promise<boolean>;
  loadingSignIn: boolean;
  user: UserModel | undefined;
  checkLoggedInUser: () => Promise<boolean>;
  loadingCheckLoggedInUser: boolean;
  signInWithoutData: () => void;
  resetContextAuth: () => void;
}

const initialValue: IValuesAuth = {
  signIn: async (username: string, password: string) => false,
  loadingSignIn: false,
  user: undefined,
  checkLoggedInUser: async () => false,
  loadingCheckLoggedInUser: false,
  signInWithoutData: () => {},
  resetContextAuth: () => {},
};

export const AuthContext = createContext<IValuesAuth>(initialValue);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserModel>();

  const [loadingSignIn, setLoadingSignIn] = useState(false);

  const [loadingCheckLoggedInUser, setLoadingCheckLoggedInUser] =
    useState(false);

  const signIn = async (username: string, password: string) => {
    setLoadingSignIn(true);

    try {
      const response = await api.signIn({ username, password });
      setUser(response);
      storageService.setItem(storageKeys.userData, response);
    } catch {
      return false;
    } finally {
      setLoadingSignIn(false);
    }

    return true;
  };

  const checkLoggedInUser = async () => {
    setLoadingCheckLoggedInUser(true);

    try {
      const user = await storageService.getItem<UserModel>(
        storageKeys.userData,
      );
      if (user) {
        setUser(user);
        return true;
      }

      return false;
    } catch {
      return false;
    } finally {
      setLoadingCheckLoggedInUser(false);
    }
  };

  const signInWithoutData = () => {
    setUser(undefined);

    return true;
  };

  const resetContextAuth = async () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        loadingSignIn,
        user,
        checkLoggedInUser,
        loadingCheckLoggedInUser,
        signInWithoutData,
        resetContextAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
