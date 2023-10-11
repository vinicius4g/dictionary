import { useContext } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { AuthContext } from '@contexts/auth';
import { WordsContext } from '@contexts/words';

import { type AppStackRoutesNavigationProp } from '@routes/types/appStackTypes';

import { storageService } from '@storage/storageService';

import { storageKeys } from '@constants/storageKeys';
import { RoutesStack } from '@constants/routeNames';

export function useSignOut() {
  const navigation = useNavigation<AppStackRoutesNavigationProp>();

  const { resetContextAuth } = useContext(AuthContext);
  const { resetContextWords } = useContext(WordsContext);

  async function signOutApp() {
    resetContextWords();
    resetContextAuth();

    const user = await storageService.getItem(storageKeys.userData);
    if (user) await storageService.removeItem(storageKeys.userData);

    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: RoutesStack.AuthStack }],
      }),
    );
  }

  return { signOutApp };
}
